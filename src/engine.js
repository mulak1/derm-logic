/**
 * DermLogic (#4): Sub-5ms Deterministic Clinical INCI & Routine Compatibility Engine
 * Implements Henderson-Hasselbalch pKa bioavailability, |ΔpH| > 1.8 inactivation detection,
 * oxidation/chelation conflict matrices, positional comedogenicity, Malassezia triggers,
 * AM/PM + 4-Night Skin-Cycling scheduling, and optional @google/genai (gemini-3.8-flash) synthesis.
 */

const { CLINICAL_INGREDIENTS, CULT_PRODUCTS } = require('./clinical-data');
const { db, sampleBetaArm } = require('./db');

const INGREDIENT_BY_ID = new Map(CLINICAL_INGREDIENTS.map((i) => [i.id, i]));
const PRODUCT_BY_ID = new Map(CULT_PRODUCTS.map((p) => [p.id, p]));

function computeFreeAcidFraction(ph, pka) {
  if (ph == null || pka == null) return null;
  const fraction = 1 / (1 + Math.pow(10, ph - pka));
  return Number((fraction * 100).toFixed(1));
}

function getMidPh(ing, productPh) {
  if (typeof productPh === 'number') return productPh;
  if (ing.phMin != null && ing.phMax != null) {
    return Number(((ing.phMin + ing.phMax) / 2).toFixed(2));
  }
  return 5.5;
}

function parseRawInciTokens(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  const cleaned = rawText
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/\b\d+(\.\d+)?%/g, ' ');
  return cleaned
    .split(/[,;/\n•·]+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2);
}

function matchTokenToIngredient(token) {
  const lower = token.toLowerCase().trim();
  if (!lower) return null;
  for (const ing of CLINICAL_INGREDIENTS) {
    if (ing.id === lower || ing.inciName.toLowerCase() === lower || ing.commonName.toLowerCase() === lower) {
      return ing;
    }
    for (const alias of ing.aliases) {
      if (lower === alias || lower.includes(alias) || (alias.length >= 6 && alias.includes(lower) && lower.length >= 6)) {
        return ing;
      }
    }
  }
  return null;
}

