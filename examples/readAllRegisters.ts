/**
 * Reads all command and monitor registers from an A510 inverter.
 *
 * Demonstrates concurrent reads of all command registers (write) and
 * monitor registers (read-only) using Effect.all with unbounded concurrency.
 *
 * @example bun run examples/readAllRegisters.ts
 */

import { BunRuntime } from '@effect/platform-bun';
import { SerialTransportService } from '@flux-control/effect-modbus-rs';
import { Console, Effect, Layer, References } from 'effect';

import {
  formattedCommandWord,
  formattedFrequencyCommand,
  formattedTorqueCommand,
  formattedSpeedLimitCommand,
  formattedAnalogOut1Command,
  formattedAnalogOut2Command,
  formattedDigitalOutCommand,
  formattedStateMonitor,
  formattedErrorDescriptionMonitor,
  formattedDigitalInStateMonitor,
  formattedFrequencyCommandMonitor,
  formattedOutputFrequencyMonitor,
  formattedDCBusVoltageCommandMonitor,
  formattedOutputCurrentMonitor,
  formattedWarningDescriptionMonitor,
  formattedDigitalOutStateMonitor,
  formattedAnalogOut1Monitor,
  formattedAnalogOut2Monitor,
  formattedAnalogIn1Monitor,
  formattedAnalogIn2Monitor,
  formattedA510CheckMonitor,
} from '../src/schemas';
import { TecoInverterService } from '../src/TecoInverterService';

const deviceId = 1;

const program = Effect.gen(function* () {
  const inverter = yield* TecoInverterService;

  const [
    opCmd,
    freqCmd,
    torqCmd,
    speedCmd,
    ao1Cmd,
    ao2Cmd,
    doCmd,
    stateMon,
    errDescMon,
    diStateMon,
    freqCmdMon,
    outFreqMon,
    dcBusMon,
    outCurMon,
    warnDescMon,
    doStateMon,
    ao1Mon,
    ao2Mon,
    ai1Mon,
    ai2Mon,
    a510Mon,
  ] = yield* Effect.all(
    [
      inverter.operationCommand(deviceId).read(),
      inverter.frequencyCommand(deviceId).read(),
      inverter.torqueCommand(deviceId).read(),
      inverter.speedLimitCommand(deviceId).read(),
      inverter.analogOut1Command(deviceId).read(),
      inverter.analogOut2Command(deviceId).read(),
      inverter.digitalOutCommand(deviceId).read(),
      inverter.stateMonitor(deviceId).read(),
      inverter.errorDescriptionMonitor(deviceId).read(),
      inverter.digitalInStateMonitor(deviceId).read(),
      inverter.frequencyCommandMonitor(deviceId).read(),
      inverter.outputFrequencyMonitor(deviceId).read(),
      inverter.dcBusVoltageCommandMonitor(deviceId).read(),
      inverter.outputCurrentMonitor(deviceId).read(),
      inverter.warningDescriptionMonitor(deviceId).read(),
      inverter.digitalOutStateMonitor(deviceId).read(),
      inverter.analogOut1Monitor(deviceId).read(),
      inverter.analogOut2Monitor(deviceId).read(),
      inverter.analogIn1Monitor(deviceId).read(),
      inverter.analogIn2Monitor(deviceId).read(),
      inverter.a510CheckMonitor(deviceId).read(),
    ],
    { concurrency: 'unbounded' },
  );

  yield* Console.log('=== Command Registers ===');
  yield* Console.log(`  Operation Command:      ${formattedCommandWord(opCmd)}`);
  yield* Console.log(`  Frequency Command:      ${formattedFrequencyCommand(freqCmd)}`);
  yield* Console.log(`  Torque Command:         ${formattedTorqueCommand(torqCmd)}`);
  yield* Console.log(`  Speed Limit Command:    ${formattedSpeedLimitCommand(speedCmd)}`);
  yield* Console.log(`  Analog Out 1 Command:   ${formattedAnalogOut1Command(ao1Cmd)}`);
  yield* Console.log(`  Analog Out 2 Command:   ${formattedAnalogOut2Command(ao2Cmd)}`);
  yield* Console.log(`  Digital Out Command:    ${formattedDigitalOutCommand(doCmd)}`);

  yield* Console.log('');
  yield* Console.log('=== Monitor Registers ===');
  yield* Console.log(`  State Monitor:          ${formattedStateMonitor(stateMon)}`);
  yield* Console.log(`  Error Description:      ${formattedErrorDescriptionMonitor(errDescMon)}`);
  yield* Console.log(`  Digital In State:       ${formattedDigitalInStateMonitor(diStateMon)}`);
  yield* Console.log(`  Frequency Cmd Monitor:  ${formattedFrequencyCommandMonitor(freqCmdMon)}`);
  yield* Console.log(`  Output Frequency:       ${formattedOutputFrequencyMonitor(outFreqMon)}`);
  yield* Console.log(`  DC Bus Voltage:         ${formattedDCBusVoltageCommandMonitor(dcBusMon)}`);
  yield* Console.log(`  Output Current:         ${formattedOutputCurrentMonitor(outCurMon)}`);
  yield* Console.log(
    `  Warning Description:    ${formattedWarningDescriptionMonitor(warnDescMon)}`,
  );
  yield* Console.log(`  Digital Out State:      ${formattedDigitalOutStateMonitor(doStateMon)}`);
  yield* Console.log(`  Analog Out 1 Monitor:   ${formattedAnalogOut1Monitor(ao1Mon)}`);
  yield* Console.log(`  Analog Out 2 Monitor:   ${formattedAnalogOut2Monitor(ao2Mon)}`);
  yield* Console.log(`  Analog In 1 Monitor:    ${formattedAnalogIn1Monitor(ai1Mon)}`);
  yield* Console.log(`  Analog In 2 Monitor:    ${formattedAnalogIn2Monitor(ai2Mon)}`);
  yield* Console.log(`  A510 Check:             ${formattedA510CheckMonitor(a510Mon)}`);
});

const TecoLayer = TecoInverterService.make();
const SerialLayer = SerialTransportService.fromRtu({
  portPath: '/dev/tty.usbserial-A10OFLK2',
  baudRate: 19200,
  stopBits: 1,
  dataBits: 8,
  parity: 'none',
});

const layerLive = Layer.provideMerge(TecoLayer, SerialLayer);

program.pipe(
  Effect.provide(layerLive),
  Effect.provideService(References.MinimumLogLevel, 'Debug'),
  BunRuntime.runMain,
);
