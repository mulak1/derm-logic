/**
 * DermLogic (#4): Warm Silk & Botanical Clinical Luxury UI Templates
 * Inspired by Rhode Skin, Summer Fridays, Glossier, Merit Beauty, Aesop, and Dieux Skin.
 */

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const BRAND_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="36" height="36" role="img" aria-label="DermLogic Clinical Atelier Emblem" style="flex-shrink:0;display:block;">
  <defs>
    <linearGradient id="dlRoseGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97280"/>
      <stop offset="50%" stop-color="#C85A68"/>
      <stop offset="100%" stop-color="#9E3B49"/>
    </linearGradient>
    <linearGradient id="dlSilkBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFDFB"/>
      <stop offset="100%" stop-color="#FCEEF0"/>
    </linearGradient>
  </defs>
  <circle cx="20" cy="20" r="19" fill="url(#dlSilkBg)" stroke="url(#dlRoseGold)" stroke-width="1.5"/>
  <circle cx="20" cy="20" r="15.5" fill="none" stroke="#E6DDD2" stroke-width="0.75" stroke-dasharray="2 1.5"/>
  <polygon points="20,7.5 28.5,12.4 28.5,22.2 20,27.1 11.5,22.2 11.5,12.4" fill="none" stroke="#C85A68" stroke-width="1.15" stroke-opacity="0.55"/>
  <path d="M20 9.5 C20 9.5 26.8 17.6 26.8 22.6 C26.8 26.4 23.8 29.5 20 29.5 C16.2 29.5 13.2 26.4 13.2 22.6 C13.2 17.6 20 9.5 20 9.5 Z" fill="url(#dlRoseGold)"/>
  <path d="M16.5 21.2 C16.2 23.6 17.6 25.8 19.8 26.3" fill="none" stroke="#FFFDFB" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M20 29.5 C22.8 29.5 25.5 31.2 26.5 33.2 C23.6 33.6 21.2 32.1 20 29.5 Z" fill="#2D6A4F"/>
  <path d="M20 29.5 C17.2 29.5 14.5 31.2 13.5 33.2 C16.4 33.6 18.8 32.1 20 29.5 Z" fill="#2D6A4F" opacity="0.85"/>
  <circle cx="20" cy="17.2" r="1.3" fill="#FFFDFB"/>
