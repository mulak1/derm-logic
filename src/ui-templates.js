const { CULT_PRODUCTS, VANITY_SLOT_OPTIONS } = require('./clinical-products');
const {
  getSovrnMerchantLink,
  getConflictSafeSwap,
  renderPersonalizedResultsHeaderHtml,
  renderAboveFoldSovrnDisclosureBar,
  renderSovrnVglnkScript,
  renderPersonalizationBarHtml,
  renderBeforeAfterAndCanvasFooterHtml,
  ENDOWMENT_CLIENT_SCRIPT
} = require('./endowment-sovrn');
const {
  renderHeaderVanityBagPill,
  renderAtelierVanityDrawerHtml,
  ATELIER_VANITY_CLIENT_SCRIPT
} = require('./atelier-vanity-bag');
const { renderPersonaInteractiveWorkbenchAddons } = require('./celebrity-routines');

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const BRAND_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34" role="img" aria-label="DermLogic Formulation Atelier Emblem" style="flex-shrink:0;display:block;"><circle cx="20" cy="20" r="19" fill="#F3E1E5" stroke="#8A3448" stroke-width="1.4"/><circle cx="20" cy="20" r="15" fill="none" stroke="#8E6B75" stroke-width="0.75" stroke-dasharray="2 1.5"/><path d="M20 9.5 C20 9.5 26.8 17.6 26.8 22.6 C26.8 26.4 23.8 29.5 20 29.5 C16.2 29.5 13.2 26.4 13.2 22.6 C13.2 17.6 20 9.5 20 9.5 Z" fill="#8A3448"/><path d="M16.5 21.2 C16.2 23.6 17.6 25.8 19.8 26.3" fill="none" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round"/><path d="M20 29.5 C22.8 29.5 25.5 31.2 26.5 33.2 C23.6 33.6 21.2 32.1 20 29.5 Z" fill="#285B44"/><path d="M20 29.5 C17.2 29.5 14.5 31.2 13.5 33.2 C16.4 33.6 18.8 32.1 20 29.5 Z" fill="#285B44" opacity="0.85"/><circle cx="20" cy="17.2" r="1.3" fill="#FFFFFF"/></svg>`;

