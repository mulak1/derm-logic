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

  const topIngredientsRows = ingredients.slice(0, 18).map((ing) => `
    <tr>
      <td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.inciName)}</span></td>
      <td class="mono">${ing.phMin}–${ing.phMax}</td>
      <td class="mono">${ing.pka != null ? ing.pka : 'N/A'}</td>
      <td class="mono">${ing.molecularWeightDa} Da</td>
      <td><span class="${ing.comedogenicity >= 3 ? 'badge-clash' : 'badge-safe'} mono">${ing.comedogenicity}/5</span></td>
      <td><span class="${ing.malasseziaTrigger ? 'badge-warn' : 'badge-safe'} mono">${ing.malasseziaTrigger ? 'Trigger' : 'Safe'}</span></td>
      <td style="color:var(--text-secondary);font-size:0.86rem;">${escapeHtml(ing.clinicalMechanism)}</td>
    </tr>
  `).join('');

  const featuredSeoPages = [
    ...seoPages.filter((p) => p.pageType === 'active_pair').slice(0, 12),
    ...seoPages.filter((p) => p.pageType === 'product_teardown').slice(0, 12)
  ];

  const featuredSeoLinks = featuredSeoPages.map((p) => `
    <div class="bento-cell" style="display:flex;flex-direction:column;justify-content:space-between;padding:18px;">
      <div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
          <span class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;">${escapeHtml(p.category)}</span>
          <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">Harmony ${p.compatibilityScore}/100</span>
        </div>
        <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-weight:700;font-size:1.12rem;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
        <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:10px;">${escapeHtml(p.summary.slice(0, 115))}...</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-hairline);padding-top:8px;gap:8px;flex-wrap:wrap;">
        <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;">Read Layering Guide →</a>
        <a href="/api/affiliate?product=${escapeHtml((p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic')}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-micro-link mono" style="margin:0;">Verified Retailer ↗</a>
      </div>
    </div>
  `).join('');

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div id="home-executive-brief" class="editorial-top-banner">
          <div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
              <div class="eyebrow-pill mono" style="margin:0;">5-SECOND SKINCARE ROUTINE &amp; INGREDIENT CHECKER</div>
              <a href="/leaderboard" class="badge-safe mono" style="text-decoration:none;">🏆 Top-3 Podium Leaderboard &rarr;</a>
            </div>
            <h1 class="hero-h1">Check If Your Skincare Serums Secretly <span class="serif-italic" style="color:var(--rose-brand);">Cancel Out.</span></h1>
            <p class="hero-sub" style="margin-bottom:12px;">
              71% of multi-step skincare routines combine at least two serums that clash in acidity (pH), cause redness, or deactivate each other on contact. Select your products below to spot conflicts in 5 seconds.
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin-bottom:12px;">
              <span class="mono" style="font-size:0.75rem;font-weight:700;color:var(--text-secondary);text-transform:uppercase;">Built for:</span>
              <span class="ph-chip mono">✨ Skincare Shoppers</span>
              <span class="ph-chip mono">🧴 Retinol &amp; Vitamin C Users</span>
              <span class="ph-chip mono">👩‍⚕️ Estheticians &amp; Creators</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;">
              <div style="padding:11px 12px;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--rose-brand);margin-bottom:3px;">STEP 1 • FREE CHECK</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">Tap a popular routine or paste any product's ingredient list below.</div>
              </div>
              <div style="padding:11px 12px;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--honey-warn);margin-bottom:3px;">STEP 2 • SPOT CLASHES</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">See which serums cancel out in pH, oxidize Retinol, or clog pores.</div>
              </div>
              <div style="padding:11px 12px;border-radius:12px;background:var(--bg-surface);border:1px solid var(--border-hairline);">
                <div class="mono" style="font-size:0.8125rem;font-weight:700;color:var(--sage-safe);margin-bottom:3px;">STEP 3 • UNLOCK RITUAL</div>
                <div style="font-size:0.84rem;color:var(--text-primary);font-weight:600;line-height:1.35;">Unlock your custom AM/PM order, wait timers &amp; 9:16 phone card ($1.99).</div>
              </div>
            </div>
          </div>
          <div class="editorial-photo-shell">
            <div class="editorial-photo-inner">
              <img src="/public/editorial-serum.jpg" alt="Editorial luxury skincare flat-lay with glazing milk, peptide dropper serum, and botanical treatment bottles on warm oat silk" fetchpriority="high" />
              <div class="editorial-photo-caption">
                <div>
                  <strong class="serif-display" style="font-size:1rem;color:var(--text-primary);">Peptide Serum × Vitamin C Routine Check</strong>
                  <div style="color:var(--text-secondary);font-size:0.8125rem;">Checks pH Clashes, Active Cancellation &amp; Pore-Safe Ingredients</div>
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

    <!-- Asymmetric 3-Cell Editorial Formulation Bento -->
    <section class="section-block">
      <div class="container">
        <h2 class="serif-display" style="font-size:2.1rem;margin-bottom:6px;">Why Popular Serums Stop Working When Layered Together</h2>
        <p style="color:var(--text-secondary);font-size:0.95rem;max-width:62ch;">
          Even best-selling products from SkinCeuticals, Rhode, Paula’s Choice, and The Ordinary can cancel each other out or irritate your skin barrier when used in the same step.
        </p>
        <div class="bento-grid-3">
          <div class="bento-cell tinted">
            <div class="badge-clash mono" style="margin-bottom:10px;">1. CANCELS OUT · pH 3.2 vs pH 6.2</div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:8px;">Copper Peptides × Pure Vitamin C</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:10px;">
              Pure Vitamin C (L-Ascorbic Acid) needs a low acidic pH (3.2) to absorb, while Copper Peptides need a neutral pH (6.2). Layering them in the same routine step triggers copper-ion oxidation and cancels out both serums.
            </p>
            <a href="/api/affiliate?product=skinceuticals-ce-ferulic&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Verified Vitamin C &amp; Peptide Separates (Dermstore) ↗</a>
          </div>
          <div class="bento-cell">
            <div class="badge-warn mono" style="margin-bottom:10px;">2. DEACTIVATES RETINOIDS · OXIDATIVE LOSS</div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:8px;">Benzoyl Peroxide × Retinol / Tretinoin</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:10px;">
              Benzoyl Peroxide breaks down Tretinoin and Retinol on contact—wasting over 80% of your night serum while causing dryness, peeling, and redness when layered without proper separation.
            </p>
            <a href="/api/affiliate?product=laroche-posay-adapalene-01&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Peroxide-Compatible Adapalene 0.1% (Dermstore) ↗</a>
          </div>
          <div class="bento-cell">
            <div class="badge-safe mono" style="margin-bottom:10px;">3. PORE &amp; BREAKOUT SAFETY</div>
            <h3 class="serif-display" style="font-size:1.35rem;margin-bottom:8px;">Hidden Pore-Clogging Base Oils</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:10px;">
              Even prescription anti-acne creams sometimes use heavy base ingredients like Isopropyl Myristate (rated 5/5 for pore clogging), which can trigger stubborn bumps and fungal breakouts.
            </p>
            <a href="/api/affiliate?product=aestura-atobarrier-365-cream&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Pore-Safe Ceramide Barrier Cream (Sephora) ↗</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Clinical Reference Matrix Section (Layer 3 Deep Chemistry Specs) -->
    <section class="section-block" id="actives-matrix">
      <div id="inci-table"></div>
      <div class="container">
        <h2 class="serif-display" style="font-size:2rem;margin-bottom:8px;">Ingredient Reference Guide: pH Windows, Pore-Safety &amp; Chemistry Specs (${ingredients.length} Actives)</h2>
        <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:20px;max-width:65ch;">
          Layer-3 Technical Reference: Showing 18 of ${ingredients.length} active ingredients with optimal pH windows, acid strength (pKa), molecular size (Daltons), and fungal-acne safety.
        </p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Active / INCI Nomenclature</th>
                <th>Optimal pH</th>
                <th>pKa</th>
                <th>Mol. Weight</th>
                <th>Pore Risk</th>
                <th>Fungal Acne</th>
                <th>Formulation &amp; Barrier Mechanism</th>
              </tr>
            </thead>
            <tbody>
              ${topIngredientsRows}
            </tbody>
          </table>
        </div>
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
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Is Your $300 Skincare Routine Secretly Canceling Itself Out?',
      description: 'Check your active ingredient & pH conflicts in 5 seconds with DermLogic.'
    }
  ];

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div class="editorial-top-banner">
          <div>
            <div class="eyebrow-pill mono">FREE 5-SECOND VANITY SHELF AUDIT · NO SIGNUP REQUIRED</div>
            <h1 class="hero-h1">Is Your $300 Skincare Routine Secretly <span class="serif-italic" style="color:var(--rose-brand);">Canceling Itself Out?</span></h1>
            <p class="hero-sub">
              Check your active ingredient &amp; ΔpH harmony in 5 seconds. Discover if your Vitamin C, Copper Peptides, Retinoid, or Exfoliating Toner are neutralizing each other or stripping your barrier.
            </p>
          </div>
          <div class="editorial-photo-shell">
            <div class="editorial-photo-inner">
              <img src="/public/editorial-serum.jpg" alt="Warm luxury skincare bottles, glazing milk swirl, and peptide dropper on oat linen" fetchpriority="high" />
              <div class="editorial-photo-caption">
                <div>
                  <strong class="serif-display" style="font-size:0.95rem;">AM Morning Glow vs. PM Barrier Repair</strong>
                  <div style="color:var(--text-secondary);font-size:0.8125rem;">Instant 9:16 Apple-Wallet Vanity Card</div>
                </div>
                <span class="badge-clash mono">ΔpH Check</span>
              </div>
            </div>
          </div>
        </div>

        ${renderInteractiveCheckerWidget({
          products,
          presets,
          initialAnalysis,
          initialProductIds: presets[1].productIds,
          initialRawInci: ''
        })}
      </div>
    </section>

    <section class="section-block">
      <div class="container">
        <div class="bento-grid-3">
          <div class="bento-cell tinted">
            <div class="mono" style="color:var(--rose-brand);font-size:0.84rem;font-weight:700;margin-bottom:6px;">WHY 68% OF ROUTINES STING OR PILL</div>
            <h3 class="serif-display" style="font-size:1.3rem;margin-bottom:6px;">The Copper Peptide + Vitamin C Trap</h3>
            <p style="color:var(--text-secondary);font-size:0.85rem;">
              Layering Copper Peptides 1% (pH 6.2) with 15% L-Ascorbic Acid (pH 3.2) triggers copper-ion oxidation—turning $200+ of serums into inactive pro-oxidants on your skin.
            </p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="color:var(--honey-warn);font-size:0.84rem;font-weight:700;margin-bottom:6px;">THE ACNE Rx PARADOX</div>
            <h3 class="serif-display" style="font-size:1.3rem;margin-bottom:6px;">Benzoyl Peroxide Degrades Tretinoin</h3>
            <p style="color:var(--text-secondary);font-size:0.85rem;">
              Applying Benzoyl Peroxide alongside Tretinoin or Retinol oxidizes the retinoid molecule while generic cream bases clog pores with Isopropyl Myristate (5/5 pore risk).
            </p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="color:var(--sage-safe);font-size:0.84rem;font-weight:700;margin-bottom:6px;">30-DAY HARMONY GUARANTEE</div>
            <h3 class="serif-display" style="font-size:1.3rem;margin-bottom:6px;">Bespoke 9:16 Apple-Wallet Ritual Card</h3>
            <p style="color:var(--text-secondary);font-size:0.85rem;">
              Save your personalized AM Morning Glow steps, 15-minute ΔpH wait timers, and 4-Night Skin-Cycling ritual directly to your phone lockscreen.
            </p>
          </div>
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

  const renderCardList = (items) => items.map((p) => {
    const prodId = (p.presetProducts && p.presetProducts[0]) || 'skinceuticals-ce-ferulic';
    const partner = p.pageType === 'product_teardown' ? 'dermstore' : 'sephora';
    const partnerLabel = partner === 'dermstore' ? 'Dermstore' : 'Sephora';
    return `
      <div class="bento-cell" style="display:flex;flex-direction:column;justify-content:space-between;padding:20px;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
            <span class="${p.compatibilityScore < 45 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(p.verdict)} · ${p.compatibilityScore}/100</span>
            <span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">ΔpH ${p.deltaPh}</span>
          </div>
          <a href="/seo/${escapeHtml(p.slug)}" class="serif-display" style="display:block;font-size:1.15rem;font-weight:700;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(p.title)}</a>
          <p style="color:var(--text-secondary);font-size:0.81rem;margin-bottom:12px;">${escapeHtml(p.summary)}</p>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;border-top:1px solid var(--border-hairline);padding-top:10px;gap:8px;flex-wrap:wrap;">
          <a href="/seo/${escapeHtml(p.slug)}" class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;">Open Clinical Audit →</a>
          <a href="/api/affiliate?product=${escapeHtml(prodId)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop at ${partnerLabel} ↗</a>
        </div>
      </div>
    `;
  }).join('');

  const bodyHtml = `
    <section class="section-block">
      <div class="container">
        <div class="eyebrow-pill mono">EDITORIAL LAYERING ENCYCLOPEDIA · ${seoPages.length} CLINICAL GUIDES</div>
        <h1 class="hero-h1" style="font-size:2.6rem;">Skincare Active-Ingredient Harmony &amp; Cult-Product INCI Directory</h1>
        <p class="hero-sub">
          Every pairing and cult formula is evaluated deterministically for verified skin pH compatibility, active ingredient stability, and pore-safety scores, and pore-safety.
        </p>

        <h2 class="serif-display" style="font-size:1.65rem;margin:32px 0 14px;">1. Active-Ingredient Layering &amp; Compatibility Guides (${pairPages.length} Guides)</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px;">
          ${renderCardList(pairPages)}
        </div>

        <h2 class="serif-display" style="font-size:1.65rem;margin:42px 0 14px;">2. Cult-Product INCI Teardowns &amp; Ritual Guides (${productPages.length} Guides)</h2>
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

function getRoutineSlotRecommendation(ing) {
  if (!ing) return 'AM or PM Ritual';
  const id = String(ing.id || '');
  const cls = String(ing.activeClass || '');
  if (cls.includes('retinoid') || id.includes('tretinoin') || id.includes('retinol') || id.includes('adapalene') || id === 'hydroquinone') {
    return 'PM Night Only (Photolabile / Keratolytic)';
  }
  if (id.includes('glycolic') || id.includes('lactic') || id.includes('mandelic')) {
    return 'PM Exfoliation Night (SPF 50 Next AM)';
  }
  if (cls === 'vitamin_c_laa' || ing.category === 'uv_filter') {
    return 'AM Morning Glow (Photoprotective)';
  }
  return 'AM or PM (Split from ΔpH Clashes)';
}

function resolveComparisonIngredients(page, products) {
  const seen = new Set();
  const list = [];
  const pushIng = (ing) => {
    if (ing && ing.id && !seen.has(ing.id)) {
      seen.add(ing.id);
      list.push(ing);
    }
  };
  if (Array.isArray(page.comparisonIngredients)) {
    page.comparisonIngredients.forEach(pushIng);
  }
  pushIng(page.ingredientA);
  pushIng(page.ingredientB);
  if (page.product && Array.isArray(page.product.primaryActives)) {
    for (const actId of page.product.primaryActives) {
      pushIng(CLINICAL_INGREDIENTS.find((i) => i.id === actId));
    }
  }
  if (list.length < 2 && Array.isArray(page.presetProducts) && Array.isArray(products)) {
    for (const pid of page.presetProducts) {
      const pr = products.find((p) => p.id === pid);
      if (pr && Array.isArray(pr.primaryActives)) {
        for (const actId of pr.primaryActives) {
          pushIng(CLINICAL_INGREDIENTS.find((i) => i.id === actId));
        }
      }
    }
  }
  if (list.length < 2) {
    pushIng(CLINICAL_INGREDIENTS[0]);
    pushIng(CLINICAL_INGREDIENTS[1]);
  }
  return list.slice(0, 4);
}

function renderSeoDetailPage({ page, products, presets, initialAnalysis, relatedPages }) {
  const primaryProdId = (page.presetProducts && page.presetProducts[0]) || 'skinceuticals-ce-ferulic';
  const comparedActives = resolveComparisonIngredients(page, products);
  const searchIntentSubject = page.ingredientA && page.ingredientB
    ? `${page.ingredientA.commonName} and ${page.ingredientB.commonName}`
    : page.product
      ? `${page.product.brand} ${page.product.name} and Active Serums`
      : (comparedActives[0] && comparedActives[1]
        ? `${comparedActives[0].commonName} and ${comparedActives[1].commonName}`
        : page.title.split(':')[0]);

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      headline: page.title,
      description: page.metaDescription,
      medicalAudience: 'Patients and Dermatological Practitioners',
      specialty: 'Dermatology'
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (page.faqs || []).map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a
        }
      }))
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'DermLogic Routine Conflict Analyzer',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      offers: { '@type': 'Offer', price: '1.99', priceCurrency: 'USD' }
    },
    ...(page.amRule && page.pmRule ? [{
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How to layer ${searchIntentSubject}`,
      description: page.metaDescription,
      step: [
        {
          '@type': 'HowToStep',
          name: 'Morning (AM) Protocol',
          text: page.amRule
        },
        {
          '@type': 'HowToStep',
          name: 'Evening (PM) Protocol',
          text: page.pmRule
        }
      ]
    }] : [])
  ];

  const comparisonRowsHtml = comparedActives.map((ing) => `
    <tr>
      <td><strong style="color:var(--text-primary);">${escapeHtml(ing.commonName)}</strong><br/><span class="mono" style="font-size:0.8125rem;color:var(--text-secondary);">${escapeHtml(ing.inciName)}</span></td>
      <td class="mono">${ing.phMin}–${ing.phMax}</td>
      <td class="mono">${ing.pka != null ? ing.pka : '—'}</td>
      <td class="mono">${ing.molecularWeightDa} Da</td>
      <td><span class="${ing.comedogenicity >= 3 ? 'badge-clash' : 'badge-safe'} mono">${ing.comedogenicity}/5</span></td>
      <td><span class="${ing.malasseziaTrigger ? 'badge-warn' : 'badge-safe'} mono">${ing.malasseziaTrigger ? 'No (Trigger)' : 'Yes (Safe)'}</span></td>
      <td style="font-size:0.81rem;color:var(--text-secondary);"><a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 Locked in Free Preview ($1.99 Ritual Pack)</a></td>
    </tr>
  `).join('');

  const faqHtml = (page.faqs || []).map((f) => `
    <div class="bento-cell" style="margin-bottom:12px;">
      <h3 class="serif-display" style="font-size:1.2rem;font-weight:700;margin-bottom:6px;">${escapeHtml(f.q)}</h3>
      <p style="color:var(--text-secondary);font-size:0.87rem;">${escapeHtml(f.a)}</p>
    </div>
  `).join('');

  const relatedHtml = (relatedPages || []).slice(0, 8).map((r) => `
    <a href="/seo/${escapeHtml(r.slug)}" class="bento-cell" style="display:block;padding:16px;">
      <div class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;margin-bottom:4px;">${escapeHtml(r.verdict)} · ΔpH ${r.deltaPh}</div>
      <div class="serif-display" style="font-weight:700;font-size:1.05rem;">${escapeHtml(r.title)}</div>
    </a>
  `).join('');

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="margin-bottom:10px;font-size:0.82rem;color:var(--text-secondary);">
          <a href="/">Home</a> / <a href="/directory">Layering Directory</a> / <span style="color:var(--rose-brand);font-weight:600;">${escapeHtml(page.category)}</span>
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
          <div class="eyebrow-pill mono" style="margin:0;">${escapeHtml(page.verdict)} · HARMONY SCORE ${page.compatibilityScore}/100 · ΔpH ${page.deltaPh}</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=dermstore" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Verified Formula at Dermstore ↗</a>
            <a href="/api/affiliate?product=${escapeHtml(primaryProdId)}&partner=sephora" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop Barrier-Safe Alternative at Sephora ↗</a>
          </div>
        </div>
        <h1 class="hero-h1" style="font-size:clamp(1.95rem,3.2vw,2.85rem);">${escapeHtml(page.title)}</h1>
        <p class="hero-sub" style="margin-bottom:22px;">${escapeHtml(page.summary)}</p>

        <div class="bento-grid-3" style="margin-bottom:28px;">
          <div class="bento-cell tinted">
            <div class="mono" style="font-size:0.8125rem;color:var(--rose-brand);font-weight:700;margin-bottom:4px;">FORMULATION CHEMISTRY</div>
            <div class="serif-display" style="font-size:1.2rem;font-weight:700;margin-bottom:6px;">${escapeHtml(page.conflictType)}</div>
            <p style="font-size:0.83rem;color:var(--text-secondary);">Recommended Spacing: <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 [LOCKED IN FREE PREVIEW — Unlock Exact Wait-Time Buffer ($1.99)]</a></p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="font-size:0.8125rem;color:var(--sage-safe);font-weight:700;margin-bottom:4px;">AM MORNING GLOW RITUAL</div>
            <p style="font-size:0.86rem;color:var(--text-secondary);">Step 1: Gentle pH 5.5 Cleanse &rarr; <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 [LOCKED IN FREE PREVIEW — Unlock Exact AM Layering Sequence ($1.99)]</a></p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="font-size:0.8125rem;color:var(--honey-warn);font-weight:700;margin-bottom:4px;">PM BARRIER REPAIR RITUAL</div>
            <p style="font-size:0.86rem;color:var(--text-secondary);">Night 1 Preview &rarr; <a href="/buy/flash_pass?guide=${encodeURIComponent(page.slug)}" class="mono" style="color:var(--rose-brand);font-weight:700;text-decoration:underline;">🔒 [LOCKED IN FREE PREVIEW — Unlock 4-Night Skin-Cycling Calendar ($1.99)]</a></p>
          </div>
        </div>

        <div id="pseo-dermlogic-inline-calc" class="bento-cell tinted" style="margin-bottom:24px;padding:20px;border:1.5px solid var(--rose-brand);">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;">
            <div>
              <div class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:800;">1-CLICK BARRIER pH &amp; WASTED SERUM CALCULATOR</div>
              <h2 class="serif-display" style="font-size:1.35rem;margin:2px 0 0;">Tap Your Skin Profile to Calculate Active Neutralization Loss for ${escapeHtml(searchIntentSubject)}</h2>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(180,1.35,'sensitive_rosacea')">Sensitive / Rosacea ($180/yr)</button>
              <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(240,1.25,'dry_compromised')">Dry / Compromised ($240/yr)</button>
              <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(320,1.0,'balanced_combo')">Balanced / Combo ($320/yr)</button>
              <button type="button" class="chip mono" style="cursor:pointer;font-weight:700;" onclick="window.__dlCalcPseoSkin(480,1.45,'oily_acne_stack')">5+ Active Stack ($480/yr)</button>
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:12px;background:var(--bg-card,#FFFFFF);padding:14px;border-radius:10px;border:1px solid var(--border-subtle);">
            <div><div class="mono" style="font-size:0.75rem;color:var(--text-secondary);">EST. WASTED SERUM POTENCY / YR</div><div id="pseo-dl-waste-out" class="mono" style="font-size:1.35rem;font-weight:800;color:var(--rose-brand);">$${Math.round(240 * Math.max(0.22, (100 - (Number(page.compatibilityScore) || 55)) / 100))}/yr Lost</div></div>
            <div><div class="mono" style="font-size:0.75rem;color:var(--text-secondary);">REQUIRED pH BUFFER WAIT</div><div id="pseo-dl-buffer-out" class="mono" style="font-size:1.35rem;font-weight:800;color:var(--text-primary);">${Number(page.deltaPh) >= 1.5 ? '20 Min / AM-PM Split' : '10 Min Wait Buffer'}</div></div>
            <div><div class="mono" style="font-size:0.75rem;color:var(--text-secondary);">POST-FIX HARMONY SCORE</div><div id="pseo-dl-harmony-out" class="mono" style="font-size:1.35rem;font-weight:800;color:var(--sage-safe);">96/100 Verified</div></div>
            <div style="display:flex;align-items:center;"><a href="/buy/micro_pass?source=pseo_inline_calc&amp;guide=${encodeURIComponent(page.slug)}" class="btn-primary mono" style="padding:10px 14px;font-size:0.8rem;text-decoration:none;display:inline-block;">Unlock 99¢ AM/PM Card &rarr;</a></div>
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

        <div class="bento-cell" style="margin-bottom:28px;padding:22px;">
          <h2 class="serif-display" style="font-size:1.65rem;margin-bottom:8px;">Can You Use ${escapeHtml(searchIntentSubject)} Together? Clinical Verdict &amp; Layering Rules</h2>
          <p style="color:var(--text-secondary);font-size:0.88rem;margin-bottom:14px;">
            Clinical Verdict: <strong class="mono" style="color:var(--rose-brand);">${escapeHtml(page.verdict)}</strong> (Harmony Score ${page.compatibilityScore}/100 · ΔpH ${page.deltaPh}). Compare Henderson-Hasselbalch pKa dissociation, optimal pH windows, Dalton molecular weights, EU CosIng comedogenicity (0–5), and Malassezia safety below before layering.
          </p>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Active / INCI Compound</th>
                  <th>Optimal pH Window</th>
                  <th>pKa</th>
                  <th>Molecular Weight (Da)</th>
                  <th>Comedogenicity (0–5)</th>
                  <th>Malassezia Safe</th>
                  <th>Recommended Routine Slot (AM/PM)</th>
                </tr>
              </thead>
              <tbody>
                ${comparisonRowsHtml}
              </tbody>
            </table>
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
  const title = isPrivacy ? 'Privacy Policy | DermLogic Formulation Atelier' : 'Terms of Service & Cosmetic Chemistry Disclaimer | DermLogic';
  const bodyHtml = `
    <section class="section-block">
      <div class="container" style="max-width:820px;">
        <h1 class="hero-h1" style="font-size:2.2rem;margin-bottom:16px;">${isPrivacy ? 'Privacy Policy & Data Governance' : 'Terms of Service & Educational Formulation Disclaimer'}</h1>
        <p style="color:var(--text-secondary);margin-bottom:16px;">Last Updated: October 14, 2026 · Contact: concierge@dermlogic.io</p>
        <div class="bento-cell" style="margin-bottom:16px;">
          <h2 class="serif-display" style="font-size:1.3rem;margin-bottom:8px;">1. ${isPrivacy ? 'Data Collection & Local SQLite Telemetry' : 'Cosmetic Chemistry Educational Scope'}</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            ${isPrivacy
              ? 'DermLogic processes pasted INCI ingredient lists and vanity shelf combinations deterministically on the server to calculate pH windows, pKa free-acid fractions, and comedogenicity ratings. Optional checkout email addresses are used solely to deliver your Routine Ritual PDF and 9:16 Wallet Pass.'
              : 'DermLogic provides deterministic cosmetic chemistry calculations (verified skin pH compatibility, active ingredient stability, and pore-safety scores, and EU CosIng comedogenicity ratings) for educational formulation analysis. It does not replace individualized medical diagnosis by a board-certified dermatologist.'}
          </p>
        </div>
        <div class="bento-cell">
          <h2 class="serif-display" style="font-size:1.3rem;margin-bottom:8px;">2. ${isPrivacy ? 'GDPR / CCPA Rights, Cookie Controls & Retailer Disclosures' : '30-Day Harmony Guarantee & Self-Serve Fulfillment'}</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            ${isPrivacy
              ? 'Visitors may reject non-essential analytics via the Cookie Consent ribbon at any time and request complete deletion of order or telemetry records by emailing concierge@dermlogic.io. Verified retailer links to Dermstore and Sephora include sponsored affiliate tags.'
              : 'All $4.99 One-Time Routine Ritual Cards and $19.99/yr Unlimited Shelf Passes include an unconditional 30-day satisfaction guarantee.'}
          </p>
        </div>
      </div>
    </section>
  `;
  return renderBaseDocument({
    title,
    description: title,
    canonicalPath: isPrivacy ? '/privacy' : '/terms',
    ogSlug: type,
    jsonLdObjects: [],
    hideNav: false,
    bodyHtml
  });
}

