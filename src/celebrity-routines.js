'use strict';

/**
 * DermLogic Celebrity Skincare Shelves & Routine Breakdowns (/celebrity/:slug)
 * Grounded in public interviews (Vogue Beauty Secrets, Harper's Bazaar Go To Bed With Me,
 * Into The Gloss Top Shelf) and mapped to DermLogic's CULT_PRODUCTS & CLINICAL_INGREDIENTS.
 * Extensible via data/celebrity_routines_custom.json for ongoing iterative search augmentation.
 */

const fs = require('fs');
const path = require('path');

const CELEBRITY_ROUTINES = [
  {
    slug: 'hailey-bieber',
    name: 'Hailey Bieber',
    moniker: 'The "Glazed Donut" Peptide & Barrier Shelf',
    skinProfile: 'Dry, Eczema-Prone & Barrier-Focused',
    sourceNote: 'Vogue Beauty Secrets & Allure Routine Interview',
    sourcePublication: 'Vogue',
    sourceTitle: 'Hailey Bieber’s Everyday Glazed-Skin & Barrier Prep Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/hailey-bieber-skincare-routine',
    heroImg: '/public/editorial-woman-morning.jpg',
    signatureLook: 'Dewy, peptide-cushioned glass skin that never pills under sheer complexion fluid',
    summary: 'Hailey Bieber builds her routine around milky ceramide essences, peptide glazing fluids, and rich barrier creams, keeping harsh low-pH exfoliating acids out of her daily morning prep so makeup melts evenly into skin.',
    amSteps: [
      { step: '1. Lukewarm Rinse & Mist', detail: 'Skips stripping foaming cleansers in the morning; mists clean skin to create a damp humectant base.' },
      { step: '2. Milky Ceramide Essence + Peptide Fluid', detail: 'Pats on a ceramide-rich glazing essence followed by a niacinamide and peptide hydrating serum while skin is still dewy.' },
      { step: '3. Lightweight Barrier Cream + Mineral SPF 46', detail: 'Waits 60 seconds for peptides to settle before sealing with barrier cream and broad-spectrum SPF so foundation never pills.' }
    ],
    pmSteps: [
      { step: '1. Oil-to-Milk Double Cleanse', detail: 'Melts away sunscreen and cheek tint for 60 seconds before a gentle water-based second cleanse.' },
      { step: '2. Peptide Serum (No Acids Same-Night)', detail: 'Applies Copper & Signal Peptides on calm, non-acidic skin so peptide bonds stay intact overnight.' },
      { step: '3. Rich Ceramide Cushion & Spot Glaze', detail: 'Locks in moisture with a 3:1:1 ceramide cream and presses a pea-sized balm over dry cheekbones.' }
    ],
    clashWarning: 'Never layer Hailey’s signature Peptide Glazing serums directly over Glycolic Acid 7% or pure L-Ascorbic Acid (pH 3.2) in the same step; low pH breaks fragile peptide chains and causes tightness.',
    dupeSwap: {
      luxury: 'SkinCeuticals C E Ferulic ($182) + Luxury Peptide Serum ($68)',
      gentleDupe: 'The Ordinary Multi-Peptide + HA ($19) + Aestura Atobarrier 365 Cream ($32)',
      savingsNote: 'Saves $199 while keeping 100% barrier-safe peptide and ceramide ratios'
    },
    productIds: ['to-buffet-copper-peptides', 'aestura-atobarrier-365', 'lrp-cicaplast-baume-b5', 'eltamd-uv-clear-spf46'],
    activeIds: ['copper-tripeptide-1', 'niacinamide', 'ceramide-np', 'hyaluronic-acid', 'panthenol']
  },
  {
    slug: 'sydney-sweeney',
    name: 'Sydney Sweeney',
    moniker: 'The Double-Cleanse, Ice-Roll & Hyaluronic Barrier Shelf',
    skinProfile: 'Combination, Breakout-Prone & Sensitive',
    sourceNote: 'Harper’s Bazaar Go To Bed With Me & Vogue Beauty Secrets',
    sourcePublication: 'Harper’s Bazaar',
    sourceTitle: 'Sydney Sweeney Shares Her Nighttime Skincare & Ice-Roller Routine (Go To Bed With Me)',
    sourceUrl: 'https://www.harpersbazaar.com/beauty/skin-care/a38961051/sydney-sweeney-skincare-routine/',
    heroImg: '/public/editorial-woman-evening.jpg',
    signatureLook: 'Calm, sculpted morning glow with zero congestion after long filming days',
    summary: 'Having struggled with cystic and combination breakouts, Sydney Sweeney relies on thorough oil-to-milk double cleansing, morning ice rolling, pure Vitamin C under SPF 50, and hyaluronic sleeping masks, strictly separating exfoliating acids from nightly barrier creams.',
    amSteps: [
      { step: '1. Gentle Cleanse & Morning Ice Roll', detail: 'Always glides her ice roller over freshly cleansed skin (never over dirty skin) to calm morning puffiness and redness.' },
      { step: '2. Pure Vitamin C Serum (SkinCeuticals C E Ferulic)', detail: 'Pats 4 drops of 15% L-Ascorbic Acid + Ferulic Acid onto dry skin for antioxidant brightness.' },
      { step: '3. Hyaluronic Water Cream + SPF 50+', detail: 'Waits 60 seconds after Vitamin C before smoothing on hyaluronic gel-cream and invisible SPF 50.' }
    ],
    pmSteps: [
      { step: '1. Milky Oil Double Cleanse', detail: 'Dissolves heavy set makeup thoroughly so pores never stay congested overnight.' },
      { step: '2. Alternating Retinoid or Hyaluronic Bounce', detail: 'Uses retinoid renewal 2–3 nights a week and pure hyaluronic acid + ceramide recovery on off-nights.' },
      { step: '3. Overnight Water-Bank Sleeping Mask', detail: 'Seals hydration with a non-comedogenic hyaluronic sleeping mask and lip mask.' }
    ],
    clashWarning: 'Because Sydney uses potent morning Vitamin C (SkinCeuticals C E Ferulic, pH 3.2), she keeps retinoids and exfoliating acids strictly in her nighttime routine to prevent stinging and redness.',
    dupeSwap: {
      luxury: 'SkinCeuticals C E Ferulic ($182) + Luxury Hyaluronic Mask ($48)',
      gentleDupe: 'Timeless 20% Vitamin C + E Ferulic ($26) + COSRX Snail 96 Mucin ($25)',
      savingsNote: 'Saves $179 with identical L-Ascorbic + Ferulic antioxidant protection'
    },
    productIds: ['skinceuticals-ce-ferulic', 'cosrx-snail-96-mucin', 'aestura-atobarrier-365', 'boj-relief-sun-spf50'],
    activeIds: ['l-ascorbic-acid', 'ferulic-acid', 'hyaluronic-acid', 'niacinamide', 'ceramide-np']
  },
  {
    slug: 'sofia-richie-grainge',
    name: 'Sofia Richie Grainge',
    moniker: 'The Rosacea-Safe Minimalist & Hypochlorous Mist Shelf',
    skinProfile: 'Sensitive, Rosacea-Prone & Postpartum Reactive',
    sourceNote: 'Vogue Beauty Secrets & Minimalist Barrier Routine',
    sourcePublication: 'Vogue',
    sourceTitle: 'Sofia Richie Grainge’s Sensitive-Skin & Everyday Glam Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/sofia-richie-beauty-secrets',
    heroImg: '/public/routines/sofia-mist.jpg',
    imgPos: '50% 28%',
    signatureLook: 'Calm, porcelain-smooth quiet-luxury skin with zero flushing',
    summary: 'To keep rosacea and hormonal breakouts calm, Sofia Richie Grainge uses a $7 non-comedogenic cleanser, purifying Hypochlorous Acid mist, restorative zinc/cica barrier cream under makeup, and mineral SPF 50.',
    amSteps: [
      { step: '1. Gentle Non-Comedogenic Cleanse', detail: 'Washes with a fragrance-free sensitive skin cleanser and pats dry with a clean towel.' },
      { step: '2. Hypochlorous Acid Purifying Mist (Wait 10m)', detail: 'Spritzes calming Hypochlorous Acid mist and lets it dry 100% before touching any other serum.' },
      { step: '3. Restorative Cica/B5 Balm + Tinted Mineral SPF 50', detail: 'Warms a thin layer of restorative barrier cream between fingers as a soothing makeup primer under SPF 50.' }
    ],
    pmSteps: [
      { step: '1. Fragrance-Free Cleanse & LED Calm', detail: 'Removes mineral SPF gently and uses red/cryo LED therapy to calm cheek redness.' },
      { step: '2. Azelaic Acid or Soothing Centella', detail: 'Applies rosacea-friendly Azelaic Acid or Centella Asiatica instead of harsh glycolic peels.' },
      { step: '3. Restorative Barrier Balm Seal', detail: 'Cushions reactive areas with Panthenol B5 and zinc restorative cream.' }
    ],
    clashWarning: 'Crucial rule from Sofia’s shelf: Hypochlorous Acid mist MUST dry completely (5–10 minutes) before applying Vitamin C, Retinol, or Peptides; otherwise it oxidizes and deactivates your serums on contact.',
    dupeSwap: {
      luxury: 'Hydrinity Hyacyn Mist ($60) + Luxury Barrier Balm ($58)',
      gentleDupe: 'Tower 28 SOS Hypochlorous Spray ($28) + La Roche-Posay Cicaplast Baume B5+ ($18)',
      savingsNote: 'Saves $72 with identical 0.015% Hypochlorous Acid and 5% Panthenol + Madecassoside'
    },
    productIds: ['tower28-sos-spray', 'lrp-cicaplast-baume-b5', 'finacea-15-azelaic', 'eltamd-uv-clear-spf46'],
    activeIds: ['hypochlorous-acid', 'panthenol', 'centella-asiatica', 'azelaic-acid', 'zinc-pca']
  },
  {
    slug: 'emily-ratajkowski',
    name: 'Emily Ratajkowski',
    moniker: 'The French Pharmacy & Biologique Recherche P50 Shelf',
    skinProfile: 'Normal-to-Combination & Texture-Focused',
    sourceNote: 'Vogue Beauty Secrets & French Pharmacy Staples',
    sourcePublication: 'Vogue',
    sourceTitle: 'Emily Ratajkowski’s French Pharmacy & Luminous Skin Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/emily-ratajkowski-beauty-secrets-skin-care-makeup-routine',
    heroImg: '/public/routines/emily-french-pharmacy.jpg',
    imgPos: '50% 25%',
    signatureLook: 'Luminous, poreless editorial skin powered by French pharmacy classics',
    summary: 'Emily Ratajkowski swears by French pharmacy staples: Bioderma Sensibio H2O micellar water, Biologique Recherche Lotion P50 exfoliating toner, soothing Snail Mucin essence, and rich protective healing balms.',
    amSteps: [
      { step: '1. Bioderma Micellar Sweep & Rinse', detail: 'Gently refreshes skin with micellar water and a splash of cool water.' },
      { step: '2. Snail Mucin 96% Hydrating Essence', detail: 'Presses snail mucin onto damp skin for instant plumping under daylight SPF.' },
      { step: '3. Lightweight Ceramide Lotion + SPF 50', detail: 'Finishes with breathable moisture and probiotic rice SPF 50.' }
    ],
    pmSteps: [
      { step: '1. Thorough Micellar + Gel Cleanse', detail: 'Removes all traces of city pollution and makeup.' },
      { step: '2. Biologique Recherche Lotion P50 (Press, Don’t Swipe)', detail: 'Presses P50 acid toner into skin with a cotton pad 2–3 nights a week, never on the same night as Retinol.' },
      { step: '3. Snail Mucin + Cicaplast / Healing Balm Cushion', detail: 'Waits 10 minutes after P50, then floods skin with Snail Mucin and seals with a restorative balm.' }
    ],
    clashWarning: 'Biologique Recherche Lotion P50 has an ultra-low pH (~3.0). Never layer Copper Peptides, Tretinoin, or Vitamin C in the same evening as Lotion P50.',
    dupeSwap: {
      luxury: 'Biologique Recherche Lotion P50 ($115)',
      gentleDupe: 'Paula’s Choice 2% BHA Liquid ($35) or The Ordinary Glycolic 7% ($13)',
      savingsNote: 'Saves $80–$102 while keeping gentle alternate-night exfoliation'
    },
    productIds: ['biologique-recherche-p50-1970', 'cosrx-snail-96-mucin', 'lrp-cicaplast-baume-b5', 'boj-relief-sun-spf50'],
    activeIds: ['lactic-acid', 'salicylic-acid', 'gluconolactone', 'panthenol', 'centella-asiatica']
  },
  {
    slug: 'sabrina-carpenter',
    name: 'Sabrina Carpenter',
    moniker: 'The Stage-Proof Soft-Glam & Blemish-Safe Prep Shelf',
    skinProfile: 'Combination, Stage-Makeup Heavy & Blemish-Prone',
    sourceNote: 'Vogue Beauty Secrets & Tour Skincare Prep',
    sourcePublication: 'Vogue',
    sourceTitle: 'Sabrina Carpenter’s Soft-Glam Skin Prep & Blush Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/sabrina-carpenter-beauty-secrets',
    heroImg: '/public/routines/sabrina-soft-glam.jpg',
    imgPos: '50% 26%',
    signatureLook: 'Velvety, pore-blurred porcelain base that holds blush for 12 hours without caking',
    summary: 'Wearing heavy stage and red-carpet makeup every night requires ultra-gentle, non-pilling prep: Sabrina Carpenter’s routine focuses on gentle pH-balanced cleansing, soothing heartleaf/niacinamide hydration, and silicone-free ceramide moisture.',
    amSteps: [
      { step: '1. pH-Balanced Gentle Cleanse', detail: 'Cleanses without sulfates so the skin barrier stays calm before makeup application.' },
      { step: '2. Soothing Heartleaf 77% Toner + Niacinamide', detail: 'Calms cheek redness and balances T-zone oil so cream blush adheres evenly.' },
      { step: '3. Oil-Free Ceramide Lotion + UV Clear SPF 46', detail: 'Gives moisturizer 90 seconds to absorb before primer and SPF.' }
    ],
    pmSteps: [
      { step: '1. Double Cleanse + Salicylic Pore Sweep', detail: 'Melts stage makeup completely and uses 2% BHA 2–3 nights a week to keep pores clear.' },
      { step: '2. Hydrating Snail & Peptide Essence', detail: 'Replenishes water content lost under hot stage lights.' },
      { step: '3. Breathable Ceramide PM Lotion', detail: 'Locks in moisture with a non-comedogenic niacinamide + ceramide night lotion.' }
    ],
    clashWarning: 'Avoid applying heavy occlusive balms or high-strength Glycolic Acid right before stage or daytime makeup, as it causes foundation and cream blush to separate and pill.',
    dupeSwap: {
      luxury: 'Luxury Makeup-Prep Serum ($85) + Designer Cream ($95)',
      gentleDupe: 'Anua Heartleaf 77% Toner ($20) + CeraVe PM Facial Moisturizing Lotion ($16)',
      savingsNote: 'Saves $144 with artist-approved, zero-pilling makeup prep'
    },
    productIds: ['anua-heartleaf-77-toner', 'cerave-pm-lotion', 'paulas-choice-2-bha', 'eltamd-uv-clear-spf46'],
    activeIds: ['niacinamide', 'salicylic-acid', 'hyaluronic-acid', 'ceramide-np', 'centella-asiatica']
  },
  {
    slug: 'madison-beer',
    name: 'Madison Beer',
    moniker: 'The PanOxyl Blemish-Clearing & Whipped Ceramide Shelf',
    skinProfile: 'Acne-Prone, Combination & Barrier-Conscious',
    sourceNote: 'Vogue Beauty Secrets Acne-Clearing Routine',
    sourcePublication: 'Vogue',
    sourceTitle: 'Madison Beer’s Acne-Safe Skincare & Everyday Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/madison-beer-beauty-secrets-acne-skincare-makeup-routine',
    heroImg: '/public/routines/madison-cleanse.jpg',
    imgPos: '50% 24%',
    signatureLook: 'Clear, glass-smooth skin that balances acne washes with rich ceramide recovery',
    summary: 'Madison Beer openly shared how she cleared her breakouts by pairing a Benzoyl Peroxide foaming wash (PanOxyl) with milky hydrating toners and rich whipped ceramide moisturizers, never letting peroxide dry out her barrier.',
    amSteps: [
      { step: '1. Short-Contact Benzoyl Peroxide Wash (PanOxyl)', detail: 'Massages PanOxyl wash onto blemish-prone zones for 60 seconds, then rinses thoroughly with lukewarm water.' },
      { step: '2. Milky Ceramide & Hyaluronic Toner', detail: 'Immediately floods clean skin with hydrating toner to counteract dryness.' },
      { step: '3. Barrier Moisturizer + Niacinamide SPF 46', detail: 'Seals in hydration and protects healing blemishes from dark spots with SPF 46.' }
    ],
    pmSteps: [
      { step: '1. Gentle Non-Active Evening Cleanse', detail: 'Uses a gentle hydrating cleanser at night so evening actives don’t clash with Benzoyl Peroxide.' },
      { step: '2. Adapalene / Retinoid (Buffered)', detail: 'Applies a pea-sized retinoid over a thin layer of moisturizer on alternate nights.' },
      { step: '3. Whipped Ceramide Barrier Cream', detail: 'Finishes with a rich 3:1:1 ceramide and marula/squalane barrier cream.' }
    ],
    clashWarning: 'Never leave Benzoyl Peroxide on the skin at the same time as Tretinoin, Retinol, or Vitamin C; peroxide oxidizes and wipes out retinoid and Vitamin C potency on contact. Keep PanOxyl as a rinse-off morning wash.',
    dupeSwap: {
      luxury: 'Drunk Elephant Lala Retro Cream ($64) + Luxury Blemish Serum ($72)',
      gentleDupe: 'PanOxyl 10% Wash ($12) + Differin Adapalene 0.1% ($16) + Aestura Atobarrier 365 ($32)',
      savingsNote: 'Saves $76 with dermatologist-backed acne clearing and ceramide buffering'
    },
    productIds: ['panoxyl-10-bpo-wash', 'differin-adapalene-01', 'aestura-atobarrier-365', 'eltamd-uv-clear-spf46'],
    activeIds: ['benzoyl-peroxide', 'adapalene', 'ceramide-np', 'niacinamide', 'hyaluronic-acid']
  },
  {
    slug: 'zendaya',
    name: 'Zendaya',
    moniker: 'The Eczema-Safe "Less Is More" Calming Shelf',
    skinProfile: 'Sensitive, Eczema-Prone & Reactive',
    sourceNote: 'Harper’s Bazaar & Allure Sensitive-Skin Interview',
    sourcePublication: 'Allure',
    sourceTitle: 'Zendaya’s Minimalist Sensitive-Skin & Barrier Care Routine',
    sourceUrl: 'https://www.allure.com/story/zendaya-skin-care-routine-products',
    heroImg: '/public/routines/zendaya-calm-balm.jpg',
    imgPos: '50% 24%',
    signatureLook: 'Naturally radiant, calm complexion with zero over-exfoliation',
    summary: 'Zendaya has shared that overloading her shelf with 10 steps triggers eczema flare-ups. Her routine focuses on soothing, fragrance-free hydration, Vitamin E antioxidant care, lightweight gel moisture, and targeted balm slugging.',
    amSteps: [
      { step: '1. Ultra-Calming Oat / Micellar Cleanse', detail: 'Removes overnight oils gently without disrupting sensitive patches.' },
      { step: '2. Soothing Niacinamide & Panthenol Hydration', detail: 'Applies a calm, fragrance-free hydrating layer to support the lipid barrier.' },
      { step: '3. Lightweight Moisturizing Gel + SPF 46', detail: 'Uses breathable moisture and mineral-blend SPF every morning.' }
    ],
    pmSteps: [
      { step: '1. Gentle Makeup Melt & Rinse', detail: 'Dissolves filming makeup without harsh scrubbing.' },
      { step: '2. Barrier-Repairing Ceramide + Vitamin E Layer', detail: 'Replenishes dry zones with soothing lipids and Panthenol B5.' },
      { step: '3. Targeted Balm Seal on Dry Patches', detail: 'Presses healing balm onto lips, brows, and dry cheek patches, never over active acids.' }
    ],
    clashWarning: 'If you have eczema-prone skin like Zendaya, never layer occlusive slugging balms over Glycolic, Lactic, or Salicylic Acid; trapping acids under a heavy balm magnifies irritation 3x.',
    dupeSwap: {
      luxury: 'Luxury Soothing Serum ($90) + Designer Recovery Balm ($65)',
      gentleDupe: 'La Roche-Posay Cicaplast Baume B5+ ($18) + CeraVe PM Lotion ($16)',
      savingsNote: 'Saves $121 with dermatologist-trusted eczema-safe barrier repair'
    },
    productIds: ['lrp-cicaplast-baume-b5', 'cerave-pm-lotion', 'anua-heartleaf-77-toner', 'eltamd-uv-clear-spf46'],
    activeIds: ['panthenol', 'ceramide-np', 'niacinamide', 'centella-asiatica', 'squalane']
  },
  {
    slug: 'margot-robbie',
    name: 'Margot Robbie',
    moniker: 'The Post-Flight BHA Pad & Peptide Luxe Shelf',
    skinProfile: 'Normal-to-Dry, Frequent Flyer & Red-Carpet Ready',
    sourceNote: 'Harper’s Bazaar UK & Vogue Post-Flight Skincare Interview',
    sourcePublication: 'Harper’s Bazaar',
    sourceTitle: 'Margot Robbie Shares Every Product in Her Skincare Routine',
    sourceUrl: 'https://www.harpersbazaar.com/uk/beauty/skincare/a44573578/margot-robbie-skincare-routine/',
    heroImg: '/public/routines/margot-post-flight.jpg',
    imgPos: '50% 22%',
    signatureLook: 'Bright, lifted, camera-ready skin even after 14-hour international flights',
    summary: 'Margot Robbie is disciplined about immediate post-flight cleansing, swiping a Salicylic/Glycolic complexion pad to prevent travel breakouts, misting with hydrating hydrosols, and sealing with rich peptide-caviar moisture.',
    amSteps: [
      { step: '1. Brightening Cleanse & Hydrating Mist', detail: 'Wakes up travel-tired skin with a gentle cleanse and antioxidant mist.' },
      { step: '2. Vitamin C + Ferulic Brightening Serum', detail: 'Applies morning antioxidants to counter UV and cabin air dullness.' },
      { step: '3. Peptide Cream + Invisible SPF 50+', detail: 'Smooths on firming moisture and high-protection SPF 50.' }
    ],
    pmSteps: [
      { step: '1. Immediate Post-Wrap Double Cleanse', detail: 'Never sleeps in makeup; cleanses as soon as filming or flights end.' },
      { step: '2. BHA Salicylic Complexion Sweep (2–3x/Week)', detail: 'Clears congested pores after long wear, waiting 10 minutes before creams.' },
      { step: '3. Rich Peptide & Ceramide Night Cream', detail: 'Restores bounce and elasticity overnight.' }
    ],
    clashWarning: 'On nights you swipe a Salicylic/Glycolic acid pad, skip Copper Peptides and Retinol, and save firming peptides for your non-exfoliating recovery nights.',
    dupeSwap: {
      luxury: 'La Prairie Luxe Cream ($595) + Complexion Pads ($52)',
      gentleDupe: 'Paula’s Choice 2% BHA ($35) + Dieux Instant Angel Lipid Cream ($45)',
      savingsNote: 'Saves $567 with clinical 2% BHA pore clearing and rich peptide-ceramide lipids'
    },
    productIds: ['paulas-choice-2-bha', 'skinceuticals-ce-ferulic', 'dieux-instant-angel', 'boj-relief-sun-spf50'],
    activeIds: ['salicylic-acid', 'l-ascorbic-acid', 'palmitoyl-tripeptide-1', 'ceramide-np', 'squalane']
  },
  {
    slug: 'selena-gomez',
    name: 'Selena Gomez',
    moniker: 'The Dewy Hyaluronic, Niacinamide & Mineral SPF Shelf',
    skinProfile: 'Sensitive, Lupus-Conscious & Moisture-First',
    sourceNote: 'Vogue Beauty Secrets & Dewy Prep Routine',
    sourcePublication: 'Vogue',
    sourceTitle: 'Selena Gomez’s Dewy Skincare & Makeup Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/selena-gomez-beauty-secrets',
    heroImg: '/public/routines/selena-dewy-bounce.jpg',
    imgPos: '50% 25%',
    signatureLook: 'Plump, cushiony dewy skin that stays comfortable all day',
    summary: 'Selena Gomez prioritizes gentle serum-first makeup removal, lactic/hyaluronic dewy serums, rich ceramide-hyaluronic creams, and daily mineral sunscreen.',
    amSteps: [
      { step: '1. Gentle Hydrating Cleanse', detail: 'Keeps morning cleansing ultra-soft to protect sensitive skin.' },
      { step: '2. Hyaluronic + Gentle Lactic Dewy Serum', detail: 'Presses hydrating serum into damp skin for instant bounce.' },
      { step: '3. Dewy Ceramide Cream + Mineral SPF', detail: 'Waits 60 seconds so dewy cream and mineral SPF blend smoothly.' }
    ],
    pmSteps: [
      { step: '1. Serum-to-Micellar Makeup Melt', detail: 'Breaks down heavy eye and lip pigment gently without tugging.' },
      { step: '2. Calming Niacinamide & Tranexamic Brightening', detail: 'Evens skin tone gently without harsh hydroquinone or high-acid peels.' },
      { step: '3. Rich Dewy Barrier Cream', detail: 'Seals in moisture for overnight recovery.' }
    ],
    clashWarning: 'If your dewy serum contains Lactic Acid (AHA), do not stack it with Retinol or Tretinoin in the same evening. Use Lactic Acid on Night 1 and Retinoids on Night 2.',
    dupeSwap: {
      luxury: 'La Mer The Concentrate ($425) + Tatcha Dewy Skin Cream ($72)',
      gentleDupe: 'Sunday Riley Good Genes ($85) or COSRX Snail 96 ($25) + Aestura Atobarrier 365 ($32)',
      savingsNote: 'Saves $440 with deep humectant bounce and barrier-repairing ceramides'
    },
    productIds: ['cosrx-snail-96-mucin', 'aestura-atobarrier-365', 'sunday-riley-good-genes', 'boj-relief-sun-spf50'],
    activeIds: ['hyaluronic-acid', 'lactic-acid', 'niacinamide', 'ceramide-np', 'squalane']
  },
  {
    slug: 'anne-hathaway',
    name: 'Anne Hathaway',
    moniker: 'The Porcelain Sun-Shield, Facial Massage & Peptide Shelf',
    skinProfile: 'Fair, Photo-Sensitive & Firmness-Focused',
    sourceNote: 'Vogue & Town & Country Sun-Defense Interview',
    sourcePublication: 'Vogue',
    sourceTitle: 'Anne Hathaway on Her Daily SPF, Facial Massage & Glow Routine',
    sourceUrl: 'https://www.vogue.com/article/anne-hathaway-skin-care-routine-shiseido',
    heroImg: '/public/routines/anne-massage.jpg',
    imgPos: '50% 22%',
    signatureLook: 'Timeless, porcelain-clear skin protected by strict daily Vitamin C + SPF 50',
    summary: 'Anne Hathaway credits her porcelain complexion to religious daily SPF 50+, antioxidant Vitamin C serums, lymphatic facial massage, and gentle evening retinal/peptide renewal.',
    amSteps: [
      { step: '1. Awakening Cleanse & Lymphatic Massage', detail: 'Uses upward massage strokes during cleansing to boost circulation and depuff.' },
      { step: '2. Vitamin C + Ferulic Antioxidant Shield', detail: 'Applies L-Ascorbic Acid 15% under sunscreen to double UV free-radical defense.' },
      { step: '3. High-Protection Broad-Spectrum SPF 50+', detail: 'Applies two full finger-lengths of SPF 50+ across face, neck, and chest.' }
    ],
    pmSteps: [
      { step: '1. Thorough Evening Cleanse', detail: 'Removes high-SPF filters gently without stripping.' },
      { step: '2. Crystal Retinal or Firming Peptides (Alternating)', detail: 'Alternates gentle Retinaldehyde nights with Copper Peptide firming nights.' },
      { step: '3. Lipid-Rich Barrier Cream', detail: 'Locks in overnight hydration with ceramide and squalane moisture.' }
    ],
    clashWarning: 'Never mix morning Vitamin C (pH 3.2) with evening Copper Peptides or Retinaldehyde. Keep Vitamin C strictly in your morning SPF ritual and alternate Retinal and Peptides at night.',
    dupeSwap: {
      luxury: 'SkinCeuticals C E Ferulic ($182) + Shiseido Vital Perfection ($140)',
      gentleDupe: 'Timeless 20% Vitamin C ($26) + Medik8 Crystal Retinal 6 ($85) + Beauty of Joseon SPF 50 ($18)',
      savingsNote: 'Saves $193 with clinical-grade photoprotection and retinal renewal'
    },
    productIds: ['skinceuticals-ce-ferulic', 'medik8-crystal-retinal-6', 'to-buffet-copper-peptides', 'boj-relief-sun-spf50'],
    activeIds: ['l-ascorbic-acid', 'retinaldehyde', 'copper-tripeptide-1', 'ferulic-acid', 'ceramide-np']
  },
  {
    slug: 'kendall-jenner',
    name: 'Kendall Jenner',
    moniker: 'The Acne-Safe Model Shelf: Niacinamide SPF & Retinoid Pacing',
    skinProfile: 'Acne-Prone, Oily-Combination & Fungal-Acne Conscious',
    sourceNote: 'Vogue Beauty Secrets & Dermatologist Acne Protocol',
    sourcePublication: 'Vogue',
    sourceTitle: 'Kendall Jenner’s Acne-Safe Skincare & Gua Sha Routine (Vogue Beauty Secrets)',
    sourceUrl: 'https://www.vogue.com/article/kendall-jenner-beauty-secrets',
    heroImg: '/public/routines/kendall-guasha.jpg',
    imgPos: '50% 22%',
    signatureLook: 'Clear, balanced, non-greasy glow that never triggers studio-light breakouts',
    summary: 'Kendall Jenner manages acne-prone skin by doing Gua Sha massage before cleansing (so facial oils never stay on pores), wearing EltaMD UV Clear SPF 46 (with 5% Niacinamide), and pacing prescription retinoids at night.',
    amSteps: [
      { step: '1. Pre-Cleanse Gua Sha + Gentle Wash', detail: 'Does facial massage first, then washes every trace of oil off with a gentle cleanser.' },
      { step: '2. Oil-Free Niacinamide + Hyaluronic Layer', detail: 'Calms redness and regulates sebum without heavy esters.' },
      { step: '3. EltaMD UV Clear SPF 46 (5% Niacinamide)', detail: 'Uses dermatologist-favorite acne-safe sunscreen that calms blemishes.' }
    ],
    pmSteps: [
      { step: '1. Pore-Clearing Cleanse', detail: 'Removes studio makeup completely.' },
      { step: '2. Prescription Tretinoin 0.05% or Azelaic Acid', detail: 'Applies a pea-sized retinoid on dry skin, alternating with Azelaic Acid.' },
      { step: '3. 100% Fungal-Acne Safe Gel-Cream', detail: 'Moisturizes with ester-free urea/squalane or ceramide PM lotion.' }
    ],
    clashWarning: 'Many prescription Tretinoin creams contain Isopropyl Myristate (a 5/5 pore-clogger). If you’re acne-prone like Kendall, pair retinoids with oil-free CeraVe PM or Malezia 5% Urea Moisturizer.',
    dupeSwap: {
      luxury: 'Custom Dermatologist Compound ($120) + Luxury Oil-Free Gel ($78)',
      gentleDupe: 'Differin Adapalene 0.1% ($16) + EltaMD UV Clear SPF 46 ($43) + CeraVe PM ($16)',
      savingsNote: 'Saves $123 with 100% non-comedogenic pore safety'
    },
    productIds: ['eltamd-uv-clear-spf46', 'rx-tretinoin-005', 'cerave-pm-lotion', 'malezia-5-urea-moisturizer'],
    activeIds: ['tretinoin', 'niacinamide', 'zinc-pca', 'hyaluronic-acid', 'ceramide-np']
  },
  {
    slug: 'rosie-huntington-whiteley',
    name: 'Rosie Huntington-Whiteley',
    moniker: 'The Fungal-Acne Safe & Non-Comedogenic Luxury Shelf',
    skinProfile: 'Breakout-Prone Yet Dehydrated ("Dry-Congested")',
    sourceNote: 'Harper’s Bazaar & Non-Comedogenic Bathroom Shelf Audit',
    sourcePublication: 'Harper’s Bazaar',
    sourceTitle: 'Rosie Huntington-Whiteley’s Non-Comedogenic Skincare Routine (Go To Bed With Me)',
    sourceUrl: 'https://www.harpersbazaar.com/beauty/skin-care/a30792151/rosie-huntington-whiteley-skincare-routine/',
    heroImg: '/public/routines/rosie-rosewater.jpg',
    imgPos: '50% 72%',
    signatureLook: 'Lit-from-within editorial cheek glow with zero clogged pores',
    summary: 'Rosie Huntington-Whiteley is famous for checking every bottle on her shelf for pore-clogging oils and fungal-acne triggers, relying on Bioderma Micellar, BHA/AHA resurfacing, and squalane-based hydration.',
    amSteps: [
      { step: '1. Rosewater / Micellar Refresh', detail: 'Avoids harsh morning stripping; refreshes with micellar water and mist.' },
      { step: '2. Brightening Vitamin C + Squalane Hydration', detail: 'Layers lightweight antioxidant protection with 100% pore-safe squalane.' },
      { step: '3. Non-Comedogenic SPF 46–50', detail: 'Seals morning routine with oil-free broad-spectrum protection.' }
    ],
    pmSteps: [
      { step: '1. Thorough Double Cleanse', detail: 'Removes long-wear editorial makeup.' },
      { step: '2. Glycolic / Lactic Resurfacing (2x/Week)', detail: 'Uses controlled AHA/BHA toning to keep texture smooth.' },
      { step: '3. Squalane + Ceramide Barrier Cushion', detail: 'Hydrates deeply without heavy coconut alkanes or isopropyl myristate.' }
    ],
    clashWarning: 'Do not layer Glycolic/Lactic resurfacing toners on the same night as Retinaldehyde or Tretinoin; alternate them on a 4-night cycle.',
    dupeSwap: {
      luxury: 'Biologique Recherche P50 ($115) + Luxury Squalane Serum ($82)',
      gentleDupe: 'Paula’s Choice 2% BHA ($35) + Malezia 5% Urea Moisturizer ($26)',
      savingsNote: 'Saves $136 while keeping every step 100% Malassezia-safe'
    },
    productIds: ['biologique-recherche-p50-1970', 'malezia-5-urea-moisturizer', 'eltamd-uv-clear-spf46', 'dieux-instant-angel'],
    activeIds: ['squalane', 'salicylic-acid', 'lactic-acid', 'niacinamide', 'ceramide-np']
  }
];