</svg>`;

const SHARED_CSS = `
  :root {
    --bg-canvas: #FAF6F0;
    --bg-oat: #F4EDE4;
    --bg-surface: #FFFFFF;
    --bg-porcelain: rgba(255, 252, 248, 0.94);
    --border-hairline: #E6DDD2;
    --border-strong: #F3C8CE;
    --text-primary: #1C1613;
    --text-secondary: #6E6259;
    --text-muted: #93857B;
    --rose-brand: #C85A68;
    --rose-brand-hover: #B04856;
    --rose-pill-bg: #FCEEF0;
    --rose-pill-border: #F3C8CE;
    --sage-safe: #2D6A4F;
    --sage-bg: #EAF4EE;
    --sage-border: #B7DFC7;
    --honey-warn: #B4690E;
    --honey-bg: #FEF6E6;
    --honey-border: #F5D9A6;
    --berry-clash: #BE123C;
    --berry-bg: #FFF1F3;
    --berry-border: #FECDD3;
    --shadow-luxury: 0 20px 50px -15px rgba(110, 98, 89, 0.11);
    --shadow-soft: 0 8px 26px -8px rgba(110, 98, 89, 0.08);
    --radius-shell: 24px;
    --radius-card: 18px;
    --radius-input: 12px;
    --radius-pill: 9999px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background-color: var(--bg-canvas);
    background-image: radial-gradient(circle at 15% 8%, rgba(252, 238, 240, 0.75) 0%, transparent 45%),
                      radial-gradient(circle at 85% 18%, rgba(244, 237, 228, 0.85) 0%, transparent 50%);
    color: var(--text-primary);
    font-family: "Plus Jakarta Sans", "Avenir Next", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    line-height: 1.6;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
  }
  .serif-display {
    font-family: "Cormorant Garamond", "Playfair Display", "Iowan Old Style", "Palatino Linotype", Georgia, serif;
    font-weight: 600;
    letter-spacing: -0.02em;
  }
  .serif-italic {
    font-family: "Cormorant Garamond", "Playfair Display", "Iowan Old Style", Georgia, serif;
    font-style: italic;
    font-weight: 500;
  }
  .mono {
    font-family: "JetBrains Mono", "SFMono-Regular", Consolas, Menlo, monospace;
    font-variant-numeric: tabular-nums;
  }
  a { color: inherit; text-decoration: none; }
  button, select, textarea, input { font: inherit; color: inherit; }
  .container { max-width: 1360px; margin: 0 auto; padding: 0 24px; }

  .site-header {
    border-bottom: 1px solid var(--border-hairline);
    background: rgba(250, 246, 240, 0.94);
    backdrop-filter: blur(14px);
    position: sticky;
    top: 0;
    z-index: 40;
  }
  .nav-inner {
    min-height: 72px;
    padding: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }
  .brand-logo-link {
    display: inline-flex;
    align-items: center;
    gap: 11px;
    font-size: 1.35rem;
    color: var(--text-primary);
    text-decoration: none;
    transition: opacity 180ms ease;
  }
  .brand-logo-link:hover { opacity: 0.88; }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 0.88rem;
    font-weight: 600;
    color: var(--text-secondary);
    flex-wrap: wrap;
  }
  .nav-links a { transition: color 180ms cubic-bezier(0.32, 0.72, 0, 1); }
  .nav-links a:hover { color: var(--rose-brand); }

  .btn-primary {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    background: var(--rose-brand); color: #FFFFFF; font-weight: 600; font-size: 0.88rem;
    padding: 9px 16px 9px 20px; border-radius: var(--radius-pill); border: 1px solid var(--rose-brand);
    cursor: pointer; white-space: nowrap;
    box-shadow: 0 8px 20px -6px rgba(200, 90, 104, 0.38);
    transition: transform 220ms cubic-bezier(0.32, 0.72, 0, 1), background-color 220ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .btn-primary:hover { background: var(--rose-brand-hover); }
  .btn-primary:active { transform: scale(0.98); }
  .btn-icon-circle {
    width: 22px; height: 22px; border-radius: 50%;
    background: rgba(255, 255, 255, 0.22);
    display: inline-flex; align-items: center; justify-content: center; font-size:0.84rem;
    transition: transform 220ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .btn-primary:hover .btn-icon-circle { transform: translate(2px, -1px); }
  .btn-secondary {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--bg-surface); color: var(--text-primary); font-weight: 600; font-size: 0.84rem;
    padding: 8px 16px; border-radius: var(--radius-pill); border: 1px solid var(--border-hairline);
    cursor: pointer; white-space: nowrap;
    transition: transform 200ms cubic-bezier(0.32, 0.72, 0, 1), border-color 200ms cubic-bezier(0.32, 0.72, 0, 1), background-color 200ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .btn-secondary:hover { border-color: var(--rose-pill-border); background: var(--rose-pill-bg); color: var(--rose-brand); }
  .btn-secondary:active { transform: scale(0.98); }

  /* Affiliate Pill & Micro Links */
  .affiliate-link-pill {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 12px;
    border-radius: var(--radius-pill);
    background: #FFFFFF;
    border: 1px solid var(--rose-pill-border);
    color: var(--rose-brand);
    font-size: 0.8125rem;
    font-weight: 700;
    text-decoration: none;
    transition: background-color 160ms ease, border-color 160ms ease;
  }
  .affiliate-link-pill:hover {
    background: var(--rose-pill-bg);
    border-color: var(--rose-brand);
  }
  .affiliate-micro-link {
    display: inline-block;
    margin-top: 3px;
    font-size: 0.8125rem;
    font-weight: 600;
    color: var(--sage-safe);
    text-decoration: underline;
    text-underline-offset: 2px;
  }
  .affiliate-micro-link:hover { color: var(--rose-brand); }

  .hero-section { padding: 32px 0 60px; border-bottom: 1px solid var(--border-hairline); }
  .editorial-top-banner { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 28px; align-items: center; margin-bottom: 28px; }
  .editorial-photo-shell {
    background: var(--bg-oat); border: 1px solid var(--border-hairline);
    border-radius: var(--radius-shell); padding: 8px; box-shadow: var(--shadow-luxury); position: relative;
  }
  .editorial-photo-inner { border-radius: calc(var(--radius-shell) - 6px); overflow: hidden; position: relative; height: 220px; background: #EADFD2; }
  .editorial-photo-inner img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .editorial-photo-caption {
    position: absolute; bottom: 12px; left: 12px; right: 12px;
    background: rgba(255, 252, 248, 0.92); backdrop-filter: blur(8px);
    border: 1px solid var(--border-hairline); border-radius: 12px; padding: 9px 14px;
    display: flex; align-items: center; justify-content: space-between; gap: 10px; font-size: 0.84rem;
  }
  .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 28px; align-items: start; }
  @media (max-width: 1024px) {
    .editorial-top-banner, .hero-grid { grid-template-columns: 1fr; }
    .nav-links {
      width: 100%;
      order: 3;
      justify-content: flex-start;
      gap: 14px;
      padding-top: 8px;
      border-top: 1px solid var(--border-hairline);
      font-size: 0.85rem;
      overflow-x: auto;
      flex-wrap: nowrap;
      white-space: nowrap;
    }
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

  .eyebrow-pill {
    display: inline-flex; align-items: center; gap: 8px; padding: 5px 14px;
    border-radius: var(--radius-pill); background: var(--rose-pill-bg); border: 1px solid var(--rose-pill-border);
    color: var(--rose-brand); font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 14px;
  }
  .hero-h1 {
    font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif;
    font-size: clamp(2.15rem, 3.8vw, 3.45rem); line-height: 1.08; letter-spacing: -0.025em;
    font-weight: 600; color: var(--text-primary); margin-bottom: 12px;
  }
  .hero-sub { color: var(--text-secondary); font-size: 1.02rem; max-width: 58ch; margin-bottom: 8px; }

  .grader-card, .results-panel {
    background: var(--bg-porcelain); border: 1px solid var(--border-hairline);
    border-radius: var(--radius-shell); padding: 24px; box-shadow: var(--shadow-luxury);
  }
  .preset-row { display: grid; grid-template-columns: 1fr 1fr; gap: 9px; margin-bottom: 18px; }
  @media (max-width: 640px) { .preset-row { grid-template-columns: 1fr; } }
  .preset-chip {
    background: var(--bg-canvas); border: 1px solid var(--border-hairline); border-radius: 14px;
    padding: 10px 13px; font-size: 0.85rem; cursor: pointer; text-align: left;
    transition: transform 180ms cubic-bezier(0.32, 0.72, 0, 1), border-color 180ms cubic-bezier(0.32, 0.72, 0, 1), background-color 180ms cubic-bezier(0.32, 0.72, 0, 1);
  }
  .preset-chip:hover, .preset-chip.active { border-color: var(--rose-brand); background: var(--rose-pill-bg); }
  .preset-chip:active { transform: scale(0.98); }
  .preset-chip strong { display: block; color: var(--text-primary); font-size: 0.88rem; font-weight: 600; margin-bottom: 2px; }
  .preset-chip span { color: var(--rose-brand); font-size: 0.8125rem; font-weight: 600; }
  .field-label { display: block; font-size: 0.88rem; font-weight: 600; color: var(--text-primary); margin-bottom: 6px; }
  .product-selector-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px;
    max-height: 225px; overflow-y: auto; padding: 10px;
    background: var(--bg-canvas); border: 1px solid var(--border-hairline); border-radius: var(--radius-input); margin-bottom: 14px;
  }
  .prod-check-item {
    display: flex; align-items: flex-start; gap: 8px; padding: 8px 10px;
    border-radius: 10px; background: var(--bg-surface); border: 1px solid var(--border-hairline);
    cursor: pointer; font-size: 0.84rem; transition: border-color 160ms ease-out, background-color 160ms ease-out;
  }
  .prod-check-item.selected { border-color: var(--rose-brand); background: var(--rose-pill-bg); }
  .prod-check-item input { margin-top: 3px; accent-color: var(--rose-brand); }
  .input-box, .textarea-box {
    width: 100%; background: var(--bg-surface); border: 1px solid var(--border-hairline);
    border-radius: var(--radius-input); padding: 10px 12px; color: var(--text-primary); font-size: 16px;
  }
  .input-box:focus, .textarea-box:focus { outline: 2px solid var(--rose-brand); border-color: transparent; }

  .score-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 18px; }
  .metric-box { background: var(--bg-canvas); border: 1px solid var(--border-hairline); border-radius: 14px; padding: 13px; }
  .metric-val { font-family: "Cormorant Garamond", "Playfair Display", Georgia, serif; font-size: 2rem; font-weight: 700; line-height: 1.05; }

  .badge-safe, .badge-clash, .badge-warn {
    display: inline-flex; align-items: center; padding: 4px 11px; border-radius: var(--radius-pill);
    font-size: 0.8125rem; font-weight: 700;
  }
  .badge-safe { background: var(--sage-bg); border: 1px solid var(--sage-border); color: var(--sage-safe); }
  .badge-clash { background: var(--berry-bg); border: 1px solid var(--berry-border); color: var(--berry-clash); }
  .badge-warn { background: var(--honey-bg); border: 1px solid var(--honey-border); color: var(--honey-warn); }

  .conflict-card {
    background: var(--berry-bg); border: 1px solid var(--berry-border); border-left: 4px solid var(--berry-clash);
    border-radius: 12px; padding: 14px; margin-bottom: 10px;
  }
  .conflict-card.MODERATE {
    background: var(--honey-bg); border-color: var(--honey-border); border-left: 4px solid var(--honey-warn);
  }

  .ph-scale-bar {
    position: relative; height: 22px; border-radius: var(--radius-pill);
    background: linear-gradient(90deg, #F497A9 0%, #F6C88F 36%, #95D5B2 70%, #A8DADC 100%);
    border: 1px solid var(--border-hairline); margin: 8px 0 8px;
    box-shadow: inset 0 1px 3px rgba(28, 22, 19, 0.08);
  }
  .ph-pin {
    position: absolute; top: -3px; bottom: -3px; width: 4px; border-radius: 4px;
    background: #FFFFFF; border: 1.5px solid var(--rose-brand); transform: translateX(-50%);
    box-shadow: 0 2px 6px rgba(28, 22, 19, 0.18);
  }
  .ph-chip-row { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px; }
  .ph-chip {
    display: inline-flex; align-items: center; gap: 5px;
    background: #FFFFFF; color: var(--text-primary);
    border: 1px solid var(--rose-pill-border); border-radius: var(--radius-pill);
    padding: 3px 10px; font-size: 0.8125rem; font-weight: 700;
    box-shadow: 0 2px 6px rgba(110, 98, 89, 0.06);
  }

  .wallet-preview-wrap { display: grid; grid-template-columns: 1.18fr 0.82fr; gap: 16px; margin-top: 16px; }
  @media (max-width: 768px) {
    .wallet-preview-wrap, .score-strip { grid-template-columns: 1fr; }
  }
  .wallet-card-916 {
    aspect-ratio: 9 / 15.2; max-width: 270px; margin: 0 auto; width: 100%;
    background: linear-gradient(165deg, #FFFDFB 0%, #F9EFEA 55%, #F5E3E6 100%);
    border: 1px solid var(--rose-pill-border); border-radius: 24px; padding: 18px;
    display: flex; flex-direction: column; justify-content: space-between; box-shadow: var(--shadow-luxury);
  }

  .section-block { padding: 64px 0; border-bottom: 1px solid var(--border-hairline); }
  .bento-grid-3 { display: grid; grid-template-columns: 1.2fr 0.9fr 0.9fr; gap: 20px; margin-top: 24px; }
  @media (max-width: 960px) { .bento-grid-3 { grid-template-columns: 1fr; } }
  .bento-cell { background: var(--bg-surface); border: 1px solid var(--border-hairline); border-radius: var(--radius-card); padding: 24px; box-shadow: var(--shadow-soft); }
  .bento-cell.tinted { background: linear-gradient(155deg, #FCEEF0 0%, #FFFDFB 100%); border-color: var(--rose-pill-border); }

  .table-wrap { overflow-x: auto; border: 1px solid var(--border-hairline); border-radius: var(--radius-card); background: var(--bg-surface); box-shadow: var(--shadow-soft); }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { padding: 12px 15px; text-align: left; border-bottom: 1px solid var(--border-hairline); }
  th { color: var(--text-secondary); font-weight: 700; font-size: 0.8125rem; background: var(--bg-oat); }
  .site-footer { padding: 44px 0; background: var(--bg-oat); color: var(--text-secondary); font-size: 0.9rem; }

  /* Non-Floating Docked Cookie Ribbon */
  .cookie-banner {
    width: 100%;
    background: #EFE6DA;
    border-top: 1px solid var(--border-hairline);
    padding: 12px 0;
    display: none;
  }
  .cookie-banner-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    flex-wrap: wrap;
  }

  .modal-backdrop {
    position: fixed; inset: 0; background: rgba(28, 22, 19, 0.42); backdrop-filter: blur(8px);
    display: none; align-items: center; justify-content: center; padding: 20px; z-index: 80;
  }
  .modal-card {
    background: var(--bg-surface); border: 1px solid var(--rose-pill-border);
    border-radius: var(--radius-shell); max-width: 560px; width: 100%; padding: 28px; box-shadow: var(--shadow-luxury);
  }
`;

function renderHeader(hideNav = false) {
  if (hideNav) {
    return `
      <header class="site-header">
        <div class="container nav-inner">
          <a href="/" class="brand-logo-link" aria-label="DermLogic Home">
            ${BRAND_LOGO_SVG}
            <span class="serif-display" style="font-weight:700;">dermlogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.05rem;">clinical <span class="brand-atelier-word">atelier</span></span></span>
          </a>
          <div style="display:flex;align-items:center;gap:12px;">
            <span class="badge-safe mono hide-mobile">30-DAY SKINCARE HARMONY GUARANTEE</span>
            <a href="/#analyzer" class="btn-primary">
              <span>Audit My Shelf</span>
              <span class="btn-icon-circle">↗</span>
            </a>
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
          <span class="serif-display" style="font-weight:700;">dermlogic <span class="serif-italic" style="color:var(--rose-brand);font-size:1.05rem;">clinical <span class="brand-atelier-word">atelier</span></span></span>
        </a>
        <nav class="nav-links" aria-label="Main Navigation">
          <a href="/#analyzer">Routine Ritual Audit</a>
          <a href="/leaderboard" style="font-weight:700;color:var(--sage-safe);">🏆 Leaderboard</a>
          <a href="/directory">60+ Layering Guides</a>
        </nav>
        <a href="/buy/micro_pass?source=nav_cta" class="btn-primary">
          <span>Unlock 3-File Pack ($1.99)</span>
          <span class="btn-icon-circle">↗</span>
        </a>
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
    return `
      <label class="prod-check-item ${isChecked ? 'selected' : ''}" data-prod-label="${escapeHtml(prod.id)}">
        <input type="checkbox" name="routineProduct" value="${escapeHtml(prod.id)}" ${isChecked ? 'checked' : ''} onchange="toggleProductChip(this)" />
        <span style="flex:1;">
          <strong style="display:block;color:var(--text-primary);">${escapeHtml(prod.brand)}</strong>
          <span style="color:var(--text-secondary);display:block;">${escapeHtml(prod.name)}</span>
          <span class="mono" style="color:var(--rose-brand);font-size:0.8125rem;font-weight:600;display:block;">pH ${prod.ph} · $${prod.priceUsd}</span>
          <a href="/api/affiliate?product=${escapeHtml(prod.id)}&partner=${partnerSlug}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" onclick="event.stopPropagation()">Shop at ${partner} ($${prod.priceUsd}) ↗</a>
        </span>
      </label>
    `;
  }).join('');

  return `
    <div id="checker"></div>
    <div class="hero-grid" id="analyzer" style="align-items:stretch;">
      <div class="grader-card" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
            <span class="field-label" style="margin:0;">1. Tap a Popular Routine to Test</span>
            <span class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;">INGREDIENT CONFLICT &amp; pH CHECKER</span>
          </div>
          <div class="preset-row" id="presetButtonsRow">
            ${presetButtonsHtml}
          </div>

          <div style="display:grid;grid-template-columns:1fr 205px;gap:10px;margin-bottom:12px;align-items:end;">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;flex-wrap:wrap;gap:6px;">
                <label class="field-label" for="rawInciTextarea" style="margin:0;">2. Type Product Names or Paste Ingredient List</label>
                <button type="button" class="btn-secondary" style="padding:3px 10px;font-size:0.8125rem;" onclick="pasteSampleComedogenicInci()">Try Pore-Clogging Example</button>
              </div>
              <textarea id="rawInciTextarea" class="textarea-box mono" rows="2" placeholder="e.g., SkinCeuticals C E Ferulic + The Ordinary Copper Peptides, or Aqua, Ascorbic Acid, Glycolic Acid...">${escapeHtml(initialRawInci || '')}</textarea>
            </div>
            <div>
              <label class="field-label" for="skinTypeSelect">3. Your Skin Type</label>
              <select id="skinTypeSelect" class="input-box" onchange="runRoutineAnalysis()">
                <option value="combination" ${currentSkin === 'combination' ? 'selected' : ''}>Combination / Dewy</option>
                <option value="sensitive" ${currentSkin === 'sensitive' ? 'selected' : ''}>Sensitive / Redness-Prone</option>
                <option value="oily" ${currentSkin === 'oily' ? 'selected' : ''}>Oily / Breakout-Prone</option>
                <option value="dry" ${currentSkin === 'dry' ? 'selected' : ''}>Dry / Damaged Barrier</option>
                <option value="normal" ${currentSkin === 'normal' ? 'selected' : ''}>Normal / Balanced</option>
              </select>
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:12px;">
            <button type="button" id="analyzeBtn" class="btn-primary" style="flex:1;" onclick="runRoutineAnalysis()">
              <span>Check My Routine Compatibility</span>
              <span class="btn-icon-circle">↗</span>
            </button>
            <button type="button" class="btn-secondary" onclick="clearRoutineSelection()">Clear Shelf</button>
          </div>

          <details style="margin-bottom:14px;padding:10px 12px;border-radius:12px;background:var(--bg-canvas);border:1px solid var(--border-hairline);">
            <summary style="cursor:pointer;font-size:0.86rem;font-weight:700;color:var(--text-primary);">🧴 Optional: Browse &amp; Check from ${products.length} Cult Formulas (Rhode, SkinCeuticals, The Ordinary) ▾</summary>
            <div style="margin:10px 0;">
              <label class="field-label" for="productFilterInput">Search ${products.length} Formulas</label>
              <input id="productFilterInput" type="search" class="input-box" placeholder="Search Rhode, SkinCeuticals, Paula's Choice, Tretinoin..." oninput="filterProductList(this.value)" />
            </div>
            <div class="product-selector-grid" id="productSelectorGrid">
              ${productCheckboxesHtml}
            </div>
          </details>

          <div style="padding:12px 14px;border-radius:12px;background:var(--bg-canvas);border:1px solid var(--border-hairline);margin-bottom:12px;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:6px;">
              <span class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--rose-brand);letter-spacing:0.05em;">COMMON SKINCARE LAYERING MISTAKES</span>
              <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">TAP ANY COMBO TO TEST</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">
              <div onclick="applyPreset('copper-vitc-trap')" style="cursor:pointer;padding:8px 10px;border-radius:9px;background:var(--bg-elevated);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--berry-clash);">CANCELS OUT · pH 3.2 vs 6.2</div>
                <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);">Copper Peptides + Vitamin C</div>
                <div style="font-size:0.8125rem;color:var(--text-secondary);">Copper ions oxidize L-Ascorbic Acid on contact</div>
              </div>
              <div onclick="applyPreset('acne-rx-clash')" style="cursor:pointer;padding:8px 10px;border-radius:9px;background:var(--bg-elevated);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--berry-clash);">DEACTIVATES RETINOL · OXIDATION</div>
                <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);">Benzoyl Peroxide + Tretinoin / Retinol</div>
                <div style="font-size:0.8125rem;color:var(--text-secondary);">Peroxide breaks down retinoid potency on contact</div>
              </div>
              <div onclick="applyPreset('tiktok-viral-clash')" style="cursor:pointer;padding:8px 10px;border-radius:9px;background:var(--bg-elevated);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--honey-warn);">REDNESS WARNING · ΔpH SHOCK</div>
                <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);">Glycolic Acid 7% + Niacinamide 10%</div>
                <div style="font-size:0.8125rem;color:var(--text-secondary);">Strong acid + Niacinamide can trigger a warm redness flush</div>
              </div>
              <div onclick="applyPreset('barrier-safe-gold')" style="cursor:pointer;padding:8px 10px;border-radius:9px;background:var(--bg-elevated);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--sage-safe);">SAFE GLOW PAIR · BARRIER FRIENDLY</div>
                <div style="font-size:0.84rem;font-weight:600;color:var(--text-primary);">Vitamin C + Snail Mucin + Ceramides</div>
                <div style="font-size:0.8125rem;color:var(--text-secondary);">Brightens skin while locking in deep hydration</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Clinical Formulation Reference & Barrier Standards Strip (Balances Left & Right Columns) -->
        <div style="margin-top:auto;padding:12px 14px;border-radius:12px;background:var(--bg-canvas);border:1px solid var(--border-hairline);display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;">
          <div>
            <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--rose-brand);margin-bottom:2px;">HEALTHY SKIN pH (4.7–5.5)</div>
            <div style="font-size:0.84rem;color:var(--text-secondary);line-height:1.35;">Your skin barrier thrives at <strong>pH 4.7–5.5</strong>, while exfoliating acids need pH 3.0–3.8.</div>
          </div>
          <div>
            <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--honey-warn);margin-bottom:2px;">WHY PRODUCTS CLASH</div>
            <div style="font-size:0.84rem;color:var(--text-secondary);line-height:1.35;">Layering a low-pH acid right under peptides or high-pH serums weakens both formulas.</div>
          </div>
          <div>
            <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--sage-safe);margin-bottom:2px;">BARRIER REPAIR TRIO</div>
            <div style="font-size:0.84rem;color:var(--text-secondary);line-height:1.35;">Always cushion retinol and acid nights with <strong>Ceramides, Cholesterol &amp; Fatty Acids</strong>.</div>
          </div>
        </div>
      </div>

      <div class="results-panel" id="liveResultsContainer" style="display:flex;flex-direction:column;justify-content:space-between;height:100%;">
        ${renderAnalysisResultHtml(initialAnalysis)}
      </div>
    </div>

    <div id="checkoutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span class="eyebrow-pill mono" style="margin:0;" id="modalBanditBadge">PHASE 3 PUREST PATH • $1.99 STRIPE EXPRESS</span>
          <button type="button" class="btn-secondary" style="padding:5px 12px;" onclick="closeCheckoutModal()">Close</button>
        </div>
        <h3 id="checkoutModalTitle" class="serif-display" style="font-size:1.65rem;margin-bottom:6px;">Unlock Your Complete 3-File AM/PM Glow Schedule &amp; 9:16 Phone Card ($1.99)</h3>
        <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:16px;">
          Includes your printable 4-Night Skin-Cycling calendar (.ICS), ingredient pH compatibility matrix (.CSV), and 9:16 phone lockscreen card.
        </p>
        <div style="margin-bottom:14px;">
          <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn-primary" style="width:100%;justify-content:center;text-decoration:none;padding:13px 20px;font-size:0.95rem;">
            <span>Unlock 3-File Ritual Pack ($1.99 Stripe Express)</span>
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
  return `
    <div class="conflict-card ${escapeHtml(c.severity)}">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:5px;flex-wrap:wrap;">
        <span class="${c.severity === 'CRITICAL' ? 'badge-clash' : 'badge-warn'} mono">${escapeHtml(c.severity)} · ΔpH ${c.deltaPh}</span>
        <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(c.inciA)} (pH ${c.phA}) × ${escapeHtml(c.inciB)} (pH ${c.phB})</span>
      </div>
      <div class="serif-display" style="font-size:1.12rem;font-weight:700;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(c.title)}</div>
      <p style="color:var(--text-secondary);font-size:0.81rem;margin-bottom:8px;">${escapeHtml(c.mechanism)}</p>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <div style="font-size:0.8rem;color:var(--honey-warn);font-weight:600;flex:1;">🔒 Exact AM/PM Separation &amp; Wait-Timer Fix: [LOCKED IN FREE PREVIEW — UNLOCK ($1.99)]</div>
        <div style="display:inline-flex;gap:6px;flex-wrap:wrap;align-items:center;">
          <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=dermstore&conflict=${encodeURIComponent(c.ruleId || 'barrier-rescue')}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Alternative ↗</a>
        </div>
      </div>
    </div>
  `;
}

function renderAnalysisResultHtml(res) {
  const isCritical = res.verdictStatus === 'CRITICAL_CLASH';
  const isWarn = res.verdictStatus === 'MODERATE_CAUTION';
  const scoreColor = isCritical ? 'var(--berry-clash)' : isWarn ? 'var(--honey-warn)' : 'var(--sage-safe)';
  const badgeClass = isCritical ? 'badge-clash' : isWarn ? 'badge-warn' : 'badge-safe';

  const topItems = (res.ingredientBreakdown || []).slice(0, 5);
  const pinsHtml = topItems.map((item) => {
    const pct = Math.max(4, Math.min(96, ((item.effectivePh - 2.0) / 6.0) * 100));
    return `<div class="ph-pin" style="left:${pct.toFixed(1)}%;" title="${escapeHtml(item.commonName)} (pH ${item.effectivePh})"></div>`;
  }).join('');

  const chipsHtml = topItems.map((item) => `
    <span class="ph-chip mono">
      <span style="width:6px;height:6px;border-radius:50%;background:var(--rose-brand);"></span>
      ${escapeHtml(item.inciName.split(' ')[0])} · pH ${item.effectivePh}
    </span>
  `).join('');

  const primaryConflicts = res.conflicts.slice(0, 1);
  const extraConflicts = res.conflicts.slice(1);

  const conflictsHtml = res.conflicts.length === 0
    ? `<div style="padding:14px 16px;border-radius:12px;background:var(--sage-bg);border:1px solid var(--sage-border);color:var(--sage-safe);font-size:0.86rem;margin-bottom:14px;">
         <strong>Pure Formulation Harmony:</strong> Every serum and moisturizer in your shelf operates in a compatible pH and antioxidant window.
       </div>`
    : primaryConflicts.map(renderSingleConflictCard).join('') + (extraConflicts.length > 0 ? `
        <details style="margin-bottom:12px;border:1px solid var(--border-hairline);border-radius:12px;background:var(--bg-canvas);padding:10px 14px;">
          <summary class="mono" style="cursor:pointer;font-size:0.84rem;font-weight:700;color:var(--rose-brand);">
            + View ${extraConflicts.length} additional ingredient conflict(s) &amp; fixes ▾
          </summary>
          <div style="margin-top:10px;">
            ${extraConflicts.map(renderSingleConflictCard).join('')}
          </div>
        </details>
      ` : '');

  const comedogenicSummary = res.comedogenicFlags.length > 0
    ? res.comedogenicFlags.map((f) => `<span class="badge-warn mono" style="margin-right:6px;margin-bottom:4px;">${escapeHtml(f.inciName)} (${f.rating}/5 Pore Risk)</span>`).join('')
    : `<span class="badge-safe mono">0 Pore-Clogging Esters</span>`;

  const malasseziaSummary = res.malasseziaFlags.length > 0
    ? res.malasseziaFlags.map((f) => `<span class="badge-clash mono" style="margin-right:6px;margin-bottom:4px;">Fungal-Acne Trigger: ${escapeHtml(f.inciName)}</span>`).join('')
    : `<span class="badge-safe mono">100% Fungal-Acne (Malassezia) Safe</span>`;

  const amListHtml = res.schedule.amSteps.map((s, idx) => `
    <li style="margin-bottom:3px;font-size:0.8125rem;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      <strong style="color:var(--rose-brand);">${escapeHtml(s.slot)}:</strong> ${idx === 0 ? escapeHtml(s.title) : '🔒 [LOCKED IN FREE PREVIEW — UNLOCK AM/PM ORDER ($1.99)]'}
      <span class="mono" style="color:var(--text-secondary);font-size:0.8125rem;">[pH ${escapeHtml(s.ph)}]</span>
    </li>
  `).join('');

  const pmCyclingHtml = res.schedule.pmCycling.map((n, idx) => `
    <div style="padding:6px 8px;border-radius:8px;background:var(--bg-canvas);border:1px solid var(--border-hairline);">
      <div style="display:flex;justify-content:space-between;font-size:0.8125rem;font-weight:700;color:var(--text-primary);margin-bottom:2px;">
        <span>${escapeHtml(n.night.split('·')[0].trim())}</span>
        <span class="mono" style="color:var(--rose-brand);font-size:0.8125rem;">${idx === 0 ? escapeHtml(n.badge.split(' ')[0]) : '🔒 LOCKED'}</span>
      </div>
      <div style="color:var(--text-secondary);font-size:0.8125rem;line-height:1.25;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">${idx === 0 ? escapeHtml(n.steps[0] || 'Cleanse') + ' → 🔒 [Unlock Full PM Order]' : '🔒 [LOCKED IN FREE PREVIEW — $1.99]'}</div>
    </div>
  `).join('');

  return `
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
        <span class="${badgeClass} mono">${escapeHtml(res.verdictLabel)}</span>
        <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">Surface Mix pH ${res.equilibriumSurfacePh || 5.5} · ${res.executionMs}ms</span>
      </div>

      <div class="score-strip">
        <div class="metric-box">
          <div style="font-size:0.8125rem;color:var(--text-secondary);font-weight:500;">Routine Harmony</div>
          <div class="metric-val" style="color:${scoreColor};" id="compatibilityScoreValue">${res.compatibilityScore}<span style="font-size:0.95rem;color:var(--text-secondary);">/100</span></div>
        </div>
        <div class="metric-box">
          <div style="font-size:0.8125rem;color:var(--text-secondary);font-weight:500;">Barrier Stress</div>
          <div class="metric-val" style="color:${res.barrierHazardIndex > 50 ? 'var(--berry-clash)' : 'var(--sage-safe)'};">${res.barrierHazardIndex}<span style="font-size:0.95rem;color:var(--text-secondary);">/100</span></div>
        </div>
        <div class="metric-box">
          <div style="font-size:0.8125rem;color:var(--text-secondary);font-weight:500;">Shelf Value Wasted</div>
          <div class="metric-val" style="color:${(res.wastedShelfValueUsd || 0) > 0 ? 'var(--berry-clash)' : 'var(--sage-safe)'};" id="wastedShelfValueReadout">$${res.wastedShelfValueUsd || 0}<span style="font-size:0.84rem;color:var(--text-secondary);">/$${res.totalShelfValueUsd || 248}</span></div>
        </div>
      </div>
      <div style="margin-bottom:10px;padding:7px 11px;border-radius:9px;background:${(res.wastedShelfValueUsd || 0) > 0 ? 'rgba(181,56,82,0.08)' : 'var(--sage-bg)'};border:1px solid ${(res.wastedShelfValueUsd || 0) > 0 ? 'rgba(181,56,82,0.24)' : 'var(--sage-border)'};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;font-size:0.8125rem;">
        <span class="mono" style="font-weight:700;color:${(res.wastedShelfValueUsd || 0) > 0 ? 'var(--berry-clash)' : 'var(--sage-safe)'};">${(res.wastedShelfValueUsd || 0) > 0 ? `💸 $${res.wastedShelfValueUsd} of your $${res.totalShelfValueUsd} shelf neutralized on contact (-${res.freeAcidPotencyLossPct || 0}% active potency)` : `✓ $0 wasted across $${res.totalShelfValueUsd || 110} shelf · 100% active bioavailability`}</span>
        <span class="mono" style="color:var(--text-secondary);">Pore-Clog Load: ${res.comedogenicLoad}/100</span>
      </div>

      <div style="font-size:0.84rem;color:var(--text-secondary);display:flex;justify-content:space-between;flex-wrap:wrap;">
        <span>Silk pH Spectrum (pH 2.0 Direct Acids → pH 5.5 Skin Mantle → pH 8.0)</span>
        <span class="mono" style="color:var(--rose-brand);">|ΔpH| &gt; 1.8 = Peptide / Flush Alert</span>
      </div>
      <div class="ph-scale-bar">${pinsHtml}</div>
      <div class="ph-chip-row">${chipsHtml}</div>

      <div id="conflictsListArea">${conflictsHtml}</div>

      <div style="margin:8px 0;display:flex;flex-wrap:wrap;gap:6px;">
        ${comedogenicSummary}
        ${malasseziaSummary}
      </div>
    </div>

    <div class="wallet-preview-wrap" style="margin-top:auto;align-items:stretch;">
      <div style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="serif-display" style="font-size:1.12rem;font-weight:700;margin-bottom:6px;">AM Morning Glow &amp; PM 4-Night Barrier Ritual (Preview)</div>
          <ul style="list-style:none;margin-bottom:8px;">${amListHtml}</ul>
          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;">
            ${pmCyclingHtml}
          </div>
        </div>
        <div style="margin-top:8px;padding:8px 11px;border-radius:10px;background:var(--rose-pill-bg);border:1px solid var(--rose-pill-border);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
          <span style="font-size:0.8125rem;color:var(--text-primary);font-weight:600;">Verified Barrier-Safe Finishers (3:1:1 Ceramide &amp; SPF 50+)</span>
          <a href="/api/affiliate?product=dieux-instant-angel&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Verified Ritual Kit ↗</a>
        </div>
      </div>

      <div style="display:flex;flex-direction:column;height:100%;">
        <div class="wallet-card-916" id="appleWalletCardPreview" style="height:100%;display:flex;flex-direction:column;justify-content:space-between;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="serif-italic" style="font-size:0.95rem;color:var(--rose-brand);font-weight:600;">dermlogic ritual pass</span>
              <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">9:16 WALLET</span>
            </div>
            <div class="serif-display" style="font-size:2.05rem;font-weight:700;line-height:1.0;color:${scoreColor};margin-bottom:4px;">
              ${res.compatibilityScore}<span style="font-size:1rem;color:var(--text-secondary);">/100</span>
            </div>
            <div style="font-size:0.8125rem;color:var(--text-secondary);margin-bottom:10px;">
              ${res.conflicts.length} Active Clash(es) · Barrier Stress ${res.barrierHazardIndex}%
            </div>
            <div style="border-top:1px solid var(--rose-pill-border);padding-top:9px;font-size:0.8125rem;">
              <div class="mono" style="color:var(--rose-brand);font-weight:700;margin-bottom:3px;font-size:0.8125rem;">AM MORNING GLOW ORDER</div>
              <div style="color:var(--text-secondary);margin-bottom:8px;font-weight:500;">🔒 [Locked in Free Preview — Unlock 3-File Pack]</div>
              <div class="mono" style="color:var(--sage-safe);font-weight:700;margin-bottom:3px;font-size:0.8125rem;">PM 4-NIGHT SKIN CYCLING</div>
              <div style="color:var(--text-secondary);">🔒 [4-Night Calendar &amp; Wait Timers Locked]</div>
            </div>
          </div>
          <div style="border-top:1px dashed var(--rose-pill-border);padding-top:10px;">
            <button type="button" class="btn-primary" style="width:100%;font-size:0.84rem;padding:9px 12px;" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass')}else{openCheckoutModal('onetime_499')}">
              <span>Unlock 9:16 Card &amp; Ritual ($1.99)</span>
              <span class="btn-icon-circle" style="width:20px;height:20px;font-size:0.8125rem;">↗</span>
            </button>
          </div>
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
    if (label) label.classList.toggle('selected', checkbox.checked);
    runRoutineAnalysis();
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
