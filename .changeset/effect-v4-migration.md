---
'@flux-control/effect-teco-westinghouse-inverter': minor
---

Migrate to Effect v4 (`4.0.0-rc.109`).

**This is a breaking change.** Effect v3 and v4 do not interoperate, so consumers
must move to v4 in the same step. Effect v4 is still a release candidate.

**Peer dependency:** `effect` is now `^4.0.0-rc.109` (was `^3.21.4`).
`@effect/platform-bun` moves to the matching `^4.0.0-rc.109`.

**Sibling packages must be on their v4 releases.** This branch currently resolves
`@flux-control/modbus-schema` and `@flux-control/effect-modbus-rs` through
`file:` links to their local `v4` branches; those must be swapped back to
published semver ranges before release.

**`TecoInverterService` is a `Context.Service`.** v4 does not auto-generate a
layer from the service constructor, so the layer is now built explicitly.
`Default` is renamed to `make`, matching `@flux-control/effect-modbus-rs`:

```ts
// before
const TecoLayer = TecoInverterService.Default(true);
// after
const TecoLayer = TecoInverterService.make(true);
```

The scoped constructor effect is available as `makeScoped(safeShutdown)` if you
need to wire a layer yourself, and the service shape is exported as
`TecoInverterApi`.

**Domain brands use v4 filters.** `Schema.nonNegative()` was removed and the
comparison filters gained an `is` prefix, so brands like `FrequencyHz` are now
built with `Schema.Number.check(Schema.isGreaterThanOrEqualTo(0), …)`.

**Schema factory calls drop their value-type generic.** `@flux-control/modbus-schema`
v4 infers the concrete schema type from the `domain` option:

```ts
// before
makeScaledParam<FrequencyHz>(0x2502, 0.01, meta, { domain: FrequencyHz });
// after
makeScaledParam(0x2502, 0.01, meta, { domain: FrequencyHz });
```

**Parameter group configs are unchanged.** All 850+ `ParamConfig` objects across
groups 00–22 needed no edits — they use `as const satisfies`, so the upstream
inference rework flows through `fromConfig` without call-site changes.

**Other renames visible to consumers:** `ParseResult.ParseError` →
`Schema.SchemaError`, `Effect.catchAll` → `Effect.catch`,
`Schema.decodeUnknown` → `Schema.decodeUnknownEffect`.
