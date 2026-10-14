/**
 * DermLogic (#4) — Clinical Luxury Editorial Dermatology UI Templates
 * Palette: #090D12 Deep Clinical Slate, #111823 Elevated Lab Surface,
 * #14B8A6 Teal-Emerald Safe, #F43F5E Rose Chemical Conflict, #F59E0B Amber ΔpH Warning.
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

const SHARED_CSS = `
  :root {
    --bg-canvas: #090D12;
    --bg-surface: #101722;
    --bg-elevated: #162030;
    --border-hairline: rgba(255, 255, 255, 0.09);
    --border-strong: rgba(20, 184, 166, 0.35);
    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
    --text-muted: #64748B;
    --teal-safe: #14B8A6;
    --teal-bg: rgba(20, 184, 166, 0.12);
    --rose-clash: #F43F5E;
    --rose-bg: rgba(244, 63, 94, 0.13);
    --amber-warn: #F59E0B;
    --amber-bg: rgba(245, 158, 11, 0.13);
    --radius-card: 14px;
    --radius-input: 10px;
    --radius-pill: 9999px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  html, body {
    background-color: var(--bg-canvas);
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    line-height: 1.55;
    overflow-x: clip;
    -webkit-font-smoothing: antialiased;
  }
  .mono {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
  }
  a { color: inherit; text-decoration: none; }
  button, select, textarea, input {
    font: inherit;
    color: inherit;
  }
  .container {
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 24px;
  }
  .site-header {
    height: 68px;
    border-bottom: 1px solid var(--border-hairline);
    background: rgba(9, 13, 18, 0.88);
    backdrop-filter: blur(12px);
    position: sticky;
    top: 0;
    z-index: 40;
  }
  .nav-inner {
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .brand-mark {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 700;
    font-size: 1.1rem;
    letter-spacing: -0.02em;
  }
  .brand-glyph {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--teal-bg);
    border: 1px solid var(--border-strong);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: var(--teal-safe);
    font-weight: 700;
    font-size: 0.85rem;
  }
  .nav-links {
    display: flex;
    align-items: center;
    gap: 24px;
    font-size: 0.9rem;
    color: var(--text-secondary);
  }
  .nav-links a:hover { color: var(--text-primary); }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--teal-safe);
    color: #041311;
    font-weight: 700;
    font-size: 0.92rem;
    padding: 11px 20px;
    border-radius: var(--radius-pill);
    border: none;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 180ms ease-out, background-color 180ms ease-out;
  }
  .btn-primary:hover { background: #2DD4BF; }
  .btn-primary:active { transform: scale(0.97); }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: var(--bg-elevated);
    color: var(--text-primary);
    font-weight: 600;
    font-size: 0.86rem;
    padding: 9px 16px;
    border-radius: var(--radius-pill);
    border: 1px solid var(--border-hairline);
    cursor: pointer;
    white-space: nowrap;
    transition: transform 180ms ease-out, border-color 180ms ease-out, background-color 180ms ease-out;
  }
  .btn-secondary:hover { border-color: var(--teal-safe); background: rgba(20, 184, 166, 0.08); }
  .btn-secondary:active { transform: scale(0.97); }
  .hero-section {
    padding: 40px 0 56px;
    border-bottom: 1px solid var(--border-hairline);
  }
  .hero-grid {
    display: grid;
    grid-template-columns: 1.08fr 0.92fr;
    gap: 32px;
    align-items: start;
  }
  @media (max-width: 1024px) {
    .hero-grid { grid-template-columns: 1fr; }
    .nav-links { display: none; }
  }
  .eyebrow-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 5px 12px;
    border-radius: var(--radius-pill);
    background: var(--teal-bg);
    border: 1px solid var(--border-strong);
    color: var(--teal-safe);
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 14px;
  }
  .hero-h1 {
    font-size: clamp(2rem, 3.4vw, 3.1rem);
    line-height: 1.08;
    letter-spacing: -0.03em;
    font-weight: 800;
    margin-bottom: 12px;
  }
  .hero-sub {
    color: var(--text-secondary);
    font-size: 1.02rem;
    max-width: 58ch;
    margin-bottom: 22px;
  }
  .grader-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    padding: 22px;
  }
  .preset-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 18px;
  }
  .preset-chip {
    background: var(--bg-elevated);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-input);
    padding: 8px 12px;
    font-size: 0.8rem;
    cursor: pointer;
    text-align: left;
    transition: transform 160ms ease-out, border-color 160ms ease-out, background-color 160ms ease-out;
  }
  .preset-chip:hover, .preset-chip.active {
    border-color: var(--teal-safe);
    background: rgba(20, 184, 166, 0.11);
  }
  .preset-chip:active { transform: scale(0.97); }
  .preset-chip strong { display: block; color: var(--text-primary); font-size: 0.82rem; }
  .preset-chip span { color: var(--text-secondary); font-size: 0.72rem; }
  .field-label {
    display: block;
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--text-primary);
    margin-bottom: 6px;
  }
  .product-selector-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(215px, 1fr));
    gap: 8px;
    max-height: 220px;
    overflow-y: auto;
    padding: 10px;
    background: var(--bg-canvas);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-input);
    margin-bottom: 14px;
  }
  .prod-check-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 7px 9px;
    border-radius: 8px;
    background: var(--bg-surface);
    border: 1px solid var(--border-hairline);
    cursor: pointer;
    font-size: 0.78rem;
    transition: border-color 150ms ease-out, background-color 150ms ease-out;
  }
  .prod-check-item.selected {
    border-color: var(--teal-safe);
    background: rgba(20, 184, 166, 0.12);
  }
  .prod-check-item input { margin-top: 3px; accent-color: var(--teal-safe); }
  .input-box, .textarea-box {
    width: 100%;
    background: var(--bg-canvas);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-input);
    padding: 10px 12px;
    color: var(--text-primary);
    font-size: 16px;
  }
  .input-box:focus, .textarea-box:focus {
    outline: 2px solid var(--teal-safe);
    border-color: transparent;
  }
  .results-panel {
    background: var(--bg-surface);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    padding: 22px;
  }
  .score-strip {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    margin-bottom: 18px;
  }
  .metric-box {
    background: var(--bg-canvas);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-input);
    padding: 12px;
  }
  .metric-val {
    font-size: 1.75rem;
    font-weight: 800;
    line-height: 1.1;
  }
  .badge-safe {
    display: inline-flex;
    align-items: center;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: var(--teal-bg);
    color: var(--teal-safe);
    font-size: 0.73rem;
    font-weight: 700;
  }
  .badge-clash {
    display: inline-flex;
    align-items: center;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: var(--rose-bg);
    color: var(--rose-clash);
    font-size: 0.73rem;
    font-weight: 700;
  }
  .badge-warn {
    display: inline-flex;
    align-items: center;
    padding: 3px 9px;
    border-radius: var(--radius-pill);
    background: var(--amber-bg);
    color: var(--amber-warn);
    font-size: 0.73rem;
    font-weight: 700;
  }
  .conflict-card {
    background: var(--bg-canvas);
    border-left: 4px solid var(--rose-clash);
    border-top: 1px solid var(--border-hairline);
    border-right: 1px solid var(--border-hairline);
    border-bottom: 1px solid var(--border-hairline);
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 10px;
  }
  .conflict-card.MODERATE {
    border-left-color: var(--amber-warn);
  }
  .ph-scale-bar {
    position: relative;
    height: 30px;
    border-radius: 8px;
    background: linear-gradient(90deg, #F43F5E 0%, #F59E0B 35%, #14B8A6 65%, #38BDF8 100%);
    margin: 10px 0 22px;
  }
  .ph-marker {
    position: absolute;
    top: -6px;
    transform: translateX(-50%);
    background: #090D12;
    border: 2px solid #F8FAFC;
    border-radius: 6px;
    padding: 2px 6px;
    font-size: 0.68rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .wallet-preview-wrap {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 16px;
    margin-top: 16px;
  }
  @media (max-width: 768px) {
    .wallet-preview-wrap { grid-template-columns: 1fr; }
    .score-strip { grid-template-columns: 1fr; }
  }
  .wallet-card-916 {
    aspect-ratio: 9 / 15.2;
    max-width: 270px;
    margin: 0 auto;
    width: 100%;
    background: linear-gradient(165deg, #0D1724 0%, #090D12 100%);
    border: 1px solid var(--border-strong);
    border-radius: 22px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
  }
  .section-block {
    padding: 56px 0;
    border-bottom: 1px solid var(--border-hairline);
  }
  .bento-grid-3 {
    display: grid;
    grid-template-columns: 1.2fr 0.9fr 0.9fr;
    gap: 18px;
    margin-top: 24px;
  }
  @media (max-width: 960px) {
    .bento-grid-3 { grid-template-columns: 1fr; }
  }
  .bento-cell {
    background: var(--bg-surface);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    padding: 22px;
  }
  .bento-cell.tinted {
    background: linear-gradient(155deg, rgba(20, 184, 166, 0.11) 0%, #101722 100%);
    border-color: var(--border-strong);
  }
  .table-wrap {
    overflow-x: auto;
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    background: var(--bg-surface);
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.84rem;
  }
  th, td {
    padding: 11px 14px;
    text-align: left;
    border-bottom: 1px solid var(--border-hairline);
  }
  th {
    color: var(--text-secondary);
    font-weight: 600;
    background: var(--bg-elevated);
  }
  .site-footer {
    padding: 40px 0;
    color: var(--text-secondary);
    font-size: 0.85rem;
  }
  .cookie-banner {
    position: fixed;
    bottom: 16px;
    right: 16px;
    left: 16px;
    max-width: 520px;
    background: var(--bg-elevated);
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-card);
    padding: 14px 18px;
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    z-index: 60;
  }
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(5, 8, 12, 0.82);
    backdrop-filter: blur(6px);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    z-index: 80;
  }
  .modal-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-card);
    max-width: 560px;
    width: 100%;
    padding: 24px;
  }
`;

function renderHeader(hideNav = false) {
  if (hideNav) {
    return `
      <header class="site-header">
        <div class="container nav-inner">
          <div class="brand-mark">
            <span class="brand-glyph mono">ΔpH</span>
            <span>DermLogic <span class="mono" style="font-size:0.75rem;color:var(--teal-safe);">CLINICAL v4.0</span></span>
          </div>
          <div class="badge-safe mono">30-DAY CLINICAL ACCURACY GUARANTEE</div>
        </div>
      </header>
    `;
  }
  return `
    <header class="site-header">
      <div class="container nav-inner">
        <a href="/" class="brand-mark">
          <span class="brand-glyph mono">ΔpH</span>
          <span>DermLogic <span class="mono" style="font-size:0.75rem;color:var(--teal-safe);">INCI ENGINE</span></span>
        </a>
        <nav class="nav-links" aria-label="Main Navigation">
          <a href="/#checker">Conflict Checker</a>
          <a href="/#inci-table">INCI &amp; pKa Matrix</a>
          <a href="/directory">60+ Clinical Guides</a>
          <a href="/lp">Rapid Audit Mode</a>
        </nav>
        <a href="/#checker" class="btn-primary">Analyze Routine</a>
      </div>
    </header>
  `;
}

function renderFooter() {
  return `
    <footer class="site-footer">
      <div class="container" style="display:flex;flex-wrap:wrap;justify-content:space-between;gap:20px;align-items:center;">
        <div>
          <div class="brand-mark" style="margin-bottom:6px;">
            <span class="brand-glyph mono">ΔpH</span>
            <span>DermLogic Clinical Formulation Intelligence</span>
          </div>
          <p style="color:var(--text-muted);font-size:0.8rem;">
            Deterministic Henderson-Hasselbalch free-acid bioavailability, ΔpH inactivation, EU CosIng &amp; Malassezia safety engine.
          </p>
        </div>
        <div style="display:flex;gap:20px;flex-wrap:wrap;">
          <a href="/directory">pSEO Directory (60 Pages)</a>
          <a href="/sitemap.xml">XML Sitemap</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
    <div id="cookieBanner" class="cookie-banner" role="region" aria-label="Cookie Consent">
      <div style="font-size:0.78rem;color:var(--text-secondary);">
        We use privacy-safe first-party telemetry &amp; CAPI deduplication for clinical accuracy.
      </div>
      <div style="display:flex;gap:8px;">
        <button type="button" class="btn-secondary" onclick="setCookieConsent('rejected')">Reject</button>
        <button type="button" class="btn-primary" style="padding:7px 14px;font-size:0.78rem;" onclick="setCookieConsent('accepted')">Accept</button>
      </div>
    </div>
  `;
}

function renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds, initialRawInci }) {
  const selectedSet = new Set(initialProductIds || ['to-glycolic-acid-7', 'paulas-choice-2-bha', 'rx-tretinoin-005', 'skinceuticals-ce-ferulic']);

  const presetButtonsHtml = presets.map((p, idx) => `
    <button type="button" class="preset-chip ${idx === 0 ? 'active' : ''}" data-preset-id="${escapeHtml(p.id)}" data-products='${JSON.stringify(p.productIds)}' data-skin="${escapeHtml(p.skinType)}" onclick="applyRoutinePreset(this)">
      <strong>${escapeHtml(p.label)}</strong>
      <span class="mono">${escapeHtml(p.badge)}</span>
    </button>
  `).join('');

  const productCheckboxesHtml = products.map((prod) => {
    const isChecked = selectedSet.has(prod.id);
    return `
      <label class="prod-check-item ${isChecked ? 'selected' : ''}" data-prod-label="${escapeHtml(prod.id)}">
        <input type="checkbox" name="routineProduct" value="${escapeHtml(prod.id)}" ${isChecked ? 'checked' : ''} onchange="toggleProductChip(this)" />
        <span>
          <strong style="display:block;color:var(--text-primary);">${escapeHtml(prod.brand)}</strong>
          <span style="color:var(--text-secondary);display:block;">${escapeHtml(prod.name)}</span>
          <span class="mono" style="color:var(--teal-safe);font-size:0.7rem;">pH ${prod.ph} · $${prod.priceUsd}</span>
        </span>
      </label>
    `;
  }).join('');

  return `
    <div class="hero-grid" id="checker">
      <!-- Left Column: Above-the-Fold Interactive Free Routine Grader -->
      <div class="grader-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px;">
          <span class="field-label" style="margin:0;">1. Load a 1-Click Viral Conflict Preset</span>
          <span class="mono" style="font-size:0.74rem;color:var(--teal-safe);">SUB-5MS DETERMINISTIC ENGINE</span>
        </div>
        <div class="preset-row" id="presetButtonsRow">
          ${presetButtonsHtml}
        </div>

        <div style="display:grid;grid-template-columns:1fr 180px;gap:10px;margin-bottom:10px;">
          <div>
            <label class="field-label" for="productFilterInput">2. Select Products in Your Shelf (${products.length} Cult Formulas)</label>
            <input id="productFilterInput" type="search" class="input-box" placeholder="Filter by brand or active (e.g., SkinCeuticals, Tretinoin, BHA, Snail)..." oninput="filterProductList(this.value)" />
          </div>
          <div>
            <label class="field-label" for="skinTypeSelect">Skin Barrier Profile</label>
            <select id="skinTypeSelect" class="input-box" onchange="runRoutineAnalysis()">
              <option value="combination">Combination</option>
              <option value="sensitive">Sensitive / Rosacea</option>
              <option value="oily">Oily / Acne-Prone</option>
              <option value="dry">Dry / Compromised</option>
              <option value="normal">Normal / Resilient</option>
            </select>
          </div>
        </div>

        <div class="product-selector-grid" id="productSelectorGrid">
          ${productCheckboxesHtml}
        </div>

        <div style="margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
            <label class="field-label" for="rawInciTextarea" style="margin:0;">3. Or Paste Raw Product INCI Ingredient List (Optional)</label>
            <button type="button" class="btn-secondary" style="padding:4px 10px;font-size:0.72rem;" onclick="pasteSampleComedogenicInci()">Paste Sample Pore-Clogging INCI</button>
          </div>
          <textarea id="rawInciTextarea" class="textarea-box mono" rows="2" placeholder="e.g., Aqua, Ascorbic Acid, Copper Tripeptide-1, Glycolic Acid, Isopropyl Myristate, Polysorbate 20...">${escapeHtml(initialRawInci || '')}</textarea>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;">
          <button type="button" id="analyzeBtn" class="btn-primary" style="flex:1;" onclick="runRoutineAnalysis()">
            Analyze Routine Conflicts
          </button>
          <button type="button" class="btn-secondary" onclick="clearRoutineSelection()">
            Reset Shelf
          </button>
        </div>
      </div>

      <!-- Right Column: Live Telemetry, ΔpH Graph, Conflicts, AM/PM Schedule & 9:16 Wallet Card -->
      <div class="results-panel" id="liveResultsContainer">
        ${renderAnalysisResultHtml(initialAnalysis)}
      </div>
    </div>

    <!-- Checkout / Protocol Unlock Modal -->
    <div id="checkoutModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="checkoutModalTitle">
      <div class="modal-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <span class="badge-safe mono" id="modalBanditBadge">CLINICAL PROTOCOL FULFILLMENT</span>
          <button type="button" class="btn-secondary" style="padding:4px 10px;" onclick="closeCheckoutModal()">Close</button>
        </div>
        <h3 id="checkoutModalTitle" style="font-size:1.25rem;margin-bottom:6px;">Unlock Your Personalized AM/PM Rescue Protocol &amp; 9:16 Wallet Card</h3>
        <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:16px;">
          Includes printable 4-Night Skin-Cycling schedule, exact Henderson-Hasselbalch free-acid table, and dermatologist wait-time alarms.
        </p>
        <form id="checkoutForm" onsubmit="submitSelfServeCheckout(event)">
          <input type="hidden" id="checkoutPlanId" value="onetime_499" />
          <div style="margin-bottom:12px;">
            <label class="field-label" for="checkoutEmailInput">Delivery Email for Clinical PDF &amp; Apple-Wallet Pass</label>
            <input id="checkoutEmailInput" type="email" required class="input-box" placeholder="you@clinical-skincare.com" value="patient@dermlogic.io" />
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
            <label class="prod-check-item selected" id="planOption499" onclick="selectCheckoutPlan('onetime_499')">
              <input type="radio" name="planChoice" value="onetime_499" checked />
              <span>
                <strong style="display:block;">$4.99 One-Time Rescue</strong>
                <span style="color:var(--text-secondary);font-size:0.74rem;">AM/PM PDF + 9:16 Wallet Card</span>
              </span>
            </label>
            <label class="prod-check-item" id="planOption1999" onclick="selectCheckoutPlan('annual_1999')">
              <input type="radio" name="planChoice" value="annual_1999" />
              <span>
                <strong style="display:block;">$19.99/yr Unlimited Shelf</strong>
                <span style="color:var(--text-secondary);font-size:0.74rem;">Unlimited INCI + Fungal Acne Scans</span>
              </span>
            </label>
          </div>
          <button type="submit" id="checkoutSubmitBtn" class="btn-primary" style="width:100%;">
            Complete Instant Unlock ($4.99)
          </button>
        </form>
        <div id="checkoutSuccessBox" style="display:none;margin-top:16px;padding:14px;border-radius:10px;background:var(--teal-bg);border:1px solid var(--border-strong);">
        </div>
      </div>
    </div>
  `;
}

function renderAnalysisResultHtml(res) {
  const isCritical = res.verdictStatus === 'CRITICAL_CLASH';
  const isWarn = res.verdictStatus === 'MODERATE_CAUTION';
  const scoreColor = isCritical ? 'var(--rose-clash)' : isWarn ? 'var(--amber-warn)' : 'var(--teal-safe)';
  const badgeClass = isCritical ? 'badge-clash' : isWarn ? 'badge-warn' : 'badge-safe';

  const markersHtml = (res.ingredientBreakdown || []).slice(0, 5).map((item, idx) => {
    const pct = Math.max(4, Math.min(94, ((item.effectivePh - 2.0) / 6.0) * 100));
    const topOffset = idx % 2 === 0 ? '-8px' : '14px';
    return `<div class="ph-marker mono" style="left:${pct.toFixed(1)}%;top:${topOffset};" title="${escapeHtml(item.commonName)} (pH ${item.effectivePh})">${escapeHtml(item.inciName.split(' ')[0])} ${item.effectivePh}</div>`;
  }).join('');

  const conflictsHtml = res.conflicts.length === 0
    ? `<div style="padding:14px;border-radius:10px;background:var(--teal-bg);border:1px solid var(--border-strong);color:var(--teal-safe);font-size:0.86rem;margin-bottom:14px;">
         <strong>Zero Chemical or ΔpH Conflicts Detected:</strong> All selected actives operate within compatible pH and redox windows.
       </div>`
    : res.conflicts.map((c) => `
        <div class="conflict-card ${escapeHtml(c.severity)}">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span class="${c.severity === 'CRITICAL' ? 'badge-clash' : 'badge-warn'} mono">${escapeHtml(c.severity)} · ΔpH ${c.deltaPh}</span>
            <span class="mono" style="font-size:0.74rem;color:var(--text-secondary);">${escapeHtml(c.inciA)} (pH ${c.phA}) × ${escapeHtml(c.inciB)} (pH ${c.phB})</span>
          </div>
          <div style="font-weight:700;font-size:0.92rem;margin-bottom:4px;">${escapeHtml(c.title)}</div>
          <p style="color:var(--text-secondary);font-size:0.8rem;margin-bottom:6px;">${escapeHtml(c.mechanism)}</p>
          <div style="font-size:0.8rem;color:var(--teal-safe);font-weight:600;">Rx Fix: ${escapeHtml(c.resolution)}</div>
        </div>
      `).join('');

  const comedogenicSummary = res.comedogenicFlags.length > 0
    ? res.comedogenicFlags.map((f) => `<span class="badge-warn mono" style="margin-right:6px;margin-bottom:4px;">${escapeHtml(f.inciName)} (${f.rating}/5 Pore Risk)</span>`).join('')
    : `<span class="badge-safe mono">0 High-Comedogenic Esters</span>`;

  const malasseziaSummary = res.malasseziaFlags.length > 0
    ? res.malasseziaFlags.map((f) => `<span class="badge-clash mono" style="margin-right:6px;margin-bottom:4px;">Malassezia Trigger: ${escapeHtml(f.inciName)}</span>`).join('')
    : `<span class="badge-safe mono">100% Fungal-Acne (Malassezia) Safe</span>`;

  const amListHtml = res.schedule.amSteps.map((s) => `
    <li style="margin-bottom:6px;font-size:0.8rem;">
      <strong style="color:var(--teal-safe);">${escapeHtml(s.slot)}:</strong> ${escapeHtml(s.title)}
      <span class="mono" style="color:var(--text-secondary);font-size:0.72rem;">[pH ${escapeHtml(s.ph)} · ${escapeHtml(s.wait)}]</span>
    </li>
  `).join('');

  const pmCyclingHtml = res.schedule.pmCycling.map((n) => `
    <div style="padding:8px 10px;border-radius:8px;background:var(--bg-canvas);border:1px solid var(--border-hairline);margin-bottom:6px;">
      <div style="display:flex;justify-content:space-between;font-size:0.78rem;font-weight:700;">
        <span>${escapeHtml(n.night)}</span>
        <span class="mono" style="color:var(--teal-safe);font-size:0.7rem;">${escapeHtml(n.badge)}</span>
      </div>
      <div style="color:var(--text-secondary);font-size:0.75rem;">${escapeHtml(n.steps.join(' → '))}</div>
    </div>
  `).join('');

  return `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px;">
      <span class="${badgeClass} mono">${escapeHtml(res.verdictLabel)}</span>
      <span class="mono" style="font-size:0.74rem;color:var(--text-secondary);">Computed in ${res.executionMs}ms</span>
    </div>

    <div class="score-strip">
      <div class="metric-box">
        <div style="font-size:0.74rem;color:var(--text-secondary);">Compatibility Score</div>
        <div class="metric-val mono" style="color:${scoreColor};" id="compatibilityScoreValue">${res.compatibilityScore}<span style="font-size:0.95rem;color:var(--text-secondary);">/100</span></div>
      </div>
      <div class="metric-box">
        <div style="font-size:0.74rem;color:var(--text-secondary);">Barrier Hazard Index</div>
        <div class="metric-val mono" style="color:${res.barrierHazardIndex > 50 ? 'var(--rose-clash)' : 'var(--teal-safe)'};">${res.barrierHazardIndex}<span style="font-size:0.95rem;color:var(--text-secondary);">/100</span></div>
      </div>
      <div class="metric-box">
        <div style="font-size:0.74rem;color:var(--text-secondary);">Comedogenic Load</div>
        <div class="metric-val mono" style="color:${res.comedogenicLoad > 35 ? 'var(--amber-warn)' : 'var(--teal-safe)'};">${res.comedogenicLoad}<span style="font-size:0.95rem;color:var(--text-secondary);">/100</span></div>
      </div>
    </div>

    <div style="font-size:0.76rem;color:var(--text-secondary);display:flex;justify-content:space-between;">
      <span>Formulation pH Window &amp; ΔpH Spread (pH 2.0 Acidic → pH 8.0 Alkaline)</span>
      <span class="mono">|ΔpH| &gt; 1.8 = Hydrolysis / Flush Threshold</span>
    </div>
    <div class="ph-scale-bar">
      ${markersHtml}
    </div>

    <div id="conflictsListArea">
      ${conflictsHtml}
    </div>

    <div style="margin:10px 0;display:flex;flex-wrap:wrap;gap:6px;">
      ${comedogenicSummary}
      ${malasseziaSummary}
    </div>

    <div class="wallet-preview-wrap">
      <div>
        <div style="font-weight:700;font-size:0.86rem;margin-bottom:6px;">Optimized AM / PM Split &amp; 4-Night Skin-Cycling Rescue</div>
        <ul style="list-style:none;margin-bottom:10px;">
          ${amListHtml}
        </ul>
        ${pmCyclingHtml}
      </div>

      <!-- 9:16 Apple-Wallet-Style Routine Safety Card -->
      <div>
        <div class="wallet-card-916" id="appleWalletCardPreview">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
              <span class="mono" style="font-size:0.7rem;color:var(--teal-safe);font-weight:700;">DERMLOGIC PASS · 9:16</span>
              <span class="mono" style="font-size:0.68rem;color:var(--text-secondary);">pKa / ΔpH</span>
            </div>
            <div style="font-size:1.55rem;font-weight:800;line-height:1.05;color:${scoreColor};margin-bottom:4px;">
              ${res.compatibilityScore}/100
            </div>
            <div style="font-size:0.75rem;color:var(--text-secondary);margin-bottom:12px;">
              ${res.conflicts.length} Conflict(s) · Barrier Risk ${res.barrierHazardIndex}%
            </div>
            <div style="border-top:1px solid var(--border-hairline);padding-top:10px;font-size:0.72rem;">
              <div style="color:var(--teal-safe);font-weight:700;margin-bottom:3px;">AM LOCK</div>
              <div style="color:var(--text-primary);margin-bottom:8px;">${escapeHtml(res.schedule.amSteps.map((s) => s.slot.replace('AM ', '')).join(' → '))}</div>
              <div style="color:var(--amber-warn);font-weight:700;margin-bottom:3px;">PM 4-NIGHT CYCLE</div>
              <div style="color:var(--text-secondary);">N1: Acid · N2: Retinoid · N3: Peptide · N4: Ceramide</div>
            </div>
          </div>
          <div style="border-top:1px dashed var(--border-hairline);padding-top:10px;">
            <button type="button" class="btn-primary" style="width:100%;font-size:0.76rem;padding:9px 12px;" onclick="openCheckoutModal('onetime_499')">
              Export Wallet Card ($4.99)
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
        event_id: eventId,
        event_name: eventName,
        source_url: window.location.href,
        value: valueUsd || 0,
        currency: 'USD',
        ...utm,
        custom_data: customData || {}
      })
    }).catch(() => {});
  }

  function toggleProductChip(checkbox) {
    const label = checkbox.closest('.prod-check-item');
    if (label) {
      label.classList.toggle('selected', checkbox.checked);
    }
    runRoutineAnalysis();
  }

  function filterProductList(query) {
    const q = (query || '').toLowerCase().trim();
    const items = document.querySelectorAll('#productSelectorGrid .prod-check-item');
    items.forEach((el) => {
      const text = el.textContent.toLowerCase();
      el.style.display = (!q || text.includes(q)) ? 'flex' : 'none';
    });
  }

  function applyRoutinePreset(btn) {
    document.querySelectorAll('#presetButtonsRow .preset-chip').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    const productIds = JSON.parse(btn.getAttribute('data-products') || '[]');
    const skin = btn.getAttribute('data-skin') || 'combination';
    const skinSelect = document.getElementById('skinTypeSelect');
    if (skinSelect) skinSelect.value = skin;

    const checkboxes = document.querySelectorAll('input[name="routineProduct"]');
    checkboxes.forEach((cb) => {
      cb.checked = productIds.includes(cb.value);
      const lbl = cb.closest('.prod-check-item');
      if (lbl) lbl.classList.toggle('selected', cb.checked);
    });
    runRoutineAnalysis();
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

  async function runRoutineAnalysis() {
    const checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map((cb) => cb.value);
    const skinType = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
    const rawInciText = (document.getElementById('rawInciTextarea') || {}).value || '';
    const btn = document.getElementById('analyzeBtn');
    if (btn) btn.textContent = 'Analyzing ΔpH & pKa...';

    try {
      const resp = await fetch('/api/analyze-routine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ skinType, productIds: checked, rawInciText, renderHtml: true })
      });
      const data = await resp.json();
      window.__DERMLOGIC_LAST_RESULT = data;
      const container = document.getElementById('liveResultsContainer');
      if (container && data.renderedHtml) {
        container.innerHTML = data.renderedHtml;
      }
      fireMetaCapiEvent('Lead', 0, {
        compatibilityScore: data.compatibilityScore,
        conflictsCount: (data.conflicts || []).length
      });
    } catch (e) {
      console.error('Routine analysis error:', e);
    } finally {
      if (btn) btn.textContent = 'Analyze Routine Conflicts';
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
      if (btn) btn.textContent = 'Complete Instant Unlock ($19.99/yr)';
    } else {
      if (p499) p499.classList.add('selected');
      if (p1999) p1999.classList.remove('selected');
      if (btn) btn.textContent = 'Complete Instant Unlock ($4.99)';
    }
  }

  async function submitSelfServeCheckout(ev) {
    ev.preventDefault();
    const planId = (document.getElementById('checkoutPlanId') || {}).value || 'onetime_499';
    const email = (document.getElementById('checkoutEmailInput') || {}).value || 'patient@dermlogic.io';
    const btn = document.getElementById('checkoutSubmitBtn');
    if (btn) { btn.disabled = true; btn.textContent = 'Generating Clinical Pass...'; }

    try {
      const resp = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          email,
          routineSummary: window.__DERMLOGIC_LAST_RESULT || {}
        })
      });
      const res = await resp.json();
      const box = document.getElementById('checkoutSuccessBox');
      if (box) {
        box.style.display = 'block';
        box.innerHTML = '<strong>Unlocked Order ' + res.order.order_id + ':</strong> ' + res.message + ' <br/><span class="mono" style="font-size:0.75rem;">Download Token: ' + res.downloadUrl + '</span>';
      }
      fireMetaCapiEvent('Purchase', res.order.amount_cents / 100, {
        order_id: res.order.order_id,
        plan_id: planId
      });
    } catch (e) {
      console.error('Checkout error:', e);
    } finally {
      if (btn) { btn.disabled = false; btn.textContent = 'Pass Unlocked ✓'; }
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
      if (banner) banner.style.display = 'flex';
    }
    fireMetaCapiEvent('ViewContent', 0, { path: window.location.pathname });
  });
`;

module.exports = {
  escapeHtml,
  SHARED_CSS,
  CLIENT_SCRIPT,
  renderHeader,
  renderFooter,
  renderInteractiveCheckerWidget,
  renderAnalysisResultHtml
};
