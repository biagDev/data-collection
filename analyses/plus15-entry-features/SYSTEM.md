# Magnet Compass — Entry System (current: v12)

End-to-end scalping system for the 15-minute magnet on a 30-second chart.

## The model in one sentence

At each 15m candle close, look up the bucket's +15 first-hit bias, score live features, and trade *toward* the bias-side magnet only when the prior and the live features **agree** and the candle's close is in the middle band of its range.

## Why this shape

The magnet stats prove that one of the two extremes is very likely to get tagged. The bias leaderboard ([analyses/plus15-first-hit-bias](../plus15-first-hit-bias/)) says which side leans first in the +15 window. But the prior alone (typical edge 5–19 pct points) isn't tradable; you need a filter that vetoes the days when live conditions argue the other way.

The feature analysis in [FINDINGS.md](FINDINGS.md) showed two things:

- **Close-location at the extremes** is mostly geometric ("close at the high → high gets tagged trivially"). Not a real edge. Trade in the **mid-band only**.
- **VWAP side** and the **bucket prior** carry the real signal. **HTF EMA trend** is near-noise but kept as a tiebreaker.

So the rule combines: armable bucket + prior–live agreement + mid-band close.

## Components

| File | Role |
|---|---|
| [pine/phase1_logger.pine](pine/phase1_logger.pine) | Original sweep+reclaim entry logger. Preserved here as a backup; the TV-saved version was clobbered during Phase 3 push. |
| [pine/phase2_features.pine](pine/phase2_features.pine) | Feature collector. Runs silently, exports a table for `merge.mjs` → `master_*.csv`. |
| [pine/phase3_compass.pine](pine/phase3_compass.pine) | **The entry model.** Visual + auto-tracking outcome stats. This is what you trade from. |

## Symbol coverage (v11)

`bias_prior()` auto-detects symbol via `syminfo.ticker` and returns the right prior table:

| Symbol | Active buckets | Notes |
|---|---:|---|
| NQ1! | 16 | London (03:45) + RTH (09:30–14:00) + Asia (20:00–21:15) |
| ES1! | 19 | London (03:00, 03:30, 03:45, 04:00) + RTH (09:30–10:45, 11:30, 12:00, 13:00, 14:00) + Asia (20:00, 20:30, 20:45, 21:00, 21:15) |
| GC1! | 12 | RTH (09:30–15:00, with 12:00 LOW), no London/Asia |

Just change the chart symbol — no input changes needed.

## How to read the chart

Every 15m a new info label appears on the magnet candle:

```
Bkt 1130  ARM ↑HIGH
Prior HIGH +19.3 | clLoc 0.42 | vwap +1 | htf +1 | score +4
```

- **Bkt** — the 15m close time (HHMM ET).
- **ARM ↑HIGH** — armed long toward the magnet high. Could be `SKIP (reason)` instead.
- **Prior** — bias side from the leaderboard with signed edge in pct points.
- **clLoc** — close location within the candle (0 = low, 1 = high). Tradable band: 0.30–0.70.
- **vwap / htf** — feature scores (each −1/0/+1, signed toward HIGH-first).
- **score** — sum of all four features. Need `|score| ≥ 2` and same sign as prior to arm.

Lines drawn at each armed window:

- **Aqua, solid** — magnet H and L (anchored to the actual bars where the extreme was made, not floating from window start).
- **Gray, dashed** — midline (50% of magnet range).
- On entry: **Yellow** entry line, **Lime dashed** target, **Red dashed** stop.
- **WIN +X / LOSS −X** label at exit time.

The execution-window background is **shaded** only when the system armed for that window (not painted across the whole chart).

Tables:
- **Stats** (default top-right): Magnet Compass version, stop style, armed/entered/wins/losses/win%.
- **Reference candle list** (default bottom-right): all active buckets for current symbol with side + edge, in 12-hour ET time.

## Inputs

