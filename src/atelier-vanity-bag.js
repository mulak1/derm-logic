'use strict';

/**
 * DermLogic Option 1 + 2 + 3 Hybrid: The 5-Slot Atelier Vanity Bag, 4-Tab Dossier,
 * Live Clash Detector, 5-Bottle Countertop Vessel Lineup, 1-Tap Add/Remove Across All Pages,
 * and Mobile Bottom-Sheet Experience.
 * Strictly < 1,000 lines and zero em-dashes.
 */
const { CULT_PRODUCTS, VANITY_SLOT_CALIBRATORS, VANITY_SLOT_OPTIONS } = require('./clinical-products');
const PROD_INFO_MAP = Object.assign(
  {},
  ...CULT_PRODUCTS.map((p) => ({ [p.id]: { brand: p.brand, name: p.name, cat: p.category, ph: p.ph, price: p.priceUsd, desc: p.summary } })),
  ...VANITY_SLOT_OPTIONS.flatMap((s) => s.choices.map((c) => ({ [c.id]: { brand: c.label.split(' ')[0], name: c.label.split(' ($')[0], cat: s.role, ph: c.ph, price: (c.label.match(/\$(\d+)/) || [])[1] || '', desc: c.desc || (CULT_PRODUCTS.find((x) => x.id === c.id) || {}).summary || '' } })))
);

function buildLogoBagIconSvg(size = 26) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 44 44" fill="none" aria-hidden="true" style="flex-shrink:0;display:block;"><circle cx="22" cy="22" r="20" fill="#FFFFFF" stroke="#8A3448" stroke-width="1.4"/><path d="M16.5 17.5V14.2C16.5 11.5 18.9 9.8 22 9.8C25.1 9.8 27.5 11.5 27.5 14.2V17.5" stroke="#8A3448" stroke-width="1.5" stroke-linecap="round"/><rect x="14" y="14.5" width="4.4" height="7.5" rx="2" fill="#CBE2F6"/><rect x="20" y="13" width="4.4" height="9" rx="2" fill="#F7DFAD"/><rect x="25.8" y="14.5" width="4.4" height="7.5" rx="2" fill="#CBEAD9"/><path d="M11 20C11 18.2 12.6 17.2 15.5 17.2H28.5C31.4 17.2 33 18.2 33 20L31.2 31C30.7 33.2 28.5 34.2 22 34.2C15.5 34.2 13.3 33.2 12.8 31L11 20Z" fill="#8A3448"/><path d="M22 21.5C22 21.5 24.8 24.9 24.8 27C24.8 28.6 23.5 29.8 22 29.8C20.5 29.8 19.2 28.6 19.2 27C19.2 24.9 22 21.5 22 21.5Z" fill="#FFFFFF"/></svg>`;
}

function renderHeaderVanityBagPill() {
  return `<button type="button" id="dl-header-vanity-pill" class="mono" onpointerup="if(!event.button)window.__dlOpenVanityDrawer('header_pill')" onclick="window.__dlOpenVanityDrawer('header_pill')" aria-label="Open My 5-Slot Atelier Vanity Bag" style="display:inline-flex;align-items:center;gap:9px;padding:6px 14px 6px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;border-radius:999px;cursor:pointer;font-size:0.84rem;font-weight:600;user-select:none;touch-action:manipulation;transition:background-color 180ms ease;white-space:nowrap;">
    <span style="position:relative;display:inline-flex;align-items:center;gap:6px;">
      ${buildLogoBagIconSvg(26)}
      <span id="dl-header-vanity-full-dot" style="position:absolute;top:-1px;left:18px;width:9px;height:9px;border-radius:999px;background:#10B981;"></span>
      <span id="dl-header-vanity-bars" style="display:inline-flex;flex-direction:column;gap:2px;align-items:center;"><span style="width:5px;height:2.5px;border-radius:99px;background:#10B981;"></span><span style="width:5px;height:2.5px;border-radius:99px;background:#8A3448;"></span><span style="width:5px;height:2.5px;border-radius:99px;background:#8A3448;"></span><span style="width:5px;height:2.5px;border-radius:99px;background:#8A3448;"></span><span style="width:5px;height:2.5px;border-radius:99px;background:#8A3448;"></span></span>
    </span>
    <span>Vanity Bag</span>
    <span id="dl-header-vanity-count" style="padding:2px 9px;border-radius:999px;background:var(--rose-brand);color:var(--accent-ink);font-size:0.75rem;font-weight:600;">5 of 5 Full</span>
    <span id="dl-header-vanity-clash-dot" style="display:none;font-size:0.73rem;padding:1px 6px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;">0 Clashes</span>
  </button>`;
}

