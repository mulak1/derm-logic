/** DermLogic (#4): Taste-Skill v2.1.5 Warm Silk Editorial Gallery (Day) + 3000K Nocturnal Apothecary (Night) Page Views */
const { escapeHtml, SHARED_CSS, CLIENT_SCRIPT, renderHeader, renderFooter, renderInteractiveCheckerWidget } = require('./ui-templates');
const { CLINICAL_INGREDIENTS } = require('./clinical-data'), { getAllCelebrityRoutines } = require('./celebrity-routines'), { CONCERN_HUBS } = require('./seo-hubs'), { renderEditorialPolicyPage } = require('./endowment-sovrn');
function renderHomeSeoDiscoveryBlock() {
  const celebs = getAllCelebrityRoutines().slice(0, 4), concerns = (CONCERN_HUBS || []).slice(0, 4);
  const faqs = [
    { q: 'What order should I layer my serums in the morning vs. at night?', a: 'Apply from thinnest watery texture to richest cream: in the morning, rinse with lukewarm water, apply your antioxidant serum (like Vitamin C), wait 60 seconds, then seal with moisturizer and SPF 50. At night, cleanse, apply one targeted active (an exfoliating acid on Night 1 or a retinoid/peptide on Night 2), and cushion with a ceramide barrier cream.' },
    { q: 'Can I use Vitamin C serum and Retinol or Copper Peptides at the same time?', a: 'No. Pure L-Ascorbic Acid (Vitamin C) requires a low pH (around 3.0 to 3.4) that oxidizes Copper Peptides on contact and compounds irritation with Retinol or Tretinoin. Wear Vitamin C in the morning under sunscreen and save Retinol or Copper Peptides for bedtime.' },
    { q: 'Why do my serums pill or roll into little balls under makeup and sunscreen?', a: 'Pilling happens when silicone-heavy or xanthan-gum serums are layered too quickly without a 60-second dry-down window, or when oil-based drops are applied underneath water-based gels. Stick to 1 or 2 watery serums in the morning and wait 60 seconds before applying SPF.' },
    { q: 'How many serums are too many in a single skincare routine?', a: 'Dermatologists and cosmetic chemists recommend no more than two active serums in a single routine. Layering three or more treatment serums back-to-back dilutes absorption, destabilizes pH, and triggers stinging or perioral redness.' },
    { q: 'How do I check my serums and creams for common contact allergens like fragrance, snail mucin, or propylene glycol?', a: 'Select your sensitivity triggers in the Allergic Reactions & Contact Triggers bar inside the Routine Harmony Checker to screen your entire shelf against all 8 EU CosIng contact-allergen groups and reveal fragrance-free, hypoallergenic swaps.' }
  ];
  return `<section class="section-block" id="home-discovery-hubs" style="padding:48px 0 56px;"><div class="container"><div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;margin-bottom:24px;"><div><div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:6px;"><span class="badge-safe mono">&#10003; EU CosIng &amp; Lab pH Verified</span><span class="badge-safe mono">8 Contact-Allergen Screens</span><span class="badge-safe mono">30-Day Refund Guarantee</span></div><h2 class="serif-display" style="font-size:var(--step-head);margin:0;">Iconic Serum Routines &amp; Guides</h2><p style="color:var(--text-secondary);font-size:0.95rem;margin-top:6px;">Real morning and bedtime shelves with exact layering order and barrier-safe swaps.</p></div><div style="display:flex;gap:10px;flex-wrap:wrap;"><a href="/celebrity" class="btn-secondary" style="padding:10px 18px;font-size:0.86rem;background:#FFFFFF;border:1px solid #E5DED5;">All Iconic Routines &rarr;</a><a href="/concern" class="btn-secondary" style="padding:10px 18px;font-size:0.86rem;background:#FFFFFF;border:1px solid #E5DED5;">All 9 Skin Concerns &rarr;</a></div></div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:20px;margin-bottom:32px;">${celebs.map((c) => `<div class="porcelain-vessel-core" style="background:#FFFFFF;border:1px solid #EFEAE3;border-radius:18px;padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;gap:14px;box-shadow:0 4px 18px -4px rgba(28,25,23,0.04);"><div><div class="vessel-photo-frame" style="height:175px;border-radius:12px;overflow:hidden;margin-bottom:12px;background:#FAF8F5;"><img src="${escapeHtml(c.heroImg)}" alt="${escapeHtml(c.name)} serum routine" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:${escapeHtml(c.imgPos || '50% 25%')};display:block;" /></div><span class="badge-safe mono" style="font-size:0.80rem;padding:3px 10px;background:#EBF4F0;color:#1B4D3E;border:1px solid #C4DFD5;">&#10003; EU CosIng &middot; ${escapeHtml(c.skinProfile)}</span><a href="/celebrity/${escapeHtml(c.slug)}" class="serif-display" style="display:block;font-size:1.28rem;color:var(--text-primary);margin:6px 0 2px;line-height:1.24;">${escapeHtml(c.name)}</a><div class="serif-italic" style="font-size:0.88rem;color:var(--rose-brand);margin-bottom:4px;">${escapeHtml(c.moniker)}</div></div><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;padding-top:10px;border-top:1px solid #F2EDE6;flex-wrap:wrap;"><a href="/celebrity/${escapeHtml(c.slug)}" class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:600;text-decoration:none;">&#10003; Bottles #1–#2 Free &rarr;</a><span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.72rem;color:var(--rose-brand);font-weight:700;cursor:pointer;">&#128274; PM Steps 3+ ($0)</span></div></div>`).join('')}</div><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-bottom:32px;">${concerns.map((cn) => `<a href="/concern/${escapeHtml(cn.slug)}" class="porcelain-vessel-core" style="background:#FFFFFF;border:1px solid #EFEAE3;border-radius:18px;padding:20px 22px;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;gap:10px;box-shadow:0 4px 18px -4px rgba(28,25,23,0.04);"><div><span class="mono" style="font-size:0.80rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;">&#10003; EU CosIng &middot; ${cn.productIds.length} Safe Bottles</span><strong class="serif-display" style="display:block;font-size:1.22rem;color:var(--text-primary);margin:6px 0 4px;line-height:1.25;">${escapeHtml(cn.title)}</strong><p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.52;margin:0;">${escapeHtml(cn.summary.slice(0, 116))}...</p></div><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;padding-top:8px;border-top:1px solid #F2EDE6;">&#10003; Bottles #1–#2 Free &middot; &#128274; 9:30 PM &amp; Dupe #2 ($0) &rarr;</span></a>`).join('')}</div><div class="porcelain-vessel-core" style="background:#FFFFFF;border:1px solid #EFEAE3;border-radius:18px;padding:28px 32px;box-shadow:0 4px 18px -4px rgba(28,25,23,0.04);"><h3 class="serif-display" style="font-size:1.45rem;margin:0 0 16px;">Common Questions About Serum Routines &amp; Layering</h3><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:16px;">${faqs.map((f, idx) => `<details style="background:#FAF8F5;border:1px solid #EFEAE3;border-radius:12px;padding:14px 18px;"><summary class="serif-display" style="cursor:pointer;font-size:1.06rem;font-weight:500;color:var(--text-primary);line-height:1.35;"><span class="mono" style="font-size:0.70rem;color:${idx <= 1 ? 'var(--sage-safe)' : 'var(--rose-brand)'};font-weight:700;display:block;margin-bottom:2px;">${idx <= 1 ? `&#10003; Free Proof FAQ #${idx + 1}` : `&#128274; Chemist Protocol FAQ #${idx + 1}`}</span>${escapeHtml(f.q)}</summary>${idx <= 1 ? `<p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.56;margin:10px 0 0;">${escapeHtml(f.a)}</p>` : `<p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.56;margin:10px 0 0;">${escapeHtml(f.a.split('. ')[0])}. <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;font-size:0.75rem;cursor:pointer;">&#128274; Reveal Full 60s Wait &amp; 9:30 PM Rule ($0 Email) &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">${escapeHtml(f.a.split('. ').slice(1).join('. '))}</span></p>`}</details>`).join('')}</div></div></div></section>`;
}
function renderBaseDocument({ title, description, canonicalPath, ogSlug, jsonLdObjects, hideNav, bodyHtml }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.dermlogic.io').replace(/\/$/, ''), canonicalUrl = `${baseUrl}${canonicalPath || '/'}`, ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;
  const jsonLdScripts = (jsonLdObjects || []).map((obj) => `<script type="application/ld+json">${JSON.stringify(obj.url ? obj : { ...obj, url: canonicalUrl }).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')}</script>`).join('\n');
  return `<!DOCTYPE html><html lang="en" data-theme="day"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>${escapeHtml(title)}</title><meta name="description" content="${escapeHtml(description)}" /><link rel="canonical" href="${escapeHtml(canonicalUrl)}" /><meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="DermLogic Skincare Formulation Atelier" />
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  ${jsonLdScripts}
  <script>try{if(localStorage.getItem('dermlogic_vanity_theme')==='night')document.documentElement.setAttribute('data-theme','night');}catch(_){}</script>
  <style>${SHARED_CSS}</style>
</head>
<body>
  ${renderHeader(hideNav)}
  <main>
    ${bodyHtml}
  </main>
  ${renderFooter()}
  <script>${CLIENT_SCRIPT}</script>
</body>
</html>`;
}
function formatVerdictLabel(verdict) {
  const v = String(verdict || '');
  if (v === 'CRITICAL_CLASH') return 'Cancels on Contact';
  if (v === 'MODERATE_CAUTION') return 'Space Apart';
  if (v === 'SAFE_SYNERGY' || v === 'SYNERGISTIC_COMPATIBLE') return 'Safe Together';
  if (v === 'SAFE_WITH_WAIT' || v === 'COMPATIBLE_WITH_WAIT' || v === 'WAIT_15_MIN' || v === 'WAIT_10_MIN' || v === 'ALTERNATE_OR_WAIT') return 'Wait 10m Between';
  if (v === 'SAFE_WITH_BUFFER') return 'Buffer With Cream';
  if (v === 'SPLIT_AM_PM' || v === 'ALTERNATE_NIGHTS') return 'Morning & Night Split';
  if (v === 'LOW_PH_ACTIVE') return 'Wait 60s After';
  if (v === 'CLINICAL_TEARDOWN') return 'Pore & Layering Check';
  return v.toLowerCase().replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
function getFriendlyBenefit(ing) {
  if (!ing) return 'Supports a calm, hydrated moisture barrier.';
  const id = String(ing.id || '');
  const map = {
    'l-ascorbic-acid': 'Brightens dullness, fades dark spots, and shields skin under morning SPF. Keep separate from Copper Peptides and Benzoyl Peroxide.',
    'thd-ascorbate': 'A silky, oil-soluble Vitamin C that brightens and firms without the low-pH tingle of traditional L-Ascorbic Acid.',
    '3-o-ethyl-ascorbic-acid': 'A stable, gentle Vitamin C alternative that evens out skin tone and layers smoothly with hydrating serums.',
    'sodium-ascorbyl-phosphate': 'A soothing, water-light Vitamin C derivative that calms blemish-prone skin at a comfortable neutral pH.',
    'ferulic-acid': 'Boosts the sun-shielding power of Vitamin C and Vitamin E while keeping brightening serums fresh.',
    'tocopherol': 'Nourishes dry skin and partners with morning Vitamin C to soften fine lines and support lipid recovery.',
    'resveratrol': 'An evening antioxidant that calms stressed skin overnight and supports natural firmness.',
    'coenzyme-q10': 'Energizes tired skin and helps protect delicate areas against daily sun stress.',
    'tretinoin': 'Prescription-strength nighttime renewal for smooth texture and clear pores. Always apply over a dry, cream-buffered barrier.',
    'retinaldehyde': 'Fast-acting nighttime Vitamin A that smooths fine lines with less flaking than prescription retinoids.',
    'retinol': 'Classic nighttime renewal for fine lines and uneven tone. Keep away from Benzoyl Peroxide and exfoliating acids on the same night.',
    'adapalene': 'Targeted nighttime retinoid that keeps pores clear. Even though it is stable, buffer with moisturizer to prevent dryness.',
    'glycolic-acid': ' Polishes dull surface texture for an overnight glow. Give it 60 seconds to dry, and never stack with Retinol on the same night.',
    'lactic-acid': 'Gently smooths rough patches while drawing moisture into dry or sensitive skin.',
    'mandelic-acid': 'A slow-absorbing, gentle exfoliating acid ideal for reactive or deeper skin tones.',
    'salicylic-acid': 'Clears oil and congestion deep inside pores. Alternate nights with Retinol so your skin never feels tight or flaky.',
    'niacinamide': 'Calms redness, balances oil, and strengthens your moisture barrier morning or night.',
    'copper-tripeptide-1': 'Supports bounce and skin repair at bedtime. Never layer directly with pure Vitamin C or strong exfoliating acids.',
    'azelaic-acid': 'Calms redness, rosacea warmth, and lingering post-blemish marks without sensitizing your barrier.',
    'hyaluronic-acid': 'Draws water into damp skin for instant plumpness. Let it dry completely before applying nighttime Tretinoin.'
  };
  if (map[id]) return map[id].trim();
  return String(ing.clinicalMechanism || '')
    .replace(new RegExp('stratum\\s+corneum', 'gi'), 'skin surface')
    .replace(/transepidermal water loss \(TEWL\)|TEWL/gi, 'moisture loss')
    .replace(/erythema/gi, 'redness')
    .replace(/xerosis/gi, 'dryness and flaking')
    .replace(/corneodesmosomes|corneocytes/gi, 'dead surface cells')
    .replace(/keratolytic/gi, 'pore-smoothing');
}
function getRoutineSlotRecommendation(ing) {
  if (!ing) return 'Morning or Night';
  const id = String(ing.id || ''), cls = String(ing.activeClass || '');
  if (cls.includes('retinoid') || id.includes('tretinoin') || id.includes('retinol') || id.includes('adapalene') || id === 'hydroquinone') return 'Night Only (Bedtime routine)';
  if (id.includes('glycolic') || id.includes('lactic') || id.includes('mandelic')) return 'Night Only Exfoliant (Wear SPF next AM)';
  if (cls === 'vitamin_c_laa' || ing.category === 'uv_filter') return 'Morning Glow (Layer under sunscreen)';
  return 'Morning or Night (Safe in either)';
}
function renderPorcelainSwatchCards(ingList) {
  const lockIcon = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  return `<div class="porcelain-swatch-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:22px;margin-bottom:28px;">${(ingList || []).slice(0, 3).map((ing, idx) => {
    const slot = getRoutineSlotRecommendation(ing);
    const step = Number(ing.molecularWeightDa) < 200 ? 'First · Water-Light' : (Number(ing.molecularWeightDa) < 500 ? 'Second · Silky Serum' : 'Third · Velvet Seal');
    const feel = Number(ing.phMin) < 4.0 ? 'Gentle tingle · Wait 60s' : 'Cushion-soft & calm';
    const pore = ing.comedogenicity === 0 ? '0/5 Pore-Safe' : `Low (${ing.comedogenicity}/5)`;
    const slotDisplay = idx === 0
      ? `<div style="font-size:0.88rem;font-weight:500;margin-top:3px;line-height:1.3;">${slot.split('(')[0].trim()}</div>`
      : `<div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;margin-top:4px;cursor:pointer;">${lockIcon}Reveal AM/PM Slot ($0) &uarr;</div><div class="dl-unlocked-c2-proof" style="display:none;font-size:0.88rem;font-weight:500;margin-top:3px;line-height:1.3;">${slot.split('(')[0].trim()}</div>`;
    const stepDisplay = idx === 0
      ? `<div style="font-size:0.88rem;font-weight:500;margin-top:3px;line-height:1.3;">${step}</div>`
      : `<div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;margin-top:4px;cursor:pointer;">${lockIcon}Reveal Layer Step ($0) &uarr;</div><div class="dl-unlocked-c2-proof" style="display:none;font-size:0.88rem;font-weight:500;margin-top:3px;line-height:1.3;">${step}</div>`;
    const feelDisplay = idx === 0
      ? `<div style="font-size:0.86rem;color:var(--text-secondary);padding-top:8px;line-height:1.4;"><strong>On your skin (Free Proof):</strong> ${feel} · <span class="mono">pH ${ing.phMin}–${ing.phMax}</span></div>`
      : `<div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;padding-top:8px;cursor:pointer;">${lockIcon}Tap to Reveal Skin Feel, Wait Time &amp; pH Window ($0) &uarr;</div><div class="dl-unlocked-c2-proof" style="display:none;font-size:0.86rem;color:var(--text-secondary);padding-top:8px;line-height:1.4;"><strong>On your skin:</strong> ${feel} · <span class="mono">pH ${ing.phMin}–${ing.phMax}</span></div>`;
    return `<div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:26px 28px;justify-content:space-between;gap:14px;"><div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><span class="mono" style="font-size:0.84rem;color:var(--rose-brand);font-weight:500;">${idx === 0 ? '✓ Ingredient #1 Free Proof' : `Ingredient #${idx + 1} Pairing Card`}</span><span class="badge-safe mono">${pore}</span></div><h3 class="serif-display" style="font-size:1.36rem;line-height:1.24;margin-bottom:14px;">${escapeHtml(ing.commonName)}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;"><div style="padding:11px 13px;background:var(--bg-surface);"><div class="mono" style="font-size:0.84rem;color:var(--text-secondary);">When to Apply</div>${slotDisplay}</div><div style="padding:11px 13px;background:var(--bg-surface);"><div class="mono" style="font-size:0.84rem;color:var(--text-secondary);">Texture Weight</div>${stepDisplay}</div></div></div>${feelDisplay}</div>`;
  }).join('')}</div>`;
}
function renderHomePage({ products, ingredients, presets, initialAnalysis, initialProductIds, initialRawInci, initialSkinType, seoPages }) {
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'DermLogic Skincare Routine & Layering Planner', applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '1.99', priceCurrency: 'USD' }, description: 'Everyday skincare routine conflict checker, morning and night layering order planner, and pore-safe product guide.' },
    { '@context': 'https://schema.org', '@type': 'MedicalWebPage', name: 'DermLogic Skincare Serum Layering & Pore-Safety Planner', medicalAudience: 'Skincare Consumers and Estheticians', about: { '@type': 'MedicalCondition', name: 'Sensitive Skin Barrier Care and Blemish-Safe Skincare Layering' } }
  ];
  const priorityIngIds = ['l-ascorbic-acid', 'tretinoin', 'niacinamide'];
  const prioritizedIngredients = priorityIngIds.map((id) => ingredients.find((i) => i.id === id)).filter(Boolean);
  const topIngredientsRows = prioritizedIngredients.map((ing, idx) => {
    const poreClogText = ing.comedogenicity === 0
      ? '<span class="badge-safe mono">Zero (0/5)</span>'
      : ing.comedogenicity <= 2
        ? `<span class="badge-safe mono">Low (${ing.comedogenicity}/5)</span>`
        : `<span class="badge-clash mono">Caution (${ing.comedogenicity}/5)</span>`;
    const sensitivityText = Number(ing.phMin) < 4.0 || String(ing.activeClass || '').includes('retinoid')
      ? '<span class="badge-warn mono">Active Tingle</span>'
      : '<span class="badge-safe mono">Barrier-Safe</span>';
    const routineSlot = getRoutineSlotRecommendation(ing);
    const textureOrder = Number(ing.molecularWeightDa) < 200
      ? 'First · Water-light'
      : Number(ing.molecularWeightDa) < 500
        ? 'Second · Medium serum'
        : 'Third · Cream / rich';
    const safeCommonJs = escapeHtml(String(ing.commonName || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'"));
    const slotCell = idx <= 3 ? `${routineSlot} <span class="mono" style="font-size:0.74rem;color:var(--sage-safe);font-weight:700;display:block;">&#10003; Free Proof #${idx + 1}</span>` : `<span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="event.stopPropagation();if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;font-size:0.78rem;cursor:pointer;">&#128274; Reveal AM/PM Slot ($0) &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">${routineSlot}</span>`;
    const texCell = idx <= 3 ? textureOrder : `<span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="event.stopPropagation();if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;font-size:0.78rem;cursor:pointer;">&#128274; Step Order ($0) &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">${textureOrder}</span>`;
    return `<tr class="dl-ing-row" data-ing-id="${escapeHtml(ing.id)}" style="cursor:pointer;transition:background 0.18s ease;" onclick="window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this,event)"><td><a href="/ingredient/${escapeHtml(ing.id)}" onclick="event.stopPropagation();" style="color:var(--text-primary);font-weight:600;text-decoration:underline;text-decoration-color:var(--rose-pill-border);">${escapeHtml(ing.commonName)}</a><br/><span style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(ing.functionRole || ing.category || 'Targeted active')}</span><div style="margin-top:5px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" class="mono dl-row-test-btn" style="padding:3px 10px;border-radius:999px;font-size:0.82rem;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;cursor:pointer;font-weight:600;" onclick="event.stopPropagation();window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this.closest('tr'),event)">+ Test in My Shelf &uarr;</button><button type="button" class="mono dl-ing-row-pass-btn" style="padding:3px 10px;border-radius:999px;font-size:0.8rem;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);cursor:pointer;font-weight:700;" onclick="event.stopPropagation();window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this.closest('tr'),event);if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();">9:16 Card &rarr;</button><button type="button" class="mono dl-ing-row-copy-btn" style="padding:3px 10px;border-radius:999px;font-size:0.8rem;background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-hairline);cursor:pointer;font-weight:700;" onclick="event.stopPropagation();window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this.closest('tr'),event);if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this);">&#128279; Copy Link</button><a href="/?inci=${encodeURIComponent(ing.inciName)}&amp;skin=allergy&amp;allergies=fragrance,snail_mite,salicylates#analyzer" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;" onclick="event.stopPropagation();">&#10003; Screen 8 Allergens ($0) &rarr;</a><a href="/ingredient/${escapeHtml(ing.id)}" class="mono" style="font-size:0.82rem;color:var(--text-secondary);text-decoration:underline;" onclick="event.stopPropagation();">Full Guide &rarr;</a></div></td><td>${poreClogText}</td><td>${sensitivityText}</td><td style="font-size:0.86rem;color:var(--text-primary);">${slotCell}</td><td class="mono" style="font-size:0.84rem;color:var(--text-secondary);">${texCell}</td><td style="color:var(--text-secondary);font-size:0.88rem;line-height:1.5;">${escapeHtml(getFriendlyBenefit(ing))}</td></tr>`;
  }).join('');
  const homePairRe = /^(cosrx-snail-mucin-before-or-after-tretinoin|paulas-choice-bha-and-tretinoin-routine|can-you-mix-copper-peptides-and-vitamin-c|benzoyl-peroxide-and-tretinoin|can-you-mix-retinol-and-vitamin-c|aestura-atobarrier-365-and-tretinoin-sandwich-method)/;
  const featuredSeoPages = [
    ...seoPages.filter((p) => p.pageType === 'active_pair' && homePairRe.test(p.slug)).slice(0, 3)
  ];
  const pairPortraits = [
    '/public/photo_serum_pipette.jpg',
    '/public/photo_amber_bottles.jpg',
    '/public/photo_texture_water_gel.jpg'
  ];
  const featuredSeoLinks = featuredSeoPages.map((p, idx) => {
    const verdictLbl = formatVerdictLabel(p.verdict);
    return `<div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:14px 16px;justify-content:space-between;gap:8px;border:1px solid var(--border-hairline);border-radius:14px;"><div><div style="height:155px;border-radius:10px;overflow:hidden;margin-bottom:8px;background:var(--bg-oat);"><img src="${pairPortraits[idx]}" alt="${escapeHtml(p.title)}" loading="eager" style="width:100%;height:155px;object-fit:cover;object-position:center 30%;display:block;" /></div><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px;"><span class="mono" style="font-size:0.78rem;color:var(--text-secondary);font-weight:600;">Pairing Guide</span><span class="${p.compatibilityScore < 55 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(verdictLbl)}</span></div><a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-weight:400;font-size:1.12rem;line-height:1.22;color:var(--text-primary);margin-bottom:4px;">${escapeHtml(p.title)}</a><p style="color:var(--text-secondary);font-size:0.84rem;line-height:1.42;margin:0;">${escapeHtml(String(p.summary || '').slice(0, 88))}...</p></div><div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid var(--border-hairline);flex-wrap:wrap;gap:6px;"><a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:600;text-decoration:none;">&#10003; 7:30 AM Free Proof &rarr;</a><button type="button" class="mono dl-pair-card-pass-btn" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.72rem;font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="mono dl-pair-card-copy-btn" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this);" style="padding:2px 8px;border-radius:999px;background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-hairline);font-size:0.72rem;font-weight:700;cursor:pointer;">&#128279; Copy Link</button><span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;cursor:pointer;">&#128274; 9:30 PM &amp; Dupe #2 ($0)</span></div></div>`;
  }).join('');
  const bodyHtml = `
    <section class="hero-section" style="padding-top:14px;padding-bottom:16px;">
      <div class="container">
        <div style="max-width:740px;margin:2px auto 12px;text-align:center;">
          <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:4px;">Cosmetic Chemist Routine Analyzer &middot; ${products.length} Cult Formulas &middot; &#10003; Free Proof #1 Dupe: Geek &amp; Gorgeous ($14 vs. $182)</div>
          <h1 class="hero-h1" style="font-size:clamp(1.75rem,2.8vw,2.35rem);line-height:1.14;margin:0 0 6px;max-width:none;">Is your skincare shelf secretly canceling itself out?</h1>
          <p class="hero-sub" style="font-size:0.95rem;color:var(--text-secondary);line-height:1.45;margin:0 auto;max-width:62ch;">Select your bottles below to check for pH clashes, avoid inactive combinations, and see your clean morning and bedtime schedule.</p>
        </div>
        ${renderInteractiveCheckerWidget({
          products,
          presets,
          initialAnalysis,
          initialProductIds: initialProductIds || presets[0].productIds,
          initialRawInci: initialRawInci || '',
          initialSkinType: initialSkinType || presets[0].skinType
        })}
      </div>
    </section>
    <section class="section-block" id="actives-matrix" style="padding:16px 0;">
      <div id="inci-table"></div>
      <div class="container">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:16px;align-items:center;margin-bottom:12px;">
          <div>
            <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:4px;">Inside every bottle.</h2>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:8px;max-width:62ch;">
              Explore how everyday skincare actives behave on your skin: whether they clog pores, whether they tingle, and when in your routine they belong.
            </p>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span class="badge-safe mono">0/5 Pore-Safe Swaps</span>
              <span class="badge-safe mono">Morning vs. Bedtime Order</span>
              <button type="button" id="dl-matrix-dupe-card-btn" class="badge-safe mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button>
              <button type="button" id="dl-matrix-copy-btn" class="badge-safe mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this);" style="cursor:pointer;background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-hairline);">&#128279; Copy Shelf Link</button>
              <a href="/concern/allergic-contact-dermatitis-hypoallergenic-routine" class="badge-safe mono" style="text-decoration:none;">&#10003; EU CosIng 8-Allergen Screen &rarr;</a>
            </div>
          </div>
          <div class="editorial-photo-shell" style="padding:6px;max-height:195px;overflow:hidden;">
            <div style="height:155px;max-height:155px;overflow:hidden;"><img src="/public/banana_clinical_lab_glassware.jpg" alt="Calm minimalist cosmetic chemistry lab bench with borosilicate glass beakers and pH electrode probe" style="width:100%;height:155px;object-fit:cover;object-position:center center;display:block;" loading="eager" /></div>
            <div class="editorial-photo-caption" style="margin-top:4px;"><span class="mono" style="font-size:0.8rem;">Water-Light Serums to Velvet Creams</span><span class="badge-safe mono">65 Actives</span></div>
          </div>
        </div>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Ingredient &amp; Category</th><th>Does It Clog Pores?</th><th>Skin Sensitivity</th><th>Best Time to Use</th><th>Texture &amp; Layering Step</th><th>What It Does For Your Skin</th></tr></thead>
            <tbody>${topIngredientsRows}</tbody>
          </table>
        </div>
      </div>
    </section>
    <section class="section-block-alt" style="padding:16px 0 20px;">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:2px;">Popular Bottle &amp; Serum Pairing Guides</h2>
            <p style="color:var(--text-secondary);font-size:0.88rem;">Most-searched serum layering questions answered in plain English from our ${seoPages.length}-guide library.</p>
          </div>
          <a href="/directory" class="btn-primary"><span>Explore All ${seoPages.length} Layering Guides</span><span class="btn-icon-circle">&rarr;</span></a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:12px;margin-bottom:12px;">
          ${featuredSeoLinks}
        </div>
        <div style="padding:12px 16px;background:var(--bg-surface);border:1px solid var(--border-hairline);border-radius:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="/celebrity/sydney-sweeney" class="affiliate-link-pill mono">Sydney Sweeney Routine &rarr;</a>
            <a href="/celebrity/hailey-bieber" class="affiliate-link-pill mono">Hailey Bieber Glazed Shelf &rarr;</a>
            <a href="/concern/allergic-contact-dermatitis-hypoallergenic-routine" class="affiliate-link-pill mono">&#10003; Allergic Rash Screen &rarr;</a>
            <a href="/concern/morning-skincare-under-makeup-no-pilling" class="affiliate-link-pill mono">Zero-Pilling AM Order &rarr;</a>
            <a href="/concern/pregnancy-safe-retinol-swaps-routine" class="affiliate-link-pill mono">Pregnancy-Safe Swaps &rarr;</a>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">C E Ferulic &rarr;</a>
            <a href="/api/affiliate?product=aestura-atobarrier-365&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Aestura 365 &rarr;</a>
            <a href="/api/affiliate?product=lrp-cicaplast-baume-b5&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Cicaplast B5+ &rarr;</a>
            <a href="/api/affiliate?product=paulas-choice-2-bha&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">2% BHA &rarr;</a>
            <a href="/api/affiliate?product=to-buffet-copper-peptides&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Copper Peptides &rarr;</a>
            <a href="/api/affiliate?product=boj-relief-sun-spf50&partner=amazon" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Joseon SPF 50 &rarr;</a>
            <a href="/api/affiliate?product=dieux-instant-angel&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Instant Angel &rarr;</a>
            <a href="/api/affiliate?product=tower28-sos-spray&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Tower 28 SOS &rarr;</a>
            <a href="/api/affiliate?product=cosrx-snail-96-mucin&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Snail 96 &rarr;</a>
            <a href="/api/affiliate?product=eltamd-uv-clear-spf46&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">EltaMD SPF 46 &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  `;
  return renderBaseDocument({
    title: 'DermLogic | Skincare Routine Conflict, Morning & Night Layering Order & Dupe Finder',
    description: 'Check your skincare routine in 5 seconds for serum clashes, Copper Peptide + Vitamin C canceling out, Tretinoin irritation, and pore-clogging ingredients.',
    canonicalPath: '/',
    ogSlug: 'home',
    jsonLdObjects: jsonLd,
    hideNav: false,
    bodyHtml
  });
}
function renderPaidSocialLpPage({ products, presets, initialAnalysis }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'DermLogic Instant Skincare Routine Conflict & Layering Order Check',
      description: 'Stop wasting $200+ serums that deactivate each other on contact. Run a free 5-second active-ingredient & pore-clogging check.'
    }
  ];
  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div class="editorial-top-banner">
          <div class="hero-copy-col">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
              <span class="badge-safe mono">&#10003; EU CosIng &amp; Lab pH Verified &middot; 65 Actives</span>
              <span class="badge-safe mono">&#10003; Free Proof #1 Cheaper Dupe: Geek &amp; Gorgeous ($14 vs. $182 · Save $168/Bottle)</span>
              <span class="badge-clash mono">&#10003; 8 Contact-Allergen Screens</span>
              <button type="button" id="dl-lp-dupe-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="font-size:0.75rem;cursor:pointer;background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-safe);font-weight:700;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="font-size:0.75rem;cursor:pointer;border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;">Preview 9:16 Lock-Screen Card &rarr;</button><button type="button" id="dl-lp-copy-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-size:0.75rem;cursor:pointer;font-weight:700;">&#128279; Copy Shelf Link</button>
            </div>
            <h1 class="hero-h1" style="font-size:clamp(2.5rem,4.5vw,4.2rem);">
              Stop layering serums that cancel out on skin.
            </h1>
            <p class="hero-sub">
              Mixing Copper Peptides with Vitamin C, or Glycolic Acid with Tretinoin, deactivates your most expensive serums and leaves your skin tight and stinging. Tap your bottles below to get a gentle Morning &amp; Bedtime order.
            </p>
          </div>
          <div class="hero-photo-col">
            <div class="editorial-photo-shell">
              <div class="editorial-photo-inner" style="min-height:240px;height:100%;flex:1;">
                <img src="/public/banana_aesop_vanity_serums.jpg" alt="Warm sunlit travertine bathroom vanity with unbranded amber and frosted glass dropper serums" fetchpriority="high" />
              </div>
              <div class="editorial-photo-caption">
                <span>Daylight Gallery &amp; 11 PM Vanity Ready</span>
                <span class="badge-clash mono">Morning &amp; Night Check</span>
              </div>
            </div>
          </div>
        </div>
        ${renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds: presets[1].productIds, initialRawInci: '', showUgcStrip: false })}
      </div>
    </section>
    <section class="section-block-alt">
      <div class="container">
        <div class="z-cascade-stage">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div class="vessel-photo-frame" style="height:140px;margin-bottom:10px;border-radius:12px;overflow:hidden;"><img src="/public/banana_clinical_lab_glassware.jpg" alt="Calm minimalist cosmetic chemistry lab bench with borosilicate glass beakers and pH electrode probe" style="width:100%;height:100%;object-fit:cover;object-position:center 35%;" loading="lazy" /></div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;"><span class="mono" style="color:var(--rose-brand);font-size:0.84rem;font-weight:500;">Morning vs. Night</span><span class="badge-clash mono">Split AM / PM</span></div>
              <h3 class="serif-display" style="font-size:1.38rem;margin-bottom:6px;">The Copper Peptide + Vitamin C Trap</h3>
              <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.52;">Layering Copper Peptides 1% (pH 6.2) with 15% Vitamin C (pH 3.2) oxidizes both serums on contact, leaving your skin tight and dull. Use Vitamin C in the morning and peptides at night.</p>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Morning Vitamin C &rarr;</a><div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="affiliate-link-pill mono dl-lp-card-pass-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['skinceuticals-ce-ferulic'],'Morning Vitamin C');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border:1px solid var(--sage-border);background:var(--sage-bg);color:var(--sage-safe);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-lp-card-copy-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['skinceuticals-ce-ferulic'],'Morning Vitamin C');if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div></div>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div class="vessel-photo-frame" style="height:140px;margin-bottom:10px;border-radius:12px;overflow:hidden;"><img src="/public/banana_apothecary_shelf_ritual.jpg" alt="Minimalist architectural oak and travertine apothecary shelf with unbranded skincare vessels" style="width:100%;height:100%;object-fit:cover;object-position:center 35%;" loading="lazy" /></div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;"><span class="mono" style="color:var(--sage-safe);font-size:0.84rem;font-weight:500;">90-Second Absorption</span><span class="badge-safe mono">Zero Pilling</span></div>
              <h3 class="serif-display" style="font-size:1.38rem;margin-bottom:6px;">Let Acid Toners Dry Before Niacinamide</h3>
              <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.52;">Applying Niacinamide or rich creams straight over damp Glycolic or Salicylic Acid shifts skin pH too quickly, triggering warm redness and causing morning sunscreen to pill.</p>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><a href="/buy/flash_pass?source=lp_cascade" class="affiliate-link-pill mono">Save 9:16 Card ($1.99) &rarr;</a><div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="affiliate-link-pill mono dl-lp-card-pass-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['paulas-choice-2-bha'],'Acid Toner Buffer');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border:1px solid var(--sage-border);background:var(--sage-bg);color:var(--sage-safe);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-lp-card-copy-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['paulas-choice-2-bha'],'Acid Toner Buffer');if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div></div>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div class="vessel-photo-frame" style="height:140px;margin-bottom:10px;border-radius:12px;overflow:hidden;"><img src="/public/banana_ceramide_cream_macro.jpg" alt="Macro editorial shot of rich whipped ceramide barrier cream swirl" style="width:100%;height:100%;object-fit:cover;object-position:center 25%;" loading="lazy" /></div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;"><span class="mono" style="color:var(--sage-safe);font-size:0.84rem;font-weight:500;">Nighttime Cushion</span><span class="badge-safe mono">4-Night Cycle</span></div>
              <h3 class="serif-display" style="font-size:1.38rem;margin-bottom:6px;">Keep Acne Washes Away From Retinol</h3>
              <p style="color:var(--text-secondary);font-size:0.9rem;line-height:1.52;">Benzoyl Peroxide releases oxygen that wipes out over 80% of Tretinoin and Retinol potency on contact. <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;font-size:0.76rem;cursor:pointer;">&#128274; Reveal 9:30 PM Cushion &amp; 4-Night Schedule ($0 Email) &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">Use peroxide washes in the morning and cushion retinoids over ceramide cream at night.</span></p>
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=aestura-atobarrier-365&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Ceramide Cream &rarr;</a><div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="affiliate-link-pill mono dl-lp-card-pass-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['aestura-atobarrier-365'],'Night Ceramide Cushion');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border:1px solid var(--sage-border);background:var(--sage-bg);color:var(--sage-safe);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-lp-card-copy-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['aestura-atobarrier-365'],'Night Ceramide Cushion');if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div></div>
          </div></div>
        </div>
        <div id="dl-lp-bottom-save-bar" class="porcelain-vessel-core" style="margin-top:16px;padding:14px 18px;background:var(--bg-surface);border-radius:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <span class="mono" style="font-size:0.82rem;color:var(--text-primary);font-weight:600;">&#10003; Save Your Morning/Bedtime Shelf or 9:16 Lock-Screen Card:</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;"><button type="button" id="dl-lp-bottom-dupe-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-safe);font-weight:700;cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-lp-bottom-pass-btn" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;cursor:pointer;">Preview 9:16 Card &rarr;</button><button type="button" id="dl-lp-bottom-copy-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Shelf Link</button></div>
        </div>
      </div>
    </section>
  `;
  return renderBaseDocument({
    title: 'Is Your $300 Skincare Routine Secretly Canceling Itself Out? | DermLogic',
    description: 'Check your skincare serum clashes and Morning & Night layering order in 5 seconds. Instant AM/PM glow ritual and pore-clogging ingredient check.',
    canonicalPath: '/lp',
    ogSlug: 'lp-paid-social',
    jsonLdObjects: jsonLd,
    hideNav: true,
    bodyHtml
  });
}
function renderDirectoryPage({ seoPages }) {
  const priorityRe = /^(vitamin-c-vs-copper-peptides|tretinoin-and-benzoyl-peroxide|retinol-and-glycolic-acid|adapalene-and-benzoyl-peroxide|niacinamide-and-vitamin-c|salicylic-acid-and-retinol|azelaic-acid-and-tretinoin|hyaluronic-acid-and-retinol)/;
  const pairPages = seoPages.filter((p) => p.pageType === 'active_pair').slice().sort((a, b) => (priorityRe.test(b.slug) ? 1 : 0) - (priorityRe.test(a.slug) ? 1 : 0));
  const productPages = seoPages.filter((p) => p.pageType === 'product_teardown');
  const ingredientPages = seoPages.filter((p) => p.pageType === 'ingredient_guide');
  const clashCount = seoPages.filter((p) => p.compatibilityScore < 55).length;
  const bufferCount = seoPages.filter((p) => p.compatibilityScore >= 55 && p.compatibilityScore < 75).length;
  const safeCount = seoPages.filter((p) => p.compatibilityScore >= 75).length;
  const renderCardList = (items) => items.map((p) => {
    const prodId = (p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic';
    const vType = p.pageType === 'product_teardown' ? 'product' : (p.pageType === 'ingredient_guide' ? 'ingredient' : 'pair');
    const vVerdict = p.compatibilityScore < 55 ? 'clash' : (p.compatibilityScore < 75 ? 'timer' : 'safe');
    const vaultTag = vType === 'pair' ? vVerdict : vType;
    const timingLabel = vType === 'product' ? 'Morning & Night Guide' : (vType === 'ingredient' ? 'Pore-Safety & Layering' : (vVerdict === 'clash' ? 'Split Morning & Night' : (vVerdict === 'timer' ? 'Buffer or Space Apart' : 'Layer Same Routine')));
    const cleanCardTitle = String(p.title || '').replace(/\s*Routine Order Guide$/i, '').replace(/Ceramide NP \/ AP \/ EOP Complex/gi, 'Ceramides').replace(/Hyaluronic Acid \/ Sodium Hyaluronate/gi, 'Hyaluronic Acid');
    const rightCta = vType === 'product'
      ? `<a href="/api/affiliate?product=${escapeHtml(prodId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Bottle &rarr;</a>`
      : `<a href="/seo/${escapeHtml(p.slug)}#analyzer" class="affiliate-link-pill mono">Test With My Shelf &rarr;</a>`;
    return `<div class="dir-vault-card porcelain-vessel-core" data-vault-tag="${vaultTag}" data-vault-type="${vType}" data-vault-verdict="${vVerdict}" data-vault-text="${escapeHtml((cleanCardTitle + ' ' + p.summary + ' ' + p.verdict).toLowerCase())}" style="padding:18px 20px;background:var(--bg-surface);display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
          <span class="${vVerdict === 'clash' ? 'badge-clash' : vVerdict === 'timer' ? 'badge-warn' : 'badge-safe'} mono">&#10003; ${escapeHtml(formatVerdictLabel(p.verdict))}</span>
          <span class="mono" style="font-size:0.78rem;color:var(--text-secondary);">${timingLabel}</span>
        </div>
        <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-size:1.22rem;font-weight:400;line-height:1.24;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(cleanCardTitle)}</a>
        <p style="color:var(--text-secondary);font-size:0.88rem;line-height:1.5;margin-bottom:6px;">${escapeHtml(String(p.summary || '').slice(0, 118))}...</p>
        <div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;cursor:pointer;text-decoration:underline;">&#128274; Reveal 9:30 PM Buffer &amp; 2 Dupes ($0) &uarr;</div>
        <div class="dl-unlocked-c2-proof mono" style="display:none;font-size:0.76rem;color:var(--sage-safe);font-weight:600;">&#10003; 9:30 PM Rule: Buffer with 3:1:1 Ceramide Cream &middot; Wait 60s</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid var(--border-hairline);gap:6px;flex-wrap:wrap;">
        <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:600;">Read Guide &rarr;</a>
        <div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="affiliate-link-pill mono dl-dir-card-pass-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['${escapeHtml(prodId)}'],'${escapeHtml(cleanCardTitle.replace(/'/g, ''))}');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-dir-card-copy-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['${escapeHtml(prodId)}'],'${escapeHtml(cleanCardTitle.replace(/'/g, ''))}');if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Link</button>${rightCta}</div>
      </div>
    </div>`;
  }).join('');
  const bodyHtml = `
    <section class="section-block" style="padding-top:24px;padding-bottom:32px;">
      <div class="container">
        <div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:600;text-transform:uppercase;letter-spacing:0.04em;margin-bottom:6px;">Cosmetic Chemist Reference Library &middot; EU CosIng &amp; Lab pH Verified &middot; &#10003; Free Proof #1 Dupe: Geek &amp; Gorgeous ($14)</div>
        <h1 class="hero-h1" style="font-size:clamp(1.85rem,3vw,2.5rem);margin-bottom:8px;">Skincare Serum Layering Chart &amp; What Not to Mix (${seoPages.length} Guides)</h1>
        <p class="hero-sub" style="margin-bottom:18px;max-width:68ch;">Find out which serums belong in the morning, which belong at bedtime, how long to wait between layers, and which active combinations cancel on contact. <a href="/#analyzer" class="mono" style="color:var(--rose-brand);font-weight:600;text-decoration:underline;">Open 2-Product pH Clash Matrix &rarr;</a></p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin-bottom:20px;">
          <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
              <span class="mono" style="color:var(--rose-brand);font-weight:600;">Step-by-Step Sequencing</span>
              <span class="mono" style="color:var(--text-secondary);">Morning vs Bedtime</span>
            </div>
            <div style="height:160px;border-radius:12px;overflow:hidden;background:var(--bg-oat);">
              <img src="/public/banana_aesop_vanity_serums.jpg" alt="Warm sunlit travertine bathroom vanity with unbranded amber and frosted glass dropper serums" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="eager" />
            </div>
          </div>
          <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
              <span class="mono" style="color:var(--rose-brand);font-weight:600;">65 Active Ingredients</span>
              <span class="mono" style="color:var(--text-secondary);">Verified pH &amp; Pore Scores</span>
            </div>
            <div style="height:160px;border-radius:12px;overflow:hidden;background:var(--bg-oat);">
              <img src="/public/banana_clinical_lab_glassware.jpg" alt="Calm minimalist cosmetic chemistry lab bench with borosilicate glass beakers and pH electrode probe" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="eager" />
            </div>
          </div>
          <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
              <span class="mono" style="color:var(--rose-brand);font-weight:600;">44 Cult Formulas</span>
              <span class="mono" style="color:var(--text-secondary);">Chemist Dupe Library</span>
            </div>
            <div style="height:160px;border-radius:12px;overflow:hidden;background:var(--bg-oat);">
              <img src="/public/banana_apothecary_shelf_ritual.jpg" alt="Minimalist architectural oak and travertine apothecary shelf with unbranded skincare vessels" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="eager" />
            </div>
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;padding:10px 14px;background:var(--bg-surface);border:1px solid var(--border-hairline);border-radius:14px;margin-bottom:14px;" role="navigation" aria-label="Semantic Skincare Silo Hubs">
          <a href="/celebrity" class="affiliate-link-pill mono">Iconic Routines (14) &rarr;</a>
          <a href="/concern" class="affiliate-link-pill mono">Skin Concerns (9) &rarr;</a>
          <a href="/bottle" class="affiliate-link-pill mono">Cult Bottles (44) &rarr;</a>
          <a href="/ingredient" class="affiliate-link-pill mono">Active Ingredients (65) &rarr;</a>
          <a href="/brand" class="affiliate-link-pill mono">Skincare Brands (27) &rarr;</a>
          <a href="/concern/allergic-contact-dermatitis-hypoallergenic-routine" class="affiliate-link-pill mono">&#10003; Allergy-Safe Routine (EU CosIng) &rarr;</a>
        </div>
        <div id="dl-dir-top-email-bar" class="porcelain-vessel-core dl-workbench-2col" style="background:var(--bg-surface);padding:14px 18px;margin-bottom:14px;border:1px solid var(--border-hairline);">
          <div style="display:flex;flex-direction:column;gap:6px;">
            <span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:700;text-transform:uppercase;">Step 1 &middot; Routine &amp; Allergy Workbench</span>
            <div style="display:flex;gap:6px;flex-wrap:wrap;"><a href="/#analyzer" class="btn-secondary mono" style="padding:6px 12px;min-height:32px;font-size:0.8rem;text-decoration:none;">Pick Bottles / Paste INCI &rarr;</a><button type="button" id="dl-dir-dupe-pass-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="font-size:0.76rem;cursor:pointer;background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-safe);font-weight:700;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="font-size:0.76rem;cursor:pointer;border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;">Preview 9:16 Lock-Screen Card &rarr;</button><button type="button" id="dl-dir-copy-link-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-size:0.76rem;cursor:pointer;font-weight:700;">&#128279; Copy Shelf Link</button><a href="/?skin=allergy&amp;allergies=fragrance,snail_mite,salicylates#analyzer" class="affiliate-link-pill mono">&#10003; Screen 8 EU Allergens ($0) &rarr;</a></div>
          </div>
          <div style="display:flex;flex-direction:column;gap:6px;">
            <div class="mono" style="font-size:0.8rem;color:var(--sage-safe);font-weight:600;">&#10003; Instant 2-Product pH Clash Matrix + Unmasked #1 Dupe (Geek &amp; Gorgeous $14) &middot; Full AM/PM Calendar ($0):</div>
            <form id="dl-inline-sample-unlock-form" class="dl-inline-ics-form" onsubmit="return window.__dlCaptureFreeIcsLead(event, 'directory_hub')" style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin:0;" data-no-bag-inject="1">
              <input type="email" id="dl-inline-sample-email" required class="input-box dl-inline-ics-email" placeholder="Enter email for full AM/PM calendar &amp; dupes ($0)..." aria-label="Enter email for full AM/PM calendar and dupes" style="flex:1 1 180px;padding:7px 12px;font-size:15px;border-radius:999px;background:var(--bg-canvas);" />
              <button type="submit" class="btn-primary mono dl-inline-ics-btn" style="padding:7px 14px;min-height:34px;font-size:0.8rem;border-radius:999px;"><span>Unlock Calendar ($0) &rarr;</span></button>
              <div class="dl-inline-ics-status mono" style="display:none;width:100%;font-size:0.76rem;color:var(--sage-safe);"></div>
            </form>
          </div>
        </div>
        <div id="dir-apothecary-vault-bar" data-ui="directory-filter-bar" style="padding:14px 18px;background:var(--bg-oat);border-radius:14px;margin-bottom:18px;display:flex;flex-direction:column;gap:8px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;flex:1 1 auto;" role="group" aria-label="Filter Apothecary Archive">
              <button type="button" class="vanity-light-btn mono dir-vault-pill active" style="padding:6px 11px;font-size:0.8rem;" aria-pressed="true" onclick="window.__dlFilterVault('all',this)">Top Curated (9)</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" style="padding:6px 11px;font-size:0.8rem;" aria-pressed="false" onclick="window.__dlFilterVault('pair',this)">Pairings (6)</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" style="padding:6px 11px;font-size:0.8rem;" aria-pressed="false" onclick="window.__dlFilterVault('clash',this)">Do Not Mix</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" style="padding:6px 11px;font-size:0.8rem;" aria-pressed="false" onclick="window.__dlFilterVault('safe',this)">Safe Together</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" style="padding:6px 11px;font-size:0.8rem;" aria-pressed="false" onclick="window.__dlFilterVault('product',this)">Cult Bottles (3)</button>
            </div>
            <input type="search" id="dir-vault-search" aria-label="Search layering guides" placeholder="Search serum, bottle, or ingredient (e.g. Retinol, Copper Peptides, Vitamin C)..." oninput="window.__dlSearchVault(this.value)" class="input-box" style="flex:1 1 240px;min-width:220px;padding:8px 14px;font-size:16px;" />
          </div>
        </div>
        <div id="dir-vault-live-header" style="display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:12px;margin:4px 0 14px;">
          <h2 id="dir-vault-live-title" class="serif-display" style="font-size:1.55rem;margin:0;">Most-Searched Serum Clashes &amp; Layering Guides</h2>
          <span id="dir-vault-live-sub" class="mono" style="font-size:0.84rem;color:var(--text-secondary);">Showing top 9 curated guides from our ${seoPages.length}-guide index</span>
        </div>
        <div id="dir-vault-empty" style="display:none;padding:20px;background:var(--bg-oat);border-radius:14px;margin-bottom:20px;text-align:center;">
          <p style="font-size:0.95rem;color:var(--text-primary);margin:0 0 10px;">No pre-written guide matched that search term. Test any custom bottle or paste an ingredient list in our interactive checker:</p>
          <a href="/#analyzer" class="btn-primary"><span>Open Interactive Bathroom Shelf Checker</span><span class="btn-icon-circle">&rarr;</span></a>
        </div>
        <div class="dir-vault-section" data-dir-sec="pair" style="margin-bottom:24px;">
          <h3 class="dir-sec-heading serif-display" style="font-size:1.3rem;margin:0 0 12px;color:var(--text-secondary);">Serum &amp; Active Pairing Chart: What to Mix &amp; What to Separate (<span class="dir-sec-count">6</span>)</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px;">${renderCardList(pairPages.slice(0, 6))}</div>
        </div>
        <div class="dir-vault-section" data-dir-sec="product" style="margin-bottom:16px;">
          <h3 class="dir-sec-heading serif-display" style="font-size:1.3rem;margin:0 0 12px;color:var(--text-secondary);">Iconic &amp; Cult Bottle Layering Guides (<span class="dir-sec-count">3</span>)</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px;">${renderCardList(productPages.slice(0, 3))}</div>
        </div>
        <div id="dl-dir-visual-atelier-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px;margin:16px 0 18px;">
          <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
              <span class="mono" style="color:var(--rose-brand);font-weight:600;">3:1:1 Ceramide Cushion</span>
              <span class="mono" style="color:var(--text-secondary);">Nighttime Retinoid Buffer</span>
            </div>
            <div style="height:160px;border-radius:12px;overflow:hidden;background:var(--bg-oat);">
              <img src="/public/banana_ceramide_cream_macro.jpg" alt="Macro editorial shot of rich whipped ceramide barrier cream swirl and hyaluronic serum droplet" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="eager" />
            </div>
          </div>
          <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
              <span class="mono" style="color:var(--rose-brand);font-weight:600;">Morning vs. Bedtime Split</span>
              <span class="mono" style="color:var(--text-secondary);">Zero-Pilling SPF Prep</span>
            </div>
            <div style="height:160px;border-radius:12px;overflow:hidden;background:var(--bg-oat);">
              <img src="/public/editorial-vanity-shelf.jpg" alt="Curated sunlit vanity shelf with morning antioxidant and evening peptide bottles" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="eager" />
            </div>
          </div>
          <div class="porcelain-vessel-core" style="padding:14px;background:var(--bg-surface);border-radius:16px;display:flex;flex-direction:column;gap:8px;">
            <div style="display:flex;justify-content:space-between;align-items:center;font-size:0.8rem;">
              <span class="mono" style="color:var(--rose-brand);font-weight:600;">8 EU Allergen Screens</span>
              <span class="mono" style="color:var(--text-secondary);">CosIng Verified Swaps</span>
            </div>
            <div style="height:160px;border-radius:12px;overflow:hidden;background:var(--bg-oat);">
              <img src="/public/photo_routine_flatlay.jpg" alt="Editorial flatlay of gentle barrier-safe skincare bottles and dropper serums" style="width:100%;height:100%;object-fit:cover;object-position:center center;display:block;" loading="eager" />
            </div>
          </div>
        </div>
        <div id="dl-dir-bottom-save-bar" class="porcelain-vessel-core" style="padding:14px 18px;background:var(--bg-surface);border-radius:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <span class="mono" style="font-size:0.82rem;color:var(--text-primary);font-weight:600;">&#10003; Save Your Morning/Bedtime Shelf or 9:16 Lock-Screen Card:</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;"><button type="button" id="dl-dir-bottom-dupe-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-safe);font-weight:700;cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-dir-bottom-pass-btn" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;cursor:pointer;">Preview 9:16 Card &rarr;</button><button type="button" id="dl-dir-bottom-copy-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Shelf Link</button></div>
        </div>
        <script>
          window.__dlVaultTag='all';
          window.__dlTagLabels={all:'Most-Searched Serum Clashes & Layering Guides',pair:'Active Serum & Ingredient Pairing Guides',clash:'Do Not Mix · Separate Morning & Night',timer:'Wait or Buffer Between Layers',safe:'Safe Together · Layer in the Same Routine',product:'Iconic & Cult Bottle Layering Guides',ingredient:'Single-Ingredient Pore-Safety & Layering Guides'};
          window.__dlApplyVault=function(){
            var q=((document.getElementById('dir-vault-search')||{}).value||'').toLowerCase(),tag=window.__dlVaultTag,totalVis=0,secs=document.querySelectorAll('.dir-vault-section'),visSecs=0;
            for(var s=0;s<secs.length;s++){
              var cards=secs[s].querySelectorAll('.dir-vault-card'),secVis=0;
              for(var i=0;i<cards.length;i++){
                var tOk=tag==='all'||cards[i].getAttribute('data-vault-type')===tag||cards[i].getAttribute('data-vault-verdict')===tag||cards[i].getAttribute('data-vault-tag')===tag;
                var qOk=!q||(cards[i].getAttribute('data-vault-text')||'').indexOf(q)!==-1;
                var show=tOk&&qOk;
                cards[i].style.display=show?'flex':'none';
                if(show){secVis++;totalVis++;}
              }
              secs[s].setAttribute('data-sec-vis',String(secVis));
              secs[s].style.display=secVis>0?'block':'none';
              if(secVis>0)visSecs++;
            }
            for(var s2=0;s2<secs.length;s2++){
              var sv=Number(secs[s2].getAttribute('data-sec-vis')||0),cntEl=secs[s2].querySelector('.dir-sec-count'),hdEl=secs[s2].querySelector('.dir-sec-heading');
              if(cntEl)cntEl.textContent=visSecs>1?(sv+' of '+totalVis):String(sv);
              if(hdEl)hdEl.style.display=visSecs>1?'block':'none';
            }
            var empEl=document.getElementById('dir-vault-empty');if(empEl)empEl.style.display=totalVis===0?'block':'none';
            var tEl=document.getElementById('dir-vault-live-title'),sEl=document.getElementById('dir-vault-live-sub'),baseLbl=window.__dlTagLabels[tag]||'Filtered Skincare Guides';
            if(tEl)tEl.textContent=baseLbl+' ('+totalVis+')';
            if(sEl)sEl.textContent=q?('Matching "'+q+'" · '+totalVis+' guide'+(totalVis===1?'':'s')+' shown'):('Showing '+totalVis+' matching guide'+(totalVis===1?'':'s'));
          };
          window.__dlFilterVault=function(tag,btn){
            window.__dlVaultTag=tag;
            var bs=document.querySelectorAll('.dir-vault-pill');
            for(var i=0;i<bs.length;i++){bs[i].classList.remove('active');bs[i].setAttribute('aria-pressed','false');}
            if(btn){btn.classList.add('active');btn.setAttribute('aria-pressed','true');}
            window.__dlApplyVault();
          };
          window.__dlSearchVault=function(){window.__dlApplyVault();};
          window.__dlQuickQuery=function(term){var inp=document.getElementById('dir-vault-search');if(inp){inp.value=term;window.__dlApplyVault();}};
        </script>
      </div>
    </section>
  `;
  return renderBaseDocument({ title: `Skincare Serum Layering Chart & What Not to Mix (${seoPages.length} Guides) | DermLogic`, description: `Browse ${seoPages.length} skincare serum layering guides, active ingredient conflicts, and cult bottle breakdowns.`, canonicalPath: '/directory', ogSlug: 'directory', jsonLdObjects: [], hideNav: false, bodyHtml });
}
function resolveComparisonIngredients(page, products) {
  const seen = new Set(), list = [];
  const pushIng = (ing) => { if (ing && ing.id && !seen.has(ing.id)) { seen.add(ing.id); list.push(ing); } };
  if (Array.isArray(page.comparisonIngredients)) page.comparisonIngredients.forEach(pushIng);
  pushIng(page.ingredientA); pushIng(page.ingredientB);
  if (page.product && Array.isArray(page.product.primaryActives)) {
    for (const actId of page.product.primaryActives) pushIng(CLINICAL_INGREDIENTS.find((i) => i.id === actId));
  }
  if (list.length < 2 && Array.isArray(page.presetProducts) && Array.isArray(products)) {
    for (const pid of page.presetProducts) {
      const pr = products.find((p) => p.id === pid);
      if (pr && Array.isArray(pr.primaryActives)) {
        for (const actId of pr.primaryActives) pushIng(CLINICAL_INGREDIENTS.find((i) => i.id === actId));
      }
    }
  }
  if (list.length < 2) { pushIng(CLINICAL_INGREDIENTS[0]); pushIng(CLINICAL_INGREDIENTS[1]); }
  return list.slice(0, 4);
}
function renderSeoDetailPage({ page, products, presets, initialAnalysis, relatedPages }) {
  const primaryProdId = (page.presetProducts && page.presetProducts[0]) || 'skinceuticals-ce-ferulic';
  const secondaryProdId = ((page.presetProducts || []).slice(1).find((id) => !String(id).startsWith('rx-')) || (page.presetProducts && page.presetProducts[1]) || 'stratia-lipid-gold');
  const primaryProdObj = products.find((p) => p.id === primaryProdId) || products[0] || { brand: 'Differin', name: 'Adapalene Gel 0.1%' };
  const secondaryProdObj = products.find((p) => p.id === secondaryProdId) || { brand: 'Stratia', name: 'Lipid Gold Barrier Cream' };
  const comparedActives = resolveComparisonIngredients(page, products);
  const rawSubject = page.ingredientA && page.ingredientB
    ? `${page.ingredientA.commonName} and ${page.ingredientB.commonName}`
    : page.product
      ? `${page.product.brand} ${page.product.name} and Active Serums`
      : (comparedActives[0] && comparedActives[1] ? `${comparedActives[0].commonName} and ${comparedActives[1].commonName}` : page.title.split(':')[0]);
  const searchIntentSubject = rawSubject.replace(/\s*\([^)]*\)/g, '').trim();
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'MedicalWebPage', headline: page.title, description: page.metaDescription, medicalAudience: 'Skincare Consumers and Estheticians', specialty: 'Dermatology' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: (page.faqs || []).map((f, idx) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: idx === 0 ? `${String(f.a || '').split(/(?<=[.!?])\s+/)[0]} [Enter Email Free ($0) on DermLogic to Reveal Exact Wait-Time Fix & Cushioning Rule]` : '[Locked in Free Preview — Enter Email Free ($0) on DermLogic to Reveal Full Chemist Answer & AM/PM Rule]' } })) },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'DermLogic Routine Conflict Analyzer', applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '1.99', priceCurrency: 'USD' } },
    ...(page.amRule && page.pmRule ? [{ '@context': 'https://schema.org', '@type': 'HowTo', name: `How to layer ${searchIntentSubject}`, description: page.metaDescription, step: [{ '@type': 'HowToStep', name: 'Morning (AM) Protocol', text: 'Enter Email Free ($0) on DermLogic to reveal your exact Morning timing & $26 chemist dupe.' }, { '@type': 'HowToStep', name: 'Evening (PM) Protocol', text: 'Included in $0 Email Preview or $1.99 Complete AM/PM Calendar on DermLogic.' }] }] : [])
  ];
  const seoSwatchesHtml = renderPorcelainSwatchCards(comparedActives);
  const lockSvgInline = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
  const comparisonRowsHtml = comparedActives.map((ing, idx) => {
    const poreClog = ing.comedogenicity === 0 ? '<span class="badge-safe mono">Zero (0/5)</span>' : ing.comedogenicity <= 2 ? `<span class="badge-safe mono">Low (${ing.comedogenicity}/5)</span>` : `<span class="badge-clash mono">Caution (${ing.comedogenicity}/5)</span>`;
    const sensitivity = Number(ing.phMin) < 4.0 || String(ing.activeClass || '').includes('retinoid') ? '<span class="badge-warn mono">Active Tingle</span>' : '<span class="badge-safe mono">Barrier-Safe</span>';
    const routineSlot = getRoutineSlotRecommendation(ing);
    const textureOrder = Number(ing.molecularWeightDa) < 200 ? 'First · Water-light serum' : Number(ing.molecularWeightDa) < 500 ? 'Second · Medium serum' : 'Third · Cream / rich barrier';
    const safeCommonJs = escapeHtml(String(ing.commonName || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'"));
    const slotCellHtml = idx === 0
      ? `<span class="mono" style="font-size:0.68rem;color:var(--sage-safe);font-weight:700;display:block;">✓ Row #1 Free Proof</span>${routineSlot}`
      : `<span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="event.stopPropagation();if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.75rem;color:var(--rose-brand);font-weight:600;cursor:pointer;">${lockSvgInline}Reveal 9:30 PM Timing Free ($0) &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">${routineSlot}</span>`;
    const texCellHtml = idx <= 1
      ? textureOrder
      : `<span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="event.stopPropagation();if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.75rem;color:var(--text-secondary);font-weight:600;cursor:pointer;">${lockSvgInline}Reveal Step ($0) &uarr;</span><span class="dl-unlocked-c2-proof" style="display:none;">${textureOrder}</span>`;
    return `<tr class="dl-ing-row" data-ing-id="${escapeHtml(ing.id)}" style="cursor:pointer;transition:background 0.18s ease;" onclick="window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this,event)"><td><a href="/ingredient/${escapeHtml(ing.id)}" onclick="event.stopPropagation();" style="color:var(--text-primary);font-weight:600;text-decoration:underline;text-decoration-color:var(--rose-pill-border);">${escapeHtml(ing.commonName)}</a><br/><span style="font-size:0.8125rem;color:var(--text-secondary);text-transform:capitalize;">${escapeHtml(String(ing.category || 'Targeted active').replace(/_/g, ' '))}</span><div style="margin-top:4px;display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" class="mono dl-row-test-btn" style="padding:3px 10px;border-radius:999px;font-size:0.74rem;background:var(--rose-pill-bg);color:var(--rose-brand);border:none;cursor:pointer;font-weight:600;" onclick="event.stopPropagation();window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this.closest('tr'),event)">+ Test in My Shelf &uarr;</button><button type="button" class="mono dl-seo-row-pass-btn" style="padding:3px 10px;border-radius:999px;font-size:0.74rem;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);cursor:pointer;font-weight:700;" onclick="event.stopPropagation();window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this.closest('tr'),event);if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();">9:16 Card &rarr;</button><button type="button" class="mono dl-seo-row-copy-btn" style="padding:3px 10px;border-radius:999px;font-size:0.74rem;background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-hairline);cursor:pointer;font-weight:700;" onclick="event.stopPropagation();window.__dlClickIngredientRow('${escapeHtml(ing.id)}','${safeCommonJs}',this.closest('tr'),event);if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this);">&#128279; Copy Link</button><a href="/?inci=${encodeURIComponent(ing.inciName)}&amp;skin=allergy&amp;allergies=fragrance,snail_mite,salicylates#analyzer" class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;text-decoration:underline;" onclick="event.stopPropagation();">&#10003; Screen 8 Allergens ($0) &rarr;</a></div></td><td>${poreClog}</td><td>${sensitivity}</td><td style="font-size:0.84rem;color:var(--text-primary);">${slotCellHtml}</td><td class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${texCellHtml}</td><td style="font-size:0.81rem;color:var(--text-secondary);"><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" onclick="event.stopPropagation();" class="mono" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;">View Schedule ($1.99)</a></td></tr>`;
  }).join('');
  const seoChemistrySpecsRows = comparedActives.map((ing, idx) => idx === 0
    ? `<tr><td><strong class="mono" style="font-size:0.8125rem;">${escapeHtml(ing.inciName)}</strong> <span class="badge-safe mono" style="padding:1px 6px;font-size:0.68rem;">Free Proof</span></td><td class="mono">pH ${ing.phMin}–${ing.phMax}</td><td class="mono">${Number(ing.phMin) < 4.0 ? 'Tangy / Active' : 'Gentle / Neutral'}</td><td class="mono">${Number(ing.molecularWeightDa) < 250 ? 'Water-Light' : 'Velvet / Cushion'}</td><td class="mono">${ing.comedogenicity}/5</td><td class="mono">${ing.malasseziaTrigger ? 'Watch' : 'Safe'}</td></tr>`
    : `<tr><td><strong class="mono" style="font-size:0.8125rem;">${escapeHtml(ing.inciName)}</strong></td><td colspan="5"><span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.75rem;color:var(--rose-brand);font-weight:600;cursor:pointer;">${lockSvgInline}Enter Email Above ($0) to Reveal Skin pH, Texture Weight &amp; Pore-Safety Specs &uarr;</span><span class="dl-unlocked-c2-proof mono" style="display:none;font-size:0.78rem;color:var(--text-secondary);">pH ${ing.phMin}–${ing.phMax} &middot; ${Number(ing.phMin) < 4.0 ? 'Tangy / Active' : 'Gentle / Neutral'} &middot; ${Number(ing.molecularWeightDa) < 250 ? 'Water-Light' : 'Velvet / Cushion'} &middot; ${ing.comedogenicity}/5 Pore &middot; ${ing.malasseziaTrigger ? 'Watch' : 'Safe'}</span></td></tr>`).join('');
  const faqHtml = (page.faqs || []).map((f, idx) => {
    const rawAns = String(f.a || '');
    const firstSent = rawAns.split(/(?<=[.!?])\s+/)[0] || rawAns;
    const answerHtml = idx === 0
      ? `<p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:6px;"><strong style="color:var(--sage-safe);">✓ Free Proof:</strong> ${escapeHtml(firstSent)}</p><div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-size:0.8rem;font-weight:600;cursor:pointer;">${lockSvgInline}Enter Email Above ($0) to Reveal Exact Wait-Time Fix &amp; Cushioning Rule &uarr;</div><p class="dl-unlocked-c2-proof" style="display:none;color:var(--text-secondary);font-size:0.88rem;margin-top:4px;">${escapeHtml(rawAns)}</p>`
      : `<div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-size:0.82rem;font-weight:600;cursor:pointer;margin-top:4px;">${lockSvgInline}Enter Email Above ($0) to Reveal Full Chemist Answer &amp; AM/PM Rule &uarr;</div><p class="dl-unlocked-c2-proof" style="display:none;color:var(--text-secondary);font-size:0.88rem;margin-top:4px;">${escapeHtml(rawAns)}</p>`;
    return `<div class="porcelain-vessel-core" style="padding:20px 24px;background:var(--bg-surface);margin-bottom:12px;"><h3 class="serif-display" style="font-size:1.28rem;font-weight:400;margin-bottom:6px;">${escapeHtml(f.q)}</h3>${answerHtml}</div>`;
  }).join('');
  const relatedHtml = (relatedPages || []).slice(0, 6).map((r) => `<div class="porcelain-vessel-core" style="padding:14px 16px;background:var(--bg-surface);display:flex;flex-direction:column;justify-content:space-between;gap:8px;"><div><div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:3px;">Morning &amp; Night Guide</div><a href="/seo/${escapeHtml(r.slug)}" class="serif-display" style="font-weight:400;font-size:1.12rem;color:var(--text-primary);text-decoration:none;display:block;">${escapeHtml(r.title)}</a></div><div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;"><a href="/seo/${escapeHtml(r.slug)}" class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:600;text-decoration:none;">Read Guide &rarr;</a><div style="display:flex;gap:6px;flex-wrap:wrap;"><button type="button" class="affiliate-link-pill mono dl-seo-related-pass-btn" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="padding:2px 8px;font-size:0.7rem;background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-seo-related-copy-btn" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="padding:2px 8px;font-size:0.7rem;font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div></div></div>`).join('');
  const seoBadgeClass = page.compatibilityScore < 55 ? 'badge-clash' : page.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe';
  const dupe1Obj = products.find((p) => p.id !== primaryProdId && p.id !== secondaryProdId && Number(p.priceUsd) <= 28 && !/fragrance|parfum|snail/i.test(String(p.inciList || ''))) || products.find((p) => p.id === 'vanicream-daily-facial-moisturizer') || primaryProdObj;
  const comparePairSlug = [primaryProdObj.id || primaryProdId, secondaryProdObj.id || secondaryProdId].sort().join('-vs-');
  const defaultCalcProtocol = page.amRule && page.pmRule
    ? `${escapeHtml(page.amRule)} ${escapeHtml(page.pmRule)}`
    : 'Apply thinnest watery serum first on clean skin, give 60 seconds to absorb cleanly, and seal with broad-spectrum SPF 50 in daylight.';
  const cleanSummaryFirstSentence = String(page.summary || '').replace(/\s*\([^)]*(?:precursor|inhibitor|agonist|cofactor|matrix|chelator|derivative)[^)]*\)/gi, '').replace(/\b(Dr|St|Mr|Ms|Oz)\.\s+/gi, '$1__DOT__ ').split(/(?<=[.!?])\s+/)[0].replace(/__DOT__/g, '.') || page.summary;
  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="margin-bottom:12px;font-size:0.84rem;color:var(--text-secondary);">
          <a href="/">Home</a> / <a href="/directory">Layering Archive</a> / <span style="color:var(--rose-brand);font-weight:500;">${escapeHtml(page.category)}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <span class="${seoBadgeClass} mono">Morning &amp; Night Pairing Check · ${page.compatibilityScore}/100 Harmony</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;" data-no-bag-inject="1">
            <button type="button" id="dl-seo-hero-dupe-card-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-seo-hero-copy-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this);" style="font-weight:700;cursor:pointer;">&#128279; Copy Shelf Link</button>
            <a href="#analyzer" class="affiliate-link-pill mono" style="border-color:var(--rose-brand);color:var(--rose-brand);font-weight:600;">Test With My Shelf Below &darr;</a>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop ${escapeHtml(primaryProdObj.brand)} ${escapeHtml(primaryProdObj.name)} &rarr;</a>
            <a href="/api/affiliate?product=${escapeHtml(secondaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop ${escapeHtml(secondaryProdObj.brand)} ${escapeHtml(secondaryProdObj.name)} &rarr;</a>
          </div>
        </div>
        <h1 class="hero-h1" style="font-size:clamp(2.15rem,3.6vw,3.25rem);">${escapeHtml(page.title)}</h1>
        <p class="hero-sub" style="margin-bottom:20px;max-width:68ch;">Cosmetic chemist breakdown: why these formulas interact, exact morning and bedtime application windows, and how to protect your skin barrier.</p>
        <div id="dl-pseo-top-verdict-card" class="porcelain-vessel-core" style="padding:22px 26px;background:#FFFFFF;border:1px solid #EFEAE3;border-radius:18px;margin-bottom:28px;box-shadow:0 4px 18px -4px rgba(28,25,23,0.04);display:flex;flex-direction:column;gap:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;border-bottom:1px solid #F2EDE6;padding-bottom:14px;">
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <span class="${seoBadgeClass} mono" style="font-size:0.86rem;padding:4px 12px;">${page.compatibilityScore < 55 ? 'Active Clashes Detected · Space Apart' : 'Barrier Compatible · Layer Gently'}</span>
              <span class="mono" style="font-size:0.84rem;color:var(--text-secondary);font-weight:600;">Harmony Score: ${page.compatibilityScore}/100 &middot; pH Gap ${page.deltaPh}</span>
              <span class="badge-safe mono" style="font-size:0.74rem;padding:3px 9px;">&#10003; EU CosIng &amp; Lab pH Verified</span>
              <span class="badge-safe mono" style="font-size:0.74rem;padding:3px 9px;">8 Contact-Allergen Screens</span>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button type="button" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="font-size:0.82rem;padding:6px 12px;cursor:pointer;border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;">Preview 9:16 Lock-Screen Card &rarr;</button>
              <button type="button" id="dl-pseo-verdict-copy-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-size:0.82rem;padding:6px 12px;cursor:pointer;font-weight:700;">&#128279; Copy Shelf Link</button>
              <a href="/compare/${escapeHtml(comparePairSlug)}" class="affiliate-link-pill mono" style="font-size:0.82rem;padding:6px 12px;">2-Product pH Clash Matrix &rarr;</a>
              <a href="/?products=${encodeURIComponent((page.presetProducts || [primaryProdId]).join(','))}&amp;skin=allergy&amp;allergies=fragrance,snail_mite,salicylates#analyzer" class="affiliate-link-pill mono" style="font-size:0.82rem;padding:6px 12px;">&#10003; Screen 8 Allergens ($0) &rarr;</a>
              <a href="#analyzer" class="affiliate-link-pill mono" style="font-size:0.84rem;padding:6px 14px;border-color:var(--rose-brand);color:var(--rose-brand);font-weight:600;">Test 2-Product Matrix Below &darr;</a>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px;">
            <div style="padding:14px 16px;border-radius:14px;background:#FAF8F5;">
              <div class="mono" style="font-size:0.75rem;color:var(--berry-clash);font-weight:700;margin-bottom:4px;text-transform:uppercase;">01 &middot; Free Proof: 2-Product pH Clash &amp; 7:30 AM Order</div>
              <div style="font-size:0.88rem;color:var(--text-primary);line-height:1.5;"><strong>${escapeHtml(primaryProdObj.brand)}</strong> (pH ${primaryProdObj.ph || 3.3}) vs. <strong>${escapeHtml(secondaryProdObj.brand)}</strong> (pH ${secondaryProdObj.ph || 5.5}) &middot; &Delta;pH ${page.deltaPh}. ${escapeHtml(page.amRule || 'Apply water-light active serums first onto dry skin, allow 60 seconds to absorb, and finish with broad-spectrum SPF 50.')}</div>
            </div>
            <div style="padding:14px 16px;border-radius:14px;background:#FAF8F5;">
              <div class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:700;margin-bottom:4px;text-transform:uppercase;">02 &middot; Free Proof: #1 Fungal-Safe &amp; Allergen-Free Cheaper Dupe</div>
              <div style="font-size:0.88rem;color:var(--text-primary);line-height:1.5;">&#10003; Unmasked Dupe #1: <a href="/bottle/${escapeHtml(dupe1Obj.id)}" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">${escapeHtml(dupe1Obj.brand)} ${escapeHtml(dupe1Obj.name)} ($${dupe1Obj.priceUsd} &middot; pH ${dupe1Obj.ph})</a> &mdash; Fungal-Acne Safe &amp; 0/8 EU Contact Allergens. <a href="/compare/${escapeHtml(comparePairSlug)}" class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:700;text-decoration:underline;">Compare Side-by-Side &rarr;</a> <button type="button" id="dl-seo-dupe-pass-btn" class="mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal();" style="padding:2px 8px;border-radius:999px;background:var(--sage-bg);color:var(--sage-safe);border:1px solid var(--sage-border);font-size:0.72rem;font-weight:700;cursor:pointer;">&#10003; Load Dupe on 9:16 Card &rarr;</button></div>
            </div>
            <div style="padding:14px 16px;border-radius:14px;background:#FAF8F5;">
              <div class="mono" style="font-size:0.75rem;color:var(--honey-warn);font-weight:700;margin-bottom:4px;text-transform:uppercase;">03 &middot; Holdback: Full AM/PM Calendar &amp; Dupe Shopping List</div>
              <div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="font-size:0.8rem;color:var(--rose-brand);font-weight:600;line-height:1.45;cursor:pointer;margin-bottom:6px;">${lockSvgInline}9:30 PM Ceramide Sandwich, 4-Night Calendar (.ICS) &amp; Complete Cheaper-Dupe Shopping List Locked ($0 Email) &darr;</div>
              <form class="dl-inline-ics-form" onsubmit="return window.__dlCaptureFreeIcsLead(event, 'pseo_fold1_${escapeHtml(page.slug)}')" style="display:flex;gap:5px;flex-wrap:wrap;align-items:center;margin:0;" data-no-bag-inject="1"><input type="email" required class="input-box dl-inline-ics-email" placeholder="Email full AM/PM calendar &amp; dupes ($0)..." aria-label="Email full AM/PM calendar and dupes" style="flex:1 1 140px;min-width:0;padding:6px 10px;font-size:0.74rem;border-radius:999px;background:#FFFFFF;" /><button type="submit" class="btn-primary mono dl-inline-ics-btn" style="padding:6px 11px;min-height:30px;font-size:0.72rem;border-radius:999px;"><span>Unlock ($0) &rarr;</span></button><div class="dl-inline-ics-status mono" style="display:none;width:100%;font-size:0.7rem;color:var(--sage-safe);"></div></form>
              <div class="dl-unlocked-c2-proof" style="display:none;font-size:0.88rem;color:var(--text-primary);line-height:1.5;margin-top:4px;">${escapeHtml(page.pmRule || 'Cleanse thoroughly, apply repairing active on dry skin, and seal with a rich ceramide cushion cream.')}</div>
            </div>
          </div>
        </div>
        ${renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds: page.presetProducts, initialRawInci: page.resolvedRawInci || (page.product ? page.product.inciList : ''), showUgcStrip: false })}
        <div class="z-cascade-stage" style="margin-top:20px;margin-bottom:20px;">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div class="vessel-photo-frame"><img src="/public/banana_aesop_vanity_serums.jpg" alt="Sunlit travertine vanity shelf with unbranded amber and frosted dropper serums" style="object-position:center center;" loading="lazy" /></div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:500;">Do They Cancel Out?</span><span class="${page.compatibilityScore < 55 ? 'badge-clash' : 'badge-safe'} mono">${page.compatibilityScore < 55 ? 'Split AM & PM' : 'Layer Gently'}</span></div>
              <h3 class="serif-display" style="font-size:1.42rem;line-height:1.24;font-weight:400;margin-bottom:10px;">${escapeHtml(page.conflictType)}</h3>
              <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.58;">${escapeHtml(cleanSummaryFirstSentence)}</p>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;"><a href="#analyzer" class="affiliate-link-pill mono" style="flex:1 1 auto;justify-content:center;padding:8px 12px;text-align:center;">Check My Bottles &uarr;</a><button type="button" class="affiliate-link-pill mono dl-seo-cascade-pass-btn" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="padding:8px 10px;background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-seo-cascade-copy-btn" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="padding:8px 10px;font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div class="vessel-photo-frame"><img src="/public/banana_clinical_lab_glassware.jpg" alt="Cosmetic chemistry lab bench with glass pipette and serum" style="object-position:center center;" loading="lazy" /></div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="mono" style="font-size:0.82rem;color:var(--sage-safe);font-weight:500;">&#10003; Morning Texture &amp; Finish (Free Proof)</span><span class="badge-safe mono">Under SPF</span></div>
              <h3 class="serif-display" style="font-size:1.42rem;line-height:1.24;font-weight:400;margin-bottom:10px;">How to Wear in Daylight</h3>
              <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.58;">Pat your lightest water-based serum onto clean skin after rinsing, let it settle for 60 seconds so foundation and sunscreen never pill, then seal with lightweight moisturizer and broad-spectrum SPF 50.</p>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="flex:1 1 auto;justify-content:center;padding:8px 12px;text-align:center;">Shop ${escapeHtml(primaryProdObj.brand)} &rarr;</a><button type="button" class="affiliate-link-pill mono dl-seo-cascade-pass-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['${escapeHtml(primaryProdId)}'],'${escapeHtml(primaryProdObj.brand)}');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="padding:8px 10px;background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-seo-cascade-copy-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['${escapeHtml(primaryProdId)}'],'${escapeHtml(primaryProdObj.brand)}');if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="padding:8px 10px;font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div class="vessel-photo-frame"><img src="/public/banana_ceramide_cream_macro.jpg" alt="Rich soothing ceramide barrier cream texture for bedtime recovery" style="object-position:center center;" loading="lazy" /></div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="mono" style="font-size:0.82rem;color:var(--honey-warn);font-weight:500;">Bedtime Cushioning</span><span class="badge-safe mono">11 PM Vanity</span></div>
              <h3 class="serif-display" style="font-size:1.42rem;line-height:1.24;font-weight:400;margin-bottom:10px;">How to Layer at Bedtime</h3>
              <div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="padding:10px 12px;border-radius:12px;background:var(--bg-oat);color:var(--text-primary);font-size:0.8rem;font-weight:600;line-height:1.45;cursor:pointer;">${lockSvgInline}Bedtime Ceramide Sandwich &amp; Retinoid Buffering Rule Locked — Included in $0 Email AM/PM Calendar &uarr;</div>
              <p class="dl-unlocked-c2-proof" style="display:none;font-size:0.92rem;color:var(--text-secondary);line-height:1.58;">Let watery hydrating layers dry completely before applying concentrated night treatments so actives absorb slowly without stinging, then seal delicate areas around your nose and mouth with a ceramide cream.</p>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;"><a href="/api/affiliate?product=${escapeHtml(secondaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="flex:1 1 auto;justify-content:center;padding:8px 12px;text-align:center;">Shop ${escapeHtml(secondaryProdObj.brand)} &rarr;</a><button type="button" class="affiliate-link-pill mono dl-seo-cascade-pass-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['${escapeHtml(secondaryProdId)}'],'${escapeHtml(secondaryProdObj.brand)}');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="padding:8px 10px;background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" class="affiliate-link-pill mono dl-seo-cascade-copy-btn" onclick="if(window.__dlPreloadBottlesInVanityBag)window.__dlPreloadBottlesInVanityBag(['${escapeHtml(secondaryProdId)}'],'${escapeHtml(secondaryProdObj.brand)}');if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="padding:8px 10px;font-weight:700;cursor:pointer;">&#128279; Copy Link</button></div>
          </div></div>
        </div>
        <details class="porcelain-vessel-core" style="background:var(--bg-surface);padding:16px 22px;margin-bottom:14px;"><summary class="mono" style="cursor:pointer;font-size:0.84rem;color:var(--rose-brand);font-weight:600;">Open 60-Second Bathroom Sink Pacing Timer, Skin-Barrier Calculator &amp; Ingredient Table &darr;</summary><div style="margin-top:16px;">
        <div class="sink-pacing-panel" style="margin-top:0;margin-bottom:20px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;">
            <div>
              <div class="mono" style="font-size:0.82rem;color:var(--sage-safe);font-weight:500;margin-bottom:4px;">Thinnest to Richest · Bathroom Sink Pacing</div>
              <h3 class="serif-display" style="font-size:1.48rem;">Tap a timer between layers so your skincare absorbs cleanly.</h3>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;"><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="btn-primary"><span>Save 9:16 Lock-Screen Card ($1.99)</span><span class="btn-icon-circle">&rarr;</span></a><button type="button" id="dl-sink-pacing-dupe-btn" class="btn-secondary mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-sink-pacing-copy-btn" class="btn-secondary mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="cursor:pointer;">&#128279; Copy Shelf Link</button></div>
          </div>
          <ul class="viscosity-seq-list">
            <li class="viscosity-seq-item"><div><div class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:600;margin-bottom:4px;">✓ Step 1 · Water-Light (Free Proof)</div><strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">Mist or Toning Essence</strong><div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Press onto damp skin right after cleansing.</div></div><span class="wait-timer-btn mono" style="cursor:default;">Apply Immediately</span></li>
            <li class="viscosity-seq-item"><div><div class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:600;margin-bottom:4px;">✓ Step 2 · Active Serum Wait Timer (Free Proof)</div><strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">First Treatment Drop</strong><div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Let pH-sensitive serums settle before your next layer.</div></div><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">Start 45s Timer</button></li>
            <li class="viscosity-seq-item dl-locked-spec-badge dl-locked-badge-c2" role="button" tabindex="0" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="cursor:pointer;border:1px dashed var(--rose-pill-border);background:var(--rose-pill-bg);"><div><div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:700;margin-bottom:4px;">${lockSvgInline}Steps 3–4 · 9:30 PM Ceramide Cushion Timer, Overnight Buffering &amp; 2 Dupes Locked ($0)</div><div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Enter your email above ($0) to reveal the 60s nighttime ceramide cushion timer, retinoid buffering step, and 2 chemist dupes &uarr;</div></div><span class="wait-timer-btn mono" style="color:var(--rose-brand);font-weight:700;">Tap to Reveal Free ($0) &uarr;</span></li>
            <li class="viscosity-seq-item dl-unlocked-c2-proof" style="display:none;"><div><div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 3 · Velvet Cushion</div><strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">Ceramide Barrier Cream</strong><div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Seals hydration and buffers nighttime retinoids.</div></div><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">Start 60s Timer</button></li>
            <li class="viscosity-seq-item dl-unlocked-c2-proof" style="display:none;"><div><div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 4 · Final Seal</div><strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">Morning SPF or Facial Oil</strong><div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Wait one minute so sunscreen or makeup never pills.</div></div><span class="wait-timer-btn mono" style="cursor:default;">Final Protective Layer</span></li>
          </ul>
        </div>
        <div id="pseo-dermlogic-inline-calc" data-ui="pseo-savings-calculator" style="margin-bottom:28px;padding:12px;background:var(--bg-oat);">
          <div class="porcelain-vessel-core" style="padding:24px 28px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
              <div>
                <div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">1-Tap Skin-Barrier Verdict &amp; Buffering Guide</div>
                <h2 class="serif-display" style="font-size:1.5rem;margin:4px 0 0;font-weight:400;">Tap your skin barrier profile for tailored wait times &amp; buffering rules with ${escapeHtml(searchIntentSubject)}</h2>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;" role="group" aria-label="Select Skin Barrier Profile">
                <button type="button" class="btn-secondary mono pseo-skin-pill" aria-pressed="false" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(180,1.35,'sensitive',this)">Sensitive / Rosacea</button>
                <button type="button" class="btn-secondary mono pseo-skin-pill" aria-pressed="false" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(360,1.5,'allergy_prone',this)">Allergy-Prone / Contact Reactive</button>
                <button type="button" class="btn-secondary mono pseo-skin-pill" aria-pressed="false" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(240,1.25,'dry',this)">Dry / Barrier-Stressed</button>
                <button type="button" class="btn-secondary mono pseo-skin-pill" aria-pressed="true" style="padding:8px 14px;font-size:0.82rem;border-color:var(--rose-brand);color:var(--rose-brand);" onclick="window.__dlCalcPseoSkin(320,1.0,'combination',this)">Balanced / Combination</button>
                <button type="button" class="btn-secondary mono pseo-skin-pill" aria-pressed="false" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(480,1.45,'oily_acne',this)">Blemish-Prone (5+ Serums)</button>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;background:var(--bg-canvas);padding:16px 20px;margin-bottom:12px;">
              <div><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Active Potency Protected</div><div id="pseo-dl-waste-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--sage-safe);">100% Stable (Buffered)</div></div>
              <div><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Ideal Routine Spacing</div><div id="pseo-dl-buffer-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--text-primary);">${Number(page.compatibilityScore) < 55 ? 'Morning & Night Split' : 'Buffer Over Ceramides'}</div></div>
              <div><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Skin Feel After Fix</div><div id="pseo-dl-harmony-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--sage-safe);">Calm &amp; Balanced</div></div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;"><button type="button" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" class="btn-secondary mono" style="padding:9px 13px;font-size:0.8rem;color:var(--rose-brand);border-color:var(--rose-brand);font-weight:700;cursor:pointer;">${lockSvgInline}Email $0 Rules &amp; 2 Dupes &uarr;</button><button type="button" id="dl-inline-calc-pass-btn" class="btn-secondary mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="padding:9px 13px;font-size:0.8rem;border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;cursor:pointer;">9:16 Card &rarr;</button><button type="button" id="dl-inline-calc-dupe-btn" class="btn-secondary mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="padding:9px 13px;font-size:0.8rem;background:var(--sage-bg);color:var(--sage-safe);border-color:var(--sage-border);font-weight:700;cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-inline-calc-copy-btn" class="btn-secondary mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="padding:9px 13px;font-size:0.8rem;font-weight:700;cursor:pointer;">&#128279; Copy Shelf Link</button><a id="pseo-dl-handoff-cta" href="/buy/flash_pass?source=pseo_inline_calc&amp;guide=${encodeURIComponent(page.slug)}&amp;skin_type=combination" class="btn-primary mono" style="padding:10px 16px;font-size:0.84rem;text-decoration:none;display:inline-block;">Save $1.99 Routine Card &rarr;</a></div>
            </div>
            <div id="pseo-dl-protocol-note" style="font-size:0.88rem;color:var(--text-secondary);padding:10px 14px;background:var(--bg-surface);">
              <div role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:600;cursor:pointer;font-size:0.82rem;">${lockSvgInline}Tailored Morning &amp; Bedtime Buffering Protocol for ${escapeHtml(searchIntentSubject)} Locked — Enter Email Above ($0) to Reveal Free &uarr;</div>
              <div id="pseo-dl-protocol-unlocked-text" class="dl-unlocked-c2-proof" style="display:none;"><strong style="color:var(--text-primary);">Tailored Protocol for ${escapeHtml(searchIntentSubject)}:</strong> ${defaultCalcProtocol}</div>
            </div>
          </div>
          <script>
            window.__dlCalcPseoSkin = function(spend, mult, profile, btn) {
              var pills = document.querySelectorAll('.pseo-skin-pill');
              for (var i = 0; i < pills.length; i++) { pills[i].setAttribute('aria-pressed', 'false'); pills[i].style.borderColor = ''; pills[i].style.color = ''; }
              if (btn) { btn.setAttribute('aria-pressed', 'true'); btn.style.borderColor = 'var(--rose-brand)'; btn.style.color = 'var(--rose-brand)'; }
              var baseLoss = Math.max(0.22, (100 - ${Number(page.compatibilityScore) || 55}) / 100);
              var wasted = Math.round(spend * Math.min(0.88, baseLoss * mult));
              var wEl = document.getElementById('pseo-dl-waste-out'), bEl = document.getElementById('pseo-dl-buffer-out'), hEl = document.getElementById('pseo-dl-harmony-out'), nEl = document.getElementById('pseo-dl-protocol-unlocked-text'), cEl = document.getElementById('pseo-dl-handoff-cta'), topV = document.getElementById('pseo-top-live-verdict'), topBtn = document.querySelector('#dl-pseo-top-conversion-bar .dl-inline-ics-btn span');
              if (wEl) wEl.textContent = mult >= 1.3 ? '100% Stable (Cushioned)' : '100% Stable (Buffered)';
              if (bEl) bEl.textContent = mult >= 1.3 ? 'Alternate Nights (4-Night Cycle)' : 'Morning & Night Split';
              if (hEl) hEl.textContent = mult >= 1.3 ? 'Gentle & Cushion-Soft' : 'Calm & Balanced';
              if (cEl) cEl.setAttribute('href', '/buy/flash_pass?source=pseo_inline_calc&guide=${encodeURIComponent(page.slug)}&skin_type=' + encodeURIComponent(profile));
              var pLbl = { sensitive: 'Sensitive / Rosacea', allergy_prone: 'Allergy-Prone / Reactive', dry: 'Dry / Barrier-Stressed', combination: 'Balanced / Combo', oily_acne: 'Blemish-Prone' }[profile] || 'Custom';
              if (topV) { topV.style.display = 'block'; topV.textContent = '✓ ' + pLbl + ' Selected: Saves ~$' + wasted + '/yr in wasted serum potency — Enter email below ($0) to unlock your ' + pLbl + ' Morning & Bedtime wait times + 2 dupes ↓'; }
              if (topBtn) topBtn.textContent = 'Unlock ' + pLbl + ' Rules & 2 Dupes ($0) →';
              var notes = {
                sensitive: '<strong style="color:var(--text-primary);">Sensitive / Rosacea Protocol:</strong> Buffer active treatments over a thin layer of 3:1:1 ceramide moisturizer, wait 10 minutes after cleansing so damp skin never amplifies stinging, and split strong actives across a 4-night recovery cycle.',
                allergy_prone: '<strong style="color:var(--text-primary);">Allergy-Prone / Contact-Reactive Protocol (EU CosIng 26-Allergen Screen):</strong> Use 100% fragrance-free, lanolin-free barrier formulas, patch-test active serums on your inner forearm for 48 hours, and unlock your hypoallergenic 9:30 PM swap above ($0).',
                dry: '<strong style="color:var(--text-primary);">Dry / Barrier-Stressed Protocol:</strong> Press hydrating humectants onto damp skin first, let dry for 90 seconds, and sandwich nighttime retinoids or acne cream between ceramide cream layers to prevent flaking.',
                combination: '<strong style="color:var(--text-primary);">Balanced / Combination Protocol:</strong> ' + ${JSON.stringify(defaultCalcProtocol)},
                oily_acne: '<strong style="color:var(--text-primary);">Blemish-Prone (5+ Serums) Protocol:</strong> Keep pore-clogging esters at 0/5, use Benzoyl Peroxide in the morning or buffered over moisturizer, and cushion nighttime Adapalene with a ceramide cream to prevent peeling.'
              };
              if (nEl && notes[profile]) nEl.innerHTML = notes[profile];
              var sel = document.getElementById('skinTypeSelect');
              if (profile === 'allergy_prone') window.__dlSelectedAllergies = ['fragrance', 'snail_mite', 'salicylates'];
              if (sel) { sel.value = profile === 'allergy_prone' ? 'allergy' : profile; if (typeof window.runRoutineAnalysis === 'function') window.runRoutineAnalysis(); }
              try {
                fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', page_url: window.location.pathname, meta: { trigger: 'pseo_inline_skin_calc', profile: profile, spend: spend, wasted_usd: wasted, slug: '${escapeHtml(page.slug)}' } }) }).catch(function(){});
                fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'view_paywall', page_url: window.location.pathname, meta: { trigger: 'pseo_inline_skin_verdict', profile: profile, wasted_usd: wasted, slug: '${escapeHtml(page.slug)}' } }) }).catch(function(){});
              } catch (_) {}
            };
          </script>
        </div>
        <div style="margin-bottom:28px;padding:12px;background:var(--bg-oat);"><div class="porcelain-vessel-core" style="padding:22px;">
          <h2 class="serif-display" style="font-size:1.75rem;margin-bottom:8px;">Can You Use ${escapeHtml(searchIntentSubject)} Together? Skincare Guide &amp; Layering Rules</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:14px;">Ingredient #1 shown free below &middot; <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:600;cursor:pointer;">${lockSvgInline}Tap to Reveal Pairing Verdict &amp; Ingredient #2 Timing Free ($0) &uarr;</span><strong class="dl-unlocked-c2-proof mono" style="display:none;color:var(--rose-brand);">${escapeHtml(formatVerdictLabel(page.verdict))}</strong></p>
          ${seoSwatchesHtml}
          <div class="table-wrap"><table><thead><tr><th>Ingredient &amp; Category</th><th>Pore-Clog Score</th><th>Skin Sensitivity</th><th>Best Time to Use</th><th>Texture &amp; Layering Step</th><th>Custom Morning / Night Schedule</th></tr></thead><tbody>${comparisonRowsHtml}</tbody></table></div>
          <details class="science-footnote-drawer" style="margin-top:14px;padding:14px 16px;background:var(--bg-canvas);">
            <summary class="mono" style="cursor:pointer;font-weight:500;color:var(--text-primary);font-size:0.84rem;">Esthetician &amp; Bottle Label Reference (Comfort Range, Texture Weight &amp; Official Ingredient List)</summary>
            <div style="margin-top:12px;overflow-x:auto;"><p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:8px;"><strong>Why This Order Works (${escapeHtml(page.conflictType)}):</strong> ${escapeHtml(cleanSummaryFirstSentence)}</p><table><thead><tr><th>Official Bottle Ingredient List Name</th><th>Skin pH Range</th><th>Skin Feel</th><th>Texture Weight</th><th>Pore-Clog Score (0–5)</th><th>Fungal-Acne Safe</th></tr></thead><tbody>${seoChemistrySpecsRows}</tbody></table></div>
          </details>
        </div></div>
        </div></details>
        <details class="porcelain-vessel-core" style="background:var(--bg-surface);padding:16px 22px;margin-bottom:14px;"><summary class="mono" style="cursor:pointer;font-size:0.84rem;color:var(--rose-brand);font-weight:600;">Common Questions &amp; Related Skincare Layering Guides (${(page.faqs || []).length} FAQs &middot; ${(relatedPages || []).slice(0, 8).length} Guides) &darr;</summary><div style="margin-top:16px;">
          <h2 class="serif-display" style="font-size:1.55rem;margin-bottom:12px;">Common Questions About ${escapeHtml(searchIntentSubject)}</h2>
          ${faqHtml}
          <h3 class="serif-display" style="font-size:1.35rem;margin:20px 0 12px;">Related Skincare Layering Guides</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;">${relatedHtml}</div>
        </div></details>
      </div>
    </section>`;
  return renderBaseDocument({ title: `${page.title} | DermLogic`, description: `See how to layer ${searchIntentSubject} without stinging or pilling: check the free 1-day clash preview or unlock the Morning & Night schedule.`, canonicalPath: `/seo/${page.slug}`, ogSlug: page.slug, jsonLdObjects: jsonLd, hideNav: false, bodyHtml });
}
function renderLegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy | DermLogic Atelier Céramique' : 'Terms of Service & Formulation Disclaimer | DermLogic';
  const bodyHtml = `<section class="section-block" style="padding-top:36px;"><div class="container"><div class="z-vessel-center"><div class="porcelain-vessel-core" style="padding:36px 40px;"><div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
      <span class="badge-safe mono">${isPrivacy ? 'Privacy &amp; Data Protection' : 'Terms of Service &amp; Educational Scope'}</span>
      <span class="badge-safe mono">&#10003; EU CosIng &amp; Lab pH Verified &middot; 65 Actives</span>
      <span class="badge-safe mono">&#10003; Free Proof #1 Dupe: Geek &amp; Gorgeous ($14 vs. $182 · Save $168)</span>
      <button type="button" id="dl-legal-dupe-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-safe);font-weight:700;cursor:pointer;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-legal-pass-btn" class="affiliate-link-pill mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="border-color:var(--rose-brand);color:var(--rose-brand);font-weight:700;cursor:pointer;">Preview 9:16 Lock-Screen Card &rarr;</button><button type="button" id="dl-legal-copy-btn" class="affiliate-link-pill mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="font-weight:700;cursor:pointer;">&#128279; Copy Shelf Link</button>
    </div>
    <h1 class="hero-h1" style="font-size:clamp(2.2rem,3.6vw,3.2rem);margin-bottom:10px;max-width:none;">${isPrivacy ? 'Privacy Policy &amp; Data Governance' : 'Terms of Service &amp; Educational Formulation Disclaimer'}</h1>
    <p style="color:var(--text-secondary);margin-bottom:16px;max-width:none;">Last Updated: October 27, 2026 &middot; Contact: <a href="mailto:concierge@dermlogic.io" style="color:var(--rose-brand);text-decoration:underline;">concierge@dermlogic.io</a> &middot; Publication: <strong>https://www.dermlogic.io</strong> &middot; <span role="button" tabindex="0" class="dl-locked-spec-badge dl-locked-badge-c2 mono" onclick="if(window.__dlFocusSampleEmail)window.__dlFocusSampleEmail(this)" style="color:var(--rose-brand);font-weight:700;cursor:pointer;">Save 9:30 PM Schedule &amp; 2 Dupes Free ($0 Email) &darr;</span></p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-bottom:18px;"><figure class="porcelain-vessel-core" style="margin:0;padding:8px 12px;background:var(--bg-oat);display:flex;align-items:center;gap:10px;"><img src="/public/banana_clinical_lab_glassware.jpg" alt="Independent cosmetic chemistry pH verification" width="68" height="50" loading="eager" style="width:68px;height:50px;object-fit:cover;border-radius:8px;flex-shrink:0;" /><figcaption style="font-size:0.78rem;color:var(--text-secondary);"><strong style="color:var(--text-primary);display:block;">Local-First Privacy</strong>Pre-checkout shelf selections stay in your browser.</figcaption></figure><figure class="porcelain-vessel-core" style="margin:0;padding:8px 12px;background:var(--bg-oat);display:flex;align-items:center;gap:10px;"><img src="/public/banana_apothecary_shelf_ritual.jpg" alt="30-day unconditional guarantee" width="68" height="50" loading="lazy" style="width:68px;height:50px;object-fit:cover;border-radius:8px;flex-shrink:0;" /><figcaption style="font-size:0.78rem;color:var(--text-secondary);"><strong style="color:var(--text-primary);display:block;">30-Day Refund Guarantee</strong>Instant self-serve fulfillment &amp; 8-allergen screen.</figcaption></figure></div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;">
      <div class="bento-cell" style="background:var(--bg-oat);padding:24px 26px;"><h2 class="serif-display" style="font-size:1.4rem;margin-bottom:8px;">${isPrivacy ? '1. Privacy &amp; Routine Preferences' : '1. Skincare Routine Educational Scope'}</h2><p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.62;max-width:none;">${isPrivacy ? 'DermLogic checks your pasted ingredient lists and bathroom shelf selections in real time to spot serum clashes, pH gaps, and pore-clogging oils. Pre-checkout routine selections are stored locally in your browser (localStorage) so your shelf remains intact across sessions. Optional checkout email addresses are used solely to deliver your Routine Ritual PDF and 9:16 Phone Lock-Screen Card.' : 'DermLogic provides cosmetic chemistry guidance (verified skin pH compatibility, active ingredient stability, and EU CosIng pore-safety scores) for educational skincare planning. Content published on DermLogic is authored for informational cosmetic-chemistry purposes and does not replace individualized medical diagnosis or prescription treatment by a board-certified dermatologist.'}</p></div>
      <div class="bento-cell" style="background:var(--bg-oat);padding:24px 26px;"><h2 class="serif-display" style="font-size:1.4rem;margin-bottom:8px;">${isPrivacy ? '2. GDPR / CCPA Rights, Cookies &amp; Retail Links' : '2. 30-Day Guarantee, Self-Serve Fulfillment &amp; Retail Links'}</h2><p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.62;max-width:none;">${isPrivacy ? 'Visitors may reject non-essential analytics via the Cookie Consent ribbon at any time and request complete deletion of order or telemetry records by emailing concierge@dermlogic.io. Outbound product links to authorized retailers (including Sephora, Dermstore, Ulta Beauty, and Amazon) include rel="sponsored" attributes and may earn an affiliate commission at no additional cost to you.' : 'All $0.99 Lock-Screen Cards, $1.99 Single-Routine Passes, $1.99 Complete Routine Kits, and $9/yr Unlimited Shelf Passes are fulfilled immediately in the browser and include an unconditional 30-day satisfaction guarantee. Outbound links to authorized retail partners may earn an affiliate commission as detailed in our Editorial &amp; FTC Policy.'}</p></div>
    </div>
  </div></div></div></div></section>`;
  return renderBaseDocument({ title, description: title, canonicalPath: isPrivacy ? '/privacy' : '/terms', ogSlug: type, jsonLdObjects: [], hideNav: false, bodyHtml });
}
function render404Page() {
  const bodyHtml = `<section class="section-block"><div class="container" style="max-width:680px;text-align:center;padding:42px 20px;"><div class="z-vessel-center"><div class="porcelain-vessel-core" style="align-items:center;"><div class="badge-clash mono" style="margin-bottom:12px;">HTTP 404 · Vessel Not Found</div><h1 class="hero-h1" style="font-size:2.4rem;">This Skincare Ritual Page Could Not Be Found</h1><p style="color:var(--text-secondary);margin-bottom:18px;">Return to the DermLogic Routine Harmony Checker, preview your 9:16 Lock-Screen Card, or explore all skincare layering guides.</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;width:100%;margin-bottom:18px;"><img src="/public/banana_aesop_vanity_serums.jpg" alt="Morning skincare serum bottles" width="280" height="110" loading="eager" style="width:100%;height:110px;object-fit:cover;border-radius:12px;" /><img src="/public/banana_ceramide_cream_macro.jpg" alt="Evening ceramide barrier cream" width="280" height="110" loading="lazy" style="width:100%;height:110px;object-fit:cover;border-radius:12px;" /></div><div style="display:flex;justify-content:center;gap:10px;flex-wrap:wrap;"><a href="/#analyzer" class="btn-primary"><span>Open Routine Harmony Checker</span><span class="btn-icon-circle">&rarr;</span></a><button type="button" id="dl-404-dupe-btn" class="affiliate-link-pill mono" onclick="if(window.__dlQuickLoadShelfPreset)window.__dlQuickLoadShelfPreset('dupe_86');if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this);" style="cursor:pointer;background:var(--sage-bg);border-color:var(--sage-border);color:var(--sage-safe);font-weight:700;">&#10003; $86 Dupe 9:16 Card &rarr;</button><button type="button" id="dl-404-pass-btn" class="btn-secondary mono" onclick="if(window.__dlOpenSampleModal)window.__dlOpenSampleModal(this)" style="cursor:pointer;">Preview 9:16 Lock-Screen Card &rarr;</button><button type="button" id="dl-404-copy-btn" class="btn-secondary mono" onclick="if(window.__dlCopyShareableShelfLink)window.__dlCopyShareableShelfLink(this)" style="cursor:pointer;">&#128279; Copy Shelf Link</button><a href="/directory" class="btn-secondary">Browse Layering Guides</a></div></div></div></div></section>`;
  return renderBaseDocument({ title: '404 Page Not Found | DermLogic', description: 'Page not found on DermLogic Formulation Atelier.', canonicalPath: '/404', ogSlug: '404', jsonLdObjects: [], hideNav: false, bodyHtml });
}
function renderOgSvg(pageOrTitle, subtitle, score, deltaPh) {
  const safeTitle = escapeHtml((pageOrTitle || 'DermLogic · Formulation Atelier').slice(0, 68));
  const safeSub = escapeHtml((subtitle || '7:30 AM Free Proof · 9:30 PM & 2 Chemist Dupes ($0 Email) · 30-Day Guarantee').slice(0, 95));
  const safeScore = score != null ? `${score}/100` : '96/100';
  const safeDelta = deltaPh != null ? `pH Gap ${deltaPh}` : 'pH Gap 2.8';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#FDF8F6"/><rect x="48" y="48" width="1104" height="534" rx="28" fill="#F8EFE6"/><rect x="88" y="92" width="640" height="42" rx="21" fill="#E9F4EE"/><text x="114" y="119" fill="#285B44" font-family="Georgia, serif" font-size="16" font-weight="bold">DERMLOGIC · EU COSING &amp; LAB PH · 30-DAY GUARANTEE</text><text x="88" y="218" fill="#3A1F27" font-family="Georgia, serif" font-size="40" font-weight="bold">${safeTitle}</text><text x="88" y="282" fill="#70525B" font-family="Georgia, serif" font-size="22">${safeSub}</text><rect x="88" y="355" width="290" height="145" rx="22" fill="#E9F4EE"/><text x="116" y="400" fill="#70525B" font-family="Georgia, serif" font-size="15">ROUTINE HARMONY SCORE</text><text x="116" y="466" fill="#285B44" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeScore)}</text><rect x="406" y="355" width="280" height="145" rx="22" fill="#F3E1E5"/><text x="434" y="400" fill="#8A3448" font-family="Georgia, serif" font-size="15">PH DIFFERENTIAL</text><text x="434" y="466" fill="#8A3448" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeDelta)}</text><rect x="714" y="355" width="388" height="145" rx="22" fill="#FFFFFF"/><text x="742" y="400" fill="#8A3448" font-family="Georgia, serif" font-size="15">7:30 AM FREE · 9:30 PM ($0 EMAIL)</text><text x="742" y="452" fill="#3A1F27" font-family="Georgia, serif" font-size="24" font-weight="bold">4-Night Schedule + 2 Dupes</text></svg>`;
}
function renderEditorialPolicyRoute() {
  return renderEditorialPolicyPage({ renderBaseDocument });
}
module.exports = { renderHomePage, renderPaidSocialLpPage, renderDirectoryPage, renderSeoDetailPage, renderLegalPage, renderEditorialPolicyRoute, render404Page, renderOgSvg };
