/**
 * DermLogic (#4): Taste-Skill v2.1.5 Warm Silk Editorial Gallery (Day) + 3000K Nocturnal Apothecary (Night) Page Views
 * Renders /, /lp, /directory, /seo/:slug (60+ pSEO pages), /privacy, /terms, 404, and /api/og.
 */

const {
  escapeHtml,
  SHARED_CSS,
  CLIENT_SCRIPT,
  renderHeader,
  renderFooter,
  renderInteractiveCheckerWidget
} = require('./ui-templates');

const { CLINICAL_INGREDIENTS } = require('./clinical-data');

function renderBaseDocument({ title, description, canonicalPath, ogSlug, jsonLdObjects, hideNav, bodyHtml }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.dermlogic.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath || '/'}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;
  const jsonLdScripts = (jsonLdObjects || [])
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj.url ? obj : { ...obj, url: canonicalUrl })}</script>`)
    .join('\n');

  return `<!DOCTYPE html>
<html lang="en" data-theme="day">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
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
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet" />
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
  if (v === 'SAFE_SYNERGY') return 'Safe Together';
  if (v === 'SAFE_WITH_WAIT' || v === 'WAIT_15_MIN' || v === 'ALTERNATE_OR_WAIT') return 'Wait 10m Between';
  if (v === 'SAFE_WITH_BUFFER') return 'Buffer With Cream';
  if (v === 'SPLIT_AM_PM') return 'Morning & Night Split';
  if (v === 'LOW_PH_ACTIVE') return 'Wait 60s After';
  if (v === 'CLINICAL_TEARDOWN') return 'Bottle Guide';
  return v.replace(/_/g, ' ');
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
    .replace(/stratum corneum/gi, 'skin surface')
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
  return `<div class="porcelain-swatch-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:22px;margin-bottom:28px;">${(ingList || []).slice(0, 3).map((ing) => {
    const slot = getRoutineSlotRecommendation(ing);
    const step = Number(ing.molecularWeightDa) < 200 ? 'First · Water-Light' : (Number(ing.molecularWeightDa) < 500 ? 'Second · Silky Serum' : 'Third · Velvet Seal');
    const feel = Number(ing.phMin) < 4.0 ? 'Gentle tingle · Wait 60s' : 'Cushion-soft & calm';
    const pore = ing.comedogenicity === 0 ? '0/5 Pore-Safe' : `Low (${ing.comedogenicity}/5)`;
    return `<div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:26px 28px;justify-content:space-between;gap:14px;"><div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><span class="mono" style="font-size:0.84rem;color:var(--rose-brand);font-weight:500;">Daily Active Note</span><span class="badge-safe mono">${pore}</span></div><h3 class="serif-display" style="font-size:1.36rem;line-height:1.24;margin-bottom:14px;">${escapeHtml(ing.commonName)}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:12px;"><div style="padding:11px 13px;background:var(--bg-surface);"><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">When to Apply</div><div style="font-size:0.9rem;font-weight:500;margin-top:3px;white-space:nowrap;">${slot.split('(')[0].trim()}</div></div><div style="padding:11px 13px;background:var(--bg-surface);"><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Texture Weight</div><div style="font-size:0.9rem;font-weight:500;margin-top:3px;white-space:nowrap;">${step}</div></div></div></div><div style="font-size:0.86rem;color:var(--text-secondary);padding-top:8px;white-space:nowrap;"><strong>On your skin:</strong> ${feel} · <span class="mono">pH ${ing.phMin}–${ing.phMax}</span></div></div>`;
  }).join('')}</div>`;
}

function renderHomePage({ products, ingredients, presets, initialAnalysis, initialProductIds, initialRawInci, initialSkinType, seoPages }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'DermLogic Clinical Skincare & INCI Harmony Atelier',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '1.99', priceCurrency: 'USD' },
      description: 'Clinical skincare active-ingredient conflict, ΔpH inactivation, pKa free-acid, comedogenic load & barrier-safety ritual planner.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'DermLogic Active-Ingredient Conflict & ΔpH Inactivation Checker',
      medicalAudience: 'Patients and Cosmetic Chemists',
      about: { '@type': 'MedicalCondition', name: 'Irritant Contact Dermatitis, Acne Cosmetica, and Transepidermal Water Loss' }
    }
  ];

  const topIngredientsRows = ingredients.slice(0, 18).map((ing) => {
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

    return `
    <tr>
      <td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.functionRole || ing.category || 'Targeted active')}</span></td>
      <td>${poreClogText}</td>
      <td>${sensitivityText}</td>
      <td style="font-size:0.86rem;color:var(--text-primary);">${routineSlot}</td>
      <td class="mono" style="font-size:0.84rem;color:var(--text-secondary);">${textureOrder}</td>
      <td style="color:var(--text-secondary);font-size:0.88rem;line-height:1.5;">${escapeHtml(getFriendlyBenefit(ing))}</td>
    </tr>`;
  }).join('');

  const chemistrySpecsRows = ingredients.slice(0, 18).map((ing) => `
    <tr>
      <td><strong class="mono" style="font-size:0.84rem;">${escapeHtml(ing.inciName)}</strong></td>
      <td class="mono">${ing.phMin}–${ing.phMax}</td>
      <td class="mono">${ing.pka != null ? ing.pka : 'N/A'}</td>
      <td class="mono">${ing.molecularWeightDa} Da</td>
      <td class="mono">${ing.comedogenicity}/5</td>
      <td class="mono">${ing.malasseziaTrigger ? 'Trigger' : 'Safe'}</td>
    </tr>
  `).join('');

  const featuredSeoPages = [
    ...seoPages.filter((p) => p.pageType === 'active_pair').slice(0, 3),
    ...seoPages.filter((p) => p.pageType === 'product_teardown').slice(0, 3)
  ];

  const featuredSeoLinks = featuredSeoPages.map((p) => `
    <div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:26px 28px;justify-content:space-between;gap:14px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">
          <span class="mono" style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(p.category)}</span>
          <span class="${p.compatibilityScore < 55 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(formatVerdictLabel(p.verdict))} · ${p.compatibilityScore}/100</span>
        </div>
        <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-weight:400;font-size:1.38rem;line-height:1.22;color:var(--text-primary);margin-bottom:10px;">${escapeHtml(p.title)}</a>
        <p style="color:var(--text-secondary);font-size:0.94rem;line-height:1.6;">${escapeHtml(p.summary)}</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;gap:8px;flex-wrap:wrap;">
        <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.86rem;color:var(--rose-brand);font-weight:500;">Read Pairing Guide &rarr;</a>
        <a href="/api/affiliate?product=${escapeHtml((p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic')}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" style="margin:0;">Shop Bottle &rarr;</a>
      </div>
    </div>
  `).join('');

  const homeSwatchesHtml = renderPorcelainSwatchCards(ingredients.slice(0, 3));

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div id="home-executive-brief" class="editorial-top-banner">
          <div class="hero-copy-col">
            <div>
              <h1 class="hero-h1">
                <span class="hero-h1-line1">Quiet your shelf.</span>
                <span class="hero-h1-line2">Save your skin.</span>
              </h1>
              <p class="hero-sub">
                An editorial formulation table for women who own Copper Peptides, Vitamin C, and Tretinoin. Check in five seconds which serums cancel on contact and which morning and bedtime order keeps every drop active.
              </p>
              <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:14px;">
                <a href="#analyzer" class="btn-primary"><span>Check My Bathroom Shelf</span><span class="btn-icon-circle">&rarr;</span></a>
                <a href="/leaderboard" class="btn-secondary"><span>Routine Harmony Leaderboard</span></a>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:12px 14px;background:var(--bg-oat);">
              <div><div class="mono" style="font-size:1.15rem;color:var(--text-primary);font-weight:500;">44</div><div style="font-size:0.78rem;color:var(--text-secondary);">Cult Formulas Indexed</div></div>
              <div><div class="mono" style="font-size:1.15rem;color:var(--text-primary);font-weight:500;">65</div><div style="font-size:0.78rem;color:var(--text-secondary);">Clinical INCI Actives</div></div>
              <div><div class="mono" style="font-size:1.15rem;color:var(--rose-brand);font-weight:500;">&lt;4ms</div><div style="font-size:0.78rem;color:var(--text-secondary);">ΔpH &amp; Pore-Safety Audit</div></div>
            </div>
          </div>
          <div class="hero-photo-col">
            <div class="editorial-photo-shell">
              <div class="editorial-photo-inner">
                <img src="/public/editorial-serum.jpg" alt="Atelier Céramique stoneware vessels, peptide dropper serum, and silk emulsion on warm bisque" fetchpriority="high" />
              </div>
              <div class="editorial-photo-caption">
                <div>
                  <strong class="serif-display" style="font-size:1.1rem;color:var(--text-primary);">Atelier Céramique · Droplet &amp; Barrier Audit</strong>
                  <div style="color:var(--text-secondary);font-size:0.82rem;">Checks ΔpH Clashes, Droplet Wait Times &amp; Pore Safety</div>
                </div>
                <span class="badge-safe mono">44 Cult Formulas</span>
              </div>
            </div>
          </div>
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

    <section class="section-block-alt" id="viscosity-sequencer">
      <div class="container">
        <div style="max-width:64ch;margin-bottom:24px;">
          <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:10px;">
            Stinging is not proof that a serum works.
          </h2>
          <p style="color:var(--text-secondary);font-size:var(--step-body);line-height:1.6;">
            When your skin feels tight, flushed, or tender even from plain water, your products are fighting each other on the surface. Three small shifts in morning and night timing restore calm, dewy comfort.
          </p>
        </div>

        <div class="z-cascade-stage">
          <div class="z-vessel-left">
            <div class="porcelain-vessel-core">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
                  <span class="mono" style="font-size:0.84rem;color:var(--rose-brand);font-weight:500;">Morning vs. Night</span>
                  <span class="badge-clash mono">Cancels Out · pH 3.2 vs 6.2</span>
                </div>
                <h3 class="serif-display" style="font-size:1.48rem;line-height:1.22;margin-bottom:12px;">Vitamin C in the Morning, Copper Peptides at Bedtime</h3>
                <blockquote class="serif-italic" style="font-size:1.05rem;line-height:1.5;color:var(--text-primary);background:var(--bg-canvas);padding:14px 16px;margin-bottom:12px;">
                  “Why did my $182 Vitamin C stop brightening and start stinging the week I added Copper Peptides?”
                </blockquote>
                <p style="color:var(--text-secondary);font-size:0.94rem;line-height:1.6;">
                  Pure Vitamin C needs an acidic pH (3.2) to absorb, while Copper Peptides rest at a neutral pH (6.2). Layering them in the same routine oxidizes both serums on contact. Keep Vitamin C for morning sun defense and save peptides for bedtime repair.
                </p>
              </div>
              <a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 16px;white-space:nowrap;">Shop Morning Vitamin C at Dermstore &rarr;</a>
            </div>
          </div>

          <div class="z-vessel-center">
            <div class="porcelain-vessel-core">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
                  <span class="mono" style="font-size:0.84rem;color:var(--sage-safe);font-weight:500;">90-Second Absorption</span>
                  <span class="badge-safe mono">Zero Makeup Pilling</span>
                </div>
                <h3 class="serif-display" style="font-size:1.48rem;line-height:1.22;margin-bottom:12px;">Let Acid Toners Dry Before Applying Niacinamide</h3>
                <blockquote class="serif-italic" style="font-size:1.05rem;line-height:1.5;color:var(--text-primary);background:var(--bg-canvas);padding:14px 16px;margin-bottom:12px;">
                  “Waiting ninety seconds after my exfoliating toner stopped my cheeks from flushing warm and kept my concealer from rolling off.”
                </blockquote>
                <p style="color:var(--text-secondary);font-size:0.94rem;line-height:1.6;">
                  Pressing Niacinamide or rich creams straight over damp Glycolic or Salicylic Acid shifts skin pH too abruptly—triggering a warm niacin flush and causing silicone primers or morning SPF to pill along your jawline.
                </p>
              </div>
              <a href="/buy/micro_pass?source=viscosity_sequencer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 16px;white-space:nowrap;">Get Lock-Screen Routine Card ($1.99) &rarr;</a>
            </div>
          </div>

          <div class="z-vessel-right">
            <div class="porcelain-vessel-core">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;">
                  <span class="mono" style="font-size:0.84rem;color:var(--sage-safe);font-weight:500;">Nighttime Barrier Cushion</span>
                  <span class="badge-safe mono">Stops Retinoid Flaking</span>
                </div>
                <h3 class="serif-display" style="font-size:1.48rem;line-height:1.22;margin-bottom:12px;">Separate Acne Washes From Your Nighttime Retinol</h3>
                <blockquote class="serif-italic" style="font-size:1.05rem;line-height:1.5;color:var(--text-primary);background:var(--bg-canvas);padding:14px 16px;margin-bottom:12px;">
                  “Moving Benzoyl Peroxide to the shower and buffering Tretinoin over ceramide cream calmed the peeling around my mouth in four days.”
                </blockquote>
                <p style="color:var(--text-secondary);font-size:0.94rem;line-height:1.6;">
                  Benzoyl Peroxide releases oxygen that deactivates over 80% of Retinol and Tretinoin on contact. Use washes in the morning, and cushion your nighttime retinoid with a 3:1:1 ceramide cream to protect your barrier.
                </p>
              </div>
              <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 16px;white-space:nowrap;">Shop Ceramide Cream at Sephora &rarr;</a>
            </div>
          </div>
        </div>

        <div class="sink-pacing-panel">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;">
            <div>
              <div class="mono" style="font-size:0.84rem;color:var(--sage-safe);font-weight:500;margin-bottom:4px;">Thinnest to Richest · Bathroom Sink Pacing</div>
              <h3 class="serif-display" style="font-size:1.55rem;">Tap a timer between layers so your skincare absorbs cleanly.</h3>
            </div>
            <a href="/buy/micro_pass?source=viscosity_sequencer" class="btn-primary">
              <span>Save Routine to Phone Lock Screen ($1.99)</span>
              <span class="btn-icon-circle">&rarr;</span>
            </a>
          </div>
          <ul class="viscosity-seq-list">
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 1 · Water-Light</div>
                <strong class="serif-display" style="font-size:1.18rem;color:var(--text-primary);display:block;margin-bottom:4px;">Mist or Toning Essence</strong>
                <div style="font-size:0.86rem;color:var(--text-secondary);line-height:1.45;">Press onto damp skin right after cleansing while pores are receptive.</div>
              </div>
              <span class="wait-timer-btn mono" style="cursor:default;">Apply Immediately</span>
            </li>
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 2 · Treatment Drop</div>
                <strong class="serif-display" style="font-size:1.18rem;color:var(--text-primary);display:block;margin-bottom:4px;">Vitamin C or Peptide Serum</strong>
                <div style="font-size:0.86rem;color:var(--text-secondary);line-height:1.45;">Pat gently with warm palms—give pH-dependent actives time to settle.</div>
              </div>
              <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">Start 45s Timer</button>
            </li>
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 3 · Velvet Cushion</div>
                <strong class="serif-display" style="font-size:1.18rem;color:var(--text-primary);display:block;margin-bottom:4px;">Ceramide Barrier Cream</strong>
                <div style="font-size:0.86rem;color:var(--text-secondary);line-height:1.45;">Locks in hydration and cushions dry corners before nighttime retinoids.</div>
              </div>
              <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">Start 60s Timer</button>
            </li>
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 4 · Final Seal</div>
                <strong class="serif-display" style="font-size:1.18rem;color:var(--text-primary);display:block;margin-bottom:4px;">Morning SPF or Facial Oil</strong>
                <div style="font-size:0.86rem;color:var(--text-secondary);line-height:1.45;">Let moisturizer set for one minute so sunscreen or oil never pills.</div>
              </div>
              <span class="wait-timer-btn mono" style="cursor:default;">Final Protective Layer</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section-block" id="actives-matrix">
      <div id="inci-table"></div>
      <div class="container">
        <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:8px;">Know what is inside every bottle on your vanity.</h2>
        <p style="color:var(--text-secondary);font-size:var(--step-body);margin-bottom:20px;max-width:65ch;">
          Explore how everyday skincare actives behave on your skin—whether they clog pores, whether they tingle, and when in your routine they belong.
        </p>
        ${homeSwatchesHtml}
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Ingredient &amp; Category</th>
                <th>Does It Clog Pores?</th>
                <th>Skin Sensitivity</th>
                <th>Best Time to Use</th>
                <th>Texture &amp; Layering Step</th>
                <th>What It Does For Your Skin</th>
              </tr>
            </thead>
            <tbody>
              ${topIngredientsRows}
            </tbody>
          </table>
        </div>

        <details class="science-footnote-drawer" style="margin-top:18px;padding:16px 20px;background:var(--bg-oat);">
          <summary class="mono" style="cursor:pointer;font-weight:500;color:var(--text-primary);font-size:0.86rem;">
            Esthetician &amp; Cosmetic Chemist Specifications (pH Windows, pKa, Daltons &amp; Full INCI)
          </summary>
          <div style="margin-top:14px;overflow-x:auto;">
            <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:10px;">
              Laboratory formulation metrics: optimal free-acid dissociation ranges, pKa Henderson-Hasselbalch values, and Daltons (molecular weight) determining skin-barrier penetration depth.
            </p>
            <table>
              <thead>
                <tr>
                  <th>Official INCI Nomenclature</th>
                  <th>Lab pH Range</th>
                  <th>pKa Dissociation</th>
                  <th>Molecular Size (Da)</th>
                  <th>EU CosIng Comedogenic (0–5)</th>
                  <th>Malassezia Safe</th>
                </tr>
              </thead>
              <tbody>
                ${chemistrySpecsRows}
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>

    <section class="section-block-alt">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
          <div>
            <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:4px;">Popular Bottle &amp; Serum Pairing Guides</h2>
            <p style="color:var(--text-secondary);font-size:var(--step-small);">Six everyday layering questions answered in plain English from our 72-guide library.</p>
          </div>
          <a href="/directory" class="btn-primary"><span>Explore All ${seoPages.length} Layering Guides</span><span class="btn-icon-circle">&rarr;</span></a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(340px,1fr));gap:16px;">
          ${featuredSeoLinks}
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: 'DermLogic | Luxury Skincare Routine Conflict, ΔpH & INCI Harmony Atelier',
    description: 'Check your skincare routine and INCI ingredients in 5 seconds for ΔpH inactivation, Copper Peptide + Vitamin C oxidation, Tretinoin clashes, and pore-clogging esters.',
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
      name: 'DermLogic Instant Skincare Routine Conflict & ΔpH Check',
      description: 'Stop wasting $200+ serums that deactivate each other on contact. Run a free 5-second active-ingredient & pore-clogging check.'
    }
  ];

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div class="editorial-top-banner">
          <div class="hero-copy-col">
            <h1 class="hero-h1" style="font-size:clamp(2.5rem,4.5vw,4.2rem);">
              Stop layering serums that cancel out on skin.
            </h1>
            <p class="hero-sub">
              Mixing Copper Peptides with Vitamin C, or Glycolic Acid with Tretinoin, deactivates your most expensive serums and leaves your skin tight and stinging. Tap your bottles below to get a gentle Morning &amp; Bedtime order.
            </p>
          </div>
          <div class="hero-photo-col">
            <div class="editorial-photo-shell">
              <div class="editorial-photo-inner" style="aspect-ratio:16/10;">
                <img src="/public/editorial-serum.jpg" alt="Atelier Céramique stoneware vessels, peptide dropper on warm bisque" fetchpriority="high" />
              </div>
              <div class="editorial-photo-caption">
                <span>Daylight Gallery &amp; 11 PM Vanity Ready</span>
                <span class="badge-clash mono">Morning &amp; Night Check</span>
              </div>
            </div>
          </div>
        </div>
        ${renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds: presets[1].productIds, initialRawInci: '' })}
      </div>
    </section>

    <section class="section-block-alt">
      <div class="container">
        <div class="z-cascade-stage">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="mono" style="color:var(--rose-brand);font-size:0.84rem;font-weight:500;">Morning vs. Night</span><span class="badge-clash mono">Split AM / PM</span></div>
              <h3 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">The Copper Peptide + Vitamin C Trap</h3>
              <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.58;">Layering Copper Peptides 1% (pH 6.2) with 15% Vitamin C (pH 3.2) oxidizes both serums on contact—leaving your skin tight and dull. Use Vitamin C in the morning and peptides at night.</p>
            </div>
            <a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 16px;">Shop Morning Vitamin C at Dermstore &rarr;</a>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="mono" style="color:var(--sage-safe);font-size:0.84rem;font-weight:500;">90-Second Absorption</span><span class="badge-safe mono">Zero Pilling</span></div>
              <h3 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">Let Acid Toners Dry Before Niacinamide</h3>
              <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.58;">Applying Niacinamide or rich creams straight over damp Glycolic or Salicylic Acid shifts skin pH too quickly—triggering warm redness and causing morning sunscreen to pill.</p>
            </div>
            <a href="/buy/flash_pass?source=lp_cascade" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 16px;">Save 9:16 Lock-Screen Card ($1.99) &rarr;</a>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;"><span class="mono" style="color:var(--sage-safe);font-size:0.84rem;font-weight:500;">Nighttime Cushion</span><span class="badge-safe mono">4-Night Cycle</span></div>
              <h3 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">Keep Acne Washes Away From Retinol</h3>
              <p style="color:var(--text-secondary);font-size:0.92rem;line-height:1.58;">Benzoyl Peroxide releases oxygen that wipes out over 80% of Tretinoin and Retinol potency on contact. Use peroxide washes in the morning and cushion retinoids over ceramide cream at night.</p>
            </div>
            <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 16px;">Shop Ceramide Cream at Sephora &rarr;</a>
          </div></div>
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: 'Is Your $300 Skincare Routine Secretly Canceling Itself Out? | DermLogic',
    description: 'Check your skincare active ingredient & ΔpH conflicts in 5 seconds. Instant AM/PM glow ritual and pore-clogging ingredient check.',
    canonicalPath: '/lp',
    ogSlug: 'lp-paid-social',
    jsonLdObjects: jsonLd,
    hideNav: true,
    bodyHtml
  });
}

function renderDirectoryPage({ seoPages }) {
  const pairPages = seoPages.filter((p) => p.pageType === 'active_pair');
  const productPages = seoPages.filter((p) => p.pageType === 'product_teardown');
  const clashCount = seoPages.filter((p) => p.compatibilityScore < 55).length;
  const safeCount = seoPages.filter((p) => p.compatibilityScore >= 75).length;

  const renderCardList = (items) => items.map((p) => {
    const prodId = (p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic';
    const partner = p.pageType === 'product_teardown' ? 'dermstore' : 'sephora';
    const partnerLabel = partner === 'dermstore' ? 'Dermstore' : 'Sephora';
    const vaultTag = p.pageType === 'product_teardown' ? 'product' : (p.compatibilityScore < 55 ? 'clash' : (p.compatibilityScore < 75 ? 'timer' : 'safe'));
    return `<div class="dir-vault-card porcelain-vessel-core" data-vault-tag="${vaultTag}" data-vault-text="${escapeHtml((p.title + ' ' + p.summary + ' ' + p.verdict).toLowerCase())}" style="padding:26px 28px;background:var(--bg-oat);display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <span class="${p.compatibilityScore < 55 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(formatVerdictLabel(p.verdict))} · ${p.compatibilityScore}/100</span>
          <span class="mono" style="font-size:0.84rem;color:var(--text-secondary);">pH Gap ${p.deltaPh}</span>
        </div>
        <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-size:1.38rem;font-weight:400;line-height:1.22;margin-bottom:10px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
        <p style="color:var(--text-secondary);font-size:0.94rem;line-height:1.6;margin-bottom:12px;">${escapeHtml(p.summary)}</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;gap:8px;flex-wrap:wrap;">
        <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.86rem;color:var(--rose-brand);font-weight:500;">Read Pairing Guide &rarr;</a>
        <a href="/api/affiliate?product=${escapeHtml(prodId)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop at ${partnerLabel} &rarr;</a>
      </div>
    </div>`;
  }).join('');

  const bodyHtml = `
    <section class="section-block" style="padding-top:36px;">
      <div class="container">
        <h1 class="hero-h1" style="font-size:clamp(2.4rem,4.2vw,3.8rem);margin-bottom:14px;">Skincare Pairing &amp; Cult-Bottle Library</h1>
        <p class="hero-sub" style="margin-bottom:24px;">
          Find out which serums belong in the morning, which belong at bedtime, how long to wait between layers, and whether your favorite bottles are safe for breakout-prone pores.
        </p>

        <div id="dir-apothecary-vault-bar" data-ui="directory-filter-bar" style="padding:18px 22px;background:var(--bg-oat);margin-bottom:32px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;" role="group" aria-label="Filter Apothecary Archive">
            <button type="button" class="vanity-light-btn mono dir-vault-pill active" aria-pressed="true" onclick="window.__dlFilterVault('all',this)">All ${seoPages.length} Guides</button>
            <button type="button" class="vanity-light-btn mono dir-vault-pill" aria-pressed="false" onclick="window.__dlFilterVault('clash',this)">Do Not Mix (${clashCount})</button>
            <button type="button" class="vanity-light-btn mono dir-vault-pill" aria-pressed="false" onclick="window.__dlFilterVault('safe',this)">Safe Together (${safeCount})</button>
            <button type="button" class="vanity-light-btn mono dir-vault-pill" aria-pressed="false" onclick="window.__dlFilterVault('product',this)">Cult Bottle Guides (${productPages.length})</button>
          </div>
          <input type="search" id="dir-vault-search" aria-label="Search layering guides" placeholder="Search Retinol, Copper Peptides, Vitamin C..." oninput="window.__dlSearchVault(this.value)" class="input-box" style="max-width:340px;padding:10px 16px;font-size:0.9rem;" />
        </div>
        <script>
          window.__dlVaultTag='all';
          window.__dlApplyVault=function(){
            var q=((document.getElementById('dir-vault-search')||{}).value||'').toLowerCase();
            var cards=document.querySelectorAll('.dir-vault-card');
            for(var i=0;i<cards.length;i++){
              var tOk=window.__dlVaultTag==='all'||cards[i].getAttribute('data-vault-tag')===window.__dlVaultTag;
              var qOk=!q||(cards[i].getAttribute('data-vault-text')||'').indexOf(q)!==-1;
              cards[i].style.display=(tOk&&qOk)?'flex':'none';
            }
          };
          window.__dlFilterVault=function(tag,btn){
            window.__dlVaultTag=tag;
            var bs=document.querySelectorAll('.dir-vault-pill');
            for(var i=0;i<bs.length;i++){bs[i].classList.remove('active');bs[i].setAttribute('aria-pressed','false');}
            if(btn){btn.classList.add('active');btn.setAttribute('aria-pressed','true');}
            window.__dlApplyVault();
          };
          window.__dlSearchVault=function(){window.__dlApplyVault();};
        </script>

        <h2 class="serif-display" style="font-size:1.85rem;margin:28px 0 16px;">Active Serum &amp; Ingredient Pairing Guides (${pairPages.length})</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px;">
          ${renderCardList(pairPages)}
        </div>

        <h2 class="serif-display" style="font-size:1.85rem;margin:48px 0 16px;">Cult Bottle Breakdowns &amp; Routine Guides (${productPages.length})</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px;">
          ${renderCardList(productPages)}
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: `Skincare Layering & INCI Directory (${seoPages.length} Guides) | DermLogic`,
    description: `Browse ${seoPages.length} clinical active-ingredient interaction matrices and cult skincare INCI teardowns.`,
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLdObjects: [],
    hideNav: false,
    bodyHtml
  });
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
  const comparedActives = resolveComparisonIngredients(page, products);
  const searchIntentSubject = page.ingredientA && page.ingredientB
    ? `${page.ingredientA.commonName} and ${page.ingredientB.commonName}`
    : page.product
      ? `${page.product.brand} ${page.product.name} and Active Serums`
      : (comparedActives[0] && comparedActives[1] ? `${comparedActives[0].commonName} and ${comparedActives[1].commonName}` : page.title.split(':')[0]);

  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'MedicalWebPage', headline: page.title, description: page.metaDescription, medicalAudience: 'Patients and Dermatological Practitioners', specialty: 'Dermatology' },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: (page.faqs || []).map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) },
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'DermLogic Routine Conflict Analyzer', applicationCategory: 'HealthApplication', operatingSystem: 'Web', offers: { '@type': 'Offer', price: '1.99', priceCurrency: 'USD' } },
    ...(page.amRule && page.pmRule ? [{ '@context': 'https://schema.org', '@type': 'HowTo', name: `How to layer ${searchIntentSubject}`, description: page.metaDescription, step: [{ '@type': 'HowToStep', name: 'Morning (AM) Protocol', text: page.amRule }, { '@type': 'HowToStep', name: 'Evening (PM) Protocol', text: page.pmRule }] }] : [])
  ];

  const seoSwatchesHtml = renderPorcelainSwatchCards(comparedActives);
  const comparisonRowsHtml = comparedActives.map((ing) => {
    const poreClog = ing.comedogenicity === 0 ? '<span class="badge-safe mono">Zero (0/5)</span>' : ing.comedogenicity <= 2 ? `<span class="badge-safe mono">Low (${ing.comedogenicity}/5)</span>` : `<span class="badge-clash mono">Caution (${ing.comedogenicity}/5)</span>`;
    const sensitivity = Number(ing.phMin) < 4.0 || String(ing.activeClass || '').includes('retinoid') ? '<span class="badge-warn mono">Active Tingle</span>' : '<span class="badge-safe mono">Barrier-Safe</span>';
    const routineSlot = getRoutineSlotRecommendation(ing);
    const textureOrder = Number(ing.molecularWeightDa) < 200 ? 'First · Water-light serum' : Number(ing.molecularWeightDa) < 500 ? 'Second · Medium serum' : 'Third · Cream / rich barrier';
    return `<tr><td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.category || 'Targeted active')}</span></td><td>${poreClog}</td><td>${sensitivity}</td><td style="font-size:0.84rem;color:var(--text-primary);">${routineSlot}</td><td class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${textureOrder}</td><td style="font-size:0.81rem;color:var(--text-secondary);"><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;">View Schedule ($1.99)</a></td></tr>`;
  }).join('');

  const seoChemistrySpecsRows = comparedActives.map((ing) => `<tr><td><strong class="mono" style="font-size:0.8125rem;">${escapeHtml(ing.inciName)}</strong></td><td class="mono">${ing.phMin}–${ing.phMax}</td><td class="mono">${ing.pka != null ? ing.pka : 'N/A'}</td><td class="mono">${ing.molecularWeightDa} Da</td><td class="mono">${ing.comedogenicity}/5</td><td class="mono">${ing.malasseziaTrigger ? 'Trigger' : 'Safe'}</td></tr>`).join('');

  const faqHtml = (page.faqs || []).map((f) => `<div class="porcelain-vessel-core" style="padding:20px 24px;background:var(--bg-surface);margin-bottom:12px;"><h3 class="serif-display" style="font-size:1.28rem;font-weight:400;margin-bottom:6px;">${escapeHtml(f.q)}</h3><p style="color:var(--text-secondary);font-size:0.88rem;">${escapeHtml(f.a)}</p></div>`).join('');

  const relatedHtml = (relatedPages || []).slice(0, 8).map((r) => `<a href="/seo/${escapeHtml(r.slug)}" class="porcelain-vessel-core" style="padding:18px 20px;background:var(--bg-surface);text-decoration:none;"><div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">${escapeHtml(formatVerdictLabel(r.verdict))} · ΔpH ${r.deltaPh}</div><div class="serif-display" style="font-weight:400;font-size:1.15rem;color:var(--text-primary);">${escapeHtml(r.title)}</div></a>`).join('');

  const seoBadgeClass = page.compatibilityScore < 55 ? 'badge-clash' : page.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe';

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="margin-bottom:12px;font-size:0.84rem;color:var(--text-secondary);">
          <a href="/">Home</a> / <a href="/directory">Layering Archive</a> / <span style="color:var(--rose-brand);font-weight:500;">${escapeHtml(page.category)}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <span class="${seoBadgeClass} mono">${escapeHtml(formatVerdictLabel(page.verdict))} · Harmony ${page.compatibilityScore}/100 (ΔpH ${page.deltaPh})</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Verified Formula at Dermstore &rarr;</a>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Alternative at Sephora &rarr;</a>
          </div>
        </div>
        <h1 class="hero-h1" style="font-size:clamp(2.2rem,3.8vw,3.4rem);">${escapeHtml(page.title)}</h1>
        <p class="hero-sub" style="margin-bottom:20px;">${escapeHtml(page.summary)}</p>

        <div class="z-cascade-stage" style="margin-bottom:24px;">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
                <span class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:500;">Do They Cancel Out?</span>
                <span class="${page.compatibilityScore < 55 ? 'badge-clash' : 'badge-safe'} mono">pH Gap ${page.deltaPh}</span>
              </div>
              <h3 class="serif-display" style="font-size:1.42rem;line-height:1.24;font-weight:400;margin-bottom:10px;">${escapeHtml(page.conflictType)}</h3>
              <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.58;">${escapeHtml(page.summary)}</p>
            </div>
            <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 14px;white-space:nowrap;">Save Lock-Screen Routine Card ($1.99) &rarr;</a>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
                <span class="mono" style="font-size:0.82rem;color:var(--sage-safe);font-weight:500;">Morning Routine Rule</span>
                <span class="badge-safe mono">Under SPF</span>
              </div>
              <h3 class="serif-display" style="font-size:1.42rem;line-height:1.24;font-weight:400;margin-bottom:10px;">How to Wear in Daylight</h3>
              <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.58;">${escapeHtml(page.amRule || 'Apply water-light serums first on clean skin, give 60 seconds to absorb, and seal with broad-spectrum SPF 50.')} Pat onto clean, dry skin after cleansing, let it settle for 60 seconds so the pH stays stable, then finish with lightweight moisturizer and SPF 30–50+.</p>
            </div>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 14px;white-space:nowrap;">Shop Verified Bottle at Dermstore &rarr;</a>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
                <span class="mono" style="font-size:0.82rem;color:var(--honey-warn);font-weight:500;">Bedtime Recovery Rule</span>
                <span class="badge-safe mono">11 PM Vanity</span>
              </div>
              <h3 class="serif-display" style="font-size:1.42rem;line-height:1.24;font-weight:400;margin-bottom:10px;">How to Layer at Bedtime</h3>
              <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.58;">${escapeHtml(page.pmRule || 'Alternate strong actives across a calm 4-night recovery rhythm and cushion with a 3:1:1 ceramide barrier cream.')} Apply from thinnest watery essence to richest cream, and cushion sensitive areas around the corners of your nose and mouth with a barrier moisturizer.</p>
            </div>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;padding:10px 14px;white-space:nowrap;">Shop Barrier-Safe Option at Sephora &rarr;</a>
          </div></div>
        </div>

        <div class="sink-pacing-panel" style="margin-top:0;margin-bottom:28px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:16px;flex-wrap:wrap;">
            <div>
              <div class="mono" style="font-size:0.82rem;color:var(--sage-safe);font-weight:500;margin-bottom:4px;">Thinnest to Richest · Bathroom Sink Pacing</div>
              <h3 class="serif-display" style="font-size:1.48rem;">Tap a timer between layers so your skincare absorbs cleanly.</h3>
            </div>
            <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="btn-primary">
              <span>Save 9:16 Lock-Screen Card ($1.99)</span>
              <span class="btn-icon-circle">&rarr;</span>
            </a>
          </div>
          <ul class="viscosity-seq-list">
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 1 · Water-Light</div>
                <strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">Mist or Toning Essence</strong>
                <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Press onto damp skin right after cleansing.</div>
              </div>
              <span class="wait-timer-btn mono" style="cursor:default;">Apply Immediately</span>
            </li>
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 2 · Active Serum</div>
                <strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">First Treatment Drop</strong>
                <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Let pH-sensitive serums settle before your next layer.</div>
              </div>
              <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">Start 45s Timer</button>
            </li>
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 3 · Velvet Cushion</div>
                <strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">Ceramide Barrier Cream</strong>
                <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Seals hydration and buffers nighttime retinoids.</div>
              </div>
              <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">Start 60s Timer</button>
            </li>
            <li class="viscosity-seq-item">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Step 4 · Final Seal</div>
                <strong class="serif-display" style="font-size:1.15rem;color:var(--text-primary);display:block;margin-bottom:4px;">Morning SPF or Facial Oil</strong>
                <div style="font-size:0.85rem;color:var(--text-secondary);line-height:1.45;">Wait one minute so sunscreen or makeup never pills.</div>
              </div>
              <span class="wait-timer-btn mono" style="cursor:default;">Final Protective Layer</span>
            </li>
          </ul>
        </div>

        <div id="pseo-dermlogic-inline-calc" data-ui="pseo-savings-calculator" style="margin-bottom:28px;padding:12px;background:var(--bg-oat);">
          <div class="porcelain-vessel-core" style="padding:24px 28px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
              <div>
                <div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">Shelf Value &amp; Comfort Check</div>
                <h2 class="serif-display" style="font-size:1.5rem;margin:4px 0 0;font-weight:400;">Tap your skin type to see how much serum value you save with ${escapeHtml(searchIntentSubject)}</h2>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn-secondary mono" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(180,1.35,'sensitive_rosacea')">Sensitive / Rosacea</button>
                <button type="button" class="btn-secondary mono" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(240,1.25,'dry_compromised')">Dry / Barrier-Stressed</button>
                <button type="button" class="btn-secondary mono" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(320,1.0,'balanced_combo')">Balanced / Combination</button>
                <button type="button" class="btn-secondary mono" style="padding:8px 14px;font-size:0.82rem;" onclick="window.__dlCalcPseoSkin(480,1.45,'oily_acne_stack')">Blemish-Prone (5+ Serums)</button>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px;background:var(--bg-canvas);padding:16px 20px;">
              <div><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Saved From Neutralizing</div><div id="pseo-dl-waste-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--rose-brand);">$${Math.round(240 * Math.max(0.22, (100 - (Number(page.compatibilityScore) || 55)) / 100))}/yr Saved</div></div>
              <div><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Ideal Routine Spacing</div><div id="pseo-dl-buffer-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--text-primary);">${Number(page.deltaPh) >= 1.5 ? 'Morning & Night Split' : 'Wait 60s Between'}</div></div>
              <div><div class="mono" style="font-size:0.78rem;color:var(--text-secondary);">Harmony After Fix</div><div id="pseo-dl-harmony-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--sage-safe);">96/100 Calm</div></div>
              <div style="display:flex;align-items:center;"><a href="/buy/micro_pass?source=pseo_inline_calc&amp;guide=${encodeURIComponent(page.slug)}" class="btn-primary mono" style="padding:10px 16px;font-size:0.84rem;text-decoration:none;display:inline-block;">Save 99¢ Routine Card &rarr;</a></div>
            </div>
          </div>
          <script>
            window.__dlCalcPseoSkin = function(spend, mult, profile) {
              var baseLoss = Math.max(0.22, (100 - ${Number(page.compatibilityScore) || 55}) / 100);
              var wasted = Math.round(spend * Math.min(0.88, baseLoss * mult));
              var wEl = document.getElementById('pseo-dl-waste-out'), bEl = document.getElementById('pseo-dl-buffer-out'), hEl = document.getElementById('pseo-dl-harmony-out');
              if (wEl) wEl.textContent = '$' + wasted + '/yr Saved';
              if (bEl) bEl.textContent = mult >= 1.3 ? 'Alternate Nights (4-Night Cycle)' : 'Morning & Night Split';
              if (hEl) hEl.textContent = (mult >= 1.3 ? '98/100' : '96/100') + ' Calm';
              try { fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', page_url: window.location.pathname, meta: { trigger: 'pseo_inline_skin_calc', profile: profile, spend: spend, wasted_usd: wasted, slug: '${escapeHtml(page.slug)}' } }) }).catch(function(){}); } catch (_) {}
            };
          </script>
        </div>

        <div style="margin-bottom:28px;padding:12px;background:var(--bg-oat);">
          <div class="porcelain-vessel-core" style="padding:22px;">
            <h2 class="serif-display" style="font-size:1.75rem;margin-bottom:8px;">Can You Use ${escapeHtml(searchIntentSubject)} Together? Skincare Guide &amp; Layering Rules</h2>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:14px;">
              Routine Compatibility: <strong class="mono" style="color:var(--rose-brand);">${escapeHtml(formatVerdictLabel(page.verdict))}</strong> (Compatibility Score: <strong>${page.compatibilityScore}/100</strong>). Inspect each ingredient's formulation swatch card and full layering matrix below.
            </p>
            ${seoSwatchesHtml}
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Ingredient &amp; Category</th>
                    <th>Pore-Clog Score</th>
                    <th>Skin Sensitivity</th>
                    <th>Best Time to Use</th>
                    <th>Texture &amp; Layering Step</th>
                    <th>Custom Morning / Night Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  ${comparisonRowsHtml}
                </tbody>
              </table>
            </div>

            <details class="science-footnote-drawer" style="margin-top:14px;padding:14px 16px;background:var(--bg-canvas);">
              <summary class="mono" style="cursor:pointer;font-weight:500;color:var(--text-primary);font-size:0.84rem;">
                Esthetician &amp; Cosmetic Chemist Footnote (Lab Mechanism, pH Windows, pKa, Daltons &amp; INCI)
              </summary>
              <div style="margin-top:12px;overflow-x:auto;">
                <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:8px;">
                  <strong>Lab Mechanism (${escapeHtml(page.labConflictType || page.conflictType)}):</strong> ${escapeHtml(page.labSummary || page.summary)}
                </p>
                <table>
                  <thead>
                    <tr>
                      <th>Official INCI Nomenclature</th>
                      <th>Lab pH Range</th>
                      <th>pKa Dissociation</th>
                      <th>Molecular Size (Da)</th>
                      <th>EU CosIng Comedogenic (0–5)</th>
                      <th>Malassezia Safe</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${seoChemistrySpecsRows}
                  </tbody>
                </table>
              </div>
            </details>
          </div>
        </div>

        ${renderInteractiveCheckerWidget({
          products,
          presets,
          initialAnalysis,
          initialProductIds: page.presetProducts,
          initialRawInci: page.product ? page.product.inciList : ''
        })}
      </div>
    </section>

    <section class="section-block-alt">
      <div class="container">
        <h2 class="serif-display" style="font-size:1.95rem;margin-bottom:16px;">Common Questions About This Pairing</h2>
        ${faqHtml}

        <h3 class="serif-display" style="font-size:1.55rem;margin:34px 0 14px;">Related Skincare Layering Guides</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px;">
          ${relatedHtml}
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: `${page.title} | DermLogic`,
    description: page.metaDescription,
    canonicalPath: `/seo/${page.slug}`,
    ogSlug: page.slug,
    jsonLdObjects: jsonLd,
    hideNav: false,
    bodyHtml
  });
}

