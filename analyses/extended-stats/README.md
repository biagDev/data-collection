# NQ Extended Statistics — 9 themes

Same 232-day NQ1! 15-minute sample as the candle-hit-stats series. Each theme = focused statistic, structured data in JSON, Pine source preserved. Sub-stats (DOW splits, distributions, etc.) can be layered on later.

> **Note on Pine sources**: the saved `.pine` files in each subfolder are the analytical core (variables, conditions, counters). Output table-rendering boilerplate is omitted from the saved copies for brevity but lives in git history of the chart-side scripts.

---

## 01 — Prior-day RTH H/L retest rate (n=222)

How often does the current RTH session retest the prior session's RTH high or low?

| Outcome | First hour (by 10:30) | Full RTH |
|---|---|---|
| Either side | **77.48%** | **91.89%** |
| Both sides | 1.80% | 11.26% |
| PDH touched (any) | 49.10% | 59.01% |
| PDL touched (any) | 30.18% | 44.14% |
| Neither | 22.52% | 8.11% |

**Takeaway**: Prior-day high/low is a strong magnet — 92% of days retest at least one side by close. Strong PDH-bias (~15pp more often than PDL across both windows).

---

## 02 — Time-to-retest distribution for the 9:30 candle (n=223)

How long until the 9:30 candle's H or L gets first wicked?

| Bars after 9:45 | Minutes | % of days |
|---|---|---|
| 1 (9:45-10:00) | 0-15 | **93.72%** |
| 2 | 15-30 | 7.17% |
| 3 | 30-45 | 1.35% |
| 4 | 45-60 | 0.90% |
| 5-8 | 60-120 | 0.90% |
| 9+ | 120+ | 0.00% |
| Never by EOD | — | 0.00% |

**Mean time-to-retest (conditional on hit)**: **17.46 minutes**.

**Takeaway**: Almost all retests happen in the very next 15-min bar. If the 9:30 candle hasn't been wicked within 30 min, it's unlikely to ever be (only ~3% of remaining days).

---

## 03 — Max excursion before retest (n=223)

When price expands away from the 9:30 candle before retesting, how far does it go (as % of the opening range)?

| Excursion | % of days |
|---|---|
| 0-25% of opening range | 46.64% |
| 25-50% | 29.60% |
| 50-100% | 21.97% |
| 100-200% (1-2x range) | 5.83% |
| 200%+ | 0.00% |

**Mean excursion**: **37.16% of opening range**.

**Takeaway**: Typical pre-retest excursion is just over 1/3 of the opening range. Only ~6% of days, price extends more than the full opening range before retracing. So a stop placed at 1x range above/below the wick is rarely hit before a pullback.

---

## 04 — Conditional on 9:30 candle color (n=119 green, 111 red)

| Outcome | After GREEN by 10:00 | After GREEN by 10:15 | After RED by 10:00 | After RED by 10:15 |
|---|---|---|---|---|
| Either side | 89.92% | 98.32% | 90.99% | 95.50% |
| Both sides | 5.04% | 14.29% | 7.21% | 18.02% |
| **High touched (any)** | **73.95%** | 78.99% | 24.32% | 36.04% |
| **Low touched (any)** | 21.01% | 33.61% | **73.87%** | 77.48% |

**Takeaway**: **The 9:30 candle's close is a near-mirror predictor of which side gets retested.** After a green 9:30, the high gets retested 74% of the time vs 21% for the low. After a red 9:30, the low gets retested 74% vs 24% for the high. Strong fade signal: a green-candle high has high probability of being tagged by 10:00.

---

## 05 — First-touch direction (n=223)

When the 9:30 candle eventually gets retested, which side gets touched FIRST?

| Outcome | % of days |
|---|---|
| **High touched first** | 47.98% |
| **Low touched first** | 46.64% |
| Both same bar (ambiguous) | 5.38% |
| Never hit by EOD | 0.00% |

**Takeaway**: Pure first-touch is essentially a coin flip (48/47). Combined with theme #4: the *color* of the 9:30 candle creates the bias, not direction-of-time. Without conditioning, you can't predict first-touch direction. With color conditioning (theme #4), you can predict it ~75% of the time.

---

## 06 — Mean reversion to 9:30 midpoint (n=223)

Does price come back to (H+L)/2 of the 9:30 candle?

| Window | % of days touched |
|---|---|
| By 10:15 | 64.57% |
| By 11:00 | 71.30% |
| By RTH close | 78.92% |