**Entry rules**
- `Min |live_score| to arm (1-4)` — default 2.
- `Mid-band low/high (clLoc)` — default 0.30 / 0.70.
- `Restrict to NY session only (9:30am - 4:00pm ET)` — default off. When on, buckets outside RTH return 0 prior (disarmed + filtered from table).

**Stop / target**
- `Stop style` — 5 options (see below).
- `Buffer beyond stop level (ticks)` — default 1.
- `Fixed-ticks stop distance` — default 16. Only used when style = Fixed ticks.
- `ATR multiplier (15m)` — default 0.5. Only used when style = ATR.
- `Swing pivot left/right bars` — default 1/1. Used for swing stop.
- `Target at midline instead of opposite extreme` — default off.

**Display**
- Toggles for lines, info label, WIN/LOSS labels, execution-window background, stats table, reference-candle list.
- Position dropdowns for both tables (8 corners/edges).

**Style**
- Color pickers for every visible element (magnet lines, midline, entry/stop/target lines, LONG/SHORT labels, ARM/SKIP info bg, label text, table HIGH/LOW colors, edge color, table background, execution-window bg).

## Stop styles (5 options)

| Style | Stop placement | When to use |
|---|---|---|
| **Opposite extreme** (default) | far side of magnet + buffer | widest stops, ≈1:1 R:R, highest win-rate |
| **Midline** | 50% of magnet range + buffer | ~half the loss size, more stop-outs |
| **Fixed ticks** | entry ± N ticks | smallest, regime-independent |
| **ATR (15m × k)** | entry ± k × 15m ATR | scales with volatility |
| **Nearest swing low/high** | closest **unswept** swing past entry + buffer | adaptive to recent structure; falls back to opposite extreme if no swing available |

"Unswept" = price has not retraced through the swing since it formed. A swing at price P is removed from the active list when a later bar's low ≤ P (for lows) or high ≥ P (for highs).

## Rules (precise)

1. **Arm conditions** (all must hold at confirmed 15m close):
   - Bucket has a non-zero prior.
   - `sign(live_score) == sign(prior_edge)` — prior and live features agree.
   - `clLoc ∈ [0.30, 0.70]` — close is in the mid-band.
   - `|live_score| ≥ 2`.
   - NY-only mode (if enabled): bucket must be within 9:30–15:45 ET.

2. **Entry**:
   - Fires on the **first confirmed 30s bar** after the 15m close (~30s after).
   - Skipped if that bar's wick already touches the bias-side extreme.
   - Entry = bar's open price.

3. **Stop / target**: see stop styles above. Target defaults to bias-side magnet extreme.

4. **Window close (v9+)**: If the trade is still open at the next 15m close, classify by `close[1]` (last 30s of just-ended window) vs entry:
   - Long: `close > entry` → WIN, else LOSS.
   - Short: `close < entry` → WIN, else LOSS.
   - Ties count as LOSS. There are no more "TIMEOUT" outcomes.

## Non-repainting guarantee (v2+)

v1 read HTF data with `request.security(..., expr, lookahead=barmerge.lookahead_off)`. That looks correct on confirmed historical bars but silently returns the **developing** 15m bar's data in real-time/replay — which is why signals appeared in chart view but vanished in replay.

v2+ uses the canonical non-repainting pattern:

```pine
request.security(syminfo.tickerid, "15", [high[1], ...], lookahead = barmerge.lookahead_on)
```

`[1]` says "give me the previous HTF bar"; `lookahead_on` is safe when paired with `[1]` and means "deliver the previous-bar value at the start of each new HTF period without delay." This combo returns identical values in historical and real-time/replay.

Additionally, all state mutations are gated to `barstate.isconfirmed`, so intra-bar ticks can't re-fire or double-count.

**Behavior change**: entries fire on the FIRST CONFIRMED 30s bar after the 15m close. Slightly later than v1 but bulletproof against repaints.

## Version history

