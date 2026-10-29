'use strict';

/**
 * DermLogic Semantic SEO Hub Silos (GlowIndex-Inspired Multi-Silo Architecture)
 * - /celebrity & /celebrity/:slug (12+ Celebrity Skincare Shelves + Iterative Search-Augmentation API)
 * - /bottle & /bottle/:slug (44 Cult Bottle Breakdowns, Dupes, Celebrity Shelves & 1-Tap Pre-load)
 * - /ingredient & /ingredient/:slug (65 Active Ingredient Hubs, Pore-Safety & Compatible Bottles)
 * - /brand & /brand/:slug (24+ Skincare Brand Hubs)
 * - /concern & /concern/:slug (8 High-Intent Skin-Concern & Routine Scenario Hubs)
 */

const fs = require('fs');
const path = require('path');
const { getAllCelebrityRoutines, getDailyDripInfo, advanceCelebrityShelfByOneDay } = require('./celebrity-routines');
const { CLINICAL_INGREDIENTS, CULT_PRODUCTS } = require('./clinical-data');
const { escapeHtml, SHARED_CSS, CLIENT_SCRIPT, renderHeader, renderFooter } = require('./ui-templates');

const CONCERN_HUBS = [
  {
    slug: 'morning-skincare-under-makeup-no-pilling',
    title: 'Morning Skincare Order Under Makeup (Zero Pilling Guide)',
    badge: '60s Dry-Down Rule',
    heroImg: '/public/editorial-woman-morning.jpg',
    summary: 'How to layer Vitamin C, Hyaluronic Acid, Niacinamide, and SPF 50 in the morning so foundation and concealer glide on smoothly with zero rolling or flaking.',
    steps: [
      '1. Apply watery Vitamin C or hydrating essence onto clean, slightly damp skin and wait 60 seconds.',
      '2. Pat (never rub vigorously) lightweight peptide or niacinamide serum and allow 45 seconds to settle.',
      '3. Seal with a non-silicone barrier lotion and wait 90 seconds before pressing on broad-spectrum SPF 50.'
    ],
    avoidNote: 'Avoid stacking thick xanthan-gum serums directly over damp Glycolic Acid or heavy dimethicone primers before sunscreen sets.',
    productIds: ['skinceuticals-ce-ferulic', 'cosrx-snail-96-mucin', 'aestura-atobarrier-365', 'boj-relief-sun-spf50'],
    activeIds: ['l-ascorbic-acid', 'hyaluronic-acid', 'niacinamide', 'ceramide-np'],
    celebSlugs: ['hailey-bieber', 'sabrina-carpenter', 'zendaya']
  },
  {
    slug: 'pregnancy-safe-retinol-swaps-routine',
    title: 'Pregnancy-Safe Skincare Routine & Retinol Swaps',
    badge: '100% Retinoid-Free',
    heroImg: '/public/routines/selena-dewy-bounce.jpg',
    summary: 'Gentle, OB-approved swaps for Tretinoin, Retinol, Salicylic Acid peels, and Hydroquinone, using Azelaic Acid 15%, Bakuchiol, Peptides, and Vitamin C.',
    steps: [
      '1. Swap nighttime Tretinoin or Retinol for Copper Peptides + Bakuchiol to maintain bounce and firmness.',
      '2. Replace Hydroquinone and strong BHA peels with 15% Azelaic Acid to calm melasma and hormonal breakouts.',
      '3. Pair morning Vitamin C with mineral Zinc Oxide SPF 46+ to prevent pregnancy mask (melasma).'
    ],
    avoidNote: 'Pause all prescription retinoids (Tretinoin, Adapalene, Tazarotene), OTC Retinol/Retinal, and Hydroquinone.',
    productIds: ['finacea-15-azelaic', 'to-buffet-copper-peptides', 'lrp-cicaplast-baume-b5', 'eltamd-uv-clear-spf46'],
    activeIds: ['azelaic-acid', 'bakuchiol', 'copper-tripeptide-1', 'panthenol'],
    celebSlugs: ['sofia-richie-grainge', 'margot-robbie', 'selena-gomez']
  },
  {
    slug: 'tretinoin-sandwich-method-no-peeling',
    title: 'The Tretinoin & Retinol Sandwich Method (Zero Peeling Guide)',
    badge: 'Nighttime Retinoid Buffer',
    heroImg: '/public/editorial-woman-evening.jpg',
    summary: 'Stop retinoid flaking around the mouth and nose by cushioning prescription Tretinoin 0.05% or Retinal between two thin layers of ceramide cream.',
    steps: [
      '1. Cleanse with a non-foaming milk cleanser and apply a thin layer of lightweight ceramide lotion onto damp skin.',
      '2. Wait 15 minutes until skin is 100% bone-dry, then smooth a pea-sized drop of Tretinoin across forehead, cheeks, and chin.',
      '3. Wait 10 minutes and seal with a second cushion of 3:1:1 Ceramide + Panthenol barrier balm.'
    ],
    avoidNote: 'Never apply Tretinoin onto wet Hyaluronic Acid skin (water channels accelerate absorption and cause stinging) or mix with Benzoyl Peroxide.',
    productIds: ['rx-tretinoin-005', 'aestura-atobarrier-365', 'lrp-cicaplast-baume-b5', 'stratia-lipid-gold'],
    activeIds: ['tretinoin', 'ceramide-np', 'panthenol', 'cholesterol'],
    celebSlugs: ['emily-ratajkowski', 'anne-hathaway', 'rosie-huntington-whiteley']
  },
  {
    slug: '72-hour-damaged-skin-barrier-reset',
    title: '72-Hour Damaged Skin Barrier Reset (When Water Stings)',
    badge: 'Emergency Barrier Rescue',
    heroImg: '/public/editorial-vanity-shelf.jpg',
    summary: 'What to put on your face when you over-exfoliated with Glycolic Acid, BHA, and Retinol, and even plain lukewarm water makes your cheeks flush and sting.',
    steps: [
      '1. Pause all Vitamin C, AHAs, BHAs, Retinoids, and foaming cleansers for 72 hours.',
      '2. Mist clean skin with soothing Hypochlorous Acid or thermal water, followed by Panthenol B5 + Centella.',
      '3. Seal morning and night with biomimetic 3:1:1 Ceramide, Cholesterol, and Fatty Acid barrier cream.'
    ],
    avoidNote: 'Do not apply pure L-Ascorbic Acid (pH 3.2) or exfoliating toners until stinging completely disappears for 3 consecutive days.',
    productIds: ['lrp-cicaplast-baume-b5', 'aestura-atobarrier-365', 'stratia-lipid-gold', 'tower28-sos-spray'],
    activeIds: ['ceramide-np', 'panthenol', 'centella-asiatica', 'squalane'],
    celebSlugs: ['hailey-bieber', 'sofia-richie-grainge', 'selena-gomez']
  },
  {
    slug: 'fungal-acne-malassezia-safe-skincare-shelf',
    title: '100% Fungal-Acne (Malassezia) Safe Skincare Routine',
    badge: 'Zero Fatty-Acid Esters',
    heroImg: '/public/editorial-dossier.jpg',
    summary: 'Eliminate stubborn forehead bumps and itchy jawline texture by swapping out Polysorbate 20, fermented yeast filtrates, and fatty esters for pure Squalane and Urea.',
    steps: [
      '1. Use a 1% Ketoconazole or sulfur clarifying wash for a 3-minute contact mask twice a week.',
      '2. Hydrate with pure Hyaluronic Acid, Niacinamide, or Propolis (zero Galactomyces or Polysorbates).',
      '3. Moisturize exclusively with 5% Urea + Caprylic/Capric Triglyceride or 100% Sugarcane Squalane.'
    ],
    avoidNote: 'Avoid Isopropyl Myristate, Coconut Oil, Polysorbate 20/60/80, Sorbitan Olivate, and fermented yeast essences.',
    productIds: ['nizoral-ketoconazole-1', 'malezia-5-urea-moisturizer', 'tower28-sos-spray', 'eltamd-uv-clear-spf46'],
    activeIds: ['ketoconazole', 'urea', 'squalane', 'niacinamide'],
    celebSlugs: ['madison-beer', 'kendall-jenner', 'zendaya']
  },
  {
    slug: 'rosacea-perioral-dermatitis-calm-routine',
    title: 'Rosacea & Perioral Dermatitis Calm Routine',
    badge: 'Zero-Flush Protocol',
    heroImg: '/public/routines/sofia-mist.jpg',
    summary: 'Calm persistent cheek redness, warm flushing, and bumps around the mouth with Hypochlorous Acid, 15% Azelaic Acid, Centella, and Zinc Oxide SPF.',
    steps: [
      '1. Spritz Hypochlorous Acid mist onto clean skin and wait 10 full minutes for it to dry before touching serums.',
      '2. Smooth a pea-sized drop of 15% Azelaic Acid or Centella Asiatica over redness-prone cheeks.',
      '3. Protect daily with sheer mineral Zinc Oxide SPF 46+ (avoid heat-trapping heavy petrolatum slugs).'
    ],
    avoidNote: 'Avoid heavy overnight petrolatum slugging over rosacea or perioral dermatitis; trapped heat intensifies flushing.',
    productIds: ['tower28-sos-spray', 'finacea-15-azelaic', 'lrp-cicaplast-baume-b5', 'eltamd-uv-clear-spf46'],
    activeIds: ['hypochlorous-acid', 'azelaic-acid', 'centella-asiatica', 'zinc-oxide'],
    celebSlugs: ['sofia-richie-grainge', 'margot-robbie', 'sabrina-carpenter']
  },
  {
    slug: 'hormonal-acne-benzoyl-peroxide-tretinoin-split',
    title: 'Hormonal Acne Routine: How to Use Benzoyl Peroxide & Tretinoin',
    badge: 'AM / PM Oxidation Split',
    heroImg: '/public/routines/madison-cleanse.jpg',
    summary: 'Clear deep chin and jawline blemishes without burning your barrier or letting Benzoyl Peroxide cancel out your nighttime Tretinoin.',
    steps: [
      '1. Morning: Use a 4%–10% Benzoyl Peroxide wash in the shower for 90 seconds, rinse thoroughly, and apply Niacinamide + SPF.',
      '2. Evening: Cleanse gently, buffer with ceramide lotion, and apply Tretinoin 0.05% or Adapalene 0.1%.',
      '3. Off-Nights: Give skin 2 recovery nights per week with Panthenol B5 and Snail Mucin.'
    ],
    avoidNote: 'Never layer leave-on Benzoyl Peroxide cream on top of Tretinoin at bedtime; peroxide oxidizes retinoic acid on contact.',
    productIds: ['panoxyl-10-bpo-wash', 'rx-tretinoin-005', 'aestura-atobarrier-365', 'eltamd-uv-clear-spf46'],
    activeIds: ['benzoyl-peroxide', 'tretinoin', 'niacinamide', 'ceramide-np'],
    celebSlugs: ['kendall-jenner', 'sydney-sweeney', 'rosie-huntington-whiteley']
  },
  {
    slug: 'post-flight-winter-moisture-sandwich-slugging',
    title: 'Post-Flight & Winter Moisture Sandwich (Safe Slugging Guide)',
    badge: 'Overnight Dewy Recovery',
    heroImg: '/public/routines/margot-post-flight.jpg',
    summary: 'Restore parched cabin-air or winter-chapped skin overnight using damp-skin humectants, 3:1:1 ceramides, and targeted balm sealing without chemical burns.',
    steps: [
      '1. Press Hyaluronic Acid, Snail Mucin, and Copper Peptides onto mist-dampened skin.',
      '2. Layer a rich 3:1:1 Ceramide + Cholesterol cream to replenish lost intercellular lipids.',
      '3. Press a whisper-thin veil of Panthenol B5 balm only over dry cheekbones and under-eyes on active-free nights.'
    ],
    avoidNote: 'Never slug with occlusive balm on top of Glycolic Acid, BHA, or Tretinoin; sealing strong actives in drives irritation 4x deeper.',
    productIds: ['cosrx-snail-96-mucin', 'to-buffet-copper-peptides', 'dieux-instant-angel', 'lrp-cicaplast-baume-b5'],
    activeIds: ['hyaluronic-acid', 'copper-tripeptide-1', 'ceramide-np', 'panthenol'],
    celebSlugs: ['hailey-bieber', 'emily-ratajkowski', 'anne-hathaway']
  }
];

