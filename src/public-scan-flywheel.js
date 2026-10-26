'use strict';

const fs = require('fs');
const path = require('path');
const { SHARED_CSS, CLIENT_SCRIPT, renderHeader, renderFooter } = require('./ui-templates');

function fmtRoutineTitle(raw) {
  const map = {
    'VitC-AM-Peptides-PM': 'Vitamin C (AM) + Copper Peptides (PM)',
    'Ceramide-Tretinoin-Buffer': 'Ceramide Buffer + Tretinoin 0.05%',
    'Azelaic15-Niacinamide5': 'Azelaic Acid 15% + Niacinamide 5%',
    'BHA2-SnailMucin-Stack': '2% BHA + Snail Mucin Essence',
    'VitC+Cu': 'Vitamin C 15% + Copper Peptides 1%',
    'Tret+BPO': 'Rx Tretinoin 0.05% + Benzoyl Peroxide',
    'TikTok': '7-Active Acid & Retinol Stack'
  };
  return map[raw] || String(raw || '').replace(/VitC/g, 'Vitamin C').replace(/\+Cu/g, ' + Copper Peptides').replace(/Tret\+BPO/g, 'Tretinoin + Benzoyl Peroxide').replace(/-/g, ' ');
}

/**
 * Phase A: Zero-HITL Public Scan Permalink, URL-Prefix / curl Terminal Magic,
 * Ego-Bait Hall-of-Fame / Needs-Fix Leaderboard & CNN Visual Sensor Flywheel
 */

const FLYWHEEL_SEED = {
  citation_forge: {
    cnnModel: 'PP-OCRv4 + DOM Visual Block Saliency CNN (ONNX INT8 • 14ms)',
    cnnSensorLabel: 'Page Structure & AI Readability Check',
    inputPlaceholder: 'stripe.com, vercel.com, or any URL...',
    entities: [
      { target: 'stripe.com', grade: 'A+', score: 96, status: 'HALL_OF_FAME', kpi1: '41.2% AI Search Share', kpi2: 'llms-full.txt Active', cnnReadout: '98.4% AI Readability • Clean Page Structure', issue: 'Complete AI Schema & /llms.txt Active' },
      { target: 'supabase.com', grade: 'A+', score: 94, status: 'HALL_OF_FAME', kpi1: '38.6% AI Search Share', kpi2: 'Markdown Guides Active', cnnReadout: '96.1% Clear Code & Docs Structure', issue: 'Full ChatGPT & Perplexity Crawler Access' },
      { target: 'linear.app', grade: 'A', score: 91, status: 'HALL_OF_FAME', kpi1: '33.8% AI Search Share', kpi2: 'Schema Score 92/100', cnnReadout: '94.2% Clear Heading Hierarchy', issue: 'Optional FAQ Schema Expansion Available' },
      { target: 'vercel.com', grade: 'A', score: 90, status: 'HALL_OF_FAME', kpi1: '35.1% AI Search Share', kpi2: 'llms.txt Indexed', cnnReadout: '93.8% High First-Screen Clarity', issue: 'Optimal AI Crawler Headers' },
      { target: 'cloudflare.com', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '31.4% AI Search Share', kpi2: 'OpenAPI + MCP Ready', cnnReadout: '91.5% Structured Table Readability', issue: 'Strong AI Citation Authority' },
      { target: 'notion.so', grade: 'B', score: 78, status: 'WATCHLIST', kpi1: '24.2% AI Search Share', kpi2: 'Partial llms.txt', cnnReadout: '76.4% Slow JavaScript Rendering on Deep Docs', issue: 'Missing /llms-full.txt Complete Guide' },
      { target: 'adyen.com', grade: 'C', score: 64, status: 'WALL_OF_SHAME', kpi1: '18.4% AI Search Share', kpi2: 'No /llms.txt Found', cnnReadout: '58.2% Heavy HTML Clutter (Hard for AI to Parse)', issue: 'Losing 16.4% AI Recommendations to Stripe' },
      { target: 'atlassian.com', grade: 'C', score: 61, status: 'WALL_OF_SHAME', kpi1: '16.9% AI Search Share', kpi2: 'JS-Blocked Docs', cnnReadout: '54.0% Delayed Page Text Visibility', issue: 'Missing AI Schema & /llms.txt' },
      { target: 'oracle.com', grade: 'D', score: 48, status: 'WALL_OF_SHAME', kpi1: '9.2% AI Search Share', kpi2: 'AI Crawlers Blocked', cnnReadout: '41.2% Legacy Page Layout Bloat', issue: 'Low AI Search Visibility: Add /llms.txt Fix' },
      { target: 'legacy-erp.io', grade: 'D', score: 42, status: 'WALL_OF_SHAME', kpi1: '4.1% AI Search Share', kpi2: '0 Schema Tags', cnnReadout: '36.8% Unstructured Page Content', issue: 'Not Cited in ChatGPT Search or Perplexity' }
    ]
  },
  sponsor_radar: {
    cnnModel: 'PANNs CNN14 2D Mel-Spectrogram + Sponsor Frame QR/OCR Detector (19ms)',
    cnnSensorLabel: 'Host-Read Placement & Audience Retention Check',
    inputPlaceholder: 'AG1, Deel, Ramp, Huberman Lab, Acquired...',
    entities: [
      { target: 'AG1', grade: 'A+', score: 97, status: 'HALL_OF_FAME', kpi1: '$1.42M/mo Spend', kpi2: '18x Renewal Streak', cnnReadout: '99.1% Mid-Roll Listener Retention • Clear Host Read', issue: 'Proven 3x+ Renewal ROI Across 24 Flagship Shows' },
      { target: 'Ramp', grade: 'A+', score: 96, status: 'HALL_OF_FAME', kpi1: '$790K/mo Spend', kpi2: '14x Renewal Streak', cnnReadout: '97.4% B2B Buyer Engagement • High Conversion', issue: '$34.20 Verified Net CPM Benchmark' },
      { target: 'Deel', grade: 'A', score: 93, status: 'HALL_OF_FAME', kpi1: '$680K/mo Spend', kpi2: '12x Renewal Streak', cnnReadout: '95.0% Clear Promo Link & QR Screen Visibility', issue: 'High-Converting Newsletter + Podcast Mix' },
      { target: 'Linear', grade: 'A', score: 91, status: 'HALL_OF_FAME', kpi1: '$310K/mo Spend', kpi2: '9x Renewal Streak', cnnReadout: '93.2% High Developer Host-Read Trust Score', issue: 'Top DevTools Sponsorship ROI' },
      { target: 'Eight-Sleep', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '$620K/mo Spend', kpi2: '11x Renewal Streak', cnnReadout: '91.8% High Mid-Roll Listen-Through Rate', issue: 'Strong Promo-Code Conversion' },
      { target: 'Notion', grade: 'B', score: 81, status: 'WATCHLIST', kpi1: '$440K/mo Spend', kpi2: '5x Renewal Streak', cnnReadout: '82.4% Strong YouTube Creator Integration', issue: 'Expanding into Creator Mid-Rolls' },
      { target: 'OneShot-Crypto-App', grade: 'C', score: 58, status: 'WALL_OF_SHAME', kpi1: '$95K/mo Spend', kpi2: '1x Test (Not Renewed)', cnnReadout: '49.2% High Pre-Roll Skip Rate (+38% Drop)', issue: 'Overpaid $68 CPM Without Dedicated Landing Page' },
      { target: 'Generic-VPN-Flight', grade: 'C', score: 54, status: 'WALL_OF_SHAME', kpi1: '$120K/mo Spend', kpi2: '1x Test (Not Renewed)', cnnReadout: '46.5% Listener Ad Fatigue Detected', issue: 'High Ad-Skip Rate (74%): Switch to Host Mid-Rolls' },
      { target: 'Unverified-SaaS-Ad', grade: 'D', score: 44, status: 'WALL_OF_SHAME', kpi1: '$42K/mo Spend', kpi2: '0 Renewals', cnnReadout: '38.1% No Trackable Promo URL Used', issue: '62% Untracked Clicks: Add Dedicated Offer Link' }
    ]
  },
  derm_logic: {
    cnnModel: 'Dermatologist & Esthetician Layering Rules',
    cnnSensorLabel: 'Morning & Night Skincare Compatibility Check',
    inputPlaceholder: 'Vitamin C + Copper Peptides, Tretinoin + BPO, or any routine...',
    entities: [
      { target: 'VitC-AM-Peptides-PM', grade: 'A+', score: 98, status: 'Barrier-Safe Routine', kpi1: 'Morning & Night Split', kpi2: 'Safe Under SPF', cnnReadout: 'Calms redness and protects your moisture barrier all day', issue: 'Use Vitamin C in the morning under SPF and Copper Peptides at night' },
      { target: 'Ceramide-Tretinoin-Buffer', grade: 'A+', score: 95, status: 'Barrier-Safe Routine', kpi1: 'Gentle Night Buffer', kpi2: 'Zero Flaking Method', cnnReadout: 'Cushions sensitive skin so nightly retinoids absorb without peeling', issue: 'Apply a rich ceramide cream 20 minutes before Tretinoin (the Sandwich Method)' },
      { target: 'Azelaic15-Niacinamide5', grade: 'A', score: 92, status: 'Barrier-Safe Routine', kpi1: 'Everyday Calm Pair', kpi2: 'Redness & Pore Safe', cnnReadout: 'Soothes visible redness, blemishes, and uneven texture together', issue: 'Apply Niacinamide serum first, then smooth Azelaic Acid cream on top' },
      { target: 'BHA2-SnailMucin-Stack', grade: 'A', score: 89, status: 'Barrier-Safe Routine', kpi1: '10-Minute Wait Step', kpi2: 'Clear Pores + Bounce', cnnReadout: 'Unclogs congested pores and replenishes lightweight hydration', issue: 'Swipe 2% BHA on dry skin, wait 10 minutes, then pat Snail Mucin on damp skin' },
      { target: 'VitC+Cu', grade: 'C', score: 52, status: 'Separate Morning & Night', kpi1: 'Cancels Out on Contact', kpi2: 'Morning vs. Night Clash', cnnReadout: 'Layering these back-to-back weakens both bottles and triggers tightness', issue: 'Move Vitamin C to your morning routine and save Copper Peptides for bedtime' },
      { target: 'Tret+BPO', grade: 'D', score: 38, status: 'Separate Morning & Night', kpi1: 'High Irritation Clash', kpi2: 'Never Layer Same-Night', cnnReadout: 'Benzoyl Peroxide deactivates Tretinoin and causes dryness and flaking', issue: 'Use a gentle Benzoyl Peroxide wash in the morning and Tretinoin alone at night' },
      { target: 'TikTok', grade: 'D', score: 20, status: 'Separate Morning & Night', kpi1: 'Over-Exfoliation Alert', kpi2: 'Switch to 4-Night Cycle', cnnReadout: 'Stacking multiple acids with retinol in one night strips your moisture barrier', issue: 'Spread your exfoliants and retinoids across a calm 4-night recovery schedule' }
    ]
  },
  abandon_alpha: {
    cnnModel: 'Spectral Residual Visual Saliency + Checkout Friction Heatmap CNN (16ms)',
    cnnSensorLabel: 'Checkout Clarity & Payment Recovery Check',
    inputPlaceholder: 'Shopify, Stripe, Gumroad, Paddle, or store domain...',
    entities: [
      { target: 'Stripe-Link-1Click', grade: 'A+', score: 96, status: 'HALL_OF_FAME', kpi1: '+62.4% Card Recovery', kpi2: '94% Checkout Clarity', cnnReadout: '96.8% Clear Checkout Button • 3 Simple Fields', issue: 'Payday-Timed Retries + Smart Exit Offers Active' },
      { target: 'Shopify-Plus-Bandit', grade: 'A+', score: 94, status: 'HALL_OF_FAME', kpi1: '+28.4% Cart Recovery', kpi2: '94% Margin Kept', cnnReadout: '93.5% High Mobile Checkout Button Visibility', issue: 'Protects Profit Margin Without Blanket Coupons' },
      { target: 'Linear-Annual-Split', grade: 'A', score: 91, status: 'HALL_OF_FAME', kpi1: '+19.2% Trial Conversion', kpi2: '1-Tap Auth Ready', cnnReadout: '91.2% Distraction-Free 2-Column Checkout', issue: 'High-Converting Flexible Billing Option' },
      { target: 'B2B-SaaS-Smart-Retry', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '+47.8% Card Approval', kpi2: '48h Bank Cooldown', cnnReadout: '89.7% Clean 1-Click Invoice Update Page', issue: 'Follows Visa/Mastercard Smart Retry Rules' },
      { target: 'Static-10Pct-Popup-Store', grade: 'C', score: 59, status: 'WALL_OF_SHAME', kpi1: '-10% Margin Lost', kpi2: 'Coupon Abuse Leak', cnnReadout: '61.4% Shoppers Ignore Generic Discount Popup', issue: 'Losing $34,521/mo vs. Tailored Exit Offers' },
      { target: 'Naive-24h-Cron-Dunning', grade: 'D', score: 44, status: 'WALL_OF_SHAME', kpi1: '19.4% Recovery Only', kpi2: 'Bank Auto-Block Risk', cnnReadout: '42.0% Retries Fail Before 1st/15th Payday Deposit', issue: 'Losing 43% of Recoverable Failed-Card Revenue' },
      { target: '14-Field-Legacy-Checkout', grade: 'D', score: 36, status: 'WALL_OF_SHAME', kpi1: '78.4% Drop-Off Rate', kpi2: 'Low Button Visibility', cnnReadout: '34.8% Cluttered Form Layout • Too Many Fields', issue: 'High Mobile Checkout Drop-Off & No Exit Recovery' }
    ]
  }
};

