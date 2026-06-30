import { Effect, ParseResult } from "effect";

export const readOnlyEncodeFailure = (
  registerName: string,
  actual: unknown,
  ast: ConstructorParameters<typeof ParseResult.Type>[0],
) =>
  Effect.fail(
    new ParseResult.Type(ast, actual, `${registerName} is read only`),
  );
