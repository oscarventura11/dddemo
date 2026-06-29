# 🛡️ Policy System

The Policy System provides a centralized way to handle authorization and Role-Based Access Control (RBAC) across the application. It is built following Hexagonal Architecture principles to ensure that authorization rules are decoupled from the UI and infrastructure.

## 🏗️ Architecture

The Policy System is organized into three layers:

### 1. Domain Layer

- **PolicyAction**: An enum defining all securable actions in the system (e.g., `SUBMIT_CATEGORY_SELECTION`).
- **PolicyDTO**: A data structure containing the information needed to make an authorization decision (Action or Feature Key, User Role, Email, Environment, Mode, Feature Flags).
- **Policy (Port)**: An abstract class that defines the authorization contract and shared helper behavior:
  - `can(dto)` for policy decisions
  - `defaultActive(dto)` for default activation logic (`development`, `test`, or `local`)
  - `development(dto)` helper
  - `check(dto)` to throw on policy violations

### 2. Application Layer

- **PolicyService**: The primary entry point for components to check permissions. It gathers context from `PolicyState`, builds a `PolicyDTO`, and delegates the check to `Policy`.
  - `can(action)` for action-based authorization.
  - `canFeature(featureKey)` for feature-flag based checks (used by route guards).
- **PolicyState**: A reactive store (using Preact Signals) that holds the current user's role, email, current environment, and active feature flags.

### 3. Infrastructure Layer (Adapters)

- **CategoryPolicy**: The single concrete implementation of `Policy` used by the app.
- **ViteAppConfigProvider**: The configuration adapter that resolves environment and default policy feature flags from Vite env.
- The policy implementation contains environment-aware behavior through DTO fields (`mode`, `environment`) and feature keys instead of swapping provider classes.

## 🔄 Decision Flow

1. A container or route calls `PolicyService.can(action)` or `PolicyService.canFeature(featureKey)`.
2. `PolicyService` reads role, email, environment, and feature flags from `PolicyState`.
3. `PolicyService` builds `PolicyDTO` and forwards it to `Policy` (`CategoryPolicy`).
4. `CategoryPolicy` evaluates whitelist, role rules, and feature flags, then returns a boolean.
5. The caller enables/disables UI or redirects based on the result.

## 🌍 Environment and Mode Semantics

- `environment` describes where the app runs (`development`, `test`, `local`, `production`).
- `mode` is derived from environment and is used by policy helper methods.
- `local` is treated as development mode by `PolicyService` for safer local testing behavior.
- `Policy.defaultActive(dto)` is true in development/test/local contexts.

## 🚀 Whitelist Feature

The system includes a **Whitelist Bypass**. If a user's email is found in the `POLICY_WHITELIST` (defined in `src/ddd/shared/constants/policy.constants.ts`), they are granted full access to all actions, regardless of their assigned role.

## 🛠️ Usage

### Checking Permissions in a Container

```typescript
const policyService = useInjection<PolicyService>(PolicyService);
const canSubmit = policyService.can(PolicyAction.SUBMIT_CATEGORY_SELECTION);

return (
  <Button disabled={!canSubmit}>Submit</Button>
);
```

### Checking a Feature Flag (Route Guard)

```typescript
const policyService = useInjection<PolicyService>(PolicyService);
const canViewAbout = policyService.canFeature("view-about-page");

if (!canViewAbout) {
  route("/", true);
}
```

### Updating User Context (Dev Tools)

The `UserSelector` component allows developers to switch roles or enter a whitelisted email to test different authorization scenarios in real-time.

## 🧪 Testing

The Policy System is fully tested:

- **State Tests**: Ensure signals update correctly.
- **Service Tests**: Verify context gathering and delegation.
- **Policy Tests**: Validate authorization logic for roles, whitelist, environment-aware behavior, and feature-flag based checks in a single policy implementation.

For end-to-end checks, policy scenarios are also covered in Playwright BDD features (`tests/features/policies.feature`).
