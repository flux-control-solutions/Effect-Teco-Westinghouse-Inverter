import { describe, expect, test } from 'bun:test';

import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Effect, Layer } from 'effect';

import { CommandWordPatch } from './schemas';
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