function slugifyBrand(brand) {
  return String(brand || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getAllBrandHubs() {
  const map = new Map();
  for (const prod of CULT_PRODUCTS) {
    const slug = slugifyBrand(prod.brand);
    if (!map.has(slug)) {
      map.set(slug, { slug, name: prod.brand, products: [] });
    }
    map.get(slug).products.push(prod);
  }
  return Array.from(map.values());
}

function findDupeForProduct(prod) {
  const firstActive = (prod.primaryActives || [])[0];
  const primaryMatch = firstActive ? CULT_PRODUCTS.filter((p) => p.id !== prod.id && (p.primaryActives || [])[0] === firstActive) : [];
  const sameCat = CULT_PRODUCTS.filter((p) => p.id !== prod.id && p.category === prod.category);
  const pool = primaryMatch.length > 0 ? primaryMatch : (sameCat.length > 0 ? sameCat : CULT_PRODUCTS.filter((p) => p.id !== prod.id));
  const cheaper = pool.filter((p) => p.priceUsd < prod.priceUsd).sort((a, b) => a.priceUsd - b.priceUsd);
  if (cheaper.length > 0) return { type: 'Budget-Friendly Dupe', bottle: cheaper[0], diffUsd: prod.priceUsd - cheaper[0].priceUsd };
  const stepUp = [...pool].sort((a, b) => b.priceUsd - a.priceUsd)[0] || CULT_PRODUCTS[0];
  return { type: 'Luxury Counterpart', bottle: stepUp, diffUsd: Math.abs(prod.priceUsd - stepUp.priceUsd) };
}

function renderShell({ title, description, canonicalPath, breadcrumbs, faqItems, bodyHtml }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.dermlogic.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${baseUrl}/#organization`,
      name: 'DermLogic Skincare Formulation Atelier',
      url: baseUrl,
      logo: `${baseUrl}/favicon.svg`
    },
    {
      '@type': 'WebSite',
      '@id': `${baseUrl}/#website`,
      url: baseUrl,
      name: 'DermLogic',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseUrl}/directory?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: (breadcrumbs || []).map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: b.label,
        item: `${baseUrl}${b.href}`
      }))
    }
  ];
  if (Array.isArray(faqItems) && faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: faqItems.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      }))
    });
  }
  const bcHtml = (breadcrumbs || []).map((b, i) => i === breadcrumbs.length - 1
    ? `<span class="mono" style="color:var(--text-primary);font-weight:500;">${escapeHtml(b.label)}</span>`
    : `<a href="${escapeHtml(b.href)}" class="mono" style="color:var(--text-secondary);">${escapeHtml(b.label)}</a> <span style="color:var(--text-muted);">/</span> `
  ).join('');

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
  <meta property="og:type" content="article" />
  <meta property="og:image" content="${baseUrl}/api/og?slug=${encodeURIComponent(canonicalPath.replace(/\//g, '-').slice(1) || 'home')}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet" />
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')}</script>
  <script>try{if(localStorage.getItem('dermlogic_vanity_theme')==='night')document.documentElement.setAttribute('data-theme','night');}catch(_){}</script>
  <style>${SHARED_CSS}</style>
</head>
<body>
  ${renderHeader(false)}
  <main>
    <div class="container" style="padding-top:22px;padding-bottom:8px;font-size:0.84rem;">${bcHtml}</div>
    ${bodyHtml}
  </main>
  ${renderFooter()}
  <script>${CLIENT_SCRIPT}</script>
</body>
</html>`;
}

function renderSiloNavStrip(activeSilo) {
  const celebCount = getAllCelebrityRoutines().length;
  const silos = [
    { id: 'celebrity', href: '/celebrity', label: `Iconic Routines (${celebCount})` },
    { id: 'concern', href: '/concern', label: 'Skin Concerns (8)' },
    { id: 'bottle', href: '/bottle', label: 'Cult Bottles (44)' },
    { id: 'ingredient', href: '/ingredient', label: 'Active Ingredients (65)' },
    { id: 'brand', href: '/brand', label: 'Skincare Brands (27)' },
    { id: 'directory', href: '/directory', label: 'Layering Combos (318)' }
  ];
  return `<div style="display:flex;gap:8px;flex-wrap:wrap;padding:14px 18px;background:var(--bg-oat);margin-bottom:26px;" role="navigation" aria-label="Skincare Knowledge Silos">
    ${silos.map((s) => `<a href="${s.href}" class="vanity-light-btn mono ${activeSilo === s.id ? 'active' : ''}" style="text-decoration:none;padding:7px 13px;font-size:0.82rem;">${escapeHtml(s.label)}</a>`).join('')}
  </div>`;
}

function renderCelebrityIndexPage() {
  const celebs = getAllCelebrityRoutines();
  const latestDaily = celebs.filter((c) => c.isDailyRelease).slice(-1)[0] || celebs[celebs.length - 1];
  const cards = celebs.map((c) => {
    const preloadHref = `/?products=${encodeURIComponent(c.productIds.join(','))}#analyzer`;
    const cBottles = c.productIds.map((id) => CULT_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    const bottlePills = cBottles.map((b) => `<a href="/bottle/${escapeHtml(b.id)}" class="mono" style="font-size:0.74rem;padding:3px 8px;background:var(--bg-surface);border:1px solid var(--border-hairline);color:var(--text-primary);text-decoration:none;">${escapeHtml(b.brand)} ${escapeHtml(b.name.replace(/\s*\([^)]*\)/g, '').slice(0, 22))}</a>`).join('');
    const filterBlob = `${c.skinProfile} ${c.moniker} ${c.summary} ${cBottles.map((b) => b.name + ' ' + b.category).join(' ')}`.toLowerCase();
    return `<div class="porcelain-vessel-core celeb-routine-card" data-celeb-filter="${escapeHtml(filterBlob)}" style="background:var(--bg-oat);padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
      <div>
        <div class="vessel-photo-frame" style="height:210px;margin-bottom:12px;position:relative;"><img src="${escapeHtml(c.heroImg)}" alt="${escapeHtml(c.name)} skincare routine vanity shelf" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:${escapeHtml(c.imgPos || '50% 25%')};" /><span class="mono" style="position:absolute;bottom:8px;right:8px;padding:3px 8px;border-radius:999px;background:rgba(58,31,39,0.78);color:#FDF8F6;font-size:0.7rem;">${c.amSteps.length} AM / ${c.pmSteps.length} PM Steps</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
          <span class="badge-safe mono">${escapeHtml(c.skinProfile)}</span>
          <span class="mono" style="font-size:0.76rem;color:var(--rose-brand);font-weight:500;">${c.isDailyRelease ? 'New Daily Drop · ' : ''}${c.productIds.length} Verified Bottles</span>
        </div>
        <a href="/celebrity/${escapeHtml(c.slug)}" class="serif-display" style="display:block;font-size:1.45rem;color:var(--text-primary);margin-bottom:3px;">${escapeHtml(c.name)}</a>
        <div class="serif-italic" style="font-size:0.96rem;color:var(--rose-brand);margin-bottom:8px;">${escapeHtml(c.moniker)}</div>
        <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.52;margin-bottom:10px;">${escapeHtml(c.summary)}</p>
        <div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px;">${bottlePills}</div>
        ${c.dupeSwap && c.dupeSwap.savingsNote ? `<div class="mono" style="font-size:0.75rem;color:var(--sage-safe);background:var(--sage-bg);padding:5px 9px;margin-bottom:8px;font-weight:500;">Chemist Swap: ${escapeHtml(c.dupeSwap.savingsNote)}</div>` : ''}
        <div style="font-size:11.5px;color:var(--text-muted);line-height:1.38;">Source: <a href="${escapeHtml(c.sourceUrl)}" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary);text-decoration:underline;font-weight:500;">${escapeHtml(c.sourcePublication)} &#8599;</a> · Independent commentary</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;padding-top:8px;border-top:1px solid var(--border-hairline);">
        <a href="/celebrity/${escapeHtml(c.slug)}" class="mono" style="font-size:0.84rem;color:var(--rose-brand);font-weight:500;">Inspect Full Shelf &rarr;</a>
        <a href="${preloadHref}" class="affiliate-link-pill mono">Load Shelf in Checker &rarr;</a>
      </div>
    </div>`;
  }).join('');

  const bodyHtml = `<section class="section-block" style="padding-top:16px;">
    <div class="container">
      ${renderSiloNavStrip('celebrity')}
      <h1 class="hero-h1" style="font-size:clamp(2.3rem,4vw,3.6rem);margin-bottom:12px;">Iconic Routines: Celebrity Bottles &amp; Morning/Night Layering</h1>
      <p class="hero-sub" style="margin-bottom:16px;">Every serum, barrier cream, and SPF spotted in public vanity tours and beauty interviews, analyzed for pH harmony, morning vs. bedtime timing, and gentle drugstore dupes.</p>
      <div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:14px 18px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;">
          <span class="badge-safe mono">+1 New Routine Daily</span>
          <span style="font-size:0.9rem;color:var(--text-primary);">Today’s Featured Drop: <a href="/celebrity/${escapeHtml(latestDaily.slug)}" style="color:var(--rose-brand);font-weight:500;text-decoration:underline;">${escapeHtml(latestDaily.name)} (${escapeHtml(latestDaily.moniker)})</a></span>
          <span class="mono" style="font-size:0.76rem;color:var(--text-secondary);">· ${escapeHtml(latestDaily.skinProfile)}</span>
        </div>
        <a href="/celebrity/${escapeHtml(latestDaily.slug)}" class="affiliate-link-pill mono">View Today’s Shelf &rarr;</a>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding:12px 16px;background:var(--bg-oat);margin-bottom:18px;" role="group" aria-label="Filter Celebrity Routines by Skin Profile">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button type="button" class="vanity-light-btn active mono celeb-filter-btn" onclick="window.__filterCelebShelves('all',this)" style="padding:6px 12px;font-size:0.78rem;">All Routines (${celebs.length})</button>
          <button type="button" class="vanity-light-btn mono celeb-filter-btn" onclick="window.__filterCelebShelves('acne|breakout|bha|oily|congest',this)" style="padding:6px 12px;font-size:0.78rem;">Breakout &amp; Acne-Prone</button>
          <button type="button" class="vanity-light-btn mono celeb-filter-btn" onclick="window.__filterCelebShelves('dry|eczema|barrier|dehydrat',this)" style="padding:6px 12px;font-size:0.78rem;">Dry &amp; Barrier-Focused</button>
          <button type="button" class="vanity-light-btn mono celeb-filter-btn" onclick="window.__filterCelebShelves('sensitive|rosacea|dermatitis|calm',this)" style="padding:6px 12px;font-size:0.78rem;">Sensitive &amp; Rosacea</button>
          <button type="button" class="vanity-light-btn mono celeb-filter-btn" onclick="window.__filterCelebShelves('tretinoin|retinal|adapalene|vitamin c',this)" style="padding:6px 12px;font-size:0.78rem;">Vitamin C &amp; Retinoids</button>
        </div>
        <a href="/#analyzer" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">Or Check My Own Bottles &rarr;</a>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;margin-bottom:20px;">${cards}</div>
      <div id="celebrity-index-editorial-disclosure" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:12px 16px;gap:4px;">
        <div class="mono" style="font-size:11px;color:var(--rose-brand);font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Editorial Independence, Non-Endorsement &amp; Source Attribution</div>
        <p style="font-size:12px;color:var(--text-secondary);line-height:1.45;margin:0;"><strong>Public Information &amp; Non-Endorsement Notice:</strong> None of the individuals featured above have endorsed, verified, or sponsored DermLogic, this formulation analysis, or any third-party brands and chemist dupes compared here. Compiled strictly from public interviews (<em>Vogue Beauty Secrets</em>, <em>Harper’s Bazaar Go To Bed With Me</em>, <em>Allure</em>) with direct links to original sources. Photography is illustrative.</p>
      </div>
      <script>window.__filterCelebShelves=function(rxStr,btn){document.querySelectorAll('.celeb-filter-btn').forEach(function(b){b.classList.remove('active');});if(btn)btn.classList.add('active');var rx=rxStr==='all'?null:new RegExp(rxStr,'i');document.querySelectorAll('.celeb-routine-card').forEach(function(el){var hay=el.getAttribute('data-celeb-filter')||'';el.style.display=(!rx||rx.test(hay))?'flex':'none';});};</script>
    </div>
  </section>`;

  return renderShell({
    title: 'Iconic Routines: Celebrity Skincare Bottles & Layering Order (2026) | DermLogic',
    description: 'Explore verified celebrity skincare routines (Hailey Bieber, Sydney Sweeney, Sofia Richie Grainge, Margot Robbie, Zendaya & more) with exact bottle layering order and dupes.',
    canonicalPath: '/celebrity',
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skincare Library', href: '/directory' }, { label: 'Iconic Routines', href: '/celebrity' }],
    faqItems: [
      { q: 'How does DermLogic verify celebrity skincare shelves?', a: 'We cross-reference public vanity interviews (Vogue Beauty Secrets, Harper’s Bazaar Go To Bed With Me, Into The Gloss) with our 44-bottle INCI & pH database.' },
      { q: 'Can I load a celebrity routine directly into the Routine Harmony Checker?', a: 'Yes, tap "Load Shelf in Checker" on any celebrity card to test how their bottles interact with your own products.' }
    ],
    bodyHtml
  });
}

