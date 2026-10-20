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
    presetProducts: ['skinceuticals-discoloration-defense', 'rx-tretinoin-005', 'aestura-atobarrier-cream']
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
    summary: 'Salicylic Acid requires pH 3.0–3.8 for optimal lipophilic pore penetration, while Azelaic Acid stabilizes at pH 4.5–5.2. Layering them simultaneously can trigger severe stinging, erythema, and barrier stripping.',
    amRule: 'Apply 15%–20% Azelaic Acid in the AM to suppress rosacea erythema and scavenge free radicals under mineral sunscreen.',
    pmRule: 'Use 2% Salicylic Acid (BHA) 2–3 nights per week in the PM for sebum dissolution. Do not layer on the same night as high-strength retinoids.',
    waitTimeMinutes: 15,
    presetProducts: ['paulas-choice-bha-2', 'finacea-15-gel', 'dieux-instant-angel']
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
    summary: 'Pure L-Ascorbic Acid (pH 2.8–3.2) and Azelaic Acid (pH 4.5–5.0) are highly complementary for post-inflammatory erythema (PIE) and stubborn melasma. Apply the lower pH active (Vitamin C) first.',
    amRule: 'Apply Vitamin C serum to clean dry skin, wait 10 minutes for stratum corneum equilibration, then apply Azelaic Acid gel/cream followed by SPF 50.',
    pmRule: 'Or split routines: Vitamin C in the morning, Azelaic Acid in the evening for zero risk of flaking or piling.',
    waitTimeMinutes: 10,
    presetProducts: ['skinceuticals-ce-ferulic', 'finacea-15-gel', 'cerave-pm-lotion']
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
    pmRule: 'Use Tretinoin 0.025%–0.05% at night. Advanced users can layer Azelaic Acid directly over Tretinoin once tolerance is established.',
    waitTimeMinutes: 15,
    presetProducts: ['rx-tretinoin-005', 'finacea-15-gel', 'aestura-atobarrier-cream']
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
    summary: 'Old 1960s literature claimed Niacinamide and Vitamin C form nicotinic acid causing facial flushing. At physiological temperatures, conversion requires sustained high heat (>120°C for hours). However, ΔpH difference still warrants sequential layering.',
    amRule: 'Apply L-Ascorbic Acid (pH 2.8–3.2) first, wait 5 minutes, then layer Niacinamide (pH 5.5–6.5) to rebuild ceramides.',
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
    summary: 'Never apply Glycolic Acid (pH 3.0–3.6) and Retinol (pH 5.5–6.5) simultaneously. Layering causes excessive desquamation, micro-fissuring of the lipid matrix, and delayed irritation peaking 48 hours later.',
    amRule: 'Neither should be used unprotected in AM. Use barrier-repair ceramides and SPF 50+.',
    pmRule: 'Skin-cycle: Night 1 Glycolic Acid exfoliation, Night 2 Retinol cellular turnover, Nights 3–4 Rest and recovery with ceramides.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-glycolic-7-toner', 'rx-tretinoin-005', 'dieux-instant-angel']
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
    pmRule: 'Use 2% Salicylic Acid leave-on treatment 2–3 times weekly at night.',
    waitTimeMinutes: 720,
    presetProducts: ['paulas-choice-bha-2', 'panoxyl-4-creamy-wash', 'cerave-pm-lotion']
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
    summary: 'Lactic acid acts as both a chemical exfoliant and a natural moisturizing factor (NMF) humectant at pH 3.6–4.0. Layering it under retinol disrupts retinoid receptor binding and causes burning.',
    amRule: 'Avoid active AHA/retinoids in AM. Focus on barrier hydration and SPF 50.',
    pmRule: 'Alternate nights: Lactic acid 10% on Monday/Thursday, Retinol on Tuesday/Friday/Sunday, Ceramide repair on rest nights.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-lactic-acid-10', 'rx-tretinoin-005', 'dieux-instant-angel']
  }
];

