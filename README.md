# Effect-Teco-Westinghouse-Inverter

**An Effect-TS service for Teco/Westinghouse A510 inverters** that wraps `@flux-control/effect-modbus-rs` to manage the Modbus transport, map command and monitor registers, and apply typed schemas to all parameter groups (00–22).

For the complete API reference, see the [GitHub Pages documentation](https://flux-control-solutions.github.io/Effect-Teco-Westinghouse-Inverter/).

`TecoInverterService` is a scoped `Effect.Service` that:

- **Manages the transport** — Opens RTU or ASCII connections via `@flux-control/effect-modbus-rs` and caches a client per device ID.
- **Exposes operations** — Typed command registers (start/stop, frequency, torque, analog/digital outputs) with read-modify-write semantics for bitfield registers.
- **Exposes monitoring** — Typed monitor registers (state, errors, frequency, current, voltage, etc.) that decode wire values into domain types.
- **Maps parameters** — Typed access to every A510 parameter (Groups 00–22) with proper scaling factors (×0.001, ×0.01, ×0.1, signed Int16, etc.) applied at encode/decode time.

> This project is under active development. Its API may change before the 1.0 release.

## Install

```sh
bun add @flux-control/effect-teco-westinghouse-inverter
```

Requires `effect`, `@flux-control/effect-modbus-rs`, and `@flux-control/modbus-schema` as peer dependencies.

## Quick start

```ts
import { Console, Effect, Layer } from 'effect';
import { TecoInverterService } from '@flux-control/effect-teco-westinghouse-inverter';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const freq = yield* inverter.frequencyCommand(1).read();
  yield* inverter.frequencyCommand(1).update(50.0);
});

program.pipe(
  Effect.provide(
    Layer.provideMerge(
      TecoInverterService.Default(true),
      SerialTransportService.fromRtu({ portPath: '/dev/ttyUSB0', baudRate: 19200 }),
    ),
  ),
  Effect.scoped,
  Effect.runPromise,
);
```

## Service

`TecoInverterService` is a scoped `Effect.Service` that manages a Modbus client pool per device. Provide it with `Effect.provide` alongside a transport layer (`SerialTransportService` from `@flux-control/effect-modbus-rs`).

### Resilience

Retry and reconnection are owned by the transport, not by this service. Configure them where the transport layer is built and they apply to every inverter operation — there is no per-call wiring to do here:

```ts
SerialTransportService.fromRtu({
  portPath: '/dev/ttyUSB0',
  baudRate: 19200,
  retry: RetryPolicies.serial(), // backoff + jitter, tuned for a serial bus
  reconnect: {}, // supervised reconnect + circuit breaker
});
```

With `reconnect` enabled, operations attempted while the link is down fail with `ModbusCircuitOpenError` rather than queueing onto a dead bus. It is a member of the `ModbusError` union, so it can surface from any `read()` or `update()` on this service — code that matches exhaustively on `_tag` should handle it. Defaults are unchanged: with neither option set, operations remain single-shot.

See the [`@flux-control/effect-modbus-rs` docs](https://github.com/flux-control-solutions/Effect-modbus-rs) for the full policy templates.

### Command registers (write)

| Method                        | Register | Description                      |
| ----------------------------- | -------- | -------------------------------- |
| `operationCommand(deviceId)`  | 0x2501   | Start/stop/reverse + fault reset |
| `frequencyCommand(deviceId)`  | 0x2502   | Target output frequency (Hz)     |
| `torqueCommand(deviceId)`     | 0x2503   | Torque limit / command (%)       |
| `speedLimitCommand(deviceId)` | 0x2504   | Speed limit (%)                  |
| `analogOut1Command(deviceId)` | 0x2505   | Analog output 1 (V)              |
| `analogOut2Command(deviceId)` | 0x2506   | Analog output 2 (V)              |
| `digitalOutCommand(deviceId)` | 0x2507   | Digital output terminals         |

### Monitor registers (read)

| Method                                 | Register | Description                |
| -------------------------------------- | -------- | -------------------------- |
| `stateMonitor(deviceId)`               | 0x2520   | Operating state flags      |
| `errorDescriptionMonitor(deviceId)`    | 0x2521   | Fault code + description   |
| `digitalInStateMonitor(deviceId)`      | 0x2522   | Digital input states       |
| `frequencyCommandMonitor(deviceId)`    | 0x2523   | Active frequency command   |
| `outputFrequencyMonitor(deviceId)`     | 0x2524   | Actual output frequency    |
| `dcBusVoltageCommandMonitor(deviceId)` | 0x2526   | DC bus voltage (V)         |
| `outputCurrentMonitor(deviceId)`       | 0x2527   | Output current (A)         |
| `warningDescriptionMonitor(deviceId)`  | 0x2528   | Warning code + description |
| `digitalOutStateMonitor(deviceId)`     | 0x2529   | Digital output states      |
| `analogOut1Monitor(deviceId)`          | 0x252A   | Analog output 1 voltage    |
| `analogOut2Monitor(deviceId)`          | 0x252B   | Analog output 2 voltage    |
| `analogIn1Monitor(deviceId)`           | 0x252C   | Analog input 1 (%)         |
| `analogIn2Monitor(deviceId)`           | 0x252D   | Analog input 2 (%)         |
| `a510CheckMonitor(deviceId)`           | 0x252F   | Drive series/model ID      |

## Parameter groups

Typed access to all Groups 00–22 via `inverter.parameters.group##`:

| Group | Name                          | Pages       |
| ----- | ----------------------------- | ----------- |
| 00    | Basic Parameters              | 4-19 – 4-22 |
| 01    | Frequency Parameters          | 4-37 – 4-38 |
| 02    | Accel/Decel Parameters        | 4-39 – 4-43 |
| 03    | Multi-Function Input          | 4-44 – 4-52 |
| 04    | Multi-Function Digital Output | 4-53 – 4-59 |
| 05    | Multi-Step/Speed              | 4-60 – 4-66 |
| 06    | VFD Protection                | 4-67 – 4-71 |
| 07    | Start/Stop                    | 4-72 – 4-74 |
| 08    | Protection                    | 4-75 – 4-79 |
| 09    | Communication                 | 4-80        |
| 10    | PID Control                   | 4-81 – 4-84 |
| 11    | Auxiliary Functions           | 4-85 – 4-88 |
| 12    | Monitoring                    | 4-62 – 4-67 |
| 13    | Maintenance                   | 4-68 – 4-71 |
| 14    | PLC Setting                   | 4-72        |
| 15    | PLC Monitoring                | 4-73        |
| 16    | LCD Function                  | 4-74 – 4-77 |
| 17    | Automatic Tuning              | 4-78 – 4-79 |
| 18    | Slip Compensation             | 4-79        |
| 19    | Wobble Frequency              | 4-79 – 4-80 |
| 20    | Speed Control                 | 4-80 – 4-82 |
| 21    | Torque & Position Control     | 4-82 – 4-85 |
| 22    | PM Motor                      | 4-85 – 4-88 |

Each parameter callable returns `{ read(), update(value) }` for a given `deviceId`.

### Schema engine

The device-agnostic schema factories now live in the [`@flux-control/modbus-schema`](../Modbus-Schema/) package:

- **`makeParam(register, meta)`** — Simple UInt16 pass-through
- **`makeScaledParam(register, factor, meta)`** — Scaled value (e.g., 0.01 Hz)
- **`makeSignedScaledParam(register, factor, meta)`** — Signed scaled value using two's complement over UInt16 wire
- **`makeEnumParam(register, labels, meta)`** — Labeled selection values
- **`makeBitfieldParam(register, flagsClass, bitLayout, meta)`** — Boolean flags packed into a word
- **`makeLookupParam(register, labels, fallback, meta)`** — Decode-only lookup table with fallback

Each factory returns a `ParamEntry` with both Effect-native and synchronous decode/encode APIs. Parameter group files import `ParamKind` and `ParamConfig` directly from `@flux-control/modbus-schema`, and `src/parameters/operations.ts` hosts the inverter-specific `ModbusError`-coupled operation types.

## Testing with mocks

Use `SerialTransportService.makeMockTransport` with `TecoInverterService.mockDevice()` — a built-in generator producing a full `SlaveDeviceDefinition` for the A510 with all registers defaulting to `0`.

```ts
import { Console, Effect, Layer } from 'effect';
import { TecoInverterService } from '@flux-control/effect-teco-westinghouse-inverter';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;

  const freq = yield* inverter.frequencyCommand(1).read();
  yield* inverter.frequencyCommand(1).update(50.0);
  const freqAfter = yield* inverter.frequencyCommand(1).read();

  yield* Console.log(`Frequency: ${freq} -> ${freqAfter}`);
});

const mockLayer = SerialTransportService.makeMockTransport([TecoInverterService.mockDevice(1)])({
  portPath: '/dev/null',
  baudRate: 9600,
});

program.pipe(
  Effect.provide(Layer.provideMerge(TecoInverterService.Default('Rtu'), mockLayer)),
  Effect.scoped,
  Effect.runPromise,
);
```

See `examples/readAllRegistersMock.ts` for a full walkthrough.

### Overriding mock defaults

`mockDevice()` returns a standard `SlaveDeviceDefinition`. Override individual register defaults before passing to `makeMockTransport`:

```ts
const device = TecoInverterService.mockDevice(1);
const customRegisters = device.holdingRegisters.map((reg) => {
  if (reg.address === 0x2501) return { address: reg.address, default: 5 }; // Running
  if (reg.address === 0x2502) return { address: reg.address, default: 500 }; // 50.0 Hz
  return reg;
});

const mockLayer = SerialTransportService.makeMockTransport([
  {
    ...device,
    holdingRegisters: customRegisters,
  },
]);
```

### SlaveDeviceDefinition schema

| Property           | Type                     | Description                                    |
| ------------------ | ------------------------ | ---------------------------------------------- |
| `unitId`           | `number`                 | Modbus slave/unit ID (required)                |
| `coils`            | `{ address, default }[]` | Coil registers                                 |
| `discreteInputs`   | `{ address, default }[]` | Discrete input registers                       |
| `holdingRegisters` | `{ address, default }[]` | Holding registers (command + monitor + params) |
| `inputRegisters`   | `{ address, default }[]` | Input registers                                |

## Register map

Command and monitor registers are TypeScript enums in `src/Registers.ts`:

- `COMMAND_REGISTERS` — 0x2501–0x2507
- `MONITOR_REGISTERS` — 0x2520–0x252F
- `GROUP_00_Basic_Parameters` through `GROUP_22_PM_Motor_Parameters` — 0x0000–0x1623

## Development

| Action      | Command                      |
| ----------- | ---------------------------- |
| Install     | `bun install`                |
| Type-check  | `bun run typecheck`          |
| Test        | `bun test`                   |
| Run example | `bun run examples/<name>.ts` |

## Source layout

```
index.ts                     — Re-exports all public API
src/
  Registers.ts               — Modbus register address enums
  TecoInverterService.ts     — Scoped Effect.Service for A510 communication
  errors.ts                  — Error utilities (readOnlyEncodeFailure)
  schemas.ts                 — Command/monitor wire schemas + formatters
  utils.ts                   — Bit helpers (bit)
  parameters/
    index.ts                 — Re-exports all parameter groups
    operations.ts            — Inverter-specific operation types that couple @flux-control/modbus-schema with @flux-control/effect-modbus-rs
    group-00.ts … group-22.ts — Parameter configs per group
examples/
  readOpsRegister.ts         — Read/write operation command register
  readAllRegisters.ts        — Read all command + monitor registers
  readAllRegistersMock.ts    — Mock transport walkthrough
  readGroup00Params.ts       — Read all Group 00 parameters
```

## License

GPL-3.0
