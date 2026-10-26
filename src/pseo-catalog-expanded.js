/**
 * DermLogic (#4): Programmatic SEO Expanded Catalog
 * High-Intent Clinical Active Combos & Cult INCI/pH Pages
 * Specifically optimized for queries ranking in Google Search Console:
 * "how to use tranexamic acid and tretinoin together", "finacea ph", "aestura inci", "salicylic acid and azelaic acid"
 */

const EXPANDED_PAIR_SEEDS = [
  {
    slug: 'how-to-use-tranexamic-acid-and-tretinoin-together',
    title: 'How to Use Tranexamic Acid and Tretinoin Together: Melasma & Barrier Protocol',
    category: 'Active Pair Matrix',
    activeA: 'tranexamic-acid', activeB: 'tretinoin',
    verdict: 'SYNERGISTIC_COMPATIBLE',
    compatibilityScore: 94,
    deltaPh: 0.8,
    conflictType: 'Zero Chemical Conflict; Dual-Pathway Plasmin & Keratinocyte Regulation',
    summary: 'Tranexamic Acid (pH 5.5–6.5) and Tretinoin (pH 5.0–6.0) work synergistically without chemical degradation. Tranexamic acid blocks UV-induced plasminogen activation to inhibit melanogenesis, while tretinoin accelerates cellular turnover to disperse existing hyperpigmentation.',
    amRule: 'Apply 3–5% Tranexamic Acid serum in the morning on cleansed skin, followed by ceramide moisturizer and broad-spectrum SPF 50+.',
    pmRule: 'In the evening, apply Tranexamic Acid first, wait 5 minutes until fully absorbed, then apply pea-sized Tretinoin. Sensitive barrier: buffer with moisturizer first.',
    waitTimeMinutes: 5,
    presetProducts: ['naturium-tranexamic-5', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'how-to-use-salicylic-acid-and-azelaic-acid-together',
    title: 'How to Use Salicylic Acid (BHA) and Azelaic Acid Together: Acne & Rosacea Protocol',
    category: 'Active Pair Matrix',
    activeA: 'salicylic-acid', activeB: 'azelaic-acid',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 68,
    deltaPh: 1.6,
    conflictType: 'Lipophilic Pore Clearing vs Keratolytic Anti-Inflammatory Load',
    summary: 'Salicylic Acid requires pH 3.0 to 3.8 for optimal lipophilic pore penetration, while Azelaic Acid stabilizes at pH 4.5 to 5.2. Layering them simultaneously can trigger severe stinging, erythema, and barrier stripping.',
    amRule: 'Apply 15% to 20% Azelaic Acid in the AM to suppress rosacea erythema and scavenge free radicals under mineral sunscreen.',
    pmRule: 'Use 2% Salicylic Acid (BHA) 2 to 3 nights per week in the PM for sebum dissolution. Do not layer on the same night as high-strength retinoids.',
    waitTimeMinutes: 15,
    presetProducts: ['paulas-choice-2-bha', 'finacea-15-azelaic', 'dieux-instant-angel']
  },
  {
    slug: 'azelaic-acid-and-vitamin-c-layering-guide',
    title: 'Azelaic Acid and Vitamin C Layering Guide: PIH, Erythema & Antioxidant Order',
    category: 'Active Pair Matrix',
    activeA: 'azelaic-acid', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT',
    compatibilityScore: 82,
    deltaPh: 1.5,
    conflictType: 'Thin-to-Thick Formulation Viscosity & Sequential pH Absorption',
    summary: 'Pure L-Ascorbic Acid (pH 2.8 to 3.2) and Azelaic Acid (pH 4.5 to 5.0) are highly complementary for post-inflammatory erythema (PIE) and stubborn melasma. Apply the lower pH active (Vitamin C) first.',
    amRule: 'Apply Vitamin C serum to clean dry skin, wait 10 minutes for stratum corneum equilibration, then apply Azelaic Acid gel/cream followed by SPF 50.',
    pmRule: 'Or split routines: Vitamin C in the morning, Azelaic Acid in the evening for zero risk of flaking or pilling.',
    waitTimeMinutes: 10,
    presetProducts: ['skinceuticals-ce-ferulic', 'finacea-15-azelaic', 'cerave-pm-lotion']
  },
  {
    slug: 'can-you-mix-tretinoin-and-azelaic-acid',
    title: 'Can You Mix Tretinoin and Azelaic Acid? Dermatologist Pairing Rules & pH Timing',
    category: 'Active Pair Matrix',
    activeA: 'tretinoin', activeB: 'azelaic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT',
    compatibilityScore: 88,
    deltaPh: 0.7,
    conflictType: 'Compounded Keratolysis; Requires Controlled Barrier Hydration',
    summary: 'Tretinoin and Azelaic Acid are frequently co-prescribed by dermatologists for severe acne and rosacea. While chemically stable together, combined irritation is high during the first 4 weeks.',
    amRule: 'Use Azelaic Acid 15% in the morning under moisturizer and broad-spectrum sunscreen.',
    pmRule: 'Use Tretinoin 0.025% to 0.05% at night. Advanced users can layer Azelaic Acid directly over Tretinoin once tolerance is established.',
    waitTimeMinutes: 15,
    presetProducts: ['rx-tretinoin-005', 'finacea-15-azelaic', 'aestura-atobarrier-365']
  },
  {
    slug: 'niacinamide-and-l-ascorbic-acid-flush-myth-vs-fact',
    title: 'Niacinamide and L-Ascorbic Acid: The Hydrolysis Flush Myth vs Clinical Facts',
    category: 'Active Pair Matrix',
    activeA: 'niacinamide', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT',
    compatibilityScore: 78,
    deltaPh: 2.8,
    conflictType: 'Reversible Hydrogen-Bonded Complex Formation at Ambient Temperatures',
    summary: 'Old 1960s literature claimed Niacinamide and Vitamin C form nicotinic acid causing facial flushing. At physiological temperatures, conversion requires sustained high heat (>120C for hours). However, pH difference still warrants sequential layering.',
    amRule: 'Apply L-Ascorbic Acid (pH 2.8 to 3.2) first, wait 5 minutes, then layer Niacinamide (pH 5.5 to 6.5) to rebuild ceramides.',
    pmRule: 'In PM, Niacinamide pairs safely with all retinoids, peptides, and barrier repair lipids.',
    waitTimeMinutes: 5,
    presetProducts: ['skinceuticals-ce-ferulic', 'to-niacinamide-10-zinc', 'cerave-pm-lotion']
  },
  {
    slug: 'glycolic-acid-and-retinol-conflict-recovery',
    title: 'Glycolic Acid (AHA) and Retinol Conflict: Acid Mantle Barrier Breakdown',
    category: 'Active Pair Matrix',
    activeA: 'glycolic-acid', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 36,
    deltaPh: 2.5,
    conflictType: 'Corneocyte Desquamation Overload & Severe TEWL Elevation',
    summary: 'Never apply Glycolic Acid (pH 3.0 to 3.6) and Retinol (pH 5.5 to 6.5) simultaneously. Layering causes excessive desquamation, micro-fissuring of the lipid matrix, and delayed irritation peaking 48 hours later.',
    amRule: 'Neither should be used unprotected in AM. Use barrier-repair ceramides and SPF 50+.',
    pmRule: 'Skin-cycle: Night 1 Glycolic Acid exfoliation, Night 2 Retinol cellular turnover, Nights 3 and 4 Rest and recovery with ceramides.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-glycolic-acid-7', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'benzoyl-peroxide-and-salicylic-acid-stacking-rules',
    title: 'Benzoyl Peroxide and Salicylic Acid Stacking: Pore Clearing vs Barrier Peeling',
    category: 'Active Pair Matrix',
    activeA: 'benzoyl-peroxide', activeB: 'salicylic-acid',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 48,
    deltaPh: 2.0,
    conflictType: 'Lipid Solvent + Free-Radical Oxidation Cumulative Barrier Trauma',
    summary: 'Salicylic Acid exfoliates inside the sebaceous follicle while Benzoyl Peroxide generates reactive oxygen species to kill Cutibacterium acnes. Layering both leave-on products induces severe contact dermatitis.',
    amRule: 'Use 2.5% Benzoyl Peroxide wash in the morning shower (rinse off after 2 minutes) to prevent bleaching and irritation.',
    pmRule: 'Use 2% Salicylic Acid leave-on treatment 2 to 3 times weekly at night.',
    waitTimeMinutes: 720,
    presetProducts: ['paulas-choice-2-bha', 'panoxyl-10-bpo-wash', 'cerave-pm-lotion']
  },
  {
    slug: 'how-to-use-lactic-acid-and-retinol-together',
    title: 'How to Use Lactic Acid and Retinol: Gentle AHA Hydration vs Retinization',
    category: 'Active Pair Matrix',
    activeA: 'lactic-acid', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 54,
    deltaPh: 2.2,
    conflictType: 'Accelerated Stratum Corneum Thinning & Photosensitivity',
    summary: 'Lactic acid acts as both a chemical exfoliant and a natural moisturizing factor (NMF) humectant at pH 3.6 to 4.0. Layering it under retinol disrupts retinoid receptor binding and causes burning.',
    amRule: 'Avoid active AHA/retinoids in AM. Focus on barrier hydration and SPF 50.',
    pmRule: 'Alternate nights: Lactic acid 10% on Monday/Thursday, Retinol on Tuesday/Friday/Sunday, Ceramide repair on rest nights.',
    waitTimeMinutes: 1440,
    presetProducts: ['sunday-riley-good-genes', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'vitamin-c-and-hypochlorous-acid',
    title: 'Vitamin C and Hypochlorous Acid Together: Oxidation Trap & Wait-Time Rule',
    category: 'Active Pair Matrix',
    activeA: 'l-ascorbic-acid', activeB: 'hypochlorous-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 28,
    deltaPh: 1.9,
    conflictType: 'HOCl Oxidative Neutralization of L-Ascorbic Acid Antioxidant Capacity',
    summary: 'Hypochlorous Acid (HOCl, Tower 28 SOS Spray) is a potent antimicrobial oxidizer, whereas L-Ascorbic Acid (Vitamin C) is an electron-donating antioxidant. Spraying Hypochlorous Acid onto damp Vitamin C oxidizes and deactivates both actives on contact.',
    amRule: 'Mist Hypochlorous Acid on clean skin first, wait 5 to 10 minutes until 100% bone-dry, and only then apply Vitamin C serum under SPF 50.',
    pmRule: 'Or use Vitamin C in your morning routine and save Hypochlorous Acid spray for post-workout or evening redness relief.',
    waitTimeMinutes: 10,
    presetProducts: ['tower28-sos-spray', 'skinceuticals-ce-ferulic', 'cerave-pm-lotion']
  },
  {
    slug: 'pha-and-vitamin-c-together',
    title: 'PHA (Gluconolactone) and Vitamin C Together: Gentle Exfoliation & Glow Guide',
    category: 'Active Pair Matrix',
    activeA: 'gluconolactone', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT',
    compatibilityScore: 81,
    deltaPh: 0.7,
    conflictType: 'Large-Dalton Polyhydroxy Acid Humectancy + Low-pH Ascorbate',
    summary: 'Gluconolactone (PHA, 178 Da) has a larger molecular size than Glycolic Acid, exfoliating only the uppermost surface while acting as a water-binding humectant. It pairs well with Vitamin C when given 60 seconds to absorb.',
    amRule: 'Apply Vitamin C serum first on clean dry skin, wait 60 seconds, then pat PHA toner or serum before moisturizer and SPF 50.',
    pmRule: 'Use PHA toner in the evening for gentle surface smoothing without sensitizing your moisture barrier.',
    waitTimeMinutes: 2,
    presetProducts: ['glow-recipe-pha-bha-toner', 'skinceuticals-ce-ferulic', 'dieux-instant-angel']
  },
  {
    slug: 'can-i-mix-ferulic-acid-with-retinol',
    title: 'Can You Mix Ferulic Acid With Retinol? Antioxidant & Night Renewal Pairing',
    category: 'Active Pair Matrix',
    activeA: 'ferulic-acid', activeB: 'retinol',
    verdict: 'COMPATIBLE_WITH_WAIT',
    compatibilityScore: 76,
    deltaPh: 2.3,
    conflictType: 'Low-pH Ferulic Serum Vehicle vs Neutral-pH Retinoid Emulsion',
    summary: 'Ferulic Acid itself is a soothing plant antioxidant that reduces retinoid oxidative stress, but most Ferulic Acid serums are formulated with 15% L-Ascorbic Acid at pH 3.2. Separate low-pH Vitamin C + Ferulic serums to the morning and use Retinol at bedtime.',
    amRule: 'Wear Vitamin C + Ferulic Acid in the morning under broad-spectrum SPF 50 to multiply UV photoprotection.',
    pmRule: 'Apply Retinol at night over dry, ceramide-cushioned skin.',
    waitTimeMinutes: 720,
    presetProducts: ['skinceuticals-ce-ferulic', 'medik8-crystal-retinal-6', 'aestura-atobarrier-365']
  },
  {
    slug: 'can-i-use-tranexamic-acid-with-retinol',
    title: 'Can You Use Tranexamic Acid With Retinol? Dark Spot & Melasma Night Routine',
    category: 'Active Pair Matrix',
    activeA: 'tranexamic-acid', activeB: 'retinol',
    verdict: 'SYNERGISTIC_COMPATIBLE',
    compatibilityScore: 95,
    deltaPh: 0.2,
    conflictType: 'Dual-Pathway Melanin Transfer & Plasminogen Inhibition at Neutral pH',
    summary: 'Tranexamic Acid (pH 5.5 to 6.2) and Retinol (pH 5.5 to 6.2) share the exact same biocompatible pH window and work together to fade dark spots, melasma, and post-blemish marks without extra stinging.',
    amRule: 'Apply Tranexamic Acid serum in the morning under moisturizer and SPF 50+.',
    pmRule: 'Apply watery Tranexamic Acid serum first at night, let it settle for 60 seconds, then smooth on Retinol and barrier cream.',
    waitTimeMinutes: 1,
    presetProducts: ['naturium-tranexamic-5', 'medik8-crystal-retinal-6', 'dieux-instant-angel']
  },
  {
    slug: 'is-alpha-arbutin-better-than-vitamin-c',
    title: 'Alpha Arbutin and Vitamin C: Can You Layer Both for Faster Brightening?',
    category: 'Active Pair Matrix',
    activeA: 'alpha-arbutin', activeB: 'l-ascorbic-acid',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 91,
    deltaPh: 2.1,
    conflictType: 'Dual Tyrosinase Inhibition + Reactive Oxygen Scavenging',
    summary: 'Alpha Arbutin and Vitamin C complement each other rather than compete: Vitamin C neutralizes UV free radicals and brightens existing pigment, while Alpha Arbutin gently blocks tyrosinase from producing new dark spots.',
    amRule: 'Apply low-pH Vitamin C first on clean dry skin, wait 60 seconds, then layer Alpha Arbutin serum and finish with SPF 50.',
    pmRule: 'Apply Alpha Arbutin in the evening alongside Niacinamide or Tranexamic Acid for round-the-clock pigment control.',
    waitTimeMinutes: 2,
    presetProducts: ['skinceuticals-ce-ferulic', 'topicals-faded-serum', 'boj-relief-sun-spf50']
  },
  {
    slug: 'differin-and-bha-salicylic-acid',
    title: 'Differin (Adapalene) and Salicylic Acid (BHA): Acne Clearing Without Peeling',
    category: 'Active Pair Matrix',
    activeA: 'adapalene', activeB: 'salicylic-acid',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 49,
    deltaPh: 2.0,
    conflictType: 'Compounded Follicular Keratolysis & Retinoid Desquamation',
    summary: 'Combining Differin 0.1% Gel (Adapalene) and 2% Salicylic Acid (BHA) in the same evening strips intercellular lipids and triggers redness and peeling around the nose and chin. Alternate nights or keep BHA to the morning.',
    amRule: 'Use a gentle cleanser (or 2% BHA toner 2 mornings per week) followed by lightweight oil-free moisturizer and SPF 46+.',
    pmRule: 'Apply a pea-sized drop of Differin 0.1% Gel over a thin buffer of ceramide moisturizer at bedtime.',
    waitTimeMinutes: 720,
    presetProducts: ['differin-adapalene-01', 'paulas-choice-2-bha', 'cerave-pm-lotion']
  }
];

const EXPANDED_PRODUCT_SEEDS = [
  {
    slug: 'finacea-15-gel-ph-and-inci-breakdown',
    title: 'Finacea 15% Azelaic Acid Foam & Gel: pH 4.8 Spec, Full INCI & Tretinoin Guide',
    productId: 'finacea-15-azelaic',
    brand: 'LEO Pharma',
    name: 'Finacea 15% Azelaic Acid Foam',
    ph: 4.8,
    priceUsd: 65,
    inciList: 'Azelaic Acid 15%, Benzoic Acid, Cetostearyl Emulsifying Wax, Dimethyl Isosorbide, Methylparaben, Polysorbate 80, Propylene Glycol, Purified Water, Sodium Hydroxide, Xanthan Gum',
    conflictHighlights: 'Finacea pH 4.8 is optimized for active azelaic acid delivery. Do not layer directly with Copper Peptides in the same step. Pairs cleanly with Tretinoin, Tranexamic Acid, and Niacinamide.',
    companionProductIds: ['rx-tretinoin-005', 'skinceuticals-ce-ferulic', 'aestura-atobarrier-365']
  },
  {
    slug: 'aestura-atobarrier-365-cream-inci-and-ph-analysis',
    title: 'Aestura Atobarrier 365 Cream INCI & pH: 3:1:1 Ceramide Tretinoin Sandwich Guide',
    productId: 'aestura-atobarrier-365',
    brand: 'Aestura',
    name: 'Atobarrier 365 Cream',
    ph: 5.5,
    priceUsd: 32,
    inciList: 'Water, Glycerin, Butylene Glycol, Butylene Glycol Dicaprylate/Dicaprate, Pentaerythrityl Tetraisostearate, Cyclopentasiloxane, Squalane, Cetyl Ethylhexanoate, Behenyl Emulsifier, Stearic Acid, Hydroxypropyl Bispalmitamide MEA (Ceramide NP), Cholesterol, Palmitic Acid, Allantoin, Panthenol',
    conflictHighlights: 'Aestura Atobarrier 365 is formulated at skin-neutral pH 5.5 with DermaON 3:1:1 Ceramide:Cholesterol:Fatty Acid capsules. Zero active chemical conflicts. Ideal buffering base for Tretinoin, Adapalene, and exfoliating acids.',
    companionProductIds: ['rx-tretinoin-005', 'finacea-15-azelaic', 'paulas-choice-2-bha']
  },
  {
    slug: 'skinoren-20-cream-ph-and-layering-protocol',
    title: 'Skinoren 20% Azelaic Acid Cream: pH 4.8 Spec & Acne Treatment Routine',
    productId: 'finacea-15-azelaic',
    brand: 'Bayer / Intendis',
    name: 'Skinoren 20% Cream',
    ph: 4.8,
    priceUsd: 39,
    inciList: 'Azelaic Acid 200mg/g (20%), Arlatone 983S (PEG-5 Glyceryl Stearate), Cutina CBS, Cetearyl Octanoate, Propylene Glycol, Glycerol 85%, Benzoic Acid, Purified Water',
    conflictHighlights: 'Skinoren 20% has a rich lipid emulsion at pH 4.8. Higher strength than 15% gels, producing a brief initial warmth. Do not layer with Benzoyl Peroxide or Glycolic Acid in the same application.',
    companionProductIds: ['rx-tretinoin-005', 'aestura-atobarrier-365', 'cerave-pm-lotion']
  },
  {
    slug: 'differin-01-gel-ph-and-active-compatibility',
    title: 'Differin 0.1% Adapalene Gel: pH 5.5 Spec, INCI & BHA/BPO Layering Guide',
    productId: 'differin-adapalene-01',
    brand: 'Differin',
    name: 'Adapalene Gel 0.1% Acne Treatment',
    ph: 5.5,
    priceUsd: 16,
    inciList: 'Adapalene 0.1%, Carbomer 940, Edetate Disodium, Methylparaben, Poloxamer 182, Propylene Glycol, Purified Water, Sodium Hydroxide',
    conflictHighlights: 'Adapalene is a third-generation retinoid stable against light and oxidative degradation. It can be used alongside Benzoyl Peroxide, but should not be layered with leave-on Glycolic or Salicylic acid on fragile skin.',
    companionProductIds: ['panoxyl-10-bpo-wash', 'aestura-atobarrier-365', 'paulas-choice-2-bha']
  }
];

function buildCombinatorialPairSeeds(ingredientsMap, seenPairKeys, seenSlugs, cleanIngName) {
  const heroIds = [
    'l-ascorbic-acid', 'tretinoin', 'retinol', 'retinaldehyde', 'adapalene',
    'copper-tripeptide-1', 'glycolic-acid', 'lactic-acid', 'mandelic-acid',
    'salicylic-acid', 'gluconolactone', 'niacinamide', 'azelaic-acid',
    'tranexamic-acid', 'alpha-arbutin', 'benzoyl-peroxide', 'hypochlorous-acid',
    'hyaluronic-acid', 'ceramide-np', 'centella-asiatica'
  ];
  const generated = [];
  for (let i = 0; i < heroIds.length; i++) {
    for (let j = i + 1; j < heroIds.length; j++) {
      const idA = heroIds[i], idB = heroIds[j];
      const pairKey = [idA, idB].sort().join('::');
      if (seenPairKeys.has(pairKey)) continue;
      const ingA = ingredientsMap.get(idA), ingB = ingredientsMap.get(idB);
      if (!ingA || !ingB) continue;
      const slug = `${idA}-and-${idB}-layering-guide`;
      if (seenSlugs.has(slug)) continue;
      seenPairKeys.add(pairKey);
      seenSlugs.add(slug);

      const midA = (Number(ingA.phMin) + Number(ingA.phMax)) / 2;
      const midB = (Number(ingB.phMin) + Number(ingB.phMax)) / 2;
      const deltaPh = Number(Math.abs(midA - midB).toFixed(1));
      const clsA = String(ingA.activeClass || ''), clsB = String(ingB.activeClass || '');
      const isStrongA = clsA.includes('retinoid') || clsA.includes('aha') || clsA.includes('bha') || clsA === 'benzoyl_peroxide' || clsA === 'vitamin_c_laa' || idA === 'hypochlorous-acid';
      const isStrongB = clsB.includes('retinoid') || clsB.includes('aha') || clsB.includes('bha') || clsB === 'benzoyl_peroxide' || clsB === 'vitamin_c_laa' || idB === 'hypochlorous-acid';
      const isSoothing = (c) => c.includes('humectant') || c.includes('barrier') || c.includes('soothing') || c === 'niacinamide' || c === 'tranexamic' || c === 'arbutin';

      let verdict = 'SAFE_SYNERGY', compatibilityScore = 92, waitTimeMinutes = 1;
      let conflictType = 'Biocompatible pH & Complementary Barrier Support';

      if ((idA === 'hypochlorous-acid' || idB === 'hypochlorous-acid') && (clsA.includes('vitamin_c') || clsB.includes('vitamin_c') || clsA.includes('retinoid') || clsB.includes('retinoid') || clsA.includes('peptide') || clsB.includes('peptide'))) {
        verdict = 'COMPATIBLE_WITH_WAIT'; compatibilityScore = 62; waitTimeMinutes = 10;
        conflictType = 'Hypochlorous Oxidation Window: Allow Mist to Dry 100% First';
      } else if ((clsA === 'benzoyl_peroxide' || clsB === 'benzoyl_peroxide') && (clsA.includes('retinoid') || clsB.includes('retinoid') || clsA.includes('vitamin_c') || clsB.includes('vitamin_c'))) {
        verdict = 'CRITICAL_CLASH'; compatibilityScore = 24; waitTimeMinutes = 720;
        conflictType = 'Peroxide Free-Radical Oxidation & Active Deactivation';
      } else if ((clsA.includes('peptide') || clsB.includes('peptide')) && (deltaPh >= 1.8 || clsA.includes('aha') || clsB.includes('aha') || clsA.includes('bha') || clsB.includes('bha'))) {
        verdict = 'CRITICAL_CLASH'; compatibilityScore = 29; waitTimeMinutes = 720;
        conflictType = 'Low-pH Peptide Chelation & Amide Bond Stress';
      } else if (isStrongA && isStrongB && !isSoothing(clsA) && !isSoothing(clsB)) {
        verdict = 'SPLIT_AM_PM'; compatibilityScore = deltaPh >= 1.5 ? 46 : 58; waitTimeMinutes = 720;
        conflictType = 'Compounded Keratolytic & Barrier Turnover Load';
      } else if (deltaPh >= 1.6) {
        verdict = 'COMPATIBLE_WITH_WAIT'; compatibilityScore = 76; waitTimeMinutes = 5;
        conflictType = 'Sequential pH Equilibration Window (Apply Lower pH First)';
      }

      const nameA = cleanIngName(ingA.commonName), nameB = cleanIngName(ingB.commonName);
      generated.push({
        slug, title: `Can You Layer ${nameA} and ${nameB}? Routine Order & pH Guide`,
        category: 'Active Pair Matrix', activeA: idA, activeB: idB, verdict, compatibilityScore, deltaPh, conflictType,
        summary: `Clinical pH comparison for ${nameA} (pH ${ingA.phMin} to ${ingA.phMax}) and ${nameB} (pH ${ingB.phMin} to ${ingB.phMax}) with a pH difference of ${deltaPh}.`,
        amRule: `In the morning, apply watery antioxidant or hydrating layers first on clean skin and finish with broad-spectrum SPF 50.`,
        pmRule: waitTimeMinutes >= 720 ? `Alternate nights or separate ${nameA} and ${nameB} between morning and evening routines, cushioning with ceramide moisturizer.` : `Apply the lighter, lower-pH formula first, wait ${waitTimeMinutes} minute(s) to absorb, then smooth on the second step.`,
        waitTimeMinutes, presetProducts: ['skinceuticals-ce-ferulic', 'rx-tretinoin-005', 'aestura-atobarrier-365']
      });
    }
  }
  return generated;
}

function appendIngredientGuidePages({ ingredientsMap, seenSlugs, pages, sanitizeBannedTerms, cleanIngName, formatMetaDescription }) {
  for (const [ingId, ing] of ingredientsMap.entries()) {
    const safeId = sanitizeBannedTerms(ingId);
    const ingSlug = `${safeId}-ph-inci-layering-guide`;
    if (seenSlugs.has(ingSlug)) continue;
    seenSlugs.add(ingSlug);
    const safeCommon = sanitizeBannedTerms(cleanIngName(ing.commonName));
    const safeInci = sanitizeBannedTerms(ing.inciName);
    const companionIng = ingredientsMap.get(ingId === 'niacinamide' ? 'hyaluronic-acid' : 'niacinamide');
    const isLowPh = Number(ing.phMin) < 4.0, isRetinoid = String(ing.activeClass || '').includes('retinoid');
    const summaryText = sanitizeBannedTerms(`${safeCommon} (${safeInci}) is formulated at pH ${ing.phMin} to ${ing.phMax} (${ing.molecularWeightDa} Da, pore-clog score ${ing.comedogenicity}/5). ${ing.clinicalMechanism}`);
    pages.push({
      slug: ingSlug, pageType: 'ingredient_guide',
      title: `${safeCommon}: pH ${ing.phMin} to ${ing.phMax}, Pore-Safety & Skincare Layering Guide`,
      metaDescription: formatMetaDescription(summaryText, 155), category: 'Ingredient Fact Sheet',
      verdict: isLowPh ? 'LOW_PH_ACTIVE' : (isRetinoid ? 'SPLIT_AM_PM' : 'SAFE_SYNERGY'),
      compatibilityScore: ing.comedogenicity >= 3 ? 58 : (isLowPh || isRetinoid ? 74 : 94),
      deltaPh: Number(Math.abs(5.5 - (Number(ing.phMin) + Number(ing.phMax)) / 2).toFixed(1)),
      conflictType: sanitizeBannedTerms(`${ing.functionRole || ing.category} · pH ${ing.phMin} to ${ing.phMax} · ${ing.molecularWeightDa} Da`),
      summary: summaryText, labConflictType: sanitizeBannedTerms(`${safeInci} (pKa ${ing.pka != null ? ing.pka : 'Neutral'}, ${ing.molecularWeightDa} Da)`),
      labSummary: summaryText,
      amRule: isRetinoid ? `Reserve ${safeCommon} for your evening routine and wear broad-spectrum SPF 50 every morning.` : `Apply ${safeCommon} in order of texture weight (water-light before creams) and seal with broad-spectrum SPF 50 in daylight.`,
      pmRule: `In your evening routine, pair ${safeCommon} with ceramide barrier moisture and avoid stacking multiple low-pH exfoliants on the same night.`,
      waitTimeMinutes: isLowPh ? 5 : 1, ingredientA: ing, ingredientB: companionIng || null,
      comparisonIngredients: [ing, companionIng].filter(Boolean), product: null,
      presetProducts: ['skinceuticals-ce-ferulic', 'cerave-pm-lotion', 'aestura-atobarrier-365'],
      faqs: [
        { q: `What is the optimal pH and molecular weight of ${safeCommon}?`, a: `${safeCommon} (${safeInci}) operates at pH ${ing.phMin} to ${ing.phMax} with a molecular size of ${ing.molecularWeightDa} Daltons${ing.pka != null ? ` and pKa ${ing.pka}` : ''}.` },
        { q: `Does ${safeCommon} clog pores or trigger fungal acne (Malassezia)?`, a: `${safeCommon} has an EU CosIng comedogenicity rating of ${ing.comedogenicity}/5 and is ${ing.malasseziaTrigger ? 'flagged as a potential Malassezia (fungal acne) lipid trigger' : '100% Malassezia (fungal-acne) safe'}.` },
        { q: `Can I use ${safeCommon} every day in my skincare routine?`, a: summaryText }
      ]
    });
  }
}

module.exports = {
  EXPANDED_PAIR_SEEDS,
  EXPANDED_PRODUCT_SEEDS,
  buildCombinatorialPairSeeds,
  appendIngredientGuidePages
};