const EXPANDED_PRODUCT_SEEDS = [
  {
    slug: 'finacea-15-gel-ph-and-inci-breakdown',
    title: 'Finacea 15% Azelaic Acid Gel: pH 4.5 Spec, Full INCI & Tretinoin Compatibility',
    productId: 'finacea-15-gel',
    brand: 'LEO Pharma',
    name: 'Finacea 15% Azelaic Acid Gel',
    ph: 4.5,
    priceUsd: 48,
    inciList: 'Azelaic Acid 150mg/g (15%), Benzoic Acid, Carbomer 980, Disodium Edetate, Lecithin, Polysorbate 80, Propylene Glycol, Purified Water, Sodium Hydroxide, Triglycerides (Medium Chain)',
    conflictHighlights: 'Finacea pH 4.5 is optimized for active azelaic acid stability. Do not layer directly with Copper Peptides or high-pH mineral cleansers (pH >7.5). Safe with Tretinoin, Tranexamic Acid, and Niacinamide.',
    companionProductIds: ['rx-tretinoin-005', 'skinceuticals-ce-ferulic', 'aestura-atobarrier-cream']
  },
  {
    slug: 'aestura-atobarrier-365-cream-inci-and-ph-analysis',
    title: 'Aestura Atobarrier 365 Cream INCI & pH: 3:1:1 Ceramide Tretinoin Sandwich Guide',
    productId: 'aestura-atobarrier-cream',
    brand: 'Aestura',
    name: 'Atobarrier 365 Cream',
    ph: 5.5,
    priceUsd: 31,
    inciList: 'Water, Butylene Glycol, Glycerin, Squalane, Pentaerythrityl Tetraisostearate, Cyclopentasiloxane, Polyglyceryl-3 Methylglucose Distearate, Hydroxypropyl Bispalmitamide MEA (Ceramide PC-104), Stearic Acid, Cholesterol, Phytosphingosine, Dimethiconol, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Glyceryl Caprylate, Ethylhexylglycerin, Disodium EDTA',
    conflictHighlights: 'Aestura Atobarrier 365 is formulated at biological skin pH 5.5 with DermaON patented 3:1:1 Ceramide:Cholesterol:Fatty Acid capsules. Zero active chemical conflicts. Ideal buffering base for Tretinoin, Tazarotene, and high-strength AHAs.',
    companionProductIds: ['rx-tretinoin-005', 'finacea-15-gel', 'paulas-choice-bha-2']
  },
  {
    slug: 'skinoren-20-cream-ph-and-layering-protocol',
    title: 'Skinoren 20% Azelaic Acid Cream: pH 4.8 Spec & Acne Treatment Routine',
    productId: 'skinoren-20-cream',
    brand: 'Bayer / Intendis',
    name: 'Skinoren 20% Cream',
    ph: 4.8,
    priceUsd: 39,
    inciList: 'Azelaic Acid 200mg/g (20%), Arlatone 983S (PEG-5 Glyceryl Stearate), Cutina CBS, Cetearyl Octanoate, Propylene Glycol, Glycerol 85%, Benzoic Acid, Purified Water',
    conflictHighlights: 'Skinoren 20% has a rich lipid emulsion at pH 4.8. Higher strength than Finacea (20% vs 15%), producing higher initial tingling. Do not layer with Benzoyl Peroxide or Glycolic Acid in the same application.',
    companionProductIds: ['rx-tretinoin-005', 'aestura-atobarrier-cream', 'cerave-pm-lotion']
  },
  {
    slug: 'differin-01-gel-ph-and-active-compatibility',
    title: 'Differin 0.1% Adapalene Gel: pH 5.0 Spec, INCI & BHA/BPO Layering Guide',
    productId: 'differin-01-gel',
    brand: 'Galderma',
    name: 'Differin 0.1% Adapalene Gel',
    ph: 5.0,
    priceUsd: 16,
    inciList: 'Adapalene 0.1%, Carbomer 940, Edetate Disodium, Methylparaben, Poloxamer 182, Propylene Glycol, Purified Water, Sodium Hydroxide',
    conflictHighlights: 'Adapalene is a third-generation synthetic naphthoic acid retinoid stable against light and oxidative degradation (unlike tretinoin). It can be used alongside Benzoyl Peroxide, but should NOT be layered with leave-on Glycolic or Salicylic acid on fragile skin.',
    companionProductIds: ['panoxyl-4-creamy-wash', 'aestura-atobarrier-cream', 'paulas-choice-bha-2']
  }
];

module.exports = {
  EXPANDED_PAIR_SEEDS,
  EXPANDED_PRODUCT_SEEDS
};
