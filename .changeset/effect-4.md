---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Move to `effect` 4.0.3. The `effect` peer dependency is now `^4.0.3`. The `@flux-control/effect-modbus-rs` peer dependency is now `^0.9.0`, and the `@flux-control/modbus-schema` dependency is now `^0.4.0`.

`effect` 4.0.1 sets the expiry of a `ScopedCache` entry before it resumes the callers that wait for the lookup. Thus a failed lookup with a zero time-to-live is not returned to the next `get`. The service no longer yields after a failed lookup, because this workaround for `effect` 4.0.0-rc.118 is not necessary.