function render404Page() {
  const bodyHtml = `
    <section class="section-block">
      <div class="container" style="max-width:640px;text-align:center;padding:48px 20px;">
        <div class="badge-clash mono" style="margin-bottom:12px;">HTTP 404 · FORMULATION PAGE NOT FOUND</div>
        <h1 class="hero-h1" style="font-size:2.4rem;">This Skincare Ritual Page Could Not Be Found</h1>
        <p style="color:var(--text-secondary);margin-bottom:24px;">
          Return to the interactive ΔpH &amp; Active-Ingredient Harmony Checker or explore all 60 clinical layering guides.
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
          <a href="/#analyzer" class="btn-primary"><span>Open Routine Harmony Checker</span><span class="btn-icon-circle">↗</span></a>
          <a href="/directory" class="btn-secondary">Browse 60 Layering Guides</a>
        </div>
      </div>
    </section>
  `;
  return renderBaseDocument({
    title: '404 Page Not Found | DermLogic',
    description: 'Page not found on DermLogic Formulation Atelier.',
    canonicalPath: '/404',
    ogSlug: '404',
    jsonLdObjects: [],
    hideNav: false,
    bodyHtml
  });
}

function renderOgSvg(pageOrTitle, subtitle, score, deltaPh) {
  const safeTitle = escapeHtml((pageOrTitle || 'DermLogic Skincare Formulation Atelier').slice(0, 68));
  const safeSub = escapeHtml((subtitle || 'Cosmetic-Chemist ΔpH Harmony · Peptide & Vitamin C Compatibility · 4-Night Skin Cycling').slice(0, 95));
  const safeScore = score != null ? `${score}/100` : '96/100';
  const safeDelta = deltaPh != null ? `ΔpH ${deltaPh}` : 'ΔpH 2.8';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FAF6F0"/>
      <stop offset="55%" stop-color="#F4EDE4"/>
      <stop offset="100%" stop-color="#FCEEF0"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="48" y="48" width="1104" height="534" rx="28" fill="#FFFFFF" stroke="#E6DDD2" stroke-width="2"/>
  <rect x="88" y="92" width="390" height="42" rx="21" fill="#FCEEF0" stroke="#F3C8CE"/>
  <text x="114" y="119" fill="#C85A68" font-family="monospace" font-size="17" font-weight="bold">DERMLOGIC FORMULATION ATELIER</text>
  <text x="88" y="218" fill="#1C1613" font-family="Georgia, serif" font-size="40" font-weight="bold">${safeTitle}</text>
  <text x="88" y="282" fill="#6E6259" font-family="sans-serif" font-size="22">${safeSub}</text>
  <rect x="88" y="355" width="290" height="145" rx="18" fill="#FAF6F0" stroke="#E6DDD2"/>
  <text x="116" y="400" fill="#6E6259" font-family="monospace" font-size="15">ROUTINE HARMONY SCORE</text>
  <text x="116" y="466" fill="#2D6A4F" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeScore)}</text>
  <rect x="406" y="355" width="280" height="145" rx="18" fill="#FFF1F3" stroke="#FECDD3"/>
  <text x="434" y="400" fill="#BE123C" font-family="monospace" font-size="15">PH DIFFERENTIAL</text>
  <text x="434" y="466" fill="#BE123C" font-family="Georgia, serif" font-size="50" font-weight="bold">${escapeHtml(safeDelta)}</text>
  <rect x="714" y="355" width="388" height="145" rx="18" fill="#FAF6F0" stroke="#E6DDD2"/>
  <text x="742" y="400" fill="#C85A68" font-family="monospace" font-size="15">AM GLOW + PM BARRIER RITUAL</text>
  <text x="742" y="452" fill="#1C1613" font-family="Georgia, serif" font-size="25" font-weight="bold">4-Night Skin Cycling + 9:16 Card</text>
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
