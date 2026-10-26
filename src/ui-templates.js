/**
 * DermLogic (#4): Taste-Skill v2.1.5 Combined Day/Night Editorial Gallery & Nocturnal Apothecary UI
 * - Day Mode (`:root`): Warm Silk & Bisque Editorial Gallery (#F4EFE8 ground, #E9E2D7 stone, #181412 ink, #7A2332 Rose-Burgundy action)
 * - Night Mode (`body.vanity-night`): 3000K Nocturnal Apothecary Plinth (#0C0A08 ground, #181512 stone, #F5F1EB ink, #C9A45A Champagne Gold action)
 * - Typography: Newsreader optical serif (weights 300/400/500) + tabular-nums for all metrics/prices/pH values.
 */

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const BRAND_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="34" height="34" role="img" aria-label="DermLogic Formulation Atelier Emblem" style="flex-shrink:0;display:block;">
  <circle cx="20" cy="20" r="19" fill="#E9E2D7" stroke="#7A2332" stroke-width="1.5"/>
  <circle cx="20" cy="20" r="15" fill="none" stroke="#655C55" stroke-width="0.75" stroke-dasharray="2 1.5"/>
  <path d="M20 9.5 C20 9.5 26.8 17.6 26.8 22.6 C26.8 26.4 23.8 29.5 20 29.5 C16.2 29.5 13.2 26.4 13.2 22.6 C13.2 17.6 20 9.5 20 9.5 Z" fill="#7A2332"/>
  <path d="M16.5 21.2 C16.2 23.6 17.6 25.8 19.8 26.3" fill="none" stroke="#F4EFE8" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M20 29.5 C22.8 29.5 25.5 31.2 26.5 33.2 C23.6 33.6 21.2 32.1 20 29.5 Z" fill="#264C3C"/>
  <path d="M20 29.5 C17.2 29.5 14.5 31.2 13.5 33.2 C16.4 33.6 18.8 32.1 20 29.5 Z" fill="#264C3C" opacity="0.85"/>
  <circle cx="20" cy="17.2" r="1.3" fill="#F4EFE8"/>
