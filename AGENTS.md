# AGENTS.md

## Overview

Desktop app template: Tauri 2 (Rust backend in `src-tauri/`) + React 19 + TypeScript + Vite, with Tailwind CSS v4, shadcn/Base UI, TanStack Query, React Router, React Hook Form and Zod. Package manager: **pnpm**.

## Commands

```bash
pnpm install
pnpm start:dev                  # tauri dev (full desktop app)
pnpm start:fe                   # vite only (browser, no Tauri APIs)
pnpm build                      # tsc + vite build
pnpm build:tauri                # bundle the desktop app

pnpm lint                       # eslint + cargo clippy (-D warnings); lint:fe / lint:be
pnpm format                     # prettier + cargo fmt; format:check to verify
pnpm typecheck                  # tsc --noEmit
pnpm test                       # playwright e2e + cargo test; test:fe / test:be / test:fe:ui
pnpm ci:check                   # typecheck + lint + format:check
pnpm ci                         # ci:check + test (what CI runs)

pnpm commit                     # interactive Conventional Commit (commitizen)
```

## Project structure

```text
src/                    # frontend
  pages/                # route components, thin: compose features only
  features/             # domain modules: components, hooks, schemas, services, enums, interfaces; export via index.ts (auth, users)
  shared/               # components (ui, Layout, Header, Footer, Providers, route guards), hooks, lib (axios, env, queryKeys, routes), schemas, interfaces
  App.tsx main.tsx globals.css
src-tauri/
  src/commands/         # Tauri commands, one module per area
  src/lib.rs            # builder, plugins, invoke_handler registration
  capabilities/         # Tauri permission capabilities
  tauri.conf.json
```

## Code style and conventions

- Formatting is enforced by Prettier (double quotes, semicolons, trailing commas, width 80), ESLint, and `rustfmt`. Don't hand-format; run `pnpm format`.
- Use the `@/*` alias for imports from `src/`.
- Keep route handlers/layout thin; put domain logic in `src/features/<feature>/` and reusable pieces in `src/shared/`.
- Validate forms and env with Zod schemas (`src/shared/schemas`).
- All HTTP goes through the shared Axios client (`src/shared/lib/axios.ts`); server state through TanStack Query with keys from `queryKeys.ts`. Routes live in `src/shared/lib/routes.ts` and are declared in `App.tsx`; guard them with `GuestRoute`/`ProtectedRoute`.
- Rust: no warnings (clippy runs with `-D warnings`). Return `Result` from commands instead of panicking; derive `serde::Serialize` for errors crossing the IPC boundary.
- Every new Tauri command must be added to `generate_handler![]` in `lib.rs`, and any plugin/API it needs must be allowed in `capabilities/`.

## Testing

- Backend: `cargo test` inside `src-tauri` (via `pnpm test`).
- Frontend: Playwright e2e in `tests/e2e/<area>/*.spec.ts`, run against the Vite dev server in a browser (`pnpm test:fe`); CI runs them in the `test-e2e` job. New user-facing flows need an e2e test.
- New Tauri commands need Rust tests when they contain logic.

<!-- shared:start -->

## Comments

- Don't write comments by default. Make the code self-explanatory through clear names and structure; never narrate what the code does.
- Comment only when strictly necessary, and always start with one of these prefixes:
  - `WARNING:` a non-obvious pitfall or constraint that would cause a bug if ignored (the most important kind).
  - `TODO:` known pending work.
  - `WIP:` unfinished code that must not be treated as final.
  - `REVIEW:` something that needs a human decision or double-check.
- A comment without one of these prefixes is not allowed. Don't add docstrings or JSDoc/rustdoc just to describe obvious behavior.
- Don't remove existing `WARNING`, `TODO`, `WIP`, or `REVIEW` comments unless you resolved what they describe.

## Git and workflow

- Commits follow Conventional Commits (enforced by commitlint): `type(scope): imperative subject`, lowercase type, no trailing period, header <= 100 chars. Types: `build chore ci docs feat fix perf refactor revert style test`.
- Husky runs commitlint on `commit-msg` and lint-staged on `pre-commit`. Never bypass hooks (`--no-verify`).
- Work on a feature branch and merge through a PR to `main`. Releases are tags `vX.X.X` created on `main` only.
- Keep PRs focused; update docs/README when behavior, scripts, or env variables change.

## Boundaries

### Always

- Run the project's check command (`ci:check`, or `ci` when tests are relevant) before declaring work done.
- Follow existing patterns in neighbouring code before introducing new ones.
- Keep TypeScript strict: no `any`, no `@ts-ignore` without a comment explaining why.

### Ask first

- Adding, removing, or upgrading dependencies.
- Changing CI workflows, Docker setup, lint/format/commit configs, or the folder structure.
- Destructive or hard-to-reverse operations (deleting files, resetting databases, force-pushing, rewriting history).

### Never

- Commit secrets or `.env*` files; never print their values.
- Edit generated or vendored output (`dist/`, `node_modules/`, lockfiles by hand).
- Disable lint rules, skip or delete tests to make a check pass.

<!-- shared:end -->

## Template-specific notes

- Auth, users admin and the API client mirror the Next.js template and talk to the NestJS template (HttpOnly cookie auth). Keep them in sync when either side changes.
- The API base URL is `VITE_API_URL` (default `http://localhost:3001`). The backend's `CORS_ORIGINS` must include the app origin (`http://localhost:1420` in dev).
- WARNING: the backend sets cookies with `SameSite=Strict`. In a bundled app the webview origin (`tauri://localhost`, `http://tauri.localhost` on Windows) is cross-site to the API, so the browser won't send the cookies. Dev works; for release builds either serve the API from a matching site, relax the cookie policy in the backend, or move requests through Rust (e.g. `tauri-plugin-http`).
- Use `pnpm start:dev` to test anything that touches Tauri APIs; `pnpm start:fe` runs in a plain browser where `@tauri-apps/api` calls fail.
- Never edit `src-tauri/target/`, `src-tauri/icons/` (regenerate with `tauri icon`), or `Cargo.lock` by hand.
- Keep Tauri capabilities minimal: grant only the permissions a command or plugin actually needs.
- The README mentions SQLCipher, but it is not in `Cargo.toml` yet; confirm before assuming an encrypted database exists.
