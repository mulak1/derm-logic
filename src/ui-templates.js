/**
 * DermLogic (#4): Direction 05 · Atelier Céramique — Z-Axis Porcelain Cascade & Viscosity Wait-Time Sequencer
 * 60-30-10 WCAG AAA Palette: Warm Silk Crepe (#FAF7F2), Unfired Bisque (#EFE9DF), Fired Clay Umber (#221A16), Crushed Mulberry (#8A283B), Celadon Glaze (#264C3C).
 */

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const BRAND_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="36" height="36" role="img" aria-label="DermLogic Atelier Céramique Emblem" style="flex-shrink:0;display:block;">
  <defs>
    <linearGradient id="dlRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#A8384E"/><stop offset="50%" stop-color="#8A283B"/><stop offset="100%" stop-color="#5E1927"/>
    </linearGradient>
    <linearGradient id="dlSilkBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDFB"/><stop offset="100%" stop-color="#EFE9DF"/>
    </linearGradient>
  </defs>
  <circle cx="20" cy="20" r="19" fill="url(#dlSilkBg)" stroke="url(#dlRoseGold)" stroke-width="1.5"/>
  <circle cx="20" cy="20" r="15.5" fill="none" stroke="#DCD3C6" stroke-width="0.75" stroke-dasharray="2 1.5"/>
  <path d="M20 9.5 C20 9.5 26.8 17.6 26.8 22.6 C26.8 26.4 23.8 29.5 20 29.5 C16.2 29.5 13.2 26.4 13.2 22.6 C13.2 17.6 20 9.5 20 9.5 Z" fill="url(#dlRoseGold)"/>
  <path d="M16.5 21.2 C16.2 23.6 17.6 25.8 19.8 26.3" fill="none" stroke="#FFFDFB" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M20 29.5 C22.8 29.5 25.5 31.2 26.5 33.2 C23.6 33.6 21.2 32.1 20 29.5 Z" fill="#264C3C"/>
  <path d="M20 29.5 C17.2 29.5 14.5 31.2 13.5 33.2 C16.4 33.6 18.8 32.1 20 29.5 Z" fill="#264C3C" opacity="0.85"/>
  <circle cx="20" cy="17.2" r="1.3" fill="#FFFDFB"/>