function renderLegalPage({ type }) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy | DermLogic Atelier Céramique' : 'Terms of Service & Formulation Disclaimer | DermLogic';
  const bodyHtml = `
    <section class="section-block">
      <div class="container" style="max-width:840px;">
        <div class="z-vessel-center"><div class="porcelain-vessel-core">
          <div>
            <h1 class="hero-h1" style="font-size:2.4rem;margin-bottom:10px;">${isPrivacy ? 'Privacy Policy & Data Governance' : 'Terms of Service & Educational Formulation Disclaimer'}</h1>
            <p style="color:var(--text-secondary);margin-bottom:18px;">Last Updated: October 14, 2026 · Contact: concierge@dermlogic.io</p>
            <div class="bento-cell" style="margin-bottom:14px;">
              <h2 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">${isPrivacy ? 'Data Collection & Local SQLite Telemetry' : 'Cosmetic Chemistry Educational Scope'}</h2>
              <p style="color:var(--text-secondary);font-size:0.9rem;">${isPrivacy ? 'DermLogic processes pasted INCI ingredient lists and vanity shelf combinations deterministically on the server to calculate pH windows, pKa free-acid fractions, and comedogenicity ratings. Optional checkout email addresses are used solely to deliver your Routine Ritual PDF and 9:16 Wallet Pass.' : 'DermLogic provides deterministic cosmetic chemistry calculations (verified skin pH compatibility, active ingredient stability, and pore-safety scores) for educational formulation analysis. It does not replace individualized medical diagnosis by a board-certified dermatologist.'}</p>
            </div>
            <div class="bento-cell">
              <h2 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">${isPrivacy ? 'GDPR / CCPA Rights, Cookie Controls & Retailer Disclosures' : '30-Day Harmony Guarantee & Self-Serve Fulfillment'}</h2>
              <p style="color:var(--text-secondary);font-size:0.9rem;">${isPrivacy ? 'Visitors may reject non-essential analytics via the Cookie Consent ribbon at any time and request complete deletion of order or telemetry records by emailing concierge@dermlogic.io. Verified retailer links to Dermstore and Sephora include sponsored affiliate tags.' : 'All $1.99 Single-Routine Passes, $4.99 Complete Routine Kits, and $19.99/yr Unlimited Shelf Passes include an unconditional 30-day satisfaction guarantee.'}</p>
            </div>
          </div>
        </div></div>
      </div>
    </section>
  `;
  return renderBaseDocument({ title, description: title, canonicalPath: isPrivacy ? '/privacy' : '/terms', ogSlug: type, jsonLdObjects: [], hideNav: false, bodyHtml });
}

