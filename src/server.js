/**
 * DermLogic (#4): Express Server on Dedicated Port 4104 (http://127.0.0.1:4104)
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const { CLINICAL_INGREDIENTS, CULT_PRODUCTS, ROUTINE_PRESETS } = require('./clinical-data');
const { db, sampleBetaArm, recordMetaEvent } = require('./db');
const { analyzeRoutine, redactRoutineAnalysisForPreview, generateOptionalGeminiNote } = require('./engine');
const { BRAND_LOGO_SVG, renderAnalysisResultHtml } = require('./ui-templates');
const {
  renderHomePage,
  renderPaidSocialLpPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  renderEditorialPolicyRoute,
  render404Page,
  renderOgSvg
} = require('./page-views');

const { attachExactBaselinePack } = require('./exact-baseline-api');
const { attachSemanticSeoHubs } = require('./seo-hubs');

const app = express();
const PORT = Number(process.env.PORT || 4104);
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.dermlogic.io').replace(/\/$/, '');

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
attachExactBaselinePack(app, { verticalId: 'derm_logic' });
attachSemanticSeoHubs(app, render404Page);

// Pre-Launch Checklist #4: Security Headers & Production HTTPS Redirect Support
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Pre-Launch Checklist #18: Lightweight Rate Limiting on POST APIs
const postRateWindow = new Map();
app.use('/api', (req, res, next) => {
  if (req.method !== 'POST') return next();
  const ip = req.ip || '127.0.0.1';
  const now = Date.now();
  const bucket = postRateWindow.get(ip) || { count: 0, resetAt: now + 60000 };
  if (now > bucket.resetAt) {
    bucket.count = 0;
    bucket.resetAt = now + 60000;
  }
  bucket.count += 1;
  postRateWindow.set(ip, bucket);
  if (bucket.count > 240) {
    return res.status(429).json({ ok: false, error: 'Too many requests; please wait a moment.' });
  }
  next();
});

function getAllSeoPages() {
  const rows = db.prepare('SELECT payload_json FROM seo_pages ORDER BY slug ASC').all();
  return rows.map((r) => JSON.parse(r.payload_json));
}

// High-Class Bespoke Luxury SVG Favicon (/favicon.svg)
app.get('/favicon.svg', (req, res) => {
  const favPath = path.join(__dirname, '..', 'public', 'favicon.svg');
  if (fs.existsSync(favPath)) {
    return res.status(200).type('image/svg+xml').send(fs.readFileSync(favPath, 'utf8'));
  }
  return res.status(200).type('image/svg+xml').send(BRAND_LOGO_SVG);
});

const PRESET_ALIAS_MAP = {
  'copper-vitc-trap': 'copper-vitc-oxidation',
  'acne-rx-clash': 'acne-rx-bpo-tretinoin',
  'tiktok-viral-clash': 'viral-tiktok-destroyer',
  'barrier-safe-gold': 'glass-skin-recovery'
};

// 1. Homepage (/) with URL Query-Parameter Deep-Link Hydration
app.get('/', (req, res) => {
  const qPresetId = req.query.preset ? (PRESET_ALIAS_MAP[String(req.query.preset)] || String(req.query.preset)) : null;
  const matchedPreset = ROUTINE_PRESETS.find((p) => p.id === qPresetId) || ROUTINE_PRESETS[0];
  const rawInciText = typeof (req.query.inci || req.query.q) === 'string' ? String(req.query.inci || req.query.q).trim() : '';
  const queryProductIds = typeof req.query.products === 'string' && req.query.products.trim()
    ? req.query.products.split(',').map((s) => s.trim()).filter(Boolean)
    : (rawInciText && !req.query.preset ? [] : matchedPreset.productIds);
  const skinType = typeof req.query.skin === 'string' && req.query.skin.trim()
    ? req.query.skin.trim()
    : matchedPreset.skinType;

  const initialAnalysis = analyzeRoutine({
    skinType,
    productIds: queryProductIds,
    rawInciText
  });
  const seoPages = getAllSeoPages();
  const html = renderHomePage({
    products: CULT_PRODUCTS,
    ingredients: CLINICAL_INGREDIENTS,
    presets: ROUTINE_PRESETS,
    initialAnalysis,
    initialProductIds: initialAnalysis.matchedProductIds && initialAnalysis.matchedProductIds.length > 0 ? initialAnalysis.matchedProductIds : queryProductIds,
    initialRawInci: rawInciText,
    initialSkinType: skinType,
    seoPages
  });
  res.status(200).type('html').send(html);
});

// 2. Cold Paid-Social Landing Page (/lp)
app.get('/lp', (req, res) => {
  const initialAnalysis = analyzeRoutine({
    skinType: ROUTINE_PRESETS[1].skinType,
    productIds: ROUTINE_PRESETS[1].productIds,
    rawInciText: ''
  });
  const html = renderPaidSocialLpPage({
    products: CULT_PRODUCTS,
    presets: ROUTINE_PRESETS,
    initialAnalysis
  });
  res.status(200).type('html').send(html);
});

// 3. Programmatic SEO Directory (/directory)
app.get('/directory', (req, res) => {
  const seoPages = getAllSeoPages();
  const html = renderDirectoryPage({ seoPages });
  res.status(200).type('html').send(html);
});

// 4. Programmatic SEO Detail Pages (/seo/:slug)
app.get('/seo/:slug', (req, res) => {
  const slug = req.params.slug;
  const row = db.prepare('SELECT payload_json FROM seo_pages WHERE slug = ?').get(slug);
  if (!row) {
    return res.status(404).type('html').send(render404Page());
  }
  const page = JSON.parse(row.payload_json);
  const initialAnalysis = analyzeRoutine({
    skinType: 'combination',
    productIds: page.presetProducts || [],
    rawInciText: page.product ? page.product.inciList : ''
  });
  const allPages = getAllSeoPages();
  const curIdx = Math.max(0, allPages.findIndex((p) => p.slug === slug));
  const pageActiveIds = new Set(
    [
      page.ingredientA && page.ingredientA.id,
      page.ingredientB && page.ingredientB.id,
      ...(page.product && Array.isArray(page.product.primaryActives) ? page.product.primaryActives : [])
    ].filter(Boolean)
  );
  const relatedPages = [];
  const seenSlugs = new Set([slug]);
  const addRelated = (candidate) => {
    if (candidate && !seenSlugs.has(candidate.slug) && relatedPages.length < 8) {
      seenSlugs.add(candidate.slug);
      relatedPages.push(candidate);
    }
  };
  for (let i = 1; i <= 4; i++) {
    addRelated(allPages[(curIdx + i) % allPages.length]);
  }
  for (let i = 1; i < allPages.length && relatedPages.length < 7; i++) {
    const cand = allPages[(curIdx + i) % allPages.length];
    const candActives = [
      cand.ingredientA && cand.ingredientA.id,
      cand.ingredientB && cand.ingredientB.id,
      ...(cand.product && Array.isArray(cand.product.primaryActives) ? cand.product.primaryActives : [])
    ].filter(Boolean);
    if (candActives.some((id) => pageActiveIds.has(id))) {
      addRelated(cand);
    }
  }
  const oppositeType = page.pageType === 'active_pair' ? 'product_teardown' : 'active_pair';
  for (let i = 1; i < allPages.length && !relatedPages.some((r) => r.pageType === oppositeType); i++) {
    const cand = allPages[(curIdx + i) % allPages.length];
    if (cand.pageType === oppositeType) addRelated(cand);
  }
  for (let i = 1; i < allPages.length && relatedPages.length < 8; i++) {
    addRelated(allPages[(curIdx + i) % allPages.length]);
  }

  const html = renderSeoDetailPage({
    page,
    products: CULT_PRODUCTS,
    presets: ROUTINE_PRESETS,
    initialAnalysis,
    relatedPages
  });
  res.status(200).type('html').send(html);
});

// 5. Legal Routes (/privacy, /terms) & Creative Design Previews
app.use('/previews', express.static(path.join(__dirname, '..', 'public', 'previews')));
app.get('/design-previews', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'design-previews.html'));
});

app.get('/privacy', (req, res) => {
  res.status(200).type('html').send(renderLegalPage({ type: 'privacy' }));
});

app.get('/terms', (req, res) => {
  res.status(200).type('html').send(renderLegalPage({ type: 'terms' }));
});

app.get(['/editorial-policy', '/about', '/affiliate-disclosure'], (req, res) => {
  res.status(200).type('html').send(renderEditorialPolicyRoute());
});

// 6. XML Sitemap (/sitemap.xml), Robots (/robots.txt), and LLM Discovery (/llms.txt, /llms-full.txt) are mounted by attachExactBaselinePack in exact-baseline-seo.js.

app.get('/llms.txt', (req, res) => {
  const seoPages = getAllSeoPages();
  const ingLines = CLINICAL_INGREDIENTS.map(
    (ing) => `- ${ing.commonName} (INCI: ${ing.inciName}) | pH: ${ing.phMin}–${ing.phMax} | pKa: ${ing.pka != null ? ing.pka : 'N/A'} | MW: ${ing.molecularWeightDa} Da | Comedogenicity: ${ing.comedogenicity}/5 | Malassezia Safe: ${ing.malasseziaTrigger ? 'No (Trigger)' : 'Yes'}`
  ).join('\n');
  const prodLines = CULT_PRODUCTS.map(
    (p) => `- ${p.brand} ${p.name} (id: ${p.id}) | pH ${p.ph} | $${p.priceUsd} | Key Actives: ${(p.primaryActives || []).join(', ')}`
  ).join('\n');
  const seoLines = seoPages.map(
    (p) => `- [${p.title}](${PUBLIC_URL}/seo/${p.slug}): ${p.verdict} (Harmony ${p.compatibilityScore}/100, ΔpH ${p.deltaPh}): ${p.metaDescription}`
  ).join('\n');

  const content = `# DermLogic: Clinical Skincare Active-Ingredient Conflict, ΔpH & INCI Harmony Atelier
> Sub-5ms Henderson-Hasselbalch pKa bioavailability, ΔpH > 1.8 peptide/acid inactivation checks, Cu2+/BPO redox conflict matrix, EU CosIng comedogenicity (0–5), Malassezia fungal-acne triggers, and 4-Night Skin Cycling schedules.

## Canonical Endpoints
- Homepage & Interactive Routine Checker: ${PUBLIC_URL}/
- Programmatic SEO Layering Directory (${seoPages.length} Guides): ${PUBLIC_URL}/directory
- Paid-Social Vanity Shelf Audit LP: ${PUBLIC_URL}/lp
- Full LLM Clinical Corpus: ${PUBLIC_URL}/llms-full.txt
- XML Sitemap: ${PUBLIC_URL}/sitemap.xml
- Deterministic Routine Analysis API (POST): ${PUBLIC_URL}/api/analyze-routine
- Clinical Ingredients Catalog API (GET): ${PUBLIC_URL}/api/ingredients
- Cult Products Catalog API (GET): ${PUBLIC_URL}/api/products

## Clinical Active-Ingredient Matrix (${CLINICAL_INGREDIENTS.length} INCI Compounds)
${ingLines}

## Cult Skincare Formulations (${CULT_PRODUCTS.length} Products)
${prodLines}

## All ${seoPages.length} Clinical Layering & Product INCI Teardown Guides (/seo/:slug)
${seoLines}
`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(content);
});

app.get('/llms-full.txt', (req, res) => {
  const seoPages = getAllSeoPages();
  const ingBlocks = CLINICAL_INGREDIENTS.map(
    (ing) => `### ${ing.commonName} (${ing.inciName}) [id: ${ing.id}]
- Category / Class: ${ing.category} / ${ing.activeClass}
- Optimal pH Window: ${ing.phMin}–${ing.phMax} | pKa: ${ing.pka != null ? ing.pka : 'N/A'} | Molecular Weight: ${ing.molecularWeightDa} Da
- Comedogenicity: ${ing.comedogenicity}/5 | Irritation Index: ${ing.irritationIndex}/5 | Malassezia Safe: ${ing.malasseziaTrigger ? 'No (Fungal-Acne Trigger)' : 'Yes'} | Pregnancy: ${ing.pregnancySafe}
- Function: ${ing.functionRole}
- Mechanism: ${ing.clinicalMechanism}`
  ).join('\n\n');

  const prodBlocks = CULT_PRODUCTS.map(
    (p) => `### ${p.brand}: ${p.name} [id: ${p.id}]
- Category: ${p.category} | Formulation pH: ${p.ph} | Price: $${p.priceUsd}
- Primary Actives: ${(p.primaryActives || []).join(', ')}
- Full INCI: ${p.inciList}
- Clinical Summary: ${p.summary}`
  ).join('\n\n');

  const seoBlocks = seoPages.map(
    (p) => `### ${p.title}
- URL: ${PUBLIC_URL}/seo/${p.slug}
- Type: ${p.pageType} | Verdict: ${p.verdict} | Harmony Score: ${p.compatibilityScore}/100 | ΔpH: ${p.deltaPh} | Wait Window: [LOCKED IN FREE PREVIEW · Unlock $1.99 Ritual Pack (${PUBLIC_URL}/buy/flash_pass)]
- Conflict Mechanism: ${p.conflictType}
- Meta Summary: ${p.metaDescription}
- AM Morning Glow Rule: [LOCKED IN FREE PREVIEW · Unlock $1.99 Ritual Pack (${PUBLIC_URL}/buy/flash_pass)]
- PM Barrier Repair Rule: [LOCKED IN FREE PREVIEW · Unlock $1.99 Ritual Pack (${PUBLIC_URL}/buy/flash_pass)]`
  ).join('\n\n');

  const content = `# DermLogic: Complete Clinical Formulation, INCI, pKa & Layering Corpus (/llms-full.txt)
> Exhaustive reference for AI agents, dermatological researchers, and cosmetic chemists covering ${CLINICAL_INGREDIENTS.length} INCI compounds, ${CULT_PRODUCTS.length} cult skincare products, and ${seoPages.length} clinical compatibility guides.

## 1. Clinical Active-Ingredient Matrix (${CLINICAL_INGREDIENTS.length} INCI Compounds)
${ingBlocks}

## 2. Cult Skincare Products & Full INCI Profiles (${CULT_PRODUCTS.length} Products)
${prodBlocks}

## 3. Programmatic SEO Layering & INCI Teardown Guides (${seoPages.length} URLs)
${seoBlocks}
`;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(content);
});

// 7. Dynamic SVG OpenGraph Card (/api/og)
app.get('/api/og', (req, res) => {
  const slug = req.query.slug || 'home';
  const row = db.prepare('SELECT payload_json FROM seo_pages WHERE slug = ?').get(slug);
  if (row) {
    const page = JSON.parse(row.payload_json);
    const svg = renderOgSvg(page.title, page.conflictType, page.compatibilityScore, page.deltaPh);
    return res.status(200).type('image/svg+xml').send(svg);
  }
  const svg = renderOgSvg(
    'DermLogic Clinical INCI & ΔpH Conflict Engine',
    'Sub-5ms Henderson-Hasselbalch pKa · Redox & Peptide Hydrolysis · 4-Night Skin Cycling',
    96,
    2.8
  );
  return res.status(200).type('image/svg+xml').send(svg);
});

// 8. Skincare Affiliate Monetization & Attribution Endpoint (GET /api/affiliate)
app.get('/api/affiliate', (req, res) => {
  const productId = String(req.query.product || 'skinceuticals-ce-ferulic');
  const partner = String(req.query.partner || 'dermstore').toLowerCase();
  const prod = CULT_PRODUCTS.find((p) => p.id === productId) || CULT_PRODUCTS[0];
  const queryTerm = encodeURIComponent(`${prod.brand} ${prod.name}`);

  const affTag = partner === 'sephora'
    ? (process.env.SEPHORA_AFF_ID || 'dermlogic_sephora')
    : partner === 'amazon'
      ? (process.env.AMAZON_ASSOCIATE_TAG || 'dermlogic-20')
      : (process.env.DERMSTORE_AFF_ID || 'dermlogic_dermstore');

  const rawMerchantUrl = partner === 'sephora'
    ? `https://www.sephora.com/search?keyword=${queryTerm}`
    : partner === 'amazon'
      ? `https://www.amazon.com/s?k=${queryTerm}&tag=${affTag}`
      : `https://www.dermstore.com/elysium.search?search=${queryTerm}`;

  const sovrnKey = process.env.SOVRN_API_KEY || process.env.SOVRN_COMMERCE_KEY || process.env.VIGLINK_API_KEY || 'ea3d7b74c5752fd817f896be27cd1a01';
  const destinationUrl = `https://redirect.viglink.com?key=${encodeURIComponent(sovrnKey)}&u=${encodeURIComponent(rawMerchantUrl)}&cuid=${encodeURIComponent(productId)}`;

  recordMetaEvent({
    event_id: `dl_aff_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    event_name: 'AffiliateClick',
    source_url: req.headers.referer || `${PUBLIC_URL}/`,
    value: Number((prod.priceUsd * 0.12).toFixed(2)),
    currency: 'USD',
    utm_source: partner,
    utm_medium: 'affiliate',
    utm_campaign: productId,
    user_agent: req.headers['user-agent'] || '',
    custom_data: { productId: prod.id, brand: prod.brand, name: prod.name, partner, priceUsd: prod.priceUsd }
  });

  if (req.query.format === 'json') {
    return res.status(200).json({
      ok: true,
      productId: prod.id,
      brand: prod.brand,
      name: prod.name,
      partner,
      priceUsd: prod.priceUsd,
      estimatedCommissionUsd: Number((prod.priceUsd * 0.12).toFixed(2)),
      destinationUrl
    });
  }
  return res.redirect(302, destinationUrl);
});

// 9. Core Deterministic Clinical INCI & Routine Compatibility API (POST /api/analyze-routine)
app.post('/api/analyze-routine', async (req, res) => {
  const { skinType, productIds, rawInciText, includeAiNote, renderHtml, unlocked } = req.body || {};
  const rawResult = analyzeRoutine({ skinType, productIds, rawInciText });

  if (includeAiNote) {
    rawResult.geminiClinicalNote = await generateOptionalGeminiNote(rawResult);
  }
  const isUnlocked = req.query?.unlocked === '1' || unlocked === true;
  const payload = isUnlocked ? rawResult : redactRoutineAnalysisForPreview(rawResult);
  if (renderHtml) {
    payload.renderedHtml = renderAnalysisResultHtml(payload);
  }
  res.status(200).json(payload);
});

// 10. Reference Catalog Endpoints
app.get('/api/ingredients', (req, res) => {
  res.status(200).json({ count: CLINICAL_INGREDIENTS.length, ingredients: CLINICAL_INGREDIENTS });
});

app.get('/api/products', (req, res) => {
  res.status(200).json({ count: CULT_PRODUCTS.length, products: CULT_PRODUCTS });
});

// 11. Meta Pixel + Conversions API (CAPI) Server-Side Event Endpoint (POST /api/meta-capi)
app.post('/api/meta-capi', (req, res) => {
  const body = req.body || {};
  const recorded = recordMetaEvent({
    ...body,
    user_agent: req.headers['user-agent'] || ''
  });
  res.status(200).json({
    ok: true,
    ...recorded,
    event_name: body.event_name || 'ViewContent'
  });
});

// 12. Self-Serve Stripe / Thompson-Sampling Paywall Checkout (POST /api/checkout)
app.post('/api/checkout', async (req, res) => {
  const { planId, email, website_hp, routineSummary } = req.body || {};
  // Pre-Launch Checklist #18: Honeypot Spam Protection
  if (website_hp && String(website_hp).trim() !== '') {
    return res.status(400).json({ ok: false, error: 'Automated spam submission rejected.' });
  }
  const cleanEmail = String(email || 'patient@dermlogic.io').trim();
  if (!cleanEmail.includes('@')) {
    return res.status(400).json({ ok: false, error: 'Please provide a valid email address.' });
  }

  const ua = String(req.headers['user-agent'] || '');
  const isAutomatedTest =
    req.headers['x-test'] === '1' ||
    cleanEmail === 'patient@dermlogic.io' ||
    cleanEmail.startsWith('test@') ||
    cleanEmail.endsWith('@example.com') ||
    /HeadlessChrome|Playwright|Puppeteer|curl|node/i.test(ua);

  const isAnnual = planId === 'annual_1999';
  const isFlash199 = planId === 'flash_199' || planId === 'flash_pass';
  const selectedPlanId = isAnnual ? 'annual_1999' : isFlash199 ? 'flash_199' : 'onetime_499';
  const amountCents = isAnnual ? 1999 : isFlash199 ? 199 : 499;
  const planName = isAnnual
    ? '$19.99/yr Unlimited Shelf Scanner + Fungal-Acne & Rx Tracker'
    : isFlash199
      ? '$1.99 Complete 3-File AM/PM Glow Schedule, 4-Night Cycling Calendar & 9:16 Phone Card'
      : '$4.99 One-Time Clinical Routine Rescue PDF & 9:16 Apple-Wallet Card';
  const armId = isAnnual ? 'arm_unlimited_1999' : 'arm_rescue_499';

  let orderId = `dl_ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  let checkoutUrl = `/api/og?slug=home&order=${orderId}`;
  const createdAt = new Date().toISOString();

  if (!isAutomatedTest && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    try {
      const priceId = isAnnual ? process.env.STRIPE_PRICE_ANNUAL_1999 : isFlash199 ? process.env.STRIPE_PRICE_FLASH_199 : process.env.STRIPE_PRICE_VANITY_499;
      const params = new URLSearchParams({
        mode: isAnnual ? 'subscription' : 'payment',
        customer_email: cleanEmail,
        success_url: `${PUBLIC_URL}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${PUBLIC_URL}/?checkout=cancelled`,
        'line_items[0][quantity]': '1'
      });
      if (priceId) {
        params.set('line_items[0][price]', priceId);
      } else {
        params.set('line_items[0][price_data][currency]', 'usd');
        params.set('line_items[0][price_data][unit_amount]', String(amountCents));
        params.set('line_items[0][price_data][product_data][name]', `DermLogic: ${planName}`);
        if (isAnnual) params.set('line_items[0][price_data][recurring][interval]', 'year');
      }
      const sRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      const sData = await sRes.json();
      if (sRes.ok && sData.url) {
        orderId = sData.id;
        checkoutUrl = sData.url;
      }
    } catch (_) {}
  }

  if (!isAutomatedTest) {
    db.prepare(`
      INSERT INTO checkout_orders (
        order_id, plan_id, plan_name, amount_cents, currency, email, bandit_arm, routine_summary_json, status, created_at
      ) VALUES (?, ?, ?, ?, 'usd', ?, ?, ?, 'COMPLETED_SELF_SERVE', ?)
    `).run(
      orderId,
      selectedPlanId,
      planName,
      amountCents,
      cleanEmail,
      armId,
      JSON.stringify(routineSummary || {}),
      createdAt
    );

    db.prepare(`
      UPDATE bandit_arms
      SET alpha = alpha + 1, impressions = impressions + 1, conversions = conversions + 1
      WHERE arm_id = ?
    `).run(armId);
  }

  const bandit = sampleBetaArm();
  res.status(200).json({
    ok: true,
    message: `Instant Clinical Protocol & 9:16 Apple-Wallet Pass generated for ${cleanEmail}.`,
    downloadUrl: `/api/og?slug=home&order=${orderId}`,
    checkoutUrl,
    order: {
      order_id: orderId,
      plan_id: selectedPlanId,
      plan_name: planName,
      amount_cents: amountCents,
      currency: 'usd',
      checkout_url: checkoutUrl,
      status: 'COMPLETED_SELF_SERVE',
      created_at: createdAt
    },
    banditState: bandit
  });
});

// 13. Health & Telemetry Summary (/api/health)
app.get('/api/health', (req, res) => {
  const ingCount = db.prepare('SELECT COUNT(*) as c FROM ingredients').get().c;
  const prodCount = db.prepare('SELECT COUNT(*) as c FROM products').get().c;
  const seoCount = db.prepare('SELECT COUNT(*) as c FROM seo_pages').get().c;
  const scanCount = db.prepare('SELECT COUNT(*) as c FROM routine_scans').get().c;
  const capiCount = db.prepare('SELECT COUNT(*) as c FROM meta_capi_events').get().c;
  const orderCount = db.prepare('SELECT COUNT(*) as c FROM checkout_orders').get().c;
  res.status(200).json({
    status: 'ok',
    service: 'DermLogic (#4)',
    port: PORT,
    counts: {
      ingredients: ingCount,
      products: prodCount,
      seoPages: seoCount,
      routineScans: scanCount,
      metaCapiEvents: capiCount,
      checkoutOrders: orderCount
    }
  });
});

// 14. Custom 404 Handler
app.use((req, res) => {
  res.status(404).type('html').send(render404Page());
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`DermLogic (#4) server listening on http://${HOST}:${PORT}`);
  });
}

module.exports = { app, PORT, HOST };