**Takeaway**: ~65% of days mean-revert to the opening candle's center within 30 min. ~21% of days *never* return — these are the pure trend days where the open's directional read holds all session.

---

## 07 — HOD / LOD timing distribution (n=223)

Which RTH hour bucket sets the day's high or low?

| Hour | HOD set in | LOD set in |
|---|---|---|
| 9:30-10:00 | **31.39%** | **34.98%** |
| 10:00-11:00 | 13.90% | 16.59% |
| 11:00-12:00 | 9.87% | 11.66% |
| 12:00-13:00 | 6.73% | 6.28% |
| 13:00-14:00 | 5.83% | 8.97% |
| 14:00-15:00 | 8.52% | 6.73% |
| 15:00-16:00 | **23.77%** | 14.80% |

**Takeaway**: Classic U-shape. The first 30 min and the last hour together account for ~55% of HODs. HOD is more "last-hour weighted" than LOD (24% vs 15%) — late-session rallies are more common than late-session capitulation. Midday (11-14) is a low-action zone for setting extremes.

---

## 08 — Range statistics (n=223)

| Metric | Value |
|---|---|
| Avg 9:30-9:45 candle range | **109.35 NQ points** |
| Avg full RTH session range | **309.03 NQ points** |
| Avg ratio: 9:30 range / day range | **38.7%** |

| Open as % of full-day range | % of days |
|---|---|
| < 25% | 16.59% |
| 25-50% | **64.13%** |
| 50-75% | 17.04% |
| ≥ 75% | 2.24% |

**Takeaway**: The 9:30 candle is on average ~109 points and represents ~39% of the full RTH range. About 2/3 of days, the 9:30 candle establishes 25-50% of the day's range. Only 2.24% of days does the open dominate ≥75% of the day's range — those are extreme low-vol days.

---

## 09 — Volume profile by 15-min bucket (n=232)

| Bar (open ET) | Avg vol | % of peak |
|---|---|---|
| **9:30** | **36,924** | **100%** |
| 9:45 | 27,003 | 73% |
| 10:00 | 24,572 | 67% |
| 10:15 | 20,526 | 56% |
| 10:30 | 19,302 | 52% |
| 10:45 | 18,334 | 50% |
| 11:00 | 16,685 | 45% |
| 11:30 | 14,794 | 40% |
| 12:00 | 12,318 | 33% |
| 13:00 | 11,203 | 30% |
| 14:00 | 10,789 | 29% |
| 15:00 | 10,614 | 29% |
| 15:30 | 11,526 | 31% |
| **15:45** | **26,457** | **72%** |

**Takeaway**: Classic intraday U-shape. The 9:30 bar is the volume peak (~37k contracts/15m), 3.5x the midday baseline (~10-12k). The 15:45 closing bar spikes back up to 72% of peak — closing rotation. The midday "doldrums" period (12:00-14:30) consistently runs at <33% of peak volume. **Trade-design implication**: liquidity is roughly tier-1 at 9:30/15:45, tier-2 at 9:45-10:30, tier-3 elsewhere.

---

## Cross-theme observations

A few patterns linking the 9 stats:

1. **"Open-then-revert" is the dominant intraday mode**: themes 2, 3, 4, 6 all converge on the same picture — 80%+ of days, the 9:30 candle gets retested within 15 min, with limited (<37% of range) excursion first, and ~65-79% mean-revert to the midpoint by 10:15-EOD.

2. **The 9:30 close-color is the single best predictor** of which side gets retested (theme 4). It moves the directional read from coin-flip (theme 5: 48/47) to ~3:1 (theme 4: 74/21).

3. **Time-of-day matters for trade decisions**:
   - 9:30 + 15:45 own the volume (theme 9) and most of the HOD/LOD timing (theme 7)
   - Midday is dead-zone for both volume and extreme-setting
   - Trend continuation favors late session (HOD bias to 15:00-16:00 in theme 7)

4. **Prior-day H/L is a less-tight magnet than current 9:30 H/L** — full-RTH retest is 92% (theme 1) vs the 9:30 candle's ~97% by 10:15. Levels set by *the day in progress* are stickier than levels set by yesterday.

## Files

Each theme: `data/results.json` (full structured numbers) + `pine/<n>_<theme>.pine` (Pine analytical core).

## Reproducing

Open `CME_MINI:NQ1!` on a 15m chart in TradingView with the MCP debug port enabled, scroll back to load full available history (~232 days), then add each Pine indicator. Read tables via `data_get_pine_tables(study_filter="<indicator name>")`.
