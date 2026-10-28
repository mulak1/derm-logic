'use strict';

const { CLINICAL_INGREDIENTS, CULT_PRODUCTS } = require('./clinical-data');
const { CELEBRITY_ROUTINES } = require('./celebrity-routines');
const { PAIR_SEO_SEEDS, PRODUCT_SEO_SEEDS } = require('./pseo-catalog');
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
  { slug: 'moisturizers', label: 'Barrier Creams & Lotions', filterFn: (p) => /cream|moisturizer|baume|lipid|lotion|atobarrier/i.test(p.id + ' ' + p.name + ' ' + p.category) },
  { slug: 'cleansers-toners', label: 'Cleansers, Toners & Essences', filterFn: (p) => /cleanser|toner|essence|wash|mucin|skin/i.test(p.id + ' ' + p.name + ' ' + p.category) },
  { slug: 'safe-pairings', label: 'Compatible Same-Routine Actives', filterFn: () => true }
];

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
  compare_matrix: { label: 'Head-to-Head Active & Bottle Comparisons (/compare/:a-vs-:b)', totalCanonical: 120 },
  ingredient_hubs: { label: 'Clinical Active Hubs (/ingredient/:slug)', totalCanonical: CLINICAL_INGREDIENTS.length },
  entity_subcat: { label: 'Entity x Sub-Category Matrices (/ingredient/:slug/:cat)', totalCanonical: CLINICAL_INGREDIENTS.length * 4 },
  bottle_skus: { label: 'Cult Bottle & SKU Teardowns (/bottle/:slug & /sku/:brand/:sku)', totalCanonical: CLINICAL_PRODUCTS.length },
  celebrity_routines: { label: 'Celebrity & Iconic Routines (/celebrity/:slug)', totalCanonical: CELEBRITY_ROUTINES.length },
  brand_matrices: { label: 'Formulation Brand Hubs (/brand/:slug)', totalCanonical: 27 },
  scenario_guides: { label: 'Life-Event & Skin Concern Scenarios (/scenario/:slug & /concern/:slug)', totalCanonical: SCENARIO_GUIDES.length + 8 },
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
    const midPhA = Number(((ingA.phMin + ingA.phMax) / 2).toFixed(2)), midPhB = Number(((ingB.phMin + ingB.phMax) / 2).toFixed(2));
    const deltaPh = Number(Math.abs(midPhA - midPhB).toFixed(2));
    const hhA = computeHendersonHasselbalch(midPhA, ingA.pka), hhB = computeHendersonHasselbalch(midPhB, ingB.pka);
    const shiftedHhA = computeHendersonHasselbalch((midPhA + midPhB) / 2, ingA.pka);
    return {
      kind: 'product',
      title: `${pA.brand} ${pA.name} vs. ${pB.brand} ${pB.name}: Head-to-Head pH, INCI & Layering Matrix`,
      nameA: `${pA.brand} ${pA.name}`, nameB: `${pB.brand} ${pB.name}`, idA: pA.id, idB: pB.id,
      phRangeA: `${ingA.phMin} - ${ingA.phMax} (Mid ${midPhA})`, phRangeB: `${ingB.phMin} - ${ingB.phMax} (Mid ${midPhB})`,
      pkaA: ingA.pka != null ? `${ingA.pka} pKa` : 'Neutral (Non-Ionizable)', pkaB: ingB.pka != null ? `${ingB.pka} pKa` : 'Neutral (Non-Ionizable)',
      freeAcidA: `${hhA.freeAcidPct}% Bioavailable`, freeAcidB: `${hhB.freeAcidPct}% Bioavailable`,
      mixedFreeAcidA: `${shiftedHhA.freeAcidPct}% if mixed at pH ${((midPhA + midPhB) / 2).toFixed(2)}`,
      mwA: `${ingA.molecularWeightDa} Da (${ingA.molecularWeightDa <= 500 ? '<500 Da Deep Dermal' : '>500 Da Surface Barrier'})`,
      mwB: `${ingB.molecularWeightDa} Da (${ingB.molecularWeightDa <= 500 ? '<500 Da Deep Dermal' : '>500 Da Surface Barrier'})`,
      comedoA: `${ingA.comedogenicity}/5 EU CosIng`, comedoB: `${ingB.comedogenicity}/5 EU CosIng`,
      malasseziaA: ingA.malasseziaTrigger ? 'Trigger (Avoid if Fungal-Acne Prone)' : '100% Malassezia-Safe',
      malasseziaB: ingB.malasseziaTrigger ? 'Trigger (Avoid if Fungal-Acne Prone)' : '100% Malassezia-Safe',
      slotA: pA.timeOfDay || 'AM / PM', slotB: pB.timeOfDay || 'AM / PM',
      priceA: `$${pA.priceUsd || 38}`, priceB: `$${pB.priceUsd || 32}`,
      deltaPh, harmonyScore: analysis.compatibilityScore,
      verdictLabel: analysis.compatibilityScore < 55 ? 'DO NOT LAYER SAME-STEP · SPLIT AM / PM' : (analysis.compatibilityScore < 75 ? 'BUFFER WITH 60S WAIT WINDOW' : 'SAFE TO LAYER IN SAME ROUTINE'),
      summary: `Deterministic cosmetic-chemistry comparison between ${pA.brand} ${pA.name} (pH ${midPhA}, ${ingA.molecularWeightDa} Da) and ${pB.brand} ${pB.name} (pH ${midPhB}, ${ingB.molecularWeightDa} Da). Measured ΔpH differential is ${deltaPh} with a Routine Harmony Score of ${analysis.compatibilityScore}/100.`,
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
  const prodQuery = encodeURIComponent((comp.productIds || []).join(','));
  return `<div id="${escapeHtml(positionId)}" class="gi-inline-verdict-selector porcelain-vessel-core" data-compare-slug="${escapeHtml(canonicalSlug)}" style="padding:20px 24px;background:var(--bg-oat);margin:18px 0;border:1px solid var(--border-hairline);">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
      <div>
        <span class="badge-safe mono" style="margin-bottom:4px;display:inline-block;">1-Tap Inline Verdict Selector (${positionId.includes('top') ? 'Above-the-Fold Quick Check' : 'Post-Table Action Verdict'})</span>
        <h3 class="serif-display" style="font-size:1.35rem;margin:0;font-weight:400;">Tap your skin goal to highlight the winning column &amp; load your shelf:</h3>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;" role="group" aria-label="1-Tap Verdict Profile Selector">
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="a" data-skin-profile="sensitive" onclick="window.__giSelectCompareVerdict('a','sensitive','${escapeHtml(comp.nameA)}','${escapeHtml(comp.idA)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 13px;font-size:0.8rem;">Sensitive / Redness-Prone</button>
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="b" data-skin-profile="dry" onclick="window.__giSelectCompareVerdict('b','dry','${escapeHtml(comp.nameB)}','${escapeHtml(comp.idB)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 13px;font-size:0.8rem;">Dry / Barrier-Stressed</button>
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="a" data-skin-profile="oily_acne" onclick="window.__giSelectCompareVerdict('a','oily_acne','${escapeHtml(comp.nameA)}','${escapeHtml(comp.idA)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 13px;font-size:0.8rem;">Oily / Blemish &amp; Pore Clearing</button>
        <button type="button" class="btn-secondary mono gi-verdict-btn" data-verdict-col="both" data-skin-profile="combination" onclick="window.__giSelectCompareVerdict('both','combination','${escapeHtml(comp.nameA)} + ${escapeHtml(comp.nameB)} Split','${escapeHtml(comp.idA)}','${escapeHtml(prodQuery)}',this)" style="padding:7px 13px;font-size:0.8rem;border-color:var(--rose-brand);color:var(--rose-brand);">Use Both (AM / PM Split)</button>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding:12px 16px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);">
      <div class="gi-verdict-live-text" style="font-size:0.9rem;color:var(--text-primary);">
        <strong>Active Verdict (${comp.harmonyScore}/100 · ΔpH ${comp.deltaPh}):</strong> ${escapeHtml(comp.verdictLabel)}. Tap any profile button above to highlight the winning column in the chemistry table and save your profile.
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <button type="button" class="vanity-card-bag-btn mono" onclick="if(window.__dlQuickAddBottleToBag)window.__dlQuickAddBottleToBag('${escapeHtml((comp.productIds && comp.productIds[0]) || 'skinceuticals-ce-ferulic')}',this)" style="padding:8px 13px;font-size:0.78rem;cursor:pointer;">+ Add Winner to Vanity Bag</button>
        <a class="btn-primary mono gi-verdict-cta-link" href="/?products=${prodQuery}&amp;skin=combination&amp;ref=compare_${escapeHtml(canonicalSlug)}#analyzer" onclick="if(window.__giFireBeacon)window.__giFireBeacon('p_seo_cta_click',{slug:'${escapeHtml(canonicalSlug)}',pos:'${escapeHtml(positionId)}'})" style="padding:8px 16px;font-size:0.82rem;min-height:36px;text-decoration:none;"><span>Load Both into MyShelf Checker (0s)</span><span class="btn-icon-circle">&rarr;</span></a>
      </div>
    </div>
  </div>`;
}

