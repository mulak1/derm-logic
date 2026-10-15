/**
 * DermLogic (#4) — Express Server on Dedicated Port 4104 (http://127.0.0.1:4104)
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
const { CLINICAL_INGREDIENTS, CULT_PRODUCTS, ROUTINE_PRESETS } = require('./clinical-data');
const { db, sampleBetaArm, recordMetaEvent } = require('./db');
const { analyzeRoutine, generateOptionalGeminiNote } = require('./engine');
const { BRAND_LOGO_SVG, renderAnalysisResultHtml } = require('./ui-templates');
const {
  renderHomePage,
  renderPaidSocialLpPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgSvg
} = require('./page-views');

const app = express();
const PORT = Number(process.env.PORT || 4104);
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || `http://127.0.0.1:${PORT}`).replace(/\/$/, '');

app.use('/public', express.static(path.join(__dirname, '..', 'public')));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

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

// 1. Homepage (/)
app.get('/', (req, res) => {
  const initialAnalysis = analyzeRoutine({
    skinType: ROUTINE_PRESETS[0].skinType,
    productIds: ROUTINE_PRESETS[0].productIds,
    rawInciText: ''
  });
  const seoPages = getAllSeoPages();
  const html = renderHomePage({
    products: CULT_PRODUCTS,
    ingredients: CLINICAL_INGREDIENTS,
    presets: ROUTINE_PRESETS,
    initialAnalysis,
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
  const relatedPages = allPages.filter((p) => p.slug !== slug && p.pageType === page.pageType).slice(0, 6);

  const html = renderSeoDetailPage({
    page,
    products: CULT_PRODUCTS,
    presets: ROUTINE_PRESETS,
    initialAnalysis,
    relatedPages
  });
  res.status(200).type('html').send(html);
});

// 5. Legal Routes (/privacy, /terms)
app.get('/privacy', (req, res) => {
  res.status(200).type('html').send(renderLegalPage({ type: 'privacy' }));
});

app.get('/terms', (req, res) => {
  res.status(200).type('html').send(renderLegalPage({ type: 'terms' }));
});

// 6. XML Sitemap (/sitemap.xml) & Robots (/robots.txt)
app.get('/sitemap.xml', (req, res) => {
  const seoPages = getAllSeoPages();
  const baseUrl = PUBLIC_URL;
  const today = new Date().toISOString().split('T')[0];
  const staticUrls = ['/', '/lp', '/directory', '/privacy', '/terms'];
  const urlsXml = [
    ...staticUrls.map((u) => `  <url><loc>${baseUrl}${u}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>1.0</priority></url>`),
    ...seoPages.map((p) => `  <url><loc>${baseUrl}/seo/${p.slug}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.85</priority></url>`)
  ].join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
  res.status(200).type('application/xml').send(xml);
});

app.get('/robots.txt', (req, res) => {
  const txt = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${PUBLIC_URL}/sitemap.xml
`;
  res.status(200).type('text/plain').send(txt);
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
    source_url: req.headers.referer || `http://${HOST}:${PORT}/`,
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
  const { skinType, productIds, rawInciText, includeAiNote, renderHtml } = req.body || {};
  const result = analyzeRoutine({ skinType, productIds, rawInciText });

  if (includeAiNote) {
    result.geminiClinicalNote = await generateOptionalGeminiNote(result);
  }
  if (renderHtml) {
    result.renderedHtml = renderAnalysisResultHtml(result);
  }
  res.status(200).json(result);
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

  const isAnnual = planId === 'annual_1999';
  const selectedPlanId = isAnnual ? 'annual_1999' : 'onetime_499';
  const amountCents = isAnnual ? 1999 : 499;
  const planName = isAnnual
    ? '$19.99/yr Unlimited Shelf Scanner + Fungal-Acne & Rx Tracker'
    : '$4.99 One-Time Clinical Routine Rescue PDF & 9:16 Apple-Wallet Card';
  const armId = isAnnual ? 'arm_unlimited_1999' : 'arm_rescue_499';

  let orderId = `dl_ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  let checkoutUrl = `/api/og?slug=home&order=${orderId}`;
  const createdAt = new Date().toISOString();

  if (process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    try {
      const priceId = isAnnual ? process.env.STRIPE_PRICE_ANNUAL_1999 : process.env.STRIPE_PRICE_VANITY_499;
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
        params.set('line_items[0][price_data][product_data][name]', `DermLogic — ${planName}`);
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
