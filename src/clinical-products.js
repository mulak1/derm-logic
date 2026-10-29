/**
 * DermLogic (#4): Cult Skincare Products & Routine Presets Catalog
 */
const CULT_PRODUCTS = [
  {
    id: 'skinceuticals-ce-ferulic',
    brand: 'SkinCeuticals',
    name: 'C E Ferulic with 15% L-Ascorbic Acid',
    category: 'Antioxidant Serum',
    ph: 3.2,
    priceUsd: 182,
    primaryActives: ['l-ascorbic-acid', 'tocopherol', 'ferulic-acid'],
    inciList: 'Aqua/Water/Eau, Ethoxydiglycol, Ascorbic Acid, Glycerin, Propylene Glycol, Laureth-23, Phenoxyethanol, Tocopherol, Triethanolamine, Ferulic Acid, Panthenol, Sodium Hyaluronate',
    summary: 'Duke-patented pH 3.2 15% L-Ascorbic Acid + 1% Alpha-Tocopherol + 0.5% Ferulic Acid photoprotective gold standard.'
  },
  {
    id: 'to-glycolic-acid-7',
    brand: 'The Ordinary',
    name: 'Glycolic Acid 7% Exfoliating Toner',
    category: 'Exfoliating Acid',
    ph: 3.6,
    priceUsd: 13,
    primaryActives: ['glycolic-acid'],
    inciList: 'Aqua (Water), Glycolic Acid, Rosa Damascena Flower Water, Centaurea Cyanus Flower Water, Aloe Barbadensis Leaf Water, Propanediol, Glycerin, Triethanolamine, Aminomethyl Propanol, Panax Ginseng Root Extract, Tasmannia Lanceolata Fruit/Leaf Extract',
    summary: 'High-strength pH 3.6 low-molecular-weight AHA toner (3.6% free acid value). Causes severe barrier stripping if stacked with retinoids or copper peptides.'
  },
  {
    id: 'paulas-choice-2-bha',
    brand: "Paula's Choice",
    name: 'Skin Perfecting 2% BHA Liquid Exfoliant',
    category: 'Exfoliating Acid',
    ph: 3.5,
    priceUsd: 35,
    primaryActives: ['salicylic-acid'],
    inciList: 'Water (Aqua), Methylpropanediol, Butylene Glycol, Salicylic Acid, Polysorbate 20, Camellia Oleifera (Green Tea) Leaf Extract, Sodium Hydroxide, Tetrasodium EDTA',
    summary: 'Cult pH 3.5 oil-soluble 2% Salicylic Acid desmolytic. Note: contains Polysorbate 20 (Malassezia trigger).'
  },
  {
    id: 'lrp-effaclar-duo-bpo',
    brand: 'La Roche-Posay',
    name: 'Effaclar Duo Dual Action Acne Treatment (5.5% Benzoyl Peroxide)',
    category: 'Acne Treatment',
    ph: 5.0,
    priceUsd: 36,
    primaryActives: ['benzoyl-peroxide', 'capryloyl-salicylic-acid'],
    inciList: 'Benzoyl Peroxide 5.5%, Water, Isostearyl Alcohol, Glycerin, Pentylene Glycol, Silica, Carbomer, Capryloyl Salicylic Acid, Potassium Hydroxide, Tocopheryl Acetate',
    summary: 'Micronized 5.5% Benzoyl Peroxide + 0.4% LHA. Potent oxidizer that chemically degrades Tretinoin, Retinol, and L-Ascorbic Acid on contact.'
  },
  {
    id: 'rx-tretinoin-005',
    brand: 'Rx Dermatology',
    name: 'Tretinoin 0.05% Cream (All-Trans Retinoic Acid)',
    category: 'Retinoid (Rx)',
    ph: 5.8,
    priceUsd: 45,
    primaryActives: ['tretinoin', 'isopropyl-myristate'],
    inciList: 'Tretinoin 0.05%, Stearic Acid, Isopropyl Myristate, Polyoxyl 40 Stearate, Stearyl Alcohol, Xanthan Gum, Sorbic Acid, Butylated Hydroxytoluene, Purified Water',
    summary: 'Prescription RAR nuclear agonist. Note: generic cream vehicle uses Isopropyl Myristate (Grade 5/5 comedogen).'
  },
  {
    id: 'to-buffet-copper-peptides',
    brand: 'The Ordinary',
    name: 'Multi-Peptide + Copper Peptides 1% Serum (Buffet + Copper)',
    category: 'Peptide Serum',
    ph: 6.2,
    priceUsd: 32,
    primaryActives: ['copper-tripeptide-1', 'matrixyl-3000', 'argireline', 'hyaluronic-acid'],
    inciList: 'Aqua (Water), Glycerin, Lactococcus Ferment Lysate, Copper Tripeptide-1, Acetyl Hexapeptide-8, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Sodium Hyaluronate, Allantoin',
    summary: '1% pure GHK-Cu + Matrixyl 3000 + Argireline at pH 6.2. Strictly incompatible with L-Ascorbic Acid, Glycolic Acid, and Salicylic Acid.'
  },
  {
    id: 'cerave-pm-lotion',
    brand: 'CeraVe',
    name: 'PM Facial Moisturizing Lotion',
    category: 'Barrier Moisturizer',
    ph: 5.8,
    priceUsd: 17,
    primaryActives: ['niacinamide', 'ceramide-np', 'cholesterol', 'hyaluronic-acid', 'cetearyl-alcohol'],
    inciList: 'Aqua/Water/Eau, Glycerin, Caprylic/Capric Triglyceride, Niacinamide, Cetearyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Dimethicone, Ceteareth-20, Hyaluronic Acid, Cholesterol',
    summary: '4% Niacinamide + 3 essential ceramides at pH 5.8. Contains Cetearyl Alcohol + Ceteareth-20 (watch for closed comedones in acne-prone skin).'
  },
  {
    id: 'cosrx-snail-96-mucin',
    brand: 'COSRX',
    name: 'Advanced Snail 96 Mucin Power Essence',
    category: 'Barrier Essence',
    ph: 6.5,
    priceUsd: 25,
    primaryActives: ['snail-secretion-filtrate', 'panthenol', 'hyaluronic-acid', 'allantoin'],
    inciList: 'Snail Secretion Filtrate, Betaine, Butylene Glycol, 1,2-Hexanediol, Sodium Polyacrylate, Phenoxyethanol, Sodium Hyaluronate, Allantoin, Ethyl Hexanediol, Carbomer, Panthenol, Arginine',
    summary: '96.3% Snail Secretion Filtrate + Panthenol + Allantoin buffer. Zero conflicts; ideal before retinoids.'
  },
  {
    id: 'finacea-15-azelaic',
    brand: 'Finacea (Rx / Derm)',
    name: 'Finacea 15% Azelaic Acid Gel',
    category: 'Rosacea & Brightening',
    ph: 4.9,
    priceUsd: 55,
    primaryActives: ['azelaic-acid'],
    inciList: 'Azelaic Acid 15%, Benzoic Acid, Carbomer 980, Disodium EDTA, Lecithin, Polysorbate 80, Propylene Glycol, Purified Water, Sodium Hydroxide, Triglycerides Medium Chain',
    summary: 'Clinical 15% micronized Azelaic Acid hydrogel for rosacea, PIE, and melasma. Pregnancy Category B safe.'
  },
  {
    id: 'anua-heartleaf-77-toner',
    brand: 'Anua',
    name: 'Heartleaf 77% Soothing Toner',
    category: 'Soothing Toner',
    ph: 5.7,
    priceUsd: 23,
    primaryActives: ['houttuynia-cordata', 'panthenol', 'centella-asiatica'],
    inciList: 'Houttuynia Cordata Extract (77%), Water, 1,2-Hexanediol, Glycerin, Betaine, Panthenol, Saccharum Officinarum Extract, Portulaca Oleracea Extract, Centella Asiatica Extract',
    summary: 'Sub-acidic pH 5.7 77% Heartleaf + Panthenol + Centella toner that neutralizes post-cleansing irritation.'
  },
  {
    id: 'sunday-riley-good-genes',
    brand: 'Sunday Riley',
    name: 'Good Genes All-In-One Lactic Acid Treatment',
    category: 'Exfoliating Acid',
    ph: 2.8,
    priceUsd: 85,
    primaryActives: ['lactic-acid'],
    inciList: 'Water/Eau/Aqua, Dimethicone, Glycolic Acid, Caprylic/Capric Triglyceride, Squalane, Lactic Acid,PPG-12/SMDI Copolymer, Saccharomyces Cerevisiae Extract, Glycyrrhiza Glabra Root Extract',
    summary: 'Ultra-low pH 2.8 Lactic Acid treatment with high un-ionized free acid fraction. High ΔpH conflict with peptides and retinoids.'
  },
  {
    id: 'differin-adapalene-01',
    brand: 'Differin',
    name: 'Adapalene Gel 0.1% Acne Treatment',
    category: 'Retinoid',
    ph: 5.5,
    priceUsd: 16,
    primaryActives: ['adapalene'],
    inciList: 'Adapalene 0.1%, Carbomer 940, Edetate Disodium, Methylparaben, Poloxamer 182, Propylene Glycol, Purified Water, Sodium Hydroxide',
    summary: 'Third-generation RAR-beta/gamma retinoid gel. Photostable and oxidation-resistant, but requires barrier lipid buffering.'
  },
  {
    id: 'lrp-cicaplast-baume-b5',
    brand: 'La Roche-Posay',
    name: 'Cicaplast Baume B5+ Soothing Therapeutic Multi-Purpose Cream',
    category: 'Barrier Recovery',
    ph: 5.6,
    priceUsd: 18,
    primaryActives: ['panthenol', 'centella-asiatica', 'zinc-oxide'],
    inciList: 'Water, Hydrogenated Polyisobutene, Dimethicone, Glycerin, Butyrospermum Parkii Butter, Panthenol 5%, Propanediol, Butylene Glycol, Madecassoside, Zinc Gluconate, Trihydroxystearin',
    summary: '5% Panthenol + Madecassoside + Zinc barrier rescue balm for post-retinoid or post-peel recovery nights.'
  },
  {
    id: 'dieux-instant-angel',
    brand: 'Dieux Skin',
    name: 'Instant Angel Lipid Rich Barrier Moisturizer',
    category: 'Barrier Moisturizer',
    ph: 5.4,
    priceUsd: 45,
    primaryActives: ['ceramide-np', 'cholesterol', 'squalane', 'urea', 'glycerin'],
    inciList: 'Water, Squalane, Glycerin, Caprylic/Capric Triglyceride, Cetearyl Olivate, Sorbitan Olivate, Dipalmitoyl Hydroxyproline, Urea, Ceramide NG, Ceramide NP, Cholesterol, Phytosphingosine',
    summary: 'Formulated by cosmetic chemist Joyce de Lemos with physiological ceramides, cholesterol, squalane, and urea.'
  },
  {
    id: 'topicals-faded-serum',
    brand: 'Topicals',
    name: 'Faded Serum for Dark Spots & Discoloration',
    category: 'Brightening Serum',
    ph: 5.5,
    priceUsd: 38,
    primaryActives: ['tranexamic-acid', 'niacinamide', 'azelaic-acid', 'kojic-acid', 'centella-asiatica'],
    inciList: 'Water, Caprylic/Capric Triglyceride, Niacinamide, Tranexamic Acid, Shea Butter, Glyceryl Stearate, Glycerin, Cetearyl Alcohol, Kojic Acid, Azelaic Acid, Centella Asiatica Extract, Melatonin',
    summary: 'Multi-pathway tyrosinase & melanosome blocker combining Tranexamic Acid, Niacinamide, Azelaic Acid, and Kojic Acid.'
  },
  {
    id: 'naturium-tranexamic-5',
    brand: 'Naturium',
    name: 'Tranexamic Topical Acid 5%',
    category: 'Brightening Serum',
    ph: 5.6,
    priceUsd: 20,
    primaryActives: ['tranexamic-acid', 'kojic-acid', 'niacinamide', 'alpha-arbutin'],
    inciList: 'Water, Propanediol, Tranexamic Acid 5%, Niacinamide, Kojic Acid, Alpha-Arbutin, Acetyl Glucosamine, Sodium Hyaluronate, Allantoin',
    summary: '5% Tranexamic Acid + Kojic Acid + Niacinamide + Acetyl Glucosamine for melasma and post-inflammatory hyperpigmentation.'
  },
  {
    id: 'skin1004-centella-ampoule',
    brand: 'SKIN1004',
    name: 'Madagascar Centella Ampoule',
    category: 'Barrier Essence',
    ph: 5.8,
    priceUsd: 19,
    primaryActives: ['centella-asiatica', 'glycerin'],
    inciList: 'Water, Glycerin, Butylene Glycol, Centella Asiatica Extract, 1,2-Hexanediol, Cellulose Gum, Ethylhexylglycerin',
    summary: 'Minimalist 7-ingredient Centella Asiatica extract ampoule; 100% non-comedogenic and fungal-acne safe.'
  },
  {
    id: 'boj-relief-sun-spf50',
    brand: 'Beauty of Joseon',
    name: 'Relief Sun: Rice + Probiotics SPF50+ PA++++',
    category: 'Sunscreen (SPF)',
    ph: 6.2,
    priceUsd: 18,
    primaryActives: ['avobenzone', 'niacinamide', 'galactomyces'],
    inciList: 'Water, Oryza Sativa (Rice) Extract (30%), Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Monascus/Rice Ferment',
    summary: 'Next-gen Korean UV filter emulsion with 30% Rice Extract + Niacinamide. Essential AM step to protect retinoid/acid routines.'
  },
  {
    id: 'eltamd-uv-clear-spf46',
    brand: 'EltaMD',
    name: 'UV Clear Broad-Spectrum SPF 46',
    category: 'Sunscreen (SPF)',
    ph: 6.0,
    priceUsd: 43,
    primaryActives: ['zinc-oxide', 'niacinamide', 'lactic-acid', 'hyaluronic-acid'],
    inciList: 'Zinc Oxide 9.0%, Octinoxate 7.5%, Purified Water, Cyclopentasiloxane, Niacinamide 5%, Octyldodecyl Neopentanoate, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Lactic Acid, Sodium Hyaluronate',
    summary: 'Dermatologist-favorite 9% Zinc Oxide + 5% Niacinamide SPF 46 for acne and rosacea-prone skin.'
  },
  {
    id: 'medik8-crystal-retinal-6',
    brand: 'Medik8',
    name: 'Crystal Retinal 6 (0.06% Encapsulated Retinaldehyde)',
    category: 'Retinoid',
    ph: 5.9,
    priceUsd: 85,
    primaryActives: ['retinaldehyde', 'hyaluronic-acid', 'tocopherol', 'glycerin'],
    inciList: 'Aqua (Water), Caprylic/Capric Triglyceride, Glycerin, Isododecane, Cetearyl Olivate, Sodium Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Retinal, Sodium Hyaluronate, Tocopherol, Squalane',
    summary: 'Cyclodextrin-encapsulated 0.06% Retinaldehyde serum. Separate from Benzoyl Peroxide and direct low-pH acids.'
  },
  {
    id: 'tower28-sos-spray',
    brand: 'Tower 28 Beauty',
    name: 'SOS Daily Rescue Facial Spray (Hypochlorous Acid)',
    category: 'Acne & Eczema Mist',
    ph: 4.8,
    priceUsd: 28,
    primaryActives: ['hypochlorous-acid'],
    inciList: 'Electrolyzed Water (H2O), Sodium Chloride (NaCl), Hypochlorous Acid (HOCl)',
    summary: '0.015% Hypochlorous Acid antimicrobial mist. Wait 5-10 minutes to dry before applying Vitamin C or Peptides.'
  },
  {
    id: 'panoxyl-10-bpo-wash',
    brand: 'PanOxyl',
    name: 'Acne Foaming Wash Benzoyl Peroxide 10% Maximum Strength',
    category: 'Acne Cleanser',
    ph: 5.2,
    priceUsd: 11,
    primaryActives: ['benzoyl-peroxide'],
    inciList: 'Benzoyl Peroxide 10%, Carbomer Homopolymer Type C, Carbomer Interpolymer Type A, Decyl Glucoside, Dimethicone, Dioctyl Sodium Sulfosuccinate, Glycerin, Palmitic Acid, Polyacrylate Crosspolymer-6',
    summary: '10% Benzoyl Peroxide wash. Safe as short-contact rinse-off therapy before PM retinoids if thoroughly rinsed, but leave-on co-application oxidizes retinoids.'
  },
  {
    id: 'drunk-elephant-babyfacial',
    brand: 'Drunk Elephant',
    name: 'T.L.C. Sukari Babyfacial 25% AHA + 2% BHA Mask',
    category: 'Exfoliating Peel',
    ph: 3.5,
    priceUsd: 80,
    primaryActives: ['glycolic-acid', 'tartaric-acid', 'lactic-acid', 'citric-acid', 'salicylic-acid', 'niacinamide'],
    inciList: 'Water/Aqua/Eau, Glycolic Acid, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Glycereth-26, Soyermidopropyl Dimethylamine, Lactic Acid, Tartaric Acid, Salicylic Acid, Citric Acid, Niacinamide',
    summary: '25% multi-AHA + 2% Salicylic Acid peel at pH 3.5. Requires 48 hours of zero retinoids or other exfoliants.'
  },
  {
    id: 'glow-recipe-pha-bha-toner',
    brand: 'Glow Recipe',
    name: 'Watermelon Glow PHA+BHA Pore-Tight Toner',
    category: 'Exfoliating Acid',
    ph: 4.2,
    priceUsd: 35,
    primaryActives: ['gluconolactone', 'salicylic-acid', 'hyaluronic-acid', 'fragrance-limonene'],
    inciList: 'Opuntia Ficus-Indica Stem Extract, Citrullus Lanatus Fruit Extract, Glycerin, Hyaluronic Acid, Gluconolactone, Betaine Salicylate, Salix Alba Bark Extract, Fragrance/Parfum',
    summary: 'Mild pH 4.2 PHA + Betaine Salicylate hydrating toner; contains added fragrance.'
  },
  {
    id: 'rhode-glazing-milk',
    brand: 'Rhode',
    name: 'Glazing Milk Ceramide Facial Essence',
    category: 'Barrier Essence',
    ph: 5.5,
    priceUsd: 30,
    primaryActives: ['ceramide-np', 'squalane', 'glycerin'],
    inciList: 'Water/Aqua/Eau, Coco-Caprylate/Caprate, Glycerin, Phytosteryl/Octyldodecyl Lauroyl Glutamate, Propanediol, Ceramide NP, Ceramide AP, Ceramide EOP, Beta-Glucan, Magnesium Aspartate, Zinc Gluconate, Copper Gluconate',
    summary: 'Ceramide + Beta-Glucan barrier prep essence. Note: Coco-Caprylate/Caprate can trigger Malassezia in fungal-acne prone skin.'
  },
  {
    id: 'krave-great-barrier-relief',
    brand: 'KraveBeauty',
    name: 'Great Barrier Relief Reparative Serum',
    category: 'Barrier Recovery',
    ph: 5.5,
    priceUsd: 28,
    primaryActives: ['niacinamide', 'ceramide-np', 'cholesterol', 'squalane'],
    inciList: 'Water, Propanediol, Calophyllum Inophyllum Seed Oil (10%), Dipropylene Glycol, Niacinamide, Carthamus Tinctorius Seed Oil, Squalane, Butylene Glycol, Ceramide NP, Phytosterols',
    summary: '10% Tamanu Oil + Niacinamide + Ceramide NP + Squalane barrier restorative emulsion.'
  },
  {
    id: 'biologique-recherche-p50-1970',
    brand: 'Biologique Recherche',
    name: 'Lotion P50 1970 Balancing Exfoliator',
    category: 'Exfoliating Acid',
    ph: 3.0,
    priceUsd: 115,
    primaryActives: ['lactic-acid', 'salicylic-acid', 'gluconolactone', 'niacinamide', 'sulfur'],
    inciList: 'Water (Aqua), Gluconolactone, Lactic Acid, Glycerin, Propylene Glycol, Niacinamide, Citric Acid, Ethoxydiglycol, Magnesium Chloride, Malic Acid, Phytic Acid, Salicylic Acid, Sulfur',
    summary: 'Iconic pH 3.0 multi-acid (Lactic + PHA + BHA + Sulfur) resurfacing lotion. Extreme barrier hazard if combined with Tretinoin.'
  },
  {
    id: 'murad-retinal-resculpt',
    brand: 'Murad',
    name: 'Retinal ReSculpt Overnight Treatment',
    category: 'Retinoid',
    ph: 5.8,
    priceUsd: 105,
    primaryActives: ['retinaldehyde', 'squalane', 'glycerin'],
    inciList: 'Water/Aqua/Eau, Diisostearyl Malate, Pentylene Glycol, Polyglyceryl-3 Methylglucose Distearate, Zea Mays Starch, Squalane, Retinal, Avena Sativa Kernel Extract, Glycerin',
    summary: 'Encapsulated Retinaldehyde treatment for deep wrinkle remodeling.'
  },
  {
    id: 'geek-gorgeous-c-glow',
    brand: 'Geek & Gorgeous',
    name: 'C-Glow 15% Vitamin C + Ferulic Acid + Vitamin E',
    category: 'Antioxidant Serum',
    ph: 3.2,
    priceUsd: 16,
    primaryActives: ['l-ascorbic-acid', 'ferulic-acid', 'tocopherol'],
    inciList: 'Water, Ascorbic Acid, Dimethyl Isosorbide, Butylene Glycol, Peg/Ppg/Polybutylene Glycol-8/5/3 Glycerin, Ferulic Acid, Tocopherol, Phenoxyethanol, Ethylhexylglycerin, Sodium Hydroxide',
    summary: 'Fresh-batched pH 3.2 15% L-Ascorbic Acid + Ferulic Acid serum; zero pore-clogging emollients.'
  },
  {
    id: 'timeless-20-vitamin-c',
    brand: 'Timeless Skin Care',
    name: '20% Vitamin C + E Ferulic Acid Serum',
    category: 'Antioxidant Serum',
    ph: 2.7,
    priceUsd: 26,
    primaryActives: ['l-ascorbic-acid', 'tocopherol', 'ferulic-acid', 'panthenol'],
    inciList: 'Water, Ethoxydiglycol, L-Ascorbic Acid, Propylene Glycol, Alpha Tocopherol, Polysorbate 80, Panthenol, Ferulic Acid, Sodium Hyaluronate, Benzylalcohol, Dehydroacetic Acid',
    summary: 'High-potency 20% L-Ascorbic Acid at pH 2.7. High ΔpH shock if layered immediately with peptides or niacinamide.'
  },
  {
    id: 'to-niacinamide-10-zinc',
    brand: 'The Ordinary',
    name: 'Niacinamide 10% + Zinc 1% Oil Control Serum',
    category: 'Sebum & Pore Serum',
    ph: 6.0,
    priceUsd: 6,
    primaryActives: ['niacinamide'],
    inciList: 'Aqua (Water), Niacinamide, Pentylene Glycol, Zinc PCA, Dimethyl Isosorbide, Tamarindus Indica Seed Gum, Xanthan Gum, Isoceteth-20, Ethoxydiglycol, Phenoxyethanol, Chlorphenesin',
    summary: 'High-strength 10% Niacinamide + 1% Zinc PCA at pH 6.0. Wait 15 min after pH <= 3.4 acids to avoid nicotinic acid flushing.'
  },
  {
    id: 'to-aha-30-bha-2-peel',
    brand: 'The Ordinary',
    name: 'AHA 30% + BHA 2% Peeling Solution',
    category: 'Exfoliating Peel',
    ph: 3.6,
    priceUsd: 9,
    primaryActives: ['glycolic-acid', 'lactic-acid', 'tartaric-acid', 'citric-acid', 'salicylic-acid', 'panthenol', 'hyaluronic-acid'],
    inciList: 'Glycolic Acid, Aqua (Water), Aloe Barbadensis Leaf Water, Sodium Hydroxide, Daucus Carota Sativa Extract, Propanediol, Cocamidopropyl Dimethylamine, Salicylic Acid, Lactic Acid, Tartaric Acid, Citric Acid, Panthenol, Sodium Hyaluronate Crosspolymer',
    summary: '10-minute 30% AHA + 2% BHA rinse-off chemical peel. Never combine with any leave-on acid, retinoid, or benzoyl peroxide on the same night.'
  },
  {
    id: 'to-azelaic-10',
    brand: 'The Ordinary',
    name: 'Azelaic Acid Suspension 10%',
    category: 'Rosacea & Brightening',
    ph: 4.8,
    priceUsd: 12,
    primaryActives: ['azelaic-acid', 'dimethicone', 'tocopherol'],
    inciList: 'Aqua (Water), Isodecyl Neopentanoate, Dimethicone, Azelaic Acid, Dimethicone/Bis-Isobutyl PPG-20 Crosspolymer, Dimethyl Isosorbide, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Tocopherol',
    summary: '10% Azelaic Acid in a breathable silicone suspension for redness and uneven tone.'
  },
  {
    id: 'aestura-atobarrier-365',
    brand: 'AESTURA',
    name: 'Atobarrier 365 Cream (DermaON Ceramide Capsules)',
    category: 'Barrier Moisturizer',
    ph: 5.5,
    priceUsd: 32,
    primaryActives: ['ceramide-np', 'cholesterol', 'squalane', 'allantoin', 'tocopherol'],
    inciList: 'Water, Glycerin, Butylene Glycol, Butylene Glycol Dicaprylate/Dicaprate, Pentaerythrityl Tetraisostearate, Cyclopentasiloxane, Squalane, Cetyl Ethylhexanoate, Behenyl Alcohol, Hydroxypropyl Bispalmitamide MEA, Cholesterol, Stearic Acid, Allantoin, Tocopherol',
    summary: 'Korean hospital-grade encapsulated ceramide-cholesterol-fatty acid barrier cream.'
  },
  {
    id: 'illiyoon-ceramide-ato',
    brand: 'ILLIYOON',
    name: 'Ceramide Ato Concentrate Cream',
    category: 'Barrier Moisturizer',
    ph: 5.6,
    priceUsd: 19,
    primaryActives: ['ceramide-np', 'cholesterol', 'dimethicone', 'tocopherol'],
    inciList: 'Water, Butylene Glycol, Glycerin, Dimethicone, Pentaerythrityl Tetraisostearate, Hydrogenated Poly(C6-14 Olefin), Stearic Acid, Behenyl Alcohol, Palmitic Acid, Ceramide NP, Cholesterol, Panax Ginseng Root Water, Tocopherol',
    summary: 'Fragrance-free encapsulated ceramide barrier cream ideal for sandwiching Tretinoin.'
  },
  {
    id: 'stratia-lipid-gold',
    brand: 'Stratia',
    name: 'Lipid Gold (formerly Liquid Gold) Barrier Lotion',
    category: 'Barrier Recovery',
    ph: 5.5,
    priceUsd: 27,
    primaryActives: ['niacinamide', 'ceramide-np', 'cholesterol', 'panthenol', 'squalane'],
    inciList: 'Water (Aqua), Propylene Glycol, Ethoxydiglycol, Niacinamide, Polyglyceryl-3 Methylglucose Distearate, Rosa Rubiginosa Seed Oil, Hippophae Rhamnoides Oil, Panthenol, Dimethicone, Squalane, Cholesterol, Ceramide NP, Ceramide AP, Ceramide EOP',
    summary: 'Physiological 3:1:1 ceramide, cholesterol, and sea-buckthorn fatty acid ratio with 4% Niacinamide.'
  },
  {
    id: 'vanicream-gentle-cleanser',
    brand: 'Vanicream',
    name: 'Gentle Facial Cleanser',
    category: 'Cleanser',
    ph: 5.5,
    priceUsd: 10,
    primaryActives: ['glycerin'],
    inciList: 'Purified Water, Glycerin, Coco-Glucoside, Sodium Cocoyl Glycinate, Acrylates Copolymer, Caprylyl Glycol, Mica, Sodium Chloride, 1,2-Hexanediol, Titanium Dioxide, Sodium Hydroxide, Disodium EDTA',
    summary: 'pH 5.5 amino-acid & glucoside surfactant cleanser free of sulfates, fragrance, and Malassezia triggers.'
  },
  {
    id: 'skinfix-triple-lipid-cream',
    brand: 'Skinfix',
    name: 'Barrier+ Triple Lipid-Peptide Cream',
    category: 'Barrier Moisturizer',
    ph: 5.3,
    priceUsd: 54,
    primaryActives: ['ceramide-np', 'cholesterol', 'squalane', 'matrixyl-3000', 'hyaluronic-acid'],
    inciList: 'Water, Caprylic/Capric Triglyceride, Glycerin, Butyrospermum Parkii Butter, Squalane, Cetyl Alcohol, Polyacrylate-13, Plukenetia Volubilis Seed Oil, Ceramide NP, Phytosphingosine, Cholesterol, Sodium Hyaluronate, Palmitoyl Tripeptide-5',
    summary: '3% Triple Lipid Complex + NutriPeptides + Squalane that increases stratum corneum lipids within 1 hour.'
  },
  {
    id: 'nizoral-ketoconazole-1',
    brand: 'Nizoral',
    name: 'Anti-Dandruff Shampoo 1% Ketoconazole (Fungal Acne Mask)',
    category: 'Fungal Acne Wash',
    ph: 6.0,
    priceUsd: 15,
    primaryActives: ['ketoconazole'],
    inciList: 'Ketoconazole 1%, Acrylic Acid Polymer, Butylated Hydroxytoluene, Cocamide MEA, FD&C Blue No. 1, Fragrance, Glycol Distearate, Polyquaternium-7, Quaternium-15, Sodium Chloride, Sodium Cocoyl Sarcosinate, Sodium Hydroxide, Sodium Laureth Sulfate, Water',
    summary: '1% Ketoconazole antifungal wash used as a 5-minute contact mask to clear Malassezia folliculitis.'
  },
  {
    id: 'malezia-5-urea-moisturizer',
    brand: 'Malezia',
    name: '5% Urea Moisturizer (100% Fungal-Acne Safe)',
    category: 'Barrier Moisturizer',
    ph: 5.4,
    priceUsd: 26,
    primaryActives: ['urea', 'dimethicone', 'hyaluronic-acid', 'allantoin'],
    inciList: 'Water, Caprylic/Capric Triglyceride, Urea 5%, Glycerin, Dimethicone, Sodium Polyacrylate, Cyclopentasiloxane, Trideceth-6, PEG/PPG-18/18 Dimethicone, Phenoxyethanol, Allantoin, Hyaluronic Acid, Ethylhexylglycerin',
    summary: 'Engineered without C12-C24 fatty acids, esters, or polysorbates for strict Malassezia-safe barrier repair.'
  },
  {
    id: 'bioderma-sensibio-h2o',
    brand: 'Bioderma',
    name: 'Sensibio H2O Micellar Water',
    category: 'Cleanser',
    ph: 5.5,
    priceUsd: 19,
    primaryActives: ['glycerin'],
    inciList: 'Water (Aqua), PEG-6 Caprylic/Capric Glycerides, Fructooligosaccharides, Mannitol, Xylitol, Rhamnose, Cucumis Sativus (Cucumber) Fruit Extract, Propylene Glycol, Cetrimonium Bromide, Disodium EDTA',
    summary: 'Isotonic pH 5.5 PEG-6 caprylic/capric glyceride micellar cleanser that preserves native acid mantle.'
  },
  {
    id: 'rohto-melano-cc',
    brand: 'Rohto Mentholatum',
    name: 'Melano CC Vitamin C Intensive Anti-Spot Essence',
    category: 'Antioxidant Serum',
    ph: 3.5,
    priceUsd: 14,
    primaryActives: ['l-ascorbic-acid', 'thd-ascorbate', 'tocopherol'],
    inciList: 'Ascorbic Acid, Tocopheryl Acetate, Dipotassium Glycyrrhizate, Isopropylmethylphenol, Ascorbyl Tetraisopalmitate, Ethoxydiglycol, Alpinia Katsumadai Seed Extract, Butylene Glycol, Disodium Edetate, Fragrance',
    summary: 'Airtight Japanese dual-Vitamin C (L-Ascorbic Acid + Ascorbyl Tetraisopalmitate) + Vitamin E spot treatment.'
  },
  {
    id: 'sunday-riley-ceo-15',
    brand: 'Sunday Riley',
    name: 'C.E.O. 15% Vitamin C Brightening Serum (THD Ascorbate)',
    category: 'Antioxidant Serum',
    ph: 5.5,
    priceUsd: 85,
    primaryActives: ['thd-ascorbate', 'glycolic-acid', 'squalane', 'bisabolol'],
    inciList: 'Water/Eau/Aqua, Tetrahexyldecyl Ascorbate 15%, Squalane, Polyglyceryl-6 Distearate, PEG-8 Beeswax, Limonene, Citrus Sinensis Oil, Glycolic Acid, Bisabolol, Tocopherol, Phytosterols',
    summary: '15% lipid-soluble THD Ascorbate at pH 5.5. Does not require low pH, making it gentler than L-Ascorbic Acid.'
  },
  {
    id: 'caudalie-vinoperfect',
    brand: 'Caudalie',
    name: 'Vinoperfect Radiance Dark Spot Serum',
    category: 'Brightening Serum',
    ph: 5.4,
    priceUsd: 82,
    primaryActives: ['squalane', 'bisabolol', 'glycerin'],
    inciList: 'Aqua/Water/Eau, Butylene Glycol, Glycerin, Cococaprylate/Caprate, Squalane, Palmitoyl Grapevine Shoot Extract, Polyglyceryl-3 Distearate, Bisabolol, Glyceryl Stearate Citrate, Tocopheryl Acetate, Parfum',
    summary: 'Viniferine (Palmitoyl Grapevine Shoot Extract) + Squalane + Bisabolol brightener; safe in AM or PM without pH conflict.'
  },
  {
    id: 'round-lab-birch-spf50',
    brand: 'Round Lab',
    name: 'Birch Juice Moisturizing Sunscreen SPF 50+ PA++++',
    category: 'Sunscreen (SPF)',
    ph: 6.1,
    priceUsd: 24,
    primaryActives: ['avobenzone', 'niacinamide', 'hyaluronic-acid', 'allantoin'],
    inciList: 'Water, Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Betula Platyphylla Japonica Juice, Hyaluronic Acid, Allantoin',
    summary: 'Weightless Korean birch-sap SPF 50+ emulsion with Niacinamide and Hyaluronic Acid; zero white cast across all undertones.'
  },
  {
    id: 'skin1004-hyalu-cica-spf50',
    brand: 'SKIN1004',
    name: 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF 50+',
    category: 'Sunscreen (SPF)',
    ph: 6.2,
    priceUsd: 19,
    primaryActives: ['avobenzone', 'centella-asiatica', 'hyaluronic-acid', 'niacinamide'],
    inciList: 'Water, Dibutyl Adipate, Propanediol, Diethylamino Hydroxybenzoyl Hexyl Benzoate, Polymethylsilsesquioxane, Ethylhexyl Triazone, Niacinamide, Centella Asiatica Extract, Sodium Hyaluronate',
    summary: 'Ultra-light Centella + Hyaluronic Acid serum-SPF 50+ for redness-prone and sensitive skin.'
  },
  {
    id: 'torriden-dive-in-serum',
    brand: 'Torriden',
    name: 'DIVE-IN Low Molecular Hyaluronic Acid Serum',
    category: 'Barrier Essence',
    ph: 5.6,
    priceUsd: 22,
    primaryActives: ['hyaluronic-acid', 'panthenol', 'allantoin'],
    inciList: 'Water, Butylene Glycol, Glycerin, Dipropylene Glycol, 1,2-Hexanediol, Panthenol, Sodium Hyaluronate, Hydrolyzed Hyaluronic Acid, Sodium Acetylated Hyaluronate, Allantoin, Trehalose',
    summary: '5D multi-molecular-weight Hyaluronic Acid + D-Panthenol + Allantoin hydrator; zero conflict with acids, retinoids, or Vitamin C.'
  },
  {
    id: 'haruharu-black-rice-toner',
    brand: 'Haruharu Wonder',
    name: 'Black Rice Hyaluronic Toner (Fragrance-Free)',
    category: 'Soothing Toner',
    ph: 5.7,
    priceUsd: 18,
    primaryActives: ['hyaluronic-acid', 'glycerin'],
    inciList: 'Water, Betaine, Glycerin, Propanediol, Oryza Sativa (Rice) Extract, Phyllostachys Pubescens Shoot Bark Extract, Aspergillus Ferment, Panax Ginseng Root Extract, Hyaluronic Acid, Beta-Glucan',
    summary: 'Fermented black rice + Beta-Glucan + Hyaluronic Acid pH 5.7 prep toner for sensitive and barrier-depleted skin.'
  },
  {
    id: 'prequel-gleanser',
    brand: 'Prequel',
    name: 'Gleanser Non-Drying Glycerin Cleanser (50% Glycerin)',
    category: 'Cleanser',
    ph: 5.4,
    priceUsd: 18,
    primaryActives: ['glycerin', 'inulin'],
    inciList: 'Glycerin (50%), Water, Sodium Cocoyl Glycinate, Cocamidopropyl Hydroxysultaine, Decyl Glucoside, Inulin, Saccharide Isomerate, Aloe Barbadensis Leaf Juice',
    summary: 'Dermatologist-developed 50% Glycerin humectant cleanser that cleanses without stripping barrier lipids before Tretinoin.'
  },
  {
    id: 'prequel-lucent-c',
    brand: 'Prequel',
    name: 'Lucent-C Brightening Vitamin C Serum (15% L-Ascorbic + Ergothioneine)',
    category: 'Antioxidant Serum',
    ph: 3.3,
    priceUsd: 23,
    primaryActives: ['l-ascorbic-acid', 'ferulic-acid', 'niacinamide'],
    inciList: 'Water, Ascorbic Acid (15%), Propanediol, Glycerin, Ethoxydiglycol, Ferulic Acid, Ergothioneine, Niacinamide, Tocopherol, Panthenol',
    summary: 'Clinical pH 3.3 15% L-Ascorbic Acid + Ferulic Acid + Ergothioneine serum; keep separate from Copper Peptides and Benzoyl Peroxide.'
  },
  {
    id: 'naturium-vitamin-c-complex',
    brand: 'Naturium',
    name: 'Vitamin C Complex Serum (Encapsulated L-Ascorbic + Sodium Ascorbyl Phosphate)',
    category: 'Antioxidant Serum',
    ph: 5.2,
    priceUsd: 21,
    primaryActives: ['sodium-ascorbyl-phosphate', 'l-ascorbic-acid', 'hyaluronic-acid', 'tocopherol'],
    inciList: 'Water, Glycerin, Sodium Ascorbyl Phosphate, Ascorbic Acid, Gold, Glutathione, Sodium Hyaluronate, Tocopherol, Kakadu Plum Extract',
    summary: 'Buffered pH 5.2 Vitamin C blend designed for sensitive skin that stings from pH 3.2 L-Ascorbic Acid.'
  },
  {
    id: 'naturium-retinaldehyde-005',
    brand: 'Naturium',
    name: 'Retinaldehyde Cream Serum 0.05%',
    category: 'Retinoid',
    ph: 5.7,
    priceUsd: 29,
    primaryActives: ['retinaldehyde', 'squalane', 'glycerin'],
    inciList: 'Water, Caprylic/Capric Triglyceride, Glycerin, Propanediol, Squalane, Retinal (0.05%), Phospholipids, Astaxanthin, Tocopherol',
    summary: 'Sustained-release 0.05% Retinaldehyde cream-serum for fine lines and photoaging; apply on dry skin in Slot 05.'
  },
  {
    id: 'naturium-azelaic-emulsion-10',
    brand: 'Naturium',
    name: 'Azelaic Acid Emulsion 10% (Bio-Compatible)',
    category: 'Rosacea & Brightening',
    ph: 5.2,
    priceUsd: 20,
    primaryActives: ['azelaic-acid', 'niacinamide', 'ceramide-np'],
    inciList: 'Water, Azelaic Acid (10%), Glycerin, Caprylic/Capric Triglyceride, Niacinamide, Ceramide NP, Ectoin, Allantoin',
    summary: 'Gentle 10% Azelaic Acid + Niacinamide + Ectoin emulsion for redness, sun spots, and pregnancy-safe brightening.'
  },
  {
    id: 'geek-gorgeous-a-game-10',
    brand: 'Geek & Gorgeous',
    name: 'A-Game 10 (0.1% Retinaldehyde Emulsion)',
    category: 'Retinoid',
    ph: 6.0,
    priceUsd: 22,
    primaryActives: ['retinaldehyde', 'panthenol', 'allantoin'],
    inciList: 'Water, Caprylic/Capric Triglyceride, Oleyl Erucate, Glycerin, Triheptanoin, Cyclodextrin, Cetearyl Olivate, Sorbitan Olivate, Retinal (0.1%), Panthenol, Allantoin',
    summary: 'High-strength 0.1% cyclodextrin-stabilized Retinaldehyde emulsion for experienced retinoid users.'
  },
  {
    id: 'summer-fridays-jet-lag-mask',
    brand: 'Summer Fridays',
    name: 'Jet Lag Mask + Moisturizer (Fragrance-Free)',
    category: 'Barrier Recovery',
    ph: 5.6,
    priceUsd: 49,
    primaryActives: ['niacinamide', 'panthenol', 'ceramide-np', 'hyaluronic-acid'],
    inciList: 'Water, Caprylic/Capric Triglyceride, Castanea Sativa Seed Extract, Diheptyl Succinate, Glycerin, Niacinamide, Panthenol, Ceramide NP, Ceramide AP, Sodium Hyaluronate, Allantoin',
    summary: 'Cushioning Niacinamide + Panthenol + Ceramide overnight recovery mask for Nights 2 and 4 of skin cycling.'
  },
  {
    id: 'tatcha-dewy-skin-cream',
    brand: 'Tatcha',
    name: 'The Dewy Skin Cream Plumping & Hydrating Moisturizer',
    category: 'Barrier Moisturizer',
    ph: 5.6,
    priceUsd: 72,
    primaryActives: ['squalane', 'hyaluronic-acid', 'ceramide-np', 'glycerin'],
    inciList: 'Aqua/Water/Eau, Saccharomyces/Rice Ferment Filtrate, Glycerin, Propanediol, Dimethicone, Squalane, Behenyl Alcohol, Sodium Hyaluronate, Ceramide NP, Camellia Sinensis Leaf Extract, Parfum',
    summary: 'Japanese purple rice + Squalane + Hyaluronic Acid rich barrier cream for dry skin.'
  },
  {
    id: 'dr-idriss-major-fade-serum',
    brand: 'Dr. Idriss',
    name: 'Major Fade Hyper Serum Dark Spot Treatment',
    category: 'Brightening Serum',
    ph: 5.4,
    priceUsd: 68,
    primaryActives: ['alpha-arbutin', 'kojic-acid', 'niacinamide', 'glycerin'],
    inciList: 'Water, Niacinamide, Glycerin, Propanediol, Alpha-Arbutin (2%), Kojic Acid, Diglucosyl Gallic Acid, Licorice Root Extract, Squalane',
    summary: 'Dermatologist-formulated 2% Alpha-Arbutin + Kojic Acid + Niacinamide serum for stubborn sun spots and melasma.'
  },
  {
    id: 'regimen-lab-wave-serum',
    brand: 'Regimen Lab',
    name: 'Wave Serum Next-Gen Multi-Humectant Hydrator',
    category: 'Barrier Essence',
    ph: 5.5,
    priceUsd: 42,
    primaryActives: ['glycerin', 'urea', 'panthenol', 'hyaluronic-acid'],
    inciList: 'Water, Glycerin, Pentylene Glycol, Betaine, Urea, Panthenol, Sodium PCA, Trehalose, Sodium Hyaluronate, Allantoin',
    summary: '35%+ multi-humectant complex (Glycerin, Betaine, Hydroxyethyl Urea, Panthenol); 100% fungal-acne and pore safe.'
  },
  {
    id: 'regimen-lab-level-serum',
    brand: 'Regimen Lab',
    name: 'Level Serum Hyperpigmentation & Tone Corrector',
    category: 'Brightening Serum',
    ph: 5.5,
    priceUsd: 46,
    primaryActives: ['niacinamide', 'tranexamic-acid', 'alpha-arbutin'],
    inciList: 'Water, Niacinamide (5%), Ethoxydiglycol, Tranexamic Acid (3%), Acetyl Glucosamine (2%), Alpha-Arbutin (2%), Undecylenoyl Phenylalanine, Licorice Root Extract',
    summary: 'Multi-pathway pigment inhibitor targeting tyrosinase, melanosome transfer, and plasmin; pH 5.5 gentle.'
  },
  {
    id: 'supergoop-unseen-spf50',
    brand: 'Supergoop!',
    name: 'Unseen Sunscreen SPF 50 Invisible Velvet Primer',
    category: 'Sunscreen (SPF)',
    ph: 6.0,
    priceUsd: 38,
    primaryActives: ['avobenzone', 'dimethicone', 'tocopherol'],
    inciList: 'Isododecane, Dimethicone Crosspolymer, Polymethylsilsesquioxane, Homosalate, Avobenzone, Octisalate, Octocrylene, Meadowfoam Seed Oil, Bisabolol, Tocopherol',
    summary: '100% invisible anhydrous elastomer-gel SPF 50 that doubles as a soft-matte primer across all skin tones.'
  },
  {
    id: 'ilia-super-serum-skin-tint-spf40',
    brand: 'ILIA',
    name: 'Super Serum Skin Tint SPF 40 (Mineral Zinc + Squalane + Niacinamide)',
    category: 'Sunscreen (SPF)',
    ph: 6.1,
    priceUsd: 48,
    primaryActives: ['zinc-oxide', 'squalane', 'niacinamide', 'hyaluronic-acid'],
    inciList: 'Zinc Oxide (12.0%), Aqua/Water/Eau, Squalane, Shea Butter Ethyl Esters, Isoamyl Laurate, Polyglyceryl-3 Ricinoleate, Niacinamide, Sodium Hyaluronate, Aloe Barbadensis Leaf',
    summary: '12% Non-Nano Zinc Oxide + Plant Squalane + Niacinamide + Hyaluronic Acid skin-tint SPF 40 in 30 shade undertones.'
  },
  {
    id: 'vanicream-daily-facial-moisturizer',
    brand: 'Vanicream',
    name: 'Daily Facial Moisturizer With Ceramides & Hyaluronic Acid',
    category: 'Barrier Moisturizer',
    ph: 5.5,
    priceUsd: 14,
    primaryActives: ['squalane', 'ceramide-np', 'hyaluronic-acid', 'glycerin'],
    inciList: 'Purified Water, Squalane, Glycerin, Pentylene Glycol, Polyglyceryl-2 Stearate, Glyceryl Stearate, Stearyl Alcohol, Hyaluronic Acid, Ceramide EOP, Ceramide NG, Ceramide NP, Ceramide AS, Ceramide AP, Carnosine',
    summary: '5 key ceramides + Squalane + Hyaluronic Acid without fragrance, lanolin, or parabens; ultra-safe for reactive skin.'
  },
  {
    id: 'cerave-hydrating-cleanser',
    brand: 'CeraVe',
    name: 'Hydrating Facial Cleanser (Ceramides + Hyaluronic Acid)',
    category: 'Cleanser',
    ph: 5.5,
    priceUsd: 16,
    primaryActives: ['ceramide-np', 'hyaluronic-acid', 'cholesterol', 'glycerin'],
    inciList: 'Aqua/Water/Eau, Glycerin, Cetearyl Alcohol, PEG-40 Stearate, Stearyl Alcohol, Potassium Phosphate, Ceramide NP, Ceramide AP, Ceramide EOP, Carbomer, Glyceryl Stearate, Behentrimonium Methosulfate, Sodium Lauroyl Lactylate, Sodium Hyaluronate, Cholesterol',
    summary: 'Non-foaming lotion cleanser with Ceramides 1, 3, 6-II and Hyaluronic Acid for dry or retinized skin.'
  },
  {
    id: 'cerave-resurfacing-retinol',
    brand: 'CeraVe',
    name: 'Resurfacing Retinol Serum (Encapsulated Retinol + Licorice)',
    category: 'Retinoid',
    ph: 5.8,
    priceUsd: 20,
    primaryActives: ['retinol', 'niacinamide', 'ceramide-np', 'cholesterol'],
    inciList: 'Aqua/Water/Eau, Propanediol, Dimethicone, Cetearyl Ethylhexanoate, Niacinamide, Ammonium Polyacryloyldimethyl Taurate, Dipotassium Glycyrrhizate, Hydrogenated Lecithin, Ceramide NP, Ceramide AP, Ceramide EOP, Retinol, Cholesterol',
    summary: 'Beginner-friendly encapsulated Retinol + Niacinamide + Licorice Root serum for post-blemish marks and texture.'
  },
  {
    id: 'lrp-toleriane-double-repair',
    brand: 'La Roche-Posay',
    name: 'Toleriane Double Repair Face Moisturizer (Ceramide-3 + Niacinamide)',
    category: 'Barrier Moisturizer',
    ph: 5.6,
    priceUsd: 23,
    primaryActives: ['ceramide-np', 'niacinamide', 'glycerin'],
    inciList: 'Aqua/Water/Eau, Glycerin, Dimethicone, Hydrogenated Polyisobutene, Niacinamide, Ammonium Polyacryloyldimethyl Taurate, Myristyl Myristate, Stearic Acid, Ceramide NP, Potassium Cetyl Phosphate, Glyceryl Stearate SE',
    summary: 'Prebiotic thermal water + Ceramide-3 + 4% Niacinamide daily barrier cream.'
  },
  {
    id: 'lrp-anthelios-uvmune-400',
    brand: 'La Roche-Posay',
    name: 'Anthelios UVMune 400 Invisible Fluid SPF 50+ (Mexoryl 400)',
    category: 'Sunscreen (SPF)',
    ph: 6.1,
    priceUsd: 36,
    primaryActives: ['avobenzone', 'tocopherol', 'glycerin'],
    inciList: 'Aqua/Water/Eau, Alcohol Denat., Triethyl Citrate, Diisopropyl Sebacate, Silica, Ethylhexyl Salicylate, Bis-Ethylhexyloxyphenol Methoxyphenyl Triazine, Butyl Methoxydibenzoylmethane, Methoxypropylamino Cyclohexenylidene Ethoxyethylcyanoacetate',
    summary: 'Ultra-long UVA1 (380-400nm) Mexoryl 400 fluid sunscreen for melasma, sun spots, and photoaging defense.'
  },
  {
    id: 'avene-cicalfate-plus',
    brand: 'Avene',
    name: 'Cicalfate+ Restorative Protective Cream (Post-Biotic C+-Restore + Zinc)',
    category: 'Barrier Recovery',
    ph: 5.8,
    priceUsd: 26,
    primaryActives: ['zinc-oxide', 'glycerin'],
    inciList: 'Avene Thermal Spring Water, Caprylic/Capric Triglyceride, Mineral Oil, Glycerin, Hydrogenated Vegetable Oil, Zinc Oxide, Propylene Glycol, Polyglyceryl-2 Sesquiisostearate, PEG-22/Dodecyl Glycol Copolymer, Aluminum Sucrose Octasulfate, Copper Sulfate, Zinc Sulfate',
    summary: 'Occlusive Copper-Zinc Sulfate + postbiotic barrier balm for compromised, peeling, or post-procedure skin.'
  },
  {
    id: 'first-aid-beauty-ultra-repair',
    brand: 'First Aid Beauty',
    name: 'Ultra Repair Cream Intense Hydration (0.5% Colloidal Oatmeal)',
    category: 'Barrier Moisturizer',
    ph: 5.5,
    priceUsd: 38,
    primaryActives: ['ceramide-np', 'squalane', 'allantoin', 'glycerin'],
    inciList: 'Colloidal Oatmeal 0.50%, Water, Stearic Acid, Glycerin, C12-15 Alkyl Benzoate, Caprylic/Capric Triglyceride, Glyceryl Stearate, Butyrospermum Parkii (Shea) Butter, Dimethicone, Squalane, Allantoin, Ceramide 3',
    summary: 'OTC 0.5% Colloidal Oatmeal + Shea Butter + Ceramide 3 soothing cream for dry, windburned, or eczema-prone skin.'
  },
  { id: 'laneige-cream-skin-toner', brand: 'LANEIGE', name: 'Cream Skin Cerapeptide Refiner Toner & Moisturizer', category: 'Soothing Toner', ph: 5.6, priceUsd: 36, primaryActives: ['ceramide-np', 'squalane', 'glycerin'], inciList: 'Water, Butylene Glycol, Glycerin, Limnanthes Alba (Meadowfoam) Seed Oil, Isopentyldiol, 1,2-Hexanediol, Squalane, Polyglyceryl-10 Stearate, Glyceryl Stearate Citrate, Sodium Stearoyl Glutamate, Inulin Lauryl Carbamate, Ceramide NP, Acetyl Tetrapeptide-11', summary: 'US #1 Sephora Milky Toner: Micro-emulsified Ceramide NP + Acetyl Tetrapeptide-11 + White Leaf Tea for dewy morning barrier prep.' },
  { id: 'im-from-mugwort-essence', brand: "I'm From", name: 'Mugwort Essence (100% Artemisia Princeps Extract)', category: 'Soothing Toner', ph: 5.8, priceUsd: 40, primaryActives: ['centella-asiatica'], inciList: 'Artemisia Princeps Extract (100%)', summary: 'Single-ingredient slow-extracted Korean Mugwort essence that calms flushing, heat, and reactive skin.' },
  { id: 'byoma-hydrating-milky-toner', brand: 'BYOMA', name: 'Hydrating Milky Toner (Tri-Ceramide + Polyglutamic Acid + Cica)', category: 'Soothing Toner', ph: 5.5, priceUsd: 15, primaryActives: ['ceramide-np', 'cholesterol', 'centella-asiatica', 'panthenol'], inciList: 'Aqua, Glycerin, Butylene Glycol, Squalane, Ceramide NP, Cholesterol, Phytosphingosine, Polyglutamic Acid, Centella Asiatica Extract, Panthenol, Allantoin', summary: 'US #1 Ulta Mass Milky Toner: Accessible Tri-Ceramide + Polyglutamic Acid + Centella milky toner that preps dry skin before serums.' },
  { id: 'peach-slices-azelaic-10', brand: 'Peach Slices', name: 'Redness Relief Azelaic Acid Serum (10% Azelaic + Panthenol + Cica)', category: 'Rosacea & Brightening', ph: 5.0, priceUsd: 20, primaryActives: ['azelaic-acid', 'panthenol', 'centella-asiatica', 'allantoin'], inciList: 'Water, Azelaic Acid (10%), Propanediol, Glycerin, Butylene Glycol, Panthenol, Centella Asiatica Extract, Madecassoside, Allantoin, Sodium Hyaluronate', summary: 'US #1 Ulta Redness Serum: 10% Azelaic Acid + Cica + Panthenol redness-relief serum; gentle alternative to stinging low-pH acids.' },
  { id: 'good-molecules-discoloration-serum', brand: 'Good Molecules', name: 'Discoloration Correcting Serum (3% Tranexamic + 4% Niacinamide)', category: 'Brightening Serum', ph: 5.5, priceUsd: 12, primaryActives: ['tranexamic-acid', 'niacinamide', 'glycerin'], inciList: 'Water, Butylene Glycol, Propanediol, Glycerin, Niacinamide (4%), Cetyl Tranexamate Mesylate (3%), Cetyl Alcohol, Ceramide NP, Sodium Hyaluronate', summary: 'US #1 Ulta Brightening Value Serum: 3% Cetyl Tranexamate Mesylate + 4% Niacinamide at pH 5.5; layers cleanly under Vitamin C or retinoids.' },
  { id: 'cosrx-bha-blackhead-liquid', brand: 'COSRX', name: 'BHA Blackhead Power Liquid (4% Betaine Salicylate + Niacinamide)', category: 'Exfoliating Acid', ph: 4.0, priceUsd: 25, primaryActives: ['salicylic-acid', 'niacinamide', 'panthenol', 'hyaluronic-acid'], inciList: 'Salix Alba (Willow) Bark Water, Butylene Glycol, Betaine Salicylate (4%), Niacinamide, 1,2-Hexanediol, Arginine, Panthenol, Sodium Hyaluronate', summary: 'Gentle pH 4.0 4% Betaine Salicylate + Willow Bark pore clarifier for sensitive skin that cannot tolerate pH 3.5 Salicylic Acid.' },
  { id: 'kiehls-ultra-facial-cream', brand: "Kiehl's", name: 'Ultra Facial Cream with 4.5% Squalane & Glacial Glycoprotein', category: 'Barrier Moisturizer', ph: 5.6, priceUsd: 39, primaryActives: ['squalane', 'glycerin', 'salicylic-acid', 'tocopherol'], inciList: 'Aqua/Water, Glycerin, Dimethicone, Squalane (4.5%), Bis-PEG-18 Methyl Ether Dimethyl Silane, Sucrose Stearate, Stearyl Alcohol, PEG-8 Distearate, Pseudoalteromonas Ferment Extract, Salicylic Acid, Tocopherol', summary: 'US Top-2 Prestige Moisturizer: 4.5% olive-derived Squalane + Glacial Glycoprotein daily barrier cream for 24-hour moisture balance.' },
  { id: 'tatcha-dewy-skin-cream', brand: 'Tatcha', name: 'The Dewy Skin Cream Plumping & Hydrating Moisturizer', category: 'Barrier Moisturizer', ph: 5.6, priceUsd: 72, primaryActives: ['hyaluronic-acid', 'squalane', 'ceramide-np', 'glycerin'], inciList: 'Aqua/Water/Eau, Saccharomyces/Rice Ferment Filtrate, Glycerin, Propanediol, Dimethicone, Squalane, Camellia Sinensis Leaf Extract, Cladosiphon Okamuranus Extract, Sodium Hyaluronate, Ceramide NP, Tocopherol', summary: 'US #1 Sephora Luxury Moisturizer: Japanese Purple Rice + Hadasei-3 ferment + Hyaluronic Acid + Squalane for luminous, cushiony bounce.' },
  { id: 'drunk-elephant-protini', brand: 'Drunk Elephant', name: 'Protini Polypeptide Firming Refillable Moisturizer', category: 'Barrier Moisturizer', ph: 4.0, priceUsd: 69, primaryActives: ['matrixyl-3000', 'argireline', 'hyaluronic-acid', 'glycerin'], inciList: 'Water/Aqua/Eau, Dicaprylyl Carbonate, Glycerin, Cetearyl Alcohol, Cetearyl Olivate, Sorbitan Olivate, Sclerocarya Birrea Seed Oil, sh-Oligopeptide-1, Palmitoyl Tripeptide-1, Palmitoyl Tetrapeptide-7, Copper Palmitoyl Heptapeptide-14, Sodium Hyaluronate', summary: 'US #2 Sephora Bestseller: 9 signal peptides + pygmy waterlily + amino acids (pH 4.0) for firm, bouncy, protein-supported skin.' },
  { id: 'clinique-moisture-surge-100h', brand: 'Clinique', name: 'Moisture Surge 100H Auto-Replenishing Hydrator Gel-Cream', category: 'Barrier Moisturizer', ph: 5.5, priceUsd: 46, primaryActives: ['hyaluronic-acid', 'centella-asiatica', 'glycerin', 'caffeine'], inciList: 'Water/Aqua/Eau, Dimethicone, Butylene Glycol, Glycerin, Trisiloxane, Trehalose, Sucrose, Ammonium Acryloyldimethyltaurate/VP Copolymer, Hydroxyethyl Urea, Aloe Barbadensis Leaf Water, Sodium Hyaluronate, Centella Asiatica Extract, Caffeine', summary: 'US #1 Ulta Gel-Cream Moisturizer: Oil-free Aloe Bio-Ferment + Hyaluronic Acid + Cica gel-cream for pore-safe 100-hour hydration.' },
  { id: 'olehenriksen-banana-bright-15', brand: 'Olehenriksen', name: 'Banana Bright 15% Vitamin C Dark Spot Serum', category: 'Antioxidant Serum', ph: 3.6, priceUsd: 68, primaryActives: ['l-ascorbic-acid', 'pha-gluconolactone', 'hyaluronic-acid', 'tocopherol'], inciList: 'Aqua/Water/Eau, 3-O-Ethyl Ascorbic Acid, Ascorbic Acid, Gluconolactone, Propanediol, Glycerin, Hyaluronic Acid, Tocopherol, Panthenol, Citrus Aurantium Dulcis Fruit Extract', summary: 'US Top-2 Sephora Vitamin C Serum: 15% Vitamin C + 5% PHA Gluconolactone + hyaluronic acid for instant luminosity and dark spot fading.' },
  { id: 'glow-recipe-dew-drops', brand: 'Glow Recipe', name: 'Watermelon Glow Niacinamide Dew Drops Serum', category: 'Sebum & Pore Serum', ph: 5.8, priceUsd: 35, primaryActives: ['niacinamide', 'hyaluronic-acid', 'glycerin', 'panthenol'], inciList: 'Aqua/Water/Eau, Propanediol, Glycereth-26, Glycerin, Niacinamide, Citrullus Lanatus (Watermelon) Fruit Extract, Sodium Hyaluronate, Morinda Citrifolia Extract, Panthenol, Tocopherol', summary: 'US #1 Sephora Niacinamide Glow Serum: Micca-free Watermelon + Niacinamide + Hyaluronic Acid hybrid serum for instant glass-skin sheen.' },
  { id: 'tatcha-silk-sunscreen-spf50', brand: 'Tatcha', name: 'The Silk Sunscreen Hydrating Mineral Shield SPF 50 PA++++', category: 'Sunscreen (SPF)', ph: 6.2, priceUsd: 64, primaryActives: ['zinc-oxide', 'niacinamide', 'hyaluronic-acid', 'squalane'], inciList: 'Zinc Oxide 10%, Water, Isododecane, Caprylic/Capric Triglyceride, Propanediol, Niacinamide, Glycerin, Silk Extract, Sodium Hyaluronate, Squalane, Camellia Sinensis Leaf Extract', summary: 'US #1 Sephora Luxury Mineral SPF: 10% sheer Zinc Oxide + Silk Extract + Niacinamide + Hyaluronic Acid fluid that melts in with zero cast.' }
];

