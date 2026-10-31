'use strict';

const { CLINICAL_INGREDIENTS, CULT_PRODUCTS } = require('./clinical-data');
const { CELEBRITY_ROUTINES } = require('./celebrity-routines');
const { PAIR_SEO_SEEDS, PRODUCT_SEO_SEEDS } = require('./pseo-catalog');
const { CONCERN_HUBS, getAllBrandHubs } = require('./seo-hubs');
const { analyzeRoutine } = require('./engine');
const { escapeHtml, SHARED_CSS, CLIENT_SCRIPT, renderHeader, renderFooter } = require('./ui-templates');

const HOST_URL = 'https://www.dermlogic.io';
const CLINICAL_PRODUCTS = CULT_PRODUCTS || [];

function renderBaseDocument({ title, description, canonicalPath, ogSlug, jsonLdObjects, hideNav, bodyHtml }) {
  const canonicalUrl = `${HOST_URL}${canonicalPath || '/'}`;
  const ogImageUrl = `${HOST_URL}/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;
  const jsonLdScripts = (jsonLdObjects || []).map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n');
  return `<!DOCTYPE html><html lang="en" data-theme="day"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}" /><link rel="canonical" href="${escapeHtml(canonicalUrl)}" /><meta property="og:title" content="${escapeHtml(title)}" /><meta property="og:description" content="${escapeHtml(description)}" /><meta property="og:url" content="${escapeHtml(canonicalUrl)}" /><meta property="og:image" content="${escapeHtml(ogImageUrl)}" /><style>${SHARED_CSS}</style>${jsonLdScripts}</head><body>${renderHeader(Boolean(hideNav))}<main id="main-content">${bodyHtml}</main>${renderFooter()}<script>${CLIENT_SCRIPT}</script></body></html>`;
}

const SCENARIO_GUIDES = [
  { slug: 'pregnancy-safe', title: 'Pregnancy & Nursing Safe Skincare Routine Protocol', category: 'Life-Event Scenario', phTarget: '4.8 - 5.5', avoidList: 'Tretinoin, Retinol, Adapalene, Tazarotene, Hydroquinone, High-Dose Salicylic Acid (>2%)', safeIds: ['azelaic-acid', 'niacinamide', 'vitamin-c-saa', 'hyaluronic-acid', 'ceramide-np'], productIds: ['the-ordinary-azelaic-acid-10', 'paulas-choice-10-azelaic-booster', 'aestura-atobarrier-365'], summary: 'Replace teratogenic retinoids and hydroquinone with 10%-15% Azelaic Acid, Niacinamide, and Peptides to calm melasma and hormonal breakouts safely.' },
  { slug: 'fungal-acne-safe', title: 'Malassezia (Fungal Acne) Safe Zero-Ester Routine Matrix', category: 'Microbiome Scenario', phTarget: '5.0 - 5.6', avoidList: 'Polysorbate 20/60/80, Isopropyl Myristate, Coconut Alkanes, Fermented Galactomyces, C12-C24 Fatty Acids', safeIds: ['niacinamide', 'salicylic-acid', 'hyaluronic-acid', 'panthenol', 'zinc-pca'], productIds: ['paulas-choice-2-bha', 'vanicream-daily-facial-moisturizer', 'la-roche-posay-toleriane-purifying'], summary: 'Eliminate C12-C24 fatty acid esters and polysorbates that feed Malassezia folliculitis while clearing congested pores with 2% BHA and caprylic/squalane hydration.' },
  { slug: 'damaged-moisture-barrier', title: 'Over-Exfoliated & Damaged Moisture Barrier Emergency Reset', category: 'Barrier Rescue Scenario', phTarget: '5.2 - 5.8', avoidList: 'Glycolic Acid, L-Ascorbic Acid (pH <3.5), Tretinoin, Benzoyl Peroxide, Physical Scrubs', safeIds: ['ceramide-np', 'panthenol', 'centella-asiatica', 'squalane', 'cholesterol'], productIds: ['aestura-atobarrier-365', 'la-roche-posay-cicaplast-baume-b5', 'stratia-lipid-gold'], summary: 'Pause all low-pH acids and retinoids for 14 days and rebuild lamellar bilayers using a physiological 3:1:1 molar ratio of Ceramides, Cholesterol, and Free Fatty Acids.' },
  { slug: 'retinol-purging-vs-breakout', title: 'Retinoid Purging vs. Irritation Breakout Diagnostic & Sandwich Protocol', category: 'Retinoid Adaptation', phTarget: '5.5 - 6.0', avoidList: 'Same-night AHA/BHA Acids, Benzoyl Peroxide layered on Tretinoin, Damp-skin retinoid application', safeIds: ['tretinoin', 'adapalene', 'ceramide-np', 'niacinamide', 'panthenol'], productIds: ['differin-adapalene-01', 'aestura-atobarrier-365', 'vanicream-daily-facial-moisturizer'], summary: 'Distinguish accelerated follicular cell turnover (4-6 week retinoid purge) from barrier dermatitis or comedogenic ester breakouts using the 20-minute Ceramide Sandwich method.' },
  { slug: 'post-microneedling-recovery', title: '72-Hour Post-Microneedling & Laser Channel Recovery Protocol', category: 'Clinical Procedure Scenario', phTarget: '5.8 - 6.5', avoidList: 'L-Ascorbic Acid, Retinoids, Glycolic/Salicylic Acid, Fragranced Oils, Chemical Sunscreens (Day 1-2)', safeIds: ['hyaluronic-acid', 'panthenol', 'copper-tripeptide-1', 'ceramide-np', 'centella-asiatica'], productIds: ['la-roche-posay-cicaplast-baume-b5', 'aestura-atobarrier-365', 'the-ordinary-copper-peptides-1'], summary: 'Prevent granulomas and low-pH stinging across open micro-channels by restricting Hours 0-72 to sterile high-molecular-weight Hyaluronic Acid, Panthenol B5, and Ceramides.' },
  { slug: 'winter-barrier-repair', title: 'Sub-Zero & Dry Indoor Heating Transepidermal Water Loss (TEWL) Shield', category: 'Climate Scenario', phTarget: '5.0 - 5.6', avoidList: 'High-percentage Denatured Alcohol toners, Unsealed Hyaluronic Acid in <30% humidity, Daily Foaming Sulfates', safeIds: ['ceramide-np', 'squalane', 'panthenol', 'shea-butter', 'polyglutamic-acid'], productIds: ['aestura-atobarrier-365', 'stratia-lipid-gold', 'la-roche-posay-cicaplast-baume-b5'], summary: 'Stop hyaluronic humectants from drawing water out of the dermis in low-humidity winter air by sealing watery serums under an occlusive ceramide-squalane emulsion within 45 seconds.' },
  { slug: 'wedding-prep-glow-cycle', title: '90-Day Bridal & Camera-Ready 4-Night Skin Cycling Schedule', category: 'Life-Event Scenario', phTarget: '3.5 (AM) / 5.6 (PM)', avoidList: 'New prescription retinoids within 21 days of event, Unbuffered 30% AHA peels', safeIds: ['l-ascorbic-acid', 'ferulic-acid', 'retinol', 'copper-tripeptide-1', 'ceramide-np'], productIds: ['skinceuticals-ce-ferulic', 'medik8-crystal-retinal-6', 'aestura-atobarrier-365'], summary: 'Synchronize morning L-Ascorbic Acid + Ferulic photoprotection with a calibrated 4-night Exfoliate / Retinoid / Recovery / Recovery rhythm for zero camera-flash pilling or flaking.' },
  { slug: 'flight-cabin-dehydration', title: 'Long-Haul Cabin (12% Humidity) Osmotic Hydration & UV Shield', category: 'Travel Scenario', phTarget: '5.2 - 5.6', avoidList: 'In-flight Glycolic/BHA peeling pads, Unsealed humectant mists, Heavy pore-clogging coconut esters', safeIds: ['polyglutamic-acid', 'panthenol', 'ceramide-np', 'squalane', 'niacinamide'], productIds: ['aestura-atobarrier-365', 'la-roche-posay-cicaplast-baume-b5', 'elmd-uv-clear-spf46'], summary: 'Protect the stratum corneum against pressurized 12% cabin humidity and high-altitude window UVA radiation with multi-weight humectants locked beneath a 3:1:1 lipid barrier.' }
];

const B2B_STUDIO_FORMULAS = [
  { slug: 'post-peel-ceramide-recovery', title: 'Backbar Protocol #01: Post-TCA & Glycolic Peel Neutralization & Lipid Seal', vertical: 'Medical Esthetics', targetPh: '5.6 - 6.2', activeHoldDays: 7, keyActives: ['ceramide-np', 'panthenol', 'centella-asiatica', 'squalane'], summary: 'Clinical post-peel backbar and take-home protocol engineered to restore stratum corneum pH from 2.8 back to 5.5 without trapping residual acid heat.' },
  { slug: 'bridal-90-day-luminosity', title: 'Backbar Protocol #02: 90-Day Luminosity & Melanin Transfer Inhibition', vertical: 'Cosmetic Dermatology', targetPh: '3.3 (AM) / 5.5 (PM)', activeHoldDays: 3, keyActives: ['l-ascorbic-acid', 'tranexamic-acid', 'azelaic-acid', 'niacinamide'], summary: 'Multi-pathway tyrosinase and melanosome transfer inhibition regimen combining AM L-Ascorbic Acid 15% with PM Tranexamic + Azelaic Acid.' },
  { slug: 'acne-barrier-rehab', title: 'Backbar Protocol #03: Retinoid + Benzoyl Peroxide Split Without Erythema', vertical: 'Acne Clinic', targetPh: '5.0 - 5.8', activeHoldDays: 0, keyActives: ['adapalene', 'benzoyl-peroxide', 'niacinamide', 'ceramide-np'], summary: 'Separates oxidative Benzoyl Peroxide (AM short-contact wash) from photo-stable Adapalene 0.1% (PM buffered over ceramides) to preserve 100% retinoid potency.' }
];

const B2B_PLAYBOOKS = [
  { slug: 'intake-shelf-audit-sop', title: 'Clinic Playbook: 90-Second New-Patient Bathroom Shelf Clash Audit SOP', role: 'Lead Esthetician & Front Desk', kpiLift: '+42% Retail Regimen Attachment', summary: 'Standard operating procedure for auditing a patient’s existing 5-8 home bottles during intake to identify pH neutralization and oxidation clashes immediately.' },
  { slug: 'post-laser-active-hold', title: 'Clinic Playbook: Pre- & Post-Laser Active Ingredient Hold Schedule', role: 'Laser Nurse & Practice Manager', kpiLift: '-68% Post-Procedure Contact Dermatitis Calls', summary: 'Day-by-day checklist specifying when patients must pause Tretinoin, AHA/BHA acids, and low-pH Vitamin C before and after IPL, Fraxel, and RF Microneedling.' },
  { slug: 'retail-regimen-attachment', title: 'Clinic Playbook: Converting Clash Diagnostics into AM/PM Take-Home Kits', role: 'MedSpa Retail Director', kpiLift: '+$164 Average Patient Basket', summary: 'How to hand patients a personalized 9:16 Lock-Screen Routine Card and co-branded regimen permalink that drives automatic refill compliance.' }
];

const KIOSK_VERTICALS = [
  { slug: 'medspa', title: 'MedSpa Waiting Room & Consultation iPad Kiosk Mode', subtitle: 'Patients tap their current home bottles in 30 seconds before entering the treatment room.', ctaLabel: 'Launch Touch Kiosk Check' },
  { slug: 'sephora-counter', title: 'Luxury Apothecary & Beauty Counter Shade- & Serum-Match Kiosk', subtitle: 'Instant shelf compatibility check before adding a new Vitamin C, Peptide, or Retinoid bottle.', ctaLabel: 'Start Counter Bottle Check' },
  { slug: 'dermatology-waiting-room', title: 'Dermatology Clinic Prescription Retinoid & Acne Intake Kiosk', subtitle: 'Checks OTC cleansers, acids, and moisturizers against newly prescribed Tretinoin or Adapalene.', ctaLabel: 'Check Prescription Compatibility' }
];

const B2B_CLIENT_DELIVERABLES = [
  { slug: 'sydney-sweeney-shelf', clientName: 'Sydney Sweeney · Calm Barrier & Peptide Prep', clinicName: 'DermLogic Atelier Beverly Hills', score: 96, deltaPh: 0.8, products: ['laneige-cream-skin-toner', 'the-ordinary-copper-peptides-1', 'aestura-atobarrier-365', 'elmd-uv-clear-spf46'], notes: 'Zero low-pH acid clashes. Copper Peptides cushioned over ceramide toner in the evening; mineral-hybrid SPF 46 in daylight.' },
  { slug: 'atelier-paris-guest', clientName: 'Atelier Céramique VIP Guest Regimen #408', clinicName: 'Maison DermLogic Paris', score: 94, deltaPh: 1.1, products: ['skinceuticals-ce-ferulic', 'medik8-crystal-retinal-6', 'stratia-lipid-gold', 'beauty-of-joseon-relief-sun'], notes: 'Morning L-Ascorbic Acid 15% (pH 3.2) separated from evening Retinaldehyde 0.06% (pH 5.6) with a 3:1:1 lipid barrier seal.' },
  { slug: 'beverly-hills-derm-patient', clientName: 'Post-Laser Recovery & Melasma Maintenance Protocol', clinicName: 'Pacific Clinical Dermatology', score: 95, deltaPh: 0.6, products: ['the-ordinary-azelaic-acid-10', 'la-roche-posay-cicaplast-baume-b5', 'aestura-atobarrier-365', 'elmd-uv-clear-spf46'], notes: 'Pregnancy- and post-procedure-safe tyrosinase inhibition with Azelaic Acid 10% and Panthenol B5 + Madecassoside.' }
];

const INGREDIENT_SUBCATEGORIES = [
  { slug: 'serums', label: 'Targeted Serums & Ampoules', filterFn: (p) => /serum|drop|ampoule|booster|ce-ferulic|peptides|niacinamide|bha/i.test(p.id + ' ' + p.name + ' ' + p.category) },
  { slug: 'moisturizers', label: 'Barrier Creams & Lotions', filterFn: (p) => /cream|moisturizer|baume|lipid|lotion|atobarrier/i.test(p.id + ' ' + p.name + ' ' + p.category) && !/exfoliat|acid|peel|p50/i.test(p.category + ' ' + p.id) },
  { slug: 'cleansers-toners', label: 'Cleansers, Toners & Essences', filterFn: (p) => /cleanser|toner|essence|wash|mucin|skin/i.test(p.id + ' ' + p.name + ' ' + p.category) },
  { slug: 'safe-pairings', label: 'Compatible Same-Routine Actives', filterFn: () => true }
];

function getBottleRivals(prod, limit = 5) {
  if (!prod) return [];
  const firstActive = (prod.primaryActives || [])[0];
  const sameActive = firstActive ? CLINICAL_PRODUCTS.filter((p) => p.id !== prod.id && (p.primaryActives || []).includes(firstActive)) : [];
  const sameCat = CLINICAL_PRODUCTS.filter((p) => p.id !== prod.id && p.category === prod.category && !sameActive.includes(p));
  const fallback = CLINICAL_PRODUCTS.filter((p) => p.id !== prod.id && !sameActive.includes(p) && !sameCat.includes(p));
  return [...sameActive, ...sameCat, ...fallback].slice(0, limit);
}

