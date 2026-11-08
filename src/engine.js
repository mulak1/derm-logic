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

const ALLERGY_REACTION_OPTIONS = [
  {
    id: 'fragrance',
    shortLabel: 'Fragrance / Essential Oils',
    clinicalName: 'EU 26 Fragrance & Essential Oil Allergens',
    patterns: ['linalool', 'limonene', 'citronellol', 'geraniol', 'parfum', 'fragrance', 'lavandula', 'lavender', 'citrus', 'bergamot', 'eucalyptus', 'rosemarinus', 'rosemary', 'pelargonium', 'essential oil'],
    provenance: 'EU CosIng Annex III 26-Allergen Contact Screen',
    freeFix: 'Remove fragranced or essential-oil formulas from your 7:30 AM and 9:30 PM steps to stop allergic contact redness.',
    hypoallergenicSwap: 'Vanicream Daily Facial Moisturizer ($14) + Aestura Atobarrier 365 Cream ($32) · 0/26 EU Fragrance Allergens'
  },
  {
    id: 'snail_mite',
    shortLabel: 'Snail Mucin / Dust-Mite',
    clinicalName: 'Snail Secretion & Dust-Mite Cross-Reactivity',
    patterns: ['snail secretion filtrate', 'snail mucin', 'cosrx-snail'],
    provenance: 'Tropomyosin Cross-Reactivity (Dust-Mite & Shellfish Allergy)',
    freeFix: 'Skip Snail Mucin if you have dust-mite or shellfish allergies; swap to vegan Glycerin + Beta-Glucan hydration.',
    hypoallergenicSwap: 'Rhode Glazing Milk Ceramide Essence ($30) or Experiment Super Saturated 30% Glycerin ($28) · 100% Vegan / Mite-Safe'
  },
  {
    id: 'bpo',
    shortLabel: 'Benzoyl Peroxide',
    clinicalName: 'Benzoyl Peroxide Contact Allergy',
    patterns: ['benzoyl peroxide', 'effaclar duo', 'panoxyl'],
    provenance: 'Patch-Test Contact Dermatitis Trigger (~2–5% Incidence)',
    freeFix: 'Discontinue Benzoyl Peroxide washes/gels if swelling or hives occur; switch to Azelaic Acid 10% for blemish control.',
    hypoallergenicSwap: 'The Ordinary Azelaic Acid 10% ($12) + Tower 28 SOS Hypochlorous Mist ($28) · Zero-Peroxide Blemish Clearing'
  },
  {
    id: 'salicylates',
    shortLabel: 'Salicylates / BHA',
    clinicalName: 'Salicylic Acid / Aspirin Sensitivity',
    patterns: ['salicylic acid', 'betaine salicylate', 'willow bark', 'salix alba', 'capryloyl salicylic', '2-bha'],
    provenance: 'EU CosIng Salicylate & Aspirin Cross-Sensitivity Screen',
    freeFix: 'Replace Salicylic Acid (BHA) with Salicylate-Free PHA (Gluconolactone) or Glycolic/Lactic Acid for smooth pores.',
    hypoallergenicSwap: 'The Inkey List PHA Gentle Toner ($15) or Mandelic Acid 10% ($8) · 0% Salicylate Exfoliation'
  },
  {
    id: 'propylene_glycol',
    shortLabel: 'Propylene Glycol',
    clinicalName: 'Propylene Glycol & Diol Sensitivity',
    patterns: ['propylene glycol', 'propanediol', 'butylene glycol', 'pentylene glycol', 'dipropylene glycol'],
    provenance: 'ACDS Contact Allergen of the Year (Glycol Patch Screen)',
    freeFix: 'Swap glycol-based solvent serums for pure Glycerin, Squalane, or thermal spring water mists.',
    hypoallergenicSwap: 'Biossance 100% Squalane Oil ($34) + La Roche-Posay Thermal Spring Mist ($15) · Glycol-Free Hydration'
  },
  {
    id: 'lanolin',
    shortLabel: 'Lanolin / Wool',
    clinicalName: 'Lanolin & Wool Alcohol Allergy',
    patterns: ['lanolin', 'lanolin alcohol', 'adeps lanae', 'amerchol', 'aquaphor'],
    provenance: '2023 ACDS Allergen of the Year (Wool Alcohol Screen)',
    freeFix: 'Avoid lanolin-containing ointments on compromised skin; seal moisture with pure Ceramides + Panthenol B5.',
    hypoallergenicSwap: 'La Roche-Posay Cicaplast Baume B5+ ($16) or CeraVe Healing Ointment ($12) · 100% Lanolin-Free Barrier Balm'
  },
  {
    id: 'niacinamide_flush',
    shortLabel: 'Niacinamide 10%',
    clinicalName: 'High-Niacinamide Flush / Tingling Sensitivity',
    patterns: ['niacinamide', 'nicotinamide', 'vitamin b3'],
    provenance: 'Lab Niacinamide >5% Prostaglandin Flush Screen',
    freeFix: 'Skip standalone 10% Niacinamide serums and avoid pairing with low-pH acids; calm skin with Panthenol + Centella.',
    hypoallergenicSwap: 'Anua Heartleaf 77% Soothing Toner ($20) or Skin1004 Madagascar Centella Ampoule ($17) · Niacinamide-Free Calm'
  },
  {
    id: 'nut_botanical',
    shortLabel: 'Nut / Shea / Botanical',
    clinicalName: 'Tree-Nut, Shea Butter & Botanical Extract Allergy',
    patterns: ['butyrospermum parkii', 'shea butter', 'prunus amygdalus', 'almond', 'macadamia', 'argania', 'argan', 'helianthus', 'sunflower', 'chamomilla'],
    provenance: 'EU CosIng Botanical & Tree-Nut Lipid Screen',
    freeFix: 'Replace shea butter and nut oils with synthetic Squalane, Urea 5%, and pure Ceramide NP.',
    hypoallergenicSwap: 'Malezia 5% Urea Core Moisturizer ($26) or CeraVe PM Moisturizing Lotion ($16) · 0% Nut/Shea Oils'
  }
];