const ROUTINE_PRESETS = [
  {
    id: 'viral-tiktok-destroyer',
    label: 'Too Many Exfoliants + Retinol Stack',
    badge: 'Redness Alert · Split AM & PM',
    skinType: 'combination',
    productIds: ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic'],
    rawInciText: ''
  },
  {
    id: 'copper-vitc-oxidation',
    label: 'Copper Peptides + Vitamin C Combo',
    badge: 'Cancels Out · Split AM & PM',
    skinType: 'normal',
    productIds: ['to-buffet-copper-peptides', 'skinceuticals-ce-ferulic', 'to-glycolic-acid-7', 'cerave-pm-lotion'],
    rawInciText: ''
  },
  {
    id: 'acne-rx-bpo-tretinoin',
    label: 'Tretinoin / Retinol + Benzoyl Peroxide',
    badge: 'Weakens Retinol · Split AM & PM',
    skinType: 'oily',
    productIds: ['rx-tretinoin-005', 'lrp-effaclar-duo-bpo', 'paulas-choice-2-bha', 'cerave-pm-lotion'],
    rawInciText: ''
  },
  {
    id: 'glass-skin-recovery',
    label: 'Gentle Barrier Repair & Glow Routine',
    badge: '0 Clashes · Safe Barrier Glow',
    skinType: 'sensitive',
    productIds: ['anua-heartleaf-77-toner', 'cosrx-snail-96-mucin', 'dieux-instant-angel', 'boj-relief-sun-spf50'],
    rawInciText: ''
  }
];

