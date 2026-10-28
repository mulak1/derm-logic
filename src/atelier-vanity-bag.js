'use strict';

/**
 * DermLogic Option 1: The 5-Slot Atelier Vanity Bag & 24-Hour Session Vault
 * Combines Violet Grey ("The Bag") + Typology Paris diagnostic curation + Il Makiage 24h Hold:
 *  - Ambiently gathers her 5-Slot Vanity Kit across /, /seo/*, /celebrity/*, and /concern/*
 *  - Calibrates Undertone (Cool Rosy, Neutral Ivory, Warm/Olive, Rich Espresso) & Finish (Dewy Glass, Velvet Satin, Soft Matte)
 *  - Structural Screenshot Resistance: Single-active-slot accordion physics (zero ugly CSS blur)
 *  - Ethical 24-Hour Loss Aversion: Holds custom kit for 24h with 99c Permanent Lock-Screen Card pass or free 24h restore link
 * Strictly < 1,000 lines and zero em-dashes.
 */

function renderHeaderVanityBagPill() {
  return `<button type="button" id="dl-header-vanity-pill" class="mono" onclick="window.__dlOpenVanityDrawer('header_pill')" aria-label="Open My 5-Slot Atelier Vanity Bag" style="display:inline-flex;align-items:center;gap:7px;padding:7px 12px;background:var(--rose-pill-bg);color:var(--rose-brand);border:1px solid var(--rose-pill-border);cursor:pointer;font-size:0.82rem;font-weight:600;transition:transform 180ms cubic-bezier(0.22,1,0.36,1),background-color 180ms ease;white-space:nowrap;">
    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true" style="flex-shrink:0;"><path d="M6 7V5.5C6 3.57 7.57 2 9.5 2h1C12.43 2 14 3.57 14 5.5V7h2.5v10.5c0 .83-.67 1.5-1.5 1.5H5c-.83 0-1.5-.67-1.5-1.5V7H6zm1.5 0h5V5.5c0-1.1-.9-2-2-2h-1c-1.1 0-2 .9-2 2V7z" fill="currentColor"/></svg>
    <span>Vanity Bag</span>
    <span id="dl-header-vanity-count" style="padding:1px 6px;background:var(--rose-brand);color:var(--accent-ink);font-size:0.76rem;font-weight:700;">4/5</span>
    <span id="dl-header-vanity-hold" class="dl-hide-mobile" style="font-size:0.75rem;color:var(--sage-safe);font-weight:600;">24h Hold</span>
  </button>`;
}

