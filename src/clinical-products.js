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
  }
];

const ROUTINE_PRESETS = [
  {
    id: 'viral-tiktok-destroyer',
    label: 'The Viral TikTok Barrier-Destroyer Stack',
    badge: 'CRITICAL CLASH · ΔpH 2.6 + Triple Keratolytic',
    skinType: 'combination',
    productIds: ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic'],
    rawInciText: ''
  },
  {
    id: 'copper-vitc-oxidation',
    label: 'Copper Peptides + Vitamin C Oxidation Trap',
    badge: 'CHELATION & REDOX INACTIVATION · ΔpH 3.0',
    skinType: 'normal',
    productIds: ['to-buffet-copper-peptides', 'skinceuticals-ce-ferulic', 'to-glycolic-acid-7', 'cerave-pm-lotion'],
    rawInciText: ''
  },
  {
    id: 'acne-rx-bpo-tretinoin',
    label: 'Acne Rx Tretinoin + Benzoyl Peroxide Stack',
    badge: 'OXIDATIVE DEGRADATION + PORE-CLOGGING VEHICLE',
    skinType: 'oily',
    productIds: ['rx-tretinoin-005', 'lrp-effaclar-duo-bpo', 'paulas-choice-2-bha', 'cerave-pm-lotion'],
    rawInciText: ''
  },
  {
    id: 'glass-skin-recovery',
    label: 'Glass-Skin Barrier Recovery Protocol (Safe Benchmark)',
    badge: '96/100 OPTIMAL BARRIER SYNERGY',
    skinType: 'sensitive',
    productIds: ['anua-heartleaf-77-toner', 'cosrx-snail-96-mucin', 'dieux-instant-angel', 'boj-relief-sun-spf50'],
    rawInciText: ''
  }
];

module.exports = {
  CULT_PRODUCTS,
  ROUTINE_PRESETS
};

module.exports = { CULT_PRODUCTS, ROUTINE_PRESETS };