const VANITY_SLOT_CALIBRATORS = {
  0: {
    title: 'Match Slot 01 to Morning Skin & Wash Type',
    row1Label: 'Morning Skin State',
    row1Key: 'prepGoal',
    row1: [
      { id: 'redness_sos', label: 'Redness / Post-Gym', pickIdx: 0, note: 'Hypochlorous Mist (pH 4.8): Calms flushing & bacteria. Let dry 45s before Vitamin C.' },
      { id: 'dry_tight', label: 'Dry / Tight Barrier', pickIdx: 1, note: 'Heartleaf 77% Toner (pH 5.7): Restores hydration without stripping natural lipids.' },
      { id: 'blemish_prone', label: 'Active Blemishes', pickIdx: 2, note: 'PanOxyl 10% BPO Wash: Rinse 100% clean so residual peroxide never oxidizes AM Vitamin C.' },
      { id: 'dull_texture', label: 'Rough Texture', pickIdx: 3, note: 'Glycolic 7% Toner (pH 3.6): Resurfaces dull skin, but do not stack directly under Copper Peptides.' }
    ],
    row2Label: 'Water & Cleanse Rule',
    row2Key: 'prepSecond',
    row2: [
      { id: 'splash_only', label: 'Mist / Splash Only', subNote: 'Preserves overnight lipid mantle for dry or sensitive skin.' },
      { id: 'gentle_milk', label: 'Gentle Milk Wash', subNote: 'Removes evening occlusives without raising skin pH.' },
      { id: 'active_wash', label: '60s Blemish Wash', subNote: 'Short-contact therapy clears pores with zero leave-on clash.' }
    ]
  },
  1: {
    title: 'Match Slot 02 to Skin Focus & Sensitivity',
    row1Label: 'Primary Serum Focus',
    row1Key: 'serumFocus',
    row1: [
      { id: 'sun_spots', label: 'Sun Spots & Glow', pickIdx: 0, sensitivePickIdx: 3, note: 'Targets dark spots & UV free radicals. Uses 15% Vitamin C (pH 3.2) or pH 5.5 Tranexamic Acid if sensitive.' },
      { id: 'aging_firmness', label: 'Aging & Firmness', pickIdx: 4, sensitivePickIdx: 4, note: 'Copper Peptides 1% (GHK-Cu + Matrixyl, pH 6.2): Remodels collagen without low-pH acid stinging.' },
      { id: 'pores_oil', label: 'Pores & Oil Control', pickIdx: 2, sensitivePickIdx: 2, note: 'Niacinamide 10% + Zinc 1% (pH 6.0): Balances sebum and visibly tightens pores under SPF.' },
      { id: 'stubborn_pigment', label: 'Post-Blemish Marks', pickIdx: 3, sensitivePickIdx: 3, note: 'Topicals Faded (Tranexamic + Azelaic + Kojic, pH 5.5): Fades dark marks with zero acid burn.' }
    ],
    row2Label: 'Skin Sensitivity & pH Tolerance',
    row2Key: 'serumSensitivity',
    row2: [
      { id: 'resilient', label: 'Resilient (pH 3.2)', subNote: 'Tolerates pure L-Ascorbic Acid at pH 3.2 for maximum penetration.' },
      { id: 'balanced', label: 'Balanced Skin', subNote: 'Wait 60s after serum application before sealing with barrier cream.' },
      { id: 'sensitive', label: 'Sensitive (pH 5.5+)', subNote: 'Avoids pH 3.2 acid sting; switches to pH 5.5+ Tranexamic or Peptide serums.' }
    ]
  },
  2: {
    title: 'Match Slot 03 to Barrier Need & Weight',
    row1Label: 'Barrier Focus',
    row1Key: 'creamFocus',
    row1: [
      { id: 'ceramide_repair', label: 'Dry / Flaking (3:1:1)', pickIdx: 0, note: 'Aestura Atobarrier 365 (pH 5.5): Hospital-grade encapsulated ceramide-cholesterol-lipid ratio.' },
      { id: 'redness_cica', label: 'Redness (B5 Cica)', pickIdx: 3, note: 'Cicaplast Baume B5+ (5% Panthenol + Madecassoside): Calms heat, windburn, and retinoid irritation.' },
      { id: 'aging_plump', label: 'Plumping & Lines', pickIdx: 1, note: 'Dieux Instant Angel (Lipid + Peptide + Urea): Cushions fine lines and locks in humectants.' },
      { id: 'pore_safe_light', label: 'Oily / Pore-Safe', pickIdx: 4, note: 'CeraVe PM / Snail 96: Breathable barrier hydration that will not feel heavy under sunscreen.' }
    ],
    row2Label: 'Climate & Texture Weight',
    row2Key: 'creamWeight',
    row2: [
      { id: 'weightless_gel', label: 'Weightless Gel', subNote: 'Thin humectant layer prevents midday shine.' },
      { id: 'satin_lotion', label: 'Velvet Cream', subNote: 'Balanced 3:1:1 lipid seal for morning and evening.' },
      { id: 'rich_balm', label: 'Night Buffer Balm', subNote: 'Buffers Slot 05 retinoids so corners of nose and mouth never peel.' }
    ]
  },
  4: {
    title: 'Match Slot 05 to Night Goal & Tolerance',
    row1Label: 'Evening Focus',
    row1Key: 'pmFocus',
    row1: [
      { id: 'fine_lines_aging', label: 'Fine Lines & Aging', pickIdx: 0, gentlePickIdx: 1, note: 'Nightly collagen remodeling with Rx Tretinoin 0.05% or encapsulated Medik8 Crystal Retinal.' },
      { id: 'sun_spots_redness', label: 'Sun Spots & Redness', pickIdx: 6, gentlePickIdx: 6, note: 'Finacea 15% Azelaic Acid (pH 4.9): Fades hyperpigmentation and redness; pregnancy-safe.' },
      { id: 'clogged_pores', label: 'Clogged Pores & BHA', pickIdx: 2, gentlePickIdx: 4, note: 'Oil-soluble 2% BHA or Differin 0.1% Gel clears congested pores on Nights 1 & 3.' },
      { id: 'gentle_peptide', label: 'Zero-Peel Peptides', pickIdx: 3, gentlePickIdx: 3, note: 'Copper Peptides 1% (pH 6.2): Repairs firmness overnight with zero retinoid purging.' }
    ],
    row2Label: 'Retinoid & Acid Tolerance',
    row2Key: 'pmTolerance',
    row2: [
      { id: 'beginner_sandwich', label: 'Sandwich Buffer', subNote: 'Apply a thin layer of Slot 03 Cream BEFORE and AFTER Slot 05 to block peeling.' },
      { id: 'cycling_4night', label: '4-Night Cycling', subNote: 'Use Slot 05 on Nights 1 & 3; rest with Ceramides only on Nights 2 & 4.' },
      { id: 'experienced', label: 'Direct (Dry Skin)', subNote: 'Wait 10m after cleansing so damp skin does not accelerate retinoid sting.' }
    ]
  }
};

