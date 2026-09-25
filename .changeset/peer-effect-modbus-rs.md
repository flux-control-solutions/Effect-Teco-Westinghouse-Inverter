---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Make `@flux-control/effect-modbus-rs` a peer dependency.

The application builds the `SerialTransportService` and provides it to this package.
The application and this package must use the same copy of `@flux-control/effect-modbus-rs`.
A peer dependency makes the package manager share one copy.
Add `@flux-control/effect-modbus-rs` to the application dependencies.
