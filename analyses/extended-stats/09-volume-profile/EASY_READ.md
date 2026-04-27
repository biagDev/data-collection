# Volume Profile by Time of Day — Plain-English Table

How does NQ's trading volume change throughout the regular session? We averaged the volume of every 15-minute bar at each time of day across all sessions in our sample.

## Headline table

(Sample = 232 trading days at peak buckets, fewer for late-session)

| Time of day (ET) | Average contracts traded in 15 min | % of peak |
|---|---|---|
| **9:30 (the open)** | **36,924** | **100% ← peak** |
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
| **15:45 (the close)** | **26,457** | **72%** |

**Plain reading:** Classic **U-shape**. Volume peaks at the 9:30 open (~37,000 contracts in the first 15 minutes), drops steadily through midday, bottoms around 14:00 (~29% of peak), then spikes again at the 15:45 closing bar (back to 72% of peak).

The **9:30 bar trades about 3.5x more contracts** than the typical midday bar.

## Trade implication

If liquidity matters for your strategy:
- **Tier 1 (best fills)**: 9:30-9:45 and 15:45-16:00. Volume is multiples higher than midday.
- **Tier 2**: 9:45-10:30. Still strong volume.
- **Tier 3**: 11:00-15:00 — the "midday doldrums." Low liquidity, wider spreads, less reliable price action.

## How reliable?

232 days at peak buckets, fewer (223) at late-session buckets. Volume averages are stable to within ±5-10%.

## Glossary

- **Average contracts traded in 15 min**: the total NQ futures contracts that changed hands during a typical 15-minute bar at this time, averaged across all sessions.
- **% of peak**: this bar's volume relative to the busiest bar of the day (9:30 open).
- **U-shape**: the classic intraday volume pattern where the open and close are highest, with a midday trough.