const VANITY_SLOT_OPTIONS = [
  { slotNum: '01 · AM PREP', shortSlot: '01 · PREP', vesselType: 'mist', role: 'Morning Cleanse & pH Prep', timing: '7:30 AM · Step 1 (pH Reset · Wait 45s)', choices: [
    { id: 'tower28-sos-spray', label: 'Tower 28 SOS Hypochlorous Mist ($28)', short: 'Tower 28', ph: '4.8', tag: 'HOCl', desc: 'US #1 Sephora Soothing Mist: National Eczema Assoc. accepted pH 4.8 Hypochlorous Acid mist. Calms redness & post-gym bacteria in 45s.' },
    { id: 'anua-heartleaf-77-toner', label: 'Anua Heartleaf 77% Soothing Toner ($23)', short: 'Anua 77%', ph: '5.7', tag: 'pH5', desc: 'US #1 Amazon/K-Beauty Soothing Toner: 77% Heartleaf + Panthenol + Cica (pH 5.7). Cools reactive skin and preps dry barriers.' },
    { id: 'panoxyl-10-bpo-wash', label: 'PanOxyl 10% Benzoyl Peroxide Wash ($11)', short: 'PanOxyl', ph: '5.2', tag: 'BPO', desc: 'US #1 Amazon/Ulta Acne Wash: Short-contact 10% Benzoyl Peroxide wash clears acne bacteria in 60s; rinse clean before Vitamin C.' },
    { id: 'to-glycolic-acid-7', label: 'The Ordinary Glycolic Acid 7% Toner ($13)', short: 'Glycolic 7', ph: '3.6', tag: 'AHA', desc: 'US #1 Ulta Exfoliating Toner: High-strength pH 3.6 7% Glycolic AHA + Tasmanian Pepperberry resurfacing toner for smooth glow.' },
    { id: 'glow-recipe-pha-bha-toner', label: 'Glow Recipe Watermelon PHA+BHA Toner ($35)', short: 'Glow PHA', ph: '4.5', tag: 'PHA', desc: 'US #1 Sephora Pore Toner: Cactus water + Hyaluronic Acid + gentle PHA/BHA (pH 4.5) that hydrates and tightens pores with zero sting.' },
    { id: 'laneige-cream-skin-toner', label: 'LANEIGE Cream Skin Cerapeptide Toner ($36)', short: 'Cream Skin', ph: '5.6', tag: 'Cera', desc: 'US #1 Sephora Milky Toner: Micro-emulsified Ceramide NP + Acetyl Tetrapeptide-11 + White Leaf Tea for dewy morning barrier prep.' }
  ] },
  { slotNum: '02 · AM ACTIVE', shortSlot: '02 · SERUM', vesselType: 'dropper', role: 'Morning Antioxidant Serum', timing: '7:31 AM · Step 2 (Antioxidant Shield · Wait 60s before cream)', choices: [
    { id: 'skinceuticals-ce-ferulic', label: 'SkinCeuticals C E Ferulic 15% Vitamin C ($182)', short: 'CE Ferulic', ph: '3.2', tag: '15%C', desc: 'US #1 Derm Vitamin C: Duke-patented pH 3.2 15% L-Ascorbic Acid + 1% Vitamin E + 0.5% Ferulic Acid for 8x UV environmental defense.' },
    { id: 'rohto-melano-cc', label: 'Rohto Melano CC Vitamin C Essence ($14)', short: 'Melano CC', ph: '3.5', tag: 'VitC', desc: 'Cult Japanese airless tube combining pure Vitamin C + Vitamin E + Dipotassium Glycyrrhizate to fade dark spots without oxidizing.' },
    { id: 'to-niacinamide-10-zinc', label: 'The Ordinary Niacinamide 10% + Zinc 1% ($6)', short: 'B3 + Zinc', ph: '6.0', tag: '10%', desc: 'US #1 Ulta/Amazon Pore Serum: Oil-balancing pH 6.0 10% Vitamin B3 + 1% Zinc PCA serum that minimizes shine and tightens pores.' },
    { id: 'topicals-faded-serum', label: 'Topicals Faded Brightening Serum ($38)', short: 'Faded TXA', ph: '5.5', tag: 'TXA', desc: 'US #1 Sephora Dark-Spot Serum: Tranexamic Acid, Azelaic Acid, Kojic Acid & Niacinamide (pH 5.5) for stubborn marks & melasma.' },
    { id: 'to-buffet-copper-peptides', label: 'The Ordinary Multi-Peptide + Copper 1% ($32)', short: 'Copper 1%', ph: '6.2', tag: 'Cu1%', desc: 'US #1 Peptide Serum: 1% pure GHK-Cu Copper Tripeptide + Matrixyl 3000 + Argireline (pH 6.2). Plumps fine lines with zero acid sting.' },
    { id: 'sunday-riley-ceo-15', label: 'Sunday Riley C.E.O. 15% Vitamin C Serum ($85)', short: 'CEO 15%C', ph: '5.5', tag: 'THD', desc: 'US #1 Sephora/Ulta Vitamin C Serum: 15% oil-soluble THD Ascorbate + Phytosterols (pH 5.5) that brightens rapidly with zero low-pH acid sting.' },
    { id: 'olehenriksen-banana-bright-15', label: 'Olehenriksen Banana Bright 15% Vitamin C ($68)', short: 'Banana 15%', ph: '3.6', tag: '15%C', desc: 'US #2 Sephora Vitamin C Serum: 15% Vitamin C + 5% PHA Gluconolactone + Hyaluronic Acid for instant luminosity and dark spot fading.' },
    { id: 'glow-recipe-dew-drops', label: 'Glow Recipe Watermelon Niacinamide Dew Drops ($35)', short: 'Dew Drops', ph: '5.8', tag: 'Dew', desc: 'US #1 Sephora Glow Serum: Mica-free Watermelon + Niacinamide + Hyaluronic Acid hybrid serum (pH 5.8) for instant glass-skin sheen.' }
  ] },
  { slotNum: '03 · BARRIER SEAL', shortSlot: '03 · CREAM', vesselType: 'jar', role: '3:1:1 Ceramide & Lipid Cushion', timing: 'AM & PM · Step 3 (Seals hydration & buffers night actives)', choices: [
    { id: 'aestura-atobarrier-365', label: 'Aestura Atobarrier 365 Ceramide Cream ($32)', short: 'Aestura', ph: '5.5', tag: '3:1:1', desc: 'Korean hospital-grade DermaON encapsulated 3:1:1 Ceramide-Cholesterol-Fatty Acid capsules for 120-hour barrier repair.' },
    { id: 'dieux-instant-angel', label: 'Dieux Instant Angel Lipid Cream ($45)', short: 'Dieux', ph: '5.4', tag: 'Lipid', desc: 'Formulated by cosmetic chemist Joyce de Lemos: 3:1:1 barrier lipids + Dipalmitoyl Hydroxyproline peptides for silky, zero-pill cushion.' },
    { id: 'cosrx-snail-96-mucin', label: 'COSRX Snail 96 Mucin Essence ($25)', short: 'Snail 96', ph: '6.5', tag: '96%', desc: 'US #1 Amazon Hydrating Essence: 96.3% Snail Secretion Filtrate + Panthenol + Allantoin weightless gel-essence that buffers retinoids.' },
    { id: 'lrp-cicaplast-baume-b5', label: 'La Roche-Posay Cicaplast Baume B5+ ($18)', short: 'Cicaplast', ph: '5.6', tag: 'B5+', desc: 'US #1 Derm Recovery Balm: 5% Vitamin B5 (Panthenol) + Madecassoside + Tribioma to rescue windburn, peeling & redness overnight.' },
    { id: 'cerave-pm-lotion', label: 'CeraVe PM Facial Moisturizing Lotion ($17)', short: 'CeraVe PM', ph: '5.8', tag: 'Cera', desc: 'US #1 Drugstore Night Lotion: Oil-free MVE lotion with 4% Niacinamide + Ceramides NP/AP/EOP + Hyaluronic Acid for lightweight comfort.' },
    { id: 'tatcha-dewy-skin-cream', label: 'Tatcha The Dewy Skin Cream ($72)', short: 'Tatcha', ph: '5.6', tag: 'Dewy', desc: 'US #1 Sephora Luxury Moisturizer: Japanese Purple Rice + Hadasei-3 ferment + Hyaluronic Acid + Squalane for luminous, cushiony bounce.' },
    { id: 'drunk-elephant-protini', label: 'Drunk Elephant Protini Polypeptide Cream ($69)', short: 'Protini', ph: '4.0', tag: 'Pep9', desc: 'US #2 Sephora Bestseller: 9 signal peptides + pygmy waterlily + amino acids (pH 4.0) for firm, bouncy, protein-supported skin.' },
    { id: 'clinique-moisture-surge-100h', label: 'Clinique Moisture Surge 100H Gel-Cream ($46)', short: 'Clinique', ph: '5.5', tag: '100H', desc: 'US #1 Ulta Gel-Cream Moisturizer: Oil-free Aloe Bio-Ferment + Hyaluronic Acid + Cica gel-cream for pore-safe 100-hour hydration.' }
  ] },
  { slotNum: '04 · SPF & TONE', shortSlot: '04 · SPF 50', vesselType: 'tube', role: 'Undertone-Matched SPF 50 & Finish', timing: '7:33 AM · Step 4 (2-Finger Rule · Wait 90s before makeup)', choices: [
    { id: 'boj-relief-sun-spf50', label: 'Beauty of Joseon Relief Sun SPF 50+ ($18)', short: 'Joseon 50', ph: '6.2', tag: 'SPF', desc: 'US #1 Viral Rice SPF: 30% Rice Extract + Grain Probiotics organic UV lotion (PA++++). Zero white cast, zero eye sting, grips makeup.' },
    { id: 'eltamd-uv-clear-spf46', label: 'EltaMD UV Clear Broad-Spectrum SPF 46 ($43)', short: 'EltaMD 46', ph: '6.0', tag: 'UV46', desc: 'US #1 Dermatologist & Amazon SPF: 9% transparent Zinc Oxide + 5% Niacinamide oil-free SPF 46 for acne-prone, rosacea & sensitive skin.' },
    { id: 'supergoop-unseen-spf50', label: 'Supergoop! Unseen Sunscreen SPF 50 ($38)', short: 'Supergoop', ph: '6.0', tag: 'Clear', desc: 'US #1 Sephora Sunscreen: 100% invisible, weightless, scentless & oil-free velvet gel-primer SPF 50 that grips makeup with zero cast.' },
    { id: 'lrp-anthelios-uvmune-400', label: 'La Roche-Posay Anthelios Invisible Fluid SPF 50+ ($36)', short: 'Anthelios', ph: '6.1', tag: 'UV50', desc: 'US #1 Ulta Sunscreen Line: Ultra-lightweight fluid with high UVA/UVB antioxidant protection that absorbs instantly without greasiness.' },
    { id: 'tatcha-silk-sunscreen-spf50', label: 'Tatcha The Silk Sunscreen Mineral SPF 50 ($64)', short: 'Tatcha 50', ph: '6.2', tag: 'Silk', desc: 'US #1 Sephora Luxury Mineral SPF: 10% sheer Zinc Oxide + Silk Extract + Niacinamide + Hyaluronic Acid fluid that melts in effortlessly.' }
  ] },
  { slotNum: '05 · PM RENEWAL', shortSlot: '05 · PM', vesselType: 'pm_bottle', role: 'Evening Retinoid / Exfoliant (4-Night Cycle)', timing: '9:30 PM · Nights 1 & 2 Only (Dry skin buffer · Never mix with AM acids)', choices: [
    { id: 'rx-tretinoin-005', label: 'Rx Tretinoin 0.05% Night Cream ($35)', short: 'Tret 0.05%', ph: '5.8', tag: 'Tret', desc: 'US #1 Prescription Retinoid: 0.05% All-Trans Retinoic Acid directly binds nuclear RAR receptors to remodel collagen & clear pores.' },
    { id: 'medik8-crystal-retinal-6', label: 'Medik8 Crystal Retinal 6 Night Serum ($85)', short: 'Retinal 6', ph: '5.9', tag: 'Ret6', desc: 'US #1 Derm Retinaldehyde: Encapsulated 0.06% Retinaldehyde (acts 11x faster than standard retinol) in a gentle carrot-seed cushion.' },
    { id: 'paulas-choice-2-bha', label: "Paula's Choice 2% BHA Liquid Exfoliant ($35)", short: 'Paula BHA', ph: '3.5', tag: 'BHA', desc: 'US #1 Sephora & Amazon Exfoliant: Cult oil-soluble 2% Salicylic Acid + Green Tea liquid (pH 3.5) that clears blackheads & shrinks pores.' },
    { id: 'to-buffet-copper-peptides', label: 'The Ordinary Multi-Peptide + Copper Serum ($32)', short: 'Copper 1%', ph: '6.2', tag: 'Cu1%', desc: 'Retinoid-free night firming option: 1% pure Copper Tripeptide-1 + Matrixyl 3000 repairs elasticity with zero peeling or sun sensitivity.' },
    { id: 'differin-adapalene-01', label: 'Differin Adapalene Gel 0.1% ($16)', short: 'Differin', ph: '5.5', tag: '0.1%', desc: 'US #2 OTC Acne Retinoid: 3rd-generation RAR-beta/gamma retinoid gel that prevents clogged pores with less irritation than tretinoin.' },
    { id: 'biologique-recherche-p50-1970', label: 'Biologique Recherche Lotion P50 1970 ($115)', short: 'Lotion P50', ph: '3.0', tag: 'P50', desc: 'Iconic French facial-in-a-bottle combining AHA, BHA, PHA & Niacinamide at pH 3.0 to press-and-release dead cells for instant radiance.' },
    { id: 'finacea-15-azelaic', label: 'Finacea 15% Azelaic Acid Gel ($55)', short: 'Finacea 15', ph: '4.9', tag: 'AzA', desc: 'US #1 Derm Rosacea & Melasma Gel: 15% micronized Azelaic Acid hydrogel (pH 4.9). Calms flushing, fades PIE, and is pregnancy-safe.' },
    { id: 'sunday-riley-good-genes', label: 'Sunday Riley Good Genes Lactic Acid ($85)', short: 'Good Genes', ph: '2.8', tag: 'AHA', desc: 'US #2 Sephora Exfoliating Treatment: Potent purified Lactic Acid + Licorice + Lemongrass (pH 2.8) for overnight radiance & line plumping.' },
    { id: 'cerave-resurfacing-retinol', label: 'CeraVe Resurfacing Retinol Serum ($20)', short: 'CeraVe Ret', ph: '5.8', tag: 'Ret', desc: 'US #1 Ulta/Amazon OTC Retinol: Encapsulated Retinol + Licorice Root + 3 Essential Ceramides (pH 5.8) for gentle texture & mark fading.' }
  ] }
];