const SHARED_CSS = `
  :root {
    --bg-canvas: #FDF8F6; --bg-oat: #F8EFE6; --bg-pouch: #F3E1E5; --bg-surface: #FFFFFF; --bg-porcelain: #FFFFFF;
    --bg-empty-slot: #EAE0D7; --bg-empty-slot-active: #E3D3C8; --text-empty-slot: #7D5660;
    --bg-pouch-card: #FFFFFF; --text-pouch-card: #3A1F27; --sub-pouch-card: #285B44;
    --bg-deep: #3A1F27; --ink-on-deep: #FDF8F6; --border-hairline: transparent; --border-strong: transparent;
    --text-primary: #3A1F27; --text-secondary: #6E4B55; --text-muted: #8E6B75;
    --rose-brand: #8A3448; --rose-brand-hover: #722739; --accent-ink: #FFFFFF; --rose-pill-bg: #EED6DC; --rose-pill-border: transparent;
    --sage-safe: #285B44; --sage-bg: #E9F4EE; --sage-border: transparent;
    --honey-warn: #945227; --honey-bg: #FBF0E4; --honey-border: transparent;
    --berry-clash: #8A3448; --berry-bg: #F6E3E7; --berry-border: transparent;
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --margin: 5vw; --step-small: clamp(0.875rem, 0.82rem + 0.15vw, 0.9375rem); --step-body: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
    --step-lead: clamp(1.25rem, 1.12rem + 0.55vw, 1.625rem); --step-head: clamp(2rem, 1.45rem + 2.4vw, 3.35rem); --step-hero: clamp(3.5rem, 7.4vw, 6.85rem);
    --radius-shell: 28px; --radius-card: 22px; --radius-input: 999px; --radius-pill: 999px; --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  }
  body.vanity-night, html[data-theme="night"] body {
    --bg-canvas: #221319; --bg-oat: #2C1921; --bg-pouch: #371F29; --bg-surface: #311C25; --bg-porcelain: #3B222D;
    --bg-empty-slot: #26151C; --bg-empty-slot-active: #3F2430; --text-empty-slot: #C9A3AC;
    --bg-pouch-card: #311C25; --text-pouch-card: #FDF6F7; --sub-pouch-card: #88C9A8;
    --bg-deep: #1C0F14; --ink-on-deep: #FDF6F7; --border-hairline: transparent; --border-strong: transparent;
    --text-primary: #FDF6F7; --text-secondary: #E0C6CD; --text-muted: #B8969F;
    --rose-brand: #E8A5B2; --rose-brand-hover: #F2B8C4; --accent-ink: #221319; --rose-pill-bg: #462834; --rose-pill-border: transparent;
    --sage-safe: #88C9A8; --sage-bg: #1B2D24; --sage-border: transparent;
    --honey-warn: #E8B98A; --honey-bg: #36251C; --honey-border: transparent;
    --berry-clash: #F09CA9; --berry-bg: #422028; --berry-border: transparent;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-color: transparent; }
  html, body { background-color: var(--bg-canvas); color: var(--text-primary); font-family: var(--font-sans); font-weight: 400; font-size: 16px; line-height: 1.58; overflow-x: clip; -webkit-font-smoothing: antialiased; transition: background-color 320ms var(--ease-spring), color 320ms var(--ease-spring); }
  .serif-display, h1, h2, h3 { font-family: 'Newsreader', Georgia, serif; font-weight: 400; letter-spacing: -0.025em; line-height: 1.08; }
  .serif-italic { font-family: 'Newsreader', Georgia, serif; font-style: italic; font-weight: 400; }
  .mono { font-family: var(--font-sans); font-variant-numeric: tabular-nums; letter-spacing: 0.01em; }
  img { display: block; max-width: 100%; object-fit: cover; }
  a { color: inherit; text-decoration: none; }
  button, select, textarea, input { font: inherit; color: inherit; }
  .container { max-width: 1360px; margin: 0 auto; padding: 0 var(--margin); }

  /* Header: Editorial Gallery & Nocturnal Vanity Switcher */
  .site-header { background: var(--bg-canvas); position: sticky; top: 0; z-index: 40; transition: background-color 320ms var(--ease-spring); }
  .nav-inner { min-height: 70px; padding-top: 12px; padding-bottom: 12px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: nowrap; }
  .brand-logo-link { display: inline-flex; align-items: center; gap: 8px; font-size: 1.24rem; font-weight: 400; letter-spacing: -0.02em; color: var(--text-primary); text-decoration: none; white-space: nowrap; transition: opacity 180ms ease-out; }
  .brand-logo-link:hover { opacity: 0.78; }
  .nav-links { display: flex; align-items: center; gap: 16px; font-size: 0.92rem; font-weight: 500; color: var(--text-secondary); flex-wrap: nowrap; }
  .nav-links a { white-space: nowrap; transition: color 180ms ease-out, opacity 180ms ease-out; }
  .nav-links a:hover { color: var(--rose-brand); }
  .vanity-light-pill { display: inline-flex; background: var(--bg-surface); border-radius: 999px; padding: 4px; gap: 4px; }
  .vanity-light-btn { border: none; border-radius: 999px; background: transparent; padding: 5px 12px; min-height: 32px; font-size: 0.84rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; white-space: nowrap; transition: background-color 200ms var(--ease-spring), color 200ms var(--ease-spring), transform 160ms ease-out; }
  .vanity-light-btn.active { background: var(--rose-brand); color: var(--accent-ink); }
  .vanity-light-btn:active { transform: scale(0.97); }

  /* Buttons: Soft Pillowy Capsules */
  .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--rose-brand); color: var(--accent-ink); font-weight: 600; font-size: var(--step-small); padding: 13px 26px; min-height: 44px; border: none; border-radius: 999px; cursor: pointer; white-space: nowrap; transition: transform 180ms ease-out, opacity 180ms ease-out, background-color 200ms ease-out; }
  .btn-primary:hover { opacity: 0.92; }
  .btn-primary:active { transform: scale(0.97); }
  .btn-icon-circle { display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; transition: transform 200ms var(--ease-spring); }
  .btn-primary:hover .btn-icon-circle { transform: translate(2px, -2px); }
  .btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: var(--bg-oat); color: var(--text-primary); font-weight: 600; font-size: var(--step-small); padding: 12px 22px; min-height: 42px; border: none; border-radius: 999px; cursor: pointer; white-space: nowrap; transition: transform 180ms ease-out, background-color 200ms ease-out, color 200ms ease-out; }
  .btn-secondary:hover { background: var(--rose-pill-bg); color: var(--rose-brand); }
  .btn-secondary:active { transform: scale(0.97); }

  .affiliate-link-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; background: var(--rose-pill-bg); color: var(--rose-brand); font-size: 0.84rem; font-weight: 600; text-decoration: none; transition: opacity 180ms ease-out; }
  .affiliate-link-pill:hover { opacity: 0.85; }
  .affiliate-micro-link { display: inline-block; margin-top: 4px; font-size: 0.82rem; font-weight: 500; color: var(--sage-safe); text-decoration: underline; text-underline-offset: 3px; }
  .affiliate-micro-link:hover { color: var(--rose-brand); }

  /* Hero: Uneven Editorial Gallery & Nocturnal Plinth */
  .hero-section { padding: 8px 0 14px; }
  .editorial-top-banner { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 20px; align-items: stretch; margin-bottom: 12px; }
  .hero-copy-col { min-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
  .hero-photo-col { min-width: 0; display: flex; flex-direction: column; }
  .hero-h1 { font-family: 'Newsreader', Georgia, serif; font-size: clamp(2.15rem, 3.6vw, 3.25rem); font-weight: 400; line-height: 0.98; letter-spacing: -0.035em; color: var(--text-primary); margin-bottom: 8px; }
  .hero-h1-line1 { display: block; }
  .hero-h1-line2 { display: block; padding-left: 0; }
  .hero-sub { color: var(--text-secondary); font-size: clamp(1rem, 0.96rem + 0.2vw, 1.12rem); line-height: 1.42; max-width: 58ch; margin-bottom: 10px; }
  .editorial-photo-shell { background: var(--bg-oat); border-radius: 26px; padding: 14px 16px; position: relative; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .editorial-photo-inner { overflow: hidden; border-radius: 18px; position: relative; min-height: 196px; max-height: 224px; height: 100%; flex: 1; background: var(--bg-porcelain); }
  .editorial-photo-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 180ms ease-out; }
  .editorial-photo-diptych { display: flex; flex-direction: column; min-height: 196px; max-height: 224px; height: 100%; flex: 1; }
  .editorial-photo-diptych .editorial-photo-inner { height: 100%; flex: 1; }
  #eb-hero-trust-strip { display: none !important; }
  .vessel-photo-frame { background: var(--bg-oat); border-radius: 18px; overflow: hidden; padding: 0; margin-bottom: 14px; }
  .vessel-photo-frame img { width: 100%; height: 172px; object-fit: cover; display: block; }
  .editorial-photo-caption { margin-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: var(--step-small); color: var(--text-secondary); }

  /* Interactive Shelf Audit Workbench ([data-ui]) */
  .hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: stretch; }
  .grader-card { background: var(--bg-surface); border-radius: 28px; padding: 24px; min-width: 0; max-width: 100%; overflow: hidden; }
  .results-panel { background: var(--bg-oat); border-radius: 28px; padding: 24px; min-width: 0; max-width: 100%; overflow: hidden; }
  .porcelain-vessel-core { background: var(--bg-surface); border-radius: 22px; padding: 24px 26px; width: 100%; display: flex; flex-direction: column; justify-content: flex-start; gap: 18px; min-width: 0; max-width: 100%; overflow: hidden; }
  #textureFilterTabs { display: grid !important; grid-template-columns: repeat(3, minmax(0, 1fr)) !important; gap: 6px !important; width: 100%; background: var(--bg-oat); padding: 6px; border-radius: 20px; }
  #textureFilterTabs .vanity-light-btn { padding: 7px 6px !important; font-size: 0.8rem !important; white-space: nowrap !important; line-height: 1.2 !important; text-align: center; min-width: 0; width: 100%; border-radius: 999px; }
  .shelf-search-row { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr); gap: 10px; align-items: center; }
  .shelf-search-row .input-box { min-width: 0; overflow: hidden; text-overflow: ellipsis; border-radius: 999px; background: var(--bg-canvas); }
  .preset-row { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 8px !important; margin-bottom: 2px; }
  .preset-chip { background: var(--bg-surface); border-radius: 18px; padding: 10px 14px !important; font-size: 0.86rem; border: none; cursor: pointer; text-align: left !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; gap: 3px; white-space: normal !important; line-height: 1.25 !important; min-height: 56px; transition: transform 180ms ease-out, background-color 180ms ease-out; }
  .preset-chip:hover, .preset-chip.active { background: var(--rose-pill-bg); }
  .preset-chip:active { transform: scale(0.98); }
  .preset-chip strong { display: block; color: var(--text-primary); font-family: 'Newsreader', Georgia, serif; font-size: 0.95rem; font-weight: 500; line-height: 1.22; white-space: normal; }
  .preset-chip span { display: block; color: var(--rose-brand); font-size: 0.78rem; font-weight: 600; line-height: 1.25; white-space: normal; }
  .field-label { display: block; font-size: 0.88rem; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
  .product-selector-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-auto-rows: minmax(92px, auto); gap: 10px; flex: 0 0 auto; height: 224px; min-height: 224px; max-height: 224px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--rose-pill-bg) transparent; padding: 12px; border-radius: 20px; background: var(--bg-canvas); margin-bottom: 4px; align-content: start; }
  .prod-check-item { display: flex; align-items: stretch; gap: 10px; padding: 12px 14px; min-height: 96px; border-radius: 18px; background: var(--bg-surface); border: none; cursor: pointer; font-size: 0.86rem; transition: background-color 180ms ease-out; overflow: hidden; }
  .prod-check-item.selected { background: var(--rose-pill-bg); }
  .prod-check-item input { margin-top: 2px; align-self: flex-start; accent-color: var(--rose-brand); flex-shrink: 0; }
  [data-ui] .input-box, [data-ui] .textarea-box, .input-box, .textarea-box { width: 100%; background: var(--bg-surface); border-radius: 18px; padding: 10px 14px; color: var(--text-primary); font-size: 15.5px; border: none; }
  .input-box:focus, .textarea-box:focus { outline: 2px solid var(--rose-brand); }

  .score-strip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; margin-bottom: 14px; }
  .metric-box { background: var(--bg-canvas); border-radius: 18px; padding: 12px 14px; font-variant-numeric: tabular-nums; min-width: 0; overflow: hidden; }
  .metric-val { font-family: 'Newsreader', Georgia, serif; font-size: 1.32rem; font-weight: 500; line-height: 1.12; font-variant-numeric: tabular-nums; }

  .badge-safe, .badge-clash, .badge-warn { display: inline-flex; align-items: center; border-radius: 999px; padding: 5px 12px; font-size: 0.8rem; font-weight: 600; font-variant-numeric: tabular-nums; }
  .badge-safe { background: var(--sage-bg); color: var(--sage-safe); }
  .badge-clash { background: var(--berry-bg); color: var(--berry-clash); }
  .badge-warn { background: var(--honey-bg); color: var(--honey-warn); }

  .conflict-card { background: var(--berry-bg); border-radius: 20px; padding: 16px 18px; margin-bottom: 10px; min-width: 0; overflow: hidden; }
  .conflict-card.MODERATE { background: var(--honey-bg); }

  /* Uneven Gallery & 4-Step Sink Pacing Strip */
  .z-cascade-stage { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; align-items: stretch; margin-top: 28px; }
  .z-vessel-left, .z-vessel-center, .z-vessel-right { background: var(--bg-surface); padding: 0; display: flex; }
  .z-vessel-left > .porcelain-vessel-core, .z-vessel-center > .porcelain-vessel-core, .z-vessel-right > .porcelain-vessel-core { padding: 28px 30px; justify-content: space-between; flex: 1; gap: 18px; }
  .sink-pacing-panel { margin-top: 24px; background: var(--bg-surface); padding: 28px 30px; }
  .viscosity-seq-list { list-style: none; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 18px 0 0; }
  .viscosity-seq-item { padding: 18px 20px; background: var(--bg-canvas); display: flex; flex-direction: column; justify-content: space-between; align-items: flex-start; gap: 14px; }
  .wait-timer-btn { padding: 8px 14px; background: var(--bg-oat); border: none; color: var(--text-primary); font-size: 0.84rem; font-weight: 500; cursor: pointer; white-space: nowrap; font-variant-numeric: tabular-nums; transition: background-color 200ms ease-out, color 200ms ease-out; width: 100%; text-align: center; }
  .wait-timer-btn:hover, .wait-timer-btn.running { background: var(--rose-brand); color: var(--accent-ink); }

  .section-block { padding: 84px 0; }
  .section-block-alt { padding: 84px 0; background: var(--bg-oat); }
  .bento-grid-3 { display: grid; grid-template-columns: 1.2fr 0.9fr 0.9fr; gap: 20px; margin-top: 24px; }
  .bento-cell { background: var(--bg-surface); padding: 24px; }

  .table-wrap { overflow-x: auto; background: var(--bg-surface); }
  table { width: 100%; border-collapse: collapse; font-size: 0.92rem; font-variant-numeric: tabular-nums; }
  th, td { padding: 14px 15px; text-align: left; border-bottom: 1px solid var(--border-hairline); }
  th { color: var(--text-muted); font-weight: 500; font-size: 0.84rem; background: var(--bg-oat); }

  /* Closing Editorial Footer */
  .site-footer { padding: 72px 0 48px; background: var(--bg-deep); color: var(--ink-on-deep); font-size: var(--step-small); }
  .footer-wordmark { font-size: clamp(3.25rem, 11vw, 9.5rem); font-weight: 300; line-height: 0.88; letter-spacing: -0.04em; margin: 36px 0 24px; color: var(--ink-on-deep); }
  .cookie-banner { width: 100%; background: var(--bg-oat); padding: 14px 0; display: none; }
  .cookie-banner-inner { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(12, 10, 8, 0.65); display: none; align-items: center; justify-content: center; padding: 20px; z-index: 80; }
  .modal-card { background: var(--bg-surface); max-width: 560px; width: 100%; padding: 32px; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
  @media (max-width: 1024px) {
    .editorial-top-banner { grid-template-columns: 1fr; row-gap: 24px; }
    .hero-title-block, .hero-copy-col, .hero-photo-col { grid-column: 1 / -1 !important; }
    .hero-grid, .z-cascade-stage, .bento-grid-3 { grid-template-columns: 1fr; }
    .product-selector-grid { max-height: 560px; } .viscosity-seq-list { grid-template-columns: repeat(2, 1fr); }
    .hero-h1-line2 { padding-left: 0; } .nav-links { gap: 12px; font-size: 0.86rem; }
  }
  @media (max-width: 820px) {
    .nav-inner { flex-wrap: wrap; } .hide-mobile { display: none !important; }
    .nav-links { width: 100%; order: 3; justify-content: space-between; gap: 4px; font-size: 0.72rem; padding-top: 8px; flex-wrap: nowrap; white-space: nowrap; }
  }
  @media (max-width: 640px) {
    .container { padding: 0 18px; }
    .grader-card, .results-panel { padding: 16px; }
    .preset-row, .score-strip, .viscosity-seq-list, .shelf-search-row, .product-selector-grid, #appleWalletCardPreview, #hero-3step-promise { grid-template-columns: 1fr !important; }
    #hero-3step-promise { gap: 10px !important; }
    .editorial-photo-caption { flex-wrap: wrap !important; gap: 8px !important; }
    #dl-pouch-bottles-grid { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; }
    #dl-pouch-bottles-grid > div:nth-child(-n+3) { grid-column: span 2; }
    #dl-pouch-bottles-grid > div:nth-child(n+4) { grid-column: span 3; }
    #dl-pouch-bottles-grid [id^="dl-pouch-slot-name-"] { white-space: normal !important; overflow: visible !important; text-overflow: clip !important; line-height: 1.18 !important; }
    #textureFilterTabs { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    #dl-results-step-bar .vanity-light-btn, #heroRitualToggleBar .vanity-light-btn { white-space: normal !important; line-height: 1.2 !important; font-size: 0.72rem !important; padding: 6px 4px !important; min-width: 0; }
    .brand-logo-link { font-size: 1.15rem; gap: 8px; }
    .brand-atelier-word { display: none; }
    .vanity-light-btn { padding: 6px 10px; font-size: 0.84rem; white-space: nowrap; min-height: 32px; }
    .site-header .btn-primary { display: none; }
  }
  #appleWalletCardPreview, #appleWalletCardPreview.eb-blurred-deliverable, #actives-matrix tr.eb-blurred-deliverable { filter: none !important; max-height: none !important; overflow: visible !important; opacity: 1 !important; user-select: auto !important; cursor: auto !important; }
  #liveResultsContainer #eb-postcalc-inline-cta, #actives-matrix #eb-table-row4-gate-tr, #actives-matrix #eb-tanstack-table-bar, #eb-deliverable-curtain, #eb-pseo-quick-bar { display: none !important; }
  #eb-pseo-hero-split { grid-template-columns: 1fr !important; }
  #eb-prism-proof-preview { white-space: normal !important; padding: 16px 18px !important; background: var(--bg-canvas) !important; font-family: 'Newsreader', Georgia, serif !important; }
  .dl-inline-ics-form { display: grid !important; grid-template-columns: minmax(190px, 1fr) auto; gap: 8px; align-items: center; width: 100%; }
  .dl-inline-ics-form .input-box, #dl-vanity-email-form .input-box { width: 100%; min-width: 0; border-radius: 999px; background: var(--bg-surface); padding: 7px 14px; font-size: 0.78rem; }
  .dl-inline-ics-btn, #dl-vanity-email-btn { background: var(--rose-pill-bg) !important; color: var(--rose-brand) !important; border-radius: 999px; font-weight: 600; }
`;

