# 🛠️ Tech Stack

## Frontend

- **Framework:** Preact (TypeScript)
- **Runtime:** Vite
- **Routing:** `preact-router`
- **UI Library:** Material UI (MUI)
- **State Management:** `@preact/signals`
- **DI:** `inversify` + `reflect-metadata`

## Shared Systems

- **Configuration:** `AppConfigProvider` port + `ViteAppConfigProvider` adapter.
- **Authorization:** `Policy` port + `CategoryPolicy` implementation.
- **Notifications:** Custom service with MUI Snackbar integration.
- **Error Management:** Global `ErrorManager` using `NotificationService`.

- **Git Hooks:** `husky` for automated pre-commit/pre-push checks.

## Testing

- **Unit & Integration:** `vitest`
- **Mocking:** `ts-mockito`
- **Architecture Testing:** `tsarch`
- **E2E:** `playwright` + `playwright-bdd` (Cucumber)

## Developer Environment

- **Dev Containers:** VS Code devcontainer (`.devcontainer/devcontainer.json`) with Node image and preconfigured extensions.
- **Bootstrap:** `postCreateCommand` installs `tmux`, enables `pnpm`, installs dependencies, and installs Playwright Chromium with Linux deps.
- **Port Forwarding:** Vite port `5173` is forwarded with a named port profile.

## 🔗 Related

- [Architecture MOC](./README.md)
