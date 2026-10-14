/**
 * DermLogic (#4) — Page Views & Dynamic OpenGraph SVG Renderer
 * Renders /, /lp (Cold Paid-Social Landing Page), /directory, /seo/:slug (60+ pSEO pages),
 * /privacy, /terms, 404, and /api/og dynamic SVG cards.
 */

const {
  escapeHtml,
  SHARED_CSS,
  CLIENT_SCRIPT,
  renderHeader,
  renderFooter,
  renderInteractiveCheckerWidget
} = require('./ui-templates');

function renderBaseDocument({ title, description, canonicalPath, ogSlug, jsonLdObjects, hideNav, bodyHtml }) {
  const canonicalUrl = `http://127.0.0.1:4104${canonicalPath || '/'}`;
  const ogImageUrl = `http://127.0.0.1:4104/api/og?slug=${encodeURIComponent(ogSlug || 'home')}`;
  const jsonLdScripts = (jsonLdObjects || [])
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`)
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
  <meta property="og:site_name" content="DermLogic Clinical INCI Engine" />
  <meta property="og:image" content="${escapeHtml(ogImageUrl)}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${escapeHtml(ogImageUrl)}" />
  <link rel="icon" type="image/svg+xml" href="/api/og?slug=favicon" />
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

function renderHomePage({ products, ingredients, presets, initialAnalysis, seoPages }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'DermLogic Clinical INCI & ΔpH Conflict Engine',
      applicationCategory: 'HealthApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '4.99',
        priceCurrency: 'USD'
      },
      description: 'Deterministic clinical INCI skincare active-ingredient conflict, ΔpH inactivation, pKa free-acid, comedogenic load & barrier-safety engine.'
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
      <td><strong>${escapeHtml(ing.commonName)}</strong><br/><span class="mono" style="font-size:0.74rem;color:var(--text-secondary);">${escapeHtml(ing.inciName)}</span></td>
      <td class="mono">${ing.phMin}–${ing.phMax}</td>
      <td class="mono">${ing.pka != null ? ing.pka : '—'}</td>
      <td class="mono">${ing.molecularWeightDa} Da</td>
      <td><span class="${ing.comedogenicity >= 3 ? 'badge-clash' : 'badge-safe'} mono">${ing.comedogenicity}/5</span></td>
      <td><span class="${ing.malasseziaTrigger ? 'badge-warn' : 'badge-safe'} mono">${ing.malasseziaTrigger ? 'Trigger' : 'Safe'}</span></td>
      <td style="color:var(--text-secondary);font-size:0.78rem;">${escapeHtml(ing.clinicalMechanism)}</td>
    </tr>
  `).join('');

  const featuredSeoLinks = seoPages.slice(0, 12).map((p) => `
    <a href="/seo/${escapeHtml(p.slug)}" class="bento-cell" style="display:block;padding:16px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <span class="mono" style="font-size:0.72rem;color:var(--teal-safe);">${escapeHtml(p.category)}</span>
        <span class="mono" style="font-size:0.72rem;color:var(--text-secondary);">Score ${p.compatibilityScore}/100</span>
      </div>
      <div style="font-weight:700;font-size:0.9rem;margin-bottom:4px;">${escapeHtml(p.title)}</div>
      <p style="color:var(--text-secondary);font-size:0.78rem;">${escapeHtml(p.summary.slice(0, 115))}...</p>
    </a>
  `).join('');

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="max-width:840px;margin-bottom:26px;">
          <div class="eyebrow-pill mono">CLINICAL COSMETIC CHEMISTRY · HENDERSON-HASSELBALCH ΔpH ENGINE</div>
          <h1 class="hero-h1">Stop Layering Skincare Actives That Chemically Cancel Each Other Out.</h1>
          <p class="hero-sub">
            Audit your shelf or raw INCI label in under 5ms for |ΔpH| &gt; 1.8 peptide hydrolysis, Benzoyl Peroxide retinoid oxidation, comedogenic esters, and 4-night skin cycling.
          </p>
        </div>

        ${renderInteractiveCheckerWidget({
          products,
          presets,
          initialAnalysis,
          initialProductIds: presets[0].productIds,
          initialRawInci: ''
        })}
      </div>
    </section>

    <!-- Asymmetric 3-Cell Clinical Architecture Bento (1 Eyebrow max per 3 sections rule) -->
    <section class="section-block">
      <div class="container">
        <h2 style="font-size:1.75rem;font-weight:800;letter-spacing:-0.02em;">Three Biochemical Failure Modes Hiding in Consumer Regimens</h2>
        <div class="bento-grid-3">
          <div class="bento-cell tinted">
            <div class="badge-clash mono" style="margin-bottom:10px;">1. |ΔpH| &gt; 1.8 &amp; HENDERSON-HASSELBALCH SHIFT</div>
            <h3 style="font-size:1.15rem;margin-bottom:8px;">Free-Acid Neutralization &amp; Peptide De-Chelation</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;">
              Pure L-Ascorbic Acid (pKa 4.17) and Glycolic Acid (pKa 3.83) require pH 2.8–3.6 to remain protonated. Layering them directly with pH 6.2 Copper Peptides (GHK-Cu) or Niacinamide shifts surface equilibrium, uncouples Cu2+ coordination bonds, and triggers prostaglandin D2 capillary flushing.
            </p>
          </div>
          <div class="bento-cell">
            <div class="badge-warn mono" style="margin-bottom:10px;">2. REDOX HOMOLYSIS</div>
            <h3 style="font-size:1.15rem;margin-bottom:8px;">Peroxide vs. Retinoid Oxidation</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;">
              Benzoyl Peroxide cleaves into free oxygen radicals that attack the conjugated polyene tail of Tretinoin and Retinol on contact, degrading over 80% of active Vitamin A before it binds nuclear RAR receptors.
            </p>
          </div>
          <div class="bento-cell">
            <div class="badge-safe mono" style="margin-bottom:10px;">3. POSITIONAL COMEDOGENICITY</div>
            <h3 style="font-size:1.15rem;margin-bottom:8px;">Hidden Vehicle Esters &amp; Malassezia</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;">
              Even prescription Tretinoin 0.05% creams often suspend the active in Isopropyl Myristate (Grade 5/5 rabbit-ear comedogen and C14 Malassezia yeast feeder), causing rebound closed comedones.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Clinical Reference Matrix Section -->
    <section class="section-block" id="inci-table">
      <div class="container">
        <h2 style="font-size:1.65rem;font-weight:800;margin-bottom:8px;">Clinical Active-Ingredient pH, pKa &amp; Comedogenicity Reference Matrix</h2>
        <p style="color:var(--text-secondary);font-size:0.92rem;margin-bottom:20px;max-width:65ch;">
          Showing 18 of ${ingredients.length} indexed compounds in our SQLite engine, cross-referenced against EU CosIng Regulation (EC) No 1223/2009 and Malassezia lipid metabolism.
        </p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Active / INCI Nomenclature</th>
                <th>Optimal pH</th>
                <th>pKa</th>
                <th>Mol. Weight</th>
                <th>Comedogenic</th>
                <th>Malassezia</th>
                <th>Clinical Biochemical Mechanism</th>
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
          <h2 style="font-size:1.6rem;font-weight:800;">High-Intent Clinical Layering &amp; Product Teardown Library</h2>
          <a href="/directory" class="btn-secondary">Browse All ${seoPages.length} Clinical Guides →</a>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px;">
          ${featuredSeoLinks}
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: 'DermLogic | Clinical INCI Skincare Conflict, ΔpH & Barrier-Safety Engine',
    description: 'Check your skincare routine and INCI ingredients in <5ms for ΔpH inactivation, Copper Peptide + Vitamin C oxidation, Benzoyl Peroxide + Tretinoin clashes, and comedogenic load.',
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
        <div style="max-width:860px;margin-bottom:24px;">
          <div class="eyebrow-pill mono">FREE 5-SECOND CLINICAL SHELF AUDIT · ZERO SIGNUP REQUIRED</div>
          <h1 class="hero-h1">Is Your $300 Skincare Routine Secretly Canceling Itself Out?</h1>
          <p class="hero-sub">
            Check your active ingredient &amp; ΔpH conflicts in 5 seconds. Discover if your Vitamin C, Copper Peptides, Retinoid, or BHA Toner are chemically neutralizing each other or stripping your barrier.
          </p>
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
            <div class="mono" style="color:var(--teal-safe);font-size:0.78rem;font-weight:700;margin-bottom:6px;">WHY 68% OF MULTI-STEP ROUTINES FAIL</div>
            <h3 style="font-size:1.1rem;margin-bottom:6px;">The Copper Peptide + Vitamin C Trap</h3>
            <p style="color:var(--text-secondary);font-size:0.84rem;">
              Layering The Ordinary Copper Peptides 1% (pH 6.2) with 15% L-Ascorbic Acid (pH 3.2) triggers Cu2+ redox oxidation—turning $200+ of serums into inactive pro-oxidant byproducts on your face.
            </p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="color:var(--amber-warn);font-size:0.78rem;font-weight:700;margin-bottom:6px;">THE ACNE Rx PARADOX</div>
            <h3 style="font-size:1.1rem;margin-bottom:6px;">Benzoyl Peroxide Degrades Tretinoin</h3>
            <p style="color:var(--text-secondary);font-size:0.84rem;">
              Applying Benzoyl Peroxide at the same time as Tretinoin or Retinol oxidizes the retinoid molecule while generic cream bases clog pores with Isopropyl Myristate (5/5 comedogenicity).
            </p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="color:var(--teal-safe);font-size:0.78rem;font-weight:700;margin-bottom:6px;">30-DAY CLINICAL GUARANTEE</div>
            <h3 style="font-size:1.1rem;margin-bottom:6px;">Instant 9:16 Apple-Wallet Rescue Pass</h3>
            <p style="color:var(--text-secondary);font-size:0.84rem;">
              Get your exact AM/PM split, 15-minute ΔpH wait timers, and 4-Night Skin-Cycling schedule formatted for your phone lockscreen or bathroom mirror.
            </p>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: 'Is Your $300 Skincare Routine Secretly Canceling Itself Out? | DermLogic',
    description: 'Check your skincare active ingredient & ΔpH conflicts in 5 seconds. Instant deterministic AM/PM rescue schedule and comedogenicity check.',
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

  const renderCardList = (items) => items.map((p) => `
    <a href="/seo/${escapeHtml(p.slug)}" class="bento-cell" style="display:block;padding:18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
        <span class="${p.compatibilityScore < 45 ? 'badge-clash' : p.compatibilityScore < 75 ? 'badge-warn' : 'badge-safe'} mono">${escapeHtml(p.verdict)} · ${p.compatibilityScore}/100</span>
        <span class="mono" style="font-size:0.74rem;color:var(--text-secondary);">ΔpH ${p.deltaPh}</span>
      </div>
      <h3 style="font-size:0.96rem;font-weight:700;margin-bottom:6px;">${escapeHtml(p.title)}</h3>
      <p style="color:var(--text-secondary);font-size:0.8rem;">${escapeHtml(p.summary)}</p>
    </a>
  `).join('');

  const bodyHtml = `
    <section class="section-block">
      <div class="container">
        <div class="eyebrow-pill mono">PROGRAMMATIC CLINICAL ENCYCLOPEDIA · ${seoPages.length} INDEXED PAGES</div>
        <h1 class="hero-h1" style="font-size:2.3rem;">Skincare Active-Ingredient Conflict &amp; Product INCI Directory</h1>
        <p class="hero-sub">
          Every combination is scored deterministically using Henderson-Hasselbalch pKa bioavailability, ΔpH thresholds, and EU CosIng comedogenicity tables.
        </p>

        <h2 style="font-size:1.35rem;margin:28px 0 14px;">1. Active-Ingredient Pair Compatibility Guides (${pairPages.length} Pages)</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px;">
          ${renderCardList(pairPages)}
        </div>

        <h2 style="font-size:1.35rem;margin:38px 0 14px;">2. Cult-Product INCI Teardowns &amp; Layering Guides (${productPages.length} Pages)</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:14px;">
          ${renderCardList(productPages)}
        </div>
      </div>
    </section>
  `;

  return renderBaseDocument({
    title: `Clinical Skincare Conflict & INCI Directory (${seoPages.length} Guides) | DermLogic`,
    description: `Browse ${seoPages.length} clinical active-ingredient interaction matrices and cult skincare INCI teardowns.`,
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLdObjects: [],
    hideNav: false,
    bodyHtml
  });
}