function renderHeader(hideNav = false) {
  const lightPill = `<div class="vanity-light-pill" id="vanityLightToggle" role="group" aria-label="Ambient Lighting Mode" title="Switch between bright daylight and warm evening lighting">
    <button type="button" class="vanity-light-btn active" data-theme-mode="day" aria-pressed="true" onclick="setAtelierVanityLight('day', this)">Day</button>
    <button type="button" class="vanity-light-btn" data-theme-mode="night" aria-pressed="false" onclick="setAtelierVanityLight('night', this)">Night</button>
  </div>`;
  const vanityPill = renderHeaderVanityBagPill();
  const ftcBar = renderAboveFoldSovrnDisclosureBar();
  if (hideNav) {
    return `${ftcBar}<header class="site-header"><div class="container nav-inner"><a href="/" class="brand-logo-link" aria-label="DermLogic Home">${BRAND_LOGO_SVG}<span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.05rem;">Atelier</span></span></a><div style="display:flex;align-items:center;gap:10px;">${vanityPill}${lightPill}</div></div></header>`;
  }
  return `${ftcBar}<header class="site-header"><div class="container nav-inner"><a href="/" class="brand-logo-link" aria-label="DermLogic Home">${BRAND_LOGO_SVG}<span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.05rem;">Atelier</span></span></a><nav class="nav-links" aria-label="Main Navigation"><a href="/#analyzer">Shelf Builder</a><a href="/celebrity">Celebrity Routines</a><a href="/concern">Skin Concerns</a><a href="/directory">Layering Guides</a></nav><div style="display:flex;align-items:center;gap:10px;">${vanityPill}${lightPill}</div></div></header>`;
}

function renderFooter() {
  return `<div id="cookieBanner" class="cookie-banner" role="region" aria-label="Cookie Consent"><div class="container cookie-banner-inner"><div style="font-size:0.85rem;color:var(--text-secondary);">We use privacy-friendly cookies to remember your skincare routine preferences. See our <a href="/privacy" style="text-decoration:underline;color:var(--rose-brand);">Privacy Policy</a> &amp; <a href="/editorial-policy" style="text-decoration:underline;color:var(--rose-brand);">Editorial Policy</a>.</div><div style="display:flex;gap:8px;"><button type="button" id="cookie-reject" class="btn-secondary" style="padding:6px 14px;font-size:0.8125rem;" onclick="setCookieConsent('rejected')">Reject</button><button type="button" id="cookie-accept" class="btn-primary" style="padding:6px 16px;font-size:0.8125rem;" onclick="setCookieConsent('accepted')">Accept</button></div></div></div><footer class="site-footer"><div class="container"><div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;align-items:flex-start;"><div style="max-width:52ch;"><a href="/" class="brand-logo-link" aria-label="DermLogic Home" style="margin-bottom:8px;color:var(--ink-on-deep);">${BRAND_LOGO_SVG}<span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:#E8C6B0;">Formulation Atelier</span></span></a><p style="color:#B5ACA3;font-size:0.9rem;">Cosmetic-chemist verified pH windows, peptide &amp; Vitamin C compatibility, pore-safety, and four-night skin-cycling rituals. Reader-supported formulation lab: when you purchase through retail links on our site, we may earn an affiliate commission at no extra cost to you.</p></div><div style="display:flex;gap:20px;flex-wrap:wrap;font-weight:400;font-size:0.9rem;color:var(--ink-on-deep);"><a href="/#analyzer">Shelf Audit</a><a href="/celebrity">Iconic Routines</a><a href="/bottle">Cult Bottles</a><a href="/ingredient">Ingredients</a><a href="/concern">Skin Concerns</a><a href="/leaderboard">Routine Leaderboard</a><a href="/directory">Layering Guides</a><a href="/editorial-policy">Editorial &amp; FTC Policy</a><a href="/sitemap.xml">XML Sitemap</a><a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a></div></div><div class="footer-wordmark">DermLogic</div></div></footer>${renderAtelierVanityDrawerHtml()}${renderSovrnVglnkScript()}`;
}

const SHORT_PRODUCT_NAMES = {
  'skinceuticals-ce-ferulic': 'C E Ferulic Vitamin C Serum', 'paulas-choice-2-bha': '2% BHA Liquid Exfoliant',
  'lrp-effaclar-duo-bpo': 'Effaclar Duo Blemish Cream', 'rx-tretinoin-005': 'Tretinoin 0.05% Night Cream',
  'to-buffet-copper-peptides': 'Multi-Peptide + Copper Serum', 'sunday-riley-good-genes': 'Good Genes Lactic Acid Serum',
  'lrp-cicaplast-baume-b5': 'Cicaplast Baume B5+ Cream', 'dieux-instant-angel': 'Instant Angel Barrier Cream',
  'topicals-faded-serum': 'Faded Dark Spot Serum', 'boj-relief-sun-spf50': 'Relief Sun SPF 50+',
  'medik8-crystal-retinal-6': 'Crystal Retinal 6 Night Serum', 'tower28-sos-spray': 'SOS Daily Rescue Mist',
  'panoxyl-10-bpo-wash': '10% Benzoyl Peroxide Wash', 'drunk-elephant-babyfacial': 'Sukari Babyfacial Mask',
  'aestura-atobarrier-365': 'Atobarrier 365 Cream', 'stratia-lipid-gold': 'Lipid Gold Barrier Lotion',
  'nizoral-ketoconazole-1': 'Nizoral Blemish Wash', 'malezia-5-urea-moisturizer': '5% Urea Moisturizer',
  'rohto-melano-cc': 'Melano CC Vitamin C Essence', 'sunday-riley-ceo-15': 'C.E.O. 15% Vitamin C Serum',
  'cosrx-snail-96-mucin': 'Snail 96 Mucin Essence', 'differin-adapalene-01': 'Adapalene 0.1% Gel',
  'anua-heartleaf-77-toner': 'Heartleaf 77% Soothing Toner', 'cerave-pm-lotion': 'PM Moisturizing Lotion',
  'eltamd-uv-clear-spf46': 'UV Clear SPF 46', 'to-glycolic-acid-7': 'Glycolic Acid 7% Toner',
  'to-niacinamide-10-zinc': 'Niacinamide 10% + Zinc 1%', 'rhode-glazing-milk': 'Glazing Milk Ceramide Essence'
};

function renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds, initialRawInci, initialSkinType }) {
  const selectedSet = new Set(initialProductIds || ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic']);
  const currentSkin = initialSkinType || (initialAnalysis && initialAnalysis.skinType) || 'combination';

  const presetButtonsHtml = presets.map((p, idx) => `
    <button type="button" class="preset-chip ${idx === 0 ? 'active' : ''}" data-preset-id="${escapeHtml(p.id)}" data-products='${JSON.stringify(p.productIds)}' data-skin="${escapeHtml(p.skinType)}" onclick="applyRoutinePreset(this)">
      <strong>${escapeHtml(p.label)}</strong>
      <span class="mono">${escapeHtml(p.badge)}</span>
    </button>
  `).join('');

  const shortNameMap = SHORT_PRODUCT_NAMES;
  const categoryLabelMap = {
    'Antioxidant Serum': 'Morning Vitamin C',
    'Exfoliating Acid': 'Gentle Exfoliant',
    'Exfoliating Peel': 'Weekly Smoothing Mask',
    'Acne Treatment': 'Blemish Treatment',
    'Acne Cleanser': 'Clarifying Wash',
    'Fungal Acne Wash': 'Clarifying Wash',
    'Retinoid (Rx)': 'Night Retinoid',
    'Retinoid': 'Night Retinoid',
    'Peptide Serum': 'Firming Peptide Serum',
    'Barrier Moisturizer': 'Barrier Cream',
    'Barrier Recovery': 'Barrier Cream',
    'Barrier Essence': 'Hydrating Essence',
    'Soothing Toner': 'Soothing Toner',
    'Acne & Eczema Mist': 'Soothing Mist',
    'Rosacea & Brightening': 'Redness & Tone Serum',
    'Brightening Serum': 'Brightening Serum',
    'Sebum & Pore Serum': 'Pore-Balancing Serum',
    'Sunscreen (SPF)': 'Morning SPF Shield',
    'Cleanser': 'Gentle Cleanser'
  };
  const getTexGroup = (prod) => {
    for (let sIdx = 0; sIdx < VANITY_SLOT_OPTIONS.length; sIdx++) {
      if (VANITY_SLOT_OPTIONS[sIdx].choices.some((c) => c.id === prod.id)) {
        return ['prep', 'serum', 'cream', 'spf', 'pm'][sIdx];
      }
    }
    const hay = (prod.id + ' ' + prod.name + ' ' + (prod.category || '')).toLowerCase();
    if (/spf|sun|uv/.test(hay)) return 'spf';
    if (/tretinoin|retinal|retinol|adapalene|differin|bha|p50|babyfacial|peel|exfoli/.test(hay) && !/wash|cleanse|toner/.test(hay)) return 'pm';
    if (/wash|cleanse|micellar|mist|spray|toner|glycolic|shampoo/.test(hay)) return 'prep';
    if (/cream|moistur|baume|angel|atobarrier|lotion|snail|urea|lipid|barrier|balm|milk/.test(hay)) return 'cream';
    return 'serum';
  };
  const prepCount = products.filter((p) => getTexGroup(p) === 'prep').length;
  const serumCount = products.filter((p) => getTexGroup(p) === 'serum').length;
  const creamCount = products.filter((p) => getTexGroup(p) === 'cream').length;
  const spfCount = products.filter((p) => getTexGroup(p) === 'spf').length;
  const pmCount = products.filter((p) => getTexGroup(p) === 'pm').length;
  const sortedProducts = [...products].sort((a, b) => (selectedSet.has(b.id) ? 1 : 0) - (selectedSet.has(a.id) ? 1 : 0));
  const productCheckboxesHtml = sortedProducts.map((prod) => {
    const isChecked = selectedSet.has(prod.id);
    const texGroup = getTexGroup(prod);
    const roleTag = categoryLabelMap[prod.category] || 'Daily Skincare';
    const cleanProdName = shortNameMap[prod.id] || String(prod.name || '').replace(/\s*\([^)]*\)/g, '').replace(/[()]/g, '').replace(/\s+with\s+.*$/i, '');
    const searchBlob = (prod.brand + ' ' + prod.name + ' ' + (prod.category || '') + ' ' + (prod.inciList || '') + ' ' + (prod.summary || '')).toLowerCase();
    return `<label class="prod-check-item ${isChecked ? 'selected' : ''}" data-prod-label="${escapeHtml(prod.id)}" data-tex-group="${texGroup}" data-search="${escapeHtml(searchBlob)}" onmouseenter="if(window.__dlShowProdInfo)window.__dlShowProdInfo(this,'${escapeHtml(prod.id)}',event)" onmouseleave="if(window.__dlHideProdInfo)window.__dlHideProdInfo()">
        <input type="checkbox" name="routineProduct" value="${escapeHtml(prod.id)}" ${isChecked ? 'checked' : ''} onchange="toggleProductChip(this)" />
        <span style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
          <span style="display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:3px;"><span style="font-size:0.78rem;color:var(--text-secondary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-flex;align-items:center;">${escapeHtml(prod.brand)}<span class="dl-info-i" onpointerdown="if(window.__dlShowProdInfo)window.__dlShowProdInfo(this,'${escapeHtml(prod.id)}',event)" onclick="if(window.__dlShowProdInfo)window.__dlShowProdInfo(this,'${escapeHtml(prod.id)}',event)">i</span></span><span class="mono" style="font-size:0.74rem;padding:1px 7px;background:${isChecked ? 'var(--rose-brand)' : 'var(--bg-oat)'};color:${isChecked ? 'var(--accent-ink)' : 'var(--rose-brand)'};font-weight:600;flex-shrink:0;">${isChecked ? '✓ In Bag' : '+ Vanity Bag'}</span></span>
          <strong class="serif-display" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--text-primary);font-size:0.91rem;font-weight:400;line-height:1.2;">${escapeHtml(cleanProdName)}</strong>
          <span class="mono" style="color:var(--rose-brand);font-size:0.78rem;font-weight:500;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:auto;">${roleTag} &middot; $${prod.priceUsd}</span>
        </span>
      </label>`;
  }).join('') + `<div id="shelfEmptyState" style="display:none;grid-column:1/-1;padding:16px;background:var(--bg-canvas);font-size:0.86rem;color:var(--text-secondary);text-align:center;">Don't see that bottle in our ${products.length}-bottle catalog? <button type="button" class="btn-primary mono" style="padding:5px 12px;min-height:30px;font-size:0.78rem;margin-left:6px;" onclick="if(window.__dlAddCustomSearchBottle)window.__dlAddCustomSearchBottle()">+ Add Custom Bottle to Vanity Bag &rarr;</button><button type="button" class="btn-secondary mono" style="padding:5px 12px;min-height:30px;font-size:0.78rem;margin-left:6px;" onclick="const q=document.getElementById('productFilterInput').value;const ta=document.getElementById('rawInciTextarea');if(ta&&q){ta.value=q;runRoutineAnalysis();}">Check INCI Ingredients &rarr;</button></div>`;

  return `
    <div id="checker"></div>
    <div class="hero-grid" id="analyzer">
      <div class="grader-card" style="display:flex;flex-direction:column;">
        <div id="dl-selector-vanity-caddy" style="background:var(--bg-pouch);border-radius:24px;padding:20px 22px;margin-bottom:18px;color:var(--text-primary);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
            <div>
              <div class="serif-display" style="font-size:1.22rem;color:var(--text-primary);font-weight:500;">Your Soft Pinch Vanity Pouch &middot; <span id="dl-pouch-status-label" style="color:var(--rose-brand);">4 of 5 Comfort Steps Zip-Ready</span></div>
              <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:2px;">Tap one sheer daily SPF 50 below to seal your weightless morning &amp; bedtime bag.</div>
            </div>
            <span id="dl-pouch-pct-pill" style="display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:999px;background:var(--bg-surface);color:var(--rose-brand);font-size:0.78rem;font-weight:600;">
              <span style="width:8px;height:8px;border-radius:999px;background:#10B981;"></span>
              <span id="dl-pouch-pct-text">Almost Full &middot; 80%</span>
            </span>
          </div>
          <div id="dl-pouch-bottles-grid" style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;text-align:center;">
            <div id="dl-pouch-card-0" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_0');window.__dlSelectVanitySlot(0);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:18px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;">
              <svg width="34" height="42" viewBox="0 0 38 46" fill="none"><rect x="13" y="4" width="12" height="6" rx="2" fill="#D8B4A0"/><path d="M9 10H29L31 15V40C31 41.5 29.8 42.5 28.5 42.5H9.5C8.2 42.5 7 41.5 7 40V15L9 10Z" fill="#CBE2F6"/><rect x="10.5" y="19" width="17" height="13" rx="3" fill="#FFFFFF"/><text x="19" y="27.5" text-anchor="middle" font-size="6" fill="#3A1F27">Mist</text></svg>
              <div id="dl-pouch-slot-name-0" style="font-size:0.76rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">SOS Mist</div>
              <span id="dl-pouch-slot-sub-0" style="font-size:0.68rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">In Pouch</span>
            </div>
            <div id="dl-pouch-card-1" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_1');window.__dlSelectVanitySlot(1);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:18px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;">
              <svg width="34" height="42" viewBox="0 0 38 46" fill="none"><path d="M15.5 6C15.5 4 17 2.5 19 2.5C21 2.5 22.5 4 22.5 6V9.5H15.5V6Z" fill="#D8B4A0"/><path d="M9 12.5H29L31 17.5V40C31 41.5 29.8 42.5 28.5 42.5H9.5C8.2 42.5 7 41.5 7 40V17.5L9 12.5Z" fill="#F7DFAD"/><rect x="10.5" y="21" width="17" height="13" rx="3" fill="#FFFFFF"/><text x="19" y="29.5" text-anchor="middle" font-size="6" fill="#3A1F27">Serum</text></svg>
              <div id="dl-pouch-slot-name-1" style="font-size:0.76rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">C E Ferulic</div>
              <span id="dl-pouch-slot-sub-1" style="font-size:0.68rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">In Pouch</span>
            </div>
            <div id="dl-pouch-card-2" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_2');window.__dlSelectVanitySlot(2);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:18px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;">
              <svg width="34" height="42" viewBox="0 0 40 46" fill="none"><rect x="7" y="11" width="26" height="6" rx="2.5" fill="#D8B4A0"/><rect x="5" y="17" width="30" height="23" rx="6" fill="#CBEAD9"/><rect x="9" y="23" width="22" height="11" rx="3" fill="#FFFFFF"/><text x="20" y="30.5" text-anchor="middle" font-size="6" fill="#3A1F27">Lotion</text></svg>
              <div id="dl-pouch-slot-name-2" style="font-size:0.76rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Aestura 365</div>
              <span id="dl-pouch-slot-sub-2" style="font-size:0.68rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">In Pouch</span>
            </div>
            <div id="dl-pouch-card-3" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_4');window.__dlSelectVanitySlot(4);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:18px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;">
              <svg width="34" height="42" viewBox="0 0 38 46" fill="none"><path d="M7 6H31L27 33H11L7 6Z" fill="#E2D2F2"/><rect x="14" y="33" width="10" height="7" rx="2" fill="#D8B4A0"/><text x="19" y="22" text-anchor="middle" font-size="6" fill="#3A1F27">Night</text></svg>
              <div id="dl-pouch-slot-name-3" style="font-size:0.76rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Tretinoin</div>
              <span id="dl-pouch-slot-sub-3" style="font-size:0.68rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">In Pouch</span>
            </div>
            <div id="dl-empty-bottle-slot" onclick="if(window.__dlTapPouchSpfSlot)window.__dlTapPouchSpfSlot();" style="background:var(--bg-empty-slot);border-radius:18px;padding:10px 6px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;">
              <svg width="34" height="42" viewBox="0 0 38 46" fill="none"><path d="M7 6H31L27 33H11L7 6Z" fill="#8A3448" fill-opacity="0.16"/><rect x="14" y="33" width="10" height="7" rx="2" fill="#8A3448" fill-opacity="0.3"/><text x="19" y="22" text-anchor="middle" font-size="6.5" fill="var(--rose-brand)" font-weight="600">+SPF</text></svg>
              <div id="dl-pouch-slot-name-4" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Add SPF 50</div>
              <span id="dl-pouch-slot-sub-4" style="font-size:0.68rem;color:var(--text-secondary);">Final Step</span>
            </div>
          </div>
          <div style="margin-top:12px;height:8px;border-radius:999px;background:var(--bg-oat);overflow:hidden;">
            <div id="dl-pouch-progress-fill" style="width:80%;height:100%;border-radius:999px;background:linear-gradient(90deg, var(--rose-brand) 0%, #10B981 100%);transition:width 240ms ease;"></div>
          </div>
          ${renderPersonaInteractiveWorkbenchAddons().pouchBudgetToggleHtml}
        </div>
        <div class="porcelain-vessel-core" style="flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div style="flex:1;display:flex;flex-direction:column;min-height:0;gap:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div>
                <span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;display:block;">Step 1 of 2 &middot; Your Bathroom Shelf</span>
                <strong class="serif-display" style="font-size:1.35rem;font-weight:400;color:var(--text-primary);">Tap Your Skin Reaction, Preset, or Bottles</strong>
              </div>
              <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <button type="button" id="topClearShelfBtn" class="mono" style="padding:3px 9px;border-radius:999px;font-size:0.78rem;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;cursor:pointer;font-weight:500;" onclick="clearRoutineSelection()">Clear (${selectedSet.size}) &times;</button>
                <span class="badge-safe mono" id="shelfCountBadge" style="font-size:0.76rem;" title="Catalog synced weekly + instant custom bottle discovery">${products.length} Bottles &middot; Weekly Sync</span>
              </div>
            </div>

            <div style="padding:10px 12px;background:var(--bg-canvas);border-radius:18px;">
              ${renderPersonaInteractiveWorkbenchAddons().reactionTriageHtml}
              <div class="mono" style="font-size:0.74rem;font-weight:500;color:var(--text-secondary);margin-bottom:5px;">Or test a common shelf combination:</div>
              <div class="preset-row" id="presetButtonsRow" style="margin-bottom:0;">
                ${presetButtonsHtml}
              </div>
            </div>

            <div id="textureFilterTabs" role="group" aria-label="Filter Bathroom Shelf by Vanity Bag Step">
              <button type="button" data-tex="all" class="vanity-light-btn active mono" aria-pressed="true" onclick="filterShelfByTexture('all', this)">All (${products.length})</button>
              <button type="button" data-tex="prep" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('prep', this)">01 &middot; Prep (${prepCount})</button>
              <button type="button" data-tex="serum" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('serum', this)">02 &middot; Serum (${serumCount})</button>
              <button type="button" data-tex="cream" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('cream', this)">03 &middot; Cream (${creamCount})</button>
              <button type="button" data-tex="spf" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('spf', this)">04 &middot; SPF 50 (${spfCount})</button>
              <button type="button" data-tex="pm" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('pm', this)">05 &middot; PM (${pmCount})</button>
            </div>

            <div class="shelf-search-row">
              <input id="productFilterInput" type="search" aria-label="Search skincare products" class="input-box" style="padding:9px 12px;font-size:0.86rem;" placeholder="Search brand or bottle..." oninput="filterProductList(this.value)" />
              <select id="skinTypeSelect" class="input-box" style="padding:9px 10px;font-size:0.86rem;" aria-label="Your Skin Type" onchange="runRoutineAnalysis()">
                <option value="combination" ${currentSkin === 'combination' ? 'selected' : ''}>Skin: Combination</option>
                <option value="sensitive" ${currentSkin === 'sensitive' ? 'selected' : ''}>Skin: Sensitive</option>
                <option value="oily" ${currentSkin === 'oily' ? 'selected' : ''}>Skin: Oily / Blemish</option>
                <option value="dry" ${currentSkin === 'dry' ? 'selected' : ''}>Skin: Dry</option>
                <option value="normal" ${currentSkin === 'normal' ? 'selected' : ''}>Skin: Balanced</option>
              </select>
            </div>

            <div class="product-selector-grid" id="productSelectorGrid" data-ui="shelf-grid" style="margin-bottom:0;">
              ${productCheckboxesHtml}
            </div>

            <div style="flex:0 0 auto;display:flex;flex-direction:column;padding:8px 10px;background:var(--bg-canvas);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;gap:8px;flex-wrap:wrap;">
                <label class="field-label" for="rawInciTextarea" style="margin:0;font-size:0.76rem;color:var(--text-secondary);">Optional: Paste Bottle Ingredient List (INCI Label · Pore Check)</label>
                <button type="button" class="btn-secondary" style="padding:2px 8px;font-size:0.74rem;min-height:22px;flex-shrink:0;" onclick="pasteSampleComedogenicInci()">Try Sample</button>
              </div>
              <textarea id="rawInciTextarea" class="textarea-box mono" rows="1" style="flex:0 0 auto;height:34px;min-height:34px;max-height:80px;resize:vertical;font-size:0.78rem;padding:5px 8px;" oninput="if(window.__inciTimer)clearTimeout(window.__inciTimer);window.__inciTimer=setTimeout(function(){runRoutineAnalysis();},380);" placeholder="Optional: paste ingredients (e.g., Aqua, Ascorbic Acid 15%)...">${escapeHtml(initialRawInci || '')}</textarea>
              <div id="rawInciFeedbackBox" style="margin-top:2px;"></div>
            </div>
            ${renderPersonalizationBarHtml('indoor_dry', '')}
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding-top:2px;">
            <button type="button" id="analyzeBtn" class="btn-primary" style="flex:1;padding:12px 20px;" onclick="runRoutineAnalysis(null, true)">
              <span>Check My Bathroom Shelf</span>
              <span class="btn-icon-circle">&rarr;</span>
            </button>
            <button type="button" class="btn-secondary" style="padding:11px 16px;" onclick="if(window.__dlOpenVanityDrawer)window.__dlOpenVanityDrawer('workbench')">Open 5-Slot Bag</button>
          </div>
        </div>
      </div>

      <div class="results-panel" id="liveResultsContainer" style="display:flex;flex-direction:column;justify-content:flex-start;height:100%;">
        ${renderAnalysisResultHtml(initialAnalysis)}
      </div>
    </div>

    <div id="checkoutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle" data-ui="checkout-dialog" onclick="if(event.target===this)closeCheckoutModal()">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span class="badge-safe mono" id="modalBanditBadge">DermLogic Instant Fulfillment · $1.99 Stripe Express</span><button type="button" class="btn-secondary" style="padding:6px 14px;min-height:34px;" onclick="closeCheckoutModal()">Close</button></div>
        <h3 id="checkoutModalTitle" class="serif-display" style="font-size:1.75rem;margin-bottom:8px;">Save Your Complete Morning &amp; Bedtime Routine Kit</h3>
        <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:16px;">Includes your printable 4-Night Skin-Cycling schedule, pore-safe product swaps, and 9:16 bathroom mirror phone lock-screen card.</p>
        <div style="margin-bottom:16px;"><a href="/buy/flash_pass" onclick="if(window.__dlBuyFromVanity)return window.__dlBuyFromVanity('flash_pass',this);if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn-primary" style="width:100%;justify-content:center;text-decoration:none;padding:13px 20px;font-size:0.95rem;"><span>Get 3-Card Ritual Dossier ($1.99 Stripe Express)</span><span class="btn-icon-circle">&rarr;</span></a></div>
        <form id="checkoutForm" onsubmit="submitSelfServeCheckout(event)" style="padding-top:12px;">
          <input type="hidden" id="checkoutPlanId" value="onetime_499" /><input type="text" name="website_hp" id="checkoutHoneypot" style="display:none !important" tabindex="-1" autocomplete="off" />
          <div style="margin-bottom:10px;"><label class="field-label" for="checkoutEmailInput">Email for Instant Ritual Delivery</label><input id="checkoutEmailInput" type="email" required class="input-box" placeholder="you@skincare-ritual.com" value="reader@dermlogic.io" /></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;"><label class="prod-check-item selected" id="planOption499" onclick="selectCheckoutPlan('onetime_499')"><input type="radio" name="planChoice" value="onetime_499" checked /><span><strong style="display:block;">$4.99 Complete Kit</strong></span></label><label class="prod-check-item" id="planOption1999" onclick="selectCheckoutPlan('annual_1999')"><input type="radio" name="planChoice" value="annual_1999" /><span><strong style="display:block;">$19.99/yr Unlimited</strong></span></label></div>
          <button type="submit" id="checkoutSubmitBtn" class="btn-secondary" style="width:100%;">Complete Plan Checkout &rarr;</button>
        </form>
        <div id="checkoutSuccessBox" style="display:none;margin-top:16px;padding:14px;background:var(--sage-bg);color:var(--sage-safe);"></div>
      </div>
    </div>
  `;
}

