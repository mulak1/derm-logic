---
name: derm-logic-clinical
description: Deterministic clinical dermatology and cosmetic chemistry engine for DermLogic (#4). Encodes Henderson-Hasselbalch pKa free-acid bioavailability, |ΔpH| > 1.8 acid/peptide/niacinamide inactivation thresholds, redox/oxidation conflict pairs (Benzoyl Peroxide + Retinoids/Vitamin C, Copper Peptides + L-Ascorbic Acid), cumulative exfoliation Barrier Hazard Index, positional comedogenicity load, Malassezia fungal-acne trigger detection, and deterministic AM/PM + 4-Night Skin-Cycling scheduler rules.
---

# DermLogic Clinical Chemistry & Barrier-Safety Skill

Use this skill whenever implementing, auditing, or extending DermLogic's deterministic skincare routine evaluation engine, INCI decoder, programmatic SEO medical fact sheets, or AM/PM conflict resolution scheduler.

---

## 1. Deterministic Mathematical Formulas

### A. Henderson-Hasselbalch Free-Acid Bioavailability
For any acidic active with dissociation constant $pK_a$ formulated at $\text{pH}$:
$$\text{FreeAcidFraction}(\text{pH}, pK_a) = \frac{1}{1 + 10^{(\text{pH} - pK_a)}}$$
$$\text{EffectiveFreeAcid\%} = \text{Concentration\%} \times \text{FreeAcidFraction}(\text{pH}, pK_a)$$

### B. Pairwise $\Delta\text{pH}$ Inactivation & Flushing Threshold
For any two leave-on actives $A$ and $B$ applied in the same session with mid-window formulation pH values $\text{pH}_A$ and $\text{pH}_B$:
$$\Delta\text{pH}_{A,B} = |\text{pH}_A - \text{pH}_B|$$
- If $\Delta\text{pH}_{A,B} > 1.8$ and $\min(\text{pH}_A, \text{pH}_B) \le 3.8$:
  - **Peptide De-chelation / Hydrolysis**: If the higher-pH active is `copper_peptide` or `signal_peptide`, flag **`CRITICAL`** ($\text{Cu}^{2+}$ uncoupling / amide bond stress; require strict AM/PM separation).
  - **Niacinamide Acid-Shift Flushing**: If the higher-pH active is `niacinamide` ($\ge 5\%$), flag **`MODERATE`** (transient nicotinic acid vasodilation / prostaglandin $D_2$ flush; require 15-minute wait window or AM/PM split).
  - **Retinoid Acid Destabilization**: If the higher-pH active is a non-encapsulated `retinoid`, flag **`CRITICAL`** (accelerated polyene degradation + compounded stratum corneum barrier stripping).

### C. Oxidation & Chelation Conflict Matrix
| Active Class A | Active Class B | Severity | Biochemical Mechanism | Resolution Rule |
| :--- | :--- | :---: | :--- | :--- |
| `benzoyl_peroxide` | `tretinoin`, `retinol`, `retinal` | `CRITICAL` | Peroxide free-radical homolysis oxidizes retinoid polyene chain ($>80\%$ potency loss within 2h). | Move `benzoyl_peroxide` to AM (or wash-off contact therapy); keep retinoid strictly in PM. |
| `benzoyl_peroxide` | `vitamin_c_laa`, `hydroquinone` | `CRITICAL` | Direct redox neutralization; oxidizes L-Ascorbic Acid to dehydroascorbic acid; stains skin with hydroquinone. | Separate into alternate days or AM Vit C / PM BPO on non-retinoid nights. |
| `copper_peptide` | `vitamin_c_laa`, `vitamin_c_deriv` | `CRITICAL` | $\text{Cu}^{2+}$ ions catalyze Fenton-like oxidation of Ascorbic Acid while low pH strips copper from GHK-Cu. | Strict AM (`vitamin_c_laa`) vs PM (`copper_peptide`) split. |
| `copper_peptide` | `aha`, `bha`, `pha` | `CRITICAL` | Low pH ($<4.0$) protonates histidine imidazole ring, breaking the $\text{Cu}^{2+}$ coordination complex. | Alternate PM nights or AM Copper Peptides / PM Acids. |
| `retinoid` | `aha`, `bha` | `CRITICAL` | Synergistic corneodesmosome lysis + retinoid dermatitis $\rightarrow$ acute Transepidermal Water Loss (TEWL). | 4-Night Skin Cycling: Night 1 Exfoliation, Night 2 Retinoid, Nights 3–4 Barrier Lipid Recovery. |
| `aha` | `bha` (or $\ge 2$ exfoliating acids) | `MODERATE` / `CRITICAL` | Cumulative keratolytic over-exfoliation and acid mantle depletion. | Limit to 1 leave-on keratolytic acid per routine; max $2\text{–}3\times/\text{week}$. |

### D. Barrier Safety Score ($0\text{–}100$) & Barrier Hazard Index ($0\text{–}100$)
Let $I_k \in [0, 5]$ be the intrinsic irritation index of active/ingredient $k$, $B_m$ be the count of physiological barrier-repair ingredients (*Ceramides NP/AP/EOP, Cholesterol, Panthenol, Centella Asiatica, Madecassoside, Ectoin, Squalane, Bisabolol*), and $C_{\text{crit}}, C_{\text{mod}}$ be the counts of `CRITICAL` and `MODERATE` conflicts:
$$\text{RawHazard} = 8 + \sum_{k} (I_k \times 4.2) + (C_{\text{crit}} \times 26) + (C_{\text{mod}} \times 13) + \max(0, N_{\text{exfoliants}} - 1) \times 16 - \min(18, B_m \times 4.5)$$
$$\text{BarrierHazardIndex} = \text{clamp}(\text{round}(\text{RawHazard}), 4, 98)$$
$$\text{CompatibilityScore} = \text{clamp}(100 - \text{BarrierHazardIndex}, 5, 99)$$

### E. Positional Comedogenic Load ($0\text{–}100$) & Fungal-Acne (*Malassezia*) Safety
For an ordered INCI list $L = [x_1, x_2, \dots, x_n]$ where each ingredient has comedogenicity $c_i \in [0, 5]$:
- Positional weight $w_i = 1.0$ for $i \le 5$ (primary vehicle/emollients), $w_i = 0.65$ for $6 \le i \le 12$, and $w_i = 0.30$ for $i > 12$.
- $\text{ComedogenicLoad} = \text{clamp}\left(\text{round}\left(\sum_{i} c_i \cdot w_i \cdot 7.5\right), 0, 100\right)$.
- Any ingredient with $c_i \ge 3$ or `malasseziaTrigger === true` ($\text{C}_{12}\text{–}\text{C}_{24}$ fatty acid esters, polysorbates, lauric/palmitic/myristic/stearic derivatives, fermented yeast filtrates) is flagged individually with its exact pore-clogging mechanism.

---

## 2. Deterministic AM / PM & 4-Night Skin-Cycling Partition Algorithm
1. **AM Slot Assignment**:
   - Gentle Cleanser ($\text{pH } 5.0\text{–}5.8$)
   - Primary Antioxidant: `vitamin_c_laa` ($\text{pH } 2.6\text{–}3.4$) **OR** `copper_peptide` / `niacinamide` (if no L-Ascorbic Acid or if BPO is not used in AM).
   - If `benzoyl_peroxide` and `retinoid` coexist in the user's shelf: assign `benzoyl_peroxide` to AM (if no L-Ascorbic Acid) or Alternate PM Night; never co-locate BPO with LAA or Tretinoin/Retinol.
   -Wait Window: If a low-pH acid/LAA ($\text{pH} \le 3.5$) is followed by a neutral serum ($\text{pH} \ge 5.5$), insert an explicit **15-Minute $\Delta\text{pH}$ Equilibration Timer** badge.
   - Barrier Moisturizer + Broad-Spectrum SPF 30–50+ (Mandatory final AM step).
2. **PM 4-Night Skin-Cycling Calendar**:
   - **Night 1 (Keratolytic Resurfacing)**: Cleanser $\rightarrow$ AHA/BHA/PHA Exfoliant $\rightarrow$ Barrier Lipid Recovery Cream.
   - **Night 2 (Cellular Turnover)**: Cleanser $\rightarrow$ Retinoid (Tretinoin / Retinal / Retinol) $\rightarrow$ Ceramide Buffer ("Sandwich Method" if Barrier Hazard $> 55$).
   - **Night 3 (Peptide & Microbiome Repair)**: Cleanser $\rightarrow$ Copper Peptides / Niacinamide / Azelaic Acid / Snail Mucin $\rightarrow$ Barrier Cream.
   - **Night 4 (Deep Lipid Restoration)**: Cleanser $\rightarrow$ Humectant + 3:1:1 Ceramide-Cholesterol-Fatty Acid Emulsion (Zero exfoliating acids or retinoids).