const DRIP_EPOCH_ISO = '2026-10-25';

const ROUTINE_IMAGE_GALLERY = [
  { heroImg: '/public/editorial-woman-morning.jpg', imgPos: '50% 25%' },
  { heroImg: '/public/editorial-woman-evening.jpg', imgPos: '50% 25%' },
  { heroImg: '/public/routines/sofia-mist.jpg', imgPos: '50% 28%' },
  { heroImg: '/public/routines/emily-french-pharmacy.jpg', imgPos: '50% 25%' },
  { heroImg: '/public/routines/sabrina-soft-glam.jpg', imgPos: '50% 26%' },
  { heroImg: '/public/routines/madison-cleanse.jpg', imgPos: '50% 24%' },
  { heroImg: '/public/routines/zendaya-calm-balm.jpg', imgPos: '50% 24%' },
  { heroImg: '/public/routines/margot-post-flight.jpg', imgPos: '50% 22%' },
  { heroImg: '/public/routines/selena-dewy-bounce.jpg', imgPos: '50% 25%' },
  { heroImg: '/public/routines/anne-massage.jpg', imgPos: '50% 22%' },
  { heroImg: '/public/routines/kendall-guasha.jpg', imgPos: '50% 22%' },
  { heroImg: '/public/routines/rosie-rosewater.jpg', imgPos: '50% 72%' },
  { heroImg: '/public/routines/dua-micellar.jpg', imgPos: '50% 26%' },
  { heroImg: '/public/editorial-vanity-shelf.jpg', imgPos: '50% 50%' },
  { heroImg: '/public/editorial-serum.jpg', imgPos: '50% 50%' },
  { heroImg: '/public/editorial-hero.jpg', imgPos: '50% 42%' },
  { heroImg: '/public/routines/simone-glow.jpg', imgPos: '50% 22%' }
];

