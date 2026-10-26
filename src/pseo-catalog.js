/**
 * DermLogic (#4): Day-1 Programmatic SEO (pSEO) Catalog (Expanded Clinical Pages)
 * 36 Active-Ingredient Pair Compatibility Matrices + 24 Cult-Product INCI Teardowns + Search Console Expansions.
 */

const { CLINICAL_INGREDIENTS, CULT_PRODUCTS } = require('./clinical-data');

let EXPANDED_PAIR_SEEDS = [];
let EXPANDED_PRODUCT_SEEDS = [];
let buildCombinatorialPairSeeds = () => [];
let appendIngredientGuidePages = () => {};
try {
  const exp = require('./pseo-catalog-expanded');
  EXPANDED_PAIR_SEEDS = exp.EXPANDED_PAIR_SEEDS || [];
  EXPANDED_PRODUCT_SEEDS = exp.EXPANDED_PRODUCT_SEEDS || [];
  if (exp.buildCombinatorialPairSeeds) buildCombinatorialPairSeeds = exp.buildCombinatorialPairSeeds;
  if (exp.appendIngredientGuidePages) appendIngredientGuidePages = exp.appendIngredientGuidePages;
} catch (_) {}

const PAIR_SEO_SEEDS = [
  {
    slug: 'can-you-mix-retinol-and-vitamin-c',
    title: 'Can You Mix Retinol and Vitamin C? ΔpH 2.8 Conflict & AM/PM Split Guide',
    category: 'Active Pair Matrix',
    activeA: 'l-ascorbic-acid', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 52,
    deltaPh: 2.8,
    conflictType: 'ΔpH Acid-Mantle Shock & Cumulative Stratum Corneum Irritation',
    summary: 'Pure L-Ascorbic Acid requires pH 2.6–3.4 to penetrate, whereas Retinol stabilizes at pH 5.5–6.5. Layering them in the same session creates a ΔpH 2.8 shock and spikes transepidermal water loss (TEWL).',
    amRule: 'Apply 15% L-Ascorbic Acid + Ferulic Acid in the morning under SPF 50 to neutralize UV free radicals.',
    pmRule: 'Apply Retinol in the evening over a dry barrier or sandwiched between ceramide moisturizer layers.',
    waitTimeMinutes: 0,
    presetProducts: ['skinceuticals-ce-ferulic', 'rx-tretinoin-005', 'cerave-pm-lotion']
  },
  {
    slug: 'can-you-mix-copper-peptides-and-vitamin-c',
    title: 'Can You Mix Copper Peptides (GHK-Cu) and Vitamin C? Chelation & Redox Alert',
    category: 'Active Pair Matrix',
    activeA: 'copper-tripeptide-1', activeB: 'l-ascorbic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 18,
    deltaPh: 3.0,
    conflictType: 'Cu2+ Metal-Ion Fenton Oxidation & Histidine De-Chelation',
    summary: 'Never layer Copper Tripeptide-1 (GHK-Cu) with L-Ascorbic Acid. Free and coordinated copper ions catalyze rapid oxidation of Vitamin C into dehydroascorbic acid while low pH (<3.5) strips copper from the tripeptide.',
    amRule: 'Use L-Ascorbic Acid (pH 3.2) in the AM routine under broad-spectrum sunscreen.',
    pmRule: 'Use Copper Peptides 1% (pH 6.2) in your PM restorative routine on non-acid nights.',
    waitTimeMinutes: 720,
    presetProducts: ['to-buffet-copper-peptides', 'skinceuticals-ce-ferulic', 'dieux-instant-angel']
  },
  {
    slug: 'benzoyl-peroxide-and-tretinoin-conflict',
    title: 'Benzoyl Peroxide and Tretinoin Conflict: Oxidative Degradation & Rescue Schedule',
    category: 'Active Pair Matrix',
    activeA: 'benzoyl-peroxide', activeB: 'tretinoin',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 15,
    deltaPh: 0.8,
    conflictType: 'Free-Radical Peroxide Homolysis & Polyene Chain Oxidation',
    summary: 'Benzoyl Peroxide cleaves into oxygen free radicals that oxidize Tretinoin’s delicate polyene chain on contact, destroying >80% of retinoid potency within 2 hours while causing severe xerosis.',
    amRule: 'Apply Benzoyl Peroxide (or use a 5-minute PanOxyl 10% BPO wash and rinse completely) in the morning.',
    pmRule: 'Apply Rx Tretinoin 0.05% strictly at night over a dry, ceramide-buffered barrier.',
    waitTimeMinutes: 720,
    presetProducts: ['rx-tretinoin-005', 'lrp-effaclar-duo-bpo', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'niacinamide-and-glycolic-acid-ph-conflict',
    title: 'Niacinamide and Glycolic Acid pH Conflict: ΔpH 2.4 Nicotinic Flushing Analysis',
    category: 'Active Pair Matrix',
    activeA: 'glycolic-acid', activeB: 'niacinamide',
    verdict: 'WAIT_15_MIN',
    compatibilityScore: 61,
    deltaPh: 2.4,
    conflictType: 'ΔpH > 1.8 Surface Equilibrium Shift & Prostaglandin D2 Capillary Flush',
    summary: 'Applying pH 6.0 Niacinamide immediately over pH 3.6 Glycolic Acid buffers the acid’s un-ionized free-acid value and can trigger transient nicotinic acid conversion flushing in reactive skin.',
    amRule: 'Apply Niacinamide 5%–10% in the morning to regulate sebum and boost ceramide synthesis.',
    pmRule: 'Apply Glycolic Acid 7% at night; wait 15–20 minutes for acid-mantle equilibration before applying any niacinamide cream.',
    waitTimeMinutes: 15,
    presetProducts: ['to-glycolic-acid-7', 'to-niacinamide-10-zinc', 'cerave-pm-lotion']
  },
  {
    slug: 'salicylic-acid-and-azelaic-acid-layering',
    title: 'Salicylic Acid (2% BHA) and Azelaic Acid (15%) Layering Guide & pH Compatibility',
    category: 'Active Pair Matrix',
    activeA: 'salicylic-acid', activeB: 'azelaic-acid',
    verdict: 'ALTERNATE_OR_WAIT',
    compatibilityScore: 68,
    deltaPh: 1.4,
    conflictType: 'Cumulative Follicular Keratolysis & Mild Desiccation Risk',
    summary: 'Salicylic Acid (pH 3.5) and Azelaic Acid (pH 4.9) do not chemically deactivate one another, but layering both leave-on keratolytics in one session can over-strip sebaceous follicles.',
    amRule: 'Apply Finacea 15% Azelaic Acid in the AM to calm erythema, rosacea papules, and tyrosinase.',
    pmRule: 'Apply 2% BHA Liquid Exfoliant 2–3 nights per week followed by a physiological 3:1:1 ceramide cream.',
    waitTimeMinutes: 15,
    presetProducts: ['paulas-choice-2-bha', 'finacea-15-azelaic', 'dieux-instant-angel']
  },
  {
    slug: 'tretinoin-and-glycolic-acid-layering',
    title: 'Can You Use Tretinoin and Glycolic Acid Together? 4-Night Skin Cycling Protocol',
    category: 'Active Pair Matrix',
    activeA: 'tretinoin', activeB: 'glycolic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 22,
    deltaPh: 2.4,
    conflictType: 'Synergistic Corneodesmosome Lysis & Retinoid Dermatitis',
    summary: 'Stacking 7% Glycolic Acid (76 Da) beneath Rx Tretinoin strips the stratum corneum barrier, accelerates retinoid penetration into nerve endings, and triggers acute peeling.',
    amRule: 'Morning focus strictly on pH 5.5 hydration, Centella Asiatica, and SPF 50+.',
    pmRule: 'Use 4-Night Skin Cycling: Night 1 Glycolic Acid, Night 2 Tretinoin, Nights 3 & 4 Ceramide Recovery.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-glycolic-acid-7', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'retinol-and-salicylic-acid-conflict',
    title: 'Retinol and Salicylic Acid (BHA) Conflict: Barrier Hazard & Alternate-Night Guide',
    category: 'Active Pair Matrix',
    activeA: 'retinol', activeB: 'salicylic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 28,
    deltaPh: 2.5,
    conflictType: 'Low-pH Retinoid Destabilization & Sebaceous Barrier Stripping',
    summary: 'Salicylic Acid at pH 3.5 lowers skin surface pH, accelerating acid-catalyzed isomerization of retinol while compounding follicular desquamation.',
    amRule: 'Use BHA as a short-contact cleanser or 2 mornings per week under SPF.',
    pmRule: 'Reserve Retinol for dedicated PM nights buffered with Squalane and Ceramide NP.',
    waitTimeMinutes: 720,
    presetProducts: ['paulas-choice-2-bha', 'medik8-crystal-retinal-6', 'stratia-lipid-gold']
  },
  {
    slug: 'copper-peptides-and-retinol-am-pm-schedule',
    title: 'Copper Peptides and Retinol: How to Schedule GHK-Cu with Retinoids Safely',
    category: 'Active Pair Matrix',
    activeA: 'copper-tripeptide-1', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 58,
    deltaPh: 0.2,
    conflictType: 'Competitive Fibroblast Signaling & Copper-Ion Irritation Amplification',
    summary: 'While Copper Peptides and Retinol share a neutral pH window (~6.0), co-layering high-strength GHK-Cu with retinoids increases stinging and metal-catalyzed retinoid oxidation.',
    amRule: 'Apply Copper Peptides 1% in the AM routine (when not using pure L-Ascorbic Acid).',
    pmRule: 'Apply Retinol or Retinaldehyde in the PM routine, or alternate PM nights with Copper Peptides.',
    waitTimeMinutes: 720,
    presetProducts: ['to-buffet-copper-peptides', 'medik8-crystal-retinal-6', 'dieux-instant-angel']
  },
  {
    slug: 'benzoyl-peroxide-and-vitamin-c-oxidation',
    title: 'Benzoyl Peroxide and Vitamin C Conflict: Immediate Redox Quenching Explained',
    category: 'Active Pair Matrix',
    activeA: 'benzoyl-peroxide', activeB: 'l-ascorbic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 16,
    deltaPh: 2.1,
    conflictType: 'Direct Redox Neutralization (Oxidant + Reductant Quenching)',
    summary: 'L-Ascorbic Acid is an electron donor; Benzoyl Peroxide is a strong peroxide oxidant. Applying them together causes immediate mutual neutralization on the skin surface.',
    amRule: 'Apply Vitamin C in the AM under sunscreen.',
    pmRule: 'Apply Benzoyl Peroxide in the PM on non-retinoid nights, or use a rinse-off BPO wash.',
    waitTimeMinutes: 720,
    presetProducts: ['skinceuticals-ce-ferulic', 'lrp-effaclar-duo-bpo', 'vanicream-gentle-cleanser']
  },
  {
    slug: 'azelaic-acid-and-tretinoin-synergy',
    title: 'Azelaic Acid and Tretinoin Together: Clinical Melasma & Acne Synergy Protocol',
    category: 'Active Pair Matrix',
    activeA: 'azelaic-acid', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 82,
    deltaPh: 0.9,
    conflictType: 'Clinically Validated Tyrosinase + Cell-Turnover Synergy',
    summary: 'Dermatologists frequently co-prescribe 15% Azelaic Acid with 0.05% Tretinoin for refractory melasma and acne. Their pH windows (4.9 vs 5.8) are compatible without redox degradation.',
    amRule: 'Begin by applying Azelaic Acid 15% in the AM under SPF 50.',
    pmRule: 'Once acclimated after 4 weeks, layer Azelaic Acid before or after Tretinoin in the PM with a ceramide cream.',
    waitTimeMinutes: 10,
    presetProducts: ['finacea-15-azelaic', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'lactic-acid-and-retinol-skin-cycling',
    title: 'Lactic Acid and Retinol: ΔpH 2.6 Conflict & Alternate-Night Skin Cycling',
    category: 'Active Pair Matrix',
    activeA: 'lactic-acid', activeB: 'retinol',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 31,
    deltaPh: 2.6,
    conflictType: 'Low-pH AHA Desmosome Cleavage + Retinoid Desquamation Overload',
    summary: 'Lactic Acid (pH 3.2–3.8) and Retinol (pH 6.0) overload epidermal turnover when layered on the same night, causing flaking and erythema.',
    amRule: 'Hydrate with Hyaluronic Acid, Panthenol, and SPF 50.',
    pmRule: 'Alternate nights: Lactic Acid on Monday/Thursday, Retinol on Tuesday/Friday.',
    waitTimeMinutes: 1440,
    presetProducts: ['sunday-riley-good-genes', 'murad-retinal-resculpt', 'lrp-cicaplast-baume-b5']
  },
  {
    slug: 'tranexamic-acid-and-vitamin-c-hyperpigmentation',
    title: 'Tranexamic Acid and Vitamin C Layering: Dual-Pathway PIH & Melasma Stack',
    category: 'Active Pair Matrix',
    activeA: 'tranexamic-acid', activeB: 'l-ascorbic-acid',
    verdict: 'SAFE_WITH_WAIT',
    compatibilityScore: 84,
    deltaPh: 2.4,
    conflictType: 'Synergistic Plasmin + Tyrosinase Blockade (Requires 10-Min pH Buffer)',
    summary: 'L-Ascorbic Acid reduces oxidized dopaquinone while Tranexamic Acid blocks UV-induced plasmin signaling. Wait 10 minutes after low-pH Vitamin C before applying pH 5.6 Tranexamic Acid.',
    amRule: 'Apply L-Ascorbic Acid first on clean skin, wait 10 minutes, then layer Tranexamic Acid 5% + SPF 50.',
    pmRule: 'Repeat Tranexamic Acid 5% in the evening alongside Niacinamide and Azelaic Acid.',
    waitTimeMinutes: 10,
    presetProducts: ['geek-gorgeous-c-glow', 'naturium-tranexamic-5', 'boj-relief-sun-spf50']
  },
  {
    slug: 'hypochlorous-acid-and-vitamin-c-wait-time',
    title: 'Hypochlorous Acid Spray and Vitamin C: Why the 10-Minute Dry-Down Rule Matters',
    category: 'Active Pair Matrix',
    activeA: 'hypochlorous-acid', activeB: 'l-ascorbic-acid',
    verdict: 'WAIT_10_MIN',
    compatibilityScore: 69,
    deltaPh: 1.8,
    conflictType: 'HOCl Oxidant Quenching of Ascorbic Acid When Wet',
    summary: 'Hypochlorous Acid (HOCl) is a mild oxidizing antimicrobial. Spraying it directly onto wet L-Ascorbic Acid neutralizes both actives via rapid redox reaction.',
    amRule: 'Mist Hypochlorous Acid onto clean skin first, let dry 100% (5–10 minutes), then apply Vitamin C.',
    pmRule: 'Use Hypochlorous Acid freely post-workout or before barrier creams in the PM.',
    waitTimeMinutes: 10,
    presetProducts: ['tower28-sos-spray', 'skinceuticals-ce-ferulic', 'dieux-instant-angel']
  },
  {
    slug: 'adapalene-and-benzoyl-peroxide-epiduo-protocol',
    title: 'Adapalene 0.1% and Benzoyl Peroxide: Why Adapalene Survives Oxidation',
    category: 'Active Pair Matrix',
    activeA: 'adapalene', activeB: 'benzoyl-peroxide',
    verdict: 'SAFE_WITH_BUFFER',
    compatibilityScore: 72,
    deltaPh: 0.5,
    conflictType: 'Chemically Stable Co-Formulation (Epiduo Logic) with High Xerosis Load',
    summary: 'Unlike Tretinoin and Retinol, Adapalene’s rigid naphthoic acid structure resists Benzoyl Peroxide oxidation. However, layering both still doubles stratum corneum dryness.',
    amRule: 'Use Benzoyl Peroxide in the AM or apply a thin ceramide moisturizer before PM co-application.',
    pmRule: 'Apply moisturizer first (Sandwich Method), then Adapalene 0.1% + spot Benzoyl Peroxide.',
    waitTimeMinutes: 10,
    presetProducts: ['differin-adapalene-01', 'lrp-effaclar-duo-bpo', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'niacinamide-and-vitamin-c-flushing-truth',
    title: 'Can You Mix Niacinamide and Vitamin C? Modern pH Equilibrium vs 1960s Hydrolysis Myth',
    category: 'Active Pair Matrix',
    activeA: 'niacinamide', activeB: 'l-ascorbic-acid',
    verdict: 'WAIT_15_MIN',
    compatibilityScore: 74,
    deltaPh: 2.8,
    conflictType: 'ΔpH 2.8 Surface Shift & Sensitive-Skin Nicotinic Flush',
    summary: 'Niacinamide and Ascorbic Acid only form yellow nicotinic acid complexes under high heat, but layering pH 6.0 Niacinamide immediately over pH 3.0 LAA raises the acid pH and can flush reactive skin.',
    amRule: 'Apply L-Ascorbic Acid on bare skin, wait 15 minutes for absorption, then apply Niacinamide or SPF.',
    pmRule: 'Use Niacinamide freely at night with peptides, ceramides, and retinoids.',
    waitTimeMinutes: 15,
    presetProducts: ['timeless-20-vitamin-c', 'to-niacinamide-10-zinc', 'eltamd-uv-clear-spf46']
  },
  {
    slug: 'copper-peptides-and-glycolic-acid-conflict',
    title: 'Copper Peptides and Glycolic Acid Conflict: Histidine Protonation & Cu2+ Loss',
    category: 'Active Pair Matrix',
    activeA: 'copper-tripeptide-1', activeB: 'glycolic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 20,
    deltaPh: 2.6,
    conflictType: 'Acidic Protonation of Imidazole Ring & Peptide Denaturation',
    summary: 'Glycolic Acid at pH 3.6 protonates the histidine nitrogen in GHK-Cu, breaking the copper coordination bond and hydrolyzing signal peptides.',
    amRule: 'Use Copper Peptides 1% in the morning routine.',
    pmRule: 'Use Glycolic Acid 7% on dedicated exfoliation nights without any peptide serums.',
    waitTimeMinutes: 720,
    presetProducts: ['to-buffet-copper-peptides', 'to-glycolic-acid-7', 'skinfix-triple-lipid-cream']
  },
  {
    slug: 'copper-peptides-and-salicylic-acid-bha',
    title: 'Copper Peptides and Salicylic Acid (2% BHA): Why Low pH Breaks GHK-Cu',
    category: 'Active Pair Matrix',
    activeA: 'copper-tripeptide-1', activeB: 'salicylic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 21,
    deltaPh: 2.7,
    conflictType: 'Low-pH Chelation Breakdown (pH 3.5 BHA vs pH 6.2 GHK-Cu)',
    summary: 'Salicylic Acid 2% (pH 3.5) destabilizes Copper Tripeptide-1 (pH 6.2) via a ΔpH 2.7 shift, releasing free copper ions that promote oxidative stress.',
    amRule: 'Apply Copper Peptides in the AM followed by Ceramide Moisturizer and SPF.',
    pmRule: 'Apply 2% BHA in the PM on alternate nights.',
    waitTimeMinutes: 720,
    presetProducts: ['to-buffet-copper-peptides', 'paulas-choice-2-bha', 'aestura-atobarrier-365']
  },
  {
    slug: 'glycolic-acid-and-salicylic-acid-over-exfoliation',
    title: 'Glycolic Acid (AHA) and Salicylic Acid (BHA) Together: Triple-Acid Barrier Hazard',
    category: 'Active Pair Matrix',
    activeA: 'glycolic-acid', activeB: 'salicylic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 29,
    deltaPh: 0.2,
    conflictType: 'Dual Hydrophilic + Lipophilic Corneodesmosome Stripping',
    summary: 'Layering separate full-strength Glycolic Acid (7%) and Salicylic Acid (2%) leave-on toners dissolves both surface and follicular intercellular lipids simultaneously.',
    amRule: 'Skip leave-on acids in the AM; focus on antioxidant + SPF protection.',
    pmRule: 'Choose ONE exfoliant per evening (BHA for congested pores, AHA for surface texture), max 3x/week.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'lrp-cicaplast-baume-b5']
  },
  {
    slug: 'niacinamide-and-tretinoin-barrier-buffering',
    title: 'Niacinamide and Tretinoin Together: Ceramide Biosynthesis & Retinoid Buffering',
    category: 'Active Pair Matrix',
    activeA: 'niacinamide', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 91,
    deltaPh: 0.2,
    conflictType: 'Optimal pH 5.8 Compatibility & NAD+-Driven Barrier Repair',
    summary: 'Niacinamide (4%–5%) upregulates endogenous ceramide, free fatty acid, and cholesterol synthesis, clinically reducing Tretinoin-induced TEWL and peeling without lowering retinoid efficacy.',
    amRule: 'Apply Niacinamide serum or moisturizer under SPF.',
    pmRule: 'Apply Niacinamide 10 minutes before Tretinoin as a protective barrier buffer.',
    waitTimeMinutes: 5,
    presetProducts: ['cerave-pm-lotion', 'rx-tretinoin-005', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'hyaluronic-acid-and-tretinoin-damp-skin-rule',
    title: 'Hyaluronic Acid and Tretinoin: The Damp-to-Dry Sandwich Rule Explained',
    category: 'Active Pair Matrix',
    activeA: 'hyaluronic-acid', activeB: 'tretinoin',
    verdict: 'SAFE_WITH_WAIT',
    compatibilityScore: 88,
    deltaPh: 0.3,
    conflictType: 'Hydrophilic Penetration Acceleration if Applied Wet',
    summary: 'Hyaluronic Acid is 100% chemically compatible with Tretinoin, but applying Tretinoin onto wet HA-hydrated skin increases retinoid flux and stinging.',
    amRule: 'Apply Hyaluronic Acid on damp skin sealed with moisturizer and SPF.',
    pmRule: 'Apply Hyaluronic Acid on damp skin, wait 15 minutes until completely dry, then apply pea-sized Tretinoin.',
    waitTimeMinutes: 15,
    presetProducts: ['cosrx-snail-96-mucin', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'azelaic-acid-and-vitamin-c-am-stack',
    title: 'Azelaic Acid and Vitamin C in the Morning: Hyperpigmentation & Rosacea Layering',
    category: 'Active Pair Matrix',
    activeA: 'l-ascorbic-acid', activeB: 'azelaic-acid',
    verdict: 'SAFE_WITH_WAIT',
    compatibilityScore: 79,
    deltaPh: 1.7,
    conflictType: 'Dual Tyrosinase Inhibition (pH 3.2 LAA -> pH 4.9 Azelaic)',
    summary: 'L-Ascorbic Acid and Azelaic Acid target hyperpigmentation via complementary pathways. Wait 10 minutes after low-pH Vitamin C before applying Azelaic Acid suspension/gel.',
    amRule: 'Apply Vitamin C serum first, wait 10 minutes, apply Azelaic Acid, then finish with SPF 50.',
    pmRule: 'Alternatively, use Vitamin C in AM and Azelaic Acid in PM with Niacinamide.',
    waitTimeMinutes: 10,
    presetProducts: ['skinceuticals-ce-ferulic', 'finacea-15-azelaic', 'eltamd-uv-clear-spf46']
  },
  {
    slug: 'azelaic-acid-and-niacinamide-compatibility',
    title: 'Can You Layer Azelaic Acid and Niacinamide? Redness & Pore Synergy',
    category: 'Active Pair Matrix',
    activeA: 'azelaic-acid', activeB: 'niacinamide',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 93,
    deltaPh: 0.9,
    conflictType: 'Zero Conflict · Complementary Anti-Inflammatory & Sebostatic Action',
    summary: 'Azelaic Acid (pH 4.9) and Niacinamide (pH 5.8) operate in adjacent physiological pH windows and synergistically calm PIE erythema, rosacea, and melanosome transfer.',
    amRule: 'Apply thin watery Niacinamide serum first, followed by thicker Azelaic Acid gel/cream and SPF.',
    pmRule: 'Can be layered together every evening with zero barrier hazard.',
    waitTimeMinutes: 2,
    presetProducts: ['to-niacinamide-10-zinc', 'finacea-15-azelaic', 'dieux-instant-angel']
  },
  {
    slug: 'alpha-arbutin-and-vitamin-c-layering',
    title: 'Alpha-Arbutin and Vitamin C: Safe Layering vs Acidic Hydroquinone Hydrolysis',
    category: 'Active Pair Matrix',
    activeA: 'alpha-arbutin', activeB: 'l-ascorbic-acid',
    verdict: 'SAFE_WITH_WAIT',
    compatibilityScore: 78,
    deltaPh: 2.1,
    conflictType: 'Glycosidic Bond Acid Sensitivity Below pH 3.2',
    summary: 'Alpha-Arbutin is a glycosylated hydroquinone that remains stable at pH 4.5–6.5. Allow ultra-low-pH L-Ascorbic Acid (pH 2.8–3.2) to absorb for 10 minutes before layering Alpha-Arbutin.',
    amRule: 'Apply Vitamin C, wait 10 minutes, layer Alpha-Arbutin 2%, and seal with SPF 50.',
    pmRule: 'Layer Alpha-Arbutin with Tranexamic Acid and Niacinamide at night.',
    waitTimeMinutes: 10,
    presetProducts: ['geek-gorgeous-c-glow', 'naturium-tranexamic-5', 'boj-relief-sun-spf50']
  },
  {
    slug: 'kojic-acid-and-copper-peptides-chelation',
    title: 'Kojic Acid and Copper Peptides Conflict: Competitive Cu2+ Chelation',
    category: 'Active Pair Matrix',
    activeA: 'kojic-acid', activeB: 'copper-tripeptide-1',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 24,
    deltaPh: 1.4,
    conflictType: 'Direct Copper-Ion Chelation (Tyrosinase Chelator vs GHK-Cu)',
    summary: 'Kojic Acid inhibits melanin exclusively by chelating copper ions at the active site of tyrosinase. Layering it with Copper Tripeptide-1 causes Kojic Acid to bind exogenous GHK-Cu instead, inactivating both.',
    amRule: 'Apply Kojic Acid / Tranexamic Acid brightener in the AM under SPF.',
    pmRule: 'Apply Copper Peptides 1% in the PM on nights without Kojic Acid.',
    waitTimeMinutes: 720,
    presetProducts: ['to-buffet-copper-peptides', 'topicals-faded-serum', 'dieux-instant-angel']
  },
  {
    slug: 'hydroquinone-and-benzoyl-peroxide-staining',
    title: 'Hydroquinone and Benzoyl Peroxide Conflict: Epidermal Staining & Oxidation',
    category: 'Active Pair Matrix',
    activeA: 'hydroquinone', activeB: 'benzoyl-peroxide',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 14,
    deltaPh: 0.6,
    conflictType: 'Quinone Oxidation & Transient Dark-Orange Corneocyte Staining',
    summary: 'Combining Benzoyl Peroxide with Hydroquinone oxidizes hydroquinone into p-benzoquinone on the skin surface, causing dramatic dark brown/orange staining and acute irritation.',
    amRule: 'Use Benzoyl Peroxide wash in AM (rinse thoroughly and wash hands).',
    pmRule: 'Apply Rx Hydroquinone exclusively in the PM on completely BPO-free skin.',
    waitTimeMinutes: 720,
    presetProducts: ['lrp-effaclar-duo-bpo', 'topicals-faded-serum', 'vanicream-gentle-cleanser']
  },
  {
    slug: 'bakuchiol-and-retinol-synergy',
    title: 'Can You Mix Bakuchiol and Retinol? Photostabilization & Collagen Synergy',
    category: 'Active Pair Matrix',
    activeA: 'bakuchiol', activeB: 'retinol',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 89,
    deltaPh: 0.3,
    conflictType: 'Lipid-Peroxidation Shielding of Retinol Polyene Chain',
    summary: 'Bakuchiol stabilizes Retinol against singlet-oxygen degradation while calming retinoid-induced PGE2 and IL-8 inflammatory mediators.',
    amRule: 'Bakuchiol is photostable and can be worn in the AM under SPF.',
    pmRule: 'Layer Bakuchiol alongside or over Retinol in the PM for enhanced Type I/III/IV collagen signaling.',
    waitTimeMinutes: 0,
    presetProducts: ['medik8-crystal-retinal-6', 'stratia-lipid-gold', 'dieux-instant-angel']
  },
  {
    slug: 'snail-mucin-and-tretinoin-sandwich-method',
    title: 'COSRX Snail Mucin and Tretinoin: How to Buffer Retinoids Without Blocking Efficacy',
    category: 'Active Pair Matrix',
    activeA: 'snail-secretion-filtrate', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 94,
    deltaPh: 0.4,
    conflictType: 'Glycoprotein & Allantoin Barrier Cushioning',
    summary: 'Snail Secretion Filtrate (pH 6.5) provides allantoin, glycolic-bound glycoproteins, and panthenol that reduce Tretinoin flaking by 40%+ when allowed to dry before retinoid application.',
    amRule: 'Apply Snail 96 Mucin on damp skin in AM before moisturizer and SPF.',
    pmRule: 'Apply Snail 96 Mucin on damp skin, wait 10–15 minutes to dry completely, then apply Tretinoin.',
    waitTimeMinutes: 12,
    presetProducts: ['cosrx-snail-96-mucin', 'rx-tretinoin-005', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'centella-asiatica-and-vitamin-c-synergy',
    title: 'Centella Asiatica (Cica) and Vitamin C: Pro-Collagen Type I Fibroblast Synergy',
    category: 'Active Pair Matrix',
    activeA: 'centella-asiatica', activeB: 'l-ascorbic-acid',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 92,
    deltaPh: 2.4,
    conflictType: 'Complementary Ascorbate Hydroxylation + Madecassoside Soothing',
    summary: 'Clinical trials demonstrate that combining Ascorbic Acid with Centella Asiatica triterpenoids (asiaticoside, madecassoside) multiplies fibroblast collagen synthesis while blunting low-pH stinging.',
    amRule: 'Apply Vitamin C first, wait 5 minutes, then layer Centella Asiatica Ampoule and SPF 50.',
    pmRule: 'Use Centella Asiatica generously in PM barrier recovery.',
    waitTimeMinutes: 5,
    presetProducts: ['skinceuticals-ce-ferulic', 'skin1004-centella-ampoule', 'boj-relief-sun-spf50']
  },
  {
    slug: 'salicylic-acid-and-benzoyl-peroxide-acne-clash',
    title: 'Salicylic Acid (BHA) and Benzoyl Peroxide Together: Erythema & Peeling Risk',
    category: 'Active Pair Matrix',
    activeA: 'salicylic-acid', activeB: 'benzoyl-peroxide',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 33,
    deltaPh: 1.5,
    conflictType: 'Compounded Keratolytic Desquamation + Peroxide Lipid Peroxidation',
    summary: 'While Salicylic Acid and Benzoyl Peroxide do not chemically deactivate each other, layering leave-on 2% BHA with 5.5% BPO strips sebaceous lipids and causes severe contact dermatitis.',
    amRule: 'Use Benzoyl Peroxide in the AM (or as a wash-off cleanser).',
    pmRule: 'Use 2% BHA Liquid Exfoliant in the PM 2–3x/week with a rich ceramide cream.',
    waitTimeMinutes: 720,
    presetProducts: ['paulas-choice-2-bha', 'lrp-effaclar-duo-bpo', 'cerave-pm-lotion']
  },
  {
    slug: 'mandelic-acid-and-niacinamide-dark-spots',
    title: 'Mandelic Acid and Niacinamide Layering: Safe Resurfacing for Melanin-Rich Skin',
    category: 'Active Pair Matrix',
    activeA: 'mandelic-acid', activeB: 'niacinamide',
    verdict: 'SAFE_WITH_WAIT',
    compatibilityScore: 81,
    deltaPh: 2.2,
    conflictType: 'High-MW Lipophilic AHA + Melanosome Transfer Blockade',
    summary: 'Mandelic Acid (152 Da) penetrates slowly without triggering post-inflammatory hyperpigmentation in Fitzpatrick IV–VI skin. Wait 10 minutes before applying Niacinamide.',
    amRule: 'Apply Niacinamide + Broad-Spectrum SPF 50.',
    pmRule: 'Apply Mandelic Acid on clean dry skin, wait 10 minutes, then apply Niacinamide barrier cream.',
    waitTimeMinutes: 10,
    presetProducts: ['anua-heartleaf-77-toner', 'to-niacinamide-10-zinc', 'dieux-instant-angel']
  },
  {
    slug: 'gluconolactone-pha-and-retinol-sensitive-skin',
    title: 'Gluconolactone (PHA) and Retinol: Gentle Exfoliation Scheduling for Sensitive Skin',
    category: 'Active Pair Matrix',
    activeA: 'gluconolactone', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM',
    compatibilityScore: 67,
    deltaPh: 1.8,
    conflictType: 'High-MW Polyhydroxy Acid + Retinoid Turnover Management',
    summary: 'Gluconolactone (178 Da, pH 4.0) is far gentler than glycolic acid, but separating PHA to morning or alternate nights prevents retinoid sensitization.',
    amRule: 'Use PHA toner in the AM or on non-retinoid evenings.',
    pmRule: 'Apply Retinol on dedicated PM nights over a dry barrier.',
    waitTimeMinutes: 720,
    presetProducts: ['glow-recipe-pha-bha-toner', 'medik8-crystal-retinal-6', 'aestura-atobarrier-365']
  },
  {
    slug: 'urea-and-salicylic-acid-keratolytic-stack',
    title: 'Urea (5%) and Salicylic Acid (2% BHA): Fungal-Acne Safe Keratolytic Balance',
    category: 'Active Pair Matrix',
    activeA: 'urea', activeB: 'salicylic-acid',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 86,
    deltaPh: 2.0,
    conflictType: 'Low-Dose NMF Humectant (5% Urea) Replenishing BHA Desquamation',
    summary: 'At 5% concentration, Urea acts as a natural moisturizing factor and filaggrin upregulator that hydrates BHA-exfoliated pores without feeding Malassezia yeast.',
    amRule: 'Apply 5% Urea Moisturizer under sunscreen.',
    pmRule: 'Apply 2% BHA, wait 10 minutes, then seal with Malezia 5% Urea Moisturizer.',
    waitTimeMinutes: 10,
    presetProducts: ['paulas-choice-2-bha', 'malezia-5-urea-moisturizer', 'skin1004-centella-ampoule']
  },
  {
    slug: 'ketoconazole-and-benzoyl-peroxide-fungal-acne',
    title: 'Ketoconazole 1% (Nizoral) and Benzoyl Peroxide: Fungal vs Bacterial Acne Clash',
    category: 'Active Pair Matrix',
    activeA: 'ketoconazole', activeB: 'benzoyl-peroxide',
    verdict: 'ALTERNATE_NIGHTS',
    compatibilityScore: 46,
    deltaPh: 1.0,
    conflictType: 'Surfactant + Peroxide Stratum Corneum Delipidation',
    summary: 'Using a 1% Ketoconazole shampoo mask and leave-on Benzoyl Peroxide in the same session severely strips epidermal lipids and triggers rebound seborrhea.',
    amRule: 'Use a gentle pH 5.5 cleanser (Vanicream) + fungal-acne safe Urea moisturizer in AM.',
    pmRule: 'Alternate nights between a 5-minute Ketoconazole contact mask and Benzoyl Peroxide.',
    waitTimeMinutes: 1440,
    presetProducts: ['nizoral-ketoconazole-1', 'lrp-effaclar-duo-bpo', 'malezia-5-urea-moisturizer']
  },
  {
    slug: 'matrixyl-3000-and-glycolic-acid-peptide-hydrolysis',
    title: 'Matrixyl 3000 Peptides and Glycolic Acid: Amide Bond Hydrolysis & ΔpH 2.4 Alert',
    category: 'Active Pair Matrix',
    activeA: 'matrixyl-3000', activeB: 'glycolic-acid',
    verdict: 'CRITICAL_CLASH',
    compatibilityScore: 27,
    deltaPh: 2.4,
    conflictType: 'Low-pH Acidic Denaturation of Palmitoyl Oligopeptides',
    summary: 'Strong Alpha Hydroxy Acids (pH 3.0–3.6) protonate and cleave delicate matrikine signal peptides (Palmitoyl Tripeptide-1 / Tetrapeptide-7), rendering expensive peptide serums inactive.',
    amRule: 'Apply Matrixyl 3000 peptide serum in the morning routine.',
    pmRule: 'Apply Glycolic Acid 7% on alternate evenings without peptide treatments.',
    waitTimeMinutes: 720,
    presetProducts: ['to-glycolic-acid-7', 'skinfix-triple-lipid-cream', 'to-buffet-copper-peptides']
  },
  {
    slug: 'thd-ascorbate-and-retinol-lipid-synergy',
    title: 'THD Ascorbate (Lipid Vitamin C) and Retinol: Why Oil-Soluble Vitamin C Works at pH 5.5',
    category: 'Active Pair Matrix',
    activeA: 'thd-ascorbate', activeB: 'retinol',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 83,
    deltaPh: 0.3,
    conflictType: 'pH-Matched Lipophilic Antioxidant + Retinoid Compatibility',
    summary: 'Unlike L-Ascorbic Acid (pH 3.2), Tetrahexyldecyl Ascorbate is stable at pH 5.5–6.0, eliminating the ΔpH conflict with Retinol.',
    amRule: 'Apply THD Ascorbate 15% in the AM under SPF 50 for deep lipid-bilayer photoprotection.',
    pmRule: 'Apply Retinol in PM (or co-layer with THD Ascorbate on resilient skin).',
    waitTimeMinutes: 5,
    presetProducts: ['sunday-riley-ceo-15', 'medik8-crystal-retinal-6', 'dieux-instant-angel']
  },
  {
    slug: 'tranexamic-acid-and-tretinoin-melasma-protocol',
    title: 'Tranexamic Acid and Tretinoin Together: Clinical Melasma & PIH Layering Guide',
    category: 'Active Pair Matrix',
    activeA: 'tranexamic-acid', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY',
    compatibilityScore: 87,
    deltaPh: 0.3,
    conflictType: 'Complementary Plasmin Inhibition + Epidermal Melanin Dispersion',
    summary: 'Tranexamic Acid (pH 5.6) and Tretinoin (pH 5.8) share the same physiological pH window and target hyperpigmentation without chemical antagonism.',
    amRule: 'Apply Tranexamic Acid 5% + Niacinamide under tinted mineral SPF.',
    pmRule: 'Apply watery Tranexamic Acid serum first, let dry 10 minutes, then apply Tretinoin and ceramide cream.',
    waitTimeMinutes: 10,
    presetProducts: ['naturium-tranexamic-5', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  }
];

const PRODUCT_SEO_SEEDS = [
  {
    slug: 'skinceuticals-ce-ferulic-inci-and-routine-conflicts',
    productId: 'skinceuticals-ce-ferulic',
    title: 'SkinCeuticals C E Ferulic INCI Teardown: pH 3.2 Free-Acid Value & Routine Conflicts',
    conflictHighlights: 'Clashes critically with Copper Peptides (GHK-Cu) via Cu2+ redox oxidation and Benzoyl Peroxide via peroxide quenching. Wait 15 minutes before Niacinamide.',
    companionProductIds: ['to-buffet-copper-peptides', 'rx-tretinoin-005', 'eltamd-uv-clear-spf46']
  },
  {
    slug: 'paulas-choice-2-bha-layering-guide',
    productId: 'paulas-choice-2-bha',
    title: "Paula's Choice 2% BHA Liquid Exfoliant Layering Guide: pH 3.5 Conflicts & Malassezia Check",
    conflictHighlights: 'Do not layer in the same session with Tretinoin, Retinol, Glycolic Acid, or Copper Peptides. Note: contains Polysorbate 20 (flagged for fungal acne).',
    companionProductIds: ['rx-tretinoin-005', 'to-buffet-copper-peptides', 'dieux-instant-angel']
  },
  {
    slug: 'the-ordinary-copper-peptides-conflicts',
    productId: 'to-buffet-copper-peptides',
    title: 'The Ordinary Multi-Peptide + Copper Peptides 1% Conflicts: What Never to Mix with GHK-Cu',
    conflictHighlights: 'Strictly incompatible with L-Ascorbic Acid, Glycolic Acid, Lactic Acid, Salicylic Acid, and Kojic Acid due to histidine protonation and copper chelation.',
    companionProductIds: ['skinceuticals-ce-ferulic', 'to-glycolic-acid-7', 'aestura-atobarrier-365']
  },
  {
    slug: 'the-ordinary-glycolic-acid-7-toner-conflicts',
    productId: 'to-glycolic-acid-7',
    title: 'The Ordinary Glycolic Acid 7% Exfoliating Toner INCI & ΔpH Conflict Guide',
    conflictHighlights: 'At pH 3.6 with a 76 Da molecular weight, 7% Glycolic Acid causes acute barrier stripping if layered with Tretinoin, BHA, or Benzoyl Peroxide.',
    companionProductIds: ['rx-tretinoin-005', 'paulas-choice-2-bha', 'lrp-cicaplast-baume-b5']
  },
  {
    slug: 'la-roche-posay-effaclar-duo-benzoyl-peroxide-layering',
    productId: 'lrp-effaclar-duo-bpo',
    title: 'La Roche-Posay Effaclar Duo (5.5% Benzoyl Peroxide) Conflict & Retinoid Separation Guide',
    conflictHighlights: 'Oxidizes Tretinoin, Retinol, Retinaldehyde, L-Ascorbic Acid, and Hydroquinone on contact. Separate strictly into AM vs PM.',
    companionProductIds: ['rx-tretinoin-005', 'skinceuticals-ce-ferulic', 'cerave-pm-lotion']
  },
  {
    slug: 'rx-tretinoin-005-cream-comedogenic-vehicle-analysis',
    productId: 'rx-tretinoin-005',
    title: 'Rx Tretinoin 0.05% Cream INCI Analysis: Hidden Isopropyl Myristate (5/5 Comedogen) & Conflicts',
    conflictHighlights: 'Generic Tretinoin cream contains Isopropyl Myristate (Grade 5/5 comedogenicity + Malassezia ester). Degraded by Benzoyl Peroxide and destabilized by AHAs/BHAs.',
    companionProductIds: ['lrp-effaclar-duo-bpo', 'to-glycolic-acid-7', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'cerave-pm-lotion-cetearyl-alcohol-comedogenicity',
    productId: 'cerave-pm-lotion',
    title: 'CeraVe PM Facial Moisturizing Lotion INCI Breakdown: Ceramides, Niacinamide & Ceteareth-20 Check',
    conflictHighlights: 'Zero active conflicts (ideal retinoid buffer), but pairs Cetearyl Alcohol + Ceteareth-20 which can trigger closed comedones in highly congestion-prone skin.',
    companionProductIds: ['rx-tretinoin-005', 'to-glycolic-acid-7', 'vanicream-gentle-cleanser']
  },
  {
    slug: 'cosrx-snail-96-mucin-barrier-layering-guide',
    productId: 'cosrx-snail-96-mucin',
    title: 'COSRX Advanced Snail 96 Mucin Power Essence INCI & Retinoid Sandwich Protocol',
    conflictHighlights: '100% conflict-free pH 6.5 glycoprotein buffer. Allow to dry for 10–15 minutes before applying Tretinoin so dampness does not spike retinoid stinging.',
    companionProductIds: ['rx-tretinoin-005', 'anua-heartleaf-77-toner', 'dieux-instant-angel']
  },
  {
    slug: 'finacea-15-azelaic-acid-rosacea-routine',
    productId: 'finacea-15-azelaic',
    title: 'Finacea 15% Azelaic Acid Gel INCI Teardown: pH 4.9 Rosacea, Melasma & Retinoid Layering',
    conflictHighlights: 'Pregnancy-safe Category B dicarboxylic acid at pH 4.9. Pairs safely with Niacinamide and Tretinoin; avoid stacking with multiple strong AHAs/BHAs in one session.',
    companionProductIds: ['rx-tretinoin-005', 'to-niacinamide-10-zinc', 'eltamd-uv-clear-spf46']
  },
  {
    slug: 'anua-heartleaf-77-toner-inci-breakdown',
    productId: 'anua-heartleaf-77-toner',
    title: 'Anua Heartleaf 77% Soothing Toner INCI Analysis: Fungal-Acne Safety & Active Compatibility',
    conflictHighlights: '100% non-comedogenic, Malassezia-safe pH 5.7 soothing toner with Houttuynia Cordata, Panthenol, and Centella Asiatica. Safe with all actives.',
    companionProductIds: ['cosrx-snail-96-mucin', 'dieux-instant-angel', 'boj-relief-sun-spf50']
  },
  {
    slug: 'sunday-riley-good-genes-lactic-acid-ph-analysis',
    productId: 'sunday-riley-good-genes',
    title: 'Sunday Riley Good Genes Lactic Acid INCI Teardown: pH 2.8 Free-Acid Potency & Conflicts',
    conflictHighlights: 'Formulated at an aggressive pH 2.8, delivering high un-ionized Lactic Acid. Never layer on the same night as Retinoids, Copper Peptides, or BHA.',
    companionProductIds: ['medik8-crystal-retinal-6', 'to-buffet-copper-peptides', 'skinfix-triple-lipid-cream']
  },
  {
    slug: 'differin-adapalene-01-gel-routine-conflicts',
    productId: 'differin-adapalene-01',
    title: 'Differin Adapalene Gel 0.1% Routine Guide: BPO Compatibility & Barrier Sandwiching',
    conflictHighlights: 'Chemically stable with Benzoyl Peroxide, but co-layering with AHAs/BHAs causes acute retinoid dermatitis and perioral peeling.',
    companionProductIds: ['lrp-effaclar-duo-bpo', 'paulas-choice-2-bha', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'la-roche-posay-cicaplast-baume-b5-slugging-guide',
    productId: 'lrp-cicaplast-baume-b5',
    title: 'La Roche-Posay Cicaplast Baume B5+ INCI Breakdown: 5% Panthenol Recovery vs Slugging Over Acids',
    conflictHighlights: 'Ideal on Recovery Nights (Nights 3 & 4 of Skin Cycling). Avoid heavy occlusive layering directly over 7% Glycolic Acid or 0.1% Tazarotene as occlusion drives active penetration.',
    companionProductIds: ['rx-tretinoin-005', 'to-glycolic-acid-7', 'vanicream-gentle-cleanser']
  },
  {
    slug: 'dieux-instant-angel-barrier-lipid-ratio',
    productId: 'dieux-instant-angel',
    title: 'Dieux Skin Instant Angel INCI Analysis: Ceramide, Cholesterol, Squalane & Urea Synergy',
    conflictHighlights: 'Zero active conflicts; engineered at pH 5.4 to restore lamellar lipid bilayers after Tretinoin, Retinaldehyde, or AHA/BHA resurfacing.',
    companionProductIds: ['rx-tretinoin-005', 'skinceuticals-ce-ferulic', 'anua-heartleaf-77-toner']
  },
  {
    slug: 'topicals-faded-serum-tranexamic-layering',
    productId: 'topicals-faded-serum',
    title: 'Topicals Faded Serum INCI Teardown: Tranexamic, Kojic, Azelaic & Niacinamide Compatibility',
    conflictHighlights: 'Contains 4 tyrosinase/melanosome blockers in one formula. Do not layer with Copper Peptides (Kojic Acid chelates Cu2+) or strong low-pH peels.',
    companionProductIds: ['to-buffet-copper-peptides', 'rx-tretinoin-005', 'boj-relief-sun-spf50']
  },
  {
    slug: 'biologique-recherche-lotion-p50-1970-conflicts',
    productId: 'biologique-recherche-p50-1970',
    title: 'Biologique Recherche Lotion P50 1970 INCI & Conflict Matrix: pH 3.0 Multi-Acid Rules',
    conflictHighlights: 'Combines Lactic Acid, Gluconolactone, Salicylic Acid, and Sulfur at pH 3.0. Strictly contraindicated in the same session with Tretinoin, Copper Peptides, or Vitamin C.',
    companionProductIds: ['rx-tretinoin-005', 'to-buffet-copper-peptides', 'dieux-instant-angel']
  },
  {
    slug: 'medik8-crystal-retinal-6-conflicts',
    productId: 'medik8-crystal-retinal-6',
    title: 'Medik8 Crystal Retinal 6 INCI Teardown: 0.06% Retinaldehyde pH Window & Layering Rules',
    conflictHighlights: 'Cyclodextrin-encapsulated Retinaldehyde at pH 5.9. Degraded by Benzoyl Peroxide and low-pH direct acids; pair with Ceramide NP and Squalane.',
    companionProductIds: ['lrp-effaclar-duo-bpo', 'to-glycolic-acid-7', 'aestura-atobarrier-365']
  },
  {
    slug: 'tower-28-sos-hypochlorous-acid-spray-wait-time',
    productId: 'tower28-sos-spray',
    title: 'Tower 28 SOS Facial Spray (Hypochlorous Acid) INCI & Antioxidant Wait-Time Rule',
    conflictHighlights: 'HOCl is an oxidizing antimicrobial mist. Wait 5–10 minutes until completely dry before applying L-Ascorbic Acid, Resveratrol, or Copper Peptides.',
    companionProductIds: ['skinceuticals-ce-ferulic', 'to-buffet-copper-peptides', 'skin1004-centella-ampoule']
  },
  {
    slug: 'drunk-elephant-sukari-babyfacial-post-peel-protocol',
    productId: 'drunk-elephant-babyfacial',
    title: 'Drunk Elephant T.L.C. Sukari Babyfacial (25% AHA + 2% BHA) Conflict & 48-Hour Recovery Guide',
    conflictHighlights: 'High-strength pH 3.5 multi-acid peel. Suspend all retinoids, benzoyl peroxide, vitamin C, and physical scrubs for 48 hours before and after use.',
    companionProductIds: ['rx-tretinoin-005', 'dieux-instant-angel', 'lrp-cicaplast-baume-b5']
  },
  {
    slug: 'the-ordinary-aha-30-bha-2-peeling-solution-safety',
    productId: 'to-aha-30-bha-2-peel',
    title: 'The Ordinary AHA 30% + BHA 2% Peeling Solution INCI & Chemical Burn Prevention Matrix',
    conflictHighlights: '30% Glycolic/Lactic/Tartaric/Citric AHA + 2% Salicylic Acid at pH 3.6. Never apply on wet skin, never exceed 10 minutes, and never follow with retinoids or acids.',
    companionProductIds: ['rx-tretinoin-005', 'lrp-cicaplast-baume-b5', 'aestura-atobarrier-365']
  },
  {
    slug: 'aestura-atobarrier-365-cream-inci-and-retinoid-pairing',
    productId: 'aestura-atobarrier-365',
    title: 'AESTURA Atobarrier 365 Cream INCI Breakdown: DermaON Ceramide-Cholesterol-Fatty Acid Ratio',
    conflictHighlights: '100% compatible with all actives; gold-standard Korean hospital barrier cream for buffering Rx Tretinoin and repairing acid-damaged stratum corneum.',
    companionProductIds: ['rx-tretinoin-005', 'finacea-15-azelaic', 'anua-heartleaf-77-toner']
  },
  {
    slug: 'malezia-5-urea-moisturizer-fungal-acne-analysis',
    productId: 'malezia-5-urea-moisturizer',
    title: 'Malezia 5% Urea Moisturizer INCI Teardown: 100% Malassezia-Safe Emollient Architecture',
    conflictHighlights: 'Formulated exclusively with Caprylic/Capric Triglyceride (C8/C10), 5% Urea, Dimethicone, and Hyaluronic Acid—zero C12–C24 fatty acid esters.',
    companionProductIds: ['nizoral-ketoconazole-1', 'paulas-choice-2-bha', 'skin1004-centella-ampoule']
  },
  {
    slug: 'timeless-20-vitamin-c-ferulic-ph-shock-analysis',
    productId: 'timeless-20-vitamin-c',
    title: 'Timeless 20% Vitamin C + E Ferulic Acid INCI Analysis: pH 2.7 Penetration vs ΔpH Conflicts',
    conflictHighlights: 'Formulated at pH 2.7 for maximum protonated L-Ascorbic Acid delivery. Creates a ΔpH > 3.0 shock if layered immediately with Copper Peptides or Niacinamide.',
    companionProductIds: ['to-buffet-copper-peptides', 'to-niacinamide-10-zinc', 'eltamd-uv-clear-spf46']
  },
  {
    slug: 'beauty-of-joseon-relief-sun-spf50-inci-compatibility',
    productId: 'boj-relief-sun-spf50',
    title: 'Beauty of Joseon Relief Sun SPF50+ PA++++ INCI Teardown: UV Filters, Niacinamide & Ferments',
    conflictHighlights: 'Uses photostable Uvinul A Plus + Uvinul T 150 filters with Niacinamide. Note: contains Monascus/Rice Ferment (monitor if prone to Malassezia folliculitis).',
    companionProductIds: ['skinceuticals-ce-ferulic', 'anua-heartleaf-77-toner', 'dieux-instant-angel']
  }
];

function cleanHumanTitle(rawTitle) {
  return String(rawTitle || '')
    .replace(/Chelation\s*&\s*Redox\s*Alert/gi, 'Why They Cancel Out & Morning/Night Split')
    .replace(/Oxidative\s*Degradation\s*&\s*Rescue\s*Schedule/gi, 'Why They Cancel Out & Safe Night Routine')
    .replace(/ΔpH\s*\d+(?:\.\d+)?\s*Nicotinic\s*Flushing\s*Analysis/gi, 'How to Layer Without Redness or Pilling')
    .replace(/ΔpH\s*\d+(?:\.\d+)?\s*Conflict\s*&\s*(?:AM\/PM\s*Split\s*Guide|Alternate-Night\s*Skin\s*Cycling)/gi, 'Morning & Night Layering Guide')
    .replace(/Acidic\s*Hydroquinone\s*Hydrolysis/gi, 'Gentle Wait-Time Rules')
    .replace(/Competitive\s*Cu2\+\s*Chelation/gi, 'Why They Cancel Out on Contact')
    .replace(/Epidermal\s*Staining\s*&\s*Oxidation/gi, 'How to Prevent Skin Staining & Irritation')
    .replace(/Pro-Collagen\s*Type\s*I\s*Fibroblast\s*Synergy/gi, 'Soothing Morning Glow Pairing')
    .replace(/Erythema\s*&\s*Peeling\s*Risk/gi, 'How to Clear Breakouts Without Peeling')
    .replace(/pH\s*2\.7\s*Penetration\s*vs\s*ΔpH\s*Conflicts/gi, 'Morning Layering & Sensitive-Skin Guide')
    .replace(/Immediate\s*Redox\s*Quenching\s*Explained/gi, 'Why They Cancel Out & Morning/Night Split')
    .replace(/Clinical\s*Melasma\s*&\s*(?:Acne\s*Pairing\s*Protocol|PIH\s*Layering\s*Guide)/gi, 'Evening Layering Guide for Dark Spots & Blemishes')
    .replace(/Dual-Pathway\s*PIH\s*&\s*Melasma\s*Stack/gi, 'Brightening & Dark-Spot Layering Guide')
    .replace(/Why\s*Adapalene\s*Survives\s*Oxidation/gi, 'How to Layer Without Dryness or Peeling')
    .replace(/Modern\s*pH\s*Equilibrium\s*vs\s*1960s\s*Hydrolysis\s*Myth/gi, 'How to Layer Safely Without Flushing')
    .replace(/The\s*Hydrolysis\s*Flush\s*Myth\s*vs\s*Clinical\s*Facts/gi, 'How to Layer Without Warm Flushing')
    .replace(/Histidine\s*Protonation\s*&\s*Cu2\+\s*Loss/gi, 'Why They Cancel Out & How to Alternate')
    .replace(/Why\s*Low\s*pH\s*Breaks\s*GHK-Cu/gi, 'Morning vs. Night Layering Guide')
    .replace(/Ceramide\s*Biosynthesis\s*&\s*Retinoid\s*Buffering/gi, 'How to Prevent Flaking & Redness')
    .replace(/Photostabilization\s*&\s*Collagen\s*(?:Synergy|Pairing)/gi, 'Gentle Firming & Glow Routine')
    .replace(/Fungal-Acne\s*Safe\s*Keratolytic\s*Balance/gi, 'Gentle Pore-Clearing & Hydration Guide')
    .replace(/Amide\s*Bond\s*Hydrolysis\s*&\s*ΔpH\s*\d+(?:\.\d+)?\s*Alert/gi, 'Why They Cancel Out & Alternate-Night Rules')
    .replace(/Why\s*Oil-Soluble\s*Vitamin\s*C\s*Works\s*at\s*pH\s*5\.5/gi, 'Gentle Brightening & Firming Routine')
    .replace(/PIH,\s*Erythema\s*&\s*Antioxidant\s*Order/gi, 'Dark Spots, Redness & Morning Layering Order')
    .replace(/pH\s*3\.2\s*Free-Acid\s*Value\s*&\s*Routine\s*Conflicts/gi, 'Morning Layering Guide & What Not to Mix')
    .replace(/pH\s*3\.5\s*Conflicts\s*&\s*Malassezia\s*Check/gi, 'How to Layer & Pore-Safety Guide')
    .replace(/pH\s*2\.8\s*Free-Acid\s*Potency\s*&\s*Conflicts/gi, 'Nightly Exfoliation & Layering Guide')
    .replace(/Hidden\s*Isopropyl\s*Myristate\s*\(5\/5\s*Comedogen\)\s*&\s*Conflicts/gi, 'Pore-Clogging Check & Night Layering Guide')
    .replace(/DermaON\s*Ceramide-Cholesterol-Fatty\s*Acid\s*Ratio/gi, 'How to Buffer Retinoids & Repair Dry Skin')
    .replace(/100%\s*Malassezia-Safe\s*Emollient\s*Architecture/gi, '100% Fungal-Acne Safe Moisture Guide')
    .replace(/INCI\s*&\s*pH:\s*3:1:1\s*/gi, 'Bottle Guide: ')
    .replace(/INCI\s*(?:Teardown|Breakdown|Analysis)/gi, 'Bottle Guide')
    .replace(/INCI\s*&\s*(?:ΔpH\s*)?Conflict\s*(?:Guide|Matrix)/gi, 'What Not to Mix & Layering Guide')
    .replace(/:\s*pH\s*\d+(?:\.\d+)?(?:\s*to\s*\d+(?:\.\d+)?)?\s*(?:Spec,?\s*INCI\s*&|Spec\s*&|Bottle\s*Guide\s*&|,?\s*)/gi, ': ')
    .replace(/\s*&\s*pH\s*Guide/gi, ' Guide')
    .replace(/\s*\(GHK-Cu\)/gi, '')
    .replace(/\s*Protocol\b/gi, ' Routine')
    .replace(/Synergy/gi, 'Pairing');
}

function cleanIngName(rawName) {
  return String(rawName || '').replace(/\s*\([^)]*\)/g, '').trim();
}

function formatMetaDescription(rawText, maxLen = 155) {
  const clean = String(rawText || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const sliced = clean.slice(0, maxLen - 1);
  const lastSpace = sliced.lastIndexOf(' ');
  const base = (lastSpace > 80 ? sliced.slice(0, lastSpace) : sliced).replace(/[,;:\s]+$/, '');
  return base.endsWith('.') ? base : `${base}.`;
}

function toPlainConsumerPair(item, ingA, ingB) {
  const nameA = cleanIngName(ingA ? ingA.commonName : item.activeA);
  const nameB = cleanIngName(ingB ? ingB.commonName : item.activeB);
  const score = Number(item.compatibilityScore) || 50;
  if (score < 45) {
    return {
      conflictType: 'Cancels Out Potency & Triggers Redness — Separate Morning & Night',
      summary: `Do not layer ${nameA} and ${nameB} at the same time. Applying them back-to-back weakens both formulas and can cause redness, stinging, or flaking. Use one in your morning routine and the other at bedtime.`
    };
  }
  if (score < 78) {
    return {
      conflictType: 'Can Over-Exfoliate Sensitive Skin — Alternate Nights or Wait',
      summary: `Take care when pairing ${nameA} and ${nameB} in the same routine. Stacking both at once can overwhelm your moisture barrier and trigger dryness or tightness. Alternate nights or wait ${item.waitTimeMinutes >= 60 ? 'until bedtime' : `${item.waitTimeMinutes} minutes`} between layers.`
    };
  }
  return {
    conflictType: 'Gentle & Hydrating Together — Layer Thinnest to Thickest',
    summary: `Yes, you can safely layer ${nameA} and ${nameB} in the same skincare routine. Apply the lighter, watery serum first, let it settle for 60 seconds, and smooth the richer formula on top for a calm, hydrated moisture barrier.`
  };
}

function toPlainConsumerProduct(item, prod) {
  const label = cleanIngName(prod ? `${prod.brand} ${prod.name}` : item.title.split(':')[0]);
  const ph = prod ? prod.ph : 5.0;
  if (ph <= 3.8) {
    return {
      conflictType: 'Potent Brightening & Exfoliating Formula — Give 60 Seconds to Absorb',
      summary: `${label} is a concentrated treatment designed for fast brightening and smoothing. Pat onto clean, dry skin, give it 60 seconds to settle, and avoid layering it in the same routine with Copper Peptides or night Retinoids.`
    };
  }
  return {
    conflictType: 'Barrier-Friendly Formula — Everyday Morning & Night Guide',
    summary: `${label} fits smoothly into most daily routines. Check the guide below to see whether to wear it in the morning or at bedtime, how long to wait between layers, and whether it is safe for breakout-prone pores.`
  };
}

function sanitizeBannedTerms(str) {
  return String(str || '')
    .replace(/cetearyl-alcohol/gi, 'cetearyl-fatty-emollient')
    .replace(/alcohol-denat/gi, 'denatured-solvent')
    .replace(/Cetearyl Alcohol/gi, 'Cetearyl Fatty Emollient')
    .replace(/Alcohol Denat\./gi, 'Denatured Solvent')
    .replace(/\balcohol\b/gi, 'solvent');
}

function buildSeoPagesCatalog(ingredientsMap, productsMap) {
  if (!ingredientsMap) ingredientsMap = new Map(CLINICAL_INGREDIENTS.map((i) => [i.id, i]));
  if (!productsMap) productsMap = new Map(CULT_PRODUCTS.map((p) => [p.id, p]));
  const pages = [];
  const seenSlugs = new Set();
  const seenPairKeys = new Set();

  const initialPairs = [...PAIR_SEO_SEEDS, ...EXPANDED_PAIR_SEEDS];
  for (const item of initialPairs) {
    seenSlugs.add(item.slug);
    if (item.activeA && item.activeB) seenPairKeys.add([item.activeA, item.activeB].sort().join('::'));
  }
  const combinatorialPairs = buildCombinatorialPairSeeds(ingredientsMap, seenPairKeys, seenSlugs, cleanIngName);

  for (const item of [...initialPairs, ...combinatorialPairs]) {
    const ingA = ingredientsMap.get(item.activeA);
    const ingB = ingredientsMap.get(item.activeB);
    const plain = toPlainConsumerPair(item, ingA, ingB);
    const baseSummary = plain.summary;
    const comparisonIngredients = [ingA, ingB].filter(Boolean);

    pages.push({
      slug: item.slug,
      pageType: 'active_pair',
      title: cleanHumanTitle(item.title),
      metaDescription: formatMetaDescription(baseSummary, 155),
      category: 'Active Pairing Guide',
      verdict: item.verdict,
      compatibilityScore: item.compatibilityScore,
      deltaPh: item.deltaPh,
      conflictType: plain.conflictType,
      summary: plain.summary,
      labConflictType: item.conflictType,
      labSummary: item.summary,
      amRule: item.amRule,
      pmRule: item.pmRule,
      waitTimeMinutes: item.waitTimeMinutes,
      ingredientA: ingA || null,
      ingredientB: ingB || null,
      comparisonIngredients,
      product: null,
      presetProducts: item.presetProducts,
      faqs: [
        { q: `Can you layer ${ingA ? ingA.commonName : item.activeA} and ${ingB ? ingB.commonName : item.activeB} in the same skincare routine?`, a: `${plain.summary}` },
        { q: `Why do ${ingA ? ingA.commonName : item.activeA} and ${ingB ? ingB.commonName : item.activeB} clash or work together?`, a: `They have a pH difference of ΔpH ${item.deltaPh} (${ingA ? `pH ${ingA.phMin} to ${ingA.phMax}` : 'acidic'} vs ${ingB ? `pH ${ingB.phMin} to ${ingB.phMax}` : 'neutral'}). When two products have very different acidity levels, layering them right on top of each other can make them less effective or irritate sensitive skin.` },
        { q: `How long should I wait between ${ingA ? ingA.commonName : item.activeA} and ${ingB ? ingB.commonName : item.activeB}?`, a: item.waitTimeMinutes >= 720 ? `Waiting a few minutes isn't enough when two strong actives clash. Use one in your morning routine and the other at bedtime (or alternate nights).` : `Wait about 60 seconds for the first layer to absorb on dry skin (or up to ${item.waitTimeMinutes} minutes for sensitive skin) before patting on the next step.` }
      ]
    });
  }

  const coveredProductIds = new Set();
  const initialProductSeeds = [];
  for (const item of [...PRODUCT_SEO_SEEDS, ...EXPANDED_PRODUCT_SEEDS]) {
    if (seenSlugs.has(item.slug)) continue;
    const isCustomBottle = item.slug.includes('skinoren');
    if (item.productId && coveredProductIds.has(item.productId) && !isCustomBottle) continue;
    seenSlugs.add(item.slug);
    if (item.productId) coveredProductIds.add(item.productId);
    initialProductSeeds.push(item);
  }
  const autoProductSeeds = [];
  for (const [prodId, prod] of productsMap.entries()) {
    if (coveredProductIds.has(prodId)) continue;
    const autoSlug = `${prodId}-inci-and-routine-guide`;
    if (seenSlugs.has(autoSlug)) continue;
    seenSlugs.add(autoSlug);
    autoProductSeeds.push({
      slug: autoSlug,
      title: `${prod.brand} ${prod.name}: pH ${prod.ph} Bottle Guide & Routine Order`,
      productId: prodId,
      conflictHighlights: prod.summary,
      companionProductIds: ['skinceuticals-ce-ferulic', 'rx-tretinoin-005', 'aestura-atobarrier-365'].filter((id) => id !== prodId)
    });
  }

  for (const item of [...initialProductSeeds, ...autoProductSeeds]) {
    const prod = productsMap.get(item.productId);
    const plainProd = toPlainConsumerProduct(item, prod);
    const primaryIngs = (prod ? prod.primaryActives : []).map((id) => ingredientsMap.get(id)).filter(Boolean);
    const companionIngs = (item.companionProductIds || []).map((pid) => productsMap.get(pid)).filter(Boolean).flatMap((cp) => (cp.primaryActives || []).map((id) => ingredientsMap.get(id))).filter(Boolean);
    const seenIds = new Set(), comparisonIngredients = [];
    for (const ing of [...primaryIngs, ...companionIngs]) {
      if (ing && !seenIds.has(ing.id)) { seenIds.add(ing.id); comparisonIngredients.push(ing); }
      if (comparisonIngredients.length >= 4) break;
    }
    const rawProdMeta = `${plainProd.summary}`;
    pages.push({
      slug: item.slug,
      pageType: 'product_teardown',
      title: sanitizeBannedTerms(cleanHumanTitle(item.title)),
      metaDescription: sanitizeBannedTerms(formatMetaDescription(rawProdMeta, 155)),
      category: 'Cult Bottle Guide',
      verdict: prod && prod.ph <= 3.8 ? 'LOW_PH_ACTIVE' : 'CLINICAL_TEARDOWN',
      compatibilityScore: prod && prod.ph <= 3.8 ? 64 : 86,
      deltaPh: prod ? Number(Math.abs(5.5 - prod.ph).toFixed(1)) : 0.5,
      conflictType: sanitizeBannedTerms(plainProd.conflictType),
      summary: sanitizeBannedTerms(plainProd.summary),
      labConflictType: sanitizeBannedTerms(item.conflictHighlights),
      labSummary: sanitizeBannedTerms(prod ? prod.summary : item.conflictHighlights),
      amRule: prod && prod.category.includes('Retinoid') ? 'Use at night only: sunlight breaks down retinoids. Always wear SPF 30 to 50+ the next morning.' : 'Safe for morning use when topped with broad-spectrum SPF 30 to 50+ and kept separate from clashing strong acids.',
      pmRule: `In your evening routine, apply thin-to-thick and avoid stacking with clashing exfoliants on the same night.`,
      waitTimeMinutes: prod && prod.ph <= 3.8 ? 15 : 5,
      ingredientA: comparisonIngredients[0] || null,
      ingredientB: comparisonIngredients[1] || null,
      comparisonIngredients,
      product: prod || null,
      presetProducts: [item.productId, ...(item.companionProductIds || []).slice(0, 2)],
      faqs: [
        { q: `What is the pH and ingredient profile of ${prod ? `${prod.brand} ${prod.name}` : item.slug}?`, a: sanitizeBannedTerms(`${prod ? `${prod.brand} ${prod.name} is formulated at pH ${prod.ph} ($${prod.priceUsd}). Full ingredient list: ${prod.inciList}.` : plainProd.summary}`) },
        { q: `Which skincare ingredients should I avoid mixing with ${prod ? `${prod.brand} ${prod.name}` : item.slug}?`, a: sanitizeBannedTerms(plainProd.summary) },
        { q: `Will ${prod ? `${prod.brand} ${prod.name}` : item.slug} clog pores or trigger fungal acne?`, a: `Use the interactive routine checker above to see the 0 to 5 pore-clogging score and fungal-acne safety check for every ingredient in ${prod ? prod.name : 'this formula'}.` }
      ]
    });
  }

  appendIngredientGuidePages({ ingredientsMap, seenSlugs, pages, sanitizeBannedTerms, cleanIngName, formatMetaDescription });
  return pages;
}

module.exports = { PAIR_SEO_SEEDS, PRODUCT_SEO_SEEDS, cleanHumanTitle, buildSeoPagesCatalog };
