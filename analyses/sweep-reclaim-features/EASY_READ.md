# Sweep+Reclaim Features — Easy Read

## What this is

A data-collection logger that watches NQ on a 30-second chart and records every "sweep + reclaim" event — the market poking through a 15-min candle's high or low, then snapping back inside. For each event we capture ~15 things about what was happening (volume, trend, VWAP, etc.) and then track for the next 5 minutes whether the move continued in a tradable way or stopped out.

After a week of data, we'll know: **which combinations of conditions produce a real edge for a 12pt scalp**, instead of guessing.

## Why we built it

We already tried trading every sweep+reclaim event ([NQ Sweep+Reclaim Scalp v1.2](../../indicators/nq-sweep-reclaim-scalp/)). Result: 41.5% combined, 30% NY-only. The unconditional setup doesn't work. But we believe a *subset* of these setups does — we just don't know which subset. This pipeline finds out.

## What each event records

| Field | Plain English |
|---|---|
| `t` | When the entry would have fired (Eastern time) |
| `bkt` | Which 15m clock-bucket the reference candle belonged to (e.g. `1130` = 11:30 AM) |
| `sess` | Trading session: NY / London / Asia / Globex / Other |
| `side` | Long (low was swept) or Short (high was swept) |
| `refR` | How big the 15m reference candle was (points) |
| `swDep` | How far past the magnet line the sweep wicked (points) |
| `swLag` | How many 30-second bars between the sweep and the reclaim |
| `clLoc` | Where in the reference range did the reclaim close land (0 = at low, 1 = at high) |
| `vwapD` | How far the entry was from VWAP (signed points) |
| `reg` | Was price above or below the 15m 200-MA at entry |
| `htf` | 15m EMA20 vs EMA50: Up / Down / Flat |
| `pdhD` / `pdlD` | Distance from entry to prior-day high / low (points) |
| `volZ` | How unusually high or low the volume was at the entry bar |
| `prevCol` | Was the prior 15m candle green / red / doji |
| `prevRng` | Prior 15m candle range (points) |
| **outcomes:** | |
| `mfe` / `mae` | Maximum favorable / adverse move within the next 5 min |
| `tt6 / tt10 / tt15` | How many bars it took to reach +6 / +10 / +15 favorable points (0 = never hit before stop) |
| `st8` | Did an 8-point adverse move happen, and if so when |

## Jargon

- **Sweep**: price wicks through a 15m magnet level by at least 2 ticks
- **Reclaim**: a 30s bar closes back inside the magnet range after a sweep (and we additionally require the bar before it also closed inside, to avoid noise reclaims)
- **MFE / MAE**: max favorable / adverse excursion. How far the trade went in your favor / against you at peak
- **Box geometry**: target/stop combo. We test 6/8, 10/8, 12/10, 15/8, 15/10 to see which one the data prefers
- **Lift**: how much a bin's win rate is above or below the overall base rate, in percentage points
- **Base rate**: the win rate across all events for a given box. Anchor for comparison

## How to use the data once collected

`FINDINGS.md` will list, for each of the 5 box geometries:
- Overall base win rate
- Win rate broken out by every feature (each bin reporting n, win%, and lift)

What to look for:
- **Strong lifts** (+8pp or more, n≥20): hypotheses worth trading
- **Sobering anti-lifts** (-8pp or more): conditions to actively avoid
- **No-signal features**: not predictive, can be dropped from the next indicator
- **Best box geometry**: which target/stop combo has the highest base rate and consistent positive lift

## What success looks like

After ~300 events (about a week of NQ data) we'd hope to find at least one combination like:
- `"shallow sweep (swDep < 2pt) + above MA + high volume at reclaim"` produces 65% win at the 10/8 box (n=45, lift +18pp)

If we find that, we build v2 of the scalper gating entries on that combination.

If after 500 events we find NO combination clearing 55% at any box, the sweep+reclaim mechanism genuinely has no edge in 30s NQ — and we pivot to a different setup type entirely (maybe trend-pullback continuations, maybe PM-anchor breakout-and-go).

## Caveats baked in

- **Outcomes are measured up to 5 minutes after entry.** Beyond that we have no data. If your hold style extends further, the analyzer won't see it.
- **Stop = 8pt is hardcoded into outcomes.** Other stop sizes need a re-run of the Pine logger with adjusted params.
- **Single active event at a time.** If a new sweep+reclaim fires while one is being tracked, the new one is ignored. We lose maybe 5-10% of overlapping events. For initial data collection this is acceptable.
- **30s history limit on TV is ~1.3 days.** Read labels every day to avoid losing events that rolled off.