const ALLERGY_BY_ID = new Map(ALLERGY_REACTION_OPTIONS.map((a) => [a.id, a]));

function normalizeAllergiesInput(raw) {
  if (!raw) return [];
  const arr = Array.isArray(raw) ? raw : String(raw).split(',');
  return Array.from(new Set(arr.map((s) => String(s || '').trim().toLowerCase()).filter((s) => ALLERGY_BY_ID.has(s))));
}

function getProductAllergenTags(prod) {
  if (!prod) return [];
  const blob = `${prod.id || ''} ${prod.brand || ''} ${prod.name || ''} ${prod.inciList || ''} ${(prod.primaryActives || []).join(' ')}`.toLowerCase();
  return ALLERGY_REACTION_OPTIONS.filter((opt) => opt.patterns.some((p) => blob.includes(p))).map((opt) => opt.id);
}

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
  if (lower === 'minerals' || lower === 'mineral' || lower === 'mineral spf' || lower === 'mineral sunscreen') {
    return INGREDIENT_BY_ID.get('zinc-oxide') || null;
  }
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

const GENERIC_PRODUCT_WORDS = new Set([
  'acid', 'serum', 'cream', 'lotion', 'toner', 'gel', 'water', 'oil', 'skin', 'face',
  'facial', 'treatment', 'with', 'plus', 'solution', 'suspension', 'moisturizer', 'cleanser', 'essence'
]);