function getDailyDripInfo() {
  const customPath = path.join(__dirname, '..', 'data', 'celebrity_routines_custom.json');
  const poolPath = fs.existsSync(path.join(__dirname, 'celebrity-routines-pool.json'))
    ? path.join(__dirname, 'celebrity-routines-pool.json')
    : path.join(__dirname, '..', 'data', 'celebrity_routines_pool.json');
  let custom = [];
  let pool = [];
  try { if (fs.existsSync(customPath)) custom = JSON.parse(fs.readFileSync(customPath, 'utf8')); } catch (_) {}
  try { if (fs.existsSync(poolPath)) pool = JSON.parse(fs.readFileSync(poolPath, 'utf8')); } catch (_) {}
  const poolBySlug = new Map((Array.isArray(pool) ? pool : []).map((p) => [p.slug, p]));
  const normalizedCustom = (Array.isArray(custom) ? custom : []).map((c) => {
    const fromPool = c && c.slug ? poolBySlug.get(c.slug) : null;
    return fromPool
      ? {
          ...c,
          heroImg: fromPool.heroImg,
          imgPos: fromPool.imgPos,
          sourcePublication: c.sourcePublication || fromPool.sourcePublication,
          sourceTitle: c.sourceTitle || fromPool.sourceTitle,
          sourceUrl: c.sourceUrl || fromPool.sourceUrl
        }
      : c;
  });
  const customSlugs = new Set(normalizedCustom.map((c) => c && c.slug).filter(Boolean));
  const elapsedDays = Math.max(1, Math.floor((Date.now() - Date.parse(DRIP_EPOCH_ISO)) / 86400000));
  const unlockedFromPool = (Array.isArray(pool) ? pool : []).slice(0, elapsedDays).map((item, idx) => ({
    ...item,
    isDailyRelease: idx === Math.min(elapsedDays - 1, pool.length - 1),
    releasedDayIndex: idx + 1
  }));
  const remainingQueue = (Array.isArray(pool) ? pool : []).filter((p) => !customSlugs.has(p.slug)).slice(elapsedDays);
  return {
    custom: normalizedCustom,
    unlockedFromPool,
    nextQueued: remainingQueue[0] || null,
    remainingCount: remainingQueue.length
  };
}