function renderAtelierVanityDrawerHtml() {
  return `
  <style>
    .dl-vanity-swatch-btn:active, .dl-vanity-slot-head:active, .dl-dossier-tab-btn:active, .dl-tray-vessel-btn:active, .dl-add-to-bag-btn:active { transform: scale(0.97); }
    #dl-header-vanity-pill *, #dl-floating-vanity-dock * { pointer-events: none; }
    .dl-vanity-swatch-btn { display: inline-flex; align-items: center; justify-content: center; gap: 4px; padding: 6px; background: var(--bg-surface); color: var(--text-secondary); border: none; border-radius: 999px; cursor: pointer; min-width: 0; max-width: 100%; overflow: hidden; text-overflow: ellipsis; text-align: center; font-size: 0.72rem; line-height: 1.2; font-weight: 500; white-space: nowrap; transition: background-color 160ms ease, transform 160ms cubic-bezier(0.22,1,0.36,1); }
    .dl-vanity-swatch-btn.active { background: var(--rose-pill-bg); color: var(--rose-brand); font-weight: 600; }
    .dl-vanity-slot-card { background: var(--bg-surface); border: none; border-radius: 20px; transition: background-color 180ms ease; }
    .dl-vanity-slot-card.active { background: var(--bg-surface); }
    .dl-vanity-slot-card.clash-slot { background: var(--berry-bg); }
    .dl-dossier-tabs-bar { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); background: var(--bg-oat); border-radius: 999px; padding: 4px; gap: 4px; }
    .dl-dossier-tab-btn { padding: 8px 6px; background: transparent; border: none; border-radius: 999px; cursor: pointer; text-align: center; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-width: 0; transition: background-color 160ms ease, color 160ms ease; }
    .dl-dossier-tab-btn.active { background: var(--bg-surface); box-shadow: 0 2px 8px rgba(58,31,39,0.06); }
    .dl-tray-lineup-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; }
    .dl-tray-vessel-btn { background: var(--bg-surface); border: none; border-radius: 16px; padding: 8px 4px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: space-between; gap: 4px; min-width: 0; position: relative; transition: transform 180ms cubic-bezier(0.22,1,0.36,1), background-color 160ms ease; }
    .dl-tray-vessel-btn:hover { transform: translateY(-2px); }
    .dl-tray-vessel-btn.active { background: var(--rose-pill-bg); transform: translateY(-2px); }
    .dl-tray-vessel-btn.has-clash { background: var(--berry-bg); }
    .dl-tray-vessel-btn.is-empty { background: var(--bg-empty-slot, #EAE0D7); }
    .dl-tray-vessel-btn.is-empty.active { background: var(--bg-empty-slot-active, #E3D3C8); }
    .dl-add-to-bag-btn, .vanity-card-bag-btn { display: inline-flex; align-items: center; gap: 5px; padding: 5px 12px; border-radius: 999px; background: var(--rose-pill-bg); color: var(--rose-brand); border: none; font-size: 0.75rem; font-weight: 600; cursor: pointer; white-space: nowrap; transition: background-color 160ms ease, color 160ms ease, transform 150ms ease; }
    .dl-add-to-bag-btn.in-bag { background: var(--rose-brand); color: var(--accent-ink); }
    .dl-info-i { display: inline-flex; align-items: center; justify-content: center; width: 16px; height: 16px; border-radius: 999px; background: rgba(138,52,72,0.15); color: var(--rose-brand); font-size: 0.66rem; font-weight: 700; font-style: italic; font-family: Georgia, serif; flex-shrink: 0; cursor: pointer; margin-left: 4px; line-height: 1; user-select: none; touch-action: manipulation; transition: background-color 140ms ease, color 140ms ease; }
    .dl-info-i:hover { background: var(--rose-brand); color: #FFFFFF; }
    #dl-prod-info-tip { position: fixed; z-index: 10025; max-width: 268px; border-radius: 18px; padding: 10px 13px; background: #FFF7F8; color: #3A1F27; font-size: 0.75rem; line-height: 1.4; box-shadow: 0 14px 32px rgba(138,52,72,0.16), 0 2px 8px rgba(58,31,39,0.08); pointer-events: none; display: none; }
    #dl-vanity-toast { position: fixed; bottom: 18px; right: 18px; z-index: 9998; background: #3A1F27; color: #FDF8F6; border: none; border-radius: 999px; padding: 10px 16px; font-size: 0.8rem; display: none; align-items: center; gap: 10px; box-shadow: 0 14px 34px rgba(58,31,39,0.22); max-width: calc(100vw - 32px); }
    #dl-floating-vanity-dock { position: fixed; right: 0; top: calc(50dvh - 76px); transform: none !important; z-index: 10010; background: var(--bg-pouch); color: var(--text-primary); border-radius: 26px 0 0 26px; padding: 16px 14px; display: flex; flex-direction: column; align-items: center; gap: 7px; cursor: pointer; border: none; user-select: none; touch-action: manipulation; box-shadow: -6px 10px 28px rgba(58,31,39,0.1); transition: background-color 160ms ease; }
    #dl-floating-vanity-dock:hover, #dl-floating-vanity-dock:active, #dl-header-vanity-pill:active { transform: none !important; background: var(--rose-pill-bg); }
    @media (max-width: 768px) {
      .dl-hide-mobile, #dl-floating-vanity-dock { display: none !important; }
      #dl-header-vanity-pill { padding: 5px 10px !important; font-size: 0.74rem !important; gap: 5px !important; }
      #dl-header-vanity-clash-dot { display: none !important; }
      #dl-atelier-vanity-drawer { align-items: flex-end !important; justify-content: center !important; padding: 0 !important; }
      #dl-atelier-vanity-panel { width: 100vw !important; max-width: 100vw !important; height: auto !important; max-height: 92dvh !important; border: none !important; border-radius: 24px 24px 0 0 !important; padding: 12px 14px 16px 14px !important; gap: 8px !important; }
      .dl-mobile-grabber { display: block !important; width: 42px; height: 4px; background: var(--rose-pill-bg); margin: 0 auto 4px auto; border-radius: 2px; flex-shrink: 0; }
      .dl-tray-lineup-grid { display: grid !important; grid-template-columns: repeat(5, minmax(0, 1fr)) !important; gap: 4px !important; }
      .dl-tray-vessel-btn { padding: 4px 2px !important; min-width: 0 !important; }
      .dl-tray-vessel-btn svg { width: 26px !important; height: 32px !important; }
      #dl-undertone-swatches .dl-vanity-swatch-btn { font-size: 0.67rem !important; padding: 5px 2px !important; gap: 3px !important; }
      #dl-finish-swatches .dl-vanity-swatch-btn { font-size: 0.7rem !important; padding: 5px 4px !important; }
      .dl-dossier-tab-sub { display: none !important; }
      .dl-dossier-tab-title { font-size: 0.74rem !important; }
    }
  </style>

  <!-- Right-Edge Floating Vanity Bag Sidebar -->
  <button type="button" id="dl-floating-vanity-dock" aria-label="Open My 5-Slot Atelier Vanity Bag" onpointerup="if(!event.button)window.__dlOpenVanityDrawer('floating_dock')" onclick="window.__dlOpenVanityDrawer('floating_dock')">
    <div style="position:relative;display:inline-flex;align-items:center;gap:6px;">
      <div style="position:relative;">${buildLogoBagIconSvg(36)}<span id="dl-dock-vanity-full-dot" style="position:absolute;top:0px;right:0px;width:11px;height:11px;border-radius:999px;background:#10B981;" title="Vanity Pouch Full"></span></div>
      <span id="dl-dock-vanity-bars" style="display:flex;flex-direction:column;align-items:center;gap:3px;"><span style="width:6px;height:3px;border-radius:99px;background:#10B981;"></span><span style="width:6px;height:3px;border-radius:99px;background:#8A3448;"></span><span style="width:6px;height:3px;border-radius:99px;background:#8A3448;"></span><span style="width:6px;height:3px;border-radius:99px;background:#8A3448;"></span><span style="width:6px;height:3px;border-radius:99px;background:#8A3448;"></span></span>
    </div>
    <span style="font-size:0.78rem;font-weight:600;color:var(--text-primary);">Vanity Bag</span>
    <span id="dl-dock-vanity-count" style="padding:3px 10px;border-radius:999px;background:var(--rose-brand);color:var(--accent-ink);font-size:0.74rem;font-weight:600;">5 / 5 Full</span>
    <span style="display:inline-flex;align-items:center;gap:4px;font-size:0.72rem;color:var(--sage-safe);font-weight:600;"><span id="dl-dock-vanity-status-dot" style="width:6px;height:6px;border-radius:999px;background:#10B981;"></span><span id="dl-dock-vanity-harmony">Harmonized</span></span>
  </button>
  <div id="dl-prod-info-tip" role="tooltip" aria-hidden="true"></div>
  <div id="dl-vanity-toast" role="status" aria-live="polite">
    <span id="dl-vanity-toast-text" class="mono">Added to Vanity Bag</span>
    <button type="button" class="mono" onclick="window.__dlOpenVanityDrawer('toast');document.getElementById('dl-vanity-toast').style.display='none';" style="background:var(--rose-brand);color:var(--accent-ink);border:none;border-radius:999px;padding:4px 11px;font-size:0.74rem;font-weight:700;cursor:pointer;white-space:nowrap;">Open Bag &rarr;</button>
  </div>
  <div id="dl-atelier-vanity-drawer" role="dialog" aria-modal="true" aria-labelledby="dl-vanity-bag-title" onclick="if(event.target===this)window.__dlCloseVanityDrawer()" style="display:none;position:fixed;inset:0;z-index:10015;background:rgba(58,31,39,0.48);align-items:center;justify-content:flex-end;padding:16px;">
    <div id="dl-atelier-vanity-panel" style="width:540px;max-width:100vw;height:auto;max-height:calc(100dvh - 32px);background:var(--bg-canvas);color:var(--text-primary);border:none;border-radius:28px;box-shadow:0 24px 64px rgba(58,31,39,0.24);display:flex;flex-direction:column;justify-content:flex-start;overflow-y:auto;padding:20px 24px;gap:12px;">
      <div class="dl-mobile-grabber" style="display:none;" onclick="window.__dlCloseVanityDrawer()"></div>
      <div style="padding-bottom:6px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <button type="button" id="dl-vanity-harmony-pill" class="badge-safe mono" onclick="window.__dlSetDossierTab('clashes')" style="font-size:0.75rem;padding:3px 9px;border:none;cursor:pointer;">96% Harmony &middot; 0 Clashes</button>
            <span id="dl-vanity-hold-countdown" class="mono" style="color:var(--text-secondary);font-size:0.75rem;">Reserved for 23h 59m</span>
            <span id="dl-vanity-bag-id" class="mono" style="display:none;">#DL-4829</span>
          </div>
          <button type="button" id="dl-vanity-drawer-close" class="btn-secondary mono" onclick="window.__dlCloseVanityDrawer()" style="padding:4px 10px;min-height:26px;font-size:0.76rem;">Close &times;</button>
        </div>
        <h3 id="dl-vanity-bag-title" class="serif-display" style="font-size:1.45rem;font-weight:400;line-height:1.15;color:var(--text-primary);margin:0;">Your 5-Slot Calibrated Vanity Bag</h3>
        <div id="dl-vanity-exit-alert" style="display:none;padding:8px 10px;border-radius:14px;background:var(--rose-pill-bg);margin-top:8px;font-size:0.78rem;color:var(--text-primary);line-height:1.38;"><strong style="color:var(--rose-brand);">Your Vanity Bag Is Reserved for 24 Hours:</strong> Save your 9:16 Lock-Screen Card or email yourself a free restore link below before leaving.</div>
        <div id="dl-vanity-clash-banner" style="display:none;padding:9px 12px;border-radius:14px;background:var(--berry-bg);margin-top:8px;font-size:0.8rem;color:var(--text-primary);line-height:1.38;justify-content:space-between;align-items:center;gap:10px;">
          <div id="dl-vanity-clash-banner-text" style="min-width:0;flex:1;"></div>
          <button type="button" class="mono" onclick="window.__dlAutoFixBagClashes()" style="padding:5px 10px;border-radius:999px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.75rem;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;">1-Tap Fix &rarr;</button>
        </div>
      </div>
      <div style="background:var(--bg-oat);border-radius:20px;padding:10px 12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:6px;flex-wrap:wrap;">
          <span class="mono" style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);">Tap any bottle on your shelf (<span id="dl-tray-filled-label">5/5 Vessels</span>):</span>
          <div style="display:inline-flex;gap:5px;flex-wrap:wrap;">
            <button type="button" class="mono" onclick="window.__dlDupeAllFiveVessels()" style="background:var(--sage-bg);color:var(--sage-safe);border:none;border-radius:999px;padding:3px 9px;font-size:0.71rem;font-weight:700;cursor:pointer;">Dupe All 5 ($86) &rarr;</button>
            <button type="button" class="mono" onclick="window.__dlInjectSampleClash()" style="background:var(--bg-surface);color:var(--rose-brand);border:none;border-radius:999px;padding:3px 9px;font-size:0.71rem;font-weight:600;cursor:pointer;">Test a Clash &rarr;</button>
          </div>
        </div>
        <div id="dl-vanity-visual-tray" class="dl-tray-lineup-grid"></div>
      </div>
      <div class="dl-dossier-tabs-bar" role="tablist" aria-label="4-Tab Atelier Prescription Dossier">
        <button type="button" role="tab" id="dl-dossier-tab-slots" class="dl-dossier-tab-btn active" onclick="window.__dlSetDossierTab('slots')"><strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">1 &middot; Bottles</strong></button>
        <button type="button" role="tab" id="dl-dossier-tab-clashes" class="dl-dossier-tab-btn" onclick="window.__dlSetDossierTab('clashes')"><span class="mono" id="dl-tab02-kicker" style="display:none;">AUDIT</span><strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">2 &middot; Clashes</strong><span class="mono dl-dossier-tab-sub" id="dl-tab02-sub" style="display:none;">0 Clashes</span></button>
        <button type="button" role="tab" id="dl-dossier-tab-cycle" class="dl-dossier-tab-btn" onclick="window.__dlSetDossierTab('cycle')"><strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">3 &middot; 4-Night</strong></button>
        <button type="button" role="tab" id="dl-dossier-tab-pass" class="dl-dossier-tab-btn" onclick="window.__dlSetDossierTab('pass')"><strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">4 &middot; Phone Card</strong></button>
      </div>
      <div id="dl-dossier-panel-slots" style="display:flex;flex-direction:column;gap:10px;">
        <div id="dl-vanity-slots-list" style="display:flex;flex-direction:column;gap:0;"></div>
        <div id="dl-slot-calibrator-box" style="display:none;padding:12px 14px;border-radius:18px;background:var(--bg-oat);flex-direction:column;gap:8px;"></div>
        <div id="dl-undertone-parent-box" style="padding:12px 14px;border-radius:18px;background:var(--bg-oat);display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><span class="mono" style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);">Match Slot 04 SPF to Skin Tone &amp; Finish:</span><span id="dl-undertone-active-label" class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:600;">Neutral Ivory &middot; Velvet Satin</span></div>
          <div id="dl-undertone-swatches" role="group" aria-label="Select Skin Undertone" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;">
            <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="cool_rosy" onclick="window.__dlSetUndertone('cool_rosy', this)"><span style="width:9px;height:9px;border-radius:50%;background:#F3D9D4;flex-shrink:0;"></span><span>Cool Rosy</span></button>
            <button type="button" class="dl-vanity-swatch-btn active mono" data-undertone="neutral_ivory" onclick="window.__dlSetUndertone('neutral_ivory', this)"><span style="width:9px;height:9px;border-radius:50%;background:#EFE0D0;flex-shrink:0;"></span><span>Neutral</span></button>
            <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="warm_olive" onclick="window.__dlSetUndertone('warm_olive', this)"><span style="width:9px;height:9px;border-radius:50%;background:#D8B48E;flex-shrink:0;"></span><span>Warm Olive</span></button>
            <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="rich_espresso" onclick="window.__dlSetUndertone('rich_espresso', this)"><span style="width:9px;height:9px;border-radius:50%;background:#7B4B36;flex-shrink:0;"></span><span>Deep Rich</span></button>
          </div>
          <div id="dl-finish-swatches" role="group" aria-label="Select Complexion Finish" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;">
            <button type="button" class="dl-vanity-swatch-btn mono" data-finish="dewy_glass" onclick="window.__dlSetFinish('dewy_glass', this)">Dewy Glass</button>
            <button type="button" class="dl-vanity-swatch-btn active mono" data-finish="velvet_satin" onclick="window.__dlSetFinish('velvet_satin', this)">Velvet Satin</button>
            <button type="button" class="dl-vanity-swatch-btn mono" data-finish="cloud_matte" onclick="window.__dlSetFinish('cloud_matte', this)">Soft Matte</button>
          </div>
        </div>
      </div>
      <div id="dl-dossier-panel-clashes" style="display:none;flex-direction:column;gap:8px;"></div>
      <div id="dl-dossier-panel-cycle" style="display:none;flex-direction:column;gap:8px;"></div>
      <div id="dl-dossier-panel-pass" style="display:none;flex-direction:column;gap:8px;"></div>
      <div id="dl-vanity-vault-footer" style="position:sticky;bottom:-20px;z-index:6;padding:12px 14px;border-radius:18px;background:var(--bg-oat);box-shadow:0 -8px 24px rgba(58,31,39,0.08);display:flex;flex-direction:column;gap:8px;">
        <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:8px;">
          <a id="dl-vanity-keep-99c" href="/buy/micro_pass?source=vanity_bag_99c" onclick="return window.__dlBuyFromVanity('micro_pass', this)" class="btn-primary mono" style="width:100%;justify-content:center;text-decoration:none;padding:9px 12px;font-size:0.8rem;white-space:nowrap;"><span>Save 9:16 Phone Card (99&cent;) &rarr;</span></a>
          <a id="dl-vanity-keep-199" href="/buy/flash_pass?source=vanity_bag_199" onclick="return window.__dlBuyFromVanity('flash_pass', this)" class="btn-secondary mono" style="width:100%;justify-content:center;text-decoration:none;padding:9px 12px;font-size:0.78rem;white-space:nowrap;background:var(--bg-surface);color:var(--rose-brand);"><span>Complete 3-File Kit ($1.99)</span></a>
        </div>
        <form id="dl-vanity-email-form" onsubmit="return window.__dlSendVanityHoldEmail(event)" style="display:grid;grid-template-columns:minmax(0,1fr) auto;gap:8px;align-items:center;">
          <input id="dl-vanity-hold-email" type="email" required class="input-box mono" placeholder="Enter email to save your free 4-Night routine summary..." style="width:100%;padding:7px 12px;font-size:0.76rem;min-height:32px;background:var(--bg-surface);border-radius:999px;" />
          <button type="submit" id="dl-vanity-email-btn" class="btn-secondary mono" style="padding:7px 12px;min-height:32px;font-size:0.75rem;white-space:nowrap;">Email Free Summary &rarr;</button>
        </form>
        <div id="dl-vanity-email-status" class="mono" style="display:none;font-size:0.75rem;color:var(--sage-safe);font-weight:600;"></div>
      </div>
    </div>
  </div>
  `;
}

