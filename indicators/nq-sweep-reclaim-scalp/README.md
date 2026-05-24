# NQ Sweep+Reclaim Scalper — v1

A fresh-start scalping indicator built for **NQ on 30s, NY session only, 1:1 R:R at 12pt**. Replaces the Magnet Compass fade approach (which died on trend days) with a **confirmed-reversal entry** — we wait for the magnet level to actually print rejection before entering.

## The thesis

The repo's data established two things about magnet levels:

1. **They get tagged ~90% of the time within +15 min** (candle hit-stats series).
2. **Midpoint mean-reversion runs 78.92%** ([extended-stats #6](../../analyses/extended-stats/06-midpoint-mean-reversion/)).

But those stats are about *whether* and *how often* — not *what happens after the tag on any given day*. On strong-trend days, magnets get punched through and stay through. Pure blind-fade scalps die there.

**Sweep+reclaim filters out exactly that failure mode.** A sweep that gets reclaimed is the market PRINTING the rejection — it's the confirmation a pure fade lacks. If price sweeps the magnet and keeps going, we never trade. If it sweeps and snaps back inside, we enter at the close of the snap-back bar with a stop sitting beyond the swept extreme.

## The setup, mechanically

At every 15-min reference candle close (9:30, 9:45, 10:00, …, 15:45 ET):

1. Capture the reference candle's H and L → these are the magnet levels for the next 15 min.
2. Inside the next 15 min, watch for **either**:
   - **LONG**: price wicks below ref_L by ≥ `buf` ticks, then a 30s bar closes back above ref_L within `reclaim_window` bars → enter at that bar's close.
   - **SHORT**: mirror — wick above ref_H, close back below within window.
3. Stop sits at the swept extreme + 1 tick (natural invalidation).
4. Target is a fixed +12 pt from entry.
5. If natural stop would be wider than `stop_max_pts` (default 14), the trade is **SKIPPED** (we don't force a tighter-than-natural stop, we just decline the setup).

## Defaults (NQ-tuned)

| Input | Default | Why |
|---|---|---|
| Sweep buffer | 2 ticks (0.5 pt) | Filters out exact-touches that aren't real sweeps |
| Reclaim window | 6 bars (3 min on 30s) | Most reclaims print fast or not at all |
| Late cutoff | 3 min | Don't enter with <3 min to work |
| Min ref range | 8 pt | Skip flush ranges where setup is noise |
| Require zone | ON | Long must enter below midline (buying weakness), short above |
| Target | 12 pt | Your 1:1 scalp box |
| Stop cap | 14 pt | Tolerance for some sweep depth |
| Stop extra ticks | 1 | Buffer below sweep low for the stop |
| Regime filter | OFF (initially) | Turn ON if win rate < 55% — filters trend days |
| VWAP band | 5 pt | Visual ★VWAP badge for confluence (no logic change) |

## Visuals

- **Aqua** lines = reference candle H/L, extended through the trade window.
- **Dashed gray** midline.
- **Blue** shaded background = armed trade window.
- **Orange ↑sw / ↓sw** = sweep event marker.
- **Green ▲ LONG / Red ▼ SHORT** label at entry with `entry @ price, stop Npt, ★VWAP?`.
- **Yellow** entry, **dashed lime** target, **dashed red** stop.
- **WIN / LOSS** label with point delta.
- **Stats table** top-right: armed / sweeps / filled / skip:deep / wins / losses / win%.

## How to test

1. Open Pine Editor in TV Desktop, paste [`nq_sweep_reclaim_scalp.pine`](nq_sweep_reclaim_scalp.pine), save as **"NQ Sweep+Reclaim v1"**, add to NQ1! 30s chart.
2. Leave defaults; watch through a full NY session.
3. Track these in the stats table:
   - **`filled / armed`** ratio — expect 30–60%. Below 20% means setup too restrictive; above 70% means likely too loose.
   - **`skip:deep`** — if frequently >2, the magnets are getting punched too hard for clean sweeps; consider raising `stop_max_pts` or accepting the system is regime-sensitive.
   - **`win%`** — needs **≥55%** to survive at 1:1 (after commissions/spread). If 50% or below across 30+ trades, the thesis isn't working on current regime.
4. After ~50 resolved trades, decide:
   - **Win% ≥ 60%** → ship to live small size, optionally enable scale mode (half at 1R → BE → runner).
   - **Win% 50–60%** → turn ON `Require 200MA regime` and re-measure. The filter should add 3–8pp to win rate by avoiding trend-against trades.
   - **Win% < 50% with regime ON** → escalate to **Option 2 (Trend-Adaptive Dual-Mode)** — add a trend-following pullback setup for trend regime days.
   - **Still failing** → escalate to **Option 4 (Data-mining phase)** — build a logger to collect sweep events, run conditional analysis on what features actually predict reclaim-then-target.

## Why this replaces the Compass for scalping

| | Magnet Compass v12 (fade) | Sweep+Reclaim v1 |
|---|---|---|
| Entry | Resting limit at magnet | Market entry on confirmed reclaim close |
| Invalidation | Sweep that keeps going = full stop | Sweep that never reclaims = no trade |
| Trend day behavior | Stops out as magnet gets punched | Never enters — system stays flat |
| Frequency | Up to 11 NY arms/day | Up to 22 NY events × ~30–60% fill rate |
| Stop discipline | Fixed pts regardless of structure | Structural (swept extreme) capped at max |
| Mental model | Predict reversion | Confirm reversion happened |

The Compass v12 was a **prediction** system. v1 here is a **confirmation** system. Confirmation is slower (you give up the first 0.5–2 pts to the sweep bar) but vastly more honest about what the market is doing.

## Data backing

- [analyses/extended-stats/06-midpoint-mean-reversion](../../analyses/extended-stats/06-midpoint-mean-reversion/) — 78.92% mean-reversion to magnet midpoint = the structural backbone.
- [analyses/retest-conditional-stats](../../analyses/retest-conditional-stats/) — VWAP confluence pushes 90% → 97% retest. Why we show the ★VWAP badge.
- [analyses/930-followthrough](../../analyses/930-followthrough/) — follow-through *after* sweep+reclaim of the 9:30 candle. Where the sweep+reclaim mechanism was first observed in this repo.
- [analyses/setup-b-r-distribution](../../analyses/setup-b-r-distribution/) — the cautionary tale: blind fade with 1R stop = -0.12 R, 44% stop-out. Why we use a *structural* stop, not a fixed-points fade stop.

## Honest caveats

- **Confirmation costs you points.** Sweep is 2+ ticks beyond ref, reclaim bar closes back inside. By the time you enter, you've given up ~1–3 pt of the move. The 12-pt target absorbs this but a 6-pt target wouldn't.
- **Stop is structural, not fixed.** Means your $/trade risk varies. A 14-pt sweep day risks 14pt × $20/pt = $280/contract; a 9-pt sweep day risks ~$180. Average risk should land near 10–12 pt.
- **No backtest yet.** This is built from validated *component* stats but the combined setup hasn't been measured. The stats table is the only evidence we'll have for the first 30–50 trades.
- **Regime filter is currently OFF by default** so we get a baseline read. Turn it on for the second batch if win rate is borderline.
