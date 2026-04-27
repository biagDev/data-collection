# NQ 9:45 Candle — Plain-English Table

The 9:45 candle is the second 15-minute candle of the regular session (9:45-10:00 ET). We measured how often the price comes back to touch its high or low after it closes.

## Headline table

How often does the 9:45 candle's high or low get touched after it closes? (Sample = 232 trading days)

| Outcome | By 10:15 (15 min later) | By 10:30 (30 min later) | By 10:45 (45 min later) |
|---|---|---|---|
| **Either side touched** | **200 days (86.21%)** | **217 (93.53%)** | **226 (97.41%)** |
| Both sides touched (full sweep) | 13 (5.60%) | 31 (13.36%) | **52 (22.41%)** |
| Only the high touched | 104 (44.83%) | 101 (43.53%) | 98 (42.24%) |
| Only the low touched | 83 (35.78%) | 85 (36.64%) | 76 (32.76%) |
| Neither side touched | 32 (13.79%) | 15 (6.47%) | 6 (2.59%) |
| High touched (alone or with low) | 117 (50.43%) | 132 (56.90%) | 150 (64.66%) |
| Low touched (alone or with high) | 96 (41.38%) | 116 (50.00%) | 128 (55.17%) |

**Plain reading:** Same general pattern as the 9:30 candle — about 97% retest rate within 45 minutes after close. Slightly slower to retest in the first 15 minutes (86% vs 90% for the 9:30). Sweep rate (both sides hit) climbs steeply, hitting 22% by 10:45.

## Day-of-week breakdown

| Day | Days in sample | By 10:15 either | By 10:30 either | By 10:45 either |
|---|---|---|---|---|
| Monday | 47 | 85.11% | 93.62% | 97.87% |
| Tuesday | 47 | 89.36% | 91.49% | 95.74% |
| Wednesday | 47 | 91.49% | 95.74% | **100.00%** |
| Thursday | 45 | 77.78% | 91.11% | 95.56% |
| Friday | 46 | 86.96% | 95.65% | 97.83% |

**Plain reading:** Wednesday is the most reliable — by 10:45 every single Wednesday in the sample touched at least one side. Tuesday has the highest sweep rate (~34% both-sides by 10:45).

## How reliable are these numbers?

- 232 days = ~11 months of NQ history.
- Aggregate percentages: trustworthy to ±2 points.
- Day-of-week breakdowns: ±7-10 points.

## Note on a previously found bug

The first version of this analysis had an off-by-one error that skipped the immediate post-candle window. The numbers above are the corrected version. See `AUDIT.md` at the repo root for details.

## Glossary

- **9:45 candle**: the 15-minute candle from 9:45 to 10:00 AM ET (the second candle of regular session).
- **Hit / Touched**: a later candle's wick reaches back to the 9:45 candle's high or low.
- **Sweep**: both extremes touched.