function renderSeoDetailPage({ page, products, presets, initialAnalysis, relatedPages }) {
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
      offers: { '@type': 'Offer', price: '4.99', priceCurrency: 'USD' }
    }
  ];

  const faqHtml = (page.faqs || []).map((f) => `
    <div class="bento-cell" style="margin-bottom:12px;">
      <h3 style="font-size:1rem;font-weight:700;margin-bottom:6px;">${escapeHtml(f.q)}</h3>
      <p style="color:var(--text-secondary);font-size:0.86rem;">${escapeHtml(f.a)}</p>
    </div>
  `).join('');

  const relatedHtml = (relatedPages || []).slice(0, 6).map((r) => `
    <a href="/seo/${escapeHtml(r.slug)}" class="bento-cell" style="display:block;padding:14px;">
      <div class="mono" style="font-size:0.72rem;color:var(--teal-safe);margin-bottom:4px;">${escapeHtml(r.verdict)} · ΔpH ${r.deltaPh}</div>
      <div style="font-weight:700;font-size:0.86rem;">${escapeHtml(r.title)}</div>
    </a>
  `).join('');

  const bodyHtml = `
    <section class="hero-section">
      <div class="container">
        <div style="margin-bottom:10px;font-size:0.8rem;color:var(--text-secondary);">
          <a href="/">Home</a> / <a href="/directory">Clinical Directory</a> / <span style="color:var(--teal-safe);">${escapeHtml(page.category)}</span>
        </div>
        <div class="eyebrow-pill mono">${escapeHtml(page.verdict)} · COMPATIBILITY ${page.compatibilityScore}/100 · ΔpH ${page.deltaPh}</div>
        <h1 class="hero-h1" style="font-size:clamp(1.75rem,3vw,2.55rem);">${escapeHtml(page.title)}</h1>
        <p class="hero-sub">${escapeHtml(page.summary)}</p>

        <div class="bento-grid-3" style="margin-bottom:28px;">
          <div class="bento-cell tinted">
            <div class="mono" style="font-size:0.74rem;color:var(--teal-safe);font-weight:700;margin-bottom:4px;">BIOCHEMICAL MECHANISM</div>
            <div style="font-weight:700;margin-bottom:6px;">${escapeHtml(page.conflictType)}</div>
            <p style="font-size:0.82rem;color:var(--text-secondary);">Wait-Time / Separation Threshold: <strong class="mono">${page.waitTimeMinutes >= 720 ? 'Strict AM/PM or Alternate-Night Split' : `${page.waitTimeMinutes} Minutes`}</strong></p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="font-size:0.74rem;color:var(--teal-safe);font-weight:700;margin-bottom:4px;">MORNING (AM) PROTOCOL</div>
            <p style="font-size:0.85rem;color:var(--text-secondary);">${escapeHtml(page.amRule)}</p>
          </div>
          <div class="bento-cell">
            <div class="mono" style="font-size:0.74rem;color:var(--amber-warn);font-weight:700;margin-bottom:4px;">EVENING (PM) PROTOCOL</div>
            <p style="font-size:0.85rem;color:var(--text-secondary);">${escapeHtml(page.pmRule)}</p>
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
        <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:16px;">Clinical Dermatology FAQ &amp; Layering Rules</h2>
        ${faqHtml}

        <h3 style="font-size:1.2rem;font-weight:700;margin:32px 0 14px;">Related Clinical Conflict &amp; INCI Guides</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
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
  const title = isPrivacy ? 'Privacy Policy | DermLogic Clinical Engine' : 'Terms of Service & Clinical Disclaimer | DermLogic';
  const bodyHtml = `
    <section class="section-block">
      <div class="container" style="max-width:820px;">
        <h1 class="hero-h1" style="font-size:2rem;margin-bottom:16px;">${isPrivacy ? 'Privacy Policy & Data Governance' : 'Terms of Service & Clinical Educational Disclaimer'}</h1>
        <p style="color:var(--text-secondary);margin-bottom:14px;">Last Updated: October 14, 2026 · Contact: privacy@dermlogic.io</p>
        <div class="bento-cell" style="margin-bottom:16px;">
          <h2 style="font-size:1.1rem;margin-bottom:8px;">1. ${isPrivacy ? 'Data Collection & Local SQLite Telemetry' : 'Cosmetic Chemistry Educational Scope'}</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            ${isPrivacy
              ? 'DermLogic processes pasted INCI ingredient lists and shelf combinations deterministically on the server to calculate pH windows, pKa free-acid fractions, and comedogenicity ratings. Optional checkout email addresses are used solely to deliver your Routine Rescue PDF and 9:16 Wallet Pass.'
              : 'DermLogic provides deterministic cosmetic chemistry calculations (Henderson-Hasselbalch pKa bioavailability, ΔpH thresholds, and EU CosIng comedogenicity ratings) for educational formulation analysis. It does not replace individualized medical diagnosis by a board-certified dermatologist.'}
          </p>
        </div>
        <div class="bento-cell">
          <h2 style="font-size:1.1rem;margin-bottom:8px;">2. ${isPrivacy ? 'GDPR / CCPA Rights & Cookie Controls' : '30-Day Refund & Self-Serve Fulfillment'}</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;">
            ${isPrivacy
              ? 'Users may reject non-essential analytics via the Cookie Consent banner at any time and request complete deletion of order or telemetry records by emailing privacy@dermlogic.io.'
              : 'All $4.99 One-Time Routine Rescue Cards and $19.99/yr Unlimited Shelf Scanner passes include an unconditional 30-day satisfaction guarantee.'}
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
      <div class="container" style="max-width:640px;text-align:center;padding:40px 20px;">
        <div class="badge-clash mono" style="margin-bottom:12px;">HTTP 404 · FORMULATION ROUTE NOT FOUND</div>
        <h1 class="hero-h1" style="font-size:2.2rem;">This Clinical INCI Page Could Not Be Located</h1>
        <p style="color:var(--text-secondary);margin-bottom:24px;">
          Return to the interactive ΔpH &amp; Active-Ingredient Conflict Checker or browse all 60 clinical guides.
        </p>
        <div style="display:flex;justify-content:center;gap:12px;">
          <a href="/" class="btn-primary">Open Routine Conflict Checker</a>
          <a href="/directory" class="btn-secondary">Browse 60 Clinical Guides</a>
        </div>
      </div>
    </section>
  `;
  return renderBaseDocument({
    title: '404 Page Not Found | DermLogic',
    description: 'Page not found on DermLogic Clinical INCI Engine.',
    canonicalPath: '/404',
    ogSlug: '404',
    jsonLdObjects: [],
    hideNav: false,
    bodyHtml
  });
}

function renderOgSvg(pageOrTitle, subtitle, score, deltaPh) {
  const safeTitle = escapeHtml((pageOrTitle || 'DermLogic Clinical INCI Conflict Engine').slice(0, 68));
  const safeSub = escapeHtml((subtitle || 'Sub-5ms ΔpH Inactivation · pKa Free-Acid · Comedogenicity & Barrier Safety').slice(0, 95));
  const safeScore = score != null ? `${score}/100` : '96/100';
  const safeDelta = deltaPh != null ? `ΔpH ${deltaPh}` : 'ΔpH 2.8';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#090D12"/>
      <stop offset="100%" stop-color="#111C2B"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="48" y="48" width="1104" height="534" rx="24" fill="#101722" stroke="#14B8A6" stroke-opacity="0.4" stroke-width="2"/>
  <rect x="88" y="92" width="360" height="42" rx="21" fill="#14B8A6" fill-opacity="0.15"/>
  <text x="112" y="119" fill="#14B8A6" font-family="monospace" font-size="18" font-weight="bold">DERMLOGIC CLINICAL INCI ENGINE</text>
  <text x="88" y="220" fill="#F8FAFC" font-family="sans-serif" font-size="40" font-weight="bold">${safeTitle}</text>
  <text x="88" y="285" fill="#94A3B8" font-family="sans-serif" font-size="23">${safeSub}</text>
  <rect x="88" y="360" width="280" height="140" rx="16" fill="#090D12" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="116" y="405" fill="#94A3B8" font-family="monospace" font-size="16">COMPATIBILITY SCORE</text>
  <text x="116" y="468" fill="#14B8A6" font-family="monospace" font-size="48" font-weight="bold">${escapeHtml(safeScore)}</text>
  <rect x="400" y="360" width="280" height="140" rx="16" fill="#090D12" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="428" y="405" fill="#94A3B8" font-family="monospace" font-size="16">PH DIFFERENTIAL</text>
  <text x="428" y="468" fill="#F43F5E" font-family="monospace" font-size="48" font-weight="bold">${escapeHtml(safeDelta)}</text>
  <rect x="712" y="360" width="390" height="140" rx="16" fill="#090D12" stroke="#ffffff" stroke-opacity="0.12"/>
  <text x="740" y="405" fill="#94A3B8" font-family="monospace" font-size="16">4-NIGHT SKIN CYCLING</text>
  <text x="740" y="452" fill="#F8FAFC" font-family="sans-serif" font-size="24" font-weight="bold">AM/PM Split + 9:16 Wallet Card</text>
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
