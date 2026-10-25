/**
 * DermLogic (#4) — Isolated Headless Playwright & 20-Point Pre-Launch Verification Suite
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
  console.log('=== DermLogic (#4) 20-Point Pre-Launch & Luxury Redesign Verification ===');
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

    // 3. Verify all required GET routes including /favicon.svg & /api/affiliate
    const getRoutes = [
      '/',
      '/lp',
      '/directory',
      '/privacy',
      '/terms',
      '/favicon.svg',
      '/sitemap.xml',
      '/robots.txt',
      '/api/og?slug=can-you-mix-copper-peptides-and-vitamin-c',
      '/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore&format=json',
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
    const r404 = await fetch(`${BASE_URL}/non-existent-route-check-404`);
    assert.strictEqual(r404.status, 404, 'Custom 404 route must return HTTP 404');
    console.log(`3. Verified ${getRoutes.length} GET routes (200 OK) + Custom 404 route (404).`);

    // Verify Affiliate JSON response
    const affRes = await fetch(`${BASE_URL}/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore&format=json`);
    const affJson = await affRes.json();
    assert.strictEqual(affJson.ok, true);
    assert(affJson.destinationUrl.includes('dermstore.com'), 'Affiliate endpoint must build partner URL');
    console.log(`4. Verified Affiliate Attribution: ${affJson.brand} ${affJson.name} -> $${affJson.estimatedCommissionUsd} est. commission`);

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
    console.log('5. Verified POST /api/meta-capi event logging & event_id deduplication.');

    // Verify Honeypot Spam Protection (#18) & Valid Checkout (#17)
    const spamRes = await fetch(`${BASE_URL}/api/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        planId: 'onetime_499',
        email: 'bot@spam.io',
        website_hp: 'http://spambot.example.com'
      })
    });
    assert.strictEqual(spamRes.status, 400, 'Honeypot spam check must return 400');

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
    console.log(`6. Verified Honeypot Spam Protection (400) & POST /api/checkout fulfillment: ${checkoutJson.order.order_id}`);

    // Isolated Headless Playwright Browser Verification (Desktop 1440x900 & Mobile 390x844)
    const browser = await chromium.launch({ headless: true });

    // Desktop Viewport (1440x900)
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktopCtx.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', (err) => pageErrors.push(err.message));

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Verify hyperlinked logo & unified header links on /
    const logoHref = await page.getAttribute('header a.brand-logo-link', 'href');
    assert.strictEqual(logoHref, '/', 'Brand logo must link to /');
    const navLinksCount = await page.locator('header nav.nav-links a').count();
    assert.strictEqual(navLinksCount, 3, 'Header must contain the 3 unified root-relative links');
    const affLinksCount = await page.locator('a[rel*="sponsored"]').count();
    assert(affLinksCount >= 10, `Expected >=10 sponsored affiliate links on /, got ${affLinksCount}`);

    // Accept cookie consent ribbon so UI is clean, then scroll back to top
    if (await page.locator('#cookie-accept').isVisible()) {
      await page.click('#cookie-accept');
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.waitForTimeout(100);
    }

    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-home-initial.png'), fullPage: false });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'home-desktop.png'), fullPage: false });

    // Verify Day/Night Vanity Toggle (#vanityLightToggle) — Day Mode (Preview A) & Night Mode (Preview B)
    const initialThemeAttr = await page.getAttribute('html', 'data-theme');
    assert.strictEqual(initialThemeAttr, 'day', 'Initial html[data-theme] must be day');
    const dayBg = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    assert.strictEqual(dayBg, 'rgb(244, 239, 232)', `Day Mode body background must be #F4EFE8 (rgb(244, 239, 232)), got ${dayBg}`);

    await page.click('#vanityLightToggle button[data-theme-mode="night"]');
    await page.waitForTimeout(380);
    const nightThemeAttr = await page.getAttribute('html', 'data-theme');
    assert.strictEqual(nightThemeAttr, 'night', 'Toggling 11 PM Vanity must set html[data-theme="night"]');
    const nightState = await page.evaluate(() => ({
      hasClass: document.body.classList.contains('vanity-night'),
      bg: window.getComputedStyle(document.body).backgroundColor,
      stored: localStorage.getItem('dermlogic_vanity_theme')
    }));
    assert.strictEqual(nightState.hasClass, true, 'Night mode must add body.vanity-night');
    assert.strictEqual(nightState.bg, 'rgb(12, 10, 8)', `Night Mode body background must be #0C0A08 (rgb(12, 10, 8)), got ${nightState.bg}`);
    assert.strictEqual(nightState.stored, 'night', 'Night mode must persist dermlogic_vanity_theme=night in localStorage');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-home-night.png'), fullPage: false });

    // Toggle back to Daylight Gallery
    await page.click('#vanityLightToggle button[data-theme-mode="day"]');
    await page.waitForTimeout(380);
    const restoredState = await page.evaluate(() => ({
      theme: document.documentElement.getAttribute('data-theme'),
      hasClass: document.body.classList.contains('vanity-night'),
      bg: window.getComputedStyle(document.body).backgroundColor,
      stored: localStorage.getItem('dermlogic_vanity_theme')
    }));
    assert.strictEqual(restoredState.theme, 'day', 'Toggling Daylight Gallery must restore html[data-theme="day"]');
    assert.strictEqual(restoredState.hasClass, false, 'Toggling Daylight Gallery must remove body.vanity-night');
    assert.strictEqual(restoredState.bg, 'rgb(244, 239, 232)', `Day Mode restored background must be rgb(244, 239, 232), got ${restoredState.bg}`);
    assert.strictEqual(restoredState.stored, 'day', 'Daylight Gallery must persist dermlogic_vanity_theme=day in localStorage');

    // Click Preset 2 ("Copper Peptides + Vitamin C Oxidation Trap")
    await page.click('button[data-preset-id="copper-vitc-oxidation"]');
    await page.waitForTimeout(250);

    // Paste sample pore-clogging INCI & trigger analysis
    await page.click('button[onclick="pasteSampleComedogenicInci()"]');
    await page.waitForTimeout(300);

    const conflictCardsCount = await page.locator('.conflict-card').count();
    assert(conflictCardsCount >= 2, `Expected >=2 rendered conflict cards on DOM, got ${conflictCardsCount}`);

    // Scroll back to top before fullPage screenshot so sticky header sits cleanly at top of document
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(150);
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
    const lpLogoHref = await page.getAttribute('header a.brand-logo-link', 'href');
    assert.strictEqual(lpLogoHref, '/', 'Brand logo on /lp must also link to /');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-lp-paid-social.png'), fullPage: false });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'lp-desktop.png'), fullPage: false });

    await page.goto(`${BASE_URL}/seo/can-you-mix-copper-peptides-and-vitamin-c`, { waitUntil: 'networkidle' });
    const seoLogoHref = await page.getAttribute('header a.brand-logo-link', 'href');
    assert.strictEqual(seoLogoHref, '/', 'Brand logo on /seo/:slug must link to /');
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'desktop-seo-copper-vitc.png'), fullPage: false });
    await page.screenshot({ path: path.join(SCREENSHOTS_DIR, 'seo-desktop.png'), fullPage: false });
    await desktopCtx.close();

    // Mobile Viewport (390x844) — Verify zero horizontal overflow & zero floating overlapping boxes
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
    if (await mPage.locator('#cookie-accept').isVisible()) {
      await mPage.click('#cookie-accept');
      await mPage.evaluate(() => window.scrollTo(0, 0));
      await mPage.waitForTimeout(100);
    }

    const mobileLayoutCheck = await mPage.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      // Check that no visible element is position:fixed (so zero floating boxes overlap content)
      const allEls = Array.from(document.querySelectorAll('*'));
      const floatingFixed = allEls.filter((el) => {
        const st = window.getComputedStyle(el);
        return st.position === 'fixed' && st.display !== 'none' && st.visibility !== 'hidden' && el.offsetWidth > 0;
      });
      return {
        scrollWidth,
        innerWidth,
        floatingFixedCount: floatingFixed.length
      };
    });
    assert(
      mobileLayoutCheck.scrollWidth <= mobileLayoutCheck.innerWidth,
      `Mobile horizontal overflow detected: scrollWidth=${mobileLayoutCheck.scrollWidth} > innerWidth=${mobileLayoutCheck.innerWidth}`
    );
    assert.strictEqual(
      mobileLayoutCheck.floatingFixedCount,
      0,
      `Expected 0 floating fixed boxes on mobile 390x844, got ${mobileLayoutCheck.floatingFixedCount}`
    );

    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile-home.png'), fullPage: false });
    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'home-mobile.png'), fullPage: false });

    // Mobile Night Mode check & screenshot
    await mPage.click('#vanityLightToggle button[data-theme-mode="night"]');
    await mPage.waitForTimeout(380);
    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile-home-night.png'), fullPage: false });
    await mPage.click('#vanityLightToggle button[data-theme-mode="day"]');
    await mPage.waitForTimeout(200);

    await mPage.goto(`${BASE_URL}/lp`, { waitUntil: 'networkidle' });
    await mPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'mobile-lp.png'), fullPage: false });

    await mobileCtx.close();

    // Tablet Viewport (768x1024) — Day & Night Mode responsive verification
    const tabletCtx = await browser.newContext({ viewport: { width: 768, height: 1024 } });
    const tPage = await tabletCtx.newPage();
    await tPage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    if (await tPage.locator('#cookie-accept').isVisible()) {
      await tPage.click('#cookie-accept');
      await tPage.evaluate(() => window.scrollTo(0, 0));
      await tPage.waitForTimeout(100);
    }
    const tabletOverflow = await tPage.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    assert(tabletOverflow, 'Tablet 768x1024 must have zero horizontal overflow');
    await tPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'tablet-home-day.png'), fullPage: false });
    await tPage.click('#vanityLightToggle button[data-theme-mode="night"]');
    await tPage.waitForTimeout(380);
    await tPage.screenshot({ path: path.join(SCREENSHOTS_DIR, 'tablet-home-night.png'), fullPage: false });
    await tabletCtx.close();

    await browser.close();

    assert.strictEqual(consoleErrors.length, 0, `Expected 0 console errors, got: ${consoleErrors.join('; ')}`);
    assert.strictEqual(pageErrors.length, 0, `Expected 0 page errors, got: ${pageErrors.join('; ')}`);
    console.log('7. Isolated Headless Playwright Desktop (1440x900) & Mobile (390x844) passed with 0 console/page errors & 0 floating boxes.');
    console.log('=== ALL DERMLOGIC (#4) 20-POINT PRE-LAUNCH & LUXURY CHECKS PASSED 100% ===');
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
