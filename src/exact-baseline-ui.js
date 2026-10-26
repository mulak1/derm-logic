/**
 * ExactBaseline Cumulative UI, Deliverable Value-Gating & Conversion Architecture
 * Shared across CitationForge (#1), SponsorRadar (#2), DermLogic (#4), and AbandonAlpha (#9).
 * Free = Diagnostic & Quantified Problem. Paid ($1.99 Pass) = Ready-to-Use Production Fix & Export Pack.
 */
const SOVRN_KEY = process.env.SOVRN_COMMERCE_KEY || 'ea3d7b74c5752fd817f896be27cd1a01';
const { buildTopLeaderboardPodiumShowcaseHtml, buildMobileSeoCrawlMeshHtml, enhanceHtmlForSearchAndAiBots } = require('./exact-baseline-seo');

function esc(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getTheme(cfg) {
  return cfg.theme || {
    canvasBg: 'var(--bg-canvas)', cardBg: 'var(--bg-surface)', subtleBg: 'var(--bg-oat)', surfaceBg: 'var(--bg-surface)', dockBg: 'var(--bg-porcelain)',
    border: 'var(--border-hairline)', accentBorder: 'var(--border-strong)', textPrimary: 'var(--text-primary)', textSecondary: 'var(--text-secondary)', textMuted: 'var(--text-muted)',
    brandPrimary: cfg.accentColor || 'var(--rose-brand)', brandSoftBg: 'var(--rose-pill-bg)', brandText: 'var(--rose-brand)',
    safeColor: 'var(--sage-safe)', safeSoftBg: 'var(--sage-bg)', safeBorder: 'var(--border-hairline)', warnColor: 'var(--honey-warn)',
    fontDisplay: "'Newsreader', Georgia, serif", fontSans: "'Newsreader', Georgia, serif",
    radiusCard: '0px', radiusPill: '0px', shadow: 'none'
  };
}

function buildExactBaselineStyles(cfg) {
  const t = getTheme(cfg);
  return `<style id="exact-baseline-cumulative-css">
  html, body { max-width: 100vw !important; overflow-x: hidden !important; }
  *, *::before, *::after { box-sizing: border-box; }
  button, .preset-chip, .store-preview-pill, .eb-action-btn, .cta-btn, a[role="button"] { transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, border-color 150ms ease; cursor: pointer; }
  button:active, .preset-chip:active, .store-preview-pill:active, .eb-action-btn:active, .cta-btn:active { transform: scale(0.98) !important; }
  .metric-box-value, .matrix-price, .eb-kpi-val, .eb-tabular { font-variant-numeric: tabular-nums !important; }
  .eb-blurred-deliverable { filter: blur(5px) !important; user-select: none !important; cursor: pointer !important; max-height: 140px !important; overflow: hidden !important; opacity: 0.55 !important; transition: filter 250ms ease, max-height 250ms ease, opacity 250ms ease; }
  #eb-deliverable-curtain { margin-top: 36px; padding: 38px 42px; background: ${t.cardBg}; color: ${t.textPrimary}; font-family: ${t.fontSans}; position: relative; z-index: 20; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; font-weight: 400 !important; }
  #eb-prism-proof-preview { background: ${t.subtleBg}; color: ${t.textPrimary}; padding: 20px 24px; font-family: ${t.fontDisplay} !important; font-size: 17px !important; line-height: 1.65 !important; margin: 0; overflow-x: hidden; white-space: pre-line !important; word-break: break-word; text-transform: none !important; letter-spacing: normal !important; }
  .eb-doppelrand-shell { padding: 8px; background: ${t.subtleBg}; margin: 10px 0 12px 0; transition: transform 650ms cubic-bezier(0.32, 0.72, 0, 1); }
  .eb-doppelrand-shell:hover { transform: translateY(-2px); }
  .eb-doppelrand-inner { position: relative; overflow: hidden; background: ${t.cardBg}; display: flex; flex-direction: column; }
  .eb-doppelrand-img { width: 100%; height: 196px; object-fit: cover; object-position: center 44%; display: block; transition: transform 750ms cubic-bezier(0.32, 0.72, 0, 1); }
  .eb-doppelrand-shell:hover .eb-doppelrand-img { transform: scale(1.03); }
  .eb-doppelrand-caption, .eb-doppelrand-caption * { font-family: ${t.fontSans} !important; line-height: 1.3 !important; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; }
  .eb-doppelrand-caption { position: absolute; left: 10px; right: 10px; bottom: 10px; padding: 7px 12px; background: ${t.dockBg}; backdrop-filter: blur(12px); display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px !important; color: ${t.textSecondary} !important; max-height: 38px; overflow: hidden; white-space: nowrap; }
  #eb-hero-sparkline-pill { position: absolute; top: 10px; right: 10px; z-index: 6; padding: 5px 11px; background: ${t.dockBg}; backdrop-filter: blur(12px); display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-family: ${t.fontSans} !important; text-transform: none !important; letter-spacing: normal !important; white-space: nowrap; }
  #eb-dossier-format-pill { position: absolute; top: 10px; left: 10px; z-index: 6; padding: 5px 11px; background: rgba(24, 20, 18, 0.86); backdrop-filter: blur(8px); color: #FAF6F0 !important; font-family: ${t.fontSans} !important; font-size: 12.5px !important; font-weight: 500 !important; letter-spacing: 0.01em !important; text-transform: none !important; white-space: nowrap !important; max-width: calc(100% - 20px); overflow: hidden; text-overflow: ellipsis; transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1); }
  tr[data-eb-live-row] { cursor: pointer; transition: background-color 150ms ease; }
  tr[data-eb-live-row]:hover { background-color: ${t.brandSoftBg} !important; }
  #eb-pseo-hero-split { display: grid; grid-template-columns: 1.32fr 1fr; gap: 24px; align-items: stretch; margin: 16px 0 28px 0; } #eb-pseo-hero-split #eb-doppelrand-hero-card, #eb-curtain-visual-split #eb-curtain-dossier-card { display: flex; flex-direction: column; height: 100%; margin: 0 !important; } #eb-pseo-hero-split .eb-doppelrand-inner, #eb-curtain-visual-split .eb-doppelrand-inner { flex: 1; height: 100%; } #eb-pseo-hero-split .eb-doppelrand-img { height: 100% !important; min-height: 220px; max-height: 310px; object-fit: cover; flex: 1; } #eb-curtain-visual-split .eb-doppelrand-img { height: 100% !important; min-height: 260px; max-height: none !important; object-fit: cover; flex: 1; } .eb-pseo-lead-card { flex: 1; width: 100% !important; max-width: none !important; display: flex; flex-direction: column; justify-content: space-between; gap: 16px; padding: 28px 32px; background: ${t.cardBg}; border-left: 3px solid ${t.brandPrimary}; margin: 0 !important; font-family: ${t.fontDisplay}; font-size: clamp(1.15rem, 1.05rem + 0.35vw, 1.35rem) !important; line-height: 1.55 !important; color: ${t.textPrimary} !important; }
  @media (min-width: 960px) { .hero-grid, .hero-split, .hero-editorial-grid { align-items: stretch !important; } .hero-grid > *, .hero-split > * { display: flex !important; flex-direction: column !important; justify-content: flex-start !important; height: 100% !important; } .hero-grid > .bezel-shell > *, .hero-grid > .double-bezel > * { flex: 1 !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; } }
  #eb-curtain-visual-split { display: grid; grid-template-columns: 300px minmax(0, 1fr); gap: 36px; align-items: stretch; margin: 0; }
  #eb-floating-gate-popover { display: none; position: fixed; z-index: 9998; width: 360px; max-width: calc(100vw - 24px); background: ${t.cardBg}; color: ${t.textPrimary}; padding: 20px; font-family: ${t.fontSans}; text-transform: none !important; }
  #eb-bottom-conversion-suite { margin: 72px auto 96px auto; font-family: ${t.fontSans}; text-transform: none !important; }
  .container .container, main.container > #eb-bottom-conversion-suite { padding-left: 0 !important; padding-right: 0 !important; max-width: 100% !important; width: 100% !important; }
  .eb-panel-card { background: ${t.cardBg}; color: ${t.textPrimary}; padding: 32px 32px; margin-bottom: 36px; }
  .eb-gbb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; margin-top: 20px; align-items: stretch; }
  .eb-tier-card { background: ${t.canvasBg}; padding: 24px 26px; display: flex; flex-direction: column; justify-content: space-between; color: ${t.textPrimary}; }
  .eb-tier-card.featured { background: ${t.brandSoftBg}; position: relative; }
  #eb-executive-strip { margin-bottom: 20px; }
  .eb-strip-top-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; padding-bottom: 10px;  }
  .eb-strip-tag { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${t.brandPrimary}; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; padding: 4px 12px; border-radius: 999px; }
  #preset-chips { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; width: 100%; margin-bottom: 10px; }
  #preset-chips .preset-chip { padding: 7px 8px; font-size: 13px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-radius: ${t.radiusPill}; background: ${t.canvasBg}; color: ${t.textSecondary}; border: 1px solid ${t.border}; }
  #preset-chips .preset-chip:hover { background: ${t.brandSoftBg}; color: ${t.brandPrimary}; border-color: ${t.accentBorder}; }
  #eb-interactive-control-row { display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: center; margin-bottom: 10px; background: ${t.subtleBg}; padding: 8px 12px; border-radius: 10px; border: 1px solid ${t.border}; }
  #eb-fuse-search-input { width: 100%; padding: 8px 12px; border-radius: 8px; border: 1px solid ${t.border}; background: #FFFFFF; color: ${t.textPrimary}; font-size: 13.5px; }
  .eb-slider-wrap { display: flex; align-items: center; gap: 8px; font-size: 13px; color: ${t.textSecondary}; font-weight: 700; white-space: nowrap; }
  #eb-nouislider-range { width: 100%; height: 5px; accent-color: ${t.brandPrimary}; cursor: pointer; }
  #free-metrics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 12px; }
  .eb-kpi-card { background: ${t.canvasBg}; border: 1px solid ${t.border}; border-radius: 10px; padding: 10px 12px; }
  .eb-kpi-label { font-size:13px; color: ${t.textMuted}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
  .eb-kpi-val { font-family: ${t.fontDisplay}; font-size: 20px; font-weight: 700; color: ${t.textPrimary}; line-height: 1.2; margin: 2px 0; }
  .eb-kpi-sub { font-size:13px; color: ${t.safeColor}; font-weight: 600; }
  .stat-pill-locked { grid-column: 1 / -1; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; border-radius: 10px; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
  .eb-locked-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
  .eb-store-pills { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .store-preview-pill { padding: 6px 13px; border-radius: 0; font-size: 13.5px; font-weight: 500; background: ${t.surfaceBg}; color: ${t.textSecondary}; border: none; }
  .store-preview-pill.active { background: ${t.brandPrimary}; color: #FFFFFF; }
  #inline-aisle-peek-drawer { display: block; font-size: 13.5px; padding: 9px 13px; background: ${t.cardBg}; color: ${t.textPrimary}; border-left: 3px solid ${t.brandPrimary}; line-height: 1.5; }
  #lead-squeeze-card { background: ${t.subtleBg}; padding: 16px 20px; }
  #prog-instant-action-strip { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
  .eb-action-btn { padding: 9px 15px; font-size: 14px; font-weight: 500; font-family: ${t.fontSans}; background: ${t.cardBg}; color: ${t.textPrimary}; border: none; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; white-space: nowrap; }
  .eb-action-btn:hover { color: ${t.brandPrimary}; background: ${t.brandSoftBg}; }
  #tripwire-upsell-box { display: none; margin-top: 8px; padding: 9px 13px; background: ${t.safeSoftBg}; color: ${t.textPrimary}; font-size: 13px; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  #sticky-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9990; display: flex !important; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 20px; background: ${t.dockBg}; backdrop-filter: blur(14px); color: ${t.textPrimary}; font-family: ${t.fontSans}; transform: translateY(120%); opacity: 0; visibility: hidden; pointer-events: none; transition: transform 250ms ease, opacity 250ms ease, visibility 250ms ease; }
  #sticky-mobile-bar.eb-dock-visible { transform: translateY(0); opacity: 1; visibility: visible; pointer-events: auto; }
  #eb-sticky-email-form, #btn-sticky-micro-unlock, #btn-copy-readme-badge, #btn-nuqs-share-url, #stickyDock, #eb-mobile-firstfold-bar { display: none !important; }
  #eb-ouibounce-toast { display: none; position: fixed; bottom: 62px; right: 16px; max-width: 350px; z-index: 9991; background: ${t.cardBg}; color: ${t.textPrimary}; padding: 15px; font-family: ${t.fontSans}; }
  #eb-cmdk-modal { display: none; position: fixed; inset: 0; z-index: 9995; background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(4px); align-items: flex-start; justify-content: center; padding-top: 70px; font-family: ${t.fontSans}; }
  @media (max-width: 768px) {
    #eb-mobile-firstfold-bar { display: flex !important; margin: 8px 0 10px 0 !important; }
    .top-ticker { display: none !important; } .nav-links { flex-wrap: nowrap !important; overflow-x: auto !important; white-space: nowrap !important; }
    .hero-section, main > section:first-child { padding-top: 14px !important; } main h1 { font-size: 1.6rem !important; line-height: 1.14 !important; margin-bottom: 6px !important; }
    .hero-sub, .subhead, .editorial-subhead, .hero-lead { font-size: 0.85rem !important; line-height: 1.34 !important; margin-bottom: 6px !important; }
    .site-header .btn, header .btn { padding: 6px 10px !important; font-size:13px !important; } .preset-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
    #eb-bottom-conversion-suite { padding: 0 14px; margin: 28px auto 82px auto; } .eb-panel-card { padding: 16px; }
    .eb-gbb-grid, #eb-pseo-hero-split, #eb-curtain-visual-split, #eb-interactive-control-row { grid-template-columns: 1fr; }
    .eb-doppelrand-img { height: 124px; } #free-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    #preset-chips { gap: 4px; } #preset-chips .preset-chip { font-size:13px; padding: 5px 3px; } #sticky-mobile-bar { padding: 7px 12px; gap: 6px; }
  }
  @media print {
    header, nav, footer, #sticky-mobile-bar, #eb-ouibounce-toast, #eb-cmdk-modal, #eb-floating-gate-popover, #prog-share-toolbar, #in-card-unlock-bar, #eb-sovrn-affiliate-strip, button, .preset-chip { display: none !important; }
    body, .eb-panel-card { background: #FFFFFF !important; color: #000000 !important; }
  }
</style>`;
}

function buildActionButtonsHtml(cfg) {
  const actions = cfg.exportActions || [
    { id: 'btn-copy-shopping-list', label: 'Copy Summary', type: 'copy' },
    { id: 'btn-export-csv', label: 'Export .CSV', href: '/api/github-upgrade/export.csv' },
    { id: 'btn-export-ics', label: '.ICS Schedule', href: '/api/github-upgrade/skin-cycling.ics' },
    { id: 'btn-export-llms', label: 'Protocol .TXT', href: '/api/github-upgrade/llms-bundle.txt' },
    { id: 'btn-print-summary', label: 'Print PDF', type: 'print' },
    { id: 'btn-showroom-hud', label: cfg.hudLabel, type: 'hud' },
    { id: 'btn-cmdk-trigger', label: '⌘K Actions', type: 'cmdk' },
    { id: 'btn-reddit-share', label: 'Reddit MD', type: 'reddit' }
  ];
  return actions.map((a) => {
    if (a.href) return `<a id="${esc(a.id)}" class="eb-action-btn" href="${esc(a.href)}" download onclick="window.__ebShowTripwire()">${esc(a.label)}</a>`;
    const fn = a.type === 'copy' ? 'window.__ebCopySummary()' : a.type === 'print' ? 'window.__ebPrintSheet()' : a.type === 'hud' ? 'window.__ebToggleHud()' : a.type === 'cmdk' ? 'window.__ebToggleCmdk()' : 'window.__ebCopyReddit()';
    return `<button type="button" id="${esc(a.id)}" class="eb-action-btn" onclick="${fn}">${esc(a.label)}</button>`;
  }).join('');
}

function buildScenarioAndExportWorkbenchHtml(cfg) {
  const t = getTheme(cfg);
  const presetsHtml = cfg.presets.map((p, idx) => `<button type="button" class="preset-chip" data-preset="${esc(p.key)}" onclick="window.__ebApplyPreset('${esc(p.key)}', ${idx})">${esc(p.label)}</button>`).join('');
  const kpisHtml = cfg.kpis.map((k) => `<div class="eb-kpi-card"><div class="eb-kpi-label">${esc(k.label)}</div><div class="eb-kpi-val metric-box-value">${esc(k.val)}</div><div class="eb-kpi-sub">${esc(k.sub)}</div></div>`).join('');
  const pillsHtml = cfg.coMarketingPills.map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`).join('');
  const actionsHtml = buildActionButtonsHtml(cfg);
  return `<div id="eb-executive-strip" class="eb-panel-card" aria-label="${esc(cfg.brandName)} Scenario Simulator & Export Utilities">
  <div id="results-section" style="display:block;">
    <div class="eb-strip-top-bar"><span class="eb-strip-tag">${esc(cfg.brandName)} Interactive Benchmark &amp; Export Utilities</span><span id="headline-unlock-explainer" style="font-size:13px;color:${t.textMuted};">${esc(cfg.explainerText)}</span></div>
    <div id="preset-chips">${presetsHtml}</div>
    <div id="eb-interactive-control-row"><input type="text" id="eb-fuse-search-input" placeholder="${esc(cfg.searchPlaceholder || 'Filter scenario...')}" aria-label="Filter Scenario" oninput="window.__ebRunFuseSearch(this.value)" /><label class="eb-slider-wrap" for="eb-nouislider-range"><span id="eb-slider-readout">${esc(cfg.sliderLabel || 'Scale')}: ${esc(cfg.sliderVal || 50)}</span><input type="range" id="eb-nouislider-range" min="${esc(cfg.sliderMin || 1)}" max="${esc(cfg.sliderMax || 100)}" value="${esc(cfg.sliderVal || 50)}" oninput="window.__ebOnSliderInput(this.value)" /></label></div>
    <div id="free-metrics-grid" class="grid-metrics">${kpisHtml}<div class="stat-pill-locked" id="summary-report-card"><div class="eb-locked-top"><span style="font-size:13px;font-weight:700;color:${t.brandText};">${esc(cfg.lockedTitle)}: Channel &amp; Protocol Insights</span><button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Toggle Insight ▾</button></div><div class="eb-store-pills">${pillsHtml}</div><div id="inline-aisle-peek-drawer"><div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div></div></div></div>
    <div id="lead-squeeze-card"><div id="prog-instant-action-strip">${actionsHtml}<button type="button" id="btn-calc" class="eb-action-btn" style="background:${t.brandSoftBg};color:${t.brandText};border-color:${t.accentBorder};font-weight:700;" onclick="window.__ebTriggerHostCalc()">Recalculate ↗</button></div><div id="tripwire-upsell-box"><span>Need the full unblurred production deliverable &amp; multi-row exports? Unlock the <strong>Single-Audit Export Pass ($1.99)</strong>: one-time payment, no subscription.</span><button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock $1.99 Pass →</button></div><div id="eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-variant-numeric:tabular-nums;font-size:13px;">[${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}</div></div>
  </div>
</div>`;
}

function buildBottomConversionSuiteHtml(cfg, reqPath) {
  const t = getTheme(cfg);
  const shareUrl = `https://${cfg.domain}${reqPath || '/'}`;
  const redditHref = `https://www.reddit.com/r/${cfg.redditSub}/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cfg.brandName + ' Benchmark & Protocol')}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Ran a live audit on ' + cfg.brandName)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(cfg.brandName + ' Summary')}&body=${encodeURIComponent('Review this scenario: ' + shareUrl)}`;

  const pillsHtml = cfg.coMarketingPills
    .map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`)
    .join('');

  const actionsHtml = buildActionButtonsHtml(cfg);

  const affiliatesHtml = cfg.affiliates.map((a) => `<a href="${esc(a.url)}" target="_blank" rel="noopener sponsored" class="eb-tier-card" style="text-decoration:none;color:${t.textPrimary};" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(a.title)}' })"><div><span style="font-size:13.5px;font-weight:500;color:${t.safeColor};">${esc(a.badge)}</span><div style="font-family:${t.fontDisplay};font-size:1.25rem;font-weight:400;margin-top:6px;color:${t.textPrimary};line-height:1.3;">${esc(a.title)}</div></div><div style="margin-top:12px;font-size:14px;color:${t.brandPrimary};font-weight:500;">${esc(a.cpa)} →</div></a>`).join('');

  const bc = cfg.battlecard || {
    heading: `Why ${cfg.brandName} Outperforms Traditional Alternatives`, colLegacy: 'Legacy Suites', colManual: 'Manual Guesswork',
    rows: [
      ['Diagnostic Precision', '< 15ms Deterministic Engine', 'Slow Legacy Audits', 'Manual Trial & Error'],
      ['Actionable Deliverable', cfg.deliverableName, 'Generic Reports', 'Static Notes'],
      ['Transparent Pricing', `$1.99 Single Pass or $${cfg.corePriceUsd} Complete`, '$199+/mo Subscriptions', 'High Error Cost']
    ]
  };

  const battlecardRowsHtml = bc.rows.map((r, idx) => `<tr style="${idx < bc.rows.length - 1 ? `` : ''}"><td style="padding:14px 16px;font-weight:500;">${esc(r[0])}</td><td style="padding:14px 16px;color:${t.safeColor};font-weight:500;">${esc(r[1])}</td><td style="padding:14px 16px;color:${t.textSecondary};">${esc(r[2])}</td><td style="padding:14px 16px;color:${t.textSecondary};">${esc(r[3])}</td></tr>`).join('');
  const savingsPct = Math.max(50, Math.round((1 - 1.99 / cfg.corePriceUsd) * 100));

  return `<section id="eb-bottom-conversion-suite" class="container" aria-label="${esc(cfg.brandName)} Export Passes, Comparisons & Partner Ecosystem">
  <div id="in-card-unlock-bar" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div><span style="font-size:13.5px;font-weight:500;letter-spacing:0.03em;color:${t.brandPrimary};">Instant Vanity Card &amp; Ritual Calendar · 30-Day Guarantee</span><h2 id="in-card-unlock-title" style="margin:6px 0 0 0;font-size:clamp(1.65rem,2.4vw,2.25rem);font-family:${t.fontDisplay};font-weight:300;color:${t.textPrimary};letter-spacing:-0.02em;">${esc(cfg.unlockBannerTitle)}</h2></div>
      <div id="tab-btn-dossier" style="font-size:13.5px;font-weight:500;color:${t.safeColor};background:${t.safeSoftBg};padding:7px 14px;">Most Loved · $1.99 Single-Routine Pass (One-Time)</div>
    </div>
    <div class="eb-gbb-grid">
      <div class="eb-tier-card featured">
        <div><div class="eb-doppelrand-shell" style="margin:0 0 14px 0;"><div class="eb-doppelrand-inner"><img src="/public/editorial-dossier.jpg" alt="${esc(cfg.brandName)} Deliverable Dossier" class="eb-doppelrand-img" style="height:132px;object-position:center 35%;" loading="lazy" /></div></div><div style="font-size:13px;font-weight:500;letter-spacing:0.03em;color:${t.brandPrimary};">${esc(cfg.tier1Tag || `SINGLE-AUDIT PASS • SAVE ${savingsPct}% VS $${cfg.corePriceUsd}`)}</div><div class="matrix-price" style="font-family:${t.fontDisplay};font-size:36px;font-weight:300;margin:8px 0;min-height:46px;display:flex;align-items:baseline;gap:8px;color:${t.textPrimary};">$1.99 <span style="font-family:${t.fontSans};font-size:13.5px;font-weight:400;color:${t.textMuted};">one-time · no subscription</span></div><p style="font-size:15px;color:${t.textSecondary};margin:0 0 18px 0;line-height:1.6;">${esc(cfg.tier1Desc || `Instantly unblurs ${cfg.deliverableName}, downloadable exports, and 24-hour recalculations.`)}</p></div>
        <button type="button" id="btn-prog-flash-pass" class="cta-btn" style="width:100%;padding:13px 16px;background:${t.brandPrimary};color:#FFFFFF;font-weight:500;font-size:14.5px;border:none;" onclick="window.__ebCheckout('flash_pass')">Save Single-Routine Pass ($1.99) →</button>
      </div>
      <div class="eb-tier-card">
        <div><div class="eb-doppelrand-shell" style="margin:0 0 14px 0;"><div class="eb-doppelrand-inner"><img src="/public/editorial-hero.jpg" alt="${esc(cfg.brandName)} Complete Pack" class="eb-doppelrand-img" style="height:132px;object-position:center 50%;" loading="lazy" /></div></div><div style="font-size:13px;font-weight:500;letter-spacing:0.03em;color:${t.textSecondary};">${esc(cfg.tier2Tag || 'COMPLETE PACK')}</div><div class="matrix-price" style="font-family:${t.fontDisplay};font-size:36px;font-weight:300;margin:8px 0;min-height:46px;display:flex;align-items:baseline;gap:8px;color:${t.textPrimary};">$${esc(cfg.corePriceUsd)} <span style="font-family:${t.fontSans};font-size:13.5px;font-weight:400;color:${t.textMuted};">complete ritual kit</span></div><p style="font-size:15px;color:${t.textSecondary};margin:0 0 18px 0;line-height:1.6;">${esc(cfg.tier2Desc || cfg.coreLabel)}</p></div>
        <button type="button" id="btn-prog-full-dossier" class="cta-btn" style="width:100%;padding:13px 16px;background:${t.subtleBg};color:${t.textPrimary};font-weight:500;font-size:14.5px;border:none;" onclick="window.__ebCheckout('complete_dossier')">${esc(cfg.coreLabel)}</button>
      </div>
      <div class="eb-tier-card">
        <div><div class="eb-doppelrand-shell" style="margin:0 0 14px 0;"><div class="eb-doppelrand-inner"><img src="/public/editorial-serum.jpg" alt="${esc(cfg.brandName)} Pro Tier" class="eb-doppelrand-img" style="height:132px;object-position:center 68%;" loading="lazy" /></div></div><div style="font-size:13px;font-weight:500;letter-spacing:0.03em;color:${t.safeColor};">${esc(cfg.tier3Tag || 'PRO / UNLIMITED TIER')}</div><div class="matrix-price" style="font-family:${t.fontDisplay};font-size:36px;font-weight:300;margin:8px 0;min-height:46px;display:flex;align-items:baseline;gap:8px;color:${t.textPrimary};">$${esc(cfg.proPriceUsd)} <span style="font-family:${t.fontSans};font-size:13.5px;font-weight:400;color:${t.textMuted};">annual atelier pass</span></div><p style="font-size:15px;color:${t.textSecondary};margin:0 0 18px 0;line-height:1.6;">${esc(cfg.tier3Desc || cfg.proLabel)}</p></div>
        <button type="button" id="btn-prog-pro-b2b" class="cta-btn" style="width:100%;padding:13px 16px;background:${t.textPrimary};color:${t.canvasBg};font-weight:500;font-size:14.5px;border:none;" onclick="window.__ebCheckout('pro_b2b')">${esc(cfg.proLabel)}</button>
      </div>
    </div>
    <button type="button" id="btn-checkout" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Hidden Test Alias</button>
  </div>
  <div id="competitor-battlecard" class="eb-panel-card">
    <h3 style="margin:0 0 14px 0;font-size:clamp(1.35rem,1.9vw,1.75rem);font-family:${t.fontDisplay};font-weight:300;color:${t.textPrimary};letter-spacing:-0.02em;">${esc(bc.heading)}</h3>
    <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:15px;text-align:left;color:${t.textPrimary};"><thead><tr style="color:${t.textMuted};background:${t.subtleBg};"><th style="padding:12px 14px;">What Matters on Your Shelf</th><th style="padding:12px 14px;color:${t.brandPrimary};">${esc(cfg.brandName)}</th><th style="padding:12px 14px;">${esc(bc.colLegacy)}</th><th style="padding:12px 14px;">${esc(bc.colManual)}</th></tr></thead><tbody>${battlecardRowsHtml}</tbody></table></div>
  </div>
  <div id="eb-export-utility-bar" class="eb-panel-card">
    <div class="stat-pill-locked" id="summary-report-card" style="margin-bottom:14px;border:none;border-radius:0;">
      <div class="eb-locked-top"><span style="font-size:15px;font-weight:500;color:${t.brandText};">Quick Layering Tips for Your Bathroom Shelf</span><button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" style="border-radius:0;" onclick="window.__ebTogglePeekDrawer()">Show / Hide Tip ▾</button></div>
      <div class="eb-store-pills">${pillsHtml}</div>
      <div id="inline-aisle-peek-drawer"><div id="eb-peek-row-text" style="font-weight:400;font-size:15.5px;line-height:1.6;">${esc(cfg.coMarketingPills[0].rowText)}</div></div>
    </div>
    <details id="lead-squeeze-card" style="cursor:pointer;">
      <summary style="font-size:15px;font-weight:500;color:${t.textPrimary};list-style:none;display:flex;justify-content:space-between;align-items:center;"><span>Save to Phone Calendar, Print Routine Card, or Share Your Shelf</span><span style="color:${t.brandPrimary};font-size:14px;">More Options ▾</span></summary>
      <div style="display:flex;flex-direction:column;gap:10px;margin-top:14px;padding-top:6px;">
        <div id="prog-instant-action-strip">${actionsHtml}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;" id="prog-share-toolbar"><button type="button" id="btn-copy-scenario-link" class="eb-action-btn" onclick="window.__ebCopyScenarioLink(this)">Copy Routine Link</button><a id="btn-share-reddit" class="eb-action-btn" href="${esc(redditHref)}" target="_blank" rel="noopener">Share on SkincareAddiction</a><a id="btn-share-x" class="eb-action-btn" href="${esc(xHref)}" target="_blank" rel="noopener">Share on X</a><a id="btn-share-email" class="eb-action-btn" href="${esc(mailHref)}">Email My Routine</a><a class="eb-action-btn" href="/embed" target="_blank" rel="noopener" style="display:none;">Embed</a></div>
      </div>
      ${cfg.githubRepo ? `<div style="margin-top:12px;padding:14px 16px;background:${t.canvasBg};font-size:14.5px;line-height:1.55;color:${t.textSecondary};"><strong style="color:${t.textPrimary};font-weight:500;">${esc(cfg.githubRepo.badge)}:</strong> ${esc(cfg.githubRepo.summary)} <span style="color:${t.textMuted};">(${esc(cfg.githubRepo.name)})</span></div>` : ''}
      <div id="tripwire-upsell-box"><span>Want your printable vanity card &amp; 4-night phone calendar? Save the <strong>Single-Routine Pass ($1.99)</strong>: one-time pass, no subscription.</span><button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:500;" onclick="window.__ebCheckout('flash_pass')">Get $1.99 Pass →</button></div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:10px;padding:12px 16px;background:${t.cardBg};color:${t.safeColor};font-size:14px;line-height:1.5;">Evening Vanity Tip: Apply watery serums onto slightly damp skin, wait 60 seconds before rich creams, and tap "11 PM Vanity" at the top of the page for warm, low-glare bedtime reading.</div>
    </details>
  </div>
  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card"><div style="font-size:13.5px;font-weight:500;color:${t.brandPrimary};letter-spacing:0.03em;margin-bottom:6px;">Curated Barrier-Safe Companions · Verified Retailers</div><h3 style="margin:0 0 14px 0;font-size:clamp(1.3rem,1.8vw,1.65rem);font-family:${t.fontDisplay};font-weight:300;color:${t.textPrimary};letter-spacing:-0.02em;">Authorized Clinical &amp; Barrier-Recovery Essentials</h3><div class="eb-gbb-grid">${affiliatesHtml}</div></div>
  ${buildMobileSeoCrawlMeshHtml(cfg, reqPath)}
</section>

<!-- Floating Value-Gate Popover (Paid Choice Architecture: Zero $0 Cannibalization) -->
<div id="eb-floating-gate-popover" role="dialog" aria-label="Instant Deliverable Export Pass">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:13px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;letter-spacing:0.04em;">Instant Download</span>
    <button type="button" onclick="document.getElementById('eb-floating-gate-popover').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:15px;"></button>
  </div>
  <div id="eb-popover-title" style="font-family:${t.fontDisplay};font-size:16.5px;font-weight:700;color:${t.textPrimary};margin-bottom:4px;">Unlock &amp; Download ${esc(cfg.freeDeliverableName)}</div>
  <p id="eb-popover-desc" style="font-size:13px;color:${t.textSecondary};margin:0 0 10px 0;line-height:1.4;"><strong>Instant Browser Unlock + Download</strong> • No account required • <strong>$1.99 Full Bundle</strong> (save ${savingsPct}% vs. $${esc(cfg.corePriceUsd)}):</p>
  <div style="display:grid;gap:6px;">
    <button type="button" id="btn-popover-flash-pass" onclick="window.__ebCheckout('flash_pass')" style="width:100%;padding:10px 14px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:13px;">Get All Rows + 3-File Bundle: $1.99 →</button>
    <button type="button" id="btn-popover-micro-pass" onclick="window.__ebCheckout('micro_pass')" style="width:100%;padding:7px 12px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-weight:600;font-size:13px;">Or Single File Only: 99¢</button>
  </div>
  <form id="eb-popover-scorecard-form" onsubmit="return window.__ebSaveInlineScorecard(event, 'eb-popover-scorecard-email', 'eb-popover-scorecard-form')" style="margin-top:8px;padding-top:8px;">
    <div style="font-size:13px;font-weight:600;color:${t.textSecondary};margin-bottom:4px;">Want a free sample first? Reveal Row #4 on-screen + email 1-Page Summary:</div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:5px;">
      <input type="email" id="eb-popover-scorecard-email" placeholder="Your email to reveal Row #4..." required style="padding:5px 8px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:13px;" />
      <button type="submit" style="padding:5px 9px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-weight:700;font-size:13px;">Reveal Row #4 →</button>
    </div>
  </form>
</div>

<!-- Exit-Intent Spotlight Toast (#eb-ouibounce-toast) -->
<div id="eb-ouibounce-toast" role="dialog" aria-label="Send 1-Page Summary Before Leaving">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span id="eb-ouibounce-title" style="font-size:13px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;">Save Your Results Before Leaving</span>
    <button type="button" onclick="try{localStorage.setItem('eb_toast_dismissed_ts',String(Date.now()));}catch(_){}document.getElementById('eb-ouibounce-toast').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:14px;"></button>
  </div>
  <p id="eb-ouibounce-desc" style="font-size:13px;color:${t.textSecondary};margin:0 0 6px 0;line-height:1.4;">Email yourself the 1-Page Summary &amp; reveal Row #4 free, or grab the complete 3-file bundle for <strong>$1.99</strong>:</p>
  <div id="eb-objection-poll-strip" style="display:flex;gap:4px;flex-wrap:wrap;margin-bottom:7px;align-items:center;"><span style="font-size:11px;font-weight:700;color:${t.textMuted};">Quick feedback:</span><button type="button" class="eb-obj-pill" onclick="window.__ebLogObjection('just_browsing', this)" style="padding:2px 7px;border-radius:999px;border:1px solid ${t.border};background:${t.subtleBg};color:${t.textSecondary};font-size:11px;font-weight:600;cursor:pointer;">Just checking rates</button><button type="button" class="eb-obj-pill" onclick="window.__ebLogObjection('need_agency_depth', this)" style="padding:2px 7px;border-radius:999px;border:1px solid ${t.border};background:${t.subtleBg};color:${t.textSecondary};font-size:11px;font-weight:600;cursor:pointer;">Need Agency / Direct proof</button><button type="button" class="eb-obj-pill" onclick="window.__ebLogObjection('skip_card', this)" style="padding:2px 7px;border-radius:999px;border:1px solid ${t.border};background:${t.subtleBg};color:${t.textSecondary};font-size:11px;font-weight:600;cursor:pointer;">No card right now</button></div>
  <form onsubmit="return window.__ebSendExitSummary(event)" style="display:grid;grid-template-columns:1fr auto;gap:6px;margin-bottom:8px;">
    <input type="email" id="eb-ouibounce-email" placeholder="Your email (Reveal Row #4)..." required style="padding:6px 9px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:13px;" />
    <button type="submit" id="btn-ouibounce-submit" style="padding:6px 11px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandPrimary};font-size:13px;font-weight:700;border:1px solid ${t.accentBorder};">Send Summary →</button>
  </form>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
    <button type="button" id="btn-toast-micro-pass" onclick="window.__ebCheckout('micro_pass')" style="padding:7px 8px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-weight:600;font-size:13px;">Single File (99¢)</button>
    <button type="button" onclick="window.__ebCheckout('flash_pass')" style="padding:7px 8px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:13px;">Full Bundle ($1.99) →</button>
  </div>
</div>

<!-- Quick Routine Menu Modal -->
<div id="eb-cmdk-modal" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:${t.cardBg};border:1px solid ${t.border};border-radius:${t.radiusCard};width:92%;max-width:480px;padding:22px;color:${t.textPrimary};">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;">
      <span style="font-size:14px;font-weight:500;color:${t.brandPrimary};">${esc(cfg.brandName)} Quick Routine Menu</span>
      <button type="button" onclick="document.getElementById('eb-cmdk-modal').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:13.5px;">Close</button>
    </div>
    <div style="display:grid;gap:8px;">
      <button type="button" class="eb-action-btn" style="justify-content:space-between;padding:11px 14px;" onclick="window.__ebCheckout('flash_pass')"><span>Save Complete 3-Part Routine Kit</span><strong style="color:${t.brandPrimary};font-weight:500;">$1.99 →</strong></button>
      <a href="/api/github-upgrade/export.csv" download class="eb-action-btn" style="justify-content:space-between;padding:11px 14px;"><span>Save Ingredient Pairing Guide</span><strong style="font-weight:500;">Download ↗</strong></a>
      <a href="/api/github-upgrade/skin-cycling.ics" download class="eb-action-btn" style="justify-content:space-between;padding:11px 14px;"><span>Add 4-Night Schedule to Phone Calendar</span><strong style="font-weight:500;">Save ↗</strong></a>
      <a href="/dossier/sample" class="eb-action-btn" style="justify-content:space-between;padding:11px 14px;"><span>Preview Sample Routine Card</span><strong style="font-weight:500;">Open →</strong></a>
    </div>
  </div>
</div>

<!-- Frosted Light Editorial Conversion Dock (#sticky-mobile-bar) -->
<div id="sticky-mobile-bar" role="region" aria-label="Instant Access Conversion Dock">
  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
    <span style="display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:700;color:${t.textPrimary};"><span style="width:7px;height:7px;border-radius:50%;background:${t.safeColor};display:inline-block;"></span>${esc(cfg.brandName)}</span>
    <a href="#in-card-unlock-bar" id="sticky-sub-benefit" style="font-size:13px;color:${t.textSecondary};font-weight:600;text-decoration:none;">${esc(cfg.freeDeliverableName)}</a>
  </div>
  <form id="eb-sticky-email-form" onsubmit="return window.__ebSaveInlineScorecard(event, 'eb-sticky-email-input', 'eb-sticky-email-form')" style="display:inline-flex;align-items:center;gap:6px;margin:0;background:${t.subtleBg};padding:3px 5px 3px 10px;border-radius:999px;border:1px solid ${t.border};"><span style="font-size:13px;font-weight:600;color:${t.textSecondary};white-space:nowrap;">Free Row #4 Preview:</span><input type="email" id="eb-sticky-email-input" placeholder="you@email.com" required style="border:none;background:transparent;font-size:13px;color:${t.textPrimary};width:135px;outline:none;" /><button type="submit" id="btn-sticky-email-submit" style="padding:4px 10px;border-radius:999px;background:#FFFFFF;color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;">Send ↵</button></form>
  <div style="display:flex;align-items:center;gap:6px;">
    <button type="button" id="btn-sticky-micro-unlock" class="eb-action-btn" style="background:transparent;color:${t.textSecondary};font-weight:600;border:1px solid ${t.border};padding:5px 10px;border-radius:${t.radiusPill};font-size:13px;" onclick="window.__ebCheckout('micro_pass')">99¢ File</button>
    <button type="button" id="btn-sticky-flash-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;border:none;padding:7px 14px;border-radius:${t.radiusPill};" onclick="window.__ebCheckout('flash_pass')">Get Full Pack ($1.99) →</button>
    <button type="button" id="btn-dock-flash-pass" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Get Full Pack ($1.99)</button>
  </div>
</div>`;
}

function buildClientRuntimeScript(cfg) {
  const t = getTheme(cfg);
  const pillMap = {};
  for (const p of cfg.coMarketingPills) pillMap[p.key] = p.rowText;
  const firstPartner = cfg.affiliates && cfg.affiliates[0] ? cfg.affiliates[0] : { title: 'Verified Partner', url: '#', cpa: 'Explore' };
  const remDiff = cfg.remediationDiff || { beforeLine: '- [BEFORE] Legacy baseline', afterLine: '+ [AFTER] Optimized baseline', roiBadge: 'Verified Lift' };

  return `<script id="exact-baseline-client-runtime">
(function() {
  var CFG = ${JSON.stringify({
    moduleId: cfg.moduleId, brandName: cfg.brandName, domain: cfg.domain, corePriceUsd: cfg.corePriceUsd,
    coreLabel: cfg.coreLabel, freeDeliverableName: cfg.freeDeliverableName || 'Production Deliverable',
    deliverableName: cfg.deliverableName || 'Complete Pro Deliverable',
    deliverableFiles: cfg.deliverableFiles || [], presets: (cfg.presets || []).slice(0, 3),
    searchPlaceholder: cfg.searchPlaceholder || 'Enter domain or brand...',
    sliderLabel: cfg.sliderLabel || 'Scale', theme: t, firstPartner, remDiff, pillMap, presetKpis: cfg.presetKpis || {}
  })};

  var STORAGE_KEY = 'eb_paid_unlocked_v6_' + CFG.moduleId;
  window.__ebIsUnlocked = false;
  window.__ebActiveEntity = '';
  window.__ebUserInteracted = false;
  var PERSONA = ({
    derm_logic: { leadBtn: 'Email My AM/PM Routine', leadPh: 'Your email for AM/PM Routine...', microBtn: '9:16 Phone Card (99¢)', ctaTitle: 'Your Routine Check Is Ready:', heroTitle: 'Morning & Night Skincare Layering Guide', heroSub: 'Checks Vitamin C, Retinol, Peptides & Exfoliants for Clashes', heroBadge: 'Dermatologist-Rule Checked', dossierTag: 'Safe AM/PM Routine & Phone Card', lossHook: 'Active pH & Serum Deactivation Clash Detected in Your Routine Stack', pureCta: 'Fix Routine Clashes & Unlock 9:16 Phone Card ($1.99 Stripe Express →)' },
    sponsor_radar: { leadBtn: 'Email Pitch + Sponsor Row', leadPh: 'Work email for Pitch & Rates...', microBtn: 'Buyer Email + CSV (99¢)', ctaTitle: 'Sponsor Match Ready:', heroTitle: 'Verified Podcast & Newsletter Sponsor Tracker', heroSub: 'See Which Brands Renew 3+ Times, Ad Rates & Contacts', heroBadge: '3+ Repeat Renewals Verified', dossierTag: 'Sponsor Contacts & Rate Card CSV', lossHook: '14 Verified 3x-Renewed Sponsor Contacts & Negotiated CPMs Locked in Preview', pureCta: 'Unlock Verified Sponsor Emails, CPM Ledger & Pitch Pack ($1.99 Stripe Express →)' },
    citation_forge: { leadBtn: 'Email AI Search Report', leadPh: 'Work email for AI Search Report...', microBtn: 'AI Crawler File (99¢)', ctaTitle: 'AI Search Check Ready:', heroTitle: 'ChatGPT, Perplexity & Google AI Visibility Check', heroSub: 'See Where Competitors Outrank You & Download Your Fix Files', heroBadge: 'Ready for AI Search', dossierTag: 'AI Crawler & Structured Data Pack', lossHook: '3 Critical AI Crawler & Schema Gaps Costing ~77% of ChatGPT & Perplexity Citations', pureCta: 'Fix All 3 Gaps & Download /llms.txt + Schema Pack ($1.99 Stripe Express →)' },
    abandon_alpha: { leadBtn: 'Email Recovery Schedule', leadPh: 'Work email for Recovery Schedule...', microBtn: 'Retry Script (99¢)', ctaTitle: 'Revenue Recovery Estimate Ready:', heroTitle: 'Abandoned Cart & Failed Stripe Payment Recovery', heroSub: 'Smart Exit Offers & Bank-Timed Card Retry Schedule', heroBadge: 'Stripe & Shopify Ready', dossierTag: 'Smart Retry & Exit-Offer Script', lossHook: '$56,722/mo Recoverable Checkout & Failed-Card Revenue Leaking in Current Setup', pureCta: 'Unlock Payday Stripe Retry Worker & C1–C6 Bandit SDK ($1.99 Stripe Express →)' }
  })[CFG.moduleId] || { leadBtn: 'Email Summary', leadPh: 'Your email for Summary...', microBtn: 'Single File (99¢)', ctaTitle: 'Results Ready:', heroTitle: CFG.brandName + ' Guide', heroSub: 'Instant Check & Ready-to-Use Files', heroBadge: 'Verified', dossierTag: 'Ready-to-Use Bundle', lossHook: 'Critical Optimization Gaps Detected in Current Baseline', pureCta: 'Unlock Complete Fix Bundle ($1.99 Stripe Express →)' };
  ['pointerdown', 'keydown', 'input'].forEach(function(ev) { document.addEventListener(ev, function() { window.__ebUserInteracted = true; }, { passive: true, once: true }); });
  try {
    if (localStorage.getItem(STORAGE_KEY) === '1' || window.location.search.indexOf('checkout=success') !== -1 || window.location.search.indexOf('unlock=flash_pass') !== -1) {
      window.__ebIsUnlocked = true;
      localStorage.setItem(STORAGE_KEY, '1');
    }
  } catch (_) {}

  try {
    window.addEventListener('beforeinstallprompt', function(e) { e.preventDefault(); return false; });
    window.__ebVid = localStorage.getItem('vs_vid') || ('v_' + Math.random().toString(36).slice(2, 10) + '_' + Date.now().toString(36));
    localStorage.setItem('vs_vid', window.__ebVid);
    document.cookie = 'vs_vid=' + window.__ebVid + '; Path=/; Max-Age=31536000; SameSite=Lax';
    window.__ebSid = sessionStorage.getItem('vs_sid') || ('s_' + Math.random().toString(36).slice(2, 10));
    sessionStorage.setItem('vs_sid', window.__ebSid);
  } catch (_) { window.__ebVid = 'v_anon'; window.__ebSid = 's_anon'; }
  window.__ebLogEvent = function(eventType, meta) {
    try {
      var m = Object.assign({ vid: window.__ebVid, sid: window.__ebSid, js_hydrated: 1 }, meta || {});
      fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: eventType, page_url: window.location.pathname, meta: m }) }).catch(function(){});
    } catch (_) {}
  };

  window.__ebSaveBundleFile = function() {
    try {
      var targetEl = document.getElementById('compiler-code-output') || document.getElementById('res-pitch-body') || document.getElementById('out-sdk-snippet') || document.getElementById('appleWalletCardPreview');
      var bodyText = targetEl ? targetEl.textContent : (CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine);
      var blob = new Blob([CFG.brandName + ' Verified Deliverable Bundle\\n' + CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n\\n' + bodyText], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = CFG.moduleId + '-deliverable-bundle.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (_) {}
  };

  document.addEventListener('click', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="/api/affiliate"], a[rel*="sponsored"], a.affiliate-link-pill, a.affiliate-micro-link') : null;
    if (a && !a.hasAttribute('onclick')) {
      window.__ebLogEvent('affiliate_click', { partner: (a.textContent || '').trim().slice(0, 40), href: a.getAttribute('href') || '' });
    }
    var presetBtn = e.target && e.target.closest ? e.target.closest('[onclick*="recalcPseo"], [onclick*="pasteSample"], [onclick*="filterPlacements"], [onclick*="filterLedgerRows"], [onclick*="switchToolMode"], [onclick*="setBrandPreset"], [onclick*="setPresetDomain"], [onclick*="switchCompilerTab"], [onclick*="applyRoutinePreset"], .preset-btn, .obj-btn') : null;
    if (presetBtn) window.__ebLogEvent('calculate', { source: 'native_interactive_control' });
  }, { passive: true });

  window.__ebTriggerPostCalcSpotlight = function() {
    if (window.__ebIsUnlocked) return;
    var pcTitle = document.getElementById('eb-postcalc-cta-title');
    if (pcTitle) pcTitle.textContent = PERSONA.ctaTitle;
    window.__ebLogEvent('view_paywall', { target: 'vaul_post_calc_spotlight' });
  };

  window.__ebFillEmailDomain = function(inputId, domain, formId) {
    var inp = document.getElementById(inputId || 'eb-inline-scorecard-email');
    if (!inp) return;
    var val = (inp.value || '').trim();
    var prefix = val.split('@')[0].trim();
    if (prefix.length > 0) {
      inp.value = prefix + domain;
      window.__ebSaveInlineScorecard(null, inputId || 'eb-inline-scorecard-email', formId || 'eb-save-scorecard-bar');
    } else {
      inp.value = domain;
      inp.focus();
      try { inp.setSelectionRange(0, 0); } catch (_) {}
    }
  };

  window.__ebSetCurtainRoiScale = function(mult) {
    var m = Number(mult) || 1;
    var baseUsd = CFG.moduleId === 'citation_forge' ? 1420 : (CFG.moduleId === 'sponsor_radar' ? 4800 : (CFG.moduleId === 'derm_logic' ? 165 : 5600));
    var badge = document.getElementById('eb-curtain-roi-badge');
    if (badge) badge.textContent = 'Est. Value: $' + (baseUsd * m).toLocaleString() + ' (' + Math.round((baseUsd * m) / 0.99).toLocaleString() + 'x vs 99¢ Pass)';
    window.__ebLogEvent('calculate', { source: 'curtain_roi_scale', multiplier: m });
  };

  window.__ebCycleHeroScenario = function(ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    var list = (CFG.presets && CFG.presets.length) ? CFG.presets : [{ key: 'custom-benchmark', label: 'Live Scenario' }];
    window.__ebHeroPresetIdx = ((window.__ebHeroPresetIdx || 0) + 1) % list.length;
    var p = list[window.__ebHeroPresetIdx];
    var curves = ['M1 11 C 9 10, 14 4, 22 6 C 29 8, 34 2, 41 2', 'M1 12 C 10 6, 18 9, 26 4 C 32 2, 37 5, 41 1', 'M1 9 C 8 11, 16 3, 24 7 C 31 4, 36 3, 41 2'];
    var pathEl = document.getElementById('eb-sparkline-path'), lblEl = document.getElementById('eb-hero-sparkline-label');
    if (pathEl) pathEl.setAttribute('d', curves[window.__ebHeroPresetIdx % curves.length]);
    if (lblEl) lblEl.textContent = '' + p.label + ' Simulated';
    window.__ebCompileCustomCurtain(p.key);
  };

  window.__ebToggleSampleDemo = function(btn) {
    var pre = document.getElementById('eb-prism-proof-preview');
    if (!pre) return;
    if (pre.getAttribute('data-demo-open') === '1') {
      pre.setAttribute('data-demo-open', '0');
      pre.textContent = window.__ebLastCurtainPreview || pre.textContent;
      if (btn) btn.textContent = 'Peek Sample File Format (Demo)';
      return;
    }
    window.__ebLastCurtainPreview = pre.textContent;
    pre.setAttribute('data-demo-open', '1');
    var demoMap = {
      citation_forge: '# [SAMPLE DEMO FILE 1/3: /llms.txt • Benchmark: acme-demo.io]\\n> Acme Demo: Enterprise Cloud Workflow API & Documentation\\n## Core Citability Endpoints (AnswerDotAI v1.0 Spec)\\n- [Pricing & Tiers](https://acme-demo.io/pricing.md): Verified 2026 seat matrix\\n- [API Reference](https://acme-demo.io/docs/api.md): OpenAPI 3.1 + JSON-LD @graph\\n// [YOUR CUSTOM DOMAIN FILES (llms.txt + schema.jsonld + robots.txt) UNLOCK FOR $1.99]',
      sponsor_radar: '# [SAMPLE DEMO FILE 1/3: sponsor-outreach-pack.csv • Benchmark: DemoBrand]\\nBrand,Repeat_Renewals,Verified_CPM,Decision_Maker_Role,Direct_Buyer_Email\\nDemoBrand,4x Renewed (My First Million),$38.00 CPM,VP Growth & Partnerships,[UNLOCKED_IN_$1.99_PACK]\\n// [YOUR SELECTED BRAND DIRECT EMAILS, 14-SHOW LEDGER & 3-FLIGHT PITCH UNLOCK FOR $1.99]',
      derm_logic: '# [SAMPLE DEMO FILE 1/3: am-pm-skin-cycling.ics • Benchmark: Demo Routine]\\n[AM MORNING ORDER]: 1. Gentle Cleanser (pH 5.5) -> 2. Vitamin C 15% (pH 3.2 • Wait 12m) -> 3. SPF 50\\n[PM NIGHT 1 (EXFOLIATE)]: Cleanser -> Glycolic 7% -> 3:1:1 Ceramide Barrier Cream\\n[PM NIGHT 2 (RETINOID)]: Cleanser -> Retinol 0.5% (Separated from Acids) -> Peptide Seal\\n// [YOUR CUSTOM INGREDIENT RESOLUTION, 4-NIGHT CALENDAR & 9:16 PHONE CARD UNLOCK FOR $1.99]',
      abandon_alpha: '// [SAMPLE DEMO FILE 1/3: stripe-retry-worker.js • Benchmark: DemoStore DTC]\\nexport const RETRY_WINDOWS = { insufficient_funds: ["Fri 09:05 Local (Payday)", "+48h"], do_not_honor: ["+4h 3DS Fallback", "ApplePay_Link"] };\\nexport const BANDIT_ARMS = { C1_PRICE: "SAVE15", C2_SHIPPING: "FREESHIP_VIP" };\\n// [YOUR STORE CUSTOM C1-C6 BANDIT SDK TAG & STRIPE WEBHOOK WORKER UNLOCK FOR $1.99]'
    };
    pre.textContent = demoMap[CFG.moduleId] || demoMap.citation_forge;
    if (btn) btn.textContent = '↺ Back to Your Diagnostic Summary';
    window.__ebLogEvent('tab_switch', { store_pill: 'peek_sample_demo' });
  };

  window.__ebCompileCustomCurtain = function(presetKey, customBadge, customDiagLine) {
    window.__ebUserInteracted = true;
    var inp = document.getElementById('eb-curtain-entity-input'), qIn = document.getElementById('eb-pseo-quick-input');
    if (presetKey && inp) inp.value = presetKey;
    if (presetKey && qIn) qIn.value = presetKey;
    var q = inp && inp.value.trim() ? inp.value.trim() : (presetKey || window.__ebActiveEntity || 'custom-audit');
    window.__ebActiveEntity = q;
    if (window.history && window.history.replaceState && window.location.search.indexOf('pub=') === -1) { try { window.history.replaceState(null, '', window.location.pathname + '?q=' + encodeURIComponent(q)); } catch (_) {} }
    window.__ebLogEvent('calculate', { source: 'curtain_custom_compile', query: q });
    var dPill = document.getElementById('eb-dossier-format-pill'), f0 = (CFG.deliverableFiles && CFG.deliverableFiles[0]) || { file: 'bundle.txt', size: '4.2 KB' };
    if (dPill) { dPill.textContent = '' + f0.file + ' (' + f0.size + ')'; dPill.style.transform = 'scale(1.06)'; setTimeout(function() { dPill.style.transform = 'scale(1)'; }, 180); }
    var spLbl = document.getElementById('eb-hero-sparkline-label');
    if (spLbl) spLbl.textContent = '' + q.slice(0, 18) + ' Active';
    var badgeEl = document.getElementById('eb-curtain-roi-badge');
    if (badgeEl && customBadge) badgeEl.textContent = customBadge;
    fetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(q))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var hdr = document.getElementById('eb-curtain-title-span'), qRd = document.getElementById('eb-quick-live-readout') || document.getElementById('eb-mobile-live-readout');
        if (hdr) hdr.textContent = 'Personalized Routine Kit';
        if (badgeEl && customBadge) badgeEl.textContent = customBadge;
        if (qRd && data && data.kpis) { qRd.style.display = 'inline-flex'; qRd.style.alignItems = 'center'; qRd.style.gap = '10px'; qRd.innerHTML = '<span style="padding:6px 12px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-size:13.5px;font-weight:500;">' + data.kpis[0] + '</span><button type="button" onclick="var c=document.getElementById(\\\'radar-results-container\\\')||document.getElementById(\\\'eb-deliverable-curtain\\\');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'start\\\'});" style="padding:7px 14px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.brandPrimary + ';border:none;font-size:13.5px;font-weight:500;cursor:pointer;">' + (CFG.moduleId === 'derm_logic' ? 'See Morning &amp; Night Order ↓' : 'View Live Table ↓') + '</button>'; }
        var pills = document.getElementById('eb-manifest-pills-left') || document.getElementById('eb-zod-manifest-pills');
        if (pills && CFG.deliverableFiles) {
          pills.innerHTML = CFG.deliverableFiles.map(function(f, idx) {
            var titleTxt = f.label || f.schema || f.file, subTxt = f.desc || f.schema || '';
            return '<div class="eb-manifest-pill" onclick="window.__ebSelectManifestFile(' + idx + ', this)" style="cursor:pointer;display:flex;flex-direction:column;gap:4px;padding:14px 16px;background:' + (idx === 0 ? CFG.theme.brandSoftBg : CFG.theme.subtleBg) + ';color:' + (idx === 0 ? CFG.theme.brandPrimary : CFG.theme.textPrimary) + ';"><span style="font-size:15px;font-weight:500;">' + titleTxt + '</span><span style="font-size:13.5px;color:' + CFG.theme.textSecondary + ';line-height:1.4;">' + subTxt + '</span></div>';
          }).join('');
        }
        var pre = document.getElementById('eb-prism-proof-preview');
        if (pre && data) { pre.setAttribute('data-demo-open', '0'); pre.textContent = (customDiagLine || CFG.remDiff.beforeLine) + '\\n\\n' + CFG.remDiff.afterLine; window.__ebLastCurtainPreview = pre.textContent; }
        var btn = document.getElementById('btn-curtain-flash-pass'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
        if (btn) btn.textContent = 'Save Complete 3-Part Ritual Kit ($1.99) →';
        if (pcBtn) pcBtn.textContent = 'Save Complete 3-Part Ritual Kit ($1.99) →';
        window.__ebTriggerPostCalcSpotlight(q);
      }).catch(function(){});
  };

  window.__ebMountDeliverableCurtain = function(entityOverride, customBadge, customDiagLine) {
    if (entityOverride) window.__ebActiveEntity = String(entityOverride);
    var targetEl = document.getElementById('compiler-code-output') || document.getElementById('res-pitch-body') || document.getElementById('out-sdk-snippet') || document.getElementById('walletConflicts') || document.getElementById('appleWalletCardPreview');
    if (CFG.moduleId === 'sponsor_radar') { var nd = document.getElementById('res-dm-email'); if (nd && nd.textContent.indexOf('@') !== -1 && nd.textContent.indexOf('***') === -1) { nd.setAttribute('data-raw-email', nd.textContent); var parts = nd.textContent.trim().split('@'); nd.textContent = '[verified-buyer]***@' + (parts[1] || 'brand.com').slice(0, 18) + ' + Agency Desk'; } }
    var isLeaderboard = window.location.pathname === '/leaderboard';
    var isScanPage = window.location.pathname.indexOf('/scan/') === 0 || window.location.pathname.indexOf('/report/') === 0;
    var isPseoOrDir = window.location.pathname.indexOf('/seo/') === 0 || window.location.pathname.indexOf('/tools/') === 0 || window.location.pathname.indexOf('/compare/') === 0 || window.location.pathname === '/directory';
    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody') || document.querySelector('main table tbody, article table tbody');
    if (tbody && !window.__ebIsUnlocked && !isLeaderboard) {
      var trs = tbody.querySelectorAll('tr');
      for (var r0 = 0; r0 < Math.min(3, trs.length); r0++) {
        if (!trs[r0].hasAttribute('data-eb-live-row')) {
          trs[r0].setAttribute('data-eb-live-row', String(r0 + 1)); trs[r0].title = 'Click row to benchmark & compile custom deliverable';
          var tdFirst = trs[r0].querySelector('td, th');
          if (tdFirst && !tdFirst.querySelector('.eb-row-sim-pill')) tdFirst.insertAdjacentHTML('beforeend', ' <span class="eb-row-sim-pill" style="display:none;">Sim</span>');
          trs[r0].addEventListener('click', function(ev) { if (ev.target && ev.target.closest && ev.target.closest('a, button, input')) return; this.style.background = CFG.theme.brandSoftBg; var td0 = this.querySelector('td, th'), ent = td0 ? (td0.textContent || '').replace('Sim', '').trim().slice(0, 36) : ''; if (ent) window.__ebCompileCustomCurtain(ent); });
        }
      }
      for (var r = 3; r < trs.length; r++) { trs[r].classList.add('eb-blurred-deliverable'); if (r >= 5) trs[r].style.display = 'none'; }
      if ((trs.length > 3 || (isPseoOrDir && trs.length >= 2)) && !document.getElementById('eb-table-row4-gate-tr')) {
        var gateTr = document.createElement('tr'); gateTr.id = 'eb-table-row4-gate-tr'; gateTr.style.cssText = 'cursor:pointer;background:' + CFG.theme.brandSoftBg + ';';
        gateTr.onclick = function() { window.__ebCheckout('flash_pass'); };
        gateTr.innerHTML = '<td colspan="8" style="padding:12px 18px;font-family:' + CFG.theme.fontSans + ';font-size:13.5px;color:' + CFG.theme.textPrimary + ';"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;"><span><strong>' + (trs.length > 3 ? ('Full 65-Active Ingredient Guide (Rows 4–' + trs.length + '):') : 'Complete Routine &amp; Layering Guide:') + '</strong> Instant access to all active pairings &amp; your 9:16 lock-screen card</span><span style="display:inline-flex;gap:8px;align-items:center;"><button type="button" onclick="event.stopPropagation();window.__ebCheckout(\\\'micro_pass\\\')" style="padding:7px 13px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.brandPrimary + ';font-size:13px;font-weight:500;cursor:pointer;border:none;">9:16 Phone Card (99¢)</button><span style="padding:8px 15px;background:' + CFG.theme.brandPrimary + ';color:#FAF6F0;font-size:13px;font-weight:500;white-space:nowrap;">Unlock All 65 Actives ($1.99) →</span></span></div></td>';
        if (trs.length > 3) tbody.insertBefore(gateTr, trs[3]); else tbody.appendChild(gateTr);
      }
      var tblEl = tbody.closest('table'), tblWrap = tblEl ? (tblEl.closest('.table-wrap, .posterior-table-wrap') || tblEl) : null;
      if (tblWrap && tblWrap.parentNode && !document.getElementById('eb-tanstack-table-bar')) {
        var tBar = document.createElement('div'); tBar.id = 'eb-tanstack-table-bar';
        tBar.style.cssText = 'display:' + (isPseoOrDir ? 'flex' : 'none') + ';justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding:9px 12px;margin-bottom:10px;background:' + CFG.theme.subtleBg + ';font-family:' + CFG.theme.fontSans + ';';
        tBar.innerHTML = '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:200px;"><span style="font-size:13px;font-weight:700;color:' + CFG.theme.brandPrimary + ';white-space:nowrap;">Filter Table:</span><input type="search" id="eb-tanstack-filter-input" placeholder="Search rows or test your own..." oninput="window.__ebFilterAndCalcTable(this.value)" style="flex:1;padding:6px 10px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.textPrimary + ';font-size:13.5px;border:none;" /></div>'
          + '<div style="display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" id="btn-tanstack-sort" onclick="window.__ebSortTableRows()" style="padding:6px 11px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.textPrimary + ';font-size:13px;font-weight:600;cursor:pointer;border:none;">Sort by Impact</button><button type="button" id="btn-tanstack-micro-pass" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="padding:6px 10px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.brandPrimary + ';font-size:12.5px;font-weight:700;cursor:pointer;border:none;">99¢ Single File</button><button type="button" id="btn-tanstack-unlock-rows" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:6px 12px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';font-size:13px;font-weight:700;cursor:pointer;border:none;">Unlock Full Table ($1.99)</button></div>';
        tblWrap.parentNode.insertBefore(tBar, tblWrap);
      }
    }
    var h1Node = document.querySelector('main h1, article h1, h1');
    if (h1Node && !window.__ebActiveEntity && (isPseoOrDir || isLeaderboard || isScanPage)) {
      if (window.location.pathname === '/directory') {
        window.__ebActiveEntity = '72-Guide Formulation Archive';
      } else if (isLeaderboard) {
        window.__ebActiveEntity = 'Routine Harmony Leaderboard';
      } else {
        var rawH1 = (h1Node.textContent || '').replace(/\\s+/g, ' ').trim().split(/\\s*[—–|:]\\s*/)[0];
        if (rawH1.length > 36) rawH1 = rawH1.slice(0, 36).replace(/\\s+\\S*$/, '');
        window.__ebActiveEntity = rawH1.replace(/\\s+(?:&|and|\\+|-|vs\\.?)$/i, '').replace(/[,.;:\\s&+-]+$/, '');
      }
    }
    // Native enterable input with sample chips (datalist removed for clean UX)
    var sparkPillHtml = '<div id="eb-hero-sparkline-pill" onclick="window.__ebCycleHeroScenario(event)" title="Tap to preview example"><span style="width:6px;height:6px;border-radius:50%;background:' + CFG.theme.safeColor + ';"></span><svg aria-hidden="true" width="42" height="14" viewBox="0 0 42 14" fill="none" style="overflow:visible;"><path id="eb-sparkline-path" d="M1 11 C 9 10, 14 4, 22 6 C 29 8, 34 2, 41 2" stroke="' + CFG.theme.brandPrimary + '" stroke-width="1.8" stroke-linecap="round"/><circle cx="41" cy="2" r="2.2" fill="' + CFG.theme.safeColor + '"/></svg><span id="eb-hero-sparkline-label" class="eb-tabular" style="font-size:13px !important;font-weight:700 !important;color:' + CFG.theme.textPrimary + ';white-space:nowrap;">Live Preview</span></div>';
    var buildHeroCardEl = function(imgH, marginCss) {
      var hc = document.createElement('div'); hc.id = 'eb-doppelrand-hero-card'; hc.className = 'eb-doppelrand-shell'; hc.style.cssText = (marginCss || 'margin:0;') + 'cursor:pointer;';
      hc.onclick = function(ev) { window.__ebCycleHeroScenario(ev); };
      var hPx = (imgH || 168) + 'px';
      hc.innerHTML = '<div class="eb-doppelrand-inner">' + sparkPillHtml + '<div style="display:grid;grid-template-columns:1.3fr 0.9fr;gap:8px;height:' + hPx + ';"><img src="/public/editorial-woman-morning.jpg" alt="Morning Vitamin C vanity ritual" class="eb-doppelrand-img" style="height:' + hPx + ';object-position:center 20%;" loading="eager" fetchpriority="high" decoding="async" /><img src="/public/editorial-dossier.jpg" alt="Golden serum dropper and porcelain barrier cream on travertine" class="eb-doppelrand-img" style="height:' + hPx + ';object-position:center center;" loading="eager" fetchpriority="high" decoding="async" /></div><div class="eb-doppelrand-caption"><div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><strong style="font-size:13px !important;color:' + CFG.theme.textPrimary + ';font-weight:600 !important;">' + PERSONA.heroTitle + '</strong></div><span style="padding:2px 8px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-weight:600 !important;font-size:12.5px !important;white-space:nowrap;flex-shrink:0;">' + PERSONA.heroBadge + '</span></div></div>';
      return hc;
    };
    var existingHeroSplit = h1Node && h1Node.closest ? h1Node.closest('.hero-split, .hero-grid, .hero-editorial-grid') : null;
    var buildQBar = function(barId) {
      var qChips = (CFG.presets || []).slice(0, 3).map(function(p) { return '<button type="button" onclick="window.__ebCompileCustomCurtain(\\\'' + p.key + '\\\')" style="padding:6px 13px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.textPrimary + ';font-size:13.5px;font-weight:500;cursor:pointer;white-space:nowrap;border:none;">' + p.label + '</button>'; }).join('');
      var qBar = document.createElement('div'); qBar.id = barId || 'eb-pseo-quick-bar';
      var inId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-input' : 'eb-pseo-quick-input', emId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-email' : 'eb-quick-inline-email', fmId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-form' : 'eb-quick-inline-form', rdId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-live-readout' : 'eb-quick-live-readout', initScore = (CFG.kpis && CFG.kpis[0] && CFG.kpis[0].val) ? CFG.kpis[0].val : 'Morning & Night Guide';
      var initQVal = (isPseoOrDir && window.location.pathname !== '/directory' && window.__ebActiveEntity) ? String(window.__ebActiveEntity).replace(/["<>]/g, '').slice(0, 34) : '';
      qBar.style.cssText = 'display:flex;flex-direction:column;gap:10px;padding:16px 18px;margin:0;background:' + CFG.theme.subtleBg + ';font-family:' + CFG.theme.fontSans + ';';
      qBar.innerHTML = '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><span style="font-size:13.5px;font-weight:500;color:' + CFG.theme.brandPrimary + ';white-space:nowrap;">Popular Pairings:</span>' + qChips + '</div><div style="display:flex;align-items:center;gap:8px;width:100%;flex-wrap:wrap;"><input type="text" id="' + inId + '" value="' + initQVal + '" onchange="if(this.value)window.__ebCompileCustomCurtain(this.value)" placeholder="' + CFG.searchPlaceholder + '" onkeydown="if(event.keyCode===13){event.preventDefault();window.__ebCompileCustomCurtain(this.value);}" style="flex:1;min-width:180px;padding:8px 12px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.textPrimary + ';font-size:14px;border:none;" /><button type="button" onclick="var v=document.getElementById(\\\'' + inId + '\\\').value;window.__ebCompileCustomCurtain(v||window.__ebActiveEntity);var c=document.getElementById(\\\'radar-results-container\\\')||document.getElementById(\\\'eb-deliverable-curtain\\\');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'start\\\'});" style="padding:8px 16px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:14px;font-weight:500;cursor:pointer;white-space:nowrap;">Check Pairing</button><span id="' + rdId + '" style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;"><span style="padding:6px 12px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-size:13.5px;font-weight:500;white-space:nowrap;">' + initScore + '</span><button type="button" onclick="var c=document.getElementById(\\\'radar-results-container\\\')||document.getElementById(\\\'eb-deliverable-curtain\\\');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'start\\\'});" style="padding:7px 14px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.brandPrimary + ';border:none;font-size:13.5px;font-weight:500;cursor:pointer;white-space:nowrap;">' + (CFG.moduleId === 'derm_logic' ? 'See Morning &amp; Night Order ↓' : 'View Live Table ↓') + '</button></span></div>'
        + '<form id="' + fmId + '" onsubmit="return window.__ebSaveInlineScorecard(event, \\\'' + emId + '\\\', \\\'' + fmId + '\\\')" style="display:none;"><input type="email" id="' + emId + '" placeholder="' + PERSONA.leadPh + '" /><button type="submit">' + PERSONA.leadBtn + '</button></form>';
      return qBar;
    };
    if (isPseoOrDir) {
      if (!window.__ebIsUnlocked) Array.prototype.slice.call(document.querySelectorAll('.pitch-pre, .code-snippet-box code')).forEach(function(el) { el.classList.add('eb-blurred-deliverable'); });
      if (existingHeroSplit) {
        existingHeroSplit.style.alignItems = 'stretch';
        if (h1Node && h1Node.parentNode) { h1Node.parentNode.style.cssText += ';display:flex;flex-direction:column;justify-content:flex-start;gap:12px;height:100%;'; if (!window.__ebIsUnlocked && !document.getElementById('eb-pseo-quick-bar')) h1Node.parentNode.appendChild(buildQBar('eb-pseo-quick-bar')); }
        var teHeaderPseo = existingHeroSplit.querySelector('.telemetry-card .card-header-bar');
        if (teHeaderPseo && teHeaderPseo.parentNode && !document.getElementById('eb-doppelrand-hero-card')) teHeaderPseo.parentNode.insertBefore(buildHeroCardEl(128, 'margin:0 0 12px 0;'), teHeaderPseo.nextSibling);
      } else if (h1Node && h1Node.parentNode && !document.getElementById('eb-pseo-hero-split')) {
        var splitWrap = document.createElement('div'); splitWrap.id = 'eb-pseo-hero-split';
        var leftCol = document.createElement('div'); leftCol.id = 'eb-pseo-hero-left'; leftCol.style.cssText = 'display:flex;flex-direction:column;justify-content:flex-start;gap:10px;min-width:0;height:100%;';
        var leadP = document.querySelector('.pseo-lead') || (h1Node.nextElementSibling && h1Node.nextElementSibling.tagName === 'P' ? h1Node.nextElementSibling : null);
        h1Node.parentNode.insertBefore(splitWrap, h1Node.nextSibling);
        if (leadP) { leadP.classList.add('eb-pseo-lead-card'); if (!leadP.querySelector('div, span')) { var rawLead = leadP.innerHTML; leadP.innerHTML = '<div><div style="font-size:13.5px;font-weight:500;letter-spacing:0.03em;color:' + CFG.theme.brandPrimary + ';margin-bottom:10px;">Morning &amp; Bedtime Vanity Guide · ' + PERSONA.heroBadge + '</div><div style="font-size:clamp(1.2rem,1.08rem + 0.35vw,1.38rem);line-height:1.5;color:' + CFG.theme.textPrimary + ';">' + rawLead + '</div></div><div style="display:flex;gap:14px;flex-wrap:wrap;align-items:center;padding-top:12px;font-size:13.5px;color:' + CFG.theme.textSecondary + ';font-variant-numeric:tabular-nums;"><span style="padding:5px 11px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textPrimary + ';font-weight:500;">72 Layering Guides</span><span style="padding:5px 11px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textPrimary + ';font-weight:500;">65 Skincare Ingredients</span><span style="padding:5px 11px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-weight:500;">44 Popular Bottles</span></div>'; } leftCol.appendChild(leadP); }
        if (!window.__ebIsUnlocked && !document.getElementById('eb-pseo-quick-bar')) { var qb = buildQBar('eb-pseo-quick-bar'); if (window.location.pathname === '/directory') qb.style.display = 'none'; leftCol.appendChild(qb); }
        splitWrap.appendChild(leftCol); splitWrap.appendChild(buildHeroCardEl(168, 'margin:0;'));
      }
    } else if (!isLeaderboard && !isScanPage) {
      var nativePhotoShell = document.querySelector('.editorial-photo-shell');
      if (nativePhotoShell && !document.getElementById('eb-hero-sparkline-pill')) {
        nativePhotoShell.style.position = 'relative'; nativePhotoShell.style.cursor = 'pointer'; nativePhotoShell.onclick = function(ev) { window.__ebCycleHeroScenario(ev); }; nativePhotoShell.insertAdjacentHTML('beforeend', sparkPillHtml);
      } else if (!nativePhotoShell && !document.getElementById('eb-doppelrand-hero-card')) {
        var fallbackLead = document.querySelector('.hero-sub, .subhead, .hero-lead, main h1 ~ p');
        if (fallbackLead && fallbackLead.parentNode) fallbackLead.parentNode.insertBefore(buildHeroCardEl(120, 'display:none;margin:0;'), fallbackLead.nextSibling);
      }
      var homeSubLead = document.querySelector('.hero-sub, .subhead, .editorial-subhead, .hero-lead, main h1 ~ p');
      if (homeSubLead && homeSubLead.parentNode && !window.__ebIsUnlocked && !document.getElementById('eb-mobile-firstfold-bar')) homeSubLead.parentNode.insertBefore(buildQBar('eb-mobile-firstfold-bar'), homeSubLead.nextSibling);
    }
    var scoreAnchor = document.querySelector('#liveResultsContainer .score-strip, .telemetry-card .metric-duo, #results-panel .kpi-grid, #radar-results-container .kpi-grid, .panel-elevated .telemetry-grid');
    if ((scoreAnchor || targetEl) && !window.__ebIsUnlocked && !isPseoOrDir && !isLeaderboard && !isScanPage) {
      if (targetEl && CFG.moduleId !== 'derm_logic') targetEl.classList.add('eb-blurred-deliverable');
      if (!document.getElementById('eb-postcalc-inline-cta')) {
        var pcCta = document.createElement('div'); pcCta.id = 'eb-postcalc-inline-cta';
        pcCta.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding:9px 12px;margin:10px 0;background:' + CFG.theme.brandSoftBg + ';font-family:' + CFG.theme.fontSans + ';';
        pcCta.innerHTML = '<span id="eb-postcalc-cta-title" style="font-size:13px;font-weight:700;color:' + CFG.theme.brandPrimary + ';">' + PERSONA.ctaTitle + '</span><div style="display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap;"><a id="btn-postcalc-permalink" ' + 'hr' + 'ef="/scan/' + encodeURIComponent(window.__ebActiveEntity || (CFG.presets[0] && CFG.presets[0].key) || 'verified') + '" style="font-size:12.5px;font-weight:600;color:' + CFG.theme.textSecondary + ';text-decoration:underline;white-space:nowrap;">Share Report ↗</a><button type="button" id="btn-postcalc-micro-pass" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="display:none;">' + PERSONA.microBtn + '</button><button type="button" id="btn-postcalc-flash-pass" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:6px 12px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;">Save Morning &amp; Night Card ($1.99) →</button></div>'
          + '<form id="eb-postcalc-email-form" onsubmit="return window.__ebSaveInlineScorecard(event, \\\'eb-postcalc-email-input\\\', \\\'eb-postcalc-email-form\\\')" style="display:none;"><input type="email" id="eb-postcalc-email-input" placeholder="' + PERSONA.leadPh + '" /><button type="submit" id="btn-postcalc-email-submit">' + PERSONA.leadBtn + '</button></form>';
        if (scoreAnchor && scoreAnchor.parentNode) scoreAnchor.parentNode.insertBefore(pcCta, scoreAnchor.nextSibling);
        else if (targetEl && targetEl.parentNode) targetEl.parentNode.insertBefore(pcCta, targetEl);
        if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(pcCta);
      }
    }
    var tBarAnchor = document.getElementById('eb-tanstack-table-bar'), homeFullGrid = (!isPseoOrDir && !isLeaderboard && !isScanPage) ? document.querySelector('main .bento-grid, main .hero-split, main .hero-grid') : null;
    var seoTargetEl = isPseoOrDir ? (existingHeroSplit || document.getElementById('eb-pseo-hero-split') || document.querySelector('main .table-wrap, article .table-wrap, main .posterior-table-wrap') || tBarAnchor || targetEl) : null;
    var scanOrLbAnchor = (isLeaderboard || isScanPage) ? document.querySelector('main .table-wrap') : null;
    var mountAnchor = isPseoOrDir ? seoTargetEl : (scanOrLbAnchor || homeFullGrid || tBarAnchor || targetEl || document.getElementById('eb-doppelrand-hero-card'));
    if (!mountAnchor) return;
    var activeEnt = window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].label) || CFG.brandName;
    var existingCurtain = document.getElementById('eb-deliverable-curtain');
    if (existingCurtain) {
      var prevBox = document.getElementById('eb-prism-proof-preview');
      if (prevBox) { prevBox.setAttribute('data-demo-open', '0'); prevBox.textContent = (customDiagLine || CFG.remDiff.beforeLine) + '\\n\\n' + CFG.remDiff.afterLine; window.__ebLastCurtainPreview = prevBox.textContent; }
      var hdrSpan = document.getElementById('eb-curtain-title-span'), rBadge = document.getElementById('eb-curtain-roi-badge'), cBtn = document.getElementById('btn-curtain-flash-pass'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
      if (hdrSpan) hdrSpan.textContent = 'Personalized Routine Kit';
      if (rBadge && customBadge) rBadge.textContent = customBadge;
      if (cBtn && window.__ebUserInteracted && window.__ebActiveEntity) cBtn.textContent = 'Save Complete 3-Part Ritual Kit ($1.99) →';
      if (pcBtn && window.__ebUserInteracted && window.__ebActiveEntity) pcBtn.textContent = 'Save Complete 3-Part Ritual Kit ($1.99) →';
      return;
    }
    var filesHtml = (CFG.deliverableFiles || []).map(function(f, idx) {
      var titleTxt = f.label || f.schema || f.file, subTxt = f.desc || f.schema || '';
      return '<div class="eb-manifest-pill" onclick="window.__ebSelectManifestFile(' + idx + ', this)" style="cursor:pointer;display:flex;flex-direction:column;gap:4px;padding:14px 16px;background:' + (idx === 0 ? CFG.theme.brandSoftBg : CFG.theme.subtleBg) + ';color:' + (idx === 0 ? CFG.theme.brandPrimary : CFG.theme.textPrimary) + ';"><span style="font-size:15px;font-weight:500;">' + titleTxt + '</span><span style="font-size:13.5px;color:' + CFG.theme.textSecondary + ';line-height:1.4;">' + subTxt + '</span></div>';
    }).join('');
    var chipsHtml = (CFG.presets || []).map(function(p) { return '<button type="button" class="eb-curtain-preset-chip" onclick="window.__ebCompileCustomCurtain(\\\'' + p.key + '\\\')" style="padding:4px 9px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textSecondary + ';font-size:13px;font-weight:600;cursor:pointer;border:none;">' + p.label + '</button>'; }).join('');
    var domChipsHtml = ['@gmail.com', '@icloud.com', '@outlook.com'].map(function(d) { return '<button type="button" class="eb-domain-chip" onclick="window.__ebFillEmailDomain(\\\'eb-inline-scorecard-email\\\', \\\'' + d + '\\\', \\\'eb-save-scorecard-bar\\\')" style="padding:3px 8px;background:' + CFG.theme.cardBg + ';color:' + CFG.theme.textSecondary + ';font-size:11.5px;font-weight:600;cursor:pointer;border:none;">' + d + '</button>'; }).join('');
    var dossierSplitHtml = '<div id="eb-curtain-visual-split" style="margin:0;"><div id="eb-curtain-dossier-card" class="eb-doppelrand-shell" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="cursor:pointer;margin:0 !important;" title="Click to unlock ' + PERSONA.dossierTag + ' ($1.99)"><div class="eb-doppelrand-inner" style="height:100%;"><span id="eb-dossier-format-pill">9:16 Lock-Screen Guide</span><img src="/public/editorial-dossier.jpg" alt="' + CFG.brandName + ' ' + PERSONA.dossierTag + '" class="eb-doppelrand-img" style="height:100%;min-height:260px;" loading="lazy" decoding="async" /></div></div><div id="eb-prism-proof-frame" style="display:flex;flex-direction:column;justify-content:space-between;gap:18px;"><div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px;"><span id="eb-curtain-title-span" style="font-size:14px;font-weight:500;color:' + CFG.theme.brandPrimary + ';">Personalized Routine Kit</span><span id="eb-curtain-roi-badge" style="font-size:13.5px;color:' + CFG.theme.safeColor + ';font-weight:500;background:' + CFG.theme.safeSoftBg + ';padding:4px 12px;">' + CFG.remDiff.roiBadge + '</span></div><h3 style="margin:0;font-family:' + CFG.theme.fontDisplay + ';font-size:clamp(1.5rem,2.1vw,1.95rem);font-weight:300;color:' + CFG.theme.textPrimary + ';line-height:1.22;letter-spacing:-0.02em;max-width:none;">Keep your morning and night order on your lock screen.</h3></div><div id="eb-prism-proof-preview" style="margin:0;flex:1;">' + CFG.remDiff.beforeLine + '\\n\\n' + CFG.remDiff.afterLine + '</div><div id="eb-zod-manifest-pills" style="width:100%;"><div id="eb-manifest-pills-left" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;width:100%;">' + filesHtml + '</div><div id="eb-observable-telemetry-pill" style="display:none;"><svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12"><circle cx="6" cy="6" r="4"/></svg></div></div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding-top:4px;"><span style="font-size:14px;color:' + CFG.theme.textSecondary + ';">Instant download · One-time pass</span><div style="display:inline-flex;gap:10px;align-items:center;flex-wrap:wrap;flex-shrink:0;"><button type="button" id="btn-curtain-micro-pass" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="padding:11px 16px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textPrimary + ';font-weight:500;font-size:14px;cursor:pointer;white-space:nowrap;border:none;">' + PERSONA.microBtn + '</button><button type="button" id="btn-curtain-flash-pass" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:12px 20px;background:' + CFG.theme.brandPrimary + ';color:#FAF6F0;border:none;font-weight:500;font-size:14px;white-space:nowrap;">Get Complete 3-Part Kit ($1.99) →</button></div></div></div></div>';
    var curtain = document.createElement('div');
    curtain.id = 'eb-deliverable-curtain';
    curtain.innerHTML = '<div id="eb-curtain-customizer-bar" style="display:none;"><input type="text" id="eb-curtain-entity-input" /><button type="button" id="btn-curtain-run-custom"></button>' + chipsHtml + '</div>'
      + dossierSplitHtml
      + '<div id="eb-prism-proof-footer" style="display:none;"><button type="button" id="btn-peek-sample-demo" onclick="window.__ebToggleSampleDemo(this)">Demo</button><button type="button" id="btn-copy-readme-badge"></button><button type="button" id="btn-nuqs-share-url"></button></div>'
      + '<div id="eb-click-trigger-bar" style="display:none;"></div>'
      + '<form id="eb-save-scorecard-bar" onsubmit="return window.__ebSaveInlineScorecard(event)" style="display:none;">' + domChipsHtml + '<input type="email" id="eb-inline-scorecard-email" /><button type="submit" id="btn-save-scorecard"></button></form>';
    var lbShowcase = (!isPseoOrDir && !isLeaderboard && !isScanPage) ? document.getElementById('eb-leaderboard-home-showcase') : null;
    if (mountAnchor.parentNode) {
      if ((mountAnchor === tBarAnchor || mountAnchor === targetEl) && !scanOrLbAnchor) mountAnchor.parentNode.insertBefore(curtain, mountAnchor);
      else if (lbShowcase) { curtain.style.marginTop = '0'; curtain.style.marginBottom = '32px'; lbShowcase.insertBefore(curtain, lbShowcase.firstChild); }
      else mountAnchor.parentNode.insertBefore(curtain, mountAnchor.nextSibling);
    }
    if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(curtain);
    if (window.__ebIsUnlocked) window.__ebApplyUnblurState();
    var dermModal = document.getElementById('checkoutModal');
    if (dermModal && !document.getElementById('eb-modal-flash-pass-pill')) {
      var modalBox = dermModal.querySelector('.modal-card, div');
      if (modalBox) {
        var pill = document.createElement('div'); pill.id = 'eb-modal-flash-pass-pill';
        pill.style.cssText = 'margin:10px 0;padding:10px 12px;border-radius:10px;background:' + CFG.theme.brandSoftBg + ';border:1px solid ' + CFG.theme.accentBorder + ';display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;';
        pill.innerHTML = '<span style="font-size:13px;font-weight:700;color:' + CFG.theme.textPrimary + ';">Single-Routine Instant Pass (Save 60%)</span><button type="button" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:6px 12px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:13px;">Unlock Pass ($1.99) →</button>';
        modalBox.insertBefore(pill, modalBox.firstChild);
      }
    }
  };

  window.__ebFilterAndCalcTable = function(q) {
    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody') || document.querySelector('main table tbody, article table tbody');
    if (tbody) {
      var rows = tbody.querySelectorAll('tr');
      var low = String(q || '').toLowerCase();
      for (var i = 0; i < Math.min(3, rows.length); i++) {
        rows[i].style.display = (!low || rows[i].textContent.toLowerCase().indexOf(low) !== -1) ? '' : 'none';
      }
    }
    if (q && q.trim().length > 2) window.__ebCompileCustomCurtain(q.trim());
  };

  window.__ebSortTableRows = function() {
    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody') || document.querySelector('main table tbody, article table tbody');
    if (tbody) {
      var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'), 0, 3);
      rows.reverse().forEach(function(r) { tbody.insertBefore(r, tbody.firstChild); });
    }
    window.__ebLogEvent('calculate', { source: 'tanstack_list_sort' });
    var btn = document.getElementById('btn-tanstack-sort');
    if (btn) btn.textContent = 'Sorted Top ROI';
  };

  window.__ebSelectManifestFile = function(idx, pillEl) {
    var f = (CFG.deliverableFiles && CFG.deliverableFiles[idx]) || { file: 'deliverable.txt', label: 'Routine Guide', size: '4.2 KB', schema: 'Verified Schema' };
    var titleTxt = f.label || f.schema || f.file, subTxt = f.desc || f.schema || '';
    var allPills = document.querySelectorAll('#eb-zod-manifest-pills .eb-manifest-pill');
    for (var p = 0; p < allPills.length; p++) {
      var active = p === idx;
      allPills[p].style.background = active ? CFG.theme.brandSoftBg : CFG.theme.subtleBg;
      allPills[p].style.color = active ? CFG.theme.brandPrimary : CFG.theme.textPrimary;
    }
    var dPill = document.getElementById('eb-dossier-format-pill');
    if (dPill) { dPill.textContent = titleTxt; dPill.style.transform = 'scale(1.04)'; setTimeout(function() { dPill.style.transform = 'scale(1)'; }, 180); }
    var prevBox = document.getElementById('eb-prism-proof-preview');
    if (prevBox) prevBox.textContent = titleTxt + ' — ' + subTxt + '.\\n\\n' + CFG.remDiff.beforeLine + '\\n\\n' + CFG.remDiff.afterLine;
    var microBtn = document.getElementById('btn-curtain-micro-pass');
    if (microBtn) microBtn.textContent = 'Get ' + titleTxt + ' (99¢)';
    var popMicroBtn = document.getElementById('btn-popover-micro-pass');
    if (popMicroBtn) popMicroBtn.textContent = 'Get ' + titleTxt + ': 99¢ →';
    var emIn = document.getElementById('eb-inline-scorecard-email');
    if (emIn) emIn.placeholder = 'Email for ' + titleTxt + '...';
    window.__ebLogEvent('tab_switch', { store_pill: 'file_' + f.file });
    window.__ebLogEvent('calculate', { source: 'manifest_file_inspect', file: f.file });
  };

  window.__ebSaveInlineScorecard = function(ev, inputId, formId) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var inp = document.getElementById(inputId || 'eb-inline-scorecard-email');
    var email = inp ? inp.value.trim() : '';
    if (!email || email.indexOf('@') <= 0) return false;
    var safeEmail = email.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    var r4 = document.querySelector('tr.eb-blurred-deliverable');
    if (r4) { r4.classList.remove('eb-blurred-deliverable'); r4.style.filter = 'none'; r4.style.background = CFG.theme.safeSoftBg; }
    var v4 = document.getElementById('eb-scan-row4-val') || document.getElementById('eb-growth-row4-val'), s4 = document.getElementById('eb-scan-row4-status') || document.getElementById('eb-growth-row4-status');
    if (v4 && v4.textContent.indexOf('Locked') !== -1) v4.textContent = 'Verified Patch Ready • Sent to ' + email;
    if (s4) { s4.textContent = 'UNLOCKED'; s4.style.color = CFG.theme.safeColor; }
    var gTr = document.getElementById('eb-table-row4-gate-tr');
    if (gTr) gTr.innerHTML = '<td colspan="8" style="padding:7px 12px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-weight:700;font-size:13px;">Row #4 Revealed! <a href="/buy/micro_pass" onclick="window.__ebCheckout(\\\'micro_pass\\\');return false;" style="color:' + CFG.theme.brandPrimary + ';margin-left:8px;">Unblur all remaining rows + CSV for 99¢ →</a></td>';
    var prevBox = document.getElementById('eb-prism-proof-preview');
    if (prevBox) prevBox.textContent += '\\n// [ROW #4 REVEALED FOR ' + email.replace(/[<>]/g, '') + ']: Remaining rows & 3 files ready below';
    fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'zeigarnik_row4_reveal' }) })
      .then(function() {
        var bar = document.getElementById(formId || 'eb-save-scorecard-bar');
        if (bar) bar.innerHTML = '<span style="font-size:13px;font-weight:700;color:' + CFG.theme.safeColor + ';">Row #4 Unblurred &amp; 1-Click Links Emailed to ' + safeEmail + '!</span><a href="/buy/micro_pass" onclick="window.__ebCheckout(\\\'micro_pass\\\');return false;" style="padding:5px 12px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;cursor:pointer;">VIP Add-On: Unblur All Remaining Rows + File (99¢) →</a>';
      }).catch(function(){});
    return false;
  };

  window.__ebApplyUnblurState = function() {
    window.__ebIsUnlocked = true;
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
    var gTr = document.getElementById('eb-table-row4-gate-tr'); if (gTr && gTr.parentNode) gTr.parentNode.removeChild(gTr);
    var blurred = document.querySelectorAll('.eb-blurred-deliverable'); for (var i = 0; i < blurred.length; i++) { blurred[i].classList.remove('eb-blurred-deliverable'); blurred[i].style.display = ''; }
    var allTrs = document.querySelectorAll('tbody tr'); for (var k = 0; k < allTrs.length; k++) allTrs[k].style.display = '';
    Array.prototype.slice.call(document.querySelectorAll('[data-raw-email]')).forEach(function(nd) { nd.textContent = nd.getAttribute('data-raw-email'); });
    var curtain = document.getElementById('eb-deliverable-curtain');
    if (curtain) {
      curtain.style.background = CFG.theme.safeSoftBg; curtain.style.borderColor = CFG.theme.safeBorder;
      curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span style="font-size:12.5px;font-weight:700;color:' + CFG.theme.safeColor + ';">Full Production Deliverable Unlocked! Download your bundle below:</span><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" id="btn-filesaver-bundle" onclick="window.__ebSaveBundleFile()" style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.safeColor + ';border:1px solid ' + CFG.theme.safeBorder + ';font-weight:700;font-size:13px;">Download Deliverable Bundle (.TXT) ↓</button><a href="/api/github-upgrade/export.csv" download style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;">Export .CSV ↓</a></div></div><div id="eb-postpurchase-credit-bar" style="margin-top:10px;padding:10px 12px;border-radius:10px;background:#FFFBEB;border:1px solid #FDE68A;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span style="font-size:12.5px;color:#92400E;"><strong>$1.99 Single-Pass Credit Applied:</strong> Upgrade to the Complete Agency Rep Vault ($29 value) for just <strong>$27.01</strong>:</span><a href="/buy/upgrade_from_flash" onclick="window.__ebCheckout(\\\'upgrade_from_flash\\\');return false;" style="padding:6px 12px;border-radius:999px;background:#D97706;color:#FFFFFF;text-decoration:none;font-weight:800;font-size:12px;">Upgrade with $1.99 Credit ($27.01) →</a></div>';
    }
    var pop = document.getElementById('eb-floating-gate-popover'); if (pop) pop.style.display = 'none';
  };
  window.__ebOpenFloatingGate = function(anchorEl) {
    var pop = document.getElementById('eb-floating-gate-popover'); if (!pop) return;
    if (anchorEl) {
      var trEl = anchorEl.tagName === 'TR' ? anchorEl : (anchorEl.closest ? anchorEl.closest('tr') : null), pTitle = document.getElementById('eb-popover-title');
      if (trEl && pTitle) { var firstCell = trEl.querySelector('td, th'), cellTxt = firstCell ? (firstCell.textContent || '').trim().slice(0, 34) : ''; if (cellTxt) pTitle.textContent = 'Unblur "' + cellTxt + '" + Full Deliverable'; }
    }
    pop.style.display = 'block'; window.__ebLogEvent('view_paywall', { target: 'floating_ui_gate' });
    if (anchorEl && anchorEl.getBoundingClientRect) {
      var rect = anchorEl.getBoundingClientRect(), top = rect.bottom + 8, left = Math.max(12, Math.min(window.innerWidth - 362, rect.left));
      if (top + 240 > window.innerHeight) top = Math.max(12, rect.top - 230);
      pop.style.top = top + 'px'; pop.style.left = left + 'px';
    } else { pop.style.top = '120px'; pop.style.left = Math.max(12, (window.innerWidth - 350) / 2) + 'px'; }
  };
  document.addEventListener('click', function(e) {
    var nativeCkBtn = e.target && e.target.closest ? e.target.closest('button[onclick*="startCheckout"]') : null;
    if (nativeCkBtn) { var cEmail = document.getElementById('checkout-email'); if (cEmail && (!cEmail.value || cEmail.value.indexOf('@') === -1)) cEmail.value = 'express-checkout@' + CFG.domain.replace('www.', ''); }
    if (window.__ebIsUnlocked) return;
    var btn = e.target && e.target.closest ? e.target.closest('.eb-blurred-deliverable, .pitch-box a[href*="#pricing"], #copy-artifact-btn, #download-artifact-btn, #copy-code-btn, #copy-sdk-btn, button[onclick*="copyCompiledCode"], button[onclick*="downloadCompiledFile"], button[onclick*="copyPitchEmail"]') : null;
    if (!btn) return;
    e.preventDefault(); e.stopPropagation(); window.__ebOpenFloatingGate(btn);
  }, true);
  window.__ebLogObjection = function(code, btn) {
    window.__ebLogEvent('tab_switch', { store_pill: 'objection_' + code, page: window.location.pathname });
    if (btn) { btn.style.background = CFG.theme.brandSoftBg; btn.style.color = CFG.theme.brandPrimary; btn.style.borderColor = CFG.theme.accentBorder; }
    var desc = document.getElementById('eb-ouibounce-desc'), em = document.getElementById('eb-ouibounce-email');
    if (code === 'need_agency_depth' && desc) desc.innerHTML = '<strong style="color:' + CFG.theme.safeColor + ';">Row #1 Sample Unmasked on Page!</strong> Or grab 1 Single File for <strong>99¢</strong> via 1-tap Apple Pay / Link below:';
    else if (desc) { desc.innerHTML = '<strong style="color:' + CFG.theme.safeColor + ';">No card required!</strong> Enter your email below to reveal Row #4 free on-screen right now:'; if (em) em.focus(); }
  };
  window.__ebSendExitSummary = function(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = document.getElementById('eb-ouibounce-email'), email = input ? input.value.trim() : ''; if (!email) return false;
    var r4 = document.querySelector('tr.eb-blurred-deliverable'); if (r4) { r4.classList.remove('eb-blurred-deliverable'); r4.style.background = CFG.theme.safeSoftBg; }
    fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'exit_intent_downsell' }) }).then(function() { var btn = document.getElementById('btn-ouibounce-submit'), desc = document.getElementById('eb-ouibounce-desc'); if (btn) btn.textContent = 'Row #4 Revealed!'; if (desc) desc.innerHTML = '<strong style="color:' + CFG.theme.safeColor + ';">Row #4 Unblurred &amp; 1-Click Links Sent!</strong> <a href="/buy/micro_pass" style="color:' + CFG.theme.brandPrimary + ';font-weight:700;">Unblur all remaining rows + file for 99¢ →</a>'; }).catch(function() {});
    return false;
  };

  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function(input, init) {
      var url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
      var isAutoInit = !!(init && init.headers && (init.headers['x-auto-init'] || init.headers['X-Auto-Init']));
      return origFetch.apply(this, arguments).then(function(res) {
        if (url.indexOf('/api/checkout') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var stripeUrl = data && (data.checkout_url || data.checkoutUrl || data.url || (data.order && data.order.checkout_url));
              if (stripeUrl && String(stripeUrl).indexOf('https://checkout.stripe.com') === 0 && !navigator.webdriver) setTimeout(function() { window.location.href = stripeUrl; }, 220);
            }).catch(function(){});
          } catch (_) {}
        }
        if (url.indexOf('/api/audit') !== -1 || url.indexOf('/api/analyze-sponsor') !== -1 || url.indexOf('/api/analyze-routine') !== -1 || url.indexOf('/api/audit-leakage') !== -1 || url.indexOf('/api/bandit-select') !== -1 || url.indexOf('/api/webhook-simulate') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val'), entityName = '', customBadge = '', customDiagLine = '';
              if (!isAutoInit) window.__ebUserInteracted = true;
              if (CFG.moduleId === 'citation_forge' && data && data.audit) {
                entityName = data.audit.domain || '';
                if (data.audit.scores) {
                  customBadge = 'Grade ' + data.audit.scores.grade + ' • ' + data.audit.scores.csovPct + '% AI Share';
                  customDiagLine = '- [DIAGNOSIS: ' + entityName + '] Current AI Citation Share: ' + data.audit.scores.csovPct + '% (Projected after Fix Pack: ' + data.audit.scores.projectedCsovPct + '%)';
                  if (boxes.length >= 3) { boxes[0].textContent = data.audit.scores.csovPct + '%'; boxes[1].textContent = data.audit.scores.agentReadabilityScore + '/100'; boxes[2].textContent = data.audit.scores.entityDensityScore + '/100'; }
                }
              } else if (CFG.moduleId === 'sponsor_radar' && data) {
                entityName = (data.brand && data.brand.name) || (data.extracted_sponsors && data.extracted_sponsors[0] && data.extracted_sponsors[0].brand_name) || '';
                if (data.metrics) {
                  customBadge = '3x+ Score: ' + data.metrics.renewal_velocity_score + '/100 • $' + Number(data.metrics.est_monthly_spend_usd || 0).toLocaleString() + '/mo';
                  customDiagLine = '- [DIAGNOSIS: ' + entityName + '] ' + data.metrics.proven_3x_shows_count + ' Proven 3x+ Shows ($' + data.metrics.avg_cpm_usd + ' Avg CPM)';
                  if (boxes.length >= 3) { boxes[0].textContent = data.metrics.renewal_velocity_score + '/100'; boxes[1].textContent = '$' + Number(data.metrics.est_monthly_spend_usd || 0).toLocaleString(); boxes[2].textContent = '$' + data.metrics.avg_cpm_usd; }
                }
              } else if (CFG.moduleId === 'derm_logic' && data) {
                var clashCount = (data.conflicts && data.conflicts.length) || 0;
                entityName = 'Your Shelf Routine';
                customBadge = clashCount === 0 ? 'Calm & Safe Together' : (clashCount + ' Bottle Clash' + (clashCount === 1 ? '' : 'es') + ' Found');
                customDiagLine = clashCount === 0 ? 'Every bottle on your tray works together smoothly from lightest watery serum to richest cream.' : ('We found ' + clashCount + ' bottle clash' + (clashCount === 1 ? '' : 'es') + ' on your shelf—separate them into morning and bedtime steps below.');
                if (boxes.length >= 2) boxes[0].textContent = clashCount === 0 ? 'Calm & Safe' : 'Clash Found';
              } else if (CFG.moduleId === 'abandon_alpha' && data) {
                entityName = data.storeName || (data.selectedArm && data.selectedArm.objection_code) || '';
                if (data.totalRecoverableUsd != null) {
                  customBadge = '+$' + Math.round(data.totalRecoverableUsd).toLocaleString() + '/mo Recoverable MRR';
                  customDiagLine = '- [DIAGNOSIS: ' + entityName + '] Leaking $' + Math.round(data.totalMonthlyLeakedUsd || 0).toLocaleString() + '/mo (+$' + Math.round(data.totalRecoverableUsd).toLocaleString() + '/mo Recoverable)';
                }
                if (boxes.length >= 3 && data.totalRecoverableUsd != null) { boxes[0].textContent = '$' + Math.round(data.totalRecoverableUsd).toLocaleString(); boxes[1].textContent = '$' + Math.round(data.exitIntentRecoveredUsd || 0).toLocaleString(); boxes[2].textContent = '$' + Math.round(data.dunningRecoveredUsd || 0).toLocaleString(); }
              }
              if (!isAutoInit) window.__ebLogEvent('calculate', { source: 'native_calc', entity: entityName || CFG.moduleId });
              setTimeout(function() { window.__ebMountDeliverableCurtain(entityName, customBadge, customDiagLine); if (!isAutoInit && window.__ebUserInteracted) window.__ebTriggerPostCalcSpotlight(entityName); }, 90);
            }).catch(function(){});
          } catch (_) {}
        }
        return res;
      });
    };
  }

  var fuseTimer = null, sliderTimer = null;
  window.__ebRunFuseSearch = function(query) {
    if (!query || query.trim().length < 2) return;
    if (fuseTimer) clearTimeout(fuseTimer);
    fuseTimer = setTimeout(function() {
      origFetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(query.trim())).then(function(r) { return r.json(); }).then(function(data) {
        if (data && data.kpis) { var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val'); for (var i = 0; i < boxes.length && i < data.kpis.length; i++) boxes[i].textContent = data.kpis[i]; }
        var rowTxt = document.getElementById('eb-peek-row-text'); if (rowTxt && data && data.row1_insight) rowTxt.textContent = data.row1_insight;
        window.__ebShowTripwire();
      }).catch(function(){});
    }, 300);
  };

  window.__ebOnSliderInput = function(val) {
    var num = Number(val) || 10, rd = document.getElementById('eb-slider-readout'), boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
    if (rd) rd.textContent = CFG.sliderLabel + ': ' + num;
    if (boxes.length >= 2) {
      if (CFG.moduleId === 'citation_forge') boxes[0].textContent = Math.min(94.8, (22 + num * 0.24)).toFixed(1) + '%';
      else if (CFG.moduleId === 'sponsor_radar') boxes[1].textContent = '$' + (num * 10200).toLocaleString();
      else if (CFG.moduleId === 'derm_logic') { boxes[0].textContent = Math.max(20, 100 - num * 9) + '/100'; boxes[1].textContent = (0.4 + num * 0.35).toFixed(1) + ' pH'; }
      else { boxes[0].textContent = '$' + Math.round(num * 665).toLocaleString(); boxes[1].textContent = '$' + Math.round(num * 575).toLocaleString(); }
    }
    if (sliderTimer) clearTimeout(sliderTimer);
    sliderTimer = setTimeout(function() {
      window.__ebLogEvent('calculate', { source: 'nouislider_range', value: num });
      window.__ebShowTripwire();
    }, 450);
  };

  try {
    if ('IntersectionObserver' in window) {
      var obs = window.__ebPaywallObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !window.__ebPaywallLogged) { window.__ebPaywallLogged = true; window.__ebLogEvent('view_paywall', { target: entry.target.id || 'eb-deliverable-curtain' }); }
        });
      }, { threshold: 0.15 });
      ['in-card-unlock-bar', 'eb-deliverable-curtain', 'eb-postcalc-inline-cta'].forEach(function(id) { var el = document.getElementById(id); if (el) obs.observe(el); });
    }
  } catch (_) {}

  var ouibounceShown = false, pageEnteredAt = Date.now(), nativeCalcTimer = null;
  function showRescueToast(reason) {
    if (ouibounceShown || window.__ebIsUnlocked) return;
    if ((Date.now() - pageEnteredAt) < 18000) return;
    try {
      var lastTs = Number(localStorage.getItem('eb_toast_dismissed_ts') || 0);
      if (lastTs && (Date.now() - lastTs) < 86400000) return;
      localStorage.setItem('eb_toast_dismissed_ts', String(Date.now()));
    } catch (_) {}
    ouibounceShown = true;
    var toast = document.getElementById('eb-ouibounce-toast');
    if (toast) toast.style.display = 'block';
    window.__ebLogEvent('view_paywall', { target: 'sonner_rescue_' + reason });
  }
  document.addEventListener('mouseleave', function(e) { if (e.clientY <= 8) showRescueToast('desktop_exit'); }, { passive: true });
  document.addEventListener('change', function(e) {
    var t = e.target; if (!t || !t.id || t.id.indexOf('eb-') === 0 || t.type === 'email') return;
    if (/^(domain-input|category-select|lookup-query|sender-reach|rawInciTextarea|skinTypeSelect|input-sessions|input-aov|input-abandon|input-fail|input-decline-focus|wh-event-type|wh-decline-code|wh-amount)$/.test(t.id)) {
      window.__ebUserInteracted = true;
      if (nativeCalcTimer) clearTimeout(nativeCalcTimer);
      nativeCalcTimer = setTimeout(function() { window.__ebTriggerHostCalc(); }, 320);
    }
  }, { passive: true });
  window.addEventListener('scroll', function() {
    var y = window.scrollY || 0;
    var sb = document.getElementById('sticky-mobile-bar');
    if (sb) sb.classList.toggle('eb-dock-visible', y > 650);
    if (y > 1100 && (Date.now() - pageEnteredAt) > 25000) showRescueToast('deep_scroll');
  }, { passive: true });

  window.__ebToggleCmdk = function() {
    var m = document.getElementById('eb-cmdk-modal');
    if (!m) return;
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
    window.__ebLogEvent('tab_switch', { store_pill: 'cmdk_palette' });
  };
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); window.__ebToggleCmdk(); }
    else if (e.key === 'Escape') {
      ['eb-cmdk-modal', 'eb-floating-gate-popover'].forEach(function(id) { var el = document.getElementById(id); if (el) el.style.display = 'none'; });
    }
  });

  window.__ebSelectStorePill = function(key) {
    var pills = document.querySelectorAll('.store-preview-pill[data-store]');
    for (var i = 0; i < pills.length; i++) pills[i].classList.toggle('active', pills[i].getAttribute('data-store') === key);
    var drawer = document.getElementById('inline-aisle-peek-drawer'), rowTxt = document.getElementById('eb-peek-row-text');
    if (rowTxt) rowTxt.textContent = CFG.pillMap[key] || ''; else if (drawer) drawer.textContent = CFG.pillMap[key] || '';
    if (drawer) drawer.style.display = 'block';
    window.__ebLogEvent('tab_switch', { store_pill: key });
  };
  window.__ebTogglePeekDrawer = function() { var d = document.getElementById('inline-aisle-peek-drawer'); if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none'; };
  window.__ebShowTripwire = function() { var b = document.getElementById('tripwire-upsell-box'); if (b) b.style.display = 'flex'; };
  window.__ebCopySummary = function() {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CFG.brandName + ' Executive Summary (' + window.location.href + ')').catch(function(){});
    var btn = document.getElementById('btn-copy-shopping-list'); if (btn) btn.textContent = 'Copied!';
    window.__ebShowTripwire(); window.__ebLogEvent('copy_summary');
  };
  window.__ebCopyReddit = function() {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('**' + CFG.brandName + ' Benchmark**: ' + window.location.href).catch(function(){});
    var btn = document.getElementById('btn-reddit-share'); if (btn) btn.textContent = 'Copied MD!';
    window.__ebShowTripwire();
  };
  window.__ebCopyScenarioLink = function(btn) {
    var shareUrl = window.location.origin + window.location.pathname + '?q=' + encodeURIComponent(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].key) || 'audit');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareUrl).catch(function(){});
    if (btn) btn.textContent = 'URL Copied!';
  };
  window.__ebCopyReadmeBadge = function(btn) {
    var t = encodeURIComponent(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].key) || 'verified');
    var md = '[![Verified by ' + CFG.brandName + '](https://' + CFG.domain + '/badge/' + t + '.svg)](https://' + CFG.domain + '/?q=' + t + '&utm_source=readme_badge)';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(function(){});
    if (btn) btn.textContent = 'Badge MD Copied!';
    window.__ebLogEvent('copy_summary', { type: 'readme_svg_badge', target: t });
  };
  window.__ebPrintSheet = function() { window.__ebLogEvent('print_sheet'); window.print(); };
  window.__ebToggleHud = function() { var d = document.getElementById('eb-field-hud-drawer'); if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none'; };

  window.__ebApplyPreset = function(presetKey, idx) {
    window.__ebLogEvent('calculate', { preset: presetKey });
    var kpiVals = CFG.presetKpis && CFG.presetKpis[presetKey];
    if (kpiVals) {
      var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
      for (var i = 0; i < boxes.length && i < kpiVals.length; i++) boxes[i].textContent = kpiVals[i];
    }
    var drawer = document.getElementById('inline-aisle-peek-drawer');
    if (drawer) drawer.style.display = 'block';
    var nativeBtns = document.querySelectorAll('[data-domain], [data-preset-id], [data-brand], .preset-btn, .chip');
    if (nativeBtns && nativeBtns[idx]) { try { nativeBtns[idx].click(); } catch (_) {} }
  };

  window.__ebTriggerHostCalc = function() {
    var searchIn = document.getElementById('eb-fuse-search-input');
    if (searchIn && searchIn.value.trim().length > 1) { window.__ebRunFuseSearch(searchIn.value); return; }
    window.__ebLogEvent('calculate', { trigger: 'btn_calc' }); window.__ebShowTripwire();
    var hostBtn = document.querySelector('form button[type="submit"], #run-audit-btn, #analyzeBtn, #btn-run-lookup, #audit-form button');
    if (hostBtn) { try { hostBtn.click(); } catch (_) {} }
  };
  window.__ebCheckout = function(tier) {
    var cleanTier = typeof tier === 'string' ? tier : 'flash_pass', actTarget = window.__ebActiveEntity || (document.getElementById('lookup-query') && document.getElementById('lookup-query').value) || '';
    var emEl = document.getElementById('eb-inline-scorecard-email') || document.getElementById('eb-ouibounce-email'), emVal = emEl && emEl.value && emEl.value.indexOf('@') > 0 ? emEl.value.trim() : '';
    var payload = { tier: cleanTier, plan: cleanTier, planTier: cleanTier, sku: CFG.moduleId + '_' + cleanTier, pageUrl: window.location.pathname, vid: window.__ebVid, sid: window.__ebSid, target: actTarget, email: emVal };
    var fbUrl = '/buy/' + encodeURIComponent(cleanTier) + '?vid=' + encodeURIComponent(window.__ebVid || '') + '&target=' + encodeURIComponent(actTarget || '');
    origFetch('/api/calculators/' + CFG.moduleId + '/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(function(r) { return r.json(); }).then(function(data) { var targetUrl = data && (data.checkout_url || data.url); window.location.href = targetUrl || fbUrl; }).catch(function(){ window.location.href = fbUrl; });
  };
  var __ebBootAll = function() {
    if (!window.__ebHydratedSent) { window.__ebHydratedSent = true; window.__ebLogEvent('visit_hydrated', { vw: window.innerWidth || 0, vh: window.innerHeight || 0, ref: document.referrer || '' }); }
    window.__ebMountDeliverableCurtain();
    if (window.location.search.indexOf('checkout=cancel') !== -1) {
      window.__ebLogEvent('view_paywall', { target: 'stripe_cancel_return' });
      var toast = document.getElementById('eb-ouibounce-toast'), tTitle = document.getElementById('eb-ouibounce-title'), tDesc = document.getElementById('eb-ouibounce-desc');
      if (tTitle) tTitle.textContent = 'Hesitating on Checkout? Unlock Row #4 + Sample First';
      if (tDesc) tDesc.innerHTML = 'Not ready for the full bundle? <strong>Enter your email to reveal Row #4 right now</strong>, or grab just <strong>1 Single File for 99¢</strong>:';
      if (toast) toast.style.display = 'block';
    }
    try { var sp = new URLSearchParams(window.location.search || ''), qp = sp.get('q') || sp.get('preset') || sp.get('domain') || sp.get('brand') || sp.get('show') || sp.get('pub') || sp.get('active'), refRx = new RegExp('/(?:seo|tools|compare|scan)/([a-z0-9._-]+)', 'i'), refM = (!qp && window.location.pathname === '/' && document.referrer) ? document.referrer.match(refRx) : null; if (refM && refM[1]) { qp = decodeURIComponent(refM[1]).replace(new RegExp('-(?:sponsors-and-cpm-rates|ad-rates|layering|conflict|recovery|retry-schedule|ai-visibility-audit)$', 'i'), '').replace(new RegExp('^stripe-decline-code-', 'i'), '').replace(/-/g, ' '); var hostIn = document.querySelector('#lookup-query, #domain-input, #rawInciTextarea, #input-store, #eb-fuse-search-input'); if (hostIn && !hostIn.value) hostIn.value = qp; window.__ebLogEvent('calculate', { trigger: 'seo_referrer_carryover', query: qp }); } if (qp) setTimeout(function() { var mIn = document.getElementById('eb-mobile-quick-input'); if (mIn) mIn.value = qp; window.__ebCompileCustomCurtain(qp); }, 110); } catch (_) {}
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', __ebBootAll); else __ebBootAll();
})();
</script>
<script type="text/javascript">
  var vglnk = { key: '${SOVRN_KEY}' };
  (function(d, t) {
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0' || navigator.webdriver) return;
    var s = d.createElement(t); s.type = 'text/javascript'; s.async = true; s.src = '//cdn.viglink.com/api/vglnk.js';
    var r = d.getElementsByTagName(t)[0]; if (r && r.parentNode) r.parentNode.insertBefore(s, r);
  }(document, 'script'));
</script>`;
}
function renderExactBaselineEnhancements(html, cfg, reqPath) {
  let out = enhanceHtmlForSearchAndAiBots(html, cfg, reqPath);
  const styles = buildExactBaselineStyles(cfg), bottomSuite = buildBottomConversionSuiteHtml(cfg, reqPath), clientJs = buildClientRuntimeScript(cfg);
  out = out.includes('</head>') ? out.replace('</head>', () => `${styles}\n</head>`) : styles + out;
  const isHomeRoute = !reqPath || reqPath === '/' || reqPath === '/index.html';
  if (isHomeRoute && !out.includes('eb-leaderboard-home-showcase')) {
    const podiumHtml = buildTopLeaderboardPodiumShowcaseHtml(cfg);
    if (/<main[\s\S]*?<\/section>/i.test(out)) out = out.replace(/(<main[\s\S]*?<\/section>)/i, (m) => `${m}\n${podiumHtml}`);
    else if (/<\/main>/i.test(out)) out = out.replace(/<\/main>/i, (m) => `${podiumHtml}\n${m}`);
  }
  if (/<\/main>/i.test(out)) out = out.replace(/<\/main>/i, (m) => `${bottomSuite}\n${m}`);
  else if (out.includes('</body>')) out = out.replace('</body>', () => `${bottomSuite}\n</body>`);
  else out = `${out}\n${bottomSuite}`;
  return out.includes('</body>') ? out.replace('</body>', () => `${clientJs}\n</body>`) : `${out}\n${clientJs}`;
}
function renderEmbedWidgetHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex, follow" /><link rel="canonical" href="https://${esc(cfg.domain)}/embed" /><title>${esc(cfg.brandName)}: Embeddable Benchmark Widget</title>${buildExactBaselineStyles(cfg)}</head><body style="margin:0;padding:12px;background:${t.canvasBg};color:${t.textPrimary};">${buildScenarioAndExportWorkbenchHtml(cfg)}<div style="text-align:right;font-size:13px;margin-top:6px;">Powered by <a href="https://${esc(cfg.domain)}" target="_blank" rel="dofollow" style="color:${t.brandPrimary};font-weight:700;">${esc(cfg.brandName)} (${esc(cfg.domain)})</a></div>${buildClientRuntimeScript(cfg)}</body></html>`;
}
function renderSampleDossierHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="canonical" href="https://${esc(cfg.domain)}/dossier/sample" /><title>${esc(cfg.brandName)}: Executive Sample Dossier & Pass Options</title>${buildExactBaselineStyles(cfg)}</head><body style="margin:0;padding:20px;background:${t.canvasBg};color:${t.textPrimary};font-family:${t.fontSans};"><div style="max-width:960px;margin:0 auto;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><a href="/" style="color:${t.textSecondary};text-decoration:none;font-size:13px;">← Back to ${esc(cfg.brandName)}</a><button id="btn-top-pass-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock Single-Audit Pass: $1.99</button></div><h1 class="dossier-hero-title" style="margin:0 0 8px 0;font-family:${t.fontDisplay};">${esc(cfg.brandName)}: Verified Sample Deliverable</h1><div class="hero-tier-diff" style="margin-bottom:14px;font-size:13px;color:${t.textSecondary};">Choose between the <strong>$1.99 Single-Audit Pass</strong> (Instant Export) or the <strong>${esc(cfg.coreLabel)}</strong>.</div></div>${buildBottomConversionSuiteHtml(cfg, '/dossier/sample')}${buildClientRuntimeScript(cfg)}</body></html>`;
}
module.exports = { renderExactBaselineEnhancements, renderEmbedWidgetHtml, renderSampleDossierHtml };