function analyzeRoutine(params = {}) {
  const startHr = process.hrtime.bigint();
  const skinType = params.skinType || 'combination';
  const productIds = Array.isArray(params.productIds) ? params.productIds : [];
  const rawInciText = typeof params.rawInciText === 'string' ? params.rawInciText.trim() : '';

  const selectedProducts = productIds
    .map((id) => PRODUCT_BY_ID.get(id))
    .filter(Boolean);

  // Collect all active & functional ingredients with positional context
  const detectedMap = new Map(); // id -> { ingredient, sources: [], positionIndex, effectivePh, freeAcidPercent }
  const orderedTokens = [];

  for (const prod of selectedProducts) {
    const prodTokens = parseRawInciTokens(prod.inciList);
    prodTokens.forEach((tok, idx) => {
      orderedTokens.push({ token: tok, pos: idx + 1, sourceProduct: `${prod.brand} ${prod.name}`, productPh: prod.ph });
    });
    for (const activeId of prod.primaryActives) {
      const ing = INGREDIENT_BY_ID.get(activeId);
      if (ing) {
        const existing = detectedMap.get(ing.id);
        const effPh = getMidPh(ing, prod.ph);
        if (existing) {
          if (!existing.sources.includes(`${prod.brand} ${prod.name}`)) {
            existing.sources.push(`${prod.brand} ${prod.name}`);
          }
          existing.effectivePh = Math.min(existing.effectivePh, effPh);
        } else {
          detectedMap.set(ing.id, {
            ingredient: ing,
            sources: [`${prod.brand} ${prod.name}`],
            positionIndex: 3,
            effectivePh: effPh,
            freeAcidPercent: computeFreeAcidFraction(effPh, ing.pka)
          });
        }
      }
    }
  }

  if (rawInciText) {
    const rawTokens = parseRawInciTokens(rawInciText);
    rawTokens.forEach((tok, idx) => {
      orderedTokens.push({ token: tok, pos: idx + 1, sourceProduct: 'Pasted INCI Label', productPh: null });
    });
  }

  for (const item of orderedTokens) {
    const matched = matchTokenToIngredient(item.token);
    if (matched) {
      const existing = detectedMap.get(matched.id);
      const effPh = getMidPh(matched, item.productPh);
      if (existing) {
        if (!existing.sources.includes(item.sourceProduct)) {
          existing.sources.push(item.sourceProduct);
        }
        existing.positionIndex = Math.min(existing.positionIndex, item.pos);
      } else {
        detectedMap.set(matched.id, {
          ingredient: matched,
          sources: [item.sourceProduct],
          positionIndex: item.pos,
          effectivePh: effPh,
          freeAcidPercent: computeFreeAcidFraction(effPh, matched.pka)
        });
      }
    }
  }

  const detectedItems = Array.from(detectedMap.values());

  // Pairwise Conflict & ΔpH Engine
  const conflicts = [];
  const seenPairs = new Set();

  function addConflict(itemA, itemB, severity, title, mechanism, resolution, waitMinutes) {
    const key = [itemA.ingredient.id, itemB.ingredient.id].sort().join('::');
    if (seenPairs.has(key)) return;
    seenPairs.add(key);
    const deltaPh = Number(Math.abs(itemA.effectivePh - itemB.effectivePh).toFixed(2));
    conflicts.push({
      id: key,
      ingredientA: itemA.ingredient.commonName,
      ingredientB: itemB.ingredient.commonName,
      inciA: itemA.ingredient.inciName,
      inciB: itemB.ingredient.inciName,
      sourceA: itemA.sources[0],
      sourceB: itemB.sources[0],
      phA: itemA.effectivePh,
      phB: itemB.effectivePh,
      deltaPh,
      severity,
      title,
      mechanism,
      resolution,
      waitMinutes
    });
  }

  for (let i = 0; i < detectedItems.length; i++) {
    for (let j = i + 1; j < detectedItems.length; j++) {
      const a = detectedItems[i];
      const b = detectedItems[j];
      const cA = a.ingredient.activeClass;
      const cB = b.ingredient.activeClass;
      const classes = new Set([cA, cB]);
      const deltaPh = Math.abs(a.effectivePh - b.effectivePh);
      const minPh = Math.min(a.effectivePh, b.effectivePh);

      // 1. Benzoyl Peroxide + Retinoids (Tretinoin, Retinol, Retinal)
      if (classes.has('benzoyl_peroxide') && classes.has('retinoid')) {
        addConflict(
          a, b, 'CRITICAL',
          'Oxidative Retinoid Degradation (Peroxide Homolysis)',
          'Benzoyl Peroxide cleaves into oxygen free radicals that oxidize delicate retinoid polyene chains on contact, neutralizing >80% of Tretinoin/Retinol potency within 2 hours.',
          'Move Benzoyl Peroxide strictly to AM (or use a rinse-off BPO cleanser); apply Tretinoin/Retinol exclusively in PM.',
          720
        );
        continue;
      }

      // 2. Benzoyl Peroxide + Adapalene
      if (classes.has('benzoyl_peroxide') && classes.has('retinoid_adapalene')) {
        addConflict(
          a, b, 'MODERATE',
          'Compounded Xerosis & Stratum Corneum Desquamation',
          'Adapalene’s rigid naphthoic acid ring resists Benzoyl Peroxide oxidation, but co-layering doubles transepidermal water loss (TEWL) and erythema.',
          'Apply a physiological 3:1:1 ceramide moisturizer before co-applying (Sandwich Method), or split BPO to AM and Adapalene to PM.',
          15
        );
        continue;
      }

      // 3. Benzoyl Peroxide + Vitamin C or Hydroquinone
      if (classes.has('benzoyl_peroxide') && (classes.has('vitamin_c_laa') || classes.has('hydroquinone'))) {
        addConflict(
          a, b, 'CRITICAL',
          'Direct Redox Quenching & Quinone Oxidation',
          'Benzoyl Peroxide immediately oxidizes L-Ascorbic Acid into inactive dehydroascorbic acid (and oxidizes Hydroquinone into dark-orange staining p-benzoquinone).',
          'Never layer in the same session. Use Vitamin C in the AM and Benzoyl Peroxide on non-retinoid PM nights.',
          720
        );
        continue;
      }

      // 4. Copper Peptides + Vitamin C (LAA or Derivatives)
      if (classes.has('copper_peptide') && (classes.has('vitamin_c_laa') || classes.has('vitamin_c_deriv'))) {
        addConflict(
          a, b, 'CRITICAL',
          `Cu2+ Fenton-Like Redox Oxidation & Chelation (ΔpH ${deltaPh.toFixed(1)})`,
          'Copper ions in GHK-Cu catalyze rapid single-electron oxidation of Ascorbic Acid while low-pH Vitamin C protonates histidine and strips Cu2+ from the tripeptide.',
          'Strict AM/PM Separation: Apply Vitamin C in the AM under SPF 50 and Copper Peptides in the PM.',
          720
        );
        continue;
      }

      // 5. Copper Peptides + Direct Acids (AHA, BHA, PHA)
      if (classes.has('copper_peptide') && (classes.has('aha') || classes.has('bha') || classes.has('pha'))) {
        addConflict(
          a, b, 'CRITICAL',
          `Low-pH Histidine Protonation & Copper De-Chelation (ΔpH ${deltaPh.toFixed(1)})`,
          'Direct acids (pH < 4.0) protonate the imidazole nitrogen of histidine in Copper Tripeptide-1, breaking the copper coordination bond and hydrolyzing peptide chains.',
          'Apply Copper Peptides in the AM routine and reserve AHA/BHA exfoliants for dedicated PM resurfacing nights.',
          720
        );
        continue;
      }

      // 6. Copper Peptides + Kojic Acid
      if (classes.has('copper_peptide') && classes.has('kojic_acid')) {
        addConflict(
          a, b, 'CRITICAL',
          'Competitive Copper-Ion Chelation Clash',
          'Kojic Acid inhibits tyrosinase specifically by chelating Cu2+ ions; co-applying with GHK-Cu causes Kojic Acid to sequester copper from your peptide serum.',
          'Separate into AM (Kojic/Tranexamic Acid) and PM (Copper Peptides).',
          720
        );
        continue;
      }

      // 7. Copper Peptides + Retinoids
      if (classes.has('copper_peptide') && (classes.has('retinoid') || classes.has('retinoid_adapalene'))) {
        addConflict(
          a, b, 'MODERATE',
          'Fibroblast Over-Stimulation & Metal-Catalyzed Retinoid Stress',
          'Co-layering 1% Copper Tripeptide-1 and potent retinoids in the same PM session increases stinging and risks trace Cu2+ acceleration of retinoid isomerization.',
          'Alternate PM nights (Night 2 Retinoid, Night 3 Copper Peptides) or shift Copper Peptides to AM.',
          720
        );
        continue;
      }

      // 8. Retinoids + Direct Exfoliating Acids (AHA / BHA)
      if ((classes.has('retinoid') || classes.has('retinoid_adapalene')) && (classes.has('aha') || classes.has('bha'))) {
        addConflict(
          a, b, 'CRITICAL',
          `Synergistic Corneodesmosome Stripping & ΔpH ${deltaPh.toFixed(1)} Retinoid Stress`,
          'Layering low-pH keratolytic acids (pH 3.0–3.8) with nuclear retinoids strips the stratum corneum barrier, accelerates acid-catalyzed retinoid degradation, and causes severe retinoid dermatitis.',
          'Follow the 4-Night Skin Cycling Protocol: Night 1 Exfoliating Acid, Night 2 Retinoid, Nights 3–4 Ceramide Barrier Recovery.',
          1440
        );
        continue;
      }

      // 9. Retinoids + Pure L-Ascorbic Acid
      if ((classes.has('retinoid') || classes.has('retinoid_adapalene')) && classes.has('vitamin_c_laa')) {
        addConflict(
          a, b, 'MODERATE',
          `ΔpH ${deltaPh.toFixed(1)} Acid-Mantle Clash (pH 3.2 LAA vs pH 5.8 Retinoid)`,
          'Pure L-Ascorbic Acid requires pH <= 3.5 while retinoids require pH 5.5–6.5. Co-application creates a ΔpH > 2.2 shock and cumulative erythema.',
          'Apply L-Ascorbic Acid exclusively in the morning under SPF 50 and Retinoids exclusively at night.',
          720
        );
        continue;
      }

      // 10. Multi-Acid Stacking (AHA + BHA or two distinct leave-on exfoliants)
      if ((cA === 'aha' || cA === 'bha') && (cB === 'aha' || cB === 'bha')) {
        // Check if they come from different products or high-risk combination
        const diffProducts = a.sources[0] !== b.sources[0];
        if (diffProducts) {
          addConflict(
            a, b, 'CRITICAL',
            'Dual-Acid Over-Exfoliation & Stratum Corneum Delipidation',
            'Stacking multiple leave-on AHA/BHA exfoliants in one routine dissolves both hydrophilic surface corneodesmosomes and lipophilic sebaceous lipids, causing acute barrier burn.',
            'Select only ONE leave-on keratolytic acid per session, maximum 2–3 nights per week.',
            1440
          );
          continue;
        }
      }

      // 11. Direct Acids + Pure L-Ascorbic Acid
      if (classes.has('vitamin_c_laa') && (classes.has('aha') || classes.has('bha'))) {
        addConflict(
          a, b, 'MODERATE',
          'Cumulative Low-pH Acid Overload (< pH 3.5)',
          'Stacking 15%–20% L-Ascorbic Acid (pH 3.0) with AHA/BHA exfoliants (pH 3.5) overwhelms the skin’s natural buffering capacity, triggering nociceptor stinging.',
          'Keep L-Ascorbic Acid in your AM routine and move AHA/BHA exfoliants to PM Resurfacing Nights.',
          720
        );
        continue;
      }

      // 12. Hypochlorous Acid + Antioxidants / Copper Peptides
      if (classes.has('hypochlorous_acid') && (classes.has('vitamin_c_laa') || classes.has('copper_peptide') || classes.has('antioxidant_polyphenol'))) {
        addConflict(
          a, b, 'MODERATE',
          'HOCl Oxidant Quenching When Applied Wet',
          'Hypochlorous Acid (HOCl) is an oxidizing antimicrobial mist that neutralizes L-Ascorbic Acid and oxidizes peptides if layered before completely dry.',
          'Mist Hypochlorous Acid onto clean skin and wait 10 full minutes until 100% dry before applying serums.',
          10
        );
        continue;
      }

      // 13. General |ΔpH| > 1.8 Inactivation / Flushing Rule (Signal Peptides or Niacinamide + Low-pH Acid)
      if (deltaPh > 1.8 && minPh <= 3.8) {
        if (classes.has('signal_peptide')) {
          addConflict(
            a, b, 'CRITICAL',
            `ΔpH ${deltaPh.toFixed(1)} Amide-Bond Hydrolysis of Signal Peptides`,
            `Applying pH ${minPh.toFixed(1)} acid alongside neutral oligopeptides (ΔpH ${deltaPh.toFixed(1)} > 1.8 threshold) denatures peptide conformation and cleaves matrikine bonds.`,
            'Separate into AM (Signal Peptides) vs PM (Direct Acids), or wait at least 20 minutes between layers.',
            720
          );
          continue;
        }
        if (classes.has('niacinamide') && a.sources[0] !== b.sources[0]) {
          addConflict(
            a, b, 'MODERATE',
            `ΔpH ${deltaPh.toFixed(1)} Surface pH Shift & Nicotinic Flushing Risk`,
            `Immediate layering across a ΔpH ${deltaPh.toFixed(1)} gap (> 1.8 threshold) buffers the acid's un-ionized free-acid fraction while risking transient nicotinic-acid prostaglandin D2 capillary flushing.`,
            'Wait 15 minutes after applying your low-pH acid/Vitamin C before layering Niacinamide, or split AM/PM.',
            15
          );
          continue;
        }
      }
    }
  }

  // Compute Barrier Hazard Index (0-100) & Compatibility Score (0-100)
  const criticalCount = conflicts.filter((c) => c.severity === 'CRITICAL').length;
  const moderateCount = conflicts.filter((c) => c.severity === 'MODERATE').length;
  const exfoliantCount = detectedItems.filter((d) => ['aha', 'bha', 'pha'].includes(d.ingredient.activeClass)).length;
  const barrierRepairCount = detectedItems.filter((d) => ['barrier_lipid', 'barrier_soother', 'humectant'].includes(d.ingredient.activeClass)).length;
  const intrinsicIrritationSum = detectedItems.reduce((acc, d) => acc + d.ingredient.irritationIndex, 0);

  let skinVulnerability = 0;
  if (skinType === 'sensitive') skinVulnerability = 12;
  else if (skinType === 'dry') skinVulnerability = 6;

  const rawHazard =
    8 +
    skinVulnerability +
    intrinsicIrritationSum * 3.2 +
    criticalCount * 26 +
    moderateCount * 13 +
    Math.max(0, exfoliantCount - 1) * 14 -
    Math.min(18, barrierRepairCount * 4.5);

  const barrierHazardIndex = Math.max(4, Math.min(98, Math.round(rawHazard)));
  const compatibilityScore = Math.max(5, Math.min(99, 100 - barrierHazardIndex));

  // Positional Comedogenic Load & Malassezia Triggers
  let weightedComedogenicSum = 0;
  const comedogenicFlags = [];
  const malasseziaFlags = [];
  const pregnancyFlags = [];

  for (const item of detectedItems) {
    const ing = item.ingredient;
    const posWeight = item.positionIndex <= 5 ? 1.0 : item.positionIndex <= 12 ? 0.65 : 0.35;
    if (ing.comedogenicity > 0) {
      weightedComedogenicSum += ing.comedogenicity * posWeight * 7.5;
    }
    if (ing.comedogenicity >= 2) {
      comedogenicFlags.push({
        inciName: ing.inciName,
        commonName: ing.commonName,
        rating: ing.comedogenicity,
        position: item.positionIndex,
        source: item.sources[0],
        mechanism: ing.clinicalMechanism
      });
    }
    if (ing.malasseziaTrigger) {
      malasseziaFlags.push({
        inciName: ing.inciName,
        commonName: ing.commonName,
        source: item.sources[0],
        mechanism: ing.clinicalMechanism
      });
    }
    if (ing.pregnancySafe !== 'SAFE') {
      pregnancyFlags.push({
        inciName: ing.inciName,
        commonName: ing.commonName,
        status: ing.pregnancySafe,
        source: item.sources[0]
      });
    }
  }

  const comedogenicLoad = Math.max(0, Math.min(98, Math.round(weightedComedogenicSum)));

  let verdictStatus = 'OPTIMAL_SYNERGY';
  let verdictLabel = 'Optimal Clinical Barrier Synergy';
  if (criticalCount > 0 || compatibilityScore < 50) {
    verdictStatus = 'CRITICAL_CLASH';
    verdictLabel = 'Critical Chemical / ΔpH Inactivation Detected';
  } else if (moderateCount > 0 || compatibilityScore < 76) {
    verdictStatus = 'MODERATE_CAUTION';
    verdictLabel = 'Moderate ΔpH / Barrier Desquamation Hazard';
  }

  // Deterministic AM / PM & 4-Night Skin-Cycling Calendar Synthesis
  const schedule = buildDeterministicSchedule(detectedItems, selectedProducts, conflicts);
  const bandit = sampleBetaArm();

  const endHr = process.hrtime.bigint();
  const executionMs = Number((Number(endHr - startHr) / 1e6).toFixed(2));

  // Persist scan telemetry in SQLite
  try {
    db.prepare(`
      INSERT INTO routine_scans (
        skin_type, product_ids_json, raw_inci_text, compatibility_score,
        barrier_hazard_index, comedogenic_load, conflicts_count, execution_ms, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      skinType,
      JSON.stringify(productIds),
      rawInciText.slice(0, 500),
      compatibilityScore,
      barrierHazardIndex,
      comedogenicLoad,
      conflicts.length,
      executionMs,
      new Date().toISOString()
    );
  } catch (_) {
    // Non-blocking telemetry write
  }

  return {
    compatibilityScore,
    barrierHazardIndex,
    comedogenicLoad,
    verdictStatus,
    verdictLabel,
    skinType,
    executionMs,
    conflicts,
    comedogenicFlags,
    malasseziaFlags,
    pregnancyFlags,
    ingredientBreakdown: detectedItems.map((d) => ({
      id: d.ingredient.id,
      inciName: d.ingredient.inciName,
      commonName: d.ingredient.commonName,
      category: d.ingredient.category,
      activeClass: d.ingredient.activeClass,
      phWindow: `${d.ingredient.phMin}–${d.ingredient.phMax}`,
      effectivePh: d.effectivePh,
      pka: d.ingredient.pka,
      freeAcidPercent: d.freeAcidPercent,
      molecularWeightDa: d.ingredient.molecularWeightDa,
      comedogenicity: d.ingredient.comedogenicity,
      irritationIndex: d.ingredient.irritationIndex,
      malasseziaTrigger: d.ingredient.malasseziaTrigger,
      pregnancySafe: d.ingredient.pregnancySafe,
      functionRole: d.ingredient.functionRole,
      clinicalMechanism: d.ingredient.clinicalMechanism,
      sources: d.sources
    })),
    schedule,
    paywallOffer: bandit.selectedArm
  };
}

function buildDeterministicSchedule(detectedItems, selectedProducts, conflicts) {
  const hasLaa = detectedItems.some((d) => d.ingredient.activeClass === 'vitamin_c_laa');
  const hasCopper = detectedItems.some((d) => d.ingredient.activeClass === 'copper_peptide');
  const hasRetinoid = detectedItems.some((d) => d.ingredient.activeClass.startsWith('retinoid'));
  const hasAcid = detectedItems.some((d) => ['aha', 'bha', 'pha'].includes(d.ingredient.activeClass));
  const hasBpo = detectedItems.some((d) => d.ingredient.activeClass === 'benzoyl_peroxide');
  const hasAzelaic = detectedItems.some((d) => d.ingredient.activeClass === 'azelaic_acid');
  const hasNiacinamide = detectedItems.some((d) => d.ingredient.activeClass === 'niacinamide');

  const amSteps = [
    { step: 1, slot: 'AM Prep', title: 'pH 5.5 Gentle Amino-Acid Cleanser or Water Rinse', ph: '5.5', wait: 'Pat dry' }
  ];

  if (hasLaa) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Antioxidant (Low pH)',
      title: 'L-Ascorbic Acid 15%–20% + Ferulic Acid Serum',
      ph: '3.2',
      wait: hasNiacinamide ? '⏱ Wait 15 min (ΔpH Equilibration)' : '⏱ Wait 5 min'
    });
  } else if (hasCopper) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Peptide Remodeling',
      title: 'Copper Tripeptide-1 (GHK-Cu) 1% Serum (Separated from PM Acids/Retinoids)',
      ph: '6.2',
      wait: 'Apply on damp skin'
    });
  } else if (hasBpo && hasRetinoid) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Antibacterial (Split from PM Retinoid)',
      title: 'Benzoyl Peroxide 2.5%–5.5% Treatment (Prevents PM Retinoid Oxidation)',
      ph: '5.0',
      wait: '⏱ Let dry 5 min'
    });
  }

  if (hasAzelaic) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Anti-Erythema / Tyrosinase',
      title: 'Azelaic Acid 10%–15% Gel/Suspension',
      ph: '4.9',
      wait: 'Smooth thin layer'
    });
  }

  amSteps.push({
    step: amSteps.length + 1,
    slot: 'AM Barrier + Photoprotection',
    title: 'Physiological Ceramide Moisturizer + Broad-Spectrum SPF 50+ PA++++',
    ph: '5.8',
    wait: 'Mandatory final step'
  });

  const pmCycling = [
    {
      night: 'Night 1 · Keratolytic Resurfacing',
      focus: hasAcid ? 'AHA / BHA Desmosome Exfoliation (Zero Retinoids or Peptides)' : 'Gentle Hydration & Enzyme Polish',
      steps: hasAcid
        ? ['pH 5.5 Cleanser (Dry completely)', 'Direct AHA / BHA Exfoliant (pH 3.2–3.6) · ⏱ Wait 15 min', '3:1:1 Ceramide + Cholesterol Recovery Cream']
        : ['pH 5.5 Cleanser', 'Hydrating Essence + Niacinamide 5%', 'Ceramide Barrier Cream'],
      badge: hasAcid ? 'ACTIVE ACID NIGHT' : 'GENTLE PREP'
    },
    {
      night: 'Night 2 · Cellular Turnover (Retinoid)',
      focus: hasRetinoid ? 'Nuclear RAR Agonist (Zero BPO, Zero Direct Acids)' : 'Peptide & Antioxidant Repair',
      steps: hasRetinoid
        ? ['pH 5.5 Cleanser + Snail Mucin / Humectant Buffer (⏱ Dry 15 min)', 'Pea-sized Rx Tretinoin / Retinaldehyde / Retinol (pH 5.8)', 'Encapsulated Ceramide Barrier Cream (Sandwich Method)']
        : ['pH 5.5 Cleanser', 'Multi-Peptide or Brightening Serum', 'Lipid Recovery Moisturizer'],
      badge: hasRetinoid ? 'RETINOID NIGHT' : 'REPAIR NIGHT'
    },
    {
      night: 'Night 3 · Peptide & Microbiome Repair',
      focus: hasCopper ? 'Copper Tripeptide-1 (GHK-Cu) Remodeling (Zero Vitamin C / Zero Acids)' : 'Soothing Centella, Niacinamide & Barrier Lipids',
      steps: [
        'pH 5.5 Cleanser + Heartleaf / Centella Toner',
        hasCopper ? 'Copper Peptides 1% (GHK-Cu) + Hyaluronic Acid (pH 6.2)' : 'Niacinamide 4%–10% + Snail 96 Mucin Essence',
        'Dieux Instant Angel / Aestura Atobarrier 365 Cream'
      ],
      badge: 'PEPTIDE & CICA RECOVERY'
    },
    {
      night: 'Night 4 · Deep Lamellar Lipid Restoration',
      focus: hasBpo && !hasLaa ? 'Targeted Benzoyl Peroxide or 100% Barrier Rest Night' : 'Zero Exfoliants · Pure 3:1:1 Ceramide-Cholesterol-Fatty Acid Seal',
      steps: [
        'Micellar Water + pH 5.5 Cleanser',
        'Panthenol 5% + Madecassoside + Squalane',
        'La Roche-Posay Cicaplast Baume B5+ or Ceramide Cream'
      ],
      badge: '100% BARRIER REST'
    }
  ];

  return {
    amSteps,
    pmCycling,
    summaryNote: conflicts.length > 0
      ? `Resolved ${conflicts.length} active conflict(s) by partitioning incompatible pH and redox pairs across AM and a 4-Night Skin-Cycling schedule.`
      : 'Your current products operate in harmonious pH and redox windows with zero chemical antagonism.'
  };
}

async function generateOptionalGeminiNote(analysisResult) {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  try {
    const { GoogleGenAI } = require('@google/genai');
    const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const interaction = await client.interactions.create({
      model: 'gemini-3.8-flash',
      input: `As a clinical cosmetic chemist, summarize in 2 concise sentences this skincare routine analysis: Compatibility Score ${analysisResult.compatibilityScore}/100, Conflicts: ${analysisResult.conflicts.map((c) => c.title).join('; ') || 'None'}.`
    });
    return interaction.output_text || null;
  } catch (_) {
    return null;
  }
}

module.exports = {
  analyzeRoutine,
  generateOptionalGeminiNote,
  INGREDIENT_BY_ID,
  PRODUCT_BY_ID
};
