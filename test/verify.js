/**
 * DermLogic (#4) — Isolated Headless Playwright & API Verification Suite
 * Connects strictly to http://127.0.0.1:4104 using an isolated headless Chromium instance
 * (never touches shared MCP Playwright browser).
 */

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const { chromium } = require('playwright');
const { app, PORT, HOST } = require('../src/server');

const BASE_URL = `http://${HOST}:${PORT}`;
const SCREENSHOTS_DIR = path.join(__dirname, '..', 'screenshots');
if (!fs.existsSync(SCREENSHOTS_DIR)) {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
}

async function ensureServerRunning() {
  try {
    const res = await fetch(`${BASE_URL}/api/health`);
    if (res.ok) {
      return { server: null, alreadyRunning: true };
    }
  } catch (_) {
    // Not running yet, boot in-process
  }
  return new Promise((resolve) => {
    const srv = app.listen(PORT, HOST, () => {
      resolve({ server: srv, alreadyRunning: false });
    });
  });
}

async function runVerification() {
  console.log('=== DermLogic (#4) Phase 4 Verification Suite ===');
  const { server } = await ensureServerRunning();
  const consoleErrors = [];
  const pageErrors = [];

  try {
    // 1. Verify /api/health & Database Counts
    const healthRes = await fetch(`${BASE_URL}/api/health`);
    assert.strictEqual(healthRes.status, 200, '/api/health must return 200');
    const health = await healthRes.json();
    console.log('1. Health & Seeded Counts:', JSON.stringify(health.counts));
    assert(health.counts.ingredients >= 60, `Expected >=60 ingredients, got ${health.counts.ingredients}`);
    assert(health.counts.products >= 40, `Expected >=40 products, got ${health.counts.products}`);
    assert(health.counts.seoPages >= 55, `Expected >=55 pSEO pages, got ${health.counts.seoPages}`);

    // 2. Verify POST /api/analyze-routine (<5ms deterministic engine)
    const analyzeRes = await fetch(`${BASE_URL}/api/analyze-routine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        skinType: 'combination',
        productIds: ['to-buffet-copper-peptides', 'skinceuticals-ce-ferulic', 'rx-tretinoin-005', 'lrp-effaclar-duo-bpo'],
        rawInciText: 'Isopropyl Myristate, Polysorbate 20, Glycolic Acid'
      })
    });
    assert.strictEqual(analyzeRes.status, 200, 'POST /api/analyze-routine must return 200');
    const analysis = await analyzeRes.json();
    console.log(`2. Engine Execution: ${analysis.executionMs}ms | Score: ${analysis.compatibilityScore}/100 | Conflicts: ${analysis.conflicts.length}`);
    assert(analysis.conflicts.length >= 3, 'Should detect Copper+VitC, BPO+Tretinoin, and Acid conflicts');
    assert(analysis.comedogenicFlags.length >= 1, 'Should flag Isopropyl Myristate comedogenicity');
    assert(analysis.malasseziaFlags.length >= 1, 'Should flag Polysorbate 20 / Isopropyl Myristate Malassezia trigger');

    // 3. Verify all required HTTP routes (/lp, /directory, /seo/:slug, /sitemap.xml, /robots.txt, /api/og, /api/meta-capi, /api/checkout)
    const getRoutes = [
      '/',
      '/lp',
      '/directory',
      '/privacy',
      '/terms',
      '/sitemap.xml',
      '/robots.txt',
      '/api/og?slug=can-you-mix-copper-peptides-and-vitamin-c',
      '/seo/can-you-mix-retinol-and-vitamin-c',
      '/seo/can-you-mix-copper-peptides-and-vitamin-c',
      '/seo/benzoyl-peroxide-and-tretinoin-conflict',
      '/seo/niacinamide-and-glycolic-acid-ph-conflict',
      '/seo/salicylic-acid-and-azelaic-acid-layering',
      '/seo/skinceuticals-ce-ferulic-inci-and-routine-conflicts',
      '/seo/paulas-choice-2-bha-layering-guide',
      '/seo/the-ordinary-copper-peptides-conflicts'
    ];

    for (const route of getRoutes) {
      const r = await fetch(`${BASE_URL}${route}`);
      assert.strictEqual(r.status, 200, `GET ${route} must return HTTP 200, got ${r.status}`);
    }
    console.log(`3. Verified ${getRoutes.length} GET routes all return HTTP 200.`);

    // Verify POST /api/meta-capi deduplication
    const testEventId = `verify_evt_${Date.now()}`;
    const capi1 = await fetch(`${BASE_URL}/api/meta-capi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: testEventId,
        event_name: 'Lead',
        utm_source: 'meta',
        utm_medium: 'paid_social',
        utm_campaign: 'verify_test'
      })
    });
    assert.strictEqual(capi1.status, 200);
    const capi1Json = await capi1.json();
    assert.strictEqual(capi1Json.deduplicated, false);

    const capi2 = await fetch(`${BASE_URL}/api/meta-capi`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: testEventId,
        event_name: 'Lead'
      })
    });
    const capi2Json = await capi2.json();
    assert.strictEqual(capi2Json.deduplicated, true, 'Duplicate event_id must be deduplicated');
    console.log('4. Verified POST /api/meta-capi event logging & event_id deduplication.');

    // Verify POST /api/checkout
    const checkoutRes = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: 'onetime_499',
        email: 'verify@dermlogic.io',
        routineSummary: { compatibilityScore: 22 }
      })
    });
    assert.strictEqual(checkoutRes.status, 200, 'POST /api/checkout must return 200');
    const checkoutJson = await checkoutRes.json();
    assert.strictEqual(checkoutJson.ok, true);
    console.log(`5. Verified POST /api/checkout order fulfillment: ${checkoutJson.order.order_id}`);

    // 4. Isolated Headless Playwright Browser Verification (Desktop 1440x900 & Mobile 390x844)
    const browser = await chromium.launch({ headless: true });

    // Desktop Viewport (1440x900)
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktopCtx.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-home-initial.png'), fullPage: false });

    // Click Preset 2 ("Copper Peptides + Vitamin C Oxidation Trap")
    await page.click('button[data-preset-id="copper-vitc-oxidation"]');
    await page.waitForTimeout(250);

    // Paste sample pore-clogging INCI & trigger analysis
    await page.click('button[onclick="pasteSampleComedogenicInci()"]');
    await page.waitForTimeout(300);

    const conflictCardsCount = await page.locator('.conflict-card').count();
    assert(conflictCardsCount >= 2, `Expected >=2 rendered conflict cards on DOM, got ${conflictCardsCount}`);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-home-analyzed.png'), fullPage: true });

    // Open checkout modal & test interactive unlock
    await page.click('#appleWalletCardPreview button');
    await page.waitForTimeout(200);
    await page.click('#checkoutSubmitBtn');
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-checkout-modal.png'), fullPage: false });
    await page.click('button[onclick="closeCheckoutModal()"]');

    // Capture /lp (Cold Paid-Social Landing Page) & /seo/:slug
    await page.goto(`${BASE_URL}/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=angle1`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-lp-paid-social.png'), fullPage: false });

    await page.goto(`${BASE_URL}/seo/can-you-mix-copper-peptides-and-vitamin-c`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-seo-copper-vitc.png'), fullPage: false });
    await desktopCtx.close();

    // Mobile Viewport (390x844)
    const mobileCtx = await browser.newContext({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true
    });
    const mPage = await mobileCtx.newPage();
    mPage.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    mPage.on('pageerror', (err) => pageErrors.push(err.message));

    await mPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile-home.png'), fullPage: false });

    await mPage.goto(`${BASE_URL}/lp`, { waitUntil: 'networkidle' });
    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile-lp.png'), fullPage: false });

    await mobileCtx.close();
    await browser.close();

    assert.strictEqual(consoleErrors.length, 0, `Expected 0 console errors, got: ${consoleErrors.join('; ')}`);
    assert.strictEqual(pageErrors.length, 0, `Expected 0 page errors, got: ${pageErrors.join('; ')}`);
    console.log('6. Isolated Headless Playwright Desktop (1440x900) & Mobile (390x844) passed with 0 console/page errors.');
    console.log('=== ALL DERMLOGIC (#4) VERIFICATION CHECKS PASSED 100% ===');
  } finally {
    if (server) {
      server.close();
    }
  }
}

runVerification().catch((err) => {
  console.error('Verification failed:', err);
  process.exit(1);
});
