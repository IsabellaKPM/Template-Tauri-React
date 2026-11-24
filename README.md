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

### Desktop builds and cookies

The backend sets its auth cookies with `SameSite=Strict`, and a bundled app runs from `tauri://localhost` (`http://tauri.localhost` on Windows), which is cross-site to the API. To avoid the webview dropping the cookies, inside Tauri every API request goes through Rust with `tauri-plugin-http`, which keeps its own cookie jar (persisted in the app data folder, so sessions survive restarts) and is not subject to CORS. In a plain browser (`pnpm start:fe`, e2e tests) the normal Axios adapter is used, and `CORS_ORIGINS` applies.

Before building a release, allow your production API URL in `src-tauri/capabilities/default.json` (`http:default` scope, default `http://localhost:3001/*`) and set `VITE_API_URL` at build time. Production APIs must use HTTPS, since the backend marks cookies `Secure` when `NODE_ENV=production`.

## Testing

```bash
pnpm exec playwright install   # first time only
pnpm test:fe                   # e2e against the Vite dev server
pnpm test:be                   # cargo test
```

## License

This project is licensed under the [MIT License](LICENSE).
