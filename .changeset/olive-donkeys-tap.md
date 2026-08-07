---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Bump `@flux-control/effect-modbus-rs` to `^0.3.0`.

No source changes were required — the service uses `SerialTransportService`, `withClient`, and `SlaveDeviceDefinition`, none of which changed shape. Two things are worth knowing:

- **Retry and reconnection are now configured on the transport**, not per call site. Pass `retry` and `reconnect` to `SerialTransportService.fromRtu` / `.fromAscii` / `.makeMockTransport` and they apply to every inverter operation. Defaults are unchanged: with neither option set, operations remain single-shot.
- **`ModbusCircuitOpenError` joins the `ModbusError` union.** It can surface from any `read()` or `update()` on this service when `reconnect` is enabled and the link is down. Code that matches exhaustively on `_tag` should add a case for it.

Upstream also removed `retryAttempts`, `retryDelayMs`, and `retryBackoffStrategy` from the transport constructors. This package never set them, so nothing here changed.
