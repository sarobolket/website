import { Metric, ReadonlyArray, Random, Effect } from "effect"

// Metric<Histogram, Duration, Histogram>
const timer = Metric.timerWithBoundaries("timer", ReadonlyArray.range(1, 10))

const program = Random.nextIntBetween(1, 10).pipe(
  Effect.flatMap((n) => Effect.sleep(`${n} millis`)),
  Metric.trackDuration(timer),
  Effect.repeatN(99)
)

Effect.runPromise(program.pipe(Effect.flatMap(() => Metric.value(timer)))).then(
  (histogramState) => console.log("%o", histogramState)
)
/*
Output:
HistogramState {
  buckets: [
    [ 1, 3 ],
    [ 2, 13 ],
    [ 3, 17 ],
    [ 4, 26 ],
    [ 5, 35 ],
    [ 6, 43 ],
    [ 7, 53 ],
    [ 8, 56 ],
    [ 9, 65 ],
    [ 10, 72 ],
    [ Infinity, 100 ],
    [length]: 11
  ],
  count: 100,
  min: 0.25797,
  max: 12.25421,
  sum: 683.0266810000002,
  ...
}
*/
