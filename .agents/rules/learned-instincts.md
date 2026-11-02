# DermLogic — Learned Instincts & Permanent Craft Laws (`Tier 1`)

## 1. Visual Symmetry, Zero Dead Whitespace & Single-Screen Fit (`confidence: 0.99`)
- `#analyzer` Left Column (`.grader-card`) and Right Column (`.results-panel`) must match heights (`~720px–750px`, `0px` bottom dead white-space gap).
- Enforce strict **One-In, One-Out DOM Complexity**: never stack the AM/PM routine cards AND the Clash breakdown cards simultaneously on initial load. Only 1 tab view in `#dl-results-step-bar` may be `display: flex` at a time.

## 2. Everyday Women's Beauty English (`confidence: 0.99`)
- Write in warm, clear, everyday beauty English (Sephora / Glossier / Rhode standard).
- Never output banned chemistry, developer, or B2B phrases (`Sunk-Cost`, `Bioavailability`, `Culprit Autopsy`, `Perioral Sting`, `Nasolabial`, `Micro-Fissures`, `PAO Oxidation`, `Bos & Meinardi`, `Ester Hydrolysis`, `Stratum Corneum`, `Transepidermal`, `TEWL`, `Equilibration`, `pKa`, `Daltons`, `Unsaved Tab Session`, `Calibrations Active`).

## 3. Core `<h1>` Stability & Accurate `/compare/*` Framing (`confidence: 0.98`)
- Keep the approved homepage `<h1>` (`Is your $280 skincare shelf secretly canceling itself out?`) stable; put new daily long-tail search queries into programmatic routes (`/seo/*`, `/compare/*`, `/concern/*`).
- Never call a cross-category product a "Dupe" on `/compare/*` unless `sameCat === true`.

## 4. Zero Auto-Popups & Strict `< 1,000` Line Module Cap (`confidence: 0.99`)
- Never auto-open the 5-Slot Vanity Bag drawer or checkout modal on page load.
- Every file in `src/*.js` must stay `< 1,000` lines and pass `npm test` (`node test/verify.js`).
