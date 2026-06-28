# effect-teco-westinghouse-inverter

## Quickstart

- `bun install` - Install dependencies
- `bun run index.ts` - Run the application
- `bun run typecheck` - Type-check the project
- `bun run build` - Build the project to `./dist`

## Current Layout

```
.
├── index.ts                 — Application entry point (Bun)
├── package.json
├── README.md                — Project documentation
├── tsconfig.json            — TypeScript configuration
├── LICENSE                  — Project license
└── node_modules             — Dependencies
```

## Commands

| Action     | Command             |
| ---------- | ------------------- |
| Install    | `bun install`       |
| Type-check | `bun run typecheck` |
| Build      | `bun run build`     |
| Run        | `bun run index.ts`  |

## Build Process

The build runs two commands:

1. `bun build ./index.ts --outdir ./dist --target node --external effect --external effect-modbus-rs --external modbus-rs` - Creates the bundled dist file
2. `tsc --noEmit false --emitDeclarationOnly --outDir ./dist --rootDir .` - Creates type definitions

## TypeScript Configuration

Key tsconfig.json settings:

- `module: "Preserve"` - ESM output preserved
- `verbatimModuleSyntax: true` - Exact import syntax from sources
- `plugins: [{"name": "@effect/language-service"}]` - Effect LSP support
- Strict mode enabled with custom relaxed flags (noUnusedLocals/Parameters)

## Dependencies

- `effect: ^3.21.4` - Core functional library
- `effect-modbus-rs: link:effect-modbus-rs` - Linked submodule package
- `@effect/language-service: ^0.86.2` - TypeScript language service plugin
- `typescript: ^6.0.3` - TypeScript compiler

## Runtime Environment

- **Bun** only - No Node, npm, pnpm, yarn, or vite
- Bun v1.3.14 used in the project (from `bun init`)
- Bun automatically loads `.env` files (no dotenv needed)
- The project uses ESNext module syntax

## References

Upstream libraries are available locally under ignored `references/` directory:

- `references/effect` - Core `effect` library source
- `references/effect-modbus-rs` - Modbus-RS implementation source

The skill at `.opencode/skills/reference-dependencies/SKILL.md` is the dedicated instruction for reference lookup.