function renderSingleConflictCard(c) {
  const isCritical = c.severity === 'CRITICAL';
  const badgeLabel = isCritical ? 'Cancels on Contact · -$2.80/use Neutralized' : 'Space Apart · Perioral Sting Risk';
  const nameA = String(c.ingredientA || c.inciA || '').replace(/\s*\([^)]*\)/g, '');
  const nameB = String(c.ingredientB || c.inciB || '').replace(/\s*\([^)]*\)/g, '');
  const cleanTitle = String(c.title || '').replace(/\s*\(pH[^)]*\)/gi, '');
  const rawRes = String(c.resolution || '').trim();
  const howToFix = (!rawRes || /LOCKED IN FREE PREVIEW/i.test(rawRes))
    ? (isCritical ? 'Wear one bottle at 7:30 AM and keep the other for 9:30 PM so they never cancel out on contact.' : 'Apply a ceramide moisturizer first or alternate across your 4-night cycle.')
    : rawRes;
  const swap = getConflictSafeSwap(c);
  return `<div class="conflict-card ${escapeHtml(c.severity)}" style="padding:16px 18px;margin-bottom:10px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;"><span class="${isCritical ? 'badge-clash' : 'badge-warn'} mono">${badgeLabel}</span><span class="mono" style="font-size:0.8rem;color:var(--text-secondary);font-weight:500;">${escapeHtml(nameA)} + ${escapeHtml(nameB)}</span></div>
      <div class="serif-display" style="font-size:1.16rem;font-weight:500;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(cleanTitle)}</div>
      <div style="padding:9px 12px;background:var(--bg-surface);border-left:2.5px solid ${isCritical ? 'var(--berry-clash)' : 'var(--honey-warn)'};font-size:0.84rem;line-height:1.45;color:var(--text-primary);margin-bottom:8px;"><strong>Easy Fix:</strong> ${escapeHtml(howToFix)}<div class="mono" style="margin-top:4px;font-size:0.8rem;color:var(--sage-safe);">${escapeHtml(swap.freeFix)}</div></div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;"><a href="${escapeHtml(swap.directUrl)}" data-sovrn-beacon="${escapeHtml(swap.beaconUrl)}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono dl-conflict-swap-link" style="white-space:normal;">${escapeHtml(swap.swapLabel)} at ${escapeHtml(swap.retailer)} &rarr;</a><button type="button" class="vanity-light-btn mono" style="padding:5px 10px;font-size:0.73rem;min-height:26px;" onclick="window.__dlActivate72HrBarrierReset(this)">Activate 72-Hr Stinging Rescue Mode &rarr;</button></div>
    </div>`;
}

