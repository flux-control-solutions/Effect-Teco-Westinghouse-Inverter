---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Recover the existing batching client of a drive when a new service starts over a transport that stays open.

The transport keeps each declaration for its full scope. In `@flux-control/effect-modbus-rs` 0.7, a second declaration of a unit fails with `ModbusUnitAlreadyDeclaredError`. The service now catches this error and gets the existing client with `batchingClient`. The error types of `read()` and `update()` do not change.

The existing client keeps the options of its declaration. The service logs one warning when the debounce windows or the presence of the write cache differ from its own options. An omitted `maxHold` counts as four times the write window. The client does not show its planner limits or its retry policy, so the service cannot check them.

This release requires `@flux-control/effect-modbus-rs` `^0.7.0` as a peer dependency.
