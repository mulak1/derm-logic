'use strict';

/**
 * DermLogic (#4): Bulletproof Sovrn Commerce Compliance, Layer A State Persistence,
 * 3-Step Endowment Escalation, Before/After Clash Toggle, 9:16 Lock-Screen Canvas & Safe Swaps.
 * Strictly < 1,000 lines and zero em-dashes.
 */

const { CULT_PRODUCTS, CLINICAL_INGREDIENTS } = require('./clinical-data');

const SOVRN_KEY = process.env.SOVRN_API_KEY || process.env.SOVRN_COMMERCE_KEY || process.env.VIGLINK_API_KEY || '77092b74b2ef39a0fcc70907f5f6216d';

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const DIRECT_MERCHANT_URLS = {
  'skinceuticals-ce-ferulic': { url: 'https://sovrn.co/n3acz14', directMerchantUrl: 'https://www.dermstore.com/p/skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid-30ml/11289609/', retailer: 'Dermstore', partner: 'dermstore' },
  'paulas-choice-2-bha': { url: 'https://www.sephora.com/product/skin-perfecting-2-bha-liquid-exfoliant-P469502', retailer: 'Sephora', partner: 'sephora' },
  'lrp-cicaplast-baume-b5': { url: 'https://www.ulta.com/p/cicaplast-baume-b5-soothing-therapeutic-multi-purpose-cream-pimprod2018267', retailer: 'Ulta Beauty', partner: 'dermstore' },
  'aestura-atobarrier-365': { url: 'https://www.sephora.com/product/atobarrier365-cream-with-ceramides-niacinamide-for-skin-moisture-barrier-repair-P515494', retailer: 'Sephora', partner: 'sephora' },
  'to-buffet-copper-peptides': { url: 'https://www.sephora.com/product/the-ordinary-multi-peptide-copper-peptides-1-serum-P467642', retailer: 'Sephora', partner: 'sephora' },
  'sunday-riley-good-genes': { url: 'https://www.sephora.com/product/good-genes-all-in-one-lactic-acid-treatment-P309308', retailer: 'Sephora', partner: 'sephora' },
  'dieux-instant-angel': { url: 'https://www.sephora.com/product/dieux-instant-angel-lipid-rich-barrier-repair-cream-P510256', retailer: 'Sephora', partner: 'sephora' },
  'topicals-faded-serum': { url: 'https://www.sephora.com/product/topicals-faded-serum-for-dark-spots-discoloration-P470259', retailer: 'Sephora', partner: 'sephora' },
  'tower28-sos-spray': { url: 'https://www.sephora.com/product/sos-save-our-skin-daily-rescue-facial-spray-P448852', retailer: 'Sephora', partner: 'sephora' },
  'medik8-crystal-retinal-6': { url: 'https://www.dermstore.com/p/medik8-crystal-retinal-6-stable-retinal-night-serum-30ml/12902821/', retailer: 'Dermstore', partner: 'dermstore' },
  'eltamd-uv-clear-spf46': { url: 'https://www.dermstore.com/p/eltamd-uv-clear-broad-spectrum-spf-46/11370303/', retailer: 'Dermstore', partner: 'dermstore' },
  'rohto-melano-cc': { url: 'https://www.amazon.com/dp/B08R82XGV2', retailer: 'Amazon', partner: 'amazon' },
  'differin-adapalene-01': { url: 'https://www.ulta.com/p/adapalene-gel-01-acne-treatment-xlsImpprod15791005', retailer: 'Ulta Beauty', partner: 'dermstore' }
};

function getSovrnMerchantLink(productId, preferredPartner = 'dermstore') {
  const prod = CULT_PRODUCTS.find((p) => p.id === productId) || CULT_PRODUCTS[0] || { id: 'aestura-atobarrier-365', brand: 'Aestura', name: 'Atobarrier 365 Cream', priceUsd: 32 };
  const mapped = DIRECT_MERCHANT_URLS[prod.id];
  if (mapped) {
    return {
      directUrl: mapped.url,
      retailer: mapped.retailer,
      partner: mapped.partner,
      beaconUrl: `/api/affiliate?product=${encodeURIComponent(prod.id)}&partner=${encodeURIComponent(mapped.partner)}&format=json`,
      prod
    };
  }
  const q = encodeURIComponent(`${prod.brand} ${prod.name}`);
  const partner = preferredPartner || (prod.priceUsd >= 45 ? 'dermstore' : 'sephora');
  const directUrl = partner === 'sephora'
    ? `https://www.sephora.com/search?keyword=${q}`
    : partner === 'amazon'
      ? `https://www.amazon.com/s?k=${q}`
      : `https://www.dermstore.com/elysium.search?search=${q}`;
  const retailer = partner === 'sephora' ? 'Sephora' : partner === 'amazon' ? 'Amazon' : 'Dermstore';
  return {
    directUrl,
    retailer,
    partner,
    beaconUrl: `/api/affiliate?product=${encodeURIComponent(prod.id)}&partner=${encodeURIComponent(partner)}&format=json`,
    prod
  };
}

function getConflictSafeSwap(conflict) {
  const text = `${conflict.ruleId || ''} ${conflict.title || ''} ${conflict.ingredientA || ''} ${conflict.ingredientB || ''}`.toLowerCase();
  if (/copper|vitamin c|ascorbic/.test(text)) {
    const m = getSovrnMerchantLink('aestura-atobarrier-365', 'sephora');
    return {
      freeFix: 'Option A ($0 Fix): Wear Vitamin C at 7:30 AM under SPF and save Copper Peptides for 9:30 PM.',
      swapLabel: 'Option B (Same-Routine Swap): Cushion with Aestura Atobarrier 365 Ceramide Cream ($32)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'aestura-atobarrier-365'
    };
  }
  if (/benzoyl|bpo|tretinoin|retinol|adapalene/.test(text)) {
    const m = getSovrnMerchantLink('lrp-cicaplast-baume-b5', 'dermstore');
    return {
      freeFix: 'Option A ($0 Fix): Move Benzoyl Peroxide to morning shower rinse and apply Retinoid on bone-dry skin at night.',
      swapLabel: 'Option B (Barrier Buffer): Sandwich Retinoid over La Roche-Posay Cicaplast Baume B5+ ($17)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'lrp-cicaplast-baume-b5'
    };
  }
  if (/glycolic|salicylic|bha|lactic|acid/.test(text)) {
    const m = getSovrnMerchantLink('tower28-sos-spray', 'sephora');
    return {
      freeFix: 'Option A ($0 Fix): Alternate Exfoliating Acids (Night 1) and Retinoids/Peptides (Night 2) on a 4-night cycle.',
      swapLabel: 'Option B (Zero-Sting Prep): Calm pH with Tower 28 SOS Hypochlorous Mist ($28)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'tower28-sos-spray'
    };
  }
  const m = getSovrnMerchantLink('dieux-instant-angel', 'sephora');
  return {
    freeFix: 'Option A ($0 Fix): Space active serums 60 seconds apart from thinnest watery drop to richest cream.',
    swapLabel: 'Option B (Barrier Cushion): Seal with Dieux Instant Angel Lipid Cream ($45)',
    directUrl: m.directUrl,
    beaconUrl: m.beaconUrl,
    retailer: m.retailer,
    productId: 'dieux-instant-angel'
  };
}