const US_TOP_SELLERS_BY_CATEGORY = {
  lastSyncedAt: '2026-10-29T07:42:00Z',
  syncCadence: 'weekly_monday_0900_pdt',
  retailSources: ['Sephora US Bestsellers', 'Ulta Beauty Top Rated', 'Amazon US Luxury & Derm Beauty', 'Dermstore Bestsellers'],
  categories: [
    { slot: '01 · AM PREP (Toners, Mists & Cleansers)', topTwo: ['tower28-sos-spray', 'glow-recipe-pha-bha-toner'], runnersUp: ['laneige-cream-skin-toner', 'anua-heartleaf-77-toner', 'panoxyl-10-bpo-wash', 'to-glycolic-acid-7'] },
    { slot: '02 · AM ACTIVE (Vitamin C & Glow Serums)', topTwo: ['skinceuticals-ce-ferulic', 'sunday-riley-ceo-15'], runnersUp: ['olehenriksen-banana-bright-15', 'glow-recipe-dew-drops', 'to-niacinamide-10-zinc', 'topicals-faded-serum'] },
    { slot: '03 · BARRIER SEAL (Moisturizers & Creams)', topTwo: ['tatcha-dewy-skin-cream', 'drunk-elephant-protini'], runnersUp: ['clinique-moisture-surge-100h', 'aestura-atobarrier-365', 'dieux-instant-angel', 'lrp-cicaplast-baume-b5'] },
    { slot: '04 · SPF & TONE (Daily Sunscreens)', topTwo: ['supergoop-unseen-spf50', 'eltamd-uv-clear-spf46'], runnersUp: ['boj-relief-sun-spf50', 'lrp-anthelios-uvmune-400', 'tatcha-silk-sunscreen-spf50'] },
    { slot: '05 · PM RENEWAL (Retinoids & Exfoliants)', topTwo: ['paulas-choice-2-bha', 'cerave-resurfacing-retinol'], runnersUp: ['sunday-riley-good-genes', 'rx-tretinoin-005', 'medik8-crystal-retinal-6', 'differin-adapalene-01'] }
  ]
};

module.exports = { CULT_PRODUCTS, ROUTINE_PRESETS, VANITY_SLOT_CALIBRATORS, VANITY_SLOT_OPTIONS, US_TOP_SELLERS_BY_CATEGORY };
