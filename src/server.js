/**
 * DermLogic (#4) — Express Server on Dedicated Port 4104 (http://127.0.0.1:4104)
 */

const express = require('express');
const { CLINICAL_INGREDIENTS, CULT_PRODUCTS, ROUTINE_PRESETS } = require('./clinical-data');
const { db, sampleBetaArm, recordMetaEvent } = require('./db');
const { analyzeRoutine, generateOptionalGeminiNote } = require('./engine');
const { renderAnalysisResultHtml } = require('./ui-templates');
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
const HOST = '127.0.0.1';

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Security headers (Pre-Launch Checklist #4)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

function getAllSeoPages() {
  const rows = db.prepare('SELECT payload_json FROM seo_pages ORDER BY slug ASC').all();
  return rows.map((r) => JSON.parse(r.payload_json));
}

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
  const baseUrl = `http://${HOST}:${PORT}`;
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

Sitemap: http://${HOST}:${PORT}/sitemap.xml
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

// 8. Core Deterministic Clinical INCI & Routine Compatibility API (POST /api/analyze-routine)
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

// 9. Reference Catalog Endpoints
app.get('/api/ingredients', (req, res) => {
  res.status(200).json({ count: CLINICAL_INGREDIENTS.length, ingredients: CLINICAL_INGREDIENTS });
});

app.get('/api/products', (req, res) => {
  res.status(200).json({ count: CULT_PRODUCTS.length, products: CULT_PRODUCTS });
});

// 10. Meta Pixel + Conversions API (CAPI) Server-Side Event Endpoint (POST /api/meta-capi)
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

// 11. Self-Serve Stripe / Thompson-Sampling Paywall Checkout (POST /api/checkout)
app.post('/api/checkout', (req, res) => {
  const { planId, email, routineSummary } = req.body || {};
  const selectedPlanId = planId === 'annual_1999' ? 'annual_1999' : 'onetime_499';
  const amountCents = selectedPlanId === 'annual_1999' ? 1999 : 499;
  const planName = selectedPlanId === 'annual_1999'
    ? '$19.99/yr Unlimited Shelf Scanner + Fungal-Acne & Rx Tracker'
    : '$4.99 One-Time Clinical Routine Rescue PDF & 9:16 Apple-Wallet Card';
  const armId = selectedPlanId === 'annual_1999' ? 'arm_unlimited_1999' : 'arm_rescue_499';

  const orderId = `dl_ord_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  db.prepare(`
    INSERT INTO checkout_orders (
      order_id, plan_id, plan_name, amount_cents, currency, email, bandit_arm, routine_summary_json, status, created_at
    ) VALUES (?, ?, ?, ?, 'usd', ?, ?, ?, 'COMPLETED_SELF_SERVE', ?)
  `).run(
    orderId,
    selectedPlanId,
    planName,
    amountCents,
    email || 'patient@dermlogic.io',
    armId,
    JSON.stringify(routineSummary || {}),
    createdAt
  );

  // Update Thompson-Sampling Beta posteriors (reward alpha + 1)
  db.prepare(`
    UPDATE bandit_arms
    SET alpha = alpha + 1, impressions = impressions + 1, conversions = conversions + 1
    WHERE arm_id = ?
  `).run(armId);

  const bandit = sampleBetaArm();
  res.status(200).json({
    ok: true,
    message: `Instant Clinical Protocol & 9:16 Apple-Wallet Pass generated for ${email || 'patient@dermlogic.io'}.`,
    downloadUrl: `/api/og?slug=home&order=${orderId}`,
    order: {
      order_id: orderId,
      plan_id: selectedPlanId,
      plan_name: planName,
      amount_cents: amountCents,
      currency: 'usd',
      status: 'COMPLETED_SELF_SERVE',
      created_at: createdAt
    },
    banditState: bandit
  });
});

// 12. Health & Telemetry Summary (/api/health)
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

// 13. Custom 404 Handler
app.use((req, res) => {
  res.status(404).type('html').send(render404Page());
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`DermLogic (#4) server listening on http://${HOST}:${PORT}`);
  });
}

module.exports = { app, PORT, HOST };