const CELEB_STEP_BOTTLES = {
  'hailey-bieber': { am: ['Rhode Glazing Mist + Thermal Water', 'The Ordinary Multi-Peptide + Copper Peptides 1%', 'Aestura Atobarrier 365 + EltaMD UV Clear SPF 46'], pm: ['Rhode Pineapple Refresh Cleanser', 'The Ordinary Multi-Peptide + Copper Peptides 1%', 'Aestura Atobarrier 365 + La Roche-Posay Cicaplast Baume B5+'] },
  'sydney-sweeney': { am: ['La Roche-Posay Toleriane Cleanser', 'SkinCeuticals C E Ferulic 15% Vitamin C', 'COSRX Snail 96 Mucin + Beauty of Joseon Relief Sun SPF 50'], pm: ['Caudalie Vinoclean Cleansing Oil', 'COSRX Advanced Snail 96 Mucin Essence', 'Aestura Atobarrier 365 Cream'] },
  'sofia-richie-grainge': { am: ['Vanicream Gentle Facial Cleanser', 'Tower 28 SOS Daily Rescue Facial Spray', 'La Roche-Posay Cicaplast Baume B5+ + EltaMD UV Clear SPF 46'], pm: ['Vanicream Gentle Facial Cleanser', 'Finacea 15% Azelaic Acid Foam', 'La Roche-Posay Cicaplast Baume B5+'] },
  'emily-ratajkowski': { am: ['Bioderma Sensibio H2O Micellar Water', 'COSRX Advanced Snail 96 Mucin Essence', 'Beauty of Joseon Relief Sun SPF 50+'], pm: ['Bioderma Sensibio H2O Micellar Water', 'Biologique Recherche Lotion P50 1970', 'COSRX Snail 96 Mucin + La Roche-Posay Cicaplast Baume B5+'] },
  'sabrina-carpenter': { am: ['Vanicream Gentle Facial Cleanser', 'Anua Heartleaf 77% Soothing Toner', 'CeraVe PM Lotion + EltaMD UV Clear SPF 46'], pm: ['Bioderma Sensibio H2O + Paula’s Choice 2% BHA', 'Anua Heartleaf 77% Soothing Toner', 'CeraVe PM Facial Moisturizing Lotion'] },
  'madison-beer': { am: ['PanOxyl 10% Benzoyl Peroxide Foaming Wash', 'Anua Heartleaf 77% Soothing Toner', 'Aestura Atobarrier 365 + EltaMD UV Clear SPF 46'], pm: ['Vanicream Gentle Facial Cleanser', 'Differin Adapalene Gel 0.1%', 'Aestura Atobarrier 365 Hydro Cera-HA Cream'] },
  'zendaya': { am: ['Bioderma Sensibio H2O Micellar Water', 'Anua Heartleaf 77% Soothing Toner', 'CeraVe PM Lotion + EltaMD UV Clear SPF 46'], pm: ['Bioderma Sensibio H2O Micellar Water', 'CeraVe PM Facial Moisturizing Lotion', 'La Roche-Posay Cicaplast Baume B5+'] },
  'margot-robbie': { am: ['La Prairie Foam Cleanser + Caudalie Elixir', 'SkinCeuticals C E Ferulic 15% Vitamin C', 'Dieux Instant Angel + Beauty of Joseon Relief Sun SPF 50'], pm: ['Bioderma Sensibio H2O Micellar Water', 'Paula’s Choice 2% BHA Liquid Exfoliant', 'Dieux Skin Instant Angel Lipid Rich Moisturizer'] },
  'selena-gomez': { am: ['Vanicream Gentle Facial Cleanser', 'Sunday Riley Good Genes Lactic Acid + COSRX Snail 96', 'Aestura Atobarrier 365 + Beauty of Joseon SPF 50'], pm: ['Bioderma Sensibio H2O Micellar Water', 'COSRX Advanced Snail 96 Mucin Power Essence', 'Aestura Atobarrier 365 Hydro Cera-HA Cream'] },
  'anne-hathaway': { am: ['Cetaphil Gentle Skin Cleanser', 'SkinCeuticals C E Ferulic 15% Vitamin C', 'Beauty of Joseon Relief Sun Rice + Probiotics SPF 50'], pm: ['Cetaphil Gentle Skin Cleanser', 'Medik8 Crystal Retinal 6 / The Ordinary Copper Peptides 1%', 'Dieux Skin Instant Angel Barrier Cream'] },
  'kendall-jenner': { am: ['Vanicream Gentle Facial Cleanser', 'CeraVe PM Facial Moisturizing Lotion', 'EltaMD UV Clear Broad-Spectrum SPF 46'], pm: ['Vanicream Gentle Facial Cleanser', 'Rx Tretinoin 0.05% Cream', 'Malezia 5% Urea Moisturizer'] },
  'rosie-huntington-whiteley': { am: ['Bioderma Sensibio H2O + Caudalie Beauty Elixir', 'Malezia 5% Urea Moisturizer + Pure Squalane', 'EltaMD UV Clear Broad-Spectrum SPF 46'], pm: ['Bioderma Sensibio H2O + iS Clinical Cleansing Complex', 'Biologique Recherche Lotion P50 1970', 'Dieux Skin Instant Angel Lipid Rich Moisturizer'] }
};

function formatStepWithBottle(stepStr, idx, isPm, bottles, celeb) {
  const cleanBase = String(stepStr || '').replace(/\s*\((?:Wait[^)]*|[^)]*Week|No Acids[^)]*|Press[^)]*|Buffered|Alternating)\)/gi, (m) => m);
  const mapped = CELEB_STEP_BOTTLES[celeb.slug] && CELEB_STEP_BOTTLES[celeb.slug][isPm ? 'pm' : 'am'] && CELEB_STEP_BOTTLES[celeb.slug][isPm ? 'pm' : 'am'][idx];
  const fallbackBottle = !isPm
    ? (idx === 0 ? (bottles.find((b) => /wash|cleans|mist|toner/i.test(b.category + ' ' + b.name)) || bottles[0]) : idx === 1 ? (bottles.find((b) => /serum|essence|toner|acid/i.test(b.category + ' ' + b.name)) || bottles[1] || bottles[0]) : (bottles.find((b) => /spf|sun|moistur|cream/i.test(b.category + ' ' + b.name)) || bottles[bottles.length - 1]))
    : (idx === 0 ? (bottles.find((b) => /wash|cleans|toner/i.test(b.category + ' ' + b.name)) || bottles[0]) : idx === 1 ? (bottles.find((b) => /retin|acid|peptid|bha|p50|acne/i.test(b.category + ' ' + b.name)) || bottles[0]) : (bottles.find((b) => /cream|moistur|baume|angel|atobarrier|lotion/i.test(b.category + ' ' + b.name)) || bottles[bottles.length - 1]));
  const bottleLabel = mapped || (fallbackBottle ? `${fallbackBottle.brand} ${fallbackBottle.name.replace(/\s*\([^)]*\)/g, '')}` : '');
  if (!bottleLabel) return cleanBase;
  const stripped = cleanBase.replace(/\s*\((?:SkinCeuticals[^)]+|PanOxyl[^)]+|5%\s*Niacinamide)\)/gi, '').trim();
  return `${stripped} (${bottleLabel})`;
}

function renderBottleVesselSvg(b) {
  const cat = ((b.category || '') + ' ' + (b.name || '')).toLowerCase();
  if (/toner|exfoli|p50|bha|glycolic|mist|spray|essence|snail|micellar/.test(cat)) {
    return `<svg aria-hidden="true" width="46" height="52" viewBox="0 0 46 52" fill="none"><ellipse cx="23" cy="47" rx="13" ry="2.5" fill="#A46B1D" fill-opacity="0.14"/><rect x="18" y="6" width="10" height="7" rx="1.5" fill="#E9E2D7" stroke="#7D5116" stroke-width="1.3"/><path d="M16 13H30L33 19V43C33 44.6 31.7 46 30 46H16C14.3 46 13 44.6 13 43V19L16 13Z" fill="#FAF6F0" stroke="#7D5116" stroke-width="1.35"/><path d="M14 25H32V43C32 44 31 45 30 45H16C15 45 14 44 14 43V25Z" fill="#F3EAD8" fill-opacity="0.85"/><rect x="16" y="23" width="14" height="14" fill="#FFFFFF" stroke="#7D5116" stroke-opacity="0.5" stroke-width="0.9"/><line x1="19" y1="28" x2="27" y2="28" stroke="#7D5116" stroke-width="1.1"/><line x1="20" y1="32" x2="26" y2="32" stroke="#7D5116" stroke-opacity="0.65" stroke-width="0.9"/></svg>`;
  }
  if (/spf|sun|uv|tretinoin|adapalene|differin|finacea|wash|panoxyl|effaclar/.test(cat)) {
    return `<svg aria-hidden="true" width="46" height="52" viewBox="0 0 46 52" fill="none"><ellipse cx="23" cy="47" rx="13" ry="2.5" fill="#264C3C" fill-opacity="0.14"/><path d="M12 9H34L31 37H15L12 9Z" fill="#FAF6F0" stroke="#264C3C" stroke-width="1.35" stroke-linejoin="round"/><line x1="12" y1="12.5" x2="34" y2="12.5" stroke="#264C3C" stroke-width="1.1"/><rect x="15" y="18" width="16" height="12" fill="#E4EDE8" stroke="#264C3C" stroke-opacity="0.45" stroke-width="0.9"/><line x1="18" y1="22" x2="28" y2="22" stroke="#264C3C" stroke-width="1.1"/><line x1="19" y1="26" x2="27" y2="26" stroke="#264C3C" stroke-opacity="0.65" stroke-width="0.9"/><rect x="18" y="37" width="10" height="8" rx="1.5" fill="#E9E2D7" stroke="#264C3C" stroke-width="1.3"/></svg>`;
  }
  if (/cream|moistur|baume|angel|atobarrier|urea|lotion/.test(cat)) {
    return `<svg aria-hidden="true" width="46" height="52" viewBox="0 0 46 52" fill="none"><ellipse cx="23" cy="46" rx="16" ry="3" fill="#7A2332" fill-opacity="0.12"/><path d="M13 18C16 13 21 11 24 14C27 11 31 13 33 18" stroke="#7A2332" stroke-opacity="0.55" stroke-width="1.3" stroke-linecap="round"/><rect x="9" y="17" width="28" height="6" rx="2" fill="#E9E2D7" stroke="#7A2332" stroke-width="1.3"/><rect x="7" y="23" width="32" height="21" rx="4" fill="#FAF6F0" stroke="#7A2332" stroke-width="1.35"/><rect x="12" y="28" width="22" height="10" fill="#EFE5E7" stroke="#7A2332" stroke-opacity="0.45" stroke-width="0.9"/><line x1="16" y1="32" x2="30" y2="32" stroke="#7A2332" stroke-width="1.1"/><line x1="18" y1="35" x2="28" y2="35" stroke="#7A2332" stroke-opacity="0.6" stroke-width="0.9"/></svg>`;
  }
  return `<svg aria-hidden="true" width="46" height="52" viewBox="0 0 46 52" fill="none"><ellipse cx="23" cy="47" rx="13" ry="2.5" fill="#7A2332" fill-opacity="0.14"/><path d="M20 9C20 6.8 21.3 5 23 5C24.7 5 26 6.8 26 9V13H20V9Z" fill="#7A2332" fill-opacity="0.22" stroke="#7A2332" stroke-width="1.25"/><rect x="17" y="13" width="12" height="4" rx="1" fill="#E9E2D7" stroke="#7A2332" stroke-width="1.25"/><path d="M16 17H30L33 23V43C33 44.7 31.7 46 30 46H16C14.3 46 13 44.7 13 43V23L16 17Z" fill="#FAF6F0" stroke="#7A2332" stroke-width="1.35"/><rect x="16" y="25" width="14" height="14" fill="#EFE5E7" stroke="#7A2332" stroke-opacity="0.5" stroke-width="0.9"/><line x1="23" y1="17" x2="23" y2="25" stroke="#7A2332" stroke-opacity="0.45" stroke-width="1.1"/><line x1="19" y1="30" x2="27" y2="30" stroke="#7A2332" stroke-width="1.1"/><line x1="20" y1="34" x2="26" y2="34" stroke="#7A2332" stroke-opacity="0.65" stroke-width="0.9"/></svg>`;
}