function render404Page() {
  const bodyHtml = `
    <section class="section-block">
      <div class="container" style="max-width:680px;text-align:center;padding:42px 20px;">
        <div class="z-vessel-center"><div class="porcelain-vessel-core" style="align-items:center;">
          <div class="badge-clash mono" style="margin-bottom:12px;">HTTP 404 · Vessel Not Found</div>
          <h1 class="hero-h1" style="font-size:2.4rem;">This Skincare Ritual Page Could Not Be Found</h1>
          <p style="color:var(--text-secondary);margin-bottom:24px;">Return to the DermLogic ΔpH &amp; Active-Ingredient Harmony Checker or explore all clinical layering guides.</p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <a href="/#analyzer" class="btn-primary"><span>Open Routine Harmony Checker</span><span class="btn-icon-circle">&rarr;</span></a>
            <a href="/directory" class="btn-secondary">Browse Layering Guides</a>
          </div>
        </div></div>
      </div>
    </section>
  `;
  return renderBaseDocument({ title: '404 Page Not Found | DermLogic', description: 'Page not found on DermLogic Formulation Atelier.', canonicalPath: '/404', ogSlug: '404', jsonLdObjects: [], hideNav: false, bodyHtml });
}

function renderOgSvg(pageOrTitle, subtitle, score, deltaPh) {
  const safeTitle = escapeHtml((pageOrTitle || 'DermLogic · Formulation Atelier').slice(0, 68));
  const safeSub = escapeHtml((subtitle || 'Porcelain Ritual & Viscosity Wait-Time Sequencer · Peptide & Vitamin C Harmony').slice(0, 95));
  const safeScore = score != null ? `${score}/100` : '96/100';
  const safeDelta = deltaPh != null ? `ΔpH ${deltaPh}` : 'ΔpH 2.8';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F4EFE8"/>
  <rect x="48" y="48" width="1104" height="534" fill="#FAF6F0" stroke="#D5CCC0" stroke-width="2"/>
  <rect x="88" y="92" width="420" height="42" fill="#EFE5E7"/>
  <text x="114" y="119" fill="#7A2332" font-family="Georgia, serif" font-size="16" font-weight="bold">DERMLOGIC · FORMULATION ATELIER</text>
  <text x="88" y="218" fill="#181412" font-family="Georgia, serif" font-size="40" font-weight="bold">${safeTitle}</text>
  <text x="88" y="282" fill="#5C534C" font-family="Georgia, serif" font-size="22">${safeSub}</text>
  <rect x="88" y="355" width="290" height="145" fill="#E9E2D7"/>
  <text x="116" y="400" fill="#5C534C" font-family="Georgia, serif" font-size="15">ROUTINE HARMONY SCORE</text>
  <text x="116" y="466" fill="#264C3C" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeScore)}</text>
  <rect x="406" y="355" width="280" height="145" fill="#EFE5E7"/>
  <text x="434" y="400" fill="#7A2332" font-family="Georgia, serif" font-size="15">PH DIFFERENTIAL</text>
  <text x="434" y="466" fill="#7A2332" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeDelta)}</text>
  <rect x="714" y="355" width="388" height="145" fill="#E9E2D7"/>
  <text x="742" y="400" fill="#7A2332" font-family="Georgia, serif" font-size="15">VISCOSITY &amp; WAIT SEQUENCER</text>
  <text x="742" y="452" fill="#181412" font-family="Georgia, serif" font-size="25" font-weight="bold">4-Night Skin Cycling + 9:16 Card</text>
</svg>`;
}

module.exports = {
  renderHomePage,
  renderPaidSocialLpPage,
  renderDirectoryPage,
  renderSeoDetailPage,
  renderLegalPage,
  render404Page,
  renderOgSvg
};
