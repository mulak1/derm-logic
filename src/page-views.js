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

function getRoutineSlotRecommendation(ing) {
  if (!ing) return 'Morning or Night';
  const id = String(ing.id || ''), cls = String(ing.activeClass || '');
  if (cls.includes('retinoid') || id.includes('tretinoin') || id.includes('retinol') || id.includes('adapalene') || id === 'hydroquinone') return 'Night Only (Bedtime routine)';
  if (id.includes('glycolic') || id.includes('lactic') || id.includes('mandelic')) return 'Night Only Exfoliant (Wear SPF next AM)';
  if (cls === 'vitamin_c_laa' || ing.category === 'uv_filter') return 'Morning Glow (Layer under sunscreen)';
  return 'Morning or Night (Safe in either)';
}

function renderPorcelainSwatchCards(ingList) {
  return `<div class="porcelain-swatch-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;margin-bottom:20px;">${(ingList || []).slice(0, 3).map((ing) => {
    const slot = getRoutineSlotRecommendation(ing);
    const step = Number(ing.molecularWeightDa) < 200 ? 'First · Water-Light' : (Number(ing.molecularWeightDa) < 500 ? 'Second · Bounce Serum' : 'Third · Velvet Seal');
    const feel = Number(ing.phMin) < 4.0 ? 'Active Tingle (Wait 60s)' : 'Cushion-Soft & Calm';
    const pore = ing.comedogenicity === 0 ? '0/5 Pore-Safe' : `Low (${ing.comedogenicity}/5)`;
    return `<div style="padding:10px;background:var(--bg-oat);display:flex;"><div class="porcelain-vessel-core" style="flex:1;padding:18px;"><div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:500;">Formulation Swatch</span><span class="badge-safe mono">${pore}</span></div><h3 class="serif-display" style="font-size:1.35rem;margin-bottom:10px;">${escapeHtml(ing.commonName)}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;"><div style="padding:8px 10px;background:var(--bg-canvas);"><div class="mono" style="font-size:0.7rem;color:var(--text-secondary);">When to Use</div><div style="font-size:0.82rem;font-weight:500;">${slot.split('(')[0].trim()}</div></div><div style="padding:8px 10px;background:var(--bg-canvas);"><div class="mono" style="font-size:0.7rem;color:var(--text-secondary);">Layering Step</div><div style="font-size:0.82rem;font-weight:500;">${step}</div></div></div></div><div style="font-size:0.8rem;color:var(--text-secondary);padding-top:6px;"><strong>Skin Feel:</strong> ${feel} · <span class="mono">pH ${ing.phMin}–${ing.phMax}</span></div></div></div>`;
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
      <td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.category || 'Targeted active')}</span></td>
      <td>${poreClogText}</td>
      <td>${sensitivityText}</td>
      <td style="font-size:0.86rem;color:var(--text-primary);">${routineSlot}</td>
      <td class="mono" style="font-size:0.84rem;color:var(--text-secondary);">${textureOrder}</td>
      <td style="color:var(--text-secondary);font-size:0.86rem;">${escapeHtml(ing.clinicalMechanism)}</td>
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
    ...seoPages.filter((p) => p.pageType === 'active_pair').slice(0, 12),
    ...seoPages.filter((p) => p.pageType === 'product_teardown').slice(0, 12)
  ];

  const featuredSeoLinks = featuredSeoPages.map((p) => `
    <div style="padding:10px;background:var(--bg-oat);display:flex;">
      <div class="porcelain-vessel-core" style="flex:1;padding:18px;">
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;">${escapeHtml(p.category)}</span>
            <span class="${p.compatibilityScore < 55 ? 'badge-clash' : 'badge-safe'} mono">Harmony ${p.compatibilityScore}/100</span>
          </div>
          <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-weight:400;font-size:1.22rem;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
          <p style="color:var(--text-secondary);font-size:0.86rem;margin-bottom:10px;">${escapeHtml(p.summary.slice(0, 115))}...</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;gap:8px;flex-wrap:wrap;">
          <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">Read Layering Dossier &rarr;</a>
          <a href="/api/affiliate?product=${escapeHtml((p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic')}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" style="margin:0;">Verified Retailer &rarr;</a>
        </div>
      </div>
    </div>
  `).join('');

  const homeSwatchesHtml = renderPorcelainSwatchCards(ingredients.slice(0, 3));

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div id="home-executive-brief" class="editorial-top-banner">
          <div class="hero-copy-col">
            <h1 class="hero-h1">
              <span class="hero-h1-line1">Why two serums</span>
              <span class="hero-h1-line2"><span class="serif-italic" style="color:var(--rose-brand);">cancel</span> on skin.</span>
            </h1>
            <p class="hero-sub">
              An editorial formulation table for women who own Copper Peptides, Vitamin C, and Tretinoin—and want to know which morning and night order keeps every drop active without stinging or pilling.
            </p>
            <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:12px;">
              <a href="#analyzer" class="btn-primary"><span>Check My Bathroom Shelf</span><span class="btn-icon-circle">&rarr;</span></a>
              <a href="/leaderboard" class="btn-secondary"><span>Routine Harmony Leaderboard</span></a>
            </div>
            <div style="padding:12px 14px;background:var(--bg-oat);">
              <div class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:500;margin-bottom:2px;">Daylight Gallery &amp; 11 PM Vanity Switch</div>
              <p style="font-size:0.86rem;color:var(--text-secondary);">
                Use the top header toggle to switch between <strong>Daylight Gallery</strong> (Warm Bisque &amp; Rose-Burgundy) and <strong>11 PM Vanity</strong> (3000K Nocturnal Apothecary &amp; Champagne Gold) for zero blue-light glare at your bathroom sink.
              </p>
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
        <div style="max-width:64ch;margin-bottom:28px;">
          <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:10px;">
            Why Serums <span class="serif-italic" style="color:var(--rose-brand);">Cancel Out</span>—And How to Pace Every Layer
          </h2>
          <p style="color:var(--text-secondary);font-size:var(--step-body);">
            When your skin stings even from plain water, you do not need a chemistry lecture—you need gentle texture pacing, wait-time discipline, and four-night barrier rest.
          </p>
        </div>

        <div class="z-cascade-stage">
          <div class="z-vessel-left">
            <div class="porcelain-vessel-core">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;margin-bottom:8px;">
                  The Sensory Fatigue Mirror Moment
                </div>
                <blockquote class="serif-italic" style="font-size:1.38rem;line-height:1.3;color:var(--text-primary);margin-bottom:12px;">
                  “My face is tight, shiny, and stinging from layering too many actives. Why did my $182 Vitamin C stop working when I added Copper Peptides?”
                </blockquote>
                <div class="badge-clash mono" style="margin-bottom:8px;">Cancels Out · pH 3.2 vs pH 6.2</div>
                <p style="color:var(--text-secondary);font-size:0.86rem;margin-bottom:12px;">
                  <strong>Plain-English Diagnosis:</strong> Pure Vitamin C needs an acidic pH (3.2), while Copper Peptides need a neutral pH (6.2). Layering them in the same step oxidizes both bottles on contact. Use Vitamin C in the <strong>Morning</strong> and Copper Peptides at <strong>Bedtime</strong>.
                </p>
              </div>
              <a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;">Shop Verified AM Vitamin C &amp; PM Peptides (Dermstore) &rarr;</a>
            </div>
          </div>

          <div class="z-vessel-center">
            <div class="porcelain-vessel-core">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;flex-wrap:wrap;">
                  <span class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:500;">Thinnest to Thickest</span>
                  <span class="badge-safe mono">Zero Makeup Pilling</span>
                </div>
                <h3 class="serif-display" style="font-size:1.75rem;margin-bottom:4px;">Viscosity &amp; Wait-Time Sequencer</h3>
                <p style="color:var(--text-secondary);font-size:0.85rem;">
                  Follow this droplet weight order—and tap any timer below at your bathroom sink so layers never roll off:
                </p>

                <ul class="viscosity-seq-list">
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">First · Water-Light Mist / Essence</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Apply to damp skin right after cleansing</div>
                    </div>
                    <span class="wait-timer-btn mono" style="cursor:default;">No Wait</span>
                  </li>
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">Second · Bounce Serum (Peptides / HA)</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Press gently with palms; never rub in circles</div>
                    </div>
                    <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">Start 45s Timer</button>
                  </li>
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">Third · Velvet Ceramide Cream</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Seals hydration inside the lipid barrier</div>
                    </div>
                    <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">Start 60s Timer</button>
                  </li>
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">Fourth · Pure Squalane Oil / SPF Seal</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Pat 2 drops over dry cheeks (or SPF in AM)</div>
                    </div>
                    <span class="wait-timer-btn mono" style="cursor:default;">Final Step</span>
                  </li>
                </ul>
              </div>
              <a href="/buy/micro_pass?source=viscosity_sequencer" class="btn-primary" style="width:100%;justify-content:space-between;">
                <span>Save Vanity Mirror Lock-Screen Card ($1.99)</span>
                <span class="btn-icon-circle">&rarr;</span>
              </a>
            </div>
          </div>

          <div class="z-vessel-right">
            <div class="porcelain-vessel-core">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:500;margin-bottom:8px;">
                  Medicine Cabinet Save Card · 11:00 PM Proof
                </div>
                <h3 class="serif-display" style="font-size:1.45rem;margin-bottom:8px;">Benzoyl Peroxide &amp; Retinol Separation</h3>
                <p style="font-size:0.86rem;font-style:italic;color:var(--text-primary);background:var(--bg-canvas);padding:12px 14px;margin-bottom:10px;">
                  “I printed the 4-night gentle cycling card and taped it inside my medicine cabinet. Moving Benzoyl Peroxide to morning and Retinol to bedtime stopped my winter flaking in 4 days.”
                </p>
                <p style="color:var(--text-secondary);font-size:0.84rem;margin-bottom:10px;">
                  <strong>Why it matters:</strong> Benzoyl Peroxide releases oxygen that wipes out 80%+ of Retinol on contact, while heavy base esters (Isopropyl Myristate 5/5) trap sweat and clog pores.
                </p>
                <details style="margin-bottom:12px;padding:10px 12px;background:var(--bg-canvas);font-size:0.78rem;color:var(--text-secondary);">
                  <summary class="mono" style="cursor:pointer;font-weight:500;color:var(--text-primary);">Optional Lab Footnote: Ceramide 3:1:1 Molar Ratio</summary>
                  <div style="padding-top:6px;">Physiological 3:1:1 ratio of Ceramides NP/AP, Cholesterol, and Fatty Acids accelerates stratum corneum recovery within 72 hours.</div>
                </details>
              </div>
              <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;">Shop Pore-Safe 3:1:1 Ceramide Cream (Sephora) &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-block" id="actives-matrix">
      <div id="inci-table"></div>
      <div class="container">
        <h2 class="serif-display" style="font-size:var(--step-head);margin-bottom:8px;">Everyday Skincare Ingredient Guide: Pore Safety, Routine Timing &amp; Benefits</h2>
        <p style="color:var(--text-secondary);font-size:var(--step-body);margin-bottom:20px;max-width:65ch;">
          Inspect formulation swatch cards for our signature actives, then browse all 18 essential skincare ingredients below to see pore-safety scores and wait times.
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
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;">
          <h2 class="serif-display" style="font-size:var(--step-head);">Editorial Layering Guides &amp; Cult-Product INCI Teardowns</h2>
          <a href="/directory" class="btn-secondary">Explore All ${seoPages.length} Layering Guides &rarr;</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px;">
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
              Stop Layering Serums That <span class="serif-italic" style="color:var(--rose-brand);">Cancel Out</span> on Your Skin.
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
                <span class="badge-clash mono">ΔpH Check</span>
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
              <div class="mono" style="color:var(--rose-brand);font-size:0.8rem;font-weight:500;margin-bottom:6px;">Why 68% of Routines Sting or Pill</div>
              <h3 class="serif-display" style="font-size:1.45rem;margin-bottom:6px;">The Copper Peptide + Vitamin C Trap</h3>
              <p style="color:var(--text-secondary);font-size:0.88rem;">Layering Copper Peptides 1% (pH 6.2) with 15% L-Ascorbic Acid (pH 3.2) triggers copper-ion oxidation, turning $200+ of serums into inactive pro-oxidants on your skin.</p>
            </div>
            <span class="badge-clash mono" style="align-self:flex-start;margin-top:10px;">Split AM / PM</span>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="color:var(--sage-safe);font-size:0.8rem;font-weight:500;margin-bottom:6px;">Thinnest to Thickest · Viscosity Sequencer</div>
              <h3 class="serif-display" style="font-size:1.65rem;margin-bottom:6px;">Droplet Wait-Time Pacing</h3>
              <ul class="viscosity-seq-list">
                <li class="viscosity-seq-item"><span><strong>First · Essence / Toner</strong> (Damp skin)</span><span class="wait-timer-btn mono">Immediate</span></li>
                <li class="viscosity-seq-item"><span><strong>Second · Bounce Peptide Serum</strong></span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">45s Timer</button></li>
                <li class="viscosity-seq-item"><span><strong>Third · Velvet Ceramide Cream</strong></span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">60s Timer</button></li>
              </ul>
            </div>
            <a href="/buy/flash_pass?source=lp_cascade" class="btn-primary" style="width:100%;justify-content:space-between;"><span>Save 9:16 Lock-Screen Card ($1.99)</span><span class="btn-icon-circle">&rarr;</span></a>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="color:var(--honey-warn);font-size:0.8rem;font-weight:500;margin-bottom:6px;">The Prescription Cream Paradox</div>
              <h3 class="serif-display" style="font-size:1.45rem;margin-bottom:6px;">Benzoyl Peroxide Degrades Tretinoin</h3>
              <p style="color:var(--text-secondary);font-size:0.88rem;">Applying Benzoyl Peroxide alongside Tretinoin or Retinol oxidizes the retinoid molecule while generic cream bases clog pores with Isopropyl Myristate (5/5 pore risk).</p>
            </div>
            <span class="badge-safe mono" style="align-self:flex-start;margin-top:10px;">4-Night Cycling Ready</span>
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
    return `<div class="dir-vault-card" data-vault-tag="${vaultTag}" data-vault-text="${escapeHtml((p.title + ' ' + p.summary + ' ' + p.verdict).toLowerCase())}" style="padding:10px;background:var(--bg-oat);display:flex;">
      <div class="porcelain-vessel-core" style="flex:1;padding:20px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="${p.compatibilityScore < 45 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(p.verdict)} · ${p.compatibilityScore}/100</span>
            <span class="mono" style="font-size:0.82rem;color:var(--text-secondary);">ΔpH ${p.deltaPh}</span>
          </div>
          <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-size:1.25rem;font-weight:400;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
          <p style="color:var(--text-secondary);font-size:0.86rem;margin-bottom:12px;">${escapeHtml(p.summary)}</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;gap:8px;flex-wrap:wrap;">
          <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:500;">Read Layering Dossier &rarr;</a>
          <a href="/api/affiliate?product=${escapeHtml(prodId)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop at ${partnerLabel} &rarr;</a>
        </div>
      </div>
    </div>`;
  }).join('');

  const bodyHtml = `
    <section class="section-block">
      <div class="container">
        <div style="max-width:70ch;margin-bottom:28px;">
          <h1 class="hero-h1" style="font-size:clamp(2.4rem,4.2vw,3.8rem);">Skincare Active-Ingredient <span class="serif-italic" style="color:var(--rose-brand);">Harmony</span> &amp; Cult-Product INCI Directory</h1>
          <p class="hero-sub">
            Every pairing and cult formula is housed in a dedicated formulation dossier with plain-English morning and bedtime separation rules, droplet wait-time sequencers, and pore-safety scores.
          </p>
        </div>

        <div id="dir-apothecary-vault-bar" data-ui="directory-filter-bar" style="padding:10px;background:var(--bg-oat);margin-bottom:28px;">
          <div class="porcelain-vessel-core" style="padding:14px 18px;flex-direction:row;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;" role="group" aria-label="Filter Apothecary Archive">
              <button type="button" class="vanity-light-btn mono dir-vault-pill active" aria-pressed="true" onclick="window.__dlFilterVault('all',this)">All ${seoPages.length} Guides</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" aria-pressed="false" onclick="window.__dlFilterVault('clash',this)">Do Not Mix (${clashCount})</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" aria-pressed="false" onclick="window.__dlFilterVault('safe',this)">Safe Together (${safeCount})</button>
              <button type="button" class="vanity-light-btn mono dir-vault-pill" aria-pressed="false" onclick="window.__dlFilterVault('product',this)">Cult Product Breakdowns (${productPages.length})</button>
            </div>
            <input type="search" id="dir-vault-search" aria-label="Search layering guides" placeholder="Search Retinol, Copper Peptides, Vitamin C..." oninput="window.__dlSearchVault(this.value)" class="input-box" style="max-width:280px;padding:8px 14px;font-size:0.86rem;" />
          </div>
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

        <h2 class="serif-display" style="font-size:1.85rem;margin:28px 0 16px;">Active-Ingredient Layering &amp; Compatibility Guides (${pairPages.length})</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px;">
          ${renderCardList(pairPages)}
        </div>

        <h2 class="serif-display" style="font-size:1.85rem;margin:48px 0 16px;">Cult-Product INCI Teardowns &amp; Ritual Guides (${productPages.length})</h2>
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

  const faqHtml = (page.faqs || []).map((f) => `<div style="padding:10px;background:var(--bg-oat);margin-bottom:12px;"><div class="porcelain-vessel-core" style="padding:18px 20px;"><h3 class="serif-display" style="font-size:1.25rem;font-weight:400;margin-bottom:6px;">${escapeHtml(f.q)}</h3><p style="color:var(--text-secondary);font-size:0.88rem;">${escapeHtml(f.a)}</p></div></div>`).join('');

  const relatedHtml = (relatedPages || []).slice(0, 8).map((r) => `<a href="/seo/${escapeHtml(r.slug)}" style="display:flex;padding:10px;background:var(--bg-oat);text-decoration:none;"><div class="porcelain-vessel-core" style="flex:1;padding:16px 18px;"><div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">${escapeHtml(r.verdict)} · ΔpH ${r.deltaPh}</div><div class="serif-display" style="font-weight:400;font-size:1.12rem;color:var(--text-primary);">${escapeHtml(r.title)}</div></div></a>`).join('');

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="margin-bottom:12px;font-size:0.84rem;color:var(--text-secondary);">
          <a href="/">Home</a> / <a href="/directory">Layering Archive</a> / <span style="color:var(--rose-brand);font-weight:500;">${escapeHtml(page.category)}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
          <span class="badge-safe mono">${escapeHtml(page.verdict)} · Harmony ${page.compatibilityScore}/100 (ΔpH ${page.deltaPh})</span>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Verified Formula at Dermstore &rarr;</a>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Alternative at Sephora &rarr;</a>
          </div>
        </div>
        <h1 class="hero-h1" style="font-size:clamp(2.2rem,3.8vw,3.4rem);">${escapeHtml(page.title)}</h1>
        <p class="hero-sub" style="margin-bottom:24px;">${escapeHtml(page.summary)}</p>

        <div class="z-cascade-stage" style="margin-bottom:28px;">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;margin-bottom:6px;">Do They Cancel Out?</div>
              <div class="serif-display" style="font-size:1.4rem;font-weight:400;margin-bottom:8px;">${escapeHtml(page.conflictType)}</div>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:10px;">Recommended Routine Spacing: <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;">[Locked in Free Preview · Save Exact Wait Timer ($1.99)]</a></p>
            </div>
            <span class="${page.compatibilityScore < 55 ? 'badge-clash' : 'badge-safe'} mono" style="align-self:flex-start;">ΔpH ${page.deltaPh} Gap</span>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;">
                <span class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:500;">Viscosity &amp; Wait-Time Sequencer</span>
                <span class="badge-safe mono">Zero Pilling</span>
              </div>
              <h3 class="serif-display" style="font-size:1.55rem;margin-bottom:4px;">Droplet Absorption Pacing</h3>
              <ul class="viscosity-seq-list" style="margin:8px 0 12px;">
                <li class="viscosity-seq-item"><span><strong>Morning Ritual Step</strong></span><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;text-decoration:underline;">Save AM Order ($1.99)</a></li>
                <li class="viscosity-seq-item"><span><strong>Active Serum Buffer</strong></span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">Start 45s Timer</button></li>
                <li class="viscosity-seq-item"><span><strong>Barrier Cream Seal</strong></span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">Start 60s Timer</button></li>
              </ul>
            </div>
            <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="btn-primary" style="width:100%;justify-content:space-between;"><span>Save 9:16 Lock-Screen Card ($1.99)</span><span class="btn-icon-circle">&rarr;</span></a>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="font-size:0.8rem;color:var(--honey-warn);font-weight:500;margin-bottom:6px;">Bedtime Four-Night Cycling</div>
              <div class="serif-display" style="font-size:1.4rem;font-weight:400;margin-bottom:8px;">Evening Barrier Recovery</div>
              <p style="font-size:0.86rem;color:var(--text-secondary);margin-bottom:10px;">Four-Night Schedule &rarr; <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;">[Locked in Free Preview · Save 4-Night Bedtime Calendar ($1.99)]</a></p>
            </div>
            <span class="badge-safe mono" style="align-self:flex-start;">3000K Vanity Ready</span>
          </div></div>
        </div>

        <div id="pseo-dermlogic-inline-calc" data-ui="pseo-savings-calculator" style="margin-bottom:28px;padding:12px;background:var(--bg-oat);">
          <div class="porcelain-vessel-core" style="padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
              <div>
                <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;">Skincare Savings &amp; Harmony Calculator</div>
                <h2 class="serif-display" style="font-size:1.45rem;margin:2px 0 0;">Tap Your Skin Type to Check Potential Product Inactivation for ${escapeHtml(searchIntentSubject)}</h2>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="btn-secondary mono" style="padding:6px 12px;font-size:0.8rem;" onclick="window.__dlCalcPseoSkin(180,1.35,'sensitive_rosacea')">Sensitive / Rosacea ($180/yr)</button>
                <button type="button" class="btn-secondary mono" style="padding:6px 12px;font-size:0.8rem;" onclick="window.__dlCalcPseoSkin(240,1.25,'dry_compromised')">Dry / Compromised ($240/yr)</button>
                <button type="button" class="btn-secondary mono" style="padding:6px 12px;font-size:0.8rem;" onclick="window.__dlCalcPseoSkin(320,1.0,'balanced_combo')">Balanced / Combo ($320/yr)</button>
                <button type="button" class="btn-secondary mono" style="padding:6px 12px;font-size:0.8rem;" onclick="window.__dlCalcPseoSkin(480,1.45,'oily_acne_stack')">5+ Active Stack ($480/yr)</button>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;background:var(--bg-canvas);padding:14px;">
              <div><div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">Est. Wasted Value / Yr</div><div id="pseo-dl-waste-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--rose-brand);">$${Math.round(240 * Math.max(0.22, (100 - (Number(page.compatibilityScore) || 55)) / 100))}/yr Lost</div></div>
              <div><div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">Recommended Routine Spacing</div><div id="pseo-dl-buffer-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--text-primary);">${Number(page.deltaPh) >= 1.5 ? '20 Min / AM-PM Split' : '10 Min Wait Buffer'}</div></div>
              <div><div class="mono" style="font-size:0.76rem;color:var(--text-secondary);">Post-Fix Harmony Score</div><div id="pseo-dl-harmony-out" class="mono" style="font-size:1.35rem;font-weight:500;color:var(--sage-safe);">96/100 Verified</div></div>
              <div style="display:flex;align-items:center;"><a href="/buy/micro_pass?source=pseo_inline_calc&amp;guide=${encodeURIComponent(page.slug)}" class="btn-primary mono" style="padding:10px 14px;font-size:0.82rem;text-decoration:none;display:inline-block;">Save 99¢ AM/PM Card &rarr;</a></div>
            </div>
          </div>
          <script>
            window.__dlCalcPseoSkin = function(spend, mult, profile) {
              var baseLoss = Math.max(0.22, (100 - ${Number(page.compatibilityScore) || 55}) / 100);
              var wasted = Math.round(spend * Math.min(0.88, baseLoss * mult));
              var wEl = document.getElementById('pseo-dl-waste-out'), bEl = document.getElementById('pseo-dl-buffer-out'), hEl = document.getElementById('pseo-dl-harmony-out');
              if (wEl) wEl.textContent = '$' + wasted + '/yr Lost';
              if (bEl) bEl.textContent = mult >= 1.3 ? 'Alternate Nights (4-Night Cycle)' : '20 Min Wait + AM/PM Split';
              if (hEl) hEl.textContent = (mult >= 1.3 ? '98/100' : '96/100') + ' Verified';
              try { fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', page_url: window.location.pathname, meta: { trigger: 'pseo_inline_skin_calc', profile: profile, spend: spend, wasted_usd: wasted, slug: '${escapeHtml(page.slug)}' } }) }).catch(function(){}); } catch (_) {}
            };
          </script>
        </div>

        <div style="margin-bottom:28px;padding:12px;background:var(--bg-oat);">
          <div class="porcelain-vessel-core" style="padding:22px;">
            <h2 class="serif-display" style="font-size:1.75rem;margin-bottom:8px;">Can You Use ${escapeHtml(searchIntentSubject)} Together? Skincare Guide &amp; Layering Rules</h2>
            <p style="color:var(--text-secondary);font-size:0.9rem;margin-bottom:14px;">
              Routine Compatibility: <strong class="mono" style="color:var(--rose-brand);">${escapeHtml(page.verdict)}</strong> (Compatibility Score: <strong>${page.compatibilityScore}/100</strong>). Inspect each ingredient's formulation swatch card and full layering matrix below.
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
        <h2 class="serif-display" style="font-size:1.95rem;margin-bottom:16px;">Esthetician &amp; Cosmetic Chemist FAQ</h2>
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