function renderCelebrityDetailPage(celeb) {
  const preloadHref = `/?products=${encodeURIComponent(celeb.productIds.join(','))}#analyzer`;
  const bottles = celeb.productIds.map((id) => CULT_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const actives = celeb.activeIds.map((id) => CLINICAL_INGREDIENTS.find((a) => a.id === id)).filter(Boolean);
  const otherCelebs = getAllCelebrityRoutines().filter((c) => c.slug !== celeb.slug).slice(0, 4);

  const bottleCards = bottles.map((b) => {
    const partner = b.priceUsd >= 50 ? 'dermstore' : 'sephora';
    const roleTag = /Retinoid/i.test(b.category) ? 'Night Renewal · Apply Dry' : /Exfoliating|Acne/i.test(b.category) ? 'Night 1 Polish · Alternate PM' : /Antioxidant/i.test(b.category) ? 'AM Step 2 · Wait 60s' : /Sunscreen/i.test(b.category) ? 'AM Final Step · Zero-Pilling SPF' : /Peptide|Hydrating/i.test(b.category) ? 'AM/PM Hydration · 0/5 Pore-Safe' : 'AM/PM Barrier Seal · Ceramide Cushion';
    return `<div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;position:relative;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <a href="/brand/${slugifyBrand(b.brand)}" class="mono" style="font-size:0.78rem;color:var(--text-secondary);font-weight:500;">${escapeHtml(b.brand)}</a>
          <span class="badge-safe mono">pH ${b.ph} · $${b.priceUsd}</span>
        </div>
        <div class="mono" style="font-size:0.72rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">${roleTag}</div>
        <a href="/bottle/${escapeHtml(b.id)}" class="serif-display" style="display:block;font-size:1.22rem;color:var(--text-primary);margin-bottom:6px;">${escapeHtml(b.name)}</a>
        <p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.5;">${escapeHtml(b.summary)}</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:10px;padding-top:6px;">
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;">
          <a href="/bottle/${escapeHtml(b.id)}" class="mono" style="font-size:0.79rem;color:var(--rose-brand);font-weight:500;">Bottle Breakdown &amp; Dupes &rarr;</a>
          <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
            <a href="/api/affiliate?product=${escapeHtml(b.id)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop ($${b.priceUsd}) &rarr;</a>
            <button type="button" id="dl-bag-btn-${escapeHtml(b.id)}" data-dl-bag-prod="${escapeHtml(b.id)}" data-dl-bag-title="${escapeHtml(b.brand + ' ' + b.name)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(b.id)}','${escapeHtml((b.brand + ' ' + b.name).replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button>
          </div>
        </div>
        <div style="width:54px;height:60px;background:var(--bg-oat);border:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:center;flex-shrink:0;" title="${escapeHtml(b.brand)} ${escapeHtml(b.name)}">${renderBottleVesselSvg(b)}</div>
      </div>
    </div>`;
  }).join('');

  const activePills = actives.map((a) => `<a href="/ingredient/${escapeHtml(a.id)}" class="porcelain-vessel-core" style="background:var(--bg-surface);padding:10px 14px;text-decoration:none;display:inline-flex;flex-direction:column;gap:2px;"><span class="mono" style="font-size:0.72rem;color:var(--rose-brand);">pH ${a.phMin}–${a.phMax} · Pore ${a.comedogenicity}/5</span><strong style="font-size:0.88rem;color:var(--text-primary);">${escapeHtml(a.commonName)} &rarr;</strong><span style="font-size:0.76rem;color:var(--text-secondary);">${escapeHtml(a.functionRole)}</span></a>`).join('');
  const cleanSourceCredit = String(celeb.sourceNote || '').toLowerCase().includes(String(celeb.sourcePublication || '').toLowerCase()) ? celeb.sourceNote : `${celeb.sourcePublication} (${celeb.sourceNote})`;

  const bodyHtml = `<section class="section-block" style="padding-top:16px;">
    <div class="container">
      ${renderSiloNavStrip('celebrity')}
      <div class="editorial-top-banner" style="margin-bottom:22px;">
        <div class="hero-copy-col">
          <div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
              <span class="badge-safe mono">${escapeHtml(celeb.skinProfile)}</span>
              <a href="${escapeHtml(celeb.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="mono" style="font-size:0.8rem;color:var(--rose-brand);text-decoration:underline;font-weight:500;">Public Vanity Source: ${escapeHtml(cleanSourceCredit)} &#8599;</a>
            </div>
            <h1 class="hero-h1" style="font-size:clamp(2.2rem,3.8vw,3.3rem);margin-bottom:10px;">${escapeHtml(celeb.name)} Skincare Routine, Bottles &amp; Layering Order</h1>
            <div class="serif-italic" style="font-size:1.22rem;color:var(--rose-brand);margin-bottom:12px;">${escapeHtml(celeb.moniker)} · ${escapeHtml(celeb.signatureLook)}</div>
            <p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(celeb.summary)}</p>
            <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
              <a href="${preloadHref}" class="btn-primary"><span>Test ${escapeHtml(celeb.name)}’s Serums With My Shelf</span><span class="btn-icon-circle">&rarr;</span></a>
              <a href="#vanity-bottles" class="btn-secondary"><span>See ${bottles.length} Bottles &amp; Chemist Dupes &darr;</span></a>
            </div>
            <div id="editorial-source-attribution" style="background:var(--bg-surface);padding:10px 14px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:3px;">
                <span class="mono" style="font-size:11px;color:var(--rose-brand);font-weight:500;text-transform:uppercase;letter-spacing:0.04em;">Editorial Independence &amp; Source Credit</span>
                <a href="${escapeHtml(celeb.sourceUrl)}" target="_blank" rel="noopener noreferrer" class="mono" style="font-size:11.5px;color:var(--rose-brand);text-decoration:underline;font-weight:500;">Read Original ${escapeHtml(celeb.sourcePublication)} Feature &#8599;</a>
              </div>
              <p style="font-size:12px;color:var(--text-secondary);line-height:1.42;margin:0;"><strong>Non-Endorsement Notice:</strong> ${escapeHtml(celeb.name)} has not endorsed, verified, or sponsored this analysis or any brands compared here. Compiled from public reporting in <a href="${escapeHtml(celeb.sourceUrl)}" target="_blank" rel="noopener noreferrer" style="color:var(--text-primary);text-decoration:underline;font-weight:500;">${escapeHtml(celeb.sourceTitle)} &#8599;</a> for educational skincare commentary.</p>
            </div>
          </div>
        </div>
        <div class="hero-photo-col">
          <div class="editorial-photo-shell">
            <div class="editorial-photo-inner" style="min-height:390px;height:100%;flex:1;">
              <img src="${escapeHtml(celeb.heroImg)}" alt="Illustrative skincare ritual for ${escapeHtml(celeb.name)} routine commentary" style="width:100%;height:100%;object-fit:cover;object-position:${escapeHtml(celeb.imgPos || '50% 25%')};" />
            </div>
            <div class="editorial-photo-caption">
              <div>
                <strong class="serif-display" style="font-size:1.02rem;">Illustrative Editorial Ritual</strong>
                <div style="font-size:0.78rem;color:var(--text-secondary);">Independent DermLogic pH Commentary · Unendorsed</div>
              </div>
              <span class="badge-safe mono" style="white-space:nowrap;align-self:center;flex-shrink:0;">${bottles.length} Publicly Cited Bottles</span>
            </div>
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:20px;margin-bottom:44px;">
        <div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:26px 28px;position:relative;overflow:hidden;justify-content:space-between;">
          <div aria-hidden="true" style="position:absolute;top:0;left:0;right:0;height:112px;pointer-events:none;overflow:hidden;background:radial-gradient(ellipse 68% 95% at 80% 10%, rgba(214,152,58,0.28) 0%, rgba(232,190,118,0.12) 52%, transparent 82%),linear-gradient(90deg, rgba(255,248,234,0.5) 0%, rgba(222,168,84,0.22) 100%);-webkit-mask-image:linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, transparent 100%);mask-image:linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.65) 55%, transparent 100%);">
            <svg width="100%" height="112" viewBox="0 0 640 112" preserveAspectRatio="xMidYMin slice" fill="none"><defs><radialGradient id="amSunGlow" cx="78%" cy="28%" r="48%"><stop offset="0%" stop-color="#D99B38" stop-opacity="0.42"/><stop offset="55%" stop-color="#D99B38" stop-opacity="0.12"/><stop offset="100%" stop-color="#D99B38" stop-opacity="0"/></radialGradient></defs><rect width="640" height="112" fill="url(#amSunGlow)"/><path d="M-20 92 Q 260 44 660 84" stroke="#A46B1D" stroke-opacity="0.22" stroke-width="1.2"/><path d="M-20 104 Q 300 62 660 98" stroke="#A46B1D" stroke-opacity="0.14" stroke-width="1" stroke-dasharray="4 6"/><circle cx="512" cy="34" r="22" fill="#E3A84B" fill-opacity="0.22" stroke="#A46B1D" stroke-opacity="0.42" stroke-width="1.3"/><circle cx="512" cy="34" r="38" stroke="#A46B1D" stroke-opacity="0.22" stroke-width="1" stroke-dasharray="3 5"/><circle cx="512" cy="34" r="58" stroke="#A46B1D" stroke-opacity="0.14" stroke-width="0.9"/><path d="M512 2V10M512 58V66M474 34H482M542 34H550M485 7L491 13M533 55L539 61M539 7L533 13M491 55L485 61M420 22L464 30M360 14L448 26" stroke="#A46B1D" stroke-opacity="0.28" stroke-width="1.15" stroke-linecap="round"/></svg>
          </div>
          <div style="position:relative;z-index:1;">
            <div style="margin-bottom:16px;">
              <span class="mono" style="display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;color:var(--honey-warn);font-weight:500;"><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2.5M12 19v2.5M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2.5 12H5M19 12h2.5M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77"/></svg><span>7:30 AM · Morning Prep Under Makeup</span></span>
              <h2 class="serif-display" style="font-size:1.48rem;margin:5px 0 0;">Morning Layering Sequence</h2>
            </div>
            ${celeb.amSteps.map((s, idx) => `<div style="padding:13px 16px;background:var(--bg-surface);border-left:2.5px solid rgba(164,107,29,0.45);margin-bottom:9px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:3px;"><strong style="font-size:0.93rem;">${escapeHtml(formatStepWithBottle(s.step, idx, false, bottles, celeb))}</strong><span class="mono" style="font-size:0.7rem;padding:2px 7px;background:var(--bg-oat);color:var(--honey-warn);white-space:nowrap;flex-shrink:0;">${idx === 0 ? 'Step 1 · Cleanse' : idx === 1 ? 'Step 2 · Wait 60s' : 'Step 3 · SPF Seal'}</span></div><span style="font-size:0.86rem;color:var(--text-secondary);line-height:1.5;">${escapeHtml(s.detail)}</span></div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;font-size:0.78rem;position:relative;z-index:1;"><span class="mono" style="color:var(--text-secondary);">Zero-Pilling 60s Dry-Down</span><a href="#vanity-bottles" class="mono" style="color:var(--rose-brand);font-weight:600;text-decoration:none;">Inspect Morning Bottles &darr;</a></div>
        </div>
        <div class="porcelain-vessel-core" style="background:#3A1F27;color:#FDF8F6;padding:26px 28px;position:relative;overflow:hidden;justify-content:space-between;">
          <div aria-hidden="true" style="position:absolute;top:0;left:0;right:0;height:112px;pointer-events:none;overflow:hidden;background:radial-gradient(ellipse 68% 95% at 80% 12%, rgba(201,164,90,0.28) 0%, rgba(142,110,56,0.12) 52%, transparent 84%),linear-gradient(90deg, rgba(58,31,39,0.15) 0%, rgba(201,164,90,0.16) 100%);-webkit-mask-image:linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 55%, transparent 100%);mask-image:linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.68) 55%, transparent 100%);">
            <svg width="100%" height="112" viewBox="0 0 640 112" preserveAspectRatio="xMidYMin slice" fill="none"><defs><radialGradient id="pmMoonGlow" cx="78%" cy="28%" r="48%"><stop offset="0%" stop-color="#C9A45A" stop-opacity="0.38"/><stop offset="55%" stop-color="#C9A45A" stop-opacity="0.12"/><stop offset="100%" stop-color="#C9A45A" stop-opacity="0"/></radialGradient></defs><rect width="640" height="112" fill="url(#pmMoonGlow)"/><path d="M-20 88 Q 280 38 660 80" stroke="#C9A45A" stroke-opacity="0.22" stroke-width="1.15"/><path d="M-20 102 Q 310 56 660 96" stroke="#C9A45A" stroke-opacity="0.14" stroke-width="0.95" stroke-dasharray="3 6"/><path d="M518 16C504.5 16 493.5 27 493.5 40.5C493.5 54 504.5 65 518 65C524 65 529.4 62.8 533.6 59.4C524.8 61.3 515.7 55.8 513.8 47C511.9 38.2 517.4 29.1 526.2 27.2C523.6 20.5 521 16 518 16Z" fill="#C9A45A" fill-opacity="0.24" stroke="#C9A45A" stroke-opacity="0.55" stroke-width="1.3"/><circle cx="514" cy="40" r="36" stroke="#C9A45A" stroke-opacity="0.22" stroke-width="0.95" stroke-dasharray="2 5"/><path d="M446 22L448 27L453 29L448 31L446 36L444 31L439 29L444 27L446 22Z" fill="#C9A45A" fill-opacity="0.45"/><path d="M568 20L569.2 23.5L572.7 24.7L569.2 25.9L568 29.4L566.8 25.9L563.3 24.7L566.8 23.5L568 20Z" fill="#C9A45A" fill-opacity="0.4"/><circle cx="388" cy="28" r="1.4" fill="#C9A45A" fill-opacity="0.45"/><circle cx="418" cy="44" r="1.2" fill="#C9A45A" fill-opacity="0.35"/><circle cx="586" cy="48" r="1.4" fill="#C9A45A" fill-opacity="0.4"/></svg>
          </div>
          <div style="position:relative;z-index:1;">
            <div style="margin-bottom:16px;">
              <span class="mono" style="display:inline-flex;align-items:center;gap:6px;font-size:0.82rem;color:#C9A45A;font-weight:500;"><svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/><path d="M18 4l.6 1.9L20.5 6.5l-1.9.6L18 9l-.6-1.9-1.9-.6 1.9-.6L18 4z"/></svg><span>9:30 PM · Bedtime Barrier Recovery</span></span>
              <h2 class="serif-display" style="font-size:1.48rem;margin:5px 0 0;color:#F4EFE8;">Evening Recovery Sequence</h2>
            </div>
            ${celeb.pmSteps.map((s, idx) => `<div style="padding:13px 16px;background:rgba(244,239,232,0.08);border-left:2.5px solid rgba(201,164,90,0.5);margin-bottom:9px;"><div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:3px;"><strong style="font-size:0.93rem;color:#F4EFE8;">${escapeHtml(formatStepWithBottle(s.step, idx, true, bottles, celeb))}</strong><span class="mono" style="font-size:0.7rem;padding:2px 7px;background:rgba(201,164,90,0.2);color:#E5C67E;white-space:nowrap;flex-shrink:0;">${idx === 0 ? 'Step 1 · Melt' : idx === 1 ? 'Step 2 · Treatment' : 'Step 3 · Cushion'}</span></div><span style="font-size:0.86rem;color:#B5ACA3;line-height:1.5;">${escapeHtml(s.detail)}</span></div>`).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;font-size:0.78rem;position:relative;z-index:1;"><span class="mono" style="color:#B5ACA3;">Overnight Barrier Recovery</span><a href="${preloadHref}" class="mono" style="color:#E5C67E;font-weight:600;text-decoration:none;">Load AM/PM in Checker &rarr;</a></div>
        </div>
      </div>

      <h2 id="vanity-bottles" class="serif-display" style="font-size:1.75rem;margin-bottom:16px;">Bottles on ${escapeHtml(celeb.name)}’s Vanity Shelf</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:18px;margin-bottom:44px;">${bottleCards}</div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:20px;margin-bottom:44px;">
        <div class="porcelain-vessel-core" style="background:var(--berry-bg);padding:26px 28px;position:relative;overflow:hidden;border:1px solid var(--berry-border);justify-content:space-between;">
          <div aria-hidden="true" style="position:absolute;top:0;left:0;right:0;height:96px;pointer-events:none;background:radial-gradient(ellipse 65% 90% at 84% 12%,rgba(139,38,53,0.14) 0%,transparent 75%);"><svg width="100%" height="96" viewBox="0 0 560 96" preserveAspectRatio="xMaxYMin slice" fill="none"><circle cx="486" cy="34" r="24" stroke="#8B2635" stroke-opacity="0.22" stroke-width="1.2" stroke-dasharray="3 4"/><circle cx="458" cy="46" r="20" stroke="#8B2635" stroke-opacity="0.18" stroke-width="1.1"/><path d="M466 30L478 50M478 30L466 50" stroke="#8B2635" stroke-opacity="0.34" stroke-width="1.5" stroke-linecap="round"/></svg></div>
          <div style="position:relative;z-index:1;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <span class="badge-clash mono" style="display:inline-flex;align-items:center;gap:6px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>Critical Layering Rule</span>
              <span class="mono" style="font-size:0.72rem;color:var(--berry-clash);letter-spacing:0.06em;text-transform:uppercase;">· pH Barrier Guardrail</span>
            </div>
            <h3 class="serif-display" style="font-size:1.38rem;margin:0 0 12px;">What Never to Mix on ${escapeHtml(celeb.name)}’s Shelf</h3>
            <div style="background:var(--bg-surface);border-left:3px solid var(--berry-clash);border-radius:10px;padding:14px 16px;margin-bottom:14px;">
              <p style="font-size:0.91rem;color:var(--text-primary);line-height:1.6;margin:0;">${escapeHtml(celeb.clashWarning)}</p>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.78rem;color:var(--text-secondary);position:relative;z-index:1;">
            <span class="mono">Wait Window: 15 to 20 mins or Alternate PM</span>
            <a href="${preloadHref}" class="mono" style="color:var(--berry-clash);font-weight:600;text-decoration:none;">Test Shelf Harmony &rarr;</a>
          </div>
        </div>
        <div class="porcelain-vessel-core" style="background:var(--sage-bg);padding:26px 28px;position:relative;overflow:hidden;border:1px solid var(--sage-border);justify-content:space-between;">
          <div aria-hidden="true" style="position:absolute;top:0;left:0;right:0;height:96px;pointer-events:none;background:radial-gradient(ellipse 65% 90% at 84% 12%,rgba(46,90,68,0.14) 0%,transparent 75%);"><svg width="100%" height="96" viewBox="0 0 560 96" preserveAspectRatio="xMaxYMin slice" fill="none"><rect x="448" y="18" width="22" height="36" rx="5" stroke="#2E5A44" stroke-opacity="0.22" stroke-width="1.2"/><rect x="486" y="18" width="22" height="36" rx="5" stroke="#2E5A44" stroke-opacity="0.32" stroke-width="1.2" fill="#2E5A44" fill-opacity="0.08"/><path d="M474 36H482" stroke="#2E5A44" stroke-opacity="0.4" stroke-width="1.4" stroke-linecap="round"/></svg></div>
          <div style="position:relative;z-index:1;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <span class="badge-safe mono" style="display:inline-flex;align-items:center;gap:6px;"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>Chemist Dupe Comparison</span>
              <span class="mono" style="font-size:0.72rem;color:var(--sage-safe);letter-spacing:0.06em;text-transform:uppercase;">· Ingredient Label (INCI) Match</span>
            </div>
            <h3 class="serif-display" style="font-size:1.38rem;margin:0 0 12px;">Luxury Shelf vs. Barrier-Identical Swap</h3>
            <div style="display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:12px;">
              <div style="background:var(--bg-surface);border:1px solid var(--border-hairline);border-radius:10px;padding:10px 13px;"><span class="mono" style="display:block;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--text-muted);margin-bottom:2px;">Luxury Original</span><strong style="font-size:0.88rem;color:var(--text-primary);">${escapeHtml(celeb.dupeSwap.luxury)}</strong></div>
              <div style="background:var(--bg-surface);border:1px solid var(--sage-border);border-left:3px solid var(--sage-safe);border-radius:10px;padding:10px 13px;"><span class="mono" style="display:block;font-size:0.68rem;text-transform:uppercase;letter-spacing:0.06em;color:var(--sage-safe);margin-bottom:2px;">Chemist Barrier-Identical Swap</span><strong style="font-size:0.88rem;color:var(--text-primary);">${escapeHtml(celeb.dupeSwap.gentleDupe)}</strong></div>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;position:relative;z-index:1;">
            <span class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:600;background:rgba(46,90,68,0.09);padding:6px 11px;border-radius:999px;">${escapeHtml(celeb.dupeSwap.savingsNote)}</span>
            <a href="${preloadHref}" class="mono" style="font-size:0.78rem;color:var(--sage-safe);font-weight:600;text-decoration:none;">Test Dupe Shelf &rarr;</a>
          </div>
        </div>
      </div>

      <h2 class="serif-display" style="font-size:1.55rem;margin-bottom:12px;">Key Active Ingredients in This Routine</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:34px;">${activePills}</div>

      <h2 class="serif-display" style="font-size:1.55rem;margin-bottom:14px;">Explore More Iconic Routines by Skin Type</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:14px;">
        ${otherCelebs.map((o) => `<a href="/celebrity/${escapeHtml(o.slug)}" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:18px 20px;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;gap:8px;"><div><span class="badge-safe mono" style="font-size:0.7rem;margin-bottom:6px;display:inline-block;">${escapeHtml(o.skinProfile)}</span><strong class="serif-display" style="font-size:1.2rem;display:block;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(o.name)}</strong><span style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(o.moniker)}</span></div><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;">Inspect Routine &rarr;</span></a>`).join('')}
      </div>
    </div>
  </section>`;

  return renderShell({
    title: `${celeb.name} Skincare Routine, Bottles, Actives & Dupes | DermLogic`,
    description: `${celeb.name}'s morning and evening skincare shelf (${celeb.moniker}): exact bottles, layering wait times, clash alerts, and affordable chemist dupes.`,
    canonicalPath: `/celebrity/${celeb.slug}`,
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Iconic Routines', href: '/celebrity' }, { label: celeb.name, href: `/celebrity/${celeb.slug}` }],
    faqItems: [
      { q: `What skincare products does ${celeb.name} use?`, a: `${celeb.name}'s routine centers on ${bottles.map((b) => `${b.brand} ${b.name}`).join(', ')}. ${celeb.summary}` },
      { q: `What should you avoid mixing in ${celeb.name}'s skincare routine?`, a: celeb.clashWarning },
      { q: `What is an affordable dupe for ${celeb.name}'s routine?`, a: `${celeb.dupeSwap.gentleDupe} (${celeb.dupeSwap.savingsNote}).` }
    ],
    bodyHtml
  });
}

