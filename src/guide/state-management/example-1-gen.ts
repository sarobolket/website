import { Effect } from "effect"
import * as Counter from "./Counter"

// $ExpectType Effect<never, never, void>
const program = Effect.gen(function* (_) {
  const counter = yield* _(Counter.make)
  yield* _(counter.inc)
  yield* _(counter.inc)
  yield* _(counter.dec)
  yield* _(counter.inc)
  const value = yield* _(counter.get)
  yield* _(Effect.log(`This counter has a value of ${value}.`))
})

Effect.runSync(program)
/*
... message="This counter has a value of 2."
*/