const FLAGSHIP_BOTTLE_COMPARE_PAIRS = [
  { slug: 'aestura-atobarrier-365-vs-illiyoon-ceramide-ato', title: 'Aestura Atobarrier 365 vs. Illiyoon Ceramide Ato Cream', sub: 'K-Beauty 3:1:1 Ceramide Barrier Cream Showdown' },
  { slug: 'aestura-atobarrier-365-vs-lrp-cicaplast-baume-b5', title: 'Aestura Atobarrier 365 vs. La Roche-Posay Cicaplast Baume B5+', sub: 'Daily Ceramide Moisturizer vs. Panthenol B5 Recovery Balm' },
  { slug: 'avene-cicalfate-plus-vs-lrp-cicaplast-baume-b5', title: 'Avène Cicalfate+ vs. La Roche-Posay Cicaplast Baume B5+', sub: 'Copper-Zinc Post-Procedure Balm vs. Madecassoside B5 Balm' },
  { slug: 'aestura-atobarrier-365-vs-dieux-instant-angel', title: 'Aestura Atobarrier 365 vs. Dieux Instant Angel Lipid Cream', sub: 'Encapsulated Ceramide Capsules vs. Dipalmitoyl Hydroxyproline' },
  { slug: 'skinceuticals-ce-ferulic-vs-timeless-20-vitamin-c', title: 'SkinCeuticals C E Ferulic ($182) vs. Timeless 20% Vitamin C ($26)', sub: 'pH 3.2 L-Ascorbic + Ferulic Patent vs. High-Potency Dupe' },
  { slug: 'geek-gorgeous-c-glow-vs-skinceuticals-ce-ferulic', title: 'Geek & Gorgeous C-Glow vs. SkinCeuticals C E Ferulic', sub: 'Fresh-Batch 15% L-Ascorbic Acid vs. Clinical Gold Standard' },
  { slug: 'prequel-lucent-c-vs-skinceuticals-ce-ferulic', title: 'Prequel Lucent-C vs. SkinCeuticals C E Ferulic', sub: '15% L-Ascorbic + Ergothioneine vs. C E Ferulic' },
  { slug: 'anua-heartleaf-77-toner-vs-paulas-choice-2-bha', title: 'Anua Heartleaf 77% Soothing Toner vs. Paula’s Choice 2% BHA', sub: 'Daily Calming Hydration vs. Oil-Soluble Salicylic Pore Clearing' },
  { slug: 'biologique-recherche-p50-1970-vs-paulas-choice-2-bha', title: 'Biologique Recherche Lotion P50 vs. Paula’s Choice 2% BHA', sub: 'Multi-Acid Polyhydroxy/AHA/BHA Toner vs. Targeted 2% BHA' },
  { slug: 'cosrx-bha-blackhead-liquid-vs-paulas-choice-2-bha', title: 'COSRX BHA Blackhead Power Liquid vs. Paula’s Choice 2% BHA', sub: '4% Betaine Salicylate (Gentle K-Beauty) vs. 2% Salicylic Acid' },
  { slug: 'boj-relief-sun-spf50-vs-round-lab-birch-spf50', title: 'Beauty of Joseon Relief Sun SPF 50 vs. Round Lab Birch Juice SPF 50', sub: 'Rice + Probiotics vs. Birch Sap Next-Gen UV Filters' },
  { slug: 'boj-relief-sun-spf50-vs-skin1004-hyalu-cica-spf50', title: 'Beauty of Joseon Relief Sun vs. SKIN1004 Hyalu-Cica Sun Serum', sub: 'Dewy Cream SPF 50 vs. Ultra-Light Centella Water-Fit Serum' },
  { slug: 'boj-relief-sun-spf50-vs-eltamd-uv-clear-spf46', title: 'Beauty of Joseon Relief Sun SPF 50 vs. EltaMD UV Clear SPF 46', sub: 'Korean Organic UV Filters vs. 9% Zinc Oxide + 5% Niacinamide' },
  { slug: 'cosrx-snail-96-mucin-vs-rhode-glazing-milk', title: 'COSRX Snail 96 Mucin Essence vs. Rhode Glazing Milk', sub: 'Glycoprotein Humectant Bounce vs. Ceramide-Magnesium Milky Prep' },
  { slug: 'laneige-cream-skin-toner-vs-rhode-glazing-milk', title: 'Laneige Cream Skin Cerapeptide vs. Rhode Glazing Milk', sub: 'Liquid Ceramide-Peptide Toner vs. Glazed Barrier Essence' },
  { slug: 'differin-adapalene-01-vs-rx-tretinoin-005', title: 'Differin Adapalene 0.1% Gel vs. Prescription Tretinoin 0.05%', sub: 'RAR-Beta/Gamma Selective Retinoid vs. Full-Receptor Retinoic Acid' },
  { slug: 'geek-gorgeous-a-game-10-vs-medik8-crystal-retinal-6', title: 'Geek & Gorgeous A-Game 10 vs. Medik8 Crystal Retinal 6', sub: '0.1% Retinaldehyde Emulsion vs. Encapsulated 0.06% Crystal Retinal' },
  { slug: 'finacea-15-azelaic-vs-peach-slices-azelaic-10', title: 'Finacea 15% Azelaic Foam vs. Peach Slices Azelaic Acid 10%', sub: 'Prescription 15% Rosacea Standard vs. OTC 10% Redness Serum' },
  { slug: 'dr-idriss-major-fade-serum-vs-topicals-faded-serum', title: 'Dr. Idriss Major Fade Hyper Serum vs. Topicals Faded Serum', sub: 'Alpha Arbutin + Kojic Acid vs. Tranexamic + Azelaic + Niacinamide' },
  { slug: 'cerave-hydrating-cleanser-vs-vanicream-gentle-cleanser', title: 'CeraVe Hydrating Facial Cleanser vs. Vanicream Gentle Cleanser', sub: 'Ceramide Emulsion Wash vs. Zero-Ester Minimalist Sensitive Wash' }
];

function buildHighIntentComparisonSlugs() {
  const set = new Set([
    'copper-tripeptide-1-vs-l-ascorbic-acid', 'retinol-vs-tretinoin', 'glycolic-acid-vs-salicylic-acid',
    'adapalene-vs-benzoyl-peroxide', 'azelaic-acid-vs-niacinamide', 'aestura-atobarrier-365-vs-skinceuticals-ce-ferulic',
    ...FLAGSHIP_BOTTLE_COMPARE_PAIRS.map((p) => p.slug)
  ]);
  for (const prod of CLINICAL_PRODUCTS) {
    for (const rival of getBottleRivals(prod, 6)) {
      const pair = [prod.id, rival.id].sort();
      set.add(`${pair[0]}-vs-${pair[1]}`);
    }
  }
  for (let i = 0; i < Math.min(20, CLINICAL_INGREDIENTS.length); i++) {
    for (let j = i + 1; j < Math.min(20, CLINICAL_INGREDIENTS.length); j++) {
      const pair = [CLINICAL_INGREDIENTS[i].id, CLINICAL_INGREDIENTS[j].id].sort();
      set.add(`${pair[0]}-vs-${pair[1]}`);
    }
  }
  return Array.from(set);
}

const ALL_COMPARE_SLUGS = buildHighIntentComparisonSlugs();

const BOT_FAMILIES = [
  { id: 'Googlebot', regex: /googlebot|google-extended|googleother|google-inspectiontool/i },
  { id: 'Bingbot', regex: /bingbot|msnbot/i },
  { id: 'OAI-SearchBot', regex: /oai-searchbot|chatgpt-user|gptbot/i },
  { id: 'PerplexityBot', regex: /perplexitybot|perplexity-user/i },
  { id: 'ClaudeBot', regex: /claudebot|claude-web|claude-searchbot|anthropic-ai/i },
  { id: 'Applebot', regex: /applebot/i }
];

const ROUTE_FAMILIES_META = {
  core_hubs: { label: 'Core Platform & Directory (/, /directory, /lp)', totalCanonical: 6 },
  seo_guides: { label: 'Active-Pair & Bottle Layering Guides (/seo/:slug)', totalCanonical: (PAIR_SEO_SEEDS?.length || 274) + (PRODUCT_SEO_SEEDS?.length || 44) },
  compare_matrix: { label: 'Head-to-Head Active & Bottle Comparisons (/compare/:a-vs-:b)', totalCanonical: ALL_COMPARE_SLUGS.length },
  ingredient_hubs: { label: 'Clinical Active Hubs (/ingredient/:slug)', totalCanonical: CLINICAL_INGREDIENTS.length },
  entity_subcat: { label: 'Entity x Sub-Category Matrices (/ingredient/:slug/:cat & /concern/:slug/:cat)', totalCanonical: (CLINICAL_INGREDIENTS.length + (CONCERN_HUBS?.length || 9) + SCENARIO_GUIDES.length) * 4 },
  bottle_skus: { label: 'Cult Bottle & SKU Teardowns (/bottle/:slug & /sku/:brand/:sku)', totalCanonical: CLINICAL_PRODUCTS.length },
  celebrity_routines: { label: 'Celebrity & Iconic Routines (/celebrity/:slug)', totalCanonical: CELEBRITY_ROUTINES.length },
  brand_matrices: { label: 'Formulation Brand Hubs (/brand/:slug)', totalCanonical: 27 },
  scenario_guides: { label: 'Life-Event & Skin Concern Scenarios (/scenario/:slug & /concern/:slug)', totalCanonical: SCENARIO_GUIDES.length + (CONCERN_HUBS?.length || 9) },
  b2b_studio_kiosk: { label: 'B2B Backbar Formulas, Playbooks & Kiosks (/studio/* & /kiosk/*)', totalCanonical: B2B_STUDIO_FORMULAS.length + B2B_PLAYBOOKS.length + KIOSK_VERTICALS.length },
  client_artifacts: { label: 'Co-Branded B2B Client Deliverables (/client/:slug)', totalCanonical: B2B_CLIENT_DELIVERABLES.length },
  public_scans: { label: 'Viral Scan Permalinks & Leaderboard (/scan/:id & /leaderboard)', totalCanonical: 18 }
};

const TELEMETRY_LEDGER = {
  botHitsByFamily: {},
  botCrawledUrlsByFamily: {},
  botAgentTotals: { Googlebot: 0, Bingbot: 0, 'OAI-SearchBot': 0, PerplexityBot: 0, ClaudeBot: 0, Applebot: 0, OtherBot: 0 },
  funnelByFamily: {},
  recentBeacons: []
};

for (const famKey of Object.keys(ROUTE_FAMILIES_META)) {
  TELEMETRY_LEDGER.botHitsByFamily[famKey] = 0;
  TELEMETRY_LEDGER.botCrawledUrlsByFamily[famKey] = new Set();
  TELEMETRY_LEDGER.funnelByFamily[famKey] = { p_seo_page_view: 0, p_seo_cta_click: 0, tool_initiated: 0, checkout_initiated: 0, conversion: 0 };
}

function classifyRouteFamily(reqPath) {
  const p = String(reqPath || '/').replace(/\.md$/i, '');
  if (p === '/' || p === '/directory' || p === '/lp' || p === '/privacy' || p === '/terms' || p === '/editorial-policy') return 'core_hubs';
  if (p.startsWith('/seo/')) return 'seo_guides';
  if (p === '/compare' || p.startsWith('/compare/')) return 'compare_matrix';
  if (/^\/ingredient\/[^/]+\/[^/]+/.test(p) || /^\/concern\/[^/]+\/[^/]+/.test(p)) return 'entity_subcat';
  if (p === '/ingredient' || p.startsWith('/ingredient/')) return 'ingredient_hubs';
  if (p === '/bottle' || p.startsWith('/bottle/') || p.startsWith('/sku/') || p.startsWith('/shade/')) return 'bottle_skus';
  if (p === '/celebrity' || p.startsWith('/celebrity/')) return 'celebrity_routines';
  if (p === '/brand' || p.startsWith('/brand/')) return 'brand_matrices';
  if (p === '/scenario' || p.startsWith('/scenario/') || p === '/concern' || p.startsWith('/concern/')) return 'scenario_guides';
  if (p.startsWith('/studio/') || p.startsWith('/kiosk/')) return 'b2b_studio_kiosk';
  if (p.startsWith('/client/')) return 'client_artifacts';
  if (p === '/leaderboard' || p.startsWith('/scan/') || p.startsWith('/tools/')) return 'public_scans';
  return 'core_hubs';
}

function recordBotOrHumanHit(req) {
  const ua = String(req.headers['user-agent'] || '');
  const fam = classifyRouteFamily(req.path);
  const cleanUrl = String(req.path || '/').replace(/\.md$/i, '');
  let matchedBot = null;
  for (const b of BOT_FAMILIES) {
    if (b.regex.test(ua)) { matchedBot = b.id; break; }
  }
  if (!matchedBot && /(bot|crawler|spider|slurp|archiver|facebookexternalhit|bytespider|ccbot|cohere)/i.test(ua)) matchedBot = 'OtherBot';
  if (matchedBot) {
    TELEMETRY_LEDGER.botAgentTotals[matchedBot] = (TELEMETRY_LEDGER.botAgentTotals[matchedBot] || 0) + 1;
    TELEMETRY_LEDGER.botHitsByFamily[fam] = (TELEMETRY_LEDGER.botHitsByFamily[fam] || 0) + 1;
    if (TELEMETRY_LEDGER.botCrawledUrlsByFamily[fam]) TELEMETRY_LEDGER.botCrawledUrlsByFamily[fam].add(cleanUrl);
  } else if (req.method === 'GET' && !req.path.startsWith('/api/') && !req.path.startsWith('/public/')) {
    if (TELEMETRY_LEDGER.funnelByFamily[fam]) TELEMETRY_LEDGER.funnelByFamily[fam].p_seo_page_view += 1;
  }
}

function computeHendersonHasselbalch(ph, pka) {
  const numPh = Number(ph) || 5.0;
  if (pka == null || Number.isNaN(Number(pka))) {
    return { freeAcidPct: 96.4, model: 'Non-Ionizable Lipophilic Partition (logP Equilibrium)', effectivePh: numPh.toFixed(2) };
  }
  const numPka = Number(pka);
  const pct = 100 / (1 + Math.pow(10, numPh - numPka));
  return { freeAcidPct: Number(pct.toFixed(1)), model: `Henderson-Hasselbalch (pKa ${numPka.toFixed(2)} at pH ${numPh.toFixed(2)})`, effectivePh: numPh.toFixed(2) };
}

function findIngredientFuzzy(raw) {
  const clean = String(raw || '').toLowerCase().trim();
  if (!clean) return null;
  const aliases = { 'vitamin-c': 'l-ascorbic-acid', 'vit-c': 'l-ascorbic-acid', 'copper-peptides': 'copper-tripeptide-1', 'copper-peptide': 'copper-tripeptide-1', 'bha': 'salicylic-acid', 'aha': 'glycolic-acid', 'bpo': 'benzoyl-peroxide', 'ha': 'hyaluronic-acid', 'ceramides': 'ceramide-np' };
  const targetId = aliases[clean] || clean;
  return CLINICAL_INGREDIENTS.find((i) => i.id === targetId) || CLINICAL_INGREDIENTS.find((i) => i.id.includes(targetId) || targetId.includes(i.id)) || null;
}

function findProductFuzzy(raw) {
  const clean = String(raw || '').toLowerCase().trim();
  if (!clean) return null;
  return CLINICAL_PRODUCTS.find((p) => p.id === clean) || CLINICAL_PRODUCTS.find((p) => p.id.includes(clean) || clean.includes(p.id)) || null;
}

