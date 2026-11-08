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
    --bg-canvas: #FCFAF7; --bg-oat: #F6F1EB; --bg-pouch: #EEE7DE; --bg-surface: #FFFFFF; --bg-porcelain: #FFFFFF;
    --bg-empty-slot: #EAE3D9; --bg-empty-slot-active: #DFD7CC; --text-empty-slot: #57514B;
    --bg-pouch-card: #FFFFFF; --text-pouch-card: #0F172A; --sub-pouch-card: #166534;
    --bg-deep: #0F172A; --ink-on-deep: #FCFAF7; --border-hairline: #E8E0D5; --border-strong: #D6CBC0;
    --text-primary: #0F172A; --text-secondary: #475569; --text-muted: #64748B;
    --rose-brand: #B43444; --rose-brand-hover: #982836; --accent-ink: #FFFFFF; --rose-pill-bg: #FDF2F4; --rose-pill-border: #F9CDD5;
    --sage-safe: #166534; --sage-bg: #F0FDF4; --sage-border: #BBF7D0;
    --honey-warn: #B45309; --honey-bg: #FFFBEB; --honey-border: #FDE68A;
    --berry-clash: #BE123C; --berry-bg: #FFF1F2; --berry-border: #FECDD3;
    --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    --margin: 5vw; --step-small: clamp(0.875rem, 0.82rem + 0.15vw, 0.9375rem); --step-body: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
    --step-lead: clamp(1.25rem, 1.12rem + 0.55vw, 1.625rem); --step-head: clamp(2rem, 1.45rem + 2.4vw, 3.35rem); --step-hero: clamp(3.5rem, 7.4vw, 6.85rem);
    --radius-shell: 28px; --radius-card: 22px; --radius-input: 999px; --radius-pill: 999px; --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  }
  body.vanity-night, html[data-theme="night"] body {
    --bg-canvas: #121113; --bg-oat: #1C1A1E; --bg-pouch: #262429; --bg-surface: #1E1C21; --bg-porcelain: #2A272E;
    --bg-empty-slot: #1A181C; --bg-empty-slot-active: #2C2830; --text-empty-slot: #BDB5AB;
    --bg-pouch-card: #1E1C21; --text-pouch-card: #FAF8F5; --sub-pouch-card: #88C9A8;
    --bg-deep: #0D0C0E; --ink-on-deep: #FAF8F5; --border-hairline: #2E2B33; --border-strong: #44404C;
    --text-primary: #FAF8F5; --text-secondary: #D4CDC5; --text-muted: #9E968D;
    --rose-brand: #E89E92; --rose-brand-hover: #F2B2A7; --accent-ink: #121113; --rose-pill-bg: #382422; --rose-pill-border: #523532;
    --sage-safe: #88C9A8; --sage-bg: #15291E; --sage-border: #234733;
    --honey-warn: #E8B98A; --honey-bg: #302217; --honey-border: #4D3725;
    --berry-clash: #E89E92; --berry-bg: #382422; --berry-border: #523532;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
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
  .affiliate-link-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 999px; background: var(--bg-canvas); color: var(--text-primary); border: 1px solid var(--border-hairline); font-size: 0.84rem; font-weight: 600; text-decoration: none; transition: background 180ms ease-out, color 180ms ease-out, border-color 180ms ease-out; }
  .affiliate-link-pill:hover { background: var(--rose-pill-bg); color: var(--rose-brand); border-color: var(--rose-pill-border); }
  .affiliate-micro-link { display: inline-block; margin-top: 4px; font-size: 0.82rem; font-weight: 500; color: var(--sage-safe); text-decoration: underline; text-underline-offset: 3px; }
  .affiliate-micro-link:hover { color: var(--rose-brand); }
  /* Hero: Uneven Editorial Gallery & Nocturnal Plinth */
  .hero-section { padding: 6px 0 12px; }
  .editorial-top-banner { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 16px; align-items: stretch; margin-bottom: 10px; }
  .hero-copy-col { min-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
  .hero-photo-col { min-width: 0; display: flex; flex-direction: column; }
  .hero-h1 { font-family: 'Newsreader', Georgia, serif; font-size: clamp(2rem, 3.3vw, 2.95rem); font-weight: 400; line-height: 0.98; letter-spacing: -0.035em; color: var(--text-primary); margin-bottom: 6px; }
  .hero-h1-line1 { display: block; }
  .hero-h1-line2 { display: block; padding-left: 0; }
  .hero-sub { color: var(--text-secondary); font-size: clamp(0.95rem, 0.92rem + 0.18vw, 1.05rem); line-height: 1.38; max-width: 58ch; margin-bottom: 8px; }
  .editorial-photo-shell { background: var(--bg-oat); border-radius: 24px; padding: 10px 14px; position: relative; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .editorial-photo-inner { overflow: hidden; border-radius: 16px; position: relative; min-height: 148px; max-height: 172px; height: 100%; flex: 1; background: var(--bg-porcelain); }
  .editorial-photo-inner img { width: 100%; height: 100%; object-fit: cover; display: block; transition: opacity 180ms ease-out; }
  .editorial-photo-diptych { display: flex; flex-direction: column; min-height: 148px; max-height: 172px; height: 100%; flex: 1; }
  .editorial-photo-diptych .editorial-photo-inner { height: 100%; flex: 1; }
  #eb-hero-trust-strip { display: none !important; }
  .vessel-photo-frame { background: var(--bg-oat); border-radius: 18px; overflow: hidden; padding: 0; margin-bottom: 14px; }
  .vessel-photo-frame img { width: 100%; height: 172px; object-fit: cover; display: block; }
  .editorial-photo-caption { margin-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: var(--step-small); color: var(--text-secondary); }
  /* Interactive Shelf Audit Workbench ([data-ui]) */
  .hero-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 24px; align-items: start; }
  .grader-card { background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: 28px; padding: 24px; min-width: 0; max-width: 100%; overflow: hidden; box-shadow: 0 4px 20px -4px rgba(21,20,23,0.05); }
  .results-panel { background: var(--bg-oat); border: 1px solid var(--border-hairline); border-radius: 28px; padding: 24px; min-width: 0; max-width: 100%; overflow: hidden; box-shadow: 0 4px 20px -4px rgba(21,20,23,0.05); }
  .porcelain-vessel-core { background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: 22px; padding: 22px 24px; width: 100%; display: flex; flex-direction: column; justify-content: flex-start; gap: 14px; min-width: 0; max-width: 100%; overflow: hidden; box-shadow: 0 2px 12px -2px rgba(21,20,23,0.04); }
  #textureFilterTabs { display: grid !important; grid-template-columns: repeat(6, minmax(0, 1fr)) !important; gap: 4px !important; width: 100%; background: var(--bg-oat); padding: 4px; border-radius: 999px; }
  #textureFilterTabs .vanity-light-btn { padding: 6px 4px !important; font-size: 0.76rem !important; white-space: nowrap !important; line-height: 1.2 !important; text-align: center; min-width: 0; width: 100%; border-radius: 999px; min-height: 28px; }
  .shelf-search-row { display: grid; grid-template-columns: minmax(0, 1.3fr) minmax(0, 0.7fr); gap: 8px; align-items: center; }
  .shelf-search-row .input-box { min-width: 0; overflow: hidden; text-overflow: ellipsis; border-radius: 999px; background: var(--bg-canvas); }
  .preset-row { display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 5px !important; margin-bottom: 0; }
  .preset-chip { background: var(--bg-surface); border-radius: 999px; padding: 4px 8px !important; font-size: 0.73rem; border: none; cursor: pointer; text-align: center !important; display: flex !important; align-items: center !important; justify-content: center !important; gap: 4px; white-space: nowrap !important; line-height: 1.2 !important; min-height: 26px; transition: transform 180ms ease-out, background-color 180ms ease-out; overflow: hidden; }
  .preset-chip:hover, .preset-chip.active { background: var(--rose-pill-bg); }
  .preset-chip:active { transform: scale(0.98); }
  .preset-chip strong { display: block; color: var(--text-primary); font-family: var(--font-sans); font-size: 0.72rem; font-weight: 600; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .preset-chip span { display: none; }
  .field-label { display: block; font-size: 0.84rem; font-weight: 600; color: var(--text-primary); margin-bottom: 4px; }
  .product-selector-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-auto-rows: 74px; gap: 8px; flex: 1 1 auto; min-height: 244px; max-height: 268px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--rose-pill-bg) transparent; padding: 10px; border-radius: 18px; background: var(--bg-canvas); margin-bottom: 0; align-content: start; }
  .prod-check-item { position: relative; display: flex; align-items: stretch; gap: 6px; padding: 9px 11px; height: 74px; min-height: 74px; border-radius: 14px; background: var(--bg-surface); border: 1px solid var(--border-hairline); cursor: pointer; font-size: 0.84rem; transition: background-color 180ms ease-out, border-color 180ms ease-out; overflow: hidden; }
  .prod-check-item.selected { background: var(--rose-pill-bg); border-color: var(--rose-brand); }
  .prod-check-item input[type="checkbox"] { position: absolute; opacity: 0; width: 1px; height: 1px; pointer-events: none; }
  [data-ui] .input-box, [data-ui] .textarea-box, .input-box, .textarea-box { width: 100%; background: var(--bg-surface); border-radius: 16px; padding: 9px 13px; color: var(--text-primary); font-size: 16px; border: none; }
  .input-box:focus, .textarea-box:focus { outline: 2px solid var(--rose-brand); }
  .score-strip { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 8px; }
  .metric-box { background: var(--bg-canvas); border-radius: 13px; padding: 7px 11px; font-variant-numeric: tabular-nums; min-width: 0; overflow: hidden; }
  .metric-val { font-family: 'Newsreader', Georgia, serif; font-size: 1.12rem; font-weight: 500; line-height: 1.12; font-variant-numeric: tabular-nums; }
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
  .cookie-banner { width: 100%; background: var(--bg-oat); padding: 10px 0; display: none; }
  .cookie-banner-inner { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: nowrap; }
  @media (max-width: 768px) {
    #cookieBanner.cookie-banner { position: fixed !important; left: 10px !important; right: 10px !important; bottom: 10px !important; width: auto !important; max-width: calc(100vw - 20px) !important; box-sizing: border-box !important; padding: 8px 12px !important; font-size: 11.5px !important; line-height: 1.3 !important; border-radius: 10px !important; z-index: 9999 !important; max-height: 54px !important; box-shadow: 0 8px 24px rgba(0,0,0,0.22); }
    #cookieBanner .cookie-banner-inner { padding: 0 !important; gap: 8px !important; flex-wrap: nowrap !important; width: 100% !important; }
    #cookieBanner .cookie-banner-inner > div:first-child { font-size: 11.5px !important; line-height: 1.25 !important; white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; min-width: 0 !important; flex: 1 !important; }
    #cookieBanner button { padding: 5px 9px !important; font-size: 11.5px !important; min-height: 28px !important; white-space: nowrap !important; }
    #cookieBanner a { display: none !important; }
  }
  .dl-locked-spec-badge { filter: none !important; }
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
    .nav-links { width: 100%; order: 3; justify-content: space-between; gap: 4px; font-size: 0.72rem; padding-top: 8px; flex-wrap: wrap; white-space: normal; }
  }
  @media (max-width: 640px) {
    .container { padding: 0 14px; }
    #sovrn-ftc-disclosure-bar, .site-header .nav-links, .hero-photo-col, #hero-3step-promise, .hero-copy-col .btn-primary, .hero-copy-col .btn-secondary { display: none !important; }
    .site-header .nav-inner { min-height: 50px !important; padding: 6px 0 !important; flex-wrap: wrap !important; gap: 4px !important; max-width: 100% !important; overflow: hidden !important; }
    #dl-header-vanity-pill { padding: 4px 8px !important; font-size: 0.71rem !important; min-height: 28px !important; }
    #dl-header-vanity-count, .brand-logo-link .serif-italic { display: none !important; }
    #vanityLightToggle { padding: 2px !important; }
    #vanityLightToggle .vanity-light-btn { padding: 3px 6px !important; font-size: 0.68rem !important; min-height: 24px !important; }
    a { max-width: 100%; overflow-wrap: anywhere; }
    .hero-section { padding: 4px 0 8px !important; }
    .editorial-top-banner { margin-bottom: 6px !important; row-gap: 4px !important; }
    .hero-h1 { font-size: 1.55rem !important; line-height: 1.06 !important; margin-bottom: 2px !important; }
    .hero-sub { font-size: 0.8rem !important; line-height: 1.3 !important; margin-bottom: 2px !important; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .grader-card, .results-panel, .porcelain-vessel-core { padding: 10px 12px !important; gap: 6px !important; }
    .shelf-search-row { grid-template-columns: 1.3fr 0.7fr !important; gap: 6px !important; }
    .preset-row { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 4px !important; }
    .product-selector-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; max-height: 152px !important; min-height: 148px !important; padding: 6px !important; }
    .score-strip, .viscosity-seq-list, #appleWalletCardPreview { grid-template-columns: 1fr !important; }
    .editorial-photo-caption { flex-wrap: wrap !important; gap: 8px !important; }
    #dl-pouch-bottles-grid { grid-template-columns: repeat(5, minmax(0, 1fr)) !important; gap: 4px !important; }
    #dl-pouch-bottles-grid [id^="dl-pouch-slot-name-"] { white-space: nowrap !important; overflow: hidden !important; text-overflow: ellipsis !important; font-size: 0.65rem !important; }
    #textureFilterTabs { grid-template-columns: repeat(6, minmax(0, 1fr)) !important; gap: 2px !important; padding: 2px !important; }
    #textureFilterTabs .vanity-light-btn { font-size: 0.65rem !important; padding: 4px 2px !important; min-height: 24px !important; }
    #dl-results-step-bar .vanity-light-btn, #heroRitualToggleBar .vanity-light-btn { white-space: normal !important; line-height: 1.2 !important; font-size: 0.72rem !important; padding: 6px 4px !important; min-width: 0; }
    .brand-logo-link { font-size: 1.05rem; gap: 6px; }
    .brand-atelier-word { display: none; }
    .vanity-light-btn { padding: 6px 10px; font-size: 0.84rem; white-space: normal; min-height: 32px; }
    .site-header .btn-primary { display: none; } .btn-primary, .btn-secondary, .btn-primary span, .btn-secondary span { white-space: normal !important; max-width: 100%; min-width: 0; text-align: center; flex-wrap: wrap; }
  }
  #appleWalletCardPreview, #appleWalletCardPreview.eb-blurred-deliverable, #actives-matrix tr.eb-blurred-deliverable { filter: none !important; max-height: none !important; overflow: visible !important; opacity: 1 !important; user-select: auto !important; cursor: auto !important; }
  #liveResultsContainer #eb-postcalc-inline-cta, #actives-matrix #eb-table-row4-gate-tr, #actives-matrix #eb-tanstack-table-bar, #eb-deliverable-curtain, #eb-pseo-quick-bar { display: none !important; }
  #eb-pseo-hero-split { grid-template-columns: 1fr !important; }
  #eb-prism-proof-preview { white-space: normal !important; padding: 16px 18px !important; background: var(--bg-canvas) !important; font-family: 'Newsreader', Georgia, serif !important; }
  .dl-inline-ics-form { display: flex !important; flex-wrap: wrap !important; gap: 8px; align-items: center; width: 100%; }
  .dl-inline-ics-form .input-box, #dl-vanity-email-form .input-box { width: 100%; min-width: 0; border-radius: 999px; background: var(--bg-surface); padding: 7px 14px; font-size: 16px; }
  .dl-inline-ics-btn, #dl-vanity-email-btn { background: var(--rose-brand) !important; color: var(--accent-ink) !important; border-radius: 999px; font-weight: 700; }
  @media (max-width: 768px) {
    input[type="email"], input[type="text"], input[type="search"], select, textarea { font-size: 16px !important; }
  }
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
  return `${ftcBar}<header class="site-header"><div class="container nav-inner"><a href="/" class="brand-logo-link" aria-label="DermLogic Home">${BRAND_LOGO_SVG}<span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.05rem;">Atelier</span></span></a><nav class="nav-links" aria-label="Main Navigation"><a href="/#analyzer">Shelf Builder</a><a href="/compare">Compare &amp; Dupes</a><a href="/celebrity">Celebrity Routines</a><a href="/concern">Skin Concerns</a><a href="/directory">Layering Guides</a></nav><div style="display:flex;align-items:center;gap:10px;">${vanityPill}${lightPill}</div></div></header>`;
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
function renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds, initialRawInci, initialSkinType, showUgcStrip = true }) {
  const selectedSet = new Set(initialProductIds || ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic']);
  const currentSkin = initialSkinType || (initialAnalysis && initialAnalysis.skinType) || 'combination';
  const presetShortLabelMap = { 'viral-tiktok-destroyer': 'Acids + Retinol', 'copper-vitc-oxidation': 'Copper + Vit C', 'acne-rx-bpo-tretinoin': 'Tretinoin + Acne Cream', 'glass-skin-recovery': 'Calm Barrier' };
  const presetShortBadgeMap = { 'viral-tiktok-destroyer': 'Split AM/PM', 'copper-vitc-oxidation': 'Cancels Out', 'acne-rx-bpo-tretinoin': 'Space Apart', 'glass-skin-recovery': '0 Clashes' };
  const presetButtonsHtml = presets.map((p, idx) => `<button type="button" class="preset-chip ${idx === 0 ? 'active' : ''}" data-preset-id="${escapeHtml(p.id)}" data-products='${JSON.stringify(p.productIds)}' data-skin="${escapeHtml(p.skinType)}" onclick="applyRoutinePreset(this)"><strong>${escapeHtml(presetShortLabelMap[p.id] || p.label)}</strong><span class="mono">${escapeHtml(presetShortBadgeMap[p.id] || p.badge)}</span></button>`).join('');
  const shortNameMap = SHORT_PRODUCT_NAMES;
  const categoryLabelMap = {
    'Antioxidant Serum': 'Morning Vitamin C', 'Exfoliating Acid': 'Gentle Exfoliant', 'Exfoliating Peel': 'Weekly Smoothing Mask',
    'Acne Treatment': 'Blemish Treatment', 'Acne Cleanser': 'Clarifying Wash', 'Fungal Acne Wash': 'Clarifying Wash',
    'Retinoid (Rx)': 'Night Retinoid', 'Retinoid': 'Night Retinoid', 'Peptide Serum': 'Firming Peptide Serum',
    'Barrier Moisturizer': 'Barrier Cream', 'Barrier Recovery': 'Barrier Cream', 'Barrier Essence': 'Hydrating Essence',
    'Soothing Toner': 'Soothing Toner', 'Acne & Eczema Mist': 'Soothing Mist', 'Rosacea & Brightening': 'Redness & Tone Serum',
    'Brightening Serum': 'Brightening Serum', 'Sebum & Pore Serum': 'Pore-Balancing Serum', 'Sunscreen (SPF)': 'Morning SPF Shield', 'Cleanser': 'Gentle Cleanser'
  };
  const getTexGroup = (prod) => {
    for (let sIdx = 0; sIdx < VANITY_SLOT_OPTIONS.length; sIdx++) {
      if (VANITY_SLOT_OPTIONS[sIdx].choices.some((c) => c.id === prod.id)) return ['prep', 'serum', 'cream', 'spf', 'pm'][sIdx];
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
    return `<label class="prod-check-item ${isChecked ? 'selected' : ''}" data-prod-label="${escapeHtml(prod.id)}" data-tex-group="${texGroup}" data-search="${escapeHtml(searchBlob)}" onmouseenter="if(window.__dlShowProdInfo)window.__dlShowProdInfo(this,'${escapeHtml(prod.id)}',event)" onmouseleave="if(window.__dlHideProdInfo)window.__dlHideProdInfo()"><input type="checkbox" name="routineProduct" value="${escapeHtml(prod.id)}" ${isChecked ? 'checked' : ''} onchange="toggleProductChip(this)" /><span style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;height:100%;"><span style="display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:2px;"><span style="font-size:0.75rem;color:var(--text-secondary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(prod.brand)}</span><span class="mono" style="font-size:0.71rem;padding:1px 7px;border-radius:999px;background:${isChecked ? 'var(--rose-brand)' : 'var(--bg-oat)'};color:${isChecked ? 'var(--accent-ink)' : 'var(--rose-brand)'};font-weight:600;flex-shrink:0;">${isChecked ? '✓ Selected' : '+ Select'}</span></span><strong class="serif-display" style="display:-webkit-box;-webkit-line-clamp:1;-webkit-box-orient:vertical;overflow:hidden;color:var(--text-primary);font-size:0.9rem;font-weight:400;line-height:1.2;">${escapeHtml(cleanProdName)}</strong><span class="mono" style="color:var(--rose-brand);font-size:0.75rem;font-weight:500;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:auto;">${roleTag} &middot; $${prod.priceUsd}</span></span></label>`;
  }).join('') + `<div id="shelfEmptyState" style="display:none;grid-column:1/-1;padding:16px;background:var(--bg-canvas);font-size:0.86rem;color:var(--text-secondary);text-align:center;">Don't see that bottle in our ${products.length}-bottle catalog? <button type="button" class="btn-primary mono" style="padding:5px 12px;min-height:30px;font-size:0.78rem;margin-left:6px;" onclick="if(window.__dlAddCustomSearchBottle)window.__dlAddCustomSearchBottle()">+ Add Custom Bottle to Vanity Bag &rarr;</button><button type="button" class="btn-secondary mono" style="padding:5px 12px;min-height:30px;font-size:0.78rem;margin-left:6px;" onclick="const q=document.getElementById('productFilterInput').value;const ta=document.getElementById('rawInciTextarea');if(ta&&q){ta.value=q;runRoutineAnalysis();}">Check Ingredient List &rarr;</button></div>`;
  return `
    <div id="checker"></div>
    <div class="hero-grid" id="analyzer">
      <div class="grader-card" style="display:flex;flex-direction:column;">
        <div class="porcelain-vessel-core" style="flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
          <div style="flex:1;display:flex;flex-direction:column;min-height:0;gap:10px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <div><span class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;display:block;">Step 1 of 2 &middot; Pick Your Bottles</span><strong class="serif-display" style="font-size:1.32rem;font-weight:400;color:var(--text-primary);">What's on Your Bathroom Counter?</strong></div>
              <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;"><button type="button" id="topClearShelfBtn" class="mono" style="padding:3px 10px;border-radius:999px;font-size:0.74rem;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;cursor:pointer;font-weight:600;" onclick="clearRoutineSelection()">Clear (${selectedSet.size}) &times;</button><span class="badge-safe mono" id="shelfCountBadge" style="display:none;">${products.length} Bottles</span></div>
            </div>
            <div class="shelf-search-row">
              <input id="productFilterInput" type="search" aria-label="Search skincare products" class="input-box" style="padding:8px 12px;font-size:16px;" placeholder="Search brand or bottle (e.g., CeraVe, C E Ferulic)..." oninput="filterProductList(this.value)" />
              <select id="skinTypeSelect" class="input-box" style="padding:8px 10px;font-size:16px;" aria-label="Your Skin Type" onchange="runRoutineAnalysis()">
                <option value="combination" ${currentSkin === 'combination' ? 'selected' : ''}>Skin: Combination</option>
                <option value="sensitive" ${currentSkin === 'sensitive' ? 'selected' : ''}>Skin: Sensitive</option>
                <option value="oily" ${currentSkin === 'oily' ? 'selected' : ''}>Skin: Oily / Blemish</option>
                <option value="dry" ${currentSkin === 'dry' ? 'selected' : ''}>Skin: Dry</option>
                <option value="normal" ${currentSkin === 'normal' ? 'selected' : ''}>Skin: Balanced</option>
              </select>
            </div>
            <div style="display:flex;flex-direction:column;gap:6px;padding:8px 10px;background:var(--bg-canvas);border-radius:14px;">
              <div class="preset-row" id="presetButtonsRow" style="margin-bottom:0;">${presetButtonsHtml}</div>
              <div style="display:none;">
                <textarea id="rawInciTextarea">${escapeHtml(initialRawInci || '')}</textarea>
                <button type="button" id="analyzeBtn" onclick="runRoutineAnalysis(null, true)">Check</button>
              </div>
            </div>
            <div id="textureFilterTabs" role="group" aria-label="Filter Bathroom Shelf by Vanity Bag Step">
              <button type="button" data-tex="all" class="vanity-light-btn active mono" aria-pressed="true" onclick="filterShelfByTexture('all', this)">All (${products.length})</button>
              <button type="button" data-tex="prep" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('prep', this)">Prep (${prepCount})</button>
              <button type="button" data-tex="serum" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('serum', this)">Serum (${serumCount})</button>
              <button type="button" data-tex="cream" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('cream', this)">Cream (${creamCount})</button>
              <button type="button" data-tex="spf" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('spf', this)">SPF 50 (${spfCount})</button>
              <button type="button" data-tex="pm" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('pm', this)">Night (${pmCount})</button>
            </div>
            <div class="product-selector-grid" id="productSelectorGrid" data-ui="shelf-grid" style="margin-bottom:0;">${productCheckboxesHtml}</div>
            <div id="dl-selector-vanity-caddy" style="background:var(--bg-pouch);border-radius:16px;padding:9px 11px;color:var(--text-primary);">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:6px;">
                <span class="mono" style="font-size:0.76rem;color:var(--text-primary);font-weight:600;">5-Step Daily Coverage &middot; <span id="dl-pouch-status-label" style="color:var(--rose-brand);">3 of 5 Routine Steps Covered</span></span>
                <span id="dl-pouch-pct-pill" style="display:inline-flex;align-items:center;gap:5px;padding:2px 8px;border-radius:999px;background:var(--bg-surface);color:var(--rose-brand);font-size:0.71rem;font-weight:600;"><span style="width:6px;height:6px;border-radius:999px;background:#D97706;"></span><span id="dl-pouch-pct-text">Tap +Cream or +SPF</span></span>
              </div>
              <div id="dl-pouch-bottles-grid" style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:6px;text-align:center;">
                <div id="dl-pouch-card-0" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_0');window.__dlSelectVanitySlot(0);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:11px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;"><span class="mono" style="font-size:0.6rem;color:var(--text-muted);font-weight:600;">01 &middot; PREP</span><div id="dl-pouch-slot-name-0" style="font-size:0.72rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Glycolic 7%</div><span id="dl-pouch-slot-sub-0" style="font-size:0.62rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">On Shelf</span></div>
                <div id="dl-pouch-card-1" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_1');window.__dlSelectVanitySlot(1);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:11px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;"><span class="mono" style="font-size:0.6rem;color:var(--text-muted);font-weight:600;">02 &middot; SERUM</span><div id="dl-pouch-slot-name-1" style="font-size:0.72rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">C E Ferulic</div><span id="dl-pouch-slot-sub-1" style="font-size:0.62rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">On Shelf</span></div>
                <div id="dl-pouch-card-2" onclick="if(window.__dlTapPouchCreamSlot)window.__dlTapPouchCreamSlot();" style="background:var(--bg-empty-slot);border-radius:11px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;"><span class="mono" style="font-size:0.6rem;color:var(--text-muted);font-weight:600;">03 &middot; CREAM</span><div id="dl-pouch-slot-name-2" style="font-size:0.72rem;color:var(--rose-brand);font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">+ Add Cream</div><span id="dl-pouch-slot-sub-2" style="font-size:0.62rem;color:var(--text-secondary);font-weight:500;">Stops Sting</span></div>
                <div id="dl-pouch-card-3" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('pouch_slot_4');window.__dlSelectVanitySlot(4);}" style="background:var(--bg-pouch-card,var(--bg-surface));border-radius:11px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;"><span class="mono" style="font-size:0.6rem;color:var(--text-muted);font-weight:600;">04 &middot; NIGHT</span><div id="dl-pouch-slot-name-3" style="font-size:0.72rem;color:var(--text-pouch-card,var(--text-primary));font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">Tretinoin</div><span id="dl-pouch-slot-sub-3" style="font-size:0.62rem;color:var(--sub-pouch-card,var(--sage-safe));font-weight:500;">+1 more</span></div>
                <div id="dl-empty-bottle-slot" onclick="if(window.__dlTapPouchSpfSlot)window.__dlTapPouchSpfSlot();" style="background:var(--bg-empty-slot);border-radius:11px;padding:5px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;"><span class="mono" style="font-size:0.6rem;color:var(--text-muted);font-weight:600;">05 &middot; SPF 50</span><div id="dl-pouch-slot-name-4" style="font-size:0.72rem;color:var(--rose-brand);font-weight:600;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">+ Add SPF 50</div><span id="dl-pouch-slot-sub-4" style="font-size:0.62rem;color:var(--text-secondary);">Daily Shield</span></div>
              </div>
              <div style="display:none;"><div id="dl-pouch-progress-fill"></div></div>
            </div>
          </div>
        </div>
      </div>
      <div class="results-panel" id="liveResultsContainer" style="display:flex;flex-direction:column;justify-content:flex-start;">
        ${renderAnalysisResultHtml(initialAnalysis)}
      </div>
    </div>
    ${showUgcStrip ? `<div class="dl-ugc-community-strip" style="margin-top:28px;margin-bottom:24px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
        <div>
          <span class="mono" style="font-size:0.75rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;display:block;">From Bathroom Counters to Calmer Skin</span>
          <h3 class="serif-display" style="font-size:1.35rem;font-weight:400;color:var(--text-primary);margin:0;">Real Vanity Routines &middot; Verified Zero-Sting Results</h3>
        </div>
        <span class="mono" style="font-size:0.75rem;color:var(--text-secondary);background:var(--bg-canvas);padding:4px 10px;border-radius:999px;">4,200+ Routine Audits Verified</span>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;">
        <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--rose-brand);letter-spacing:0.02em;">Morning Glow &middot; 15% Vitamin C</div>
          <div style="height:150px;border-radius:12px;overflow:hidden;">
            <img src="/public/photo_customer_holding.jpg" alt="Model applying morning Vitamin C serum with glass dropper onto glowing skin" style="width:100%;height:100%;object-fit:cover;object-position:center 35%;display:block;" loading="lazy" />
          </div>
          <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:6px;">
            <p style="font-size:0.84rem;color:var(--text-primary);line-height:1.45;margin:0;">&ldquo;Separated my 15% Vitamin C from my night acids. Smooth, non-pilling barrier under SPF 50 all day.&rdquo;</p>
            <div class="mono" style="font-size:0.72rem;color:var(--text-secondary);display:flex;justify-content:space-between;align-items:center;">
              <span>Maya K., Verified Routine</span>
              <span style="color:var(--sage-safe);font-weight:600;">&#10003; 0 Clashes</span>
            </div>
          </div>
        </div>
        <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--rose-brand);letter-spacing:0.02em;">Bathroom Shelf &middot; C E Ferulic + Barrier</div>
          <div style="height:150px;border-radius:12px;overflow:hidden;">
            <img src="/public/photo_bathroom_sunlight.jpg" alt="Sunlit bathroom vanity counter with luxury and clinical skincare bottles" style="width:100%;height:100%;object-fit:cover;object-position:center 45%;display:block;" loading="lazy" />
          </div>
          <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:6px;">
            <p style="font-size:0.84rem;color:var(--text-primary);line-height:1.45;margin:0;">&ldquo;Checked my entire 6-bottle counter in 2 minutes. Cut $140 of overlapping exfoliants that were triggering redness.&rdquo;</p>
            <div class="mono" style="font-size:0.72rem;color:var(--text-secondary);display:flex;justify-content:space-between;align-items:center;">
              <span>Elena R., Verified Routine</span>
              <span style="color:var(--sage-safe);font-weight:600;">&#10003; Saved $140</span>
            </div>
          </div>
        </div>
        <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:10px;">
          <div style="font-size:0.75rem;font-weight:700;color:var(--rose-brand);letter-spacing:0.02em;">Night Repair &middot; Rx Tretinoin Buffer</div>
          <div style="height:150px;border-radius:12px;overflow:hidden;">
            <img src="/public/photo_model_radiant.jpg" alt="Smiling model with calm, bouncy skin after ceramide barrier repair" style="width:100%;height:100%;object-fit:cover;object-position:center 25%;display:block;" loading="lazy" />
          </div>
          <div style="flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:6px;">
            <p style="font-size:0.84rem;color:var(--text-primary);line-height:1.45;margin:0;">&ldquo;Used the ceramide sandwich method for Tretinoin 0.05%. Peeling and tightness disappeared within one week.&rdquo;</p>
            <div class="mono" style="font-size:0.72rem;color:var(--text-secondary);display:flex;justify-content:space-between;align-items:center;">
              <span>Chloe D., Verified Routine</span>
              <span style="color:var(--sage-safe);font-weight:600;">&#10003; Zero Flaking</span>
            </div>
          </div>
        </div>
      </div>
    </div>` : ''}
    <div id="checkoutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle" data-ui="checkout-dialog" onclick="if(event.target===this)closeCheckoutModal()">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;"><span class="badge-safe mono" id="modalBanditBadge">Instant Download · Complete Atelier Vanity Dossier</span><button type="button" class="btn-secondary" style="padding:6px 14px;min-height:34px;" onclick="closeCheckoutModal()">Close</button></div>
        <h3 id="checkoutModalTitle" class="serif-display" style="font-size:1.75rem;margin-bottom:8px;">Complete Atelier Vanity Dossier ($1.99 Single Pass / $9 Complete Dossier)</h3>
        <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:16px;">Includes your <strong>300-DPI Apple Wallet / Phone Shopping Swatch Card + AM/PM Ingredient Conflict Schedule + $240 Clinical Dupe Substitution List</strong>.</p>
        <div style="margin-bottom:16px;"><a href="/buy/flash_pass" onclick="if(window.__dlBuyFromVanity)return window.__dlBuyFromVanity('flash_pass',this);if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn-primary" style="width:100%;justify-content:center;text-decoration:none;padding:13px 20px;font-size:0.95rem;"><span>Download 300-DPI Swatch Card + Conflict Schedule + $240 Dupe List ($1.99)</span><span class="btn-icon-circle">&rarr;</span></a></div>
        <form id="checkoutForm" onsubmit="submitSelfServeCheckout(event)" style="padding-top:10px;">
          <input type="hidden" id="checkoutPlanId" value="onetime_499" /><input type="text" name="website_hp" id="checkoutHoneypot" style="display:none !important" tabindex="-1" autocomplete="off" />
          <div style="margin-bottom:10px;"><label class="field-label" for="checkoutEmailInput">Email for Instant Routine &amp; Swatch Card Delivery</label><input id="checkoutEmailInput" type="email" required class="input-box" placeholder="you@skincare-ritual.com" value="reader@dermlogic.io" /></div>
          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:10px;"><label class="prod-check-item selected" id="planOption499" onclick="selectCheckoutPlan('onetime_499')"><input type="radio" name="planChoice" value="onetime_499" checked /><span><strong style="display:block;font-size:0.78rem;">$1.99 Single Dossier Pass</strong></span></label><label class="prod-check-item" id="planOption1999" onclick="selectCheckoutPlan('annual_1999')"><input type="radio" name="planChoice" value="annual_1999" /><span><strong style="display:block;font-size:0.78rem;">$9 Complete Vanity Dossier</strong></span></label><label class="prod-check-item" id="planOptionStylist29" onclick="selectCheckoutPlan('stylist_29')"><input type="radio" name="planChoice" value="stylist_29" /><span><strong style="display:block;font-size:0.78rem;">$29 Esthetician &amp; Stylist Pass</strong></span></label></div>
          <button type="submit" id="checkoutSubmitBtn" class="btn-secondary" style="width:100%;">Complete Kit Checkout ($1.99) &rarr;</button>
          <div class="mono" style="margin-top:8px;font-size:0.72rem;color:var(--sage-safe);text-align:center;">&#10003; 300-DPI Apple Wallet Card + AM/PM Schedule + $240 Dupe List &middot; 30-Day Refund Guarantee</div>
        </form>
        <div id="vocPollBox" style="margin-top:10px;padding-top:8px;border-top:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;font-size:0.73rem;color:var(--text-secondary);"><span>Missing something today?</span><span style="display:inline-flex;gap:4px;flex-wrap:wrap;"><button type="button" class="mono" style="background:var(--bg-oat);border:none;border-radius:999px;padding:3px 8px;font-size:0.69rem;cursor:pointer;color:var(--text-primary);" onclick="window.__dlVoteVoc('missing_bottle')">My bottle isn't listed</button><button type="button" class="mono" style="background:var(--bg-oat);border:none;border-radius:999px;padding:3px 8px;font-size:0.69rem;cursor:pointer;color:var(--text-primary);" onclick="window.__dlVoteVoc('want_dupes')">Want cheaper dupes</button><button type="button" class="mono" style="background:var(--bg-oat);border:none;border-radius:999px;padding:3px 8px;font-size:0.69rem;cursor:pointer;color:var(--text-primary);" onclick="window.__dlVoteVoc('just_browsing')">Just browsing</button></span></div>
        <div id="checkoutSuccessBox" style="display:none;margin-top:12px;padding:12px;background:var(--sage-bg);color:var(--sage-safe);"></div>
      </div>
    </div>
  `;
}
function renderSingleConflictCard(c, idx = 0) {
  const isCritical = c.severity === 'CRITICAL';
  const badgeLabel = isCritical ? 'Separate AM & PM' : 'Alternate Nights';
  const nameA = String(c.ingredientA || c.inciA || '').replace(/\s*\([^)]*\)/g, '');
  const nameB = String(c.ingredientB || c.inciB || '').replace(/\s*\([^)]*\)/g, '');
  const cleanTitle = String(c.title || '').replace(/\s*\(pH[^)]*\)/gi, '');
  const swap = getConflictSafeSwap(c);
  const oneLineFix = String(swap.freeFix || '').replace(/^Free Timing Fix:\s*/i, '');
  const bodyBlock = idx === 0
    ? `<div style="font-size:0.79rem;line-height:1.38;color:var(--text-secondary);margin-bottom:7px;"><strong style="color:var(--sage-safe);">&#10003; Free Proof #1 &middot; ${escapeHtml(cleanTitle)}:</strong> ${escapeHtml(oneLineFix)}</div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;"><a href="${escapeHtml(swap.directUrl)}" data-sovrn-beacon="${escapeHtml(swap.beaconUrl)}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono dl-conflict-swap-link" style="white-space:normal;font-size:0.73rem;padding:4px 10px;" data-no-bag-inject="1">${escapeHtml(swap.swapLabel)} at ${escapeHtml(swap.retailer)} &rarr;</a></div>`
    : `<div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlSwitchResultStep)window.__dlSwitchResultStep(2);if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this);" style="font-size:0.76rem;color:var(--rose-brand);font-weight:700;cursor:pointer;text-decoration:underline;padding:4px 0;">&#128274; Clash #${idx + 1} (${escapeHtml(cleanTitle)}) &amp; Chemist Dupe #${idx + 1} Locked &mdash; Enter Email ($0) to Reveal &uarr;</div><div class="dl-unlocked-c2-proof" style="display:none;"><div style="font-size:0.79rem;line-height:1.38;color:var(--text-secondary);margin-bottom:7px;"><strong style="color:var(--text-primary);">${escapeHtml(cleanTitle)}:</strong> ${escapeHtml(oneLineFix)}</div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;"><a href="${escapeHtml(swap.directUrl)}" data-sovrn-beacon="${escapeHtml(swap.beaconUrl)}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono dl-conflict-swap-link" style="white-space:normal;font-size:0.73rem;padding:4px 10px;" data-no-bag-inject="1">${escapeHtml(swap.swapLabel)} at ${escapeHtml(swap.retailer)} &rarr;</a></div></div>`;
  return `<div class="conflict-card ${escapeHtml(c.severity)}" data-no-bag-inject="1" style="padding:11px 13px;margin-bottom:7px;border-radius:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:3px;flex-wrap:wrap;">
        <strong class="serif-display" style="font-size:1rem;font-weight:500;color:var(--text-primary);">${escapeHtml(nameA)} + ${escapeHtml(nameB)}</strong>
        <span class="${isCritical ? 'badge-clash' : 'badge-warn'} mono" style="padding:2px 8px;font-size:0.71rem;">${badgeLabel}</span>
      </div>
      ${bodyBlock}
    </div>`;
}
function renderAnalysisResultHtml(res) {
  const isCritical = res.conflicts.length > 0 && res.verdictStatus === 'CRITICAL_CLASH';
  const isWarn = res.conflicts.length > 0 && !isCritical;
  const scoreColor = isCritical ? 'var(--berry-clash)' : isWarn ? 'var(--honey-warn)' : 'var(--sage-safe)';
  const badgeClass = isCritical ? 'badge-clash' : isWarn ? 'badge-warn' : 'badge-safe';
  const topVerdictText = res.conflicts.length === 0 ? 'Safe Everyday Routine · Zero Clashes' : res.verdictLabel;
  const conflictPriority = (c) => {
    const hay = `${c.ingredientA || ''} ${c.ingredientB || ''} ${c.title || ''}`.toLowerCase();
    let score = c.severity === 'CRITICAL' ? 100 : 60;
    if (/ascorbic|vitamin c/.test(hay) && /tretinoin|retinol|retinal|adapalene|copper/.test(hay)) score += 90;
    else if (/ascorbic|vitamin c/.test(hay)) score += 45;
    if (/tretinoin|retinol|retinal|adapalene/.test(hay)) score += 30;
    return score;
  };
  const sortedConflicts = [...(res.conflicts || [])].sort((a, b) => conflictPriority(b) - conflictPriority(a));
  const primaryConflicts = [];
  const extraConflicts = [];
  const seenTitles = new Set();
  for (const c of sortedConflicts) {
    const tKey = String(c.title || '').replace(/\s*\([^)]*\)/gi, '').trim().toLowerCase();
    if (primaryConflicts.length < 2 && (!seenTitles.has(tKey) || sortedConflicts.length <= 2)) {
      primaryConflicts.push(c);
      seenTitles.add(tKey);
    } else {
      extraConflicts.push(c);
    }
  }
  const rawTxt = String(res.rawInciText || '').trim();
  const pMatched = res.pastedMatched || [];
  const pCloggers = pMatched.filter((m) => m.comedogenicity >= 2 || m.malasseziaTrigger);
  const pastedBoxHtml = !rawTxt ? '' : (pCloggers.length > 0
    ? `<div id="pastedInciCard" style="padding:12px 14px;background:var(--berry-bg);border-left:3px solid var(--berry-clash);margin-bottom:10px;font-size:0.84rem;line-height:1.45;"><strong style="color:var(--berry-clash);display:block;margin-bottom:3px;">Pasted Ingredient Check: ${pCloggers.length} Pore-Clogging Trigger(s) Flagged</strong><div style="color:var(--text-primary);"><strong>${escapeHtml(pCloggers[0].commonName)}</strong> (${pCloggers[0].comedogenicity}/5 Pore Score${pCloggers[0].malasseziaTrigger ? ' · Fungal-Blemish Trigger' : ''})${pCloggers.length > 1 ? ` <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:600;cursor:pointer;font-size:0.78rem;">· +${pCloggers.length - 1} more trigger(s) locked — Enter Email ($0) to Reveal &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;"> · ${pCloggers.slice(1).map((m) => `<strong>${escapeHtml(m.commonName)}</strong> (${m.comedogenicity}/5 Pore Score)`).join(' · ')}</span>` : ''}</div></div>`
    : (pMatched.length > 0
      ? `<div id="pastedInciCard" style="padding:12px 14px;background:var(--sage-bg);border-left:3px solid var(--sage-safe);margin-bottom:10px;font-size:0.84rem;line-height:1.45;"><strong style="color:var(--sage-safe);display:block;margin-bottom:3px;">Pasted Ingredient Check: 100% Pore-Safe (0 Clogging Oils)</strong><div style="color:var(--text-primary);">Free Proof: <strong>${escapeHtml(pMatched[0].commonName)}</strong> (${pMatched[0].comedogenicity}/5 Pore-Safe)${pMatched.length > 1 ? ` <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:600;cursor:pointer;font-size:0.78rem;">· +${pMatched.length - 1} more matched active(s) locked — Enter Email ($0) to Reveal All &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">, ${pMatched.slice(1).map((m) => `<strong>${escapeHtml(m.commonName)}</strong> (${m.comedogenicity}/5 Pore-Safe)`).join(', ')}</span>` : ''}.</div></div>`
      : `<div id="pastedInciCard" style="padding:12px 14px;background:var(--bg-oat);border-left:3px solid var(--honey-warn);margin-bottom:10px;font-size:0.84rem;line-height:1.45;"><strong style="color:var(--text-primary);display:block;margin-bottom:3px;">Pasted Ingredient Check (&ldquo;${escapeHtml(rawTxt.slice(0, 32))}&rdquo;): 0 Pore-Cloggers Flagged</strong><div style="color:var(--text-secondary);">No pore-clogging oils or waxes matched.</div></div>`));
  const conflictsHtml = pastedBoxHtml + (res.conflicts.length === 0
    ? `<div style="padding:16px 18px;background:var(--sage-bg);color:var(--sage-safe);font-size:0.9rem;line-height:1.52;margin-bottom:10px;">
         <div class="serif-display" style="font-size:1.2rem;color:var(--sage-safe);margin-bottom:4px;">Pure Shelf Harmony · Every Bottle Works Together</div>
         <div>Your selected bottles layer smoothly with zero stinging, canceling out, or makeup pilling.</div>
       </div>`
    : primaryConflicts.map(renderSingleConflictCard).join('') + (extraConflicts.length > 0 ? `
        <details style="margin-bottom:8px;background:var(--bg-canvas);padding:9px 13px;border-radius:14px;">
          <summary class="mono" style="cursor:pointer;font-size:0.81rem;font-weight:600;color:var(--rose-brand);">
            + See ${extraConflicts.length} more bottle ${extraConflicts.length === 1 ? 'clash' : 'clashes'} on your shelf (${extraConflicts.map((c) => `${String(c.ingredientA || '').split('(')[0].trim()} + ${String(c.ingredientB || '').split('(')[0].trim()}`).slice(0, 2).join(', ')})
          </summary>
          <div style="margin-top:8px;">
            ${extraConflicts.map((c, idx) => renderSingleConflictCard(c, primaryConflicts.length + idx)).join('')}
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
  const shortBottle = (p) => p ? `${String(SHORT_PRODUCT_NAMES[p.id] || p.name || '').replace(/\s*\([^)]*\)/g, '').replace(/\s+(Vitamin C Serum|Liquid Exfoliant|Night Cream|Ceramide Cream|Toner|Rice \+ Probiotics|Clearing Solution|Foam Wash)$/i, '')} · $${p.priceUsd}` : '';
  const amDynamicSteps = [
    { title: amCleanse && isBpo(amCleanse) ? '1. Clarifying Wash' : '1. Morning Cleanse', sub: amCleanse ? shortBottle(amCleanse) : 'Lukewarm Water Rinse', badge: 'Step 1', click: '' },
    { title: amSerum ? '2. Vitamin C Shield' : (bpoProd && !isWash(bpoProd) && pmRetin ? '2. Morning Blemish Gel' : '2. Hydrating Serum'), sub: amSerum ? shortBottle(amSerum) : (bpoProd && !isWash(bpoProd) && pmRetin ? shortBottle(bpoProd) : 'Pat onto damp skin · 60s'), badge: 'Wait 60s', click: '' },
    { title: amShield ? '3. Daily SPF 50+ Shield' : '3. Morning SPF 50', sub: amShield ? shortBottle(amShield) : '+ Tap to add Joseon SPF ($18)', badge: amShield ? 'SPF 50' : '+ $18', click: amShield ? '' : 'if(window.__dlTapPouchSpfSlot)window.__dlTapPouchSpfSlot();' }
  ];
  const renderStepRow = (st, isPm) => `<div ${st.click ? `role="button" onclick="${st.click}"` : ''} style="padding:8px 11px;background:${isPm ? 'rgba(244,239,232,0.09)' : 'var(--bg-surface)'};border-radius:11px;display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:7px;min-width:0;${st.click ? 'cursor:pointer;' : ''}"><div style="min-width:0;font-size:0.8rem;line-height:1.3;${isPm ? 'color:#F4EFE8;' : ''}"><strong style="${isPm ? '' : 'color:var(--text-primary);'}display:block;white-space:normal;overflow-wrap:break-word;">${escapeHtml(st.title)}</strong><span style="color:${st.click ? (isPm ? '#F7DFAD' : 'var(--rose-brand)') : (isPm ? '#EED6DC' : 'var(--text-secondary)')};font-size:0.73rem;font-weight:${st.click ? '600' : '400'};display:block;white-space:normal;overflow-wrap:break-word;">${escapeHtml(st.sub)}</span></div><span class="mono" style="font-size:0.7rem;padding:2px 7px;border-radius:999px;background:${isPm ? '#7A2332' : 'var(--rose-pill-bg)'};color:${isPm ? '#F4EFE8' : 'var(--rose-brand)'};font-weight:600;flex-shrink:0;white-space:nowrap;">${st.badge}</span></div>`;
  const amStepsHtml = amDynamicSteps.map((st) => renderStepRow(st, false)).join('');
  const cMode = String(res.climateMode || 'indoor_dry');
  const pmStep2Obj = cMode === 'pregnancy_nursing'
    ? { title: '2. Pregnancy-Safe Active', sub: 'Swap Retinoid for Azelaic 15%' }
    : cMode === 'retinoid_retinization'
      ? { title: '2. Retinoid Sandwich', sub: `${pmRetin ? shortBottle(pmRetin) : 'Pea-Sized Retinoid'} over Cream` }
      : { title: pmRetin ? '2. Night 2 Retinoid' : '2. Night Peptide Serum', sub: pmRetin ? shortBottle(pmRetin) : (pmPept ? shortBottle(pmPept) : 'Pea-Sized Retinoid or Peptide') };
  const pmDynamicSteps = [
    { title: pmExfol ? '1. Night 1 Acid Polish' : '1. Evening Cleanse', sub: pmExfol ? shortBottle(pmExfol) : (amCleanse && isBpo(amCleanse) ? 'Gentle Non-Medicated Wash' : 'Micellar or Hydrating Wash'), badge: pmExfol ? 'Night 1' : 'Cleanse', click: '' },
    { title: pmStep2Obj.title, sub: pmStep2Obj.sub, badge: 'Night 2', click: '' },
    { title: pmCream ? '3. Soothing Barrier Cream' : '3. Barrier Cream', sub: pmCream ? shortBottle(pmCream) : '+ Tap to add Aestura 365 ($32)', badge: pmCream ? 'Cushion' : '+ $32', click: pmCream ? '' : 'if(window.__dlTapPouchCreamSlot)window.__dlTapPouchCreamSlot();' }
  ];
  const pmLockRowHtml = `<div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="padding:10px 12px;background:rgba(244,239,232,0.12);border:1px dashed rgba(247,223,173,0.55);border-radius:11px;margin-bottom:7px;cursor:pointer;"><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:3px;"><strong style="font-size:0.8rem;color:#F7DFAD;">&#128274; Steps 2&ndash;3 &middot; Night Buffer &amp; Dupe #2 ($0)</strong><span class="mono" style="font-size:0.68rem;padding:2px 7px;border-radius:999px;background:#7A2332;color:#F4EFE8;font-weight:700;">Free Unlock &darr;</span></div><span style="font-size:0.73rem;color:#EED6DC;line-height:1.35;display:block;">Enter your email below ($0) to reveal ${escapeHtml(pmStep2Obj.title.replace(/^2\.\s*/, ''))} wait time, ceramide sandwich ratio &amp; 2nd chemist dupe &darr;</span></div>`;
  const pmStepsHtml = renderStepRow(pmDynamicSteps[0], true) + pmLockRowHtml + `<div class="dl-unlocked-c2-proof" style="display:none;">${pmDynamicSteps.slice(1).map((st) => renderStepRow(st, true)).join('')}</div>`;
  const poreCount = res.comedogenicFlags.length;
  const topPoreName = poreCount > 0 ? String(res.comedogenicFlags[0].commonName || res.comedogenicFlags[0].inciName).split('(')[0].trim() : '';
  const poreSummaryText = poreCount === 0 ? 'Pore-Safe' : `Pore Alert (${topPoreName})`;
  const n1Label = pmExfol ? 'Night 1 · Polish' : 'Night 1 · Renew';
  const n1Val = pmExfol ? fmtProd(pmExfol) : (pmRetin ? fmtProd(pmRetin) : 'Gentle Acid Toner');
  const n2Label = pmExfol ? 'Night 2 · Renew' : 'Night 2 · Soothe & Rest';
  const n2Val = pmExfol ? (pmRetin ? fmtProd(pmRetin) : 'Pea-Sized Retinoid') : (pmCream ? `${fmtProd(pmCream)} (Recovery)` : 'Ceramide Barrier Cream');
  const n3Label = pmExfol ? 'Night 3 · Soothe' : 'Night 3 · Renew';
  const n3Val = pmExfol ? (pmPept ? fmtProd(pmPept) : (pmCream ? `${fmtProd(pmCream)} (Rest)` : 'Hydrating / Peptide Serum')) : (pmRetin ? fmtProd(pmRetin) : (pmPept ? fmtProd(pmPept) : 'Hydrating Serum'));
  const n4Val = pmCream ? fmtProd(pmCream) : 'Ceramide Barrier Cream';
  const conflictCount = (res.conflicts || []).length;
  const wastedUsd = res.wastedShelfValueUsd || 0;
  const totalUsd = res.totalShelfValueUsd || 248;
  const topSwap = primaryConflicts[0] ? getConflictSafeSwap(primaryConflicts[0]) : getConflictSafeSwap({ title: 'Retinoid', ingredientA: 'Retinoid' });
  const topSummaryLine = conflictCount === 0
    ? 'Every selected bottle layers smoothly with zero stinging, canceling out, or makeup pilling.'
    : `Separates ${primaryConflicts.map((c) => `${String(c.ingredientA || '').split('(')[0].trim()} & ${String(c.ingredientB || '').split('(')[0].trim()}`).slice(0, 2).join(' · ')} across 7:30 AM and 9:30 PM so your serums work at full strength without stinging.`;
  return `
    <div class="porcelain-vessel-core" style="flex:1;display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;">
      <div style="min-width:0;display:flex;flex-direction:column;gap:9px;flex:1;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:6px;flex-wrap:wrap;">
            <span class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">Step 2 of 2 &middot; Your Custom Routine</span>
            <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <span class="${badgeClass} mono" style="padding:2px 8px;font-size:0.72rem;" id="compatibilityScoreValue">${conflictCount === 0 ? '✓ Calm & Safe' : `${conflictCount} Clashes Resolved`}</span>
              <span class="badge-safe mono" style="padding:2px 8px;font-size:0.72rem;" id="wastedShelfValueReadout">${conflictCount === 0 ? `$${totalUsd} Safe` : `$${wastedUsd}/$${totalUsd} Saved`}</span>
            </div>
          </div>
          ${renderPersonalizedResultsHeaderHtml(res)}
        </div>
        <div id="beforeAfterSplitBar" style="display:none;"></div>
        <!-- True 3-Tab Switcher at the Top of the Stage (Only 1 View Open at a Time) -->
        <div id="dl-results-step-bar" role="tablist" aria-label="Routine Details" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;background:var(--bg-oat);padding:4px;border-radius:999px;">
          <button type="button" id="dl-btn-next-step-2" class="vanity-light-btn active mono" style="padding:5px 6px;font-size:0.74rem;text-align:center;border-radius:999px;min-height:28px;" onclick="window.__dlSwitchResultStep(2)">1 &middot; AM &amp; PM Order</button>
          <button type="button" id="dl-res-tab-1" class="vanity-light-btn mono" style="padding:5px 6px;font-size:0.74rem;text-align:center;border-radius:999px;min-height:28px;" onclick="window.__dlSwitchResultStep(1)">2 &middot; Why Clashed (${conflictCount})</button>
          <button type="button" id="dl-res-tab-3" class="vanity-light-btn mono" style="padding:5px 6px;font-size:0.74rem;text-align:center;border-radius:999px;min-height:28px;" onclick="window.__dlSwitchResultStep(3)">3 &middot; 4-Night &amp; Card</button>
        </div>
        <!-- Tab 1 (Default Active): Unmasked Primary Clash Proof + Spacious Side-by-Side Morning & Bedtime Order + 1 Calm Summary Card -->
        <div id="dl-res-step-2" style="display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;flex:1;"><span id="walletConflicts" style="display:none;"></span>
          ${primaryConflicts.length > 0 ? `<div id="dl-primary-clash-proof" style="margin-bottom:2px;">${primaryConflicts.slice(0, 1).map(renderSingleConflictCard).join('')}</div>` : pastedBoxHtml}
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;width:100%;min-width:0;flex:1;" id="appleWalletCardPreview">
            <div style="padding:16px;border-radius:18px;background:var(--bg-canvas);display:flex;flex-direction:column;justify-content:space-between;min-width:0;position:relative;overflow:hidden;">
              <div style="position:relative;z-index:1;min-width:0;">
                <div style="margin-bottom:9px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;">
                  <span class="mono" style="display:inline-flex;align-items:center;gap:4px;font-size:0.79rem;font-weight:700;color:var(--honey-warn);"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:2px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>7:30 AM &middot; Morning</span>
                  <span class="mono" style="font-size:0.69rem;color:var(--text-secondary);">Thinnest to Richest</span>
                </div>
                ${amStepsHtml}
              </div>
            </div>
            <div style="padding:16px;border-radius:18px;background:#3A1F27;color:#FDF8F6;display:flex;flex-direction:column;justify-content:space-between;min-width:0;position:relative;overflow:hidden;">
              <div style="position:relative;z-index:1;min-width:0;">
                <div style="margin-bottom:9px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:4px;">
                  <span class="mono" style="display:inline-flex;align-items:center;gap:4px;font-size:0.79rem;font-weight:700;color:#F7DFAD;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:2px;"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>9:30 PM &middot; Bedtime</span>
                  <span class="mono" style="font-size:0.69rem;color:#EED6DC;">Alternate Nights</span>
                </div>
                ${pmStepsHtml}
              </div>
            </div>
          </div>
          <div style="padding:14px 18px;border-radius:16px;background:var(--bg-canvas);border:1px solid var(--border-subtle);display:flex;flex-direction:column;gap:9px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
              <div>
                <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px;">
                  <span class="badge-safe mono" style="font-size:0.68rem;padding:2px 8px;">&#10003; EU CosIng &amp; Lab pH Verified &middot; 65 Actives</span>
                  <span class="mono" style="font-size:0.7rem;color:var(--text-secondary);">30-Day Refund Guarantee</span>
                </div>
                <strong class="serif-display" style="font-size:1.08rem;color:var(--text-primary);font-weight:400;display:block;">Unlock 9:30 PM Steps 2&ndash;3, 4-Night Calendar &amp; 2nd Chemist Dupe ($0)</strong>
                <span style="font-size:0.78rem;color:var(--text-secondary);display:block;margin-top:2px;"><strong style="color:var(--sage-safe);">&#10003; Free Dupe Proof #1:</strong> <a href="${escapeHtml(topSwap.directUrl)}" target="_blank" rel="sponsored noopener noreferrer" style="color:var(--rose-brand);text-decoration:underline;font-weight:600;" data-no-bag-inject="1">${escapeHtml(topSwap.swapLabel)} at ${escapeHtml(topSwap.retailer)}</a> &middot; <span class="dl-locked-badge-c2" style="color:var(--text-primary);font-weight:600;">&#128274; Dupe #2 + Bedtime Buffer Sent Free ($0)</span></span>
              </div>
            </div>
            <form id="dl-results-inline-email-form" class="dl-inline-ics-form" onsubmit="return window.__dlCaptureFreeIcsLead(event, 'results_card')" style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:0;" data-no-bag-inject="1">
              <input type="email" required class="input-box dl-inline-ics-email" placeholder="Enter your email ($0) to reveal 9:30 PM steps &amp; Dupe #2..." aria-label="Enter email to save your routine and unlock dupes" style="flex:1 1 200px;min-width:0;padding:8px 14px;font-size:15px;border-radius:999px;background:var(--bg-surface);" />
              <button type="submit" class="btn-primary mono dl-inline-ics-btn" style="padding:8px 16px;min-height:38px;font-size:0.8rem;border-radius:999px;white-space:nowrap;"><span>Reveal 9:30 PM Steps &amp; Save Free ($0) &rarr;</span></button>
              <div class="dl-inline-ics-status mono" style="display:none;width:100%;font-size:0.75rem;color:var(--sage-safe);"></div>
            </form>
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:6px;border-top:1px solid var(--border-hairline);font-size:0.78rem;">
              <span style="color:var(--text-secondary);"><strong style="color:var(--sage-safe);">&#10003; Why This Split Works:</strong> ${escapeHtml(topSummaryLine)}</span>
              <span style="display:inline-flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <a href="/compare" class="mono" style="color:var(--text-secondary);text-decoration:underline;">Compare Bottle Dupes</a>
                <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(`Checked my skincare shelf on @mulak's DermLogic (${conflictCount} serum clashes resolved · $${wastedUsd} saved): https://www.dermlogic.io`)}" target="_blank" rel="noopener noreferrer" class="mono" style="color:var(--text-secondary);text-decoration:underline;">Share on X</a>
                <button type="button" class="mono" onclick="openCheckoutModal('onetime_499')" style="background:transparent;border:none;color:var(--rose-brand);font-weight:600;cursor:pointer;text-decoration:underline;padding:0;">Download 300-DPI Phone Swatch Card ($1.99) &rarr;</button>
              </span>
            </div>
          </div>
          <button type="button" id="dl-btn-next-step-3" class="btn-secondary" style="display:none;" onclick="window.__dlSwitchResultStep(3)">Next</button>
        </div>
        <!-- Tab 2: Detailed Clash Cards (Tucked cleanly until clicked) -->
        <div id="dl-res-step-1" style="display:none;flex-direction:column;gap:6px;flex:1;">
          <div id="conflictsListArea">${conflictsHtml}</div>
        </div>
        <!-- Tab 3: 4-Night Rotation, Wait Timer & 9:16 Phone Card (Tucked cleanly until clicked) -->
        <div id="dl-res-step-3" style="display:none;flex-direction:column;gap:10px;min-width:0;flex:1;">
          ${renderPersonaInteractiveWorkbenchAddons().liveWaitTimerHtml}
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
      var tab = document.getElementById(n === 2 ? 'dl-btn-next-step-2' : ('dl-res-tab-' + n));
      if (tab) tab.classList.toggle('active', n === stepNum);
    });
    var s1 = document.getElementById('dl-res-step-1');
    var s2 = document.getElementById('dl-res-step-2');
    var s3 = document.getElementById('dl-res-step-3');
    if (s2) s2.style.display = (stepNum === 2) ? 'flex' : 'none';
    if (s1) s1.style.display = (stepNum === 1) ? 'flex' : 'none';
    if (s3) s3.style.display = (stepNum === 3) ? 'flex' : 'none';
    if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas();
    if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'routine_tab_switch', step: stepNum });
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
        pill.textContent = checkbox.checked ? '✓ Selected' : '+ Select';
        pill.style.background = checkbox.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
        pill.style.color = checkbox.checked ? 'var(--accent-ink)' : 'var(--rose-brand)';
      }
    }
    if (window.__dlSyncVanityFromCheckboxes) window.__dlSyncVanityFromCheckboxes();
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
    if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'texture_filter', group: group });
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
          pill.textContent = cb.checked ? '✓ Selected' : '+ Select';
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
        if (pill) { pill.textContent = '+ Select'; pill.style.background = 'var(--bg-oat)'; pill.style.color = 'var(--rose-brand)'; }
      }
    });
    const el = document.getElementById('rawInciTextarea');
    if (el) el.value = '';
    if (window.__dlSyncVanityFromCheckboxes) window.__dlSyncVanityFromCheckboxes(true);
    if (window.__dlSyncVanityFromCheckboxes) window.__dlSyncVanityFromCheckboxes();
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
      if (container && data.renderedHtml) { container.innerHTML = data.renderedHtml; if (window.__dlSampleEmailUnlocked) { container.querySelectorAll('.dl-locked-badge-c2').forEach((el) => { el.style.display = 'none'; }); container.querySelectorAll('.dl-unlocked-c2-proof').forEach((el) => { el.style.display = 'block'; }); } }
      const fbBox = document.getElementById('rawInciFeedbackBox');
      const pCard = container ? container.querySelector('#pastedInciCard') : null;
      if (fbBox) fbBox.innerHTML = pCard ? pCard.outerHTML : '';
      if (window.__dlAfterRoutineAnalysis) window.__dlAfterRoutineAnalysis(data, Boolean(isExplicitClick));
      if (window.__dlRefreshPageAddButtons) window.__dlRefreshPageAddButtons();
      if (!window.__dlBootRestoring && window.__ebLogEvent) {
        window.__ebLogEvent('calculate', { source: presetSlug ? ('preset_' + presetSlug) : 'routine_analysis', score: data.compatibilityScore, conflicts: (data.conflicts || []).length });
        window.__ebLogEvent('view_paywall', { target: 'routine_analysis_results', conflicts: (data.conflicts || []).length });
      }
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
    try {
      const savedEm = (document.getElementById('dl-inline-sample-email') && document.getElementById('dl-inline-sample-email').value.trim()) || localStorage.getItem('dl_captured_email') || localStorage.getItem('eb_captured_email') || '';
      if (emailEl && savedEm && savedEm.includes('@')) emailEl.value = savedEm;
    } catch (_) {}
    if (emailEl) setTimeout(() => emailEl.focus(), 40);
    fireMetaCapiEvent('StartTrial', planId === 'stylist_29' ? 29.00 : (planId === 'annual_1999' ? 9.00 : 1.99), { planId });
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
    const p499 = document.getElementById('planOption499'), p1999 = document.getElementById('planOption1999'), p29 = document.getElementById('planOptionStylist29'), btn = document.getElementById('checkoutSubmitBtn');
    if (p499) p499.classList.toggle('selected', planId === 'onetime_499');
    if (p1999) p1999.classList.toggle('selected', planId === 'annual_1999');
    if (p29) p29.classList.toggle('selected', planId === 'stylist_29');
    if (btn) btn.innerHTML = planId === 'stylist_29' ? '<span>Complete Client White-Label Dossier Pass ($29) &rarr;</span>' : (planId === 'annual_1999' ? '<span>Complete Atelier Vanity Dossier ($9) &rarr;</span>' : '<span>Complete Kit Checkout ($1.99) &rarr;</span>');
  }
  window.__dlVoteVoc = function(reason) {
    var box = document.getElementById('vocPollBox');
    if (box) box.innerHTML = '<span class="mono" style="color:var(--sage-safe);font-weight:600;">&#10003; Thanks! Logged for our skincare team.</span>';
    fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'voc_poll', path: window.location.pathname, metadata: { reason: reason } }) }).catch(function() {});
  };
  async function submitSelfServeCheckout(ev) {
    ev.preventDefault();
    const planId = (document.getElementById('checkoutPlanId') || {}).value || 'onetime_499';
    const email = (document.getElementById('checkoutEmailInput') || {}).value || (localStorage.getItem('dl_captured_email') || localStorage.getItem('eb_captured_email') || 'patient@dermlogic.io');
    const website_hp = (document.getElementById('checkoutHoneypot') || {}).value || '';
    const btn = document.getElementById('checkoutSubmitBtn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<span>Preparing Ritual Pass...</span>'; }
    try {
      const resp = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planId, email, customer_email: email, allow_promotion_codes: false, website_hp, routineSummary: window.__DERMLOGIC_LAST_RESULT || {} })
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
  window.__dlSelectSparkConflict = function(key, presetId, btn) {
    const svgBolt = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
    const map = {
      'retinol-aha': { badge: svgBolt + 'Acid + Retinol Irritation Clash · 3-Day Skin Recovery Plan', badgeCls: 'badge-clash mono', pill: 'Unmasked Proof #1 · Save $156', proof: '<strong style="color:var(--rose-brand);">Retinol + Acids / Vitamin C Clash:</strong> Morning acid serum clashes with evening retinol on the same night &mdash; <strong>Fix:</strong> Move Vitamin C to 7:30 AM &amp; Retinol to 9:30 PM (Enter Email Free ($0) Below to Unmask $26 Vitamin C Dupe &darr;).' },
      'copper-vitc': { badge: svgBolt + 'Acid + Peptide Irritation Clash · Copper Ion Oxidation', badgeCls: 'badge-clash mono', pill: 'Unmasked Proof #1 · $210 Saved', proof: '<strong style="color:var(--rose-brand);">Copper Peptides + Vitamin C Clash:</strong> Pure L-Ascorbic Acid oxidizes Copper Tripeptide-1 on contact &mdash; <strong>Fix:</strong> Apply Vitamin C at 7:30 AM &amp; Copper Peptides at 9:30 PM (Enter Email Free ($0) Below to Unmask $26 Dupe &darr;).' },
      'tret-bpo': { badge: svgBolt + 'Retinoid + Peroxide Clash · 3-Day Skin Recovery Plan', badgeCls: 'badge-clash mono', pill: 'Unmasked Proof #1 · Zero Peeling', proof: '<strong style="color:var(--rose-brand);">Tretinoin + Acne Cream Clash:</strong> Leave-on acne cream neutralizes night Tretinoin &mdash; <strong>Fix:</strong> Use acne wash in the morning &amp; cushion Tretinoin at bedtime (Enter Email Free ($0) Below to Unmask $32 Ceramide Cushion Dupe &darr;).' },
      'calm-barrier': { badge: svgBolt + 'Calm Moisture Barrier Split · 0 Active Clashes', badgeCls: 'badge-safe mono', pill: 'Unmasked Proof #1 · Glass-Skin Ready', proof: '<strong style="color:var(--sage-safe);">Calm Barrier Split Verified:</strong> Morning Vitamin C + Hydrating Essence + Daily SPF 50 and Night Ceramide Cushion layer with zero pilling or stinging.' }
    };
    const cfg = map[key] || map['retinol-aha'], bEl = document.getElementById('dl-ph-clash-badge'), pEl = document.getElementById('dl-spark-savings-pill'), prEl = document.getElementById('dl-spark-unmasked-proof');
    if (bEl) { bEl.innerHTML = cfg.badge; bEl.className = cfg.badgeCls; }
    if (pEl) pEl.textContent = cfg.pill;
    if (prEl) prEl.innerHTML = cfg.proof;
    document.querySelectorAll('#dl-spark-tester-bar .vanity-light-btn').forEach((b) => b.classList.toggle('active', b === btn || b.getAttribute('data-spark') === key));
    if (window.__ebLogEvent) {
      window.__ebLogEvent('calculate', { source: 'spark_conflict_pill', key: key });
      window.__ebLogEvent('view_paywall', { target: 'spark_conflict_preview', key: key });
    }
    if (presetId && typeof applyPreset === 'function') applyPreset(presetId);
  };
  function setHeroRitualMode() {}
  function startViscosityTimer(seconds, btn) {
    if (!btn || btn.dataset.running === '1') return;
    if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'viscosity_timer', seconds: seconds });
    btn.dataset.running = '1'; btn.classList.add('running');
    let rem = Number(seconds) || 45; const orig = btn.textContent;
    btn.textContent = rem + 's absorbing...';
    const iv = setInterval(() => {
      rem -= 1;
      if (rem <= 0) {
        clearInterval(iv); btn.dataset.running = '0'; btn.classList.remove('running');
        btn.textContent = 'Ready for next layer'; setTimeout(() => { btn.textContent = orig; }, 3500);
      } else { btn.textContent = rem + 's absorbing...'; }
    }, 1000);
  }
  window.addEventListener('DOMContentLoaded', () => {
    try { if (localStorage.getItem('dermlogic_vanity_theme') === 'night') setAtelierVanityLight('night'); } catch (_) {}
    if (!localStorage.getItem('dermlogic_cookie_consent')) {
      const banner = document.getElementById('cookieBanner'); if (banner) banner.style.display = 'block';
    }
    if (window.__dlRestoreShelfStateOnBoot) window.__dlRestoreShelfStateOnBoot();
    fireMetaCapiEvent('ViewContent', 0, { path: window.location.pathname });
  });
  ${ENDOWMENT_CLIENT_SCRIPT}
  ${ATELIER_VANITY_CLIENT_SCRIPT}
`;
module.exports = { escapeHtml, BRAND_LOGO_SVG, SHARED_CSS, CLIENT_SCRIPT, renderHeader, renderFooter, renderInteractiveCheckerWidget, renderAnalysisResultHtml };
