/**
 * DermLogic (#4): Warm Silk & Botanical Clinical Luxury Page Views & OpenGraph SVG Renderer
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
<html lang="en">
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
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  ${jsonLdScripts}
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

function renderHomePage({ products, ingredients, presets, initialAnalysis, initialProductIds, initialRawInci, initialSkinType, seoPages }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'DermLogic Clinical Skincare & INCI Harmony Atelier',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '1.99',
        priceCurrency: 'USD'
      },
      description: 'Clinical skincare active-ingredient conflict, ΔpH inactivation, pKa free-acid, comedogenic load & barrier-safety ritual planner.'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      name: 'DermLogic Active-Ingredient Conflict & ΔpH Inactivation Checker',
      medicalAudience: 'Patients and Cosmetic Chemists',
      about: {
        '@type': 'MedicalCondition',
        name: 'Irritant Contact Dermatitis, Acne Cosmetica, and Transepidermal Water Loss'
      }
    }
  ];

  const topIngredientsRows = ingredients.slice(0, 18).map((ing) => {
    const poreClogText = ing.comedogenicity === 0
      ? '<span class="badge-safe mono">✨ Zero (0/5)</span>'
      : ing.comedogenicity <= 2
        ? `<span class="badge-safe mono">Low (${ing.comedogenicity}/5)</span>`
        : `<span class="badge-clash mono">⚠️ Caution (${ing.comedogenicity}/5)</span>`;
    const sensitivityText = Number(ing.phMin) < 4.0 || String(ing.activeClass || '').includes('retinoid')
      ? '<span class="badge-warn mono">⚡ Can Tingle / Active</span>'
      : '<span class="badge-safe mono">🌿 Gentle / Barrier-Safe</span>';
    const routineSlot = getRoutineSlotRecommendation(ing);
    const textureOrder = Number(ing.molecularWeightDa) < 200
      ? '1st · Water-light'
      : Number(ing.molecularWeightDa) < 500
        ? '2nd · Medium serum'
        : '3rd · Cream / rich';

    return `
    <tr>
      <td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.category || 'Targeted active')}</span></td>
      <td>${poreClogText}</td>
      <td>${sensitivityText}</td>
      <td style="font-size:0.84rem;color:var(--text-primary);">${routineSlot}</td>
      <td class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${textureOrder}</td>
      <td style="color:var(--text-secondary);font-size:0.84rem;">${escapeHtml(ing.clinicalMechanism)}</td>
    </tr>
  `;
  }).join('');

  const chemistrySpecsRows = ingredients.slice(0, 18).map((ing) => `
    <tr>
      <td><strong class="mono" style="font-size:0.8125rem;">${escapeHtml(ing.inciName)}</strong></td>
      <td class="mono">${ing.phMin}–${ing.phMax}</td>
      <td class="mono">${ing.pka != null ? ing.pka : '—'}</td>
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
    <div style="padding:6px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);box-shadow:var(--shadow-silk);display:flex;">
      <div class="porcelain-vessel-core" style="flex:1;padding:18px;">
        <div>
          <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
            <span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:700;">${escapeHtml(p.category)}</span>
            <span class="${p.compatibilityScore < 55 ? 'badge-clash' : 'badge-safe'} mono">Harmony ${p.compatibilityScore}/100</span>
          </div>
          <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-weight:600;font-size:1.18rem;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
          <p style="color:var(--text-secondary);font-size:0.86rem;margin-bottom:10px;">${escapeHtml(p.summary.slice(0, 115))}...</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-hairline);padding-top:8px;gap:8px;flex-wrap:wrap;">
          <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:700;">Open Porcelain Vessel →</a>
          <a href="/api/affiliate?product=${escapeHtml((p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic')}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" style="margin:0;">Verified Retailer ↗</a>
        </div>
      </div>
    </div>
  `).join('');

  const homeSwatchesHtml = renderPorcelainSwatchCards(ingredients.slice(0, 3));

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div id="home-executive-brief" class="editorial-top-banner">
          <div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
              <div class="eyebrow-pill mono" style="margin:0;">ATELIER CÉRAMIQUE · Z-AXIS PORCELAIN RITUAL &amp; WAIT-TIME SEQUENCER</div>
              <a href="/leaderboard" class="badge-safe mono" style="text-decoration:none;">🏆 Top-3 Podium Leaderboard &rarr;</a>
            </div>
            <h1 class="hero-h1">A Quiet Bedtime Ritual for Skin <span class="serif-italic" style="color:var(--rose-brand);">Exhausted</span> by Harsh Acids.</h1>
            <p class="hero-sub" style="margin-bottom:12px;">
              71% of multi-step routines combine serums that clash in acidity, pill under moisturizer, or cancel each other out on contact. Check your bathroom shelf in 5 seconds for calm, plain-English layering order and droplet wait timers.
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
              <span class="mono" style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;">Built for:</span>
              <span class="ph-chip mono">✨ Skincare Shoppers</span>
              <span class="ph-chip mono">🧴 Retinol &amp; Peptide Users</span>
              <span class="ph-chip mono">🌿 Sensitive Barrier Recovery</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;">
              <div style="padding:11px 12px;border-radius:14px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--rose-brand);margin-bottom:3px;">STEP 1 • FREE CHECK</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">Tap a popular routine or paste any product's ingredient list below.</div>
              </div>
              <div style="padding:11px 12px;border-radius:14px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--honey-warn);margin-bottom:3px;">STEP 2 • SPOT CLASHES</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">See which serums cancel out in pH, oxidize Retinol, or clog pores.</div>
              </div>
              <div style="padding:11px 12px;border-radius:14px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--sage-safe);margin-bottom:3px;">STEP 3 • UNLOCK RITUAL</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">Unlock your custom AM/PM order, wait timers &amp; 9:16 phone card ($1.99).</div>
              </div>
            </div>
          </div>
          <div class="editorial-photo-shell">
            <div class="editorial-photo-inner">
              <img src="/public/editorial-serum.jpg" alt="Atelier Céramique stoneware vessels, peptide dropper serum, and silk emulsion on warm bisque" fetchpriority="high" />
              <div class="editorial-photo-caption">
                <div>
                  <strong class="serif-display" style="font-size:1.05rem;color:var(--text-primary);">Atelier Céramique · Droplet &amp; Barrier Audit</strong>
                  <div style="color:var(--text-secondary);font-size:0.8125rem;">3000K Vanity Calibrated · Checks Clashes, Wait Times &amp; Pore Safety</div>
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

    <!-- Direction 05: Z-Axis Overlapping Porcelain Cascade & Viscosity Wait-Time Sequencer -->
    <section class="section-block" id="viscosity-sequencer">
      <div class="container">
        <div style="text-align:center;max-width:68ch;margin:0 auto 12px;">
          <span class="eyebrow-pill mono">ATELIER CÉRAMIQUE · Z-AXIS TACTILE CASCADE</span>
          <h2 class="serif-display" style="font-size:clamp(2rem,3.4vw,2.85rem);line-height:1.08;margin-bottom:8px;">
            Why Serums <span class="serif-italic" style="color:var(--rose-brand);">Cancel Out</span>—And How to Pace Every Layer
          </h2>
          <p style="color:var(--text-secondary);font-size:0.96rem;">
            When your skin stings even from plain water, you don't need a chemistry lecture—you need gentle texture pacing, wait-time discipline, and barrier rest.
          </p>
        </div>

        <div class="z-cascade-stage">
          <!-- Left Tilted Porcelain Vessel: Sensory Fatigue & Copper Peptide Clash -->
          <div class="z-vessel-left">
            <div class="porcelain-vessel-core">
              <div>
                <div class="mono" style="font-size:0.75rem;color:var(--rose-brand);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">
                  🪞 THE SENSORY FATIGUE MIRROR MOMENT
                </div>
                <blockquote class="serif-italic" style="font-size:1.38rem;line-height:1.3;color:var(--text-primary);margin-bottom:12px;">
                  “My face is tight, shiny, and stinging from layering too many TikTok actives. Why did my $182 Vitamin C stop working when I added Copper Peptides?”
                </blockquote>
                <div class="badge-clash mono" style="margin-bottom:8px;">⚠️ CANCELS OUT · pH 3.2 vs pH 6.2</div>
                <p style="color:var(--text-secondary);font-size:0.86rem;margin-bottom:12px;">
                  <strong>Plain-English Diagnosis:</strong> Pure Vitamin C needs an acidic pH (3.2), while Copper Peptides need a neutral pH (6.2). Layering them in the same step oxidizes both bottles on contact. Use Vitamin C in the <strong>Morning</strong> and Copper Peptides at <strong>Bedtime</strong>.
                </p>
              </div>
              <a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;">Shop Verified AM Vitamin C &amp; PM Peptides (Dermstore) ↗</a>
            </div>
          </div>

          <!-- Center Elevated Porcelain Vessel: Interactive Viscosity & Droplet Wait-Time Sequencer -->
          <div class="z-vessel-center">
            <div class="porcelain-vessel-core">
              <div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;flex-wrap:wrap;">
                  <span class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:700;letter-spacing:0.08em;">THINNEST TO THICKEST</span>
                  <span class="badge-safe mono">ZERO MAKEUP PILLING</span>
                </div>
                <h3 class="serif-display" style="font-size:1.75rem;margin-bottom:4px;">Viscosity &amp; Wait-Time Sequencer</h3>
                <p style="color:var(--text-secondary);font-size:0.85rem;">
                  Follow this droplet weight order—and tap any timer below at your bathroom sink so layers never roll off:
                </p>

                <ul class="viscosity-seq-list">
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">1. Water-Light Mist / Essence</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Apply to damp skin right after cleansing</div>
                    </div>
                    <span class="wait-timer-btn mono" style="cursor:default;">No Wait</span>
                  </li>
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">2. Bounce Serum (Peptides / HA)</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Press gently with palms; never rub in circles</div>
                    </div>
                    <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">⏱ Start 45s Timer</button>
                  </li>
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">3. Velvet Ceramide Cream</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Seals hydration inside the lipid barrier</div>
                    </div>
                    <button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">⏱ Start 60s Timer</button>
                  </li>
                  <li class="viscosity-seq-item">
                    <div>
                      <strong style="font-size:0.9rem;color:var(--text-primary);">4. Pure Squalane Oil / SPF Seal</strong>
                      <div style="font-size:0.78rem;color:var(--text-secondary);">Pat 2 drops over dry cheeks (or SPF in AM)</div>
                    </div>
                    <span class="wait-timer-btn mono" style="cursor:default;">Final Step</span>
                  </li>
                </ul>
              </div>
              <a href="/buy/micro_pass?source=viscosity_sequencer" class="btn-primary" style="width:100%;justify-content:space-between;padding:10px 12px 10px 20px;">
                <span>Save Vanity Mirror Lockscreen Card ($1.99)</span>
                <span class="btn-icon-circle">↗</span>
              </a>
            </div>
          </div>

          <!-- Right Tilted Porcelain Vessel: Medicine Cabinet Save Card & Retinol Protection -->
          <div class="z-vessel-right">
            <div class="porcelain-vessel-core">
              <div>
                <div class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:8px;">
                  📱 MEDICINE CABINET SAVE CARD · 9:00 PM PROOF
                </div>
                <h3 class="serif-display" style="font-size:1.42rem;margin-bottom:8px;">Benzoyl Peroxide × Retinol Separation</h3>
                <p style="font-size:0.85rem;font-style:italic;color:var(--text-primary);background:var(--bg-canvas);padding:12px 14px;border-radius:14px;border:1px dashed var(--border-strong);margin-bottom:10px;">
                  “I printed the 4-night gentle cycling card and taped it inside my medicine cabinet. Moving Benzoyl Peroxide to morning and Retinol to bedtime stopped my winter flaking in 4 days.”
                </p>
                <p style="color:var(--text-secondary);font-size:0.84rem;margin-bottom:10px;">
                  <strong>Why it matters:</strong> Benzoyl Peroxide releases oxygen that wipes out 80%+ of Retinol on contact, while heavy base esters (Isopropyl Myristate 5/5) trap sweat and clog pores.
                </p>
                <details style="margin-bottom:12px;padding-top:8px;border-top:1px solid var(--border-hairline);font-size:0.78rem;color:var(--text-secondary);">
                  <summary class="mono" style="cursor:pointer;font-weight:700;color:var(--text-primary);">🔬 Optional Lab Footnote: Ceramide 3:1:1 Molar Ratio ▾</summary>
                  <div style="padding-top:6px;">Physiological 3:1:1 ratio of Ceramides NP/AP, Cholesterol, and Fatty Acids accelerates stratum corneum recovery within 72 hours.</div>
                </details>
              </div>
              <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono" style="justify-content:center;">Shop Pore-Safe 3:1:1 Ceramide Cream (Sephora) ↗</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ingredient Reference Guide (Porcelain Swatch Cards + Everyday Benefits + Collapsible Chemistry Specs) -->
    <section class="section-block" id="actives-matrix">
      <div id="inci-table"></div>
      <div class="container">
        <span class="eyebrow-pill mono">ATELIER CÉRAMIQUE · TACTILE INGREDIENT SWATCH CARDS &amp; LAYERING GUIDE</span>
        <h2 class="serif-display" style="font-size:2rem;margin-bottom:8px;">Everyday Skincare Ingredient Guide: Pore Safety, Routine Timing &amp; Benefits</h2>
        <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:16px;max-width:65ch;">
          Inspect tactile porcelain swatch cards for our signature actives, then browse all 18 essential skincare ingredients below to see pore-safety scores and wait times.
        </p>
        ${homeSwatchesHtml}
        <div class="table-wrap" style="border-radius:var(--radius-card);box-shadow:var(--shadow-silk);">
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

        <details class="science-footnote-drawer" style="margin-top:16px;padding:14px 18px;background:var(--bg-surface);border-radius:20px 8px 20px 8px;border:1px solid var(--border-strong);">
          <summary style="cursor:pointer;font-weight:700;color:var(--text-primary);font-family:var(--font-mono);font-size:0.84rem;">
            🔬 Esthetician &amp; Cosmetic Chemist Specifications (pH Windows, pKa, Daltons &amp; Full INCI) ▾
          </summary>
          <div style="margin-top:14px;overflow-x:auto;">
            <p style="font-size:0.82rem;color:var(--text-secondary);margin-bottom:10px;">
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

    <!-- Programmatic SEO Hub Preview -->
    <section class="section-block">
      <div class="container">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
          <h2 class="serif-display" style="font-size:1.95rem;">Editorial Layering Guides &amp; Cult-Product INCI Teardowns</h2>
          <a href="/directory" class="btn-secondary">Explore All ${seoPages.length} Layering Guides →</a>
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
  const jsonLd = [{ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Is Your $300 Skincare Routine Secretly Canceling Itself Out?', description: 'Check your active ingredient & pH conflicts in 5 seconds with DermLogic Atelier Céramique.' }];

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div class="editorial-top-banner">
          <div>
            <div class="eyebrow-pill mono">ATELIER CÉRAMIQUE · FREE 5-SECOND PORCELAIN SHELF AUDIT</div>
            <h1 class="hero-h1">Is Your $300 Skincare Routine Secretly <span class="serif-italic" style="color:var(--rose-brand);">Canceling Itself Out?</span></h1>
            <p class="hero-sub">
              Check your active ingredient &amp; ΔpH harmony in 5 seconds. Discover if your Vitamin C, Copper Peptides, Retinoid, or Exfoliating Toner are neutralizing each other or stripping your barrier.
            </p>
          </div>
          <div class="editorial-photo-shell">
            <div class="editorial-photo-inner">
              <img src="/public/editorial-serum.jpg" alt="Atelier Céramique stoneware vessels, glazing milk swirl, and peptide dropper on bisque" fetchpriority="high" />
              <div class="editorial-photo-caption">
                <div>
                  <strong class="serif-display" style="font-size:0.95rem;">Atelier Céramique · AM Glow vs. PM Barrier</strong>
                  <div style="color:var(--text-secondary);font-size:0.8125rem;">3000K Vanity Calibrated · 9:16 Lockscreen Card</div>
                </div>
                <span class="badge-clash mono">ΔpH Check</span>
              </div>
            </div>
          </div>
        </div>
        ${renderInteractiveCheckerWidget({ products, presets, initialAnalysis, initialProductIds: presets[1].productIds, initialRawInci: '' })}
      </div>
    </section>

    <section class="section-block">
      <div class="container">
        <div class="z-cascade-stage">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="color:var(--rose-brand);font-size:0.78rem;font-weight:700;margin-bottom:6px;">🪞 WHY 68% OF ROUTINES STING OR PILL</div>
              <h3 class="serif-display" style="font-size:1.38rem;margin-bottom:6px;">The Copper Peptide + Vitamin C Trap</h3>
              <p style="color:var(--text-secondary);font-size:0.86rem;">Layering Copper Peptides 1% (pH 6.2) with 15% L-Ascorbic Acid (pH 3.2) triggers copper-ion oxidation—turning $200+ of serums into inactive pro-oxidants on your skin.</p>
            </div>
            <span class="badge-clash mono" style="align-self:flex-start;margin-top:10px;">Split AM / PM</span>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="color:var(--sage-safe);font-size:0.78rem;font-weight:700;margin-bottom:6px;">THINNEST TO THICKEST · VISCOSITY SEQUENCER</div>
              <h3 class="serif-display" style="font-size:1.65rem;margin-bottom:6px;">Droplet Wait-Time Pacing</h3>
              <ul class="viscosity-seq-list">
                <li class="viscosity-seq-item"><span><strong>1. Essence / Toner</strong> (Damp skin)</span><span class="wait-timer-btn mono">No Wait</span></li>
                <li class="viscosity-seq-item"><span><strong>2. Bounce Peptide Serum</strong> (Press in)</span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">⏱ 45s Timer</button></li>
                <li class="viscosity-seq-item"><span><strong>3. Velvet Ceramide Cream</strong> (Seal)</span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">⏱ 60s Timer</button></li>
              </ul>
            </div>
            <a href="/buy/flash_pass?source=lp_cascade" class="btn-primary" style="width:100%;justify-content:space-between;padding:10px 14px;"><span>Save 9:16 Lockscreen Card ($1.99)</span><span class="btn-icon-circle">↗</span></a>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="color:var(--honey-warn);font-size:0.78rem;font-weight:700;margin-bottom:6px;">📱 THE ACNE Rx PARADOX</div>
              <h3 class="serif-display" style="font-size:1.38rem;margin-bottom:6px;">Benzoyl Peroxide Degrades Tretinoin</h3>
              <p style="color:var(--text-secondary);font-size:0.86rem;">Applying Benzoyl Peroxide alongside Tretinoin or Retinol oxidizes the retinoid molecule while generic cream bases clog pores with Isopropyl Myristate (5/5 pore risk).</p>
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
    return `<div class="dir-vault-card" data-vault-tag="${vaultTag}" data-vault-text="${escapeHtml((p.title + ' ' + p.summary + ' ' + p.verdict).toLowerCase())}" style="padding:6px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);box-shadow:var(--shadow-silk);display:flex;">
      <div class="porcelain-vessel-core" style="flex:1;padding:20px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="${p.compatibilityScore < 45 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(p.verdict)} · ${p.compatibilityScore}/100</span>
            <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">ΔpH ${p.deltaPh}</span>
          </div>
          <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-size:1.22rem;font-weight:600;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
          <p style="color:var(--text-secondary);font-size:0.83rem;margin-bottom:12px;">${escapeHtml(p.summary)}</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-hairline);padding-top:10px;gap:8px;flex-wrap:wrap;">
          <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;">Open Porcelain Vessel →</a>
          <a href="/api/affiliate?product=${escapeHtml(prodId)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop at ${partnerLabel} ↗</a>
        </div>
      </div>
    </div>`;
  }).join('');

  const bodyHtml = `
    <section class="section-block">
      <div class="container">
        <div style="text-align:center;max-width:74ch;margin:0 auto 20px;">
          <div class="eyebrow-pill mono">ATELIER CÉRAMIQUE · ${seoPages.length} PORCELAIN FORMULATION ARCHIVES</div>
          <h1 class="hero-h1" style="font-size:clamp(2.3rem,3.6vw,3.2rem);">Skincare Active-Ingredient <span class="serif-italic" style="color:var(--rose-brand);">Harmony</span> &amp; Cult-Product INCI Directory</h1>
          <p class="hero-sub" style="margin:0 auto;">
            Every pairing and cult formula is housed in a dedicated porcelain dossier with plain-English morning/bedtime separation rules, droplet wait-time sequencers, and pore-safety scores.
          </p>
        </div>

        <div id="dir-apothecary-vault-bar" style="padding:7px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);box-shadow:var(--shadow-silk);margin-bottom:24px;">
          <div class="porcelain-vessel-core" style="padding:14px 18px;flex-direction:row;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;" role="tablist" aria-label="Filter Apothecary Archive">
              <button type="button" class="chip mono dir-vault-pill active" onclick="window.__dlFilterVault('all',this)">✨ All ${seoPages.length} Porcelain Guides</button>
              <button type="button" class="chip mono dir-vault-pill" onclick="window.__dlFilterVault('clash',this)">🚫 Do Not Mix (${clashCount})</button>
              <button type="button" class="chip mono dir-vault-pill" onclick="window.__dlFilterVault('safe',this)">🌿 Safe Together (${safeCount})</button>
              <button type="button" class="chip mono dir-vault-pill" onclick="window.__dlFilterVault('product',this)">🧴 Cult Product Breakdowns (${productPages.length})</button>
            </div>
            <input type="search" id="dir-vault-search" placeholder="Search Retinol, Copper Peptides, Vitamin C..." oninput="window.__dlSearchVault(this.value)" style="padding:8px 14px;border-radius:999px;border:1px solid var(--border-strong);background:var(--bg-canvas);color:var(--text-primary);font-size:0.84rem;min-width:230px;" />
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
            for(var i=0;i<bs.length;i++)bs[i].classList.remove('active');
            if(btn)btn.classList.add('active');
            window.__dlApplyVault();
          };
          window.__dlSearchVault=function(){window.__dlApplyVault();};
        </script>

        <h2 class="serif-display" style="font-size:1.75rem;margin:24px 0 14px;">1. Active-Ingredient Layering &amp; Compatibility Vessels (${pairPages.length} Guides)</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px;">
          ${renderCardList(pairPages)}
        </div>

        <h2 class="serif-display" style="font-size:1.75rem;margin:42px 0 14px;">2. Cult-Product INCI Teardowns &amp; Ritual Vessels (${productPages.length} Guides)</h2>
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

function renderPorcelainSwatchCards(ingList) {
  return `<div class="porcelain-swatch-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin-bottom:18px;">${(ingList || []).slice(0, 3).map((ing, idx) => {
    const slot = getRoutineSlotRecommendation(ing);
    const step = Number(ing.molecularWeightDa) < 200 ? 'Step 1 · Water-Light' : (Number(ing.molecularWeightDa) < 500 ? 'Step 2 · Bounce Serum' : 'Step 3 · Velvet Seal');
    const feel = Number(ing.phMin) < 4.0 ? '⚡ Active Tingle (Wait 60s)' : '🌿 Cushion-Soft & Calm';
    const pore = ing.comedogenicity === 0 ? '✨ 0/5 Pore-Safe' : `Low (${ing.comedogenicity}/5)`;
    const bgTint = idx === 1 ? 'var(--bg-surface)' : 'var(--bg-elevated)';
    return `<div style="padding:6px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);box-shadow:var(--shadow-silk);display:flex;"><div class="porcelain-vessel-core" style="flex:1;padding:16px 18px;background:${bgTint};"><div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><span class="mono" style="font-size:0.7rem;color:var(--rose-brand);font-weight:700;">PORCELAIN SWATCH 0${idx + 1}</span><span class="badge-safe mono">${pore}</span></div><h3 class="serif-display" style="font-size:1.3rem;margin-bottom:8px;">${escapeHtml(ing.commonName)}</h3><div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:8px;"><div style="padding:6px 8px;border-radius:10px;background:var(--bg-canvas);border:1px solid var(--border-hairline);"><div class="mono" style="font-size:0.64rem;color:var(--text-secondary);">WHEN TO USE</div><div style="font-size:0.76rem;font-weight:700;">${slot.split('(')[0].trim()}</div></div><div style="padding:6px 8px;border-radius:10px;background:var(--bg-canvas);border:1px solid var(--border-hairline);"><div class="mono" style="font-size:0.64rem;color:var(--text-secondary);">DROPLET STEP</div><div style="font-size:0.76rem;font-weight:700;">${step}</div></div></div></div><div style="font-size:0.76rem;color:var(--text-secondary);border-top:1px dashed var(--border-strong);padding-top:6px;"><strong>Skin Feel:</strong> ${feel} · <span class="mono">pH ${ing.phMin}–${ing.phMax}</span></div></div></div>`;
  }).join('')}</div>`;
}

function getRoutineSlotRecommendation(ing) {
  if (!ing) return '☀️ AM or 🌙 PM';
  const id = String(ing.id || ''), cls = String(ing.activeClass || '');
  if (cls.includes('retinoid') || id.includes('tretinoin') || id.includes('retinol') || id.includes('adapalene') || id === 'hydroquinone') return '🌙 Night Only (Bedtime routine)';
  if (id.includes('glycolic') || id.includes('lactic') || id.includes('mandelic')) return '🌙 Night Only Exfoliant (Wear SPF next AM)';
  if (cls === 'vitamin_c_laa' || ing.category === 'uv_filter') return '☀️ Morning Glow (Layer under sunscreen)';
  return '☀️ Morning or 🌙 Night (Safe in either)';
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
    const poreClog = ing.comedogenicity === 0 ? '<span class="badge-safe mono">✨ Zero (0/5)</span>' : ing.comedogenicity <= 2 ? `<span class="badge-safe mono">Low (${ing.comedogenicity}/5)</span>` : `<span class="badge-clash mono">⚠️ Caution (${ing.comedogenicity}/5)</span>`;
    const sensitivity = Number(ing.phMin) < 4.0 || String(ing.activeClass || '').includes('retinoid') ? '<span class="badge-warn mono">⚡ Can Tingle / Active</span>' : '<span class="badge-safe mono">🌿 Gentle / Barrier-Safe</span>';
    const routineSlot = getRoutineSlotRecommendation(ing);
    const textureOrder = Number(ing.molecularWeightDa) < 200 ? '1st · Water-light serum' : Number(ing.molecularWeightDa) < 500 ? '2nd · Medium serum' : '3rd · Cream / rich barrier';
    return `<tr><td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.category || 'Targeted active')}</span></td><td>${poreClog}</td><td>${sensitivity}</td><td style="font-size:0.84rem;color:var(--text-primary);">${routineSlot}</td><td class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${textureOrder}</td><td style="font-size:0.81rem;color:var(--text-secondary);"><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 View Schedule ($1.99)</a></td></tr>`;
  }).join('');

  const seoChemistrySpecsRows = comparedActives.map((ing) => `<tr><td><strong class="mono" style="font-size:0.8125rem;">${escapeHtml(ing.inciName)}</strong></td><td class="mono">${ing.phMin}–${ing.phMax}</td><td class="mono">${ing.pka != null ? ing.pka : '—'}</td><td class="mono">${ing.molecularWeightDa} Da</td><td class="mono">${ing.comedogenicity}/5</td><td class="mono">${ing.malasseziaTrigger ? 'Trigger' : 'Safe'}</td></tr>`).join('');

  const faqHtml = (page.faqs || []).map((f) => `<div style="padding:5px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);margin-bottom:12px;"><div class="porcelain-vessel-core" style="padding:16px 20px;"><h3 class="serif-display" style="font-size:1.22rem;font-weight:700;margin-bottom:4px;">${escapeHtml(f.q)}</h3><p style="color:var(--text-secondary);font-size:0.87rem;">${escapeHtml(f.a)}</p></div></div>`).join('');

  const relatedHtml = (relatedPages || []).slice(0, 8).map((r) => `<a href="/seo/${escapeHtml(r.slug)}" style="display:flex;padding:5px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);box-shadow:var(--shadow-silk);text-decoration:none;"><div class="porcelain-vessel-core" style="flex:1;padding:15px 18px;"><div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:700;margin-bottom:4px;">${escapeHtml(r.verdict)} · ΔpH ${r.deltaPh}</div><div class="serif-display" style="font-weight:700;font-size:1.08rem;color:var(--text-primary);">${escapeHtml(r.title)}</div></div></a>`).join('');

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="margin-bottom:10px;font-size:0.82rem;color:var(--text-secondary);">
          <a href="/">Home</a> / <a href="/directory">Layering Archive</a> / <span style="color:var(--rose-brand);font-weight:600;">${escapeHtml(page.category)}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
          <div class="eyebrow-pill mono" style="margin:0;">ATELIER CÉRAMIQUE · ${escapeHtml(page.verdict)} · HARMONY ${page.compatibilityScore}/100 <span style="opacity:0.75;font-weight:normal;">(ΔpH ${page.deltaPh})</span></div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Verified Formula at Dermstore ↗</a>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Alternative at Sephora ↗</a>
          </div>
        </div>
        <h1 class="hero-h1" style="font-size:clamp(2.05rem,3.3vw,2.95rem);">${escapeHtml(page.title)}</h1>
        <p class="hero-sub" style="margin-bottom:20px;">${escapeHtml(page.summary)}</p>

        <div class="z-cascade-stage" style="margin-bottom:28px;">
          <div class="z-vessel-left"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:700;margin-bottom:6px;">🪞 DO THEY CANCEL OUT?</div>
              <div class="serif-display" style="font-size:1.35rem;font-weight:700;margin-bottom:8px;">${escapeHtml(page.conflictType)}</div>
              <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:10px;">Recommended Routine Spacing: <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 [LOCKED IN FREE PREVIEW — Unlock Exact Wait Timer ($1.99)]</a></p>
            </div>
            <span class="${page.compatibilityScore < 55 ? 'badge-clash' : 'badge-safe'} mono" style="align-self:flex-start;">ΔpH ${page.deltaPh} Gap</span>
          </div></div>
          <div class="z-vessel-center"><div class="porcelain-vessel-core">
            <div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;gap:8px;">
                <span class="mono" style="font-size:0.75rem;color:var(--sage-safe);font-weight:700;">VISCOSITY &amp; WAIT-TIME SEQUENCER</span>
                <span class="badge-safe mono">ZERO PILLING</span>
              </div>
              <h3 class="serif-display" style="font-size:1.55rem;margin-bottom:4px;">Droplet Absorption Pacing</h3>
              <ul class="viscosity-seq-list" style="margin:8px 0 12px;">
                <li class="viscosity-seq-item"><span><strong>1. Morning Ritual Step</strong></span><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 Unlock AM Order ($1.99)</a></li>
                <li class="viscosity-seq-item"><span><strong>2. Active Serum Buffer</strong></span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(45, this)">⏱ Start 45s Timer</button></li>
                <li class="viscosity-seq-item"><span><strong>3. Barrier Cream Seal</strong></span><button type="button" class="wait-timer-btn mono" onclick="startViscosityTimer(60, this)">⏱ Start 60s Timer</button></li>
              </ul>
            </div>
            <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="btn-primary" style="width:100%;justify-content:space-between;padding:9px 14px;"><span>Unlock 9:16 Lockscreen Card ($1.99)</span><span class="btn-icon-circle">↗</span></a>
          </div></div>
          <div class="z-vessel-right"><div class="porcelain-vessel-core">
            <div>
              <div class="mono" style="font-size:0.78rem;color:var(--honey-warn);font-weight:700;margin-bottom:6px;">🌙 BEDTIME 4-NIGHT CYCLING</div>
              <div class="serif-display" style="font-size:1.35rem;font-weight:700;margin-bottom:8px;">Evening Barrier Recovery</div>
              <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:10px;">Night 1–4 Schedule &rarr; <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 [LOCKED IN FREE PREVIEW — Unlock 4-Night Bedtime Calendar ($1.99)]</a></p>
            </div>
            <span class="badge-safe mono" style="align-self:flex-start;">3000K Vanity Ready</span>
          </div></div>
        </div>

        <div id="pseo-dermlogic-inline-calc" style="margin-bottom:24px;padding:7px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.72);border:1.5px solid var(--rose-brand);box-shadow:var(--shadow-silk);">
          <div class="porcelain-vessel-core" style="padding:18px 20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
              <div>
                <div class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:800;">ATELIER CÉRAMIQUE · 1-CLICK SKINCARE SAVINGS &amp; HARMONY CALCULATOR</div>
                <h2 class="serif-display" style="font-size:1.35rem;margin:2px 0 0;">Tap Your Skin Type to Check Potential Product Inactivation &amp; Waste for ${escapeHtml(searchIntentSubject)}</h2>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(180,1.35,'sensitive_rosacea')">Sensitive / Rosacea ($180/yr)</button>
                <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(240,1.25,'dry_compromised')">Dry / Compromised ($240/yr)</button>
                <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(320,1.0,'balanced_combo')">Balanced / Combo ($320/yr)</button>
                <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(480,1.45,'oily_acne_stack')">5+ Active Stack ($480/yr)</button>
              </div>
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;background:var(--bg-canvas);padding:14px;border-radius:20px 8px 20px 8px;border:1px solid var(--border-strong);">
              <div><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">EST. WASTED PRODUCT VALUE / YR</div><div id="pseo-dl-waste-out" class="mono" style="font-size:1.35rem;font-weight:800;color:var(--rose-brand);">$${Math.round(240 * Math.max(0.22, (100 - (Number(page.compatibilityScore) || 55)) / 100))}/yr Lost</div></div>
              <div><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">RECOMMENDED ROUTINE SPACING</div><div id="pseo-dl-buffer-out" class="mono" style="font-size:1.35rem;font-weight:800;color:var(--text-primary);">${Number(page.deltaPh) >= 1.5 ? '20 Min / AM-PM Split' : '10 Min Wait Buffer'}</div></div>
              <div><div class="mono" style="font-size:0.74rem;color:var(--text-secondary);">POST-FIX HARMONY SCORE</div><div id="pseo-dl-harmony-out" class="mono" style="font-size:1.35rem;font-weight:800;color:var(--sage-safe);">96/100 Verified</div></div>
              <div style="display:flex;align-items:center;"><a href="/buy/micro_pass?source=pseo_inline_calc&amp;guide=${encodeURIComponent(page.slug)}" class="btn-primary mono" style="padding:10px 14px;font-size:0.8rem;text-decoration:none;display:inline-block;">Unlock 99¢ AM/PM Card &rarr;</a></div>
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

        <div style="margin-bottom:28px;padding:7px;border-radius:var(--radius-shell);background:rgba(239,233,223,0.65);border:1px solid var(--border-strong);box-shadow:var(--shadow-silk);">
          <div class="porcelain-vessel-core" style="padding:22px;">
            <span class="eyebrow-pill mono" style="align-self:flex-start;">ATELIER CÉRAMIQUE · PORCELAIN INGREDIENT SWATCHES &amp; COMPATIBILITY TABLE</span>
            <h2 class="serif-display" style="font-size:1.65rem;margin-bottom:8px;">Can You Use ${escapeHtml(searchIntentSubject)} Together? Skincare Guide &amp; Layering Rules</h2>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:14px;">
              Routine Compatibility: <strong class="mono" style="color:var(--rose-brand);">${escapeHtml(page.verdict)}</strong> (Compatibility Score: <strong>${page.compatibilityScore}/100</strong>). Inspect each ingredient's porcelain swatch card and full layering matrix below.
            </p>
            ${seoSwatchesHtml}
            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Ingredient &amp; Category</th>
                    <th>Does It Clog Pores?</th>
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

            <details class="science-footnote-drawer" style="margin-top:14px;padding:12px 16px;background:var(--bg-surface);border-radius:20px 8px 20px 8px;border:1px solid var(--border-strong);">
              <summary style="cursor:pointer;font-weight:700;color:var(--text-primary);font-family:var(--font-mono);font-size:0.82rem;">
                🔬 Esthetician &amp; Cosmetic Chemist Footnote (Lab Mechanism, pH Windows, pKa, Daltons &amp; INCI) ▾
              </summary>
              <div style="margin-top:12px;overflow-x:auto;">
                <p style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:8px;">
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

    <section class="section-block">
      <div class="container">
        <h2 class="serif-display" style="font-size:1.85rem;margin-bottom:16px;">Esthetician &amp; Cosmetic Chemist FAQ</h2>
        ${faqHtml}

        <h3 class="serif-display" style="font-size:1.5rem;margin:34px 0 14px;">Related Skincare Layering Guides</h3>
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
        <div class="z-vessel-center" style="transform:none;"><div class="porcelain-vessel-core">
          <div>
            <span class="eyebrow-pill mono">ATELIER CÉRAMIQUE · GOVERNANCE &amp; FORMULATION ETHICS</span>
            <h1 class="hero-h1" style="font-size:2.3rem;margin-bottom:10px;">${isPrivacy ? 'Privacy Policy & Data Governance' : 'Terms of Service & Educational Formulation Disclaimer'}</h1>
            <p style="color:var(--text-secondary);margin-bottom:18px;">Last Updated: October 14, 2026 · Contact: concierge@dermlogic.io</p>
            <div class="bento-cell" style="margin-bottom:14px;">
              <h2 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">1. ${isPrivacy ? 'Data Collection & Local SQLite Telemetry' : 'Cosmetic Chemistry Educational Scope'}</h2>
              <p style="color:var(--text-secondary);font-size:0.9rem;">${isPrivacy ? 'DermLogic processes pasted INCI ingredient lists and vanity shelf combinations deterministically on the server to calculate pH windows, pKa free-acid fractions, and comedogenicity ratings. Optional checkout email addresses are used solely to deliver your Routine Ritual PDF and 9:16 Wallet Pass.' : 'DermLogic provides deterministic cosmetic chemistry calculations (verified skin pH compatibility, active ingredient stability, and pore-safety scores) for educational formulation analysis. It does not replace individualized medical diagnosis by a board-certified dermatologist.'}</p>
            </div>
            <div class="bento-cell">
              <h2 class="serif-display" style="font-size:1.35rem;margin-bottom:6px;">2. ${isPrivacy ? 'GDPR / CCPA Rights, Cookie Controls & Retailer Disclosures' : '30-Day Harmony Guarantee & Self-Serve Fulfillment'}</h2>
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
        <div class="z-vessel-center" style="transform:none;"><div class="porcelain-vessel-core" style="align-items:center;">
          <div class="badge-clash mono" style="margin-bottom:12px;">HTTP 404 · PORCELAIN VESSEL NOT FOUND</div>
          <h1 class="hero-h1" style="font-size:2.4rem;">This Skincare Ritual Page Could Not Be Found</h1>
          <p style="color:var(--text-secondary);margin-bottom:24px;">Return to the Atelier Céramique ΔpH &amp; Active-Ingredient Harmony Checker or explore all clinical layering vessels.</p>
          <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
            <a href="/#analyzer" class="btn-primary"><span>Open Routine Harmony Checker</span><span class="btn-icon-circle">↗</span></a>
            <a href="/directory" class="btn-secondary">Browse Layering Vessels</a>
          </div>
        </div></div>
      </div>
    </section>
  `;
  return renderBaseDocument({ title: '404 Page Not Found | DermLogic', description: 'Page not found on DermLogic Formulation Atelier.', canonicalPath: '/404', ogSlug: '404', jsonLdObjects: [], hideNav: false, bodyHtml });
}

function renderOgSvg(pageOrTitle, subtitle, score, deltaPh) {
  const safeTitle = escapeHtml((pageOrTitle || 'DermLogic · Atelier Céramique').slice(0, 68));
  const safeSub = escapeHtml((subtitle || 'Porcelain Ritual & Viscosity Wait-Time Sequencer · Peptide & Vitamin C Harmony').slice(0, 95));
  const safeScore = score != null ? `${score}/100` : '96/100';
  const safeDelta = deltaPh != null ? `ΔpH ${deltaPh}` : 'ΔpH 2.8';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#FAF7F2"/><stop offset="60%" stop-color="#EFE9DF"/><stop offset="100%" stop-color="#F7ECEF"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="#FFFDFB" stroke="#DFD6C7" stroke-width="2"/>
  <rect x="88" y="92" width="420" height="42" rx="21" fill="#F7ECEF" stroke="#E5BCC5"/>
  <text x="114" y="119" fill="#8A283B" font-family="monospace" font-size="16" font-weight="bold">DERMLOGIC · ATELIER CÉRAMIQUE</text>
  <text x="88" y="218" fill="#221A16" font-family="Georgia, serif" font-size="40" font-weight="bold">${safeTitle}</text>
  <text x="88" y="282" fill="#544841" font-family="sans-serif" font-size="22">${safeSub}</text>
  <rect x="88" y="355" width="290" height="145" rx="18" fill="#FAF7F2" stroke="#DFD6C7"/>
  <text x="116" y="400" fill="#544841" font-family="monospace" font-size="15">ROUTINE HARMONY SCORE</text>
  <text x="116" y="466" fill="#264C3C" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeScore)}</text>
  <rect x="406" y="355" width="280" height="145" rx="18" fill="#F7ECEF" stroke="#E5BCC5"/>
  <text x="434" y="400" fill="#8A283B" font-family="monospace" font-size="15">PH DIFFERENTIAL</text>
  <text x="434" y="466" fill="#8A283B" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeDelta)}</text>
  <rect x="714" y="355" width="388" height="145" rx="18" fill="#FAF7F2" stroke="#DFD6C7"/>
  <text x="742" y="400" fill="#8A283B" font-family="monospace" font-size="15">VISCOSITY &amp; WAIT SEQUENCER</text>
  <text x="742" y="452" fill="#221A16" font-family="Georgia, serif" font-size="25" font-weight="bold">4-Night Skin Cycling + 9:16 Card</text>
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