</svg>`;

const SHARED_CSS = `
  :root {
    --bg-canvas: #FAF7F2;
    --bg-oat: #EFE9DF;
    --bg-surface: #FFFDFB;
    --bg-porcelain: rgba(255, 253, 251, 0.96);
    --border-hairline: #DED6C9;
    --border-strong: #E4C5CC;
    --text-primary: #221A16;
    --text-secondary: #544841;
    --text-muted: #786A61;
    --rose-brand: #8A283B;
    --rose-brand-hover: #6E1E2E;
    --rose-pill-bg: #F9EFF1;
    --rose-pill-border: #E4C5CC;
    --sage-safe: #264C3C;
    --sage-bg: #EBF3EF;
    --sage-border: #BDDBD0;
    --honey-warn: #7D5116;
    --honey-bg: #FCF5EB;
    --honey-border: #EAD3B3;
    --berry-clash: #8A283B;
    --berry-bg: #FDF2F4;
    --berry-border: #F2C9D1;
    --shadow-luxury: inset 0 1px 0 #FFFFFF, 0 24px 54px -16px rgba(34, 26, 22, 0.09);
    --shadow-soft: inset 0 1px 0 #FFFFFF, 0 12px 30px -10px rgba(34, 26, 22, 0.07);
    --radius-shell: 32px 16px 32px 16px;
    --radius-card: 26px 12px 26px 12px;
    --radius-input: 14px;
    --radius-pill: 9999px;
    --ease-spring: cubic-bezier(0.32, 0.72, 0, 1);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background-color: var(--bg-canvas);
    background-image: radial-gradient(circle at 15% 8%, rgba(249, 239, 241, 0.7) 0%, transparent 45%),
                      radial-gradient(circle at 85% 18%, rgba(239, 233, 223, 0.85) 0%, transparent 50%);
    color: var(--text-primary);
    font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.62;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
    transition: background-color 0.55s var(--ease-spring);
  }
  body.vanity-daylight { --bg-canvas: #F3F5F7; --bg-oat: #E6EBEF; }
  .serif-display {
    font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .serif-italic {
    font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif;
    font-style: italic;
    font-weight: 500;
  }
  .mono {
    font-family: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;
    font-variant-numeric: tabular-nums;
  }
  a { color: inherit; text-decoration: none; }
  button, select, textarea, input { font: inherit; color: inherit; }
  .container { max-width: 1360px; margin: 0 auto; padding: 0 24px; }

  .site-header { border-bottom: 1px solid rgba(34, 26, 22, 0.09); background: rgba(250, 247, 242, 0.9); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); position: sticky; top: 0; z-index: 40; }
  .nav-inner { min-height: 72px; padding: 10px 0; display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
  .brand-logo-link { display: inline-flex; align-items: center; gap: 11px; font-size: 1.42rem; color: var(--text-primary); text-decoration: none; transition: opacity 220ms var(--ease-spring); }
  .brand-logo-link:hover { opacity: 0.88; }
  .nav-links { display: flex; align-items: center; gap: 22px; font-size: 0.88rem; font-weight: 600; color: var(--text-secondary); flex-wrap: wrap; }
  .nav-links a { transition: color 220ms var(--ease-spring); }
  .nav-links a:hover { color: var(--rose-brand); }
  .vanity-light-pill { display: inline-flex; background: var(--bg-oat); border: 1px solid var(--border-hairline); border-radius: var(--radius-pill); padding: 3px; gap: 3px; }
  .vanity-light-btn { border: none; background: transparent; padding: 4px 10px; border-radius: var(--radius-pill); font-size: 0.75rem; font-weight: 600; color: var(--text-secondary); cursor: pointer; transition: all 300ms var(--ease-spring); }
  .vanity-light-btn.active { background: var(--text-primary); color: var(--bg-canvas); }

  /* Z-Axis Overlapping Porcelain Cascade & Viscosity Wait-Time Sequencer */
  .z-cascade-stage { display: grid; grid-template-columns: 0.95fr 1.16fr 0.95fr; gap: 0px; align-items: stretch; margin-top: 28px; }
  .z-vessel-left, .z-vessel-center, .z-vessel-right { background: rgba(34, 26, 22, 0.04); border: 1px solid rgba(34, 26, 22, 0.09); padding: 8px; border-radius: 36px 16px 36px 16px; box-shadow: 0 28px 60px -18px rgba(34, 26, 22, 0.1); transition: transform 480ms var(--ease-spring); display: flex; }
  .z-vessel-left { transform: rotate(-1.35deg) translateX(12px); z-index: 2; }
  .z-vessel-left:hover { transform: rotate(0deg) translateY(-5px); z-index: 10; }
  .z-vessel-center { transform: translateY(-10px); z-index: 5; background: rgba(138, 40, 59, 0.07); border-color: rgba(138, 40, 59, 0.22); }
  .z-vessel-center:hover { transform: translateY(-15px); }
  .z-vessel-right { transform: rotate(1.35deg) translateX(-12px); z-index: 3; }
  .z-vessel-right:hover { transform: rotate(0deg) translateY(-5px); z-index: 10; }
  .porcelain-vessel-core { background: var(--bg-surface); border: 1px solid rgba(34, 26, 22, 0.07); border-radius: 29px 11px 29px 11px; padding: 26px 24px; box-shadow: inset 0 1px 0 #FFFFFF; width: 100%; display: flex; flex-direction: column; justify-content: space-between; }
  .viscosity-seq-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin: 14px 0; }
  .viscosity-seq-item { padding: 11px 14px; border-radius: 16px; background: var(--bg-canvas); border: 1px solid var(--border-hairline); display: flex; justify-content: space-between; align-items: center; gap: 10px; }
  .wait-timer-btn { padding: 5px 11px; border-radius: var(--radius-pill); background: var(--bg-oat); border: 1px solid var(--border-hairline); color: var(--text-primary); font-size: 0.75rem; font-weight: 700; cursor: pointer; white-space: nowrap; transition: all 260ms var(--ease-spring); }
  .wait-timer-btn:hover, .wait-timer-btn.running { background: var(--rose-brand); color: #FFFFFF; border-color: var(--rose-brand); }
  @media (max-width: 980px) {
    .z-cascade-stage { grid-template-columns: 1fr; gap: 20px; }
    .z-vessel-left, .z-vessel-center, .z-vessel-right { transform: none !important; margin: 0 !important; }
  }

  .btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 10px; background: var(--text-primary); color: var(--bg-canvas); font-weight: 600; font-size: 0.88rem; padding: 9px 12px 9px 20px; border-radius: var(--radius-pill); border: 1px solid var(--text-primary); cursor: pointer; white-space: nowrap; box-shadow: 0 10px 24px -8px rgba(34, 26, 22, 0.28); transition: transform 350ms var(--ease-spring), background-color 300ms var(--ease-spring); }
  .btn-primary:hover { background: var(--rose-brand); border-color: var(--rose-brand); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-icon-circle { width: 24px; height: 24px; border-radius: 50%; background: rgba(250, 247, 242, 0.18); display: inline-flex; align-items: center; justify-content: center; font-size: 0.84rem; transition: transform 350ms var(--ease-spring); }
  .btn-primary:hover .btn-icon-circle { transform: translate(2px, -2px) scale(1.06); }
  .btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: var(--bg-surface); color: var(--text-primary); font-weight: 600; font-size: 0.84rem; padding: 8px 16px; border-radius: var(--radius-pill); border: 1px solid var(--border-hairline); cursor: pointer; white-space: nowrap; transition: transform 300ms var(--ease-spring), border-color 300ms var(--ease-spring), background-color 300ms var(--ease-spring); }
  .btn-secondary:hover { border-color: var(--rose-pill-border); background: var(--rose-pill-bg); color: var(--rose-brand); }
  .btn-secondary:active { transform: scale(0.98); }

  .affiliate-link-pill { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: var(--radius-pill); background: #FFFFFF; border: 1px solid var(--rose-pill-border); color: var(--rose-brand); font-size: 0.8125rem; font-weight: 700; text-decoration: none; transition: background-color 220ms var(--ease-spring), border-color 220ms var(--ease-spring); }
  .affiliate-link-pill:hover { background: var(--rose-pill-bg); border-color: var(--rose-brand); }
  .affiliate-micro-link { display: inline-block; margin-top: 3px; font-size: 0.8125rem; font-weight: 600; color: var(--sage-safe); text-decoration: underline; text-underline-offset: 2px; }
  .affiliate-micro-link:hover { color: var(--rose-brand); }

  .hero-section { padding: 32px 0 60px; border-bottom: 1px solid var(--border-hairline); }
  .editorial-top-banner { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 28px; align-items: center; margin-bottom: 28px; }
  .editorial-photo-shell { background: rgba(34, 26, 22, 0.04); border: 1px solid rgba(34, 26, 22, 0.09); border-radius: var(--radius-shell); padding: 8px; box-shadow: var(--shadow-luxury); position: relative; }
  .editorial-photo-inner { border-radius: 25px 10px 25px 10px; overflow: hidden; position: relative; height: 220px; background: #EFE9DF; }
  .editorial-photo-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .editorial-photo-caption { position: absolute; bottom: 12px; left: 12px; right: 12px; background: rgba(255, 253, 251, 0.92); backdrop-filter: blur(8px); border: 1px solid var(--border-hairline); border-radius: 14px; padding: 9px 14px; display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 0.84rem; }
  .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 28px; align-items: start; }
  @media (max-width: 1024px) {
    .editorial-top-banner, .hero-grid { grid-template-columns: 1fr; }
    .nav-links { width: 100%; order: 3; justify-content: flex-start; gap: 14px; padding-top: 8px; border-top: 1px solid var(--border-hairline); font-size: 0.85rem; overflow-x: auto; flex-wrap: nowrap; white-space: nowrap; }
    .hide-mobile { display: none !important; }
  }
  @media (max-width: 640px) {
    .container { padding: 0 16px; }
    .grader-card, .results-panel { padding: 16px; }
    .filter-profile-grid { grid-template-columns: 1fr !important; }
    .brand-logo-link { font-size: 1.15rem; gap: 8px; }
    .brand-logo-link svg { width: 30px; height: 30px; }
    .brand-atelier-word { display: none; }
    .site-header .btn-primary { padding: 8px 14px; font-size: 0.84rem; gap: 6px; }
    .site-header .btn-icon-circle { width: 20px; height: 20px; font-size: 0.8125rem; }
    .nav-links { font-size: 0.84rem; gap: 12px; }
  }

  .eyebrow-pill { display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px; border-radius: var(--radius-pill); background: var(--bg-oat); border: 1px solid var(--border-hairline); color: var(--rose-brand); font-size: 0.78rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 14px; }
  .hero-h1 { font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif; font-size: clamp(2.25rem, 4vw, 3.6rem); line-height: 1.05; letter-spacing: -0.025em; font-weight: 500; color: var(--text-primary); margin-bottom: 12px; }
  .hero-sub { color: var(--text-secondary); font-size: 1.02rem; max-width: 58ch; margin-bottom: 8px; }

  .grader-card, .results-panel { background: var(--bg-porcelain); border: 1px solid rgba(34, 26, 22, 0.1); border-radius: var(--radius-shell); padding: 24px; box-shadow: var(--shadow-luxury); }
  .preset-row { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 18px; }
  @media (max-width: 640px) { .preset-row { grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 12px; } .preset-chip { padding: 7px 9px !important; } .product-selector-grid { max-height: 155px !important; } }
  .preset-chip { background: var(--bg-canvas); border: 1px solid var(--border-hairline); border-radius: 16px; padding: 10px 13px; font-size: 0.85rem; cursor: pointer; text-align: left; transition: transform 250ms var(--ease-spring), border-color 250ms var(--ease-spring), background-color 250ms var(--ease-spring); }
  .preset-chip:hover, .preset-chip.active { border-color: var(--rose-brand); background: var(--rose-pill-bg); }
  .preset-chip:active { transform: scale(0.98); }
  .preset-chip strong { display: block; color: var(--text-primary); font-size: 0.88rem; font-weight: 600; margin-bottom: 2px; }
  .preset-chip span { color: var(--rose-brand); font-size: 0.8125rem; font-weight: 600; }
  .field-label { display: block; font-size: 0.88rem; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
  .product-selector-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px; max-height: 225px; overflow-y: auto; padding: 10px; background: var(--bg-canvas); border: 1px solid var(--border-hairline); border-radius: var(--radius-input); margin-bottom: 14px; }
  .prod-check-item { display: flex; align-items: flex-start; gap: 8px; padding: 8px 10px; border-radius: 12px; background: var(--bg-surface); border: 1px solid var(--border-hairline); cursor: pointer; font-size: 0.84rem; transition: border-color 200ms var(--ease-spring), background-color 200ms var(--ease-spring); }
  .prod-check-item.selected { border-color: var(--rose-brand); background: var(--rose-pill-bg); }
  .prod-check-item input { margin-top: 3px; accent-color: var(--rose-brand); }
  .input-box, .textarea-box { width: 100%; background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: var(--radius-input); padding: 10px 12px; color: var(--text-primary); font-size: 16px; }
  .input-box:focus, .textarea-box:focus { outline: 2px solid var(--rose-brand); border-color: transparent; }

  .score-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
  .metric-box { background: var(--bg-canvas); border: 1px solid var(--border-hairline); border-radius: 16px; padding: 13px; }
  .metric-val { font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif; font-size: 2rem; font-weight: 700; line-height: 1.05; }

  .badge-safe, .badge-clash, .badge-warn { display: inline-flex; align-items: center; padding: 4px 11px; border-radius: var(--radius-pill); font-size: 0.8125rem; font-weight: 700; }
  .badge-safe { background: var(--sage-bg); border: 1px solid var(--sage-border); color: var(--sage-safe); }
  .badge-clash { background: var(--berry-bg); border: 1px solid var(--berry-border); color: var(--berry-clash); }
  .badge-warn { background: var(--honey-bg); border: 1px solid var(--honey-border); color: var(--honey-warn); }

  .conflict-card { background: var(--berry-bg); border: 1px solid var(--berry-border); border-left: 4px solid var(--berry-clash); border-radius: 16px; padding: 14px; margin-bottom: 10px; }
  .conflict-card.MODERATE { background: var(--honey-bg); border-color: var(--honey-border); border-left: 4px solid var(--honey-warn); }

  .ph-scale-bar { position: relative; height: 22px; border-radius: var(--radius-pill); background: linear-gradient(90deg, #E28596 0%, #E8BC84 36%, #88C4A6 70%, #9EC5C8 100%); border: 1px solid var(--border-hairline); margin: 8px 0; box-shadow: inset 0 1px 3px rgba(34, 26, 22, 0.08); }
  .ph-pin { position: absolute; top: -3px; bottom: -3px; width: 4px; border-radius: 4px; background: #FFFFFF; border: 1.5px solid var(--rose-brand); transform: translateX(-50%); box-shadow: 0 2px 6px rgba(34, 26, 22, 0.18); }
  .ph-chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .ph-chip { display: inline-flex; align-items: center; gap: 5px; background: #FFFFFF; color: var(--text-primary); border: 1px solid var(--border-hairline); border-radius: var(--radius-pill); padding: 3px 10px; font-size: 0.8125rem; font-weight: 700; box-shadow: 0 2px 6px rgba(34, 26, 22, 0.05); }

  .wallet-preview-wrap { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 16px; margin-top: 16px; }
  @media (max-width: 768px) { .wallet-preview-wrap, .score-strip { grid-template-columns: 1fr; } }
  .wallet-card-916 { aspect-ratio: 9 / 15.2; max-width: 270px; margin: 0 auto; width: 100%; background: linear-gradient(165deg, #FFFDFB 0%, #EFE9DF 58%, #F9EFF1 100%); border: 1px solid var(--rose-pill-border); border-radius: 26px 12px 26px 12px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-luxury); }

  .section-block { padding: 64px 0; border-bottom: 1px solid var(--border-hairline); }
  .bento-grid-3 { display: grid; grid-template-columns: 1.2fr 0.9fr 0.9fr; gap: 20px; margin-top: 24px; }
  @media (max-width: 960px) { .bento-grid-3 { grid-template-columns: 1fr; } }
  .bento-cell { background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-soft); }
  .bento-cell.tinted { background: linear-gradient(155deg, #F9EFF1 0%, #FFFDFB 100%); border-color: var(--rose-pill-border); }

  .table-wrap { overflow-x: auto; border: 1px solid var(--border-hairline); border-radius: var(--radius-card); background: var(--bg-surface); box-shadow: var(--shadow-soft); }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid var(--border-hairline); }
  th { color: var(--text-secondary); font-weight: 700; font-size: 0.8125rem; background: var(--bg-oat); }
  .site-footer { padding: 44px 0; background: var(--bg-oat); color: var(--text-secondary); font-size: 0.9rem; }
  .cookie-banner { width: 100%; background: var(--bg-oat); border-top: 1px solid var(--border-hairline); padding: 12px 0; display: none; }
  .cookie-banner-inner { display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap; }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(34, 26, 22, 0.45); backdrop-filter: blur(8px); display: none; align-items: center; justify-content: center; padding: 20px; z-index: 80; }
  .modal-card { background: var(--bg-surface); border: 1px solid var(--rose-pill-border); border-radius: var(--radius-shell); max-width: 560px; width: 100%; padding: 28px; box-shadow: var(--shadow-luxury); }
`;

function renderHeader(hideNav = false) {
  if (hideNav) {
    return `
      <header class="site-header">
        <div class="container nav-inner">
          <a href="/" class="brand-logo-link" aria-label="DermLogic Home">
            ${BRAND_LOGO_SVG}
            <span class="serif-display" style="font-weight:600;">DermLogic · <span class="serif-italic" style="color:var(--rose-brand);font-size:1.12rem;">Atelier <span class="brand-atelier-word">Céramique</span></span></span>
          </a>
          <div style="display:flex;align-items:center;gap:12px;">
            <span class="badge-safe mono hide-mobile">30-DAY SKINCARE HARMONY GUARANTEE</span>
            <a href="/#analyzer" class="btn-primary"><span>Audit My Shelf</span><span class="btn-icon-circle">↗</span></a>
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
          <span class="serif-display" style="font-weight:600;">DermLogic · <span class="serif-italic" style="color:var(--rose-brand);font-size:1.12rem;">Atelier <span class="brand-atelier-word">Céramique</span></span></span>
        </a>
        <nav class="nav-links" aria-label="Main Navigation">
          <a href="/#analyzer">Routine Ritual Audit</a>
          <a href="/#viscosity-sequencer">Wait-Time Pacing</a>
          <a href="/leaderboard" style="font-weight:700;color:var(--sage-safe);">🏆 Leaderboard</a>
          <a href="/directory">60+ Layering Guides</a>
        </nav>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="vanity-light-pill hide-mobile" role="group" aria-label="Vanity Lighting Calibration">
            <button type="button" class="vanity-light-btn active" onclick="setAtelierVanityLight('warm', this)">☀ 3000K Vanity</button>
            <button type="button" class="vanity-light-btn" onclick="setAtelierVanityLight('day', this)">✦ 5000K Day</button>
          </div>
          <a href="/buy/micro_pass?source=nav_cta" class="btn-primary">
            <span>Unlock 3-File Pack ($1.99)</span>
            <span class="btn-icon-circle">↗</span>
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
          We use privacy-safe first-party telemetry &amp; CAPI deduplication to personalize your skincare ritual. See our <a href="/privacy" style="text-decoration:underline;color:var(--rose-brand);">Privacy Policy</a>.
        </div>
        <div style="display:flex;gap:8px;">
          <button type="button" id="cookie-reject" class="btn-secondary" style="padding:6px 14px;font-size:0.8125rem;" onclick="setCookieConsent('rejected')">Reject</button>
          <button type="button" id="cookie-accept" class="btn-primary" style="padding:6px 16px;font-size:0.8125rem;" onclick="setCookieConsent('accepted')">Accept</button>
        </div>
      </div>
    </div>
    <footer class="site-footer">
      <div class="container" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px;align-items:center;">
        <div>
          <a href="/" class="brand-logo-link" aria-label="DermLogic Home" style="margin-bottom:6px;">
            ${BRAND_LOGO_SVG}
            <span class="serif-display" style="font-weight:700;">dermlogic <span class="serif-italic" style="color:var(--rose-brand);">clinical atelier</span></span>
          </a>
          <p style="color:var(--text-secondary);font-size:0.88rem;">
            Cosmetic-chemist verified pH windows, peptide &amp; Vitamin C compatibility, pore-safety, and AM/PM skin-cycling rituals.
            <span class="mono" style="font-size:0.8125rem;display:block;margin-top:2px;">Reader-supported formulation lab: verified links to Sephora &amp; Dermstore may earn an affiliate commission.</span>
          </p>
        </div>
        <div style="display:flex;gap:22px;flex-wrap:wrap;font-weight:600;font-size:0.88rem;">
          <a href="/#analyzer">Routine Ritual Audit</a>
          <a href="/leaderboard">🏆 Routine Leaderboard</a>
          <a href="/directory">60+ Layering Guides</a>
          <a href="/sitemap.xml">XML Sitemap</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
    <!-- Sovrn //Commerce Automated Affiliate Monetization -->
    <script type="text/javascript">
      var vglnk = { key: '${process.env.SOVRN_API_KEY || process.env.SOVRN_COMMERCE_KEY || 'ea3d7b74c5752fd817f896be27cd1a01'}' };
      (function(d, t) {
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

  const productCheckboxesHtml = products.map((prod) => {
    const isChecked = selectedSet.has(prod.id);
    const partner = prod.priceUsd >= 50 ? 'Dermstore' : 'Sephora';
    const partnerSlug = partner.toLowerCase();
    const isAcid = prod.ph <= 4.0;
    const isCream = (prod.category || '').toLowerCase().includes('cream') || (prod.category || '').toLowerCase().includes('moistur') || (prod.category || '').toLowerCase().includes('retin');
    const texGroup = isAcid ? 'toner_acid' : isCream ? 'cream_retinol' : 'active_serum';
    const texIcon = isAcid ? '💧' : isCream ? '🏺' : '🧪';
    const phTag = prod.ph <= 4.0 ? `pH ${prod.ph} (Acidic)` : prod.ph >= 5.8 ? `pH ${prod.ph} (Neutral)` : `pH ${prod.ph} (Balanced)`;
    return `
      <label class="prod-check-item ${isChecked ? 'selected' : ''}" data-prod-label="${escapeHtml(prod.id)}" data-tex-group="${texGroup}" style="border-radius:18px 8px 18px 8px;padding:11px 12px;transition:all 0.2s ease;">
        <input type="checkbox" name="routineProduct" value="${escapeHtml(prod.id)}" ${isChecked ? 'checked' : ''} onchange="toggleProductChip(this)" />
        <span style="flex:1;min-width:0;">
          <span style="display:flex;justify-content:space-between;align-items:center;gap:4px;margin-bottom:2px;">
            <span style="font-size:0.76rem;color:var(--text-secondary);font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${texIcon} ${escapeHtml(prod.brand)}</span>
            <span class="mono" style="font-size:0.68rem;padding:1px 6px;border-radius:999px;background:${isChecked ? 'var(--rose-brand)' : 'var(--bg-surface)'};color:${isChecked ? '#FFF' : 'var(--text-secondary)'};font-weight:700;">${isChecked ? 'ON TRAY ✓' : '+ TRAY'}</span>
          </span>
          <strong class="serif-display" style="display:block;color:var(--text-primary);font-size:1.02rem;line-height:1.15;margin-bottom:3px;">${escapeHtml(prod.name)}</strong>
          <span class="mono" style="color:var(--rose-brand);font-size:0.74rem;font-weight:600;display:block;">${phTag} · $${prod.priceUsd}</span>
          <a href="/api/affiliate?product=${escapeHtml(prod.id)}&partner=${partnerSlug}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" onclick="event.stopPropagation()">Shop at ${partner} ↗</a>
        </span>
      </label>
    `;
  }).join('');

  return `
    <div id="checker"></div>
    <div class="hero-grid" id="analyzer" style="align-items:stretch;">
      <div class="grader-card" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;border-radius:var(--radius-shell);background:rgba(239,233,223,0.75);padding:10px;border:1px solid var(--border-strong);">
        <div class="porcelain-vessel-core" style="height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:20px;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
              <span class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:700;letter-spacing:0.06em;">STEP 1 · APOTHECARY PORCELAIN SHELF BUILDER</span>
              <span class="badge-safe mono">44 Cult Bottles Indexed</span>
            </div>

            <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px;" id="textureFilterTabs">
              <button type="button" class="vanity-light-btn active mono" onclick="filterShelfByTexture('all', this)">✨ All Shelf Bottles (${products.length})</button>
              <button type="button" class="vanity-light-btn mono" onclick="filterShelfByTexture('toner_acid', this)">💧 1. Toners &amp; Acids</button>
              <button type="button" class="vanity-light-btn mono" onclick="filterShelfByTexture('active_serum', this)">🧪 2. Active Serums</button>
              <button type="button" class="vanity-light-btn mono" onclick="filterShelfByTexture('cream_retinol', this)">🏺 3. Creams &amp; Retinoids</button>
            </div>

            <div style="display:grid;grid-template-columns:1fr 185px;gap:8px;margin-bottom:10px;">
              <input id="productFilterInput" type="search" class="input-box" style="padding:8px 12px;font-size:0.84rem;" placeholder="Search Rhode, SkinCeuticals, Ordinary, Tretinoin..." oninput="filterProductList(this.value)" />
              <select id="skinTypeSelect" class="input-box" style="padding:8px 10px;font-size:0.84rem;" aria-label="Your Skin Type" onchange="runRoutineAnalysis()">
                <option value="combination" ${currentSkin === 'combination' ? 'selected' : ''}>Skin: Combination / Dewy</option>
                <option value="sensitive" ${currentSkin === 'sensitive' ? 'selected' : ''}>Skin: Sensitive / Rosacea</option>
                <option value="oily" ${currentSkin === 'oily' ? 'selected' : ''}>Skin: Oily / Breakout-Prone</option>
                <option value="dry" ${currentSkin === 'dry' ? 'selected' : ''}>Skin: Dry / Barrier Repair</option>
                <option value="normal" ${currentSkin === 'normal' ? 'selected' : ''}>Skin: Normal / Balanced</option>
              </select>
            </div>

            <div class="product-selector-grid" id="productSelectorGrid" style="max-height:245px;margin-bottom:12px;">
              ${productCheckboxesHtml}
            </div>

            <div style="margin-bottom:10px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span class="mono" style="font-size:0.74rem;font-weight:700;color:var(--text-secondary);">OR TAP A POPULAR VANITY TRAY PRESET:</span>
              </div>
              <div class="preset-row" id="presetButtonsRow" style="margin-bottom:0;">
                ${presetButtonsHtml}
              </div>
            </div>

            <details style="margin-bottom:12px;padding:10px 14px;border-radius:16px;background:var(--bg-canvas);border:1px dashed var(--border-strong);" ${initialRawInci ? 'open' : ''}>
              <summary style="cursor:pointer;font-size:0.82rem;font-weight:700;color:var(--text-primary);display:flex;justify-content:space-between;align-items:center;">
                <span>🧴 Have another product? Paste any Sephora / Ulta ingredient list</span>
                <span class="mono" style="font-size:0.74rem;color:var(--rose-brand);">+ Paste INCI ▾</span>
              </summary>
              <div style="margin-top:8px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                  <label class="field-label" for="rawInciTextarea" style="margin:0;font-size:0.75rem;">Paste Ingredient List for Instant Pore-Clogging Check</label>
                  <button type="button" class="btn-secondary" style="padding:2px 8px;font-size:0.75rem;" onclick="pasteSampleComedogenicInci()">Try Pore-Clogging Sample</button>
                </div>
                <textarea id="rawInciTextarea" class="textarea-box mono" rows="2" placeholder="e.g., Aqua, Ascorbic Acid 15%, Copper Tripeptide-1, Glycolic Acid 7%, Isopropyl Myristate...">${escapeHtml(initialRawInci || '')}</textarea>
              </div>
            </details>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;padding-top:10px;border-top:1px solid var(--border-hairline);">
            <button type="button" id="analyzeBtn" class="btn-primary" style="flex:1;" onclick="runRoutineAnalysis()">
              <span>Check My Porcelain Vanity Tray</span>
              <span class="btn-icon-circle">↗</span>
            </button>
            <button type="button" class="btn-secondary" onclick="clearRoutineSelection()">Clear Tray</button>
          </div>
        </div>
      </div>

      <div class="results-panel" id="liveResultsContainer" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;border-radius:var(--radius-shell);background:rgba(239,233,223,0.75);padding:10px;border:1px solid var(--border-strong);">
        ${renderAnalysisResultHtml(initialAnalysis)}
      </div>
    </div>

    <div id="checkoutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span class="eyebrow-pill mono" style="margin:0;" id="modalBanditBadge">ATELIER CÉRAMIQUE • $1.99 STRIPE EXPRESS</span>
          <button type="button" class="btn-secondary" style="padding:5px 12px;" onclick="closeCheckoutModal()">Close</button>
        </div>
        <h3 id="checkoutModalTitle" class="serif-display" style="font-size:1.65rem;margin-bottom:6px;">Unlock Your Complete 3-Card Porcelain Ritual Dossier ($1.99)</h3>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px;">
          Includes your printable 4-Night Skin-Cycling calendar (.ICS), non-comedogenic clean swaps (.CSV), and 9:16 bathroom mirror phone wallpaper card.
        </p>
        <div style="margin-bottom:14px;">
          <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn-primary" style="width:100%;justify-content:center;text-decoration:none;padding:13px 20px;font-size:0.95rem;">
            <span>Unlock 3-Card Ritual Dossier ($1.99 Stripe Express)</span>
            <span class="btn-icon-circle">↗</span>
          </a>
        </div>
        <details style="font-size:0.84rem;color:var(--text-secondary);">
          <summary style="cursor:pointer;font-weight:700;">Need Annual Unlimited Shelf Scans ($4.99–$19.99/yr)?</summary>
          <form id="checkoutForm" onsubmit="submitSelfServeCheckout(event)" style="margin-top:10px;">
            <input type="hidden" id="checkoutPlanId" value="onetime_499" />
            <input type="text" name="website_hp" id="checkoutHoneypot" style="display:none !important" tabindex="-1" autocomplete="off" />
            <div style="margin-bottom:10px;">
              <label class="field-label" for="checkoutEmailInput">Work / Personal Email</label>
              <input id="checkoutEmailInput" type="email" required class="input-box" placeholder="you@skincare-ritual.com" value="patient@dermlogic.io" />
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;">
              <label class="prod-check-item selected" id="planOption499" onclick="selectCheckoutPlan('onetime_499')">
                <input type="radio" name="planChoice" value="onetime_499" checked />
                <span><strong style="display:block;">$4.99 Ritual Pass</strong></span>
              </label>
              <label class="prod-check-item" id="planOption1999" onclick="selectCheckoutPlan('annual_1999')">
                <input type="radio" name="planChoice" value="annual_1999" />
                <span><strong style="display:block;">$19.99/yr Unlimited</strong></span>
              </label>
            </div>
            <button type="submit" id="checkoutSubmitBtn" class="btn-secondary" style="width:100%;">Complete Plan Checkout ↗</button>
          </form>
        </details>
        <div id="checkoutSuccessBox" style="display:none;margin-top:16px;padding:14px;border-radius:12px;background:var(--sage-bg);border:1px solid var(--sage-border);color:var(--sage-safe);"></div>
      </div>
    </div>
  `;
}

function renderSingleConflictCard(c) {
  const isCritical = c.severity === 'CRITICAL';
  const badgeLabel = isCritical ? '⚠️ CANCELS OUT POTENCY' : '⚡ SPACE APART · IRRITATION RISK';
  const nameA = c.ingredientA || c.inciA, nameB = c.ingredientB || c.inciB;
  return `
    <div class="conflict-card ${escapeHtml(c.severity)}" style="border-radius:18px 8px 18px 8px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
        <span class="${isCritical ? 'badge-clash' : 'badge-warn'} mono">${badgeLabel}</span>
        <span class="mono" style="font-size:0.78rem;color:var(--text-secondary);font-weight:700;">${escapeHtml(nameA)} + ${escapeHtml(nameB)}</span>
      </div>
      <div class="serif-display" style="font-size:1.15rem;font-weight:700;margin-bottom:3px;color:var(--text-primary);">${escapeHtml(c.title)}</div>
      <p style="color:var(--text-secondary);font-size:0.81rem;margin-bottom:6px;">${escapeHtml(c.mechanism)}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <span class="mono" style="font-size:0.74rem;color:var(--text-muted);">🔬 Acidity gap ΔpH ${c.deltaPh}</span>
        <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=dermstore&conflict=${encodeURIComponent(c.ruleId || 'barrier-rescue')}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Fix ↗</a>
      </div>
    </div>
  `;
}

function renderAnalysisResultHtml(res) {
  const isCritical = res.verdictStatus === 'CRITICAL_CLASH';
  const isWarn = res.verdictStatus === 'MODERATE_CAUTION';
  const scoreColor = isCritical ? 'var(--berry-clash)' : isWarn ? 'var(--honey-warn)' : 'var(--sage-safe)';
  const ringHex = isCritical ? '#8A283B' : isWarn ? '#7D5116' : '#264C3C';
  const badgeClass = isCritical ? 'badge-clash' : isWarn ? 'badge-warn' : 'badge-safe';

  const primaryConflicts = res.conflicts.slice(0, 1);
  const extraConflicts = res.conflicts.slice(1);

  const conflictsHtml = res.conflicts.length === 0
    ? `<div style="padding:12px 14px;border-radius:16px 8px 16px 8px;background:var(--sage-bg);border:1px solid var(--sage-border);color:var(--sage-safe);font-size:0.84rem;margin-bottom:10px;">
         <strong>✓ Pure Porcelain Harmony:</strong> Every bottle on your tray layers smoothly with zero acidity shock or pilling.
       </div>`
    : primaryConflicts.map(renderSingleConflictCard).join('') + (extraConflicts.length > 0 ? `
        <details style="margin-bottom:10px;border:1px solid var(--border-hairline);border-radius:12px;background:var(--bg-canvas);padding:8px 12px;">
          <summary class="mono" style="cursor:pointer;font-size:0.8rem;font-weight:700;color:var(--rose-brand);">
            + View ${extraConflicts.length} more bottle clash(es) on your tray ▾
          </summary>
          <div style="margin-top:8px;">
            ${extraConflicts.map(renderSingleConflictCard).join('')}
          </div>
        </details>
      ` : '');

  const amStepsHtml = (res.schedule.amSteps || []).slice(0, 3).map((s, idx) => `
    <div style="padding:7px 10px;border-radius:12px 6px 12px 6px;background:var(--bg-canvas);border:1px solid var(--border-hairline);display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:5px;">
      <div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;">
        <strong style="color:var(--text-primary);">${idx + 1}. ${idx === 0 ? escapeHtml(s.title) : '🔒 [Unlock Morning Step]'}</strong>
      </div>
      <span class="mono" style="font-size:0.7rem;padding:2px 7px;border-radius:999px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:700;flex-shrink:0;">${idx === 0 ? '⏱ 60s Wait' : `pH ${escapeHtml(s.ph)}`}</span>
    </div>
  `).join('');

  const pmStepsHtml = (res.schedule.pmCycling || []).slice(0, 3).map((n, idx) => `
    <div style="padding:7px 10px;border-radius:12px 6px 12px 6px;background:rgba(250,247,242,0.08);border:1px solid rgba(250,247,242,0.14);display:flex;justify-content:space-between;align-items:center;gap:6px;margin-bottom:5px;">
      <div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:0.8rem;color:#FAF7F2;">
        <strong>${escapeHtml(n.night.split('·')[0].trim())}:</strong> ${idx === 0 ? escapeHtml(n.steps[0] || 'Gentle Cleanse') : '🔒 [4-Night Cycle]'}
      </div>
      <span class="mono" style="font-size:0.7rem;padding:2px 7px;border-radius:999px;background:#8A283B;color:#FAF7F2;font-weight:700;flex-shrink:0;">${idx === 0 ? '⏱ 45s Wait' : 'Locked'}</span>
    </div>
  `).join('');

  return `
    <div class="porcelain-vessel-core" style="height:100%;display:flex;flex-direction:column;justify-content:space-between;padding:20px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <span class="${badgeClass} mono">${escapeHtml(res.verdictLabel)}</span>
          <span class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Vanity Shelf pH ${res.equilibriumSurfacePh || 5.5} · Pore Safety: ${res.comedogenicFlags.length === 0 ? '0 Clogs ✓' : `${res.comedogenicFlags.length} Alert`}</span>
        </div>

        <!-- Example 02: Ceramic Harmony Aura Dial + Shelf Value Readout -->
        <div class="score-strip" style="display:grid;grid-template-columns:112px 1fr 1fr;gap:10px;align-items:center;margin-bottom:12px;">
          <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:8px;border-radius:18px;background:var(--bg-canvas);border:1px solid var(--border-hairline);">
            <div style="width:74px;height:74px;border-radius:50%;background:conic-gradient(${ringHex} 0% ${res.compatibilityScore}%, #EFE9DF ${res.compatibilityScore}% 100%);display:flex;align-items:center;justify-content:center;">
              <div style="width:58px;height:58px;border-radius:50%;background:#FFFDFB;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                <span class="serif-display" style="font-size:1.45rem;font-weight:700;color:${scoreColor};line-height:1;" id="compatibilityScoreValue">${res.compatibilityScore}</span>
                <span class="mono" style="font-size:0.58rem;color:var(--text-secondary);">/100</span>
              </div>
            </div>
            <span class="mono" style="font-size:0.66rem;color:var(--text-secondary);margin-top:4px;font-weight:700;">HARMONY DIAL</span>
          </div>
          <div class="metric-box" style="border-radius:18px 8px 18px 8px;display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.7rem;color:var(--text-secondary);font-weight:700;">BARRIER STRESS</div>
            <div class="metric-val" style="color:${res.barrierHazardIndex > 50 ? 'var(--berry-clash)' : 'var(--sage-safe)'};font-size:1.55rem;">${res.barrierHazardIndex}<span style="font-size:0.85rem;color:var(--text-secondary);">/100</span></div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">${res.barrierHazardIndex > 50 ? 'High stinging risk' : 'Calm moisture barrier'}</div>
          </div>
          <div class="metric-box" style="border-radius:18px 8px 18px 8px;display:flex;flex-direction:column;justify-content:center;">
            <div class="mono" style="font-size:0.7rem;color:var(--text-secondary);font-weight:700;">SERUM VALUE LOST</div>
            <div class="metric-val" style="color:${(res.wastedShelfValueUsd || 0) > 0 ? 'var(--berry-clash)' : 'var(--sage-safe)'};font-size:1.55rem;" id="wastedShelfValueReadout">$${res.wastedShelfValueUsd || 0}<span style="font-size:0.8rem;color:var(--text-secondary);">/$${res.totalShelfValueUsd || 248}</span></div>
            <div style="font-size:0.75rem;color:var(--text-secondary);">${(res.wastedShelfValueUsd || 0) > 0 ? 'Canceled on contact' : '100% absorbed'}</div>
          </div>
        </div>

        <div id="conflictsListArea">${conflictsHtml}</div>
      </div>

      <!-- Example 02: Sunlit Morning Porcelain Tray vs. Midnight Stoneware Tray -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:auto;" id="appleWalletCardPreview">
        <div style="padding:12px;border-radius:20px 10px 20px 10px;background:#FFFDFB;border:1px solid var(--border-strong);display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <span class="mono" style="font-size:0.68rem;font-weight:700;color:var(--honey-warn);">☀️ MORNING PORCELAIN TRAY</span>
              <span class="badge-safe mono" style="font-size:0.64rem;padding:1px 6px;">NO PILLING</span>
            </div>
            <div class="serif-display" style="font-size:1.08rem;font-weight:700;margin-bottom:6px;">Brighten &amp; Shield Under SPF</div>
            ${amStepsHtml}
          </div>
          <div style="font-size:0.72rem;color:var(--text-secondary);margin-top:4px;">✨ Wait 60s before SPF so makeup never pills.</div>
        </div>

        <div style="padding:12px;border-radius:20px 10px 20px 10px;background:#221A16;color:#FAF7F2;border:1px solid #3D302A;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
              <span class="mono" style="font-size:0.68rem;font-weight:700;color:#E6C79C;">🌙 MIDNIGHT STONEWARE TRAY</span>
              <span class="mono" style="font-size:0.64rem;padding:1px 6px;border-radius:999px;background:rgba(250,247,242,0.14);color:#FAF7F2;">3000K VANITY</span>
            </div>
            <div class="serif-display" style="font-size:1.08rem;font-weight:700;margin-bottom:6px;color:#FAF7F2;">Overnight Barrier Recovery</div>
            ${pmStepsHtml}
          </div>
          <button type="button" class="btn-primary" style="width:100%;font-size:0.76rem;padding:7px 10px;margin-top:6px;background:#FAF7F2;color:#221A16;" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass')}else{openCheckoutModal('onetime_499')}">
            <span>Unlock 9:16 Mirror Card ($1.99)</span>
            <span class="btn-icon-circle" style="width:18px;height:18px;font-size:0.7rem;background:#8A283B;color:#FAF7F2;">↗</span>
          </button>
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
        pill.textContent = checkbox.checked ? 'ON TRAY ✓' : '+ TRAY';
        pill.style.background = checkbox.checked ? 'var(--rose-brand)' : 'var(--bg-surface)';
        pill.style.color = checkbox.checked ? '#FFF' : 'var(--text-secondary)';
      }
    }
    runRoutineAnalysis();
  }
  function filterShelfByTexture(group, btn) {
    document.querySelectorAll('#textureFilterTabs .vanity-light-btn').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    document.querySelectorAll('#productSelectorGrid .prod-check-item').forEach((el) => {
      const g = el.getAttribute('data-tex-group') || 'all';
      el.style.display = (group === 'all' || g === group) ? 'flex' : 'none';
    });
  }
  function filterProductList(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('#productSelectorGrid .prod-check-item').forEach((el) => {
      el.style.display = (!q || el.textContent.toLowerCase().includes(q)) ? 'flex' : 'none';
    });
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
      if (lbl) lbl.classList.toggle('selected', cb.checked);
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
      if (lbl) lbl.classList.remove('selected');
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
    if (btn) btn.innerHTML = '<span>Analyzing ΔpH Harmony...</span><span class="btn-icon-circle">↗</span>';
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
      if (btn) btn.innerHTML = '<span>Check My Routine Compatibility</span><span class="btn-icon-circle">↗</span>';
    }
  }
  function openCheckoutModal(planId) {
    selectCheckoutPlan(planId || 'onetime_499');
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'flex';
    fireMetaCapiEvent('StartTrial', planId === 'annual_1999' ? 19.99 : 4.99, { planId });
  }
  function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) modal.style.display = 'none';
  }
  function selectCheckoutPlan(planId) {
    const hidden = document.getElementById('checkoutPlanId');
    if (hidden) hidden.value = planId;
    const p499 = document.getElementById('planOption499');
    const p1999 = document.getElementById('planOption1999');
    const btn = document.getElementById('checkoutSubmitBtn');
    if (planId === 'annual_1999') {
      if (p499) p499.classList.remove('selected');
      if (p1999) p1999.classList.add('selected');
      if (btn) btn.innerHTML = '<span>Complete Instant Unlock ($19.99/yr)</span><span class="btn-icon-circle">↗</span>';
    } else {
      if (p499) p499.classList.add('selected');
      if (p1999) p1999.classList.remove('selected');
      if (btn) btn.innerHTML = '<span>Complete Instant Unlock ($4.99)</span><span class="btn-icon-circle">↗</span>';
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
        box.innerHTML = '<strong>Unlocked Order ' + res.order.order_id + ':</strong> ' + res.message + ' <br/><a href="' + (res.downloadUrl || '/buy/complete_dossier') + '" class="mono" style="font-size:0.8125rem;color:var(--rose-brand);text-decoration:underline;font-weight:700;">Proceed to Stripe Checkout / Download (' + res.downloadUrl + ') ↗</a>';
      }
      fireMetaCapiEvent('Purchase', res.order.amount_cents / 100, { order_id: res.order.order_id, plan_id: planId });
      if (!navigator.webdriver && res.downloadUrl && res.downloadUrl.startsWith('https://checkout.stripe.com')) window.location.href = res.downloadUrl;
    } catch (e) {
      console.error('Checkout error:', e);
    } finally {
      if (btn) { btn.disabled = false; btn.innerHTML = '<span>Ritual Pass Unlocked ✓</span>'; }
    }
  }
  function setCookieConsent(choice) {
    localStorage.setItem('dermlogic_cookie_consent', choice);
    const banner = document.getElementById('cookieBanner');
    if (banner) banner.style.display = 'none';
  }
  function setAtelierVanityLight(mode, btn) {
    document.body.classList.toggle('vanity-daylight', mode === 'day');
    document.querySelectorAll('.vanity-light-btn').forEach((b) => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
  }
  function startViscosityTimer(seconds, btn) {
    if (!btn || btn.dataset.running === '1') return;
    btn.dataset.running = '1';
    btn.classList.add('running');
    let rem = Number(seconds) || 45;
    const orig = btn.textContent;
    btn.textContent = '⏱ ' + rem + 's absorbing...';
    const iv = setInterval(() => {
      rem -= 1;
      if (rem <= 0) {
        clearInterval(iv);
        btn.dataset.running = '0';
        btn.classList.remove('running');
        btn.textContent = '✓ Ready for next layer';
        setTimeout(() => { btn.textContent = orig; }, 3500);
      } else {
        btn.textContent = '⏱ ' + rem + 's absorbing...';
      }
    }, 1000);
  }
  window.addEventListener('DOMContentLoaded', () => {
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
