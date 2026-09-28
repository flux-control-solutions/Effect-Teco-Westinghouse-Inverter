---
'@flux-control/effect-teco-westinghouse-inverter': patch
---

Accept `@flux-control/effect-modbus-rs` 0.6 as a peer dependency.

The peer range is now `^0.5.0 || ^0.6.0`.
For a 0.x version, the range `^0.5.0` does not include 0.6.0.
An application that uses 0.6 then gets a second copy of the library for this package.