function advanceCelebrityShelfByOneDay() {
  const customPath = path.join(__dirname, '..', 'data', 'celebrity_routines_custom.json');
  const poolPath = fs.existsSync(path.join(__dirname, 'celebrity-routines-pool.json'))
    ? path.join(__dirname, 'celebrity-routines-pool.json')
    : path.join(__dirname, '..', 'data', 'celebrity_routines_pool.json');
  let custom = [];
  let pool = [];
  try { if (fs.existsSync(customPath)) custom = JSON.parse(fs.readFileSync(customPath, 'utf8')); } catch (_) {}
  try { if (fs.existsSync(poolPath)) pool = JSON.parse(fs.readFileSync(poolPath, 'utf8')); } catch (_) {}
  const existingSlugs = new Set([
    ...CELEBRITY_ROUTINES.map((c) => c.slug),
    ...getDailyDripInfo().unlockedFromPool.map((c) => c.slug),
    ...(Array.isArray(custom) ? custom.map((c) => c.slug) : [])
  ]);
  const nextItem = (Array.isArray(pool) ? pool : []).find((p) => p && p.slug && !existingSlugs.has(p.slug));
  if (!nextItem) return { added: false, item: null, total: getAllCelebrityRoutines().length };
  const stamped = { ...nextItem, isDailyRelease: true, releasedAt: new Date().toISOString().split('T')[0] };
  const updated = [...(Array.isArray(custom) ? custom : []), stamped];
  fs.mkdirSync(path.dirname(customPath), { recursive: true });
  fs.writeFileSync(customPath, JSON.stringify(updated, null, 2), 'utf8');
  return { added: true, item: stamped, total: getAllCelebrityRoutines().length };
}

