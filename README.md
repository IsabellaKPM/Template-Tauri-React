# Template-Tauri-React

Template for Tauri + React + Typescript + SQLCypher + Rust

## Features

Mirrors the [Next.js](https://github.com/IsabellaKPM/Template-NextJS) frontend template and is designed to work with the [NestJS](https://github.com/IsabellaKPM/Template-NestJS) backend template:

- Login (email or username), registration and logout with HttpOnly cookie auth, including automatic token refresh on `401`.
- Route guards: guests-only pages (`/login`, `/register`), authenticated pages (`/dashboard`) and admin-only pages (`/users`).
- Admin user management: list, create, edit and delete users (admins cannot delete themselves or change their own role/status).
- Auth-aware header navigation and light/dark theme toggle.
- Playwright e2e tests.

## Running with the backend

1. Start the NestJS template and add the app origin to its `.env`:

   ```.env
   CORS_ORIGINS=http://localhost:1420
   ```

   Run its admin seed (`yarn db:seed:run`) to create the first Admin user.

2. Optionally point the app to the API (default is `http://localhost:3001`) in `.env`:

   ```.env
   VITE_API_URL=http://localhost:3001
   ```

3. `pnpm install` and `pnpm start:dev`.

> **WARNING:** the backend sets its auth cookies with `SameSite=Strict`. This works in development (`localhost:1420` and `localhost:3001` are the same site), but a bundled desktop app runs from `tauri://localhost` (`http://tauri.localhost` on Windows), which is cross-site to the API, so cookies are not sent. For release builds, serve the API from a matching site, relax the backend cookie policy, or route requests through Rust (for example with `tauri-plugin-http`).

## Testing

```bash
pnpm exec playwright install   # first time only
pnpm test:fe                   # e2e against the Vite dev server
pnpm test:be                   # cargo test
```

## License

This project is licensed under the [MIT License](LICENSE).
