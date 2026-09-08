/**
 * Demonstrates the mock transport layer for testing A510 inverters.
 *
 * Uses {@link TecoInverterService.mockDevice} to create a full A510 register map
 * with default values, then demonstrates read/write operations on command registers
 * and parameter groups with the in-memory mock transport.
 *
 * @example bun run examples/readAllRegistersMock.ts
 */

import { BunRuntime } from '@effect/platform-bun';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Console, Effect, Layer, References } from 'effect';

import {
  formattedCommandWord,
  formattedFrequencyCommand,
  formattedStateMonitor,
  FrequencyHz,
} from '../src/schemas';
import { TecoInverterService } from '../src/TecoInverterService';

const deviceId = 1;

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;

  // Read command registers — all return factory defaults (0 / stopped)
  const opCmd = yield* inverter.operationCommand(deviceId).read();
  const freqCmd = yield* inverter.frequencyCommand(deviceId).read();

  yield* Console.log('=== Initial (default) values ===');
  yield* Console.log(`  Operation Command:  ${formattedCommandWord(opCmd)}`);
  yield* Console.log(`  Frequency Command:  ${formattedFrequencyCommand(freqCmd)}`);

  // Write a frequency command and verify the mock persists it
  yield* inverter.frequencyCommand(deviceId).update(FrequencyHz.make(50));
  const freqCmdAfter = yield* inverter.frequencyCommand(deviceId).read();
  yield* Console.log(`  After write:        ${formattedFrequencyCommand(freqCmdAfter)}`);

  // Read a parameter register (group 00, param 00-00: Control Mode Selection, default 0 -> "V/F")
  const param00 = yield* inverter.parameters.group00['00-00'](deviceId).read();
  yield* Console.log(`  00-00 Control Mode: ${param00}`);

  // Read a monitor register (default 0)
  const stateMon = yield* inverter.stateMonitor(deviceId).read();
  yield* Console.log(`  State Monitor:      ${formattedStateMonitor(stateMon)}`);
});

const TecoLayer = TecoInverterService.make();
const mockSerialLayer = SerialTransportService.makeMockTransport([
  TecoInverterService.mockDevice(1),
  TecoInverterService.mockDevice(2),
])({
  portPath: '/dev/null',
  baudRate: 9600,
  stopBits: 1,
  dataBits: 8,
  parity: 'none',
});

const layerLive = Layer.provideMerge(TecoLayer, mockSerialLayer);

program.pipe(
  Effect.provide(layerLive),
  Effect.provideService(References.MinimumLogLevel, 'Debug'),
  BunRuntime.runMain,
);
