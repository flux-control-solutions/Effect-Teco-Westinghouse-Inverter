# Effect-Teco-Westinghouse-Inverter

Bidirectional schema transformers for Teco/Westinghouse A510 inverter Modbus parameters, built with [Effect](https://effect.website).

## Overview

This library provides typed, runtime-validated schemas for every parameter in the A510 instruction manual (Groups 00–22). Each schema can decode raw Modbus register values into meaningful domain types and encode domain values back to wire format, with proper scaling factors applied (×0.001, ×0.01, ×0.1, signed Int16, etc.).

## Quickstart

```sh
bun install
bun run typecheck   # Type-check the project
bun run build       # Build to ./dist
bun run index.ts    # Run the application
```

## Project Structure

```
index.ts                          — Entry point (re-exports all modules)
src/
  Registers.ts                    — Modbus register address enums
  schemas.ts                      — Command/monitor wire schemas (bit-field flags, scaled values)
  TecoInverterService.ts          — Effect service for read/write operations
  errors.ts                       — Error utilities
  utils.ts                        — Bit helper
  parameters/
    param-utils.ts                — Factory functions (makeParam, makeScaledParam, etc.)
    index.ts                      — Re-exports all parameter groups
    group-00.ts ... group-22.ts   — Parameter schemas per group
```

## Parameter Groups

| Group | Name | Params | Pages |
|-------|------|--------|-------|
| 00 | Basic Parameters | 49 | 4-34 – 4-36 |
| 01 | Frequency Parameters | 22 | 4-37 – 4-38 |
| 02 | Accel/Decel Parameters | 34 | 4-39 – 4-43 |
| 03 | Multi-Function Input | 64 | 4-44 – 4-52 |
| 04 | Multi-Function Digital Output | 40 | 4-53 – 4-59 |
| 05 | Multi-Step/Speed | 44 | 4-60 – 4-66 |
| 06 | VFD Protection | 28 | 4-67 – 4-71 |
| 07 | Start/Stop | 37 | 4-72 – 4-74 |
| 08 | Protection | 44 | 4-75 – 4-79 |
| 09 | Communication | 10 | 4-80 |
| 10 | PID Control | 40 | 4-81 – 4-84 |
| 11 | Auxiliary Functions | 51 | 4-85 – 4-88 |
| 12 | Monitoring | 55 | 4-62 – 4-67 |
| 13 | Maintenance | 46 | 4-68 – 4-71 |
| 14 | PLC Setting | 48 | 4-72 |
| 15 | PLC Monitoring | 33 | 4-73 |
| 16 | LCD Function | 36 | 4-74 – 4-77 |
| 17 | Automatic Tuning | 15 | 4-78 – 4-79 |
| 18 | Slip Compensation | 7 | 4-79 |
| 19 | Wobble Frequency | 8 | 4-79 – 4-80 |
| 20 | Speed Control | 36 | 4-80 – 4-82 |
| 21 | Torque & Position Control | 44 | 4-82 – 4-85 |
| 22 | PM Motor | 29 | 4-85 – 4-88 |

## Schema Factories

Four factory functions in `src/parameters/param-utils.ts`:

- **`makeParam(register, meta)`** — Simple UInt16 pass-through
- **`makeScaledParam(register, factor, meta)`** — Scaled value (e.g., 0.01 Hz)
- **`makeSignedScaledParam(register, factor, meta)`** — Signed Int16 with scaling
- **`makeEnumParam(register, labels, meta)`** — Labeled selection values

Each param carries structured metadata (`ParamMeta`) with group, code, name, range, default, unit, and manual page reference — exposed via Effect's `Schema.annotations()` as a human-readable description.

## Usage Example

```typescript
import { Param_01_01, decode01_01, encode01_01 } from "./parameters";

// Decode raw modbus value (0.01 Hz scaling applied automatically)
const decoded = decode01_01(5000)   // => 50.00 Hz

// Encode domain value back to wire format
const encoded = encode01_01(60)     // => 6000
```

## Register Map

Command and monitor registers are defined as TypeScript enums in `Registers.ts`:

- `COMMAND_REGISTERS` — 0x2501–0x2507 (operation, frequency, torque, analog/digital out)
- `MONITOR_REGISTERS` — 0x2520–0x252F (state, error, frequency, current, etc.)
- `GROUP_00_Basic_Parameters` through `GROUP_22_PM_Motor_Parameters` — 0x0000–0x1623

## Service Layer

`TecoInverterService` provides an Effect service for Modbus communication:

```typescript
const service = yield* TecoInverterService({ transportVariant: "Rtu" });
const result = yield* service.frequencyCommand(deviceId).update(50.0);
```
