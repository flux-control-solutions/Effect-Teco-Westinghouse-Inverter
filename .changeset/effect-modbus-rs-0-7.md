---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Require `@flux-control/effect-modbus-rs` 0.7 as a peer dependency.

In that release, `withBatchingClient` can fail with `ModbusUnitAlreadyDeclaredError` when the unit already has a batching client. This error is not a member of the `ModbusError` union. The service operations now include it in their error type.

The transport keeps each declaration for its full scope. The error occurs when a new service starts over a transport that stays open, for a drive that an earlier service declared. To avoid it, create the transport with the service.

Breaking changes:

- Applications must use `@flux-control/effect-modbus-rs` `^0.7.0`.
- Code that matches exhaustively on the error type of `read()` or `update()` must handle `ModbusUnitAlreadyDeclaredError`.
