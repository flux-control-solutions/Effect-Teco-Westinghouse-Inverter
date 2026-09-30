import { describe, expect, test } from 'bun:test';

import { ModbusTransportError, SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Effect, Exit, Layer, Logger, Tracer } from 'effect';

import { COMMAND_REGISTERS } from './Registers';
import { CommandWordPatch, encodeFrequencyCommand, FrequencyHz } from './schemas';
import { TecoInverterService, type TecoInverterOptions } from './TecoInverterService';

const deviceId = 1;

/**
 * A drive on a mock bus, with a count of the transactions that reached it.
 *
 * The fault hook runs once per operation attempt, before the operation is
 * carried out, so counting the calls and injecting nothing counts transactions
 * without changing what any of them does.
 */
const mockBus = (options: TecoInverterOptions) => {
  const counter = { transactions: 0 };

  const transport = SerialTransportService.makeMockTransport([
    TecoInverterService.mockDevice(deviceId),
  ])({
    portPath: '/dev/mock',
    baudRate: 19200,
    fault: () => {
      counter.transactions += 1;
      return undefined;
    },
  });

  const layer = Layer.provideMerge(TecoInverterService.make(options), transport);

  const run = <A, E>(program: Effect.Effect<A, E, TecoInverterService>): Promise<A> =>
    Effect.runPromise(program.pipe(Effect.provide(layer), Effect.scoped));

  return { counter, run };
};

/**
 * Reads every parameter of Group 00 at once.
 *
 * The concurrency is the point: a window collects what overlaps it, and reads
 * awaited one after another never overlap.
 */
const readGroup00 = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;
  // SAFETY: every parameter in a group is a callable taking a device id and
  // returning a `read`; they differ only in the value each one decodes to,
  // which this test discards.
  const params = Object.values(inverter.parameters.group00) as ReadonlyArray<
    (id: number) => { read: () => Effect.Effect<unknown, unknown> }
  >;
  return yield* Effect.forEach(params, (param) => param(deviceId).read(), {
    concurrency: 'unbounded',
  });
});

describe('transaction batching', () => {
  test('reads Group 00 in one transaction per contiguous run', async () => {
    const { counter, run } = mockBus({
      safeShutdown: false,
      reads: { window: '50 millis' },
    });

    const values = await run(readGroup00);

    // Group 00 is 49 registers in three runs: 0x0000-0x001D, 0x0020-0x0021,
    // and 0x0029-0x0039. One span each.
    expect(values).toHaveLength(49);
    expect(counter.transactions).toBe(3);
  });

  test('without a window each parameter costs its own transaction', async () => {
    // The same reads with the default window of zero. This is what the
    // previous test is measured against: it fixes the window, and not the
    // planner or the mock, as the thing doing the work.
    const { counter, run } = mockBus({ safeShutdown: false });

    const values = await run(readGroup00);

    expect(values).toHaveLength(49);
    expect(counter.transactions).toBe(49);
  });

  test('a gap tolerance wide enough to bridge the runs reads the group in one', async () => {
    // The runs of Group 00 are separated by gaps of 2 and 7 registers.
    const { counter, run } = mockBus({
      safeShutdown: false,
      reads: { window: '50 millis', maxGap: 7 },
    });

    const values = await run(readGroup00);

    expect(values).toHaveLength(49);
    expect(counter.transactions).toBe(1);

    // CAUTION: this proves the option is wired, not that any drive tolerates
    // it. The mock answers 0 for a register it was not given, where a drive
    // may answer ILLEGAL_DATA_ADDRESS and fail the whole span. Read one span
    // across a known gap on the drive itself before raising this.
  });
});

describe('read-modify-write', () => {
  test('does not wait out the read window', async () => {
    // A read-modify-write pair holds a race between the read and the write.
    // The window must not widen it, which is why the read inside `update` is
    // the immediate one. With a window this long, a debounced read would show
    // up as a wall-clock delay.
    const { run } = mockBus({
      safeShutdown: false,
      reads: { window: '2 seconds' },
    });

    const startedAt = Date.now();
    await run(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: true }));
      }),
    );

    expect(Date.now() - startedAt).toBeLessThan(1_000);
  });

  test('preserves the bits the patch does not name', async () => {
    const { run } = mockBus({ safeShutdown: false });

    const after = await run(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        const command = inverter.operationCommand(deviceId);
        yield* command.update(new CommandWordPatch({ run: true, reverse: true }));
        yield* command.update(new CommandWordPatch({ run: false }));
        return yield* command.read();
      }),
    );

    expect(after.run).toBe(false);
    expect(after.reverse).toBe(true);
  });
});

