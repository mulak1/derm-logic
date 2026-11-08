/**
 * DermLogic Cumulative UI, Deliverable Value-Gating & Conversion Architecture
 * Free ($0 Email) = AM/PM Summary & 2 Chemist Dupes. Paid ($1.99 Pass) = Complete 3-File Routine Kit.
 */
const SOVRN_KEY = process.env.SOVRN_COMMERCE_KEY || 'ea3d7b74c5752fd817f896be27cd1a01';
const { buildTopLeaderboardPodiumShowcaseHtml, buildMobileSeoCrawlMeshHtml, enhanceHtmlForSearchAndAiBots } = require('./exact-baseline-seo');
function esc(str) { return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function getTheme(cfg) {
  return cfg.theme || { canvasBg: '#FAF9F5', cardBg: '#FFFFFF', subtleBg: '#F3F1EC', dockBg: 'rgba(255, 255, 255, 0.95)', border: '#E4E2DD', accentBorder: '#C7D2FE', textPrimary: '#0F172A', textSecondary: '#475569', textMuted: '#64748B', brandPrimary: cfg.accentColor || '#4F46E5', brandSoftBg: '#EEF2FF', brandText: '#3730A3', safeColor: '#059669', safeSoftBg: '#ECFDF5', safeBorder: '#A7F3D0', warnColor: '#B45309', fontDisplay: 'Georgia, serif', fontSans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif", radiusCard: '14px', radiusPill: '999px', shadow: '0 12px 32px -12px rgba(15, 23, 42, 0.06)' };
}
function buildExactBaselineStyles(cfg) {
  const t = getTheme(cfg);
  return `<style id="exact-baseline-cumulative-css">
  html, body { max-width: 100vw !important; overflow-x: hidden !important; } *, *::before, *::after { box-sizing: border-box; } button, input, select, textarea, svg text { font-family: inherit !important; } main p, article p, section p, p { max-width: 65ch !important; }
  .table-wrap, .posterior-table-wrap, .tab-bar, .panel, #competitor-battlecard > div, div[style*="overflow-x"] { overflow-x: hidden !important; flex-wrap: wrap !important; } header nav a.eb-nav-active, .nav-links a.eb-nav-active, .main-nav a.eb-nav-active, .mobile-nav-strip a.eb-nav-active { color: ${t.brandPrimary} !important; font-weight: 700 !important; }
  button, .preset-chip, .store-preview-pill, .eb-action-btn, .cta-btn, a[role="button"] { transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease; cursor: pointer; }
  button:active, .preset-chip:active, .store-preview-pill:active, .eb-action-btn:active, .cta-btn:active { transform: scale(0.98) !important; }
  .metric-box-value, .matrix-price, .eb-kpi-val, .eb-tabular { font-variant-numeric: tabular-nums !important; }
  .eb-blurred-deliverable { filter: none !important; opacity: 1 !important; cursor: pointer !important; transition: background-color 200ms ease; }
  #eb-deliverable-curtain { margin-top: 28px; padding: 32px 36px; border-radius: ${t.radiusCard}; background: ${t.cardBg}; border: none; box-shadow: none; color: ${t.textPrimary}; font-family: ${t.fontSans}; position: relative; z-index: 20; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; font-weight: 400 !important; }
  #eb-prism-proof-preview { background: ${t.cardBg}; color: ${t.textPrimary}; border-radius: 10px; padding: 14px 18px; font-family: ${t.fontSans}; font-size: 14px; line-height: 1.5; margin: 0; overflow-x: auto; white-space: normal; display: flex; flex-direction: column; justify-content: space-between; gap: 8px; text-transform: none !important; letter-spacing: normal !important; }
  .eb-proof-row { display: grid; grid-template-columns: minmax(125px, 1.05fr) minmax(0, 2.2fr) auto; gap: 10px; align-items: center; padding: 8px 12px; border-radius: 9px; background: ${t.canvasBg}; }
  @media (max-width: 640px) { .eb-proof-row { grid-template-columns: 1fr; gap: 4px; } }
  .eb-doppelrand-shell { padding: 6px; border-radius: ${t.radiusCard}; background: ${t.subtleBg}; margin: 10px 0 12px 0; transition: transform 650ms cubic-bezier(0.32, 0.72, 0, 1); }
  .eb-doppelrand-shell:hover { transform: translateY(-2px); } .eb-doppelrand-inner { position: relative; border-radius: ${t.radiusCard}; overflow: hidden; background: ${t.cardBg}; display: flex; flex-direction: column; }
  .eb-doppelrand-img { width: 100%; height: 100%; min-height: 178px; flex: 1; object-fit: cover; object-position: center 32%; display: block; transition: transform 750ms cubic-bezier(0.32, 0.72, 0, 1); } .eb-doppelrand-shell:hover .eb-doppelrand-img { transform: scale(1.03); }
  #eb-doppelrand-hero-card .eb-doppelrand-img { height: 152px !important; min-height: 152px !important; max-height: 152px !important; flex: 0 0 152px !important; }
  .eb-doppelrand-caption, .eb-doppelrand-caption * { font-family: ${t.fontSans} !important; line-height: 1.3 !important; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; }
  .eb-doppelrand-caption { position: static !important; width: 100%; padding: 8px 12px; background: ${t.cardBg}; display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size:13px !important; color: ${t.textSecondary} !important; max-height: 40px; overflow: hidden; white-space: nowrap; flex-shrink: 0; }
  #eb-hero-sparkline-pill { position: static !important; z-index: 6; padding: 2px 8px; border-radius: ${t.radiusPill}; background: ${t.subtleBg}; display: inline-flex; align-items: center; gap: 5px; cursor: pointer; font-family: ${t.fontSans} !important; text-transform: none !important; letter-spacing: normal !important; white-space: nowrap; flex-shrink: 0; }
  #eb-hero-sparkline-pill, #eb-dossier-format-pill { display: none !important; }
  tr[data-eb-live-row] { cursor: pointer; transition: background-color 150ms ease; } tr[data-eb-live-row]:hover { background-color: ${t.brandSoftBg} !important; } .eb-row-sim-pill { display: inline-flex !important; align-items: center; gap: 4px; margin-top: 4px; padding: 2px 9px; border-radius: 999px; background: ${t.brandSoftBg}; color: ${t.brandPrimary}; font-size: 12px; font-weight: 700; cursor: pointer; border: none; }
  #eb-pseo-hero-split { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: stretch; margin: 12px 0 18px 0; } #eb-doppelrand-hero-card, #eb-curtain-dossier-card { display: none !important; } .eb-pseo-lead-card { flex: 1; width: 100% !important; max-width: none !important; display: block !important; padding: 20px 24px !important; border-radius: ${t.radiusCard} !important; background: ${t.cardBg} !important; border: none !important; border-left: none !important; margin: 0 !important; font-size: 17px; line-height: 1.62; color: ${t.textPrimary}; }
  @media (min-width: 960px) { .hero-grid, .hero-split, .hero-editorial-grid { align-items: stretch !important; } .hero-grid > *, .hero-split > * { display: flex !important; flex-direction: column !important; justify-content: flex-start !important; height: 100% !important; } .hero-grid > .bezel-shell > *, .hero-grid > .double-bezel > * { flex: 1 !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: flex-start !important; } }
  #eb-curtain-visual-split { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: stretch; margin: 16px 0 18px 0; } #eb-curtain-dossier-card { display: none !important; }
  #eb-floating-gate-popover { display: none; position: fixed; z-index: 9998; width: 360px; max-width: calc(100vw - 24px); background: ${t.cardBg}; color: ${t.textPrimary}; border-radius: ${t.radiusCard}; padding: 16px; font-family: ${t.fontSans}; text-transform: none !important; }
  #eb-bottom-conversion-suite { margin: 36px auto 88px auto; font-family: ${t.fontSans}; text-transform: none !important; }
  .eb-panel-card { background: ${t.cardBg}; color: ${t.textPrimary}; border-radius: ${t.radiusCard}; padding: 24px 26px; margin-bottom: 20px; }
  .eb-gbb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 16px; align-items: stretch; }
  .eb-tier-card { background: ${t.canvasBg}; border-radius: ${t.radiusCard}; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; color: ${t.textPrimary}; }
  #in-card-unlock-bar .eb-tier-card .eb-doppelrand-img { height: 84px !important; min-height: 84px !important; max-height: 84px !important; }
  .eb-tier-card.featured { background: ${t.brandSoftBg}; position: relative; }
  #eb-executive-strip { margin-bottom: 20px; }
  .eb-strip-top-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid ${t.border}; }
  .eb-strip-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 13px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: ${t.brandPrimary}; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; padding: 4px 12px; border-radius: 999px; }
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
  .store-preview-pill { padding: 5px 11px; border-radius: ${t.radiusPill}; font-size: 13px; font-weight: 600; background: #FFFFFF; color: ${t.textSecondary}; border: none; }
  .store-preview-pill.active, .eb-manifest-pill.active, #preset-chips .preset-chip.active { background: ${t.brandPrimary} !important; color: #FFFFFF !important; font-weight: 700 !important; }
  #inline-aisle-peek-drawer { display: block; font-size: 16px; padding: 10px 14px; border-radius: ${t.radiusCard}; background: #FFFFFF; color: ${t.textPrimary}; border: none; line-height: 1.55; }
  #lead-squeeze-card { background: ${t.subtleBg}; border: none; border-radius: ${t.radiusCard}; padding: 10px 12px; }
  #prog-instant-action-strip { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .eb-action-btn { padding: 6px 12px; border-radius: ${t.radiusPill}; font-size: 14px; font-weight: 600; background: #FFFFFF; color: ${t.textSecondary}; border: none; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
  .eb-action-btn:hover { color: ${t.brandPrimary}; background: ${t.brandSoftBg}; }
  #tripwire-upsell-box { display: none; margin-top: 8px; padding: 9px 13px; border-radius: ${t.radiusCard}; background: ${t.safeSoftBg}; color: ${t.textPrimary}; border: none; font-size: 14px; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  #sticky-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9990; display: flex !important; align-items: center; justify-content: space-between; gap: 10px; padding: 6px 20px; background: ${t.dockBg}; border: none; color: ${t.textPrimary}; font-family: ${t.fontSans}; transform: translateY(120%); opacity: 0; visibility: hidden; pointer-events: none; transition: transform 250ms ease, opacity 250ms ease, visibility 250ms ease; }
  #sticky-mobile-bar.eb-dock-visible { transform: translateY(0); opacity: 1; visibility: visible; pointer-events: auto; }
  #eb-sticky-email-form, #btn-sticky-micro-unlock, #btn-copy-readme-badge, #btn-nuqs-share-url { display: none !important; }
  #stickyDock { display: none !important; }
  #eb-ouibounce-toast { display: none; position: fixed; bottom: 62px; right: 16px; max-width: 350px; z-index: 9991; background: ${t.cardBg}; color: ${t.textPrimary}; border: none; border-radius: ${t.radiusCard}; padding: 15px; font-family: ${t.fontSans}; }
  #eb-cmdk-modal { display: none; position: fixed; inset: 0; z-index: 9995; background: rgba(15, 23, 42, 0.45); align-items: flex-start; justify-content: center; padding-top: 70px; font-family: ${t.fontSans}; }
  #eb-deliverable-curtain, #eb-pseo-quick-bar, #eb-mobile-firstfold-bar, #eb-pseo-hero-split { display: none !important; }
  @media (max-width: 768px) {
    #eb-deliverable-curtain, #eb-pseo-quick-bar, #eb-mobile-firstfold-bar, #eb-pseo-hero-split { display: none !important; } .top-ticker { display: none !important; } .nav-links { flex-wrap: wrap !important; overflow-x: visible !important; white-space: normal !important; }
    .hero-section, main > section:first-child { padding-top: 24px !important; } main h1 { font-size: 2.05rem !important; line-height: 1.22 !important; margin-top: 4px !important; margin-bottom: 14px !important; }
    .hero-sub, .subhead, .editorial-subhead, .hero-lead { font-size: 1rem !important; line-height: 1.48 !important; margin-bottom: 6px !important; } .site-header .btn, header .btn { padding: 6px 10px !important; font-size:13px !important; }
    .preset-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 6px !important; } #eb-bottom-conversion-suite { padding: 0 14px; margin: 28px auto 82px auto; } .eb-panel-card, #eb-deliverable-curtain { padding: 16px !important; }
    .eb-gbb-grid, #eb-pseo-hero-split, #eb-curtain-visual-split, #eb-interactive-control-row { grid-template-columns: 1fr; } .eb-doppelrand-img { height: 124px; } #eb-pseo-hero-split .eb-doppelrand-img, #eb-curtain-visual-split .eb-doppelrand-img { position: static !important; height: 184px !important; } #free-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    #preset-chips { gap: 4px; } #preset-chips .preset-chip { font-size:13px; padding: 5px 3px; } #sticky-mobile-bar { padding: 7px 12px; gap: 6px; } .table-wrap table, #competitor-battlecard table, .table-wrap tbody, #competitor-battlecard tbody, .table-wrap tr, #competitor-battlecard tr, .table-wrap td, #competitor-battlecard td { display: block !important; width: 100% !important; max-width: 100% !important; min-width: 0 !important; white-space: normal !important; word-break: break-word !important; box-sizing: border-box !important; } .table-wrap thead, #competitor-battlecard thead { display: none !important; }
  }
  @media print {
    header, nav, footer, #sticky-mobile-bar, #eb-ouibounce-toast, #eb-cmdk-modal, #eb-floating-gate-popover, #prog-share-toolbar, #in-card-unlock-bar, #eb-sovrn-affiliate-strip, button, .preset-chip { display: none !important; }
    body, .eb-panel-card { background: #FFFFFF !important; color: #000000 !important; border: 1px solid #000000 !important; box-shadow: none !important; }
  }
</style>`;
}
function buildActionButtonsHtml(cfg, idPrefix) {
  const pfx = idPrefix || '';
  const actions = (cfg.exportActions || [{ id: 'btn-copy-shopping-list', label: 'Copy Summary', type: 'copy' }, { id: 'btn-export-csv', label: 'Export .CSV', href: '/api/github-upgrade/export.csv' }, { id: 'btn-export-ics', label: '.ICS Schedule', href: '/api/github-upgrade/skin-cycling.ics' }, { id: 'btn-export-llms', label: 'Protocol .TXT', href: '/api/github-upgrade/llms-bundle.txt' }, { id: 'btn-print-summary', label: 'Print PDF', type: 'print' }, { id: 'btn-showroom-hud', label: cfg.hudLabel, type: 'hud' }, { id: 'btn-cmdk-trigger', label: '⌘K Actions', type: 'cmdk' }, { id: 'btn-reddit-share', label: 'Reddit MD', type: 'reddit' }]).slice(0, 3);
  return actions.map((a) => {
    if (a.href) return `<a id="${esc(pfx + a.id)}" class="eb-action-btn" href="${esc(a.href)}" download onclick="window.__ebShowTripwire()">${esc(a.label)}</a>`;
    const fn = a.type === 'copy' ? 'window.__ebCopySummary()' : a.type === 'print' ? 'window.__ebPrintSheet()' : a.type === 'hud' ? 'window.__ebToggleHud()' : a.type === 'cmdk' ? 'window.__ebToggleCmdk()' : 'window.__ebCopyReddit()';
    return `<button type="button" id="${esc(pfx + a.id)}" class="eb-action-btn" onclick="${fn}">${esc(a.label)}</button>`;
  }).join('');
}
function buildScenarioAndExportWorkbenchHtml(cfg) {
  const t = getTheme(cfg);
  const presetsHtml = cfg.presets.map((p, idx) => `<button type="button" class="preset-chip" data-preset="${esc(p.key)}" onclick="window.__ebApplyPreset('${esc(p.key)}', ${idx})">${esc(p.label)}</button>`).join('');
  const kpisHtml = cfg.kpis.map((k) => `<div class="eb-kpi-card"><div class="eb-kpi-label">${esc(k.label)}</div><div class="eb-kpi-val metric-box-value">${esc(k.val)}</div><div class="eb-kpi-sub">${esc(k.sub)}</div></div>`).join('');
  const pillsHtml = cfg.coMarketingPills.map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`).join('');
  const actionsHtml = buildActionButtonsHtml(cfg, 'embed-');
  return `<div id="eb-executive-strip" class="eb-panel-card" aria-label="${esc(cfg.brandName)} Scenario Simulator & Export Utilities">
  <div id="results-section" style="display:block;">
    <div class="eb-strip-top-bar"><span class="eb-strip-eyebrow">✦ ${esc(cfg.brandName)} Interactive Benchmark &amp; Export Utilities</span><span id="headline-unlock-explainer" style="font-size:13px;color:${t.textMuted};">${esc(cfg.explainerText)}</span></div>
    <div id="preset-chips">${presetsHtml}</div>
    <div id="eb-interactive-control-row"><input type="text" id="eb-fuse-search-input" placeholder="${esc(cfg.searchPlaceholder || 'Filter scenario...')}" aria-label="Filter Scenario" oninput="window.__ebRunFuseSearch(this.value)" /><label class="eb-slider-wrap" for="eb-nouislider-range"><span id="eb-slider-readout">${esc(cfg.sliderLabel || 'Scale')}: ${esc(cfg.sliderVal || 50)}</span><input type="range" id="eb-nouislider-range" min="${esc(cfg.sliderMin || 1)}" max="${esc(cfg.sliderMax || 100)}" value="${esc(cfg.sliderVal || 50)}" oninput="window.__ebOnSliderInput(this.value)" /></label></div>
    <div id="free-metrics-grid" class="grid-metrics">${kpisHtml}<div class="stat-pill-locked" id="embed-summary-report-card"><div class="eb-locked-top"><span style="font-size:13px;font-weight:700;color:${t.brandText};">✦ ${esc(cfg.lockedTitle)}: Channel &amp; Protocol Insights</span><button type="button" id="embed-btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Toggle Insight ▾</button></div><div class="eb-store-pills">${pillsHtml}</div><div id="embed-inline-aisle-peek-drawer"><div id="embed-eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div></div></div></div>
    <div id="embed-lead-squeeze-card"><div id="embed-prog-instant-action-strip">${actionsHtml}<button type="button" id="btn-calc" class="eb-action-btn" style="background:${t.brandSoftBg};color:${t.brandText};border-color:${t.accentBorder};font-weight:700;" onclick="window.__ebTriggerHostCalc()">Recalculate ↗</button></div><div id="embed-tripwire-upsell-box"><span>Need the full unblurred routine card &amp; 4-night calendar? Unlock the <strong>Complete AM/PM Routine Kit ($1.99)</strong>: one-time payment, no subscription.</span><button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock $1.99 Kit →</button></div><div id="embed-eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-family:monospace;font-size:13px;">[${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}</div></div>
  </div>
</div>`;
}
function buildBottomConversionSuiteHtml(cfg, reqPath) {
  const t = getTheme(cfg);
  const shareUrl = `https://${cfg.domain}${reqPath || '/'}`;
  const redditHref = `https://www.reddit.com/r/${cfg.redditSub}/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cfg.brandName + ' Benchmark & Protocol')}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Ran a live audit on ' + cfg.brandName)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(cfg.brandName + ' Summary')}&body=${encodeURIComponent('Review this scenario: ' + shareUrl)}`;
  const pillsHtml = cfg.coMarketingPills.map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`).join('');
  const actionsHtml = buildActionButtonsHtml(cfg);
  const affiliatesHtml = cfg.affiliates.map((a) => `<a href="${esc(a.url)}" target="_blank" rel="noopener sponsored" class="eb-tier-card" style="text-decoration:none;color:${t.textPrimary};" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(a.title)}' })"><div><span style="font-size:13.5px;font-weight:700;color:${t.safeColor};">${esc(a.badge)}</span><div style="font-size:15px;font-weight:700;margin-top:4px;color:${t.textPrimary};">${esc(a.title)}</div></div><div style="margin-top:10px;font-size:13.5px;color:${t.brandPrimary};font-weight:700;">${esc(a.cpa)} →</div></a>`).join('');
  const bc = cfg.battlecard || { heading: `Why ${cfg.brandName} Outperforms Traditional Alternatives`, colLegacy: 'Legacy Suites', colManual: 'Manual Guesswork', rows: [['Diagnostic Precision', '< 15ms Deterministic Engine', 'Slow Legacy Audits', 'Manual Trial & Error'], ['Actionable Deliverable', cfg.deliverableName, 'Generic Reports', 'Static Notes'], ['Transparent Pricing', `$0 Free Summary or $1.99 Complete Kit`, 'Expensive Subscriptions', 'Ruined Serums']] };
  const battlecardRowsHtml = bc.rows.map((r, idx) => `<tr style="${idx < bc.rows.length - 1 ? `border-bottom:1px solid ${t.border};` : ''}"><td style="padding:10px 12px;font-weight:600;">${esc(r[0])}</td><td style="padding:10px 12px;color:${t.safeColor};font-weight:700;">${esc(r[1])}</td><td style="padding:10px 12px;color:${t.textSecondary};">${esc(r[2])}</td><td style="padding:10px 12px;color:${t.textSecondary};">${esc(r[3])}</td></tr>`).join('');
  const st = { h: 'Built for Calm, Glowing Skin Without the Chemistry Guesswork', q: '“Splitting my six products into a simple morning and bedtime schedule stopped barrier irritation and changed my skin in days.”', who: 'Simone R. · Daily Routine', tag: 'Barrier-Safe Routine', segs: [['/public/photo_model_clean_face.jpg', 'Chloe Lin · Morning Glow', 'Zero SPF Pilling'], ['/public/photo_model_glow_skin.jpg', 'Elena M. · Sensitive Barrier', 'Safe Acid + Peptide Split'], ['/public/photo_facial_treatment.jpg', 'Amara O. · Bedtime Ritual', 'Stopped Flaking in 4 Days'], ['/public/photo_model_clean_face.jpg', 'Maya T. · Allergy-Prone Skin', '0 Contact Rashes (EU CosIng)']] };
  const segsHtml = (st.segs || []).map((sg) => `<div style="display:flex;flex-direction:column;justify-content:space-between;gap:6px;padding:14px 16px;border-radius:12px;background:${t.subtleBg};"><div style="font-size:15px;font-weight:800;color:${t.safeColor};">${esc(sg[2])}</div><div style="font-size:13.5px;font-weight:600;color:${t.textPrimary};">${esc(sg[1])}</div></div>`).join('');
  return `<section id="eb-bottom-conversion-suite" class="container" aria-label="${esc(cfg.brandName)} Export Passes, Comparisons & Partner Ecosystem">
  <div id="eb-customer-story-card" class="eb-panel-card" style="display:flex;flex-direction:column;gap:16px;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;"><h3 style="margin:0;font-size:21px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};line-height:1.3;">${esc(st.h)}</h3><span style="padding:4px 12px;border-radius:${t.radiusPill};background:${t.safeSoftBg};color:${t.safeColor};font-weight:700;font-size:13px;">${esc(st.tag)}</span></div>
    <p style="margin:0;font-size:16px;color:${t.textSecondary};line-height:1.6;max-width:none !important;">${esc(st.q)} <strong style="color:${t.textPrimary};font-weight:700;"> ·  ${esc(st.who)}</strong></p>
    <div id="eb-segment-portrait-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px;">${segsHtml}</div>
  </div>
  <div id="in-card-unlock-bar" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
      <div><h2 id="in-card-unlock-title" style="margin:0;font-size:20px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(cfg.unlockBannerTitle)}</h2><div style="font-size:16px;color:${t.textSecondary};margin-top:4px;">&#10003; EU CosIng &amp; Lab pH Verified • 8 Contact-Allergen Screens • Instant fulfillment • 30-day refund guarantee</div></div>
      <div id="tab-btn-dossier" style="font-size:14px;font-weight:700;color:${t.safeColor};background:${t.safeSoftBg};padding:6px 14px;border-radius:${t.radiusPill};">Most Popular: $0 Free Email Save · $1.99 Complete Kit</div>
    </div>
    <form id="eb-save-scorecard-bar" class="dl-inline-ics-form" onsubmit="return (window.__dlCaptureFreeIcsLead ? window.__dlCaptureFreeIcsLead(event, 'bottom_unlock_bar') : window.__ebSaveInlineScorecard(event, 'eb-inline-scorecard-email', 'eb-save-scorecard-bar'))" style="margin-top:14px;padding:12px 16px;border-radius:${t.radiusCard};background:${t.safeSoftBg};display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
      <div style="font-size:14px;color:${t.textPrimary};"><strong>Free Step ($0 Email):</strong> Unlock 9:30 PM Bedtime Order, 8-Allergen Screen, 4-Night Calendar (.ICS) &amp; 2 Chemist Dupes</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;flex:1;max-width:440px;justify-content:flex-end;">
        <input type="email" id="eb-inline-scorecard-email" class="dl-inline-ics-email" placeholder="Enter your email for free AM/PM + 2 dupes ($0)..." required style="flex:1;min-width:200px;padding:8px 12px;border-radius:${t.radiusPill};border:1px solid ${t.safeBorder};background:#FFFFFF;color:${t.textPrimary};font-size:13.5px;" />
        <button type="submit" class="dl-inline-ics-btn" style="padding:8px 16px;border-radius:${t.radiusPill};background:${t.safeColor};color:#FFFFFF;font-weight:700;font-size:13.5px;border:none;white-space:nowrap;">Unlock AM/PM &amp; 2 Dupes ($0) →</button>
      </div>
      <div class="dl-inline-ics-status" style="display:none;width:100%;font-size:13px;color:${t.safeColor};margin-top:4px;"></div>
    </form>
    <div class="eb-gbb-grid">
      <div class="eb-tier-card featured">
        <div><div class="matrix-price" style="font-family:${t.fontSans};font-size:30px;font-weight:700;margin:4px 0 8px 0;color:${t.textPrimary};">$1.99 <span style="font-family:${t.fontSans};font-size:14px;font-weight:500;color:${t.textMuted};">one-time · no subscription</span></div><p style="font-size:16px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier1Desc || `Instantly unlocks ${cfg.deliverableName}, downloadable exports, and 24-hour recalculations.`)}</p></div>
        <button type="button" id="btn-prog-flash-pass" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;font-weight:700;font-size:14px;border:none;" onclick="window.__ebCheckout('flash_pass', true)">Save 9:16 Phone Routine Card ($1.99) →</button>
      </div>
      <div class="eb-tier-card">
        <div><div class="matrix-price" style="font-family:${t.fontSans};font-size:30px;font-weight:700;margin:4px 0 8px 0;color:${t.textPrimary};">$${esc(cfg.corePriceUsd)} <span style="font-family:${t.fontSans};font-size:14px;font-weight:500;color:${t.textMuted};">complete AM/PM routine kit</span></div><p style="font-size:16px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier2Desc || cfg.coreLabel)}</p></div>
        <button type="button" id="btn-prog-full-dossier" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.safeColor};color:#FFFFFF;font-weight:700;font-size:14px;border:none;" onclick="window.__ebCheckout('playbook_pass', true)">${esc(cfg.coreLabel)}</button>
      </div>
      <div class="eb-tier-card">
        <div><div class="matrix-price" style="font-family:${t.fontSans};font-size:30px;font-weight:700;margin:4px 0 8px 0;color:${t.textPrimary};">$${esc(cfg.proPriceUsd)} <span style="font-family:${t.fontSans};font-size:14px;font-weight:500;color:${t.textMuted};">unlimited annual shelf pass</span></div><p style="font-size:16px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier3Desc || cfg.proLabel)}</p></div>
        <button type="button" id="btn-prog-pro-b2b" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.textPrimary};color:#FFFFFF;font-weight:700;font-size:14px;border:none;" onclick="window.__ebCheckout('pro_b2b', true)">${esc(cfg.proLabel)}</button>
      </div>
    </div>
    <div id="eb-pricing-preview-confirm" style="display:none;margin-top:16px;padding:18px 22px;border-radius:${t.radiusCard};background:${t.subtleBg};"><div id="eb-pricing-preview-box" style="margin:0 0 14px 0;padding:14px 18px;border-radius:10px;background:${t.cardBg};color:${t.textPrimary};font-family:${t.fontSans};font-size:14px;line-height:1.5;overflow-x:auto;"></div><div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;"><div style="flex:1;min-width:220px;"><div id="eb-pricing-preview-title" style="font-size:15.5px;font-weight:700;color:${t.textPrimary};">Step 1 of 2: Preview Your Included Deliverable Above</div><div style="font-size:13.5px;color:${t.textSecondary};margin-top:2px;">Instant download after checkout · One-time or self-serve fulfillment · 30-day guarantee</div></div><div style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;"><button type="button" onclick="document.getElementById('eb-pricing-preview-confirm').style.display='none';" style="padding:10px 14px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.textSecondary};border:none;font-size:13.5px;font-weight:600;cursor:pointer;">Edit Selection</button><button type="button" id="btn-pricing-confirm-stripe" onclick="window.__ebCheckout(window.__ebPendingTier||'flash_pass', true)" style="padding:11px 22px;border-radius:${t.radiusPill};background:${t.safeColor};color:#FFFFFF;border:none;font-size:14px;font-weight:700;cursor:pointer;white-space:nowrap;">Confirm Purchase ($1.99) →</button></div></div></div>
    <button type="button" id="btn-checkout" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Hidden Test Alias</button>
  </div>
  <div id="competitor-battlecard" class="eb-panel-card">
    <h3 style="margin:0 0 12px 0;font-size:19px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(bc.heading)}</h3>
    <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:16px;text-align:left;color:${t.textPrimary};"><thead><tr style="border-bottom:1px solid ${t.border};color:${t.textMuted};background:${t.subtleBg};"><th style="padding:10px 12px;">What Matters</th><th style="padding:10px 12px;color:${t.brandPrimary};">${esc(cfg.brandName)}</th><th style="padding:10px 12px;">${esc(bc.colLegacy)}</th><th style="padding:10px 12px;">${esc(bc.colManual)}</th></tr></thead><tbody>${battlecardRowsHtml}</tbody></table></div>
  </div>
  <div id="eb-export-utility-bar" class="eb-panel-card" style="${reqPath && reqPath.startsWith('/scan/') ? 'display:none;' : ''}">
    <div class="stat-pill-locked" id="summary-report-card" style="margin-bottom:10px;border:none;">
      <div class="eb-locked-top"><span style="font-size:16px;font-weight:700;color:${t.brandText};">${esc(cfg.lockedTitle)}</span><button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Show / Hide Tip ▾</button></div>
      <div class="eb-store-pills">${pillsHtml}</div>
      <div id="inline-aisle-peek-drawer"><div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div></div>
    </div>
    <details id="lead-squeeze-card" style="cursor:pointer;border:none;">
      <summary style="font-size:16px;font-weight:700;color:${t.textSecondary};list-style:none;display:flex;justify-content:space-between;align-items:center;"><span>Export Tools, Share Links &amp; Data Methodology</span><span style="color:${t.brandPrimary};font-size:14px;">Expand Tools ▾</span></summary>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-top:10px;padding-top:10px;">
        <div id="prog-instant-action-strip">${actionsHtml}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;" id="prog-share-toolbar"><button type="button" id="btn-copy-scenario-link" class="eb-action-btn" onclick="window.__ebCopyScenarioLink(this)">Copy Link</button><a id="btn-share-reddit" class="eb-action-btn" href="${esc(redditHref)}" target="_blank" rel="noopener">Share on r/${esc(cfg.redditSub)}</a><a id="btn-share-x" class="eb-action-btn" href="${esc(xHref)}" target="_blank" rel="noopener">Post on X</a><a id="btn-share-email" class="eb-action-btn" href="${esc(mailHref)}">Email</a><a class="eb-action-btn" href="/embed" target="_blank" rel="noopener">Embed</a></div>
      </div>
      ${cfg.githubRepo ? `<div style="margin-top:10px;padding:10px 12px;border-radius:8px;background:${t.canvasBg};font-size:16px;color:${t.textSecondary};"><strong>Technical Methodology (${esc(cfg.githubRepo.badge)}):</strong> ${esc(cfg.githubRepo.summary)} <span style="color:${t.textMuted};">(${esc(cfg.githubRepo.name)} • ${esc(cfg.githubRepo.stars)})</span></div>` : ''}
      <div id="tripwire-upsell-box"><span>Need the complete printable routine files &amp; 4-night calendar? Get the <strong>Complete AM/PM Routine Kit ($1.99)</strong>: one-time payment, no subscription.</span><button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('playbook_pass')">Get $1.99 Kit →</button></div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};color:${t.safeColor};font-variant-numeric:tabular-nums;font-size:13.5px;">[${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}</div>
    </details>
  </div>
  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card"><h3 style="margin:0 0 10px 0;font-size:18px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">Recommended Companion Tools &amp; Products</h3><div class="eb-gbb-grid" style="grid-template-columns:repeat(auto-fit,minmax(260px,1fr));">${affiliatesHtml}</div></div>
  ${buildMobileSeoCrawlMeshHtml(cfg, reqPath)}
</section>
<div id="eb-floating-gate-popover" role="dialog" aria-label="Instant Deliverable Export Pass">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:13px;font-weight:700;color:${t.brandPrimary};">&#10003; EU CosIng &amp; Lab pH Verified</span>
    <button type="button" onclick="document.getElementById('eb-floating-gate-popover').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:15px;">Close</button>
  </div>
  <div id="eb-popover-title" style="font-family:${t.fontDisplay};font-size:16.5px;font-weight:700;color:${t.textPrimary};margin-bottom:4px;">Unlock &amp; Download ${esc(cfg.freeDeliverableName)}</div>
  <p id="eb-popover-desc" style="font-size:13px;color:${t.textSecondary};margin:0 0 10px 0;line-height:1.4;"><strong>Free ($0 Email):</strong> 9:30 PM Bedtime Order + 2 Chemist Dupes · <strong>$1.99 Complete 3-File Kit</strong> (30-Day Refund Guarantee):</p>
  <div style="display:grid;gap:6px;">
    <button type="button" onclick="document.getElementById('eb-floating-gate-popover').style.display='none';if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this);" style="width:100%;padding:8px 14px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandPrimary};border:none;font-weight:700;font-size:13px;cursor:pointer;">&#128274; Email Free 9:30 PM Order &amp; 2 Dupes ($0) &uarr;</button>
    <button type="button" id="btn-popover-vault-pass" onclick="window.__ebCheckout('flash_pass', true)" style="width:100%;padding:9px 14px;border-radius:${t.radiusPill};background:${t.safeColor};color:#FFFFFF;border:none;font-weight:700;font-size:13px;cursor:pointer;">Save Complete 3-File Routine Kit ($1.99) →</button>
  </div>
</div>
<div id="eb-ouibounce-toast" role="dialog" aria-label="Send 1-Page Summary Before Leaving">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span id="eb-ouibounce-title" style="font-size:13px;font-weight:700;color:${t.brandPrimary};">Save Your Routine Card Before Leaving</span>
    <button type="button" onclick="try{localStorage.setItem('eb_toast_dismissed_ts',String(Date.now()));}catch(_){}document.getElementById('eb-ouibounce-toast').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:14px;">Close</button>
  </div>
  <p id="eb-ouibounce-desc" style="font-size:13px;color:${t.textSecondary};margin:0 0 6px 0;line-height:1.4;">Email yourself the free Morning &amp; Bedtime summary + 2 chemist dupes ($0), or save the complete 3-part Routine Kit for <strong>$1.99</strong>:</p>
  <form onsubmit="return window.__ebSendExitSummary(event)" style="display:grid;grid-template-columns:1fr auto;gap:6px;margin-bottom:8px;">
    <input type="email" id="eb-ouibounce-email" placeholder="Your email for AM/PM summary..." required style="padding:6px 9px;border-radius:7px;background:#FFFFFF;color:${t.textPrimary};font-size:13px;border:none;" />
    <button type="submit" id="btn-ouibounce-submit" style="padding:6px 11px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandPrimary};font-size:13px;font-weight:700;border:none;">Email AM/PM Summary ($0) →</button>
  </form>
  <div style="display:grid;grid-template-columns:1fr;gap:6px;">
    <button type="button" id="btn-toast-flash-pass" onclick="window.__ebCheckout('flash_pass')" style="padding:7px 8px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:13px;">Complete Kit ($1.99) →</button>
  </div>
</div>
<div id="eb-cmdk-modal" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:${t.cardBg};border-radius:${t.radiusCard};width:92%;max-width:480px;padding:18px;color:${t.textPrimary};">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:8px;">
      <span style="font-size:13px;font-weight:700;color:${t.brandPrimary};">${esc(cfg.brandName)} Quick Actions</span>
      <button type="button" onclick="document.getElementById('eb-cmdk-modal').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:13px;">ESC</button>
    </div>
    <div style="display:grid;gap:6px;">
      <button type="button" class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;" onclick="document.getElementById('eb-cmdk-modal').style.display='none';if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this);"><span>&#128274; Email Free 9:30 PM Routine &amp; 2 Chemist Dupes</span><strong style="color:${t.safeColor};">$0 Free &uarr;</strong></button>
      <a href="/?allergies=fragrance,snail_mite,salicylates#checker-workbench" class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>&#10003; Screen Routine for 8 Contact-Allergy Triggers (EU CosIng)</span><strong style="color:${t.brandPrimary};">Free Screen →</strong></a>
      <button type="button" class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;" onclick="window.__ebCheckout('flash_pass')"><span>Save Complete 3-File AM/PM Routine Kit</span><strong style="color:${t.brandPrimary};">$1.99 →</strong></button>
      <a href="/api/github-upgrade/export.csv" download class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>Download Pore-Safe &amp; Dupe Swaps (.CSV)</span><strong>.CSV ↗</strong></a>
      <a href="/api/github-upgrade/skin-cycling.ics" download class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>Download 4-Night Skin-Cycling Schedule (.ICS)</span><strong>.ICS ↗</strong></a>
      <a href="/dossier/sample" class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>View Sample Routine Deliverable</span><strong>Open →</strong></a>
    </div>
  </div>
</div>
<div id="sticky-mobile-bar" role="region" aria-label="Instant Access Conversion Dock">
  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
    <span style="display:inline-flex;align-items:center;gap:5px;font-size:13px;font-weight:700;color:${t.textPrimary};"><span style="width:7px;height:7px;border-radius:50%;background:${t.safeColor};display:inline-block;"></span>${esc(cfg.brandName)}</span>
    <a href="#in-card-unlock-bar" id="sticky-sub-benefit" style="font-size:13px;color:${t.textSecondary};font-weight:600;text-decoration:none;">Custom 9:16 Lockscreen Card + 4-Night Calendar (.ICS) + 2 Chemist Dupes</a>
  </div>
  <div style="display:flex;align-items:center;gap:6px;">
    <button type="button" class="eb-action-btn" style="background:${t.brandSoftBg};color:${t.brandPrimary};font-weight:700;border:none;padding:7px 12px;border-radius:${t.radiusPill};" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)">Email AM/PM ($0)</button>
    <button type="button" id="btn-sticky-vault-unlock" class="eb-action-btn" style="background:${t.safeColor};color:#FFFFFF;font-weight:700;border:none;padding:7px 14px;border-radius:${t.radiusPill};" onclick="window.__ebCheckout('flash_pass', true)">Complete 3-File Kit ($1.99) →</button>
    <button type="button" id="btn-sticky-dock-close" aria-label="Hide bottom bar" title="Hide bottom bar" onclick="try{sessionStorage.setItem('eb_dock_dismissed','1');}catch(_){}var d=document.getElementById('sticky-mobile-bar');if(d){d.classList.remove('eb-dock-visible');d.style.display='none';}" style="background:transparent;border:none;color:${t.textMuted};font-size:16px;font-weight:700;line-height:1;padding:4px 6px;cursor:pointer;">×</button>
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
  var CFG = ${JSON.stringify({ moduleId: cfg.moduleId, brandName: cfg.brandName, domain: cfg.domain, corePriceUsd: cfg.corePriceUsd, proPriceUsd: cfg.proPriceUsd, coreLabel: cfg.coreLabel, freeDeliverableName: cfg.freeDeliverableName || 'Production Deliverable', deliverableName: cfg.deliverableName || 'Complete Pro Deliverable', deliverableFiles: cfg.deliverableFiles || [], presets: (cfg.presets || []).slice(0, 3), searchPlaceholder: cfg.searchPlaceholder || 'Enter product or ingredient...', sliderLabel: cfg.sliderLabel || 'Scale', theme: t, firstPartner, remDiff, pillMap, presetKpis: cfg.presetKpis || {} }).replace(/</g, '\\u003c')};
  var STORAGE_KEY = 'eb_paid_unlocked_v6_' + CFG.moduleId;
  window.__ebIsUnlocked = false; window.__ebActiveEntity = ''; window.__ebUserInteracted = false;
  var PERSONA = { leadBtn: 'Email Free Summary ($0)', leadPh: 'Enter your email address...', microBtn: '9:16 Phone Card Only', ctaTitle: 'Your Routine Check Is Ready:', heroTitle: 'Morning & Night Guide', heroSub: 'Checks Vitamin C, Retinol, Peptides & Exfoliants for Clashes', heroBadge: 'Pore & pH Safe', dossierTag: 'Routine Kit', curTitle: 'Morning & Night Routine Kit', lossHook: 'Get your complete Morning & Night Routine Kit for $1.99', pureCta: 'Save Complete Routine Kit ($1.99) →' };
  function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function cleanEnt(s, max) {
    var raw = String(s || '').trim();
    var presetMatch = (CFG.presets || []).find(function(p) { return p.key === raw || p.label === raw; });
    if (presetMatch && presetMatch.label) return presetMatch.label.split(' (')[0].trim();
    var c = raw.replace(/[<>"'&]/g, ' ').replace(/Category Peer|Inspect\\s*↗|✓\\s*Inspecting.*|Sim/gi, '').replace(/^P\\d+\\s*|^#\\d+\\s*/i, '').replace(/-(?:sponsors-and-cpm-rates|ad-rates|b2b-podcast-sponsorship|podcast-sponsorship|podcast-spend|newsletter-sponsorship|layering|conflict|recovery|retry-schedule|ai-visibility-audit).*$/i, '').replace(/^stripe-decline-code-/i, '').replace(/[-_]+/g, ' ').replace(/\\s+/g, ' ').trim();
    if (!c) { var domInp = document.getElementById('domain-input') || document.getElementById('lookup-query'); return (domInp && domInp.value) ? domInp.value.trim() : CFG.brandName; }
    var limit = max || 28;
    if (c.length <= limit) return c;
    var cut = c.slice(0, limit).replace(/\\s+\\S*$/, '');
    return (cut.length > 3 ? cut : c.slice(0, limit)).trim();
  }
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
  window.__ebGetBuyerWedge = function() { try { return window.__srActiveWedge || localStorage.getItem('sr_buyer_wedge') || (JSON.parse(localStorage.getItem('sr_workspace_v1') || '{}').persona) || 'buyer'; } catch (_) { return window.__srActiveWedge || 'buyer'; } };
  window.__ebLogEvent = function(eventType, meta) {
    try {
      var m = Object.assign({ vid: window.__ebVid, sid: window.__ebSid, js_hydrated: 1, buyer_wedge: window.__ebGetBuyerWedge() }, meta || {});
      var payload = JSON.stringify({ event_type: eventType, page_url: window.location.pathname, meta: m });
      if (eventType === 'visit_hydrated' && navigator.sendBeacon) {
        try { navigator.sendBeacon('/api/telemetry/event', new Blob([payload], { type: 'application/json' })); return; } catch (_) {}
      }
      fetch('/api/telemetry/event', { method: 'POST', keepalive: true, headers: { 'Content-Type': 'application/json' }, body: payload }).catch(function(){});
    } catch (_) {}
  };
  try {
    if (!window.__ebHydrationLogged) {
      window.__ebHydrationLogged = true;
      window.__ebLogEvent('visit_hydrated', { ua_platform: navigator.platform || '', vw: window.innerWidth || 0 });
    }
  } catch (_) {}
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
  window.__ebTriggerPostCalcSpotlight = function(entityName) {
    if (window.__ebIsUnlocked) return;
    var label = entityName ? (' (' + cleanEnt(entityName, 20) + ')') : '';
    var curtain = document.getElementById('eb-deliverable-curtain');
    if (curtain) curtain.style.boxShadow = '0 10px 28px rgba(15,23,42,0.07)';
    var pcBar = document.getElementById('eb-postcalc-inline-cta');
    if (pcBar) {
      var pcTitle = document.getElementById('eb-postcalc-cta-title');
      if (pcTitle) pcTitle.textContent = label ? ('Results Ready' + label + ':') : PERSONA.ctaTitle;
    }
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
    var m = Number(mult) || 1, baseUsd = 165;
    var badge = document.getElementById('eb-curtain-roi-badge');
    if (badge) badge.textContent = 'Est. Value: $' + (baseUsd * m).toLocaleString() + ' (' + Math.round((baseUsd * m) / 1.99).toLocaleString() + 'x vs $1.99 Kit)';
    window.__ebLogEvent('calculate', { source: 'curtain_roi_scale', multiplier: m });
  };
  window.__ebCycleHeroScenario = function(ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    var list = (CFG.presets && CFG.presets.length) ? CFG.presets : [{ key: 'custom-benchmark', label: 'Live Scenario' }];
    window.__ebHeroPresetIdx = ((window.__ebHeroPresetIdx || 0) + 1) % list.length;
    var p = list[window.__ebHeroPresetIdx];
    var curves = ['M1 11 C 9 10, 14 4, 22 6 C 29 8, 34 2, 41 2', 'M1 12 C 10 6, 18 9, 26 4 C 32 2, 37 5, 41 1', 'M1 9 C 8 11, 16 3, 24 7 C 31 4, 36 3, 41 2'];
    var photos = ['/public/editorial-hero.jpg', '/public/editorial-segment-1.jpg', '/public/editorial-segment-2.jpg', '/public/editorial-segment-3.jpg'];
    var pathEl = document.getElementById('eb-sparkline-path'), lblEl = document.getElementById('eb-hero-sparkline-label'), hImg = document.querySelector('#eb-doppelrand-hero-card img'), cImg = document.querySelector('#eb-curtain-dossier-card img');
    if (pathEl) pathEl.setAttribute('d', curves[window.__ebHeroPresetIdx % curves.length]);
    if (lblEl) lblEl.textContent = p.label + ' Simulated';
    if (hImg) hImg.src = photos[window.__ebHeroPresetIdx % photos.length];
    if (cImg) cImg.src = photos[(window.__ebHeroPresetIdx + 2) % photos.length];
    window.__ebCompileCustomCurtain(p.key);
  };
  window.__ebGetDermCtx = function(tabIdx) {
    var checked = Array.prototype.slice.call(document.querySelectorAll('input[name="routineProduct"]:checked')), names = [], totalUsd = 0;
    checked.forEach(function(inp) { var lbl = inp.closest ? inp.closest('.prod-check-item') : null, st = lbl ? lbl.querySelector('strong') : null, mn = lbl ? lbl.querySelectorAll('.mono') : []; if (st && st.textContent) names.push(st.textContent.trim()); for (var i = 0; i < mn.length; i++) { var d = (mn[i].textContent || '').split('$')[1]; if (d && parseInt(d, 10) > 0) totalUsd += parseInt(d, 10); } });
    var clashEl = document.querySelector('#liveResultsContainer .conflict-card .mono:nth-child(2)'), clashPair = clashEl ? clashEl.textContent.trim() : '', ent = window.__ebActiveEntity || 'Vitamin C + Retinoid & Peptide', parts = ent.split(' + ').filter(Boolean);
    var hasShelf = names.length > 0, usd = totalUsd > 0 ? totalUsd : 165, amItem = hasShelf ? (names.find(function(n) { return /vitamin c|ferulic|melano|spf|mist|urea/i.test(n); }) || names[0]) : (parts[1] || parts[0] || 'Morning Vitamin C Serum');
    var pmItemA = hasShelf ? (names.find(function(n) { return /bha|glycolic|lactic|babyfacial|bpo|benzoyl|effaclar/i.test(n); }) || names[1] || names[0]) : (parts[0] || 'Exfoliating / Peptide Active'), pmItemB = hasShelf ? (names.find(function(n) { return /tretinoin|retinal|copper|peptide|faded/i.test(n); }) || names[names.length - 1]) : (parts[1] || 'Night Retinoid / Recovery');
    var pairStr = clashPair || (pmItemA + ' + ' + pmItemB), shelfHeader = hasShelf ? ('Your ' + names.length + ' Checked Bottles ($' + usd + ' Shelf): ' + names.slice(0, 4).join(' + ') + (names.length > 4 ? ' +' + (names.length - 4) + ' more' : '')) : ('Tailored for Your ' + ent + ' Routine ($' + usd + ' Active Serums Protected)');
    var badge = hasShelf ? (names.length + ' Checked Bottles · Protects $' + usd + ' Shelf') : ('Tailored for ' + ent.slice(0, 28) + ' · Protects $' + usd + ' Serums'), hook = hasShelf ? ('Stop wasting $' + usd + ' in serums that cancel on contact: save your custom ' + names.length + '-Bottle Routine Kit for $1.99') : ('Stop wasting $' + usd + ' in serums that cancel on contact: save your custom ' + ent.slice(0, 28) + ' Routine Kit for $1.99');
    var idx = typeof tabIdx === 'number' ? tabIdx : (window.__ebActiveTabIdx || 0), body = idx === 1 ? ('• Custom 4-Night Calendar (.ICS): Night 1 (Exfoliate): ' + pmItemA + ' · Night 2 (Retinoid/Peptide): ' + pmItemB + '\\n• Nights 3 & 4 (Barrier Recovery): Zero acids or retinoids; 3:1:1 Ceramide recovery cushion with 9:00 PM phone alerts.') : (idx === 2 ? ('• Custom Pore-Safe & pH Swaps (.CSV): Audits ' + (hasShelf ? ('your ' + names.length + ' selected bottles') : ent) + ' against 65 pore-clogging esters & fungal triggers.\\n• Includes 1-to-1 barrier-safe alternatives (Budget vs. Clinical) that layer with ' + amItem + ' without pilling or stinging.') : ('• Morning Lockscreen Card (7:30 AM): Gentle Rinse -> ' + amItem + ' -> [Exact pH Dry-Down Wait Timer Locked] -> SPF 50.\\n• Bedtime Lockscreen Card (9:30 PM): Separates ' + pairStr + ' onto alternating nights so neither bottle deactivates the other.'));
    return { badge: badge, hook: hook, preview: shelfHeader + '\\n\\n' + body + '\\n\\nIncluded in your $1.99 kit: Custom 9:16 Phone Card (PDF) · 4-Night Calendar (.ICS) · Pore-Safe Swaps (.CSV).', ent: hasShelf ? (names.length + '-Bottle Shelf') : ent };
  };
  window.__ebBuildProofHtml = function(mode, tabIdx) {
    var idx = typeof tabIdx === 'number' ? tabIdx : (window.__ebActiveTabIdx || 0), isSample = mode === 'sample';
    var files = CFG.deliverableFiles || [], f = files[idx] || files[0] || { file: 'bundle.csv', label: 'Primary Deliverable', size: '18 KB', schema: 'Verified rows & ready-to-use templates' };
    var ent = cleanEnt(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].label) || CFG.brandName, 34), fTitle = (f.label || f.file).replace(/[<>"']/g, ''), ext = ((f.file || '').split('.').pop() || 'CSV').toUpperCase();
    var row = function(c1, c2, bTxt, isGreen) {
      var bg = isGreen ? CFG.theme.safeSoftBg : CFG.theme.brandSoftBg, fg = isGreen ? CFG.theme.safeColor : CFG.theme.brandPrimary;
      return '<div class="eb-proof-row"><div style="font-weight:700;font-size:13.5px;color:' + CFG.theme.textPrimary + ';">' + escHtml(c1) + '</div><div style="font-size:13.5px;color:' + CFG.theme.textSecondary + ';min-width:0;">' + escHtml(c2) + '</div><span style="padding:3px 9px;border-radius:999px;background:' + bg + ';color:' + fg + ';font-size:13px;font-weight:700;white-space:normal;">' + escHtml(bTxt) + '</span></div>';
    };
    var hdr = '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding-bottom:6px;"><div style="display:inline-flex;align-items:center;gap:8px;min-width:0;flex-wrap:wrap;"><span style="padding:2px 8px;border-radius:6px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';font-size:13px;font-weight:800;">.' + escHtml(ext) + '</span><strong style="font-size:14px;color:' + CFG.theme.textPrimary + ';white-space:normal;overflow-wrap:break-word;">' + escHtml(isSample ? ('Live Sample Preview · ' + fTitle) : fTitle) + '</strong></div><span style="padding:3px 10px;border-radius:999px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-size:13px;font-weight:700;white-space:normal;">' + escHtml(isSample ? 'Row #1 Sample Unmasked' : ('Verified for ' + ent)) + '</span></div>';
    var dCtx = window.__ebGetDermCtx(idx), lines = (dCtx.preview || '').split('\\n').filter(Boolean);
    return hdr + '<div style="display:flex;flex-direction:column;gap:6px;">' + row('07:30 AM Morning', (lines[1] || 'Lukewarm Rinse -> Vitamin C Serum -> 90s pH Wait -> SPF 50').replace(/^•\\s*/, ''), 'Barrier Safe', true) + row('09:30 PM Evening', (lines[2] || 'Alternating Night 1 Exfoliant / Night 2 Retinoid & Peptide Split').replace(/^•\\s*/, ''), 'Zero Clash', true) + row('Complete 3-File Kit', '9:16 Lockscreen Phone Card (PDF) · 4-Night Calendar (.ICS) · 65-Ester Audit (.CSV)', '$1.99 Kit', false) + '</div>';
  };
  window.__ebRefreshDermCurtain = function(tabIdx) {
    var ctx = window.__ebGetDermCtx(tabIdx), pre = document.getElementById('eb-prism-proof-preview'), bdg = document.getElementById('eb-curtain-roi-badge'), hk = document.getElementById('eb-curtain-loss-hook');
    if (pre && pre.getAttribute('data-demo-open') !== '1') { pre.innerHTML = window.__ebBuildProofHtml('summary', tabIdx); window.__ebLastCurtainPreview = pre.innerHTML; }
    if (bdg) bdg.textContent = ctx.badge; if (hk) hk.textContent = ctx.hook;
  };
  document.addEventListener('change', function(e) { if (e.target && (e.target.name === 'routineProduct' || e.target.id === 'skinTypeSelect')) setTimeout(function() { window.__ebRefreshDermCurtain(); }, 50); });
  document.addEventListener('click', function(e) { if (e.target && e.target.closest && e.target.closest('.preset-btn, #analyzeBtn, [onclick*="clearRoutineSelection"]')) setTimeout(function() { window.__ebRefreshDermCurtain(); }, 80); });
  window.__ebToggleSampleDemo = function(btn) {
    var pre = document.getElementById('eb-prism-proof-preview'); if (!pre) return;
    if (pre.getAttribute('data-demo-open') === '1') { pre.setAttribute('data-demo-open', '0'); pre.innerHTML = window.__ebLastCurtainPreview || window.__ebBuildProofHtml('summary'); if (btn) btn.textContent = 'Preview a sample file'; return; }
    window.__ebLastCurtainPreview = pre.innerHTML; pre.setAttribute('data-demo-open', '1');
    pre.innerHTML = window.__ebBuildProofHtml('sample', window.__ebActiveTabIdx || 0); if (btn) btn.textContent = 'Back to your summary'; window.__ebLogEvent('tab_switch', { store_pill: 'peek_sample_demo' });
  };
  window.__ebCompileCustomCurtain = function(presetKey, customBadge, customDiagLine) {
    window.__ebUserInteracted = true;
    var inp = document.getElementById('eb-curtain-entity-input'), qIn = document.getElementById('eb-pseo-quick-input');
    if (presetKey && inp) inp.value = presetKey; if (presetKey && qIn) qIn.value = presetKey;
    var q = inp && inp.value.trim() ? inp.value.trim() : (presetKey || window.__ebActiveEntity || 'custom-audit'), cEnt = cleanEnt(q, 34);
    window.__ebActiveEntity = q;
    if (window.history && window.history.replaceState && window.location.search.indexOf('pub=') === -1) { try { window.history.replaceState(null, '', window.location.pathname + '?q=' + encodeURIComponent(q)); } catch (_) {} }
    window.__ebLogEvent('calculate', { source: 'curtain_custom_compile', query: q });
    var dPill = document.getElementById('eb-dossier-format-pill'), f0 = (CFG.deliverableFiles && CFG.deliverableFiles[0]) || { file: 'bundle.txt', label: 'Primary File', size: '4.2 KB' };
    if (dPill) dPill.textContent = f0.label || f0.file;
    var spLbl = document.getElementById('eb-hero-sparkline-label'); if (spLbl) spLbl.textContent = cEnt + ' Active';
    var badgeEl = document.getElementById('eb-curtain-roi-badge'); if (badgeEl && customBadge) badgeEl.textContent = customBadge;
    fetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(q)).then(function(r) { return r.json(); }).then(function(data) {
      var hdr = document.getElementById('eb-curtain-title-span'), qRd = document.getElementById('eb-quick-live-readout') || document.getElementById('eb-mobile-live-readout');
      if (hdr) hdr.textContent = 'Routine Kit (' + cEnt + ')';
      if (badgeEl && !customBadge && data && data.kpis && data.kpis[0]) badgeEl.textContent = 'Routine Check: ' + data.kpis[0] + ' · Protects $165 Serums';
      if (qRd && data && data.kpis) { qRd.style.display = 'inline-flex'; qRd.style.alignItems = 'center'; qRd.style.justifyContent = 'space-between'; qRd.style.gap = '8px'; qRd.innerHTML = '<span>' + escHtml(cEnt) + ': ' + escHtml(data.kpis.slice(0, 2).join(' · ')) + '</span><button type="button" onclick="var c=document.getElementById(\\\'eb-deliverable-curtain\\\');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'start\\\'});" style="padding:4px 10px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:13px;font-weight:700;cursor:pointer;">View Live Table ↓</button>'; }
      var pills = document.getElementById('eb-manifest-pills-left') || document.getElementById('eb-zod-manifest-pills'), actTab = window.__ebActiveTabIdx || 0;
      if (pills && CFG.deliverableFiles) pills.innerHTML = CFG.deliverableFiles.map(function(f, idx) { var lbl = f.label || f.file, act = idx === actTab; return '<span class="eb-manifest-pill' + (act ? ' active' : '') + '" data-file="' + escHtml(f.file) + '" aria-selected="' + (act ? 'true' : 'false') + '" onclick="window.__ebSelectManifestFile(' + idx + ', this)" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:' + (act ? '700' : '600') + ';padding:7px 14px;border-radius:' + CFG.theme.radiusPill + ';background:' + (act ? CFG.theme.brandPrimary : CFG.theme.subtleBg) + ';color:' + (act ? '#FFFFFF' : CFG.theme.textPrimary) + ';"><span>' + escHtml(lbl) + '</span></span>'; }).join('');
      var pre = document.getElementById('eb-prism-proof-preview');
      if (pre && data) { pre.setAttribute('data-demo-open', '0'); pre.innerHTML = window.__ebBuildProofHtml('summary', actTab, customDiagLine); window.__ebLastCurtainPreview = pre.innerHTML; }
      var btn = document.getElementById('btn-curtain-flash-pass'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
      if (btn) btn.textContent = 'Save Complete Routine Kit ($1.99) →';
      if (pcBtn) pcBtn.textContent = 'Save Complete Routine Kit ($1.99) →';
      window.__ebTriggerPostCalcSpotlight(cEnt);
    }).catch(function(){});
  };
  window.__ebMountDeliverableCurtain = function(entityOverride, customBadge, customDiagLine) {
    if (CFG.moduleId === 'derm_logic') return;
    if (entityOverride) window.__ebActiveEntity = String(entityOverride);
    var pName = window.location.pathname || '/';
    var isHubOrDir = pName === '/directory' || pName === '/leaderboard' || new RegExp('^/(celebrity|bottle|ingredient|brand|concern)(/|$)').test(pName);
    if (isHubOrDir) return;
    var targetEl = document.getElementById('walletConflicts') || document.getElementById('appleWalletCardPreview');
    var isPseoOrDir = pName.indexOf('/seo/') === 0 || pName.indexOf('/tools/') === 0 || pName.indexOf('/compare/') === 0 || pName === '/directory' || pName === '/leaderboard' || pName.indexOf('/scan/') === 0;
    var tbody = document.querySelector('main table tbody, article table tbody');
    if (tbody && !tbody.closest('#actives-matrix') && !window.__ebIsUnlocked && !document.getElementById('eb-inline-row4-unlock')) {
      var trs = tbody.querySelectorAll('tr');
      for (var r0 = 0; r0 < trs.length; r0++) {
        if (!trs[r0].hasAttribute('data-eb-live-row') && trs[r0].id !== 'eb-table-row4-gate-tr') {
          trs[r0].setAttribute('data-eb-live-row', String(r0 + 1)); trs[r0].title = 'Click to inspect & load into workbench';
          var tdFirst = trs[r0].querySelector('td, th');
          if (tdFirst && !tdFirst.querySelector('.eb-row-sim-pill')) tdFirst.insertAdjacentHTML('beforeend', '<div><button type="button" class="eb-row-sim-pill">Inspect ↗</button></div>');
          trs[r0].addEventListener('click', function(ev) { var isPill = ev.target && ev.target.closest && ev.target.closest('.eb-row-sim-pill'); if (!isPill && ev.target && ev.target.closest && ev.target.closest('a, button, input')) return; this.style.background = CFG.theme.brandSoftBg; var td0 = this.querySelector('td, th'), hEl = td0 ? td0.querySelector('a, strong, div[style*="font-weight:700"]') : null, raw = hEl ? hEl.textContent : (td0 ? td0.textContent : ''), ent = raw.replace(/Category Peer|Inspect\\s*↗|✓\\s*Inspecting.*|Sim/gi, '').replace(/^P\\d+\\s*|^#\\d+\\s*/i, '').split('→').pop().trim().slice(0, 42); var pEl = this.querySelector('.eb-row-sim-pill'); if (pEl && ent) pEl.textContent = '✓ Inspecting ' + ent.slice(0, 16) + ' ↓'; if (ent) { window.__ebCompileCustomCurtain(ent); var c = document.getElementById('eb-deliverable-curtain'); if (c && c.scrollIntoView) c.scrollIntoView({ behavior: 'smooth', block: 'center' }); } });
        }
      }
      for (var r = 3; r < trs.length; r++) trs[r].classList.add('eb-blurred-deliverable');
      if ((trs.length > 3 || (isPseoOrDir && trs.length >= 2)) && !document.getElementById('eb-table-row4-gate-tr')) {
        var gateTr = document.createElement('tr'); gateTr.id = 'eb-table-row4-gate-tr'; gateTr.style.cssText = 'cursor:pointer;background:' + CFG.theme.subtleBg + ';';
        gateTr.onclick = function() { window.__ebCheckout('flash_pass'); };
        gateTr.innerHTML = '<td colspan="' + (trs[0] ? trs[0].children.length : 8) + '" style="padding:10px 14px;font-family:' + CFG.theme.fontSans + ';font-size:13.5px;color:' + CFG.theme.textPrimary + ';"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span style="color:' + CFG.theme.textSecondary + ';"><strong style="color:' + CFG.theme.textPrimary + ';">Export Full Routine &amp; Dupe Swaps:</strong> Instant 3-file download</span><span style="display:inline-flex;gap:6px;align-items:center;"><span style="padding:5px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;font-size:13px;font-weight:700;white-space:nowrap;">Get Complete Kit ($1.99 →)</span></span></div></td>';
        tbody.appendChild(gateTr);
      }
      var tblEl = tbody.closest('table'), tblWrap = tblEl ? (tblEl.closest('.table-wrap, .posterior-table-wrap') || tblEl) : null;
      if (tblWrap && tblWrap.parentNode && !document.getElementById('eb-tanstack-table-bar')) {
        var tBar = document.createElement('div'); tBar.id = 'eb-tanstack-table-bar';
        tBar.style.cssText = 'display:' + (isPseoOrDir ? 'flex' : 'none') + ';justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding:9px 12px;margin-bottom:10px;border-radius:' + CFG.theme.radiusCard + ';background:' + CFG.theme.subtleBg + ';font-family:' + CFG.theme.fontSans + ';';
        tBar.innerHTML = '<div style="display:flex;align-items:center;gap:8px;flex:1;min-width:200px;"><span style="font-size:13px;font-weight:700;color:' + CFG.theme.brandPrimary + ';white-space:nowrap;">Filter Table:</span><input type="search" id="eb-tanstack-filter-input" placeholder="Search rows or test your own..." oninput="window.__ebFilterAndCalcTable(this.value)" style="flex:1;padding:6px 10px;border-radius:' + CFG.theme.radiusCard + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:13.5px;border:none;" /></div>'
          + '<div style="display:inline-flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" id="btn-tanstack-sort" onclick="window.__ebSortTableRows()" style="padding:6px 11px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';border:none;font-size:13px;font-weight:600;cursor:pointer;">Sort by Impact</button><button type="button" id="btn-tanstack-unlock-rows" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="display:inline-block;padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:none;font-size:13px;font-weight:700;cursor:pointer;">Unlock Full Table ($1.99)</button></div>';
        tblWrap.parentNode.insertBefore(tBar, tblWrap);
      }
    }
    var h1Node = document.getElementById('eb-scan-h1') || document.querySelector('main h1, article h1, h1');
    if (h1Node && !window.__ebActiveEntity && (isPseoOrDir || (pName !== '/' && !isHubOrDir))) {
      var explicitEnt = h1Node.getAttribute('data-entity-name') || '';
      var rawH1 = explicitEnt || (h1Node.textContent || '').replace(/\\s+/g, ' ').trim().split(/\\s*[–|:?]\\s*/)[0].replace(/^Can You (?:Mix|Layer|Use)\\s+/i, '');
      if (rawH1.length > 48) rawH1 = rawH1.slice(0, 48).replace(/\\s+\\S*$/, '');
      var cleanedH1 = rawH1.replace(/[,;:\\s]+$/, '');
      window.__ebActiveEntity = (pName === '/directory' || /Directory|Playbooks/i.test(cleanedH1)) ? ((CFG.presets && CFG.presets[0] && CFG.presets[0].label) || CFG.brandName) : cleanedH1;
    }
    var sparkPillHtml = '<div id="eb-hero-sparkline-pill" style="display:none;" onclick="window.__ebCycleHeroScenario(event)"></div>';
    var pHash = 0; for (var hi = 0; hi < pName.length; hi++) pHash = (pHash * 31 + pName.charCodeAt(hi)) & 0x7fffffff;
    var heroPool = ['/public/editorial-hero.jpg', '/public/editorial-segment-1.jpg', '/public/editorial-segment-2.jpg', '/public/editorial-segment-3.jpg'];
    var curtPool = ['/public/editorial-segment-2.jpg', '/public/editorial-segment-3.jpg', '/public/editorial-segment-1.jpg', '/public/editorial-segment-2.jpg'];
    var routeHeroImg = pName === '/' ? heroPool[0] : heroPool[(pHash % 3) + 1], routeCurtImg = pName === '/' ? curtPool[0] : curtPool[(pHash + 1) % curtPool.length];
    var buildHeroCardEl = function(imgH, marginCss) {
      var hc = document.createElement('div'); hc.id = 'eb-doppelrand-hero-card'; hc.className = 'eb-doppelrand-shell'; hc.style.cssText = (marginCss || 'margin:0;') + 'cursor:pointer;';
      hc.onclick = function(ev) { window.__ebCycleHeroScenario(ev); };
      hc.innerHTML = '<div class="eb-doppelrand-inner"><img src="' + routeHeroImg + '" alt="' + CFG.brandName + ' : ' + PERSONA.heroTitle + '" class="eb-doppelrand-img" style="height:' + (imgH || 152) + 'px;" loading="eager" fetchpriority="high" decoding="async" /><div class="eb-doppelrand-caption"><div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><strong style="font-size:13px !important;color:#0F172A;font-weight:700 !important;">' + PERSONA.heroTitle + '</strong></div><div style="display:inline-flex;align-items:center;gap:6px;flex-shrink:0;">' + sparkPillHtml + '<span style="padding:2px 8px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-weight:700 !important;font-size:13px !important;white-space:nowrap;flex-shrink:0;">' + PERSONA.heroBadge + '</span></div></div></div>';
      return hc;
    };
    var existingHeroSplit = h1Node && h1Node.closest ? h1Node.closest('.hero-split, .hero-grid, .hero-editorial-grid') : null;
    var buildQBar = function(barId) {
      var qChips = (CFG.presets || []).slice(0, 3).map(function(p) { return '<button type="button" onclick="window.__ebCompileCustomCurtain(\\\'' + String(p.key || '').replace(/'/g, "\\\\'") + '\\\')" style="padding:5px 9px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;border:none;">' + p.label + '</button>'; }).join('');
      var qBar = document.createElement('div'); qBar.id = barId || 'eb-pseo-quick-bar';
      var inId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-input' : 'eb-pseo-quick-input', emId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-email' : 'eb-quick-inline-email', fmId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-form' : 'eb-quick-inline-form', rdId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-live-readout' : 'eb-quick-live-readout', initScore = (CFG.kpis && CFG.kpis[0] && CFG.kpis[0].val) ? CFG.kpis[0].val : 'Ready';
      var initQVal = (isPseoOrDir && pName !== '/directory' && window.__ebActiveEntity) ? escHtml(window.__ebActiveEntity) : '';
      qBar.style.cssText = 'display:flex;flex-direction:column;gap:8px;padding:12px 14px;margin:0;border-radius:' + CFG.theme.radiusCard + ';background:' + CFG.theme.brandSoftBg + ';font-family:' + CFG.theme.fontSans + ';';
      qBar.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;width:100%;flex-wrap:wrap;"><div style="display:inline-flex;align-items:center;gap:5px;flex-wrap:wrap;"><span style="font-size:13px;font-weight:700;color:' + CFG.theme.brandPrimary + ';white-space:nowrap;">Try Sample:</span>' + qChips + '</div><div style="display:inline-flex;align-items:center;gap:6px;flex:1 1 165px;"><input type="text" id="' + inId + '" value="' + initQVal + '" onchange="if(this.value)window.__ebCompileCustomCurtain(this.value)" placeholder="' + CFG.searchPlaceholder + '" onkeydown="if(event.keyCode===13){event.preventDefault();window.__ebCompileCustomCurtain(this.value);}" style="flex:1;min-width:105px;padding:7px 10px;border-radius:' + CFG.theme.radiusCard + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:13.5px;border:none;text-overflow:ellipsis;" /><button type="button" onclick="var v=document.getElementById(\\\'' + inId + '\\\').value;window.__ebCompileCustomCurtain(v||window.__ebActiveEntity);var c=document.getElementById(\\\'eb-deliverable-curtain\\\');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'start\\\'});" style="padding:7px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:13.5px;font-weight:600;cursor:pointer;white-space:nowrap;">Check ↵</button></div><span id="' + rdId + '" style="display:none;width:100%;padding-top:4px;font-size:13.5px;color:' + CFG.theme.textPrimary + ';">' + initScore + '</span></div>'
        + '<form id="' + fmId + '" onsubmit="return window.__ebSaveInlineScorecard(event, \\\'' + emId + '\\\', \\\'' + fmId + '\\\')" style="display:none;"><input type="email" id="' + emId + '" placeholder="' + PERSONA.leadPh + '" /><button type="submit">' + PERSONA.leadBtn + '</button></form>';
      return qBar;
    };
    if (isPseoOrDir) {
      var hasNativePseoBar = Boolean(document.getElementById('dl-pseo-top-conversion-bar') || document.getElementById('dl-subpage-top-email-bar'));
      if (existingHeroSplit && !hasNativePseoBar) {
        existingHeroSplit.style.alignItems = 'stretch';
        if (h1Node && h1Node.parentNode) { h1Node.parentNode.style.cssText += ';display:flex;flex-direction:column;justify-content:flex-start;gap:12px;height:100%;'; if (!window.__ebIsUnlocked && !document.getElementById('eb-pseo-quick-bar')) h1Node.parentNode.appendChild(buildQBar('eb-pseo-quick-bar')); }
      } else if (!hasNativePseoBar && h1Node && h1Node.parentNode && !document.getElementById('eb-pseo-hero-split')) {
        var splitWrap = document.createElement('div'); splitWrap.id = 'eb-pseo-hero-split';
        var leftCol = document.createElement('div'); leftCol.id = 'eb-pseo-hero-left'; leftCol.style.cssText = 'display:flex;flex-direction:column;justify-content:space-between;gap:12px;min-width:0;height:100%;';
        var leadP = document.querySelector('.pseo-lead, .subhead') || (h1Node.parentNode && h1Node.parentNode.querySelector('p')) || (h1Node.nextElementSibling && h1Node.nextElementSibling.tagName === 'P' ? h1Node.nextElementSibling : null);
        h1Node.parentNode.insertBefore(splitWrap, h1Node.nextSibling);
        if (leadP) { leadP.classList.add('eb-pseo-lead-card'); leftCol.appendChild(leadP); }
        if (!window.__ebIsUnlocked && !document.getElementById('eb-pseo-quick-bar')) leftCol.appendChild(buildQBar('eb-pseo-quick-bar'));
        splitWrap.appendChild(leftCol); splitWrap.appendChild(buildHeroCardEl(168, 'margin:0;'));
      }
    } else {
      var homeSubLead = document.querySelector('.hero-sub, .subhead, .editorial-subhead, .hero-lead, main h1 ~ p');
      if (homeSubLead && homeSubLead.parentNode && !window.__ebIsUnlocked && !document.getElementById('dl-inline-sample-unlock-form') && !document.getElementById('eb-mobile-firstfold-bar')) homeSubLead.parentNode.insertBefore(buildQBar('eb-mobile-firstfold-bar'), homeSubLead.nextSibling);
    }
    var scoreAnchor = document.querySelector('#liveResultsContainer .score-strip, .telemetry-card .metric-duo, #results-panel .kpi-grid');
    if ((scoreAnchor || targetEl) && !window.__ebIsUnlocked && !isPseoOrDir) {
      if (targetEl) targetEl.classList.add('eb-blurred-deliverable');
      if (!document.getElementById('eb-postcalc-inline-cta')) {
        var pcCta = document.createElement('div'); pcCta.id = 'eb-postcalc-inline-cta';
        pcCta.style.cssText = 'display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding:10px 16px;margin:6px 0;border-radius:12px;background:' + CFG.theme.subtleBg + ';border:none;font-family:' + CFG.theme.fontSans + ';';
        pcCta.innerHTML = '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;"><span id="eb-postcalc-cta-title" style="font-size:13.5px;font-weight:700;color:' + CFG.theme.textPrimary + ';">' + PERSONA.ctaTitle + '</span><span style="font-size:13px;color:' + CFG.theme.textSecondary + ';">' + PERSONA.heroSub + '</span></div><div style="display:inline-flex;gap:10px;align-items:center;flex-wrap:wrap;"><a id="btn-postcalc-permalink" href="/scan/' + encodeURIComponent(window.__ebActiveEntity || (CFG.presets[0] && CFG.presets[0].key) || 'verified') + '" style="font-size:13px;font-weight:600;color:' + CFG.theme.textSecondary + ';text-decoration:underline;white-space:nowrap;">Share Report ↗</a><button type="button" id="btn-postcalc-micro-pass" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="display:none;">' + PERSONA.microBtn + '</button><button type="button" id="btn-postcalc-flash-pass" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:7px 14px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:13px;font-weight:700;cursor:pointer;white-space:nowrap;">' + PERSONA.pureCta + '</button></div>'
          + '<form id="eb-postcalc-email-form" onsubmit="return window.__ebSaveInlineScorecard(event, \\\'eb-postcalc-email-input\\\', \\\'eb-postcalc-email-form\\\')" style="display:none;"><input type="email" id="eb-postcalc-email-input" placeholder="' + PERSONA.leadPh + '" /><button type="submit" id="btn-postcalc-email-submit">' + PERSONA.leadBtn + '</button></form>';
        if (scoreAnchor && scoreAnchor.parentNode) scoreAnchor.parentNode.insertBefore(pcCta, scoreAnchor.nextSibling);
        else if (targetEl && targetEl.parentNode) targetEl.parentNode.insertBefore(pcCta, targetEl);
        if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(pcCta);
      }
    }
    if (CFG.moduleId === 'derm_logic') return;
    var wbAnchor = document.getElementById('eb-onnx-cnn-workbench'), tBarAnchor = document.getElementById('eb-tanstack-table-bar'), homeFullGrid = document.querySelector('main .bento-grid, main .checker-split, main .hero-split, main .hero-grid');
    var seoTargetEl = isPseoOrDir ? (document.getElementById('eb-inline-row4-unlock') || document.getElementById('leaderboard-filter-bar') || existingHeroSplit || document.getElementById('eb-pseo-hero-split') || homeFullGrid || document.querySelector('main .table-wrap, article .table-wrap, main .posterior-table-wrap') || tBarAnchor || targetEl || document.getElementById('in-card-unlock-bar') || h1Node) : null;
    var mountAnchor = isPseoOrDir ? seoTargetEl : (wbAnchor || homeFullGrid || tBarAnchor || targetEl || document.getElementById('eb-doppelrand-hero-card') || document.getElementById('in-card-unlock-bar'));
    if (!mountAnchor) return;
    var fInit = (CFG.deliverableFiles && CFG.deliverableFiles[0]) || { file: 'bundle.txt', label: 'Primary File', size: '4.2 KB' };
    var scanGrade = document.getElementById('eb-scan-lead-grade'), dermCtx = window.__ebGetDermCtx(0);
    var fullInitPreview = window.__ebBuildProofHtml('summary', window.__ebActiveTabIdx || 0, customDiagLine);
    var existingCurtain = document.getElementById('eb-deliverable-curtain');
    var curtainHdrText = 'Morning & Night Routine Kit';
    var curtainBadgeText = customBadge || (scanGrade ? (scanGrade.textContent + ' · ' + dermCtx.badge) : dermCtx.badge);
    var curtainLossHook = dermCtx ? dermCtx.hook : PERSONA.lossHook;
    if (existingCurtain) {
      var prevBox = document.getElementById('eb-prism-proof-preview');
      if (prevBox && !(window.__ebActiveTabIdx > 0)) { prevBox.setAttribute('data-demo-open', '0'); prevBox.innerHTML = fullInitPreview; window.__ebLastCurtainPreview = prevBox.innerHTML; }
      var hdrSpan = document.getElementById('eb-curtain-title-span'), rBadge = document.getElementById('eb-curtain-roi-badge'), lHook = document.getElementById('eb-curtain-loss-hook'), cBtn = document.getElementById('btn-curtain-flash-pass'), vBtn = document.getElementById('btn-curtain-vault-pass'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
      if (hdrSpan) hdrSpan.textContent = curtainHdrText; if (rBadge) rBadge.textContent = curtainBadgeText; if (lHook) lHook.textContent = curtainLossHook;
      if (cBtn) cBtn.textContent = 'Save Complete Routine Kit ($1.99) →';
      if (vBtn) vBtn.textContent = 'Complete Multi-Routine Shelf Pass ($' + (CFG.corePriceUsd || 1.99) + ') →';
      if (pcBtn && window.__ebUserInteracted && window.__ebActiveEntity) pcBtn.textContent = 'Save Complete Routine Kit ($1.99) →';
      if (window.__ebActiveTabIdx > 0) window.__ebSelectManifestFile(window.__ebActiveTabIdx);
      return;
    }
    var filesHtml = (CFG.deliverableFiles || []).map(function(f, idx) { var rawLbl = f.label || f.file, tabTitle = /^\d+\./.test(rawLbl) ? rawLbl : ((idx + 1) + '. ' + rawLbl), act = idx === (window.__ebActiveTabIdx || 0); return '<span class="eb-manifest-pill' + (act ? ' active' : '') + '" data-file="' + escHtml(f.file) + '" aria-selected="' + (act ? 'true' : 'false') + '" onclick="window.__ebSelectManifestFile(' + idx + ', this)" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;font-size:13.5px;font-weight:' + (act ? '700' : '600') + ';padding:7px 14px;border-radius:' + CFG.theme.radiusPill + ';background:' + (act ? CFG.theme.brandPrimary : CFG.theme.subtleBg) + ';color:' + (act ? '#FFFFFF' : CFG.theme.textPrimary) + ';"><span>' + escHtml(tabTitle) + '</span></span>'; }).join('');
    var chipsHtml = (CFG.presets || []).map(function(p) { return '<span role="button" tabindex="0" class="eb-curtain-preset-chip" onclick="window.__ebCompileCustomCurtain(\\\'' + String(p.key || '').replace(/'/g, "\\\\'") + '\\\')" style="padding:4px 9px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textSecondary + ';font-size:13px;font-weight:600;cursor:pointer;">' + escHtml(p.label) + '</span>'; }).join('');
    var footerNote = 'Tap any tab above to preview how your selected bottles are scheduled', demoBtnText = 'Preview a sample file';
    var dossierSplitHtml = '<div id="eb-curtain-visual-split"><div id="eb-curtain-dossier-card" class="eb-doppelrand-shell" onclick="window.__ebCheckout(\\\'flash_pass\\\', true)" style="cursor:pointer;margin:0 !important;" title="Click to get ' + escHtml(PERSONA.dossierTag) + ' ($1.99)"><div class="eb-doppelrand-inner" style="height:100%;flex:1;"><span id="eb-dossier-format-pill" style="display:none;">' + escHtml(fInit.label || fInit.file) + '</span><img src="' + routeCurtImg + '" alt="' + escHtml(CFG.brandName + ' ' + PERSONA.dossierTag) + '" class="eb-doppelrand-img" style="min-height:165px;height:100%;flex:1;object-fit:cover;" loading="lazy" decoding="async" /><div class="eb-doppelrand-caption" style="padding:8px 12px;"><span style="font-weight:600;font-size:13px;color:#0F172A;min-width:0;overflow:hidden;text-overflow:ellipsis;">' + escHtml(PERSONA.dossierTag) + '</span><span style="color:' + CFG.theme.brandPrimary + ';font-weight:700;font-size:13px;flex-shrink:0;">$1.99 Kit →</span></div></div></div><div id="eb-prism-proof-frame" style="display:flex;flex-direction:column;justify-content:space-between;border-radius:' + CFG.theme.radiusCard + ';background:' + CFG.theme.subtleBg + ';padding:6px;border:none;overflow:hidden;"><div id="eb-prism-proof-preview" style="margin:0;flex:1;">' + fullInitPreview + '</div><div id="eb-prism-proof-footer" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding:10px 16px 4px 16px;background:transparent;border:none;font-size:13.5px;"><span style="color:' + CFG.theme.textSecondary + ';font-weight:500;">' + footerNote + '</span><div style="display:inline-flex;align-items:center;gap:8px;"><span role="button" tabindex="0" id="btn-peek-sample-demo" onclick="window.__ebToggleSampleDemo(this)" style="padding:6px 14px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.brandPrimary + ';font-size:13px;font-weight:600;cursor:pointer;white-space:nowrap;">' + demoBtnText + '</span><span role="button" id="btn-copy-readme-badge" onclick="window.__ebCopyReadmeBadge(this)" style="display:none;">Copy Badge</span><span role="button" id="btn-nuqs-share-url" onclick="window.__ebCopyScenarioLink(this)" style="display:none;">Share Link</span></div></div></div></div>';
    var curtainEyebrowSub = 'Custom 9:16 Lockscreen Phone Card (PDF) + 4-Night Skin-Cycling Calendar (.ICS) + 65-Ester Pore-Safe &amp; Dupe Swaps (.CSV)';
    var curtainFooterSub = 'Ready-to-Use Vanity Kit · Custom 9:16 Lockscreen Phone Card (PDF) + 4-Night Skin-Cycling Calendar (.ICS) + 65-Ester Pore-Safe &amp; Chemist Dupe Swaps (.CSV)';
    var curtainButtonsHtml = '<button type="button" id="btn-curtain-flash-pass" onclick="window.__ebCheckout(\\\'flash_pass\\\', true)" style="padding:10px 16px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:13px;cursor:pointer;white-space:normal;max-width:100%;">Save Complete 3-File Routine Kit ($1.99) →</button>';
    var curtain = document.createElement('div'); curtain.id = 'eb-deliverable-curtain';
    curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:14px;"><div><div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:4px;"><span style="padding:2px 9px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">Step 3 of 3</span><span style="font-size:12.5px;font-weight:700;color:' + CFG.theme.safeColor + ';">' + curtainEyebrowSub + '</span></div><span id="eb-curtain-title-span" style="display:block;font-family:' + CFG.theme.fontDisplay + ';font-size:clamp(1.4rem,2.2vw,1.75rem);font-weight:400;letter-spacing:-0.02em;color:' + CFG.theme.textPrimary + ';line-height:1.2;">' + escHtml(curtainHdrText) + '</span></div><div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;"><span id="eb-curtain-roi-badge" style="font-size:13px;color:' + CFG.theme.safeColor + ';font-weight:600;background:' + CFG.theme.safeSoftBg + ';padding:6px 14px;border-radius:' + CFG.theme.radiusPill + ';">' + escHtml(curtainBadgeText) + '</span></div></div>'
      + '<div id="eb-curtain-customizer-bar" style="display:none;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px;"><input type="text" id="eb-curtain-entity-input" onchange="if(this.value)window.__ebCompileCustomCurtain(this.value)" placeholder="' + escHtml(CFG.searchPlaceholder) + '..." onkeydown="if(event.keyCode===13){event.preventDefault();window.__ebCompileCustomCurtain();}" style="flex:1;min-width:170px;padding:6px 10px;border-radius:8px;background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:13px;border:none;" /><span role="button" id="btn-curtain-run-custom" onclick="window.__ebCompileCustomCurtain()" style="padding:6px 12px;border-radius:8px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';font-weight:700;font-size:13px;cursor:pointer;">Preview Custom Output ↵</span>' + chipsHtml + '</div>'
      + (filesHtml ? '<div id="eb-zod-manifest-pills" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:6px;"><div id="eb-manifest-pills-left" style="display:inline-flex;flex-wrap:wrap;gap:8px;align-items:center;">' + filesHtml + '</div><div id="eb-observable-telemetry-pill" style="display:none;"><svg aria-hidden="true" width="1" height="1"></svg><span>Ready</span></div></div>' : '')
      + dossierSplitHtml
      + '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;padding-top:10px;width:100%;"><div style="flex:1 1 380px;min-width:280px;width:100%;"><div id="eb-curtain-loss-hook" style="width:100%;font-size:16px;font-weight:600;color:' + CFG.theme.textPrimary + ';line-height:1.35;">' + escHtml(curtainLossHook) + '</div><div style="font-size:13.5px;color:' + CFG.theme.textMuted + ';margin-top:4px;">' + curtainFooterSub + '</div></div><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;width:100%;">' + curtainButtonsHtml + '</div></div>'
      + '<div id="eb-click-trigger-bar" style="display:none;"><span>One-time $1.99 payment</span></div>'
      + '<div id="eb-buy-preview-confirm" style="display:none;margin-top:14px;padding:16px 20px;border-radius:' + CFG.theme.radiusCard + ';background:' + CFG.theme.subtleBg + ';align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px;"><div style="flex:1;min-width:0;"><div id="eb-buy-preview-title" style="font-size:15.5px;font-weight:700;color:' + CFG.theme.textPrimary + ';">Preview Ready · Review Your Included Files Above</div><div id="eb-buy-preview-sub" style="font-size:13.5px;color:' + CFG.theme.textSecondary + ';margin-top:3px;">Instant download after checkout · One-time payment · 30-day money-back guarantee</div></div><div style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;"><span role="button" id="btn-cancel-preview" onclick="document.getElementById(\\\'eb-buy-preview-confirm\\\').style.display=\\\'none\\\';" style="padding:10px 14px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.textSecondary + ';font-size:13.5px;font-weight:600;cursor:pointer;">Edit Selection</span><span role="button" id="btn-confirm-purchase-stripe" onclick="window.__ebCheckout(window.__ebPendingTier||\\\'flash_pass\\\', true)" style="padding:11px 22px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.safeColor + ';color:#FFFFFF;font-size:14px;font-weight:700;cursor:pointer;white-space:normal;">Confirm Purchase ($1.99) →</span></div></div>';
    var lbShowcase = !isPseoOrDir ? document.getElementById('eb-leaderboard-home-showcase') : null;
    if (mountAnchor.parentNode) {
      if (mountAnchor === tBarAnchor || mountAnchor === targetEl) mountAnchor.parentNode.insertBefore(curtain, mountAnchor);
      else if (lbShowcase && mountAnchor !== wbAnchor) { curtain.style.marginTop = '0'; curtain.style.marginBottom = '24px'; lbShowcase.insertBefore(curtain, lbShowcase.firstChild); }
      else mountAnchor.parentNode.insertBefore(curtain, mountAnchor.nextSibling);
    }
    if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(curtain);
    if (window.__ebIsUnlocked) window.__ebApplyUnblurState();
    var dermModal = document.getElementById('checkoutModal');
    if (dermModal && !document.getElementById('eb-modal-flash-pass-pill')) {
      var modalBox = dermModal.querySelector('.modal-card, div');
      if (modalBox) { var pill = document.createElement('div'); pill.id = 'eb-modal-flash-pass-pill'; pill.style.cssText = 'margin:10px 0;padding:10px 12px;border-radius:' + CFG.theme.radiusCard + ';background:' + CFG.theme.brandSoftBg + ';border:none;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;'; pill.innerHTML = '<span style="font-size:13px;font-weight:700;color:' + CFG.theme.textPrimary + ';">✦ Complete 3-File Routine Kit</span><button type="button" onclick="window.__ebCheckout(\\\'flash_pass\\\', true)" style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:13px;">Unlock Kit ($1.99) →</button>'; modalBox.insertBefore(pill, modalBox.firstChild); }
    }
  };
  window.__srFocusRowUnlock = function(rowNum, entityName) {
    var rNum = Number(rowNum) || 2, ent = cleanEnt(entityName || window.__ebActiveEntity || 'Routine', 32);
    window.__ebActiveEntity = ent; window.__ebUserInteracted = true;
    var hdrSpan = document.getElementById('eb-curtain-title-span'), lHook = document.getElementById('eb-curtain-loss-hook'), cBtn = document.getElementById('btn-curtain-flash-pass'), curt = document.getElementById('eb-deliverable-curtain');
    if (hdrSpan) hdrSpan.textContent = 'Morning & Night Routine Kit (' + ent + ')';
    if (lHook) lHook.textContent = 'Enter your email above ($0) to unlock 2 free chemist dupes, or save the Complete 3-File Routine Kit ($1.99).';
    if (cBtn) cBtn.textContent = 'Save Complete Routine Kit ($1.99) →';
    window.__ebLogEvent('row_micro_unlock_focus', { row_num: rNum, target: ent, buyer_wedge: window.__ebGetBuyerWedge() });
    if (curt && curt.scrollIntoView) { try { curt.scrollIntoView({ behavior: 'smooth', block: 'center' }); curt.style.boxShadow = '0 0 0 3px ' + CFG.theme.brandPrimary + ', 0 12px 28px rgba(15,23,42,0.14)'; } catch (_) {} }
  };
  window.__ebFilterAndCalcTable = function(q) {
    var tbody = document.querySelector('main table:not(.matrix-table) tbody, article table:not(.matrix-table) tbody');
    if (tbody) { var rows = tbody.querySelectorAll('tr'), low = String(q || '').toLowerCase(); for (var i = 0; i < Math.min(3, rows.length); i++) rows[i].style.display = (!low || rows[i].textContent.toLowerCase().indexOf(low) !== -1) ? '' : 'none'; }
    if (q && q.trim().length > 2) window.__ebCompileCustomCurtain(q.trim());
  };
  window.__ebSortTableRows = function() {
    var tbody = document.querySelector('main table:not(.matrix-table) tbody, article table:not(.matrix-table) tbody');
    if (tbody) { var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'), 0, 3); rows.reverse().forEach(function(r) { tbody.insertBefore(r, tbody.firstChild); }); }
    window.__ebLogEvent('calculate', { source: 'tanstack_list_sort' });
    var btn = document.getElementById('btn-tanstack-sort'); if (btn) btn.textContent = 'Sorted Top ROI';
  };
  window.__ebSelectManifestFile = function(idx) {
    window.__ebActiveTabIdx = idx;
    var f = (CFG.deliverableFiles && CFG.deliverableFiles[idx]) || { file: 'deliverable.txt', label: 'Deliverable File', size: '4.2 KB', schema: 'Ready-to-use file' };
    var allPills = document.querySelectorAll('#eb-zod-manifest-pills .eb-manifest-pill');
    for (var p = 0; p < allPills.length; p++) { var active = p === idx; allPills[p].classList.toggle('active', active); allPills[p].setAttribute('aria-selected', active ? 'true' : 'false'); allPills[p].style.background = active ? CFG.theme.brandPrimary : CFG.theme.subtleBg; allPills[p].style.color = active ? '#FFFFFF' : CFG.theme.textPrimary; allPills[p].style.fontWeight = active ? '700' : '600'; }
    var fTitle = f.label || f.file, dPill = document.getElementById('eb-dossier-format-pill'), prevBox = document.getElementById('eb-prism-proof-preview');
    if (dPill) dPill.textContent = fTitle;
    if (prevBox) { prevBox.setAttribute('data-demo-open', '0'); prevBox.innerHTML = window.__ebBuildProofHtml('summary', idx); window.__ebLastCurtainPreview = prevBox.innerHTML; }
    window.__ebLogEvent('tab_switch', { store_pill: 'file_' + f.file });
  };
  window.__ebSaveInlineScorecard = function(ev, inputId, formId) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var inp = document.getElementById(inputId || 'eb-inline-scorecard-email'), email = inp ? inp.value.trim() : '';
    if (!email || email.indexOf('@') <= 0) return false;
    var safeEmail = email.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    var r4 = document.querySelector('tr.eb-blurred-deliverable');
    if (r4) { r4.classList.remove('eb-blurred-deliverable'); r4.style.filter = 'none'; r4.style.background = CFG.theme.safeSoftBg; }
    window.__dlSampleEmailUnlocked = true;
    document.querySelectorAll('.dl-locked-badge-c2').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.dl-unlocked-c2-proof').forEach(function(el) { el.style.display = 'block'; });
    if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas();
    fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'zeigarnik_row4_reveal' }) })
      .then(function() {
        var bar = document.getElementById(formId || 'eb-save-scorecard-bar');
        if (bar) bar.innerHTML = '<span style="font-size:13px;font-weight:700;color:' + CFG.theme.safeColor + ';">Free Summary &amp; Dupes Emailed to ' + safeEmail + '!</span><a href="/buy/flash_pass" onclick="window.__ebCheckout(\\\'flash_pass\\\');return false;" style="padding:5px 12px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;cursor:pointer;">Save Complete 3-File Routine Kit ($1.99) →</a>';
      }).catch(function(){});
    return false;
  };
  window.__ebApplyUnblurState = function() {
    window.__ebIsUnlocked = true;
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
    var gTr = document.getElementById('eb-table-row4-gate-tr'); if (gTr && gTr.parentNode) gTr.parentNode.removeChild(gTr);
    var blurred = document.querySelectorAll('.eb-blurred-deliverable'); for (var i = 0; i < blurred.length; i++) blurred[i].classList.remove('eb-blurred-deliverable');
    var curtain = document.getElementById('eb-deliverable-curtain');
    if (curtain) {
      curtain.style.background = CFG.theme.safeSoftBg; curtain.style.borderColor = CFG.theme.safeBorder;
      curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span style="font-size:13.5px;font-weight:700;color:' + CFG.theme.safeColor + ';">Full Routine Kit Unlocked! Download your bundle below:</span><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" id="btn-filesaver-bundle" onclick="window.__ebSaveBundleFile()" style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.safeColor + ';border:1px solid ' + CFG.theme.safeBorder + ';font-weight:700;font-size:13px;">Download Routine Bundle (.TXT) ↓</button><a href="/api/github-upgrade/export.csv" download style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:13px;">Export .CSV ↓</a></div></div>';
    }
    var pop = document.getElementById('eb-floating-gate-popover'); if (pop) pop.style.display = 'none';
  };
  window.__ebOpenFloatingGate = function(anchorEl) {
    var pop = document.getElementById('eb-floating-gate-popover'); if (!pop) return;
    if (anchorEl) {
      var trEl = anchorEl.tagName === 'TR' ? anchorEl : (anchorEl.closest ? anchorEl.closest('tr') : null), pTitle = document.getElementById('eb-popover-title');
      if (trEl && pTitle) { var firstCell = trEl.querySelector('td, th'), cellTxt = firstCell ? (firstCell.textContent || '').trim().slice(0, 34) : ''; if (cellTxt) pTitle.textContent = 'Unlock "' + cellTxt + '" + Full Routine Kit'; }
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
    if (window.__ebIsUnlocked || (e.target && e.target.closest && e.target.closest('.eb-row-sim-pill'))) return;
    var btn = e.target && e.target.closest ? e.target.closest('.eb-blurred-deliverable, .pitch-box a[href*="#pricing"]') : null;
    if (!btn) return;
    e.preventDefault(); e.stopPropagation(); window.__ebOpenFloatingGate(btn);
  }, true);
  window.__ebSendExitSummary = function(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = document.getElementById('eb-ouibounce-email'), email = input ? input.value.trim() : ''; if (!email) return false;
    var r4 = document.querySelector('tr.eb-blurred-deliverable'); if (r4) { r4.classList.remove('eb-blurred-deliverable'); r4.style.background = CFG.theme.safeSoftBg; }
    window.__dlSampleEmailUnlocked = true;
    document.querySelectorAll('.dl-locked-badge-c2').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.dl-unlocked-c2-proof').forEach(function(el) { el.style.display = 'block'; });
    if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas();
    fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'exit_intent_downsell' }) }).then(function() { var btn = document.getElementById('btn-ouibounce-submit'), desc = document.getElementById('eb-ouibounce-desc'); if (btn) btn.textContent = 'Summary Sent!'; if (desc) desc.innerHTML = '<strong style="color:' + CFG.theme.safeColor + ';">AM/PM Summary &amp; Dupes Sent!</strong> <a href="/buy/flash_pass" style="color:' + CFG.theme.brandPrimary + ';font-weight:700;">Save Complete 3-File Routine Kit ($1.99) →</a>'; }).catch(function() {});
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
        if (url.indexOf('/api/analyze-routine') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val'), entityName = '', customBadge = '', customDiagLine = '';
              if (!isAutoInit) window.__ebUserInteracted = true;
              if (data) {
                customBadge = (data.compatibilityScore != null ? ('Harmony ' + data.compatibilityScore + '/100 · ') : '') + ((data.conflicts && data.conflicts.length) ? 'AM/PM Split Ready' : 'Barrier-Safe · Ready to Save');
                if (boxes.length >= 2 && data.compatibilityScore != null) boxes[0].textContent = data.compatibilityScore + '/100';
              }
              if (!isAutoInit) window.__ebLogEvent('calculate', { source: 'native_calc', entity: CFG.moduleId });
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
    if (boxes.length >= 2) { boxes[0].textContent = Math.max(20, 100 - num * 9) + '/100'; boxes[1].textContent = (0.4 + num * 0.35).toFixed(1) + ' pH'; }
    if (sliderTimer) clearTimeout(sliderTimer);
    sliderTimer = setTimeout(function() { window.__ebLogEvent('calculate', { source: 'nouislider_range', value: num }); window.__ebShowTripwire(); }, 450);
  };
  try {
    if ('IntersectionObserver' in window) {
      var obs = window.__ebPaywallObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !window.__ebPaywallLogged && (window.__ebUserInteracted || (window.scrollY || 0) > 120)) { window.__ebPaywallLogged = true; window.__ebLogEvent('view_paywall', { target: entry.target.id || 'eb-deliverable-curtain', scroll_y: Math.round(window.scrollY || 0) }); }
        });
      }, { threshold: 0.15 });
      ['in-card-unlock-bar', 'eb-deliverable-curtain', 'eb-postcalc-inline-cta', 'dl-pseo-top-conversion-bar', 'dl-subpage-top-email-bar', 'dl-inline-sample-unlock-form', 'dl-results-inline-email-form', 'appleWalletCardPreview', 'pseo-dermlogic-inline-calc'].forEach(function(id) { var el = document.getElementById(id); if (el) obs.observe(el); });
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
    if (/^(rawInciTextarea|skinTypeSelect)$/.test(t.id)) {
      window.__ebUserInteracted = true;
      if (nativeCalcTimer) clearTimeout(nativeCalcTimer);
      nativeCalcTimer = setTimeout(function() { window.__ebTriggerHostCalc(); }, 320);
    }
  }, { passive: true });
  window.addEventListener('scroll', function() {
    var y = window.scrollY || 0;
    var sb = document.getElementById('sticky-mobile-bar');
    if (sb) sb.classList.toggle('eb-dock-visible', y > 650 && !navigator.webdriver);
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
  window.__ebCopySummary = function() { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('✓ EU CosIng & Lab pH Verified · ' + CFG.brandName + ' Routine Summary (' + window.location.href + ')\n• 7:30 AM (Free Proof): Gentle Rinse -> Vitamin C Serum (60s wait) -> SPF 50\n• 9:30 PM Steps 02-03, 8-Allergen Screen & Dupe #2 [LOCKED]: Unlock Free ($0 Email) at https://' + CFG.domain + '/#dl-footer-email-unlock-bar or $1.99 3-File Kit (30-Day Guarantee) at https://' + CFG.domain + '/buy/flash_pass').catch(function(){}); var btn = document.getElementById('btn-copy-shopping-list'); if (btn) btn.textContent = 'Copied!'; window.__ebShowTripwire(); window.__ebLogEvent('copy_summary'); };
  window.__ebCopyReddit = function() { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('**' + CFG.brandName + ' (✓ EU CosIng & Lab pH Verified · 8-Allergen Screen)**: ' + window.location.href + ' — Free 9:30 PM Schedule & 2 Dupes ($0 Email) at https://' + CFG.domain + '/#dl-footer-email-unlock-bar').catch(function(){}); var btn = document.getElementById('btn-reddit-share'); if (btn) btn.textContent = 'Copied MD!'; window.__ebShowTripwire(); };
  window.__ebCopyScenarioLink = function(btn) { var shareUrl = window.location.origin + window.location.pathname + '?q=' + encodeURIComponent(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].key) || 'audit'); if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareUrl).catch(function(){}); if (btn) btn.textContent = 'URL Copied!'; };
  window.__ebCopyReadmeBadge = function(btn) { var t = encodeURIComponent(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].key) || 'verified'); var md = '[![Verified by ' + CFG.brandName + '](https://' + CFG.domain + '/badge/' + t + '.svg)](https://' + CFG.domain + '/?q=' + t + '&utm_source=readme_badge)'; if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(function(){}); if (btn) btn.textContent = 'Badge MD Copied!'; window.__ebLogEvent('copy_summary', { type: 'readme_svg_badge', target: t }); };
  window.__ebPrintSheet = function() { window.__ebLogEvent('print_sheet'); window.print(); };
  window.__ebToggleHud = function() { var d = document.getElementById('eb-field-hud-drawer'); if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none'; };
  window.__ebApplyPreset = function(presetKey, idx) {
    window.__ebLogEvent('calculate', { preset: presetKey }); var kpiVals = CFG.presetKpis && CFG.presetKpis[presetKey];
    if (kpiVals) { var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val'); for (var i = 0; i < boxes.length && i < kpiVals.length; i++) boxes[i].textContent = kpiVals[i]; }
    var drawer = document.getElementById('inline-aisle-peek-drawer'); if (drawer) drawer.style.display = 'block';
    var nativeBtns = document.querySelectorAll('[data-preset-id], .preset-btn, .chip'); if (nativeBtns && nativeBtns[idx]) { try { nativeBtns[idx].click(); } catch (_) {} }
  };
  window.__ebTriggerHostCalc = function() {
    var searchIn = document.getElementById('eb-fuse-search-input'); if (searchIn && searchIn.value.trim().length > 1) { window.__ebRunFuseSearch(searchIn.value); return; }
    window.__ebLogEvent('calculate', { trigger: 'btn_calc' }); window.__ebShowTripwire();
    var hostBtn = document.querySelector('form button[type="submit"], #analyzeBtn'); if (hostBtn) { try { hostBtn.click(); } catch (_) {} }
  };
  window.__ebCaptureEmailLead = function(rawEm, src) {
    var em = String(rawEm || '').trim(); if (!em || em.indexOf('@') < 1 || em.indexOf('.') < 3) return '';
    window.__ebSavedEmail = em; try { localStorage.setItem('eb_lead_email', em); } catch (_) {}
    Array.prototype.slice.call(document.querySelectorAll('tr.eb-blurred-deliverable')).slice(0, 3).forEach(function(tr) { tr.classList.remove('eb-blurred-deliverable'); tr.setAttribute('data-row4-unlocked', '1'); tr.style.filter = 'none'; tr.style.background = CFG.theme.safeSoftBg; });
    if (window.__ebLastCapturedEmail !== em) { window.__ebLastCapturedEmail = em; origFetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: em, customer_email: em, pageUrl: window.location.pathname, utmSource: src || 'free_summary_unlock', buyer_wedge: window.__ebGetBuyerWedge() }) }).catch(function(){}); }
    return em;
  };
  ['blur', 'change'].forEach(function(evName) { document.addEventListener(evName, function(e) { var t = e.target; if (t && t.type === 'email' && t.value) window.__ebCaptureEmailLead(t.value, t.id || 'email_input_' + evName); }, true); });
  window.__ebCheckout = function(tier) {
    var cleanTier = typeof tier === 'string' ? tier : 'flash_pass', actTarget = window.__ebActiveEntity || '';
    var emInputs = Array.prototype.slice.call(document.querySelectorAll('input[type="email"]')).filter(function(el) { return el && el.value && el.value.indexOf('@') > 0; });
    var rawEm = (emInputs[0] && emInputs[0].value.trim()) || window.__ebSavedEmail || ''; try { if (!rawEm) rawEm = localStorage.getItem('eb_lead_email') || ''; } catch (_) {}
    var emVal = rawEm ? window.__ebCaptureEmailLead(rawEm, 'checkout_prefill_' + cleanTier) : '', wedge = window.__ebGetBuyerWedge();
    var actBtn = (document.activeElement && (document.activeElement.tagName === 'BUTTON' || document.activeElement.tagName === 'A')) ? document.activeElement : document.getElementById(cleanTier === 'playbook_pass' || cleanTier === 'complete_dossier' ? 'btn-curtain-vault-pass' : 'btn-curtain-flash-pass');
    if (actBtn) { actBtn.textContent = 'Opening Secure Stripe Checkout...'; actBtn.style.opacity = '0.85'; actBtn.style.pointerEvents = 'none'; }
    var payload = { tier: cleanTier, plan: cleanTier, planTier: cleanTier, sku: CFG.moduleId + '_' + cleanTier, pageUrl: window.location.pathname, vid: window.__ebVid, sid: window.__ebSid, target: actTarget, email: emVal, customer_email: emVal, allow_promotion_codes: false, buyer_wedge: wedge };
    var fbUrl = '/buy/' + encodeURIComponent(cleanTier) + '?vid=' + encodeURIComponent(window.__ebVid || '') + '&target=' + encodeURIComponent(actTarget || '') + '&wedge=' + encodeURIComponent(wedge) + (emVal ? '&email=' + encodeURIComponent(emVal) : '');
    origFetch('/api/calculators/' + CFG.moduleId + '/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(function(r) { return r.json(); }).then(function(data) { var targetUrl = data && (data.checkout_url || data.url); window.location.href = targetUrl || fbUrl; }).catch(function(){ window.location.href = fbUrl; });
  };
  window.__ebQuickBuy = window.__ebCheckout;
  var __ebBootAll = function() {
    if (!window.__ebHydratedSent) { window.__ebHydratedSent = true; window.__ebLogEvent('visit_hydrated', { vw: window.innerWidth || 0, vh: window.innerHeight || 0, ref: document.referrer || '' }); }
    try { var curP = window.location.pathname || '/', dirRx = new RegExp('^/(seo|tools|compare|brand|routine|ingredient|compatibility|bottle)(/|$)'), actHref = (curP.indexOf('/leaderboard') === 0 || curP.indexOf('/scan/') === 0) ? '/leaderboard' : (curP.indexOf('/celebrity') === 0 ? '/celebrity' : (curP.indexOf('/concern') === 0 ? '/concern' : ((curP === '/directory' || dirRx.test(curP)) ? '/directory' : '/#'))); Array.prototype.slice.call(document.querySelectorAll('header nav a, .mobile-nav-strip a')).forEach(function(a) { if (a.classList.contains('btn') || a.classList.contains('btn-primary')) return; var h = a.getAttribute('href') || ''; a.classList.remove('active', 'eb-nav-active'); a.removeAttribute('aria-current'); if ((actHref === '/#' && h === '/#analyzer') || h === actHref) { a.classList.add('eb-nav-active'); a.setAttribute('aria-current', 'page'); } }); } catch (_) {}
    window.__ebMountDeliverableCurtain();
    try { if (!window.matchMedia || !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { var revEls = Array.prototype.slice.call(document.querySelectorAll('section h2, section h3, #eb-segment-portrait-strip > div, #eb-deliverable-curtain > div > div, .porcelain-vessel-core, .panel, .card')).slice(0, 22); if (window.IntersectionObserver) { var io = new IntersectionObserver(function(entries) { entries.forEach(function(en) { if (en.isIntersecting) { en.target.style.opacity = '1'; en.target.style.transform = 'translateY(0px)'; io.unobserve(en.target); } }); }, { threshold: 0.05 }); revEls.forEach(function(el) { if (el.getBoundingClientRect().top > 240) { el.style.opacity = '0.92'; el.style.transform = 'translateY(8px)'; el.style.transition = 'opacity 320ms cubic-bezier(0.22,1,0.36,1), transform 320ms cubic-bezier(0.22,1,0.36,1)'; io.observe(el); } }); } } } catch (_) {}
    if (window.location.search.indexOf('checkout=cancel') !== -1) {
      window.__ebLogEvent('view_paywall', { target: 'stripe_cancel_return_rescue' });
      var toast = document.getElementById('eb-ouibounce-toast'), tTitle = document.getElementById('eb-ouibounce-title'), tDesc = document.getElementById('eb-ouibounce-desc');
      if (tTitle) tTitle.textContent = '✦ Save Your AM/PM Summary Free ($0) or Unlock the Complete Kit ($1.99)';
      if (tDesc) tDesc.innerHTML = 'Enter your email below to receive your free AM/PM Layering Summary + 2 Chemist Dupes ($0), or unlock the <strong>Complete 3-File Routine Kit ($1.99)</strong>:';
      if (toast) toast.style.display = 'block';
    }
    try { var savedEm = localStorage.getItem('eb_lead_email') || ''; if (savedEm && savedEm.indexOf('@') > 0) { window.__ebSavedEmail = savedEm; Array.prototype.slice.call(document.querySelectorAll('input[type="email"]')).forEach(function(el) { if (el && !el.value) el.value = savedEm; }); } } catch (_) {}
    try { var sp = new URLSearchParams(window.location.search || ''), qp = sp.get('q') || sp.get('preset') || sp.get('brand') || sp.get('active'), refRx = new RegExp('/(?:seo|tools|compare|scan)/([a-z0-9._-]+)', 'i'), refM = (!qp && window.location.pathname === '/' && document.referrer) ? document.referrer.match(refRx) : null; if (refM && refM[1]) { qp = decodeURIComponent(refM[1]).replace(new RegExp('-(?:layering|conflict)$', 'i'), '').replace(/-/g, ' '); var hostIn = document.querySelector('#rawInciTextarea, #eb-fuse-search-input'); if (hostIn && !hostIn.value) hostIn.value = qp; window.__ebLogEvent('calculate', { trigger: 'seo_referrer_carryover', query: qp }); } if (qp) setTimeout(function() { var mIn = document.getElementById('eb-mobile-quick-input'); if (mIn) mIn.value = qp; window.__ebCompileCustomCurtain(qp); }, 110); } catch (_) {}
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', __ebBootAll); else __ebBootAll();
})();</script>
<script type="text/javascript">var vglnk = { key: '${SOVRN_KEY}' }; (function(d, t) { if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0') return; var s = d.createElement(t); s.type = 'text/javascript'; s.async = true; s.src = '//cdn.viglink.com/api/vglnk.js'; var r = d.getElementsByTagName(t)[0]; if (r && r.parentNode) r.parentNode.insertBefore(s, r); }(document, 'script'));</script>`;
}
function renderExactBaselineEnhancements(html, cfg, reqPath) {
  if (cfg.moduleId === 'derm_logic') return html;
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
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="robots" content="noindex, follow" /><link rel="canonical" href="https://${esc(cfg.domain)}/embed" /><title>${esc(cfg.brandName)}: Embeddable Benchmark Widget</title>${buildExactBaselineStyles(cfg)}</head><body style="margin:0;padding:12px;background:${t.canvasBg};color:${t.textPrimary};">${buildScenarioAndExportWorkbenchHtml(cfg)}<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:13px;margin-top:6px;"><span style="color:${t.safeColor};font-weight:600;">&#10003; EU CosIng &amp; Lab pH Verified · 65 Actives · <a href="https://${esc(cfg.domain)}/?skin=allergy&amp;allergies=fragrance,snail_mite,salicylates" target="_blank" rel="dofollow" style="color:${t.safeColor};font-weight:700;">Screen 8 Allergens ($0) &rarr;</a></span><span>Powered by <a href="https://${esc(cfg.domain)}" target="_blank" rel="dofollow" style="color:${t.brandPrimary};font-weight:700;">${esc(cfg.brandName)} (${esc(cfg.domain)})</a> · 30-Day Guarantee</span></div>${buildClientRuntimeScript(cfg)}</body></html>`;
}
function renderSampleDossierHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><link rel="canonical" href="https://${esc(cfg.domain)}/dossier/sample" /><title>${esc(cfg.brandName)}: Sample Routine Deliverable & Kit Options</title>${buildExactBaselineStyles(cfg)}</head><body style="margin:0;padding:20px;background:${t.canvasBg};color:${t.textPrimary};font-family:${t.fontSans};"><div style="max-width:960px;margin:0 auto;"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:16px;"><a href="/" style="color:${t.textSecondary};text-decoration:none;font-size:13px;">← Back to ${esc(cfg.brandName)}</a><div style="display:flex;gap:8px;flex-wrap:wrap;"><a href="/?skin=allergy&amp;allergies=fragrance,snail_mite,salicylates" class="eb-action-btn" style="text-decoration:none;background:${t.safeSoftBg};color:${t.safeColor};border:1px solid ${t.safeBorder};font-weight:700;">&#10003; Screen 8 Contact Allergens ($0) &rarr;</a><button type="button" class="eb-action-btn" style="background:#FFFFFF;color:${t.safeColor};border:1px solid ${t.safeBorder};font-weight:700;" onclick="var f=document.getElementById('eb-inline-scorecard-email');if(f){f.scrollIntoView({behavior:'smooth',block:'center'});f.focus();}">&#128274; Email Free 9:30 PM &amp; 2 Dupes ($0) &darr;</button><button id="btn-top-pass-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock Complete Routine Kit: $1.99</button></div></div><h1 class="dossier-hero-title" style="margin:0 0 8px 0;font-family:${t.fontDisplay};">${esc(cfg.brandName)}: Verified Sample Deliverable</h1><div class="hero-tier-diff" style="margin-bottom:14px;font-size:13px;color:${t.textSecondary};">&#10003; EU CosIng &amp; Lab pH Verified · 65 Actives · 8 Contact-Allergen Screens · Save your free AM/PM summary ($0) or unlock the <strong>$1.99 Complete 3-File Routine Kit</strong> (30-Day Refund Guarantee).</div></div>${buildBottomConversionSuiteHtml(cfg, '/dossier/sample')}${buildClientRuntimeScript(cfg)}</body></html>`;
}
module.exports = { renderExactBaselineEnhancements, renderEmbedWidgetHtml, renderSampleDossierHtml };