function renderBottleIndexPage() {
  const cards = CULT_PRODUCTS.map((b) => {
    const celebUsers = getAllCelebrityRoutines().filter((c) => c.productIds.includes(b.id));
    return `<div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
          <a href="/brand/${slugifyBrand(b.brand)}" class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">${escapeHtml(b.brand)}</a>
          <span class="badge-safe mono">pH ${b.ph} · $${b.priceUsd}</span>
        </div>
        <a href="/bottle/${escapeHtml(b.id)}" class="serif-display" style="display:block;font-size:1.3rem;color:var(--text-primary);margin-bottom:8px;">${escapeHtml(b.name)}</a>
        <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.55;">${escapeHtml(b.summary)}</p>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:6px;">
        <a href="/bottle/${escapeHtml(b.id)}" class="mono" style="font-size:0.82rem;color:var(--rose-brand);font-weight:500;">Layering &amp; Dupes &rarr;</a>
        <button type="button" id="dl-bag-btn-${escapeHtml(b.id)}" data-dl-bag-prod="${escapeHtml(b.id)}" data-dl-bag-title="${escapeHtml(b.brand + ' ' + b.name)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(b.id)}','${escapeHtml((b.brand + ' ' + b.name).replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button>
      </div>
    </div>`;
  }).join('');

  return renderShell({
    title: `${CULT_PRODUCTS.length} Cult Skincare Bottles: pH, Layering Order, Clashes & Dupes | DermLogic`,
    description: `Complete formulation index of ${CULT_PRODUCTS.length} cult skincare serums, toners, retinoids, and barrier creams with exact pH, wait times, celebrity shelves, and dupes.`,
    canonicalPath: '/bottle',
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skincare Library', href: '/directory' }, { label: 'Cult Bottles', href: '/bottle' }],
    faqItems: [{ q: 'How are DermLogic bottle guides structured?', a: 'Every bottle includes its verified pH window, primary actives, pore-safety check, celebrity shelves using it, and budget/luxury dupes.' }],
    bodyHtml: `<section class="section-block" style="padding-top:16px;"><div class="container">${renderSiloNavStrip('bottle')}<h1 class="hero-h1" style="font-size:clamp(2.3rem,4vw,3.5rem);margin-bottom:12px;">${CULT_PRODUCTS.length} Cult Skincare Bottles: Layering Order &amp; Dupe Library</h1><p class="hero-sub" style="margin-bottom:26px;">Click any bottle to see what never to layer with it, how long to wait before your next step, which celebrities keep it on their vanity, and chemist-verified dupes.</p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;">${cards}</div></div></section>`
  });
}