function getAllCelebrityRoutines() {
  const { custom, unlockedFromPool } = getDailyDripInfo();
  const seen = new Set();
  const list = [];
  for (const item of [...CELEBRITY_ROUTINES, ...unlockedFromPool, ...custom]) {
    if (item && item.slug && !seen.has(item.slug)) {
      seen.add(item.slug);
      const idx = list.length;
      const fallback = ROUTINE_IMAGE_GALLERY[idx % ROUTINE_IMAGE_GALLERY.length];
      list.push({
        ...item,
        heroImg: item.heroImg || fallback.heroImg,
        imgPos: item.imgPos || fallback.imgPos,
        sourcePublication: item.sourcePublication || 'Vogue',
        sourceTitle: item.sourceTitle || `${item.name} Skincare Routine Interview (${item.sourceNote || 'Public Beauty Feature'})`,
        sourceUrl: item.sourceUrl || `https://www.vogue.com/search?q=${encodeURIComponent(item.name + ' skincare routine')}`
      });
    }
  }
  return list;
}

function renderPersonaInteractiveWorkbenchAddons() {
  return {
    pouchBudgetToggleHtml: `
      <div id="dl-pouch-budget-bar" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-top:12px;padding-top:10px;border-top:1px solid rgba(122,35,50,0.12);">
        <span class="mono" style="font-size:0.75rem;color:var(--text-secondary);font-weight:600;">Routine Price Range:</span>
        <div role="group" aria-label="Switch between Cult Favorites and Affordable Dupes" style="display:inline-flex;gap:4px;background:var(--bg-surface);padding:3px;border-radius:999px;flex-wrap:wrap;">
          <button type="button" id="dl-btn-mode-luxury" class="vanity-light-btn active mono" style="padding:4px 9px;font-size:0.73rem;min-height:24px;border-radius:999px;" onclick="window.__dlSwitchShelfBudgetMode('luxury', this)">Cult Favorites ($275)</button>
          <button type="button" id="dl-btn-mode-dupe" class="vanity-light-btn mono" style="padding:4px 9px;font-size:0.73rem;min-height:24px;border-radius:999px;" onclick="window.__dlSwitchShelfBudgetMode('dupe', this)">Affordable Dupes ($83 &middot; Save $192)</button>
          <button type="button" id="dl-btn-mode-under35" class="vanity-light-btn mono" style="padding:4px 9px;font-size:0.73rem;min-height:24px;border-radius:999px;" onclick="window.__dlSwitchShelfBudgetMode('under35', this)">Drugstore Under $35</button>
        </div>
      </div>
      <div id="dl-budget-dupe-banner" style="display:none;margin-top:10px;padding:10px 12px;border-radius:14px;background:var(--bg-surface);font-size:0.79rem;color:var(--text-primary);line-height:1.45;"></div>`,
    reactionTriageHtml: `
      <div id="dl-reaction-triage-bar" style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;">
          <span class="mono" style="font-size:0.76rem;font-weight:600;color:var(--rose-brand);">Had a bad reaction to a cream or serum? Tap what happened to see why:</span>
          <span class="mono" style="font-size:0.71rem;color:var(--text-secondary);">Find Which Bottle Did It</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;">
          <button type="button" class="preset-chip dl-reaction-btn" data-rx="sting" onclick="window.__dlDiagnoseSkinReaction('sting', this)" style="text-align:left;padding:7px 10px;display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <span><strong style="font-size:0.8rem;color:var(--text-primary);display:block;">Stung or Red Around Nose</strong><span style="font-size:0.72rem;color:var(--text-secondary);">Acid + Retinol or applied on damp skin</span></span>
            <span class="badge-clash mono" style="font-size:0.68rem;padding:2px 6px;flex-shrink:0;">See Why &rarr;</span>
          </button>
          <button type="button" class="preset-chip dl-reaction-btn" data-rx="pill" onclick="window.__dlDiagnoseSkinReaction('pill', this)" style="text-align:left;padding:7px 10px;display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <span><strong style="font-size:0.8rem;color:var(--text-primary);display:block;">Pilled Under Makeup / SPF</strong><span style="font-size:0.72rem;color:var(--text-secondary);">Rolled into little flakes before work</span></span>
            <span class="badge-warn mono" style="font-size:0.68rem;padding:2px 6px;flex-shrink:0;">Fix &rarr;</span>
          </button>
          <button type="button" class="preset-chip dl-reaction-btn" data-rx="bumps" onclick="window.__dlDiagnoseSkinReaction('bumps', this)" style="text-align:left;padding:7px 10px;display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <span><strong style="font-size:0.8rem;color:var(--text-primary);display:block;">Tiny Bumps Overnight</strong><span style="font-size:0.72rem;color:var(--text-secondary);">Rich cream trapping pores overnight</span></span>
            <span class="badge-warn mono" style="font-size:0.68rem;padding:2px 6px;flex-shrink:0;">Check &rarr;</span>
          </button>
          <button type="button" class="preset-chip dl-reaction-btn" data-rx="tight" onclick="window.__dlDiagnoseSkinReaction('tight', this)" style="text-align:left;padding:7px 10px;display:flex;justify-content:space-between;align-items:center;gap:6px;">
            <span><strong style="font-size:0.8rem;color:var(--text-primary);display:block;">Tight, Shiny &amp; Peeling</strong><span style="font-size:0.72rem;color:var(--text-secondary);">Too many acids or retinols at once</span></span>
            <span class="badge-safe mono" style="font-size:0.68rem;padding:2px 6px;flex-shrink:0;">Soothe &rarr;</span>
          </button>
        </div>
        <div id="dl-reaction-autopsy-card" style="display:none;margin-top:8px;padding:11px 13px;border-radius:14px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);font-size:0.8rem;line-height:1.45;"></div>
      </div>`,
    liveWaitTimerHtml: `
      <div id="dl-live-wait-timer-bar" style="padding:11px 13px;border-radius:16px;background:var(--bg-canvas);display:flex;flex-direction:column;gap:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
          <div>
            <span class="mono" style="font-size:0.75rem;color:var(--rose-brand);font-weight:700;text-transform:uppercase;">Wait-Time Timer Between Layers</span>
            <span id="dl-timer-readout" style="font-size:0.79rem;color:var(--text-secondary);display:block;">Tap a timer while doing your skincare so layers absorb smoothly without pilling:</span>
          </div>
          <div style="display:inline-flex;gap:5px;flex-wrap:wrap;">
            <button type="button" class="vanity-light-btn mono" style="padding:4px 9px;font-size:0.73rem;min-height:25px;" onclick="window.__dlStartMirrorTimer(60, '60-Second Serum Wait')">&#9201; 60s Vitamin C / Toner Wait</button>
            <button type="button" class="vanity-light-btn mono" style="padding:4px 9px;font-size:0.73rem;min-height:25px;" onclick="window.__dlStartMirrorTimer(600, '10-Minute Dry-Skin Retinol Wait')">&#9201; 10m Dry-Skin Retinol Wait</button>
          </div>
        </div>
        <div style="height:6px;border-radius:999px;background:var(--bg-oat);overflow:hidden;"><div id="dl-mirror-timer-fill" style="width:0%;height:100%;background:linear-gradient(90deg,var(--rose-brand),#10B981);transition:width 0.3s linear;"></div></div>
      </div>`
  };
}