const ATELIER_VANITY_CLIENT_SCRIPT = `
  (function() {
    var VANITY_STORAGE_KEY = 'dermlogic_vanity_bag_v2';
    var SLOT_CALIBRATORS = ${JSON.stringify(VANITY_SLOT_CALIBRATORS)};
    var UNDERTONE_META = {
      cool_rosy: { label: 'Cool Rosy', spfRec: 'Beauty of Joseon Relief Sun SPF 50+ or EltaMD UV Clear (Untinted)', spfNote: 'Cool Rosy Undertone: Avoid yellow-iron-oxide tints that pull orange. Use sheer rice-probiotic or untinted niacinamide SPF 50 with a 60s dry-down before concealer.' },
      neutral_ivory: { label: 'Neutral Ivory', spfRec: 'Beauty of Joseon Relief Sun SPF 50+ (Zero White-Cast Rice Essence)', spfNote: 'Neutral Undertone: Balances both mineral and hybrid filters. Allow 60 seconds after barrier cream so water-based serums never pill under skin tint.' },
      warm_olive: { label: 'Warm / Olive', spfRec: 'EltaMD UV Clear SPF 46 or Hybrid Invisible Gel-Serum SPF 50 (Zero White-Cast)', spfNote: 'Warm / Olive Undertone: Uncoated zinc oxide leaves an ashy grey cast on olive skin. Use sheer hybrid or micronized niacinamide SPF 46+ with 90s absorption.' },
      rich_espresso: { label: 'Deep / Rich', spfRec: 'Beauty of Joseon Relief Sun SPF 50+ (100% Sheer Organic UV Filters)', spfNote: 'Deep / Rich Undertone: Zero-titanium sheer organic UV filters prevent chalky flashback while sealing humectants beneath complexion products.' }
    };
    var FINISH_META = {
      dewy_glass: { label: 'Dewy Glass', prepRule: 'Mist damp skin + press 2 drops squalane/ceramide essence before SPF.' },
      velvet_satin: { label: 'Velvet Satin', prepRule: 'Wait 60s between serum and barrier cream for a natural skin-like satin bounce.' },
      cloud_matte: { label: 'Soft Matte', prepRule: 'Use Niacinamide 10% + Zinc in T-zone and blot excess oil before applying SPF.' }
    };

    var SLOT_OPTIONS = ${JSON.stringify(VANITY_SLOT_OPTIONS)};
    var PROD_INFO = ${JSON.stringify(PROD_INFO_MAP)};
    function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;'); }
    window.__dlShowProdInfo = function(el, prodId, ev) {
      var isClick = ev && (ev.type === 'click' || ev.type === 'pointerdown');
      if (ev && ev.stopPropagation && el && el.classList && el.classList.contains('dl-info-i')) { ev.stopPropagation(); ev.preventDefault(); }
      if (isClick) window.__dlInfoPinnedUntil = Date.now() + 2600;
      var tip = document.getElementById('dl-prod-info-tip');
      var info = PROD_INFO[prodId];
      if (!tip || !info || !info.desc) return;
      tip.innerHTML = '<div class="mono" style="font-size:0.67rem;color:#8A3448;font-weight:700;margin-bottom:3px;">' + esc(info.cat || info.brand || 'Formula') + (info.ph ? ' &middot; pH ' + esc(info.ph) : '') + (info.price ? ' &middot; $' + esc(info.price) : '') + '</div><div style="color:#3A1F27;">' + esc(info.desc) + '</div>';
      tip.style.display = 'block';
      var r = (el && el.getBoundingClientRect) ? el.getBoundingClientRect() : { left: 20, top: 80, bottom: 100, width: 40 };
      var tw = Math.min(262, window.innerWidth - 20);
      var left = Math.max(10, Math.min(window.innerWidth - tw - 10, r.left + (r.width / 2) - (tw / 2)));
      var top = (r.top > 110) ? (r.top - tip.offsetHeight - 8) : (r.bottom + 8);
      tip.style.left = Math.round(left) + 'px';
      tip.style.top = Math.round(Math.max(8, top)) + 'px';
    };
    window.__dlHideProdInfo = function(force) {
      if (force !== true && window.__dlInfoPinnedUntil && Date.now() < window.__dlInfoPinnedUntil) return;
      var tip = document.getElementById('dl-prod-info-tip'); if (tip) tip.style.display = 'none';
    };
    document.addEventListener('scroll', function() { window.__dlHideProdInfo(true); }, { passive: true, capture: true });

    function renderMiniVesselSvg(vesselType, tagText, hasClash, isEmpty) {
      var stroke = isEmpty ? '#8E6B75' : (hasClash ? '#8A3448' : '#3A1F27');
      var fill = isEmpty ? '#F4ECE3' : (hasClash ? '#F6E3E7' : '#F8EFE6');
      var accent = hasClash || isEmpty ? '#8A3448' : '#285B44';
      var safeTag = esc(String(tagText || '').slice(0, 6));
      if (vesselType === 'mist') {
        return '<svg width="34" height="42" viewBox="0 0 38 46" fill="none" aria-hidden="true"><rect x="13" y="3" width="12" height="6" rx="1" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.2"/><path d="M9 9H29L31 14V40C31 41.1 30.1 42 29 42H9C7.9 42 7 41.1 7 40V14L9 9Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="9.5" y="19" width="19" height="14" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="0.8"/><text x="19" y="28" text-anchor="middle" font-size="5.3" font-family="monospace" font-weight="700" fill="' + stroke + '">' + safeTag + '</text></svg>';
      }
      if (vesselType === 'jar') {
        return '<svg width="36" height="42" viewBox="0 0 40 46" fill="none" aria-hidden="true"><rect x="7" y="12" width="26" height="6" rx="1.5" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.2"/><rect x="5" y="18" width="30" height="22" rx="3" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="8" y="23" width="24" height="11" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="0.8"/><text x="20" y="30.5" text-anchor="middle" font-size="5.4" font-family="monospace" font-weight="700" fill="' + stroke + '">' + safeTag + '</text></svg>';
      }
      if (vesselType === 'tube') {
        return '<svg width="34" height="42" viewBox="0 0 38 46" fill="none" aria-hidden="true"><path d="M7 6H31L27 33H11L7 6Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="14" y="33" width="10" height="7" rx="1" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.2"/><text x="19" y="21.5" text-anchor="middle" font-size="5.2" font-family="monospace" font-weight="700" fill="' + accent + '">' + safeTag + '</text></svg>';
      }
      return '<svg width="34" height="42" viewBox="0 0 38 46" fill="none" aria-hidden="true"><path d="M15.5 7C15.5 5 17 3.5 19 3.5C21 3.5 22.5 5 22.5 7V10H15.5V7Z" fill="#D9BDC2" stroke="' + stroke + '" stroke-width="1.2"/><rect x="13" y="10" width="12" height="3.5" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.1"/><path d="M9 13.5H29L31 18.5V40C31 41.1 30.1 42 29 42H9C7.9 42 7 41.1 7 40V18.5L9 13.5Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="9.5" y="21" width="19" height="14" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="0.8"/><text x="19" y="30" text-anchor="middle" font-size="5.3" font-family="monospace" font-weight="700" fill="' + stroke + '">' + safeTag + '</text></svg>';
    }

    function loadVanityState() {
      try {
        var raw = localStorage.getItem(VANITY_STORAGE_KEY) || localStorage.getItem('dermlogic_vanity_bag_v1');
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object' && Array.isArray(parsed.slotSelections)) {
            parsed.slotSelections = [0, 1, 2, 3, 4].map(function(i) { var v = parsed.slotSelections[i]; return (typeof v === 'number' && v >= -1 && v < 20) ? v : 0; });
            parsed.activeSlotIdx = (typeof parsed.activeSlotIdx === 'number' && parsed.activeSlotIdx >= 0 && parsed.activeSlotIdx < 5) ? parsed.activeSlotIdx : 3;
            parsed.customSlotBottle = (parsed.customSlotBottle && Object.prototype.toString.call(parsed.customSlotBottle) === '[object Object]') ? parsed.customSlotBottle : {};
            if (!parsed.dossierTab) parsed.dossierTab = 'slots';
            if (!parsed.passSide) parsed.passSide = 'am';
            return parsed;
          }
        }
      } catch (_) {}
      var now = Date.now();
      return { bagId: 'DL-' + String(1000 + (now % 8999)), holdExpiresAt: now + 86400000, undertone: 'neutral_ivory', finish: 'velvet_satin', activeSlotIdx: 3, dossierTab: 'slots', passSide: 'am', slotSelections: [0, 0, 0, 0, 0], customSlotBottle: {}, customName: '', pouchSpfSealed: false };
    }

    function saveVanityState(st) {
      try {
        localStorage.setItem(VANITY_STORAGE_KEY, JSON.stringify(st));
        localStorage.setItem('dermlogic_vanity_bag_v1', JSON.stringify(st));
      } catch (_) {}
    }

    window.__dlVanityState = loadVanityState();

    function makeCustomSlot(prodId, prodTitle, prodPrice) {
      var pInfo = PROD_INFO[prodId] || {};
      var baseName = pInfo.name || String(prodTitle || prodId).replace(/\([^)]*\)/g, '').replace(/[()]/g, '').trim();
      var shortNm = baseName.replace(/^(The Ordinary|La Roche-Posay|Paula's Choice|Beauty of Joseon|SkinCeuticals|Biologique Recherche|Good Molecules|Sunday Riley|Dr\. Dennis Gross|Drunk Elephant|First Aid Beauty|Summer Fridays|Round Lab|Skin1004|Rohto Mentholatum|Peter Thomas Roth|Stratia|CeraVe|Vanicream|Eucerin|Prequel|Medik8|Aestura|Anua|COSRX|Dieux|Topicals|Byoma|Naturium|Caudalie|Haruharu|Isntree|Purito|EltaMD|Supergoop!|PanOxyl|Bioderma|Geek & Gorgeous|Timeless|Maelove|Differin|Galderma|Finacea|Leo Pharma|Rx Generic|Sofie Pavitt|Rhode|Laneige|Tatcha|Ilia|iUNIK|Aveeno|Nivea)\s+/i, '').replace(/[()]/g, '').trim().slice(0, 11).trim() || baseName.slice(0, 11);
      var pr = prodPrice || pInfo.price;
      return { id: prodId, label: baseName + (pr ? ' ($' + pr + ')' : ''), short: shortNm, ph: String(pInfo.ph || '5.5'), tag: 'pH' + (pInfo.ph || '5.5') };
    }

    function getBottleForSlot(st, slotIdx) {
      var sel = st.slotSelections[slotIdx];
      if (sel === -1 || sel === null || typeof sel === 'undefined') return null;
      var slot = SLOT_OPTIONS[slotIdx];
      if (st.customSlotBottle && st.customSlotBottle[slotIdx]) {
        var cb = st.customSlotBottle[slotIdx];
        if (!cb.short || /[()]/.test(cb.short)) return makeCustomSlot(cb.id, cb.label, '');
        return cb;
      }
      return slot.choices[sel] || slot.choices[0];
    }

    // Chemistry Clash Engine inside the Vanity Bag
    function computeBagClashes(st) {
      var clashes = [];
      var b0 = getBottleForSlot(st, 0);
      var b1 = getBottleForSlot(st, 1);
      var b2 = getBottleForSlot(st, 2);
      var b4 = getBottleForSlot(st, 4);

      // Clash 1: Hypochlorous Mist (Slot 01) + Vitamin C / Antioxidant or Copper Peptide (Slot 02) without dry-down or BPO + Vitamin C
      if (b0 && b1 && b0.id === 'panoxyl-10-bpo-wash' && (b1.id === 'skinceuticals-ce-ferulic' || b1.id === 'rohto-melano-cc')) {
        clashes.push({ slots: [0, 1], severity: 'CRITICAL', title: 'Benzoyl Peroxide (Slot 01) Oxidizes Vitamin C (Slot 02)', detail: 'Residual Benzoyl Peroxide oxidizes L-Ascorbic Acid on contact before it can enter the skin.', fixLabel: 'Swap Slot 01 to Anua Heartleaf 77% Soothing Toner', fixFn: function() { st.slotSelections[0] = 1; delete st.customSlotBottle[0]; } });
      }
      // Clash 2: Glycolic Acid 7% in AM Prep (Slot 01) + Pure Vitamin C or Copper Peptides in AM Active (Slot 02)
      if (b0 && b1 && b0.id === 'to-glycolic-acid-7' && (b1.id === 'skinceuticals-ce-ferulic' || b1.id === 'to-buffet-copper-peptides')) {
        clashes.push({ slots: [0, 1], severity: 'CRITICAL', title: b1.id === 'to-buffet-copper-peptides' ? 'Glycolic Acid 7% (pH 3.6) Hydrolyzes Copper Peptides (Slot 02)' : 'Double Low-pH Acid Stack: Glycolic 7% + 15% Vitamin C', detail: b1.id === 'to-buffet-copper-peptides' ? 'Direct AHA acid breaks the fragile GHK-Cu copper tripeptide bond and triggers redness.' : 'Stacking pH 3.6 Glycolic Acid under pH 3.2 L-Ascorbic Acid in the morning strips the stratum corneum.', fixLabel: 'Swap Slot 01 to Tower 28 SOS Mist', fixFn: function() { st.slotSelections[0] = 0; delete st.customSlotBottle[0]; } });
      }
      // Clash 3: Vitamin C in Slot 02 + Copper Peptides in Slot 05 if layered without AM/PM separation or if Copper is in Slot 02 + Acid in Slot 05
      if (b1 && b4 && b1.id === 'to-buffet-copper-peptides' && (b4.id === 'paulas-choice-2-bha' || b4.id === 'biologique-recherche-p50-1970' || b4.id === 'rx-tretinoin-005')) {
        clashes.push({ slots: [1, 4], severity: 'MODERATE', title: 'High-Active Turnover Load: Copper Peptides + Strong PM Acid/Retinoid', detail: 'Keep Copper Peptides strictly separated from exfoliating acids and buffer your evening retinoid with Slot 03 Ceramide Cream.', fixLabel: 'Set Slot 03 to Aestura 365 Ceramide Buffer', fixFn: function() { st.slotSelections[2] = 0; delete st.customSlotBottle[2]; st.slotSelections[1] = 2; delete st.customSlotBottle[1]; } });
      }
      // Clash 4: Unbuffered Rx Tretinoin or Lotion P50 when Slot 03 Barrier Seal is empty
      if (b4 && !b2 && (b4.id === 'rx-tretinoin-005' || b4.id === 'biologique-recherche-p50-1970')) {
        clashes.push({ slots: [2, 4], severity: 'CRITICAL', title: 'Missing Slot 03 Barrier Cushion for ' + b4.short, detail: 'Applying ' + b4.short + ' without a 3:1:1 Ceramide or Panthenol barrier seal in Slot 03 causes flaking around the mouth and nose.', fixLabel: 'Restore Aestura 365 Ceramide Cream to Slot 03', fixFn: function() { st.slotSelections[2] = 0; delete st.customSlotBottle[2]; } });
      }
      return clashes;
    }

    function mapProductIdToSlot(prodId, prodName, prodCat) {
      for (var sIdx = 0; sIdx < SLOT_OPTIONS.length; sIdx++) {
        var foundIdx = SLOT_OPTIONS[sIdx].choices.findIndex(function(c) { return c.id === prodId; });
        if (foundIdx !== -1) return { slotIdx: sIdx, choiceIdx: foundIdx };
      }
      var pInfo = PROD_INFO[prodId] || {};
      var hay = ((prodId || '') + ' ' + (prodName || pInfo.name || '') + ' ' + (prodCat || pInfo.cat || '')).toLowerCase();
      if (/spf|sun|uv/.test(hay)) return { slotIdx: 3, choiceIdx: -2 };
      if (/tretinoin|retinal|retinol|adapalene|differin|bha|p50|babyfacial|peel|glycolic-acid-10|lactic-acid|mandelic-acid|salicylic-acid/.test(hay) && !/wash|cleanse|toner/.test(hay)) return { slotIdx: 4, choiceIdx: -2 };
      if (/wash|cleanse|micellar|mist|spray|toner|glycolic|essence-toner/.test(hay)) return { slotIdx: 0, choiceIdx: -2 };
      if (/cream|moistur|baume|angel|atobarrier|lotion|snail|urea|lipid|balm|milk|barrier/.test(hay)) return { slotIdx: 2, choiceIdx: -2 };
      return { slotIdx: 1, choiceIdx: -2 };
    }

    function showVanityToast(msg) {
      var t = document.getElementById('dl-vanity-toast');
      var txt = document.getElementById('dl-vanity-toast-text');
      if (!t || !txt) return;
      txt.textContent = msg;
      t.style.display = 'inline-flex';
      if (window.__dlToastTimer) clearTimeout(window.__dlToastTimer);
      window.__dlToastTimer = setTimeout(function() { t.style.display = 'none'; }, 4200);
    }

    window.__dlToggleBottleInBag = function(prodId, prodTitle, prodPrice, btnEl) {
      var st = window.__dlVanityState;
      if (!st.customSlotBottle) st.customSlotBottle = {};
      var mapped = mapProductIdToSlot(prodId, prodTitle, '');
      var sIdx = mapped.slotIdx;
      var cur = getBottleForSlot(st, sIdx);
      if (cur && cur.id === prodId) {
        // Remove from bag
        st.slotSelections[sIdx] = -1;
        delete st.customSlotBottle[sIdx];
        saveVanityState(st);
        window.__dlRenderVanityDrawer();
        window.__dlRefreshPageAddButtons();
        showVanityToast('Removed from Slot 0' + (sIdx + 1) + ' in your Vanity Bag');
        return;
      }
      if (mapped.choiceIdx >= 0) {
        st.slotSelections[sIdx] = mapped.choiceIdx;
        delete st.customSlotBottle[sIdx];
      } else {
        st.slotSelections[sIdx] = 0;
        st.customSlotBottle[sIdx] = makeCustomSlot(prodId, prodTitle, prodPrice);
      }
      st.activeSlotIdx = sIdx;
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
      if (window.__ebLogEvent) window.__ebLogEvent('vanity_bag_add', { product: prodId, slot: sIdx + 1 });
      showVanityToast('Added to Slot 0' + (sIdx + 1) + ' (' + SLOT_OPTIONS[sIdx].shortSlot + ')');
    };

    window.__dlRemoveSlotBottle = function(slotIdx) {
      var st = window.__dlVanityState;
      st.slotSelections[slotIdx] = -1;
      if (st.customSlotBottle) delete st.customSlotBottle[slotIdx];
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
    };

    window.__dlInjectSampleClash = function() {
      var st = window.__dlVanityState;
      st.slotSelections[0] = 3; // Glycolic Acid 7% (pH 3.6) in AM Prep
      st.slotSelections[1] = 4; // Copper Peptides 1% in AM Active -> Direct pH/hydrolysis clash!
      if (st.customSlotBottle) { delete st.customSlotBottle[0]; delete st.customSlotBottle[1]; }
      st.dossierTab = 'clashes';
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
    };

    window.__dlAutoFixBagClashes = function() {
      var st = window.__dlVanityState;
      var clashes = computeBagClashes(st);
      clashes.forEach(function(c) { if (c.fixFn) c.fixFn(); });
      st.dossierTab = 'slots';
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
    };

    window.__dlSetDossierTab = function(tabName) {
      window.__dlVanityState.dossierTab = tabName || 'slots';
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
      if (window.__ebLogEvent) window.__ebLogEvent('vanity_tab_switch', { tab: tabName || 'slots' });
    };

    window.__dlFlipPassSide = function(side) {
      window.__dlVanityState.passSide = side === 'pm' ? 'pm' : 'am';
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
      if (window.__ebLogEvent) window.__ebLogEvent('vanity_pass_flip', { side: side || 'am' });
    };

    function formatHoldRemaining(expiresAt) {
      var diffMs = Math.max(60000, (expiresAt || (Date.now() + 86400000)) - Date.now());
      var hrs = Math.floor(diffMs / 3600000);
      var mins = Math.floor((diffMs % 3600000) / 60000);
      return 'Reserved for ' + hrs + 'h ' + mins + 'm';
    }

    window.__dlTapPouchSpfSlot = function() {
      var st = window.__dlVanityState;
      var curSpf = getBottleForSlot(st, 3);
      if (st.pouchSpfSealed && curSpf) {
        if (window.__dlSelectVanitySlot) window.__dlSelectVanitySlot(3);
        if (window.__dlOpenVanityDrawer) window.__dlOpenVanityDrawer('pouch_slot_3');
        return;
      }
      var spfCb = document.querySelector('input[name="routineProduct"][value="boj-relief-sun-spf50"]') || document.querySelector('input[name="routineProduct"][value="eltamd-uv-clear-spf46"]');
      if (spfCb && !spfCb.checked) {
        spfCb.checked = true;
        if (typeof toggleProductChip === 'function') toggleProductChip(spfCb);
      }
      st.pouchSpfSealed = true;
      if (st.slotSelections[3] === -1 || typeof st.slotSelections[3] !== 'number') st.slotSelections[3] = 0;
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
      showVanityToast('Sealed your 5-Slot Soft Pinch Vanity Pouch with ' + (getBottleForSlot(st, 3) ? getBottleForSlot(st, 3).short : 'Relief Sun SPF 50+') + '!');
    };

    function syncSelectorVanityCaddy(st) {
      var checkedEls = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked'));
      var checkedIds = checkedEls.map(function(el) { return el.value; });
      var spfCheckedOnShelf = checkedIds.some(function(id) { return /spf|sun|uv/i.test(id); });
      var nonSpfChecked = checkedIds.filter(function(id) { return !/spf|sun|uv/i.test(id); });
      var cardMap = [
        { cardId: 'dl-pouch-card-0', nameId: 'dl-pouch-slot-name-0', subId: 'dl-pouch-slot-sub-0', slotIdx: 0, shelfIdx: 0, emptyName: 'Add Mist', emptySub: 'Step 01' },
        { cardId: 'dl-pouch-card-1', nameId: 'dl-pouch-slot-name-1', subId: 'dl-pouch-slot-sub-1', slotIdx: 1, shelfIdx: 1, emptyName: 'Add Serum', emptySub: 'Step 02' },
        { cardId: 'dl-pouch-card-2', nameId: 'dl-pouch-slot-name-2', subId: 'dl-pouch-slot-sub-2', slotIdx: 2, shelfIdx: 2, emptyName: 'Add Cream', emptySub: 'Step 03' },
        { cardId: 'dl-pouch-card-3', nameId: 'dl-pouch-slot-name-3', subId: 'dl-pouch-slot-sub-3', slotIdx: 4, shelfIdx: 3, emptyName: 'Add Night', emptySub: 'Step 04' },
        { cardId: 'dl-empty-bottle-slot', nameId: 'dl-pouch-slot-name-4', subId: 'dl-pouch-slot-sub-4', slotIdx: 3, shelfIdx: -1, emptyName: 'Add SPF 50', emptySub: 'Final Step', isSpf: true }
      ];
      var pouchFilled = 0;
      cardMap.forEach(function(m) {
        var b = getBottleForSlot(st, m.slotIdx);
        if (!m.isSpf && nonSpfChecked.length > 0 && m.shelfIdx >= 0) {
          var sId = nonSpfChecked[m.shelfIdx];
          if (sId && PROD_INFO[sId]) {
            var pInfo = PROD_INFO[sId];
            b = { id: sId, short: (pInfo.name || sId).split(' ').slice(0, 2).join(' ').slice(0, 14) };
          } else if (m.shelfIdx >= nonSpfChecked.length) {
            b = null;
          }
        }
        var isFilled = m.isSpf ? Boolean(b && (st.pouchSpfSealed || spfCheckedOnShelf)) : Boolean(b);
        if (isFilled) pouchFilled++;
        var cardEl = document.getElementById(m.cardId);
        var nmEl = document.getElementById(m.nameId);
        var sbEl = document.getElementById(m.subId);
        if (cardEl) {
          cardEl.style.background = isFilled ? 'var(--bg-pouch-card, var(--bg-surface))' : 'var(--bg-empty-slot)';
          cardEl.style.position = 'relative';
          cardEl.onmouseenter = (isFilled && b) ? function(ev) { window.__dlShowProdInfo(cardEl, b.id, ev); } : null;
          cardEl.onmouseleave = window.__dlHideProdInfo;
          var oldI = cardEl.querySelector('.dl-pouch-i');
          if (oldI) oldI.remove();
          if (isFilled && b) {
            var pi = document.createElement('span'); pi.className = 'dl-info-i dl-pouch-i'; pi.style.cssText = 'position:absolute;top:5px;right:5px;margin:0;width:13px;height:13px;font-size:0.6rem;'; pi.textContent = 'i';
            pi.onpointerdown = pi.onclick = function(ev) { window.__dlShowProdInfo(pi, b.id, ev); };
            cardEl.appendChild(pi);
          }
        }
        if (nmEl) { nmEl.textContent = isFilled && b ? b.short : m.emptyName; nmEl.style.color = isFilled ? 'var(--text-pouch-card, var(--text-primary))' : 'var(--rose-brand)'; }
        if (sbEl) { sbEl.textContent = isFilled ? 'In Pouch' : m.emptySub; sbEl.style.color = isFilled ? 'var(--sub-pouch-card, var(--sage-safe))' : 'var(--text-secondary)'; }
      });
      var stLbl = document.getElementById('dl-pouch-status-label');
      var pctTxt = document.getElementById('dl-pouch-pct-text');
      var prog = document.getElementById('dl-pouch-progress-fill');
      if (stLbl) stLbl.textContent = pouchFilled + ' of 5 Comfort Steps Zip-Ready';
      if (pctTxt) pctTxt.textContent = pouchFilled === 5 ? 'Full · 100%' : (pouchFilled === 4 ? 'Almost Full · 80%' : (pouchFilled * 20) + '% Ready');
      if (prog) prog.style.width = (pouchFilled * 20) + '%';
      return pouchFilled;
    }

    window.__dlRenderVanityDrawer = function() {
      var st = window.__dlVanityState;
      var uMeta = UNDERTONE_META[st.undertone] || UNDERTONE_META.neutral_ivory;
      var fMeta = FINISH_META[st.finish] || FINISH_META.velvet_satin;
      var clashes = computeBagClashes(st);
      var pouchCount = syncSelectorVanityCaddy(st);
      var hasCaddy = Boolean(document.getElementById('dl-selector-vanity-caddy'));
      var filledCount = hasCaddy ? pouchCount : [0, 1, 2, 3, 4].filter(function(i) { return Boolean(getBottleForSlot(st, i)); }).length;

      var countEl = document.getElementById('dl-header-vanity-count');
      if (countEl) countEl.textContent = filledCount === 5 ? '5 of 5 Full' : (filledCount + ' of 5');
      var dockCountEl = document.getElementById('dl-dock-vanity-count');
      if (dockCountEl) dockCountEl.textContent = filledCount === 5 ? '5 / 5 Full' : (filledCount + ' / 5');
      var dockHarmEl = document.getElementById('dl-dock-vanity-harmony');
      if (dockHarmEl) dockHarmEl.textContent = clashes.length > 0 ? (clashes.length + ' Clash') : 'Harmonized';
      ['dl-dock-vanity-bars', 'dl-header-vanity-bars'].forEach(function(bId) {
        var bEl = document.getElementById(bId);
        if (bEl) bEl.innerHTML = [0, 1, 2, 3, 4].map(function(i) { var hasB = Boolean(getBottleForSlot(st, i)); var w = bId.indexOf('dock') !== -1 ? 'width:6px;height:3px;' : 'width:5px;height:2.5px;'; return '<span style="' + w + 'border-radius:99px;background:' + (hasB ? (i === 0 ? '#10B981' : '#8A3448') : 'rgba(138,52,72,0.22)') + ';"></span>'; }).join('');
      });

      var headerClashEl = document.getElementById('dl-header-vanity-clash-dot');
      if (headerClashEl) {
        headerClashEl.textContent = clashes.length > 0 ? (clashes.length + (clashes.length === 1 ? ' Clash' : ' Clashes')) : '0 Clashes';
        headerClashEl.style.background = clashes.length > 0 ? 'var(--berry-bg)' : 'var(--sage-bg)';
        headerClashEl.style.color = clashes.length > 0 ? 'var(--berry-clash)' : 'var(--sage-safe)';
      }

      var harmonyPill = document.getElementById('dl-vanity-harmony-pill');
      if (harmonyPill) {
        if (clashes.length > 0) {
          harmonyPill.className = 'badge-clash mono';
          harmonyPill.textContent = clashes.length + ' Bag ' + (clashes.length === 1 ? 'Clash' : 'Clashes') + ' · Tap to Fix';
        } else {
          harmonyPill.className = 'badge-safe mono';
          harmonyPill.textContent = '96% Harmony · 0 Clashes';
        }
      }

      var clashBanner = document.getElementById('dl-vanity-clash-banner');
      var clashBannerTxt = document.getElementById('dl-vanity-clash-banner-text');
      if (clashBanner && clashBannerTxt) {
        if (clashes.length > 0) {
          clashBanner.style.display = 'flex';
          clashBannerTxt.innerHTML = '<strong style="color:var(--berry-clash);">Bag Conflict Detected:</strong> ' + esc(clashes[0].title);
        } else {
          clashBanner.style.display = 'none';
        }
      }

      var tab02Kicker = document.getElementById('dl-tab02-kicker');
      var tab02Sub = document.getElementById('dl-tab02-sub');
      if (tab02Kicker && tab02Sub) {
        tab02Kicker.style.color = clashes.length > 0 ? 'var(--berry-clash)' : 'var(--text-muted)';
        tab02Sub.style.color = clashes.length > 0 ? 'var(--berry-clash)' : 'var(--sage-safe)';
        tab02Sub.textContent = clashes.length > 0 ? (clashes.length + ' Active ' + (clashes.length === 1 ? 'Clash' : 'Clashes')) : '0 Clashes Found';
      }

      var idEl = document.getElementById('dl-vanity-bag-id');
      if (idEl) idEl.textContent = '#' + (st.bagId || 'DL-4829');

      var titleEl = document.getElementById('dl-vanity-bag-title');
      if (titleEl) {
        var firstWord = st.customName ? st.customName.replace(/['’]s.*$/i, '').replace(/\s+(?:Evening|Morning|Protocol|Routine|Ritual|Shelf).*$/i, '').trim() : '';
        titleEl.textContent = firstWord
          ? (firstWord + "'s 5-Slot Atelier Vanity Bag")
          : 'Your 5-Slot Calibrated Vanity Bag';
      }

      var holdEl = document.getElementById('dl-vanity-hold-countdown');
      if (holdEl) holdEl.textContent = formatHoldRemaining(st.holdExpiresAt);

      var uLabel = document.getElementById('dl-undertone-active-label');
      if (uLabel) uLabel.textContent = uMeta.label + ' · ' + fMeta.label;

      var bagTotalUsd = 0;
      for (var bi = 0; bi < 5; bi++) {
        var bSlot = getBottleForSlot(st, bi);
        if (!bSlot) continue;
        var mPr = bSlot.label ? bSlot.label.match(/\$(\d+)/) : null;
        if (!mPr && bSlot.id) {
          var chkEl = document.querySelector('input[name="routineProduct"][value="' + bSlot.id + '"]');
          var cardNode = chkEl ? chkEl.closest('.prod-check-item') : null;
          if (cardNode) mPr = (cardNode.textContent || '').match(/\$(\d+)/);
        }
        bagTotalUsd += mPr ? Number(mPr[1]) : 19;
      }
      var trayLabel = document.getElementById('dl-tray-filled-label');
      if (trayLabel) trayLabel.textContent = filledCount + '/5 Vessels · $' + bagTotalUsd + ' Total · ' + (clashes.length > 0 ? (clashes.length + ' Clash') : (bagTotalUsd <= 110 ? 'Dupe Shelf' : 'pH Safe'));
      var keep99Btn = document.getElementById('dl-vanity-keep-99c');
      var keep199Btn = document.getElementById('dl-vanity-keep-199');
      if (keep99Btn && !window.__ebIsUnlocked) keep99Btn.innerHTML = '<span>' + (bagTotalUsd <= 110 ? ('Save $' + bagTotalUsd + ' Dupe Card (99&cent;) &rarr;') : 'Save 9:16 Phone Card (99&cent;) &rarr;') + '</span>';
      if (keep199Btn && !window.__ebIsUnlocked) keep199Btn.innerHTML = '<span>' + (bagTotalUsd >= 180 ? '28-Day Atelier Vault ($1.99 / $4.99)' : 'Complete 3-File Kit ($1.99)') + '</span>';

      document.querySelectorAll('#dl-undertone-swatches button[data-undertone]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-undertone') === st.undertone);
      });
      document.querySelectorAll('#dl-finish-swatches button[data-finish]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-finish') === st.finish);
      });

      var activeIdx = (typeof st.activeSlotIdx === 'number' && st.activeSlotIdx >= 0 && st.activeSlotIdx < 5) ? st.activeSlotIdx : 3;
      var uParentBox = document.getElementById('dl-undertone-parent-box');
      if (uParentBox) uParentBox.style.display = (activeIdx === 3) ? 'flex' : 'none';
      var calBox = document.getElementById('dl-slot-calibrator-box');
      var calCfg = SLOT_CALIBRATORS[activeIdx];
      var activeCalNote = '';
      if (calBox) {
        if (activeIdx !== 3 && calCfg) {
          calBox.style.display = 'flex';
          var r1Val = st[calCfg.row1Key] || calCfg.row1[0].id;
          var r2Val = st[calCfg.row2Key] || calCfg.row2[0].id;
          var r1Obj = calCfg.row1.find(function(x) { return x.id === r1Val; }) || calCfg.row1[0];
          var r2Obj = calCfg.row2.find(function(x) { return x.id === r2Val; }) || calCfg.row2[0];
          activeCalNote = r2Obj.subNote;
          calBox.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><span class="mono" style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);">' + esc(calCfg.title) + ':</span><span id="dl-slot-calibrator-active-label" class="mono" style="font-size:0.74rem;color:var(--sage-safe);font-weight:600;">' + esc(r1Obj.label) + ' &middot; ' + esc(r2Obj.label) + '</span></div>'
            + '<div role="group" aria-label="' + esc(calCfg.row1Label) + '" style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;">' + calCfg.row1.map(function(opt) { return '<button type="button" class="dl-vanity-swatch-btn mono' + (opt.id === r1Obj.id ? ' active' : '') + '" data-cal-row1="' + esc(opt.id) + '" onclick="window.__dlSetSlotCalibrator(' + activeIdx + ',1,\\'' + esc(opt.id) + '\\')">' + esc(opt.label) + '</button>'; }).join('') + '</div>'
            + '<div role="group" aria-label="' + esc(calCfg.row2Label) + '" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;">' + calCfg.row2.map(function(opt) { return '<button type="button" class="dl-vanity-swatch-btn mono' + (opt.id === r2Obj.id ? ' active' : '') + '" data-cal-row2="' + esc(opt.id) + '" onclick="window.__dlSetSlotCalibrator(' + activeIdx + ',2,\\'' + esc(opt.id) + '\\')">' + esc(opt.label) + '</button>'; }).join('') + '</div>';
        } else {
          calBox.style.display = 'none';
        }
      }

      // Render Option 3 Visual Bottle Tray
      var trayEl = document.getElementById('dl-vanity-visual-tray');
      if (trayEl) {
        trayEl.innerHTML = SLOT_OPTIONS.map(function(slot, idx) {
          var b = getBottleForSlot(st, idx);
          var hasClash = Boolean(b) && clashes.some(function(c) { return c.slots.indexOf(idx) !== -1; });
          var isSel = idx === activeIdx && (st.dossierTab || 'slots') === 'slots';
          var cls = 'dl-tray-vessel-btn' + (isSel ? ' active' : '') + (hasClash ? ' has-clash' : '') + (!b ? ' is-empty' : '');
          var svg = renderMiniVesselSvg(slot.vesselType, b ? b.tag : '+ADD', hasClash, !b);
          var hoverAttr = b ? (' onmouseenter="window.__dlShowProdInfo(this,\\'' + esc(b.id) + '\\',event)" onmouseleave="window.__dlHideProdInfo()"') : '';
          var lblStyle = b ? 'font-size:0.66rem;font-weight:600;color:var(--text-primary);' : 'font-size:0.65rem;font-weight:600;font-style:italic;color:var(--text-empty-slot,#7D5660);';
          return '<button type="button" id="dl-vanity-slot-header-' + idx + '" class="' + cls + '" onclick="window.__dlSetDossierTab(\\'slots\\');window.__dlSelectVanitySlot(' + idx + ')"' + hoverAttr + ' title="' + esc(slot.slotNum + ': ' + (b ? b.label : 'Empty Slot')) + '"><span class="mono" style="font-size:0.62rem;font-weight:700;color:' + (!b ? 'var(--text-empty-slot,#7D5660)' : (hasClash ? 'var(--berry-clash)' : 'var(--rose-brand)')) + ';">' + esc(slot.shortSlot) + '</span>' + svg + '<span style="' + lblStyle + 'max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + esc(b ? b.short : 'Empty · Tap') + '</span></button>';
        }).join('');
      }

      // Update 4-Tab Dossier buttons & panels
      var curTab = st.dossierTab || 'slots';
      ['slots', 'clashes', 'cycle', 'pass'].forEach(function(tName) {
        var btn = document.getElementById('dl-dossier-tab-' + tName);
        var pnl = document.getElementById('dl-dossier-panel-' + tName);
        if (btn) btn.classList.toggle('active', tName === curTab);
        if (pnl) pnl.style.display = (tName === curTab) ? 'flex' : 'none';
      });

      // Render Tab 01: Single-Bottle Spotlight Card (Only the 1 selected bottle is shown!)
      var listEl = document.getElementById('dl-vanity-slots-list');
      if (listEl) {
        listEl.innerHTML = SLOT_OPTIONS.map(function(slot, idx) {
          var isOpen = idx === activeIdx;
          var currentBottle = getBottleForSlot(st, idx);
          var slotHasClash = clashes.find(function(c) { return c.slots.indexOf(idx) !== -1; });
          var bDesc = (currentBottle && (currentBottle.desc || (PROD_INFO[currentBottle.id] && PROD_INFO[currentBottle.id].desc))) || '';
          var ruleSuffix = idx === 3 ? (uMeta.spfNote + ' ' + fMeta.prepRule) : (isOpen && activeCalNote ? activeCalNote : ('When to apply: ' + slot.timing + '.'));
          var extraNote = slotHasClash
            ? ('<strong style="color:var(--berry-clash);">Clash Alert:</strong> ' + esc(slotHasClash.detail) + (bDesc ? ' <span style="display:block;margin-top:3px;">' + esc(bDesc) + '</span>' : ''))
            : esc((bDesc ? (bDesc + ' ') : '') + ruleSuffix);

          var chipsHtml = slot.choices.map(function(ch, cIdx) {
            var isSel = currentBottle && currentBottle.id === ch.id;
            var chipText = String(ch.label || '').replace(/\s*·\s*pH[^)]*/gi, '');
            return '<button type="button" class="mono" onclick="window.__dlPickSlotBottle(' + idx + ',' + cIdx + ')" onmouseenter="window.__dlShowProdInfo(this,\\'' + esc(ch.id) + '\\',event)" onmouseleave="window.__dlHideProdInfo()" style="display:inline-flex;align-items:center;padding:5px 10px;border-radius:999px;font-size:0.74rem;cursor:pointer;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;border:none;background:' + (isSel ? 'var(--rose-pill-bg)' : 'var(--bg-oat)') + ';color:' + (isSel ? 'var(--rose-brand)' : 'var(--text-secondary)') + ';font-weight:' + (isSel ? '600' : '400') + ';"><span>' + (isSel ? '✓ ' : '+ ') + esc(chipText) + '</span><span class="dl-info-i" onpointerdown="window.__dlShowProdInfo(this,\\'' + esc(ch.id) + '\\',event)" onclick="window.__dlShowProdInfo(this,\\'' + esc(ch.id) + '\\',event)">i</span></button>';
          }).join('');

          var prevIdx = (idx + 4) % 5;
          var nextIdx = (idx + 1) % 5;
          var bPriceMatch = currentBottle && currentBottle.label ? currentBottle.label.match(/\$(\d+)/) : null;
          var bPriceNum = bPriceMatch ? Number(bPriceMatch[1]) : 32;
          var restockPartner = bPriceNum <= 26 ? 'amazon' : 'dermstore';
          var restockLabel = bPriceNum <= 26 ? ('Shop $' + bPriceNum + ' Dupe (Amazon/Ulta) ↗') : ('Authorized Restock ($' + bPriceNum + ') ↗');
          var nextBtnHtml = idx < 4
            ? '<button type="button" class="mono" onclick="window.__dlSelectVanitySlot(' + nextIdx + ')" style="padding:5px 11px;border-radius:999px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.74rem;font-weight:600;cursor:pointer;white-space:nowrap;">Next Bottle (0' + (nextIdx + 1) + ') &rarr;</button>'
            : '<button type="button" class="mono" onclick="window.__dlSetDossierTab(\\'pass\\')" style="padding:5px 11px;border-radius:999px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.74rem;font-weight:600;cursor:pointer;white-space:nowrap;">Preview 9:16 Card &rarr;</button>';

          return '<div class="dl-vanity-slot-card ' + (isOpen ? 'active ' : '') + (slotHasClash ? 'clash-slot' : '') + '" id="dl-vanity-slot-card-' + idx + '" style="display:' + (isOpen ? 'block' : 'none') + ';padding:14px 16px;">'
            + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;"><div style="min-width:0;"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><span class="mono" style="font-size:0.72rem;font-weight:700;color:' + (slotHasClash ? 'var(--berry-clash)' : 'var(--rose-brand)') + ';">SPOTLIGHT &middot; ' + esc(slot.slotNum) + (slotHasClash ? ' &middot; CLASH' : '') + '</span><span style="font-size:0.76rem;color:var(--text-secondary);">' + esc(slot.role) + '</span></div>'
            + '<div class="serif-display" style="font-size:1.18rem;font-weight:400;color:' + (currentBottle ? 'var(--text-primary)' : 'var(--text-muted)') + ';margin-top:3px;">' + (currentBottle ? esc(currentBottle.label) : 'Slot Empty &middot; Tap a Bottle Below') + '</div></div>'
            + '<button type="button" class="mono" onclick="window.__dlSelectVanitySlot(' + prevIdx + ')" style="padding:3px 8px;border-radius:999px;background:var(--bg-oat);color:var(--text-secondary);border:none;font-size:0.72rem;cursor:pointer;flex-shrink:0;">&larr; Prev</button></div>'
            + '<div id="dl-vanity-slot-body-' + idx + '" style="display:' + (isOpen ? 'block' : 'none') + ';padding-top:10px;">'
              + '<div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.48;margin-bottom:10px;">' + extraNote + '</div>'
              + '<div class="mono" style="font-size:0.72rem;color:var(--text-muted);margin-bottom:6px;">Swap or try another bottle in this slot (Price &amp; Dupe comparison):</div>'
              + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">' + chipsHtml + '</div>'
              + '<div class="mono" style="padding:7px 10px;border-radius:14px;background:var(--bg-oat);font-size:0.74rem;color:var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">'
                + (currentBottle ? '<span><button type="button" class="mono" onclick="window.__dlRemoveSlotBottle(' + idx + ')" style="background:transparent;border:none;color:var(--text-muted);text-decoration:underline;cursor:pointer;font-size:0.74rem;margin-right:10px;">Remove &times;</button><a href="/api/affiliate?product=' + esc(currentBottle.id) + '&amp;partner=' + restockPartner + '" target="_blank" rel="sponsored noopener noreferrer" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;" data-no-bag-inject="1">' + esc(restockLabel) + '</a></span>' : '<span>Tap a bottle chip above</span>')
                + nextBtnHtml
              + '</div></div></div>';
        }).join('');
      }

      // Render Tab 02: Bag Clashes & pH Audit
      var clashPanel = document.getElementById('dl-dossier-panel-clashes');
      if (clashPanel) {
        if (clashes.length === 0) {
          clashPanel.innerHTML = '<div style="padding:14px;border-radius:18px;background:var(--sage-bg);border:none;color:var(--sage-safe);font-size:0.82rem;line-height:1.45;">'
            + '<strong class="serif-display" style="font-size:1.08rem;display:block;margin-bottom:4px;">Zero Active Clashes in Your 5-Slot Vanity Bag</strong>'
            + '<div>Your morning antioxidant (Slot 02) is safely separated from your evening renewal active (Slot 05), and your Slot 03 Ceramide cushion buffers barrier pH.</div>'
            + '<button type="button" class="mono" onclick="window.__dlInjectSampleClash()" style="margin-top:8px;padding:5px 12px;border-radius:999px;background:var(--bg-surface);color:var(--rose-brand);border:none;font-size:0.74rem;font-weight:600;cursor:pointer;">Simulate a Glycolic + Copper Peptide Clash &rarr;</button></div>';
        } else {
          clashPanel.innerHTML = clashes.map(function(c) {
            return '<div style="padding:11px 12px;border-radius:18px;background:var(--berry-bg);border:none;font-size:0.78rem;line-height:1.4;">'
              + '<div class="mono" style="font-size:0.7rem;font-weight:700;color:var(--berry-clash);text-transform:uppercase;">' + esc(c.severity) + ' BAG CLASH · SLOTS 0' + (c.slots[0] + 1) + ' + 0' + (c.slots[1] + 1) + '</div>'
              + '<div class="serif-display" style="font-size:1.02rem;font-weight:500;color:var(--text-primary);margin:2px 0 4px;">' + esc(c.title) + '</div>'
              + '<div style="color:var(--text-secondary);margin-bottom:7px;">' + esc(c.detail) + '</div>'
              + '<button type="button" class="mono" onclick="window.__dlAutoFixBagClashes()" style="padding:5px 12px;border-radius:999px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.74rem;font-weight:700;cursor:pointer;">✓ ' + esc(c.fixLabel) + '</button></div>';
          }).join('');
        }
      }

      // Render Tab 03: 4-Night Skin Cycling Calendar
      var cyclePanel = document.getElementById('dl-dossier-panel-cycle');
      if (cyclePanel) {
        var b2 = getBottleForSlot(st, 2) || SLOT_OPTIONS[2].choices[0];
        var b4 = getBottleForSlot(st, 4) || SLOT_OPTIONS[4].choices[0];
        cyclePanel.innerHTML = '<div style="padding:12px 14px;border-radius:18px;background:var(--bg-surface);border:none;display:flex;flex-direction:column;gap:6px;">'
          + '<div class="mono" style="font-size:0.72rem;font-weight:700;color:var(--rose-brand);text-transform:uppercase;">4-Night Bedtime Skin-Cycling Schedule (9:30 PM)</div>'
          + '<div style="padding:8px 10px;border-radius:12px;background:var(--bg-canvas);font-size:0.77rem;"><strong>Night 1 (Active Renewal):</strong> Cleanse + Dry 10m + <strong>' + esc(b4.short) + '</strong> + ' + esc(b2.short) + '</div>'
          + '<div style="padding:8px 10px;border-radius:12px;background:var(--sage-bg);font-size:0.77rem;"><strong>Night 2 (Barrier Recovery):</strong> Pause Slot 05 actives · Flood skin with <strong>' + esc(b2.short) + '</strong></div>'
          + '<div style="padding:8px 10px;border-radius:12px;background:var(--bg-canvas);font-size:0.77rem;"><strong>Night 3 (Second Renewal):</strong> Re-apply pea-sized <strong>' + esc(b4.short) + '</strong> buffered over cream</div>'
          + '<div style="padding:8px 10px;border-radius:12px;background:var(--sage-bg);font-size:0.77rem;"><strong>Night 4 (Deep Lipid Cushion):</strong> 3:1:1 Ceramide recovery with <strong>' + esc(b2.short) + '</strong> before repeating cycle</div></div>';
      }

      // Render Tab 04: Luxury Editorial 9:16 Phone Lock-Screen Pass
      var passPanel = document.getElementById('dl-dossier-panel-pass');
      if (passPanel) {
        var side = st.passSide === 'pm' ? 'pm' : 'am';
        var isAm = side === 'am';
        var b0 = getBottleForSlot(st, 0) || SLOT_OPTIONS[0].choices[0];
        var b1 = getBottleForSlot(st, 1) || SLOT_OPTIONS[1].choices[0];
        var b2p = getBottleForSlot(st, 2) || SLOT_OPTIONS[2].choices[0];
        var b3 = getBottleForSlot(st, 3) || SLOT_OPTIONS[3].choices[0];
        var b4p = getBottleForSlot(st, 4) || SLOT_OPTIONS[4].choices[0];
        var steps = isAm
          ? [
              { vt: 'mist', num: '01', name: b0.short, role: 'Morning pH Prep', pill: 'pH ' + b0.ph + ' · 45s', col: '#8A3448', bg: '#F3E1E5' },
              { vt: 'dropper', num: '02', name: b1.short, role: 'Antioxidant Shield', pill: 'pH ' + b1.ph + ' · 60s', col: '#8A3448', bg: '#F3E1E5' },
              { vt: 'jar', num: '03', name: b2p.short, role: '3:1:1 Ceramide Seal', pill: 'pH ' + b2p.ph + ' · Cushion', col: '#285B44', bg: '#E9F4EE' },
              { vt: 'tube', num: '04', name: b3.short, role: uMeta.label + ' · ' + fMeta.label, pill: b3.tag + ' · 90s', col: '#285B44', bg: '#E9F4EE' }
            ]
          : [
              { vt: 'mist', num: '01', name: 'Gentle Milk Cleanse', role: 'Pat 100% Dry Before Actives', pill: 'Wait 10m Dry', col: '#C9A45A', bg: 'rgba(201,164,90,0.16)' },
              { vt: 'pm_bottle', num: '02', name: b4p.short, role: 'Nights 1 & 3 Active Renewal', pill: 'pH ' + b4p.ph + ' · Pea Size', col: '#E8C6B0', bg: 'rgba(138,52,72,0.45)' },
              { vt: 'jar', num: '03', name: b2p.short, role: 'Every Night Sandwich Buffer', pill: 'pH ' + b2p.ph + ' · 3:1:1 Seal', col: '#A7D7C5', bg: 'rgba(40,91,68,0.42)' }
            ];
        var stepsHtml = steps.map(function(s) {
          var miniSvg = renderMiniVesselSvg(s.vt, s.num, false, false).replace('width="34" height="42"', 'width="24" height="30"').replace('width="36" height="42"', 'width="26" height="30"');
          return '<div style="display:flex;align-items:center;gap:8px;padding:6px 9px;background:' + (isAm ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.07)') + ';border:none;border-radius:12px;box-shadow:0 2px 6px rgba(58,31,39,0.05);">'
            + '<div style="flex-shrink:0;display:flex;align-items:center;justify-content:center;width:28px;height:32px;background:' + (isAm ? '#F8EFE6' : 'rgba(255,255,255,0.06)') + ';border-radius:6px;">' + miniSvg + '</div>'
            + '<div style="flex:1;min-width:0;"><div style="font-size:0.78rem;font-weight:700;color:' + (isAm ? '#3A1F27' : '#FDF8F6') + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(s.num) + ' &middot; ' + esc(s.name) + '</div>'
            + '<div style="font-size:0.68rem;color:' + (isAm ? '#6E4B55' : '#D5CBC0') + ';white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + esc(s.role) + '</div></div>'
            + '<span class="mono" style="font-size:0.64rem;font-weight:700;padding:3px 7px;border-radius:99px;background:' + s.bg + ';color:' + s.col + ';white-space:nowrap;flex-shrink:0;">' + esc(s.pill) + '</span></div>';
        }).join('');

        passPanel.innerHTML = '<div style="background:linear-gradient(155deg,#3A1F27 0%,#28141A 100%);color:#FDF8F6;border-radius:20px;padding:12px 14px;display:flex;flex-direction:column;gap:10px;border:none;">'
          + '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;"><div><span class="mono" style="font-size:0.68rem;color:#EED6DC;font-weight:700;letter-spacing:0.06em;display:block;">ATELIER 9:16 LOCK-SCREEN WALLPAPER</span><span style="font-size:0.74rem;color:#F3E1E5;">Tap AM or PM to flip your live phone lock-screen</span></div>'
          + '<div style="display:inline-flex;background:rgba(255,255,255,0.1);border-radius:999px;padding:3px;">'
            + '<button type="button" class="mono" onclick="window.__dlFlipPassSide(\\'am\\')" style="padding:5px 10px;border-radius:999px;font-size:0.71rem;border:none;cursor:pointer;background:' + (isAm ? 'var(--rose-brand)' : 'transparent') + ';color:#FDF8F6;font-weight:700;">☀ 7:30 AM</button>'
            + '<button type="button" class="mono" onclick="window.__dlFlipPassSide(\\'pm\\')" style="padding:5px 10px;border-radius:999px;font-size:0.71rem;border:none;cursor:pointer;background:' + (!isAm ? '#C9A45A' : 'transparent') + ';color:' + (!isAm ? '#3A1F27' : '#FDF8F6') + ';font-weight:700;">☾ 9:30 PM</button>'
          + '</div></div>'
          + '<div style="max-width:340px;width:100%;margin:0 auto;border-radius:24px;padding:7px;background:linear-gradient(145deg,#5A303D,#28141A);box-shadow:0 14px 32px rgba(58,31,39,0.36);">'
            + '<div style="border-radius:19px;padding:11px 12px 10px;background:' + (isAm ? 'linear-gradient(175deg,#FDF8F6 0%,#F8EFE6 55%,#F3E1E5 100%)' : 'linear-gradient(175deg,#28141A 0%,#3A1F27 58%,#4A2832 100%)') + ';color:' + (isAm ? '#3A1F27' : '#FDF8F6') + ';display:flex;flex-direction:column;gap:6px;position:relative;">'
              + '<div style="display:flex;justify-content:space-between;align-items:center;font-size:0.62rem;opacity:0.75;padding:0 4px;" class="mono"><span>DERMLOGIC ATELIER</span><span style="width:52px;height:11px;background:#3A1F27;border-radius:99px;display:inline-block;"></span><span>5G &middot; 100%</span></div>'
              + '<div style="text-align:center;padding:2px 0 4px;">'
                + '<div class="mono" style="font-size:0.63rem;letter-spacing:0.08em;color:' + (isAm ? '#8A3448' : '#EED6DC') + ';font-weight:700;">' + (isAm ? 'MORNING ANTIOXIDANT &amp; SPF SHIELD' : 'BEDTIME RENEWAL &amp; BARRIER RECOVERY') + '</div>'
                + '<div class="serif-display" style="font-size:1.75rem;font-weight:300;line-height:1.05;letter-spacing:-0.02em;margin:1px 0;">' + (isAm ? '07:30' : '21:30') + '</div>'
                + '<div class="mono" style="display:inline-flex;align-items:center;gap:6px;font-size:0.63rem;padding:2px 8px;border-radius:99px;background:' + (isAm ? '#E9F4EE' : 'rgba(201,164,90,0.16)') + ';color:' + (isAm ? '#285B44' : '#E8C6B0') + ';font-weight:700;"><span>96% Harmony &middot; 0 Clashes</span><span>&bull;</span><span>' + esc(uMeta.label) + '</span></div>'
              + '</div>'
              + '<div style="display:flex;flex-direction:column;gap:5px;">' + stepsHtml + '</div>'
              + '<div class="mono" style="display:grid;grid-template-columns:repeat(4,1fr);gap:3px;font-size:0.6rem;text-align:center;padding-top:2px;">'
                + '<span style="padding:3px 2px;border-radius:5px;background:#8A3448;color:#FFF;font-weight:700;">N1: ' + esc(b4p.tag) + '</span>'
                + '<span style="padding:3px 2px;border-radius:5px;background:#285B44;color:#FFF;font-weight:700;">N2: Rest</span>'
                + '<span style="padding:3px 2px;border-radius:5px;background:#8A3448;color:#FFF;font-weight:700;">N3: ' + esc(b4p.tag) + '</span>'
                + '<span style="padding:3px 2px;border-radius:5px;background:#285B44;color:#FFF;font-weight:700;">N4: Lipid</span>'
              + '</div>'
              + '<div style="width:76px;height:3px;background:' + (isAm ? 'rgba(58,31,39,0.22)' : 'rgba(255,255,255,0.28)') + ';border-radius:99px;margin:2px auto 0;"></div>'
            + '</div></div>'
          + '<div style="padding:8px 10px;border-radius:12px;background:rgba(255,255,255,0.08);font-size:0.72rem;line-height:1.4;color:#F3E1E5;">'
            + '<strong class="mono" style="color:#EED6DC;display:block;font-size:0.68rem;margin-bottom:2px;">INCLUDED IN YOUR 99&cent; HIGH-RES WALLPAPER DOWNLOAD:</strong>'
            + '<div>&bull; Crisp 1080&times;1920 Retina AM + PM Lock-Screen PNGs (auto-positioned below iOS/Android clock)</div>'
            + '<div>&bull; Exact pH windows, wait timers, sensitive-skin sandwich buffer rules &amp; 4-Night schedule</div></div></div>';
      }
    };

    window.__dlBuyFromVanity = function(tier, btnEl) {
      if (window.__ebIsUnlocked && tier === 'micro_pass' && typeof window.__dlDownloadOrUnlockWallpaper === 'function') {
        window.__dlDownloadOrUnlockWallpaper();
        return false;
      }
      if (btnEl) { btnEl.style.opacity = '0.85'; btnEl.innerHTML = '<span>Opening Checkout...</span>'; }
      if (typeof window.__ebCheckout === 'function') { window.__ebCheckout(tier || 'micro_pass', true); return false; }
      window.location.href = '/buy/' + encodeURIComponent(tier || 'micro_pass') + '?source=vanity_bag';
      return false;
    };

    window.__dlQuickAddBottleToBag = function(prodId, btnEl) { return window.__dlToggleBottleInBag(prodId, prodId, '', btnEl); };

    window.__dlPreloadBottlesInVanityBag = function(prodIds, sourceTag) {
      var st = window.__dlVanityState;
      if (!st.customSlotBottle) st.customSlotBottle = {};
      var ids = Array.isArray(prodIds) ? prodIds : String(prodIds || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      var firstSlot = 0;
      ids.forEach(function(pid, i) {
        var mapped = mapProductIdToSlot(pid, (PROD_INFO[pid] && PROD_INFO[pid].name) || pid, '');
        var sIdx = mapped.slotIdx;
        if (i === 0) firstSlot = sIdx;
        if (sIdx === 3) st.pouchSpfSealed = true;
        if (mapped.choiceIdx >= 0) { st.slotSelections[sIdx] = mapped.choiceIdx; delete st.customSlotBottle[sIdx]; }
        else { st.slotSelections[sIdx] = 0; st.customSlotBottle[sIdx] = makeCustomSlot(pid, (PROD_INFO[pid] && PROD_INFO[pid].name) || pid, ''); }
      });
      st.activeSlotIdx = firstSlot; st.dossierTab = 'slots'; saveVanityState(st);
      window.__dlRenderVanityDrawer(); window.__dlRefreshPageAddButtons();
      if (window.__ebLogEvent) {
        window.__ebLogEvent('p_seo_compare_cta', { source: sourceTag || 'pseo_preload', products: ids });
        window.__ebLogEvent('vanity_bag_add', { source: sourceTag || 'pseo_preload', count: ids.length });
        window.__ebLogEvent('calculate', { source: sourceTag || 'pseo_preload', products: ids });
      }
      if (window.__giFireBeacon) window.__giFireBeacon('p_seo_cta_click', { slug: sourceTag || 'pseo_preload', trigger: 'vanity_bag_preload' });
      window.__dlOpenVanityDrawer(sourceTag || 'pseo_preload');
    };

    // Inject "+ Add to Vanity Bag" buttons onto every bottle card across /, /celebrity/*, /bottle/*, /concern/*
    window.__dlRefreshPageAddButtons = function() {
      var st = window.__dlVanityState;
      var activeIds = [0, 1, 2, 3, 4].map(function(i) { var b = getBottleForSlot(st, i); return b ? b.id : null; }).filter(Boolean);

      document.querySelectorAll('a[href*="/api/affiliate?product="], a[data-sovrn-beacon*="product="]').forEach(function(affLink) {
        if (affLink.closest('[data-no-bag-inject="1"]')) return;
        var href = (affLink.getAttribute('href') || '') + ' ' + (affLink.getAttribute('data-sovrn-beacon') || '');
        var m = href.match(/product=([^&\s"']+)/);
        if (!m) return;
        var prodId = decodeURIComponent(m[1]);
        var card = affLink.closest('tr, .porcelain-vessel-core, .conflict-card') || affLink.parentElement;
        var titleEl = (card && !card.classList.contains('conflict-card')) ? card.querySelector('a[href^="/bottle/"], h1, h3') : null;
        var prodTitle = titleEl ? titleEl.textContent.trim() : (affLink.textContent.trim() || prodId);
        var btnId = 'dl-bag-btn-' + prodId;
        var existing = document.getElementById(btnId) || (affLink.parentElement ? affLink.parentElement.querySelector('button[data-dl-bag-prod], button[data-bottle-id]') : null) || (card ? card.querySelector('button[data-dl-bag-prod], button[data-bottle-id]') : null);
        if (!existing) {
          existing = document.createElement('button'); existing.type = 'button'; existing.id = btnId;
          existing.setAttribute('data-dl-bag-prod', prodId); existing.setAttribute('data-dl-bag-title', prodTitle);
          existing.className = 'dl-add-to-bag-btn mono';
          existing.onclick = function() { window.__dlToggleBottleInBag(prodId, prodTitle, '', existing); };
          if (affLink.parentElement) affLink.parentElement.appendChild(existing);
        }
      });

      document.querySelectorAll('a[href^="/bottle/"]').forEach(function(a) {
        var pid = (a.getAttribute('href') || '').replace('/bottle/', '').split(/[?#]/)[0];
        if (!pid || !PROD_INFO[pid] || a.querySelector('.dl-info-i')) return;
        a.onmouseenter = function(ev) { window.__dlShowProdInfo(a, pid, ev); };
        a.onmouseleave = window.__dlHideProdInfo;
        var ib = document.createElement('span'); ib.className = 'dl-info-i'; ib.textContent = 'i';
        ib.onpointerdown = ib.onclick = function(ev) { window.__dlShowProdInfo(ib, pid, ev); };
        a.appendChild(ib);
      });
      document.querySelectorAll('button[data-dl-bag-prod]').forEach(function(btn) {
        var prodId = btn.getAttribute('data-dl-bag-prod') || '';
        if (!prodId) return;
        var inBag = activeIds.indexOf(prodId) !== -1;
        btn.className = 'dl-add-to-bag-btn mono' + (inBag ? ' in-bag' : '');
        btn.onmouseenter = function(ev) { window.__dlShowProdInfo(btn, prodId, ev); };
        btn.onmouseleave = window.__dlHideProdInfo;
        btn.innerHTML = inBag ? '✓ In Vanity Bag &times;' : '+ Add to Vanity Bag';
      });
    };

    window.__dlOpenVanityDrawer = function(reason) {
      var drawer = document.getElementById('dl-atelier-vanity-drawer');
      if (!drawer) return;
      if (drawer.style.display === 'flex' && window.__dlLastOpenTs && Date.now() - window.__dlLastOpenTs < 260) return;
      window.__dlLastOpenTs = Date.now();
      var toast = document.getElementById('dl-vanity-toast'); if (toast) toast.style.display = 'none';
      var exitAlert = document.getElementById('dl-vanity-exit-alert'); if (exitAlert) exitAlert.style.display = (reason === 'exit_hold') ? 'block' : 'none';
      window.__dlRenderVanityDrawer();
      drawer.style.display = 'flex';
      if (window.__ebLogEvent) window.__ebLogEvent('view_paywall', { target: 'atelier_vanity_drawer_' + (reason || 'open') });
    };

    window.__dlCloseVanityDrawer = function() { var d = document.getElementById('dl-atelier-vanity-drawer'); if (d) d.style.display = 'none'; };
    window.__dlSelectVanitySlot = function(idx) { window.__dlVanityState.activeSlotIdx = idx; window.__dlVanityState.dossierTab = 'slots'; saveVanityState(window.__dlVanityState); window.__dlRenderVanityDrawer(); };
    window.__dlPickSlotBottle = function(slotIdx, choiceIdx) { window.__dlVanityState.slotSelections[slotIdx] = choiceIdx; if (window.__dlVanityState.customSlotBottle) delete window.__dlVanityState.customSlotBottle[slotIdx]; saveVanityState(window.__dlVanityState); window.__dlRenderVanityDrawer(); window.__dlRefreshPageAddButtons(); };
    window.__dlSetUndertone = function(undertone) { window.__dlVanityState.undertone = undertone || 'neutral_ivory'; window.__dlVanityState.activeSlotIdx = 3; window.__dlVanityState.dossierTab = 'slots'; saveVanityState(window.__dlVanityState); window.__dlRenderVanityDrawer(); };
    window.__dlSetFinish = function(finish) { window.__dlVanityState.finish = finish || 'velvet_satin'; window.__dlVanityState.activeSlotIdx = 3; window.__dlVanityState.dossierTab = 'slots'; saveVanityState(window.__dlVanityState); window.__dlRenderVanityDrawer(); };

    window.__dlSetSlotCalibrator = function(slotIdx, rowNum, valId) {
      var st = window.__dlVanityState, cfg = SLOT_CALIBRATORS[slotIdx];
      if (!cfg) return;
      st[rowNum === 1 ? cfg.row1Key : cfg.row2Key] = valId;
      var r1Val = st[cfg.row1Key] || cfg.row1[0].id, r2Val = st[cfg.row2Key] || cfg.row2[0].id;
      var r1Obj = cfg.row1.find(function(x) { return x.id === r1Val; }) || cfg.row1[0];
      var isGentle = (r2Val === 'sensitive' || r2Val === 'beginner_sandwich');
      var recIdx = (isGentle && typeof r1Obj.sensitivePickIdx === 'number') ? r1Obj.sensitivePickIdx : ((isGentle && typeof r1Obj.gentlePickIdx === 'number') ? r1Obj.gentlePickIdx : r1Obj.pickIdx);
      if (typeof recIdx === 'number') { st.slotSelections[slotIdx] = recIdx; if (st.customSlotBottle) delete st.customSlotBottle[slotIdx]; }
      st.activeSlotIdx = slotIdx; st.dossierTab = 'slots'; saveVanityState(st);
      window.__dlRenderVanityDrawer(); window.__dlRefreshPageAddButtons();
      if (window.__ebLogEvent) window.__ebLogEvent('vanity_calibrator', { slot: slotIdx + 1, row: rowNum, value: valId });
    };

    window.__dlAddCustomSearchBottle = function() {
      var inp = document.getElementById('productFilterInput');
      var q = inp && inp.value ? inp.value.trim() : '';
      if (!q) return;
      fetch('/api/bottles/discover', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: q }) }).then(function(r) { return r.json(); }).then(function(d) {
        if (d && d.product) { window.__dlToggleBottleInBag(d.product.id, d.product.name, d.product.priceUsd, null); window.__dlOpenVanityDrawer('custom_bottle'); }
      }).catch(function() { window.__dlToggleBottleInBag('custom-' + Date.now(), q, 28, null); window.__dlOpenVanityDrawer('custom_bottle'); });
    };

    window.__dlSendVanityHoldEmail = function(ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      var emIn = document.getElementById('dl-vanity-hold-email');
      var email = emIn && emIn.value ? emIn.value.trim() : '';
      if (!email) return false;
      var statusEl = document.getElementById('dl-vanity-email-status'), btnEl = document.getElementById('dl-vanity-email-btn');
      if (btnEl) btnEl.textContent = '✓ Sent + .ICS!';
      if (statusEl) { statusEl.style.display = 'block'; statusEl.textContent = '4-Night .ICS Calendar & 24h Restore Link sent to ' + email + ' (Bag #' + (window.__dlVanityState.bagId || 'DL-4829') + ').'; }
      fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'atelier_vanity_24h_hold' }) }).catch(function() {});
      try { var dl = document.createElement('a'); dl.href = '/api/github-upgrade/skin-cycling.ics'; dl.download = 'dermlogic-4-night-skin-cycling.ics'; dl.style.display = 'none'; document.body.appendChild(dl); dl.click(); setTimeout(function() { if (dl.parentNode) dl.parentNode.removeChild(dl); }, 600); } catch (_) {}
      return false;
    };

    var exitHoldShown = false, enteredAt = Date.now(), ttfiMs = 0, maxScrollPct = 0, exitBeaconSent = false;
    var markFirstInteract = function() { if (!ttfiMs) ttfiMs = Date.now() - enteredAt; };
    window.addEventListener('pointerdown', markFirstInteract, { passive: true, once: true });
    window.addEventListener('scroll', function() {
      if (!ttfiMs) ttfiMs = Date.now() - enteredAt;
      var sh = Math.max(1, (document.documentElement && document.documentElement.scrollHeight) || 1);
      var pct = Math.min(100, Math.round((((window.scrollY || 0) + (window.innerHeight || 800)) / sh) * 100));
      if (pct > maxScrollPct) maxScrollPct = pct;
    }, { passive: true });
    var sendExitBeacon = function() {
      if (exitBeaconSent || navigator.webdriver) return;
      exitBeaconSent = true;
      var payload = JSON.stringify({ event_type: 'session_exit', page_url: window.location.pathname, meta: { vid: window.__ebVid || '', sid: window.__ebSid || '', js_hydrated: 1, dwell_ms: Date.now() - enteredAt, ttfi_ms: ttfiMs, max_scroll_pct: maxScrollPct, interacted: Boolean(ttfiMs > 0) } });
      if (navigator.sendBeacon) { try { navigator.sendBeacon('/api/telemetry/event', new Blob([payload], { type: 'application/json' })); return; } catch (_) {} }
      if (window.__ebLogEvent) window.__ebLogEvent('session_exit', { dwell_ms: Date.now() - enteredAt, ttfi_ms: ttfiMs, max_scroll_pct: maxScrollPct, interacted: Boolean(ttfiMs > 0) });
    };
    document.addEventListener('visibilitychange', function() { if (document.visibilityState === 'hidden') sendExitBeacon(); });
    window.addEventListener('pagehide', sendExitBeacon);

    window.__dlSyncVanityFromCheckboxes = function(isClearAll) {
      var st = window.__dlVanityState;
      if (isClearAll) {
        st.slotSelections = [-1, -1, -1, -1, -1];
        st.customSlotBottle = {};
        st.pouchSpfSealed = false;
      } else {
        st.slotSelections = [-1, -1, -1, -1, -1];
        st.customSlotBottle = {};
        st.pouchSpfSealed = false;
        document.querySelectorAll('input[name="routineProduct"]:checked').forEach(function(cb) {
          var prodId = cb.value;
          var lbl = cb.closest('.prod-check-item');
          var titleEl = lbl ? lbl.querySelector('strong') : null;
          var title = titleEl ? titleEl.textContent.trim() : prodId;
          var mapped = mapProductIdToSlot(prodId, title, '');
          if (mapped.slotIdx === 3) st.pouchSpfSealed = true;
          if (mapped.choiceIdx >= 0) {
            st.slotSelections[mapped.slotIdx] = mapped.choiceIdx;
          } else {
            st.slotSelections[mapped.slotIdx] = 0;
            st.customSlotBottle[mapped.slotIdx] = makeCustomSlot(prodId, title, '');
          }
        });
      }
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
    };

    document.addEventListener('change', function(e) {
      if (e.target && e.target.name === 'routineProduct') {
        var prodId = e.target.value;
        var lbl = e.target.closest('.prod-check-item');
        var titleEl = lbl ? lbl.querySelector('strong') : null;
        var title = titleEl ? titleEl.textContent.trim() : prodId;
        var mapped = mapProductIdToSlot(prodId, title, '');
        if (e.target.checked) {
          if (mapped.slotIdx === 3) window.__dlVanityState.pouchSpfSealed = true;
          if (mapped.choiceIdx >= 0) {
            window.__dlVanityState.slotSelections[mapped.slotIdx] = mapped.choiceIdx;
            if (window.__dlVanityState.customSlotBottle) delete window.__dlVanityState.customSlotBottle[mapped.slotIdx];
          } else {
            window.__dlVanityState.slotSelections[mapped.slotIdx] = 0;
            if (!window.__dlVanityState.customSlotBottle) window.__dlVanityState.customSlotBottle = {};
            window.__dlVanityState.customSlotBottle[mapped.slotIdx] = makeCustomSlot(prodId, title, '');
          }
          saveVanityState(window.__dlVanityState);
          if (!navigator.webdriver || window.__dlAllowToastInTest) {
            showVanityToast('Added ' + title + ' to Vanity Bag (Slot 0' + (mapped.slotIdx + 1) + ')');
          }
        } else {
          var cur = getBottleForSlot(window.__dlVanityState, mapped.slotIdx);
          if (cur && cur.id === prodId) {
            window.__dlVanityState.slotSelections[mapped.slotIdx] = -1;
            if (window.__dlVanityState.customSlotBottle) delete window.__dlVanityState.customSlotBottle[mapped.slotIdx];
            if (mapped.slotIdx === 3) window.__dlVanityState.pouchSpfSealed = false;
            saveVanityState(window.__dlVanityState);
          }
        }
        window.__dlRenderVanityDrawer();
      }
    }, { passive: true });

    window.addEventListener('DOMContentLoaded', function() {
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
    });
  })();
`;

module.exports = {
  renderHeaderVanityBagPill,
  renderAtelierVanityDrawerHtml,
  ATELIER_VANITY_CLIENT_SCRIPT
};