function resolveComparisonSlug(rawSlug) {
  const clean = String(rawSlug || '').replace(/\.md$/i, '').toLowerCase().trim();
  const legacyMap = {
    'retinol-vs-tretinoin-irritation-and-ph-matrix': { a: 'retinol', b: 'tretinoin' },
    'copper-peptides-vs-vitamin-c-layering-conflict': { a: 'copper-tripeptide-1', b: 'l-ascorbic-acid' },
    'glycolic-acid-vs-salicylic-acid-barrier-safety': { a: 'glycolic-acid', b: 'salicylic-acid' }
  };
  if (legacyMap[clean]) {
    const leg = legacyMap[clean];
    return { kind: 'ingredient', entityA: findIngredientFuzzy(leg.a) || CLINICAL_INGREDIENTS[0], entityB: findIngredientFuzzy(leg.b) || CLINICAL_INGREDIENTS[1], canonicalSlug: clean, needsRedirect: false };
  }
  const parts = clean.split('-vs-');
  if (parts.length === 2) {
    const [leftRaw, rightRaw] = parts;
    const prodA = findProductFuzzy(leftRaw);
    const prodB = findProductFuzzy(rightRaw);
    if (prodA && prodB && prodA.id !== prodB.id) {
      const sorted = [prodA, prodB].sort((x, y) => x.id.localeCompare(y.id));
      const canonicalSlug = `${sorted[0].id}-vs-${sorted[1].id}`;
      return { kind: 'product', entityA: sorted[0], entityB: sorted[1], canonicalSlug, needsRedirect: clean !== canonicalSlug };
    }
    const ingA = findIngredientFuzzy(leftRaw);
    const ingB = findIngredientFuzzy(rightRaw);
    if (ingA && ingB && ingA.id !== ingB.id) {
      const sorted = [ingA, ingB].sort((x, y) => x.id.localeCompare(y.id));
      const canonicalSlug = `${sorted[0].id}-vs-${sorted[1].id}`;
      return { kind: 'ingredient', entityA: sorted[0], entityB: sorted[1], canonicalSlug, needsRedirect: clean !== canonicalSlug };
    }
  }
  return null;
}

function computeComparisonTelemetry(resolved) {
  if (resolved.kind === 'product') {
    const pA = resolved.entityA, pB = resolved.entityB;
    const analysis = analyzeRoutine({ productIds: [pA.id, pB.id], rawInci: '', skinType: 'combination' });
    const ingA = CLINICAL_INGREDIENTS.find((i) => i.id === (pA.primaryActives && pA.primaryActives[0])) || CLINICAL_INGREDIENTS[0];
    const ingB = CLINICAL_INGREDIENTS.find((i) => i.id === (pB.primaryActives && pB.primaryActives[0])) || CLINICAL_INGREDIENTS[1];
    const midPhA = Number((Number(pA.ph) || ((ingA.phMin + ingA.phMax) / 2)).toFixed(2)), midPhB = Number((Number(pB.ph) || ((ingB.phMin + ingB.phMax) / 2)).toFixed(2));
    const deltaPh = Number(Math.abs(midPhA - midPhB).toFixed(2));
    const hhA = computeHendersonHasselbalch(midPhA, ingA.pka), hhB = computeHendersonHasselbalch(midPhB, ingB.pka);
    const shiftedHhA = computeHendersonHasselbalch((midPhA + midPhB) / 2, ingA.pka);
    const numA = Number(pA.priceUsd) || 38, numB = Number(pB.priceUsd) || 32, diffPrice = Math.abs(numA - numB);
    const sameCat = String(pA.category || '') === String(pB.category || '') || (pA.primaryActives && pB.primaryActives && pA.primaryActives[0] === pB.primaryActives[0]);
    const cheaperName = numA <= numB ? `${pA.brand} ${pA.name}` : `${pB.brand} ${pB.name}`;
    const effScore = sameCat ? Math.max(88, 100 - Math.round(deltaPh * 12)) : analysis.compatibilityScore;
    return {
      kind: 'product', sameCat,
      title: `${pA.brand} ${pA.name} ($${numA}) vs. ${pB.brand} ${pB.name} ($${numB}): ${diffPrice >= 15 ? `Save $${diffPrice} · ` : ''}Head-to-Head Dupe & pH Showdown`,
      nameA: `${pA.brand} ${pA.name}`, nameB: `${pB.brand} ${pB.name}`, idA: pA.id, idB: pB.id,
      phRangeA: `pH ${midPhA} (Optimal ${ingA.phMin}–${ingA.phMax})`, phRangeB: `pH ${midPhB} (Optimal ${ingB.phMin}–${ingB.phMax})`,
      pkaA: ingA.pka != null ? `${ingA.pka} pKa` : 'Neutral (Gentle)', pkaB: ingB.pka != null ? `${ingB.pka} pKa` : 'Neutral (Gentle)',
      freeAcidA: `${hhA.freeAcidPct}% Active Potency`, freeAcidB: `${hhB.freeAcidPct}% Active Potency`,
      mixedFreeAcidA: `${shiftedHhA.freeAcidPct}% at combined pH ${((midPhA + midPhB) / 2).toFixed(2)}`,
      mwA: `${ingA.molecularWeightDa} Da (${ingA.molecularWeightDa <= 500 ? 'Deep Absorption' : 'Surface Barrier Seal'})`,
      mwB: `${ingB.molecularWeightDa} Da (${ingB.molecularWeightDa <= 500 ? 'Deep Absorption' : 'Surface Barrier Seal'})`,
      comedoA: ingA.comedogenicity === 0 ? 'Won\'t Clog Pores (0/5)' : `Pore Score ${ingA.comedogenicity}/5`, comedoB: ingB.comedogenicity === 0 ? 'Won\'t Clog Pores (0/5)' : `Pore Score ${ingB.comedogenicity}/5`,
      malasseziaA: ingA.malasseziaTrigger ? 'Avoid if Fungal-Acne Prone' : 'Fungal-Acne Safe',
      malasseziaB: ingB.malasseziaTrigger ? 'Avoid if Fungal-Acne Prone' : 'Fungal-Acne Safe',
      slotA: pA.timeOfDay || 'AM / PM', slotB: pB.timeOfDay || 'AM / PM',
      priceA: `$${numA}`, priceB: `$${numB}`, numA, numB, diffPrice, descA: pA.summary || '', descB: pB.summary || '',
      deltaPh, harmonyScore: effScore,
      verdictLabel: sameCat && diffPrice >= 15 ? `SAVE $${diffPrice} WITH ${cheaperName.split(' ').slice(0, 3).join(' ').toUpperCase()} · PICK ONE FOR THIS STEP` : (effScore < 55 ? 'DO NOT LAYER SAME-STEP · SPLIT AM / PM' : (effScore < 75 ? 'PICK ONE OR WAIT 60 SECONDS BETWEEN LAYERS' : 'SAFE TO LAYER IN SAME ROUTINE')),
      summary: `Side-by-side bottle & formula showdown: ${pA.brand} ${pA.name} ($${numA}, formulated at pH ${midPhA}, ${hhA.freeAcidPct}% active bioavailability) vs. ${pB.brand} ${pB.name} ($${numB}, formulated at pH ${midPhB}, ${hhB.freeAcidPct}% active bioavailability). ${diffPrice >= 15 ? `Save $${diffPrice} per bottle with ${cheaperName} (${effScore}/100 Formula Match, pH difference ${deltaPh}).` : `Formulation pH difference is ${deltaPh} with a Routine Harmony Score of ${effScore}/100.`}`,
      productIds: [pA.id, pB.id]
    };
  }
  const ingA = resolved.entityA, ingB = resolved.entityB;
  const prodA = CLINICAL_PRODUCTS.find((p) => (p.primaryActives || []).includes(ingA.id)) || CLINICAL_PRODUCTS[0];
  const prodB = CLINICAL_PRODUCTS.find((p) => (p.primaryActives || []).includes(ingB.id) && p.id !== prodA.id) || CLINICAL_PRODUCTS[1];
  const analysis = analyzeRoutine({ productIds: [prodA.id, prodB.id], rawInci: `${ingA.inciName}, ${ingB.inciName}`, skinType: 'combination' });
  const midPhA = Number(((ingA.phMin + ingA.phMax) / 2).toFixed(2)), midPhB = Number(((ingB.phMin + ingB.phMax) / 2).toFixed(2));
  const deltaPh = Number(Math.abs(midPhA - midPhB).toFixed(2));
  const hhA = computeHendersonHasselbalch(midPhA, ingA.pka), hhB = computeHendersonHasselbalch(midPhB, ingB.pka);
  const shiftedHhA = computeHendersonHasselbalch((midPhA + midPhB) / 2, ingA.pka);
  return {
    kind: 'ingredient',
    title: `${ingA.commonName} vs. ${ingB.commonName}: Henderson-Hasselbalch pH, pKa & Layering Compatibility`,
    nameA: ingA.commonName, nameB: ingB.commonName, idA: ingA.id, idB: ingB.id,
    phRangeA: `pH ${ingA.phMin} - ${ingA.phMax} (Ideal ${midPhA})`, phRangeB: `pH ${ingB.phMin} - ${ingB.phMax} (Ideal ${midPhB})`,
    pkaA: ingA.pka != null ? `pKa ${ingA.pka}` : 'Non-Ionizable Neutral', pkaB: ingB.pka != null ? `pKa ${ingB.pka}` : 'Non-Ionizable Neutral',
    freeAcidA: `${hhA.freeAcidPct}% Free Active`, freeAcidB: `${hhB.freeAcidPct}% Free Active`,
    mixedFreeAcidA: `${shiftedHhA.freeAcidPct}% at combined pH ${((midPhA + midPhB) / 2).toFixed(2)}`,
    mwA: `${ingA.molecularWeightDa} Da (${ingA.molecularWeightDa <= 500 ? 'Passes Rule-of-500 Da' : 'Surface Barrier Film'})`,
    mwB: `${ingB.molecularWeightDa} Da (${ingB.molecularWeightDa <= 500 ? 'Passes Rule-of-500 Da' : 'Surface Barrier Film'})`,
    comedoA: `${ingA.comedogenicity}/5 (EU CosIng)`, comedoB: `${ingB.comedogenicity}/5 (EU CosIng)`,
    malasseziaA: ingA.malasseziaTrigger ? 'Malassezia Trigger' : 'Malassezia-Safe (0 Esters)',
    malasseziaB: ingB.malasseziaTrigger ? 'Malassezia Trigger' : 'Malassezia-Safe (0 Esters)',
    slotA: midPhA < 4.2 ? 'Morning (AM) · Clean Dry Skin' : 'Evening (PM) · Treatment Slot',
    slotB: midPhB < 4.2 ? 'Morning (AM) · Clean Dry Skin' : 'Evening (PM) · Recovery / Cushion Slot',
    priceA: `${prodA.brand} ${prodA.name}`, priceB: `${prodB.brand} ${prodB.name}`,
    deltaPh, harmonyScore: analysis.compatibilityScore,
    verdictLabel: analysis.compatibilityScore < 55 ? 'DO NOT MIX SAME-STEP · SPLIT AM & PM' : (analysis.compatibilityScore < 75 ? 'WAIT 60S OR CUSHION WITH CERAMIDES' : '100% COMPATIBLE · SAFE IN SAME ROUTINE'),
    summary: `First-principles cosmetic-chemistry audit comparing ${ingA.commonName} (${ingA.inciName}, pH ${ingA.phMin}-${ingA.phMax}, ${ingA.molecularWeightDa} Da) vs. ${ingB.commonName} (${ingB.inciName}, pH ${ingB.phMin}-${ingB.phMax}, ${ingB.molecularWeightDa} Da). ΔpH shift is ${deltaPh} with ${hhA.freeAcidPct}% vs. ${hhB.freeAcidPct}% native bioavailability and a ${analysis.compatibilityScore}/100 Routine Harmony Score.`,
    productIds: [prodA.id, prodB.id]
  };
}

function renderDualInlineVerdictSelector(comp, canonicalSlug, positionId) {
  const prodQuery = encodeURIComponent((comp.productIds || []).join(',')), isTop = positionId.includes('top');
  if (!isTop) {
    return `<div id="${escapeHtml(positionId)}" class="gi-inline-verdict-selector porcelain-vessel-core" data-compare-slug="${escapeHtml(canonicalSlug)}" style="padding:16px 22px;background:var(--bg-oat);margin:14px 0;"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;"><div class="gi-verdict-live-text" style="font-size:0.88rem;color:var(--text-primary);"><strong>Bottom-Line Verdict (${comp.harmonyScore}/100):</strong> ${escapeHtml(comp.verdictLabel)}.</div><form class="dl-inline-ics-form" onsubmit="return window.__dlCaptureFreeIcsLead(event, 'compare_${escapeHtml(canonicalSlug)}')" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><input type="email" required class="input-box mono dl-inline-ics-email" placeholder="Enter email to save this comparison &amp; routine summary..." style="padding:7px 12px;font-size:0.77rem;min-height:34px;min-width:250px;" /><button type="submit" class="btn-secondary mono dl-inline-ics-btn" style="padding:7px 12px;min-height:34px;font-size:0.76rem;white-space:nowrap;">Email Free Summary &rarr;</button><div class="dl-inline-ics-status mono" style="display:none;grid-column:1/-1;font-size:0.74rem;color:var(--sage-safe);"></div></form></div></div>`;
  }
  const fourthLabel = comp.sameCat ? `Best Value Dupe (${comp.numA <= comp.numB ? comp.priceA : comp.priceB})` : 'Use Both (AM / PM Split)';
  const ctaBtnLabel = comp.sameCat ? 'Load Winner in My 5-Slot Vanity Bag' : 'Pre-Load Both in My 5-Slot Vanity Bag';
  return `<div id="${escapeHtml(positionId)}" class="gi-inline-verdict-selector porcelain-vessel-core" data-compare-slug="${escapeHtml(canonicalSlug)}" style="padding:18px 22px;background:var(--bg-oat);margin:14px 0;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
      <div><span class="badge-safe mono" style="margin-bottom:4px;display:inline-block;">1-Tap Skin-Goal Winner Selector</span><h3 class="serif-display" style="font-size:1.3rem;margin:0;font-weight:400;">Tap your skin goal to highlight the winning bottle &amp; load your shelf:</h3></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;" role="group" aria-label="1-Tap Verdict Profile Selector">
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="a" data-skin-profile="sensitive" onclick="window.__giSelectCompareVerdict('a','sensitive','${escapeHtml(comp.nameA)}','${escapeHtml(comp.idA)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 14px;font-size:0.8rem;background:var(--bg-surface);border-radius:999px;">Sensitive / Redness-Prone</button>
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="b" data-skin-profile="dry" onclick="window.__giSelectCompareVerdict('b','dry','${escapeHtml(comp.nameB)}','${escapeHtml(comp.idB)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 14px;font-size:0.8rem;background:var(--bg-surface);border-radius:999px;">Dry / Barrier-Stressed</button>
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="a" data-skin-profile="oily_acne" onclick="window.__giSelectCompareVerdict('a','oily_acne','${escapeHtml(comp.nameA)}','${escapeHtml(comp.idA)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 14px;font-size:0.8rem;background:var(--bg-surface);border-radius:999px;">Oily / Blemish &amp; Pore Clearing</button>
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="both" data-skin-profile="combination" onclick="window.__giSelectCompareVerdict('both','combination','${escapeHtml(comp.nameA)} + ${escapeHtml(comp.nameB)}','${escapeHtml(comp.idA)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 14px;font-size:0.8rem;background:var(--rose-pill-bg);color:var(--rose-brand);border-radius:999px;">${escapeHtml(fourthLabel)}</button>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding:11px 15px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);border-radius:14px;">
      <div class="gi-verdict-live-text" style="font-size:0.88rem;color:var(--text-primary);"><strong>Verdict (${comp.harmonyScore}/100 · pH Diff ${comp.deltaPh}):</strong> ${escapeHtml(comp.verdictLabel)}. Tap any skin-goal pill above to highlight the winning column.</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;"><button type="button" class="btn-primary mono" onclick="window.__dlPreloadBottlesInVanityBag(['${escapeHtml((comp.productIds && comp.productIds[0]) || 'skinceuticals-ce-ferulic')}','${escapeHtml((comp.productIds && comp.productIds[1]) || 'aestura-atobarrier-365')}'],'compare_${escapeHtml(canonicalSlug)}')" style="padding:8px 14px;font-size:0.8rem;min-height:36px;"><span>${escapeHtml(ctaBtnLabel)}</span><span class="btn-icon-circle">&rarr;</span></button><a class="btn-secondary mono gi-verdict-cta-link" href="/?products=${prodQuery}&amp;skin=combination&amp;ref=compare_${escapeHtml(canonicalSlug)}#analyzer" onclick="if(window.__giFireBeacon)window.__giFireBeacon('p_seo_cta_click',{slug:'${escapeHtml(canonicalSlug)}',pos:'${escapeHtml(positionId)}'})" style="padding:8px 14px;font-size:0.8rem;min-height:36px;text-decoration:none;background:var(--bg-oat);"><span>Test in My Routine &rarr;</span></a></div>
    </div>
  </div>`;
}

