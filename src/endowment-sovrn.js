'use strict';

/**
 * DermLogic (#4): Bulletproof Sovrn Commerce Compliance, Layer A State Persistence,
 * 3-Step Endowment Escalation, Before/After Clash Toggle, 9:16 Lock-Screen Canvas & Safe Swaps.
 * Strictly < 1,000 lines and zero em-dashes.
 */

const { CULT_PRODUCTS, CLINICAL_INGREDIENTS } = require('./clinical-data');
const { renderInteractiveFourNightCalendarHtml, PERSONA_INTERACTIVE_CLIENT_JS } = require('./celebrity-routines');

const SOVRN_KEY = process.env.SOVRN_API_KEY || process.env.SOVRN_COMMERCE_KEY || process.env.VIGLINK_API_KEY || '';
const AMAZON_TAG = process.env.AMAZON_ASSOCIATE_TAG || 'dermlogic-20';

function escapeHtml(str) {
  if (str == null) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const DIRECT_MERCHANT_URLS = {
  'skinceuticals-ce-ferulic': { url: 'https://www.dermstore.com/p/skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid-30ml/11289609/', directMerchantUrl: 'https://www.dermstore.com/p/skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid-30ml/11289609/', retailer: 'Dermstore', partner: 'dermstore' },
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
  'rohto-melano-cc': { url: `https://www.amazon.com/dp/B08R82XGV2?tag=${AMAZON_TAG}`, retailer: 'Amazon', partner: 'amazon' },
  'differin-adapalene-01': { url: 'https://www.ulta.com/p/adapalene-gel-01-acne-treatment-xlsImpprod15791005', retailer: 'Ulta Beauty', partner: 'dermstore' },
  'timeless-20-vitamin-c': { url: `https://www.amazon.com/s?k=Timeless+Skin+Care+20%25+Vitamin+C+E+Ferulic+Acid+Serum&tag=${AMAZON_TAG}`, retailer: 'Amazon', partner: 'amazon' },
  'cosrx-snail-96-mucin': { url: 'https://www.ulta.com/p/advanced-snail-96-mucin-power-essence-xlsImpprod15641052', retailer: 'Ulta Beauty', partner: 'dermstore' },
  'cerave-pm-lotion': { url: 'https://www.ulta.com/p/pm-facial-moisturizing-lotion-xlsImpprod5140027', retailer: 'Ulta Beauty', partner: 'dermstore' },
  'illiyoon-ceramide-ato': { url: `https://www.amazon.com/s?k=ILLIYOON+Ceramide+Ato+Concentrate+Cream&tag=${AMAZON_TAG}`, retailer: 'Amazon', partner: 'amazon' },
  'stratia-lipid-gold': { url: `https://www.amazon.com/s?k=Stratia+Lipid+Gold+Barrier+Lotion&tag=${AMAZON_TAG}`, retailer: 'Amazon', partner: 'amazon' },
  'boj-relief-sun-spf50': { url: `https://www.amazon.com/s?k=Beauty+of+Joseon+Relief+Sun+SPF+50&tag=${AMAZON_TAG}`, retailer: 'Amazon', partner: 'amazon' },
  'to-glycolic-acid-7': { url: 'https://www.sephora.com/product/the-ordinary-deciem-glycolic-acid-7-toning-solution-P427406', retailer: 'Sephora', partner: 'sephora' },
  'to-niacinamide-10-zinc': { url: 'https://www.sephora.com/product/the-ordinary-deciem-niacinamide-10-zinc-1-P427417', retailer: 'Sephora', partner: 'sephora' }
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
      ? `https://www.amazon.com/s?k=${q}&tag=${encodeURIComponent(AMAZON_TAG)}`
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
  if (/copper/.test(text) || (/ascorbic|vitamin c/.test(text) && /tretinoin|retinol|retinal|adapalene/.test(text))) {
    const m = getSovrnMerchantLink('aestura-atobarrier-365', 'sephora');
    return {
      freeFix: 'Free Timing Fix: Wear Vitamin C at 7:30 AM under SPF and save Retinol or Peptides for 9:30 PM.',
      swapLabel: 'Soothing Cushion: Aestura Atobarrier 365 Ceramide Cream ($32)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'aestura-atobarrier-365'
    };
  }
  if (/benzoyl|bpo/.test(text)) {
    const m = getSovrnMerchantLink('lrp-cicaplast-baume-b5', 'dermstore');
    return {
      freeFix: 'Free Timing Fix: Use Benzoyl Peroxide in the morning shower and apply Retinoid on dry skin at bedtime.',
      swapLabel: 'Soothing Buffer: La Roche-Posay Cicaplast Baume B5+ ($17)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'lrp-cicaplast-baume-b5'
    };
  }
  if (/tretinoin|retinol|retinal|adapalene/.test(text)) {
    const m = getSovrnMerchantLink('lrp-cicaplast-baume-b5', 'dermstore');
    return {
      freeFix: 'Free Timing Fix: Alternate your Exfoliating Acid (Night 1) and Retinoid (Night 2) — never layer on the same night.',
      swapLabel: 'Soothing Buffer: La Roche-Posay Cicaplast Baume B5+ ($17)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'lrp-cicaplast-baume-b5'
    };
  }
  if (/glycolic|salicylic|bha|lactic|acid/.test(text)) {
    const m = getSovrnMerchantLink('tower28-sos-spray', 'sephora');
    return {
      freeFix: 'Free Timing Fix: Alternate Exfoliating Acids (Night 1) and Retinoids (Night 2) on a 4-night cycle.',
      swapLabel: 'Calm Redness: Tower 28 SOS Daily Rescue Mist ($28)',
      directUrl: m.directUrl,
      beaconUrl: m.beaconUrl,
      retailer: m.retailer,
      productId: 'tower28-sos-spray'
    };
  }
  const m = getSovrnMerchantLink('dieux-instant-angel', 'sephora');
  return {
    freeFix: 'Free Timing Fix: Space active serums 60 seconds apart from thinnest watery drop to richest cream.',
    swapLabel: 'Rich Cushion: Dieux Instant Angel Lipid Cream ($45)',
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
      <span style="flex-shrink:0;display:inline-flex;align-items:center;gap:6px;flex-wrap:wrap;"><button type="button" id="dl-top-bar-dupe-card-btn" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="background:#1E4D3B;color:#FAF8F5;border:1px solid #1E4D3B;padding:2px 8px;border-radius:999px;font-family:var(--font-mono);font-size:0.62rem;font-weight:700;cursor:pointer;white-space:nowrap;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-top-bar-safe-card-btn" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('allergen_safe');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="background:#FAF8F5;color:#1E4D3B;border:1px solid #1E4D3B;padding:2px 8px;border-radius:999px;font-family:var(--font-mono);font-size:0.62rem;font-weight:700;cursor:pointer;white-space:nowrap;">&#10003; 8-Allergen Safe Card &rarr;</button><a href="/editorial-policy" class="mono" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;white-space:nowrap;">Editorial &amp; Testing Policy</a> &middot; <a href="/editorial-policy#affiliate-disclosure" class="mono" style="color:var(--text-primary);font-weight:500;text-decoration:underline;white-space:nowrap;">Affiliate Disclosure</a></span>
    </div>
  </div>`;
}

function renderSovrnVglnkScript() {
  return `<script type="text/javascript">
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
      pmNote: 'Sandwich Method: Apply thin soothing cream first, wait 15m, apply pea-sized retinoid, then seal with barrier cream.',
      rule: 'Wait 15 minutes after washing so skin is dry, then buffer your retinoid over a soothing cream to stop flaking and stinging.'
    },
    pregnancy_nursing: {
      badge: 'Pregnancy-Safe Filter Active',
      shortLabel: 'Pregnancy-Safe Mode',
      waitBadge: 'Swap Retinoids',
      pmNote: 'Pregnancy-Safe Note: Pause Tretinoin, Retinol & Adapalene; substitute Azelaic Acid 15% or Bakuchiol peptide serum.',
      rule: 'Retinoids (Tretinoin, Retinol, Adapalene) and strong Salicylic Acid are flagged for swap to Azelaic Acid 15% + Bakuchiol.'
    },
    humid_oily: {
      badge: 'Humid Weather · Light Layers',
      shortLabel: 'Humid / Dewy Mode',
      waitBadge: 'Wait 90s · Light Layers',
      pmNote: 'Humid Weather Note: Use lightweight gel-creams at night and allow 90s full absorption before morning SPF 50.',
      rule: 'Give lightweight serums 90 seconds to absorb before SPF 50 to prevent humid-weather shine and makeup pilling.'
    },
    indoor_dry: {
      badge: 'Dry Indoor Air / AC Comfort',
      shortLabel: 'AC / Dry Heat Mode',
      waitBadge: 'Seal in 60s · Damp Skin',
      pmNote: 'Dry Air Note: Mist skin before hydrating serums and lock in moisture within 60 seconds using a rich soothing cream.',
      rule: 'Pat hydrating serums onto damp skin, then lock in moisture within 60 seconds with a rich soothing ceramide cream.'
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
  return `<div id="personalizedRoutineBanner" style="padding:0 0 4px 0;margin-bottom:4px;display:flex;flex-direction:column;gap:2px;min-width:0;">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;min-width:0;">
      <strong id="personalizedRoutineTitle" class="serif-display" style="font-size:1.32rem;color:var(--text-primary);font-weight:400;min-width:0;">${escapeHtml(heading)}</strong>
      <span style="display:inline-flex;align-items:center;gap:5px;flex-wrap:wrap;"><span id="personalizedClimateBadge" class="badge-safe mono" style="font-size:0.72rem;padding:2px 8px;">${escapeHtml(meta.badge)}</span><button type="button" id="dl-banner-dupe-card-btn" class="mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap;">&#10003; $86 Dupe Card &rarr;</button><button type="button" id="dl-banner-pass-card-btn" class="mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;font-size:0.68rem;font-weight:700;cursor:pointer;white-space:nowrap;">9:16 Card &rarr;</button></span>
    </div>
    <div id="personalizedClimateRule" style="display:none;">${escapeHtml(meta.rule)}</div>
  </div>`;
}

function renderPersonalizationBarHtml(initialClimate = 'indoor_dry', initialShelfName = '') {
  return `<div id="endowmentPersonalizationBar" style="display:flex;flex-direction:column;gap:4px;min-width:0;">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;">
      <div id="climateContextPills" role="group" aria-label="Climate and Barrier Context" style="display:inline-flex;gap:3px;background:var(--bg-oat);padding:2px;border-radius:999px;flex-wrap:wrap;">
        <button type="button" class="vanity-light-btn mono ${initialClimate === 'indoor_dry' ? 'active' : ''}" data-climate="indoor_dry" aria-pressed="${initialClimate === 'indoor_dry' ? 'true' : 'false'}" style="padding:3px 8px;font-size:0.72rem;min-height:22px;" onclick="window.__dlSetClimate('indoor_dry', this)">AC / Dry</button>
        <button type="button" class="vanity-light-btn mono ${initialClimate === 'humid_oily' ? 'active' : ''}" data-climate="humid_oily" aria-pressed="${initialClimate === 'humid_oily' ? 'true' : 'false'}" style="padding:3px 8px;font-size:0.72rem;min-height:22px;" onclick="window.__dlSetClimate('humid_oily', this)">Humid</button>
        <button type="button" class="vanity-light-btn mono ${initialClimate === 'retinoid_retinization' ? 'active' : ''}" data-climate="retinoid_retinization" aria-pressed="${initialClimate === 'retinoid_retinization' ? 'true' : 'false'}" style="padding:3px 8px;font-size:0.72rem;min-height:22px;" onclick="window.__dlSetClimate('retinoid_retinization', this)">Retinoid Purge</button>
        <button type="button" class="vanity-light-btn mono ${initialClimate === 'pregnancy_nursing' ? 'active' : ''}" data-climate="pregnancy_nursing" aria-pressed="${initialClimate === 'pregnancy_nursing' ? 'true' : 'false'}" style="padding:3px 8px;font-size:0.72rem;min-height:22px;" onclick="window.__dlSetClimate('pregnancy_nursing', this)">Pregnancy</button>
      </div>
      <div style="display:inline-flex;align-items:center;gap:5px;flex:1;min-width:170px;">
        <input id="shelfNameInput" type="text" maxlength="44" aria-label="Custom Shelf Name" class="input-box" style="padding:4px 9px;font-size:16px;border-radius:999px;" placeholder="Routine name (e.g., Maya's Shelf)..." value="${escapeHtml(initialShelfName)}" oninput="window.__dlUpdatePersonalization()" onkeydown="if(event.key==='Enter'){event.preventDefault();if(typeof runRoutineAnalysis==='function')runRoutineAnalysis(null,true);}" />
        <button type="button" id="dl-climate-bar-pass-btn" class="mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:3px 9px;border-radius:999px;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;font-size:0.7rem;font-weight:700;cursor:pointer;white-space:nowrap;">9:16 Card &rarr;</button>
        <span id="shelfDraftSavedBadge" class="mono" style="display:none;">Saved</span>
      </div>
    </div>
    <div id="analyzeBtnFeedback" role="status" aria-live="polite" style="display:none;padding:5px 8px;background:var(--sage-bg);color:var(--sage-safe);border-left:3px solid var(--sage-safe);font-size:0.76rem;font-weight:500;line-height:1.3;"></div>
  </div>`;
}

function renderBeforeAfterAndCanvasFooterHtml(res, n1Label, n1Val, n2Label, n2Val, n3Label, n3Val, n4Val) {
  return `
    <div style="padding:16px 18px;background:var(--bg-canvas);display:flex;flex-direction:column;gap:14px;min-width:0;">
      ${renderInteractiveFourNightCalendarHtml(escapeHtml(n1Label), escapeHtml(n1Val), escapeHtml(n2Label), escapeHtml(n2Val), escapeHtml(n3Label), escapeHtml(n3Val), escapeHtml(n4Val))}

      <div id="lockScreenCanvasSection" style="padding:14px 16px;background:linear-gradient(155deg,#3A1F27 0%,#28141A 100%);color:#FDF8F6;border:none;border-radius:20px;display:grid;grid-template-columns:112px minmax(0,1fr);gap:16px;align-items:center;min-width:0;">
        <div style="border-radius:16px;padding:4px;background:linear-gradient(145deg,#5A303D,#28141A);box-shadow:0 10px 24px rgba(58,31,39,0.28);">
          <canvas id="lockScreenWallpaperCanvas" width="360" height="640" onclick="window.__dlDownloadOrUnlockWallpaper()" title="Click to download 9:16 Lock-Screen Routine Card" style="width:104px;height:185px;border-radius:12px;background:#3A1F27;display:block;cursor:pointer;"></canvas>
        </div>
        <div style="min-width:0;display:flex;flex-direction:column;gap:8px;">
          <div>
            <span class="mono" style="font-size:0.72rem;color:#C9A45A;font-weight:700;display:block;text-transform:uppercase;letter-spacing:0.05em;">ATELIER 9:16 LOCK-SCREEN WALLPAPER (AM + PM &middot; &check; EU CosIng &amp; Lab pH)</span>
            <div class="serif-display" style="font-size:1.12rem;color:#FBF8F4;line-height:1.22;margin-top:2px;">Keep your 7:30 AM &amp; 9:30 PM order on your iPhone lock screen.</div>
            <div style="font-size:0.76rem;color:#D5CBC0;margin-top:4px;line-height:1.38;">Includes pH windows, wait timers, ceramide sandwich buffers &amp; 4-Night cycle below your phone clock &middot; 30-day money-back guarantee.</div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;">
            <button type="button" id="btnDownloadLockScreenPng" class="btn-primary mono" style="padding:7px 13px;min-height:32px;font-size:0.8rem;background:#7A2332;color:#FFF;" onclick="window.__dlDownloadOrUnlockWallpaper()">Save 9:16 PNG ($1.99 &middot; 30-Day Guarantee) &rarr;</button>
            <button type="button" class="btn-secondary mono" style="padding:7px 12px;min-height:32px;font-size:0.78rem;background:rgba(255,255,255,0.08);color:#F4EFE8;border-color:rgba(201,164,90,0.4);" onclick="if(window.__dlOpenVanityDrawer){window.__dlOpenVanityDrawer('workbench');if(window.__dlSetDossierTab)window.__dlSetDossierTab('pass');}">Interactive AM/PM Preview &rarr;</button>
            <button type="button" id="btnCopyRedditRoutineHelp" class="btn-secondary mono" style="padding:6px 10px;min-height:32px;font-size:0.76rem;background:transparent;color:#C9BCAE;border-color:#3D322C;" onclick="window.__dlCopyRedditRoutineHelp(this)">Email / Copy Summary ($0)</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

const ENDOWMENT_CLIENT_SCRIPT = `
  ${PERSONA_INTERACTIVE_CLIENT_JS}
  window.__dlShelfStateKey = 'dermlogic_shelf_state_v1';
  window.__dlClimateMode = 'indoor_dry';
  window.__dlViewMode = 'fixed';

  window.__dlSaveShelfState = function() {
    try {
      var checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) { return cb.value; });
      var allergies = Array.from(document.querySelectorAll('#allergyTriggerBar .dl-allergy-chip.active')).map(function(b) { return b.getAttribute('data-allergy'); }).filter(Boolean);
      var skinType = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
      var rawInciText = (document.getElementById('rawInciTextarea') || {}).value || '';
      var shelfName = (document.getElementById('shelfNameInput') || {}).value || '';
      var state = {
        skinType: skinType,
        productIds: checked,
        allergies: allergies,
        rawInciText: rawInciText,
        shelfName: shelfName,
        climateMode: window.__dlClimateMode || 'indoor_dry',
        viewMode: window.__dlViewMode || 'fixed',
        updatedAt: Date.now()
      };
      localStorage.setItem(window.__dlShelfStateKey, JSON.stringify(state));
      var badge = document.getElementById('shelfDraftSavedBadge');
      if (badge) {
        badge.textContent = 'Saved in Browser · ' + checked.length + ' Bottles Selected';
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
        if (Array.isArray(saved.allergies) && saved.allergies.length > 0) {
          document.querySelectorAll('#allergyTriggerBar .dl-allergy-chip').forEach(function(b) {
            var on = saved.allergies.indexOf(b.getAttribute('data-allergy')) !== -1;
            b.classList.toggle('active', on);
            b.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
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
            window.__dlBootRestoring = true;
            runRoutineAnalysis();
            window.__dlBootRestoring = false;
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
      rule: 'Wait 15 minutes after washing so skin is dry, then buffer your retinoid over a soothing cream to stop flaking and stinging.'
    },
    pregnancy_nursing: {
      badge: 'Pregnancy-Safe Filter Active',
      shortLabel: 'Pregnancy-Safe Mode',
      rule: 'Retinoids (Tretinoin, Retinol, Adapalene) and strong Salicylic Acid are flagged for swap to Azelaic Acid 15% + Bakuchiol.'
    },
    humid_oily: {
      badge: 'Humid Weather · Light Layers',
      shortLabel: 'Humid / Dewy Mode',
      rule: 'Give lightweight serums 90 seconds to absorb before SPF 50 to prevent humid-weather shine and makeup pilling.'
    },
    indoor_dry: {
      badge: 'Dry Indoor Air / AC Comfort',
      shortLabel: 'AC / Dry Heat Mode',
      rule: 'Pat hydrating serums onto damp skin, then lock in moisture within 60 seconds with a rich soothing ceramide cream.'
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
    var cBtn = document.getElementById('dl-climate-bar-pass-btn');
    if (cBtn) {
      var shortC = cMode === 'pregnancy_nursing' ? 'Pregnancy' : (cMode === 'retinoid_retinization' ? 'Purge' : (cMode === 'humid_oily' ? 'Humid' : 'AC/Dry'));
      cBtn.innerHTML = '9:16 ' + shortC + ' Card &rarr;';
    }
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
    if (window.__dlSyncBudgetModeLinks) window.__dlSyncBudgetModeLinks();
    if (typeof runRoutineAnalysis === 'function') {
      runRoutineAnalysis(null, false);
    }
  };

  window.__dlUpdatePersonalization = function() {
    window.__dlSyncPersonalizedHeaderDom();
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
    if (window.__dlSyncBudgetModeLinks) window.__dlSyncBudgetModeLinks();
    if (window.__dlNameTimer) clearTimeout(window.__dlNameTimer);
    window.__dlNameTimer = setTimeout(function() {
      if (typeof runRoutineAnalysis === 'function') runRoutineAnalysis(null, false);
    }, 420);
  };

  window.__dlAfterRoutineAnalysis = function(data, isExplicitClick) {
    window.__dlSyncPersonalizedHeaderDom();
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
    if (window.__dlSyncBudgetModeLinks) window.__dlSyncBudgetModeLinks();
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
        ? '<strong style="color:var(--berry-clash);">Layered All at Once</strong> &middot; Bottles Cancel Out on Skin ($' + wUsd + ' Wasted)'
        : '<strong style="color:var(--sage-safe);">Morning &amp; Night Split</strong> &middot; Every Serum Works at Full Strength ($0 Wasted)';
    }
    var mFill = document.getElementById('dl-potency-meter-fill');
    if (mFill) {
      mFill.style.width = window.__dlViewMode === 'clash' ? '26%' : '98%';
      mFill.style.background = window.__dlViewMode === 'clash' ? 'var(--berry-clash)' : 'linear-gradient(90deg, var(--rose-brand) 0%, #10B981 100%)';
    }
    if (window.__dlBumpCustomizationCount) window.__dlBumpCustomizationCount('split_toggle');
    if (window.__dlSwitchResultStep) window.__dlSwitchResultStep(window.__dlViewMode === 'clash' ? 1 : 2, true);
    window.__dlSaveShelfState();
    window.__dlRenderWallpaperCanvas();
    if (window.__dlSyncBudgetModeLinks) window.__dlSyncBudgetModeLinks();
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
    ctx.fillText('ATELIER 9:16 WALLPAPER · EU COSING', 78, 50);
    ctx.fillStyle = '#FBF8F4';
    ctx.font = '300 38px Georgia, serif';
    ctx.fillText('07:30 · 21:30', 76, 88);

    var shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim() || 'Calibrated AM & PM Shelf';
    var hasAllergyChips = document.querySelectorAll('#allergyTriggerBar input[name="allergyTrigger"]:checked').length > 0;
    var climateLabels = { indoor_dry: 'AC / Dry Heat · 90s Wait', humid_oily: 'Humid Climate · 60s Wait', retinoid_retinization: 'Retinoid Buffer Protocol', pregnancy_nursing: '100% Pregnancy-Safe' };
    var climateTxt = hasAllergyChips ? 'EU CosIng 8-Allergen Safe' : (climateLabels[window.__dlClimateMode] || '60s Dry-Down Protocol');
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
    var hasEmOrPaid = Boolean(window.__dlSampleEmailUnlocked || window.__ebIsUnlocked || window.__ebSavedEmail || (localStorage.getItem('dl_captured_email') || localStorage.getItem('eb_captured_email') || localStorage.getItem('eb_lead_email')));
    ctx.fillStyle = '#241C18'; ctx.fillRect(18, 272, w - 36, 132);
    ctx.strokeStyle = 'rgba(201,164,90,0.4)'; ctx.strokeRect(18, 272, w - 36, 132);
    ctx.fillStyle = '#C9A45A'; ctx.font = 'bold 11.5px Georgia, serif';
    ctx.fillText(window.__dl72HrRescueActive ? '☾ 9:30 PM · ZERO-ACTIVE B5 BARRIER FLOOD' : '☾ 9:30 PM · BEDTIME RENEWAL & BUFFER', 28, 291);
    var pmSteps = window.__dl72HrRescueActive
      ? ['1. Lukewarm Water Rinse', '2. Damp-Skin Panthenol / Mist', '3. Cicaplast B5+ + Ceramide Seal']
      : [steps[3], hasEmOrPaid ? steps[4] : '2. [Locked: $0 Email to Reveal]', hasEmOrPaid ? steps[5] : '3. [Locked: $0 Email to Reveal]'];
    var pmPills = window.__dl72HrRescueActive ? ['Zero Acid', 'Damp 60s', '3:1:1 Seal'] : ['Dry 10m', hasEmOrPaid ? 'Pea Size' : 'Locked ($0)', hasEmOrPaid ? '3:1:1 Seal' : 'Locked ($0)'];
    for (var p = 0; p < 3; p++) {
      var py = 302 + p * 32;
      ctx.fillStyle = 'rgba(255,255,255,0.07)'; ctx.fillRect(26, py, w - 52, 26);
      ctx.fillStyle = '#FBF8F4'; ctx.font = 'bold 11px sans-serif';
      ctx.fillText((pmSteps[p] || '').slice(0, 27), 34, py + 17);
      ctx.fillStyle = 'rgba(201,164,90,0.22)'; ctx.fillRect(w - 98, py + 4, 64, 18);
      ctx.fillStyle = '#E8C6B0'; ctx.font = 'bold 9.5px sans-serif';
      ctx.fillText(pmPills[p], w - 91, py + 16);
    }

    // 4-Night Cycling Strip
    ctx.fillStyle = '#A7D7C5';
    ctx.font = 'bold 11px Georgia, serif';
    ctx.fillText(window.__dl72HrRescueActive ? '72-HR EMERGENCY BARRIER RESET ACTIVE' : '4-NIGHT SKIN-CYCLING ROTATION', 20, 424);
    var nights = window.__dl72HrRescueActive
      ? ['N1: B5 Flood', 'N2: B5 Flood', 'N3: Lipid', 'N4: Pea Re-In']
      : ['N1: Polish', hasEmOrPaid ? 'N2: Renew' : 'N2: Locked', hasEmOrPaid ? 'N3: Soothe' : 'N3: Locked', hasEmOrPaid ? 'N4: Lipids' : 'N4: Locked'];
    var selN = (window.__dlSelectedNightIdx || 1) - 1;
    for (var n = 0; n < 4; n++) {
      var nx = 18 + n * 82;
      ctx.fillStyle = (n === selN) ? '#C9A45A' : ((n % 2 === 0) ? '#7A2332' : '#264C3C');
      ctx.fillRect(nx, 434, 76, 26);
      ctx.fillStyle = (n === selN) ? '#28141A' : '#FFFFFF';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(nights[n], nx + 8, 451);
    }

    var unlocked = Boolean(window.__ebIsUnlocked);
    if (!unlocked) {
      ctx.fillStyle = 'rgba(201, 164, 90, 0.18)';
      ctx.fillRect(18, 476, w - 36, 48);
      ctx.strokeStyle = '#C9A45A';
      ctx.strokeRect(18, 476, w - 36, 48);
      ctx.fillStyle = '#C9A45A';
      ctx.font = 'bold 11.5px Georgia, serif';
      ctx.fillText('DERMLOGIC.IO · $0 EMAIL OR $1.99 KIT (30D GUAR.)', 26, 496);
      ctx.fillStyle = '#F4EFE8';
      ctx.font = '11px sans-serif';
      ctx.fillText('Unlock 9:30 PM Steps 2-3 ($0) or 1080x1920 PNG ($1.99)', 26, 514);
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
    var hasEm = Boolean(window.__dlSampleEmailUnlocked || window.__ebIsUnlocked || (localStorage.getItem('dl_captured_email') || localStorage.getItem('eb_captured_email')));
    if (!hasEm) {
      if (window.__dlSwitchResultStep) window.__dlSwitchResultStep(2);
      var emIn = document.getElementById('dl-inline-sample-email') || document.querySelector('.dl-inline-ics-email');
      if (emIn) { emIn.focus(); if (emIn.scrollIntoView) emIn.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
      if (btn) btn.textContent = 'Enter Email ($0) Above to Unmask Dupes & Copy →';
      return;
    }
    var checked = Array.from(document.querySelectorAll('input[name="routineProduct"]:checked')).map(function(cb) {
      var lbl = cb.closest('.prod-check-item'), st = lbl ? lbl.querySelector('strong') : null;
      return st ? st.textContent.trim() : cb.value;
    });
    var skin = (document.getElementById('skinTypeSelect') || {}).value || 'combination';
    var shelfName = ((document.getElementById('shelfNameInput') || {}).value || '').trim() || 'My AM/PM Routine';
    var res = window.__DERMLOGIC_LAST_RESULT || {};
    var conflicts = (res.conflicts || []).map(function(c) { return '- **Clash Flagged**: ' + (c.title || '') + ' -> *Fix*: ' + (c.resolution || 'Split AM & PM'); }).join('\\n');
    var allergies = (res.allergyAlerts || []).map(function(a) { return '- **EU CosIng Allergen Flag (' + (a.label || '') + ')**: ' + (a.matchedIngredients || []).join(', ') + ' -> *Safe Swap*: ' + (a.safeAlternative || 'Hypoallergenic Barrier Cream'); }).join('\\n');
    var md = ['**[Routine Help] ' + shelfName + ' (' + skin + ' skin) - ✓ EU CosIng & Lab pH Verified via DermLogic**', '', '**Current Bottles (' + checked.length + '):** ' + (checked.join(', ') || 'Custom INCI Stack'), conflicts ? ('\\n**Active Clashes Spotted:**\\n' + conflicts) : '\\n**Verdict:** 0 Active Clashes (100% Barrier Safe)', allergies ? ('\\n**EU CosIng Contact-Allergen Screen:**\\n' + allergies) : '', '', '**Fixed AM / PM Order, 8-Allergen Screen & 4-Night Schedule:** https://www.dermlogic.io'].filter(Boolean).join('\\n');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(function(){});
    if (btn) { var orig = btn.textContent; btn.textContent = '✓ Copied! Opening 9:16 Card...'; setTimeout(function() { btn.textContent = orig; }, 3000); }
    if (window.__dlOpenSampleModal) window.__dlOpenSampleModal();
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

    var hasEm = Boolean(window.__dlSampleEmailUnlocked || window.__ebIsUnlocked || (localStorage.getItem('dl_captured_email') || localStorage.getItem('eb_captured_email')));
    var rowsHtml = '';
    if (isDemo) {
      rowsHtml = '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">9:16 Lock-Screen Wallpaper (PNG):</strong> Instant AM/PM bathroom checklist sized for iPhone &amp; Android</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--honey-bg);color:var(--honey-warn);font-weight:600;white-space:nowrap;">1080 &times; 1920 PNG</span></div><div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">4-Night Calendar (.ICS):</strong> 9:00 PM alerts for Night 1 (' + safeText(pmItemA) + ') vs. Night 2 (' + safeText(pmItemB) + ')</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">Apple &amp; Google Cal</span></div><div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Pore-Safe Swaps (.CSV):</strong> 1-to-1 non-comedogenic &amp; budget alternatives for your $' + usd + ' shelf</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">3 Files in 1 Pack</span></div>';
    } else if (idx === 1) {
      rowsHtml = '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">Night 1 (Free Proof):</strong> ' + safeText(amItem) + ' in AM &middot; <strong>' + safeText(pmItemA) + '</strong> at 9:30 PM</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">Wait 60s</span></div>' + (hasEm ? '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">Night 2 (Renew):</strong> <strong>' + safeText(pmItemB) + '</strong> on dry skin + Ceramide Buffer</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--honey-bg);color:var(--honey-warn);font-weight:600;white-space:nowrap;">9:00 PM Alert</span></div><div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Nights 3 &amp; 4 (Recovery):</strong> Zero acids or retinoids &middot; 3:1:1 Ceramide Cushion</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">Barrier Rest</span></div>' : '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">Nights 2&ndash;4 Schedule &amp; Buffer:</strong> Enter email above ($0) to unlock your Night 2&ndash;4 rotation &amp; 2 dupes</div><a href="#dl-inline-sample-email" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this);return false;" class="mono" style="font-size:0.82rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:700;white-space:nowrap;text-decoration:none;">Unlock Free ($0) &uarr;</a></div>');
    } else if (idx === 2) {
      rowsHtml = '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Pore-Safety Audit (Free Proof):</strong> Screens your ' + (hasShelf ? (names.length + ' selected bottles') : 'routine') + ' against 65 pore-clogging esters &amp; waxes</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">0/5 Pore-Safe</span></div><div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">1-to-1 Barrier Swaps:</strong> ' + (hasEm ? ('Budget &amp; clinical alternatives that layer with <strong>' + safeText(amItem) + '</strong> without pilling') : 'Enter email above ($0) to reveal 2 chemist dupes for your shelf') + '</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">$0 Email / .CSV</span></div>';
    } else {
      rowsHtml = '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--honey-warn);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--honey-warn);">7:30 AM Morning Shield (Free Proof):</strong> Gentle Rinse &rarr; <strong>' + safeText(amItem) + '</strong> &rarr; 60s Wait &rarr; SPF 50</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--honey-bg);color:var(--honey-warn);font-weight:600;white-space:nowrap;">Wait 60s</span></div>' + (hasEm ? '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">9:30 PM Night 1 vs. Night 2:</strong> Splits <strong>' + safeText(pmItemA) + '</strong> and <strong>' + safeText(pmItemB) + '</strong> across alternating nights</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:600;white-space:nowrap;">Zero Clash Split</span></div><div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--sage-safe);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--sage-safe);">Every Night Barrier Seal:</strong> 3:1:1 Ceramide recovery cream locks in hydration without clogging pores</div><span class="mono" style="font-size:0.84rem;padding:2px 8px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;white-space:nowrap;">3:1:1 Lipid Seal</span></div>' : '<div style="padding:9px 12px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);display:flex;justify-content:space-between;align-items:center;gap:10px;"><div style="font-size:0.86rem;line-height:1.38;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);">9:30 PM Night 1 vs. Night 2 Split Locked:</strong> Enter email above ($0) to reveal your bedtime order &amp; 2 chemist dupes</div><a href="#dl-inline-sample-email" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this);return false;" class="mono" style="font-size:0.82rem;padding:2px 8px;background:var(--rose-pill-bg);color:var(--rose-brand);font-weight:700;white-space:nowrap;text-decoration:none;">Unlock Free ($0) &uarr;</a></div>');
    }

    pre.innerHTML = '<div class="dl-curtain-rich-card" style="display:flex;flex-direction:column;gap:8px;width:100%;"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding-bottom:6px;"><span class="serif-display" style="font-size:1.12rem;color:var(--text-primary);font-weight:400;">' + titleText + '</span><span class="mono" style="font-size:0.84rem;padding:3px 9px;background:var(--sage-bg);color:var(--sage-safe);font-weight:600;">' + pillText + '</span></div>' + rowsHtml + '</div>';
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

  window.__dlFocusSampleEmail = function(triggerEl) {
    if (window.__ebLogEvent) window.__ebLogEvent('view_paywall', { source: 'locked_proof_tap' });
    var localRoot = triggerEl && triggerEl.closest ? (triggerEl.closest('#dl-res-step-2') || triggerEl.closest('#liveResultsContainer') || triggerEl.closest('#dl-pseo-top-conversion-bar')) : null;
    var inp = localRoot && localRoot.querySelector('.dl-inline-ics-email');
    if (!inp && triggerEl && triggerEl.getBoundingClientRect) {
      var tTop = triggerEl.getBoundingClientRect().top, bestDist = Infinity;
      document.querySelectorAll('.dl-inline-ics-email').forEach(function(cand) {
        if (cand.offsetParent !== null) {
          var d = Math.abs(cand.getBoundingClientRect().top - tTop);
          if (d < bestDist) { bestDist = d; inp = cand; }
        }
      });
    }
    if (!inp) inp = document.getElementById('dl-inline-sample-email') || document.querySelector('.dl-inline-ics-email');
    if (inp) {
      inp.scrollIntoView({ behavior: 'smooth', block: 'center' });
      var bar = inp.closest('form') || document.getElementById('dl-subpage-top-email-bar');
      if (bar) {
        bar.style.boxShadow = '0 0 0 4px rgba(16, 185, 129, 0.45)';
        setTimeout(function() { bar.style.boxShadow = 'none'; }, 2200);
      }
      setTimeout(function() { inp.focus(); }, 120);
    }
  };
  document.addEventListener('blur', function(ev) {
    var t = ev && ev.target;
    if (t && t.classList && t.classList.contains('dl-inline-ics-email')) {
      var v = (t.value || '').trim();
      if (v && v.indexOf('@') > 0 && v.split('@')[1].indexOf('.') > 0 && !window.__dlSampleEmailUnlocked) {
        var fm = t.closest('form');
        if (fm && typeof window.__dlCaptureFreeIcsLead === 'function') {
          window.__dlCaptureFreeIcsLead({ preventDefault: function(){}, target: fm }, 'blur_auto_capture');
        }
      }
    }
  }, true);
  window.__dlCaptureFreeIcsLead = function(ev, sourceTag) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var formEl = (ev && ev.target && ev.target.tagName === 'FORM') ? ev.target : document.querySelector('.dl-inline-ics-form');
    var emIn = formEl ? formEl.querySelector('.dl-inline-ics-email') : null;
    var email = emIn && emIn.value ? emIn.value.trim() : '';
    if (!email) return false;
    window.__dlSampleEmailUnlocked = true;
    try { localStorage.setItem('dl_captured_email', email); localStorage.setItem('eb_captured_email', email); } catch (_) {}
    document.querySelectorAll('.dl-locked-badge-c2').forEach(function(el) { el.style.display = 'none'; });
    document.querySelectorAll('.dl-unlocked-c2-proof').forEach(function(el) { el.style.display = 'block'; });
    if (window.__dlRenderWallpaperCanvas) window.__dlRenderWallpaperCanvas();
    var unmaskedBox = document.getElementById('dl-unmasked-sample-dupes-swatches');
    if (unmaskedBox) unmaskedBox.style.display = 'flex';
    var btnEl = formEl ? formEl.querySelector('.dl-inline-ics-btn') : null;
    var statusEl = formEl ? formEl.querySelector('.dl-inline-ics-status') : null;
    if (btnEl) { btnEl.textContent = '✓ Dupes & 4 Swatches Unmasked!'; btnEl.style.background = 'var(--sage-safe)'; }
    if (statusEl) {
      statusEl.style.display = 'block';
      statusEl.innerHTML = '✓ EU CosIng &amp; Lab pH · 9:30 PM Schedule, Nights 2–4 &amp; 2 Chemist Dupes Unmasked for <strong>' + email.replace(/[<>&"']/g, '') + '</strong> &middot; <button type="button" class="mono dl-ics-status-pass-btn" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.69rem;font-weight:700;cursor:pointer;white-space:nowrap;">&#10003; Open 9:16 Card &rarr;</button> &middot; <a href="/api/github-upgrade/skin-cycling.ics?unlocked=1&amp;email=' + encodeURIComponent(email) + '" download="dermlogic-4-night-skin-cycling.ics" style="color:var(--rose-brand);text-decoration:underline;font-weight:700;">Download Full 4-Night .ICS</a> &middot; <a href="/buy/flash_pass?email=' + encodeURIComponent(email) + '" style="color:var(--rose-brand);text-decoration:underline;font-weight:700;">Get 300-DPI Apple Wallet Card + $240 Dupe List ($1.99 &middot; 30-Day Guarantee) &rarr;</a>';
    }
    fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'inline_sample_' + (sourceTag || 'web') }) }).catch(function() {});
    try { var dlLink = document.createElement('a'); dlLink.href = '/api/github-upgrade/skin-cycling.ics?unlocked=1&email=' + encodeURIComponent(email); dlLink.download = 'dermlogic-4-night-skin-cycling.ics'; dlLink.style.display = 'none'; document.body.appendChild(dlLink); dlLink.click(); setTimeout(function() { if (dlLink.parentNode) dlLink.parentNode.removeChild(dlLink); }, 600); } catch (_) {}
    return false;
  };
`;

function renderEditorialPolicyPage({ renderBaseDocument }) {
  const title = 'Editorial Policy, Formulation Methodology & FTC Affiliate Disclosure | DermLogic';
  const description = 'DermLogic editorial standards, cosmetic chemistry formulation review methodology (INCI compatibility, pH windows, EU CosIng pore-safety), and FTC / Amazon Associates affiliate disclosure.';
  const bodyHtml = `<section class="section-block" style="padding-top:36px;">
    <div class="container">
      <div class="porcelain-vessel-core" style="padding:36px 40px;background:var(--bg-surface);gap:22px;">
        <div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
            <span class="badge-safe mono">Editorial Governance &amp; Publisher Transparency</span>
            <span class="badge-safe mono">&#10003; EU CosIng &amp; Lab pH Verified &middot; 65 Actives &amp; 80 Cult Bottles</span>
            <span class="badge-safe mono">&#10003; Free Proof #1 Dupe: Geek &amp; Gorgeous ($14 vs. $182 · Save $168)</span>
            <button type="button" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;cursor:pointer;">Preview 9:16 Lock-Screen Card &rarr;</button>
          </div>
          <h1 class="hero-h1" style="font-size:clamp(2.2rem,3.6vw,3.2rem);margin-bottom:10px;max-width:none;">Editorial Policy, Formulation Methodology &amp; FTC Affiliate Disclosure</h1>
          <p style="color:var(--text-secondary);font-size:0.94rem;max-width:none;">Last Reviewed: November 2, 2026 &middot; Editorial &amp; Support Desk: <a href="mailto:concierge@dermlogic.io" style="color:var(--rose-brand);text-decoration:underline;">concierge@dermlogic.io</a> &middot; Publication Domain: <strong>https://www.dermlogic.io</strong> &middot; <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;cursor:pointer;">Save 9:30 PM Schedule &amp; 2 Dupes Free ($0 Email) &darr;</span></p>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;"><figure class="porcelain-vessel-core" style="margin:0;padding:8px 12px;background:var(--bg-oat);display:flex;align-items:center;gap:10px;"><img src="/public/banana_clinical_lab_glassware.jpg" alt="Independent cosmetic chemistry pH verification" width="68" height="50" loading="eager" style="width:68px;height:50px;object-fit:cover;border-radius:8px;flex-shrink:0;" /><figcaption style="font-size:0.78rem;color:var(--text-secondary);"><strong style="color:var(--text-primary);display:block;">Independent Lab pH Audit</strong>Zero brand-paid placement; $0 timing fix always shown first.</figcaption></figure><figure class="porcelain-vessel-core" style="margin:0;padding:8px 12px;background:var(--bg-oat);display:flex;align-items:center;gap:10px;"><img src="/public/banana_apothecary_shelf_ritual.jpg" alt="EU CosIng 8-allergen &amp; fungal-acne verification" width="68" height="50" loading="lazy" style="width:68px;height:50px;object-fit:cover;border-radius:8px;flex-shrink:0;" /><figcaption style="font-size:0.78rem;color:var(--text-secondary);"><strong style="color:var(--text-primary);display:block;">EU CosIng &amp; FTC Verified</strong>65 actives &amp; 80 cult bottles screened against 8 contact allergens.</figcaption></figure></div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:20px;">
          <div class="bento-cell" style="background:var(--bg-oat);padding:24px 26px;">
            <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">1. DermLogic Formulation Research Methodology</h2>
            <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;margin-bottom:10px;max-width:none;">
              DermLogic is an independent skincare routine-compatibility and ingredient research publication. Every pairing guide, bottle breakdown, and 4-night skin-cycling schedule is verified by the <strong>DermLogic Formulation Research Desk</strong> against published cosmetic science and official brand disclosures:
            </p>
            <ul style="padding-left:20px;color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">
              <li><strong>Deterministic pH &amp; Layering Engine:</strong> Evaluates active-ingredient pH windows, L-Ascorbic Acid and Benzoyl Peroxide oxidation rules, peptide stability, and moisture-barrier recovery pacing.</li>
              <li><strong>Official INCI &amp; Retail Verification:</strong> Every bottle&rsquo;s ingredient list (INCI), formulation pH, and price per ounce is audited against manufacturer specifications and authorized U.S. retailers (Sephora, Ulta Beauty, Dermstore, and Amazon).</li>
              <li><strong>Primary Scientific &amp; Regulatory Sources:</strong> European Commission CosIng Ingredient Database, U.S. FDA Over-the-Counter (OTC) Monograph Guidelines, <em>Journal of Investigative Dermatology</em>, and <em>International Journal of Cosmetic Science</em>.</li>
            </ul>
          </div>

          <div id="affiliate-disclosure" class="bento-cell" style="background:var(--bg-oat);padding:24px 26px;border-left:3px solid var(--rose-brand);">
            <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">2. FTC &amp; Retail Affiliate Disclosure</h2>
            <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;margin-bottom:10px;max-width:none;">
              In compliance with the U.S. Federal Trade Commission (FTC) 16 CFR Part 255 Guides Concerning the Use of Endorsements and Testimonials in Advertising:
            </p>
            <ul style="padding-left:20px;color:var(--text-secondary);font-size:0.9rem;line-height:1.6;">
              <li><strong>Above-the-Fold Disclosure on Every Page:</strong> Every page on DermLogic features a clear disclosure bar at the top of the viewport before any outbound retail link appears.</li>
              <li><strong>Amazon Associates &amp; Authorized Retail Partners:</strong> As an Amazon Associate, DermLogic earns from qualifying purchases. Outbound product links to authorized retailers including <strong>Amazon</strong>, <strong>Sephora</strong>, <strong>Dermstore</strong>, and <strong>Ulta Beauty</strong> may earn DermLogic a referral commission at zero additional cost to you.</li>
              <li><strong>100% Editorial Independence:</strong> Retailers and skincare brands cannot pay to alter a product&rsquo;s pH readout, pore-clogging score (0 to 5), fungal-acne safety flag, or routine conflict verdict. Every clash card always provides a <strong>$0 timing fix first</strong> alongside optional product swaps.</li>
            </ul>
          </div>
        </div>

        <div class="bento-cell" style="background:var(--bg-oat);padding:22px 26px;">
          <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">3. Medical Disclaimer &amp; Publisher Ownership</h2>
          <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.6;max-width:none;">
            Content published on DermLogic (operated by DermLogic Digital Publishing, San Francisco, CA) is for informational and educational skincare-routine purposes only and does not constitute medical advice, diagnosis, or prescription dermatology treatment. Always consult a board-certified dermatologist for prescription treatments. For editorial corrections, customer support, or partnership inquiries, contact <a href="mailto:concierge@dermlogic.io" style="color:var(--rose-brand);text-decoration:underline;">concierge@dermlogic.io</a>.
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

module.exports = { SOVRN_KEY, DIRECT_MERCHANT_URLS, getSovrnMerchantLink, getConflictSafeSwap, getClimateProtocolMeta, renderPersonalizedResultsHeaderHtml, renderAboveFoldSovrnDisclosureBar, renderSovrnVglnkScript, renderPersonalizationBarHtml, renderBeforeAfterAndCanvasFooterHtml, ENDOWMENT_CLIENT_SCRIPT, renderEditorialPolicyPage };