function renderInteractiveFourNightCalendarHtml(n1Label, n1Val, n2Label, n2Val, n3Label, n3Val, n4Val) {
  return `
    <div id="dl-interactive-4night-calendar" style="min-width:0;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
        <div>
          <span class="mono" style="font-size:0.8rem;color:var(--text-primary);font-weight:600;letter-spacing:0.02em;text-transform:uppercase;">Interactive 4-Night Skin-Cycling Calendar</span>
          <span class="mono" style="font-size:0.72rem;color:var(--text-secondary);display:block;">Tap any night below to inspect damp-vs-dry rules, wait timers &amp; missing buffer alerts:</span>
        </div>
        <a id="dl-cal-sync-link" href="/buy/micro_pass?source=cycling_grid" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('micro_pass');return false;}" class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;">Sync 9:30 PM Phone Alerts (99&cent;) &rarr;</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;" role="tablist" aria-label="4-Night Skin Cycling Schedule">
        <button type="button" class="dl-night-cal-tab active" data-night="1" onclick="window.__dlSelectCyclingNight(1, this)" style="padding:9px 8px;background:var(--bg-surface);border:1.5px solid var(--rose-brand);border-radius:12px;text-align:left;cursor:pointer;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:2px;"><span class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:700;">${ n1Label }</span><span class="mono" style="font-size:0.66rem;color:var(--text-muted);">60s Wait</span></div>
          <div style="font-size:0.78rem;color:var(--text-primary);font-weight:600;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${ n1Val }</div>
        </button>
        <button type="button" class="dl-night-cal-tab" data-night="2" onclick="window.__dlSelectCyclingNight(2, this)" style="padding:9px 8px;background:var(--bg-surface);border:1px solid rgba(122,35,50,0.14);border-radius:12px;text-align:left;cursor:pointer;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:2px;"><span class="mono" style="font-size:0.74rem;color:var(--honey-warn);font-weight:700;">${ n2Label }</span><span class="mono" style="font-size:0.66rem;color:var(--text-muted);">Bone-Dry</span></div>
          <div style="font-size:0.78rem;color:var(--text-primary);font-weight:600;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${ n2Val }</div>
        </button>
        <button type="button" class="dl-night-cal-tab" data-night="3" onclick="window.__dlSelectCyclingNight(3, this)" style="padding:9px 8px;background:var(--bg-surface);border:1px solid rgba(122,35,50,0.14);border-radius:12px;text-align:left;cursor:pointer;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:2px;"><span class="mono" style="font-size:0.74rem;color:var(--sage-safe);font-weight:700;">${ n3Label }</span><span class="mono dl-gated-night-val" data-unlocked-text="Damp Seal" style="font-size:0.66rem;color:var(--sage-safe);">Rest</span></div>
          <div style="font-size:0.78rem;color:var(--text-primary);font-weight:600;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${ n3Val }</div>
        </button>
        <button type="button" class="dl-night-cal-tab" data-night="4" onclick="window.__dlSelectCyclingNight(4, this)" style="padding:9px 8px;background:var(--bg-surface);border:1px solid rgba(122,35,50,0.14);border-radius:12px;text-align:left;cursor:pointer;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:2px;"><span class="mono" style="font-size:0.74rem;color:var(--sage-safe);font-weight:700;">Night 4 &middot; Seal</span><span class="mono dl-gated-night-val" data-unlocked-text="3:1:1 Lipids" style="font-size:0.66rem;color:var(--sage-safe);">Lipids</span></div>
          <div style="font-size:0.78rem;color:var(--text-primary);font-weight:600;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${ n4Val }</div>
        </button>
      </div>
      <div id="dl-night-cal-detail-box" style="margin-top:8px;padding:11px 14px;border-radius:14px;background:var(--bg-surface);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;font-size:0.8rem;color:var(--text-secondary);">
        <div id="dl-night-cal-detail-text" style="flex:1;min-width:220px;line-height:1.45;">
          <strong style="color:var(--text-primary);">Tonight (Night 1 &middot; Exfoliating Polish):</strong> Apply <strong style="color:var(--rose-brand);">${ n1Val }</strong> onto clean, dry skin, wait 60 seconds so pH stabilizes, then seal with a ceramide cream. <em>Never stack retinoids on Night 1.</em>
        </div>
        <a id="dl-night-cal-rescue-cta" href="/api/affiliate?product=cerave-pm-lotion&amp;partner=ulta" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:5px 10px;font-size:0.74rem;white-space:nowrap;" data-no-bag-inject="1">Add Night 3–4 Ceramide Buffer ($17) &nearr;</a>
      </div>
    </div>`;
}