function renderBottleDetailPage(prod) {
  const actives = (prod.primaryActives || []).map((id) => CLINICAL_INGREDIENTS.find((a) => a.id === id)).filter(Boolean);
  const celebUsers = getAllCelebrityRoutines().filter((c) => c.productIds.includes(prod.id));
  const dupeInfo = findDupeForProduct(prod);
  const partner = prod.priceUsd >= 50 ? 'dermstore' : 'sephora';
  const isNightOnly = prod.category.toLowerCase().includes('retin') || prod.category.toLowerCase().includes('peel') || prod.ph < 3.7 && prod.id.includes('glycolic');
  const timingSlot = isNightOnly ? '9:30 PM · Bedtime Routine Only (Wear SPF Next Morning)' : (prod.ph <= 3.6 ? '7:30 AM · Morning First Layer on Dry Skin (Wait 60s)' : 'Morning & Bedtime Friendly');
  const shortBottleName = String(prod.name).replace(/\s*\(.*?\)/g, '').trim();

  const bodyHtml = `<section class="section-block" style="padding-top:16px;">
    <div class="container">
      ${renderSiloNavStrip('bottle')}
      <div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:28px 32px;margin-bottom:26px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;align-items:center;">
        <div>
          <h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,2.9rem);margin-bottom:10px;">${escapeHtml(prod.brand)} ${escapeHtml(shortBottleName)}</h1>
          <div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
            <a href="/brand/${slugifyBrand(prod.brand)}" class="badge-safe mono" style="text-decoration:none;">Brand Hub: ${escapeHtml(prod.brand)} &rarr;</a>
            <span class="mono" style="font-size:0.86rem;color:var(--rose-brand);font-weight:500;">${escapeHtml(prod.category)} · pH ${prod.ph} · $${prod.priceUsd}</span>
          </div>
          <p class="hero-sub" style="margin-bottom:18px;">${escapeHtml(prod.summary)}</p>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
            <a href="/?products=${escapeHtml(prod.id)}#analyzer" class="btn-primary"><span>Test This Bottle with My Shelf</span><span class="btn-icon-circle">&rarr;</span></a>
            <a href="/api/affiliate?product=${escapeHtml(prod.id)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="btn-secondary"><span>Shop at ${partner === 'dermstore' ? 'Dermstore' : 'Sephora'} ($${prod.priceUsd}) &rarr;</span></a>
            <button type="button" id="dl-bag-btn-${escapeHtml(prod.id)}" data-dl-bag-prod="${escapeHtml(prod.id)}" data-dl-bag-title="${escapeHtml(prod.brand + ' ' + shortBottleName)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(prod.id)}','${escapeHtml((prod.brand + ' ' + shortBottleName).replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <img src="${isNightOnly ? '/public/editorial-segment-3.jpg' : '/public/editorial-segment-1.jpg'}" alt="${escapeHtml(prod.brand)} ${escapeHtml(shortBottleName)} skincare segment ritual" loading="eager" style="width:100%;height:190px;object-fit:cover;object-position:center 22%;border-radius:10px;" />
          <img src="${isNightOnly ? '/public/editorial-woman-evening.jpg' : '/public/editorial-woman-morning.jpg'}" alt="${escapeHtml(prod.brand)} ${escapeHtml(shortBottleName)} vanity layering ritual" loading="lazy" style="width:100%;height:190px;object-fit:cover;object-position:center 22%;border-radius:10px;" />
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-bottom:28px;">
        <div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:22px 24px;">
          <span class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">When &amp; How to Layer</span>
          <h2 class="serif-display" style="font-size:1.35rem;margin:6px 0 10px;">${timingSlot}</h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.58;margin-bottom:10px;">Formulated at <strong>pH ${prod.ph}</strong>. ${prod.ph <= 3.8 ? 'Give this bottle 60 full seconds to absorb before applying neutral creams or peptides so you do not trigger a warm flush or cancel out delicate actives.' : 'Sits comfortably near skin’s natural barrier pH and layers smoothly under moisturizer or sunscreen.'}</p>
          <div class="mono" style="font-size:0.8rem;color:var(--text-muted);">Full Bottle Ingredient List (INCI Label): ${escapeHtml(prod.inciList)}</div>
        </div>
        <div class="porcelain-vessel-core" style="background:var(--sage-bg);padding:22px 24px;">
          <span class="badge-safe mono" style="margin-bottom:8px;display:inline-block;">${escapeHtml(dupeInfo.type)}</span>
          <h2 class="serif-display" style="font-size:1.35rem;margin-bottom:8px;"><a href="/bottle/${escapeHtml(dupeInfo.bottle.id)}">${escapeHtml(dupeInfo.bottle.brand)} ${escapeHtml(dupeInfo.bottle.name)} ($${dupeInfo.bottle.priceUsd})</a></h2>
          <p style="font-size:0.9rem;color:var(--text-secondary);line-height:1.55;margin-bottom:10px;">${escapeHtml(dupeInfo.bottle.summary)}</p>
          <a href="/bottle/${escapeHtml(dupeInfo.bottle.id)}" class="mono" style="font-size:0.84rem;color:var(--sage-safe);font-weight:500;">Compare pH ${dupeInfo.bottle.ph} Formulation &rarr;</a>
        </div>
      </div>

      <h2 class="serif-display" style="font-size:1.6rem;margin-bottom:12px;">Key Active Ingredients Inside This Bottle</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px;margin-bottom:28px;">
        ${actives.map((a) => `<a href="/ingredient/${escapeHtml(a.id)}" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:18px 20px;text-decoration:none;"><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);">pH ${a.phMin}–${a.phMax} · Comedogenic ${a.comedogenicity}/5</span><strong class="serif-display" style="font-size:1.22rem;display:block;margin:4px 0;">${escapeHtml(a.commonName)}</strong><span style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(a.functionRole)} &rarr;</span></a>`).join('')}
      </div>

      ${celebUsers.length > 0 ? `<h2 class="serif-display" style="font-size:1.6rem;margin-bottom:12px;">Spotted in Iconic Routines</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:24px;">
        ${celebUsers.map((c) => `<a href="/celebrity/${escapeHtml(c.slug)}" class="porcelain-vessel-core" style="background:var(--bg-surface);padding:20px 22px;text-decoration:none;"><span class="badge-safe mono" style="margin-bottom:6px;display:inline-block;">${escapeHtml(c.skinProfile)}</span><strong class="serif-display" style="font-size:1.25rem;display:block;margin-bottom:4px;">${escapeHtml(c.name)}</strong><span style="font-size:0.86rem;color:var(--text-secondary);">${escapeHtml(c.moniker)} &rarr;</span></a>`).join('')}
      </div>` : ''}
    </div>
  </section>`;

  const inciCount = String(prod.inciList || '').split(',').filter(Boolean).length;
  return renderShell({
    title: `${prod.brand} ${prod.name}: pH ${prod.ph}, Full INCI (${inciCount}), Layering & Dupes | DermLogic`,
    description: `Verified pH ${prod.ph} & full INCI ingredient list (${inciCount} ingredients) for ${prod.brand} ${prod.name} ($${prod.priceUsd}): AM/PM layering order, what not to mix, and chemist dupes.`,
    canonicalPath: `/bottle/${prod.id}`,
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Cult Bottles', href: '/bottle' }, { label: `${prod.brand} ${prod.name}`, href: `/bottle/${prod.id}` }],
    faqItems: [
      { q: `What is the pH of ${prod.brand} ${prod.name}?`, a: `${prod.brand} ${prod.name} is formulated at pH ${prod.ph} with primary actives ${actives.map((a) => a.commonName).join(', ')}.` },
      { q: `What is the full INCI ingredient list of ${prod.brand} ${prod.name}?`, a: `${prod.brand} ${prod.name} (pH ${prod.ph}, ${inciCount} ingredients) contains: ${prod.inciList}.` },
      { q: `When should I apply ${prod.brand} ${prod.name} in my routine?`, a: `${timingSlot}. ${prod.summary}` }
    ],
    bodyHtml
  });
}

function renderIngredientIndexPage() {
  const cards = CLINICAL_INGREDIENTS.map((a) => {
    const bottleCount = CULT_PRODUCTS.filter((p) => (p.primaryActives || []).includes(a.id)).length;
    return `<a href="/ingredient/${escapeHtml(a.id)}" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:20px 22px;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;gap:10px;"><div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;"><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;">pH ${a.phMin}–${a.phMax}</span><span class="badge-safe mono">Pore Score ${a.comedogenicity}/5</span></div><strong class="serif-display" style="font-size:1.25rem;display:block;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(a.commonName)}</strong><p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.5;">${escapeHtml(a.clinicalMechanism)}</p></div><div class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">Found in ${bottleCount} Cult ${bottleCount === 1 ? 'Bottle' : 'Bottles'} &rarr;</div></a>`;
  }).join('');
  return renderShell({
    title: '65 Clinical Skincare Ingredients: pH Windows, Pore-Safety & Layering | DermLogic',
    description: 'Browse all 65 skincare active ingredients by pH window, comedogenic pore-clogging rating, fungal-acne safety, and compatible bottles.',
    canonicalPath: '/ingredient',
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skincare Library', href: '/directory' }, { label: 'Active Ingredients', href: '/ingredient' }],
    faqItems: [{ q: 'How does DermLogic rate ingredient pore safety?', a: 'Each of the 65 compounds is scored 0–5 for comedogenicity and checked for Malassezia fungal-acne triggers.' }],
    bodyHtml: `<section class="section-block" style="padding-top:16px;"><div class="container">${renderSiloNavStrip('ingredient')}<h1 class="hero-h1" style="font-size:clamp(2.3rem,4vw,3.5rem);margin-bottom:12px;">65 Active Skincare Ingredients: pH, Pore Safety &amp; Layering</h1><p class="hero-sub" style="margin-bottom:26px;">Select any active ingredient to see every cult bottle that contains it, which celebrity shelves feature it, and what never to mix on the same night.</p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:16px;">${cards}</div></div></section>`
  });
}

function renderIngredientDetailPage(ing) {
  const bottles = CULT_PRODUCTS.filter((p) => (p.primaryActives || []).includes(ing.id));
  const celebs = getAllCelebrityRoutines().filter((c) => c.activeIds.includes(ing.id));
  const bodyHtml = `<section class="section-block" style="padding-top:16px;"><div class="container">${renderSiloNavStrip('ingredient')}
    <div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:28px 32px;margin-bottom:26px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;align-items:center;">
      <div>
        <h1 class="hero-h1" style="font-size:clamp(2rem,3.4vw,2.9rem);margin-bottom:10px;">${escapeHtml(ing.commonName)} Layering Guide</h1>
        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px;"><span class="badge-safe mono">Optimal pH ${ing.phMin}–${ing.phMax}</span><span class="badge-safe mono">Pore-Clog Score: ${ing.comedogenicity}/5</span><span class="mono" style="font-size:0.82rem;color:var(--text-secondary);">Bottle Label (INCI): ${escapeHtml(ing.inciName)} · Fungal Acne: ${ing.malasseziaTrigger ? 'Trigger' : '100% Safe'}</span></div>
        <p class="hero-sub" style="margin-bottom:16px;"><strong>Role:</strong> ${escapeHtml(ing.functionRole)}. ${escapeHtml(ing.clinicalMechanism)}</p>
        <a href="/?inci=${encodeURIComponent(ing.inciName)}#analyzer" class="btn-primary"><span>Test ${escapeHtml(ing.commonName)} in Routine Checker</span><span class="btn-icon-circle">&rarr;</span></a>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;"><img src="/public/editorial-segment-2.jpg" alt="${escapeHtml(ing.commonName)} clinical pH and INCI consultation" loading="eager" style="width:100%;height:185px;object-fit:cover;object-position:center 22%;border-radius:10px;" /><img src="/public/editorial-woman-morning.jpg" alt="${escapeHtml(ing.commonName)} morning and evening routine compatibility" loading="lazy" style="width:100%;height:185px;object-fit:cover;object-position:center 22%;border-radius:10px;" /></div>
    </div>
    <h2 class="serif-display" style="font-size:1.6rem;margin-bottom:14px;">Cult Bottles Formulated with ${escapeHtml(ing.commonName)} (${bottles.length})</h2>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:28px;">${bottles.length > 0 ? bottles.map((b) => `<a href="/bottle/${escapeHtml(b.id)}" class="porcelain-vessel-core" style="background:var(--bg-surface);padding:20px 22px;text-decoration:none;"><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);">${escapeHtml(b.brand)} · pH ${b.ph} · $${b.priceUsd}</span><strong class="serif-display" style="font-size:1.22rem;display:block;margin:4px 0;">${escapeHtml(b.name)}</strong><span style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(b.summary)}</span></a>`).join('') : `<div style="padding:18px;background:var(--bg-surface);">Paste "${escapeHtml(ing.inciName)}" into our <a href="/#analyzer" style="color:var(--rose-brand);text-decoration:underline;">Ingredient List (INCI) Checker</a> to test any custom bottle.</div>`}</div>
    ${celebs.length > 0 ? `<h2 class="serif-display" style="font-size:1.6rem;margin-bottom:14px;">Iconic Routines Using ${escapeHtml(ing.commonName)}</h2><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;">${celebs.map((c) => `<a href="/celebrity/${escapeHtml(c.slug)}" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:18px 20px;text-decoration:none;"><strong class="serif-display" style="font-size:1.22rem;display:block;margin-bottom:4px;">${escapeHtml(c.name)}</strong><span style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(c.moniker)} &rarr;</span></a>`).join('')}</div>` : ''}
  </div></section>`;
  return renderShell({
    title: `${ing.commonName} (${ing.inciName}): pH ${ing.phMin}–${ing.phMax}, Comedogenic (${ing.comedogenicity}/5) & Layering | DermLogic`,
    description: `Can you layer ${ing.commonName} (${ing.inciName})? Verified pH ${ing.phMin}–${ing.phMax}, pore-clogging rating (${ing.comedogenicity}/5), fungal-acne status (${ing.malasseziaTrigger ? 'Trigger' : '100% Safe'}), and ${bottles.length} cult bottles.`,
    canonicalPath: `/ingredient/${ing.id}`,
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Active Ingredients', href: '/ingredient' }, { label: ing.commonName, href: `/ingredient/${ing.id}` }],
    faqItems: [{ q: `Is ${ing.commonName} pore-clogging or fungal-acne safe?`, a: `${ing.commonName} has a comedogenicity rating of ${ing.comedogenicity}/5 and is ${ing.malasseziaTrigger ? 'a potential Malassezia trigger' : '100% fungal-acne safe'}.` }],
    bodyHtml
  });
}

function renderBrandIndexPage() {
  const brands = getAllBrandHubs();
  const cards = brands.map((b) => `<a href="/brand/${escapeHtml(b.slug)}" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:22px 24px;text-decoration:none;"><span class="badge-safe mono" style="margin-bottom:8px;display:inline-block;">${b.products.length} Verified ${b.products.length === 1 ? 'Bottle' : 'Bottles'}</span><strong class="serif-display" style="font-size:1.38rem;display:block;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(b.name)}</strong><span style="font-size:0.86rem;color:var(--text-secondary);">${b.products.map((p) => p.name).join(' · ')}</span></a>`).join('');
  return renderShell({
    title: 'Skincare Brands Directory: pH, Layering Order & Cult Bottles | DermLogic',
    description: 'Browse clinical skincare brands (SkinCeuticals, The Ordinary, La Roche-Posay, Aestura, Paula’s Choice, Medik8 & more) by bottle pH and routine compatibility.',
    canonicalPath: '/brand',
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skincare Library', href: '/directory' }, { label: 'Skincare Brands', href: '/brand' }],
    faqItems: [],
    bodyHtml: `<section class="section-block" style="padding-top:16px;"><div class="container">${renderSiloNavStrip('brand')}<h1 class="hero-h1" style="font-size:clamp(2.3rem,4vw,3.5rem);margin-bottom:12px;">Skincare Brands: Formulation &amp; pH Hub</h1><p class="hero-sub" style="margin-bottom:26px;">Explore every brand in the DermLogic catalog to check bottle pH values, active conflicts, and 1-tap routine presets.</p><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">${cards}</div></div></section>`
  });
}