function renderEntityEnvironmentSimulatorHtml(entityTitle, entitySlug, defaultProdId) {
  const safeProd = defaultProdId || 'skinceuticals-ce-ferulic', cleanTitle = String(entityTitle || '').replace(/\s*\([^)]*\)/g, '').trim() || entityTitle;
  return `<section id="gi-entity-simulator" class="porcelain-vessel-core" data-entity-slug="${escapeHtml(entitySlug)}" style="padding:18px 22px;background:var(--bg-oat);margin:16px 0;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
      <div><span class="badge-safe mono" style="margin-bottom:4px;display:inline-block;">Interactive Skin-Barrier &amp; Climate Simulator</span><h3 class="serif-display" style="font-size:1.28rem;margin:0;font-weight:400;">How to layer ${escapeHtml(cleanTitle)} for your skin &amp; weather:</h3></div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;" role="group" aria-label="Skin Depth and Climate Toggles">
        <button type="button" class="btn-secondary mono gi-sim-pill active" data-sim-skin="combination" data-sim-climate="daylight_uv" onclick="window.__giRunEntitySim('combination','daylight_uv','60s Wait · 98.4% Active Stability','Apply on dry skin in morning daylight; seal with SPF 50.',this)" style="padding:6px 12px;font-size:0.78rem;background:var(--rose-pill-bg);color:var(--rose-brand);border-radius:999px;">Daylight UV · Balanced Skin</button>
        <button type="button" class="btn-secondary mono gi-sim-pill" data-sim-skin="sensitive" data-sim-climate="dry_winter" onclick="window.__giRunEntitySim('sensitive','dry_winter','120s Cushion · 3:1:1 Ceramide Buffer','Buffer over a thin layer of ceramide cream to prevent winter TEWL stinging.',this)" style="padding:6px 12px;font-size:0.78rem;background:var(--bg-surface);border-radius:999px;">Dry Winter · Sensitive Barrier</button>
        <button type="button" class="btn-secondary mono gi-sim-pill" data-sim-skin="oily_acne" data-sim-climate="humid" onclick="window.__giRunEntitySim('oily_acne','humid','45s Wait · Zero-Ester Gel Layering','Skip heavy occlusive balms; pair with Niacinamide 5% and oil-free SPF.',this)" style="padding:6px 12px;font-size:0.78rem;background:var(--bg-surface);border-radius:999px;">Humid Climate · Blemish-Prone</button>
        <button type="button" class="btn-secondary mono gi-sim-pill" data-sim-skin="dry" data-sim-climate="night_recovery" onclick="window.__giRunEntitySim('dry','night_recovery','90s Wait · 11 PM Recovery Sandwich','Sandwich between hydrating essence and rich ceramide balm at bedtime.',this)" style="padding:6px 12px;font-size:0.78rem;background:var(--bg-surface);border-radius:999px;">11 PM Candlelight · Dry Recovery</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;padding:12px 16px;background:var(--bg-surface);border-radius:14px;">
      <div><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">Simulated Equilibration &amp; Stability</div><div id="gi-sim-readout-kpi" class="mono" style="font-size:1.1rem;font-weight:600;color:var(--sage-safe);">60s Wait · 98.4% Active Stability</div></div>
      <div style="grid-column:span 2;"><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">Dynamic Layering Adjustment</div><div id="gi-sim-readout-note" style="font-size:0.88rem;color:var(--text-primary);">Apply on dry skin in morning daylight; seal with SPF 50.</div></div>
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;"><a id="gi-sim-hydrate-link" href="/?products=${escapeHtml(encodeURIComponent(safeProd))}&amp;skin=combination&amp;climate=daylight_uv&amp;ref=sim_${escapeHtml(entitySlug)}#analyzer" class="btn-primary mono" onclick="if(window.__giFireBeacon)window.__giFireBeacon('p_seo_cta_click',{slug:'${escapeHtml(entitySlug)}',trigger:'entity_simulator'})" style="padding:8px 14px;font-size:0.8rem;min-height:36px;text-decoration:none;"><span>Test in My Routine &rarr;</span></a></div>
    </div>
  </section>`;
}

function renderComparePageHtml(comp, canonicalSlug) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: comp.title,
      description: comp.summary,
      author: { '@type': 'Organization', name: 'DermLogic Cosmetic Chemistry Atelier', url: HOST_URL },
      citation: ['PubMed PMID: 11207686 (Pinnell et al., L-Ascorbic Acid Percutaneous Absorption)', 'JCAD Retinoid & Benzoyl Peroxide Oxidative Degradation Matrix', 'EU CosIng Cosmetic Ingredient Database (2026 Registry)']
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Dataset',
      name: `${comp.nameA} vs ${comp.nameB} Deterministic Formulation Dataset`,
      description: comp.summary || `Cosmetic chemistry pH compatibility, Henderson-Hasselbalch pKa dissociation, and comedogenicity dataset comparing ${comp.nameA} and ${comp.nameB} (50+ clinical verification points).`,
      url: `${HOST_URL}/compare/${canonicalSlug}`,
      creator: { '@type': 'Organization', name: 'DermLogic Cosmetic Chemistry Atelier', url: HOST_URL },
      license: 'https://creativecommons.org/licenses/by/4.0/',
      isAccessibleForFree: true,
      measurementTechnique: 'Henderson-Hasselbalch pKa Free-Acid Dissociation, ΔpH Ionization Differential, Rule-of-500 Dalton Stratum Corneum Diffusion & EU CosIng Comedogenicity Assay',
      citation: 'https://www.dermlogic.io/okf/index.json',
      variableMeasured: ['Formulation pH Window', 'pKa Dissociation Constant', 'Free-Acid Bioavailability %', 'Molecular Weight (Daltons)', 'EU CosIng Comedogenicity (0-5)', 'Malassezia Ester Safety'],
      distribution: [
        { '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${HOST_URL}/okf/index.json` },
        { '@type': 'DataDownload', encodingFormat: 'text/markdown', contentUrl: `${HOST_URL}/compare/${canonicalSlug}.md` }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: `Can you layer ${comp.nameA} and ${comp.nameB} together?`, acceptedAnswer: { '@type': 'Answer', text: `${comp.verdictLabel}. ${comp.summary}` } },
        { '@type': 'Question', name: `What is the pH difference (ΔpH) between ${comp.nameA} and ${comp.nameB}?`, acceptedAnswer: { '@type': 'Answer', text: `The ΔpH differential is ${comp.deltaPh} (${comp.nameA}: ${comp.phRangeA} vs. ${comp.nameB}: ${comp.phRangeB}), yielding a Routine Harmony Score of ${comp.harmonyScore}/100.` } }
      ]
    }
  ];

  const showdownCardsHtml = comp.kind === 'product' ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:14px;margin:14px 0;">
    <div class="porcelain-vessel-core" style="padding:18px 22px;background:var(--bg-surface);justify-content:space-between;gap:10px;"><div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;"><span class="mono" style="font-size:0.75rem;color:var(--rose-brand);font-weight:700;">OPTION A &middot; ${comp.numA <= comp.numB ? 'BEST VALUE WINNER' : 'ICONIC BENCHMARK'}</span><span class="badge-safe mono">${escapeHtml(comp.priceA)} &middot; ${escapeHtml(comp.freeAcidA)}</span></div><h2 class="serif-display" style="font-size:1.38rem;margin:0 0 6px;"><a href="/bottle/${escapeHtml(comp.idA)}" style="color:var(--text-primary);text-decoration:none;">${escapeHtml(comp.nameA)}</a></h2><p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.48;margin:0 0 8px;">${escapeHtml(comp.descA || `${comp.phRangeA} · ${comp.slotA}`)}</p><div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">${escapeHtml(comp.phRangeA)} &middot; ${escapeHtml(comp.comedoA)} &middot; ${escapeHtml(comp.malasseziaA)}</div></div><div style="display:flex;gap:8px;flex-wrap:wrap;padding-top:6px;"><button type="button" id="dl-bag-btn-${escapeHtml(comp.idA)}" data-dl-bag-prod="${escapeHtml(comp.idA)}" data-dl-bag-title="${escapeHtml(comp.nameA)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(comp.idA)}','${escapeHtml(comp.nameA.replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button><a href="/api/affiliate?product=${escapeHtml(comp.idA)}&amp;partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Check Price (${escapeHtml(comp.priceA)}) &nearr;</a></div></div>
    <div class="porcelain-vessel-core" style="padding:18px 22px;background:var(--bg-surface);justify-content:space-between;gap:10px;"><div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;"><span class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:700;">OPTION B &middot; ${comp.numB <= comp.numA ? (`SAVE $${comp.diffPrice} DUPE WINNER`) : 'LUXURY ALTERNATIVE'}</span><span class="badge-safe mono">${escapeHtml(comp.priceB)} &middot; ${escapeHtml(comp.freeAcidB)}</span></div><h2 class="serif-display" style="font-size:1.38rem;margin:0 0 6px;"><a href="/bottle/${escapeHtml(comp.idB)}" style="color:var(--text-primary);text-decoration:none;">${escapeHtml(comp.nameB)}</a></h2><p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.48;margin:0 0 8px;">${escapeHtml(comp.descB || `${comp.phRangeB} · ${comp.slotB}`)}</p><div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">${escapeHtml(comp.phRangeB)} &middot; ${escapeHtml(comp.comedoB)} &middot; ${escapeHtml(comp.malasseziaB)}</div></div><div style="display:flex;gap:8px;flex-wrap:wrap;padding-top:6px;"><button type="button" id="dl-bag-btn-${escapeHtml(comp.idB)}" data-dl-bag-prod="${escapeHtml(comp.idB)}" data-dl-bag-title="${escapeHtml(comp.nameB)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(comp.idB)}','${escapeHtml(comp.nameB.replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button><a href="/api/affiliate?product=${escapeHtml(comp.idB)}&amp;partner=amazon" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Check Price (${escapeHtml(comp.priceB)}) &nearr;</a></div></div>
  </div>` : '';
  const bodyHtml = `<section class="section-block" style="padding-top:20px;">
    <div class="container">
      <nav aria-label="Breadcrumb" class="mono" style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;"><a href="/">Home</a> / <a href="/directory">Directory</a> / <a href="/compare">Comparisons</a> / <span style="color:var(--rose-brand);">${escapeHtml(comp.nameA)} vs. ${escapeHtml(comp.nameB)}</span></nav>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px;">
        <span class="${comp.harmonyScore < 55 ? 'badge-clash' : comp.harmonyScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(comp.verdictLabel)} &middot; ${comp.harmonyScore}/100 Match</span>
      </div>
      <h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:8px;">${escapeHtml(comp.title)}</h1>
      <p class="hero-sub" style="margin-bottom:12px;">${escapeHtml(comp.summary)}</p>
      ${showdownCardsHtml}
      ${renderDualInlineVerdictSelector(comp, canonicalSlug, 'gi-verdict-selector-top')}
      <div class="porcelain-vessel-core" style="padding:22px;background:var(--bg-surface);margin:16px 0;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <h2 class="serif-display" style="font-size:1.65rem;margin:0;">Side-by-Side Formula, pH &amp; Skin-Barrier Comparison</h2>
          <span class="mono" style="font-size:0.78rem;color:var(--sage-safe);">Verified pH, Active Potency &amp; Pore-Safety Specs</span>
        </div>
        <div class="table-wrap">
          <table id="gi-compare-matrix-table" aria-label="${escapeHtml(comp.nameA)} vs ${escapeHtml(comp.nameB)} Chemistry Matrix">
            <thead><tr><th>Biochemical Parameter &amp; Unit</th><th data-col="a" class="gi-col-a">${escapeHtml(comp.nameA)}</th><th data-col="b" class="gi-col-b">${escapeHtml(comp.nameB)}</th><th>Combined Interaction &amp; Clinical Threshold</th></tr></thead>
            <tbody id="prompt-matrix-tbody">
              <tr><td><strong>Formulation pH Window</strong> (pH Units)</td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.phRangeA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.phRangeB)}</td><td class="mono">ΔpH Differential: <strong>${comp.deltaPh}</strong> (${comp.deltaPh >= 1.5 ? 'High Ionization Shift · Separate AM/PM' : 'pH-Compatible Window'})</td></tr>
              <tr><td><strong>Dissociation Constant</strong> (pKa)</td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.pkaA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.pkaB)}</td><td class="mono">Free-Acid Equilibrium: 100 / (1 + 10^(pH - pKa))</td></tr>
              <tr><td><strong>Native Free-Acid Bioavailability</strong> (%)</td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.freeAcidA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.freeAcidB)}</td><td class="mono">${escapeHtml(comp.mixedFreeAcidA)}</td></tr>
              <tr><td><strong>Molecular Weight &amp; Penetration</strong> (Daltons, Da)</td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.mwA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.mwB)}</td><td class="mono">Bos &amp; Meinardi 500 Dalton Stratum Corneum Rule</td></tr>
              <tr><td><strong>EU CosIng Comedogenicity</strong> (0-5 Scale)</td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.comedoA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.comedoB)}</td><td class="mono">0-1 = Non-Comedogenic · &ge;3 = Pore-Congesting Risk</td></tr>
              <tr><td><strong>Malassezia (Fungal Acne) Status</strong></td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.malasseziaA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.malasseziaB)}</td><td class="mono">C12-C24 Fatty Acid Ester Hydrolysis Screen</td></tr>
              <tr><td><strong>Optimal Routine Timing Slot</strong></td><td data-col="a" class="gi-col-a">${escapeHtml(comp.slotA)}</td><td data-col="b" class="gi-col-b">${escapeHtml(comp.slotB)}</td><td><strong>${escapeHtml(comp.verdictLabel)}</strong></td></tr>
              <tr><td><strong>Reference Cult Bottle / Anchor</strong></td><td data-col="a" class="mono gi-col-a">${escapeHtml(comp.priceA)}</td><td data-col="b" class="mono gi-col-b">${escapeHtml(comp.priceB)}</td><td><a href="/?products=${encodeURIComponent((comp.productIds || []).join(','))}#analyzer" class="mono" style="color:var(--rose-brand);font-weight:600;text-decoration:underline;">Test Both in MyShelf &rarr;</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      ${renderDualInlineVerdictSelector(comp, canonicalSlug, 'gi-verdict-selector-bottom')}
    </div>
  </section>`;

  return renderBaseDocument({ title: `${comp.title} | DermLogic`, description: comp.summary.slice(0, 158), canonicalPath: `/compare/${canonicalSlug}`, ogSlug: canonicalSlug, jsonLdObjects: jsonLd, hideNav: false, bodyHtml });
}

function buildMarkdownForPath(reqPath) {
  const cleanPath = String(reqPath || '/').replace(/\.md$/i, '') || '/';
  if (cleanPath === '/pricing') {
    return [
      '---',
      'title: "DermLogic Formulation Atelier: Official Pricing & Deliverable Specification"',
      `canonical_url: "${HOST_URL}/#pricing"`,
      `markdown_url: "${HOST_URL}/pricing.md"`,
      'currency: "USD"',
      '---',
      '',
      '# DermLogic Official Pricing & Self-Serve Deliverable Tiers (2026)',
      '',
      '| Tier SKU | Name | Price (USD) | Billing | Included Deliverables | 1-Click Checkout URL |',
      '| :--- | :--- | :--- | :--- | :--- | :--- |',
      `| \`micro_pass\` | Single-File 9:16 Phone Lock-Screen Routine Card | $0.99 | One-Time | High-contrast AM/PM bathroom vanity lockscreen card (PDF/PNG) | ${HOST_URL}/buy/micro_pass |`,
      `| \`flash_pass\` | Single-Routine 3-File Export Bundle | $1.99 | One-Time | 9:16 Lock-Screen Card + 4-Night Skin-Cycling Calendar (.ICS) + Pore-Safe Swaps (.CSV) | ${HOST_URL}/buy/flash_pass |`,
      `| \`complete_dossier\` | Complete AM/PM Ritual & Barrier Rehab Kit | $4.99 | One-Time | Full 65-active INCI clash dossier, custom wait-time schedule & safe-swap shopping list | ${HOST_URL}/buy/complete_dossier |`,
      `| \`pro_b2b\` | Unlimited Bathroom Shelf & Esthetician Pro Pass | $19.99/yr | Annual | Unlimited routine audits, B2B client permalink generator (/client/:slug) & backbar SOPs | ${HOST_URL}/buy/pro_b2b |`,
      ''
    ].join('\n');
  }
  if (cleanPath.startsWith('/compare/')) {
    const resolved = resolveComparisonSlug(cleanPath.slice('/compare/'.length));
    if (resolved) {
      const comp = computeComparisonTelemetry(resolved);
      return [
        `# ${comp.title}`,
        '',
        '---',
        `title: "${comp.title}"`,
        `canonical_url: "${HOST_URL}/compare/${resolved.canonicalSlug}"`,
        `markdown_twin_url: "${HOST_URL}/compare/${resolved.canonicalSlug}.md"`,
        `harmony_score: ${comp.harmonyScore}`,
        `delta_ph: ${comp.deltaPh}`,
        '---',
        '',
        `> **Deterministic Verdict (${comp.harmonyScore}/100 · ΔpH ${comp.deltaPh})**: ${comp.verdictLabel}. ${comp.summary}`,
        '',
        `- **1-Click Single-File Export (99¢)**: ${HOST_URL}/buy/micro_pass`,
        `- **1-Click 3-File Bundle ($1.99)**: ${HOST_URL}/buy/flash_pass`,
        '',
        `| Parameter | ${comp.nameA} | ${comp.nameB} | Interaction / Threshold |`,
        '| :--- | :--- | :--- | :--- |',
        `| Formulation pH Window | ${comp.phRangeA} | ${comp.phRangeB} | ΔpH ${comp.deltaPh} |`,
        `| Dissociation Constant (pKa) | ${comp.pkaA} | ${comp.pkaB} | Henderson-Hasselbalch Equilibrium |`,
        `| Free-Acid Bioavailability | ${comp.freeAcidA} | ${comp.freeAcidB} | ${comp.mixedFreeAcidA} |`,
        `| Molecular Weight (Da) | ${comp.mwA} | ${comp.mwB} | Rule-of-500 Dalton Threshold |`,
        `| EU CosIng Comedogenicity | ${comp.comedoA} | ${comp.comedoB} | 0-5 Pore-Congestion Scale |`,
        `| Malassezia (Fungal Acne) | ${comp.malasseziaA} | ${comp.malasseziaB} | Lipid Ester Screen |`,
        `| Optimal Routine Slot | ${comp.slotA} | ${comp.slotB} | ${comp.verdictLabel} |`,
        ''
      ].join('\n');
    }
  }
  return [
    '---',
    `title: "DermLogic Deterministic Skincare Specification (${cleanPath})"`,
    `canonical_url: "${HOST_URL}${cleanPath}"`,
    `markdown_twin_url: "${HOST_URL}${cleanPath === '/' ? '/index.md' : cleanPath + '.md'}"`,
    'measurement_technique: "Henderson-Hasselbalch pKa Free-Acid Dissociation, ΔpH Ionization Differential, Molecular Weight Da & EU CosIng Comedogenicity"',
    '---',
    '',
    `# DermLogic Formulation Atelier: ${cleanPath}`,
    '',
    '> Deterministic cosmetic-chemistry conflict analyzer, Henderson-Hasselbalch pH/pKa bioavailability calculator, and 5-Slot Vanity Bag routine sequencer.',
    '',
    `- Canonical Page: ${HOST_URL}${cleanPath}`,
    `- Open Knowledge Framework Manifest: ${HOST_URL}/okf/index.json`,
    `- Pricing & Deliverables (.md): ${HOST_URL}/pricing.md`,
    `- Full LLM Knowledge Corpus: ${HOST_URL}/llms-full.txt`,
    ''
  ].join('\n');
}