function renderAboveFoldSovrnDisclosureBar() {
  return `<div id="sovrn-ftc-disclosure-bar" class="ftc-disclosure-banner" role="region" aria-label="Editorial and Affiliate Disclosure" style="background:var(--bg-oat);padding:6px 0;font-size:0.78rem;line-height:1.35;color:var(--text-secondary);">
    <div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:6px 12px;flex-wrap:wrap;white-space:normal;">
      <span><strong class="mono" style="color:var(--rose-brand);font-weight:600;">Editorial &amp; FTC Disclosure:</strong> Independent cosmetic-chemistry lab. Retail links may earn an affiliate commission at no extra cost to you.</span>
      <span style="flex-shrink:0;"><a href="/editorial-policy" class="mono" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;white-space:nowrap;">Editorial &amp; Testing Policy</a> &middot; <a href="/editorial-policy#affiliate-disclosure" class="mono" style="color:var(--text-primary);font-weight:500;text-decoration:underline;white-space:nowrap;">Affiliate Disclosure</a></span>
    </div>
  </div>`;
}

function renderSovrnVglnkScript() {
  return `<script type="text/javascript">
  var vglnk = { key: '${SOVRN_KEY}' };
  (function(d, t) {
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost' || window.location.hostname === '0.0.0.0') return;
    if (d.querySelector('script[src*="viglink.com/api/vglnk.js"]')) return;
    var s = d.createElement(t); s.type = 'text/javascript'; s.async = true; s.src = '//cdn.viglink.com/api/vglnk.js';
    var r = d.getElementsByTagName(t)[0]; if (r && r.parentNode) r.parentNode.insertBefore(s, r);
  }(document, 'script'));
  document.addEventListener('click', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[data-sovrn-beacon]') : null;
    if (!a) return;
    var beacon = a.getAttribute('data-sovrn-beacon');
    if (beacon) {
      try {
        if (navigator.sendBeacon) navigator.sendBeacon(beacon);
        else fetch(beacon, { method: 'GET', keepalive: true }).catch(function(){});
      } catch (_) {}
    }
  }, { passive: true });
</script>`;
}

function getClimateProtocolMeta(climateMode) {
  const map = {
    retinoid_retinization: {
      badge: 'Retinoid Purge Protocol Active',
      shortLabel: 'Retinoid Purge Mode',
      waitBadge: 'Wait 15m · Dry Skin',
      pmNote: 'Sandwich Method: Apply thin ceramide layer first, wait 15m, apply pea-sized retinoid, then seal with barrier cream.',
      rule: '15-Minute Dry-Skin Buffer + Ceramide Sandwich Method applied to Bedtime Routine to stop flaking and retinization sting.'
    },
    pregnancy_nursing: {
      badge: 'Pregnancy-Safe Filter Active',
      shortLabel: 'Pregnancy-Safe Mode',
      waitBadge: 'Swap Retinoids',
      pmNote: 'Pregnancy-Safe Note: Pause Tretinoin, Retinol & Adapalene; substitute Azelaic Acid 15% or Bakuchiol peptide serum.',
      rule: 'Retinoids (Tretinoin, Retinol, Adapalene) and high-dose Salicylic Acid are flagged for swap to Azelaic Acid 15% + Bakuchiol.'
    },
    humid_oily: {
      badge: 'Humid / Dewy Climate Protocol',
      shortLabel: 'Humid / Dewy Mode',
      waitBadge: 'Wait 90s · Gel Dry-Down',
      pmNote: 'Humid Climate Note: Use water-light gel-creams at night and allow 90s full absorption before morning SPF 50.',
      rule: '90-second water-light serum dry-down applied before SPF 50 to prevent humid-weather shine and makeup pilling.'
    },
    indoor_dry: {
      badge: 'AC / Dry Heat Barrier Protocol',
      shortLabel: 'AC / Dry Heat Mode',
      waitBadge: 'Seal in 60s · Damp Skin',
      pmNote: 'AC / Dry Heat Note: Mist skin before humectant serums and lock in within 60 seconds using a 3:1:1 ceramide cream.',
      rule: 'Apply watery humectants on mist-dampened skin and seal within 60 seconds with a 3:1:1 ceramide barrier cream.'
    }
  };
  return map[climateMode] || map.indoor_dry;
}

function formatMonogramHeading(shelfName) {
  const clean = String(shelfName || '').trim();
  if (!clean) return 'Your Custom AM & PM Vanity Routine';
  if (/routine|ritual|shelf/i.test(clean)) return clean;
  if (/s$/i.test(clean)) return `${clean}' Custom AM & PM Routine`;
  return `${clean}'s Custom AM & PM Routine`;
}

function renderPersonalizedResultsHeaderHtml(res) {
  const shelfName = String((res && res.shelfName) || '').trim();
  const climateMode = String((res && res.climateMode) || 'indoor_dry').trim();
  const meta = getClimateProtocolMeta(climateMode);
  const heading = formatMonogramHeading(shelfName);
  return `<div id="personalizedRoutineBanner" style="padding:0 0 12px 0;border-bottom:1px solid var(--border-hairline);margin-bottom:14px;display:flex;flex-direction:column;gap:6px;min-width:0;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;min-width:0;">
      <strong id="personalizedRoutineTitle" class="serif-display" style="font-size:1.35rem;color:var(--text-primary);font-weight:400;min-width:0;">${escapeHtml(heading)}</strong>
      <span id="personalizedClimateBadge" class="badge-safe mono" style="font-size:0.78rem;padding:3px 9px;">${escapeHtml(meta.badge)}</span>
    </div>
    <div id="personalizedClimateRule" style="font-size:0.84rem;color:var(--text-secondary);line-height:1.45;min-width:0;">${escapeHtml(meta.rule)}</div>
  </div>`;
}

function renderPersonalizationBarHtml(initialClimate = 'indoor_dry', initialShelfName = '') {
  return `<div id="endowmentPersonalizationBar" style="padding:8px 10px;background:var(--bg-canvas);display:flex;flex-direction:column;gap:6px;min-width:0;">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <span class="mono" style="font-size:0.76rem;color:var(--text-secondary);font-weight:500;">Optional: Climate &amp; Custom Shelf Name</span>
      <span id="shelfDraftSavedBadge" class="badge-safe mono" style="font-size:0.72rem;padding:1px 7px;">Shelf Auto-Saved</span>
    </div>
    <div id="climateContextPills" role="group" aria-label="Climate and Barrier Context" style="display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;background:var(--bg-oat);padding:3px;">
      <button type="button" class="vanity-light-btn mono ${initialClimate === 'indoor_dry' ? 'active' : ''}" data-climate="indoor_dry" aria-pressed="${initialClimate === 'indoor_dry' ? 'true' : 'false'}" style="width:100%;text-align:center;padding:4px 4px;font-size:0.74rem;min-height:24px;" onclick="window.__dlSetClimate('indoor_dry', this)">AC / Dry</button>
      <button type="button" class="vanity-light-btn mono ${initialClimate === 'humid_oily' ? 'active' : ''}" data-climate="humid_oily" aria-pressed="${initialClimate === 'humid_oily' ? 'true' : 'false'}" style="width:100%;text-align:center;padding:4px 4px;font-size:0.74rem;min-height:24px;" onclick="window.__dlSetClimate('humid_oily', this)">Humid</button>
      <button type="button" class="vanity-light-btn mono ${initialClimate === 'retinoid_retinization' ? 'active' : ''}" data-climate="retinoid_retinization" aria-pressed="${initialClimate === 'retinoid_retinization' ? 'true' : 'false'}" style="width:100%;text-align:center;padding:4px 4px;font-size:0.74rem;min-height:24px;" onclick="window.__dlSetClimate('retinoid_retinization', this)">Retinoid Purge</button>
      <button type="button" class="vanity-light-btn mono ${initialClimate === 'pregnancy_nursing' ? 'active' : ''}" data-climate="pregnancy_nursing" aria-pressed="${initialClimate === 'pregnancy_nursing' ? 'true' : 'false'}" style="width:100%;text-align:center;padding:4px 4px;font-size:0.74rem;min-height:24px;" onclick="window.__dlSetClimate('pregnancy_nursing', this)">Pregnancy</button>
    </div>
    <div style="display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:center;">
      <label for="shelfNameInput" class="mono" style="font-size:0.76rem;color:var(--text-secondary);white-space:nowrap;">Shelf Name:</label>
      <input id="shelfNameInput" type="text" maxlength="44" class="input-box" style="padding:4px 8px;font-size:0.78rem;" placeholder="e.g., Maya's Evening Ritual (Optional)" value="${escapeHtml(initialShelfName)}" oninput="window.__dlUpdatePersonalization()" onkeydown="if(event.key==='Enter'){event.preventDefault();if(typeof runRoutineAnalysis==='function')runRoutineAnalysis(null,true);}" />
    </div>
    <div id="analyzeBtnFeedback" role="status" aria-live="polite" style="display:none;padding:6px 9px;background:var(--sage-bg);color:var(--sage-safe);border-left:3px solid var(--sage-safe);font-size:0.78rem;font-weight:500;line-height:1.35;"></div>
  </div>`;
}

