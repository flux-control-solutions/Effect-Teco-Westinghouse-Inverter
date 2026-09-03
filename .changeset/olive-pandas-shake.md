---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Let the transport decide the transactions, instead of one per register.

Every accessor names one register, so reading all 49 parameters of Group 00 cost 49 round trips — and on a half-duplex bus the round trip is the cost. The service now takes a batching client per drive, so reads that are in flight at the same moment are collected and packed into the fewest spans that cover them. Group 00 is three contiguous runs, so those 49 parameters now cost three transactions.

Call sites keep their shape. `inverter.parameters.group00['00-01'](1).read()` reads the same way it always did; what changes is what it costs.

**Breaking:** `TecoInverterService.make` takes an options object in place of its `safeShutdown` boolean. `make(true)` becomes `make()`, and `make(false)` becomes `make({ safeShutdown: false })`.

Batching is opt-in and every default leaves timing as it was: `reads.window` and `writes.window` are `0`, `writes.cache` is off, and `reads.maxGap` is `0`. A window is what turns per-register accessors into packed transactions, and it needs concurrent readers to collect — reads awaited one after another never overlap. The right window is a property of the bus rather than of the drive, so it is left to the caller to measure.

Two of the defaults are deliberate rather than conservative. `reads.maxGap` stays at `0` because a drive may answer `ILLEGAL_DATA_ADDRESS` for a register it does not implement and fail the whole span with it. `writes.cache` stays off because an A510 has a keypad, and a parameter changed at the panel leaves the record describing a value the drive no longer holds — after which it would suppress exactly the write that would restore it.

The read inside `update()` is the immediate one, so a read-modify-write pair does not widen its own race by the length of the window. The safe-shutdown stop now runs through the transport's shutdown hook for this service's own drive set, and clears the write record first so that a stop always reaches the wire.