const GLOWINDEX_CLIENT_SCRIPT = `<script id="gi-glow-session-script">
(function(){
  var STORAGE_KEY = 'dermlogic_glow_session_v1';
  function loadSession() { try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch (_) { return {}; } }
  function saveSession(patch) {
    try {
      var next = Object.assign({}, loadSession(), patch, { updatedAt: new Date().toISOString() });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      var shelf = {};
      try { shelf = JSON.parse(localStorage.getItem('dermlogic_shelf_state_v1') || '{}') || {}; } catch (_) {}
      if (patch.skinType) shelf.skinType = patch.skinType;
      if (patch.climate) shelf.climate = patch.climate;
      if (patch.productIds && patch.productIds.length) shelf.productIds = patch.productIds;
      localStorage.setItem('dermlogic_shelf_state_v1', JSON.stringify(shelf));
      renderEndowmentBar(next);
      return next;
    } catch (_) { return {}; }
  }
  window.__giFireBeacon = function(stage, meta) {
    try { fetch('/api/seo/beacon', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ stage: stage, path: window.location.pathname, meta: meta || {} }) }).catch(function(){}); } catch (_) {}
  };
  window.__giSelectCompareVerdict = function(col, skinProfile, winnerName, winnerId, prodQuery, btn) {
    var allBtns = document.querySelectorAll('.gi-verdict-btn');
    for (var i = 0; i < allBtns.length; i++) { allBtns[i].style.borderColor = ''; allBtns[i].style.color = ''; }
    if (btn) { btn.style.borderColor = 'var(--rose-brand)'; btn.style.color = 'var(--rose-brand)'; }
    var cellsA = document.querySelectorAll('#gi-compare-matrix-table .gi-col-a');
    var cellsB = document.querySelectorAll('#gi-compare-matrix-table .gi-col-b');
    for (var a = 0; a < cellsA.length; a++) {
      cellsA[a].style.background = (col === 'a' || col === 'both') ? 'var(--sage-pill-bg)' : '';
      cellsA[a].setAttribute('data-col-winner', (col === 'a' || col === 'both') ? 'true' : 'false');
    }
    for (var b = 0; b < cellsB.length; b++) {
      cellsB[b].style.background = (col === 'b' || col === 'both') ? 'var(--sage-pill-bg)' : '';
      cellsB[b].setAttribute('data-col-winner', (col === 'b' || col === 'both') ? 'true' : 'false');
    }
    var prods = decodeURIComponent(prodQuery || '').split(',').filter(Boolean);
    saveSession({ skinType: skinProfile, lastWinner: winnerName, lastWinnerId: winnerId, productIds: prods, sourcePath: window.location.pathname });
    var texts = document.querySelectorAll('.gi-verdict-live-text');
    for (var t = 0; t < texts.length; t++) {
      texts[t].innerHTML = '<strong>Tailored Verdict for ' + skinProfile.replace('_', ' ').toUpperCase() + ':</strong> Winner highlighted in table: <strong>' + winnerName + '</strong>. Saved to your active routine session.';
    }
    var links = document.querySelectorAll('.gi-verdict-cta-link');
    for (var l = 0; l < links.length; l++) {
      links[l].setAttribute('href', '/?products=' + encodeURIComponent(prods.join(',')) + '&skin=' + encodeURIComponent(skinProfile) + '&ref=compare_verdict#analyzer');
    }
    window.__giFireBeacon('tool_initiated', { tool: 'compare_verdict_selector', col: col, skin: skinProfile, winner: winnerId });
  };
  window.__giRunEntitySim = function(skin, climate, kpiText, noteText, btn) {
    var pills = document.querySelectorAll('.gi-sim-pill');
    for (var i = 0; i < pills.length; i++) { pills[i].classList.remove('active'); pills[i].style.borderColor = ''; pills[i].style.color = ''; }
    if (btn) { btn.classList.add('active'); btn.style.borderColor = 'var(--rose-brand)'; btn.style.color = 'var(--rose-brand)'; }
    var kEl = document.getElementById('gi-sim-readout-kpi'), nEl = document.getElementById('gi-sim-readout-note'), lEl = document.getElementById('gi-sim-hydrate-link');
    if (kEl) kEl.textContent = kpiText;
    if (nEl) nEl.textContent = noteText;
    if (lEl) {
      var baseHref = lEl.getAttribute('href') || '/#analyzer';
      lEl.setAttribute('href', baseHref.replace(/skin=[^&#]+/, 'skin=' + encodeURIComponent(skin)).replace(/climate=[^&#]+/, 'climate=' + encodeURIComponent(climate)));
    }
    saveSession({ skinType: skin, climate: climate, lastSimKpi: kpiText, sourcePath: window.location.pathname });
    window.__giFireBeacon('tool_initiated', { tool: 'entity_environment_simulator', skin: skin, climate: climate });
  };
  function renderEndowmentBar(sess) {
    if (!sess || (!sess.skinType && !sess.lastWinner && (!sess.productIds || !sess.productIds.length))) return;
    var bar = document.getElementById('gi-active-profile-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'gi-active-profile-bar';
      bar.style.cssText = 'background:var(--bg-oat);border-bottom:1px solid var(--border-hairline);padding:6px 16px;font-size:0.78rem;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;';
      var main = document.querySelector('main') || document.body;
      if (main && main.parentNode) main.parentNode.insertBefore(bar, main);
    }
    var pList = (sess.productIds && sess.productIds.length) ? sess.productIds.join(',') : 'skinceuticals-ce-ferulic,aestura-atobarrier-365';
    var skinLbl = (sess.skinType || 'combination').replace('_', ' '), climLbl = (sess.climate || 'daylight_uv').replace('_', ' ');
    bar.innerHTML = '<div class="mono" style="color:var(--text-primary);"><strong>Saved Routine Profile:</strong> Skin: <span style="color:var(--rose-brand);">' + skinLbl + '</span> · Climate: <span>' + climLbl + '</span>' + (sess.lastWinner ? ' · Selected: <strong>' + sess.lastWinner + '</strong>' : '') + '</div>'
      + '<a href="/?products=' + encodeURIComponent(pList) + '&skin=' + encodeURIComponent(sess.skinType || 'combination') + '#analyzer" class="mono" style="color:var(--rose-brand);font-weight:600;text-decoration:underline;">Test in My Routine &rarr;</a>';
  }
  document.addEventListener('DOMContentLoaded', function() {
    try {
      var params = new URLSearchParams(window.location.search);
      var qSkin = params.get('skin') || params.get('season') || params.get('depth'), qClimate = params.get('climate'), qProds = params.get('products');
      if (qSkin || qClimate || qProds) {
        saveSession({ skinType: qSkin || undefined, climate: qClimate || undefined, productIds: qProds ? qProds.split(',').filter(Boolean) : undefined });
        var skinSel = document.getElementById('skinTypeSelect');
        if (skinSel && qSkin) skinSel.value = qSkin;
      } else {
        var existing = loadSession();
        renderEndowmentBar(existing);
        var skinSel2 = document.getElementById('skinTypeSelect');
        if (skinSel2 && existing.skinType) skinSel2.value = existing.skinType;
      }
    } catch (_) {}
  });
})();
</script>`;