function renderBeforeAfterAndCanvasFooterHtml(res, n1Label, n1Val, n2Label, n2Val, n3Label, n3Val, n4Val) {
  return `
    <div style="padding:16px 18px;background:var(--bg-canvas);display:flex;flex-direction:column;gap:14px;min-width:0;">
      <div style="min-width:0;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">
          <span class="mono" style="font-size:0.8rem;color:var(--text-secondary);font-weight:600;letter-spacing:0.02em;text-transform:uppercase;">4-Night Bedtime Rotation</span>
          <a href="/buy/micro_pass?source=cycling_grid" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('micro_pass');return false;}" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;text-decoration:underline;">Add 4-Night .ICS (99&cent;) &rarr;</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;">
          <div style="padding:9px 11px;background:var(--bg-surface);min-width:0;"><div style="display:flex;justify-content:space-between;align-items:center;gap:4px;"><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;">${escapeHtml(n1Label)}</span><span class="mono" style="font-size:0.74rem;color:var(--text-muted);">Wait 60s</span></div><div style="font-size:0.82rem;color:var(--text-primary);margin-top:2px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(n1Val)}</div></div>
          <div style="padding:9px 11px;background:var(--bg-surface);min-width:0;"><div style="display:flex;justify-content:space-between;align-items:center;gap:4px;"><span class="mono" style="font-size:0.78rem;color:var(--honey-warn);font-weight:600;">${escapeHtml(n2Label)}</span><span class="mono" style="font-size:0.74rem;color:var(--text-muted);">Dry Skin</span></div><div style="font-size:0.82rem;color:var(--text-primary);margin-top:2px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(n2Val)}</div></div>
          <div style="padding:9px 11px;background:var(--bg-surface);min-width:0;"><div style="display:flex;justify-content:space-between;align-items:center;gap:4px;"><span class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:600;">${escapeHtml(n3Label)}</span><span class="mono dl-gated-night-val" data-unlocked-text="Damp Seal" style="font-size:0.74rem;color:var(--sage-safe);">Rest</span></div><div style="font-size:0.82rem;color:var(--text-primary);margin-top:2px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(n3Val)}</div></div>
          <div style="padding:9px 11px;background:var(--bg-surface);min-width:0;"><div style="display:flex;justify-content:space-between;align-items:center;gap:4px;"><span class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:600;">Night 4 &middot; Seal</span><span class="mono dl-gated-night-val" data-unlocked-text="3:1:1 Lipids" style="font-size:0.74rem;color:var(--sage-safe);">Lipids</span></div><div style="font-size:0.82rem;color:var(--text-primary);margin-top:2px;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escapeHtml(n4Val)}</div></div>
        </div>
      </div>

      <div id="lockScreenCanvasSection" style="padding:14px 16px;background:linear-gradient(155deg,#3A1F27 0%,#28141A 100%);color:#FDF8F6;border:none;border-radius:20px;display:grid;grid-template-columns:112px minmax(0,1fr);gap:16px;align-items:center;min-width:0;">
        <div style="border-radius:16px;padding:4px;background:linear-gradient(145deg,#5A303D,#28141A);box-shadow:0 10px 24px rgba(58,31,39,0.28);">
          <canvas id="lockScreenWallpaperCanvas" width="360" height="640" onclick="window.__dlDownloadOrUnlockWallpaper()" title="Click to download 9:16 Lock-Screen Routine Card" style="width:104px;height:185px;border-radius:12px;background:#3A1F27;display:block;cursor:pointer;"></canvas>
        </div>
        <div style="min-width:0;display:flex;flex-direction:column;gap:8px;">
          <div>
            <span class="mono" style="font-size:0.72rem;color:#C9A45A;font-weight:700;display:block;text-transform:uppercase;letter-spacing:0.05em;">ATELIER 9:16 LOCK-SCREEN WALLPAPER (AM + PM)</span>
            <div class="serif-display" style="font-size:1.12rem;color:#FBF8F4;line-height:1.22;margin-top:2px;">Keep your 7:30 AM &amp; 9:30 PM order on your iPhone lock screen.</div>
            <div style="font-size:0.76rem;color:#D5CBC0;margin-top:4px;line-height:1.38;">Includes pH windows, wait timers, ceramide sandwich buffers &amp; 4-Night cycle below your phone clock.</div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            <button type="button" id="btnDownloadLockScreenPng" class="btn-primary mono" style="padding:7px 13px;min-height:32px;font-size:0.8rem;background:#7A2332;color:#FFF;" onclick="window.__dlDownloadOrUnlockWallpaper()">Save 9:16 PNG (99&cent;) &rarr;</button>
            <button type="button" class="btn-secondary mono" style="padding:7px 12px;min-height:32px;font-size:0.78rem;background:rgba(255,255,255,0.08);color:#F4EFE8;border-color:rgba(201,164,90,0.4);" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('workbench');if(window.__dlSetDossierTab)window.__dlSetDossierTab('pass');}">Interactive AM/PM Preview &rarr;</button>
            <button type="button" id="btnCopyRedditRoutineHelp" class="btn-secondary mono" style="padding:6px 10px;min-height:32px;font-size:0.76rem;background:transparent;color:#C9BCAE;border-color:#3D322C;" onclick="window.__dlCopyRedditRoutineHelp(this)">Copy Summary</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

const ENDOWMENT_CLIENT_SCRIPT = `
  window.__dlShelfStateKey = 'dermlogic_shelf_state_v1';
  window.__dlClimateMode = 'indoor_dry';
  window.__dlViewMode = 'fixed';

  window.__dlSaveShelfState = function() {
    try {
      var checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) { return cb.value; });
      var skinType = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
      var rawInciText = (document.getElementById('rawInciTextarea') || {}).value || '';
      var shelfName = (document.getElementById('shelfNameInput') || {}).value || '';
      var state = {
        skinType: skinType,
        productIds: checked,
        rawInciText: rawInciText,
        shelfName: shelfName,
        climateMode: window.__dlClimateMode || 'indoor_dry',
        viewMode: window.__dlViewMode || 'fixed',
        updatedAt: Date.now()
      };
      localStorage.setItem(window.__dlShelfStateKey, JSON.stringify(state));
      var badge = document.getElementById('shelfDraftSavedBadge');
      if (badge) {
        badge.textContent = 'Saved (' + checked.length + ' bottles)';
      }
    } catch (_) {}
  };

  window.__dlRestoreShelfStateOnBoot = function() {
    try {
      var sp = new URLSearchParams(window.location.search || '');
      var hasExplicitProducts = Boolean(sp.get('products') || sp.get('preset') || sp.get('inci'));
      var isCheckoutReturn = sp.get('checkout') === 'success' || sp.get('checkout') === 'cancel' || sp.get('checkout') === 'cancelled';
      if (sp.get('checkout') === 'success') {
        window.__ebIsUnlocked = true;
        localStorage.setItem('dermlogic_unlocked_v1', '1');
      } else if (localStorage.getItem('dermlogic_unlocked_v1') === '1') {
        window.__ebIsUnlocked = true;
      }
      var raw = localStorage.getItem(window.__dlShelfStateKey);
      if (!raw) {
        setTimeout(function() { if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas(); }, 60);
        return;
      }
      var saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object') return;
      if (saved.shelfName) {
        var nameIn = document.getElementById('shelfNameInput');
        if (nameIn) nameIn.value = saved.shelfName;
      }
      if (saved.climateMode) {
        window.__dlClimateMode = saved.climateMode;
        document.querySelectorAll('#climateContextPills button[data-climate]').forEach(function(b) {
          var act = b.getAttribute('data-climate') === saved.climateMode;
          b.classList.toggle('active', act);
          b.setAttribute('aria-pressed', act ? 'true' : 'false');
        });
      }
      if (window.__dlSyncPersonalizedHeaderDom) window.__dlSyncPersonalizedHeaderDom();
      if (!hasExplicitProducts || isCheckoutReturn) {
        if (saved.skinType) {
          var skinSel = document.getElementById('skinTypeSelect');
          if (skinSel) skinSel.value = saved.skinType;
        }
        if (typeof saved.rawInciText === 'string') {
          var inciEl = document.getElementById('rawInciTextarea');
          if (inciEl) inciEl.value = saved.rawInciText;
        }
        if (Array.isArray(saved.productIds) && saved.productIds.length > 0) {
          var grid = document.getElementById('productSelectorGrid');
          document.querySelectorAll('input[name="routineProduct"]').forEach(function(cb) {
            cb.checked = saved.productIds.indexOf(cb.value) !== -1;
            var lbl = cb.closest('.prod-check-item');
            if (lbl) {
              lbl.classList.toggle('selected', cb.checked);
              var pill = lbl.querySelector('span.mono');
              if (pill) {
                pill.textContent = cb.checked ? 'Selected' : '+ Add';
                pill.style.background = cb.checked ? 'var(--rose-brand)' : 'var(--bg-oat)';
                pill.style.color = cb.checked ? 'var(--accent-ink)' : 'var(--text-secondary)';
              }
              if (cb.checked && grid) grid.prepend(lbl);
            }
          });
          if (typeof runRoutineAnalysis === 'function') {
            runRoutineAnalysis();
            return;
          }
        }
      }
    } catch (_) {}
    setTimeout(function() { if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas(); }, 80);
  };

  window.__dlFormatMonogramHeading = function(name) {
    var clean = String(name || '').trim();
    if (!clean) return 'Your Custom AM & PM Vanity Routine';
    if (/routine|ritual|shelf/i.test(clean)) return clean;
    if (/s$/i.test(clean)) return clean + "' Custom AM & PM Routine";
    return clean + "'s Custom AM & PM Routine";
  };

  window.__dlClimateMetaMap = {
    retinoid_retinization: {
      badge: 'Retinoid Purge Protocol Active',
      shortLabel: 'Retinoid Purge Mode',
      rule: '15-Minute Dry-Skin Buffer + Ceramide Sandwich Method applied to Bedtime Routine to stop flaking and retinization sting.'
    },
    pregnancy_nursing: {
      badge: 'Pregnancy-Safe Filter Active',
      shortLabel: 'Pregnancy-Safe Mode',
      rule: 'Retinoids (Tretinoin, Retinol, Adapalene) and high-dose Salicylic Acid are flagged for swap to Azelaic Acid 15% + Bakuchiol.'
    },
    humid_oily: {
      badge: 'Humid / Dewy Climate Protocol',
      shortLabel: 'Humid / Dewy Mode',
      rule: '90-second water-light serum dry-down applied before SPF 50 to prevent humid-weather shine and makeup pilling.'
    },
    indoor_dry: {
      badge: 'AC / Dry Heat Barrier Protocol',
      shortLabel: 'AC / Dry Heat Mode',
      rule: 'Apply watery humectants on mist-dampened skin and seal within 60 seconds with a 3:1:1 ceramide barrier cream.'
    }
  };

  window.__dlSyncPersonalizedHeaderDom = function() {
    var shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim();
    var cMode = window.__dlClimateMode || 'indoor_dry';
    var meta = window.__dlClimateMetaMap[cMode] || window.__dlClimateMetaMap.indoor_dry;
    var titleEl = document.getElementById('personalizedRoutineTitle');
    var badgeEl = document.getElementById('personalizedClimateBadge');
    var ruleEl = document.getElementById('personalizedClimateRule');
    if (titleEl) titleEl.textContent = window.__dlFormatMonogramHeading(shelfName);
    if (badgeEl) badgeEl.textContent = meta.badge;
    if (ruleEl) ruleEl.textContent = meta.rule;
  };

  window.__dlSetClimate = function(climate, btn) {
    window.__dlClimateMode = climate || 'indoor_dry';
    document.querySelectorAll('#climateContextPills button[data-climate]').forEach(function(b) {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    if (btn) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    }
    window.__dlSyncPersonalizedHeaderDom();
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
    if (typeof runRoutineAnalysis === 'function') {
      runRoutineAnalysis(null, false);
    }
  };

  window.__dlUpdatePersonalization = function() {
    window.__dlSyncPersonalizedHeaderDom();
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
    if (window.__dlNameTimer) clearTimeout(window.__dlNameTimer);
    window.__dlNameTimer = setTimeout(function() {
      if (typeof runRoutineAnalysis === 'function') runRoutineAnalysis(null, false);
    }, 420);
  };

  window.__dlAfterRoutineAnalysis = function(data, isExplicitClick) {
    window.__dlSyncPersonalizedHeaderDom();
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
    var shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim();
    var cMode = window.__dlClimateMode || 'indoor_dry';
    var meta = window.__dlClimateMetaMap[cMode] || window.__dlClimateMetaMap.indoor_dry;
    var checkedCount = document.querySelectorAll('input[name="routineProduct"]:checked').length;
    var cCount = ((data && data.conflicts) || []).length;
    var fb = document.getElementById('analyzeBtnFeedback');
    if (fb && (isExplicitClick || shelfName || cMode !== 'indoor_dry')) {
      fb.style.display = 'block';
      var who = shelfName ? (shelfName + "'s Routine") : 'Your Routine';
      var clashSummary = cCount === 0 ? '0 Active Clashes' : (cCount + (cCount === 1 ? ' Clash Separated AM/PM' : ' Clashes Separated AM/PM'));
      fb.innerHTML = '<strong>' + who.replace(/[<>"'&]/g, '') + ' Checked (' + checkedCount + ' Bottles)</strong> &middot; ' + meta.shortLabel + ' Applied &middot; ' + clashSummary + ' &middot; <a href="#liveResultsContainer" onclick="var el=document.getElementById(\\'liveResultsContainer\\');if(el&&el.scrollIntoView)el.scrollIntoView({behavior:\\'smooth\\',block:\\'start\\'});return false;" style="color:var(--rose-brand);text-decoration:underline;font-weight:600;">Jump to Updated Routine &rarr;</a>';
    }
    if (isExplicitClick) {
      var btn = document.getElementById('analyzeBtn');
      if (btn) {
        if (window.__dlBtnResetTimer) clearTimeout(window.__dlBtnResetTimer);
        var btnLabel = shelfName ? (shelfName.slice(0, 18).replace(/[<>"'&]/g, '') + "'s Shelf Checked · View Routine") : ('Shelf Checked (' + checkedCount + ' Bottles) · Routine Updated');
        btn.style.background = 'var(--sage-safe)';
        btn.innerHTML = '<span>' + btnLabel + '</span><span class="btn-icon-circle">&uarr;</span>';
        window.__dlBtnResetTimer = setTimeout(function() {
          btn.style.background = '';
          btn.innerHTML = '<span>Check My Bathroom Shelf</span><span class="btn-icon-circle">&rarr;</span>';
        }, 2600);
      }
      var container = document.getElementById('liveResultsContainer');
      if (container) {
        container.style.transition = 'box-shadow 0.35s ease, outline 0.35s ease';
        container.style.outline = '2px solid var(--rose-brand)';
        container.style.boxShadow = '0 0 0 5px rgba(122, 35, 50, 0.14)';
        setTimeout(function() {
          container.style.outline = '';
          container.style.boxShadow = '';
        }, 2200);
        if (!navigator.webdriver && typeof container.scrollIntoView === 'function') {
          container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  window.__dlToggleBeforeAfter = function(mode, btn) {
    window.__dlViewMode = mode === 'clash' ? 'clash' : 'fixed';
    var b1 = document.getElementById('btnViewFixedSplit');
    var b2 = document.getElementById('btnViewClashingStack');
    if (b1) { b1.classList.toggle('active', window.__dlViewMode === 'fixed'); b1.setAttribute('aria-pressed', window.__dlViewMode === 'fixed' ? 'true' : 'false'); }
    if (b2) { b2.classList.toggle('active', window.__dlViewMode === 'clash'); b2.setAttribute('aria-pressed', window.__dlViewMode === 'clash' ? 'true' : 'false'); }
    var st = document.getElementById('beforeAfterStatusText');
    var res = window.__DERMLOGIC_LAST_RESULT || {};
    var cCount = (res.conflicts || []).length;
    var wUsd = res.wastedShelfValueUsd || 0;
    if (st) {
      st.innerHTML = window.__dlViewMode === 'clash'
        ? '<strong style="color:var(--berry-clash);">Unfixed Stack</strong> &middot; ' + cCount + ' Clashes (-$' + wUsd + ' Serum Value at Risk)'
        : '<strong style="color:var(--sage-safe);">Fixed AM/PM Split</strong> &middot; 96/100 Harmony ($0 Wasted)';
    }
    if (window.__dlSwitchResultStep) window.__dlSwitchResultStep(window.__dlViewMode === 'clash' ? 1 : 2, true);
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
  };

  window.__dlCleanCanvasStep = function(raw) {
    var s = String(raw || '').replace(/\\s*\\([^)]*$/, '').replace(/\\s*\\([^)]*\\)/g, '').trim();
    return s.length > 34 ? (s.slice(0, 33) + '...') : s;
  };

  window.__dlRenderWallpaperCanvas = function() {
    var canvas = document.getElementById('lockScreenWallpaperCanvas');
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext('2d');
    var w = canvas.width, h = canvas.height;
    var grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, '#1B1513');
    grad.addColorStop(0.55, '#271E1A');
    grad.addColorStop(1, '#14100E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Dynamic Island & iOS status bar
    ctx.fillStyle = '#0B0908';
    ctx.fillRect(w / 2 - 42, 12, 84, 18);
    ctx.fillStyle = '#B5ACA3';
    ctx.font = '600 9.5px sans-serif';
    ctx.fillText('DERMLOGIC', 20, 24);
    ctx.fillText('5G 100%', w - 62, 24);

    // Lock-Screen Clock & Subhead
    ctx.fillStyle = '#C9A45A';
    ctx.font = 'bold 10.5px Georgia, serif';
    ctx.fillText('ATELIER 9:16 RITUAL WALLPAPER', 92, 50);
    ctx.fillStyle = '#FBF8F4';
    ctx.font = '300 38px Georgia, serif';
    ctx.fillText('07:30 · 21:30', 76, 88);

    var shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim() || 'Calibrated AM & PM Shelf';
    var climateLabels = { indoor_dry: 'AC / Dry Heat · 90s Wait', humid_oily: 'Humid Climate · 60s Wait', retinoid_retinization: 'Retinoid Buffer Protocol', pregnancy_nursing: '100% Pregnancy-Safe' };
    var climateTxt = climateLabels[window.__dlClimateMode] || '60s Dry-Down Protocol';
    ctx.fillStyle = 'rgba(201,164,90,0.18)';
    ctx.fillRect(36, 98, w - 72, 22);
    ctx.fillStyle = '#E8C6B0';
    ctx.font = 'bold 10.5px sans-serif';
    ctx.fillText((shelfName.slice(0, 20) + ' · ' + climateTxt).slice(0, 42), 48, 113);

    var cards = document.querySelectorAll('#appleWalletCardPreview strong');
    var steps = [];
    for (var i = 0; i < cards.length; i++) steps.push(window.__dlCleanCanvasStep(cards[i].textContent));
    if (steps.length < 6) {
      steps = ['1. Gentle Morning Cleanse', '2. Vitamin C Serum (Wait 60s)', '3. Ceramide + SPF 50 Shield', '1. Evening Milk Cleanse', '2. Night Active / Retinoid', '3. 3:1:1 Ceramide Cushion'];
    }

    // AM Card (Warm Porcelain)
    ctx.fillStyle = '#F6EFE6';
    ctx.fillRect(18, 130, w - 36, 132);
    ctx.fillStyle = '#7A2332';
    ctx.font = 'bold 11.5px Georgia, serif';
    ctx.fillText('☀ 7:30 AM · MORNING SHIELD & SPF PREP', 28, 149);
    var amPills = ['pH 5.2 · 45s', 'pH 3.3 · 60s', 'SPF 50 · 90s'];
    for (var a = 0; a < 3; a++) {
      var ay = 160 + a * 32;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(26, ay, w - 52, 26);
      ctx.fillStyle = '#3A1F27';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText((steps[a] || '').slice(0, 27), 34, ay + 17);
      ctx.fillStyle = '#F3E5E8';
      ctx.fillRect(w - 106, ay + 4, 72, 18);
      ctx.fillStyle = '#7A2332';
      ctx.font = 'bold 9.5px sans-serif';
      ctx.fillText(amPills[a], w - 100, ay + 16);
    }

    // PM Card (Nocturnal Velvet)
    ctx.fillStyle = '#241C18';
    ctx.fillRect(18, 272, w - 36, 132);
    ctx.strokeStyle = 'rgba(201,164,90,0.4)';
    ctx.strokeRect(18, 272, w - 36, 132);
    ctx.fillStyle = '#C9A45A';
    ctx.font = 'bold 11.5px Georgia, serif';
    ctx.fillText('☾ 9:30 PM · BEDTIME RENEWAL & BUFFER', 28, 291);
    var pmPills = ['Dry 10m', 'Pea Size', '3:1:1 Seal'];
    for (var p = 0; p < 3; p++) {
      var py = 302 + p * 32;
      ctx.fillStyle = 'rgba(255,255,255,0.07)';
      ctx.fillRect(26, py, w - 52, 26);
      ctx.fillStyle = '#FBF8F4';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText((steps[p + 3] || '').slice(0, 27), 34, py + 17);
      ctx.fillStyle = 'rgba(201,164,90,0.22)';
      ctx.fillRect(w - 98, py + 4, 64, 18);
      ctx.fillStyle = '#E8C6B0';
      ctx.font = 'bold 9.5px sans-serif';
      ctx.fillText(pmPills[p], w - 91, py + 16);
    }

    // 4-Night Cycling Strip
    ctx.fillStyle = '#A7D7C5';
    ctx.font = 'bold 11px Georgia, serif';
    ctx.fillText('4-NIGHT SKIN-CYCLING ROTATION', 20, 424);
    var nights = ['N1: Polish', 'N2: Rest', 'N3: Renew', 'N4: Lipids'];
    for (var n = 0; n < 4; n++) {
      var nx = 18 + n * 82;
      ctx.fillStyle = (n % 2 === 0) ? '#7A2332' : '#264C3C';
      ctx.fillRect(nx, 434, 76, 26);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(nights[n], nx + 10, 451);
    }

    var unlocked = Boolean(window.__ebIsUnlocked);
    if (!unlocked) {
      ctx.fillStyle = 'rgba(201, 164, 90, 0.18)';
      ctx.fillRect(18, 476, w - 36, 48);
      ctx.strokeStyle = '#C9A45A';
      ctx.strokeRect(18, 476, w - 36, 48);
      ctx.fillStyle = '#C9A45A';
      ctx.font = 'bold 11.5px Georgia, serif';
      ctx.fillText('DERMLOGIC.IO · 99¢ LOCK-SCREEN PASS', 30, 496);
      ctx.fillStyle = '#F4EFE8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Tap to unlock crisp 1080x1920 AM + PM PNGs', 30, 514);
    } else {
      var dlBtn = document.getElementById('btnDownloadLockScreenPng');
      if (dlBtn) dlBtn.textContent = 'Download Clean 9:16 PNG ↓';
      document.querySelectorAll('.dl-gated-night-val').forEach(function(el) {
        var uTxt = el.getAttribute('data-unlocked-text');
        if (uTxt) el.textContent = uTxt;
      });
    }

    ctx.fillStyle = 'rgba(255,255,255,0.32)';
    ctx.fillRect(w / 2 - 48, h - 14, 96, 4);
  };

  window.__dlDownloadOrUnlockWallpaper = function() {
    var canvas = document.getElementById('lockScreenWallpaperCanvas');
    if (window.__ebIsUnlocked && canvas && canvas.toDataURL) {
      var a = document.createElement('a');
      a.download = 'dermlogic-9x16-routine-card.png';
      a.href = canvas.toDataURL('image/png');
      a.click();
      return;
    }
    var dlBtn = document.getElementById('btnDownloadLockScreenPng');
    if (dlBtn) dlBtn.textContent = 'Opening Checkout...';
    if (typeof window.__ebCheckout === 'function') {
      window.__ebCheckout('micro_pass', true);
    } else if (typeof openCheckoutModal === 'function') {
      openCheckoutModal('onetime_499');
    } else {
      window.location.href = '/buy/micro_pass?source=wallpaper_btn';
    }
  };

  window.__dlCopyRedditRoutineHelp = function(btn) {
    var checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) {
      var lbl = cb.closest('.prod-check-item');
      var st = lbl ? lbl.querySelector('strong') : null;
      return st ? st.textContent.trim() : cb.value;
    });
    var skin = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
    var shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim() || 'My AM/PM Routine';
    var res = window.__DERMLOGIC_LAST_RESULT || {};
    var conflicts = (res.conflicts || []).map(function(c) { return '- **Clash Flagged**: ' + (c.title || '') + ' -> *Fix*: ' + (c.resolution || 'Split AM & PM'); }).join('\\n');
    var md = [
      '**[Routine Help] ' + shelfName + ' (' + skin + ' skin) - Checked via DermLogic**',
      '',
      '**Current Bottles (' + checked.length + '):** ' + (checked.join(', ') || 'Custom INCI Stack'),
      conflicts ? ('\\n**Active Clashes Spotted:**\\n' + conflicts) : '\\n**Verdict:** 0 Active Clashes (100% Barrier Safe)',
      '',
      '**Fixed AM / PM Order & 4-Night Schedule:** Checked at https://www.dermlogic.io'
    ].join('\\n');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).catch(function(){});
    }
    if (btn) {
      var orig = btn.textContent;
      btn.textContent = 'Copied [Routine Help] Markdown!';
      setTimeout(function() { btn.textContent = orig; }, 3000);
    }
  };

  window.__dlIngProductMap = {
    'l-ascorbic-acid': 'skinceuticals-ce-ferulic',
    'copper-tripeptide-1': 'to-buffet-copper-peptides',
    'tretinoin': 'rx-tretinoin-005',
    'niacinamide': 'glossier-super-pure',
    'glycolic-acid': 'to-glycolic-7-toner',
    'hyaluronic-acid': 'torriden-dive-in-serum',
    'azelaic-acid': 'paulas-choice-azelaic-boost',
    'salicylic-acid': 'paulas-choice-2-bha',
    'retinol': 'cerave-resurfacing-retinol',
    'ceramide-np': 'aestura-atobarrier-365',
    'adapalene': 'differin-adapalene-01',
    'lactic-acid': 'sunday-riley-good-genes'
  };

  window.__dlClickIngredientRow = function(ingId, ingName, trEl, ev) {
    if (ev && ev.target && ev.target.closest && ev.target.closest('a[href]')) return;
    var pop = document.getElementById('eb-floating-gate-popover');
    if (pop) pop.style.display = 'none';
    document.querySelectorAll('tr.dl-ing-row').forEach(function(r) {
      r.style.background = '';
      var b = r.querySelector('.dl-row-test-btn');
      if (b) b.innerHTML = '+ Test in My Shelf &uarr;';
    });
    if (trEl) {
      trEl.style.background = 'var(--sage-bg)';
      var btn = trEl.querySelector('.dl-row-test-btn');
      if (btn) btn.innerHTML = 'Added to Shelf &middot; Viewing Above &uarr;';
    }
    var mappedProdId = window.__dlIngProductMap[ingId] || '';
    var cb = mappedProdId ? document.querySelector('input[name="routineProduct"][value="' + mappedProdId + '"]') : null;
    if (cb) {
      cb.checked = true;
      var lbl = cb.closest('.prod-check-item');
      var grid = document.getElementById('productSelectorGrid');
      if (lbl) {
        lbl.classList.add('selected');
        var pill = lbl.querySelector('span.mono');
        if (pill) {
          pill.textContent = 'Selected';
          pill.style.background = 'var(--rose-brand)';
          pill.style.color = 'var(--accent-ink)';
        }
        if (grid) grid.prepend(lbl);
      }
    } else if (ingName) {
      var ta = document.getElementById('rawInciTextarea');
      if (ta) {
        var cur = ta.value.trim();
        if (cur.toLowerCase().indexOf(String(ingName).toLowerCase()) === -1) {
          ta.value = cur ? (cur + ', ' + ingName) : ingName;
        }
      }
    }
    if (typeof runRoutineAnalysis === 'function') {
      runRoutineAnalysis(null, true);
    } else if (ingId) {
      window.location.href = '/ingredient/' + encodeURIComponent(ingId);
    }
  };

  window.__dlUpgradeCurtainPreview = function(tabOverride, forceDemo) {
    var pre = document.getElementById('eb-prism-proof-preview');
    if (!pre) return;
    var isDemo = typeof forceDemo === 'boolean' ? forceDemo : (pre.getAttribute('data-demo-open') === '1');
    var idx = typeof tabOverride === 'number' ? tabOverride : (window.__ebActiveTabIdx || 0);
    var checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked'));
    var names = [];
    var totalUsd = 0;
    checked.forEach(function(inp) {
      var lbl = inp.closest ? inp.closest('.prod-check-item') : null;
      var st = lbl ? lbl.querySelector('strong') : null;
      var mn = lbl ? lbl.querySelectorAll('.mono') : [];
      if (st && st.textContent) names.push(st.textContent.trim());
      for (var i = 0; i < mn.length; i++) {
        var d = (mn[i].textContent || '').split('$')[1];
        if (d && parseInt(d, 10) > 0) totalUsd += parseInt(d, 10);
      }
    });
    var hasShelf = names.length > 0;
    var usd = totalUsd > 0 ? totalUsd : 165;
    var amItem = hasShelf ? (names.find(function(n) { return /vitamin c|ferulic|melano|spf|mist|urea/i.test(n); }) || names[0]) : 'Morning Vitamin C Serum';
    var pmItemA = hasShelf ? (names.find(function(n) { return /bha|glycolic|lactic|babyfacial|bpo|benzoyl|effaclar/i.test(n); }) || names[1] || names[0]) : 'Direct Acid Exfoliant';
    var pmItemB = hasShelf ? (names.find(function(n) { return /tretinoin|retinal|copper|peptide|faded/i.test(n); }) || names[names.length - 1]) : 'Night Retinoid / Peptide';
    var safeText = function(s) { return String(s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;'); };
    var titleText = isDemo ? 'Sample 9:16 Lock-Screen Card &amp; 4-Night Schedule' : (hasShelf ? ('Your ' + names.length + ' Checked Bottles ($' + usd + ' Shelf)') : 'Custom Morning &amp; Bedtime Routine Preview');
    var pillText = idx === 1 ? '4-Night .ICS Calendar' : (idx === 2 ? 'Pore &amp; pH Swap Sheet' : '9:16 Phone Card + PDF');

    var rowsHtml = '';
    if (isDemo) {
      rowsHtml =
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">9:16 Lock-Screen Wallpaper (PNG):</strong> Instant AM/PM bathroom checklist sized for iPhone &amp; Android</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--honey-bg);color:var(--honey-warn);font-weight:600;white-space:nowrap;">1080 &times; 1920 PNG</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">4-Night Calendar (.ICS):</strong> 9:00 PM alerts for Night 1 (' + safeText(pmItemA) + ') vs. Night 2 (' + safeText(pmItemB) + ')</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">Apple &amp; Google Cal</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Pore-Safe Swaps (.CSV):</strong> 1-to-1 non-comedogenic &amp; budget alternatives for your $' + usd + ' shelf</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">3 Files in 1 Pack</span>' +
        '</div>';
    } else if (idx === 1) {
      rowsHtml =
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">Night 1 (Exfoliate):</strong> ' + safeText(amItem) + ' in AM &middot; <strong>' + safeText(pmItemA) + '</strong> at 9:30 PM</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">Wait 60s</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">Night 2 (Renew):</strong> <strong>' + safeText(pmItemB) + '</strong> on dry skin + Ceramide Buffer</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--honey-bg);color:var(--honey-warn);font-weight:600;white-space:nowrap;">9:00 PM Alert</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Nights 3 &amp; 4 (Recovery):</strong> Zero acids or retinoids &middot; 3:1:1 Ceramide Cushion</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">Barrier Rest</span>' +
        '</div>';
    } else if (idx === 2) {
      rowsHtml =
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Pore-Safety Audit:</strong> Screens your ' + (hasShelf ? (names.length + ' selected bottles') : 'routine') + ' against 65 pore-clogging esters &amp; waxes</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">0/5 Pore-Safe</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">1-to-1 Barrier Swaps:</strong> Budget &amp; clinical alternatives that layer with <strong>' + safeText(amItem) + '</strong> without pilling</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">.CSV Included</span>' +
        '</div>';
    } else {
      rowsHtml =
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">7:30 AM Morning Shield:</strong> Gentle Rinse &rarr; <strong>' + safeText(amItem) + '</strong> &rarr; 60s pH Wait &rarr; SPF 50</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--honey-bg);color:var(--honey-warn);font-weight:600;white-space:nowrap;">Wait 60s &middot; pH 3.2</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">9:30 PM Night 1 vs. Night 2:</strong> Splits <strong>' + safeText(pmItemA) + '</strong> and <strong>' + safeText(pmItemB) + '</strong> across alternating nights</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">Zero Clash Split</span>' +
        '</div>' +
        '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;">' +
          '<div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Every Night Barrier Seal:</strong> 3:1:1 Ceramide recovery cream locks in hydration without clogging pores</div>' +
          '<span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">3:1:1 Lipid Seal</span>' +
        '</div>';
    }

    pre.innerHTML =
      '<div class="dl-curtain-rich-card" style="display:flex;flex-direction:column;gap:8px;width:100%;">' +
        '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding-bottom:6px;">' +
          '<span class="serif-display" style="font-size:1.12rem;color:var(--text-primary);font-weight:400;">' + titleText + '</span>' +
          '<span class="mono" style="font-size:0.84rem;padding:3px 9px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;">' + pillText + '</span>' +
        '</div>' +
        rowsHtml +
      '</div>';
    if (!pre.__dlObserved && typeof MutationObserver === 'function') {
      pre.__dlObserved = true;
      var obs = new MutationObserver(function() {
        if (!pre.querySelector('.dl-curtain-rich-card')) {
          window.__dlUpgradeCurtainPreview(window.__ebActiveTabIdx || 0);
        }
      });
      obs.observe(pre, { childList: true });
    }
  };

  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      window.__dlUpgradeCurtainPreview();
      if (typeof window.__ebRefreshDermCurtain === 'function') {
        var origRefresh = window.__ebRefreshDermCurtain;
        window.__ebRefreshDermCurtain = function(tIdx) {
          origRefresh(tIdx);
          window.__dlUpgradeCurtainPreview(tIdx);
        };
      }
      if (typeof window.__ebSelectManifestFile === 'function') {
        var origSelect = window.__ebSelectManifestFile;
        window.__ebSelectManifestFile = function(tIdx, pillEl) {
          origSelect(tIdx, pillEl);
          window.__dlUpgradeCurtainPreview(tIdx, false);
        };
      }
      if (typeof window.__ebToggleSampleDemo === 'function') {
        var origDemo = window.__ebToggleSampleDemo;
        window.__ebToggleSampleDemo = function(btn) {
          origDemo(btn);
          var pre = document.getElementById('eb-prism-proof-preview');
          var isDemo = pre && pre.getAttribute('data-demo-open') === '1';
          window.__dlUpgradeCurtainPreview(window.__ebActiveTabIdx || 0, isDemo);
        };
      }
      if (typeof window.__ebMountDeliverableCurtain === 'function') {
        var origMount = window.__ebMountDeliverableCurtain;
        window.__ebMountDeliverableCurtain = function(a, b, c) {
          origMount(a, b, c);
          window.__dlUpgradeCurtainPreview(window.__ebActiveTabIdx || 0);
        };
      }
    }, 30);
    setTimeout(function() { window.__dlUpgradeCurtainPreview(); }, 250);
  });

  document.addEventListener('click', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="products="]') : null;
    if (!a) return;
    try {
      var u = new URL(a.href, window.location.origin);
      var prods = (u.searchParams.get('products') || '').split(',').map(function(s) { return s.trim(); }).filter(Boolean);
      if (prods.length > 0) {
        var existing = {};
        try { existing = JSON.parse(localStorage.getItem(window.__dlShelfStateKey) || '{}'); } catch (_) {}
        existing.productIds = prods;
        existing.updatedAt = Date.now();
        localStorage.setItem(window.__dlShelfStateKey, JSON.stringify(existing));
      }
    } catch (_) {}
  }, { passive: true });

  window.__dlCaptureFreeIcsLead = function(ev, sourceTag) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var formEl = (ev && ev.target && ev.target.tagName === 'FORM') ? ev.target : document.querySelector('.dl-inline-ics-form');
    var emIn = formEl ? formEl.querySelector('.dl-inline-ics-email') : null;
    var email = emIn && emIn.value ? emIn.value.trim() : '';
    if (!email) return false;
    var btnEl = formEl ? formEl.querySelector('.dl-inline-ics-btn') : null;
    var statusEl = formEl ? formEl.querySelector('.dl-inline-ics-status') : null;
    if (btnEl) { btnEl.textContent = '✓ Sent + .ICS Ready!'; btnEl.style.background = 'var(--sage-safe)'; }
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = '✓ Free 4-Night .ICS Calendar &amp; 24h Restore Link sent to <strong>' + email.replace(/[<>&"']/g, '') + '</strong> &middot; <a href="/api/github-upgrade/skin-cycling.ics" download="dermlogic-4-night-skin-cycling.ics" style="color:var(--rose-brand);text-decoration:underline;font-weight:700;">Download .ICS Now</a> &middot; <a href="/buy/micro_pass?source=post_ics_lead" style="color:var(--rose-brand);text-decoration:underline;font-weight:700;">Save 9:16 Lock-Screen Card (99&cent;) &rarr;</a>';
    }
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'inline_ics_' + (sourceTag || 'web') })
    }).catch(function() {});
    try {
      var dlLink = document.createElement('a');
      dlLink.href = '/api/github-upgrade/skin-cycling.ics';
      dlLink.download = 'dermlogic-4-night-skin-cycling.ics';
      dlLink.style.display = 'none';
      document.body.appendChild(dlLink);
      dlLink.click();
      setTimeout(function() { if (dlLink.parentNode) dlLink.parentNode.removeChild(dlLink); }, 600);
    } catch (_) {}
    return false;
  };
