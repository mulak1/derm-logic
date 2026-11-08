/**
 * DermLogic (#4): Programmatic SEO Expanded Catalog
 * High-Intent Viral Bottle-Pair Guides, Active Combos & Cult Bottle Pages
 * Written in 100% Everyday Women's Beauty English with 1-Click Analyzer Pre-Loading
 */

const EXPANDED_PAIR_SEEDS = [
  {
    slug: 'snail-mucin-and-dust-mite-allergy-skincare-guide',
    title: 'Snail Mucin and Dust-Mite or Shellfish Allergy: Why It Causes Itchy Bumps & Squalane Swaps',
    category: 'Allergy & Contact Screen',
    activeA: 'snail-mucin', activeB: 'squalane',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 88, deltaPh: 0.5, customPlain: true,
    conflictType: 'EU CosIng Allergen Alert · Dust-Mite Cross-Reactivity Screen',
    summary: 'If COSRX Snail 96 Mucin Essence gives you tiny red itchy bumps or puffy eyelids within 24 hours, you may have a dust-mite or shellfish cross-allergy (tropomyosin proteins). Switching to 100% sugarcane Squalane + Panthenol B5 delivers the same dewy glass-skin bounce with zero allergen triggers.',
    amRule: 'Skip snail mucin if you have dust-mite allergies; press 2 drops of pure Squalane + Panthenol serum onto damp skin under broad-spectrum SPF 50.',
    pmRule: 'At bedtime, layer Panthenol B5 and Ceramide NP barrier cream (like Aestura Atobarrier 365) to calm reactive redness overnight.',
    waitTimeMinutes: 1,
    presetProducts: ['cosrx-snail-96-mucin', 'aestura-atobarrier-365', 'cerave-pm-lotion']
  },
  {
    slug: 'fragrance-and-essential-oil-contact-allergy-routine-guide',
    title: 'Fragrance, Essential Oils & Contact Allergy Guide: How to Stop Eyelid & Neck Hives',
    category: 'Allergy & Contact Screen',
    activeA: 'centella-asiatica', activeB: 'panthenol',
    verdict: 'SYNERGISTIC_COMPATIBLE', compatibilityScore: 97, deltaPh: 0.3, customPlain: true,
    conflictType: 'EU CosIng 26-Fragrance Screen · 100% Hypoallergenic Calm Pair',
    summary: 'Parfum, Linalool, Limonene, and citrus/lavender essential oils are the #1 cause of cosmetic contact dermatitis on the eyelids and neck. Pairing pure Centella Asiatica (Cica) with 5% Panthenol (Vitamin B5) calms allergic flare-ups in 48 hours with zero fragrance sensitizers.',
    amRule: 'Apply fragrance-free Centella Asiatica ampoule onto clean damp skin in the morning, followed by mineral Zinc Oxide SPF 50.',
    pmRule: 'Smooth 5% Panthenol + Madecassoside balm over reactive areas at bedtime to seal moisture without essential oils or lanolin.',
    waitTimeMinutes: 1,
    presetProducts: ['skin1004-centella-ampoule', 'lrp-cicaplast-baume-b5', 'aestura-atobarrier-365']
  },
  {
    slug: 'salicylic-acid-and-aspirin-salicylate-allergy-alternatives',
    title: 'Salicylic Acid (BHA) and Aspirin / Salicylate Allergy: Safe Pore-Clearing Swaps',
    category: 'Allergy & Contact Screen',
    activeA: 'salicylic-acid', activeB: 'azelaic-acid',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 84, deltaPh: 1.4, customPlain: true,
    conflictType: 'EU CosIng Salicylate Screen · Swap BHA for 10% Azelaic Acid',
    summary: 'If you are allergic or sensitive to aspirin (acetylsalicylic acid), leave-on Salicylic Acid (2% BHA), Willow Bark, and Betaine Salicylate can trigger contact hives or warm flushing. 10%–15% Azelaic Acid clears clogged pores and post-blemish redness using a completely salicylate-free pathway.',
    amRule: 'Replace morning BHA toner with 10%–15% Azelaic Acid serum on clean dry skin, wait 60 seconds, and finish with mineral SPF 50.',
    pmRule: 'At bedtime, use gentle Gluconolactone (PHA) or Niacinamide 5% with a fragrance-free ceramide lotion to keep pores clear safely.',
    waitTimeMinutes: 2,
    presetProducts: ['paulas-choice-2-bha', 'finacea-15-azelaic', 'cerave-pm-lotion']
  },
  {
    slug: 'how-to-use-tranexamic-acid-and-tretinoin-together',
    title: 'How to Use Tranexamic Acid and Tretinoin Together: Dark Spot & Melasma Guide',
    category: 'Active Pair Matrix',
    activeA: 'tranexamic-acid', activeB: 'tretinoin',
    verdict: 'SYNERGISTIC_COMPATIBLE', compatibilityScore: 94, deltaPh: 0.8, customPlain: true,
    conflictType: 'Gentle Together · Best Dark-Spot & Melasma Pairing',
    summary: 'Tranexamic Acid (pH 5.5–6.5) and Tretinoin (pH 5.0–6.0) work beautifully together without canceling each other out or causing extra stinging. Tranexamic acid calms stubborn dark-spot triggers while Tretinoin speeds up fresh skin renewal overnight.',
    amRule: 'Smooth 3–5% Tranexamic Acid serum onto clean skin in the morning, followed by barrier moisturizer and broad-spectrum SPF 50+.',
    pmRule: 'At bedtime, pat Tranexamic Acid serum on first, wait 5 minutes until dry, then apply a pea-sized drop of Tretinoin and seal with ceramide cream.',
    waitTimeMinutes: 5,
    presetProducts: ['naturium-tranexamic-5', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'how-to-use-salicylic-acid-and-azelaic-acid-together',
    title: 'How to Use Salicylic Acid (BHA) and Azelaic Acid Together: Blemish & Redness Routine',
    category: 'Active Pair Matrix',
    activeA: 'salicylic-acid', activeB: 'azelaic-acid',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 68, deltaPh: 1.6, customPlain: true,
    conflictType: 'Can Over-Dry Sensitive Skin · Use Morning vs. Night',
    summary: 'Salicylic Acid (2% BHA) clears deep inside clogged pores at pH 3.5, while Azelaic Acid calms redness and post-blemish marks at pH 4.8. Layering both leave-on treatments at the same time often causes tightness and flaking around the nose.',
    amRule: 'Apply 10% to 15% Azelaic Acid in the morning to calm redness and blemish marks under your daily sunscreen.',
    pmRule: 'Swipe on 2% Salicylic Acid (BHA) 2 to 3 evenings per week on non-retinoid nights, then cushion with a soothing moisturizer.',
    waitTimeMinutes: 15,
    presetProducts: ['paulas-choice-2-bha', 'finacea-15-azelaic', 'dieux-instant-angel']
  },
  {
    slug: 'azelaic-acid-and-vitamin-c-layering-guide',
    title: 'Azelaic Acid and Vitamin C Layering Guide: Dark Spots, Redness & Morning Order',
    category: 'Active Pair Matrix',
    activeA: 'azelaic-acid', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 82, deltaPh: 1.5, customPlain: true,
    conflictType: 'Safe Together · Layer Thinnest to Richest (Wait 60 Seconds)',
    summary: 'Vitamin C and Azelaic Acid are a powerhouse duo for fading red post-acne marks and stubborn dark spots. Because Vitamin C is more watery and acidic (pH 3.2), always pat it on clean dry skin first before smoothing on Azelaic Acid.',
    amRule: 'Apply Vitamin C serum on dry skin first, let it settle for 60 seconds, then smooth on Azelaic Acid and finish with SPF 50.',
    pmRule: 'If your skin is easily overwhelmed in the morning, wear Vitamin C in the AM and move Azelaic Acid to your bedtime routine.',
    waitTimeMinutes: 2,
    presetProducts: ['skinceuticals-ce-ferulic', 'finacea-15-azelaic', 'cerave-pm-lotion']
  },
  {
    slug: 'can-you-mix-tretinoin-and-azelaic-acid',
    title: 'Can You Mix Tretinoin and Azelaic Acid? Dermatologist Pairing & Layering Order',
    category: 'Active Pair Matrix',
    activeA: 'tretinoin', activeB: 'azelaic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 88, deltaPh: 0.7, customPlain: true,
    conflictType: 'Dermatologist Favorite · Split AM/PM First, Then Layer at Night',
    summary: 'Dermatologists frequently pair Tretinoin and Azelaic Acid 15% to clear breakouts, rosacea bumps, and dark spots simultaneously. Neither ingredient weakens the other, though using both in one step can feel drying during your first month.',
    amRule: 'For the first 4 weeks, wear Azelaic Acid 15% in the morning under moisturizer and SPF 50.',
    pmRule: 'Apply a pea-sized amount of Tretinoin at bedtime on dry skin, followed by a rich ceramide barrier cream.',
    waitTimeMinutes: 10,
    presetProducts: ['rx-tretinoin-005', 'finacea-15-azelaic', 'aestura-atobarrier-365']
  },
  {
    slug: 'niacinamide-and-l-ascorbic-acid-flush-myth-vs-fact',
    title: 'Niacinamide and Vitamin C Together: How to Layer Without Warm Flushing',
    category: 'Active Pair Matrix',
    activeA: 'niacinamide', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 78, deltaPh: 2.8, customPlain: true,
    conflictType: 'Works Together · Give Vitamin C 60 Seconds to Absorb First',
    summary: 'You can safely use Vitamin C and Niacinamide in the same morning routine to brighten dullness and shrink the look of pores. Waiting 60 seconds between layers prevents the temporary warm tingle some sensitive skin types feel.',
    amRule: 'Apply pure Vitamin C serum to clean dry skin first, wait 60 seconds to absorb, then pat on Niacinamide and SPF 50.',
    pmRule: 'Or keep Vitamin C in your morning routine and pair Niacinamide with your evening retinol and barrier cream.',
    waitTimeMinutes: 2,
    presetProducts: ['skinceuticals-ce-ferulic', 'to-niacinamide-10-zinc', 'cerave-pm-lotion']
  },
  {
    slug: 'glycolic-acid-and-retinol-conflict-recovery',
    title: 'Glycolic Acid (AHA) and Retinol Conflict: How to Alternate Nights Without Peeling',
    category: 'Active Pair Matrix',
    activeA: 'glycolic-acid', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 36, deltaPh: 2.5, customPlain: true,
    conflictType: 'Do Not Layer Same Night · Causes Raw, Peeling Skin',
    summary: 'Never stack Glycolic Acid toner and Retinol in the same bedtime routine. Combining a strong surface exfoliant with a night retinoid strips your protective moisture barrier, leading to stinging, shiny tightness, and flaking 48 hours later.',
    amRule: 'Keep mornings gentle: rinse with lukewarm water, apply hydrating serum, moisturizer, and SPF 50+.',
    pmRule: 'Use a 4-Night Skin-Cycling schedule: Night 1 Glycolic Acid, Night 2 Retinol, and Nights 3 & 4 pure ceramide barrier recovery.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-glycolic-acid-7', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'benzoyl-peroxide-and-salicylic-acid-stacking-rules',
    title: 'Benzoyl Peroxide and Salicylic Acid (BHA): How to Clear Breakouts Without Peeling',
    category: 'Active Pair Matrix',
    activeA: 'benzoyl-peroxide', activeB: 'salicylic-acid',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 48, deltaPh: 2.0, customPlain: true,
    conflictType: 'Separate Morning & Night · Avoid Double Leave-On Dryness',
    summary: 'Salicylic Acid unclogs oil inside pores while Benzoyl Peroxide targets breakout-causing bacteria. Layering two leave-on formulas back-to-back quickly leads to red, flaky patches—splitting them between morning wash and evening toner works far better.',
    amRule: 'Use a gentle Benzoyl Peroxide wash in the morning shower for 60 seconds and rinse completely before moisturizer and SPF.',
    pmRule: 'Apply 2% Salicylic Acid (BHA) leave-on toner 2 to 3 nights a week, sealed with a lightweight ceramide lotion.',
    waitTimeMinutes: 720,
    presetProducts: ['paulas-choice-2-bha', 'panoxyl-10-bpo-wash', 'cerave-pm-lotion']
  },
  {
    slug: 'how-to-use-lactic-acid-and-retinol-together',
    title: 'How to Use Lactic Acid and Retinol: Alternating Nights for Smooth, Plump Skin',
    category: 'Active Pair Matrix',
    activeA: 'lactic-acid', activeB: 'retinol',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 54, deltaPh: 2.2, customPlain: true,
    conflictType: 'Alternate Nights · Never Layer in the Same Evening',
    summary: 'Lactic Acid gently polishes surface dryness while pulling moisture into the skin, but its acidic pH (3.6) clashes with night Retinol if applied in the same step. Alternating them on separate evenings gives you smooth glow without irritation.',
    amRule: 'Protect freshly smoothed skin every morning with hydrating serum, barrier cream, and broad-spectrum SPF 50.',
    pmRule: 'Alternate nights: use Lactic Acid on Night 1, Retinol on Night 2, and soothing ceramide cream on Nights 3 and 4.',
    waitTimeMinutes: 1440,
    presetProducts: ['sunday-riley-good-genes', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'vitamin-c-and-hypochlorous-acid',
    title: 'Vitamin C and Hypochlorous Acid (Tower 28 SOS Spray): The 5-Minute Dry-Down Rule',
    category: 'Active Pair Matrix',
    activeA: 'l-ascorbic-acid', activeB: 'hypochlorous-acid',
    verdict: 'CRITICAL_CLASH', compatibilityScore: 28, deltaPh: 1.9, customPlain: true,
    conflictType: 'Cancels Out When Wet · Let Mist Dry 100% Before Vitamin C',
    summary: 'Spraying Hypochlorous Acid (like Tower 28 SOS Spray) directly onto wet Vitamin C serum neutralizes your antioxidant before it can sink in. However, if you mist clean skin first and let it dry completely for 5 minutes, both work at full strength.',
    amRule: 'Mist Hypochlorous Acid onto clean skin first, wait 5 minutes until 100% dry, then apply Vitamin C serum and SPF 50.',
    pmRule: 'Or keep Vitamin C in your morning routine and mist Hypochlorous Acid after workouts or in the evening to calm redness.',
    waitTimeMinutes: 5,
    presetProducts: ['tower28-sos-spray', 'skinceuticals-ce-ferulic', 'cerave-pm-lotion']
  },
  {
    slug: 'pha-and-vitamin-c-together',
    title: 'PHA Toner and Vitamin C Together: Gentle Morning Glow & Layering Order',
    category: 'Active Pair Matrix',
    activeA: 'gluconolactone', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 81, deltaPh: 0.7, customPlain: true,
    conflictType: 'Gentle Pairing · Apply Vitamin C First, Then PHA Hydrating Toner',
    summary: 'PHA (Gluconolactone) is the gentlest smoothing acid because it stays on the very surface of your skin while binding water like a humectant. It pairs smoothly with morning Vitamin C when you give the first layer 60 seconds to settle.',
    amRule: 'Apply Vitamin C serum on clean dry skin, wait 60 seconds, then pat on PHA toner before moisturizer and SPF 50.',
    pmRule: 'Or swipe PHA toner in the evening for gentle pore smoothing without stinging sensitive skin.',
    waitTimeMinutes: 2,
    presetProducts: ['glow-recipe-pha-bha-toner', 'skinceuticals-ce-ferulic', 'dieux-instant-angel']
  },
  {
    slug: 'can-i-mix-ferulic-acid-with-retinol',
    title: 'Can You Mix Ferulic Acid With Retinol? Morning Shield vs. Bedtime Renewal',
    category: 'Active Pair Matrix',
    activeA: 'ferulic-acid', activeB: 'retinol',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 76, deltaPh: 2.3, customPlain: true,
    conflictType: 'Best Split Morning & Night · Vitamin C + Ferulic AM, Retinol PM',
    summary: 'Because almost every Ferulic Acid bottle (such as SkinCeuticals C E Ferulic or Timeless) is blended with low-pH Vitamin C, layering it under Retinol at night can sting. Wear your Ferulic serum under morning sunscreen and save Retinol for bedtime.',
    amRule: 'Apply your Vitamin C + Ferulic Acid serum in the morning under SPF 50 to double your daily sun defense.',
    pmRule: 'Apply Retinol at bedtime over dry, ceramide-cushioned skin.',
    waitTimeMinutes: 720,
    presetProducts: ['skinceuticals-ce-ferulic', 'medik8-crystal-retinal-6', 'aestura-atobarrier-365']
  },
  {
    slug: 'can-i-use-tranexamic-acid-with-retinol',
    title: 'Can You Use Tranexamic Acid With Retinol? Easy Night Routine for Dark Spots',
    category: 'Active Pair Matrix',
    activeA: 'tranexamic-acid', activeB: 'retinol',
    verdict: 'SYNERGISTIC_COMPATIBLE', compatibilityScore: 95, deltaPh: 0.2, customPlain: true,
    conflictType: 'Zero Clash · Layer Watery Tranexamic Serum Before Retinol',
    summary: 'Tranexamic Acid and Retinol share a gentle, skin-friendly pH (~5.8) and team up to fade stubborn sun spots, melasma, and old blemish marks without extra dryness or peeling.',
    amRule: 'Apply Tranexamic Acid serum in the morning under moisturizer and SPF 50+.',
    pmRule: 'At night, smooth on Tranexamic Acid serum first, wait 60 seconds, then apply Retinol and barrier cream.',
    waitTimeMinutes: 1,
    presetProducts: ['naturium-tranexamic-5', 'medik8-crystal-retinal-6', 'dieux-instant-angel']
  },
  {
    slug: 'is-alpha-arbutin-better-than-vitamin-c',
    title: 'Alpha Arbutin and Vitamin C: Can You Layer Both for Faster Brightening?',
    category: 'Active Pair Matrix',
    activeA: 'alpha-arbutin', activeB: 'l-ascorbic-acid',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 91, deltaPh: 2.1, customPlain: true,
    conflictType: 'Brightening Power Duo · Layer Vitamin C First, Then Alpha Arbutin',
    summary: 'You do not have to choose between Alpha Arbutin and Vitamin C—they work even better together. Vitamin C brightens existing dullness while Alpha Arbutin stops new dark spots from forming.',
    amRule: 'Apply Vitamin C first on clean dry skin, wait 60 seconds, then layer Alpha Arbutin and finish with SPF 50.',
    pmRule: 'Use Alpha Arbutin again at night alongside Niacinamide or Tranexamic Acid for 24-hour dark-spot care.',
    waitTimeMinutes: 2,
    presetProducts: ['skinceuticals-ce-ferulic', 'topicals-faded-serum', 'boj-relief-sun-spf50']
  },
  {
    slug: 'differin-and-bha-salicylic-acid',
    title: 'Differin Gel (Adapalene) and Salicylic Acid (BHA): Clear Acne Without Peeling',
    category: 'Active Pair Matrix',
    activeA: 'adapalene', activeB: 'salicylic-acid',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 49, deltaPh: 2.0, customPlain: true,
    conflictType: 'Do Not Stack Same Night · Alternate Nights to Protect Your Barrier',
    summary: 'Applying Differin 0.1% Gel right on top of a 2% Salicylic Acid (BHA) toner is the #1 cause of raw, peeling skin around the chin and mouth. Alternating them on separate nights keeps pores clear while keeping your skin calm.',
    amRule: 'Cleanse gently in the morning and wear a lightweight oil-free moisturizer and SPF 46+.',
    pmRule: 'Alternate nights: use Differin 0.1% Gel over a thin layer of moisturizer on Night 1, and use 2% BHA toner on Night 2.',
    waitTimeMinutes: 720,
    presetProducts: ['differin-adapalene-01', 'paulas-choice-2-bha', 'cerave-pm-lotion']
  },

  // === 28 HIGH-INTENT VIRAL BOTTLE-PAIR & "BEFORE OR AFTER" GUIDES ===
  {
    slug: 'cosrx-snail-mucin-before-or-after-tretinoin',
    title: 'COSRX Snail Mucin Before or After Tretinoin? Exact Damp-to-Dry Layering Order',
    category: 'Viral Bottle Pairing',
    activeA: 'snail-secretion-filtrate', activeB: 'tretinoin',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 93, deltaPh: 0.5, customPlain: true,
    conflictType: 'Apply Snail Mucin First on Damp Skin · Wait 10 Mins Before Tretinoin',
    summary: 'Always apply COSRX Advanced Snail 96 Mucin Essence BEFORE Tretinoin—with one crucial rule: pat Snail Mucin onto damp skin after cleansing, then wait 10 full minutes until your face is 100% dry before smoothing on Tretinoin so dampness does not pull Tretinoin too deep and cause stinging.',
    amRule: 'Pat 2 pumps of COSRX Snail 96 Mucin onto damp skin after morning cleansing, then seal with moisturizer and SPF 50.',
    pmRule: 'Step 1: Pat COSRX Snail Mucin on damp skin. Step 2: Wait 10 minutes until completely dry. Step 3: Apply a pea-sized drop of Tretinoin and seal with Aestura 365 Ceramide Cream.',
    waitTimeMinutes: 10,
    presetProducts: ['cosrx-snail-96-mucin', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'paulas-choice-bha-and-tretinoin-routine',
    title: "Can You Use Paula's Choice 2% BHA With Tretinoin? 4-Night Skin-Cycling Schedule",
    category: 'Viral Bottle Pairing',
    activeA: 'salicylic-acid', activeB: 'tretinoin',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 38, deltaPh: 2.1, customPlain: true,
    conflictType: 'Never Layer on the Same Night · Alternate on a 4-Night Schedule',
    summary: "Layering Paula's Choice 2% BHA Liquid Exfoliant and Tretinoin in the same evening rapidly strips your moisture barrier, causing redness and flaking around your nose and mouth. Instead, rotate them on separate nights so pores stay clear without irritation.",
    amRule: 'Keep mornings calm with a gentle rinse, hydrating serum, ceramide moisturizer, and SPF 50.',
    pmRule: "Night 1: Swipe Paula's Choice 2% BHA on dry skin + moisturizer. Night 2: Pea-sized Tretinoin + ceramide cream. Nights 3 & 4: Rest nights with barrier cream only.",
    waitTimeMinutes: 1440,
    presetProducts: ['paulas-choice-2-bha', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'the-ordinary-glycolic-acid-and-tretinoin-schedule',
    title: 'The Ordinary Glycolic Acid 7% Toner and Tretinoin: How to Alternate Without Peeling',
    category: 'Viral Bottle Pairing',
    activeA: 'glycolic-acid', activeB: 'tretinoin',
    verdict: 'CRITICAL_CLASH', compatibilityScore: 25, deltaPh: 2.2, customPlain: true,
    conflictType: 'High Sting Risk Together · Space Apart by at Least 24–48 Hours',
    summary: 'The Ordinary Glycolic Acid 7% Toning Solution (pH 3.6) is a strong surface acid. Applying it right before Tretinoin causes intense stinging and barrier peeling. Use Glycolic Acid at most 1 to 2 nights a week on nights when you skip Tretinoin completely.',
    amRule: 'Always wear broad-spectrum SPF 50 every morning—both Glycolic Acid and Tretinoin make fresh skin extra sensitive to sunlight.',
    pmRule: 'Use The Ordinary Glycolic Acid 7% on Monday night, Tretinoin on Wednesday and Friday nights, and soothing ceramide balm on all recovery nights.',
    waitTimeMinutes: 1440,
    presetProducts: ['to-glycolic-acid-7', 'rx-tretinoin-005', 'lrp-cicaplast-baume-b5']
  },
  {
    slug: 'la-roche-posay-cicaplast-baume-b5-over-tretinoin',
    title: 'La Roche-Posay Cicaplast Baume B5+ Over Tretinoin: Sandwich Method vs. Heavy Occlusion',
    category: 'Viral Bottle Pairing',
    activeA: 'panthenol', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 94, deltaPh: 0.3, customPlain: true,
    conflictType: 'Best Over Tretinoin as Final Comfort Seal (Wait 10 Minutes First)',
    summary: 'La Roche-Posay Cicaplast Baume B5+ (5% Panthenol + Madecassoside) is a lifesaver for Tretinoin dryness and peeling around the mouth and nostrils. Because Cicaplast is thick and rich in shea butter, apply a lighter lotion *under* Tretinoin and dab Cicaplast *on top* 10 minutes after Tretinoin absorbs.',
    amRule: 'Rinse with lukewarm water in the morning and wear lightweight moisturizer + SPF 50.',
    pmRule: 'Apply a thin layer of lightweight lotion first, wait 5 minutes, apply pea-sized Tretinoin, wait 10 minutes, and press a pea-sized dab of Cicaplast Baume B5+ onto dry zones.',
    waitTimeMinutes: 10,
    presetProducts: ['lrp-cicaplast-baume-b5', 'rx-tretinoin-005', 'vanicream-daily-facial-moisturizer']
  },
  {
    slug: 'aestura-atobarrier-365-and-tretinoin-sandwich-method',
    title: 'Aestura Atobarrier 365 Cream and Tretinoin: Why 3:1:1 Ceramides Stop Retinoid Peeling',
    category: 'Viral Bottle Pairing',
    activeA: 'ceramide-np', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 98, deltaPh: 0.2, customPlain: true,
    conflictType: 'Gold-Standard Retinoid Cushion · Zero Clash, Stops Flaking Fast',
    summary: 'Aestura Atobarrier 365 Cream uses tiny melting ceramide-cholesterol-fatty acid capsules at skin-neutral pH 5.5 that replenish the exact moisture lipids Tretinoin depletes. Using it over (or sandwiching) Tretinoin cuts flaking without blocking your results.',
    amRule: 'Smooth a thin layer of Aestura Atobarrier 365 Cream under your morning SPF 50 if your skin feels tight in dry indoor air or AC.',
    pmRule: 'Apply Tretinoin on clean dry skin, wait 5 minutes, then seal your whole face and neck with Aestura Atobarrier 365 Cream.',
    waitTimeMinutes: 5,
    presetProducts: ['aestura-atobarrier-365', 'rx-tretinoin-005', 'cosrx-snail-96-mucin']
  },
  {
    slug: 'skinceuticals-ce-ferulic-and-tretinoin-morning-night-routine',
    title: 'SkinCeuticals C E Ferulic and Tretinoin: Exact Morning & Bedtime Routine Order',
    category: 'Viral Bottle Pairing',
    activeA: 'l-ascorbic-acid', activeB: 'tretinoin',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 52, deltaPh: 2.5, customPlain: true,
    conflictType: 'Use C E Ferulic at 7:30 AM & Tretinoin at 9:30 PM · Never Layer Together',
    summary: 'SkinCeuticals C E Ferulic ($182, pH 3.2) and prescription Tretinoin are the gold standard for firm, glowing skin—but layering them at the same time wastes both bottles and stings your skin. Wear C E Ferulic in the morning under SPF 50 and save Tretinoin for bedtime.',
    amRule: '7:30 AM: Press 4–5 drops of SkinCeuticals C E Ferulic onto dry skin, wait 60 seconds, then apply moisturizer and SPF 50.',
    pmRule: '9:30 PM: Cleanse, let skin dry completely, apply a pea-sized drop of Tretinoin, and seal with Dieux Instant Angel or Aestura 365.',
    waitTimeMinutes: 720,
    presetProducts: ['skinceuticals-ce-ferulic', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'topicals-faded-and-tretinoin-layering-order',
    title: 'Can You Layer Topicals Faded Serum With Tretinoin? Dark-Spot Night Routine',
    category: 'Viral Bottle Pairing',
    activeA: 'tranexamic-acid', activeB: 'tretinoin',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 86, deltaPh: 0.5, customPlain: true,
    conflictType: 'Powerful Dark-Spot Duo · Alternate Nights First, Then Layer Slowly',
    summary: 'Topicals Faded Serum (Tranexamic Acid + Niacinamide + Azelaic Acid + Kojic Acid) and Tretinoin are both pH-balanced (~5.5) and target stubborn hyperpigmentation from two angles. Start by alternating nights for 2 weeks before layering them in the same evening.',
    amRule: 'Wear a thin dab of Topicals Faded in the morning under broad-spectrum SPF 50+.',
    pmRule: 'Once your skin is adjusted to Tretinoin, apply Topicals Faded first, wait 5 minutes, apply Tretinoin, and seal with barrier cream.',
    waitTimeMinutes: 5,
    presetProducts: ['topicals-faded-serum', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'anua-heartleaf-toner-and-paulas-choice-bha',
    title: "Anua Heartleaf 77% Soothing Toner and Paula's Choice 2% BHA: Calm Pore-Clearing Order",
    category: 'Viral Bottle Pairing',
    activeA: 'houttuynia-cordata', activeB: 'salicylic-acid',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 92, deltaPh: 2.0, customPlain: true,
    conflictType: 'Great Combination · Apply BHA First on Dry Skin, Then Calm With Heartleaf',
    summary: "Anua Heartleaf 77% Soothing Toner takes the sting and redness out of exfoliating nights. Swipe Paula's Choice 2% BHA onto clean dry skin first so it can clear your pores, wait 5 minutes, and then pat on Anua Heartleaf Toner to cool and hydrate.",
    amRule: 'Pat 1–2 layers of Anua Heartleaf 77% Toner onto clean skin every morning before moisturizer and sunscreen.',
    pmRule: "On BHA nights (2–3x/week): apply Paula's Choice 2% BHA first, wait 5 minutes, pat on Anua Heartleaf Toner, and seal with ceramide cream.",
    waitTimeMinutes: 5,
    presetProducts: ['anua-heartleaf-77-toner', 'paulas-choice-2-bha', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'rhode-glazing-milk-and-tretinoin-layering-guide',
    title: 'Rhode Glazing Milk Before Tretinoin: Best Milky Prep Step to Prevent Flaking',
    category: 'Viral Bottle Pairing',
    activeA: 'ceramide-np', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 96, deltaPh: 0.3, customPlain: true,
    conflictType: 'Ideal Retinoid Prep · Apply Glazing Milk First, Wait 5 Mins, Then Tretinoin',
    summary: 'Rhode Glazing Milk is packed with ceramides, beta-glucan, and magnesium in a lightweight milky fluid that cushions dry skin without heavy waxes. Pressing a few drops into clean skin and letting it dry for 5 minutes before Tretinoin prevents retinoid flaking.',
    amRule: 'Press Rhode Glazing Milk onto clean skin in the morning for a dewy base under Vitamin C and SPF 50.',
    pmRule: 'Press Rhode Glazing Milk onto clean skin, wait 5 minutes until dry to the touch, apply Tretinoin, and finish with rich night cream.',
    waitTimeMinutes: 5,
    presetProducts: ['rhode-glazing-milk', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'medik8-crystal-retinal-and-vitamin-c-routine',
    title: 'Medik8 Crystal Retinal and Vitamin C: CSA Morning & Bedtime Pairing Guide',
    category: 'Viral Bottle Pairing',
    activeA: 'retinaldehyde', activeB: 'l-ascorbic-acid',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 56, deltaPh: 2.6, customPlain: true,
    conflictType: 'Classic Morning & Night Split · Vitamin C + SPF in AM, Crystal Retinal in PM',
    summary: 'Medik8 built its entire skincare philosophy around Vitamin C + Sunscreen by day and Vitamin A (Crystal Retinal) by night. Keeping Vitamin C in your morning routine and Crystal Retinal at bedtime gives you 24-hour firming and brightening with zero pH clash.',
    amRule: 'Morning: Apply Vitamin C serum on clean dry skin, wait 60 seconds, and top with moisturizer and SPF 50.',
    pmRule: 'Bedtime: Smooth 2 pumps of Medik8 Crystal Retinal onto dry skin, wait 2 minutes, and seal with ceramide moisturizer.',
    waitTimeMinutes: 720,
    presetProducts: ['medik8-crystal-retinal-6', 'skinceuticals-ce-ferulic', 'aestura-atobarrier-365']
  },
  {
    slug: 'sunday-riley-good-genes-and-retinol-alternating-nights',
    title: 'Sunday Riley Good Genes Lactic Acid and Retinol: How to Alternate for Glass Skin',
    category: 'Viral Bottle Pairing',
    activeA: 'lactic-acid', activeB: 'retinaldehyde',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 46, deltaPh: 2.3, customPlain: true,
    conflictType: 'Alternate Nights Only · Do Not Layer Good Genes & Retinol Together',
    summary: 'Sunday Riley Good Genes is formulated at a low pH (3.5) for rapid overnight glow. Layering it directly under or over Retinol in the same evening causes stinging and redness—alternating them on separate nights delivers smooth glass skin safely.',
    amRule: 'Wear hydrating serum, moisturizer, and SPF 50 every morning after using Good Genes or Retinol.',
    pmRule: 'Night 1: Apply 1–2 pumps of Sunday Riley Good Genes + moisturizer. Night 2: Apply Retinol + moisturizer. Nights 3 & 4: Hydrating barrier rest.',
    waitTimeMinutes: 1440,
    presetProducts: ['sunday-riley-good-genes', 'medik8-crystal-retinal-6', 'dieux-instant-angel']
  },
  {
    slug: 'panoxyl-benzoyl-peroxide-wash-and-tretinoin',
    title: 'Can You Use PanOxyl Benzoyl Peroxide Wash With Tretinoin? Morning Rinse vs. Night Cream',
    category: 'Viral Bottle Pairing',
    activeA: 'benzoyl-peroxide', activeB: 'tretinoin',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 50, deltaPh: 0.8, customPlain: true,
    conflictType: 'Never Use at the Same Time · PanOxyl Wash in AM Shower, Tretinoin at Bedtime',
    summary: 'Leave-on Benzoyl Peroxide deactivates Tretinoin on contact. However, dermatologists love pairing a morning PanOxyl Benzoyl Peroxide wash (rinsed off completely in the shower) with bedtime Tretinoin paired with a gentle cleanser at night.',
    amRule: 'Morning shower: Lather PanOxyl wash for 60 seconds, rinse 100% clean, and apply moisturizer and SPF 50.',
    pmRule: 'Bedtime: Wash with a gentle non-medicated cleanser (like Vanicream or CeraVe), dry completely, and apply Tretinoin + ceramide cream.',
    waitTimeMinutes: 720,
    presetProducts: ['panoxyl-10-bpo-wash', 'rx-tretinoin-005', 'cerave-pm-lotion']
  },
  {
    slug: 'tower-28-sos-spray-and-tretinoin-wait-time',
    title: 'Tower 28 SOS Hypochlorous Acid Spray and Tretinoin: The 5-Minute Dry-Down Rule',
    category: 'Viral Bottle Pairing',
    activeA: 'hypochlorous-acid', activeB: 'tretinoin',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 68, deltaPh: 1.0, customPlain: true,
    conflictType: 'Wait 5–10 Minutes Until 100% Dry Before Applying Tretinoin',
    summary: 'Tower 28 SOS Daily Rescue Facial Spray calms redness and breakout bacteria, but Hypochlorous Acid can oxidize Tretinoin if applied while wet. Mist Tower 28 right after cleansing, let your face air-dry completely for 5 to 10 minutes, and only then apply Tretinoin.',
    amRule: 'Mist Tower 28 SOS Spray freely in the morning or after workouts, letting it dry before applying serums.',
    pmRule: 'Cleanse, mist Tower 28 SOS Spray, wait 5–10 minutes until bone-dry, then apply Tretinoin and Aestura 365 Ceramide Cream.',
    waitTimeMinutes: 10,
    presetProducts: ['tower28-sos-spray', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'beauty-of-joseon-spf-50-pilling-under-makeup-fix',
    title: 'How to Stop Beauty of Joseon Relief Sun SPF 50 From Pilling Over Serums & Moisturizer',
    category: 'Viral Bottle Pairing',
    activeA: 'niacinamide', activeB: 'l-ascorbic-acid',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 89, deltaPh: 2.3, customPlain: true,
    conflictType: 'Zero Pilling Fix · Skip Heavy Gel-Creams & Wait 90 Seconds Before SPF',
    summary: 'Beauty of Joseon Relief Sun SPF 50+ is rich enough to double as your morning moisturizer. When it rolls into little white flakes under makeup, it is usually clashing with tacky Hyaluronic/Niacinamide gels underneath or applied before Vitamin C has dried.',
    amRule: 'Apply watery Vitamin C serum on dry skin, wait 60 seconds, skip heavy gel-cream (or use a thin layer), and pat—do not rub—Beauty of Joseon SPF 50.',
    pmRule: 'Save thick gel-creams, snail mucin, and multi-layer serums for your bedtime routine.',
    waitTimeMinutes: 2,
    presetProducts: ['boj-relief-sun-spf50', 'skinceuticals-ce-ferulic', 'cerave-pm-lotion']
  },
  {
    slug: 'the-ordinary-niacinamide-and-salicylic-acid-order',
    title: 'The Ordinary Niacinamide 10% and Salicylic Acid (2% BHA): Which Goes First for Pores?',
    category: 'Viral Bottle Pairing',
    activeA: 'salicylic-acid', activeB: 'niacinamide',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 84, deltaPh: 2.4, customPlain: true,
    conflictType: 'BHA Liquid First, Wait 5 Minutes, Then Pat 2–3 Drops of Niacinamide',
    summary: 'Salicylic Acid (2% BHA) dissolves oil inside clogged pores while Niacinamide 10% + Zinc 1% balances surface shine. Always apply your lower-pH BHA liquid first on clean skin, let it absorb for 5 minutes, and pat—never rub—2 drops of Niacinamide on top to avoid foaming.',
    amRule: 'Pat 2–3 drops of The Ordinary Niacinamide 10% onto damp skin in the morning before moisturizer and SPF 50.',
    pmRule: 'On exfoliation nights: apply 2% BHA liquid first, wait 5 minutes, pat 2 drops of Niacinamide 10%, and finish with moisturizer.',
    waitTimeMinutes: 5,
    presetProducts: ['to-niacinamide-10-zinc', 'paulas-choice-2-bha', 'cerave-pm-lotion']
  },
  {
    slug: 'the-ordinary-copper-peptides-and-retinol-conflict',
    title: 'The Ordinary Multi-Peptide + Copper Peptides and Retinol: How to Alternate Nights',
    category: 'Viral Bottle Pairing',
    activeA: 'copper-tripeptide-1', activeB: 'tretinoin',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 54, deltaPh: 0.6, customPlain: true,
    conflictType: 'Best on Alternate Nights · Avoid Overloading Sensitive Skin',
    summary: 'The Ordinary Multi-Peptide + Copper Peptides 1% Serum and Retinol/Tretinoin are both powerhouse firming treatments, but stacking them in the same evening can trigger redness and irritation. Alternating them on opposite nights gives your skin the best of both worlds.',
    amRule: 'You can also wear Copper Peptides in the morning on days when you are not wearing low-pH Vitamin C or exfoliating acids.',
    pmRule: 'Alternate nights: apply Tretinoin + ceramide cream on Night 1, and apply Copper Peptides + barrier cream on Night 2.',
    waitTimeMinutes: 720,
    presetProducts: ['to-buffet-copper-peptides', 'rx-tretinoin-005', 'dieux-instant-angel']
  },
  {
    slug: 'good-molecules-discoloration-serum-and-tretinoin',
    title: 'Good Molecules Discoloration Correcting Serum and Tretinoin: $12 Dark-Spot Pairing',
    category: 'Viral Bottle Pairing',
    activeA: 'tranexamic-acid', activeB: 'tretinoin',
    verdict: 'SYNERGISTIC_COMPATIBLE', compatibilityScore: 95, deltaPh: 0.4, customPlain: true,
    conflictType: '100% Compatible · Apply Good Molecules First, Wait 2 Mins, Then Tretinoin',
    summary: 'Good Molecules Discoloration Correcting Serum ($12, 3% Tranexamic Acid + 4% Niacinamide at pH 5.5) is one of the best affordable companions for Tretinoin. Its Niacinamide helps calm retinoid dryness while Tranexamic Acid speeds up dark-spot fading.',
    amRule: 'Smooth 3–4 drops of Good Molecules Discoloration Serum onto clean skin every morning before moisturizer and SPF 50.',
    pmRule: 'Apply Good Molecules Discoloration Serum first at bedtime, wait 2–5 minutes until dry, then apply Tretinoin and moisturizer.',
    waitTimeMinutes: 3,
    presetProducts: ['good-molecules-discoloration-serum', 'rx-tretinoin-005', 'cerave-pm-lotion']
  },
  {
    slug: 'timeless-vitamin-c-and-tretinoin-routine',
    title: 'Timeless 20% Vitamin C + Ferulic and Tretinoin: $26 Morning Shield + Night Renewal',
    category: 'Viral Bottle Pairing',
    activeA: 'l-ascorbic-acid', activeB: 'tretinoin',
    verdict: 'SPLIT_AM_PM', compatibilityScore: 50, deltaPh: 2.8, customPlain: true,
    conflictType: 'Strict Morning & Night Split · Timeless Vitamin C Has Low pH 2.7',
    summary: 'Timeless 20% Vitamin C + E Ferulic ($26) is formulated at an ultra-low pH 2.7 for maximum morning brightening. Never layer it at night with Tretinoin—wear Timeless in the morning under SPF 50 and keep Tretinoin strictly in your bedtime routine.',
    amRule: '7:30 AM: Apply 2–3 pumps of Timeless 20% Vitamin C on dry skin, wait 60 seconds, then apply moisturizer and SPF 50.',
    pmRule: '9:30 PM: Cleanse, let skin dry, apply Tretinoin, and seal with Aestura Atobarrier 365 Cream.',
    waitTimeMinutes: 720,
    presetProducts: ['timeless-20-vitamin-c', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'skin1004-centella-ampoule-and-tretinoin',
    title: 'SKIN1004 Madagascar Centella Ampoule and Tretinoin: Redness-Calming Buffer Order',
    category: 'Viral Bottle Pairing',
    activeA: 'centella-asiatica', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 96, deltaPh: 0.3, customPlain: true,
    conflictType: 'Soothing Companion · Apply Centella Ampoule First & Let Dry Completely',
    summary: 'SKIN1004 Madagascar Centella Ampoule is a pure, watery soothing layer that calms the warmth and redness of Tretinoin. Pat a dropperful onto clean skin after washing, wait 5 minutes until your skin feels dry, and then apply your Tretinoin.',
    amRule: 'Pat SKIN1004 Centella Ampoule onto clean skin in the morning under moisturizer and sunscreen to keep redness down all day.',
    pmRule: 'Apply Centella Ampoule on clean skin, wait 5 minutes until dry, smooth on Tretinoin, and finish with Illiyoon Ceramide Cream.',
    waitTimeMinutes: 5,
    presetProducts: ['skin1004-centella-ampoule', 'rx-tretinoin-005', 'illiyoon-ceramide-ato']
  },
  {
    slug: 'laneige-cream-skin-toner-and-tretinoin',
    title: 'LANEIGE Cream Skin Cerapeptide Toner and Tretinoin: 1-Step Milky Sandwich Prep',
    category: 'Viral Bottle Pairing',
    activeA: 'ceramide-np', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 97, deltaPh: 0.2, customPlain: true,
    conflictType: 'Perfect 1-Step Base Buffer · Pat On, Wait 5 Mins, Then Apply Tretinoin',
    summary: 'LANEIGE Cream Skin Cerapeptide Toner & Moisturizer gives you the cushioning comfort of a ceramide-peptide cream in a featherlight liquid. Using it as the first layer of your Tretinoin sandwich stops tightness without feeling heavy or greasy.',
    amRule: 'Pat 1–2 layers of LANEIGE Cream Skin Toner onto clean skin in the morning before SPF 50.',
    pmRule: 'Pat LANEIGE Cream Skin onto clean skin, let it dry for 5 minutes, apply pea-sized Tretinoin, and seal with Aestura 365 Cream.',
    waitTimeMinutes: 5,
    presetProducts: ['laneige-cream-skin-toner', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'dieux-instant-angel-and-tretinoin-layering',
    title: 'Dieux Instant Angel and Tretinoin: How to Layer Lipid-Rich Moisturizer Over Retinoids',
    category: 'Viral Bottle Pairing',
    activeA: 'ceramide-np', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 97, deltaPh: 0.2, customPlain: true,
    conflictType: 'Zero Clash · Best Luxury Barrier Seal Over Night Retinoids',
    summary: 'Created by cosmetic chemist Joyce de Lemos, Dieux Instant Angel combines ceramides, phytosterols, free fatty acids, and squalane at pH 5.4—making it an ideal cocooning night cream to apply right after Tretinoin absorbs.',
    amRule: 'Use a pea-sized amount of Dieux Instant Angel under SPF 50 on dry mornings.',
    pmRule: 'Apply Tretinoin on clean dry skin, wait 5 minutes, and press a generous layer of Dieux Instant Angel over your face and neck.',
    waitTimeMinutes: 5,
    presetProducts: ['dieux-instant-angel', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic']
  },
  {
    slug: 'dr-idriss-major-fade-and-retinol-routine',
    title: 'Dr. Idriss Major Fade Hyper Serum and Retinol: Dark-Spot & Smooth-Texture Pairing',
    category: 'Viral Bottle Pairing',
    activeA: 'alpha-arbutin', activeB: 'retinaldehyde',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 93, deltaPh: 0.4, customPlain: true,
    conflictType: 'Gentle Together · Layer Major Fade Serum Before Your Night Retinoid',
    summary: 'Dr. Idriss Major Fade Hyper Serum blends Alpha Arbutin, Kojic Acid, Niacinamide, and Glycerin in a soothing, non-acidic base that layers seamlessly under evening Retinol or Retinaldehyde without stinging.',
    amRule: 'Apply Dr. Idriss Major Fade Hyper Serum every morning on clean skin, followed by moisturizer and SPF 50+.',
    pmRule: 'Smooth Major Fade Hyper Serum onto clean skin first at bedtime, wait 60 seconds, then apply Retinol/Retinal and barrier cream.',
    waitTimeMinutes: 2,
    presetProducts: ['dr-idriss-major-fade-serum', 'medik8-crystal-retinal-6', 'dieux-instant-angel']
  },
  {
    slug: 'peach-slices-azelaic-acid-and-differin-adapalene',
    title: 'Peach Slices 10% Azelaic Acid and Differin Gel: Redness & Post-Acne Mark Routine',
    category: 'Viral Bottle Pairing',
    activeA: 'azelaic-acid', activeB: 'adapalene',
    verdict: 'COMPATIBLE_WITH_WAIT', compatibilityScore: 89, deltaPh: 0.6, customPlain: true,
    conflictType: 'Affordable Redness & Blemish Duo · Azelaic Acid in AM, Differin in PM',
    summary: 'Peach Slices Redness Relief Azelaic Acid 10% Serum ($11) fades red post-pimple marks while Differin 0.1% Adapalene Gel ($16) prevents new clogged pores. Splitting them between morning and bedtime clears skin fast with minimal dryness.',
    amRule: 'Morning: Apply Peach Slices 10% Azelaic Acid Serum on clean skin, followed by CeraVe PM Lotion and SPF 50.',
    pmRule: 'Bedtime: Apply a thin buffer of CeraVe PM Lotion, let dry, and dot a pea-sized amount of Differin 0.1% Gel over your face.',
    waitTimeMinutes: 10,
    presetProducts: ['peach-slices-azelaic-10', 'differin-adapalene-01', 'cerave-pm-lotion']
  },
  {
    slug: 'caudalie-vinoperfect-and-vitamin-c-or-retinol',
    title: 'Caudalie Vinoperfect Radiance Serum With Vitamin C or Retinol: Gentle Brightening Order',
    category: 'Viral Bottle Pairing',
    activeA: 'squalane', activeB: 'retinaldehyde',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 95, deltaPh: 0.3, customPlain: true,
    conflictType: '100% Non-Irritating · Pairs Safely With Both Vitamin C & Night Retinol',
    summary: 'Caudalie Vinoperfect Radiance Serum uses grape-sap Viniferine and Olive Squalane at skin-neutral pH 5.5 instead of harsh acids—so it never clashes with Retinol at night or Vitamin C in the morning.',
    amRule: 'Apply Caudalie Vinoperfect Serum in the morning before moisturizer and SPF 50 for a dewy, even-toned glow.',
    pmRule: 'At night, smooth on Caudalie Vinoperfect first, let it absorb for 60 seconds, and layer your Retinol on top.',
    waitTimeMinutes: 1,
    presetProducts: ['caudalie-vinoperfect', 'skinceuticals-ce-ferulic', 'medik8-crystal-retinal-6']
  },
  {
    slug: 'biologique-recherche-p50-and-tretinoin-warning',
    title: 'Biologique Recherche Lotion P50 and Tretinoin: Why You Must Alternate Nights',
    category: 'Viral Bottle Pairing',
    activeA: 'gluconolactone', activeB: 'tretinoin',
    verdict: 'CRITICAL_CLASH', compatibilityScore: 22, deltaPh: 2.3, customPlain: true,
    conflictType: 'Do Not Use Same Night · Alternate Lotion P50 & Tretinoin on Separate Evenings',
    summary: 'Biologique Recherche Lotion P50 combines lactic, malic, phytic, salicylic, and gluconolactone acids at a potent pH 3.2. Pressing P50 onto your skin on the same night as Tretinoin will rapidly over-exfoliate your barrier—always use them on separate nights.',
    amRule: 'Keep mornings ultra-soothing with a milky toner, ceramide barrier cream, and broad-spectrum SPF 50.',
    pmRule: 'Press (do not swipe) Lotion P50 onto skin 2 nights per week, use Tretinoin 2–3 other nights, and dedicate 2 nights to pure ceramide recovery.',
    waitTimeMinutes: 1440,
    presetProducts: ['biologique-recherche-p50-1970', 'rx-tretinoin-005', 'aestura-atobarrier-365']
  },
  {
    slug: 'avene-cicalfate-plus-over-tretinoin-peeling-rescue',
    title: 'Avène Cicalfate+ Cream Over Tretinoin: 72-Hour Barrier Rescue for Flaking Skin',
    category: 'Viral Bottle Pairing',
    activeA: 'zinc-oxide', activeB: 'tretinoin',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 95, deltaPh: 0.3, customPlain: true,
    conflictType: 'Best SOS Recovery Balm · Use on Rest Nights or Over Tretinoin Dry Spots',
    summary: 'Avène Cicalfate+ Restorative Protective Cream uses Zinc-Copper sulfates and post-biotic thermal water nutrients to calm raw, flaking retinoid patches around the chin and nose within 48 to 72 hours.',
    amRule: 'Cleanse with lukewarm water and Vanicream Gentle Cleanser, then apply lightweight moisturizer and SPF 50.',
    pmRule: 'On recovery nights (or 10 minutes after Tretinoin), warm a pea-sized dab of Avène Cicalfate+ between your fingertips and press onto flaky areas.',
    waitTimeMinutes: 10,
    presetProducts: ['avene-cicalfate-plus', 'rx-tretinoin-005', 'vanicream-gentle-cleanser']
  },
  {
    slug: 'torriden-dive-in-hyaluronic-serum-and-vitamin-c',
    title: 'Torriden DIVE-IN Hyaluronic Acid Serum and Vitamin C: Morning Glass-Skin Order',
    category: 'Viral Bottle Pairing',
    activeA: 'hyaluronic-acid', activeB: 'l-ascorbic-acid',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 96, deltaPh: 2.3, customPlain: true,
    conflictType: 'Vitamin C First on Dry Skin · Wait 60s, Then Pat Torriden DIVE-IN Serum',
    summary: 'Torriden DIVE-IN Low Molecular Hyaluronic Acid Serum + Panthenol eliminates the tight, sticky feel of pure Vitamin C serums. Always apply Vitamin C first on clean dry skin, wait 60 seconds, and then pat Torriden DIVE-IN on top for bouncy glass skin.',
    amRule: 'Step 1: Vitamin C serum on dry skin (wait 60s). Step 2: Torriden DIVE-IN Hyaluronic Serum. Step 3: Beauty of Joseon SPF 50.',
    pmRule: 'At night, pat Torriden DIVE-IN Serum onto damp skin right after cleansing to cushion your evening routine.',
    waitTimeMinutes: 1,
    presetProducts: ['torriden-dive-in-serum', 'skinceuticals-ce-ferulic', 'boj-relief-sun-spf50']
  },
  {
    slug: 'byoma-milky-toner-and-salicylic-acid-bha',
    title: 'BYOMA Hydrating Milky Toner and 2% BHA Salicylic Acid: How to Prevent Dryness',
    category: 'Viral Bottle Pairing',
    activeA: 'ceramide-np', activeB: 'salicylic-acid',
    verdict: 'SAFE_SYNERGY', compatibilityScore: 93, deltaPh: 1.9, customPlain: true,
    conflictType: 'Apply 2% BHA First to Clear Pores · Wait 5 Mins, Then Cushion With BYOMA',
    summary: 'BYOMA Hydrating Milky Toner (Tri-Ceramide + Polyglutamic Acid + Cica) prevents the dry, tight feeling that Salicylic Acid (2% BHA) can leave behind. Apply your 2% BHA liquid to clean skin first, wait 5 minutes, and press BYOMA Milky Toner over top.',
    amRule: 'Pat BYOMA Hydrating Milky Toner onto clean skin every morning before moisturizer and sunscreen.',
    pmRule: "Swipe 2% BHA Liquid Exfoliant onto clean skin 2–3 nights per week, wait 5 minutes, pat on BYOMA Milky Toner, and seal with CeraVe PM Lotion.",
    waitTimeMinutes: 5,
    presetProducts: ['byoma-hydrating-milky-toner', 'paulas-choice-2-bha', 'cerave-pm-lotion']
  }
];

const EXPANDED_PRODUCT_SEEDS = [
  {
    slug: 'finacea-15-gel-ph-and-inci-breakdown',
    title: 'Finacea 15% Azelaic Acid Foam & Gel: Everyday Layering & Tretinoin Pairing Guide',
    productId: 'finacea-15-azelaic',
    brand: 'LEO Pharma',
    name: 'Finacea 15% Azelaic Acid Foam',
    ph: 4.8,
    priceUsd: 65,
    inciList: 'Azelaic Acid 15%, Benzoic Acid, Cetostearyl Emulsifying Wax, Dimethyl Isosorbide, Methylparaben, Polysorbate 80, Propylene Glycol, Purified Water, Sodium Hydroxide, Xanthan Gum',
    conflictHighlights: 'Finacea 15% (pH 4.8) calms redness, rosacea bumps, and dark spots. Avoid layering directly with Copper Peptides in the same step; pairs wonderfully with Tretinoin, Tranexamic Acid, and Niacinamide.',
    companionProductIds: ['rx-tretinoin-005', 'skinceuticals-ce-ferulic', 'aestura-atobarrier-365']
  },
  {
    slug: 'aestura-atobarrier-365-cream-inci-and-ph-analysis',
    title: 'Aestura Atobarrier 365 Cream Bottle Guide: Ceramide Tretinoin Sandwich Routine',
    productId: 'aestura-atobarrier-365',
    brand: 'Aestura',
    name: 'Atobarrier 365 Cream',
    ph: 5.5,
    priceUsd: 32,
    inciList: 'Water, Glycerin, Butylene Glycol, Butylene Glycol Dicaprylate/Dicaprate, Pentaerythrityl Tetraisostearate, Cyclopentasiloxane, Squalane, Cetyl Ethylhexanoate, Behenyl Emulsifier, Stearic Acid, Hydroxypropyl Bispalmitamide MEA (Ceramide NP), Cholesterol, Palmitic Acid, Allantoin, Panthenol',
    conflictHighlights: 'Aestura Atobarrier 365 is formulated at skin-neutral pH 5.5 with melting ceramide-cholesterol-fatty acid capsules. Zero active conflicts—ideal cushioning cream for Tretinoin, Adapalene, and exfoliating nights.',
    companionProductIds: ['rx-tretinoin-005', 'finacea-15-azelaic', 'paulas-choice-2-bha']
  },
  {
    slug: 'skinoren-20-cream-ph-and-layering-protocol',
    title: 'Skinoren 20% Azelaic Acid Cream: Redness, Blemish & Night Layering Routine',
    productId: 'finacea-15-azelaic',
    brand: 'Bayer / Intendis',
    name: 'Skinoren 20% Cream',
    ph: 4.8,
    priceUsd: 39,
    inciList: 'Azelaic Acid 200mg/g (20%), Arlatone 983S (PEG-5 Glyceryl Stearate), Cutina CBS, Cetearyl Octanoate, Propylene Glycol, Glycerol 85%, Benzoic Acid, Purified Water',
    conflictHighlights: 'Skinoren 20% is a rich, smoothing Azelaic Acid cream at pH 4.8. Can cause a brief warm tingle if applied on damp skin—always apply to dry skin and do not stack with Glycolic Acid on the same night.',
    companionProductIds: ['rx-tretinoin-005', 'aestura-atobarrier-365', 'cerave-pm-lotion']
  },
  {
    slug: 'differin-01-gel-ph-and-active-compatibility',
    title: 'Differin 0.1% Adapalene Gel: Blemish Clearing & BHA/BPO Layering Guide',
    productId: 'differin-adapalene-01',
    brand: 'Differin',
    name: 'Adapalene Gel 0.1% Acne Treatment',
    ph: 5.5,
    priceUsd: 16,
    inciList: 'Adapalene 0.1%, Carbomer 940, Edetate Disodium, Methylparaben, Poloxamer 182, Propylene Glycol, Purified Water, Sodium Hydroxide',
    conflictHighlights: 'Differin 0.1% (Adapalene) is a gentle, light-stable retinoid that stays effective alongside Benzoyl Peroxide, but should be alternated on separate nights from leave-on Glycolic or Salicylic Acid toners.',
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
      let conflictType = 'Gentle Together · Layer Thinnest to Richest';

      if ((idA === 'hypochlorous-acid' || idB === 'hypochlorous-acid') && (clsA.includes('vitamin_c') || clsB.includes('vitamin_c') || clsA.includes('retinoid') || clsB.includes('retinoid') || clsA.includes('peptide') || clsB.includes('peptide'))) {
        verdict = 'COMPATIBLE_WITH_WAIT'; compatibilityScore = 62; waitTimeMinutes = 10;
        conflictType = 'Let Mist Dry 100% First (Wait 5–10 Minutes Before Serums)';
      } else if ((clsA === 'benzoyl_peroxide' || clsB === 'benzoyl_peroxide') && (clsA.includes('retinoid') || clsB.includes('retinoid') || clsA.includes('vitamin_c') || clsB.includes('vitamin_c'))) {
        verdict = 'CRITICAL_CLASH'; compatibilityScore = 24; waitTimeMinutes = 720;
        conflictType = 'Cancels Out on Contact · Separate Morning & Bedtime';
      } else if ((clsA.includes('peptide') || clsB.includes('peptide')) && (deltaPh >= 1.8 || clsA.includes('aha') || clsB.includes('aha') || clsA.includes('bha') || clsB.includes('bha'))) {
        verdict = 'CRITICAL_CLASH'; compatibilityScore = 29; waitTimeMinutes = 720;
        conflictType = 'Strong Acids Weaken Peptides · Separate Morning & Night';
      } else if (isStrongA && isStrongB && !isSoothing(clsA) && !isSoothing(clsB)) {
        verdict = 'SPLIT_AM_PM'; compatibilityScore = deltaPh >= 1.5 ? 46 : 58; waitTimeMinutes = 720;
        conflictType = 'Too Strong Together · Alternate Nights to Prevent Peeling';
      } else if (deltaPh >= 1.6) {
        verdict = 'COMPATIBLE_WITH_WAIT'; compatibilityScore = 76; waitTimeMinutes = 5;
        conflictType = 'Apply Lighter Formula First · Wait 60 Seconds to Absorb';
      }

      const nameA = cleanIngName(ingA.commonName), nameB = cleanIngName(ingB.commonName);
      generated.push({
        slug, title: `Can You Layer ${nameA} and ${nameB}? Morning & Night Routine Guide`,
        category: 'Active Pair Matrix', activeA: idA, activeB: idB, verdict, compatibilityScore, deltaPh, conflictType,
        summary: `Everyday layering guide for ${nameA} (pH ${ingA.phMin} to ${ingA.phMax}) and ${nameB} (pH ${ingB.phMin} to ${ingB.phMax}) so your serums absorb smoothly without stinging or pilling.`,
        amRule: `In the morning, apply watery antioxidant or hydrating layers first on clean skin and finish with broad-spectrum SPF 50.`,
        pmRule: waitTimeMinutes >= 720 ? `Alternate nights or separate ${nameA} and ${nameB} between morning and evening routines, cushioning with ceramide moisturizer.` : `Apply the lighter formula first, wait ${waitTimeMinutes} minute(s) to absorb, then smooth on the second step.`,
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
    const summaryText = sanitizeBannedTerms(`${safeCommon} (${safeInci}) works best at pH ${ing.phMin} to ${ing.phMax} (pore-clogging score ${ing.comedogenicity}/5). See how to layer it cleanly in your morning or bedtime routine without irritation.`);
    pages.push({
      slug: ingSlug, pageType: 'ingredient_guide',
      title: `${safeCommon}: Pore-Safety & Morning/Night Skincare Layering Guide`,
      metaDescription: formatMetaDescription(summaryText, 155), category: 'Ingredient Fact Sheet',
      verdict: isLowPh ? 'LOW_PH_ACTIVE' : (isRetinoid ? 'SPLIT_AM_PM' : 'SAFE_SYNERGY'),
      compatibilityScore: ing.comedogenicity >= 3 ? 58 : (isLowPh || isRetinoid ? 74 : 94),
      deltaPh: Number(Math.abs(5.5 - (Number(ing.phMin) + Number(ing.phMax)) / 2).toFixed(1)),
      conflictType: sanitizeBannedTerms(`${ing.functionRole || ing.category} · pH ${ing.phMin} to ${ing.phMax} · Pore Score ${ing.comedogenicity}/5`),
      summary: summaryText, labConflictType: sanitizeBannedTerms(`${safeCommon} · pH ${ing.phMin} to ${ing.phMax}`),
      labSummary: summaryText,
      amRule: isRetinoid ? `Save ${safeCommon} for your bedtime routine and wear broad-spectrum SPF 50 every morning.` : `Apply ${safeCommon} from thinnest to richest texture (watery serums before creams) and finish with broad-spectrum SPF 50 in the morning.`,
      pmRule: `In your evening routine, pair ${safeCommon} with a soothing ceramide moisturizer and avoid stacking multiple strong exfoliants on the same night.`,
      waitTimeMinutes: isLowPh ? 5 : 1, ingredientA: ing, ingredientB: companionIng || null,
      comparisonIngredients: [ing, companionIng].filter(Boolean), product: null,
      presetProducts: ['skinceuticals-ce-ferulic', 'cerave-pm-lotion', 'aestura-atobarrier-365'],
      faqs: [
        { q: `When should I apply ${safeCommon} in my morning or night routine?`, a: `${safeCommon} works at pH ${ing.phMin} to ${ing.phMax}. Apply watery serums on clean skin before richer creams, and separate strong exfoliants or retinoids into your evening routine.` },
        { q: `Does ${safeCommon} clog pores or trigger fungal-acne bumps?`, a: `${safeCommon} has a pore-clogging rating of ${ing.comedogenicity}/5 and is ${ing.malasseziaTrigger ? 'flagged as a rich lipid to watch if you are prone to fungal-acne bumps' : '100% fungal-acne safe for breakout-prone skin'}.` },
        { q: `Can ${safeCommon} trigger allergic contact rashes or hives?`, a: `Screen ${safeCommon} (${safeInci}) against 8 EU CosIng contact-allergy groups (fragrance/essential oils, dust-mite snail mucin, salicylates, propylene glycol, lanolin, formaldehyde releasers, cocamidopropyl betaine, and chemical UV filters) in the free DermLogic checker above, and unlock the 9:30 PM hypoallergenic recovery schedule + 2 dupes free ($0 email).` },
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