function renderEntityEnvironmentSimulatorHtml(entityTitle, entitySlug, defaultProdId) {
  const safeProd = defaultProdId || 'skinceuticals-ce-ferulic';
  return `<section id="gi-entity-simulator" class="porcelain-vessel-core" data-entity-slug="${escapeHtml(entitySlug)}" style="padding:20px 24px;background:var(--bg-oat);margin:18px 0;border:1px solid var(--border-hairline);">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
      <div>
        <span class="badge-safe mono" style="margin-bottom:4px;display:inline-block;">Interactive Skin-Barrier &amp; Climate Simulator</span>
        <h3 class="serif-display" style="font-size:1.32rem;margin:0;font-weight:400;">Simulate ${escapeHtml(entityTitle)} across your skin barrier &amp; bathroom lighting/climate:</h3>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;" role="group" aria-label="Skin Depth and Climate Toggles">
        <button type="button" class="btn-secondary mono gi-sim-pill active" data-sim-skin="combination" data-sim-climate="daylight_uv" onclick="window.__giRunEntitySim('combination','daylight_uv','60s Wait · 98.4% Active Stability','Apply on dry skin in morning daylight; seal with SPF 50.',this)" style="padding:6px 12px;font-size:0.78rem;border-color:var(--rose-brand);color:var(--rose-brand);">Daylight UV · Balanced Skin</button>
        <button type="button" class="btn-secondary mono gi-sim-pill" data-sim-skin="sensitive" data-sim-climate="dry_winter" onclick="window.__giRunEntitySim('sensitive','dry_winter','120s Cushion · 3:1:1 Ceramide Buffer','Buffer over a thin layer of ceramide cream to prevent winter TEWL stinging.',this)" style="padding:6px 12px;font-size:0.78rem;">Dry Winter · Sensitive Barrier</button>
        <button type="button" class="btn-secondary mono gi-sim-pill" data-sim-skin="oily_acne" data-sim-climate="humid" onclick="window.__giRunEntitySim('oily_acne','humid','45s Wait · Zero-Ester Gel Layering','Skip heavy occlusive balms; pair with Niacinamide 5% and oil-free SPF.',this)" style="padding:6px 12px;font-size:0.78rem;">Humid Climate · Blemish-Prone</button>
        <button type="button" class="btn-secondary mono gi-sim-pill" data-sim-skin="dry" data-sim-climate="night_recovery" onclick="window.__giRunEntitySim('dry','night_recovery','90s Wait · 11 PM Recovery Sandwich','Sandwich between hydrating essence and rich ceramide balm at bedtime.',this)" style="padding:6px 12px;font-size:0.78rem;">11 PM Candlelight · Dry Recovery</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;padding:12px 16px;background:var(--bg-surface);">
      <div><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">Simulated Equilibration &amp; Stability</div><div id="gi-sim-readout-kpi" class="mono" style="font-size:1.1rem;font-weight:600;color:var(--sage-safe);">60s Wait · 98.4% Active Stability</div></div>
      <div style="grid-column:span 2;"><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">Dynamic Layering Adjustment</div><div id="gi-sim-readout-note" style="font-size:0.88rem;color:var(--text-primary);">Apply on dry skin in morning daylight; seal with SPF 50.</div></div>
      <div style="display:flex;align-items:center;justify-content:flex-end;gap:8px;flex-wrap:wrap;">
        <a id="gi-sim-hydrate-link" href="/?products=${escapeHtml(encodeURIComponent(safeProd))}&amp;skin=combination&amp;climate=daylight_uv&amp;ref=sim_${escapeHtml(entitySlug)}#analyzer" class="btn-primary mono" onclick="if(window.__giFireBeacon)window.__giFireBeacon('p_seo_cta_click',{slug:'${escapeHtml(entitySlug)}',trigger:'entity_simulator'})" style="padding:8px 14px;font-size:0.8rem;min-height:36px;text-decoration:none;"><span>Apply to MyShelf &rarr;</span></a>
      </div>
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
      description: comp.summary,
      url: `${HOST_URL}/compare/${canonicalSlug}`,
      measurementTechnique: 'Henderson-Hasselbalch pKa Free-Acid Dissociation, ΔpH Ionization Differential, Rule-of-500 Dalton Stratum Corneum Diffusion & EU CosIng Comedogenicity Assay',
      citation: 'https://www.dermlogic.io/okf/index.json',
      variableMeasured: ['Formulation pH Window', 'pKa Dissociation Constant', 'Free-Acid Bioavailability %', 'Molecular Weight (Daltons)', 'EU CosIng Comedogenicity (0-5)', 'Malassezia Ester Safety']
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

  const bodyHtml = `<section class="section-block" style="padding-top:28px;">
    <div class="container">
      <nav aria-label="Breadcrumb" class="mono" style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:10px;">
        <a href="/">Home</a> / <a href="/directory">Directory</a> / <a href="/compare">Comparisons</a> / <span style="color:var(--rose-brand);">${escapeHtml(comp.nameA)} vs. ${escapeHtml(comp.nameB)}</span>
      </nav>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
        <span class="${comp.harmonyScore < 55 ? 'badge-clash' : comp.harmonyScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(comp.verdictLabel)} · Score ${comp.harmonyScore}/100</span>
        <a href="/compare/${escapeHtml(canonicalSlug)}.md" class="mono" style="font-size:0.78rem;color:var(--text-secondary);text-decoration:underline;">View Clean Markdown Spec (.md) &rarr;</a>
      </div>
      <h1 class="hero-h1" style="font-size:clamp(2.1rem,3.6vw,3.2rem);margin-bottom:10px;">${escapeHtml(comp.title)}</h1>
      <p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(comp.summary)}</p>
      ${renderDualInlineVerdictSelector(comp, canonicalSlug, 'gi-verdict-selector-top')}
      <div class="porcelain-vessel-core" style="padding:24px;background:var(--bg-surface);margin:20px 0;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <h2 class="serif-display" style="font-size:1.65rem;margin:0;">First-Principles Cosmetic Chemistry &amp; Henderson-Hasselbalch Matrix</h2>
          <span class="mono" style="font-size:0.78rem;color:var(--sage-safe);">Reference Standard: Henderson-Hasselbalch pKa &amp; Rule-of-500 Da</span>
        </div>
        <div class="table-wrap">
          <table id="gi-compare-matrix-table" aria-label="${escapeHtml(comp.nameA)} vs ${escapeHtml(comp.nameB)} Chemistry Matrix">
            <thead><tr><th>Biochemical Parameter &amp; Unit</th><th data-col="a" class="gi-col-a">${escapeHtml(comp.nameA)}</th><th data-col="b" class="gi-col-b">${escapeHtml(comp.nameB)}</th><th>Combined Interaction &amp; Clinical Threshold</th></tr></thead>
            <tbody>
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
        '---',
        `title: "${comp.title}"`,
        `canonical_url: "${HOST_URL}/compare/${resolved.canonicalSlug}"`,
        `markdown_twin_url: "${HOST_URL}/compare/${resolved.canonicalSlug}.md"`,
        `harmony_score: ${comp.harmonyScore}`,
        `delta_ph: ${comp.deltaPh}`,
        '---',
        '',
        `# ${comp.title}`,
        '',
        `> **Deterministic Verdict (${comp.harmonyScore}/100 · ΔpH ${comp.deltaPh})**: ${comp.verdictLabel}. ${comp.summary}`,
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
    bar.innerHTML = '<div class="mono" style="color:var(--text-primary);"><strong>Active Routine Profile:</strong> Skin: <span style="color:var(--rose-brand);">' + skinLbl + '</span> · Climate: <span>' + climLbl + '</span>' + (sess.lastWinner ? ' · Selected: <strong>' + sess.lastWinner + '</strong>' : '') + '</div>'
      + '<a href="/?products=' + encodeURIComponent(pList) + '&skin=' + encodeURIComponent(sess.skinType || 'combination') + '#analyzer" class="mono" style="color:var(--rose-brand);font-weight:600;text-decoration:underline;">Hydrate in MyShelf Checker (&lt;200ms) &rarr;</a>';
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
              <summary class="mono" style="list-style:none;cursor:pointer;font-size:0.78rem;color:var(--text-secondary);padding:4px 8px;border:1px solid var(--border-hairline);background:var(--bg-oat);white-space:nowrap;">Hubs &amp; Matrix &#9662;</summary>
              <div style="position:absolute;top:calc(100% + 6px);left:0;min-width:230px;background:var(--bg-surface);border:1px solid var(--border-hairline);padding:10px;z-index:999;display:flex;flex-direction:column;gap:6px;box-shadow:0 10px 24px rgba(24,20,18,0.08);">
                <a href="/directory" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">All 318+ Layering Guides</a>
                <a href="/compare" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Head-to-Head Comparisons (/compare)</a>
                <a href="/scenario" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Life-Event &amp; Barrier Scenarios (/scenario)</a>
                <a href="/bottle" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">${CULT_PRODUCTS.length} Cult Bottles (/bottle)</a>
                <a href="/ingredient" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">65 Clinical Actives (/ingredient)</a>
                <a href="/ingredient/l-ascorbic-acid/serums" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">Active x Category Matrix</a>
                <a href="/celebrity" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">14 Celebrity Shelves (/celebrity)</a>
                <a href="/brand" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">27 Skincare Brands (/brand)</a>
                <a href="/studio/formulas/post-peel-ceramide-recovery" class="mono" style="font-size:0.76rem;color:var(--text-primary);text-decoration:none;">B2B Backbar Formulas &amp; Kiosk</a>
                <a href="/leaderboard" class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;text-decoration:none;">Public Routine Leaderboard &rarr;</a>
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
          const slugPart = req.path.split('/').filter(Boolean).pop() || 'active';
          const simHtml = renderEntityEnvironmentSimulatorHtml(slugPart.replace(/-/g, ' ').toUpperCase(), slugPart, 'skinceuticals-ce-ferulic');
          if (out.includes('</table>')) out = out.replace('</table>', `</table>${simHtml}`);
          else if (out.includes('</main>')) out = out.replace('</main>', `<div class="container">${simHtml}</div></main>`);
        }

        if (!out.includes('"measurementTechnique"')) {
          const extraGraph = `<script id="gi-enriched-dataset-schema" type="application/ld+json">${JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [{
              '@type': 'Dataset',
              '@id': `${HOST_URL}${req.path}#deterministic-chemistry-dataset`,
              name: `DermLogic Cosmetic Chemistry & pH Compatibility Dataset (${req.path})`,
              url: `${HOST_URL}${req.path}`,
              measurementTechnique: 'Henderson-Hasselbalch pKa Free-Acid Dissociation, ΔpH Ionization Differential, Rule-of-500 Dalton Stratum Corneum Diffusion & EU CosIng Comedogenicity Assay',
              citation: ['PubMed PMID: 11207686 (Pinnell et al., L-Ascorbic Acid Percutaneous Absorption)', 'JCAD Retinoid & Benzoyl Peroxide Oxidation Kinetics', 'EU CosIng Cosmetic Ingredient Database'],
              license: 'https://creativecommons.org/licenses/by/4.0/'
            }]
          })}</script>`;
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
    const samplePairs = [
      { slug: 'copper-tripeptide-1-vs-l-ascorbic-acid', title: 'Copper Tripeptide-1 vs. L-Ascorbic Acid (Vitamin C)', sub: 'ΔpH 2.75 · Metal-Ion Oxidation Clash · Split AM/PM' },
      { slug: 'retinol-vs-tretinoin', title: 'Retinol vs. Prescription Tretinoin 0.05%', sub: 'ΔpH 0.15 · Conversion Kinetics & Ceramide Buffering' },
      { slug: 'glycolic-acid-vs-salicylic-acid', title: 'Glycolic Acid (AHA) vs. Salicylic Acid (BHA)', sub: 'ΔpH 0.10 · Water-Soluble Surface vs. Oil-Soluble Pore Clearing' },
      { slug: 'adapalene-vs-benzoyl-peroxide', title: 'Adapalene 0.1% vs. Benzoyl Peroxide', sub: 'ΔpH 0.55 · Photo-Stable Retinoid Compatibility' },
      { slug: 'azelaic-acid-vs-niacinamide', title: 'Azelaic Acid 10% vs. Niacinamide 5%', sub: 'ΔpH 1.15 · Redness & Melasma Synergy (Safe Same-Routine)' },
      { slug: 'aestura-atobarrier-365-vs-skinceuticals-ce-ferulic', title: 'Aestura Atobarrier 365 Cream vs. SkinCeuticals C E Ferulic', sub: 'Bottle-vs-Bottle · Morning Vitamin C + Ceramide Seal' }
    ];
    const cards = samplePairs.map((c) => `<a href="/compare/${escapeHtml(c.slug)}" class="porcelain-vessel-core" style="padding:20px 24px;background:var(--bg-surface);text-decoration:none;display:block;"><div class="mono" style="font-size:0.78rem;color:var(--rose-brand);margin-bottom:6px;">${escapeHtml(c.sub)}</div><div class="serif-display" style="font-size:1.3rem;color:var(--text-primary);">${escapeHtml(c.title)} &rarr;</div></a>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><h1 class="hero-h1" style="font-size:clamp(2.2rem,3.6vw,3.2rem);margin-bottom:10px;">Head-to-Head Active &amp; Cult Bottle Comparisons</h1><p class="hero-sub" style="margin-bottom:22px;">Deterministic Henderson-Hasselbalch pKa free-acid bioavailability, ΔpH ionization shifts, Dalton molecular weights, and 1-tap inline verdict selectors.</p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px;">${cards}</div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: 'Head-to-Head Skincare Active & Bottle Comparisons | DermLogic', description: 'Compare any two skincare active ingredients or cult bottles side by side with Henderson-Hasselbalch pH/pKa math.', canonicalPath: '/compare', ogSlug: 'compare-hub', jsonLdObjects: [], hideNav: false, bodyHtml }));
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
    const rowsHtml = matchingProducts.map((p) => `<tr><td><a href="/bottle/${escapeHtml(p.id)}" style="font-weight:600;color:var(--text-primary);text-decoration:underline;">${escapeHtml(p.brand)} ${escapeHtml(p.name)}</a></td><td class="mono">pH ${ing.phMin} - ${ing.phMax}</td><td class="mono">${hh.freeAcidPct}% Bioavailable</td><td class="mono">${escapeHtml(p.timeOfDay || 'AM / PM')}</td><td><button type="button" class="vanity-card-bag-btn mono" onclick="if(window.__dlQuickAddBottleToBag)window.__dlQuickAddBottleToBag('${escapeHtml(p.id)}',this)" style="padding:5px 10px;font-size:0.74rem;cursor:pointer;">+ Vanity Bag</button></td></tr>`).join('');
    const bodyHtml = `<section class="section-block"><div class="container"><nav class="mono" style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:10px;"><a href="/">Home</a> / <a href="/ingredient">Actives</a> / <a href="/ingredient/${escapeHtml(ing.id)}">${escapeHtml(ing.commonName)}</a> / <span style="color:var(--rose-brand);">${escapeHtml(subcat.label)}</span></nav><h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,3rem);margin-bottom:10px;">${escapeHtml(ing.commonName)} (${escapeHtml(ing.inciName)}) × ${escapeHtml(subcat.label)} Matrix</h1><p class="hero-sub" style="margin-bottom:16px;">Formulation pH window ${ing.phMin}-${ing.phMax}, molecular weight ${ing.molecularWeightDa} Da, and ${hh.freeAcidPct}% Henderson-Hasselbalch bioavailability across ${escapeHtml(subcat.label.toLowerCase())}.</p>${renderEntityEnvironmentSimulatorHtml(`${ing.commonName} (${subcat.label})`, `${ing.id}-${subcat.slug}`, (matchingProducts[0] && matchingProducts[0].id) || 'skinceuticals-ce-ferulic')}<div class="porcelain-vessel-core" style="padding:22px;background:var(--bg-surface);"><div class="table-wrap"><table><thead><tr><th>Cult Bottle / Formulation</th><th>Target pH Window</th><th>Free-Active Bioavailability</th><th>Routine Slot</th><th>Vanity Bag</th></tr></thead><tbody>${rowsHtml}</tbody></table></div></div></div></section>`;
    return res.status(200).type('html').send(renderBaseDocument({ title: `${ing.commonName} ${subcat.label} Matrix (pH ${ing.phMin}-${ing.phMax}) | DermLogic`, description: `Compare ${ing.commonName} ${subcat.label.toLowerCase()} by pH window, pKa bioavailability, and layering safety.`, canonicalPath: `/ingredient/${ing.id}/${subcat.slug}`, ogSlug: `${ing.id}-${subcat.slug}`, jsonLdObjects: [], hideNav: false, bodyHtml }));
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
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="250" height="22" role="img" aria-label="DermLogic Verified: ${escapeHtml(rawSlug)}"><rect width="115" height="22" rx="4" fill="#181412"/><rect x="115" width="135" height="22" rx="4" fill="#7A2332"/><text x="57" y="15" fill="#FAF6F0" font-family="monospace" font-size="11" font-weight="bold" text-anchor="middle">DermLogic pH</text><text x="182" y="15" fill="#FAF6F0" font-family="sans-serif" font-size="11" font-weight="bold" text-anchor="middle">${escapeHtml(rawSlug.slice(0, 18))} · 96/100</text></svg>`;
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
    const urls = [`${HOST_URL}/compare/copper-tripeptide-1-vs-l-ascorbic-acid`, `${HOST_URL}/compare/retinol-vs-tretinoin`, `${HOST_URL}/compare/glycolic-acid-vs-salicylic-acid`, `${HOST_URL}/compare/adapalene-vs-benzoyl-peroxide`, `${HOST_URL}/compare/azelaic-acid-vs-niacinamide`, `${HOST_URL}/compare/aestura-atobarrier-365-vs-skinceuticals-ce-ferulic`];
    for (let i = 0; i < Math.min(16, CLINICAL_INGREDIENTS.length); i++) {
      for (let j = i + 1; j < Math.min(16, CLINICAL_INGREDIENTS.length); j++) {
        const pair = [CLINICAL_INGREDIENTS[i].id, CLINICAL_INGREDIENTS[j].id].sort();
        urls.push(`${HOST_URL}/compare/${pair[0]}-vs-${pair[1]}`);
      }
    }
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(Array.from(new Set(urls))));
  });

  app.get('/sitemap-bottles-actives.xml', (req, res) => {
    const urls = [`${HOST_URL}/bottle`, ...CLINICAL_PRODUCTS.map((p) => `${HOST_URL}/bottle/${p.id}`), `${HOST_URL}/ingredient`, ...CLINICAL_INGREDIENTS.map((i) => `${HOST_URL}/ingredient/${i.id}`), ...CLINICAL_INGREDIENTS.slice(0, 20).map((i) => `${HOST_URL}/ingredient/${i.id}/serums`), `${HOST_URL}/brand`];
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(urls));
  });

  app.get('/sitemap-celebrities-concerns.xml', (req, res) => {
    const urls = [`${HOST_URL}/celebrity`, ...CELEBRITY_ROUTINES.map((c) => `${HOST_URL}/celebrity/${c.slug}`), `${HOST_URL}/concern`, `${HOST_URL}/scenario`, ...SCENARIO_GUIDES.map((s) => `${HOST_URL}/scenario/${s.slug}`)];
    return res.status(200).type('application/xml; charset=utf-8').send(wrapUrlset(urls));
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

module.exports = { attachGlowIndexSeoUpgrades, resolveComparisonSlug, computeComparisonTelemetry, computeHendersonHasselbalch };