const PERSONA_INTERACTIVE_CLIENT_JS = `
  window.__dlCustomizationsCount = 1;
  window.__dlBumpCustomizationCount = function(label) {
    window.__dlCustomizationsCount = (window.__dlCustomizationsCount || 1) + 1;
    var badge = document.getElementById('shelfDraftSavedBadge');
    if (badge) {
      badge.textContent = window.__dlCustomizationsCount + ' Routine Changes · Unsaved';
      badge.style.background = 'var(--rose-pill-bg)';
      badge.style.color = 'var(--rose-brand)';
    }
  };

  window.__dlApplyCheckedIdsAndSync = function(targetIds) {
    var grid = document.getElementById('productSelectorGrid');
    var cbs = document.querySelectorAll('input[name="routineProduct"]');
    for (var i = 0; i < cbs.length; i++) {
      var cb = cbs[i];
      cb.checked = targetIds.indexOf(cb.value) !== -1;
      var lbl = cb.closest('.prod-check-item');
      if (lbl) {
        lbl.classList.toggle('selected', cb.checked);
        var pill = lbl.querySelector('span.mono');
        if (pill) {
          pill.textContent = cb.checked ? '✓ In Bag' : '+ Vanity Bag';
          pill.style.background = cb.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
          pill.style.color = cb.checked ? 'var(--accent-ink)' : 'var(--rose-brand)';
        }
        if (cb.checked && grid) grid.prepend(lbl);
      }
    }
    if (grid) grid.scrollTop = 0;
    if (window.__dlSyncVanityFromCheckboxes) window.__dlSyncVanityFromCheckboxes();
  };

  window.__dlSwitchShelfBudgetMode = function(mode, btnEl) {
    var luxBtn = document.getElementById('dl-btn-mode-luxury');
    var dupeBtn = document.getElementById('dl-btn-mode-dupe');
    var u35Btn = document.getElementById('dl-btn-mode-under35');
    if (luxBtn) luxBtn.classList.toggle('active', mode === 'luxury');
    if (dupeBtn) dupeBtn.classList.toggle('active', mode === 'dupe');
    if (u35Btn) u35Btn.classList.toggle('active', mode === 'under35');
    var targetIds = mode === 'under35'
      ? ['to-glycolic-acid-7', 'cerave-pm-lotion']
      : (mode === 'dupe'
        ? ['cosrx-snail-96-mucin', 'timeless-20-vitamin-c', 'illiyoon-ceramide-ato', 'to-glycolic-acid-7']
        : ['skinceuticals-ce-ferulic', 'to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005']);
    window.__dlApplyCheckedIdsAndSync(targetIds);
    var banner = document.getElementById('dl-budget-dupe-banner');
    window.__dlActiveBudgetMode = mode;
    if (banner) {
      banner.style.display = 'block';
      if (mode === 'under35') {
        banner.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div><strong style="color:var(--sage-safe);">2-Step Drugstore Starter Routine ($30 Total &middot; Saves $245):</strong> <strong>The Ordinary Glycolic Acid 7% ($13)</strong> + <strong>CeraVe PM Moisturizing Lotion ($17)</strong>.</div><div style="display:inline-flex;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=cerave-pm-lotion&amp;partner=ulta" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:4px 9px;font-size:0.73rem;" data-no-bag-inject="1">Shop $17 CeraVe PM (Ulta) &nearr;</a><a href="/buy/micro_pass?source=under35_blueprint" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy(\\'micro_pass\\');return false;}" class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;align-self:center;">Save $30 Routine Card (99&cent;) &rarr;</a></div></div>';
      } else if (mode === 'dupe') {
        banner.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div><strong style="color:var(--sage-safe);">Affordable Dupe Routine ($83 Total &middot; Saves $192):</strong> Swaps $182 SkinCeuticals for <strong>Timeless 20% Vitamin C ($26)</strong> + <strong>ILLIYOON Ceramide Cream ($19)</strong> + <strong>COSRX Snail Mucin ($25)</strong>.</div><div style="display:inline-flex;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=timeless-20-vitamin-c&amp;partner=amazon" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:4px 9px;font-size:0.73rem;" data-no-bag-inject="1">Shop $26 Vitamin C Dupe (Amazon) &nearr;</a><a href="/buy/micro_pass?source=dupe_blueprint" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy(\\'micro_pass\\');return false;}" class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;align-self:center;">Save Dupe Card (99&cent;) &rarr;</a></div></div>';
      } else {
        banner.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><div><strong style="color:var(--rose-brand);">Cult-Favorite Shelf ($275 Total):</strong> Keep <strong>SkinCeuticals C E Ferulic ($182)</strong> in the morning and <strong>Retinol ($45)</strong> at night so your serums stay fresh and effective.</div><div style="display:inline-flex;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=dieux-instant-angel&amp;partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:4px 9px;font-size:0.73rem;" data-no-bag-inject="1">Shop Dieux Moisturizer ($45 &middot; Sephora) &nearr;</a><a href="/buy/onetime_499?source=luxury_vault" onclick="if(typeof openCheckoutModal===\\'function\\'){openCheckoutModal(\\'onetime_499\\');return false;}" class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;align-self:center;">Get Complete 28-Day Planner ($4.99) &rarr;</a></div></div>';
      }
    }
    window.__dlSyncBudgetModeLinks();
    window.__dlBumpCustomizationCount(mode);
    if (typeof runRoutineAnalysis === 'function') runRoutineAnalysis(null, true);
  };

  window.__dlSyncBudgetModeLinks = function() {
    var mode = window.__dlActiveBudgetMode || 'luxury';
    var postStripLink = document.querySelector('#dl-postscan-conversion-strip a.affiliate-link-pill');
    var nightCta = document.getElementById('dl-night-cal-rescue-cta');
    var swapLinks = document.querySelectorAll('.dl-conflict-swap-link');
    if (mode === 'under35') {
      if (postStripLink) { postStripLink.textContent = 'Shop CeraVe PM ($17 · Ulta) ↗'; postStripLink.href = '/api/affiliate?product=cerave-pm-lotion&partner=ulta'; }
      if (nightCta) { nightCta.textContent = 'Shop $17 CeraVe PM Buffer (Ulta) ↗'; nightCta.href = '/api/affiliate?product=cerave-pm-lotion&partner=ulta'; }
      for (var i = 0; i < swapLinks.length; i++) { swapLinks[i].textContent = 'Option B (Under-$35 Dupe): Cushion with CeraVe PM ($17) at Ulta →'; swapLinks[i].href = '/api/affiliate?product=cerave-pm-lotion&partner=ulta'; }
    } else if (mode === 'dupe') {
      if (postStripLink) { postStripLink.textContent = 'Shop ILLIYOON Dupe ($19 · Amazon) ↗'; postStripLink.href = '/api/affiliate?product=illiyoon-ceramide-ato&partner=amazon'; }
      if (nightCta) { nightCta.textContent = 'Shop $19 ILLIYOON Buffer (Amazon) ↗'; nightCta.href = '/api/affiliate?product=illiyoon-ceramide-ato&partner=amazon'; }
      for (var j = 0; j < swapLinks.length; j++) { swapLinks[j].textContent = 'Option B (Chemist Dupe): Cushion with ILLIYOON Ceramide ($19) at Amazon →'; swapLinks[j].href = '/api/affiliate?product=illiyoon-ceramide-ato&partner=amazon'; }
    } else {
      if (postStripLink) { postStripLink.textContent = 'Shop Dieux Instant Angel ($45 · Sephora) ↗'; postStripLink.href = '/api/affiliate?product=dieux-instant-angel&partner=sephora'; }
      if (nightCta) { nightCta.textContent = 'Shop Dieux Lipid Buffer ($45 · Sephora) ↗'; nightCta.href = '/api/affiliate?product=dieux-instant-angel&partner=sephora'; }
    }
  };

  window.__dlDupeAllFiveVessels = function() {
    var st = window.__dlVanityState;
    if (!st) return;
    st.slotSelections = [2, 3, 2, 1, 2];
    st.customSlotBottle = {};
    st.pouchSpfSealed = true;
    if (window.__dlRenderVanityDrawer) window.__dlRenderVanityDrawer();
    if (window.__dlSwitchShelfBudgetMode) window.__dlSwitchShelfBudgetMode('dupe');
  };

  window.__dlActivate72HrBarrierReset = function(btnEl) {
    window.__dl72HrRescueActive = true;
    window.__dlBumpCustomizationCount('72hr_rescue');
    if (window.__dlSwitchResultStep) window.__dlSwitchResultStep(3, true);
    var detailText = document.getElementById('dl-night-cal-detail-text');
    var rescueCta = document.getElementById('dl-night-cal-rescue-cta');
    var dlPngBtn = document.getElementById('btnDownloadLockScreenPng');
    if (dlPngBtn && !window.__ebIsUnlocked) dlPngBtn.textContent = 'Save 3-Night Soothing Card (99¢) →';
    if (detailText) {
      detailText.innerHTML = '<strong style="color:var(--berry-clash);">3-Night Soothing Reset:</strong> Take a 3-night break from exfoliating acids and retinol. Wash with lukewarm water and layer a gentle soothing cream like <strong>Cicaplast B5+</strong> onto damp skin until redness fades.';
    }
    if (rescueCta) {
      rescueCta.textContent = 'Shop Soothing Cicaplast B5+ ($17 · Ulta) ↗';
      rescueCta.href = '/api/affiliate?product=lrp-cicaplast-baume-b5&partner=ulta';
    }
    if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas(0);
  };

  window.__dlStartMirrorTimer = function(seconds, label) {
    if (window.__dlMirrorTimerInt) clearInterval(window.__dlMirrorTimerInt);
    var readout = document.getElementById('dl-timer-readout');
    var fill = document.getElementById('dl-mirror-timer-fill');
    var rem = seconds;
    window.__dlBumpCustomizationCount('timer');
    var tick = function() {
      var m = Math.floor(rem / 60);
      var s = rem % 60;
      var pct = Math.min(100, Math.round(((seconds - rem) / Math.max(1, seconds)) * 100));
      if (fill) fill.style.width = pct + '%';
      if (readout) {
        readout.innerHTML = rem > 0
          ? '<strong style="color:var(--rose-brand);">' + label + ': ' + (m > 0 ? m + 'm ' : '') + s + 's left</strong> &middot; Letting your first layer sink in (' + pct + '%)'
          : '<strong style="color:var(--sage-safe);">✓ Ready for your next step!</strong> Your skin is ready for the next layer without pilling or stinging.';
      }
      if (rem <= 0) { clearInterval(window.__dlMirrorTimerInt); return; }
      rem--;
    };
    tick();
    window.__dlMirrorTimerInt = setInterval(tick, 1000);
  };

  window.__dlDiagnoseSkinReaction = function(rxType, btnEl) {
    var allBtns = document.querySelectorAll('.dl-reaction-btn');
    for (var i = 0; i < allBtns.length; i++) {
      allBtns[i].style.borderColor = allBtns[i] === btnEl ? 'var(--rose-brand)' : '';
      allBtns[i].style.background = allBtns[i] === btnEl ? 'var(--rose-pill-bg)' : '';
    }
    var card = document.getElementById('dl-reaction-autopsy-card');
    if (!card) return;
    card.style.display = 'block';
    var checkedNames = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) {
      var lbl = cb.closest('.prod-check-item');
      var st = lbl ? lbl.querySelector('strong') : null;
      return st ? st.textContent.trim() : cb.value;
    });
    var shelfPrefix = checkedNames.length >= 2
      ? 'From your selected bottles (' + checkedNames.slice(0, 2).join(' + ') + '): '
      : '';
    var map = {
      sting: {
        ids: ['to-glycolic-acid-7', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic'],
        zone: 'Around Nose &amp; Mouth',
        title: 'Why It Stung: Strong Acid + Retinol Used Too Close Together',
        body: shelfPrefix + 'Using exfoliating acids or Vitamin C in the same routine as Retinol—or applying Retinol onto damp skin—causes stinging around the corners of your nose and mouth.',
        rescueProd: 'lrp-cicaplast-baume-b5',
        rescueLabel: 'Calm Redness Fast: La Roche-Posay Cicaplast B5+ ($17 at Ulta) ↗',
        partner: 'ulta'
      },
      pill: {
        ids: ['to-niacinamide-10-zinc', 'cosrx-snail-96-mucin', 'cerave-pm-lotion'],
        zone: 'Under Makeup &amp; Sunscreen',
        title: 'Why It Pilled: Serum Didn\\'t Dry Before Sunscreen',
        body: shelfPrefix + 'Applying sunscreen or makeup right on top of Niacinamide or Snail Mucin before it dries causes layers to roll into little flakes. Pat gently and wait 60 seconds.',
        rescueProd: 'boj-relief-sun-spf50',
        rescueLabel: 'No-Pill Sunscreen: Beauty of Joseon Relief Sun SPF 50 ($18) ↗',
        partner: 'sephora'
      },
      bumps: {
        ids: ['skinceuticals-ce-ferulic', 'cerave-pm-lotion', 'illiyoon-ceramide-ato'],
        zone: 'Forehead &amp; Chin',
        title: 'Why Bumps Appeared: Rich Cream Trapped Over Clogged Pores',
        body: shelfPrefix + 'Layering a thick night cream over unexfoliated pores can trap oil overnight. Try a gentle BHA toner 2 nights a week and a lighter gel-cream.',
        rescueProd: 'paulas-choice-2-bha',
        rescueLabel: 'Clear Clogged Pores: Paula\\'s Choice 2% BHA ($35) ↗',
        partner: 'sephora'
      },
      tight: {
        ids: ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005'],
        zone: 'Cheeks &amp; Moisture Barrier',
        title: 'Why Skin Feels Tight: Too Many Exfoliants Without Rest Nights',
        body: shelfPrefix + 'Using exfoliating acids and retinols back-to-back without rest nights dries out your moisture barrier, leaving skin tight, shiny, and flaky.',
        rescueProd: 'illiyoon-ceramide-ato',
        rescueLabel: 'Comfort Dry Skin: ILLIYOON Ceramide Ato Cream ($19) ↗',
        partner: 'amazon'
      }
    };
    var cfg = map[rxType] || map.sting;
    if (checkedNames.length < 2) window.__dlApplyCheckedIdsAndSync(cfg.ids);
    card.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;flex-wrap:wrap;"><div style="flex:1;min-width:210px;"><span class="badge-clash mono" style="font-size:0.68rem;padding:1px 7px;margin-bottom:4px;display:inline-block;">' + cfg.zone + '</span><strong style="color:var(--rose-brand);display:block;margin-bottom:2px;">' + cfg.title + '</strong><span style="color:var(--text-secondary);">' + cfg.body + '</span></div><div style="display:flex;flex-direction:column;gap:5px;align-items:flex-end;"><a href="/api/affiliate?product=' + cfg.rescueProd + '&amp;partner=' + cfg.partner + '" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:5px 10px;font-size:0.74rem;white-space:nowrap;" data-no-bag-inject="1">' + cfg.rescueLabel + '</a><a href="/buy/micro_pass?source=reaction_triage" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy(\\'micro_pass\\');return false;}" class="mono" style="font-size:0.73rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;">Save 3-Night Soothing Plan (99&cent;) &rarr;</a></div></div>';
    window.__dlBumpCustomizationCount(rxType);
    if (typeof runRoutineAnalysis === 'function') runRoutineAnalysis(null, true);
  };

  window.__dlSelectCyclingNight = function(nightNum, btnEl) {
    window.__dl72HrRescueActive = false;
    window.__dlSelectedNightIdx = nightNum;
    var tabs = document.querySelectorAll('.dl-night-cal-tab');
    for (var i = 0; i < tabs.length; i++) {
      var active = tabs[i] === btnEl || Number(tabs[i].getAttribute('data-night')) === nightNum;
      tabs[i].style.border = active ? '1.5px solid var(--rose-brand)' : '1px solid rgba(122,35,50,0.14)';
      tabs[i].classList.toggle('active', active);
    }
    var detailText = document.getElementById('dl-night-cal-detail-text');
    var rescueCta = document.getElementById('dl-night-cal-rescue-cta');
    if (!detailText) return;
    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var dName = days[(new Date().getDay() + (nightNum - 1)) % 7];
    var checkedVals = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) { return cb.value; });
    var hasCream = checkedVals.some(function(v) { return /cerave|illiyoon|aestura|cicaplast|dieux|stratia|vanicream/i.test(v); });
    var gapBadge = (!hasCream && nightNum >= 3)
      ? '<span class="badge-warn mono" style="font-size:0.68rem;padding:1px 7px;margin-right:6px;">Tip: Add a soothing moisturizer for Night ' + nightNum + '</span>'
      : '';
    var syncLink = document.getElementById('dl-cal-sync-link');
    if (syncLink) syncLink.innerHTML = 'Save ' + dName + ' Night ' + nightNum + ' Reminder + 4-Card Pack (99&cent;) &rarr;';
    var dlPngBtn = document.getElementById('btnDownloadLockScreenPng');
    if (dlPngBtn && !window.__ebIsUnlocked) dlPngBtn.textContent = 'Save ' + dName + ' Night ' + nightNum + ' Phone Card (99¢) →';
    var notes = {
      1: gapBadge + '<strong style="color:var(--text-primary);">Night 1 (' + dName + ' &middot; Gentle Exfoliation):</strong> Apply your exfoliating toner onto clean, dry skin. <strong>Wait 60 seconds</strong> before moisturizer, and skip retinol tonight.',
      2: gapBadge + '<strong style="color:var(--text-primary);">Night 2 (' + dName + ' &middot; Retinol Night):</strong> Wait <strong>10 minutes after washing</strong> until skin is completely dry (damp skin makes retinol sting). Apply a pea-sized drop, then top with moisturizer.',
      3: gapBadge + '<strong style="color:var(--text-primary);">Night 3 (' + dName + ' &middot; Moisture &amp; Rest):</strong> <strong>No acids or retinol tonight.</strong> Pat hydrating serum onto slightly damp skin and seal in with a rich ceramide moisturizer.',
      4: gapBadge + '<strong style="color:var(--text-primary);">Night 4 (' + dName + ' &middot; Deep Hydration):</strong> A second night of rich moisturizer keeps your skin soft, calm, and flake-free before you exfoliate again on Night 1.'
    };
    detailText.innerHTML = notes[nightNum] || notes[1];
    if (rescueCta) {
      if (nightNum === 2) {
        rescueCta.textContent = 'Add Retinoid Sandwich Cream ($17) ↗';
        rescueCta.href = '/api/affiliate?product=lrp-cicaplast-baume-b5&partner=ulta';
      } else {
        window.__dlSyncBudgetModeLinks();
      }
    }
    if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas(nightNum);
    window.__dlBumpCustomizationCount('night_' + nightNum);
  };
`;

module.exports = {
  CELEBRITY_ROUTINES,
  getAllCelebrityRoutines,
  getDailyDripInfo,
  advanceCelebrityShelfByOneDay,
  renderPersonaInteractiveWorkbenchAddons,
  renderInteractiveFourNightCalendarHtml,
  PERSONA_INTERACTIVE_CLIENT_JS
};