function renderAnalysisResultHtml(res) {
  const isCritical = res.conflicts.length > 0 && res.verdictStatus === 'CRITICAL_CLASH';
  const isWarn = res.conflicts.length > 0 && !isCritical;
  const scoreColor = isCritical ? 'var(--berry-clash)' : isWarn ? 'var(--honey-warn)' : 'var(--sage-safe)';
  const badgeClass = isCritical ? 'badge-clash' : isWarn ? 'badge-warn' : 'badge-safe';
  const topVerdictText = res.conflicts.length === 0 ? 'Safe Everyday Routine · Zero Clashes' : res.verdictLabel;

  const primaryConflicts = res.conflicts.slice(0, 1);
  const extraConflicts = res.conflicts.slice(1);
  const rawTxt = String(res.rawInciText || '').trim();
  const pMatched = res.pastedMatched || [];
  const pCloggers = pMatched.filter((m) => m.comedogenicity >= 2 || m.malasseziaTrigger);
  const pastedBoxHtml = !rawTxt ? '' : (pCloggers.length > 0
    ? `<div id="pastedInciCard" style="padding:12px 14px;background:var(--berry-bg);border-left:3px solid var(--berry-clash);margin-bottom:10px;font-size:0.84rem;line-height:1.45;"><strong style="color:var(--berry-clash);display:block;margin-bottom:3px;">Pasted Ingredient Check: ${pCloggers.length} Pore-Clogging Trigger(s) Flagged</strong><div style="color:var(--text-primary);">${pCloggers.map((m) => `<strong>${escapeHtml(m.commonName)}</strong> (${m.comedogenicity}/5 Pore Score${m.malasseziaTrigger ? ' · Fungal-Blemish Trigger' : ''})`).join(' · ')}</div></div>`
    : (pMatched.length > 0
      ? `<div id="pastedInciCard" style="padding:12px 14px;background:var(--sage-bg);border-left:3px solid var(--sage-safe);margin-bottom:10px;font-size:0.84rem;line-height:1.45;"><strong style="color:var(--sage-safe);display:block;margin-bottom:3px;">Pasted Ingredient Check: 100% Pore-Safe (0 Clogging Oils)</strong><div style="color:var(--text-primary);">Matched: ${pMatched.map((m) => `<strong>${escapeHtml(m.commonName)}</strong> (${m.comedogenicity}/5 Pore-Safe)`).join(', ')}.</div></div>`
      : `<div id="pastedInciCard" style="padding:12px 14px;background:var(--bg-oat);border-left:3px solid var(--honey-warn);margin-bottom:10px;font-size:0.84rem;line-height:1.45;"><strong style="color:var(--text-primary);display:block;margin-bottom:3px;">Pasted Ingredient Check (&ldquo;${escapeHtml(rawTxt.slice(0, 32))}&rdquo;): 0 Pore-Cloggers Flagged</strong><div style="color:var(--text-secondary);">No pore-clogging oils or waxes matched.</div></div>`));

  const conflictsHtml = pastedBoxHtml + (res.conflicts.length === 0
    ? `<div style="padding:16px 18px;background:var(--sage-bg);color:var(--sage-safe);font-size:0.9rem;line-height:1.52;margin-bottom:10px;">
         <div class="serif-display" style="font-size:1.2rem;color:var(--sage-safe);margin-bottom:4px;">Pure Shelf Harmony · Every Bottle Works Together</div>
         <div>Your selected bottles layer smoothly with zero stinging, canceling out, or makeup pilling.</div>
       </div>`
    : primaryConflicts.map(renderSingleConflictCard).join('') + (extraConflicts.length > 0 ? `
        <details style="margin-bottom:10px;background:var(--bg-canvas);padding:10px 14px;">
          <summary class="mono" style="cursor:pointer;font-size:0.84rem;font-weight:500;color:var(--rose-brand);">
            + Optional: View ${extraConflicts.length} more bottle ${extraConflicts.length === 1 ? 'clash' : 'clashes'} on your shelf
          </summary>
          <div style="margin-top:10px;">
            ${extraConflicts.map(renderSingleConflictCard).join('')}
          </div>
        </details>
      ` : ''));

  const matchedProds = (res.matchedProductIds || []).map((id) => CULT_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const fmtProd = (p) => p ? `${p.brand} ${SHORT_PRODUCT_NAMES[p.id] || String(p.name || '').replace(/\s*\([^)]*\)/g, '')}` : '';
  const isWash = (p) => /cleanse|wash|micellar|shampoo/i.test((p.category || '') + ' ' + p.name);
  const isBpo = (p) => /bpo|benzoyl|effaclar/i.test(p.id + ' ' + (p.category || '') + ' ' + p.name);
  const isRetin = (p) => /tretinoin|retinal|retinol|adapalene|differin/i.test((p.category || '') + ' ' + p.name);
  const isAcidExfol = (p) => !isWash(p) && !isBpo(p) && /bha|glycolic|lactic|p50|babyfacial|exfoli|peel|pha/i.test((p.category || '') + ' ' + p.name);
  const isBarrierOrSpf = (p) => /spf|sun|uv|moistur|barrier|baume|angel|atobarrier|urea|lipid|cicaplast|cerave|illiyoon|skinfix/i.test(p.id + ' ' + (p.category || '') + ' ' + p.name);

  const bpoProd = matchedProds.find(isBpo);
  const amCleanse = matchedProds.find(isWash);
  const amSerum = matchedProds.find((p) => !isWash(p) && !isBpo(p) && !isRetin(p) && !isAcidExfol(p) && (/vitamin c|ferulic|ceo|melano|niacinamide|snail|hyalu|azelaic|faded|tranexamic|centella|heartleaf|glazing|vinoperfect|sos/i.test((p.category || '') + ' ' + p.name)));
  const amShield = matchedProds.find((p) => /spf|sun|uv/i.test((p.category || '') + ' ' + p.name)) || matchedProds.find((p) => !isWash(p) && !isBpo(p) && !isRetin(p) && !isAcidExfol(p) && isBarrierOrSpf(p));
  const pmExfol = matchedProds.find(isAcidExfol) || (!isWash(bpoProd || {}) ? bpoProd : null);
  const pmRetin = matchedProds.find(isRetin);
  const pmPept = matchedProds.find((p) => !isWash(p) && /copper|peptide|buffet|snail|hyalu|centella|glazing/i.test((p.category || '') + ' ' + p.name));
  const pmCream = matchedProds.find((p) => !isWash(p) && !isBpo(p) && !isRetin(p) && !isAcidExfol(p) && !/spf|sun|uv/i.test((p.category || '') + ' ' + p.name) && isBarrierOrSpf(p));

  const amDynamicSteps = [
    amCleanse ? (isBpo(amCleanse) ? `Morning Clarifying Wash (${fmtProd(amCleanse)} · Rinse Well)` : `Gentle Morning Cleanse (${fmtProd(amCleanse)})`) : 'Gentle Morning Cleanse (Lukewarm Water or Micellar Rinse)',
    amSerum ? `Morning Antioxidant & Hydration (${fmtProd(amSerum)})` : (bpoProd && !isWash(bpoProd) && pmRetin ? `Morning Blemish Layer (${fmtProd(bpoProd)} · Spaced from PM Retinoid)` : 'Hydrating Mist or Vitamin C Serum (On Damp Skin)'),
    amShield ? `Barrier Seal & Sun Protection (${fmtProd(amShield)}${/spf|sun/i.test(amShield.category + amShield.name) ? '' : ' + SPF 50'})` : 'Barrier Seal & Sun Protection (Ceramide Cream + Broad-Spectrum SPF 50)'
  ];
  const amStepsHtml = amDynamicSteps.map((stepTitle, idx) => `
    <div style="padding:8px 11px;background:var(--bg-surface);display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;min-width:0;">
      <div style="min-width:0;font-size:0.84rem;line-height:1.36;"><strong style="color:var(--text-primary);">${idx + 1}. ${escapeHtml(stepTitle)}</strong></div>
      <span class="mono" style="font-size:0.76rem;padding:2px 7px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:500;flex-shrink:0;white-space:nowrap;">${idx === 0 ? 'Step 1' : idx === 1 ? 'Wait 60s' : 'SPF 50'}</span>
    </div>`).join('');

  const cMode = String(res.climateMode || 'indoor_dry');
  const pmStep2Text = cMode === 'pregnancy_nursing'
    ? `Pregnancy-Safe Renewal (Swap Retinoids for Azelaic Acid 15% or ${pmPept ? fmtProd(pmPept) : 'Bakuchiol Peptide Serum'})`
    : cMode === 'retinoid_retinization'
      ? `Retinoid Purge Sandwich (${pmRetin ? fmtProd(pmRetin) : 'Pea-Sized Retinoid'} · Wait 15m After Cleanse + Buffer over Ceramide Cream)`
      : (pmRetin ? `Active Renewal Layer (${fmtProd(pmRetin)}${bpoProd ? ' · Buffer with Moisturizer' : ''})` : (pmPept ? `Night Peptide & Barrier Serum (${fmtProd(pmPept)})` : 'Active Renewal Layer (Pea-Sized Retinoid or Peptide Serum)'));
  const pmDynamicSteps = [
    pmExfol ? `Evening Cleanse & Night 1 Exfoliation (${fmtProd(pmExfol)})` : (amCleanse && isBpo(amCleanse) ? `Gentle Evening Cleanse (Non-Medicated Wash · Keep ${amCleanse.brand} in AM)` : 'Gentle Evening Cleanse (Micellar Water or Hydrating Cleanser)'),
    pmStep2Text,
    `Ceramide Barrier Cushion (${pmCream ? fmtProd(pmCream) : '3:1:1 Ceramide Recovery Cream'})`
  ];
  const pmStepsHtml = pmDynamicSteps.map((nightStep, idx) => `
    <div style="padding:8px 11px;background:rgba(244,239,232,0.08);display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;min-width:0;">
      <div style="min-width:0;font-size:0.84rem;line-height:1.36;color:#F4EFE8;"><strong>${idx + 1}. ${escapeHtml(nightStep)}</strong></div>
      <span class="mono" style="font-size:0.76rem;padding:2px 7px;background:#7A2332;color:#F4EFE8;font-weight:500;flex-shrink:0;white-space:nowrap;">${idx === 0 ? (pmExfol ? 'Night 1' : 'Cleanse') : idx === 1 ? 'Night 2' : 'Seal'}</span>
    </div>`).join('');

  const poreCount = res.comedogenicFlags.length;
  const topPoreName = poreCount > 0 ? String(res.comedogenicFlags[0].commonName || res.comedogenicFlags[0].inciName).split('(')[0].trim() : '';
  const poreSummaryText = poreCount === 0 ? 'Pore-Safe (0 Clogging Oils)' : `Pore Alert: ${poreCount} Flagged (${topPoreName})`;
  const n1Label = pmExfol ? 'Night 1 · Polish' : 'Night 1 · Renew';
  const n1Val = pmExfol ? fmtProd(pmExfol) : (pmRetin ? fmtProd(pmRetin) : 'Gentle Acid Toner');
  const n2Label = pmExfol ? 'Night 2 · Renew' : 'Night 2 · Soothe & Rest';
  const n2Val = pmExfol ? (pmRetin ? fmtProd(pmRetin) : 'Pea-Sized Retinoid') : (pmCream ? `${fmtProd(pmCream)} (Recovery)` : 'Ceramide Barrier Cream');
  const n3Label = pmExfol ? 'Night 3 · Soothe' : 'Night 3 · Renew';
  const n3Val = pmExfol ? (pmPept ? fmtProd(pmPept) : (pmCream ? `${fmtProd(pmCream)} (Rest)` : 'Hydrating / Peptide Serum')) : (pmRetin ? fmtProd(pmRetin) : (pmPept ? fmtProd(pmPept) : 'Hydrating Serum'));
  const n4Val = pmCream ? fmtProd(pmCream) : 'Ceramide Barrier Cream';

  const conflictCount = (res.conflicts || []).length;
  const wastedUsd = res.wastedShelfValueUsd || 0;

  return `
    <div class="porcelain-vessel-core" style="height:100%;display:flex;flex-direction:column;justify-content:flex-start;gap:14px;min-width:0;">
      <div style="min-width:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
          <span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">Step 2 of 2 &middot; Your Guided Routine</span>
          <button type="button" class="mono" onclick="if(window.__dlOpenVanityDrawer)window.__dlOpenVanityDrawer('results_top')" style="padding:3px 10px;background:var(--rose-pill-bg);color:var(--rose-brand);border:1px solid var(--rose-pill-border);font-size:0.76rem;font-weight:600;cursor:pointer;">Customize in 5-Slot Bag &rarr;</button>
        </div>
        ${renderPersonalizedResultsHeaderHtml(res)}
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:6px;">
          <span class="${badgeClass} mono" style="font-size:0.8rem;">${escapeHtml(topVerdictText)}</span>
          <span class="mono" style="font-size:0.8rem;color:var(--text-secondary);">${escapeHtml(poreSummaryText)}</span>
        </div>

        <div class="score-strip">
          <div class="metric-box" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">Verdict</div>
            <div class="serif-display" style="font-size:1.25rem;font-weight:500;color:${scoreColor};line-height:1.15;margin-top:2px;" id="compatibilityScoreValue">${isCritical ? 'Clash Found' : isWarn ? 'Space Apart' : 'Calm & Safe'}</div>
            <div style="font-size:0.76rem;color:var(--text-secondary);margin-top:2px;">${res.conflicts.length === 0 ? 'Smooth layers' : `${res.conflicts.length} bottle ${res.conflicts.length === 1 ? 'clash' : 'clashes'}`}</div>
          </div>
          <div class="metric-box" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">Barrier Feel</div>
            <div class="metric-val" style="color:${res.barrierHazardIndex > 50 ? 'var(--berry-clash)' : 'var(--sage-safe)'};font-size:1.25rem;margin-top:2px;">${res.barrierHazardIndex > 50 ? 'High Tingle' : 'Gentle'}</div>
            <div style="font-size:0.76rem;color:var(--text-secondary);margin-top:2px;">${res.barrierHazardIndex > 50 ? 'Split AM & PM' : 'Calm barrier'}</div>
          </div>
          <div class="metric-box" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">Value Protected</div>
            <div class="metric-val" style="color:${isCritical ? 'var(--berry-clash)' : (res.wastedShelfValueUsd || 0) > 0 ? 'var(--honey-warn)' : 'var(--sage-safe)'};font-size:1.25rem;margin-top:2px;" id="wastedShelfValueReadout">$${res.wastedShelfValueUsd || 0}<span style="font-size:0.78rem;color:var(--text-secondary);">/$${res.totalShelfValueUsd || 248}</span></div>
            <div style="font-size:0.76rem;color:var(--text-secondary);margin-top:2px;">${isCritical ? 'Saved by split' : '100% absorbed'}</div>
          </div>
        </div>

        <div id="beforeAfterSplitBar" style="display:flex;flex-direction:column;gap:8px;padding:11px 13px;border-radius:18px;background:var(--bg-canvas);margin-bottom:10px;min-width:0;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <span id="beforeAfterStatusText" style="font-size:0.81rem;color:var(--text-secondary);"><strong style="color:var(--sage-safe);">Fixed AM/PM Split</strong> &middot; 98.4% Active Bioavailability Protected ($0 Wasted)</span>
            <div class="vanity-light-pill" role="group" aria-label="Compare Before Clashing Stack vs After Fixed Split" style="padding:3px;gap:3px;flex-wrap:wrap;">
              <button type="button" id="btnViewFixedSplit" class="vanity-light-btn active mono" style="font-size:0.75rem;padding:4px 8px;min-height:26px;" aria-pressed="true" onclick="window.__dlToggleBeforeAfter('fixed', this)">Fixed Split (98.4% Potency)</button>
              <button type="button" id="btnViewClashingStack" class="vanity-light-btn mono" style="font-size:0.75rem;padding:4px 8px;min-height:26px;" aria-pressed="false" onclick="window.__dlToggleBeforeAfter('clash', this)">Unfixed (${conflictCount} ${conflictCount === 1 ? 'Clash' : 'Clashes'} &middot; -$${wastedUsd}/yr)</button>
            </div>
          </div>
          <div style="height:7px;border-radius:999px;background:var(--bg-oat);overflow:hidden;" title="Active Serum Potency & Sunk-Cost Preservation Meter"><div id="dl-potency-meter-fill" style="width:98%;height:100%;border-radius:999px;background:linear-gradient(90deg, var(--rose-brand) 0%, #10B981 100%);transition:width 260ms ease;"></div></div>
          <div id="dl-postscan-conversion-strip" style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding-top:2px;">
            <span style="font-size:0.78rem;color:var(--text-secondary);"><strong class="mono" style="color:var(--text-primary);">Sunk-Cost Protected ($${wastedUsd || 184}/yr):</strong> Separates <span style="color:var(--sage-safe);font-weight:600;">7:30 AM</span> &amp; <span style="color:var(--rose-brand);font-weight:600;">9:30 PM</span> actives so zero dropper potency is neutralized.</span>
            <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <button type="button" class="btn-secondary mono" onclick="window.__dlSwitchResultStep(2)" style="padding:4px 10px;min-height:26px;font-size:0.74rem;background:var(--rose-pill-bg);color:var(--rose-brand);">See AM &amp; PM Order &rarr;</button>
              <a href="/api/affiliate?product=${escapeHtml((pmCream && pmCream.id) || (matchedProds[0] && matchedProds[0].id) || 'aestura-atobarrier-365')}&amp;partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="padding:4px 9px;font-size:0.73rem;white-space:nowrap;" data-no-bag-inject="1">Check ${escapeHtml((pmCream && pmCream.brand) || (matchedProds[0] && matchedProds[0].brand) || 'Aestura')} ($${(pmCream && pmCream.priceUsd) || (matchedProds[0] && matchedProds[0].priceUsd) || 32}) &nearr;</a>
            </div>
          </div>
        </div>

        <!-- Slow-Paced 3-Step Journey Switcher -->
        <div id="dl-results-step-bar" role="tablist" aria-label="3-Step Routine Guide" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;background:var(--bg-oat);padding:4px;margin-bottom:12px;">
          <button type="button" id="dl-res-tab-1" class="vanity-light-btn active mono" style="padding:8px 6px;font-size:0.78rem;text-align:center;" onclick="window.__dlSwitchResultStep(1)">1 &middot; Clash Check</button>
          <button type="button" id="dl-res-tab-2" class="vanity-light-btn mono" style="padding:8px 6px;font-size:0.78rem;text-align:center;" onclick="window.__dlSwitchResultStep(2)">2 &middot; AM &amp; PM Order</button>
          <button type="button" id="dl-res-tab-3" class="vanity-light-btn mono" style="padding:8px 6px;font-size:0.78rem;text-align:center;" onclick="window.__dlSwitchResultStep(3)">3 &middot; 4-Night &amp; Card</button>
        </div>

        <!-- Step 1: Clash Check -->
        <div id="dl-res-step-1" style="display:flex;flex-direction:column;gap:12px;">
          <div id="conflictsListArea">${conflictsHtml}</div>
          <button type="button" id="dl-btn-next-step-2" class="btn-primary" style="width:100%;justify-content:center;padding:12px 18px;" onclick="window.__dlSwitchResultStep(2)">
            <span>Next: See Your Fixed Morning &amp; Bedtime Order (Step 2 of 3)</span>
            <span class="btn-icon-circle">&rarr;</span>
          </button>
        </div>

        <!-- Step 2: Morning & Bedtime Order -->
        <div id="dl-res-step-2" style="display:none;flex-direction:column;gap:12px;min-width:0;"><span id="walletConflicts" style="display:none;"></span>
          ${renderPersonaInteractiveWorkbenchAddons().liveWaitTimerHtml}
          <div style="display:grid;grid-template-columns:1fr;gap:12px;width:100%;min-width:0;" id="appleWalletCardPreview">
            <div style="padding:16px 18px;background:var(--bg-canvas);display:flex;flex-direction:column;justify-content:space-between;min-width:0;position:relative;overflow:hidden;">
              <div style="position:relative;z-index:1;min-width:0;">
                <div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <span class="mono" style="display:inline-flex;align-items:center;gap:5px;font-size:0.8rem;font-weight:600;color:var(--honey-warn);">☀ 7:30 AM &middot; Morning Order</span>
                  <span class="mono" style="font-size:0.75rem;color:var(--text-secondary);">Thinnest to Richest</span>
                </div>
                ${amStepsHtml}
              </div>
            </div>

            <div style="padding:16px 18px;border-radius:18px;background:#3A1F27;color:#FDF8F6;display:flex;flex-direction:column;justify-content:space-between;min-width:0;position:relative;overflow:hidden;">
              <div style="position:relative;z-index:1;min-width:0;">
                <div style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                  <span class="mono" style="display:inline-flex;align-items:center;gap:5px;font-size:0.8rem;font-weight:600;color:#F7DFAD;">☾ 9:30 PM &middot; Bedtime Order</span>
                  <span class="mono" style="font-size:0.75rem;color:#EED6DC;">Overnight Renewal</span>
                </div>
                ${pmStepsHtml}
              </div>
              <button type="button" class="btn-primary" style="width:100%;font-size:0.84rem;padding:10px 14px;margin-top:8px;background:#F3E1E5;color:#3A1F27;white-space:normal;text-align:center;" onclick="openCheckoutModal('onetime_499')">
                <span>Save Complete Morning &amp; Night Routine Kit ($1.99 / $4.99)</span>
                <span class="btn-icon-circle">&rarr;</span>
              </button>
            </div>
          </div>
          <button type="button" id="dl-btn-next-step-3" class="btn-secondary" style="width:100%;justify-content:center;padding:11px 16px;" onclick="window.__dlSwitchResultStep(3)">
            <span>Next: 4-Night Cycle &amp; 9:16 Phone Card (Step 3 of 3) &rarr;</span>
          </button>
        </div>

        <!-- Step 3: 4-Night Rotation & 9:16 Phone Card -->
        <div id="dl-res-step-3" style="display:none;flex-direction:column;gap:12px;min-width:0;">
          ${renderBeforeAfterAndCanvasFooterHtml(res, n1Label, n1Val, n2Label, n2Val, n3Label, n3Val, n4Val)}
        </div>
      </div>
    </div>
  `;
}

const CLIENT_SCRIPT = `
  window.__DERMLOGIC_LAST_RESULT = null;
  window.__dlSwitchResultStep = function(stepNum) {
    [1, 2, 3].forEach(function(n) {
      var tab = document.getElementById('dl-res-tab-' + n), pnl = document.getElementById('dl-res-step-' + n);
      if (tab) tab.classList.toggle('active', n === stepNum);
      if (pnl) pnl.style.display = (n === stepNum) ? 'flex' : 'none';
    });
    if (stepNum === 3 && window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas();
  };
  function getUtmParams() {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get('utm_source') || sessionStorage.getItem('dl_utm_source') || 'direct',
      utm_medium: p.get('utm_medium') || sessionStorage.getItem('dl_utm_medium') || 'organic',
      utm_campaign: p.get('utm_campaign') || sessionStorage.getItem('dl_utm_campaign') || 'day1_launch',
      utm_content: p.get('utm_content') || '',
      utm_term: p.get('utm_term') || ''
    };
  }
  function fireMetaCapiEvent(eventName, valueUsd, customData) {
    const utm = getUtmParams();
    sessionStorage.setItem('dl_utm_source', utm.utm_source);
    sessionStorage.setItem('dl_utm_medium', utm.utm_medium);
    sessionStorage.setItem('dl_utm_campaign', utm.utm_campaign);
    const eventId = 'dl_' + eventName.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
    fetch('/api/meta-capi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_id: eventId, event_name: eventName, source_url: window.location.href,
        value: valueUsd || 0, currency: 'USD', ...utm, custom_data: customData || {}
      })
    }).catch(() => {});
  }
  function toggleProductChip(checkbox) {
    const label = checkbox.closest('.prod-check-item');
    if (label) {
      label.classList.toggle('selected', checkbox.checked);
      const pill = label.querySelector('span.mono');
      if (pill) {
        pill.textContent = checkbox.checked ? '✓ In Bag' : '+ Vanity Bag';
        pill.style.background = checkbox.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
        pill.style.color = checkbox.checked ? 'var(--accent-ink)' : 'var(--rose-brand)';
      }
    }
    runRoutineAnalysis();
  }
  window.__dlActiveTexGroup = 'all';
  function applyShelfFilters() {
    const group = window.__dlActiveTexGroup || 'all';
    const q = ((document.getElementById('productFilterInput') || {}).value || '').toLowerCase().trim();
    let vis = 0;
    document.querySelectorAll('#productSelectorGrid .prod-check-item').forEach((el) => {
      const g = el.getAttribute('data-tex-group') || 'all';
      const gOk = group === 'all' || g === group;
      const hay = (el.getAttribute('data-search') || el.textContent).toLowerCase();
      const qOk = !q || hay.includes(q);
      const show = gOk && qOk;
      el.style.display = show ? 'flex' : 'none';
      if (show) vis++;
    });
    const emptyEl = document.getElementById('shelfEmptyState');
    if (emptyEl) emptyEl.style.display = vis === 0 ? 'block' : 'none';
    const badge = document.getElementById('shelfCountBadge');
    const labels = { all: 'Popular Bottles', toner_acid: 'Toners & Acids', active_serum: 'Serums', cream_retinol: 'Creams & Retinol' };
    if (badge) badge.textContent = vis + ' ' + (labels[group] || 'Bottles');
  }
  function filterShelfByTexture(group, btn) {
    window.__dlActiveTexGroup = group;
    document.querySelectorAll('#textureFilterTabs .vanity-light-btn').forEach((b) => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
    if (btn) { btn.classList.add('active'); btn.setAttribute('aria-pressed', 'true'); }
    applyShelfFilters();
  }
  function filterProductList() { applyShelfFilters(); }
  function applyPreset(presetId) {
    const map = { 'copper-vitc-trap': 'copper-vitc-oxidation', 'acne-rx-clash': 'acne-rx-bpo-tretinoin', 'tiktok-viral-clash': 'viral-tiktok-destroyer', 'barrier-safe-gold': 'glass-skin-recovery' };
    const btn = document.querySelector('[data-preset-id="' + (map[presetId] || presetId) + '"]');
    if (btn) applyRoutinePreset(btn);
  }
  function applyRoutinePreset(btn) {
    document.querySelectorAll('#presetButtonsRow .preset-chip').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const productIds = JSON.parse(btn.getAttribute('data-products') || '[]');
    const skin = btn.getAttribute('data-skin') || 'combination';
    const skinSelect = document.getElementById('skinTypeSelect');
    if (skinSelect) skinSelect.value = skin;
    const grid = document.getElementById('productSelectorGrid');
    document.querySelectorAll('input[name="routineProduct"]').forEach((cb) => {
      cb.checked = productIds.includes(cb.value);
      const lbl = cb.closest('.prod-check-item');
      if (lbl) {
        lbl.classList.toggle('selected', cb.checked);
        const pill = lbl.querySelector('span.mono');
        if (pill) {
          pill.textContent = cb.checked ? '✓ In Bag' : '+ Vanity Bag';
          pill.style.background = cb.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
          pill.style.color = cb.checked ? 'var(--accent-ink)' : 'var(--rose-brand)';
        }
        if (cb.checked && grid) grid.prepend(lbl);
      }
    });
    if (grid) grid.scrollTop = 0;
    if (window.__dlSyncVanityFromCheckboxes) window.__dlSyncVanityFromCheckboxes();
    runRoutineAnalysis(btn.getAttribute('data-preset-id'));
  }
  function pasteSampleComedogenicInci() {
    const el = document.getElementById('rawInciTextarea');
    if (el) { el.value = 'Aqua, Ascorbic Acid 15%, Copper Tripeptide-1, Glycolic Acid 7%, Isopropyl Myristate, Cocos Nucifera Oil, Polysorbate 20, Niacinamide, Ceramide NP'; runRoutineAnalysis(); }
  }
  function clearRoutineSelection() {
    document.querySelectorAll('input[name="routineProduct"]').forEach((cb) => {
      cb.checked = false;
      const lbl = cb.closest('.prod-check-item');
      if (lbl) {
        lbl.classList.remove('selected');
        const pill = lbl.querySelector('span.mono');
        if (pill) { pill.textContent = '+ Vanity Bag'; pill.style.background = 'var(--bg-oat)'; pill.style.color = 'var(--rose-brand)'; }
      }
    });
    const el = document.getElementById('rawInciTextarea');
    if (el) el.value = '';
    if (window.__dlSyncVanityFromCheckboxes) window.__dlSyncVanityFromCheckboxes(true);
    runRoutineAnalysis();
  }
  async function runRoutineAnalysis(presetSlug, isExplicitClick) {
    const checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map((cb) => cb.value);
    const clrBtn = document.getElementById('topClearShelfBtn');
    if (clrBtn) { clrBtn.style.display = checked.length ? 'inline-block' : 'none'; clrBtn.innerHTML = 'Clear ' + checked.length + ' Selected &times;'; }
    const skinType = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
    const rawInciText = (document.getElementById('rawInciTextarea') || {}).value || '';
    const shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim();
    const climateMode = window.__dlClimateMode || 'indoor_dry';
    try {
      const u = new URL(window.location.href);
      if (presetSlug) u.searchParams.set('preset', presetSlug);
      u.searchParams.set('skin', skinType);
      if (checked.length) u.searchParams.set('products', checked.join(',')); else u.searchParams.delete('products');
      if (rawInciText.trim()) u.searchParams.set('inci', rawInciText.trim().slice(0, 160)); else u.searchParams.delete('inci');
      window.history.replaceState({}, '', u.pathname + u.search);
    } catch (_) {}
    const btn = document.getElementById('analyzeBtn');
    if (btn) btn.innerHTML = '<span>Checking Shelf Harmony...</span><span class="btn-icon-circle">&rarr;</span>';
    try {
      const resp = await fetch('/api/analyze-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skinType, productIds: checked, rawInciText, shelfName, climateMode, renderHtml: true })
      });
      const data = await resp.json();
      window.__DERMLOGIC_LAST_RESULT = data;
      const container = document.getElementById('liveResultsContainer');
      if (container && data.renderedHtml) container.innerHTML = data.renderedHtml;
      const fbBox = document.getElementById('rawInciFeedbackBox');
      const pCard = container ? container.querySelector('#pastedInciCard') : null;
      if (fbBox) fbBox.innerHTML = pCard ? pCard.outerHTML : '';
      if (window.__dlAfterRoutineAnalysis) window.__dlAfterRoutineAnalysis(data, Boolean(isExplicitClick));
      if (window.__dlRefreshPageAddButtons) window.__dlRefreshPageAddButtons();
      fireMetaCapiEvent('Lead', 0, { compatibilityScore: data.compatibilityScore, conflictsCount: (data.conflicts || []).length });
    } catch (e) {
      console.error('Routine analysis error:', e);
      if (btn) btn.innerHTML = '<span>Check My Bathroom Shelf</span><span class="btn-icon-circle">&rarr;</span>';
    } finally {
      if (btn && !isExplicitClick) btn.innerHTML = '<span>Check My Bathroom Shelf</span><span class="btn-icon-circle">&rarr;</span>';
    }
  }
  function openCheckoutModal(planId) {
    selectCheckoutPlan(planId || 'onetime_499');
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'flex';
    const emailEl = document.getElementById('checkoutEmailInput');
    if (emailEl) setTimeout(() => emailEl.focus(), 40);
    fireMetaCapiEvent('StartTrial', planId === 'annual_1999' ? 19.99 : 4.99, { planId });
  }
  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'none';
  }
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') closeCheckoutModal();
  });
  function selectCheckoutPlan(planId) {
    const hidden = document.getElementById('checkoutPlanId');
    if (hidden) hidden.value = planId;
    const p499 = document.getElementById('planOption499');
    const p1999 = document.getElementById('planOption1999');
    const btn = document.getElementById('checkoutSubmitBtn');
    if (planId === 'annual_1999') {
      if (p499) p499.classList.remove('selected');
      if (p1999) p1999.classList.add('selected');
      if (btn) btn.innerHTML = '<span>Complete Plan Checkout ($19.99/yr) &rarr;</span>';
    } else {
      if (p499) p499.classList.add('selected');
      if (p1999) p1999.classList.remove('selected');
      if (btn) btn.innerHTML = '<span>Complete Plan Checkout ($4.99) &rarr;</span>';
    }
  }
  async function submitSelfServeCheckout(ev) {
    ev.preventDefault();
    const planId = (document.getElementById('checkoutPlanId') || {}).value || 'onetime_499';
    const email = (document.getElementById('checkoutEmailInput') || {}).value || 'patient@dermlogic.io';
    const website_hp = (document.getElementById('checkoutHoneypot') || {}).value || '';
    const btn = document.getElementById('checkoutSubmitBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span>Preparing Ritual Pass...</span>'; }
    try {
      const resp = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, email, website_hp, routineSummary: window.__DERMLOGIC_LAST_RESULT || {} })
      });
      const res = await resp.json();
      const box = document.getElementById('checkoutSuccessBox');
      if (!resp.ok || !res || !res.order) {
        if (box) { box.style.display = 'block'; box.textContent = (res && res.error) || 'Unable to prepare checkout right now. Please try again.'; }
        return;
      }
      const safeOrderId = String(res.order.order_id || '').replace(/[<>"'&]/g, '');
      const safeMsg = String(res.message || '').replace(/[<>"'&]/g, '');
      const safeDl = String(res.downloadUrl || '/buy/complete_dossier').replace(/[<>"']/g, '');
      if (box) {
        box.style.display = 'block';
        box.innerHTML = '<strong>Order ' + safeOrderId + ' Ready:</strong> ' + safeMsg + ' <br/><a href="' + safeDl + '" class="mono" style="font-size:0.84rem;color:var(--rose-brand);text-decoration:underline;font-weight:500;">Proceed to Stripe Checkout / Download (' + safeDl + ') &rarr;</a>';
      }
      fireMetaCapiEvent('Purchase', (res.order.amount_cents || 499) / 100, { order_id: safeOrderId, plan_id: planId });
      if (!navigator.webdriver && safeDl.startsWith('https://checkout.stripe.com')) window.location.href = safeDl;
    } catch (e) {
      console.error('Checkout error:', e);
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = '<span>Ritual Pass Ready</span>'; }
    }
  }
  function setCookieConsent(choice) {
    localStorage.setItem('dermlogic_cookie_consent', choice);
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
  }
  function setAtelierVanityLight(mode, btn) {
    const isNight = mode === 'night' || mode === 'warm';
    document.body.classList.toggle('vanity-night', isNight);
    document.documentElement.setAttribute('data-theme', isNight ? 'night' : 'day');
    try { localStorage.setItem('dermlogic_vanity_theme', isNight ? 'night' : 'day'); } catch (_) {}
    document.querySelectorAll('#vanityLightToggle .vanity-light-btn').forEach((b) => {
      const bMode = b.getAttribute('data-theme-mode');
      const active = isNight ? bMode === 'night' : bMode === 'day';
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    if (btn && btn.closest('#vanityLightToggle')) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
    const heroBtn = document.querySelector('#heroRitualToggleBar .vanity-light-btn[data-ritual-mode="' + (isNight ? 'pm' : 'am') + '"]');
    setHeroRitualMode(isNight ? 'pm' : 'am', heroBtn);
  }
  function setHeroRitualMode(mode, btn) {
    const map = {
      am: { img1: '/public/editorial-woman-morning.jpg', alt: 'Woman in linen robe applying morning Vitamin C serum at a sunlit travertine vanity', pos: 'center 22%', title: '7:30 AM · Morning Shield & Zero-Pilling Prep', sub: 'Vitamin C (Wait 60s) · Hydrating Serum · Barrier Cream · Broad-Spectrum SPF 50', badge: 'Morning Glow Order', badgeClass: 'badge-safe mono' },
      pm: { img1: '/public/editorial-woman-evening.jpg', alt: 'Woman applying evening ceramide recovery cream by warm candlelight', pos: 'center 20%', title: '9:30 PM · Bedtime Renewal & Ceramide Cushion', sub: 'Oil-to-Milk Cleanse · Dry-Skin Retinoid or Peptide · 3:1:1 Ceramide Barrier Seal', badge: 'Bedtime Recovery', badgeClass: 'badge-safe mono' },
      clash: { img1: '/public/editorial-segment-2.jpg', alt: 'Close-up of woman inspecting active dropper bottle to prevent pH serum clash', pos: 'center 18%', title: 'Why $182 Serums Cancel on Contact', sub: 'Pure Vitamin C (pH 3.2) + Copper Peptides or Retinol + Benzoyl Peroxide deactivate each other', badge: 'Separate AM & PM', badgeClass: 'badge-clash mono' }
    };
    const cfg = map[mode] || map.am, tEl = document.getElementById('heroDiptychTitle'), sEl = document.getElementById('heroDiptychSub'), bEl = document.getElementById('heroDiptychBadge'), i1 = document.getElementById('heroDiptychImg1');
    if (tEl) tEl.textContent = cfg.title;
    if (sEl) sEl.textContent = cfg.sub;
    if (bEl) { bEl.textContent = cfg.badge; bEl.className = cfg.badgeClass; }
    if (i1) { i1.src = cfg.img1; i1.alt = cfg.alt; i1.style.objectPosition = cfg.pos; }
    document.querySelectorAll('#heroRitualToggleBar .vanity-light-btn').forEach((b) => {
      const active = b === btn || b.getAttribute('data-ritual-mode') === mode;
      b.classList.toggle('active', active);
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }
  function startViscosityTimer(seconds, btn) {
    if (!btn || btn.dataset.running === '1') return;
    btn.dataset.running = '1';
    btn.classList.add('running');
    let rem = Number(seconds) || 45;
    const orig = btn.textContent;
    btn.textContent = rem + 's absorbing...';
    const iv = setInterval(() => {
      rem -= 1;
      if (rem <= 0) {
        clearInterval(iv);
        btn.dataset.running = '0';
        btn.classList.remove('running');
        btn.textContent = 'Ready for next layer';
        setTimeout(() => { btn.textContent = orig; }, 3500);
      } else {
        btn.textContent = rem + 's absorbing...';
      }
    }, 1000);
  }
  window.addEventListener('DOMContentLoaded', () => {
    try {
      const savedTheme = localStorage.getItem('dermlogic_vanity_theme');
      if (savedTheme === 'night') {
        setAtelierVanityLight('night');
      }
    } catch (_) {}
    if (!localStorage.getItem('dermlogic_cookie_consent')) {
      const banner = document.getElementById('cookieBanner');
      if (banner) banner.style.display = 'block';
    }
    if (window.__dlRestoreShelfStateOnBoot) window.__dlRestoreShelfStateOnBoot();
    fireMetaCapiEvent('ViewContent', 0, { path: window.location.pathname });
  });
  ${ENDOWMENT_CLIENT_SCRIPT}
  ${ATELIER_VANITY_CLIENT_SCRIPT}
`;

module.exports = {
  escapeHtml,
  BRAND_LOGO_SVG,
  SHARED_CSS,
  CLIENT_SCRIPT,
  renderHeader,
  renderFooter,
  renderInteractiveCheckerWidget,
  renderAnalysisResultHtml
};
