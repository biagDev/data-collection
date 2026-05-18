# +15 Entry Features — Easy Read

## What this is

Every 15 minutes, a "magnet" candle closes. Within the next 15 minutes, one of its two extremes (the high or the low) usually gets touched first. This analysis is trying to figure out **which side it'll be**, by recording a snapshot of price-action conditions at each close and seeing what predicts the outcome.

## The dataset

| Column | Plain English |
|---|---|
| `symbol` | Which futures contract (ES1!, NQ1!) |
| `time_et` | When the 15m magnet candle closed, Eastern time |
| `bkt` | The candle clock-time as an integer (e.g. `1430` = 2:30 PM ET) |
| `magH` / `magL` / `magC` | High / Low / Close price of the magnet candle |
| `atr` | 14-period ATR on the 15m timeframe — a normalizer for "how big is a typical move right now" |
| `first` | Which side got hit first in the next 15 min: `high` / `low` / `ambiguous` / `none` |
| `fBar` | Which 30-second bar after close the first touch happened on (1-30; 0 if no touch) |
| `drv` | "Opening drive" — net price change at +90 seconds (3 bars), in ATR units |
| `clLoc` | Where in the magnet candle did the close land? 0 = exactly at low, 1 = exactly at high, 0.5 = middle |
| `vwap` | Was the close above (+1) or below (-1) the session VWAP? |
| `htf` | Higher-timeframe trend: 15m EMA20 above EMA50 = +1 (uptrend), below = -1 |
| `dPdh` | Distance from close to prior-session high, in ATR units. Negative = close is above PDH |
| `dPdl` | Distance from close to prior-session low, in ATR units. Positive = close is above PDL |

## Jargon

- **Magnet candle**: a 15-minute candle whose high or low is statistically likely to get retested soon. We're focused on the +15 min window here.
- **First touch / first hit**: the first time a later wick reaches back to the magnet candle's high or low. We want to predict which side it'll be.
- **ATR units**: distances divided by 14-period 15m ATR, so a "1.5" means "about 1.5 typical 15m candle ranges." Makes numbers comparable across symbols and volatility regimes.
- **Opening drive**: how far price moved in the first 90 seconds after the magnet close. Captures the immediate post-close tape.
- **Ambiguous**: both the high and low got wicked within the same 30-second bar — we can't tell from candle data alone which came first. Dropped from analysis.
- **None**: neither side was hit within 15 min. Means the magnet "failed" for this window; not tradable.
- **PDH / PDL**: Prior-session Day High / Day Low.
- **VWAP**: Volume-Weighted Average Price, session-anchored.
- **Lift** (in FINDINGS.md): how much a feature shifts the high-first probability vs the overall base rate, in percentage points.

## How the collection works

A Pine indicator on a 30-second chart watches every 15-minute boundary. When a new 15m candle closes, it captures all the features above and starts a 15-minute timer. Within that timer it watches every 30s bar and records the first side to get touched. Results stack into a table on the chart, which gets read out via MCP and merged into `data/master_*.csv`. See `README.md` for the daily workflow.

## How to read FINDINGS.md

- **Base rate**: the % of tradable events where the high got hit first. ~50/50 is normal.
- **Each feature** is binned (e.g. low / mid / high) and we report what % of events in each bin had a high-first outcome.
- **Lift** tells you how predictive the bin is. Lift of +20 means "this bin's high-first rate is 20 percentage points higher than baseline" — a real signal. Lift near 0 means the feature doesn't carry information.
- **Watch for sample size**: bins with n < 20 are noise; bins with n > 100 are reliable.
- **Watch for tautologies**: if `clLoc` is near 1 (close at the high), the "high gets hit first" finding may just mean "the high was already touched at close." Use the *middle band* as the honest test of a feature.