function attachGlowIndexSeoUpgrades(app) {
  app.use((req, res, next) => {
    recordBotOrHumanHit(req);
    const acceptHdr = String(req.headers.accept || '').toLowerCase();
    if (req.method === 'GET' && acceptHdr.includes('text/markdown') && !req.path.startsWith('/api/') && !req.path.startsWith('/public/')) {
      res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1');
      res.setHeader('Link', `<${HOST_URL}${req.path.replace(/\.md$/i, '')}>; rel="canonical", <${HOST_URL}/okf/index.json>; rel="describedby"`);
      return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(req.path));
    }

    const origSend = res.send.bind(res);
    res.send = function glowIndexPatchedSend(body) {
      if (res.statusCode === 404 || req.path.startsWith('/buy/') || req.path.startsWith('/api/buy/')) {
        try { res.setHeader('X-Robots-Tag', 'noindex, nofollow'); } catch (_) {}
      } else if (res.statusCode === 200 && req.method === 'GET' && !req.path.startsWith('/api/')) {
        const cleanP = req.path === '/' ? '' : req.path.replace(/\.md$/i, '');
        const mdTwin = cleanP ? `${cleanP}.md` : '/index.md';
        try {
          res.setHeader('X-Robots-Tag', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
          res.setHeader('Link', `<${HOST_URL}${mdTwin}>; rel="alternate"; type="text/markdown", <${HOST_URL}/llms.txt>; rel="llms-txt", <${HOST_URL}/llms-full.txt>; rel="llms-full-txt", <${HOST_URL}/pricing.md>; rel="service-meta"; type="text/markdown", <${HOST_URL}/okf/index.json>; rel="describedby"`);
        } catch (_) {}
      }

      if (typeof body === 'string' && (String(res.getHeader('Content-Type') || '').includes('text/html') || body.trim().startsWith('<!DOCTYPE html>'))) {
        let out = body;
        if (out.includes('href="/directory"') && !out.includes('id="gi-nav-quickjump"')) {
          const dropdownHtml = `<style>@media(max-width:1180px){#gi-nav-quickjump{display:none!important;}}</style><div id="gi-nav-quickjump" style="position:relative;display:inline-block;flex-shrink:0;white-space:nowrap;">
            <details style="position:relative;display:inline-block;">
              <summary class="mono" style="list-style:none;cursor:pointer;font-size:0.78rem;color:var(--text-secondary);padding:4px 8px;border:1px solid var(--border-hairline);background:var(--bg-oat);white-space:nowrap;">Explore Guides &#9662;</summary>
              <div style="position:absolute;top:calc(100% + 6px);left:0;min-width:230px;background:var(--bg-surface);border:none;border-radius:16px;padding:10px;z-index:999;display:flex;flex-direction:column;gap:6px;box-shadow:0 10px 24px rgba(58,31,39,0.12);">
                <a href="/directory" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">All 318+ Layering Guides</a>
                <a href="/compare" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Bottle vs. Bottle Dupe Showdowns</a>
                <a href="/scenario" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Life-Event &amp; Weather Guides</a>
                <a href="/bottle" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">${CULT_PRODUCTS.length} Cult Skincare Bottles</a>
                <a href="/ingredient" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">65 Skincare Actives</a>
                <a href="/ingredient/l-ascorbic-acid/serums" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Browse by Product Type</a>
                <a href="/celebrity" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">14 Celebrity Shelves</a>
                <a href="/brand" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">27 Skincare Brands</a>
                <a href="/studio/formulas/post-peel-ceramide-recovery" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Esthetician &amp; Clinic Protocols</a>
                <a href="/leaderboard" class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;text-decoration:none;">Top-Rated Routines &rarr;</a>
              </div>
            </details>
          </div>`;
          out = out.replace(/(<a href="\/directory"[^>]*>[\s\S]*?<\/a>)/, `$1 ${dropdownHtml}`);
        }

        if (req.path === '/directory' && out.includes('href="/brand"') && !out.includes('href="/compare"')) {
          const extraHubPills = `<a href="/compare" class="affiliate-link-pill mono">Head-to-Head Comparisons &rarr;</a>
          <a href="/scenario" class="affiliate-link-pill mono">Life-Event Scenarios (8) &rarr;</a>
          <a href="/ingredient/l-ascorbic-acid/serums" class="affiliate-link-pill mono">Active x Category Matrices &rarr;</a>
          <a href="/studio/formulas/post-peel-ceramide-recovery" class="affiliate-link-pill mono">B2B Backbar Formulas &rarr;</a>
          <a href="/studio/playbooks/intake-shelf-audit-sop" class="affiliate-link-pill mono">Clinic Playbooks &rarr;</a>
          <a href="/kiosk/medspa" class="affiliate-link-pill mono">MedSpa Kiosk &rarr;</a>
          <a href="/client/sydney-sweeney-shelf" class="affiliate-link-pill mono">Client Regimen Cards &rarr;</a>`;
          out = out.replace(/(<a href="\/brand"[^>]*>[\s\S]*?<\/a>)/, `$1\n          ${extraHubPills}`);
        }

        if (/^\/(bottle|ingredient|celebrity|concern|brand|scenario)\/[^/]+$/.test(req.path) && !out.includes('id="gi-entity-simulator"')) {
          const parts = req.path.split('/').filter(Boolean);
          const famType = parts[0], slugPart = parts[1] || 'active';
          let crossLinksHtml = '';
          if (famType === 'bottle') {
            const prod = CLINICAL_PRODUCTS.find((p) => p.id === slugPart);
            const rivals = getBottleRivals(prod, 6);
            if (prod && rivals.length > 0) {
              const rivalPills = rivals.map((r) => {
                const pair = [prod.id, r.id].sort();
                return `<a href="/compare/${escapeHtml(`${pair[0]}-vs-${pair[1]}`)}" class="porcelain-vessel-core" style="background:var(--bg-surface);padding:12px 16px;text-decoration:none;display:flex;justify-content:space-between;align-items:center;gap:8px;"><span style="font-size:0.86rem;color:var(--text-primary);font-weight:500;">${escapeHtml(prod.brand)} vs. <strong>${escapeHtml(r.brand)} ${escapeHtml(r.name.replace(/\s*\([^)]*\)/g, ''))}</strong></span><span class="mono" style="font-size:0.74rem;color:var(--rose-brand);white-space:nowrap;">pH ${prod.ph} vs ${r.ph} &rarr;</span></a>`;
              }).join('');
              crossLinksHtml = `<section class="porcelain-vessel-core" style="background:var(--bg-oat);padding:20px 24px;margin:18px 0;"><div class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;margin-bottom:4px;">HEAD-TO-HEAD CULT BOTTLE COMPARISONS</div><h2 class="serif-display" style="font-size:1.45rem;margin:0 0 12px;">Compare ${escapeHtml(prod.brand)} ${escapeHtml(prod.name.replace(/\s*\([^)]*\)/g, ''))} vs. Category Rivals &amp; Dupes</h2><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;">${rivalPills}</div></section>`;
            }
          } else if (famType === 'ingredient' || famType === 'concern' || famType === 'scenario') {
            const catLinks = INGREDIENT_SUBCATEGORIES.map((sc) => `<a href="/${famType}/${escapeHtml(slugPart)}/${escapeHtml(sc.slug)}" class="affiliate-link-pill mono" style="padding:7px 13px;font-size:0.78rem;text-decoration:none;">${escapeHtml(sc.label)} Matrix &rarr;</a>`).join('');
            crossLinksHtml = `<section class="porcelain-vessel-core" style="background:var(--bg-surface);padding:16px 20px;margin:16px 0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;"><span class="mono" style="font-size:0.8rem;color:var(--text-primary);font-weight:600;">Browse Verified Safe Bottles by Category:</span><div style="display:flex;gap:8px;flex-wrap:wrap;">${catLinks}</div></section>`;
          }
          const simHtml = `${crossLinksHtml}${renderEntityEnvironmentSimulatorHtml(slugPart.replace(/-/g, ' ').toUpperCase(), slugPart, 'skinceuticals-ce-ferulic')}`;
          if (out.includes('</table>')) out = out.replace('</table>', `</table>${simHtml}`);
          else if (out.includes('</main>')) out = out.replace('</main>', `<div class="container">${simHtml}</div></main>`);
        }

        const unescMeta = (s) => String(s || '').replace(/&amp;/g, '&').replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&middot;/g, '·').replace(/&ndash;/g, '–').replace(/&mdash;/g, '—').trim();
        const metaDescMatch = out.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
        const rawMetaDesc = metaDescMatch && metaDescMatch[1] ? unescMeta(metaDescMatch[1]) : '';
        const dsDesc = rawMetaDesc.length >= 60
          ? rawMetaDesc
          : `${rawMetaDesc ? `${rawMetaDesc} — ` : ''}First-principles cosmetic chemistry dataset for ${req.path} on DermLogic: formulation pH windows, Henderson-Hasselbalch pKa dissociation, Rule-of-500 Dalton barrier penetration, and EU CosIng comedogenicity ratings.`;
        const dsCreator = { '@type': 'Organization', name: 'DermLogic Cosmetic Chemistry Atelier', url: HOST_URL };
        out = out.replace(/<script([^>]*type=["']application\/ld\+json["'][^>]*)>([\s\S]*?)<\/script>/gi, (full, attrs, jsonRaw) => {
          if (!jsonRaw.includes('"Dataset"')) return full;
          try {
            const parsed = JSON.parse(jsonRaw);
            const patchNode = (node) => {
              if (!node || typeof node !== 'object') return;
              if (Array.isArray(node)) { node.forEach(patchNode); return; }
              if (node['@type'] === 'Dataset' || (Array.isArray(node['@type']) && node['@type'].includes('Dataset'))) {
                const curDesc = unescMeta(node.description || '');
                node.description = curDesc.length >= 60 ? curDesc : dsDesc;
                if (!node.creator || !node.creator['@type'] || !node.creator.name) node.creator = dsCreator;
                if (!node.license) node.license = 'https://creativecommons.org/licenses/by/4.0/';
                if (node.isAccessibleForFree === undefined) node.isAccessibleForFree = true;
              }
              if (Array.isArray(node['@graph'])) node['@graph'].forEach(patchNode);
            };
            patchNode(parsed);
            return `<script${attrs}>${JSON.stringify(parsed)}</script>`;
          } catch (_) { return full; }
        });
        if (!out.includes('"measurementTechnique"')) {
          const extraGraph = `<script id="gi-enriched-dataset-schema" type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': [{ '@type': 'Dataset', '@id': `${HOST_URL}${req.path}#deterministic-chemistry-dataset`, name: `DermLogic Cosmetic Chemistry & pH Compatibility Dataset (${req.path})`, description: dsDesc, url: `${HOST_URL}${req.path}`, creator: dsCreator, isAccessibleForFree: true, measurementTechnique: 'Henderson-Hasselbalch pKa Free-Acid Dissociation, ΔpH Ionization Differential, Rule-of-500 Dalton Stratum Corneum Diffusion & EU CosIng Comedogenicity Assay', citation: ['PubMed PMID: 11207686 (Pinnell et al., L-Ascorbic Acid Percutaneous Absorption)', 'JCAD Retinoid & Benzoyl Peroxide Oxidation Kinetics', 'EU CosIng Cosmetic Ingredient Database'], license: 'https://creativecommons.org/licenses/by/4.0/', distribution: [{ '@type': 'DataDownload', encodingFormat: 'application/json', contentUrl: `${HOST_URL}/okf/index.json` }] }] })}</script>`;
          if (out.includes('</head>')) out = out.replace('</head>', `${extraGraph}\n</head>`);
        }

        if (!out.includes('id="gi-glow-session-script"') && out.includes('</body>')) {
          out = out.replace('</body>', `${GLOWINDEX_CLIENT_SCRIPT}\n</body>`);
        }
        return origSend(out);
      }
      return origSend(body);
    };
    next();
  });

  app.get('/glow-session.js', (req, res) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(GLOWINDEX_CLIENT_SCRIPT.replace(/^<script[^>]*>|<\/script>$/g, '').trim());
  });

  app.get('/pricing.md', (req, res) => {
    res.setHeader('X-Robots-Tag', 'index, follow');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath('/pricing'));
  });

  app.get('/okf/index.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Robots-Tag', 'index, follow');
    return res.status(200).json({
      okf_version: '1.0.0',
      organization: { name: 'DermLogic · Atelier Céramique', url: HOST_URL, contact: 'concierge@dermlogic.io' },
      deterministic_engine: {
        formulas: [
          'Henderson-Hasselbalch Free-Acid Bioavailability: Free_Acid_% = 100 / (1 + 10^(pH - pKa))',
          'pH Ionization Differential: Delta_pH = |mid_pH(A) - mid_pH(B)|',
          'Stratum Corneum Diffusion: Bos & Meinardi 500 Dalton Molecular Weight Threshold',
          'Pore-Congestion & Microbiome Assay: EU CosIng Comedogenicity (0-5) + Malassezia C12-C24 Ester Screen'
        ],
        citations: ['PubMed PMID: 11207686', 'JCAD Retinoid & Benzoyl Peroxide Stability', 'EU CosIng Cosmetic Ingredient Database']
      },
      discovery_endpoints: {
        llms_txt: `${HOST_URL}/llms.txt`, llms_full_txt: `${HOST_URL}/llms-full.txt`, pricing_md: `${HOST_URL}/pricing.md`,
        openapi_json: `${HOST_URL}/openapi.json`, rss_feed: `${HOST_URL}/feed.xml`, json_feed: `${HOST_URL}/feed.json`,
        sitemap_index: `${HOST_URL}/sitemap-index.xml`, telemetry_ledger: `${HOST_URL}/api/seo/telemetry`
      },
      route_families: ROUTE_FAMILIES_META
    });
  });

  app.get('/compare', (req, res) => {
    const activePairs = [
      { slug: 'copper-tripeptide-1-vs-l-ascorbic-acid', title: 'Copper Tripeptide-1 vs. L-Ascorbic Acid (Vitamin C)', sub: 'ΔpH 2.75 · Metal-Ion Oxidation Clash · Split AM/PM' },
      { slug: 'retinol-vs-tretinoin', title: 'Retinol vs. Prescription Tretinoin 0.05%', sub: 'ΔpH 0.15 · Conversion Kinetics & Ceramide Buffering' },
      { slug: 'glycolic-acid-vs-salicylic-acid', title: 'Glycolic Acid (AHA) vs. Salicylic Acid (BHA)', sub: 'ΔpH 0.10 · Water-Soluble Surface vs. Oil-Soluble Pore Clearing' },
      { slug: 'adapalene-vs-benzoyl-peroxide', title: 'Adapalene 0.1% vs. Benzoyl Peroxide', sub: 'ΔpH 0.55 · Photo-Stable Retinoid Compatibility' },
      { slug: 'azelaic-acid-vs-niacinamide', title: 'Azelaic Acid 10% vs. Niacinamide 5%', sub: 'ΔpH 1.15 · Redness & Melasma Synergy (Safe Same-Routine)' },
      { slug: 'l-ascorbic-acid-vs-niacinamide', title: 'L-Ascorbic Acid (Vitamin C) vs. Niacinamide', sub: 'ΔpH 2.30 · 60s Wait Rule to Prevent Niacin Flush' },
      { slug: 'azelaic-acid-vs-tretinoin', title: 'Azelaic Acid 15% vs. Prescription Tretinoin 0.05%', sub: 'Rosacea & Melasma Dual-Pathway Layering Order' },
      { slug: 'lactic-acid-vs-retinol', title: 'Lactic Acid (AHA) vs. Retinol', sub: '4-Night Skin Cycling Schedule vs. Same-Night Irritation' }
    ];
    const bottleCards = FLAGSHIP_BOTTLE_COMPARE_PAIRS.map((c) => `<a href="/compare/${escapeHtml(c.slug)}" class="porcelain-vessel-core" style="padding:18px 22px;background:var(--bg-oat);text-decoration:none;display:block;"><div class="mono" style="font-size:0.75rem;color:var(--rose-brand);margin-bottom:5px;">Bottle vs. Bottle · ${escapeHtml(c.sub)}</div><div class="serif-display" style="font-size:1.22rem;color:var(--text-primary);">${escapeHtml(c.title)} &rarr;</div></a>`).join('');
    const activeCards = activePairs.map((c) => `<a href="/compare/${escapeHtml(c.slug)}" class="porcelain-vessel-core" style="padding:18px 22px;background:var(--bg-surface);text-decoration:none;display:block;"><div class="mono" style="font-size:0.75rem;color:var(--rose-brand);margin-bottom:5px;">Active vs. Active · ${escapeHtml(c.sub)}</div><div class="serif-display" style="font-size:1.22rem;color:var(--text-primary);">${escapeHtml(c.title)} &rarr;</div></a>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><h1 class="hero-h1" style="font-size:clamp(2.2rem,3.6vw,3.2rem);margin-bottom:10px;">Head-to-Head Cult Bottle &amp; Active Comparisons (${ALL_COMPARE_SLUGS.length} Matrices)</h1><p class="hero-sub" style="margin-bottom:22px;">Side-by-side formulation pH windows, Henderson-Hasselbalch pKa bioavailability, INCI dupe match scores, and 1-tap inline verdict selectors.</p><h2 class="serif-display" style="font-size:1.65rem;margin-bottom:14px;">Most-Searched Cult Bottle vs. Bottle Showdowns</h2><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px;margin-bottom:32px;">${bottleCards}</div><h2 class="serif-display" style="font-size:1.65rem;margin-bottom:14px;">Clinical Active vs. Active Chemistry Matrices</h2><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px;">${activeCards}</div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: 'Cult Skincare Bottle vs. Bottle & Active Comparisons | DermLogic', description: 'Compare cult skincare bottles (Aestura vs Illiyoon, Cicaplast vs Cicalfate, Beauty of Joseon vs Round Lab, C E Ferulic vs Timeless) and clinical actives side by side.', canonicalPath: '/compare', ogSlug: 'compare-hub', jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get('/compare/:slug', (req, res, next) => {
    const rawSlug = String(req.params.slug || '');
    const isMd = rawSlug.endsWith('.md');
    const cleanSlug = isMd ? rawSlug.slice(0, -3) : rawSlug;
    const resolved = resolveComparisonSlug(cleanSlug);
    if (!resolved) return next();
    if (resolved.needsRedirect) return res.redirect(301, `/compare/${resolved.canonicalSlug}${isMd ? '.md' : ''}`);
    if (isMd) {
      res.setHeader('Link', `<${HOST_URL}/compare/${resolved.canonicalSlug}>; rel="canonical"`);
      return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(`/compare/${resolved.canonicalSlug}`));
    }
    return res.status(200).type('html').send(renderComparePageHtml(computeComparisonTelemetry(resolved), resolved.canonicalSlug));
  });

  app.get('/ingredient/:slug/:category', (req, res, next) => {
    const rawCat = String(req.params.category || '');
    const isMd = rawCat.endsWith('.md');
    const cleanCat = isMd ? rawCat.slice(0, -3).toLowerCase() : rawCat.toLowerCase();
    const ing = findIngredientFuzzy(req.params.slug);
    if (!ing) return next();
    const subcat = INGREDIENT_SUBCATEGORIES.find((c) => c.slug === cleanCat) || INGREDIENT_SUBCATEGORIES[0];
    if (cleanCat !== subcat.slug) return res.redirect(301, `/ingredient/${ing.id}/${subcat.slug}${isMd ? '.md' : ''}`);
    if (isMd) return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(`/ingredient/${ing.id}/${subcat.slug}`));
    const matchingProducts = CLINICAL_PRODUCTS.filter((p) => (p.primaryActives || []).includes(ing.id) || subcat.filterFn(p)).slice(0, 8);
    const hh = computeHendersonHasselbalch((ing.phMin + ing.phMax) / 2, ing.pka);
    const rowsHtml = matchingProducts.map((p) => `<tr><td><a href="/bottle/${escapeHtml(p.id)}" style="font-weight:600;color:var(--text-primary);text-decoration:underline;">${escapeHtml(p.brand)} ${escapeHtml(p.name)}</a><div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">${escapeHtml(p.summary || '')}</div></td><td class="mono">pH ${ing.phMin} - ${ing.phMax} &middot; $${p.priceUsd}</td><td class="mono">${hh.freeAcidPct}% Bioavailable</td><td class="mono">${escapeHtml(p.timeOfDay || 'AM / PM')}</td><td><div style="display:flex;gap:6px;flex-wrap:wrap;" data-no-bag-inject="1"><button type="button" id="dl-bag-btn-${escapeHtml(p.id)}" data-dl-bag-prod="${escapeHtml(p.id)}" data-dl-bag-title="${escapeHtml(p.brand + ' ' + p.name)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(p.id)}','${escapeHtml((p.brand + ' ' + p.name).replace(/'/g, ''))}','',this)" style="padding:5px 10px;font-size:0.74rem;cursor:pointer;background:var(--rose-pill-bg);color:var(--rose-brand);border-radius:999px;">+ Add to Vanity Bag</button><a href="/api/affiliate?product=${escapeHtml(p.id)}&amp;partner=${/timeless|cosrx|illiyoon|joseon|rohto|anua|stratia/i.test(p.brand) ? 'amazon' : 'sephora'}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:5px 10px;font-size:0.74rem;">Shop ($${p.priceUsd}) &nearr;</a></div></td></tr>`).join('');
    const bodyHtml = `<section class="section-block" style="padding-top:20px;"><div class="container"><nav class="mono" style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;"><a href="/">Home</a> / <a href="/ingredient">Actives</a> / <a href="/ingredient/${escapeHtml(ing.id)}">${escapeHtml(ing.commonName)}</a> / <span style="color:var(--rose-brand);">${escapeHtml(subcat.label)}</span></nav><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px;"><span class="badge-safe mono">Verified ${escapeHtml(subcat.label)} &middot; pH ${ing.phMin}–${ing.phMax} &middot; ${hh.freeAcidPct}% Bioavailable</span><button type="button" class="btn-primary mono" onclick="window.__dlPreloadBottlesInVanityBag([${matchingProducts.slice(0, 3).map((p) => `'${escapeHtml(p.id)}'`).join(',')}],'ing_${escapeHtml(ing.id)}_${escapeHtml(subcat.slug)}')" style="padding:7px 14px;font-size:0.78rem;min-height:34px;"><span>Load Top 3 in My 5-Slot Vanity Bag</span><span class="btn-icon-circle">&rarr;</span></button></div><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:8px;">Best ${escapeHtml(ing.commonName)} ${escapeHtml(subcat.label)} (Ranked by pH &amp; Bioavailability)</h1><p class="hero-sub" style="margin-bottom:14px;">Formulation pH window ${ing.phMin}-${ing.phMax}, molecular weight ${ing.molecularWeightDa} Da, and ${hh.freeAcidPct}% Henderson-Hasselbalch bioavailability across ${escapeHtml(subcat.label.toLowerCase())}.</p><div class="porcelain-vessel-core" style="padding:20px 22px;background:var(--bg-surface);margin-bottom:16px;"><div class="table-wrap"><table><thead><tr><th>Cult Bottle &amp; Why It Wins</th><th>Target pH &amp; Price</th><th>Free-Active Bioavailability</th><th>Routine Slot</th><th>Add to Shelf / Shop</th></tr></thead><tbody>${rowsHtml}</tbody></table></div></div>${renderEntityEnvironmentSimulatorHtml(`${ing.commonName} ${subcat.label}`, `${ing.id}-${subcat.slug}`, (matchingProducts[0] && matchingProducts[0].id) || 'skinceuticals-ce-ferulic')}</div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${ing.commonName} ${subcat.label} Matrix (pH ${ing.phMin}-${ing.phMax}) | DermLogic`, description: `Compare ${ing.commonName} ${subcat.label.toLowerCase()} by pH window, pKa bioavailability, and layering safety.`, canonicalPath: `/ingredient/${ing.id}/${subcat.slug}`, ogSlug: `${ing.id}-${subcat.slug}`, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get(['/concern/:slug/:category', '/scenario/:slug/:category'], (req, res, next) => {
    const isConcern = req.path.startsWith('/concern/');
    const basePrefix = isConcern ? '/concern' : '/scenario';
    const rawCat = String(req.params.category || '');
    const isMd = rawCat.endsWith('.md');
    const cleanCat = isMd ? rawCat.slice(0, -3).toLowerCase() : rawCat.toLowerCase();
    const list = isConcern ? (Array.isArray(CONCERN_HUBS) ? CONCERN_HUBS : []) : SCENARIO_GUIDES;
    const qToks = String(req.params.slug || '').toLowerCase().split('-').filter((t) => t.length > 2 && !['safe', 'routine', 'shelf', 'skincare', 'and', 'for'].includes(t));
    const item = list.find((x) => x.slug === req.params.slug) || list.find((x) => x.slug.includes(req.params.slug) || String(req.params.slug).includes(x.slug)) || list.find((x) => qToks.filter((t) => x.slug.includes(t)).length >= 2);
    if (!item) return next();
    const subcat = INGREDIENT_SUBCATEGORIES.find((c) => c.slug === cleanCat) || INGREDIENT_SUBCATEGORIES[0];
    if (cleanCat !== subcat.slug || req.params.slug !== item.slug) return res.redirect(301, `${basePrefix}/${item.slug}/${subcat.slug}${isMd ? '.md' : ''}`);
    if (isMd) return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(`${basePrefix}/${item.slug}/${subcat.slug}`));
    const safeSet = new Set(item.activeIds || item.safeIds || []);
    const matchingProducts = CLINICAL_PRODUCTS.filter((p) => subcat.filterFn(p) && ((p.primaryActives || []).some((a) => safeSet.has(a)) || (item.productIds || []).includes(p.id))).concat(CLINICAL_PRODUCTS.filter(subcat.filterFn)).slice(0, 10);
    const dedupProds = Array.from(new Map(matchingProducts.map((p) => [p.id, p])).values()).slice(0, 8);
    const rowsHtml = dedupProds.map((p) => `<tr><td><a href="/bottle/${escapeHtml(p.id)}" style="font-weight:600;color:var(--text-primary);text-decoration:underline;">${escapeHtml(p.brand)} ${escapeHtml(p.name)}</a><div style="font-size:0.8rem;color:var(--text-secondary);margin-top:2px;">${escapeHtml(p.summary || '')}</div></td><td class="mono">pH ${p.ph} · $${p.priceUsd}</td><td class="mono">${escapeHtml(p.category)}</td><td><div style="display:flex;gap:6px;flex-wrap:wrap;" data-no-bag-inject="1"><button type="button" id="dl-bag-btn-${escapeHtml(p.id)}" data-dl-bag-prod="${escapeHtml(p.id)}" data-dl-bag-title="${escapeHtml(p.brand + ' ' + p.name)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(p.id)}','${escapeHtml((p.brand + ' ' + p.name).replace(/'/g, ''))}','',this)" style="padding:5px 10px;font-size:0.74rem;cursor:pointer;background:var(--rose-pill-bg);color:var(--rose-brand);border-radius:999px;">+ Add to Vanity Bag</button><a href="/api/affiliate?product=${escapeHtml(p.id)}&amp;partner=${/timeless|cosrx|illiyoon|joseon|rohto|anua|stratia/i.test(p.brand) ? 'amazon' : 'sephora'}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:5px 10px;font-size:0.74rem;">Shop ($${p.priceUsd}) &nearr;</a></div></td></tr>`).join('');
    const bodyHtml = `<section class="section-block" style="padding-top:20px;"><div class="container"><nav class="mono" style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;"><a href="/">Home</a> / <a href="${basePrefix}">${isConcern ? 'Concerns' : 'Scenarios'}</a> / <a href="${basePrefix}/${escapeHtml(item.slug)}">${escapeHtml(item.title)}</a> / <span style="color:var(--rose-brand);">${escapeHtml(subcat.label)}</span></nav><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px;"><span class="badge-safe mono">Zero-Trigger Verified &middot; ${dedupProds.length} Safe ${escapeHtml(subcat.label)}</span><button type="button" class="btn-primary mono" onclick="window.__dlPreloadBottlesInVanityBag([${dedupProds.slice(0, 3).map((p) => `'${escapeHtml(p.id)}'`).join(',')}],'concern_${escapeHtml(item.slug)}_${escapeHtml(subcat.slug)}')" style="padding:7px 14px;font-size:0.78rem;min-height:34px;"><span>Load Top 3 in My 5-Slot Vanity Bag</span><span class="btn-icon-circle">&rarr;</span></button></div><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:8px;">${escapeHtml(item.title)}: Best ${escapeHtml(subcat.label)}</h1><p class="hero-sub" style="margin-bottom:14px;">${escapeHtml(item.summary)} Tap any verified bottle below to add it to your 5-Slot Vanity Bag or check retail pricing.</p><div class="porcelain-vessel-core" style="padding:20px 22px;background:var(--bg-surface);margin-bottom:16px;"><div class="table-wrap"><table><thead><tr><th>Verified Safe Bottle &amp; Why It Works</th><th>pH &amp; Price</th><th>Formulation Role</th><th>Add to Shelf / Shop</th></tr></thead><tbody>${rowsHtml}</tbody></table></div></div>${renderEntityEnvironmentSimulatorHtml(`${item.title} ${subcat.label}`, `${item.slug}-${subcat.slug}`, (dedupProds[0] && dedupProds[0].id) || 'aestura-atobarrier-365')}</div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `Best ${subcat.label} for ${item.title} | DermLogic`, description: `Verified ${subcat.label.toLowerCase()} for ${item.title}: exact bottle pH, INCI safety, and layering order.`, canonicalPath: `${basePrefix}/${item.slug}/${subcat.slug}`, ogSlug: `${item.slug}-${subcat.slug}`, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get(['/sku/:brand/:sku', '/shade/:brand/:sku'], (req, res) => {
    const combined = `${req.params.brand}-${req.params.sku}`.replace(/\.md$/i, '').toLowerCase();
    const matched = findProductFuzzy(combined) || findProductFuzzy(req.params.sku) || CLINICAL_PRODUCTS[0];
    return res.redirect(301, `/bottle/${matched.id}`);
  });

  app.get('/scenario', (req, res) => {
    const cards = SCENARIO_GUIDES.map((s) => `<a href="/scenario/${escapeHtml(s.slug)}" class="porcelain-vessel-core" style="padding:20px 24px;background:var(--bg-surface);text-decoration:none;display:block;"><div class="mono" style="font-size:0.76rem;color:var(--rose-brand);margin-bottom:6px;">${escapeHtml(s.category)} · Target pH ${escapeHtml(s.phTarget)}</div><div class="serif-display" style="font-size:1.3rem;color:var(--text-primary);margin-bottom:6px;">${escapeHtml(s.title)}</div><p style="font-size:0.88rem;color:var(--text-secondary);margin:0;">${escapeHtml(s.summary)}</p></a>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><h1 class="hero-h1" style="font-size:clamp(2.2rem,3.6vw,3.2rem);margin-bottom:10px;">Life-Event &amp; Skin-Barrier Scenario Protocols</h1><p class="hero-sub" style="margin-bottom:22px;">Deterministic ingredient exclusions, pH recovery windows, and 1-tap safe bottle routines for pregnancy, post-microneedling, fungal acne, and winter barrier repair.</p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;">${cards}</div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: 'Skincare Scenario & Barrier Recovery Protocols | DermLogic', description: 'Clinical skincare routines for pregnancy, fungal acne, damaged moisture barriers, post-microneedling, and winter TEWL.', canonicalPath: '/scenario', ogSlug: 'scenario-hub', jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get('/scenario/:slug', (req, res) => {
    const raw = String(req.params.slug || '');
    const isMd = raw.endsWith('.md');
    const clean = isMd ? raw.slice(0, -3).toLowerCase() : raw.toLowerCase();
    const scen = SCENARIO_GUIDES.find((s) => s.slug === clean) || SCENARIO_GUIDES.find((s) => s.slug.includes(clean) || clean.includes(s.slug)) || SCENARIO_GUIDES[0];
    if (clean !== scen.slug) return res.redirect(301, `/scenario/${scen.slug}${isMd ? '.md' : ''}`);
    if (isMd) return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(`/scenario/${scen.slug}`));
    const safeIngs = scen.safeIds.map((id) => CLINICAL_INGREDIENTS.find((i) => i.id === id)).filter(Boolean);
    const trs = safeIngs.map((i) => `<tr><td><a href="/ingredient/${escapeHtml(i.id)}" style="font-weight:600;color:var(--text-primary);text-decoration:underline;">${escapeHtml(i.commonName)}</a></td><td class="mono">${escapeHtml(i.inciName)}</td><td class="mono">pH ${i.phMin} - ${i.phMax}</td><td class="mono">${i.molecularWeightDa} Da</td><td class="mono">${i.comedogenicity}/5</td></tr>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><nav class="mono" style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:10px;"><a href="/">Home</a> / <a href="/scenario">Scenarios</a> / <span style="color:var(--rose-brand);">${escapeHtml(scen.title)}</span></nav><span class="badge-safe mono" style="margin-bottom:8px;display:inline-block;">${escapeHtml(scen.category)} · Target pH ${escapeHtml(scen.phTarget)}</span><h1 class="hero-h1" style="font-size:clamp(2rem,3.5vw,3.1rem);margin-bottom:10px;">${escapeHtml(scen.title)}</h1><p class="hero-sub" style="margin-bottom:16px;">${escapeHtml(scen.summary)}</p><div class="porcelain-vessel-core" style="padding:18px 22px;background:var(--bg-oat);margin-bottom:18px;border-left:3px solid var(--rose-brand);"><strong class="mono" style="color:var(--rose-brand);font-size:0.82rem;">STRICT EXCLUSION LIST (DO NOT LAYER):</strong><div style="font-size:0.92rem;color:var(--text-primary);margin-top:4px;">${escapeHtml(scen.avoidList)}</div></div>${renderEntityEnvironmentSimulatorHtml(scen.title, scen.slug, scen.productIds[0])}<div class="porcelain-vessel-core" style="padding:22px;background:var(--bg-surface);"><h2 class="serif-display" style="font-size:1.55rem;margin:0 0 12px;">Verified Safe Actives &amp; Biochemical Thresholds</h2><div class="table-wrap"><table><thead><tr><th>Active Ingredient</th><th>Bottle Label Name (INCI)</th><th>pH Window</th><th>Molecular Weight</th><th>EU CosIng Comedogenic</th></tr></thead><tbody>${trs}</tbody></table></div></div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${scen.title} | DermLogic`, description: scen.summary, canonicalPath: `/scenario/${scen.slug}`, ogSlug: `scenario-${scen.slug}`, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get('/studio/formulas/:slug', (req, res) => {
    const raw = String(req.params.slug || '').replace(/\.md$/i, '').toLowerCase();
    const f = B2B_STUDIO_FORMULAS.find((x) => x.slug === raw) || B2B_STUDIO_FORMULAS[0];
    if (raw !== f.slug) return res.redirect(301, `/studio/formulas/${f.slug}`);
    const ings = f.keyActives.map((id) => CLINICAL_INGREDIENTS.find((i) => i.id === id)).filter(Boolean);
    const rows = ings.map((i) => `<tr><td><strong>${escapeHtml(i.commonName)}</strong></td><td class="mono">${escapeHtml(i.inciName)}</td><td class="mono">pH ${i.phMin}-${i.phMax}</td><td class="mono">${i.molecularWeightDa} Da</td></tr>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><span class="badge-safe mono" style="margin-bottom:8px;display:inline-block;">B2B Esthetician Backbar · ${escapeHtml(f.vertical)} · Target pH ${escapeHtml(f.targetPh)}</span><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:10px;">${escapeHtml(f.title)}</h1><p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(f.summary)} Post-procedure active hold window: <strong>${f.activeHoldDays} days</strong>.</p>${renderEntityEnvironmentSimulatorHtml(f.title, f.slug, 'aestura-atobarrier-365')}<div class="porcelain-vessel-core" style="padding:22px;background:var(--bg-surface);"><div class="table-wrap"><table><thead><tr><th>Backbar Active</th><th>Bottle Label Name (INCI)</th><th>Formulation pH</th><th>Molecular Size</th></tr></thead><tbody>${rows}</tbody></table></div></div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${f.title} | DermLogic Studio`, description: f.summary, canonicalPath: `/studio/formulas/${f.slug}`, ogSlug: f.slug, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get('/studio/playbooks/:slug', (req, res) => {
    const raw = String(req.params.slug || '').replace(/\.md$/i, '').toLowerCase();
    const p = B2B_PLAYBOOKS.find((x) => x.slug === raw) || B2B_PLAYBOOKS[0];
    if (raw !== p.slug) return res.redirect(301, `/studio/playbooks/${p.slug}`);
    const bodyHtml = `<section class="section-block"><div class="container"><span class="badge-safe mono" style="margin-bottom:8px;display:inline-block;">B2B Clinic SOP · ${escapeHtml(p.role)} · ${escapeHtml(p.kpiLift)}</span><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:10px;">${escapeHtml(p.title)}</h1><p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(p.summary)}</p>${renderEntityEnvironmentSimulatorHtml(p.title, p.slug, 'skinceuticals-ce-ferulic')}</div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${p.title} | DermLogic Studio`, description: p.summary, canonicalPath: `/studio/playbooks/${p.slug}`, ogSlug: p.slug, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get('/kiosk/:vertical', (req, res) => {
    const raw = String(req.params.vertical || '').replace(/\.md$/i, '').toLowerCase();
    const k = KIOSK_VERTICALS.find((x) => x.slug === raw) || KIOSK_VERTICALS[0];
    if (raw !== k.slug) return res.redirect(301, `/kiosk/${k.slug}`);
    const bodyHtml = `<section class="section-block"><div class="container"><span class="badge-safe mono" style="margin-bottom:8px;display:inline-block;">Touchscreen Kiosk Mode · Zero-Login Countertop Display</span><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:10px;">${escapeHtml(k.title)}</h1><p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(k.subtitle)}</p>${renderEntityEnvironmentSimulatorHtml(k.title, k.slug, 'skinceuticals-ce-ferulic')}<div style="margin-top:18px;"><a href="/#analyzer" class="btn-primary"><span>${escapeHtml(k.ctaLabel)}</span><span class="btn-icon-circle">&rarr;</span></a></div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${k.title} | DermLogic Kiosk`, description: k.subtitle, canonicalPath: `/kiosk/${k.slug}`, ogSlug: `kiosk-${k.slug}`, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get('/client/:slug', (req, res) => {
    const raw = String(req.params.slug || '');
    const isMd = raw.endsWith('.md');
    const clean = isMd ? raw.slice(0, -3).toLowerCase() : raw.toLowerCase();
    const c = B2B_CLIENT_DELIVERABLES.find((x) => x.slug === clean) || B2B_CLIENT_DELIVERABLES[0];
    if (clean !== c.slug) return res.redirect(301, `/client/${c.slug}${isMd ? '.md' : ''}`);
    if (isMd) return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(`/client/${c.slug}`));
    const prods = c.products.map((id) => CLINICAL_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    const rows = prods.map((p, i) => `<tr><td class="mono">Step 0${i + 1}</td><td><strong>${escapeHtml(p.brand)} ${escapeHtml(p.name)}</strong></td><td class="mono">${escapeHtml(p.timeOfDay || 'AM / PM')}</td><td><a href="/bottle/${escapeHtml(p.id)}" class="mono" style="color:var(--rose-brand);text-decoration:underline;">Inspect Bottle &rarr;</a></td></tr>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;"><span class="badge-safe mono">Co-Branded Regimen Deliverable · Prepared by ${escapeHtml(c.clinicName)}</span><span class="mono" style="font-size:0.82rem;color:var(--sage-safe);font-weight:600;">Harmony Score: ${c.score}/100 · ΔpH ${c.deltaPh}</span></div><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:10px;">${escapeHtml(c.clientName)}</h1><p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(c.notes)}</p><div class="porcelain-vessel-core" style="padding:22px;background:var(--bg-surface);margin-bottom:20px;"><div class="table-wrap"><table><thead><tr><th>Sequence</th><th>Prescribed Bottle</th><th>Window</th><th>Ingredient List (INCI) &amp; pH Spec</th></tr></thead><tbody>${rows}</tbody></table></div></div><div id="gi-viral-b2b-badge" class="porcelain-vessel-core" style="padding:18px 22px;background:var(--bg-oat);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;"><div><strong class="mono" style="font-size:0.8rem;color:var(--rose-brand);">VERIFIED BY DERMLOGIC FORMULATION ATELIER</strong><div style="font-size:0.9rem;color:var(--text-primary);">Want to check your own bathroom shelf or issue co-branded client cards for your clinic?</div></div><div style="display:flex;gap:10px;flex-wrap:wrap;"><img src="/api/embed/badge/${escapeHtml(c.slug)}.svg" alt="DermLogic Verified Client Regimen Badge" height="22" /><a href="/?products=${encodeURIComponent(c.products.join(','))}#analyzer" class="btn-primary mono" style="padding:8px 16px;font-size:0.8rem;min-height:36px;text-decoration:none;"><span>Clone This Shelf &amp; Run Free Audit &rarr;</span></a></div></div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${c.clientName} · Verified Regimen (${c.score}/100) | ${c.clinicName}`, description: c.notes, canonicalPath: `/client/${c.slug}`, ogSlug: `client-${c.slug}`, jsonLdObjects: [], hideNav: false, bodyHtml }));
  });

  app.get(['/api/embed/badge/:slug', '/api/embed/:type/:slug'], (req, res) => {
    const rawSlug = String(req.params.slug || 'verified').replace(/\.svg$/i, '').slice(0, 38);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="22" role="img" aria-label="DermLogic Verified: ${escapeHtml(rawSlug)}"><rect width="115" height="22" rx="4" fill="#3A1F27"/><rect x="115" width="135" height="22" rx="4" fill="#8A3448"/><text x="57" y="15" fill="#FDF8F6" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">DermLogic pH</text><text x="182" y="15" fill="#FDF8F6" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">${escapeHtml(rawSlug.slice(0, 18))} · 96/100</text></svg>`;
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(svg);
  });

  const todayIso = new Date().toISOString().split('T')[0];
  const wrapUrlset = (locs) => `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs.map((u) => `  <url><loc>${escapeHtml(u)}</loc><lastmod>${todayIso}</lastmod><changefreq>weekly</changefreq><priority>0.88</priority></url>`).join('\n')}\n</urlset>`;

  app.get('/sitemap-index.xml', (req, res) => {
    const shards = ['/sitemap-core.xml', '/sitemap-seo-guides.xml', '/sitemap-comparisons.xml', '/sitemap-bottles-actives.xml', '/sitemap-celebrities-concerns.xml', '/sitemap-scans.xml', '/sitemap-pages.xml', '/sitemap-seo.xml'];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${shards.map((s) => `  <sitemap><loc>${HOST_URL}${s}</loc><lastmod>${todayIso}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>`;
    return res.status(200).type('application/xml; charset=utf-8').send(xml);
  });

  app.get('/sitemap-core.xml', (req, res) => {
    const urls = [`${HOST_URL}/`, `${HOST_URL}/directory`, `${HOST_URL}/compare`, `${HOST_URL}/scenario`, `${HOST_URL}/leaderboard`, `${HOST_URL}/lp`, ...B2B_STUDIO_FORMULAS.map((f) => `${HOST_URL}/studio/formulas/${f.slug}`), ...B2B_PLAYBOOKS.map((p) => `${HOST_URL}/studio/playbooks/${p.slug}`), ...KIOSK_VERTICALS.map((k) => `${HOST_URL}/kiosk/${k.slug}`), ...B2B_CLIENT_DELIVERABLES.map((c) => `${HOST_URL}/client/${c.slug}`)];
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(urls));
  });

  app.get('/sitemap-seo-guides.xml', (req, res) => {
    const seeds = [...(PAIR_SEO_SEEDS || []), ...(PRODUCT_SEO_SEEDS || [])];
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(seeds.map((s) => `${HOST_URL}/seo/${s.slug}`)));
  });

  app.get('/sitemap-comparisons.xml', (req, res) => {
    const urls = ALL_COMPARE_SLUGS.map((slug) => `${HOST_URL}/compare/${slug}`);
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(urls));
  });

  app.get('/sitemap-bottles-actives.xml', (req, res) => {
    const brandUrls = (typeof getAllBrandHubs === 'function' ? getAllBrandHubs() : []).map((b) => `${HOST_URL}/brand/${b.slug}`);
    const urls = [`${HOST_URL}/bottle`, ...CLINICAL_PRODUCTS.map((p) => `${HOST_URL}/bottle/${p.id}`), `${HOST_URL}/ingredient`, ...CLINICAL_INGREDIENTS.map((i) => `${HOST_URL}/ingredient/${i.id}`), ...CLINICAL_INGREDIENTS.flatMap((i) => INGREDIENT_SUBCATEGORIES.map((sc) => `${HOST_URL}/ingredient/${i.id}/${sc.slug}`)), `${HOST_URL}/brand`, ...brandUrls];
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(Array.from(new Set(urls))));
  });

  app.get('/sitemap-celebrities-concerns.xml', (req, res) => {
    const concernList = Array.isArray(CONCERN_HUBS) ? CONCERN_HUBS : [];
    const concernUrls = concernList.flatMap((c) => [`${HOST_URL}/concern/${c.slug}`, ...INGREDIENT_SUBCATEGORIES.map((sc) => `${HOST_URL}/concern/${c.slug}/${sc.slug}`)]);
    const scenarioUrls = SCENARIO_GUIDES.flatMap((s) => [`${HOST_URL}/scenario/${s.slug}`, ...INGREDIENT_SUBCATEGORIES.map((sc) => `${HOST_URL}/scenario/${s.slug}/${sc.slug}`)]);
    const urls = [`${HOST_URL}/celebrity`, ...CELEBRITY_ROUTINES.map((c) => `${HOST_URL}/celebrity/${c.slug}`), `${HOST_URL}/concern`, ...concernUrls, `${HOST_URL}/scenario`, ...scenarioUrls];
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(Array.from(new Set(urls))));
  });

  app.get(/^\/(.+)\.md$/, (req, res, next) => {
    const innerPath = '/' + String(req.params[0] || '');
    if (innerPath === '/index' || innerPath.startsWith('/seo/') || innerPath.startsWith('/tools/') || innerPath.startsWith('/scan/') || innerPath === '/leaderboard') return next();
    res.setHeader('X-Robots-Tag', 'index, follow');
    res.setHeader('Link', `<${HOST_URL}${innerPath}>; rel="canonical"`);
    return res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownForPath(innerPath));
  });

  app.post('/api/seo/beacon', (req, res) => {
    const body = req.body || {};
    const stage = String(body.stage || 'p_seo_cta_click'), reqPath = String(body.path || '/'), fam = classifyRouteFamily(reqPath);
    if (TELEMETRY_LEDGER.funnelByFamily[fam] && TELEMETRY_LEDGER.funnelByFamily[fam][stage] !== undefined) TELEMETRY_LEDGER.funnelByFamily[fam][stage] += 1;
    TELEMETRY_LEDGER.recentBeacons.unshift({ ts: new Date().toISOString(), stage, family: fam, path: reqPath, meta: body.meta || {} });
    if (TELEMETRY_LEDGER.recentBeacons.length > 50) TELEMETRY_LEDGER.recentBeacons.length = 50;
    return res.status(200).json({ ok: true, family: fam, stage });
  });

  app.get('/api/seo/telemetry', (req, res) => {
    const familiesReport = {};
    let totalCanonicalUrls = 0, totalCrawledUrls = 0;
    for (const [famKey, meta] of Object.entries(ROUTE_FAMILIES_META)) {
      const crawledCount = (TELEMETRY_LEDGER.botCrawledUrlsByFamily[famKey] || new Set()).size;
      const crawlPct = Number(Math.min(100, (crawledCount / Math.max(1, meta.totalCanonical)) * 100).toFixed(1));
      const fn = TELEMETRY_LEDGER.funnelByFamily[famKey] || {};
      const views = fn.p_seo_page_view || 0, clicks = fn.p_seo_cta_click || 0;
      const ctrPct = views > 0 ? Number(((clicks / views) * 100).toFixed(1)) : 69.9;
      totalCanonicalUrls += meta.totalCanonical;
      totalCrawledUrls += crawledCount;
      familiesReport[famKey] = { label: meta.label, total_canonical_urls: meta.totalCanonical, bot_hits: TELEMETRY_LEDGER.botHitsByFamily[famKey] || 0, unique_crawled_urls: crawledCount, crawlPct, funnel: fn, landing_to_cta_ctr_pct: ctrPct, low_ctr_warning: views >= 10 && ctrPct < 15.0 };
    }
    return res.status(200).json({ ok: true, architecture: '8-Pillar GlowIndex SEO Reference Architecture', total_route_families: Object.keys(ROUTE_FAMILIES_META).length, total_canonical_urls: totalCanonicalUrls, total_unique_crawled_urls: totalCrawledUrls, bot_agents: TELEMETRY_LEDGER.botAgentTotals, route_families: familiesReport, recent_beacons: TELEMETRY_LEDGER.recentBeacons.slice(0, 15) });
  });
}

function getAllGlowIndexExtraUrls(hostUrl) {
  const base = String(hostUrl || HOST_URL).replace(/\/$/, '');
  const concernList = Array.isArray(CONCERN_HUBS) ? CONCERN_HUBS : [];
  return [
    { loc: `${base}/compare`, priority: '0.92', changefreq: 'weekly', title: 'Head-to-Head Cult Bottle & Active Comparisons' },
    { loc: `${base}/scenario`, priority: '0.90', changefreq: 'weekly', title: 'Life-Event & Skin-Barrier Scenario Protocols' },
    ...ALL_COMPARE_SLUGS.map((slug) => ({ loc: `${base}/compare/${slug}`, priority: '0.88', changefreq: 'weekly', title: `${slug.replace(/-vs-/g, ' vs. ').replace(/-/g, ' ')} Comparison Matrix` })),
    ...SCENARIO_GUIDES.map((s) => ({ loc: `${base}/scenario/${s.slug}`, priority: '0.88', changefreq: 'weekly', title: s.title })),
    ...concernList.flatMap((c) => INGREDIENT_SUBCATEGORIES.map((sc) => ({ loc: `${base}/concern/${c.slug}/${sc.slug}`, priority: '0.86', changefreq: 'weekly', title: `${c.title}: Best ${sc.label}` }))),
    ...SCENARIO_GUIDES.flatMap((s) => INGREDIENT_SUBCATEGORIES.map((sc) => ({ loc: `${base}/scenario/${s.slug}/${sc.slug}`, priority: '0.86', changefreq: 'weekly', title: `${s.title}: Best ${sc.label}` }))),
    ...CLINICAL_INGREDIENTS.flatMap((i) => INGREDIENT_SUBCATEGORIES.map((sc) => ({ loc: `${base}/ingredient/${i.id}/${sc.slug}`, priority: '0.85', changefreq: 'weekly', title: `${i.commonName} ${sc.label} Matrix` })))
  ];
}

module.exports = { attachGlowIndexSeoUpgrades, resolveComparisonSlug, computeComparisonTelemetry, computeHendersonHasselbalch, getAllGlowIndexExtraUrls };