</svg>`;

const SHARED_CSS = `
  :root {
    --bg-canvas: #F4EFE8;
    --bg-oat: #E9E2D7;
    --bg-surface: #FAF6F0;
    --bg-porcelain: #E9E2D7;
    --bg-deep: #181412;
    --ink-on-deep: #F4EFE8;
    --border-hairline: #D5CCC0;
    --border-strong: #C9BCAE;
    --text-primary: #181412;
    --text-secondary: #5C534C;
    --text-muted: #655C55;
    --rose-brand: #7A2332;
    --rose-brand-hover: #5E1927;
    --accent-ink: #F4EFE8;
    --rose-pill-bg: #EFE5E7;
    --rose-pill-border: #D9BDC2;
    --sage-safe: #264C3C;
    --sage-bg: #E4EDE8;
    --sage-border: #B7D4C6;
    --honey-warn: #7D5116;
    --honey-bg: #F3EAD8;
    --honey-border: #DFC8A6;
    --berry-clash: #7A2332;
    --berry-bg: #EFE5E7;
    --berry-border: #D9BDC2;
    --margin: 5vw;
    --step-small: clamp(0.875rem, 0.82rem + 0.15vw, 0.9375rem);
    --step-body: clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem);
    --step-lead: clamp(1.25rem, 1.12rem + 0.55vw, 1.625rem);
    --step-head: clamp(2rem, 1.45rem + 2.4vw, 3.35rem);
    --step-hero: clamp(3.5rem, 7.4vw, 6.85rem);
    --radius-shell: 0px;
    --radius-card: 0px;
    --radius-input: 0px;
    --radius-pill: 0px;
    --ease-spring: cubic-bezier(0.22, 1, 0.36, 1);
  }
  body.vanity-night,
  html[data-theme="night"] body {
    --bg-canvas: #0C0A08;
    --bg-oat: #181512;
    --bg-surface: #181512;
    --bg-porcelain: #231E1A;
    --bg-deep: #231E1A;
    --ink-on-deep: #F5F1EB;
    --border-hairline: #2E2822;
    --border-strong: #423930;
    --text-primary: #F5F1EB;
    --text-secondary: #B5ACA3;
    --text-muted: #9E968E;
    --rose-brand: #C9A45A;
    --rose-brand-hover: #DFBE78;
    --accent-ink: #0C0A08;
    --rose-pill-bg: #262017;
    --rose-pill-border: #59492B;
    --sage-safe: #88C4A6;
    --sage-bg: #16241D;
    --sage-border: #2A4739;
    --honey-warn: #DFBE78;
    --honey-bg: #262017;
    --honey-border: #59492B;
    --berry-clash: #E5989B;
    --berry-bg: #2A181B;
    --berry-border: #5E3138;
  }
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background-color: var(--bg-canvas); color: var(--text-primary);
    font-family: 'Newsreader', Georgia, serif; font-weight: 400;
    font-size: var(--step-body); line-height: 1.58; overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    transition: background-color 320ms var(--ease-spring), color 320ms var(--ease-spring);
  }
  .serif-display { font-family: 'Newsreader', Georgia, serif; font-weight: 300; letter-spacing: -0.03em; line-height: 1.06; }
  .serif-italic { font-family: 'Newsreader', Georgia, serif; font-style: italic; font-weight: 300; }
  .mono { font-family: 'Newsreader', Georgia, serif; font-variant-numeric: tabular-nums; letter-spacing: 0.01em; }
  img { display: block; max-width: 100%; object-fit: cover; }
  a { color: inherit; text-decoration: none; }
  button, select, textarea, input { font: inherit; color: inherit; }
  .container { max-width: 1360px; margin: 0 auto; padding: 0 var(--margin); }

  /* Header — Editorial Gallery & Nocturnal Vanity Switcher */
  .site-header { background: var(--bg-canvas); position: sticky; top: 0; z-index: 40; transition: background-color 320ms var(--ease-spring); }
  .nav-inner { min-height: 76px; padding: 16px 0; display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap; }
  .brand-logo-link { display: inline-flex; align-items: center; gap: 10px; font-size: 1.375rem; font-weight: 400; letter-spacing: -0.02em; color: var(--text-primary); text-decoration: none; transition: opacity 180ms ease-out; }
  .brand-logo-link:hover { opacity: 0.78; }
  .nav-links { display: flex; align-items: center; gap: 28px; font-size: var(--step-small); font-weight: 400; color: var(--text-secondary); flex-wrap: wrap; }
  .nav-links a { transition: color 180ms ease-out, opacity 180ms ease-out; }
  .nav-links a:hover { color: var(--rose-brand); }
  .vanity-light-pill { display: inline-flex; background: var(--bg-oat); padding: 4px; gap: 4px; }
  .vanity-light-btn { border: none; background: transparent; padding: 7px 14px; min-height: 36px; font-size: 0.84rem; font-weight: 500; color: var(--text-secondary); cursor: pointer; transition: background-color 200ms var(--ease-spring), color 200ms var(--ease-spring), transform 160ms ease-out; }
  .vanity-light-btn.active { background: var(--rose-brand); color: var(--accent-ink); }
  .vanity-light-btn:active { transform: scale(0.97); }

  /* Buttons — Square editorial luxury blocks */
  .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--rose-brand); color: var(--accent-ink); font-weight: 500; font-size: var(--step-small); padding: 12px 22px; min-height: 44px; border: none; cursor: pointer; white-space: nowrap; transition: transform 180ms ease-out, opacity 180ms ease-out, background-color 200ms ease-out; }
  .btn-primary:hover { opacity: 0.92; }
  .btn-primary:active { transform: scale(0.97); }
  .btn-icon-circle { display: inline-flex; align-items: center; justify-content: center; font-size: 0.9rem; transition: transform 200ms var(--ease-spring); }
  .btn-primary:hover .btn-icon-circle { transform: translate(2px, -2px); }
  .btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: var(--bg-oat); color: var(--text-primary); font-weight: 500; font-size: var(--step-small); padding: 10px 18px; min-height: 42px; border: none; cursor: pointer; white-space: nowrap; transition: transform 180ms ease-out, background-color 200ms ease-out, color 200ms ease-out; }
  .btn-secondary:hover { background: var(--rose-pill-bg); color: var(--rose-brand); }
  .btn-secondary:active { transform: scale(0.97); }

  .affiliate-link-pill { display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: var(--rose-pill-bg); color: var(--rose-brand); font-size: 0.84rem; font-weight: 500; text-decoration: none; transition: opacity 180ms ease-out; }
  .affiliate-link-pill:hover { opacity: 0.85; }
  .affiliate-micro-link { display: inline-block; margin-top: 4px; font-size: 0.82rem; font-weight: 500; color: var(--sage-safe); text-decoration: underline; text-underline-offset: 3px; }
  .affiliate-micro-link:hover { color: var(--rose-brand); }

  /* Hero — Uneven Editorial Gallery & Nocturnal Plinth */
  .hero-section { padding: 12px 0 18px; }
  .editorial-top-banner { display: grid; grid-template-columns: 1.15fr 0.85fr; gap: 24px; align-items: stretch; margin-bottom: 16px; }
  .hero-copy-col { min-width: 0; display: flex; flex-direction: column; justify-content: space-between; }
  .hero-photo-col { min-width: 0; display: flex; flex-direction: column; }
  .hero-h1 { font-family: 'Newsreader', Georgia, serif; font-size: clamp(2.35rem, 4.1vw, 3.65rem); font-weight: 300; line-height: 0.96; letter-spacing: -0.04em; color: var(--text-primary); margin-bottom: 10px; }
  .hero-h1-line1 { display: block; }
  .hero-h1-line2 { display: block; padding-left: 5vw; }
  .hero-sub { color: var(--text-secondary); font-size: var(--step-lead); line-height: 1.38; max-width: 54ch; margin-bottom: 12px; }
  .editorial-photo-shell { background: var(--bg-oat); padding: 10px; position: relative; flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
  .editorial-photo-inner { overflow: hidden; position: relative; height: 205px; flex: 1; background: var(--bg-porcelain); }
  .editorial-photo-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .editorial-photo-diptych { display: grid; grid-template-columns: 1.32fr 0.88fr; gap: 8px; height: 215px; flex: 1; }
  .editorial-photo-diptych .editorial-photo-inner { height: 100%; }
  .vessel-photo-frame { background: var(--bg-oat); padding: 6px; margin-bottom: 14px; }
  .vessel-photo-frame img { width: 100%; height: 172px; object-fit: cover; display: block; }
  .editorial-photo-caption { margin-top: 8px; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: var(--step-small); color: var(--text-secondary); }

  /* Interactive Shelf Audit Workbench ([data-ui]) */
  .hero-grid { display: grid; grid-template-columns: minmax(0, 1.04fr) minmax(0, 0.96fr); gap: 24px; align-items: stretch; }
  .grader-card, .results-panel { background: var(--bg-oat); padding: 12px; min-width: 0; }
  .porcelain-vessel-core { background: var(--bg-surface); padding: 24px 26px; width: 100%; display: flex; flex-direction: column; justify-content: flex-start; gap: 16px; min-width: 0; }
  #textureFilterTabs { display: grid !important; grid-template-columns: repeat(4, minmax(0, 1fr)) !important; gap: 6px !important; width: 100%; }
  #textureFilterTabs .vanity-light-btn { padding: 7px 6px !important; font-size: 0.78rem !important; white-space: normal !important; line-height: 1.2 !important; text-align: center; min-width: 0; width: 100%; }
  .shelf-search-row { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); gap: 10px; align-items: center; }
  .shelf-search-row .input-box { min-width: 0; overflow: hidden; text-overflow: ellipsis; }
  .preset-row { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; margin-bottom: 4px; }
  .preset-chip { background: var(--bg-canvas); padding: 13px 15px !important; font-size: 0.9rem; border: none; cursor: pointer; text-align: left !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; gap: 5px; white-space: normal !important; line-height: 1.3 !important; min-height: 76px; transition: transform 180ms ease-out, background-color 180ms ease-out; }
  .preset-chip:hover, .preset-chip.active { background: var(--rose-pill-bg); }
  .preset-chip:active { transform: scale(0.98); }
  .preset-chip strong { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--text-primary); font-family: 'Newsreader', Georgia, serif; font-size: 1rem; font-weight: 400; line-height: 1.25; white-space: normal; }
  .preset-chip span { display: block; color: var(--rose-brand); font-size: 0.8rem; font-weight: 500; line-height: 1.3; white-space: normal; }
  .field-label { display: block; font-size: 0.9rem; font-weight: 500; color: var(--text-primary); margin-bottom: 6px; }
  .product-selector-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; grid-auto-rows: 138px; gap: 10px; flex: 0 0 606px; height: 606px; min-height: 606px; max-height: 606px; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--border-strong) transparent; padding: 12px; background: var(--bg-canvas); margin-bottom: 14px; align-content: start; }
  .prod-check-item { display: flex; align-items: stretch; gap: 10px; padding: 12px 14px; height: 138px; background: var(--bg-surface); cursor: pointer; font-size: 0.88rem; transition: background-color 180ms ease-out; overflow: hidden; }
  .prod-check-item.selected { background: var(--rose-pill-bg); }
  .prod-check-item input { margin-top: 2px; align-self: flex-start; accent-color: var(--rose-brand); flex-shrink: 0; }
  [data-ui] .input-box, [data-ui] .textarea-box, .input-box, .textarea-box { width: 100%; background: var(--bg-surface); padding: 10px 14px; color: var(--text-primary); font-size: 15.5px; border: none; }
  .input-box:focus, .textarea-box:focus { outline: 2px solid var(--rose-brand); }

  .score-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 14px; }
  .metric-box { background: var(--bg-canvas); padding: 14px 16px; font-variant-numeric: tabular-nums; }
  .metric-val { font-family: 'Newsreader', Georgia, serif; font-size: 1.95rem; font-weight: 400; line-height: 1.05; font-variant-numeric: tabular-nums; }

  .badge-safe, .badge-clash, .badge-warn { display: inline-flex; align-items: center; padding: 5px 11px; font-size: 0.82rem; font-weight: 500; font-variant-numeric: tabular-nums; }
  .badge-safe { background: var(--sage-bg); color: var(--sage-safe); }
  .badge-clash { background: var(--berry-bg); color: var(--berry-clash); }
  .badge-warn { background: var(--honey-bg); color: var(--honey-warn); }

  .conflict-card { background: var(--berry-bg); padding: 16px 18px; margin-bottom: 10px; }
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
    .viscosity-seq-list { grid-template-columns: repeat(2, 1fr); }
    .hero-h1-line2 { padding-left: 6vw; }
    .nav-links { width: 100%; order: 3; justify-content: flex-start; gap: 18px; padding-top: 8px; overflow-x: auto; flex-wrap: nowrap; white-space: nowrap; }
    .hide-mobile { display: none !important; }
  }
  @media (max-width: 640px) {
    .container { padding: 0 18px; }
    .grader-card, .results-panel { padding: 16px; }
    .preset-row, .score-strip, .viscosity-seq-list, .shelf-search-row, .product-selector-grid, #appleWalletCardPreview { grid-template-columns: 1fr !important; }
    #textureFilterTabs { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
    .brand-logo-link { font-size: 1.15rem; gap: 8px; }
    .brand-atelier-word { display: none; }
    .vanity-light-btn { padding: 6px 10px; font-size: 0.76rem; white-space: nowrap; min-height: 32px; }
    .site-header .btn-primary { display: none; }
  }