describe('safe shutdown', () => {
  test('ignores units touched only by another transport consumer', async () => {
    const spans: Array<Tracer.NativeSpan> = [];
    const tracer = Tracer.make({
      span: (options) => {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    const transport = SerialTransportService.makeMockTransport([
      TecoInverterService.mockDevice(deviceId),
      TecoInverterService.mockDevice(2),
    ])({ portPath: '/dev/mock', baudRate: 19200 });
    const layer = Layer.provideMerge(TecoInverterService.make(), transport);

    await Effect.runPromise(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        const sharedTransport = yield* SerialTransportService;
        const unrelated = yield* sharedTransport.withClient(2);
        yield* unrelated.readHoldingRegisters({ address: 0, quantity: 1 });
        yield* inverter.operationCommand(deviceId).read();
      }).pipe(
        Effect.provide(layer),
        Effect.provide(Layer.succeed(Tracer.Tracer, tracer)),
        Effect.scoped,
      ),
    );

    const shutdownUnits = spans
      .filter((span) => span.name === 'modbus.write')
      .map((span) => span.attributes.get('modbus.unit_ids'));
    expect(shutdownUnits).toEqual([String(deviceId)]);
  });

  test('stops every drive the service spoke to', async () => {
    const { run } = mockBus({ safeShutdown: true });

    // The stop is issued as the scope closes, so the state has to be read back
    // on a second pass over the same devices rather than inside the program.
    await run(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: true }));
      }),
    );

    // A fresh service over a fresh mock cannot observe the previous one's
    // registers, so the evidence is the transaction the finalizer issued.
    const { counter, run: runAgain } = mockBus({ safeShutdown: true });
    await runAgain(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: true }));
      }),
    );

    // Two for the update's read-modify-write, then the finalizer's own read
    // and write against the same register.
    expect(counter.transactions).toBe(4);
  });

  test('is not suppressed by the write cache', async () => {
    // With the cache on, a stop that repeats a value the record already holds
    // would be dropped. A safety action has to reach the wire regardless, so
    // the stop clears the record before it writes.
    const { counter, run } = mockBus({ safeShutdown: true, writes: { cache: true } });

    await run(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        // Leaves the record holding a stopped command word, which is exactly
        // what the finalizer is about to write.
        yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: false }));
      }),
    );

    expect(counter.transactions).toBe(4);
  });

  test('leaves the drive alone when it is turned off', async () => {
    const { counter, run } = mockBus({ safeShutdown: false });

    await run(
      Effect.gen(function* () {
        const inverter = yield* TecoInverterService;
        yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: true }));
      }),
    );

    expect(counter.transactions).toBe(2);
  });
});

/*
 * The transport keeps each batching declaration for its full scope. These tests
 * keep one mock transport open while services over it start and stop.
 */