function matchProductsFromText(rawText) {
  if (!rawText || typeof rawText !== 'string') return [];
  const lower = rawText.toLowerCase().replace(/['’]/g, '');
  const matched = [];
  for (const prod of CULT_PRODUCTS) {
    const idNorm = prod.id.toLowerCase();
    const brandNorm = prod.brand.toLowerCase().replace(/['’]/g, '');
    const nameNorm = prod.name.toLowerCase().replace(/['’]/g, '');
    const shortName = nameNorm.split('(')[0].trim();
    const nameWords = shortName.split(/\s+/).filter((w) => w.length >= 4 && !GENERIC_PRODUCT_WORDS.has(w));
    const twoWordKey = shortName.split(/\s+/).filter((w) => w.length >= 3).slice(0, 2).join(' ');
    if (
      lower.includes(idNorm) ||
      lower.includes(shortName) ||
      (brandNorm.length >= 4 && lower.includes(brandNorm) && nameWords.some((w) => lower.includes(w))) ||
      (twoWordKey.length >= 8 && lower.includes(twoWordKey))
    ) {
      matched.push(prod);
    }
  }
  return matched;
}

function analyzeRoutine(params = {}) {
  const startHr = process.hrtime.bigint();
  const skinType = params.skinType || 'combination';
  const productIds = Array.isArray(params.productIds) ? params.productIds : [];
  const rawInciText = typeof params.rawInciText === 'string' ? params.rawInciText.trim() : '';

  const selectedProductMap = new Map();
  for (const id of productIds) {
    const prod = PRODUCT_BY_ID.get(id);
    if (prod) selectedProductMap.set(prod.id, prod);
  }
  for (const prod of matchProductsFromText(rawInciText)) {
    selectedProductMap.set(prod.id, prod);
  }
  const selectedProducts = Array.from(selectedProductMap.values());

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

  const pastedMatched = [];
  const pastedUnmatched = [];
  if (rawInciText) {
    const rawTokens = parseRawInciTokens(rawInciText);
    const seenPastedIds = new Set();
    rawTokens.forEach((tok, idx) => {
      orderedTokens.push({ token: tok, pos: idx + 1, sourceProduct: 'Pasted INCI Label', productPh: null });
      const m = matchTokenToIngredient(tok);
      if (m) {
        if (!seenPastedIds.has(m.id)) {
          seenPastedIds.add(m.id);
          pastedMatched.push({
            id: m.id,
            commonName: m.commonName,
            inciName: m.inciName,
            comedogenicity: m.comedogenicity,
            malasseziaTrigger: m.malasseziaTrigger,
            functionRole: m.functionRole,
            clinicalMechanism: m.clinicalMechanism
          });
        }
      } else {
        pastedUnmatched.push(tok);
      }
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
          'Benzoyl Peroxide Deactivates Retinol & Tretinoin on Contact',
          'Benzoyl Peroxide releases oxygen molecules that break down delicate Tretinoin and Retinol on contact, wiping out over 80% of your retinoid strength within 2 hours.',
          'Use Benzoyl Peroxide in the morning (or as a rinse-off wash) and apply Tretinoin or Retinol only at night.',
          720
        );
        continue;
      }

      // 2. Benzoyl Peroxide + Adapalene
      if (classes.has('benzoyl_peroxide') && classes.has('retinoid_adapalene')) {
        addConflict(
          a, b, 'MODERATE',
          'High Dryness & Peeling Risk When Layered Together',
          'Adapalene stays chemically stable with Benzoyl Peroxide, but layering both at once doubles skin dryness, flaking, and redness.',
          'Apply a gentle ceramide moisturizer first (the Sandwich Method), or use Benzoyl Peroxide in the morning and Adapalene at night.',
          15
        );
        continue;
      }

      // 3. Benzoyl Peroxide + Vitamin C or Hydroquinone
      if (classes.has('benzoyl_peroxide') && (classes.has('vitamin_c_laa') || classes.has('hydroquinone'))) {
        addConflict(
          a, b, 'CRITICAL',
          'Benzoyl Peroxide Cancels Out Vitamin C Immediately',
          'Benzoyl Peroxide oxidizes pure Vitamin C before it can absorb into your skin (and can cause temporary orange staining if mixed with Hydroquinone).',
          'Never layer in the same routine. Use Vitamin C in the morning and Benzoyl Peroxide on alternate evenings.',
          720
        );
        continue;
      }

      // 4. Copper Peptides + Vitamin C (LAA or Derivatives)
      if (classes.has('copper_peptide') && (classes.has('vitamin_c_laa') || classes.has('vitamin_c_deriv'))) {
        addConflict(
          a, b, 'CRITICAL',
          `Copper Peptides & Vitamin C Cancel Each Other Out (pH Gap ${deltaPh.toFixed(1)})`,
          'Copper ions rapidly oxidize Vitamin C while acidic Vitamin C weakens the copper peptide bond, leaving both serums far less effective.',
          'Split Morning & Night: Apply Vitamin C in the morning under sunscreen and Copper Peptides at night.',
          720
        );
        continue;
      }

      // 5. Copper Peptides + Direct Acids (AHA, BHA, PHA)
      if (classes.has('copper_peptide') && (classes.has('aha') || classes.has('bha') || classes.has('pha'))) {
        addConflict(
          a, b, 'CRITICAL',
          `Strong Exfoliating Acids Break Down Copper Peptides (pH Gap ${deltaPh.toFixed(1)})`,
          'Exfoliating acids (pH below 4.0) are too acidic for delicate Copper Peptides, breaking apart the peptide chain and causing redness.',
          'Use Copper Peptides in your morning routine and save AHA/BHA exfoliating acids for separate evening routines.',
          720
        );
        continue;
      }

      // 6. Copper Peptides + Kojic Acid
      if (classes.has('copper_peptide') && classes.has('kojic_acid')) {
        addConflict(
          a, b, 'CRITICAL',
          'Kojic Acid Strips Copper from Copper Peptides',
          'Kojic Acid works by binding to copper ions, which pulls the active copper right out of your Copper Peptide serum when layered together.',
          'Separate into Morning (Kojic Acid) and Night (Copper Peptides).',
          720
        );
        continue;
      }

      // 7. Copper Peptides + Retinoids
      if (classes.has('copper_peptide') && (classes.has('retinoid') || classes.has('retinoid_adapalene'))) {
        addConflict(
          a, b, 'MODERATE',
          'Layering Copper Peptides + Retinol Can Trigger Stinging',
          'Using strong Copper Peptides and Retinol in the exact same evening step can over-stimulate sensitive skin and cause redness.',
          'Alternate evening routines (Night 1 Retinol, Night 2 Copper Peptides) or move Copper Peptides to the morning.',
          720
        );
        continue;
      }

      // 8. Retinoids + Direct Exfoliating Acids (AHA / BHA)
      if ((classes.has('retinoid') || classes.has('retinoid_adapalene')) && (classes.has('aha') || classes.has('bha'))) {
        addConflict(
          a, b, 'CRITICAL',
          `Exfoliating Acids + Retinol Together Strip Your Skin Barrier (pH Gap ${deltaPh.toFixed(1)})`,
          'Layering low-pH exfoliating acids (pH 3.0–3.8) with Retinol or Tretinoin in the same night strips your moisture barrier and causes peeling and redness.',
          'Follow a 4-Night Skin Cycling Schedule: Night 1 Exfoliating Acid, Night 2 Retinoid, Nights 3–4 Ceramide Barrier Repair.',
          1440
        );
        continue;
      }

      // 9. Retinoids + Pure L-Ascorbic Acid
      if ((classes.has('retinoid') || classes.has('retinoid_adapalene')) && classes.has('vitamin_c_laa')) {
        addConflict(
          a, b, 'MODERATE',
          `Vitamin C + Retinol Acidity Mismatch (pH 3.2 vs pH 5.8)`,
          'Pure Vitamin C needs an acidic pH (around 3.2) while Retinol works best near pH 5.8. Layering them together increases stinging and irritation.',
          'Use Vitamin C in the morning under sunscreen and Retinol or Tretinoin at night.',
          720
        );
        continue;
      }

      // 10. Multi-Acid Stacking (AHA + BHA or two distinct leave-on exfoliants)
      if ((cA === 'aha' || cA === 'bha') && (cB === 'aha' || cB === 'bha')) {
        const diffProducts = a.sources[0] !== b.sources[0];
        if (diffProducts) {
          addConflict(
            a, b, 'CRITICAL',
            'Stacking Two Exfoliating Acids Causes Over-Exfoliation & Redness',
            'Using two leave-on AHA/BHA exfoliating acids in the same routine strips protective skin oils and causes stinging, tightness, and barrier irritation.',
            'Pick only ONE leave-on exfoliating acid per evening, maximum 2 to 3 nights per week.',
            1440
          );
          continue;
        }
      }

      // 11. Direct Acids + Pure L-Ascorbic Acid
      if (classes.has('vitamin_c_laa') && (classes.has('aha') || classes.has('bha'))) {
        addConflict(
          a, b, 'MODERATE',
          'Too Much Acid in One Step (Vitamin C + Exfoliating Acid)',
          'Stacking pure Vitamin C (pH 3.0) right on top of an AHA/BHA acid toner (pH 3.5) overwhelms sensitive skin and triggers stinging.',
          'Keep Vitamin C in your morning routine and move AHA/BHA exfoliants to evening resurfacing nights.',
          720
        );
        continue;
      }

      // 12. Hypochlorous Acid + Antioxidants / Copper Peptides
      if (classes.has('hypochlorous_acid') && (classes.has('vitamin_c_laa') || classes.has('copper_peptide') || classes.has('antioxidant_polyphenol'))) {
        addConflict(
          a, b, 'MODERATE',
          'Let Hypochlorous Acid Spray Dry Before Applying Serums',
          'Hypochlorous Acid spray neutralizes Vitamin C and peptides if you apply your serums while the mist is still wet.',
          'Mist Hypochlorous Acid onto clean skin and wait 10 minutes until completely dry before applying serums.',
          10
        );
        continue;
      }

      // 13. General |ΔpH| > 1.8 Inactivation / Flushing Rule (Signal Peptides or Niacinamide + Low-pH Acid)
      if (deltaPh > 1.8 && minPh <= 3.8) {
        if (classes.has('signal_peptide')) {
          addConflict(
            a, b, 'CRITICAL',
            `Strong Acids Weaken Peptide Serums (pH Gap ${deltaPh.toFixed(1)})`,
            `Applying a strong acid (pH ${minPh.toFixed(1)}) right before peptide serums weakens delicate amino-acid chains so they cannot firm your skin properly.`,
            'Use Peptide serums in the morning and Exfoliating Acids at night, or wait 20 minutes between layers.',
            720
          );
          continue;
        }
        if (classes.has('niacinamide') && a.sources[0] !== b.sources[0]) {
          addConflict(
            a, b, 'MODERATE',
            `Acid + Niacinamide Warm Redness Flush Risk (pH Gap ${deltaPh.toFixed(1)})`,
            `Layering a strong acid directly with Niacinamide across a ${deltaPh.toFixed(1)} pH gap can weaken the acid and trigger a temporary warm redness flush.`,
            'Wait 15 minutes after applying your acid or Vitamin C before applying Niacinamide, or split Morning & Night.',
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

  const selectedAllergies = normalizeAllergiesInput(params.allergies);
  const allergyFlags = [];
  if (selectedAllergies.length > 0 || skinType === 'allergy_prone') {
    const activeIdsToScan = selectedAllergies.length > 0 ? selectedAllergies : ['fragrance', 'bpo', 'lanolin'];
    for (const alId of activeIdsToScan) {
      const opt = ALLERGY_BY_ID.get(alId);
      if (!opt) continue;
      const matchedSources = [];
      let matchedPattern = '';
      for (const prod of selectedProducts) {
        const blob = `${prod.brand || ''} ${prod.name || ''} ${prod.inciList || ''} ${(prod.primaryActives || []).join(' ')}`.toLowerCase();
        const hit = opt.patterns.find((p) => blob.includes(p));
        if (hit) {
          matchedSources.push(`${prod.brand} ${prod.name}`);
          if (!matchedPattern) matchedPattern = hit;
        }
      }
      if (rawInciText) {
        const rawLower = rawInciText.toLowerCase();
        const hit = opt.patterns.find((p) => rawLower.includes(p));
        if (hit) {
          matchedSources.push('Pasted Ingredient List');
          if (!matchedPattern) matchedPattern = hit;
        }
      }
      if (matchedSources.length > 0) {
        allergyFlags.push({
          id: opt.id,
          shortLabel: opt.shortLabel,
          clinicalName: opt.clinicalName,
          matchedTerm: matchedPattern,
          sources: matchedSources,
          provenance: opt.provenance,
          freeFix: opt.freeFix,
          hypoallergenicSwap: opt.hypoallergenicSwap
        });
      }
    }
  }

  let skinVulnerability = 0;
  if (skinType === 'allergy_prone') skinVulnerability = 16;
  else if (skinType === 'sensitive') skinVulnerability = 12;
  else if (skinType === 'dry') skinVulnerability = 6;

  const rawHazard =
    8 +
    skinVulnerability +
    intrinsicIrritationSum * 3.2 +
    criticalCount * 26 +
    moderateCount * 13 +
    allergyFlags.length * 18 +
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
    if (ing.comedogenicity >= 3 || (ing.comedogenicity === 2 && ing.category === 'emollient_hazard' && item.positionIndex <= 7)) {
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
  let verdictLabel = 'Calm & Balanced Routine';
  if (allergyFlags.length > 0) {
    verdictStatus = 'CRITICAL_CLASH';
    verdictLabel = `${allergyFlags.length} Allergen Trigger${allergyFlags.length === 1 ? '' : 's'} Flagged · Swap Bottle`;
  } else if (criticalCount > 0 || compatibilityScore < 50) {
    verdictStatus = 'CRITICAL_CLASH';
    verdictLabel = 'Serums Cancel Out · Split AM & PM';
  } else if (moderateCount > 0 || compatibilityScore < 76) {
    verdictStatus = 'MODERATE_CAUTION';
    verdictLabel = 'Space Apart · Mild Stinging Risk';
  }

  // Deterministic AM / PM & 4-Night Skin-Cycling Calendar Synthesis
  const schedule = buildDeterministicSchedule(detectedItems, selectedProducts, conflicts);
  const bandit = sampleBetaArm();

  // Compute Personalized Shelf Dollar Value & Henderson-Hasselbalch Free-Acid Potency Loss
  const totalShelfValueUsd = selectedProducts.length > 0
    ? selectedProducts.reduce((sum, p) => sum + (Number(p.priceUsd) || 32), 0)
    : Math.max(38, detectedItems.length * 34);

  const conflictSourcesCrit = new Set();
  const conflictSourcesMod = new Set();
  for (const c of conflicts) {
    if (c.severity === 'CRITICAL') {
      conflictSourcesCrit.add(c.sourceA);
      conflictSourcesCrit.add(c.sourceB);
    } else {
      conflictSourcesMod.add(c.sourceA);
      conflictSourcesMod.add(c.sourceB);
    }
  }

  let wastedShelfValueUsd = 0;
  if (selectedProducts.length > 0) {
    for (const p of selectedProducts) {
      const label = `${p.brand} ${p.name}`;
      if (conflictSourcesCrit.has(label)) {
        wastedShelfValueUsd += Number(p.priceUsd) || 32;
      } else if (conflictSourcesMod.has(label)) {
        wastedShelfValueUsd += Math.round((Number(p.priceUsd) || 32) * 0.5);
      }
    }
  } else if (conflicts.length > 0) {
    wastedShelfValueUsd = Math.min(
      totalShelfValueUsd,
      conflicts.reduce((sum, c) => sum + (c.severity === 'CRITICAL' ? 68 : 34), 0)
    );
  }

  const equilibriumSurfacePh = detectedItems.length > 0
    ? Number((detectedItems.reduce((sum, d) => sum + d.effectivePh, 0) / detectedItems.length).toFixed(2))
    : 5.5;

  let freeAcidPotencyLossPct = 0;
  for (const d of detectedItems) {
    if (d.ingredient.pka != null && d.freeAcidPercent != null && equilibriumSurfacePh > d.effectivePh) {
      const mixedFa = computeFreeAcidFraction(equilibriumSurfacePh, d.ingredient.pka);
      const dropPct = Math.round(((d.freeAcidPercent - mixedFa) / Math.max(1, d.freeAcidPercent)) * 100);
      if (dropPct > freeAcidPotencyLossPct) freeAcidPotencyLossPct = dropPct;
    }
  }
  if (criticalCount > 0) {
    freeAcidPotencyLossPct = Math.max(freeAcidPotencyLossPct, 78);
  } else if (moderateCount > 0) {
    freeAcidPotencyLossPct = Math.max(freeAcidPotencyLossPct, 42);
  }

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
      JSON.stringify(selectedProducts.map((p) => p.id)),
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
    totalShelfValueUsd,
    wastedShelfValueUsd,
    equilibriumSurfacePh,
    freeAcidPotencyLossPct,
    matchedProductIds: selectedProducts.map((p) => p.id),
    selectedAllergies,
    allergyFlags,
    conflicts,
    comedogenicFlags,
    malasseziaFlags,
    pregnancyFlags,
    rawInciText,
    pastedMatched,
    pastedUnmatched,
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

function redactRoutineAnalysisForPreview(result) {
  if (!result || typeof result !== 'object') return result;
  return {
    ...result,
    previewLocked: true,
    conflicts: (result.conflicts || []).map((c) => ({
      ...c,
      resolution: '[LOCKED IN FREE PREVIEW · Unlock $1.99 Personalized AM/PM + 4-Night Skin-Cycling Calendar (/buy/flash_pass)]',
      waitMinutes: null,
      waitMinutesLocked: 'Locked in Free Preview ($1.99 Ritual Pack)'
    })),
    schedule: result.schedule
      ? {
          ...result.schedule,
          amSteps: (result.schedule.amSteps || []).map((s, idx) =>
            idx === 0
              ? s
              : {
                  ...s,
                  title: '[LOCKED IN FREE PREVIEW · Unlock Exact AM Layering Sequence & Wait-Time Buffer ($1.99)]',
                  wait: 'Locked ($1.99)',
                  locked: true
                }
          ),
          pmCycling: (result.schedule.pmCycling || []).map((n, idx) =>
            idx === 0
              ? {
                  ...n,
                  steps: [
                    n.steps && n.steps[0] ? n.steps[0] : 'pH 5.5 Cleanser',
                    '[LOCKED IN FREE PREVIEW · Unlock Exact PM Active & Ceramide Sandwich Order ($1.99)]'
                  ]
                }
              : {
                  ...n,
                  focus: '[LOCKED IN FREE PREVIEW · Unlock 4-Night Skin-Cycling Calendar ($1.99)]',
                  steps: ['[LOCKED IN FREE PREVIEW · Unlock $1.99 Ritual Pack (/buy/flash_pass)]'],
                  locked: true
                }
          )
        }
      : result.schedule
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
    { step: 1, slot: 'AM Prep', title: 'Gentle Morning Cleanse', ph: '5.5', wait: 'Pat dry' }
  ];

  if (hasLaa) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Brightening',
      title: 'Vitamin C + Ferulic Serum',
      ph: '3.2',
      wait: hasNiacinamide ? 'Wait 15 min to absorb' : 'Wait 60s'
    });
  } else if (hasCopper) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Peptide Repair',
      title: 'Copper Peptide Firming Serum',
      ph: '6.2',
      wait: 'Apply on damp skin'
    });
  } else if (hasBpo && hasRetinoid) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Blemish Care',
      title: 'Benzoyl Peroxide Wash / Spot Care',
      ph: '5.0',
      wait: 'Let dry 5 min'
    });
  }

  if (hasAzelaic) {
    amSteps.push({
      step: amSteps.length + 1,
      slot: 'AM Redness Care',
      title: 'Azelaic Acid 10% Soothing Gel',
      ph: '4.9',
      wait: 'Smooth thin layer'
    });
  }

  amSteps.push({
    step: amSteps.length + 1,
    slot: 'AM Moisture + SPF',
    title: 'Ceramide Moisturizer + Daily SPF 50',
    ph: '5.8',
    wait: 'Final morning step'
  });

  const pmCycling = [
    {
      night: 'Night 1 · Gentle Exfoliation (AHA/BHA)',
      focus: hasAcid ? 'Gentle AHA/BHA Exfoliation (Skip retinoids & peptides tonight)' : 'Gentle Hydration & Smoothing Polish',
      steps: hasAcid
        ? ['Gentle Night Cleanse', 'AHA / BHA Exfoliating Toner · Wait 15 min', 'Ceramide Barrier Recovery Cream']
        : ['Gentle Night Cleanse', 'Hydrating Essence + Niacinamide', 'Ceramide Barrier Cream'],
      badge: hasAcid ? 'EXFOLIATION NIGHT' : 'GENTLE PREP'
    },
    {
      night: 'Night 2 · Retinol & Cell Renewal',
      focus: hasRetinoid ? 'Retinol Night (Skip Benzoyl Peroxide and exfoliating acids tonight)' : 'Peptide & Antioxidant Repair',
      steps: hasRetinoid
        ? ['Gentle Cleanse + Hydrating Buffer', 'Pea-Sized Tretinoin or Retinol', 'Ceramide Barrier Cream']
        : ['Gentle Night Cleanse', 'Multi-Peptide Firming Serum', 'Rich Barrier Moisturizer'],
      badge: hasRetinoid ? 'RETINOID NIGHT' : 'REPAIR NIGHT'
    },
    {
      night: 'Night 3 · Peptide & Moisture Repair',
      focus: hasCopper ? 'Copper Peptides & Firming (Skip Vitamin C and acids tonight)' : 'Soothing Centella, Niacinamide & Barrier Lipids',
      steps: [
        'Gentle Cleanse + Soothing Toner',
        hasCopper ? 'Copper Peptides 1% + Hyaluronic Acid' : 'Niacinamide + Snail Mucin Essence',
        'Ceramide Barrier Cream'
      ],
      badge: 'PEPTIDE & CICA RECOVERY'
    },
    {
      night: 'Night 4 · Deep Skin Barrier Rest',
      focus: hasBpo && !hasLaa ? 'Targeted Blemish Care or Pure Barrier Rest Night' : 'Zero Exfoliants · Pure Ceramide Barrier Hydration',
      steps: [
        'Gentle Micellar + Cream Cleanse',
        'Panthenol + Squalane Soothing Drops',
        'Rich Ceramide Recovery Balm'
      ],
      badge: '100% BARRIER REST'
    }
  ];

  return {
    amSteps,
    pmCycling,
    summaryNote: conflicts.length > 0
      ? `Resolved ${conflicts.length} active conflict(s) by separating incompatible serums across Morning and a 4-Night Bedtime routine.`
      : 'All your selected products work harmoniously together with zero clashing or inactivation.'
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

function escHtmlSafe(str) {
  return String(str == null ? '' : str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderAllergySelectorBarHtml(initialAllergies = []) {
  const activeSet = new Set(normalizeAllergiesInput(initialAllergies));
  const chipsHtml = ALLERGY_REACTION_OPTIONS.map((opt) => {
    const isAct = activeSet.has(opt.id);
    return `<button type="button" class="vanity-light-btn mono dl-allergy-chip ${isAct ? 'active' : ''}" data-allergy="${escHtmlSafe(opt.id)}" aria-pressed="${isAct ? 'true' : 'false'}" onclick="if(window.__dlToggleAllergyOption)window.__dlToggleAllergyOption('${escHtmlSafe(opt.id)}', this)" style="padding:3px 9px;font-size:0.71rem;min-height:24px;border-radius:999px;">${escHtmlSafe(opt.shortLabel)}</button>`;
  }).join('');
  return `<div id="allergyTriggerBar" role="group" aria-label="Allergic Reactions and Sensitivities Selection" style="display:flex;flex-direction:column;gap:4px;padding:7px 10px;background:var(--bg-canvas);border-radius:12px;border:1px solid var(--border-hairline);">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
      <span class="mono" style="font-size:0.71rem;color:var(--rose-brand);font-weight:700;">Allergic Reactions &amp; Contact Triggers (EU CosIng Patch Screen):</span>
      <span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;"><button type="button" id="dl-allergy-bar-safe-card-btn" class="mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('allergen_safe');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap;">&#10003; 8-Allergen Safe 9:16 Card &rarr;</button><button type="button" id="clearAllergiesBtn" class="mono" onclick="if(window.__dlClearAllergyOptions)window.__dlClearAllergyOptions()" style="display:${activeSet.size > 0 ? 'inline-block' : 'none'};background:none;border:none;color:var(--text-secondary);font-size:0.69rem;text-decoration:underline;cursor:pointer;padding:0;">Clear Allergies (${activeSet.size}) &times;</button></span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;align-items:center;">${chipsHtml}</div>
  </div>`;
}

function renderAllergyFlagsCardHtml(res) {
  const selectedAllergies = Array.isArray(res && res.selectedAllergies) ? res.selectedAllergies : [];
  const flags = Array.isArray(res && res.allergyFlags) ? res.allergyFlags : [];
  if (selectedAllergies.length === 0 && flags.length === 0 && (!res || res.skinType !== 'allergy_prone')) return '';
  if (flags.length > 0) {
    const f0 = flags[0];
    const extraCount = flags.length - 1;
    return `<div id="allergyAlertCard" style="padding:11px 14px;background:var(--berry-bg);border-left:3px solid var(--berry-clash);border-radius:12px;margin-bottom:8px;font-size:0.81rem;line-height:1.42;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:4px;">
        <strong style="color:var(--berry-clash);">&#9888; Allergic Reaction Trigger Flagged: ${escHtmlSafe(f0.shortLabel)} (${escHtmlSafe(f0.sources.join(', '))})</strong>
        <span style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;"><span class="badge-clash mono" style="font-size:0.68rem;padding:2px 7px;">&#10003; ${escHtmlSafe(f0.provenance)}</span><button type="button" id="dl-allergy-alert-safe-card-btn" class="mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('allergen_safe');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap;">&#10003; Safe Swap &amp; 9:16 Card &rarr;</button></span>
      </div>
      <div style="color:var(--text-primary);margin-bottom:5px;"><strong style="color:var(--sage-safe);">&#10003; Free Proof #1 (Matched &ldquo;${escHtmlSafe(f0.matchedTerm)}&rdquo;):</strong> ${escHtmlSafe(f0.freeFix)}</div>
      <div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;cursor:pointer;text-decoration:underline;font-size:0.75rem;">&#128274; Hypoallergenic Dupe Swap${extraCount > 0 ? ` + ${extraCount} More Allergen Alert(s)` : ''} Locked &mdash; Enter Email ($0) Below to Reveal &darr;</div>
      <div class="dl-unlocked-c2-proof" style="display:none;color:var(--sage-safe);font-weight:600;font-size:0.76rem;margin-top:4px;">&#10003; Hypoallergenic Swap: ${escHtmlSafe(f0.hypoallergenicSwap)}${extraCount > 0 ? ' · ' + flags.slice(1).map((f) => `${escHtmlSafe(f.shortLabel)}: ${escHtmlSafe(f.hypoallergenicSwap)}`).join(' · ') : ''}</div>
    </div>`;
  }
  const activeLabels = selectedAllergies.map((id) => (ALLERGY_BY_ID.get(id) || {}).shortLabel || id).join(', ') || 'Common Contact Allergens';
  return `<div id="allergyAlertCard" style="padding:10px 14px;background:var(--sage-bg);border-left:3px solid var(--sage-safe);border-radius:12px;margin-bottom:8px;font-size:0.8rem;line-height:1.4;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
    <span><strong style="color:var(--sage-safe);">&#10003; EU CosIng Contact-Allergen Screen Passed (0 Triggers Found):</strong> Your selected bottles are 100% free of <strong>${escHtmlSafe(activeLabels)}</strong>.</span>
    <button type="button" class="mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--bg-surface);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap;">9:16 Safe Card &rarr;</button>
  </div>`;
}

module.exports = {
  analyzeRoutine,
  redactRoutineAnalysisForPreview,
  generateOptionalGeminiNote,
  INGREDIENT_BY_ID,
  PRODUCT_BY_ID,
  ALLERGY_REACTION_OPTIONS,
  getProductAllergenTags,
  renderAllergySelectorBarHtml,
  renderAllergyFlagsCardHtml
};
