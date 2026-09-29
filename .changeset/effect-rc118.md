---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Move to `effect` 4.0.0-rc.118. The `effect` peer dependency is now `^4.0.0-rc.118`.

In `effect` 4.0.0-rc.118, `ScopedCache` can return a failed lookup to the next `get`, although the time-to-live of the failure is zero. This occurs when the lookup is asynchronous. Without a workaround, one failed declaration of a drive client would make every later operation on that drive fail. The service now yields after a failed lookup, so the next operation runs a new lookup.
