# DermLogic (#4) — Open-Source GitHub Scout & Clinical Formulation Telemetry Report

**Workspace**: `/Users/kadermula/Downloads/Ideas/studio/derm-logic/`  
**Engine Target**: Deterministic Sub-5ms INCI Active-Ingredient Conflict, $\Delta\text{pH}$ Inactivation, Free-Acid Value ($pK_a$), Comedogenicity & Barrier-Safety Engine

---

## 1. Scouted GitHub Repositories & Open Datasets

| Repository | Stars | Core Architecture & Data Structures | Key Patterns Adopted in DermLogic |
| :--- | :---: | :--- | :--- |
| [`LauraAddams/skincareAPI`](https://github.com/LauraAddams/skincareAPI) | 132★ | Over 2,000 US, Korean, and Japanese skincare products indexed by brand, product name, and tokenized INCI list. | Normalized product-to-INCI array mapping and fast substring/alias lookup for pasted consumer ingredient labels. |
| [`openfoodfacts/openfoodfacts-dart`](https://github.com/openfoodfacts/openfoodfacts-dart) & **OpenBeautyFacts** | 229★ | Crowdsourced cosmetic barcode & INCI taxonomy (`ingredients_text`, `allergens_tags`, `ecoscore_data`). | Comma/slash/parenthesis-tolerant INCI tokenizer that strips concentration annotations and maps synonyms (e.g., `Ascorbic Acid` $\leftrightarrow$ `L-Ascorbic Acid`, `Aqua/Water/Eau`). |
| [`beauteeru/cosmetic-ingredients-dataset`](https://github.com/beauteeru/cosmetic-ingredients-dataset) | 16★ | Curated cosmetic ingredient schema linking INCI nomenclature, CAS numbers, EINECS, PubChem ID, and EU CosIng IDs. | Canonical INCI identifier structure enriched with CAS, functional class, molecular weight (Daltons), and regulatory status. |
| [`costajob/inci_score`](https://github.com/costajob/inci_score) | 5★ | Deterministic hazard scoring library for cosmetic product components based on Biodizionario & EWG scales. | Weighted position-aware hazard & comedogenicity load calculation (first 5 ingredients weighted $1.0\times$, positions 6–12 weighted $0.6\times$, trace ingredients weighted $0.25\times$). |
| [`han-tagg/Korean-cosmetic-ingredients-api`](https://github.com/han-tagg/Korean-cosmetic-ingredients-api) | 4★ | REST API bridging INCI names with Korean MFDS / KCIA functional cosmetic designations (brightening, wrinkle-care, barrier soothing). | K-Beauty soothing & barrier-repair taxonomy (*Centella Asiatica*, *Madecassoside*, *Houttuynia Cordata*, *Panthenol*, *Snail Secretion Filtrate*) as negative-irritation buffers. |
| [`voix-sys/cire-api`](https://github.com/voix-sys/cire-api) | 2★ | Cosmetic Ingredient Risk Engine — deterministic INCI safety scoring API built for AI agent consumption. | Zero-hallucination deterministic rule evaluation decoupled from optional LLM label OCR/parsing. |
| [`papitosu/cosmetic-inci-bot`](https://github.com/papitosu/cosmetic-inci-bot) | 1★ | 28k+ ingredient database cross-referencing EU Regulation (EC) No 1223/2009 Annexes II–VII with OCR text extraction. | Pregnancy safety flags (Retinoids, Hydroquinone, high-dose Salicylic Acid, Chemical UV filters) and EU CosIng restriction flags. |
| **Internal**: `glowindex_mvp/src/routine-compatibility-engine.ts` | Proven | Deterministic `evaluateRoutineAndSkin()` scoring + Thompson-Sampling `runtime_config.json` pricing/friction bandit. | Upgraded from 7 generic active buckets to **65+ granular INCI compounds**, continuous $\Delta\text{pH}$ & $pK_a$ free-acid calculations, fungal-acne (*Malassezia*) ester detection, and automated AM/PM + 4-Night Skin-Cycling schedule synthesis. |

---

## 2. Clinical Biochemical & Dermatological Reference Matrix

### A. Optimal pH Windows & $pK_a$ Free-Acid Bioavailability
By the **Henderson-Hasselbalch equation**, for a weak acid active (AHA/BHA/PHA/L-Ascorbic Acid) with dissociation constant $pK_a$ in a formulation of pH:
$$\text{Free Acid Fraction} = \frac{1}{1 + 10^{\text{pH} - pK_a}}$$
- **L-Ascorbic Acid (Pure Vitamin C)**: $pK_a = 4.17$, optimal formulation $\text{pH} \in [2.6, 3.5]$. Above $\text{pH } 4.0$, un-ionized penetration drops sharply and oxidative degradation into dehydroascorbic acid accelerates.
- **Glycolic Acid (AHA)**: $pK_a = 3.83$, optimal $\text{pH} \in [3.0, 4.0]$, Molecular Weight $= 76.05\text{ Da}$ (smallest AHA, rapid epidermal penetration $\rightarrow$ high stinging hazard).
- **Lactic Acid (AHA)**: $pK_a = 3.86$, optimal $\text{pH} \in [3.2, 4.2]$, Molecular Weight $= 90.08\text{ Da}$.
- **Mandelic Acid (AHA)**: $pK_a = 3.41$, optimal $\text{pH} \in [3.0, 4.0]$, Molecular Weight $= 152.15\text{ Da}$ (lipophilic, slower uniform penetration, safer for Fitzpatrick IV–VI).
- **Salicylic Acid (BHA)**: $pK_a = 2.97$, optimal $\text{pH} \in [3.0, 4.2]$, Molecular Weight $= 138.12\text{ Da}$.
- **Gluconolactone (PHA)**: $pK_a = 3.70$, optimal $\text{pH} \in [3.5, 4.5]$, Molecular Weight $= 178.14\text{ Da}$ (humectant polyhydroxy acid, non-irritating).
- **Azelaic Acid (Dicarboxylic Acid)**: $pK_a = 4.55$, optimal $\text{pH} \in [4.5, 5.5]$, Molecular Weight $= 188.22\text{ Da}$.
- **Niacinamide (Vitamin B3)**: Optimal $\text{pH} \in [5.0, 7.0]$. Layering immediately over a $\text{pH } \le 3.4$ direct acid creates a $|\Delta\text{pH}| > 1.8$ shock that shifts equilibrium and can induce transient nicotinic acid prostaglandin $D_2$ capillary flushing in reactive skin.
- **Copper Tripeptide-1 (GHK-Cu) & Signal Peptides**: Optimal $\text{pH} \in [5.5, 7.0]$. Strong low-pH acids ($\text{pH} < 4.0$, $|\Delta\text{pH}| > 1.8$) protonate donor histidine nitrogen atoms, uncoupling the $\text{Cu}^{2+}$ ion and catalyzing Fenton-like oxidation of L-Ascorbic Acid.
- **Retinoids (Tretinoin, Retinol, Retinaldehyde, Adapalene)**: Optimal $\text{pH} \in [5.5, 6.5]$. Acidic environments ($\text{pH} < 4.2$) destabilize polyene chains and compound stratum corneum corneodesmosome stripping.

### B. The 5 Primary Conflict Archetypes Modeled in DermLogic
1. **Redox / Oxidative Neutralization (`CRITICAL`)**:
   - *Benzoyl Peroxide + Tretinoin / Retinol / Retinaldehyde*: Peroxide bond homolysis oxidizes retinoid polyene chains on contact. (Note: Adapalene is a naphthoic acid derivative and is chemically photostable/oxidation-resistant with BPO, though still carries cumulative xerosis risk).
   - *Benzoyl Peroxide + L-Ascorbic Acid / Hydroquinone*: Immediate redox quenching and transient orange/brown staining with hydroquinone.
2. **Chelation & Metal-Ion Catalysis (`CRITICAL`)**:
   - *Copper Peptides (GHK-Cu) + L-Ascorbic Acid*: $\text{Cu}^{2+}$ oxidizes L-Ascorbic Acid while low pH chelates/dislodges copper from the tripeptide complex.
   - *Copper Peptides + Direct AHAs/BHAs ($\text{pH} < 4.0$)*: Acidic de-chelation and peptide bond destabilization.
3. **$\Delta\text{pH}$ Shock & Acid-Mantle Shift ($|\Delta\text{pH}| > 1.8$, `MODERATE` to `CRITICAL`)**:
   - *Direct Acids ($\text{pH } 3.0\text{–}3.6$) + Neutral Peptides / Niacinamide / Retinoids ($\text{pH } 5.5\text{–}6.8$)*: Raises acid surface pH (reducing free-acid bioavailability via Henderson-Hasselbalch) while exposing acid-labile peptides/niacinamide to low-pH hydrolysis/flushing. Requires a **15–20 minute pH equilibration wait window** or AM/PM separation.
4. **Cumulative Keratolytic & Corneocyte Barrier Stripping (`CRITICAL`)**:
   - *Retinoids + Direct AHAs/BHAs* in the same PM session, or *Triple-Acid Stacking* ($\ge 2$ exfoliating acids + low-pH L-Ascorbic Acid): Causes acute Transepidermal Water Loss (TEWL), stratum corneum micro-fissuring, and periorificial dermatitis.
5. **Comedogenic Load & *Malassezia* (Fungal Acne) Lipid Triggers (`MODERATE`)**:
   - Rabbit-ear / clinical comedogenicity ratings ($0\text{–}5$): *Isopropyl Myristate* ($5$), *Myristyl Myristate* ($5$), *Coconut Oil / Cocos Nucifera* ($4$), *Cocoa Butter* ($4$), *Acetylated Lanolin* ($4$), *Algae Extract* ($4$), *Ethylhexyl Palmitate* ($4$).
   - *Malassezia furfur* / *globosa* feeds on $\text{C}_{12}\text{–}\text{C}_{24}$ free fatty acids, esters, and polysorbates (*Polysorbate 20/60/80*, *Isopropyl Palmitate*, *Glyceryl Stearate SE*, *Fermented Galactomyces*).
