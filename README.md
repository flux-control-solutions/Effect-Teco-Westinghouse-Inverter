# @flux-control/effect-teco-westinghouse-inverter

An Effect v4 service and schema library for Teco/Westinghouse A510 inverter registers.

The package provides typed command operations, monitor readings, and parameter access for Groups 00–22.
It applies wire scaling and schema validation through [`@flux-control/modbus-schema`](https://github.com/flux-control-solutions/Modbus-Schema).
The application supplies a transport from [`@flux-control/effect-modbus-rs`](https://github.com/flux-control-solutions/Effect-modbus-rs).

For generated API documentation, see [GitHub Pages](https://flux-control-solutions.github.io/Effect-Teco-Westinghouse-Inverter/).

## Features

- Read and update command registers with typed values or bitfield patches.
- Decode monitor registers into numeric values, flags, or lookup descriptions.
- Access configured parameters through `inverter.parameters.group00` through `group22`.
- Collect concurrent register operations into transport-managed batches.
- Enable write caching when the application controls external register changes.
- Attempt to stop acquired drives when the service scope closes.
- Test register operations with generated in-memory device definitions.

## Installation

```bash
bun add @flux-control/effect-teco-westinghouse-inverter
bun add effect@4.0.0-rc.109 @flux-control/effect-modbus-rs@^0.7.0
```

The current package requires these peer dependencies:

| Package                          | Version         |
| -------------------------------- | --------------- |
| `effect`                         | `^4.0.0-rc.109` |
| `@flux-control/effect-modbus-rs` | `^0.7.0`        |

Effect v3 is not compatible with this package.
The application and this package must share the transport dependency.
Local workspace exports use TypeScript source. Published exports use JavaScript and declarations from `dist/`.

## Quick start

The application owns the serial port and transport configuration.
Provide that transport to the service layer:

```typescript
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { FrequencyHz, TecoInverterService } from '@flux-control/effect-teco-westinghouse-inverter';
import { Effect, Layer } from 'effect';

const transport = SerialTransportService.fromRtu({
  portPath: '/dev/ttyUSB0',
  baudRate: 19200,
});

const inverterLayer = TecoInverterService.make().pipe(Layer.provide(transport));

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const before = yield* inverter.frequencyCommand(1).read();
  yield* inverter.frequencyCommand(1).update(FrequencyHz.make(50));
  const after = yield* inverter.frequencyCommand(1).read();
  return { before, after };
});

const result = await Effect.runPromise(program.pipe(Effect.provide(inverterLayer), Effect.scoped));
```

When this program ends, its scope closes and the service attempts to stop the acquired drive.
Keep the service scope open for the required operating period.
For custom layer wiring, `TecoInverterService.makeScoped(options)` returns the scoped constructor effect.
It requires `SerialTransportService` and `Scope`.

## Register operations

Each command accessor accepts a device ID and returns `read()` and `update(value)` operations.
Numeric operations use engineering units. Bitfield operations accept partial patches.
Numeric command updates require branded values, such as `FrequencyHz.make(50)` or `Voltage.make(5)`.
Each monitor accessor returns only `read()`.

### Command registers

| Accessor            | Address  | Value                                              |
| ------------------- | -------- | -------------------------------------------------- |
| `operationCommand`  | `0x2501` | Run, reverse, fault reset, and other command flags |
| `frequencyCommand`  | `0x2502` | Frequency in Hz; scale 0.01                        |
| `torqueCommand`     | `0x2503` | Torque percentage; signed scale 1 / 81.92          |
| `speedLimitCommand` | `0x2504` | Speed-limit percentage; signed scale 1             |
| `analogOut1Command` | `0x2505` | Analog output voltage; scale 0.01 V                |
| `analogOut2Command` | `0x2506` | Analog output voltage; scale 0.01 V                |
| `digitalOutCommand` | `0x2507` | RY1, RY2, and pulse output flags                   |

The frequency domain schema accepts 0–600 Hz. Its display metadata lists 0–599 Hz.
Torque accepts −100–100%, speed limit accepts −120–120%, and analog output voltage accepts 0–10 V.
These are schema bounds, not a guarantee that every drive configuration accepts the full range.

### Bitfield patches

```typescript
const runForward = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  yield* inverter.operationCommand(1).update({ run: true, reverse: false });
  yield* inverter.digitalOutCommand(1).update({ ry1: true });
});
```

`operationCommand` and `digitalOutCommand` use read-modify-write operations.
They read immediately, merge the patch into decoded flags, and encode the resulting word.
The read does not wait for a collection window. The write can still wait for a configured write window.
The pair is not atomic. If callers patch the same register concurrently, serialize those updates in the application.

### Monitor registers

| Accessor                     | Address  | Result                       |
| ---------------------------- | -------- | ---------------------------- |
| `stateMonitor`               | `0x2520` | Operating state flags        |
| `errorDescriptionMonitor`    | `0x2521` | Fault description            |
| `digitalInStateMonitor`      | `0x2522` | S1–S8 input flags            |
| `frequencyCommandMonitor`    | `0x2523` | Frequency command in Hz      |
| `outputFrequencyMonitor`     | `0x2524` | Output frequency in Hz       |
| `dcBusVoltageCommandMonitor` | `0x2526` | DC bus voltage in V          |
| `outputCurrentMonitor`       | `0x2527` | Output current in A          |
| `warningDescriptionMonitor`  | `0x2528` | Warning description          |
| `digitalOutStateMonitor`     | `0x2529` | Digital output flags         |
| `analogOut1Monitor`          | `0x252A` | Analog output 1 voltage in V |
| `analogOut2Monitor`          | `0x252B` | Analog output 2 voltage in V |
| `analogIn1Monitor`           | `0x252C` | Analog input 1 percentage    |
| `analogIn2Monitor`           | `0x252D` | Analog input 2 percentage    |
| `a510CheckMonitor`           | `0x252F` | Drive series description     |

Monitor registers are not a continuous address range. Their codecs reject encoding.
Fault, warning, and model lookup codecs provide fallback descriptions for unknown codes.
Frequency monitors use scale 0.01. Voltage and current scales are 0.1, except analog output voltage, which uses 0.01.
Analog input percentage uses scale 0.1.

### Errors

Reads can fail with Modbus errors or schema decode errors.
Updates can fail with Modbus errors or schema encode errors.
Import Modbus error classes from `@flux-control/effect-modbus-rs` for `Effect.catchTags`.

Individual operations expose their errors through Effect error channels.
The service does not return a per-device failure collection.
If a polling cycle must retain healthy readings, handle each operation's failure in the application.

## Parameter groups

Use the literal parameter code as the key:

```typescript
const configureDirection = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  const direction = inverter.parameters.group00['00-01'];
  const before = yield* direction(1).read();
  yield* direction(1).update('Forward');
  return { before, metadata: direction.meta };
});
```

Each parameter callable accepts a device ID and returns `read()` and `update(value)`.
Its `meta` property exposes display metadata.
Parameter values can be numeric, scaled, signed, or labeled selections, depending on their configuration.
Use the inferred accessor type to determine the accepted value.

| Group | Parameter area                 |
| ----- | ------------------------------ |
| 00    | Basic parameters               |
| 01    | Frequency parameters           |
| 02    | Acceleration and deceleration  |
| 03    | Multi-function inputs          |
| 04    | Multi-function digital outputs |
| 05    | Multi-step speed               |
| 06    | VFD protection                 |
| 07    | Start and stop                 |
| 08    | Protection                     |
| 09    | Communication                  |
| 10    | PID control                    |
| 11    | Auxiliary functions            |
| 12    | Monitoring                     |
| 13    | Maintenance                    |
| 14    | PLC settings                   |
| 15    | PLC monitoring                 |
| 16    | LCD functions                  |
| 17    | Automatic tuning               |
| 18    | Slip compensation              |
| 19    | Wobble frequency               |
| 20    | Speed control                  |
| 21    | Torque and position control    |
| 22    | PM motor                       |

Group configurations and address enums are defined in `src/parameters/` and `src/Registers.ts`.
Some addresses are marked as inferred in the register source.
Parameter metadata can describe read-only values, but group accessors still expose `update()`.
The library does not enforce every device-specific access restriction from that metadata.
Check the drive specification for access permissions and addresses when selecting parameters.

The package root exports register enums, schemas, the service, `readOnlyEncodeFailure`, and `bit`.
It does not export the parameter configuration modules as package subpaths.
Use `inverter.parameters` for parameter operations.

## Batching and caching

Pass bus-specific options to `TecoInverterService.make(options)`.
Create the layer once and share it so the layer memo map can reuse one service instance.

| Option           | Default                     | Behavior                                                        |
| ---------------- | --------------------------- | --------------------------------------------------------------- |
| `reads.window`   | `0`                         | Collection window for concurrent reads                          |
| `reads.maxGap`   | `0`                         | Unrequested addresses allowed between requested spans           |
| `writes.window`  | `0`                         | Debounce window for nearby writes                               |
| `writes.maxHold` | Four times the write window | Maximum hold before flushing continuous updates                 |
| `writes.cache`   | `false`                     | Skip writes whose encoded values match cached values            |
| `safeShutdown`   | `true`                      | Attempt to clear the run flag on acquired drives during cleanup |

Window and hold options accept `Duration.Input`.
Zero windows disable collection delays. `reads.maxGap` applies to all groups on a unit.

### Collect concurrent reads

```typescript
const batchedLayer = TecoInverterService.make({
  reads: { window: '5 millis', maxGap: 0 },
}).pipe(Layer.provide(transport));

const readGroup00 = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  return yield* Effect.all(
    Object.values(inverter.parameters.group00).map((parameter) => parameter(1).read()),
    { concurrency: 'unbounded' },
  );
});

const values = await Effect.runPromise(
  readGroup00.pipe(Effect.provide(batchedLayer), Effect.scoped),
);
```

The collection window and concurrent execution are both required for separate reads to share planned spans.
Sequential reads do not overlap and each waits for its own window.
Mock tests verify three Group 00 read spans with zero gap tolerance and one span with `maxGap: 7`.
An unsupported address inside a gap can fail the entire span on a physical drive.

### Write completion and cache ownership

Each new write restarts the write window. `writes.maxHold` bounds continuous arrivals.
Callers wait for the outcome of the batch handling their update.
A newer write to the same register can replace a held value; both callers receive the handling batch's outcome.
Caching can also suppress unchanged values. Successful completion does not prove that each requested value was sent.

Write caching is disabled by default because keypad changes and external writers can invalidate cached values.
The service does not refresh write-cache values from ordinary reads.
The transport invalidates caches after failed writes and connection state changes.
If caching is enabled, manage other external changes through the transport's register cache.

## Transport and lifecycle

The service requires `SerialTransportService` and does not open a serial port itself.
Use `fromRtu` or `fromAscii` from the transport package as required by the application.
The transport owns serialization, retry, reconnect, and transaction planning.

```typescript
import { RetryPolicies } from '@flux-control/effect-modbus-rs';

const resilientTransport = SerialTransportService.fromRtu({
  portPath: '/dev/ttyUSB0',
  baudRate: 19200,
  retry: RetryPolicies.serial(),
  reconnect: {},
});
```

Retry and reconnect are opt-in transport settings.
Without them, operations use single attempts and no supervised reconnect.
While a supervised circuit is open, operations fail with `ModbusCircuitOpenError` before reaching the drive.

### Client reuse

The service caches one acquired batching client per unit and expires failed acquisitions.
Concurrent callers for the same unit share client acquisition.
If a transport outlives a service scope, a later service reuses its existing client declarations and their original options.

The service warns about different debounce windows or write-cache presence.
Planner limits and retry policies are not inspectable through the client.
If this service disables write caching, updates invalidate any cache on a reused client before queuing writes.

### Shutdown

When `safeShutdown` is enabled, each acquired client registers its own cleanup operation.
Cleanup invalidates the unit's write cache, reads the operation command immediately, and writes a patch with `run: false`.
Other modeled command flags remain as decoded from that read.
The write bypasses the debounce delay.

Cleanup only addresses drives acquired by this service.
It logs and ignores stop failures so other drives still receive a stop attempt.
A successful command write does not confirm physical motor standstill.
Set `safeShutdown: false` to disable these stop attempts.

## Testing without hardware

`TecoInverterService.mockDevice(deviceId)` returns a `SlaveDeviceDefinition` for an in-memory transport:

```typescript
const mockTransport = SerialTransportService.makeMockTransport([TecoInverterService.mockDevice(1)])(
  { portPath: 'mock', baudRate: 19200 },
);

const mockLayer = TecoInverterService.make().pipe(Layer.provide(mockTransport));

const mockResult = await Effect.runPromise(program.pipe(Effect.provide(mockLayer), Effect.scoped));
```

Command and monitor holding registers start at zero.
Parameter registers use numeric defaults derived from metadata; scaled defaults are converted to wire counts.
Non-numeric defaults become zero. These values are test defaults, not a complete physical drive simulation.

Override individual wire values before creating the transport:

```typescript
const device = TecoInverterService.mockDevice(1);
const customDevice = {
  ...device,
  holdingRegisters: device.holdingRegisters.map((register) =>
    register.address === 0x2502 ? { ...register, default: 5000 } : register,
  ),
};

const customMockTransport = SerialTransportService.makeMockTransport([customDevice])({
  portPath: 'mock',
  baudRate: 19200,
});
```

The wire value `5000` represents `50 Hz` at scale 0.01.
Use `Layer.provideMerge` when a test also needs direct access to `SerialTransportService`.
See [examples/readAllRegistersMock.ts](examples/readAllRegistersMock.ts) for a complete mock example.

## Development

Run commands from this package repository root.
If a parent workspace manages dependencies, install from that workspace root instead.

```bash
bun install
bun run format
bun run lint
bun run typecheck
bun run test
bun run build
```

`bun run format` checks formatting. `bun run format:fix` applies formatting changes.
`bun run build` produces published JavaScript and declarations.
`bun run docs` generates API documentation with the separate TypeDoc tooling.

## Source layout

```text
index.ts                     Public package exports
src/Registers.ts             Command, monitor, and parameter address enums
src/TecoInverterService.ts    Scoped service and mock device factory
src/schemas.ts               Command and monitor schemas and domain types
src/errors.ts                Read-only encoding error helper
src/utils.ts                 Bit-mask helper
src/parameters/              Group configurations and operation types
examples/                    Serial and mock transport examples
tools/typedoc/               API documentation tooling
```

## License

GPL-3.0. See [LICENSE](LICENSE).