function renderBrandDetailPage(brandHub) {
  const preloadHref = `/?products=${encodeURIComponent(brandHub.products.map((p) => p.id).join(','))}#analyzer`;
  const cards = brandHub.products.map((b) => `<div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;"><div><span class="badge-safe mono" style="margin-bottom:6px;display:inline-block;">${escapeHtml(b.category)} · pH ${b.ph} · $${b.priceUsd}</span><a href="/bottle/${escapeHtml(b.id)}" class="serif-display" style="display:block;font-size:1.3rem;margin-bottom:6px;">${escapeHtml(b.name)}</a><p style="font-size:0.88rem;color:var(--text-secondary);">${escapeHtml(b.summary)}</p></div><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><a href="/bottle/${escapeHtml(b.id)}" class="mono" style="font-size:0.84rem;color:var(--rose-brand);font-weight:500;">View Bottle Guide &amp; Dupes &rarr;</a><button type="button" id="dl-bag-btn-${escapeHtml(b.id)}" data-dl-bag-prod="${escapeHtml(b.id)}" data-dl-bag-title="${escapeHtml(b.brand + ' ' + b.name)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(b.id)}','${escapeHtml((b.brand + ' ' + b.name).replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button></div></div>`).join('');
  return renderShell({
    title: `${brandHub.name} Skincare Layering Guide, Bottle pH & Clashes | DermLogic`,
    description: `How to layer ${brandHub.name} bottles (${brandHub.products.map((p) => p.name).join(', ')}): verified pH levels, wait times, and routine compatibility.`,
    canonicalPath: `/brand/${brandHub.slug}`,
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skincare Brands', href: '/brand' }, { label: brandHub.name, href: `/brand/${brandHub.slug}` }],
    faqItems: [{ q: `Can I layer ${brandHub.name} products together?`, a: `Use our 1-tap checker to test ${brandHub.name} bottles alongside your other serums and retinoids.` }],
    bodyHtml: `<section class="section-block" style="padding-top:16px;"><div class="container">${renderSiloNavStrip('brand')}<div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:28px 32px;margin-bottom:24px;"><h1 class="hero-h1" style="font-size:clamp(2.1rem,3.6vw,3.2rem);margin-bottom:10px;">${escapeHtml(brandHub.name)}: Bottle pH &amp; Layering Guide</h1><p class="hero-sub" style="margin-bottom:16px;">Complete formulation breakdown for ${brandHub.products.length} ${escapeHtml(brandHub.name)} ${brandHub.products.length === 1 ? 'bottle' : 'bottles'} in the DermLogic catalog.</p><a href="${preloadHref}" class="btn-primary"><span>Load ${escapeHtml(brandHub.name)} in Routine Checker</span><span class="btn-icon-circle">&rarr;</span></a></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:18px;">${cards}</div></div></section>`
  });
}