`;

function renderHeader(hideNav = false) {
  if (hideNav) {
    return `
      <header class="site-header">
        <div class="container nav-inner">
          <a href="/" class="brand-logo-link" aria-label="DermLogic Home">
            ${BRAND_LOGO_SVG}
            <span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.1rem;">Atelier <span class="brand-atelier-word">Céramique</span></span></span>
          </a>
          <div style="display:flex;align-items:center;gap:10px;">
            <div class="vanity-light-pill" id="vanityLightToggle" role="group" aria-label="Day and Night Vanity Mode">
              <button type="button" class="vanity-light-btn active" data-theme-mode="day" aria-pressed="true" onclick="setAtelierVanityLight('day', this)">Daylight Gallery</button>
              <button type="button" class="vanity-light-btn" data-theme-mode="night" aria-pressed="false" onclick="setAtelierVanityLight('night', this)">11 PM Vanity</button>
            </div>
            <a href="/#analyzer" class="btn-primary"><span>Check My Shelf</span><span class="btn-icon-circle">&rarr;</span></a>
          </div>
        </div>
      </header>
    `;
  }
  return `
    <header class="site-header">
      <div class="container nav-inner">
        <a href="/" class="brand-logo-link" aria-label="DermLogic Home">
          ${BRAND_LOGO_SVG}
          <span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.1rem;">Atelier <span class="brand-atelier-word">Céramique</span></span></span>
        </a>
        <nav class="nav-links" aria-label="Main Navigation">
          <a href="/#analyzer">Shelf Audit</a>
          <a href="/#viscosity-sequencer">Four-Night Cycle</a>
          <a href="/directory">Layering Guides</a>
        </nav>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="vanity-light-pill" id="vanityLightToggle" role="group" aria-label="Day and Night Vanity Mode">
            <button type="button" class="vanity-light-btn active" data-theme-mode="day" onclick="setAtelierVanityLight('day', this)">Daylight Gallery</button>
            <button type="button" class="vanity-light-btn" data-theme-mode="night" onclick="setAtelierVanityLight('night', this)">11 PM Vanity</button>
          </div>
          <a href="/buy/micro_pass?source=nav_cta" class="btn-primary">
            <span>Save Lock-Screen Card ($1.99)</span>
            <span class="btn-icon-circle">&rarr;</span>
          </a>
        </div>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <div id="cookieBanner" class="cookie-banner" role="region" aria-label="Cookie Consent">
      <div class="container cookie-banner-inner">
        <div style="font-size:0.85rem;color:var(--text-secondary);">
          We use privacy-friendly cookies to remember your skincare routine preferences. See our <a href="/privacy" style="text-decoration:underline;color:var(--rose-brand);">Privacy Policy</a>.
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" id="cookie-reject" class="btn-secondary" style="padding:6px 14px;font-size:0.8125rem;" onclick="setCookieConsent('rejected')">Reject</button>
          <button type="button" id="cookie-accept" class="btn-primary" style="padding:6px 16px;font-size:0.8125rem;" onclick="setCookieConsent('accepted')">Accept</button>
        </div>
      </div>
    </div>
    <footer class="site-footer">
      <div class="container">
        <div style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:24px;align-items:flex-start;">
          <div style="max-width:52ch;">
            <a href="/" class="brand-logo-link" aria-label="DermLogic Home" style="margin-bottom:8px;color:var(--ink-on-deep);">
              ${BRAND_LOGO_SVG}
              <span class="serif-display" style="font-weight:400;">DermLogic <span class="serif-italic" style="color:var(--rose-brand);">Formulation Atelier</span></span>
            </a>
            <p style="color:#B5ACA3;font-size:0.9rem;">
              Cosmetic-chemist verified pH windows, peptide &amp; Vitamin C compatibility, pore-safety, and four-night skin-cycling rituals. Reader-supported formulation lab: verified links to Sephora &amp; Dermstore may earn an affiliate commission.
            </p>
          </div>
          <div style="display:flex;gap:24px;flex-wrap:wrap;font-weight:400;font-size:0.9rem;color:var(--ink-on-deep);">
            <a href="/#analyzer">Shelf Audit</a>
            <a href="/leaderboard">Routine Leaderboard</a>
            <a href="/directory">Layering Guides</a>
            <a href="/sitemap.xml">XML Sitemap</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
          </div>
        </div>
        <div class="footer-wordmark">DermLogic</div>
      </div>
    </footer>
    <!-- Sovrn //Commerce Automated Affiliate Monetization -->
    <script type="text/javascript">
      var vglnk = { key: '${process.env.SOVRN_API_KEY || process.env.SOVRN_COMMERCE_KEY || 'ea3d7b74c5752fd817f896be27cd1a01'}' };
      (function(d, t) {
        if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0' || navigator.webdriver) return;
        var s = d.createElement(t); s.type = 'text/javascript'; s.async = true;
        s.src = '//cdn.viglink.com/api/vglnk.js';
        var r = d.getElementsByTagName(t)[0]; r.parentNode.insertBefore(s, r);
      }(document, 'script'));
    </script>
  `;
}

function renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds, initialRawInci, initialSkinType }) {
  const selectedSet = new Set(initialProductIds || ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic']);
  const currentSkin = initialSkinType || (initialAnalysis && initialAnalysis.skinType) || 'combination';

  const presetButtonsHtml = presets.map((p, idx) => `
    <button type="button" class="preset-chip ${idx === 0 ? 'active' : ''}" data-preset-id="${escapeHtml(p.id)}" data-products='${JSON.stringify(p.productIds)}' data-skin="${escapeHtml(p.skinType)}" onclick="applyRoutinePreset(this)">
      <strong>${escapeHtml(p.label)}</strong>
      <span class="mono">${escapeHtml(p.badge)}</span>
    </button>
  `).join('');

  const shortNameMap = {
    'skinceuticals-ce-ferulic': 'C E Ferulic Vitamin C Serum',
    'paulas-choice-2-bha': '2% BHA Liquid Exfoliant',
    'lrp-effaclar-duo-bpo': 'Effaclar Duo Blemish Cream',
    'rx-tretinoin-005': 'Tretinoin 0.05% Night Cream',
    'to-buffet-copper-peptides': 'Multi-Peptide + Copper Serum',
    'sunday-riley-good-genes': 'Good Genes Lactic Acid Serum',
    'lrp-cicaplast-baume-b5': 'Cicaplast Baume B5+ Cream',
    'dieux-instant-angel': 'Instant Angel Barrier Cream',
    'topicals-faded-serum': 'Faded Dark Spot Serum',
    'boj-relief-sun-spf50': 'Relief Sun Rice + Probiotics SPF 50',
    'medik8-crystal-retinal-6': 'Crystal Retinal 6 Night Serum',
    'tower28-sos-spray': 'SOS Daily Rescue Facial Mist',
    'panoxyl-10-bpo-wash': '10% Benzoyl Peroxide Wash',
    'drunk-elephant-babyfacial': 'Sukari Babyfacial Weekly Mask',
    'aestura-atobarrier-365': 'Atobarrier 365 Ceramide Cream',
    'stratia-lipid-gold': 'Lipid Gold Barrier Lotion',
    'nizoral-ketoconazole-1': 'Nizoral Blemish & Bump Wash',
    'malezia-5-urea-moisturizer': '5% Urea Barrier Moisturizer',
    'rohto-melano-cc': 'Melano CC Vitamin C Essence',
    'sunday-riley-ceo-15': 'C.E.O. 15% Vitamin C Serum'
  };
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
    const isAcid = prod.ph <= 4.0;
    const isCream = (prod.category || '').toLowerCase().includes('cream') || (prod.category || '').toLowerCase().includes('moistur') || (prod.category || '').toLowerCase().includes('retin');
    return isAcid ? 'toner_acid' : isCream ? 'cream_retinol' : 'active_serum';
  };
  const tonerCount = products.filter((p) => getTexGroup(p) === 'toner_acid').length;
  const serumCount = products.filter((p) => getTexGroup(p) === 'active_serum').length;
  const creamCount = products.filter((p) => getTexGroup(p) === 'cream_retinol').length;
  const productCheckboxesHtml = products.map((prod) => {
    const isChecked = selectedSet.has(prod.id);
    const partner = prod.priceUsd >= 50 ? 'Dermstore' : 'Sephora';
    const partnerSlug = partner.toLowerCase();
    const texGroup = getTexGroup(prod);
    const roleTag = categoryLabelMap[prod.category] || 'Daily Skincare';
    const cleanProdName = shortNameMap[prod.id] || String(prod.name || '').replace(/\s*\([^)]*\)/g, '');
    return `
      <label class="prod-check-item ${isChecked ? 'selected' : ''}" data-prod-label="${escapeHtml(prod.id)}" data-tex-group="${texGroup}">
        <input type="checkbox" name="routineProduct" value="${escapeHtml(prod.id)}" ${isChecked ? 'checked' : ''} onchange="toggleProductChip(this)" />
        <span style="flex:1;min-width:0;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
          <span>
            <span style="display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:3px;">
              <span style="font-size:0.78rem;color:var(--text-secondary);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(prod.brand)}</span>
              <span class="mono" style="font-size:0.72rem;padding:1px 7px;background:${isChecked ? 'var(--rose-brand)' : 'var(--bg-oat)'};color:${isChecked ? 'var(--accent-ink)' : 'var(--text-secondary)'};font-weight:500;flex-shrink:0;">${isChecked ? 'Selected' : '+ Add'}</span>
            </span>
            <strong class="serif-display" style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:var(--text-primary);font-size:1.02rem;font-weight:400;line-height:1.2;margin-bottom:4px;">${escapeHtml(cleanProdName)}</strong>
            <span class="mono" style="color:var(--rose-brand);font-size:0.78rem;font-weight:500;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${roleTag} · $${prod.priceUsd}</span>
          </span>
          <a href="/api/affiliate?product=${escapeHtml(prod.id)}&partner=${partnerSlug}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" style="margin-top:auto;" onclick="event.stopPropagation()">Shop at ${partner} &rarr;</a>
        </span>
      </label>
    `;
  }).join('');

  return `
    <div id="checker"></div>
    <div class="hero-grid" id="analyzer" data-ui="vanity-audit-workbench">
      <div class="grader-card" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">
        <div class="porcelain-vessel-core" style="height:100%;display:flex;flex-direction:column;justify-content:space-between;gap:16px;">
          <div style="flex:1;display:flex;flex-direction:column;min-height:0;gap:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
              <span class="mono" style="font-size:0.9rem;color:var(--rose-brand);font-weight:500;">Bathroom Vanity Shelf Builder</span>
              <span class="badge-safe mono" id="shelfCountBadge">${products.length} Popular Bottles</span>
            </div>

            <div id="textureFilterTabs" role="group" aria-label="Filter Bathroom Shelf by Texture">
              <button type="button" class="vanity-light-btn active mono" aria-pressed="true" onclick="filterShelfByTexture('all', this)">All (${products.length})</button>
              <button type="button" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('toner_acid', this)">Toners &amp; Acids (${tonerCount})</button>
              <button type="button" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('active_serum', this)">Serums (${serumCount})</button>
              <button type="button" class="vanity-light-btn mono" aria-pressed="false" onclick="filterShelfByTexture('cream_retinol', this)">Creams &amp; Retinol (${creamCount})</button>
            </div>

            <div class="shelf-search-row">
              <input id="productFilterInput" type="search" aria-label="Search skincare products" class="input-box" style="padding:10px 12px;font-size:0.88rem;" placeholder="Search brand or bottle..." oninput="filterProductList(this.value)" />
              <select id="skinTypeSelect" class="input-box" style="padding:10px 10px;font-size:0.88rem;" aria-label="Your Skin Type" onchange="runRoutineAnalysis()">
                <option value="combination" ${currentSkin === 'combination' ? 'selected' : ''}>Skin: Combination</option>
                <option value="sensitive" ${currentSkin === 'sensitive' ? 'selected' : ''}>Skin: Sensitive</option>
                <option value="oily" ${currentSkin === 'oily' ? 'selected' : ''}>Skin: Oily / Blemish</option>
                <option value="dry" ${currentSkin === 'dry' ? 'selected' : ''}>Skin: Dry</option>
                <option value="normal" ${currentSkin === 'normal' ? 'selected' : ''}>Skin: Balanced</option>
              </select>
            </div>

            <div class="product-selector-grid" id="productSelectorGrid" style="margin-bottom:0;">
              ${productCheckboxesHtml}
            </div>

            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="mono" style="font-size:0.88rem;font-weight:500;color:var(--text-secondary);">Or load a common bathroom shelf preset:</span>
              </div>
              <div class="preset-row" id="presetButtonsRow" style="margin-bottom:0;">
                ${presetButtonsHtml}
              </div>
            </div>

            <div style="flex:1;display:flex;flex-direction:column;padding:16px 18px;background:var(--bg-canvas);">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
                <label class="field-label" for="rawInciTextarea" style="margin:0;font-size:0.9rem;">Paste Any Ingredient List for a Pore-Clogging &amp; Blemish Check</label>
                <button type="button" class="btn-secondary" style="padding:6px 12px;font-size:0.82rem;min-height:34px;" onclick="pasteSampleComedogenicInci()">Try Pore-Clogging Sample</button>
              </div>
              <textarea id="rawInciTextarea" class="textarea-box mono" rows="3" style="flex:1;min-height:76px;" placeholder="e.g., Aqua, Ascorbic Acid 15%, Copper Tripeptide-1, Glycolic Acid 7%, Isopropyl Myristate...">${escapeHtml(initialRawInci || '')}</textarea>
              <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:8px;">Flags pore-clogging oils, waxes &amp; clashes across 65 skincare ingredients — helpful before buying a new moisturizer or foundation.</div>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding-top:4px;">
            <button type="button" id="analyzeBtn" class="btn-primary" style="flex:1;padding:14px 24px;" onclick="runRoutineAnalysis()">
              <span>Check My Bathroom Shelf</span>
              <span class="btn-icon-circle">&rarr;</span>
            </button>
            <button type="button" class="btn-secondary" style="padding:13px 20px;" onclick="clearRoutineSelection()">Clear Tray</button>
          </div>
        </div>
      </div>

      <div class="results-panel" id="liveResultsContainer" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">
        ${renderAnalysisResultHtml(initialAnalysis)}
      </div>
    </div>

    <div id="checkoutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle" data-ui="checkout-dialog">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span class="badge-safe mono" id="modalBanditBadge">DermLogic Instant Fulfillment · $1.99 Stripe Express</span>
          <button type="button" class="btn-secondary" style="padding:6px 14px;min-height:34px;" onclick="closeCheckoutModal()">Close</button>
        </div>
        <h3 id="checkoutModalTitle" class="serif-display" style="font-size:1.75rem;margin-bottom:8px;">Save Your Complete 3-Card Porcelain Ritual Dossier ($1.99)</h3>
        <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:16px;">
          Includes your printable 4-Night Skin-Cycling calendar (.ICS), non-comedogenic clean swaps (.CSV), and 9:16 bathroom mirror phone lock-screen card.
        </p>
        <div style="margin-bottom:16px;">
          <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn-primary" style="width:100%;justify-content:center;text-decoration:none;padding:13px 20px;font-size:0.95rem;">
            <span>Get 3-Card Ritual Dossier ($1.99 Stripe Express)</span>
            <span class="btn-icon-circle">&rarr;</span>
          </a>
        </div>
        <form id="checkoutForm" onsubmit="submitSelfServeCheckout(event)" style="padding-top:12px;">
          <input type="hidden" id="checkoutPlanId" value="onetime_499" />
          <input type="text" name="website_hp" id="checkoutHoneypot" style="display:none !important" tabindex="-1" autocomplete="off" />
          <div style="margin-bottom:10px;">
            <label class="field-label" for="checkoutEmailInput">Email for Instant Ritual Delivery</label>
            <input id="checkoutEmailInput" type="email" required class="input-box" placeholder="you@skincare-ritual.com" value="patient@dermlogic.io" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
            <label class="prod-check-item selected" id="planOption499" onclick="selectCheckoutPlan('onetime_499')">
              <input type="radio" name="planChoice" value="onetime_499" checked />
              <span><strong style="display:block;">$4.99 Complete Kit</strong></span>
            </label>
            <label class="prod-check-item" id="planOption1999" onclick="selectCheckoutPlan('annual_1999')">
              <input type="radio" name="planChoice" value="annual_1999" />
              <span><strong style="display:block;">$19.99/yr Unlimited</strong></span>
            </label>
          </div>
          <button type="submit" id="checkoutSubmitBtn" class="btn-secondary" style="width:100%;">Complete Plan Checkout &rarr;</button>
        </form>
        <div id="checkoutSuccessBox" style="display:none;margin-top:16px;padding:14px;background:var(--sage-bg);color:var(--sage-safe);"></div>
      </div>
    </div>
  `;
}

function renderSingleConflictCard(c) {
  const isCritical = c.severity === 'CRITICAL';
  const badgeLabel = isCritical ? 'Cancels on Contact' : 'Space Apart · Irritation Risk';
  const nameA = String(c.ingredientA || c.inciA || '').replace(/\s*\([^)]*\)/g, '');
  const nameB = String(c.ingredientB || c.inciB || '').replace(/\s*\([^)]*\)/g, '');
  const cleanTitle = String(c.title || '').replace(/\s*\(pH[^)]*\)/gi, '');
  const cleanMechanism = String(c.mechanism || '').replace(/\s*\(pH[^)]*\)/gi, '').replace(/\blow-pH\s+/gi, '');
  const timingTip = isCritical ? 'Wear Morning & Night Apart' : 'Give 60 Seconds to Dry First';
  return `
    <div class="conflict-card ${escapeHtml(c.severity)}">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
        <span class="${isCritical ? 'badge-clash' : 'badge-warn'} mono">${badgeLabel}</span>
        <span class="mono" style="font-size:0.86rem;color:var(--text-secondary);font-weight:500;">${escapeHtml(nameA)} + ${escapeHtml(nameB)}</span>
      </div>
      <div class="serif-display" style="font-size:1.28rem;font-weight:400;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(cleanTitle)}</div>
      <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.58;margin-bottom:10px;">${escapeHtml(cleanMechanism)}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <span class="mono" style="font-size:0.82rem;color:var(--text-muted);">${timingTip}</span>
        <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=dermstore&conflict=${encodeURIComponent(c.ruleId || 'barrier-rescue')}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Fix &rarr;</a>
      </div>
    </div>
  `;
}

function renderAnalysisResultHtml(res) {
  const isCritical = res.conflicts.length > 0 && res.verdictStatus === 'CRITICAL_CLASH';
  const isWarn = res.conflicts.length > 0 && !isCritical;
  const scoreColor = isCritical ? 'var(--berry-clash)' : isWarn ? 'var(--honey-warn)' : 'var(--sage-safe)';
  const badgeClass = isCritical ? 'badge-clash' : isWarn ? 'badge-warn' : 'badge-safe';
  const topVerdictText = res.conflicts.length === 0 ? 'Safe Everyday Routine · Zero Clashes' : res.verdictLabel;

  const primaryConflicts = res.conflicts.slice(0, 1);
  const extraConflicts = res.conflicts.slice(1);

  const conflictsHtml = res.conflicts.length === 0
    ? `<div style="padding:18px 20px;background:var(--sage-bg);color:var(--sage-safe);font-size:0.94rem;line-height:1.58;margin-bottom:10px;">
         <div class="serif-display" style="font-size:1.25rem;color:var(--sage-safe);margin-bottom:4px;">Pure Shelf Harmony — Every Bottle Works Together</div>
         <div>Your selected bottles layer smoothly with zero stinging, canceling out, or makeup pilling. Apply from thinnest watery serum to richest moisturizer, and give each layer 60 seconds to settle.</div>
       </div>`
    : primaryConflicts.map(renderSingleConflictCard).join('') + (extraConflicts.length > 0 ? `
        <details style="margin-bottom:12px;background:var(--bg-canvas);padding:12px 16px;">
          <summary class="mono" style="cursor:pointer;font-size:0.9rem;font-weight:500;color:var(--rose-brand);">
            + See ${extraConflicts.length} more bottle ${extraConflicts.length === 1 ? 'clash' : 'clashes'} on your shelf
          </summary>
          <div style="margin-top:10px;">
            ${extraConflicts.map(renderSingleConflictCard).join('')}
          </div>
        </details>
      ` : '');

  const amFallbacks = [
    'Gentle Morning Cleanse on Damp Skin',
    'Vitamin C or Hydrating Serum Layer (Wait 60s)',
    'Barrier Moisturizer & Broad-Spectrum SPF 50'
  ];
  const amStepsHtml = (res.schedule.amSteps || []).slice(0, 3).map((s, idx) => {
    const rawStep = String(s.title || '').replace(/^pH\s*[\d.]+\s*/i, '');
    const cleanStepTitle = rawStep.includes('[LOCKED') ? amFallbacks[idx] || amFallbacks[1] : rawStep;
    return `
    <div style="padding:9px 12px;background:var(--bg-surface);display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px;">
      <div style="min-width:0;font-size:0.88rem;line-height:1.38;">
        <strong style="color:var(--text-primary);">${idx + 1}. ${escapeHtml(cleanStepTitle)}</strong>
      </div>
      <span class="mono" style="font-size:0.75rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:500;flex-shrink:0;white-space:nowrap;">${idx === 0 ? 'Apply First' : idx === 1 ? 'Wait 60s' : 'Morning SPF'}</span>
    </div>`;
  }).join('');

  const pmFallbacks = [
    'Gentle Evening Cleanse & Damp-Skin Prep',
    'Targeted Night Active (Exfoliant or Retinoid)',
    'Peptide Serum & Ceramide Barrier Cushion'
  ];
  const pmStepsHtml = (res.schedule.pmCycling || []).slice(0, 3).map((n, idx) => {
    const rawNight = String((n.steps && n.steps[0]) || '').replace(/^pH\s*[\d.]+\s*/i, '');
    const cleanNightStep = (!rawNight || rawNight.includes('[LOCKED')) ? pmFallbacks[idx] || pmFallbacks[2] : rawNight;
    return `
    <div style="padding:9px 12px;background:rgba(244,239,232,0.08);display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:6px;">
      <div style="min-width:0;font-size:0.88rem;line-height:1.38;color:#F4EFE8;">
        <strong>${escapeHtml(n.night.split('·')[0].trim())}:</strong> ${escapeHtml(cleanNightStep)}
      </div>
      <span class="mono" style="font-size:0.75rem;padding:2px 8px;background:#7A2332;color:#F4EFE8;font-weight:500;flex-shrink:0;white-space:nowrap;">${idx === 0 ? '45s Wait' : 'Alternate Nights'}</span>
    </div>`;
  }).join('');

  return `
    <div class="porcelain-vessel-core" style="height:100%;display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
          <span class="${badgeClass} mono">${escapeHtml(topVerdictText)}</span>
          <span class="mono" style="font-size:0.84rem;color:var(--text-secondary);">Pore Safety: ${res.comedogenicFlags.length === 0 ? 'Zero Clogging Oils' : `${res.comedogenicFlags.length} Pore Alert`}</span>
        </div>

        <div class="score-strip" style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;align-items:stretch;margin-bottom:14px;">
          <div class="metric-box" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Routine Verdict</div>
            <div class="serif-display" style="font-size:1.55rem;font-weight:400;color:${scoreColor};line-height:1.15;margin-top:2px;" id="compatibilityScoreValue">${isCritical ? 'Clash Found' : isWarn ? 'Space Apart' : 'Calm & Safe'}</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:2px;">${res.conflicts.length === 0 ? 'Bottles layer smoothly' : `${res.conflicts.length} bottle ${res.conflicts.length === 1 ? 'clash' : 'clashes'}`}</div>
          </div>
          <div class="metric-box" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Skin Barrier Feel</div>
            <div class="metric-val" style="color:${res.barrierHazardIndex > 50 ? 'var(--berry-clash)' : 'var(--sage-safe)'};font-size:1.55rem;margin-top:2px;">${res.barrierHazardIndex > 50 ? 'High Tingle' : 'Gentle'}</div>
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:2px;">${res.barrierHazardIndex > 50 ? 'Separate morning & night' : 'Calm moisture barrier'}</div>
          </div>
          <div class="metric-box" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Serum Value at Risk</div>
            <div class="metric-val" style="color:${(res.wastedShelfValueUsd || 0) > 0 ? 'var(--berry-clash)' : 'var(--sage-safe)'};font-size:1.55rem;margin-top:2px;" id="wastedShelfValueReadout">$${res.wastedShelfValueUsd || 0}<span style="font-size:0.85rem;color:var(--text-secondary);">/$${res.totalShelfValueUsd || 248}</span></div>
            <div style="font-size:0.82rem;color:var(--text-secondary);margin-top:2px;">${(res.wastedShelfValueUsd || 0) > 0 ? 'Canceled on contact' : '100% absorbed'}</div>
          </div>
        </div>

        <div id="conflictsListArea">${conflictsHtml}</div>
        <div id="walletConflicts" style="display:none;"></div>
      </div>

      <div style="display:flex;flex-direction:column;gap:14px;">
        <div style="display:grid;grid-template-columns:1fr;gap:14px;width:100%;" id="appleWalletCardPreview">
          <div style="padding:18px 20px;background:var(--bg-canvas);display:flex;flex-direction:column;justify-content:space-between;min-width:0;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="mono" style="font-size:0.8rem;font-weight:500;color:var(--honey-warn);">Morning Routine Order</span>
                <span class="badge-safe mono" style="font-size:0.76rem;padding:2px 8px;">No Pilling Under Makeup</span>
              </div>
              <div class="serif-display" style="font-size:1.25rem;font-weight:400;margin-bottom:10px;">Brighten &amp; Protect in Daylight</div>
              ${amStepsHtml}
            </div>
            <div style="font-size:0.84rem;color:var(--text-secondary);margin-top:6px;">Wait 60 seconds before applying sunscreen so makeup glides on smoothly.</div>
          </div>

          <div style="padding:18px 20px;background:#181412;color:#F4EFE8;display:flex;flex-direction:column;justify-content:space-between;min-width:0;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="mono" style="font-size:0.8rem;font-weight:500;color:#C9A45A;">Bedtime Routine Order</span>
                <span class="mono" style="font-size:0.76rem;padding:2px 8px;background:rgba(244,239,232,0.12);color:#F4EFE8;">Evening Recovery</span>
              </div>
              <div class="serif-display" style="font-size:1.25rem;font-weight:400;margin-bottom:10px;color:#F4EFE8;">Overnight Renewal &amp; Moisture Cushion</div>
              ${pmStepsHtml}
            </div>
            <button type="button" class="btn-primary" style="width:100%;font-size:0.86rem;padding:11px 14px;margin-top:10px;background:#C9A45A;color:#0C0A08;white-space:normal;text-align:center;" onclick="openCheckoutModal('onetime_499')">
              <span>Save Morning &amp; Bedtime Lock-Screen Card ($1.99)</span>
              <span class="btn-icon-circle">&rarr;</span>
            </button>
          </div>
        </div>

        <div style="padding:14px 16px;background:var(--bg-canvas);display:grid;grid-template-columns:repeat(4,1fr);gap:10px;">
          <div><div class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:500;">Night 1 · Polish</div><div style="font-size:0.84rem;color:var(--text-primary);margin-top:2px;">Gentle Exfoliant</div></div>
          <div><div class="mono" style="font-size:0.76rem;color:var(--honey-warn);font-weight:500;">Night 2 · Renew</div><div style="font-size:0.84rem;color:var(--text-primary);margin-top:2px;">Retinol / Tretinoin</div></div>
          <div><div class="mono" style="font-size:0.76rem;color:var(--sage-safe);font-weight:500;">Night 3 · Soothe</div><div style="font-size:0.84rem;color:var(--text-primary);margin-top:2px;">Peptide Serum</div></div>
          <div><div class="mono" style="font-size:0.76rem;color:var(--sage-safe);font-weight:500;">Night 4 · Cushion</div><div style="font-size:0.84rem;color:var(--text-primary);margin-top:2px;">Ceramide Cream</div></div>
        </div>
      </div>
    </div>
  `;
}

const CLIENT_SCRIPT = `
  window.__DERMLOGIC_LAST_RESULT = null;
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
        pill.textContent = checkbox.checked ? 'Selected' : '+ Add';
        pill.style.background = checkbox.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
        pill.style.color = checkbox.checked ? 'var(--accent-ink)' : 'var(--text-secondary)';
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
      const qOk = !q || el.textContent.toLowerCase().includes(q);
      const show = gOk && qOk;
      el.style.display = show ? 'flex' : 'none';
      if (show) vis++;
    });
    const badge = document.getElementById('shelfCountBadge');
    const labels = { all: 'Popular Bottles', toner_acid: 'Toners & Acids', active_serum: 'Serums', cream_retinol: 'Creams & Retinol' };
    if (badge) badge.textContent = vis + ' ' + (labels[group] || 'Bottles');
  }
  function filterShelfByTexture(group, btn) {
    window.__dlActiveTexGroup = group;
    document.querySelectorAll('#textureFilterTabs .vanity-light-btn').forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
    applyShelfFilters();
  }
  function filterProductList() {
    applyShelfFilters();
  }
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
    document.querySelectorAll('input[name="routineProduct"]').forEach((cb) => {
      cb.checked = productIds.includes(cb.value);
      const lbl = cb.closest('.prod-check-item');
      if (lbl) {
        lbl.classList.toggle('selected', cb.checked);
        const pill = lbl.querySelector('span.mono');
        if (pill) {
          pill.textContent = cb.checked ? 'Selected' : '+ Add';
          pill.style.background = cb.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
          pill.style.color = cb.checked ? 'var(--accent-ink)' : 'var(--text-secondary)';
        }
      }
    });
    runRoutineAnalysis(btn.getAttribute('data-preset-id'));
  }
  function pasteSampleComedogenicInci() {
    const el = document.getElementById('rawInciTextarea');
    if (el) {
      el.value = 'Aqua, Ascorbic Acid 15%, Copper Tripeptide-1, Glycolic Acid 7%, Isopropyl Myristate, Cocos Nucifera Oil, Polysorbate 20, Niacinamide, Ceramide NP';
      runRoutineAnalysis();
    }
  }
  function clearRoutineSelection() {
    document.querySelectorAll('input[name="routineProduct"]').forEach((cb) => {
      cb.checked = false;
      const lbl = cb.closest('.prod-check-item');
      if (lbl) {
        lbl.classList.remove('selected');
        const pill = lbl.querySelector('span.mono');
        if (pill) {
          pill.textContent = '+ Add';
          pill.style.background = 'var(--bg-oat)';
          pill.style.color = 'var(--text-secondary)';
        }
      }
    });
    const el = document.getElementById('rawInciTextarea');
    if (el) el.value = '';
    runRoutineAnalysis();
  }
  async function runRoutineAnalysis(presetSlug) {
    const checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map((cb) => cb.value);
    const skinType = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
    const rawInciText = (document.getElementById('rawInciTextarea') || {}).value || '';
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
        body: JSON.stringify({ skinType, productIds: checked, rawInciText, renderHtml: true })
      });
      const data = await resp.json();
      window.__DERMLOGIC_LAST_RESULT = data;
      const container = document.getElementById('liveResultsContainer');
      if (container && data.renderedHtml) container.innerHTML = data.renderedHtml;
      fireMetaCapiEvent('Lead', 0, { compatibilityScore: data.compatibilityScore, conflictsCount: (data.conflicts || []).length });
    } catch (e) {
      console.error('Routine analysis error:', e);
    } finally {
      if (btn) btn.innerHTML = '<span>Check My Bathroom Shelf</span><span class="btn-icon-circle">&rarr;</span>';
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
      if (box) {
        box.style.display = 'block';
        box.innerHTML = '<strong>Order ' + res.order.order_id + ' Ready:</strong> ' + res.message + ' <br/><a href="' + (res.downloadUrl || '/buy/complete_dossier') + '" class="mono" style="font-size:0.84rem;color:var(--rose-brand);text-decoration:underline;font-weight:500;">Proceed to Stripe Checkout / Download (' + res.downloadUrl + ') &rarr;</a>';
      }
      fireMetaCapiEvent('Purchase', res.order.amount_cents / 100, { order_id: res.order.order_id, plan_id: planId });
      if (!navigator.webdriver && res.downloadUrl && res.downloadUrl.startsWith('https://checkout.stripe.com')) window.location.href = res.downloadUrl;
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
    fireMetaCapiEvent('ViewContent', 0, { path: window.location.pathname });
  });
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
