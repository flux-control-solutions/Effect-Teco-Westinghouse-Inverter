# effect-teco-westinghouse-inverter

Bidirectional schema transformers for Teco/Westinghouse A510 inverter Modbus parameters, built with Effect-TS.

## Stack

- **Runtime**: Bun only — never use Node, npm, pnpm, yarn, or vite.
- **Language**: TypeScript 6 (ESNext, `verbatimModuleSyntax`, bundler resolution, `module: "Preserve"`).
- **Core libs**: `effect` (^3.21.4), `@flux-control/effect-modbus-rs` (^0.3.0), `@flux-control/modbus-schema` (^0.1.2) — both resolved from npm, not linked.
- **LSP**: `@effect/language-service` plugin in `tsconfig.json` `compilerOptions.plugins`.
- **License**: GPL-3.0.

## Commands

| Action      | Command                      |
| ----------- | ---------------------------- |
| Install     | `bun install`                |
| Type-check  | `bun run typecheck`          |
| Test        | `bun test`                   |
| Run example | `bun run examples/<name>.ts` |
| Build       | `bun run build`              |

No build step required for development — `noEmit` is on; Bun runs `.ts` directly.

## Source layout

```
index.ts                     — Re-exports all public API from src/
src/
  Registers.ts               — Modbus register address enums (COMMAND_REGISTERS, MONITOR_REGISTERS, GROUP_*)
  TecoInverterService.ts     — Scoped Effect.Service for A510 communication
  errors.ts                  — Error utilities (readOnlyEncodeFailure)
  schemas.ts                 — Command/monitor wire schemas + formatters
  utils.ts                   — Bit helpers (bit)
  parameters/
    index.ts                 — Re-exports all parameter groups
    operations.ts            — Inverter-specific operation types that couple modbus-schema with effect-modbus-rs
    group-00.ts … group-22.ts — Parameter configs per group
examples/
  readOpsRegister.ts         — Read/write operation command register
  readAllRegisters.ts        — Read all command + monitor registers
  readAllRegistersMock.ts   — Mock transport walkthrough
  readGroup00Params.ts       — Read all Group 00 parameters
```

## Architecture

- **`TecoInverterService`** — A scoped `Effect.Service` that wraps a `SerialTransportService`. Clients are created per `deviceId` via `transport.withClient(deviceId)` and cached in a `Set<number>`.
- **Command registers** — Use read-modify-write semantics to update individual bitfields without affecting unchanged bits.
- **Monitor registers** — Read-only; attempts to encode a monitor value fail with `readOnlyEncodeFailure`.
- **Parameter groups** — Accessed via `inverter.parameters.group##`. Each parameter callable returns `{ read(), update(value) }` for a given `deviceId`.
- **Schema engine** — The device-agnostic factories (`makeParam`, `makeScaledParam`, etc.) now live in the `modbus-schema` package. Parameter group files import `ParamKind` and `ParamConfig` from `modbus-schema` directly.
- **Operation types** — `ParamOperationOfEntry`, `ParamCallableOfEntry`, and `GroupParamOps` in `src/parameters/operations.ts` couple the generic engine with the `effect-modbus-rs` `ModbusError` type.
- **`mockDevice(deviceId)`** — Returns a `SlaveDeviceDefinition` with all A510 registers (command, monitor, and all parameter groups) defaulting to `0`.

## Conventions

- Follow `effect` idioms: `Effect`, `Layer`, `Schema`, `Scope`, `Data.TaggedError` throughout.
- Use `Bun.test` / `import { test, expect } from "bun:test"` for tests.
- Always `import type` for type-only imports (`verbatimModuleSyntax`).
- Don't use `dotenv` — Bun loads `.env` automatically.
- Register addresses are Int16 hex values (e.g., `0x2501`).
- Scaling factors are applied at encode/decode time, not at the wire level.

## Tooling

- **Fallow MCP** is configured via `opencode.json` (`bunx fallow-mcp`). The `.fallowrc.json` entry covers `index.ts`, `src/`, and `examples/`. Run `fallow audit` for pre-commit quality checks on changed code.

## Referencing upstream libraries

Shallow clones of key dependencies live in `references/` for offline browsing (gitignored; re-clone if stale):

| Reference        | Local path                    | Useful subdirectory                          |
| ---------------- | ----------------------------- | -------------------------------------------- |
| effect           | `references/effect`           | `packages/effect/src/` for core types        |
| effect-modbus-rs | `references/effect-modbus-rs` | `src/` for transport service implementations |

The skill at `.opencode/skills/reference-dependencies/SKILL.md` is the dedicated instruction for reference lookup.
