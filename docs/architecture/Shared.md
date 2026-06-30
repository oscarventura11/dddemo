---
tags:
  - type/feature-doc
related:
  - "./Hexagonal.md"
  - "./DI_System.md"
  - "./Policy_System.md"
---

# 🔧 Shared Kernel

Functional documentation for `src/ddd/shared/`.

The shared kernel contains cross-cutting services that all feature modules consume. It has no knowledge of any specific feature domain.

---

## Notification

### `NotificationService`

**File:** `src/ddd/shared/notification/application/services/NotificationService.ts`

Application-layer service for dispatching user-visible feedback.

| Method             | Description                                              |
| ------------------ | -------------------------------------------------------- |
| `success(message)` | Creates a `SUCCESS` notification and broadcasts it.      |
| `error(message)`   | Creates an `ERROR` notification and broadcasts it.       |
| `clear()`          | Clears the active notification from `NotificationState`. |

Internally builds a `Notification` value object, calls `NotificationRepository.notify()` (side-effect adapter), and sets it on `NotificationState` (signal).

---

### `NotificationState`

**File:** `src/ddd/shared/notification/application/state/NotificationState.ts`

Reactive store (`Signal<Notification | null>`) for the currently active notification. Only `NotificationService` should mutate it.

---

### `NotificationRepository` (port)

**File:** `src/ddd/shared/notification/domain/repositories/NotificationRepository.ts`

Abstract port for triggering the underlying notification mechanism.

---

### `LocalNotificationRepository`

**File:** `src/ddd/shared/notification/infrastructure/repositories/LocalNotificationRepository.ts`

Concrete implementation. Writes to the local signal store (bridges domain event to the UI notification layer).

---

### `Notification` (value object)

**File:** `src/ddd/shared/notification/domain/value-objects/Notification.ts`

Immutable value object carrying `message` and `type` (`SUCCESS | ERROR`).

---

## Error

### `ErrorManager` (port)

**File:** `src/ddd/shared/error/application/services/ErrorManager.ts`

Abstract class with a single method: `handleError(error)`. Services inject this and delegate all thrown errors to it, keeping try/catch logic out of the domain.

---

### `AppErrorManager`

**File:** `src/ddd/shared/error/application/services/AppErrorManager.ts`

Concrete implementation. Converts errors to user-visible messages and routes them through `NotificationService.error()`.

---

## Policy

See [Policy System](./Policy_System.md) for full documentation.

### Summary

| Class           | Layer         | Description                                                                                  |
| --------------- | ------------- | -------------------------------------------------------------------------------------------- |
| `PolicyAction`  | Domain        | Enum of securable actions (e.g. `SUBMIT_CATEGORY_SELECTION`).                                |
| `Policy`        | Domain (port) | Abstract base with `can(dto)`, `check(dto)`, `defaultActive(dto)` helpers.                   |
| `PolicyState`   | Application   | Reactive store for role, email, environment, and feature flags.                              |
| `PolicyService` | Application   | Entry point for containers. Builds `PolicyDTO` from `PolicyState` and delegates to `Policy`. |

---

## Config

### `AppConfigProvider` (port)

**File:** `src/ddd/shared/config/domain/repositories/AppConfigProvider.ts`

Abstract class defining configuration access: environment name and default feature flags map.

---

### `ViteAppConfigProvider`

**File:** `src/ddd/shared/config/infrastructure/providers/ViteAppConfigProvider.ts`

Concrete implementation. Reads `import.meta.env` values from Vite and exposes them through the `AppConfigProvider` interface. Used by `PolicyState` to seed its initial environment and feature flags.

---

## Presentation (shared UI)

### `useInjection<T>(token)`

**File:** `src/ddd/shared/presentation/hooks/useInjection.ts`

React hook that resolves a service from the Inversify container by its injection token. Used in all smart containers to get typed service instances without manual prop drilling.

---

### `NotificationDisplay`

**File:** `src/ddd/shared/presentation/components/NotificationDisplay.tsx`

Dumb component that reads `NotificationState` and renders an MUI Snackbar. Calls `NotificationService.clear()` on close.

---

### `UserSelector`

**File:** `src/ddd/shared/presentation/components/UserSelector.tsx`

Dev-only component that lets developers switch the active `UserRole` and email in `PolicyState` to test different authorization scenarios at runtime.

---

## Constants

### `POLICY_WHITELIST`

**File:** `src/ddd/shared/constants/policy.constants.ts`

An array of email addresses that bypass all role-based policy checks. Intended for fast local validation during development.