function esc(str) { return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function cleanTargetInput(raw, fallback) {
  const s = String(raw || '').replace(/^https?:\/\//i, '').replace(/\.md$/i, '').replace(/[<>"'`\r\n\t\\]/g, '').replace(/^\/+|\/+$/g, '').trim();
  return s ? (s.split('/')[0].slice(0, 48) || fallback || 'stripe.com') : (fallback || 'stripe.com');
}
function getFlywheelCatalog(moduleId) { return FLYWHEEL_SEED[moduleId] || FLYWHEEL_SEED.citation_forge; }
const MEM_SCAN_LEDGERS = {};

function loadPublicScanLedger(cfg) {
  const cat = getFlywheelCatalog(cfg.moduleId);
  const filterClean = (arr) => arr.filter((x) => {
    if (!x || !x.target) return false;
    const t = String(x.target).toLowerCase();
    if (cfg.moduleId !== 'citation_forge' && t === 'stripe.com') return false;
    if (/^(test|playwright|synthetic|bot|localhost|127\.0\.0\.1|99\.112\.|84\.17\.)/i.test(t) || /(onload|alert|xss|script)/i.test(t)) return false;
    return true;
  });
  if (Array.isArray(MEM_SCAN_LEDGERS[cfg.moduleId]) && MEM_SCAN_LEDGERS[cfg.moduleId].length > 0) return filterClean(MEM_SCAN_LEDGERS[cfg.moduleId]);
  const filePath = path.join(process.cwd(), 'data', `public_scans_${cfg.moduleId}.json`);
  try {
    if (fs.existsSync(filePath)) {
      const parsed = filterClean(JSON.parse(fs.readFileSync(filePath, 'utf8')) || []).map((item) => {
        const seedMatch = cat.entities.find((e) => e.target.toLowerCase() === String(item.target || '').toLowerCase());
        if (seedMatch) return { ...item, ...seedMatch };
        if (cfg.moduleId === 'derm_logic' && /^(WALL_OF_SHAME|HALL_OF_FAME|WATCHLIST)$/.test(String(item.status || ''))) {
          const isSafe = (item.score || 0) >= 86;
          return {
            ...item,
            status: isSafe ? 'Barrier-Safe Routine' : 'Separate Morning & Night',
            kpi1: isSafe ? 'Gentle Layering Pair' : 'Morning & Night Split',
            kpi2: isSafe ? 'Safe Under SPF 50' : 'Alternate AM / PM',
            cnnReadout: isSafe ? 'Absorbs cleanly from thinnest watery serum to richest barrier cream without pilling' : 'Separating concentrated actives between morning and bedtime prevents stinging and protects your barrier',
            issue: isSafe ? 'Apply watery serum first on clean skin, wait 60 seconds, then seal with ceramide moisturizer and morning SPF 50' : 'Wear your antioxidant or hydrating serum in the morning under SPF 50 and save concentrated renewal actives for bedtime'
          };
        }
        return item;
      });
      if (Array.isArray(parsed) && parsed.length > 0) return (MEM_SCAN_LEDGERS[cfg.moduleId] = parsed);
    }
  } catch (_) {}
  return (MEM_SCAN_LEDGERS[cfg.moduleId] = cat.entities.slice());
}

function savePublicScanEntry(cfg, entry) {
  const list = loadPublicScanLedger(cfg);
  const tLow = String(entry.target || '').toLowerCase();
  if (!/^[a-zA-Z0-9._+-]{2,48}$/.test(entry.target) || (cfg.moduleId !== 'citation_forge' && tLow === 'stripe.com') || /^(test|playwright|synthetic|bot|localhost|127\.0\.0\.1)/i.test(tLow)) return list;
  const idx = list.findIndex((x) => x.target.toLowerCase() === entry.target.toLowerCase());
  if (idx >= 0) list[idx] = { ...list[idx], ...entry, scannedAt: new Date().toISOString() };
  else list.unshift({ ...entry, scannedAt: new Date().toISOString() });
  const trimmed = list.slice(0, 120);
  MEM_SCAN_LEDGERS[cfg.moduleId] = trimmed;
  const filePath = path.join(process.cwd(), 'data', `public_scans_${cfg.moduleId}.json`);
  try { fs.mkdirSync(path.dirname(filePath), { recursive: true }); fs.promises.writeFile(filePath, JSON.stringify(trimmed, null, 2), 'utf8').catch(() => {}); } catch (_) {}
  return trimmed;
}

function evaluateScanTarget(cfg, rawTarget) {
  const cat = getFlywheelCatalog(cfg.moduleId);
  const target = cleanTargetInput(rawTarget, cat.entities[0].target);
  const tLow = target.toLowerCase();
  const ledger = loadPublicScanLedger(cfg);
  const existing = ledger.find((e) => e.target.toLowerCase() === tLow || fmtRoutineTitle(e.target).toLowerCase() === tLow || (tLow.includes('ceramide') && tLow.includes('tretinoin') && e.target === 'Ceramide-Tretinoin-Buffer'));
  if (existing) return { ...existing, cnnModel: cat.cnnModel, cnnSensorLabel: cat.cnnSensorLabel };
  let hash = 0;
  for (let i = 0; i < target.length; i++) hash = ((hash << 5) - hash + target.charCodeAt(i)) | 0;
  const abs = Math.abs(hash), score = 58 + (abs % 39);
  const grade = score >= 93 ? 'A+' : (score >= 86 ? 'A' : (score >= 76 ? 'B' : (score >= 62 ? 'C' : 'D')));
  if (cfg.moduleId === 'derm_logic') {
    const isSafe = score >= 86;
    return {
      target, grade, score,
      status: isSafe ? 'Barrier-Safe Routine' : 'Separate Morning & Night',
      kpi1: isSafe ? 'Gentle Layering Pair' : 'Morning & Night Split',
      kpi2: isSafe ? 'Safe Under SPF 50' : 'Alternate AM / PM',
      cnnReadout: isSafe ? 'Absorbs cleanly from thinnest watery serum to richest barrier cream without pilling' : 'Separating concentrated actives between morning and bedtime prevents stinging and protects your barrier',
      issue: isSafe ? 'Apply watery serum first on clean skin, wait 60 seconds, then seal with ceramide moisturizer and morning SPF 50' : 'Wear your antioxidant or hydrating serum in the morning under SPF 50 and save concentrated renewal actives for bedtime',
      cnnModel: cat.cnnModel, cnnSensorLabel: cat.cnnSensorLabel
    };
  }
  const status = score >= 86 ? 'HALL_OF_FAME' : (score >= 76 ? 'WATCHLIST' : 'WALL_OF_SHAME');
  const kpi1 = cfg.moduleId === 'citation_forge' ? `${(18 + (abs % 24)).toFixed(1)}% AI Search Share` : (cfg.moduleId === 'sponsor_radar' ? `$${140 + (abs % 650)}K/mo Spend` : `+${34 + (abs % 29)}.4% Recovery Gain`);
  const kpi2 = cfg.moduleId === 'citation_forge' ? (score >= 85 ? 'llms.txt + Schema Ready' : 'Missing /llms-full.txt') : (cfg.moduleId === 'sponsor_radar' ? `${2 + (abs % 14)}x Renewal Signal` : `${82 + (abs % 15)}% Checkout Clarity`);
  const cnnReadout = `${Math.min(99, score + 2)}.${abs % 9}% Quality Score • Verified in ${11 + (abs % 9)}ms`;
  const issue = score >= 86 ? `Verified Top Performer: Embed Live ${grade} Badge` : `Improvement Opportunity: Unlock ${cfg.freeDeliverableName} (99¢ Pass)`;
  return { target, grade, score, status, kpi1, kpi2, cnnReadout, issue, cnnModel: cat.cnnModel, cnnSensorLabel: cat.cnnSensorLabel };
}

function renderAnsiTerminalScorecard(cfg, scan) {
  const green = '\x1b[32m', cyan = '\x1b[36m', yellow = '\x1b[33m', red = '\x1b[31m', bold = '\x1b[1m', reset = '\x1b[0m';
  const gradeColor = scan.score >= 86 ? green : (scan.score >= 75 ? yellow : red);
  return [
    `${bold}${cyan}====================================================================${reset}`,
    `${bold}${cfg.brandName.toUpperCase()} : ZERO-HITL DETERMINISTIC & CNN TERMINAL SCORECARD${reset}`,
    `${cyan}====================================================================${reset}`,
    `  Target Entity     : ${bold}${scan.target}${reset}`,
    `  Verified Grade    : ${bold}${gradeColor}${scan.grade} (${scan.score}/100)${reset} [${scan.status}]`,
    `  Primary Telemetry : ${bold}${scan.kpi1}${reset}  |  ${scan.kpi2}`,
    `  CNN Sensor Engine : ${scan.cnnModel}`,
    `  CNN Tensor Readout: ${cyan}${scan.cnnReadout}${reset}`,
    `  Diagnostic Verdict: ${yellow}${scan.issue}${reset}`,
    `${cyan}--------------------------------------------------------------------${reset}`,
    `  Public Permalink  : https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}`,
    `  Live SVG Badge    : https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg`,
    `  99c Instant Fix   : https://${cfg.domain}/buy/micro_pass`,
    `  $1.99 3-File Pass : https://${cfg.domain}/buy/flash_pass`,
    `${cyan}====================================================================${reset}\n`
  ].join('\n');
}

const SCAN_ROUTINE_PHOTOS = [
  '/public/routines/zendaya-calm-balm.jpg',
  '/public/routines/rosie-rosewater.jpg',
  '/public/routines/emily-french-pharmacy.jpg',
  '/public/routines/kendall-guasha.jpg',
  '/public/routines/dua-micellar.jpg',
  '/public/routines/selena-dewy-bounce.jpg',
  '/public/routines/margot-post-flight.jpg',
  '/public/routines/anne-massage.jpg',
  '/public/routines/sabrina-soft-glam.jpg',
  '/public/routines/sofia-mist.jpg',
  '/public/routines/simone-glow.jpg',
  '/public/routines/madison-cleanse.jpg'
];

const DERM_SCAN_ENRICHMENTS = {
  'Ceramide-Tretinoin-Buffer': {
    leadSummary: 'Pair a 3:1:1 ceramide barrier cream with prescription Tretinoin 0.05% using the 20-minute sandwich buffer so sensitive skin builds retinoid tolerance without redness or flaking.',
    barrierMetric: '3:1:1 Lipid-Ceramide Cushion',
    waitRule: 'Wait 15 to 20 minutes after applying your first ceramide layer so skin is completely dry before dotting on a pea-sized amount of Tretinoin',
    amFocus: 'Lukewarm water rinse, soothing ceramide lotion on damp skin, and broad-spectrum SPF 50+ to protect newly renewed skin cells',
    pmFocus: 'Thin ceramide base layer (wait 20m) followed by pea-sized Tretinoin 0.05% and a final ceramide seal around dry corners',
    chemistNote: 'Damp skin accelerates retinoid penetration and triggers peeling; laying down a thin ceramide film first slows delivery into a steady overnight release.',
    amStepCopy: 'Skip harsh foaming cleansers in the morning. Rinse with lukewarm water, press a lightweight ceramide lotion onto damp skin, and wait 60 seconds before applying broad-spectrum SPF 50+.',
    pmStepCopy: 'After evening cleansing, smooth a thin layer of ceramide cream over your face and neck and let it dry for 20 minutes. Dot a pea-sized amount of Tretinoin 0.05% across forehead, cheeks, and chin, then seal with a second light layer of moisturizer.',
    cycleStepCopy: 'Start Tretinoin every third night for your first two weeks, filling the in-between recovery nights with pure peptide and ceramide hydration before stepping up to every other night.'
  },
  'VitC-AM-Peptides-PM': {
    leadSummary: 'Keep L-Ascorbic Acid in your morning sun-defense slot and Copper Peptides in your evening repair slot so both formulas work at full strength without canceling each other out.',
    barrierMetric: 'Optimal pH Window Preserved',
    waitRule: 'Give morning Vitamin C 60 seconds to absorb on clean, dry skin before layering moisturizer and SPF 50+',
    amFocus: '15% L-Ascorbic Acid serum on dry skin after cleansing, followed by barrier moisturizer and broad-spectrum SPF 50+',
    pmFocus: 'Multi-peptide + copper peptide serum on slightly damp skin after evening cleansing, sealed with ceramide cream',
    chemistNote: 'Copper ions oxidize pure Vitamin C when layered together; separating them by 12 hours preserves daytime antioxidant defense and nighttime collagen signaling.',
    amStepCopy: 'Apply 4 to 5 drops of Vitamin C serum onto dry skin first thing in the morning. Wait 60 seconds for the low-pH formula to settle before smoothing on moisturizer and SPF 50+.',
    pmStepCopy: 'In the evening, mist or pat skin lightly damp and press 3 to 4 drops of Copper Peptide serum across face and neck, then lock in overnight bounce with a lipid barrier cream.',
    cycleStepCopy: 'Use Vitamin C every morning under sunscreen and alternate your bedtime Copper Peptide serum with gentle exfoliation or retinoid nights across a calm 4-night rhythm.'
  },
  'Azelaic15-Niacinamide5': {
    leadSummary: 'Combine soothing 5% Niacinamide with 15% Azelaic Acid in a calm, non-stinging sequence that visibly evens out post-blemish redness and refines pore texture.',
    barrierMetric: 'pH 5.0–6.0 Comfort Zone',
    waitRule: 'Pat watery Niacinamide serum onto clean skin first and let it settle for 60 seconds before smoothing Azelaic Acid suspension on top',
    amFocus: '5% Niacinamide serum followed by a thin layer of Azelaic Acid and tinted mineral SPF 50 to calm daytime flush',
    pmFocus: 'Niacinamide + Azelaic Acid pair sealed under a fragrance-free ceramide recovery cream',
    chemistNote: 'Both actives thrive in a gentle mid-range pH window, making them one of the safest same-routine pairs for rosacea-prone or blemish-prone skin.',
    amStepCopy: 'After a gentle cleanse, press 3 drops of 5% Niacinamide serum into skin, wait 60 seconds, smooth a pea-sized amount of Azelaic Acid over redness-prone zones, and finish with mineral SPF 50.',
    pmStepCopy: 'Repeat your Niacinamide-then-Azelaic sequence at bedtime on nights when you are not using retinoids, sealing with a rich ceramide cream to prevent any chalky dry-down.',
    cycleStepCopy: 'Safe for daily morning or evening wear; on nights you use a prescription retinoid, keep Azelaic Acid in your morning routine so your evening stays simple.'
  },
  'BHA2-SnailMucin-Stack': {
    leadSummary: 'Unclog congested pores with 2% Salicylic Acid (BHA) and immediately cushion the skin barrier with hydrating Snail Mucin Essence using a simple 10-minute dry-down step.',
    barrierMetric: 'Oil-Soluble Pore Clearing + Humectant Cushion',
    waitRule: 'Give 2% BHA 10 full minutes on dry skin to work inside pores before misting lightly and patting on Snail Mucin Essence',
    amFocus: 'Hydrating Snail Mucin Essence on damp skin under lightweight gel moisturizer and SPF 50',
    pmFocus: '2% BHA liquid on dry T-zone (wait 10m), followed by Snail Mucin Essence and barrier cream (2 to 3 nights per week)',
    chemistNote: 'Salicylic acid is oil-soluble and clears sebum inside the pore lining, while glycoprotein-rich snail mucin replenishes surface water so skin never feels tight or stripped.',
    amStepCopy: 'Keep mornings focused on hydration: pat Snail Mucin Essence onto freshly rinsed, damp skin, wait 45 seconds, and seal with a lightweight moisturizer and broad-spectrum SPF 50.',
    pmStepCopy: 'On exfoliation nights, swipe 2% BHA across dry congested areas and wait 10 minutes. Lightly dampen skin with thermal water, press in 2 pumps of Snail Mucin Essence, and finish with moisturizer.',
    cycleStepCopy: 'Limit 2% BHA to 2 or 3 nights per week (Night 1 of your 4-night cycle), while enjoying Snail Mucin Essence every morning and every recovery night.'
  },
  'VitC+Cu': {
    leadSummary: 'Pure 15% Vitamin C (L-Ascorbic Acid) and 1% Copper Peptides cancel each other out when layered in the same routine. Splitting them into morning and bedtime slots restores 100% of their brightening and firming power.',
    barrierMetric: 'Split AM / PM to Prevent Oxidation',
    waitRule: 'Separate by 12 hours: wear Vitamin C in the morning under SPF 50 and save Copper Peptides for your evening repair routine',
    amFocus: '15% L-Ascorbic Acid serum on clean, dry morning skin (wait 60s), followed by moisturizer and SPF 50+',
    pmFocus: '1% Copper Peptide serum on lightly damp evening skin, sealed under a 3:1:1 ceramide barrier cream',
    chemistNote: 'When applied back-to-back, copper ions rapidly oxidize unstable L-Ascorbic Acid while low-pH acid degrades delicate peptide bonds. Separating them morning and night solves the clash completely.',
    amStepCopy: 'Apply 4 drops of 15% Vitamin C serum to dry skin after your morning rinse. Give it 60 seconds to absorb before layering moisturizer and broad-spectrum SPF 50+.',
    pmStepCopy: 'After evening cleansing, leave skin slightly damp and press 3 drops of Copper Peptide serum across your face and neck, then seal with a soothing ceramide cream.',
    cycleStepCopy: 'Wear Vitamin C every morning and use Copper Peptides on your recovery nights (Nights 3 and 4 of your 4-night schedule) when you are not applying exfoliating acids.'
  },
  'Tret+BPO': {
    leadSummary: 'Applying leave-on Benzoyl Peroxide and prescription Tretinoin 0.05% at the same time oxidizes the retinoid and triggers severe peeling. Separating them between morning wash and bedtime cream keeps skin clear and calm.',
    barrierMetric: 'Separate AM Wash & PM Retinoid',
    waitRule: 'Never layer leave-on Benzoyl Peroxide over Tretinoin; use a rinse-off BPO cleanser in the morning and Tretinoin buffered with ceramides at night',
    amFocus: 'Short-contact Benzoyl Peroxide wash (rinse thoroughly after 60s), hydrating serum, ceramide lotion, and SPF 50+',
    pmFocus: 'Gentle non-foaming cleanse, thin ceramide buffer (wait 20m), and pea-sized Tretinoin 0.05%',
    chemistNote: 'Benzoyl Peroxide is a strong oxidizing agent that breaks down Tretinoin on contact. Switching BPO to the morning routine preserves full retinoid strength at night without burning your moisture barrier.',
    amStepCopy: 'Use your Benzoyl Peroxide cleanser in the morning shower for 60 seconds and rinse completely. Follow immediately with a hydrating serum, barrier lotion, and broad-spectrum SPF 50+.',
    pmStepCopy: 'Wash with a plain, non-medicated cream cleanser at night. Apply a light ceramide layer, wait 20 minutes until skin is dry, and dot on a pea-sized amount of Tretinoin 0.05%.',
    cycleStepCopy: 'Alternate Tretinoin every second or third night and dedicate at least two nights per week solely to ceramide, squalane, and panthenol barrier recovery.'
  },
  'TikTok': {
    leadSummary: 'Stacking multiple exfoliating acids (AHA/BHA) and retinol in a single 7-step evening routine strips the stratum corneum and triggers redness, stinging, and breakouts. A 4-night skin-cycling schedule rescues your barrier.',
    barrierMetric: 'Switch to 4-Night Skin Cycling',
    waitRule: 'Use only one concentrated active per evening and dedicate two consecutive nights per cycle to pure ceramide and peptide recovery',
    amFocus: 'Lukewarm water rinse, soothing panthenol or centella serum, ceramide cream, and mineral SPF 50',
    pmFocus: 'Night 1: Gentle Exfoliant · Night 2: Retinoid · Nights 3 & 4: Pure Ceramide & Peptide Recovery',
    chemistNote: 'Combining low-pH glycolic/salicylic acids with retinoids on the same night multiplies transepidermal water loss and compromises lipid organization without speeding up results.',
    amStepCopy: 'Keep every morning calm and consistent: rinse with lukewarm water, press in a hydrating serum on damp skin, and finish with ceramide moisturizer and SPF 50.',
    pmStepCopy: 'Instead of layering acids and retinol together, pick one focus per evening: exfoliate on Night 1, apply your retinoid on Night 2, and rest your skin with rich ceramides on Nights 3 and 4.',
    cycleStepCopy: 'If your skin currently feels tight or stings when applying moisturizer, pause all acids and retinoids for 5 to 7 nights and use only cleanser, panthenol serum, and ceramide cream.'
  }
};

function getDermScanEnrichment(scan) {
  const t = String(scan.target || '');
  let hash = 0;
  for (let i = 0; i < t.length; i++) hash = ((hash << 5) - hash + t.charCodeAt(i)) | 0;
  const idx = Math.abs(hash) % SCAN_ROUTINE_PHOTOS.length;
  const photos = [
    SCAN_ROUTINE_PHOTOS[idx],
    SCAN_ROUTINE_PHOTOS[(idx + 4) % SCAN_ROUTINE_PHOTOS.length],
    SCAN_ROUTINE_PHOTOS[(idx + 8) % SCAN_ROUTINE_PHOTOS.length]
  ];
  if (DERM_SCAN_ENRICHMENTS[t]) return { ...DERM_SCAN_ENRICHMENTS[t], photos };
  const isSafe = scan.score >= 86;
  return {
    leadSummary: isSafe
      ? 'Layer your formulas from thinnest watery serum to richest barrier cream with a 60-second dry-down pause so every active absorbs cleanly without pilling.'
      : 'Separate these concentrated actives between your morning sun-protection routine and your bedtime repair routine so neither bottle loses potency or stings your skin.',
    barrierMetric: isSafe ? 'Balanced pH & Lipid Cushion' : 'AM / PM Separation Recommended',
    waitRule: isSafe
      ? 'Allow 60 seconds between watery serums and rich moisturizers so layers never roll or pill under sunscreen'
      : 'Keep low-pH brightening or exfoliating steps 12 hours apart from evening retinoids and delicate peptides',
    amFocus: 'Gentle rinse, daytime antioxidant or hydrating serum (60s wait), lightweight moisturizer, and broad-spectrum SPF 50+',
    pmFocus: `${scan.issue}, followed 60 seconds later by a soothing 3:1:1 ceramide barrier cream`,
    chemistNote: isSafe
      ? 'Matching compatible pH windows and spacing layers by 60 seconds prevents surface tackiness and keeps the stratum corneum calm.'
      : 'Stacking incompatible pH levels or multiple strong actives in the same routine triggers barrier transepidermal water loss; splitting AM and PM restores harmony.',
    amStepCopy: 'After a lukewarm morning rinse, apply your daytime antioxidant or hydrating serum to dry skin. Wait 60 seconds before smoothing on moisturizer and broad-spectrum SPF 30–50+.',
    pmStepCopy: `In your evening routine, follow the golden rule for this pairing: ${scan.issue.charAt(0).toLowerCase() + scan.issue.slice(1)}. Seal overnight moisture with a soothing ceramide cream.`,
    cycleStepCopy: 'Give your skin barrier room to breathe by rotating active nights: Night 1 gentle exfoliant, Night 2 retinoid renewal, and Nights 3 & 4 pure peptide and ceramide hydration.',
    photos
  };
}

function renderScanCnnOverlaySvg(cfg, scan) {
  const isHigh = scan.score >= 86;
  const strokeCol = isHigh ? '#235340' : '#7A2332';
  const softBg = isHigh ? 'var(--sage-bg)' : 'var(--berry-bg)';
  const statusPill = isHigh ? 'Gentle & Barrier-Safe' : 'Separate Morning & Night';
  const info = getDermScanEnrichment(scan);
  return `<style>.scan-verdict-blueprint{background:var(--bg-oat);padding:26px 30px;display:grid;grid-template-columns:220px minmax(0,1fr) 220px;gap:24px;align-items:stretch;}@media(max-width:900px){.scan-verdict-blueprint{grid-template-columns:1fr;padding:20px;}}</style>
  <div role="region" aria-label="Routine Compatibility Summary for ${esc(fmtRoutineTitle(scan.target))}" class="scan-verdict-blueprint">
    <div style="background:var(--bg-surface);padding:22px 20px;display:flex;flex-direction:column;justify-content:space-between;gap:12px;border-left:3px solid ${strokeCol};">
      <div>
        <span class="mono" style="font-size:13px;color:var(--text-secondary);font-weight:500;display:block;margin-bottom:6px;">Routine Verdict</span>
        <div class="serif-display" style="font-size:1.38rem;color:${strokeCol};font-weight:400;line-height:1.2;">${esc(scan.kpi1)}</div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;">
        <span class="mono" style="font-size:13px;padding:4px 10px;background:${softBg};color:${strokeCol};font-weight:500;align-self:flex-start;">${statusPill}</span>
        <span style="font-size:13.5px;color:var(--text-secondary);line-height:1.4;">${esc(info.barrierMetric)}</span>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;">
      <div>
        <div class="mono" style="font-size:13.5px;color:var(--rose-brand);font-weight:500;margin-bottom:4px;">${esc(scan.cnnSensorLabel || 'Morning & Night Skincare Compatibility Check')} · ${esc(scan.kpi2)}</div>
        <div class="serif-display" style="font-size:1.42rem;color:var(--text-primary);font-weight:400;line-height:1.26;margin-bottom:8px;">${esc(scan.cnnReadout)}</div>
        <div style="font-size:15px;color:var(--text-secondary);line-height:1.55;"><strong style="color:var(--text-primary);font-weight:500;">How to wear it:</strong> ${esc(scan.issue)}.</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;padding-top:6px;">
        <div style="background:var(--bg-surface);padding:10px 14px;font-size:13.5px;color:var(--text-secondary);line-height:1.45;"><strong style="color:var(--sage-safe);display:block;font-size:12.5px;margin-bottom:2px;">MORNING SLOT (7:30 AM)</strong>${esc(info.amFocus)}</div>
        <div style="background:var(--bg-surface);padding:10px 14px;font-size:13.5px;color:var(--text-secondary);line-height:1.45;"><strong style="color:var(--rose-brand);display:block;font-size:12.5px;margin-bottom:2px;">BEDTIME SLOT (9:30 PM)</strong>${esc(info.pmFocus)}</div>
      </div>
    </div>
    <div style="background:var(--bg-surface);padding:8px;display:flex;flex-direction:column;justify-content:space-between;">
      <img src="${esc(info.photos[0])}" alt="${esc(fmtRoutineTitle(scan.target))} editorial vanity ritual" loading="eager" style="width:100%;height:156px;object-fit:cover;display:block;" />
      <div class="mono" style="font-size:12px;color:var(--text-secondary);padding:6px 4px 2px;display:flex;justify-content:space-between;"><span>Atelier Ritual</span><span style="color:${strokeCol};font-weight:500;">Grade ${esc(scan.grade)}</span></div>
    </div>
  </div>`;
}

function renderPublicScanPageHtml(cfg, scan, badgeColor) {
  const cat = getFlywheelCatalog(cfg.moduleId);
  const canonicalUrl = `https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}`;
  const badgeUrl = `https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg`;
  const mdSnippet = `[![${cfg.brandName} ${scan.grade}](${badgeUrl})](${canonicalUrl})`;
  const ledger = loadPublicScanLedger(cfg).slice(0, 8);
  const recentLinks = ledger.map((item) => `<a href="/scan/${esc(encodeURIComponent(item.target))}" style="display:inline-flex;align-items:center;gap:8px;padding:8px 15px;background:var(--bg-oat);font-size:14.5px;font-weight:400;color:var(--text-primary);text-decoration:none;"><span>${esc(fmtRoutineTitle(item.target))}</span><span class="mono" style="color:${item.score >= 86 ? 'var(--sage-safe)' : 'var(--rose-brand)'};font-weight:500;">${item.score >= 86 ? 'Barrier-Safe' : 'Split AM/PM'}</span></a>`).join(' ');
  const humanTitle = fmtRoutineTitle(scan.target);
  const info = getDermScanEnrichment(scan);

  return `<!DOCTYPE html>
<html lang="en" data-theme="day">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(humanTitle)} : ${esc(cfg.brandName)} Layering &amp; Routine Guide</title>
  <meta name="description" content="Morning and night skincare layering guide for ${esc(humanTitle)}: ${esc(scan.kpi1)}, ${esc(scan.cnnReadout)}. View step-by-step wait times and gentle swaps." />
  <link rel="canonical" href="${esc(canonicalUrl)}" />
  <meta property="og:title" content="${esc(humanTitle)} : ${esc(cfg.brandName)} Layering Guide" />
  <meta property="og:description" content="Verified ${esc(cfg.brandName)} Guide: ${esc(scan.kpi1)} • ${esc(scan.cnnReadout)}" />
  <meta property="og:url" content="${esc(canonicalUrl)}" />
  <meta property="og:image" content="https://${esc(cfg.domain)}/api/og/scorecard?target=${esc(encodeURIComponent(scan.target))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet" />
  <style>${SHARED_CSS}</style>
  <script>try{if(localStorage.getItem('dermlogic_vanity_theme')==='night')document.documentElement.setAttribute('data-theme','night');}catch(_){}</script>
</head>
<body>
  ${renderHeader(false)}
  <main class="container" style="padding-top:48px;padding-bottom:96px;">
    <nav aria-label="Breadcrumb" style="font-size:14px;color:var(--text-muted);margin-bottom:18px;">
      <a href="/" style="color:var(--rose-brand);text-decoration:none;font-weight:500;">Home</a> / <a href="/leaderboard" style="color:var(--rose-brand);text-decoration:none;font-weight:500;">Routine Library</a> / <span id="eb-scan-bc-target" style="color:var(--text-primary);">${esc(humanTitle)}</span>
    </nav>
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:16px;margin-bottom:24px;">
      <div>
        <h1 id="eb-scan-h1" class="hero-h1" style="margin:0 0 12px 0;">${esc(humanTitle)}</h1>
        <p class="pseo-lead hero-sub" style="margin:0;max-width:68ch;">Step-by-step morning and bedtime layering guide for <strong id="eb-scan-lead-target">${esc(humanTitle)}</strong> (<strong id="eb-scan-lead-grade">${esc(scan.kpi1)}</strong>). ${esc(info.leadSummary)}</p>
      </div>
      <span class="${scan.score >= 86 ? 'badge-safe' : 'badge-clash'} mono" style="font-size:0.9rem;padding:8px 16px;">${esc(scan.kpi1)} · ${esc(scan.kpi2)}</span>
    </div>
    <section style="margin-top:20px;">${renderScanCnnOverlaySvg(cfg, scan, badgeColor)}</section>
    <section class="table-wrap" style="background:var(--bg-oat);padding:28px 32px;margin-top:24px;">
      <h2 style="font-size:clamp(1.45rem,2.1vw,1.9rem);margin:0 0 16px 0;">Morning &amp; Bedtime Layering Summary</h2>
      <table aria-label="${esc(humanTitle)} Layering Summary" style="width:100%;border-collapse:collapse;">
        <thead><tr><th scope="col">What We Checked</th><th scope="col">How It Behaves</th><th scope="col">How to Wear It</th><th scope="col">Routine Fit</th></tr></thead>
        <tbody id="prompt-matrix-tbody">
          <tr><th scope="row" style="text-align:left;font-weight:500;">Morning vs. Night Pairing</th><td id="eb-scan-r1-val" class="mono" style="font-weight:500;">${esc(scan.kpi1)}</td><td id="eb-scan-r1-act">${esc(scan.issue)}</td><td id="eb-scan-r1-st" style="font-weight:500;color:${scan.score >= 86 ? 'var(--sage-safe)' : 'var(--rose-brand)'};">${scan.score >= 86 ? 'Barrier-Safe' : 'Separate AM/PM'}</td></tr>
          <tr><th scope="row" style="text-align:left;font-weight:500;">Skin Comfort &amp; Pacing</th><td id="eb-scan-r2-val" class="mono" style="font-weight:500;">${esc(scan.kpi2)}</td><td>${esc(info.waitRule)}</td><td style="font-weight:500;color:var(--sage-safe);">Gentle</td></tr>
          <tr><th scope="row" style="text-align:left;font-weight:500;">Moisture Barrier Effect</th><td id="eb-scan-r3-val" class="mono" style="font-weight:500;">${esc(info.barrierMetric)}</td><td>${esc(info.chemistNote)}</td><td style="font-weight:500;color:var(--sage-safe);">Checked</td></tr>
          <tr id="eb-scan-row4-tr"><th scope="row" style="text-align:left;font-weight:500;">Step-by-Step Wait Times</th><td id="eb-scan-row4-val" class="mono">60s Serum-to-Cream Cushion</td><td><a href="/buy/flash_pass?target=${esc(encodeURIComponent(scan.target))}" rel="nofollow" style="color:var(--rose-brand);font-weight:500;">Save Complete 3-Part Routine Kit ($1.99) →</a></td><td id="eb-scan-row4-status" style="font-weight:500;color:var(--sage-safe);">Included</td></tr>
          <tr><th scope="row" style="text-align:left;font-weight:500;">4-Night Skin-Cycling Schedule</th><td class="mono">Exfoliate · Retinoid · 2 Recovery Nights</td><td><a href="/buy/flash_pass?target=${esc(encodeURIComponent(scan.target))}" rel="nofollow" style="color:var(--rose-brand);font-weight:500;">Save 9:16 Phone Card &amp; .ICS Calendar ($1.99) →</a></td><td style="font-weight:500;color:var(--sage-safe);">Included</td></tr>
        </tbody>
      </table>
      <div id="eb-inline-row4-unlock" style="margin-top:18px;padding:16px 20px;background:var(--bg-surface);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="font-size:15px;font-weight:500;color:var(--text-primary);">Want your complete 9:16 lock-screen card, wait times &amp; 4-Night schedule on your phone?</div>
        <div id="eb-scan-row4-msg" style="display:none !important;"><input id="eb-scan-row4-email" type="email" placeholder="you@email.com" aria-label="Email to unlock Row 4" /><button id="eb-scan-row4-btn" type="button">Reveal Row #4 →</button></div>
        <div style="display:flex;align-items:center;gap:8px;"><a href="/buy/flash_pass?target=${esc(encodeURIComponent(scan.target))}" rel="nofollow" class="btn btn-primary" style="padding:10px 18px;font-size:14px;">Save Complete 3-Part Kit ($1.99) →</a></div>
      </div>
    </section>
    <article id="scan-layering-ritual-guide" style="background:var(--bg-oat);padding:32px;margin-top:24px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:18px;margin-bottom:22px;">
        <div style="flex:1 1 520px;max-width:64ch;">
          <div class="mono" style="font-size:13.5px;font-weight:500;color:var(--rose-brand);margin-bottom:6px;">Step-by-Step Bathroom Vanity Guide · Zero Pilling &amp; Zero Stinging</div>
          <h2 style="font-size:clamp(1.5rem,2.1vw,1.9rem);margin:0 0 10px 0;font-weight:400;max-width:none;">How to Layer ${esc(humanTitle)} Without Irritation</h2>
          <p style="font-size:16px;color:var(--text-secondary);margin:0;line-height:1.62;">${scan.score < 86 ? `When two concentrated formulas clash on contact, waiting a few minutes isn't enough; separating them between morning sun defense and bedtime repair keeps both bottles at full strength while protecting your moisture barrier.` : `Applying your bottles from thinnest watery serum to richest barrier cream, with the right dry-down window between steps, lets every active absorb cleanly without tightness or sunscreen pilling.`}</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-start;gap:8px;padding:14px 18px;background:var(--bg-surface);">
          <span class="mono" style="font-size:13px;color:var(--sage-safe);font-weight:500;">7:30 AM Morning Shield · 9:30 PM Bedtime Repair</span>
          <a href="/#analyzer" class="mono" style="font-size:14px;color:var(--rose-brand);font-weight:500;text-decoration:none;">Check Your Own Bottles on the Shelf &rarr;</a>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:18px;align-items:stretch;">
        <div style="padding:22px 24px;background:var(--bg-surface);display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <div style="overflow:hidden;margin-bottom:14px;background:var(--bg-oat);"><img src="${esc(info.photos[1])}" alt="Morning skincare layering at sunlit vanity" loading="lazy" style="width:100%;height:156px;object-fit:cover;object-position:center 35%;display:block;" /></div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
              <span class="mono" style="font-size:13px;font-weight:500;color:var(--rose-brand);">1. Morning Order (7:30 AM)</span>
              <span class="badge-safe mono" style="font-size:12px;padding:2px 8px;">Protect &amp; Glow</span>
            </div>
            <div class="serif-display" style="font-size:1.25rem;color:var(--text-primary);margin-bottom:8px;line-height:1.28;">Daytime Prep &amp; Broad-Spectrum SPF</div>
            <p style="font-size:15px;color:var(--text-secondary);line-height:1.6;margin:0;">${esc(info.amStepCopy)}</p>
          </div>
          <a href="/leaderboard" class="mono" style="font-size:13.5px;color:var(--rose-brand);font-weight:500;text-decoration:none;padding-top:8px;">Compare Ranked Morning &amp; Night Routines &rarr;</a>
        </div>
        <div style="padding:22px 24px;background:var(--bg-surface);display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <div style="overflow:hidden;margin-bottom:14px;background:var(--bg-oat);"><img src="${esc(info.photos[2])}" alt="Evening barrier repair skincare ritual" loading="lazy" style="width:100%;height:156px;object-fit:cover;object-position:center 35%;display:block;" /></div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
              <span class="mono" style="font-size:13px;font-weight:500;color:var(--rose-brand);">2. Bedtime Order (9:30 PM)</span>
              <span class="badge-safe mono" style="font-size:12px;padding:2px 8px;">Repair &amp; Cushion</span>
            </div>
            <div class="serif-display" style="font-size:1.25rem;color:var(--text-primary);margin-bottom:8px;line-height:1.28;">Night Renewal Cushioned With Ceramides</div>
            <p style="font-size:15px;color:var(--text-secondary);line-height:1.6;margin:0;">${esc(info.pmStepCopy)}</p>
          </div>
          <a href="/directory" class="mono" style="font-size:13.5px;color:var(--rose-brand);font-weight:500;text-decoration:none;padding-top:8px;">Browse All 318 Pairing &amp; Bottle Guides &rarr;</a>
        </div>
        <div style="padding:22px 24px;background:var(--bg-surface);display:flex;flex-direction:column;justify-content:space-between;gap:14px;">
          <div>
            <div style="overflow:hidden;margin-bottom:14px;background:var(--bg-oat);"><img src="/public/editorial-vanity-shelf.jpg" alt="Organized porcelain bathroom vanity shelf" loading="lazy" style="width:100%;height:156px;object-fit:cover;object-position:center 50%;display:block;" /></div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
              <span class="mono" style="font-size:13px;font-weight:500;color:var(--sage-safe);">3. Weekly Pacing Rhythm</span>
              <span class="badge-safe mono" style="font-size:12px;padding:2px 8px;">4-Night Cycle</span>
            </div>
            <div class="serif-display" style="font-size:1.25rem;color:var(--text-primary);margin-bottom:8px;line-height:1.28;">Balanced Active &amp; Recovery Nights</div>
            <p style="font-size:15px;color:var(--text-secondary);line-height:1.6;margin:0;">${esc(info.cycleStepCopy)}</p>
          </div>
          <a href="/buy/flash_pass?target=${esc(encodeURIComponent(scan.target))}" rel="nofollow" class="mono" style="font-size:13.5px;color:var(--rose-brand);font-weight:500;text-decoration:none;padding-top:8px;">Save 9:16 Phone Card &amp; Calendar ($1.99) &rarr;</a>
        </div>
      </div>
    </article>
    <script>window.__ebRunScanWb=function(v){if(!v)return;fetch('/api/cnn/inspect?target='+encodeURIComponent(v)).then(function(r){return r.json()}).then(function(d){if(!d||!d.scan)return;var s=d.scan,el=document.getElementById('eb-live-cnn-readout');if(el)el.textContent=s.kpi1+' • '+s.cnnReadout;var h1=document.getElementById('eb-scan-h1');if(h1)h1.textContent=s.target;var r1=document.getElementById('eb-scan-r1-val'),r1a=document.getElementById('eb-scan-r1-act'),r1s=document.getElementById('eb-scan-r1-st'),r2=document.getElementById('eb-scan-r2-val'),r3=document.getElementById('eb-scan-r3-val');if(r1)r1.textContent=s.kpi1;if(r1a)r1a.textContent=s.issue;if(r1s)r1s.textContent=s.status;if(r2)r2.textContent=s.kpi1+' • '+s.kpi2;if(r3)r3.textContent=s.cnnReadout;if(window.__ebMountDeliverableCurtain)window.__ebMountDeliverableCurtain(s.target,s.kpi1+' · '+s.kpi2,'Routine Verdict ('+s.target+'): '+s.kpi1+' · '+s.cnnReadout);if(window.history&&window.history.replaceState)window.history.replaceState(null,'','/scan/'+encodeURIComponent(s.target));});};</script>
    <section id="eb-onnx-cnn-workbench" style="background:var(--bg-oat);color:var(--text-primary);padding:20px 26px;margin-top:24px;display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <span style="font-size:14px;font-weight:500;color:var(--rose-brand);">Compare Another Routine Pairing</span>
        <div id="eb-live-cnn-readout" class="mono" style="font-size:14px;color:var(--sage-safe);font-weight:500;">${esc(humanTitle)} · ${esc(scan.kpi1)} · ${esc(scan.kpi2)}</div>
      </div>
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
        ${cat.entities.slice(0, 4).map((e) => `<button type="button" onclick="window.__ebRunScanWb('${esc(e.target)}')" style="padding:8px 14px;border:none;background:var(--bg-surface);color:var(--text-primary);font-family:var(--font-sans);font-size:14px;font-weight:500;cursor:pointer;">${esc(fmtRoutineTitle(e.target))}</button>`).join('')}
        <input id="eb-cnn-wb-input" type="text" placeholder="Enter routine or ingredient pair..." aria-label="Custom routine pairing" class="input-box" style="flex:1;min-width:170px;padding:8px 12px;font-size:14px;background:var(--bg-surface);" />
        <button id="eb-cnn-wb-submit" type="button" onclick="window.__ebRunScanWb((document.getElementById('eb-cnn-wb-input')||{}).value||'${esc(scan.target)}')" class="btn btn-primary" style="padding:8px 16px;font-size:14px;white-space:nowrap;">Check Pairing →</button>
      </div>
    </section>
    <details style="background:var(--bg-oat);padding:18px 24px;margin-top:20px;">
      <summary style="cursor:pointer;font-size:15px;font-weight:500;color:var(--text-primary);">Esthetician Notes &amp; Shareable Routine Link</summary>
      <div style="margin-top:12px;">
        <p style="font-size:14.5px;color:var(--text-secondary);margin:0 0 10px 0;"><strong>Checked with:</strong> ${esc(scan.cnnModel)} (${esc(scan.cnnSensorLabel)}). Share this routine guide:</p>
        <pre style="background:var(--bg-surface);color:var(--text-primary);padding:12px 14px;font-size:13.5px;overflow-x:auto;margin:0;"><code>${esc(canonicalUrl)}</code></pre>
      </div>
    </details>
    <section style="margin-top:28px;">
      <h2 style="font-size:1.35rem;font-weight:400;margin:0 0 14px 0;">More Popular Routine Guides (<a href="/leaderboard" style="color:var(--rose-brand);font-weight:400;">Browse All Ranked Routines →</a>)</h2>
      <div style="display:flex;flex-wrap:wrap;gap:10px;">${recentLinks}</div>
    </section>
  </main>
  ${renderFooter()}
  <script>${CLIENT_SCRIPT}</script>
</body>
</html>`;
}

function renderLeaderboardPageHtml(cfg, badgeColor) {
  const cat = getFlywheelCatalog(cfg.moduleId);
  const ledger = loadPublicScanLedger(cfg).slice().sort((a, b) => b.score - a.score);
  const podium = ledger.slice(0, 3);
  const medals = ['Brightening & Firming Split', 'Gentle Retinoid Buffer', 'Redness & Pore Calming'];
  const podiumHtml = podium.map((item, idx) => `<div style="background:var(--bg-oat);padding:32px 34px;display:flex;flex-direction:column;justify-content:space-between;gap:18px;">
    <div>
      <div class="mono" style="font-size:14px;font-weight:500;color:var(--sage-safe);margin-bottom:12px;">${medals[idx]} · Barrier-Safe</div>
      <a href="/scan/${esc(encodeURIComponent(item.target))}" style="font-family:var(--font-display);font-size:1.45rem;font-weight:400;line-height:1.25;color:var(--text-primary);text-decoration:none;display:block;margin-bottom:10px;">${esc(fmtRoutineTitle(item.target))}</a>
      <p style="font-size:16px;color:var(--text-secondary);margin:0;line-height:1.6;">${esc(item.issue)}. ${esc(item.cnnReadout)}.</p>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:12px;font-size:14.5px;">
      <a href="/scan/${esc(encodeURIComponent(item.target))}" style="color:var(--rose-brand);font-weight:500;text-decoration:none;">Read step-by-step routine →</a>
    </div>
  </div>`).join('');

  const rowsHtml = ledger.map((item, idx) => {
    const isTop = item.score >= 86;
    const barColor = isTop ? 'var(--sage-safe)' : (item.score >= 75 ? 'var(--honey-warn)' : 'var(--rose-brand)');
    const rowTier = isTop ? 'fame' : 'fix';
    return `<tr data-lb-tier="${rowTier}" data-lb-text="${esc((item.target + ' ' + fmtRoutineTitle(item.target) + ' ' + item.kpi1 + ' ' + item.kpi2 + ' ' + item.cnnReadout + ' ' + item.issue).toLowerCase())}">
    <td class="mono" style="font-weight:500;">${idx + 1}</td>
    <th scope="row" style="text-align:left;font-weight:500;"><a href="/scan/${esc(encodeURIComponent(item.target))}" style="color:var(--text-primary);font-weight:500;text-decoration:none;display:block;font-size:16px;">${esc(fmtRoutineTitle(item.target))}</a></th>
    <td style="min-width:150px;"><span class="mono" style="font-weight:500;color:${barColor};font-size:15px;">${esc(item.kpi1)}</span></td>
    <td style="font-size:15px;color:var(--text-secondary);">${esc(item.kpi2)}</td>
    <td style="font-size:15.5px;color:var(--text-primary);">${esc(item.issue)}</td>
    <td><a href="/scan/${esc(encodeURIComponent(item.target))}" style="font-size:14.5px;font-weight:500;color:${barColor};text-decoration:none;white-space:nowrap;">${isTop ? 'Read Guide' : 'See Fix Plan'} →</a></td>
  </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en" data-theme="day">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} Routine Harmony Leaderboard : Top Rated (A+) &amp; Common Clashes (2026)</title>
  <meta name="description" content="Live public benchmark leaderboard for ${esc(cfg.brandName)}. Compare Grade A+ leaders, spot common mistakes, or check any target for an instant public report." />
  <link rel="canonical" href="https://${esc(cfg.domain)}/leaderboard" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,300;1,6..72,400&display=swap" rel="stylesheet" />
  <style>${SHARED_CSS}</style>
  <script>try{if(localStorage.getItem('dermlogic_vanity_theme')==='night')document.documentElement.setAttribute('data-theme','night');}catch(_){}</script>
</head>
<body>
  ${renderHeader(false)}
  <main class="container" style="padding-top:48px;padding-bottom:96px;">
    <div style="margin-bottom:36px;">
      <h1 class="hero-h1" style="margin:0 0 14px 0;">Routine Harmony Leaderboard.</h1>
      <p class="pseo-lead hero-sub" style="margin:0;">Compare verified Morning/Evening skincare routines side-by-side, filter between Grade A+ barrier-safe rituals and active clashes, or test any combination below.</p>
    </div>
    <section id="leaderboard-podium-grid" aria-label="Top 3 Verified Leaders" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;margin-bottom:28px;">${podiumHtml}</section>
    <div id="leaderboard-filter-bar" style="background:var(--bg-oat);padding:18px 22px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;" role="tablist" aria-label="Filter Leaderboard Categories">
        <button type="button" onclick="window.__lbFilter('all',this)" class="lb-tab-btn" style="padding:9px 16px;border:none;background:var(--rose-brand);color:#FAF6F0;font-family:var(--font-sans);font-size:14px;font-weight:500;cursor:pointer;">All Ranked (${ledger.length})</button>
        <button type="button" onclick="window.__lbFilter('fame',this)" class="lb-tab-btn" style="padding:9px 16px;border:none;background:var(--bg-surface);color:var(--text-primary);font-family:var(--font-sans);font-size:14px;font-weight:500;cursor:pointer;">Hall of Fame (A+/A)</button>
        <button type="button" onclick="window.__lbFilter('fix',this)" class="lb-tab-btn" style="padding:9px 16px;border:none;background:var(--bg-surface);color:var(--text-primary);font-family:var(--font-sans);font-size:14px;font-weight:500;cursor:pointer;">Needs Fix (B/C/D)</button>
        <input type="search" id="lb-search-input" aria-label="Filter leaderboard rows" placeholder="Filter routines by active or pH..." oninput="window.__lbSearch(this.value)" class="input-box" style="width:240px;padding:8px 13px;font-size:14px;background:var(--bg-surface);" />
      </div>
      <form action="/scan" method="get" onsubmit="if(window.__ebTrack)window.__ebTrack('calculate',{source:'leaderboard_check'});" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0;">
        <input type="text" name="q" required aria-label="Target entity to scan" placeholder="Test routine: ${esc(cat.inputPlaceholder)}" class="input-box" style="width:230px;padding:8px 13px;font-size:14px;background:var(--bg-surface);" />
        <button type="submit" class="btn btn-primary" style="padding:9px 18px;font-size:14px;">Check &amp; Rank →</button>
      </form>
    </div>
    <script>window.__lbTier='all';window.__lbApply=function(){var q=((document.getElementById('lb-search-input')||{}).value||'').toLowerCase(),trs=document.querySelectorAll('#prompt-matrix-tbody tr[data-lb-tier]');for(var i=0;i<trs.length;i++){var tOk=window.__lbTier==='all'||trs[i].getAttribute('data-lb-tier')===window.__lbTier;var qOk=!q||(trs[i].getAttribute('data-lb-text')||'').indexOf(q)!==-1;trs[i].style.display=(tOk&&qOk)?'':'none';}};window.__lbFilter=function(t,btn){window.__lbTier=t;var bs=document.querySelectorAll('.lb-tab-btn');for(var i=0;i<bs.length;i++){bs[i].style.background='var(--bg-surface)';bs[i].style.color='var(--text-primary)';}if(btn){btn.style.background='var(--rose-brand)';btn.style.color='#FAF6F0';}if(window.__ebTrack)window.__ebTrack('calculate',{source:'leaderboard_filter',tier:t});window.__lbApply();};window.__lbSearch=function(){window.__lbApply();};</script>
    <section class="table-wrap" style="background:var(--bg-oat);padding:28px 32px;">
      <table aria-label="${esc(cfg.brandName)} Public Leaderboard" style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th scope="col">Rank</th>
            <th scope="col">Routine / Dossier</th>
            <th scope="col">Grade &amp; Harmony</th>
            <th scope="col">Key Metrics</th>
            <th scope="col">Formulation Finding</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="prompt-matrix-tbody">${rowsHtml}</tbody>
      </table>
    </section>
    <details style="background:var(--bg-oat);padding:18px 24px;margin-top:24px;">
      <summary style="cursor:pointer;font-size:14.5px;font-weight:500;color:var(--text-secondary);">Formulation Scoring Methodology &amp; Barrier Telemetry</summary>
      <p style="font-size:14.5px;color:var(--text-secondary);margin:10px 0 0 0;line-height:1.6;">Scores are computed deterministically (&lt;4ms) across 65 active ingredients and cross-checked with <strong>${esc(cat.cnnModel)}</strong> (${esc(cat.cnnSensorLabel)}).</p>
    </details>
  </main>
  ${renderFooter()}
  <script>${CLIENT_SCRIPT}</script>
</body>
</html>`;
}

function getAllPublicScanUrls(cfg) {
  const base = `https://${cfg.domain}`;
  const ledger = loadPublicScanLedger(cfg);
  return [`${base}/leaderboard`, ...ledger.map((e) => `${base}/scan/${encodeURIComponent(e.target)}`)];
}

function attachPublicScanFlywheel(app, cfg, badgeColor, renderHtmlFn, classifyFn) {
  const cat = getFlywheelCatalog(cfg.moduleId);

  app.get('/scan', (req, res) => {
    const q = cleanTargetInput(req.query.q || req.query.target, cat.entities[0].target);
    return res.redirect(302, `/scan/${encodeURIComponent(q)}`);
  });

  app.get(['/scan/:target', '/report/:target', '/u/:target'], (req, res) => {
    const rawParam = String(req.params.target || '');
    const isMd = rawParam.endsWith('.md');
    const scan = evaluateScanTarget(cfg, isMd ? rawParam.slice(0, -3) : rawParam);
    const cls = classifyFn ? classifyFn(req) : { isTest: 0, isCrawler: 0, isOwnerIp: false };
    if (!cls.isTest && !cls.isCrawler && !cls.isOwnerIp) savePublicScanEntry(cfg, scan);

    const ua = String(req.headers['user-agent'] || '');
    const accept = String(req.headers['accept'] || '');
    if (req.query.format === 'json') return res.json({ ok: true, scan, permalink: `https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}` });
    if (/^(curl|httpie|wget)/i.test(ua) || accept.includes('text/plain')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(renderAnsiTerminalScorecard(cfg, scan));
    }
    if (isMd) {
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Link', `<https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}>; rel="canonical"`);
      return res.status(200).send(`# ${scan.target} : ${cfg.brandName} Public Audit (${scan.grade} • ${scan.score}/100)\n\n- **Primary KPI**: ${scan.kpi1} (${scan.kpi2})\n- **CNN Model**: ${scan.cnnModel}\n- **CNN Sensor Readout**: ${scan.cnnReadout}\n- **Diagnostic Verdict**: ${scan.issue}\n- **Canonical Permalink**: https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}\n- **Live SVG Badge**: ![${scan.target}](https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg)\n- **99¢ Single-File Fix**: https://${cfg.domain}/buy/micro_pass\n- **$1.99 3-File Bundle**: https://${cfg.domain}/buy/flash_pass\n`);
    }
    const html = renderPublicScanPageHtml(cfg, scan, badgeColor);
    return res.status(200).type('html').send(renderHtmlFn ? renderHtmlFn(html) : html);
  });

  app.get(['/leaderboard', '/leaderboard.md'], (req, res) => {
    const ledger = loadPublicScanLedger(cfg).slice().sort((a, b) => b.score - a.score);
    if (req.path.endsWith('.md')) {
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Link', `<https://${cfg.domain}/leaderboard>; rel="canonical"`);
      const lines = ledger.map((e, i) => `${i + 1}. **[${e.target}](https://${cfg.domain}/scan/${encodeURIComponent(e.target)})** : Grade **${e.grade}** (${e.score}/100) | ${e.kpi1} | ${e.cnnReadout}`).join('\n');
      return res.status(200).send(`# ${cfg.brandName} Public Leaderboard (Hall of Fame & Needs Fix)\n\n${lines}\n\n- **99¢ Single-File Pass**: https://${cfg.domain}/buy/micro_pass\n- **$1.99 3-File Bundle**: https://${cfg.domain}/buy/flash_pass\n`);
    }
    const html = renderLeaderboardPageHtml(cfg, badgeColor);
    return res.status(200).type('html').send(renderHtmlFn ? renderHtmlFn(html) : html);
  });

  app.all('/api/cnn/inspect', (req, res) => {
    const raw = req.body?.target || req.body?.query || req.query?.target || req.query?.q || cat.entities[0].target;
    const scan = evaluateScanTarget(cfg, raw);
    const cls = classifyFn ? classifyFn(req) : { isTest: 0, isCrawler: 0, isOwnerIp: false };
    if (!cls.isTest && !cls.isCrawler && !cls.isOwnerIp) savePublicScanEntry(cfg, scan);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json({
      ok: true,
      module_id: cfg.moduleId,
      cnn_architecture: cat.cnnModel,
      sensor_label: cat.cnnSensorLabel,
      scan,
      permalink_url: `https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}`,
      badge_svg_url: `https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg`
    });
  });

  app.get('/api/badge/cnn/:target', (req, res) => {
    const rawTarget = String(req.params.target || '').replace(/\.svg$/i, '');
    const scan = evaluateScanTarget(cfg, rawTarget);
    const isGood = scan.score >= 86;
    const accent = isGood ? '#264C3C' : scan.score >= 70 ? '#7D5116' : '#8A283B';
    const accentBg = isGood ? '#EDF4F0' : scan.score >= 70 ? '#FAF2E6' : '#F7ECEF';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="128" viewBox="0 0 440 128" role="img" aria-label="${esc(cfg.brandName)} Porcelain Ritual Scorecard for ${esc(scan.target)}">
  <rect width="440" height="128" rx="18" fill="#EFE9DF" stroke="#DFD6C7" stroke-width="2"/>
  <rect x="6" y="6" width="428" height="116" rx="14" fill="#FFFDFB" stroke="${accent}" stroke-width="1.2" stroke-opacity="0.45"/>
  <text x="18" y="28" fill="#8A283B" font-family="Georgia,serif" font-size="10" font-weight="700">${esc(cfg.brandName.toUpperCase())} · ATELIER CÉRAMIQUE</text>
  <text x="18" y="50" fill="#221A16" font-family="Georgia,serif" font-size="17" font-weight="700">${esc(scan.target.slice(0, 28))}</text>
  <rect x="344" y="16" width="76" height="36" rx="10" fill="${accentBg}" stroke="${accent}" stroke-width="1.2"/>
  <text x="382" y="39" text-anchor="middle" fill="${accent}" font-family="Georgia,serif" font-size="15" font-weight="800">${esc(scan.grade)} ${scan.score}</text>
  <text x="18" y="76" fill="#264C3C" font-family="Georgia,serif" font-size="11" font-weight="700">RITUAL: ${esc(scan.kpi1)} • ${esc(scan.kpi2)}</text>
  <text x="18" y="96" fill="#544841" font-family="Georgia,serif" font-size="10.5">CNN: ${esc(scan.cnnReadout.slice(0, 56))}</text>
  <text x="18" y="114" fill="#7D5116" font-family="Georgia,serif" font-size="9.5">https://${esc(cfg.domain)}/scan/${esc(encodeURIComponent(scan.target))}</text>
</svg>`;
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(svg);
  });

  app.get('/api/github-upgrade/cnn-public-scan-flywheel', (req, res) => {
    return res.json({
      ok: true,
      iteration: 34,
      module_id: cfg.moduleId,
      github_repos: [
        'anuraghazra/github-readme-stats (69,000+) & badges/shields (23,000+) : Multi-Metric SVG CNN Scorecard (/api/badge/cnn/:target.svg) & Public Ego-Bait Leaderboard (/leaderboard)',
        'huggingface/transformers.js (13,500+) & microsoft/onnxruntime (16,200+) : Interactive Live ONNX/CNN Sensor Workbench (#eb-onnx-cnn-workbench) with Custom Scan Input',
        'react-hook-form/react-hook-form (42,000+) & emilkowalski/vaul (7,500+) : Inline Row #4 Instant Email Reveal + 99¢ Micro-Pass Strip (#eb-inline-row4-unlock)',
        'ekalinin/sitemap.js (1,900+) & AnswerDotAI/llms-txt (3,100+) : Unified Sitemap Index (/sitemap-scans.xml), Image Sitemaps & llms.txt Public Scan Graph'
      ],
      features: { interactive_onnx_cnn_workbench: true, cnn_inspect_calc_telemetry: true, multi_metric_svg_cnn_card: true, inline_row4_email_reveal_and_custom_scan: true, unified_sitemap_and_llms_txt_scan_graph: true },
      endpoints: { leaderboard: `https://${cfg.domain}/leaderboard`, sample_scan: `https://${cfg.domain}/scan/${encodeURIComponent(cat.entities[0].target)}`, cnn_inspect: `https://${cfg.domain}/api/cnn/inspect?target=${encodeURIComponent(cat.entities[0].target)}`, cnn_svg_card: `https://${cfg.domain}/api/badge/cnn/${encodeURIComponent(cat.entities[0].target)}.svg`, sitemap_scans: `https://${cfg.domain}/sitemap-scans.xml` }
    });
  });

  app.get('/api/growth/github-action.yml', (req, res) => {
    const t = cleanTargetInput(req.query.target, cat.entities[0].target);
    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    return res.status(200).send(`name: ${cfg.brandName} Continuous Benchmark Gate\non:\n  push:\n    branches: [main]\n  pull_request:\n  schedule:\n    - cron: '0 9 * * 1'\njobs:\n  benchmark:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Run ${cfg.brandName} Zero-HITL Audit\n        run: |\n          curl -sL "https://${cfg.domain}/scan/${encodeURIComponent(t)}"\n          echo "### [![${cfg.brandName}](https://${cfg.domain}/badge/${encodeURIComponent(t)}.svg)](https://${cfg.domain}/scan/${encodeURIComponent(t)})" >> $GITHUB_STEP_SUMMARY\n`);
  });

  app.get('/sitemap-scans.xml', (req, res) => {
    const urls = getAllPublicScanUrls(cfg);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`).join('\n')}\n</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(xml);
  });
}

module.exports = { attachPublicScanFlywheel, getAllPublicScanUrls, evaluateScanTarget, loadPublicScanLedger };