function renderConcernIndexPage() {
  const cards = CONCERN_HUBS.map((c) => {
    const cBottles = c.productIds.map((id) => CULT_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
    const bottleListStr = cBottles.map((b) => `${b.brand} ${b.name.replace(/\s*\([^)]*\)/g, '').slice(0, 20)}`).join(' · ');
    const cCelebs = (c.celebSlugs || []).map((s) => getAllCelebrityRoutines().find((ce) => ce.slug === s)).filter(Boolean);
    return `<div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:22px 24px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
      <div>
        <div class="vessel-photo-frame" style="height:195px;margin-bottom:12px;position:relative;"><img src="${escapeHtml(c.heroImg || '/public/editorial-woman-morning.jpg')}" alt="${escapeHtml(c.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:50% 28%;" /><span class="mono" style="position:absolute;bottom:8px;right:8px;padding:3px 8px;border-radius:999px;background:rgba(58,31,39,0.78);color:#FDF8F6;font-size:0.7rem;">3-Step Protocol · ${c.productIds.length} Bottles</span></div>
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:6px;">
          <span class="badge-safe mono">${escapeHtml(c.badge)}</span>
          ${cCelebs.length > 0 ? `<span class="mono" style="font-size:0.74rem;color:var(--text-secondary);">Worn by ${escapeHtml(cCelebs.slice(0, 2).map((ce) => ce.name).join(', '))}</span>` : ''}
        </div>
        <a href="/concern/${escapeHtml(c.slug)}" class="serif-display" style="display:block;font-size:1.38rem;margin-bottom:6px;color:var(--text-primary);">${escapeHtml(c.title)}</a>
        <p style="font-size:0.88rem;color:var(--text-secondary);line-height:1.54;margin-bottom:10px;">${escapeHtml(c.summary)}</p>
        <div style="background:var(--berry-bg);border-left:2.5px solid var(--rose-brand);padding:8px 10px;font-size:0.8rem;line-height:1.45;margin-bottom:9px;color:var(--text-primary);"><strong class="mono" style="color:var(--rose-brand);font-size:0.72rem;text-transform:uppercase;">Avoid:</strong> ${escapeHtml(c.avoidNote)}</div>
        <div style="background:var(--bg-surface);padding:7px 10px;font-size:0.78rem;color:var(--text-secondary);"><strong class="mono" style="color:var(--text-primary);font-size:0.72rem;">Verified Lineup:</strong> ${escapeHtml(bottleListStr)}</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:8px;border-top:1px solid var(--border-hairline);">
        <a href="/concern/${escapeHtml(c.slug)}" class="mono" style="font-size:0.84rem;color:var(--rose-brand);font-weight:500;">Open Step-by-Step Protocol &rarr;</a>
        <a href="/?products=${encodeURIComponent(c.productIds.join(','))}#analyzer" class="affiliate-link-pill mono">Test ${c.productIds.length} Bottles in Checker &rarr;</a>
      </div>
    </div>`;
  }).join('');

  return renderShell({
    title: 'Skincare Concerns & Routine Scenarios: No-Pilling, Barrier Reset & Pregnancy Swaps | DermLogic',
    description: 'Step-by-step clinical protocols for morning makeup pilling, pregnancy-safe retinol swaps, the Tretinoin sandwich method, 72-hour barrier repair, and fungal acne.',
    canonicalPath: '/concern',
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skincare Library', href: '/directory' }, { label: 'Skin Concerns', href: '/concern' }],
    faqItems: [
      { q: 'Should I fix a stinging skin barrier before resuming Vitamin C or Retinol?', a: 'Yes. If lukewarm water or moisturizer stings your cheeks, pause all Vitamin C, AHAs/BHAs, and retinoids and follow the 72-Hour Damaged Skin Barrier Reset first.' },
      { q: 'Why does my concealer or sunscreen pill over morning serums?', a: 'Pilling happens when thick polymers or silicones are layered over damp low-pH serums before they settle. Wait 60 full seconds after Vitamin C or hydrating serums before applying cream and SPF.' }
    ],
    bodyHtml: `<section class="section-block" style="padding-top:16px;"><div class="container">${renderSiloNavStrip('concern')}<h1 class="hero-h1" style="font-size:clamp(2.3rem,4vw,3.5rem);margin-bottom:12px;">Skin Concerns &amp; Step-by-Step Routine Protocols</h1><p class="hero-sub" style="margin-bottom:16px;">Targeted routines for real-life vanity emergencies, from concealer pilling at 7:30 AM to over-exfoliated barriers and pregnancy-safe swaps.</p><div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:14px 18px;margin-bottom:22px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;"><div style="font-size:0.88rem;color:var(--text-primary);"><span class="badge-clash mono" style="margin-right:8px;">Barrier Triage Rule</span><strong>Cheeks stinging or tight tonight?</strong> Start with the <a href="/concern/72-hour-damaged-skin-barrier-reset" style="color:var(--rose-brand);font-weight:600;text-decoration:underline;">72-Hour Damaged Skin Barrier Reset</a> before resuming morning Vitamin C or nighttime Retinoids.</div><a href="/#analyzer" class="affiliate-link-pill mono">Audit My Own Bottles &rarr;</a></div><div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:20px;">${cards}</div></div></section>`
  });
}

function renderConcernDetailPage(concern) {
  const bottles = concern.productIds.map((id) => CULT_PRODUCTS.find((p) => p.id === id)).filter(Boolean);
  const actives = (concern.activeIds || []).map((id) => CLINICAL_INGREDIENTS.find((a) => a.id === id)).filter(Boolean);
  const celebs = (concern.celebSlugs || []).map((s) => getAllCelebrityRoutines().find((c) => c.slug === s)).filter(Boolean);
  const preloadHref = `/?products=${encodeURIComponent(concern.productIds.join(','))}#analyzer`;

  const bottleCards = bottles.map((b, idx) => {
    const partner = b.priceUsd >= 50 ? 'dermstore' : 'sephora';
    const dupe = findDupeForProduct(b);
    return `<div class="porcelain-vessel-core" style="background:var(--bg-surface);padding:20px 22px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <a href="/brand/${slugifyBrand(b.brand)}" class="mono" style="font-size:0.78rem;color:var(--text-secondary);font-weight:500;">${escapeHtml(b.brand)}</a>
          <span class="badge-safe mono">pH ${b.ph} · $${b.priceUsd}</span>
        </div>
        <div class="mono" style="font-size:0.72rem;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">Protocol Bottle ${idx + 1} · ${escapeHtml(b.category)}</div>
        <a href="/bottle/${escapeHtml(b.id)}" class="serif-display" style="display:block;font-size:1.22rem;color:var(--text-primary);margin-bottom:6px;">${escapeHtml(b.name)}</a>
        <p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.5;margin-bottom:8px;">${escapeHtml(b.summary)}</p>
        <div class="mono" style="font-size:0.73rem;color:var(--sage-safe);background:var(--sage-bg);padding:4px 8px;">${escapeHtml(dupe.type)}: ${escapeHtml(dupe.bottle.brand)} ($${dupe.bottle.priceUsd})</div>
      </div>
      <div style="display:flex;justify-content:space-between;align-items:flex-end;gap:10px;padding-top:6px;">
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:6px;">
          <a href="/bottle/${escapeHtml(b.id)}" class="mono" style="font-size:0.79rem;color:var(--rose-brand);font-weight:500;">Bottle Breakdown &amp; Dupes &rarr;</a>
          <div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center;">
            <a href="/api/affiliate?product=${escapeHtml(b.id)}&partner=${partner}" target="_blank" rel="sponsored noopener noreferrer" class="affiliate-link-pill mono">Shop ($${b.priceUsd}) &rarr;</a>
            <button type="button" id="dl-bag-btn-${escapeHtml(b.id)}" data-dl-bag-prod="${escapeHtml(b.id)}" data-dl-bag-title="${escapeHtml(b.brand + ' ' + b.name)}" class="dl-add-to-bag-btn mono" onclick="window.__dlToggleBottleInBag('${escapeHtml(b.id)}','${escapeHtml((b.brand + ' ' + b.name).replace(/'/g, ''))}','',this)">+ Add to Vanity Bag</button>
          </div>
        </div>
        <div style="width:54px;height:60px;background:var(--bg-oat);border:1px solid var(--border-hairline);display:flex;align-items:center;justify-content:center;flex-shrink:0;" title="${escapeHtml(b.brand)} ${escapeHtml(b.name)}">${renderBottleVesselSvg(b)}</div>
      </div>
    </div>`;
  }).join('');

  const bodyHtml = `<section class="section-block" style="padding-top:16px;">
    <div class="container">
      ${renderSiloNavStrip('concern')}
      <div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:28px 32px;margin-bottom:28px;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:26px;align-items:center;">
        <div>
          <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px;">
            <span class="badge-safe mono">${escapeHtml(concern.badge)}</span>
            <span class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">${concern.steps.length}-Step Protocol · ${bottles.length} Verified Bottles</span>
          </div>
          <h1 class="hero-h1" style="font-size:clamp(2rem,3.6vw,3.1rem);margin-bottom:10px;">${escapeHtml(concern.title)}</h1>
          <p class="hero-sub" style="margin-bottom:14px;">${escapeHtml(concern.summary)}</p>
          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px;">${actives.map((a) => `<a href="/ingredient/${escapeHtml(a.id)}" class="mono" style="font-size:0.75rem;padding:4px 9px;background:var(--bg-surface);border:1px solid var(--border-hairline);color:var(--text-primary);text-decoration:none;">Safe Active: ${escapeHtml(a.commonName.replace(/\s*\([^)]*\)/g, ''))} (pH ${a.phMin}–${a.phMax})</a>`).join('')}</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <a href="${preloadHref}" class="btn-primary"><span>Load This ${bottles.length}-Bottle Protocol in Checker</span><span class="btn-icon-circle">&rarr;</span></a>
            <a href="/buy/flash_pass?guide=${encodeURIComponent(concern.slug)}" class="btn-secondary"><span>Save 9:16 Lock-Screen Card ($1.99)</span></a>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
          <img src="${escapeHtml(concern.heroImg || '/public/editorial-woman-morning.jpg')}" alt="${escapeHtml(concern.title)} skincare ritual" loading="eager" style="width:100%;height:220px;object-fit:cover;object-position:center 22%;border-radius:10px;" />
          <img src="/public/editorial-segment-3.jpg" alt="${escapeHtml(concern.title)} barrier-safe evening routine" loading="eager" style="width:100%;height:220px;object-fit:cover;object-position:center 22%;border-radius:10px;" />
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:20px;margin-bottom:36px;">
        <div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:26px 28px;position:relative;overflow:hidden;justify-content:space-between;">
          <div aria-hidden="true" style="position:absolute;top:0;left:0;right:0;height:96px;pointer-events:none;background:radial-gradient(ellipse 68% 95% at 80% 10%, rgba(214,152,58,0.24) 0%, transparent 80%);"></div>
          <div style="position:relative;z-index:1;">
            <span class="mono" style="font-size:0.8rem;color:var(--rose-brand);font-weight:500;">Step-by-Step Clinical Order</span>
            <h2 class="serif-display" style="font-size:1.48rem;margin:4px 0 14px;">3-Step Application Sequence</h2>
            ${concern.steps.map((s, idx) => { const b = bottles[idx]; return `<div style="padding:13px 16px;background:var(--bg-surface);border-left:3px solid var(--rose-brand);margin-bottom:10px;"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:4px;"><span class="mono" style="font-size:0.74rem;color:var(--rose-brand);font-weight:600;">STEP 0${idx + 1}</span>${b ? `<a href="/bottle/${escapeHtml(b.id)}" class="mono" style="font-size:0.74rem;color:var(--text-secondary);text-decoration:underline;">Pair with: ${escapeHtml(b.brand)} ${escapeHtml(b.name.replace(/\s*\([^)]*\)/g, '').slice(0, 22))} &rarr;</a>` : ''}</div><div style="font-size:0.92rem;line-height:1.52;color:var(--text-primary);">${escapeHtml(s.replace(/^\d+\.\s*/, ''))}</div></div>`; }).join('')}
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;font-size:0.78rem;position:relative;z-index:1;"><span class="mono" style="color:var(--text-secondary);">60s Dry-Down Between Layers</span><a href="${preloadHref}" class="mono" style="color:var(--rose-brand);font-weight:600;text-decoration:none;">Customize in Shelf Checker &rarr;</a></div>
        </div>
        <div class="porcelain-vessel-core" style="background:var(--berry-bg);padding:26px 28px;position:relative;overflow:hidden;border:1px solid var(--berry-border);justify-content:space-between;">
          <div style="position:relative;z-index:1;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
              <span class="badge-clash mono">What to Pause Immediately</span>
              <span class="mono" style="font-size:0.72rem;color:var(--berry-clash);text-transform:uppercase;">· Barrier Guardrail</span>
            </div>
            <h2 class="serif-display" style="font-size:1.45rem;margin-bottom:12px;">Common Mistake That Breaks This Routine</h2>
            <div style="background:var(--bg-surface);border-left:3px solid var(--berry-clash);border-radius:10px;padding:13px 15px;margin-bottom:12px;"><p style="font-size:0.91rem;line-height:1.58;margin:0;color:var(--text-primary);">${escapeHtml(concern.avoidNote)}</p></div>
            <div style="background:var(--bg-surface);border:1px solid var(--sage-border);border-left:3px solid var(--sage-safe);border-radius:10px;padding:12px 15px;">
              <span class="mono" style="display:block;font-size:0.7rem;text-transform:uppercase;color:var(--sage-safe);font-weight:600;margin-bottom:4px;">Verified Safe Replacements in This Protocol</span>
              <div style="font-size:0.86rem;color:var(--text-primary);line-height:1.5;">${actives.map((a) => `<strong>${escapeHtml(a.commonName.replace(/\s*\([^)]*\)/g, ''))}</strong> (${escapeHtml(a.functionRole)})`).join(' · ')}</div>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:10px;font-size:0.78rem;position:relative;z-index:1;"><span class="mono" style="color:var(--text-secondary);">100% Barrier &amp; Pore Checked</span><a href="${preloadHref}" class="mono" style="color:var(--berry-clash);font-weight:600;text-decoration:none;">Audit My Current Bottles &rarr;</a></div>
        </div>
      </div>

      <h2 class="serif-display" style="font-size:1.65rem;margin-bottom:14px;">Verified Bottles for This Protocol (${bottles.length})</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:18px;margin-bottom:36px;">${bottleCards}</div>

      ${celebs.length > 0 ? `<h2 class="serif-display" style="font-size:1.55rem;margin-bottom:14px;">Iconic Routines Using These Safe Swaps</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;margin-bottom:34px;">
        ${celebs.map((c) => `<a href="/celebrity/${escapeHtml(c.slug)}" class="porcelain-vessel-core" style="background:var(--bg-oat);padding:18px 20px;text-decoration:none;display:flex;flex-direction:column;justify-content:space-between;gap:8px;"><div><div class="vessel-photo-frame" style="height:145px;margin-bottom:10px;"><img src="${escapeHtml(c.heroImg)}" alt="${escapeHtml(c.name)} routine" loading="lazy" style="width:100%;height:100%;object-fit:cover;object-position:${escapeHtml(c.imgPos || '50% 25%')};" /></div><span class="badge-safe mono" style="font-size:0.72rem;margin-bottom:6px;display:inline-block;">${escapeHtml(c.skinProfile)}</span><strong class="serif-display" style="font-size:1.22rem;display:block;margin-bottom:4px;color:var(--text-primary);">${escapeHtml(c.name)}</strong><span style="font-size:0.84rem;color:var(--text-secondary);">${escapeHtml(c.moniker)}</span></div><span class="mono" style="font-size:0.78rem;color:var(--rose-brand);font-weight:500;">View Full Routine &amp; Dupes &rarr;</span></a>`).join('')}
      </div>` : ''}

      <div class="porcelain-vessel-core" style="background:var(--bg-oat);padding:24px 28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div style="max-width:640px;">
          <span class="badge-safe mono" style="margin-bottom:6px;display:inline-block;">9:16 Phone Lock-Screen Card + 4-Night Schedule</span>
          <h2 class="serif-display" style="font-size:1.48rem;margin:4px 0 6px;">Save This ${escapeHtml(concern.title)} to Your Phone ($1.99)</h2>
          <p style="font-size:0.88rem;color:var(--text-secondary);margin:0;">Keep the exact morning &amp; bedtime application order, wait times, and chemist swaps right on your bathroom lock screen (one-time payment, never a subscription).</p>
        </div>
        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="/buy/flash_pass?guide=${encodeURIComponent(concern.slug)}" class="btn-primary"><span>Save Complete Routine Kit ($1.99)</span><span class="btn-icon-circle">&rarr;</span></a>
          <a href="${preloadHref}" class="btn-secondary"><span>Customize in Shelf Checker &rarr;</span></a>
        </div>
      </div>
    </div>
  </section>`;

  return renderShell({
    title: `${concern.title} | DermLogic Protocol`,
    description: concern.summary,
    canonicalPath: `/concern/${concern.slug}`,
    breadcrumbs: [{ label: 'DermLogic', href: '/' }, { label: 'Skin Concerns', href: '/concern' }, { label: concern.title, href: `/concern/${concern.slug}` }],
    faqItems: [{ q: `How do I follow the ${concern.title}?`, a: `${concern.steps.join(' ')} ${concern.avoidNote}` }],
    bodyHtml
  });
}

function getAllSemanticHubUrls(hostUrl) {
  const base = String(hostUrl || 'https://www.dermlogic.io').replace(/\/$/, '');
  const urls = [
    { loc: `${base}/celebrity`, priority: '0.92', changefreq: 'weekly', title: 'Celebrity Skincare Shelves & Layering Order' },
    { loc: `${base}/bottle`, priority: '0.90', changefreq: 'weekly', title: '44 Cult Skincare Bottles Index' },
    { loc: `${base}/ingredient`, priority: '0.90', changefreq: 'weekly', title: '65 Clinical Skincare Ingredients Index' },
    { loc: `${base}/brand`, priority: '0.88', changefreq: 'weekly', title: 'Skincare Brands Directory' },
    { loc: `${base}/concern`, priority: '0.90', changefreq: 'weekly', title: 'Skincare Concerns & Step-by-Step Protocols' }
  ];
  for (const c of getAllCelebrityRoutines()) {
    urls.push({ loc: `${base}/celebrity/${c.slug}`, priority: '0.90', changefreq: 'weekly', title: `${c.name} Skincare Routine & Bottles (${c.moniker})` });
  }
  for (const b of CULT_PRODUCTS) {
    urls.push({ loc: `${base}/bottle/${b.id}`, priority: '0.86', changefreq: 'weekly', title: `${b.brand} ${b.name} Layering & Dupes` });
  }
  for (const a of CLINICAL_INGREDIENTS) {
    urls.push({ loc: `${base}/ingredient/${a.id}`, priority: '0.85', changefreq: 'weekly', title: `${a.commonName} (${a.inciName}) pH & Layering` });
  }
  for (const br of getAllBrandHubs()) {
    urls.push({ loc: `${base}/brand/${br.slug}`, priority: '0.84', changefreq: 'weekly', title: `${br.name} Skincare Bottles & pH Guide` });
  }
  for (const cn of CONCERN_HUBS) {
    urls.push({ loc: `${base}/concern/${cn.slug}`, priority: '0.88', changefreq: 'weekly', title: cn.title });
  }
  try {
    const gi = require('./glowindex-seo-upgrades');
    if (typeof gi.getAllGlowIndexExtraUrls === 'function') urls.push(...gi.getAllGlowIndexExtraUrls(base));
  } catch (_) {}
  return urls;
}

function findFuzzyItem(list, rawSlug, getSearchText) {
  const q = String(rawSlug || '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '');
  if (!q) return null;
  const direct = list.find((item) => item.id === q || item.slug === q || q.startsWith(`${item.id || item.slug}-`) || String(item.id || item.slug).startsWith(`${q}-`));
  if (direct) return direct;
  const tokens = q.split('-').filter((t) => t.length > 2);
  let best = null, bestScore = 0;
  for (const item of list) {
    const hay = getSearchText(item).toLowerCase();
    const score = tokens.reduce((acc, tok) => acc + (hay.includes(tok) ? 1 : 0), 0);
    if (score > bestScore && score >= Math.min(2, tokens.length)) { best = item; bestScore = score; }
  }
  return best;
}

function attachSemanticSeoHubs(app, render404Page) {
  app.get(['/celebrity', '/celebrities'], (req, res) => res.status(200).type('html').send(renderCelebrityIndexPage()));
  app.get('/celebrity/:slug', (req, res) => {
    const celebs = getAllCelebrityRoutines();
    const celeb = celebs.find((c) => c.slug === req.params.slug);
    if (!celeb) {
      const fuzzy = findFuzzyItem(celebs, req.params.slug, (c) => `${c.slug} ${c.name}`);
      if (fuzzy) return res.redirect(301, `/celebrity/${fuzzy.slug}`);
      return res.status(404).type('html').send(render404Page ? render404Page() : 'Not found');
    }
    res.status(200).type('html').send(renderCelebrityDetailPage(celeb));
  });

  app.get(['/bottle', '/bottles'], (req, res) => res.status(200).type('html').send(renderBottleIndexPage()));
  app.get('/bottle/:slug', (req, res) => {
    const prod = CULT_PRODUCTS.find((p) => p.id === req.params.slug);
    if (!prod) {
      const fuzzy = findFuzzyItem(CULT_PRODUCTS, req.params.slug, (p) => `${p.id} ${p.brand} ${p.name}`);
      if (fuzzy) return res.redirect(301, `/bottle/${fuzzy.id}`);
      return res.status(404).type('html').send(render404Page ? render404Page() : 'Not found');
    }
    res.status(200).type('html').send(renderBottleDetailPage(prod));
  });

  app.get(['/ingredient', '/ingredients'], (req, res) => res.status(200).type('html').send(renderIngredientIndexPage()));
  app.get('/ingredient/:slug', (req, res) => {
    const ing = CLINICAL_INGREDIENTS.find((a) => a.id === req.params.slug);
    if (!ing) {
      const fuzzy = findFuzzyItem(CLINICAL_INGREDIENTS, req.params.slug, (a) => `${a.id} ${a.commonName} ${a.inciName}`);
      if (fuzzy) return res.redirect(301, `/ingredient/${fuzzy.id}`);
      return res.status(404).type('html').send(render404Page ? render404Page() : 'Not found');
    }
    res.status(200).type('html').send(renderIngredientDetailPage(ing));
  });

  app.get(['/brand', '/brands'], (req, res) => res.status(200).type('html').send(renderBrandIndexPage()));
  app.get('/brand/:slug', (req, res) => {
    const brandHub = getAllBrandHubs().find((b) => b.slug === req.params.slug);
    if (!brandHub) return res.status(404).type('html').send(render404Page ? render404Page() : 'Not found');
    res.status(200).type('html').send(renderBrandDetailPage(brandHub));
  });

  app.get(['/concern', '/concerns'], (req, res) => res.status(200).type('html').send(renderConcernIndexPage()));
  app.get('/concern/:slug', (req, res) => {
    const concern = CONCERN_HUBS.find((c) => c.slug === req.params.slug);
    if (!concern) return res.status(404).type('html').send(render404Page ? render404Page() : 'Not found');
    res.status(200).type('html').send(renderConcernDetailPage(concern));
  });

  // Iterative Celebrity Shelf Discovery & Daily +1 Augmentation Endpoint (/api/celebrity-shelves)
  app.get('/api/celebrity-shelves', (req, res) => {
    const list = getAllCelebrityRoutines();
    const drip = getDailyDripInfo();
    res.status(200).json({ ok: true, count: list.length, dailyQueueRemaining: drip.remainingCount, nextQueued: drip.nextQueued ? drip.nextQueued.slug : null, shelves: list });
  });
  app.post('/api/celebrity-shelves/advance-day', (req, res) => {
    const adminKey = process.env.ADMIN_API_KEY;
    if (adminKey && req.headers['x-admin-key'] !== adminKey) return res.status(403).json({ ok: false, error: 'Unauthorized' });
    const result = advanceCelebrityShelfByOneDay();
    res.status(200).json({ ok: true, ...result });
  });
}

module.exports = { CONCERN_HUBS, getAllBrandHubs, getAllSemanticHubUrls, attachSemanticSeoHubs };