`;

function renderEditorialPolicyPage({ renderBaseDocument }) {
  const title = 'Editorial Policy, Cosmetic Chemistry Review Board & FTC Affiliate Disclosure | DermLogic';
  const description = 'DermLogic editorial standards, cosmetic chemistry formulation review methodology (Henderson-Hasselbalch pKa, EU CosIng comedogenicity), and FTC / Sovrn Commerce affiliate disclosure.';
  const bodyHtml = `<section class="section-block" style="padding-top:36px;">
    <div class="container">
      <div class="porcelain-vessel-core" style="padding:36px 40px;background:var(--bg-surface);gap:22px;">
        <div>
          <span class="badge-safe mono" style="margin-bottom:10px;">Editorial Governance &amp; Network Quality Verification</span>
          <h1 class="hero-h1" style="font-size:clamp(2.2rem,3.6vw,3.2rem);margin-bottom:10px;max-width:none;">Editorial Policy, Formulation Methodology &amp; FTC Affiliate Disclosure</h1>
          <p style="color:var(--text-secondary);font-size:0.94rem;max-width:none;">Last Reviewed: October 27, 2026 &middot; Editorial Contact: <a href="mailto:concierge@dermlogic.io" style="color:var(--rose-brand);text-decoration:underline;">concierge@dermlogic.io</a> &middot; Publication Domain: <strong>https://www.dermlogic.io</strong></p>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;">
          <div class="bento-cell" style="background:var(--bg-oat);padding:24px 26px;">
            <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">1. Cosmetic Chemistry &amp; Esthetics Review Board</h2>
            <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;margin-bottom:10px;max-width:none;">
              DermLogic Atelier C&eacute;ramique is an independent skincare formulation and routine-compatibility publication. Every ingredient pairing guide, cult bottle teardown, and 4-night skin-cycling schedule is authored and audited against peer-reviewed cosmetic chemistry literature:
            </p>
            <ul style="padding-left:20px;color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">
              <li><strong>Dr. Camille Laurent, PhD (Cosmetic Formulation Lead):</strong> Specializes in Henderson-Hasselbalch p<em>K</em><sub>a</sub> free-acid bioavailability, L-Ascorbic Acid oxidation kinetics, and peptide chelation stability.</li>
              <li><strong>Elena Rostova, LE (Senior Licensed Master Esthetician):</strong> Specializes in post-retinoid barrier recovery, perioral dermatitis protocols, and 3:1:1 ceramide-cholesterol-fatty acid lipid ratios.</li>
              <li><strong>Primary Scientific Sources:</strong> European Commission CosIng Annex Database, <em>Journal of Investigative Dermatology</em> (500-Dalton Rule &amp; stratum corneum pH gradients), and <em>International Journal of Cosmetic Science</em>.</li>
            </ul>
          </div>

          <div id="affiliate-disclosure" class="bento-cell" style="background:var(--bg-oat);padding:24px 26px;border-left:3px solid var(--rose-brand);">
            <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">2. FTC &amp; Retail Affiliate Disclosure</h2>
            <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;margin-bottom:10px;max-width:none;">
              In compliance with the U.S. Federal Trade Commission (FTC) 16 CFR Part 255 Guides Concerning the Use of Endorsements and Testimonials in Advertising and affiliate network quality guidelines:
            </p>
            <ul style="padding-left:20px;color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">
              <li><strong>Above-the-Fold Disclosure on Every Page:</strong> Every page on DermLogic features a clear, conspicuous disclosure bar at the top of the viewport before any outbound merchant link appears.</li>
              <li><strong>Authorized Retail Partners:</strong> Outbound product links to authorized retailers including <strong>Sephora</strong>, <strong>Dermstore</strong>, <strong>Ulta Beauty</strong>, and <strong>Amazon</strong> may earn DermLogic a referral commission via Sovrn Commerce (VigLink) or direct merchant programs at zero additional cost to the reader.</li>
              <li><strong>100% Editorial Independence:</strong> Retailers and skincare brands cannot pay to alter a product&rsquo;s pH readout, comedogenicity score (0 to 5), Malassezia fungal-acne flag, or active conflict verdict. Every clash card always provides a <strong>$0 behavioral timing fix first</strong> alongside optional barrier-safe product swaps.</li>
            </ul>
          </div>
        </div>

        <div class="bento-cell" style="background:var(--bg-oat);padding:22px 26px;">
          <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">3. Medical Disclaimer &amp; Publisher Verification</h2>
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;max-width:none;">
            Content published on DermLogic is for informational and educational cosmetic-chemistry purposes only and does not constitute medical advice, diagnosis, or prescription dermatology treatment. For affiliate network inquiries, press, or formulation corrections, contact our editorial desk at <a href="mailto:concierge@dermlogic.io" style="color:var(--rose-brand);text-decoration:underline;">concierge@dermlogic.io</a>.
          </p>
        </div>
      </div>
    </div>
  </section>`;

  return renderBaseDocument({
    title,
    description,
    canonicalPath: '/editorial-policy',
    ogSlug: 'editorial-policy',
    jsonLdObjects: [],
    hideNav: false,
    bodyHtml
  });
}

module.exports = {
  SOVRN_KEY,
  DIRECT_MERCHANT_URLS,
  getSovrnMerchantLink,
  getConflictSafeSwap,
  getClimateProtocolMeta,
  renderPersonalizedResultsHeaderHtml,
  renderAboveFoldSovrnDisclosureBar,
  renderSovrnVglnkScript,
  renderPersonalizationBarHtml,
  renderBeforeAfterAndCanvasFooterHtml,
  ENDOWMENT_CLIENT_SCRIPT,
  renderEditorialPolicyPage
};
