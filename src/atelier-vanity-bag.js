'use strict';

/**
 * DermLogic Option 1 + 2 + 3 Hybrid: The 5-Slot Atelier Vanity Bag, 4-Tab Dossier,
 * Live Clash Detector, 5-Bottle Countertop Vessel Lineup, 1-Tap Add/Remove Across All Pages,
 * and Mobile Bottom-Sheet Experience.
 * Strictly < 1,000 lines and zero em-dashes.
 */

function renderHeaderVanityBagPill() {
  return `<button type="button" id="dl-header-vanity-pill" class="mono" onclick="window.__dlOpenVanityDrawer('header_pill')" aria-label="Open My 5-Slot Atelier Vanity Bag" style="display:inline-flex;align-items:center;gap:6px;padding:7px 11px;background:var(--rose-pill-bg);color:var(--rose-brand);border:1px solid var(--rose-pill-border);cursor:pointer;font-size:0.8rem;font-weight:600;transition:transform 180ms cubic-bezier(0.22,1,0.36,1),background-color 180ms ease;white-space:nowrap;">
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true" style="flex-shrink:0;"><path d="M6 7V5.5C6 3.57 7.57 2 9.5 2h1C12.43 2 14 3.57 14 5.5V7h2.5v10.5c0 .83-.67 1.5-1.5 1.5H5c-.83 0-1.5-.67-1.5-1.5V7H6zm1.5 0h5V5.5c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2V7z" fill="currentColor"/></svg>
    <span>Vanity Bag</span>
    <span id="dl-header-vanity-count" style="padding:1px 6px;background:var(--rose-brand);color:var(--accent-ink);font-size:0.74rem;font-weight:700;">5/5</span>
    <span id="dl-header-vanity-clash-dot" style="font-size:0.73rem;padding:1px 6px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;">0 Clashes</span>
  </button>`;
}