| Version | Changes |
|---|---|
| v1 | Initial: scoring + agreement filter + opposite-extreme stop |
| v2 | Non-repainting fix (`[1]` + `lookahead_on`, `barstate.isconfirmed` gating); stop-style dropdown |
| v3 | Table position dropdowns; full color customization in Style group |
| v4 | 12-hour AM/PM time formatting; magnet H/L lines anchored to actual high/low bars; execution-window background shading; "Nearest swing low/high" stop style added |
| v5 | Replaced last-swing logic with **unswept-swing tracker** (active pivot arrays + sweep removal) |
| v6 | Fixed bg-shading bug (was painting whole chart; now gated to armed windows only) |
| v7 | Added ES Asia priors (5 new buckets) |
| v8 | Fixed bucket-time format bug (Pine float-division) and edge-format bug (`-+5.4`); removed marginal 15:45 buckets from NQ/GC |
| v9 | Reclassified TIMEOUT trades by end-of-window close vs entry (WIN if past entry, LOSS otherwise); removed timeouts row from stats table |
| v10 | Added "Restrict to NY session only" toggle; gated lines/labels to priored buckets only (cleaner chart) |
| v11 | Added NQ London 03:45; added ES London (03:00, 03:30, 03:45, 04:00) and ES RTH afternoon (11:30, 12:00, 13:00, 14:00) — 8 new ES priors total |
| v12 | **Setup A — Sweep Fade scalp mode** (NQ scalper workflow). Optional `scalp_mode` toggle that REPLACES swing-target entry with: bias-side INVERTED (bias HIGH → SHORT at magH+buf, fade back toward midline), fixed point-based target/stop (default 12/12), resting limit entry, magnet-range gate (default ≥16pt), optional half-at-1R + BE + runner scale. Data backing: 78.92% midpoint MR (extended-stats #6) + +15 first-hit bias for timing. Stats table splits scalp wins/partials/losses separately from v11 swing counters. |

## Refining over time

`bias_prior()` is hardcoded from the current leaderboard snapshot. When new data lands:

1. Re-run `node analyses/plus15-first-hit-bias/build.mjs` to refresh `leaderboard.csv`.
2. Update `bias_prior()` entries in `pine/phase3_compass.pine` (and re-push to TV).
3. Watch the rolling stats table to see if the change helped.

Possible future tweaks to consider only **after** the v11 stats stabilize:

- Weight features differently (right now each is ±1; the prior is also ±1 regardless of magnitude — losing information).
- Add a 4th feature once Phase 2 collection grows (liquidity-pool proximity is the obvious next candidate).
- Split entry style: limit-fill at midline for better R:R when the trade pulls back; market-open as a fallback.

## Honest caveats

- Early stats (n=17 decided trades on 2-day NQ history) showed 58.8% win rate — **not statistically meaningful**. Trade it on sim until you've logged 50+ resolved trades.
- R:R is structurally around 1:1 (often worse) with default Opposite-extreme stop. The system depends on win-rate, not payoff. A small drop in win% kills it. Watch for regime shifts.
- The v9 timeout reclassification turns every entered trade into WIN or LOSS based on a single price point at window close — this slightly understates loss magnitude when the close is near entry (cost-drag isn't modeled).

## Known TV-state notes

- The TV-saved script slot `Magnet Entry — Phase 1` (USER;394...) currently holds the Compass v11 source. The original Phase 1 logger source is preserved at [pine/phase1_logger.pine](pine/phase1_logger.pine) — paste it back to restore.
- Phase 2 (collector) was never saved as a named TV script. Source at [pine/phase2_features.pine](pine/phase2_features.pine).
- During this session the Phase 1 slot was temporarily overwritten twice for data collection (ES Asia, then ES RTH+London). Both collectors are preserved in repo: [analyses/es/asia-candle-hit-stats/pine/](../es/asia-candle-hit-stats/pine/) and [analyses/es/rth-afternoon-candle-hit-stats/pine/](../es/rth-afternoon-candle-hit-stats/pine/).