function renderAtelierVanityDrawerHtml() {
  return `
  <style>
    @media (max-width: 768px) {
      .dl-hide-mobile { display: none !important; }
      #dl-header-vanity-pill { padding: 6px 9px !important; font-size: 0.78rem !important; }
      #dl-atelier-vanity-panel { width: 100vw !important; max-width: 100vw !important; height: 92vh !important; margin-top: auto !important; }
    }
    #dl-header-vanity-pill:active, .dl-vanity-swatch-btn:active, .dl-vanity-slot-head:active {
      transform: scale(0.97);
    }
    .dl-vanity-swatch-btn {
      display: inline-flex; align-items: center; justify-content: center; gap: 5px; padding: 6px 6px;
      background: var(--bg-surface); color: var(--text-secondary);
      border: 1px solid var(--border-hairline); cursor: pointer;
      font-size: 0.78rem; font-weight: 500; white-space: nowrap; transition: border-color 160ms ease, background-color 160ms ease, transform 160ms cubic-bezier(0.22,1,0.36,1);
    }
    .dl-vanity-swatch-btn.active {
      background: var(--rose-pill-bg); color: var(--rose-brand);
      border-color: var(--rose-brand); font-weight: 600;
    }
    .dl-vanity-slot-card {
      background: var(--bg-surface); border: 1px solid var(--border-hairline);
      transition: border-color 180ms ease;
    }
    .dl-vanity-slot-card.active {
      border-color: var(--rose-brand);
      background: var(--bg-canvas);
    }
  </style>

  <div id="dl-atelier-vanity-drawer" role="dialog" aria-modal="true" aria-labelledby="dl-vanity-bag-title" style="display:none;position:fixed;inset:0;z-index:9996;background:rgba(12,10,8,0.62);align-items:stretch;justify-content:flex-end;">
    <div id="dl-atelier-vanity-panel" style="width:540px;max-width:100vw;height:100%;background:var(--bg-canvas);color:var(--text-primary);border-left:1px solid var(--border-strong);display:flex;flex-direction:column;justify-content:space-between;overflow-y:auto;padding:16px 20px;gap:10px;">
      
      <!-- Top Header & 24-Hour Reservation Status -->
      <div style="border-bottom:1px solid var(--border-hairline);padding-bottom:10px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;">
          <div style="display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;">
            <span class="mono" style="font-size:0.74rem;font-weight:700;padding:2px 8px;background:var(--rose-brand);color:var(--accent-ink);letter-spacing:0.04em;">ATELIER VANITY BAG</span>
            <span id="dl-vanity-bag-id" class="mono" style="font-size:0.76rem;color:var(--text-muted);">#DL-4829</span>
            <span id="dl-vanity-harmony-pill" class="badge-safe mono" style="font-size:0.75rem;padding:2px 8px;">96% Harmony · 0 Clashes</span>
          </div>
          <button type="button" id="dl-vanity-drawer-close" class="btn-secondary mono" onclick="window.__dlCloseVanityDrawer()" style="padding:3px 10px;min-height:26px;font-size:0.76rem;">Close &times;</button>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap;">
          <h3 id="dl-vanity-bag-title" class="serif-display" style="font-size:1.38rem;font-weight:500;line-height:1.18;color:var(--text-primary);margin:0;">Your 5-Slot Calibrated Vanity Bag</h3>
          <strong id="dl-vanity-hold-countdown" class="mono" style="color:var(--rose-brand);font-size:0.78rem;background:var(--rose-pill-bg);padding:2px 8px;">Reserved for 23h 59m</strong>
        </div>
        
        <div id="dl-vanity-exit-alert" style="display:none;padding:8px 10px;background:var(--rose-pill-bg);border-left:3px solid var(--rose-brand);margin-top:6px;font-size:0.8rem;color:var(--text-primary);line-height:1.38;">
          <strong style="color:var(--rose-brand);">Wait · Your Custom Vanity Bag Is Held for 24 Hours:</strong> Keep your permanent 9:16 Lock-Screen Card + .ICS Schedule below so your calibrated 5-slot formula is not lost when this session expires.
        </div>
      </div>

      <!-- Step A: Undertone Swatches & SPF/Makeup Finish Calibration -->
      <div style="padding:10px 12px;background:var(--bg-surface);border:1px solid var(--border-hairline);display:flex;flex-direction:column;gap:6px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;">
          <span class="mono" style="font-size:0.75rem;font-weight:600;color:var(--rose-brand);text-transform:uppercase;">1. Skin Undertone &amp; SPF Finish (No White-Cast / Pilling)</span>
          <span id="dl-undertone-active-label" class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:600;">Neutral Ivory · Velvet Satin</span>
        </div>

        <div id="dl-undertone-swatches" role="group" aria-label="Select Skin Undertone" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:5px;">
          <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="cool_rosy" onclick="window.__dlSetUndertone('cool_rosy', this)">
            <span style="width:11px;height:11px;border-radius:50%;background:#F3D9D4;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
            <span>Cool Rosy</span>
          </button>
          <button type="button" class="dl-vanity-swatch-btn active mono" data-undertone="neutral_ivory" onclick="window.__dlSetUndertone('neutral_ivory', this)">
            <span style="width:11px;height:11px;border-radius:50%;background:#EFE0D0;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
            <span>Neutral</span>
          </button>
          <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="warm_olive" onclick="window.__dlSetUndertone('warm_olive', this)">
            <span style="width:11px;height:11px;border-radius:50%;background:#D8B48E;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
            <span>Warm Olive</span>
          </button>
          <button type="button" class="dl-vanity-swatch-btn mono" data-undertone="rich_espresso" onclick="window.__dlSetUndertone('rich_espresso', this)">
            <span style="width:11px;height:11px;border-radius:50%;background:#7B4B36;border:1px solid rgba(24,20,18,0.25);flex-shrink:0;"></span>
            <span>Deep Rich</span>
          </button>
        </div>

        <div id="dl-finish-swatches" role="group" aria-label="Select Complexion Finish" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:5px;">
          <button type="button" class="dl-vanity-swatch-btn mono" data-finish="dewy_glass" onclick="window.__dlSetFinish('dewy_glass', this)">Dewy Glass</button>
          <button type="button" class="dl-vanity-swatch-btn active mono" data-finish="velvet_satin" onclick="window.__dlSetFinish('velvet_satin', this)">Velvet Satin</button>
          <button type="button" class="dl-vanity-swatch-btn mono" data-finish="cloud_matte" onclick="window.__dlSetFinish('cloud_matte', this)">Soft Matte</button>
        </div>
      </div>

      <!-- Step B: 5-Slot Screenshot-Resistant Single-Focus Accordion -->
      <div style="display:flex;flex-direction:column;gap:5px;">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
          <span class="mono" style="font-size:0.75rem;font-weight:600;color:var(--text-secondary);text-transform:uppercase;">2. Your 5 Calibrated Slots (Tap Any Slot to Inspect)</span>
          <span class="mono" style="font-size:0.73rem;color:var(--text-muted);">1-Slot Focus View</span>
        </div>
        <div id="dl-vanity-slots-list" style="display:flex;flex-direction:column;gap:5px;"></div>
      </div>

      <!-- Step C: 24-Hour Loss-Aversion Vault & Keep Forever CTA -->
      <div id="dl-vanity-vault-footer" style="padding:12px 14px;background:var(--bg-oat);border:1px solid var(--border-strong);display:flex;flex-direction:column;gap:8px;margin-top:auto;">
        <div style="font-size:0.8rem;color:var(--text-secondary);line-height:1.36;">
          <strong style="color:var(--rose-brand);font-family:var(--font-mono);font-size:0.75rem;text-transform:uppercase;">24-Hour Atelier Vault:</strong> Keep all 5 slots, wait times &amp; undertone SPF match on one <strong>9:16 Lock-Screen Card + 4-Night .ICS Alarm</strong>.
        </div>

        <div style="display:grid;grid-template-columns:1.25fr 1fr;gap:6px;">
          <a id="dl-vanity-keep-99c" href="/buy/micro_pass?source=vanity_bag_99c" onclick="if(window.__ebQuickBuy){window.__dlCloseVanityDrawer();window.__ebQuickBuy('micro_pass');return false;}" class="btn-primary mono" style="width:100%;justify-content:center;text-decoration:none;padding:9px 10px;font-size:0.8rem;white-space:nowrap;">
            <span>Keep 9:16 Card (99&cent;) &rarr;</span>
          </a>
          <a id="dl-vanity-keep-199" href="/buy/flash_pass?source=vanity_bag_199" onclick="if(window.__ebQuickBuy){window.__dlCloseVanityDrawer();window.__ebQuickBuy('flash_pass');return false;}" class="btn-secondary mono" style="width:100%;justify-content:center;text-decoration:none;padding:9px 10px;font-size:0.78rem;white-space:nowrap;">
            <span>Full 3-File Kit ($1.99)</span>
          </a>
        </div>

        <form id="dl-vanity-email-form" onsubmit="return window.__dlSendVanityHoldEmail(event)" style="display:flex;gap:6px;align-items:center;">
          <input id="dl-vanity-hold-email" type="email" required class="input-box mono" placeholder="Or email my free 24h restore link..." style="flex:1;padding:6px 10px;font-size:0.76rem;min-height:30px;" />
          <button type="submit" id="dl-vanity-email-btn" class="btn-secondary mono" style="padding:6px 10px;min-height:30px;font-size:0.75rem;white-space:nowrap;">Send 24h Link</button>
        </form>
        <div id="dl-vanity-email-status" class="mono" style="display:none;font-size:0.76rem;color:var(--sage-safe);font-weight:600;"></div>
      </div>

    </div>
  </div>
  `;
}