function renderAtelierVanityDrawerHtml() {
  return `
  <style>
    #dl-header-vanity-pill:active, .dl-vanity-swatch-btn:active, .dl-vanity-slot-head:active, .dl-dossier-tab-btn:active, .dl-tray-vessel-btn:active, .dl-add-to-bag-btn:active {
      transform: scale(0.97);
    }
    .dl-vanity-swatch-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 5px 8px;
      background: var(--bg-surface); color: var(--text-secondary);
      border: 1px solid transparent; cursor: pointer;
      font-size: 0.76rem; font-weight: 500; white-space: nowrap; transition: border-color 160ms ease, background-color 160ms ease, transform 160ms cubic-bezier(0.22,1,0.36,1);
    }
    .dl-vanity-swatch-btn.active {
      background: var(--rose-pill-bg); color: var(--rose-brand);
      border-color: var(--rose-brand); font-weight: 600;
    }
    .dl-vanity-slot-card {
      background: var(--bg-surface); border: 1px solid transparent;
      transition: border-color 180ms ease, background-color 180ms ease;
    }
    .dl-vanity-slot-card.active {
      border-color: var(--border-hairline);
      border-left: 3px solid var(--rose-brand);
      background: var(--bg-surface);
    }
    .dl-vanity-slot-card.clash-slot {
      border-left: 3px solid var(--berry-clash);
    }
    .dl-dossier-tabs-bar {
      display: grid; grid-template-columns: repeat(4, minmax(0, 1fr));
      background: var(--bg-oat); padding: 4px; gap: 4px;
    }
    .dl-dossier-tab-btn {
      padding: 8px 6px; background: transparent; border: none;
      cursor: pointer; text-align: center;
      display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; min-width: 0;
      transition: background-color 160ms ease, color 160ms ease;
    }
    .dl-dossier-tab-btn.active {
      background: var(--bg-surface); box-shadow: 0 1px 4px rgba(0,0,0,0.05);
    }
    .dl-tray-lineup-grid {
      display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px;
    }
    .dl-tray-vessel-btn {
      background: var(--bg-surface); border: 1px solid transparent;
      padding: 8px 4px; cursor: pointer; display: flex; flex-direction: column;
      align-items: center; justify-content: space-between; gap: 4px; min-width: 0; position: relative;
      transition: transform 180ms cubic-bezier(0.22,1,0.36,1), border-color 160ms ease, background-color 160ms ease;
    }
    .dl-tray-vessel-btn:hover {
      transform: translateY(-2px);
    }
    .dl-tray-vessel-btn.active {
      border: 1.5px solid var(--rose-brand); background: var(--rose-pill-bg); transform: translateY(-2px);
    }
    .dl-tray-vessel-btn.has-clash {
      border-color: var(--berry-clash); background: var(--berry-bg);
    }
    .dl-tray-vessel-btn.is-empty {
      border: 1px dashed var(--border-strong); opacity: 0.72;
    }
    .dl-add-to-bag-btn {
      display: inline-flex; align-items: center; gap: 5px; padding: 5px 10px;
      background: var(--bg-surface); color: var(--rose-brand); border: 1px solid var(--rose-brand);
      font-size: 0.75rem; font-weight: 600; cursor: pointer; white-space: nowrap;
      transition: background-color 160ms ease, color 160ms ease, transform 150ms ease;
    }
    .dl-add-to-bag-btn.in-bag {
      background: var(--rose-brand); color: var(--accent-ink);
    }
    #dl-vanity-toast {
      position: fixed; bottom: 18px; right: 18px; z-index: 9998;
      background: #181412; color: #F4EFE8; border: 1px solid var(--rose-brand);
      padding: 10px 14px; font-size: 0.8rem; display: none; align-items: center; gap: 10px;
      box-shadow: 0 14px 34px rgba(0,0,0,0.32); max-width: calc(100vw - 32px);
    }
    @media (max-width: 768px) {
      .dl-hide-mobile { display: none !important; }
      #dl-header-vanity-pill { padding: 5px 8px !important; font-size: 0.74rem !important; gap: 4px !important; }
      #dl-header-vanity-clash-dot { display: none !important; }
      #dl-atelier-vanity-drawer { align-items: flex-end !important; justify-content: center !important; }
      #dl-atelier-vanity-panel {
        width: 100vw !important; max-width: 100vw !important; height: 92dvh !important; max-height: 92dvh !important;
        border-left: none !important; border-top: 2px solid var(--rose-brand) !important;
        padding: 10px 14px 14px 14px !important; gap: 8px !important;
      }
      .dl-mobile-grabber {
        display: block !important; width: 42px; height: 4px; background: var(--border-strong);
        margin: 0 auto 4px auto; border-radius: 2px; flex-shrink: 0;
      }
      .dl-tray-lineup-grid {
        display: grid !important; grid-template-columns: repeat(5, minmax(0, 1fr)) !important; gap: 4px !important;
      }
      .dl-tray-vessel-btn { padding: 4px 2px !important; min-width: 0 !important; }
      .dl-tray-vessel-btn svg { width: 26px !important; height: 32px !important; }
      #dl-undertone-swatches .dl-vanity-swatch-btn { font-size: 0.67rem !important; padding: 5px 2px !important; gap: 3px !important; }
      #dl-finish-swatches .dl-vanity-swatch-btn { font-size: 0.7rem !important; padding: 5px 4px !important; }
      .dl-dossier-tab-sub { display: none !important; }
      .dl-dossier-tab-title { font-size: 0.74rem !important; }
    }
  </style>

  <!-- Toast notification when adding/removing bottles from any page -->
  <div id="dl-vanity-toast" role="status" aria-live="polite">
    <span id="dl-vanity-toast-text" class="mono">Added to Vanity Bag</span>
    <button type="button" class="mono" onclick="window.__dlOpenVanityDrawer('toast');document.getElementById('dl-vanity-toast').style.display='none';" style="background:var(--rose-brand);color:var(--accent-ink);border:none;padding:4px 9px;font-size:0.74rem;font-weight:700;cursor:pointer;white-space:nowrap;">Open Bag &rarr;</button>
  </div>

  <div id="dl-atelier-vanity-drawer" role="dialog" aria-modal="true" aria-labelledby="dl-vanity-bag-title" style="display:none;position:fixed;inset:0;z-index:9996;background:rgba(12,10,8,0.58);align-items:stretch;justify-content:flex-end;">
    <div id="dl-atelier-vanity-panel" style="width:540px;max-width:100vw;height:100%;background:var(--bg-canvas);color:var(--text-primary);border-left:1px solid var(--border-strong);display:flex;flex-direction:column;justify-content:space-between;overflow-y:auto;padding:20px 24px;gap:12px;">
      
      <!-- Mobile Bottom-Sheet Grab Handle -->
      <div class="dl-mobile-grabber" style="display:none;" onclick="window.__dlCloseVanityDrawer()"></div>

      <!-- Calm Top Header -->
      <div style="border-bottom:1px solid var(--border-hairline);padding-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:6px;">
          <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <button type="button" id="dl-vanity-harmony-pill" class="badge-safe mono" onclick="window.__dlSetDossierTab('clashes')" style="font-size:0.75rem;padding:3px 9px;border:none;cursor:pointer;">96% Harmony &middot; 0 Clashes</button>
            <span id="dl-vanity-hold-countdown" class="mono" style="color:var(--text-secondary);font-size:0.75rem;">Reserved for 23h 59m</span>
            <span id="dl-vanity-bag-id" class="mono" style="display:none;">#DL-4829</span>
          </div>
          <button type="button" id="dl-vanity-drawer-close" class="btn-secondary mono" onclick="window.__dlCloseVanityDrawer()" style="padding:4px 10px;min-height:26px;font-size:0.76rem;">Close &times;</button>
        </div>

        <h3 id="dl-vanity-bag-title" class="serif-display" style="font-size:1.45rem;font-weight:400;line-height:1.15;color:var(--text-primary);margin:0;">Your 5-Slot Calibrated Vanity Bag</h3>

        <div id="dl-vanity-exit-alert" style="display:none;padding:8px 10px;background:var(--rose-pill-bg);border-left:3px solid var(--rose-brand);margin-top:8px;font-size:0.78rem;color:var(--text-primary);line-height:1.38;">
          <strong style="color:var(--rose-brand);">Your Vanity Bag Is Reserved for 24 Hours:</strong> Save your 9:16 Lock-Screen Card or email yourself a free restore link below before leaving.
        </div>

        <!-- Live Clash Alert Banner inside the Drawer -->
        <div id="dl-vanity-clash-banner" style="display:none;padding:9px 12px;background:var(--berry-bg);border-left:3px solid var(--berry-clash);margin-top:8px;font-size:0.8rem;color:var(--text-primary);line-height:1.38;justify-content:space-between;align-items:center;gap:10px;">
          <div id="dl-vanity-clash-banner-text" style="min-width:0;flex:1;"></div>
          <button type="button" class="mono" onclick="window.__dlAutoFixBagClashes()" style="padding:5px 10px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.75rem;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0;">1-Tap Fix &rarr;</button>
        </div>
      </div>

      <!-- Airy Visual Bottle Countertop Shelf (Option 3) -->
      <div style="background:var(--bg-oat);padding:10px 12px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:6px;">
          <span class="mono" style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);">Tap any bottle on your shelf (<span id="dl-tray-filled-label">5/5 Vessels</span>):</span>
          <button type="button" class="mono" onclick="window.__dlInjectSampleClash()" style="background:var(--bg-surface);color:var(--rose-brand);border:1px solid var(--rose-pill-border);padding:2px 8px;font-size:0.72rem;font-weight:600;cursor:pointer;">Play: Test a Clash &rarr;</button>
        </div>
        <div id="dl-vanity-visual-tray" class="dl-tray-lineup-grid"></div>
      </div>

      <!-- Clean 1-Line 4-Pill Switcher -->
      <div class="dl-dossier-tabs-bar" role="tablist" aria-label="4-Tab Atelier Prescription Dossier">
        <button type="button" role="tab" id="dl-dossier-tab-slots" class="dl-dossier-tab-btn active" onclick="window.__dlSetDossierTab('slots')">
          <strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">1 &middot; Bottles</strong>
        </button>
        <button type="button" role="tab" id="dl-dossier-tab-clashes" class="dl-dossier-tab-btn" onclick="window.__dlSetDossierTab('clashes')">
          <span class="mono" id="dl-tab02-kicker" style="display:none;">AUDIT</span>
          <strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">2 &middot; Clashes</strong>
          <span class="mono dl-dossier-tab-sub" id="dl-tab02-sub" style="display:none;">0 Clashes</span>
        </button>
        <button type="button" role="tab" id="dl-dossier-tab-cycle" class="dl-dossier-tab-btn" onclick="window.__dlSetDossierTab('cycle')">
          <strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">3 &middot; 4-Night</strong>
        </button>
        <button type="button" role="tab" id="dl-dossier-tab-pass" class="dl-dossier-tab-btn" onclick="window.__dlSetDossierTab('pass')">
          <strong class="serif-display dl-dossier-tab-title" style="font-size:0.88rem;font-weight:500;">4 &middot; Phone Card</strong>
        </button>
      </div>

      <!-- Tab 01 View: Single-Bottle Spotlight Card + Slot 04 Undertone Strip -->
      <div id="dl-dossier-panel-slots" style="display:flex;flex-direction:column;gap:10px;">
        <div id="dl-vanity-slots-list" style="display:flex;flex-direction:column;gap:0;"></div>

        <!-- Undertone & Finish Strip (Only shown when inspecting Slot 04 SPF) -->
        <div id="dl-undertone-parent-box" style="padding:12px 14px;background:var(--bg-oat);display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="mono" style="font-size:0.75rem;font-weight:500;color:var(--text-secondary);">Match Slot 04 SPF to Skin Tone &amp; Finish:</span>
            <span id="dl-undertone-active-label" class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:600;">Neutral Ivory &middot; Velvet Satin</span>
          </div>
          <div id="dl-undertone-swatches" role="group" aria-label="Select Skin Undertone" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;">
            <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="cool_rosy" onclick="window.__dlSetUndertone('cool_rosy', this)">
              <span style="width:9px;height:9px;border-radius:50%;background:#F3D9D4;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
              <span>Cool Rosy</span>
            </button>
            <button type="button" class="dl-vanity-swatch-btn active mono" data-undertone="neutral_ivory" onclick="window.__dlSetUndertone('neutral_ivory', this)">
              <span style="width:9px;height:9px;border-radius:50%;background:#EFE0D0;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
              <span>Neutral</span>
            </button>
            <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="warm_olive" onclick="window.__dlSetUndertone('warm_olive', this)">
              <span style="width:9px;height:9px;border-radius:50%;background:#D8B48E;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
              <span>Warm Olive</span>
            </button>
            <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="rich_espresso" onclick="window.__dlSetUndertone('rich_espresso', this)">
              <span style="width:9px;height:9px;border-radius:50%;background:#7B4B36;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
              <span>Deep Rich</span>
            </button>
          </div>
          <div id="dl-finish-swatches" role="group" aria-label="Select Complexion Finish" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:4px;">
            <button type="button" class="dl-vanity-swatch-btn mono" data-finish="dewy_glass" onclick="window.__dlSetFinish('dewy_glass', this)">Dewy Glass</button>
            <button type="button" class="dl-vanity-swatch-btn active mono" data-finish="velvet_satin" onclick="window.__dlSetFinish('velvet_satin', this)">Velvet Satin</button>
            <button type="button" class="dl-vanity-swatch-btn mono" data-finish="cloud_matte" onclick="window.__dlSetFinish('cloud_matte', this)">Soft Matte</button>
          </div>
        </div>
      </div>

      <!-- Tab 02 View: Live Bag Clash & pH Conflict Audit -->
      <div id="dl-dossier-panel-clashes" style="display:none;flex-direction:column;gap:8px;"></div>

      <!-- Tab 03 View: 4-Night Skin Cycling Calendar -->
      <div id="dl-dossier-panel-cycle" style="display:none;flex-direction:column;gap:8px;"></div>

      <!-- Tab 04 View: 2-Sided 9:16 Lock-Screen Pass Preview -->
      <div id="dl-dossier-panel-pass" style="display:none;flex-direction:column;gap:8px;"></div>

      <!-- Calm Footer -->
      <div id="dl-vanity-vault-footer" style="padding:12px 14px;background:var(--bg-oat);display:flex;flex-direction:column;gap:8px;margin-top:auto;">
        <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:8px;">
          <a id="dl-vanity-keep-99c" href="/buy/micro_pass?source=vanity_bag_99c" onclick="if(window.__ebQuickBuy){window.__dlCloseVanityDrawer();window.__ebQuickBuy('micro_pass');return false;}" class="btn-primary mono" style="width:100%;justify-content:center;text-decoration:none;padding:9px 12px;font-size:0.8rem;white-space:nowrap;">
            <span>Save 9:16 Phone Card (99&cent;) &rarr;</span>
          </a>
          <a id="dl-vanity-keep-199" href="/buy/flash_pass?source=vanity_bag_199" onclick="if(window.__ebQuickBuy){window.__dlCloseVanityDrawer();window.__ebQuickBuy('flash_pass');return false;}" class="btn-secondary mono" style="width:100%;justify-content:center;text-decoration:none;padding:9px 12px;font-size:0.78rem;white-space:nowrap;">
            <span>Complete 3-File Kit ($1.99)</span>
          </a>
        </div>

        <form id="dl-vanity-email-form" onsubmit="return window.__dlSendVanityHoldEmail(event)" style="display:flex;gap:6px;align-items:center;">
          <input id="dl-vanity-hold-email" type="email" required class="input-box mono" placeholder="Or email my free 24h restore link..." style="flex:1;padding:6px 10px;font-size:0.76rem;min-height:30px;" />
          <button type="submit" id="dl-vanity-email-btn" class="btn-secondary mono" style="padding:6px 10px;min-height:30px;font-size:0.75rem;white-space:nowrap;">Email 24h Link</button>
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
    var UNDERTONE_META = {
      cool_rosy: {
        label: 'Cool Rosy',
        spfRec: 'Beauty of Joseon Relief Sun SPF 50+ or EltaMD UV Clear (Untinted)',
        spfNote: 'Cool Rosy Undertone: Avoid yellow-iron-oxide tints that pull orange. Use sheer rice-probiotic or untinted niacinamide SPF 50 with a 60s dry-down before concealer.'
      },
      neutral_ivory: {
        label: 'Neutral Ivory',
        spfRec: 'Beauty of Joseon Relief Sun SPF 50+ (Zero White-Cast Rice Essence)',
        spfNote: 'Neutral Undertone: Balances both mineral and hybrid filters. Allow 60 seconds after barrier cream so water-based serums never pill under skin tint.'
      },
      warm_olive: {
        label: 'Warm / Olive',
        spfRec: 'EltaMD UV Clear SPF 46 or Hybrid Invisible Gel-Serum SPF 50 (Zero White-Cast)',
        spfNote: 'Warm / Olive Undertone: Uncoated zinc oxide leaves an ashy grey cast on olive skin. Use sheer hybrid or micronized niacinamide SPF 46+ with 90s absorption.'
      },
      rich_espresso: {
        label: 'Deep / Rich',
        spfRec: 'Beauty of Joseon Relief Sun SPF 50+ (100% Sheer Organic UV Filters)',
        spfNote: 'Deep / Rich Undertone: Zero-titanium sheer organic UV filters prevent chalky flashback while sealing humectants beneath complexion products.'
      }
    };
    var FINISH_META = {
      dewy_glass: { label: 'Dewy Glass', prepRule: 'Mist damp skin + press 2 drops squalane/ceramide essence before SPF.' },
      velvet_satin: { label: 'Velvet Satin', prepRule: 'Wait 60s between serum and barrier cream for a natural skin-like satin bounce.' },
      cloud_matte: { label: 'Soft Matte', prepRule: 'Use Niacinamide 10% + Zinc in T-zone and blot excess oil before applying SPF.' }
    };

    var SLOT_OPTIONS = [
      {
        slotNum: '01 · AM PREP',
        shortSlot: '01 · PREP',
        vesselType: 'mist',
        role: 'Morning Cleanse & pH Prep',
        choices: [
          { id: 'tower28-sos-spray', label: 'Tower 28 SOS Hypochlorous Mist ($28)', short: 'Tower 28 Mist', ph: '4.8', tag: 'HOCl' },
          { id: 'anua-heartleaf-77-toner', label: 'Anua Heartleaf 77% Soothing Toner ($23)', short: 'Anua 77% Toner', ph: '5.7', tag: 'pH 5.7' },
          { id: 'panoxyl-10-bpo-wash', label: 'PanOxyl 10% Benzoyl Peroxide Wash ($11)', short: 'PanOxyl 10% BPO', ph: '5.2', tag: '10% BPO' },
          { id: 'to-glycolic-acid-7', label: 'The Ordinary Glycolic Acid 7% Toner ($13)', short: 'Ordinary Glycolic', ph: '3.6', tag: '7% AHA' }
        ],
        timing: '7:30 AM · Step 1 (pH Reset · Wait 45s)'
      },
      {
        slotNum: '02 · AM ACTIVE',
        shortSlot: '02 · SERUM',
        vesselType: 'dropper',
        role: 'Morning Antioxidant Serum',
        choices: [
          { id: 'skinceuticals-ce-ferulic', label: 'SkinCeuticals C E Ferulic 15% Vitamin C ($182)', short: 'C E Ferulic 15%', ph: '3.2', tag: '15% C' },
          { id: 'rohto-melano-cc', label: 'Rohto Melano CC Vitamin C Essence ($14)', short: 'Melano CC', ph: '3.5', tag: 'Vit C' },
          { id: 'to-niacinamide-10-zinc', label: 'The Ordinary Niacinamide 10% + Zinc 1% ($6)', short: 'Niacinamide 10%', ph: '6.0', tag: '10% B3' },
          { id: 'topicals-faded-serum', label: 'Topicals Faded Brightening Serum ($38)', short: 'Topicals Faded', ph: '5.5', tag: 'TXA' },
          { id: 'to-buffet-copper-peptides', label: 'The Ordinary Multi-Peptide + Copper 1% ($32)', short: 'Copper Peptides', ph: '6.2', tag: 'GHK-Cu' }
        ],
        timing: '7:31 AM · Step 2 (Antioxidant Shield · Wait 60s before cream)'
      },
      {
        slotNum: '03 · BARRIER SEAL',
        shortSlot: '03 · CREAM',
        vesselType: 'jar',
        role: '3:1:1 Ceramide & Lipid Cushion',
        choices: [
          { id: 'aestura-atobarrier-365', label: 'Aestura Atobarrier 365 Ceramide Cream ($32)', short: 'Aestura 365', ph: '5.5', tag: '3:1:1' },
          { id: 'dieux-instant-angel', label: 'Dieux Instant Angel Lipid Cream ($45)', short: 'Instant Angel', ph: '5.4', tag: 'Lipid' },
          { id: 'cosrx-snail-96-mucin', label: 'COSRX Snail 96 Mucin Essence ($25)', short: 'Snail 96 Mucin', ph: '6.5', tag: '96% Snail' },
          { id: 'lrp-cicaplast-baume-b5', label: 'La Roche-Posay Cicaplast Baume B5+ ($18)', short: 'Cicaplast B5+', ph: '5.6', tag: '5% B5' },
          { id: 'cerave-pm-lotion', label: 'CeraVe PM Facial Moisturizing Lotion ($17)', short: 'CeraVe PM', ph: '5.8', tag: 'Ceramide' }
        ],
        timing: 'AM & PM · Step 3 (Seals hydration & buffers night actives)'
      },
      {
        slotNum: '04 · SPF & TONE',
        shortSlot: '04 · SPF 50',
        vesselType: 'tube',
        role: 'Undertone-Matched SPF 50 & Finish',
        choices: [
          { id: 'boj-relief-sun-spf50', label: 'Beauty of Joseon Relief Sun SPF 50+ ($18)', short: 'Joseon SPF 50+', ph: '6.2', tag: 'SPF 50' },
          { id: 'eltamd-uv-clear-spf46', label: 'EltaMD UV Clear Broad-Spectrum SPF 46 ($43)', short: 'EltaMD SPF 46', ph: '6.0', tag: 'SPF 46' }
        ],
        timing: '7:33 AM · Step 4 (2-Finger Rule · Wait 90s before makeup)'
      },
      {
        slotNum: '05 · PM RENEWAL',
        shortSlot: '05 · PM',
        vesselType: 'pm_bottle',
        role: 'Evening Retinoid / Exfoliant (4-Night Cycle)',
        choices: [
          { id: 'rx-tretinoin-005', label: 'Rx Tretinoin 0.05% Night Cream ($35)', short: 'Tretinoin 0.05%', ph: '5.8', tag: 'Rx Retin' },
          { id: 'medik8-crystal-retinal-6', label: 'Medik8 Crystal Retinal 6 Night Serum ($85)', short: 'Crystal Retinal', ph: '5.9', tag: 'Retinal' },
          { id: 'paulas-choice-2-bha', label: 'Paula\\'s Choice 2% BHA Liquid Exfoliant ($35)', short: 'Paula\\'s 2% BHA', ph: '3.5', tag: '2% BHA' },
          { id: 'to-buffet-copper-peptides', label: 'The Ordinary Multi-Peptide + Copper Serum ($32)', short: 'Copper Peptides', ph: '6.2', tag: 'GHK-Cu' },
          { id: 'differin-adapalene-01', label: 'Differin Adapalene Gel 0.1% ($16)', short: 'Differin 0.1%', ph: '5.5', tag: '0.1% Gel' },
          { id: 'biologique-recherche-p50-1970', label: 'Biologique Recherche Lotion P50 1970 ($115)', short: 'Lotion P50', ph: '3.0', tag: 'pH 3.0' },
          { id: 'finacea-15-azelaic', label: 'Finacea 15% Azelaic Acid Gel ($55)', short: 'Finacea 15%', ph: '4.9', tag: '15% AzA' }
        ],
        timing: '9:30 PM · Nights 1 & 2 Only (Dry skin buffer · Never mix with AM acids)'
      }
    ];

    function renderMiniVesselSvg(vesselType, tagText, hasClash, isEmpty) {
      var stroke = isEmpty ? '#9E968E' : (hasClash ? '#7A2332' : '#524A43');
      var fill = isEmpty ? 'transparent' : (hasClash ? '#F5E1E4' : '#FAF6F0');
      var accent = hasClash ? '#7A2332' : '#264C3C';
      if (vesselType === 'mist') {
        return '<svg width="34" height="42" viewBox="0 0 38 46" fill="none" aria-hidden="true"><rect x="14" y="3" width="10" height="6" rx="1" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.2"/><path d="M12 9H26L28 14V40C28 41.1 27.1 42 26 42H12C10.9 42 10 41.1 10 40V14L12 9Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="12" y="19" width="14" height="14" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="0.8"/><text x="19" y="28" text-anchor="middle" font-size="6.2" font-family="monospace" font-weight="700" fill="' + stroke + '">' + tagText + '</text></svg>';
      }
      if (vesselType === 'jar') {
        return '<svg width="36" height="42" viewBox="0 0 40 46" fill="none" aria-hidden="true"><rect x="8" y="12" width="24" height="6" rx="1.5" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.2"/><rect x="6" y="18" width="28" height="22" rx="3" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="10" y="23" width="20" height="11" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="0.8"/><text x="20" y="30.5" text-anchor="middle" font-size="6.2" font-family="monospace" font-weight="700" fill="' + stroke + '">' + tagText + '</text></svg>';
      }
      if (vesselType === 'tube') {
        return '<svg width="34" height="42" viewBox="0 0 38 46" fill="none" aria-hidden="true"><path d="M10 6H28L25 33H13L10 6Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="15" y="33" width="8" height="7" rx="1" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.2"/><text x="19" y="22" text-anchor="middle" font-size="6.2" font-family="monospace" font-weight="700" fill="' + accent + '">' + tagText + '</text></svg>';
      }
      return '<svg width="34" height="42" viewBox="0 0 38 46" fill="none" aria-hidden="true"><path d="M16 7C16 5 17.3 3.5 19 3.5C20.7 3.5 22 5 22 7V10H16V7Z" fill="#D9BDC2" stroke="' + stroke + '" stroke-width="1.2"/><rect x="14" y="10" width="10" height="3.5" fill="#E6E0D6" stroke="' + stroke + '" stroke-width="1.1"/><path d="M12 13.5H26L28 18.5V40C28 41.1 27.1 42 26 42H12C10.9 42 10 41.1 10 40V18.5L12 13.5Z" fill="' + fill + '" stroke="' + stroke + '" stroke-width="1.3"/><rect x="12" y="21" width="14" height="14" fill="#FFFFFF" stroke="' + stroke + '" stroke-width="0.8"/><text x="19" y="30" text-anchor="middle" font-size="6" font-family="monospace" font-weight="700" fill="' + stroke + '">' + tagText + '</text></svg>';
    }

    function loadVanityState() {
      try {
        var raw = localStorage.getItem(VANITY_STORAGE_KEY) || localStorage.getItem('dermlogic_vanity_bag_v1');
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object' && Array.isArray(parsed.slotSelections)) {
            if (!parsed.dossierTab) parsed.dossierTab = 'slots';
            if (!parsed.passSide) parsed.passSide = 'am';
            return parsed;
          }
        }
      } catch (_) {}
      var now = Date.now();
      return {
        bagId: 'DL-' + String(1000 + (now % 8999)),
        holdExpiresAt: now + 86400000,
        undertone: 'neutral_ivory',
        finish: 'velvet_satin',
        activeSlotIdx: 3,
        dossierTab: 'slots',
        passSide: 'am',
        slotSelections: [0, 0, 0, 0, 0],
        customSlotBottle: {},
        customName: ''
      };
    }

    function saveVanityState(st) {
      try {
        localStorage.setItem(VANITY_STORAGE_KEY, JSON.stringify(st));
        localStorage.setItem('dermlogic_vanity_bag_v1', JSON.stringify(st));
      } catch (_) {}
    }

    window.__dlVanityState = loadVanityState();

    function getBottleForSlot(st, slotIdx) {
      var sel = st.slotSelections[slotIdx];
      if (sel === -1 || sel === null || typeof sel === 'undefined') return null;
      var slot = SLOT_OPTIONS[slotIdx];
      if (st.customSlotBottle && st.customSlotBottle[slotIdx]) {
        return st.customSlotBottle[slotIdx];
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
        clashes.push({
          slots: [0, 1],
          severity: 'CRITICAL',
          title: 'Benzoyl Peroxide (Slot 01) Oxidizes Vitamin C (Slot 02)',
          detail: 'Residual Benzoyl Peroxide oxidizes L-Ascorbic Acid on contact before it can enter the skin.',
          fixLabel: 'Swap Slot 01 to Anua Heartleaf 77% Soothing Toner',
          fixFn: function() { st.slotSelections[0] = 1; delete st.customSlotBottle[0]; }
        });
      }
      // Clash 2: Glycolic Acid 7% in AM Prep (Slot 01) + Pure Vitamin C or Copper Peptides in AM Active (Slot 02)
      if (b0 && b1 && b0.id === 'to-glycolic-acid-7' && (b1.id === 'skinceuticals-ce-ferulic' || b1.id === 'to-buffet-copper-peptides')) {
        clashes.push({
          slots: [0, 1],
          severity: 'CRITICAL',
          title: b1.id === 'to-buffet-copper-peptides'
            ? 'Glycolic Acid 7% (pH 3.6) Hydrolyzes Copper Peptides (Slot 02)'
            : 'Double Low-pH Acid Stack: Glycolic 7% + 15% Vitamin C',
          detail: b1.id === 'to-buffet-copper-peptides'
            ? 'Direct AHA acid breaks the fragile GHK-Cu copper tripeptide bond and triggers redness.'
            : 'Stacking pH 3.6 Glycolic Acid under pH 3.2 L-Ascorbic Acid in the morning strips the stratum corneum.',
          fixLabel: 'Swap Slot 01 to Tower 28 SOS Mist',
          fixFn: function() { st.slotSelections[0] = 0; delete st.customSlotBottle[0]; }
        });
      }
      // Clash 3: Vitamin C in Slot 02 + Copper Peptides in Slot 05 if layered without AM/PM separation or if Copper is in Slot 02 + Acid in Slot 05
      if (b1 && b4 && b1.id === 'to-buffet-copper-peptides' && (b4.id === 'paulas-choice-2-bha' || b4.id === 'biologique-recherche-p50-1970' || b4.id === 'rx-tretinoin-005')) {
        clashes.push({
          slots: [1, 4],
          severity: 'MODERATE',
          title: 'High-Active Turnover Load: Copper Peptides + Strong PM Acid/Retinoid',
          detail: 'Keep Copper Peptides strictly separated from exfoliating acids and buffer your evening retinoid with Slot 03 Ceramide Cream.',
          fixLabel: 'Set Slot 03 to Aestura 365 Ceramide Buffer',
          fixFn: function() { st.slotSelections[2] = 0; delete st.customSlotBottle[2]; st.slotSelections[1] = 2; delete st.customSlotBottle[1]; }
        });
      }
      // Clash 4: Unbuffered Rx Tretinoin or Lotion P50 when Slot 03 Barrier Seal is empty
      if (b4 && !b2 && (b4.id === 'rx-tretinoin-005' || b4.id === 'biologique-recherche-p50-1970')) {
        clashes.push({
          slots: [2, 4],
          severity: 'CRITICAL',
          title: 'Missing Slot 03 Barrier Cushion for ' + b4.short,
          detail: 'Applying ' + b4.short + ' without a 3:1:1 Ceramide or Panthenol barrier seal in Slot 03 causes flaking around the mouth and nose.',
          fixLabel: 'Restore Aestura 365 Ceramide Cream to Slot 03',
          fixFn: function() { st.slotSelections[2] = 0; delete st.customSlotBottle[2]; }
        });
      }
      return clashes;
    }

    function mapProductIdToSlot(prodId, prodName, prodCat) {
      var hay = ((prodId || '') + ' ' + (prodName || '') + ' ' + (prodCat || '')).toLowerCase();
      for (var sIdx = 0; sIdx < SLOT_OPTIONS.length; sIdx++) {
        var foundIdx = SLOT_OPTIONS[sIdx].choices.findIndex(function(c) { return c.id === prodId; });
        if (foundIdx !== -1) return { slotIdx: sIdx, choiceIdx: foundIdx };
      }
      if (/spf|sun|uv/.test(hay)) return { slotIdx: 3, choiceIdx: -2 };
      if (/tretinoin|retinal|retinol|adapalene|differin|bha|p50|babyfacial|peel/.test(hay)) return { slotIdx: 4, choiceIdx: -2 };
      if (/wash|cleanse|micellar|mist|spray|toner|glycolic/.test(hay)) return { slotIdx: 0, choiceIdx: -2 };
      if (/cream|moistur|baume|angel|atobarrier|lotion|snail|urea|lipid/.test(hay)) return { slotIdx: 2, choiceIdx: -2 };
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
        var cleanShort = String(prodTitle || prodId).replace(/\s*\([^)]*\)/g, '').slice(0, 18);
        st.customSlotBottle[sIdx] = {
          id: prodId,
          label: prodTitle + (prodPrice ? ' ($' + prodPrice + ')' : ''),
          short: cleanShort,
          ph: '5.5',
          tag: 'Custom'
        };
      }
      st.activeSlotIdx = sIdx;
      saveVanityState(st);
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
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
    };

    window.__dlFlipPassSide = function(side) {
      window.__dlVanityState.passSide = side === 'pm' ? 'pm' : 'am';
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    function formatHoldRemaining(expiresAt) {
      var diffMs = Math.max(60000, (expiresAt || (Date.now() + 86400000)) - Date.now());
      var hrs = Math.floor(diffMs / 3600000);
      var mins = Math.floor((diffMs % 3600000) / 60000);
      return 'Reserved for ' + hrs + 'h ' + mins + 'm';
    }

    window.__dlRenderVanityDrawer = function() {
      var st = window.__dlVanityState;
      var uMeta = UNDERTONE_META[st.undertone] || UNDERTONE_META.neutral_ivory;
      var fMeta = FINISH_META[st.finish] || FINISH_META.velvet_satin;
      var clashes = computeBagClashes(st);
      var filledCount = [0, 1, 2, 3, 4].filter(function(i) { return Boolean(getBottleForSlot(st, i)); }).length;

      var countEl = document.getElementById('dl-header-vanity-count');
      if (countEl) countEl.textContent = filledCount + '/5';

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
          clashBannerTxt.innerHTML = '<strong style="color:var(--berry-clash);">Bag Conflict Detected:</strong> ' + clashes[0].title;
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

      var trayLabel = document.getElementById('dl-tray-filled-label');
      if (trayLabel) trayLabel.textContent = filledCount + '/5 Vessels · ' + (clashes.length > 0 ? (clashes.length + ' Clash') : 'pH Safe');

      document.querySelectorAll('#dl-undertone-swatches button[data-undertone]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-undertone') === st.undertone);
      });
      document.querySelectorAll('#dl-finish-swatches button[data-finish]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-finish') === st.finish);
      });

      var activeIdx = typeof st.activeSlotIdx === 'number' ? st.activeSlotIdx : 3;
      var uParentBox = document.getElementById('dl-undertone-parent-box');
      if (uParentBox) uParentBox.style.display = (activeIdx === 3) ? 'flex' : 'none';

      // Render Option 3 Visual Bottle Tray
      var trayEl = document.getElementById('dl-vanity-visual-tray');
      if (trayEl) {
        trayEl.innerHTML = SLOT_OPTIONS.map(function(slot, idx) {
          var b = getBottleForSlot(st, idx);
          var hasClash = clashes.some(function(c) { return c.slots.indexOf(idx) !== -1; });
          var isSel = idx === activeIdx && (st.dossierTab || 'slots') === 'slots';
          var cls = 'dl-tray-vessel-btn' + (isSel ? ' active' : '') + (hasClash ? ' has-clash' : '') + (!b ? ' is-empty' : '');
          var svg = renderMiniVesselSvg(slot.vesselType, b ? b.tag : '+ADD', hasClash, !b);
          return '<button type="button" id="dl-vanity-slot-header-' + idx + '" class="' + cls + '" onclick="window.__dlSetDossierTab(\\'slots\\');window.__dlSelectVanitySlot(' + idx + ')" title="' + slot.slotNum + ': ' + (b ? b.label : 'Empty Slot') + '">'
            + '<span class="mono" style="font-size:0.62rem;font-weight:700;color:' + (hasClash ? 'var(--berry-clash)' : 'var(--rose-brand)') + ';">' + slot.shortSlot + '</span>'
            + svg
            + '<span style="font-size:0.66rem;font-weight:600;color:var(--text-primary);max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + (b ? b.short : 'Empty · Tap') + '</span>'
          + '</button>';
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
          var extraNote = idx === 3
            ? (uMeta.spfNote + ' ' + fMeta.prepRule)
            : (slotHasClash
              ? ('<strong style="color:var(--berry-clash);">Clash Alert:</strong> ' + slotHasClash.detail)
              : ('When to apply: ' + slot.timing + '. Zero pH cancellation with your other slots.'));

          var chipsHtml = slot.choices.map(function(ch, cIdx) {
            var isSel = currentBottle && currentBottle.id === ch.id;
            return '<button type="button" class="mono" onclick="window.__dlPickSlotBottle(' + idx + ',' + cIdx + ')" style="padding:5px 10px;font-size:0.74rem;cursor:pointer;border:1px solid ' + (isSel ? 'var(--rose-brand)' : 'var(--border-hairline)') + ';background:' + (isSel ? 'var(--rose-pill-bg)' : 'var(--bg-surface)') + ';color:' + (isSel ? 'var(--rose-brand)' : 'var(--text-secondary)') + ';font-weight:' + (isSel ? '600' : '400') + ';">' + (isSel ? '✓ ' : '+ ') + ch.label.split(' ($')[0] + '</button>';
          }).join('');

          var prevIdx = (idx + 4) % 5;
          var nextIdx = (idx + 1) % 5;
          var nextBtnHtml = idx < 4
            ? '<button type="button" class="mono" onclick="window.__dlSelectVanitySlot(' + nextIdx + ')" style="padding:5px 11px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.74rem;font-weight:600;cursor:pointer;white-space:nowrap;">Next Bottle (0' + (nextIdx + 1) + ') &rarr;</button>'
            : '<button type="button" class="mono" onclick="window.__dlSetDossierTab(\\'pass\\')" style="padding:5px 11px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.74rem;font-weight:600;cursor:pointer;white-space:nowrap;">Preview 9:16 Card &rarr;</button>';

          return '<div class="dl-vanity-slot-card ' + (isOpen ? 'active ' : '') + (slotHasClash ? 'clash-slot' : '') + '" id="dl-vanity-slot-card-' + idx + '" style="display:' + (isOpen ? 'block' : 'none') + ';padding:14px 16px;">'
            + '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">'
              + '<div style="min-width:0;">'
                + '<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">'
                  + '<span class="mono" style="font-size:0.72rem;font-weight:700;color:' + (slotHasClash ? 'var(--berry-clash)' : 'var(--rose-brand)') + ';">SPOTLIGHT &middot; ' + slot.slotNum + (slotHasClash ? ' &middot; CLASH' : '') + '</span>'
                  + '<span style="font-size:0.76rem;color:var(--text-secondary);">' + slot.role + '</span>'
                + '</div>'
                + '<div class="serif-display" style="font-size:1.18rem;font-weight:400;color:' + (currentBottle ? 'var(--text-primary)' : 'var(--text-muted)') + ';margin-top:3px;">' + (currentBottle ? currentBottle.label : 'Slot Empty &middot; Tap a Bottle Below') + '</div>'
              + '</div>'
              + '<button type="button" class="mono" onclick="window.__dlSelectVanitySlot(' + prevIdx + ')" style="padding:3px 8px;background:var(--bg-oat);color:var(--text-secondary);border:none;font-size:0.72rem;cursor:pointer;flex-shrink:0;">&larr; Prev</button>'
            + '</div>'
            + '<div id="dl-vanity-slot-body-' + idx + '" style="display:' + (isOpen ? 'block' : 'none') + ';border-top:1px solid var(--border-hairline);padding-top:10px;">'
              + '<div style="font-size:0.82rem;color:var(--text-secondary);line-height:1.48;margin-bottom:10px;">' + extraNote + '</div>'
              + '<div class="mono" style="font-size:0.72rem;color:var(--text-muted);margin-bottom:6px;">Swap or try another bottle in this slot:</div>'
              + '<div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;">' + chipsHtml + '</div>'
              + '<div class="mono" style="padding:7px 10px;background:var(--bg-oat);font-size:0.74rem;color:var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:8px;">'
                + (currentBottle
                  ? '<button type="button" class="mono" onclick="window.__dlRemoveSlotBottle(' + idx + ')" style="background:transparent;border:none;color:var(--text-muted);text-decoration:underline;cursor:pointer;font-size:0.74rem;">Remove from Slot &times;</button>'
                  : '<span>Tap a bottle chip above</span>')
                + nextBtnHtml
              + '</div>'
            + '</div>'
          + '</div>';
        }).join('');
      }

      // Render Tab 02: Bag Clashes & pH Audit
      var clashPanel = document.getElementById('dl-dossier-panel-clashes');
      if (clashPanel) {
        if (clashes.length === 0) {
          clashPanel.innerHTML = '<div style="padding:14px;background:var(--sage-bg);border:1px solid var(--sage-border);color:var(--sage-safe);font-size:0.82rem;line-height:1.45;">'
            + '<strong class="serif-display" style="font-size:1.08rem;display:block;margin-bottom:4px;">Zero Active Clashes in Your 5-Slot Vanity Bag</strong>'
            + '<div>Your morning antioxidant (Slot 02) is safely separated from your evening renewal active (Slot 05), and your Slot 03 Ceramide cushion buffers barrier pH.</div>'
            + '<button type="button" class="mono" onclick="window.__dlInjectSampleClash()" style="margin-top:8px;padding:5px 10px;background:var(--bg-surface);color:var(--rose-brand);border:1px solid var(--rose-brand);font-size:0.74rem;font-weight:600;cursor:pointer;">Simulate a Glycolic + Copper Peptide Clash &rarr;</button>'
            + '</div>';
        } else {
          clashPanel.innerHTML = clashes.map(function(c) {
            return '<div style="padding:11px 12px;background:var(--berry-bg);border:1px solid var(--berry-border);border-left:3px solid var(--berry-clash);font-size:0.78rem;line-height:1.4;">'
              + '<div class="mono" style="font-size:0.7rem;font-weight:700;color:var(--berry-clash);text-transform:uppercase;">' + c.severity + ' BAG CLASH · SLOTS 0' + (c.slots[0] + 1) + ' + 0' + (c.slots[1] + 1) + '</div>'
              + '<div class="serif-display" style="font-size:1.02rem;font-weight:500;color:var(--text-primary);margin:2px 0 4px;">' + c.title + '</div>'
              + '<div style="color:var(--text-secondary);margin-bottom:7px;">' + c.detail + '</div>'
              + '<button type="button" class="mono" onclick="window.__dlAutoFixBagClashes()" style="padding:5px 10px;background:var(--rose-brand);color:var(--accent-ink);border:none;font-size:0.74rem;font-weight:700;cursor:pointer;">✓ ' + c.fixLabel + '</button>'
              + '</div>';
          }).join('');
        }
      }

      // Render Tab 03: 4-Night Skin Cycling Calendar
      var cyclePanel = document.getElementById('dl-dossier-panel-cycle');
      if (cyclePanel) {
        var b2 = getBottleForSlot(st, 2) || SLOT_OPTIONS[2].choices[0];
        var b4 = getBottleForSlot(st, 4) || SLOT_OPTIONS[4].choices[0];
        cyclePanel.innerHTML = '<div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-hairline);display:flex;flex-direction:column;gap:6px;">'
          + '<div class="mono" style="font-size:0.72rem;font-weight:700;color:var(--rose-brand);text-transform:uppercase;">4-Night Bedtime Skin-Cycling Schedule (9:30 PM)</div>'
          + '<div style="padding:7px 9px;background:var(--bg-canvas);border-left:3px solid var(--rose-brand);font-size:0.77rem;"><strong>Night 1 (Active Renewal):</strong> Cleanse + Dry 10m + <strong>' + b4.short + '</strong> + ' + b2.short + '</div>'
          + '<div style="padding:7px 9px;background:var(--bg-canvas);border-left:3px solid var(--sage-safe);font-size:0.77rem;"><strong>Night 2 (Barrier Recovery):</strong> Pause Slot 05 actives · Flood skin with <strong>' + b2.short + '</strong></div>'
          + '<div style="padding:7px 9px;background:var(--bg-canvas);border-left:3px solid var(--rose-brand);font-size:0.77rem;"><strong>Night 3 (Second Renewal):</strong> Re-apply pea-sized <strong>' + b4.short + '</strong> buffered over cream</div>'
          + '<div style="padding:7px 9px;background:var(--bg-canvas);border-left:3px solid var(--sage-safe);font-size:0.77rem;"><strong>Night 4 (Deep Lipid Cushion):</strong> 3:1:1 Ceramide recovery with <strong>' + b2.short + '</strong> before repeating cycle</div>'
          + '</div>';
      }

      // Render Tab 04: 2-Sided 9:16 Lock-Screen Flip Card (Option 3)
      var passPanel = document.getElementById('dl-dossier-panel-pass');
      if (passPanel) {
        var side = st.passSide === 'pm' ? 'pm' : 'am';
        var b0 = getBottleForSlot(st, 0) || SLOT_OPTIONS[0].choices[0];
        var b1 = getBottleForSlot(st, 1) || SLOT_OPTIONS[1].choices[0];
        var b2p = getBottleForSlot(st, 2) || SLOT_OPTIONS[2].choices[0];
        var b3 = getBottleForSlot(st, 3) || SLOT_OPTIONS[3].choices[0];
        var b4p = getBottleForSlot(st, 4) || SLOT_OPTIONS[4].choices[0];
        passPanel.innerHTML = '<div style="background:#181412;color:#F4EFE8;padding:12px 14px;display:flex;flex-direction:column;gap:8px;">'
          + '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">'
            + '<span class="mono" style="font-size:0.7rem;color:#C9A45A;font-weight:700;">2-SIDED 9:16 LOCK-SCREEN PASS</span>'
            + '<div style="display:inline-flex;background:#2A231F;padding:2px;gap:2px;">'
              + '<button type="button" class="mono" onclick="window.__dlFlipPassSide(\\'am\\')" style="padding:4px 8px;font-size:0.7rem;border:none;cursor:pointer;background:' + (side === 'am' ? 'var(--rose-brand)' : 'transparent') + ';color:#F4EFE8;font-weight:600;">☀ Side A · AM</button>'
              + '<button type="button" class="mono" onclick="window.__dlFlipPassSide(\\'pm\\')" style="padding:4px 8px;font-size:0.7rem;border:none;cursor:pointer;background:' + (side === 'pm' ? 'var(--rose-brand)' : 'transparent') + ';color:#F4EFE8;font-weight:600;">☾ Side B · PM</button>'
            + '</div>'
          + '</div>'
          + (side === 'am'
            ? '<div style="background:#FBF8F4;color:#181412;padding:10px 12px;display:flex;flex-direction:column;gap:5px;">'
                + '<div class="mono" style="font-size:0.68rem;color:#7A2332;font-weight:700;">SIDE A · 7:30 AM MORNING SHIELD (' + uMeta.label.toUpperCase() + ')</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:#FFFFFF;border:1px solid #E2D9CD;">1. <strong>' + b0.short + '</strong> · Wait 45s</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:#FFFFFF;border:1px solid #E2D9CD;">2. <strong>' + b1.short + '</strong> · Wait 60s</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:#FFFFFF;border:1px solid #E2D9CD;">3. <strong>' + b2p.short + '</strong> · Wait 60s</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:#FFFFFF;border:1px solid #E2D9CD;">4. <strong>' + b3.short + '</strong> · Zero Cast</div>'
              + '</div>'
            : '<div style="background:#231E1A;color:#F4EFE8;padding:10px 12px;border:1px solid #423930;display:flex;flex-direction:column;gap:5px;">'
                + '<div class="mono" style="font-size:0.68rem;color:#C9A45A;font-weight:700;">SIDE B · 9:30 PM BEDTIME RENEWAL &amp; BUFFER</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:rgba(255,255,255,0.06);">1. Gentle Evening Cleanse · Pat 100% Dry</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:rgba(255,255,255,0.06);">2. <strong>' + b4p.short + '</strong> (Nights 1 &amp; 3 Only)</div>'
                + '<div style="font-size:0.76rem;padding:4px 7px;background:rgba(255,255,255,0.06);">3. <strong>' + b2p.short + '</strong> (Every Night Seal)</div>'
              + '</div>')
          + '</div>';
      }
    };

    // Inject "+ Add to Vanity Bag" buttons onto every bottle card across /, /celebrity/*, /bottle/*, /concern/*
    window.__dlRefreshPageAddButtons = function() {
      var st = window.__dlVanityState;
      var activeIds = [0, 1, 2, 3, 4].map(function(i) {
        var b = getBottleForSlot(st, i);
        return b ? b.id : null;
      }).filter(Boolean);

      document.querySelectorAll('a[href*="/api/affiliate?product="], a[data-sovrn-beacon*="product="]').forEach(function(affLink) {
        var href = (affLink.getAttribute('href') || '') + ' ' + (affLink.getAttribute('data-sovrn-beacon') || '');
        var m = href.match(/product=([^&\s"']+)/);
        if (!m) return;
        var prodId = decodeURIComponent(m[1]);
        var card = affLink.closest('.porcelain-vessel-core, .conflict-card') || affLink.parentElement;
        var titleEl = (card && !card.classList.contains('conflict-card')) ? card.querySelector('a[href^="/bottle/"], h1, h3') : null;
        var prodTitle = titleEl ? titleEl.textContent.trim() : (affLink.textContent.trim() || prodId);
        var btnId = 'dl-bag-btn-' + prodId;
        var existing = (affLink.parentElement ? affLink.parentElement.querySelector('button[data-dl-bag-prod="' + prodId + '"]') : null) || (card ? card.querySelector('button[data-dl-bag-prod="' + prodId + '"]') : null);
        if (!existing) {
          existing = document.createElement('button');
          existing.type = 'button';
          existing.id = btnId;
          existing.setAttribute('data-dl-bag-prod', prodId);
          existing.setAttribute('data-dl-bag-title', prodTitle);
          existing.className = 'dl-add-to-bag-btn mono';
          existing.onclick = function() { window.__dlToggleBottleInBag(prodId, prodTitle, '', existing); };
          if (affLink.parentElement) {
            affLink.parentElement.appendChild(existing);
          }
        }
      });

      document.querySelectorAll('button[data-dl-bag-prod]').forEach(function(btn) {
        var prodId = btn.getAttribute('data-dl-bag-prod') || '';
        if (!prodId) return;
        var prodTitle = btn.getAttribute('data-dl-bag-title') || prodId;
        var inBag = activeIds.indexOf(prodId) !== -1;
        var mapped = mapProductIdToSlot(prodId, prodTitle, '');
        var slotLabel = 'Slot 0' + (mapped.slotIdx + 1);
        btn.className = 'dl-add-to-bag-btn mono' + (inBag ? ' in-bag' : '');
        btn.innerHTML = inBag
          ? ('✓ In Vanity Bag (' + slotLabel + ') &times;')
          : ('+ Add to Vanity Bag (' + slotLabel + ')');
      });
    };

    window.__dlOpenVanityDrawer = function(reason) {
      var drawer = document.getElementById('dl-atelier-vanity-drawer');
      if (!drawer) return;
      var toast = document.getElementById('dl-vanity-toast');
      if (toast) toast.style.display = 'none';
      var exitAlert = document.getElementById('dl-vanity-exit-alert');
      if (exitAlert) {
        exitAlert.style.display = (reason === 'exit_hold') ? 'block' : 'none';
      }
      window.__dlRenderVanityDrawer();
      drawer.style.display = 'flex';
      if (window.__ebLogEvent) {
        window.__ebLogEvent('view_paywall', { target: 'atelier_vanity_drawer_' + (reason || 'open') });
      }
    };

    window.__dlCloseVanityDrawer = function() {
      var drawer = document.getElementById('dl-atelier-vanity-drawer');
      if (drawer) drawer.style.display = 'none';
    };

    window.__dlSelectVanitySlot = function(idx) {
      window.__dlVanityState.activeSlotIdx = idx;
      window.__dlVanityState.dossierTab = 'slots';
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    window.__dlPickSlotBottle = function(slotIdx, choiceIdx) {
      window.__dlVanityState.slotSelections[slotIdx] = choiceIdx;
      if (window.__dlVanityState.customSlotBottle) delete window.__dlVanityState.customSlotBottle[slotIdx];
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
      window.__dlRefreshPageAddButtons();
    };

    window.__dlSetUndertone = function(undertone) {
      window.__dlVanityState.undertone = undertone || 'neutral_ivory';
      window.__dlVanityState.activeSlotIdx = 3;
      window.__dlVanityState.dossierTab = 'slots';
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    window.__dlSetFinish = function(finish) {
      window.__dlVanityState.finish = finish || 'velvet_satin';
      window.__dlVanityState.activeSlotIdx = 3;
      window.__dlVanityState.dossierTab = 'slots';
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    window.__dlSendVanityHoldEmail = function(ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      var emIn = document.getElementById('dl-vanity-hold-email');
      var email = emIn && emIn.value ? emIn.value.trim() : '';
      if (!email) return false;
      var statusEl = document.getElementById('dl-vanity-email-status');
      var btnEl = document.getElementById('dl-vanity-email-btn');
      if (btnEl) btnEl.textContent = 'Saved 24h!';
      if (statusEl) {
        statusEl.style.display = 'block';
        statusEl.textContent = '24-Hour Restore Link sent to ' + email + ' (Bag #' + (window.__dlVanityState.bagId || 'DL-4829') + ').';
      }
      fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'atelier_vanity_24h_hold' })
      }).catch(function() {});
      return false;
    };

    var exitHoldShown = false;
    var enteredAt = Date.now();
    document.addEventListener('mouseleave', function(e) {
      if (exitHoldShown || window.__ebIsUnlocked || navigator.webdriver) return;
      if (e.clientY <= 6 && (Date.now() - enteredAt) > 12000) {
        exitHoldShown = true;
        window.__dlOpenVanityDrawer('exit_hold');
      }
    }, { passive: true });

    document.addEventListener('change', function(e) {
      if (e.target && e.target.name === 'routineProduct') {
        var prodId = e.target.value;
        var lbl = e.target.closest('.prod-check-item');
        var titleEl = lbl ? lbl.querySelector('strong') : null;
        var title = titleEl ? titleEl.textContent.trim() : prodId;
        if (e.target.checked) {
          var mapped = mapProductIdToSlot(prodId, title, '');
          if (mapped.choiceIdx >= 0) {
            window.__dlVanityState.slotSelections[mapped.slotIdx] = mapped.choiceIdx;
          }
          saveVanityState(window.__dlVanityState);
          if (!navigator.webdriver || window.__dlAllowToastInTest) {
            showVanityToast('Added ' + title + ' to Vanity Bag (Slot 0' + (mapped.slotIdx + 1) + ')');
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