describe('a service over a transport that outlives it', () => {
  const sharedBus = () =>
    SerialTransportService.makeMockTransport([TecoInverterService.mockDevice(deviceId)])({
      portPath: '/dev/mock',
      baudRate: 19200,
    });

  /** Runs `effect` with a new service that closes when `effect` completes. */
  const withService = <A, E>(
    effect: Effect.Effect<A, E, TecoInverterService | SerialTransportService>,
    options?: TecoInverterOptions,
  ) => Effect.provide(effect, TecoInverterService.make(options));

  /** Records the text of each warning, so a test can inspect it. */
  const captureWarnings = () => {
    const warnings: Array<string> = [];
    const logger = Logger.make((options) => {
      if (options.logLevel === 'Warn') warnings.push([options.message].flat().join(' '));
    });
    return { warnings, layer: Logger.layer([logger]) };
  };

  test('a new service reads and updates a drive that an earlier service declared', async () => {
    const result = await Effect.runPromise(
      Effect.gen(function* () {
        const first = yield* withService(
          Effect.gen(function* () {
            const inverter = yield* TecoInverterService;
            yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: true }));
            return (yield* inverter.operationCommand(deviceId).read()).run;
          }),
        );

        const second = yield* withService(
          Effect.gen(function* () {
            const inverter = yield* TecoInverterService;
            // The first service stopped the drive when it closed.
            const stopped = (yield* inverter.operationCommand(deviceId).read()).run;
            yield* inverter.operationCommand(deviceId).update(new CommandWordPatch({ run: true }));
            return { stopped, running: (yield* inverter.operationCommand(deviceId).read()).run };
          }),
        );

        return { first, second };
      }).pipe(Effect.provide(sharedBus())),
    );

    expect(result).toEqual({ first: true, second: { stopped: false, running: true } });
  });

  test('a failed first lookup is not kept for the next call', async () => {
    // The first lookup declares the unit on the transport and then fails. The
    // cache must not keep the failure, so the second call runs a new lookup.
    // That lookup recovers the existing declaration and does not declare again.
    let calls = 0;
    const transportThatFailsOnce = Layer.effect(
      SerialTransportService,
      Effect.gen(function* () {
        const inner = yield* SerialTransportService;
        return {
          ...inner,
          withBatchingClient: (
            ...args: Parameters<typeof inner.withBatchingClient>
          ): ReturnType<typeof inner.withBatchingClient> =>
            Effect.flatMap(inner.withBatchingClient(...args), (client) => {
              calls += 1;
              if (calls > 1) return Effect.succeed(client);
              const message = 'Synthetic failure after the declaration';
              return Effect.fail(new ModbusTransportError({ cause: new Error(message), message }));
            }),
        };
      }),
    ).pipe(Layer.provide(sharedBus()));

    const result = await Effect.runPromise(
      withService(
        Effect.gen(function* () {
          const inverter = yield* TecoInverterService;
          const first = yield* Effect.exit(inverter.operationCommand(deviceId).read());
          const second = yield* inverter.operationCommand(deviceId).read();
          return { firstFailed: Exit.isFailure(first), running: second.run };
        }),
      ).pipe(Effect.provide(transportThatFailsOnce)),
    );

    expect(result).toEqual({ firstFailed: true, running: false });
    expect(calls).toBe(1);
  });

  /** Declares the drive with `declared`, then reads it through a service with `options`. */
  const declareThenRead = async (
    declared: Parameters<SerialTransportService['Service']['withBatchingClient']>[1],
    options?: TecoInverterOptions,
  ) => {
    const { warnings, layer } = captureWarnings();
    const running = await Effect.runPromise(
      Effect.gen(function* () {
        const transport = yield* SerialTransportService;
        yield* transport.withBatchingClient(deviceId, declared);
        return yield* withService(
          Effect.gen(function* () {
            const inverter = yield* TecoInverterService;
            return (yield* inverter.operationCommand(deviceId).read()).run;
          }),
          options,
        );
      }).pipe(Effect.provide(sharedBus()), Effect.provide(layer)),
    );
    return { running, warnings };
  };

  test('an existing client with a write cache logs a warning that names the cache', async () => {
    const { running, warnings } = await declareThenRead({ cache: true });

    expect(running).toBe(false);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('Unit 1 already has a batching client');
    expect(warnings[0]).toContain('the existing client has a write cache');
    expect(warnings[0]).not.toContain('Debounce');
  });

  test('a write reaches the drive when the existing client has a wrong cached value', async () => {
    // Another component declared the drive with a write cache. The cache then
    // believes that the drive holds 50 Hz, but the drive holds 0, as after a
    // change at the keypad. The service does not cache writes, so its update to
    // 50 Hz must reach the drive and not be dropped as a repeat.
    const { warnings, layer } = captureWarnings();
    const target = FrequencyHz.make(50);
    const frequency = await Effect.runPromise(
      Effect.gen(function* () {
        const transport = yield* SerialTransportService;
        const existing = yield* transport.withBatchingClient(deviceId, { cache: true });
        const encoded = yield* encodeFrequencyCommand(target);
        existing.cache?.observe(deviceId, COMMAND_REGISTERS.FREQUENCY_COMMAND, encoded);
        return yield* withService(
          Effect.gen(function* () {
            const inverter = yield* TecoInverterService;
            yield* inverter.frequencyCommand(deviceId).update(target);
            return yield* inverter.frequencyCommand(deviceId).read();
          }),
        );
      }).pipe(Effect.provide(sharedBus()), Effect.provide(layer)),
    );

    expect(frequency).toBe(target);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain('clears the record of the unit before each write');
  });

  test('a different window and a missing cache give one warning that names both', async () => {
    const { warnings } = await declareThenRead(
      { cache: false, debounce: { writes: { window: '100 millis' } } },
      { writes: { window: '50 millis', cache: true } },
    );

    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toContain(
      'Debounce: existing write window 100 ms, maximum hold 400 ms, no read window; ' +
        'requested write window 50 ms, maximum hold 200 ms, no read window.',
    );
    expect(warnings[0]).toContain('the existing client has no write cache');
  });

  test('equal effective options log nothing', async () => {
    // The existing declaration states the hold that the service leaves to the
    // default. Both resolve to four times the window.
    const { warnings } = await declareThenRead(
      { cache: false, debounce: { writes: { window: '50 millis', maxHold: '200 millis' } } },
      { writes: { window: 0.05 * 1000 } },
    );

    expect(warnings).toEqual([]);
  });
});