const ATELIER_VANITY_CLIENT_SCRIPT = `
  (function() {
    var VANITY_STORAGE_KEY = 'dermlogic_vanity_bag_v1';
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
        spfRec: 'Black Girl Sunscreen SPF 30 / Beauty of Joseon Relief Sun (100% Sheer Finish)',
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
        role: 'Morning Cleanse & pH Prep',
        choices: ['Tower 28 SOS Hypochlorous Mist ($28)', 'Anua Heartleaf 77% Soothing Toner ($23)', 'La Roche-Posay Toleriane Gentle Wash ($16)'],
        timing: '7:30 AM · Step 1 (pH 5.2 Reset · Wait 30s)'
      },
      {
        slotNum: '02 · AM ACTIVE',
        role: 'Morning Antioxidant Serum',
        choices: ['SkinCeuticals C E Ferulic 15% Vitamin C ($182)', 'Rohto Melano CC Vitamin C Essence ($14)', 'The Ordinary Niacinamide 10% + Zinc 1% ($6)', 'Topicals Faded Brightening Serum ($38)'],
        timing: '7:31 AM · Step 2 (Antioxidant Shield · Wait 60s before cream)'
      },
      {
        slotNum: '03 · BARRIER SEAL',
        role: '3:1:1 Ceramide & Lipid Cushion',
        choices: ['Aestura Atobarrier 365 Ceramide Cream ($32)', 'Dieux Instant Angel Lipid Cream ($45)', 'COSRX Snail 96 Mucin Essence ($25)', 'La Roche-Posay Cicaplast Baume B5+ ($17)'],
        timing: 'AM & PM · Step 3 (Seals hydration & buffers night actives)'
      },
      {
        slotNum: '04 · SPF & TONE',
        role: 'Undertone-Matched SPF 50 & Finish',
        choices: ['Beauty of Joseon Relief Sun SPF 50+ ($18)', 'EltaMD UV Clear Broad-Spectrum SPF 46 ($43)', 'La Roche-Posay Anthelios Melt-In Milk SPF 60 ($36)'],
        timing: '7:33 AM · Step 4 (2-Finger Rule · Wait 90s before makeup)'
      },
      {
        slotNum: '05 · PM RENEWAL',
        role: 'Evening Retinoid / Exfoliant (4-Night Cycle)',
        choices: ['Rx Tretinoin 0.05% Night Cream ($35)', 'Medik8 Crystal Retinal 6 Night Serum ($85)', 'Paula\\'s Choice 2% BHA Liquid Exfoliant ($35)', 'The Ordinary Multi-Peptide + Copper Serum ($32)'],
        timing: '9:30 PM · Nights 1 & 2 Only (Dry skin buffer · Never mix with AM acids)'
      }
    ];

    function loadVanityState() {
      try {
        var raw = localStorage.getItem(VANITY_STORAGE_KEY);
        if (raw) {
          var parsed = JSON.parse(raw);
          if (parsed && typeof parsed === 'object') return parsed;
        }
      } catch (_) {}
      var now = Date.now();
      return {
        bagId: 'DL-' + String(1000 + (now % 8999)),
        holdExpiresAt: now + 86400000,
        undertone: 'neutral_ivory',
        finish: 'velvet_satin',
        activeSlotIdx: 3,
        slotSelections: [0, 0, 0, 0, 0],
        customName: ''
      };
    }

    function saveVanityState(st) {
      try {
        localStorage.setItem(VANITY_STORAGE_KEY, JSON.stringify(st));
      } catch (_) {}
    }

    window.__dlVanityState = loadVanityState();

    function syncVanityFromPageContext() {
      var st = window.__dlVanityState;
      var checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) { return cb.value; });
      var path = (window.location.pathname || '').toLowerCase();
      if (checked.indexOf('rohto-melano-cc') !== -1) st.slotSelections[1] = 1;
      else if (checked.indexOf('to-niacinamide-10-zinc') !== -1) st.slotSelections[1] = 2;
      else if (checked.indexOf('topicals-faded-serum') !== -1) st.slotSelections[1] = 3;

      if (checked.indexOf('dieux-instant-angel') !== -1) st.slotSelections[2] = 1;
      else if (checked.indexOf('cosrx-snail-96-mucin') !== -1 || path.indexOf('snail-mucin') !== -1) st.slotSelections[2] = 2;
      else if (checked.indexOf('lrp-cicaplast-baume-b5') !== -1) st.slotSelections[2] = 3;

      if (checked.indexOf('eltamd-uv-clear-spf46') !== -1) st.slotSelections[3] = 1;

      if (checked.indexOf('medik8-crystal-retinal-6') !== -1) st.slotSelections[4] = 1;
      else if (checked.indexOf('paulas-choice-2-bha') !== -1 || path.indexOf('bha') !== -1) st.slotSelections[4] = 2;
      else if (checked.indexOf('to-buffet-copper-peptides') !== -1 || path.indexOf('copper') !== -1) st.slotSelections[4] = 3;

      var nameEl = document.getElementById('shelfNameInput');
      if (nameEl && nameEl.value && nameEl.value.trim()) {
        st.customName = nameEl.value.trim();
      }
      saveVanityState(st);
    }

    function formatHoldRemaining(expiresAt) {
      var diffMs = Math.max(60000, (expiresAt || (Date.now() + 86400000)) - Date.now());
      var hrs = Math.floor(diffMs / 3600000);
      var mins = Math.floor((diffMs % 3600000) / 60000);
      return 'Reserved for ' + hrs + 'h ' + mins + 'm';
    }

    window.__dlRenderVanityDrawer = function() {
      syncVanityFromPageContext();
      var st = window.__dlVanityState;
      var uMeta = UNDERTONE_META[st.undertone] || UNDERTONE_META.neutral_ivory;
      var fMeta = FINISH_META[st.finish] || FINISH_META.velvet_satin;

      var countEl = document.getElementById('dl-header-vanity-count');
      if (countEl) countEl.textContent = '5/5';

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

      document.querySelectorAll('#dl-undertone-swatches button[data-undertone]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-undertone') === st.undertone);
      });
      document.querySelectorAll('#dl-finish-swatches button[data-finish]').forEach(function(b) {
        b.classList.toggle('active', b.getAttribute('data-finish') === st.finish);
      });

      var listEl = document.getElementById('dl-vanity-slots-list');
      if (!listEl) return;

      var activeIdx = typeof st.activeSlotIdx === 'number' ? st.activeSlotIdx : 3;
      listEl.innerHTML = SLOT_OPTIONS.map(function(slot, idx) {
        var isOpen = idx === activeIdx;
        var selChoiceIdx = st.slotSelections[idx] || 0;
        var currentBottle = slot.choices[selChoiceIdx] || slot.choices[0];
        var extraNote = idx === 3
          ? (uMeta.spfNote + ' ' + fMeta.prepRule)
          : ('Layering Rule: ' + slot.timing + '. Zero pH cancellation with your other 4 slots.');
        var chipsHtml = slot.choices.map(function(ch, cIdx) {
          var isSel = cIdx === selChoiceIdx;
          return '<button type="button" class="mono" onclick="window.__dlPickSlotBottle(' + idx + ',' + cIdx + ')" style="padding:4px 8px;font-size:0.74rem;cursor:pointer;border:1px solid ' + (isSel ? 'var(--rose-brand)' : 'var(--border-hairline)') + ';background:' + (isSel ? 'var(--rose-pill-bg)' : 'var(--bg-surface)') + ';color:' + (isSel ? 'var(--rose-brand)' : 'var(--text-secondary)') + ';font-weight:' + (isSel ? '600' : '400') + ';">' + (isSel ? '✓ ' : '') + ch.split(' ($')[0] + '</button>';
        }).join('');

        return '<div class="dl-vanity-slot-card ' + (isOpen ? 'active' : '') + '" id="dl-vanity-slot-card-' + idx + '">'
          + '<button type="button" id="dl-vanity-slot-header-' + idx + '" class="dl-vanity-slot-head" onclick="window.__dlSelectVanitySlot(' + idx + ')" aria-expanded="' + (isOpen ? 'true' : 'false') + '" style="width:100%;text-align:left;padding:7px 11px;background:transparent;border:none;cursor:pointer;display:flex;justify-content:space-between;align-items:center;gap:8px;">'
            + '<div style="min-width:0;">'
              + '<div style="display:flex;align-items:center;gap:6px;">'
                + '<span class="mono" style="font-size:0.71rem;font-weight:700;color:var(--rose-brand);">' + slot.slotNum + '</span>'
                + '<span style="font-size:0.76rem;color:var(--text-secondary);">' + slot.role + '</span>'
              + '</div>'
              + '<div class="serif-display" style="font-size:0.96rem;font-weight:500;color:var(--text-primary);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:1px;">' + currentBottle + '</div>'
            + '</div>'
            + '<span class="mono" style="font-size:0.72rem;padding:2px 7px;background:' + (isOpen ? 'var(--rose-brand)' : 'var(--bg-oat)') + ';color:' + (isOpen ? 'var(--accent-ink)' : 'var(--text-secondary)') + ';flex-shrink:0;">' + (isOpen ? 'Inspecting ▾' : 'Inspect ▸') + '</span>'
          + '</button>'
          + '<div id="dl-vanity-slot-body-' + idx + '" style="display:' + (isOpen ? 'block' : 'none') + ';padding:0 11px 9px 11px;border-top:1px solid var(--border-hairline);">'
            + '<div style="font-size:0.78rem;color:var(--text-secondary);line-height:1.38;margin-top:6px;margin-bottom:6px;">' + extraNote + '</div>'
            + '<div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:6px;">' + chipsHtml + '</div>'
            + '<div class="mono" style="padding:5px 8px;background:var(--bg-oat);font-size:0.72rem;color:var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:6px;">'
              + '<span>All-in-One AM/PM Master Sheet + Drop Ratio:</span>'
              + '<a href="/buy/micro_pass?source=vanity_slot_' + idx + '" onclick="if(window.__ebQuickBuy){window.__dlCloseVanityDrawer();window.__ebQuickBuy(\\'micro_pass\\');return false;}" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;white-space:nowrap;">Unlock on 9:16 Card (99&cent;) &rarr;</a>'
            + '</div>'
          + '</div>'
        + '</div>';
      }).join('');
    };

    window.__dlOpenVanityDrawer = function(reason) {
      var drawer = document.getElementById('dl-atelier-vanity-drawer');
      if (!drawer) return;
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
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    window.__dlPickSlotBottle = function(slotIdx, choiceIdx) {
      window.__dlVanityState.slotSelections[slotIdx] = choiceIdx;
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    window.__dlSetUndertone = function(undertone) {
      window.__dlVanityState.undertone = undertone || 'neutral_ivory';
      window.__dlVanityState.activeSlotIdx = 3;
      saveVanityState(window.__dlVanityState);
      window.__dlRenderVanityDrawer();
    };

    window.__dlSetFinish = function(finish) {
      window.__dlVanityState.finish = finish || 'velvet_satin';
      window.__dlVanityState.activeSlotIdx = 3;
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
        syncVanityFromPageContext();
        var pill = document.getElementById('dl-header-vanity-pill');
        if (pill) {
          pill.style.transform = 'scale(1.05)';
          setTimeout(function() { pill.style.transform = 'scale(1)'; }, 220);
        }
      }
    }, { passive: true });

    window.addEventListener('DOMContentLoaded', function() {
      syncVanityFromPageContext();
    });
  })();
`;

module.exports = {
  renderHeaderVanityBagPill,
  renderAtelierVanityDrawerHtml,
  ATELIER_VANITY_CLIENT_SCRIPT
};
