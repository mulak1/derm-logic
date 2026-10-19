/**
 * DermLogic (#4): SQLite Persistence Layer (/data/derm_logic.db)
 * Seeds 65 clinical INCI ingredients, 44 cult skincare products, 60 pSEO pages,
 * Thompson-Sampling pricing arms, and Meta Pixel + CAPI event deduplication logs.
 */

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { CLINICAL_INGREDIENTS, CULT_PRODUCTS } = require('./clinical-data');
const { buildSeoPagesCatalog } = require('./pseo-catalog');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'derm_logic.db');
const db = new Database(DB_PATH);
const origPrepare = db.prepare.bind(db);
const stmtCache = new Map();
db.prepare = function cachedPrepare(sql) {
  let stmt = stmtCache.get(sql);
  if (!stmt) { stmt = origPrepare(sql); stmtCache.set(sql, stmt); }
  return stmt;
};
db.pragma('journal_mode = WAL');
db.pragma('synchronous = NORMAL');

function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS ingredients (
      id TEXT PRIMARY KEY,
      inci_name TEXT NOT NULL,
      common_name TEXT NOT NULL,
      aliases_json TEXT NOT NULL,
      category TEXT NOT NULL,
      active_class TEXT NOT NULL,
      ph_min REAL,
      ph_max REAL,
      pka REAL,
      molecular_weight_da REAL,
      comedogenicity INTEGER NOT NULL DEFAULT 0,
      irritation_index INTEGER NOT NULL DEFAULT 0,
      malassezia_trigger INTEGER NOT NULL DEFAULT 0,
      pregnancy_safe TEXT NOT NULL DEFAULT 'SAFE',
      function_role TEXT NOT NULL,
      clinical_mechanism TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      brand TEXT NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      ph REAL NOT NULL,
      price_usd REAL NOT NULL,
      primary_actives_json TEXT NOT NULL,
      inci_list TEXT NOT NULL,
      summary TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS seo_pages (
      slug TEXT PRIMARY KEY,
      page_type TEXT NOT NULL,
      title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      category TEXT NOT NULL,
      verdict TEXT NOT NULL,
      compatibility_score INTEGER NOT NULL,
      delta_ph REAL NOT NULL,
      conflict_type TEXT NOT NULL,
      summary TEXT NOT NULL,
      am_rule TEXT NOT NULL,
      pm_rule TEXT NOT NULL,
      wait_time_minutes INTEGER NOT NULL,
      payload_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS routine_scans (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      skin_type TEXT NOT NULL,
      product_ids_json TEXT NOT NULL,
      raw_inci_text TEXT,
      compatibility_score INTEGER NOT NULL,
      barrier_hazard_index INTEGER NOT NULL,
      comedogenic_load INTEGER NOT NULL,
      conflicts_count INTEGER NOT NULL,
      execution_ms REAL NOT NULL,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS meta_capi_events (
      event_id TEXT PRIMARY KEY,
      event_name TEXT NOT NULL,
      source_url TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      fbp TEXT,
      fbc TEXT,
      value_usd REAL DEFAULT 0,
      currency TEXT DEFAULT 'USD',
      custom_data_json TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS checkout_orders (
      order_id TEXT PRIMARY KEY,
      plan_id TEXT NOT NULL,
      plan_name TEXT NOT NULL,
      amount_cents INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'usd',
      email TEXT,
      bandit_arm TEXT,
      routine_summary_json TEXT,
      status TEXT NOT NULL DEFAULT 'COMPLETED_SELF_SERVE',
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS bandit_arms (
      arm_id TEXT PRIMARY KEY,
      label TEXT NOT NULL,
      plan_id TEXT NOT NULL,
      price_cents INTEGER NOT NULL,
      badge_copy TEXT NOT NULL,
      alpha INTEGER NOT NULL DEFAULT 12,
      beta INTEGER NOT NULL DEFAULT 4,
      impressions INTEGER NOT NULL DEFAULT 0,
      conversions INTEGER NOT NULL DEFAULT 0
    );
  `);

  // Seed ingredients
  const insertIng = db.prepare(`
    INSERT OR REPLACE INTO ingredients (
      id, inci_name, common_name, aliases_json, category, active_class,
      ph_min, ph_max, pka, molecular_weight_da, comedogenicity, irritation_index,
      malassezia_trigger, pregnancy_safe, function_role, clinical_mechanism
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertProd = db.prepare(`
    INSERT OR REPLACE INTO products (
      id, brand, name, category, ph, price_usd, primary_actives_json, inci_list, summary
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertSeo = db.prepare(`
    INSERT OR REPLACE INTO seo_pages (
      slug, page_type, title, meta_description, category, verdict,
      compatibility_score, delta_ph, conflict_type, summary, am_rule, pm_rule,
      wait_time_minutes, payload_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertArm = db.prepare(`
    INSERT OR IGNORE INTO bandit_arms (
      arm_id, label, plan_id, price_cents, badge_copy, alpha, beta, impressions, conversions
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const ingredientsMap = new Map();
  const productsMap = new Map();

  const tx = db.transaction(() => {
    for (const ing of CLINICAL_INGREDIENTS) {
      ingredientsMap.set(ing.id, ing);
      insertIng.run(
        ing.id,
        ing.inciName,
        ing.commonName,
        JSON.stringify(ing.aliases),
        ing.category,
        ing.activeClass,
        ing.phMin,
        ing.phMax,
        ing.pka,
        ing.molecularWeightDa,
        ing.comedogenicity,
        ing.irritationIndex,
        ing.malasseziaTrigger ? 1 : 0,
        ing.pregnancySafe,
        ing.functionRole,
        ing.clinicalMechanism
      );
    }

    for (const prod of CULT_PRODUCTS) {
      productsMap.set(prod.id, prod);
      insertProd.run(
        prod.id,
        prod.brand,
        prod.name,
        prod.category,
        prod.ph,
        prod.priceUsd,
        JSON.stringify(prod.primaryActives),
        prod.inciList,
        prod.summary
      );
    }

    const seoPages = buildSeoPagesCatalog(ingredientsMap, productsMap);
    for (const page of seoPages) {
      insertSeo.run(
        page.slug,
        page.pageType,
        page.title,
        page.metaDescription,
        page.category,
        page.verdict,
        page.compatibilityScore,
        page.deltaPh,
        page.conflictType,
        page.summary,
        page.amRule,
        page.pmRule,
        page.waitTimeMinutes,
        JSON.stringify(page)
      );
    }

    insertArm.run(
      'arm_rescue_499',
      '$4.99 One-Time Clinical Routine Rescue Card & PDF Protocol',
      'onetime_499',
      499,
      'Sub-5ms Henderson-Hasselbalch ΔpH Engine · Instant Apple-Wallet Card',
      18,
      4,
      14,
      4
    );
    insertArm.run(
      'arm_unlimited_1999',
      '$19.99/yr Unlimited Shelf Scanner + Fungal-Acne & Rx Tracker',
      'annual_1999',
      1999,
      'Most Popular with 3+ Active Regimens · Unlimited INCI Audits',
      14,
      5,
      11,
      3
    );
  });

  tx();
}

initDatabase();

function sampleBetaArm() {
  const arms = db.prepare('SELECT * FROM bandit_arms').all();
  let bestArm = arms[0];
  let bestScore = -1;
  for (const arm of arms) {
    // Deterministic-friendly Thompson sample using mean + exploration bonus
    const jitter = (Math.sin(Date.now() + arm.price_cents) + 1) * 0.04;
    const score = arm.alpha / (arm.alpha + arm.beta) + jitter;
    if (score > bestScore) {
      bestScore = score;
      bestArm = arm;
    }
  }
  return { selectedArm: bestArm, allArms: arms };
}

function recordMetaEvent(payload) {
  const eventId = payload.event_id || `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
  const existing = db.prepare('SELECT event_id FROM meta_capi_events WHERE event_id = ?').get(eventId);
  if (existing) {
    return { deduplicated: true, event_id: eventId };
  }
  db.prepare(`
    INSERT INTO meta_capi_events (
      event_id, event_name, source_url, utm_source, utm_medium, utm_campaign,
      utm_content, utm_term, fbp, fbc, value_usd, currency, custom_data_json, user_agent, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    eventId,
    payload.event_name || 'ViewContent',
    payload.source_url || '',
    payload.utm_source || '',
    payload.utm_medium || '',
    payload.utm_campaign || '',
    payload.utm_content || '',
    payload.utm_term || '',
    payload.fbp || '',
    payload.fbc || '',
    Number(payload.value || 0),
    payload.currency || 'USD',
    JSON.stringify(payload.custom_data || {}),
    payload.user_agent || '',
    new Date().toISOString()
  );
  return { deduplicated: false, event_id: eventId };
}

module.exports = {
  db,
  DB_PATH,
  sampleBetaArm,
  recordMetaEvent
};
