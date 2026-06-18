# 🛡️ Policy System

The Policy System provides a centralized way to handle authorization and Role-Based Access Control (RBAC) across the application. It is built following Hexagonal Architecture principles to ensure that authorization rules are decoupled from the UI and infrastructure.

## 🏗️ Architecture

The Policy System is organized into three layers:

### 1. Domain Layer
- **PolicyAction**: An enum defining all securable actions in the system (e.g., `SUBMIT_CATEGORY_SELECTION`).
- **ConsolidationPolicyDTO**: A data structure containing the information needed to make an authorization decision (Action, User Role, Email, Environment, Mode, Feature Flags).
- **ConsolidationPolicy (Port)**: An abstract class that defines the authorization contract and shared helper behavior:
  - `can(dto)` for policy decisions
  - `defaultActive(dto)` for default activation logic (`development`, `test`, or `local`)
  - `development(dto)` helper
  - `check(dto)` to throw on policy violations

### 2. Application Layer
- **PolicyService**: The primary entry point for components to check permissions. It gathers context from `PolicyState`, builds a `ConsolidationPolicyDTO`, and delegates the check to `ConsolidationPolicy`.
- **PolicyState**: A reactive store (using Preact Signals) that holds the current user's role, email, and active feature flags.

### 3. Infrastructure Layer (Adapters)
- **CategoryConsolidationPolicy**: The single concrete implementation of `ConsolidationPolicy` used by the app.
- The implementation contains environment-aware behavior through DTO fields (`mode`, `environment`) instead of swapping provider classes.

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

### Updating User Context (Dev Tools)

The `UserSelector` component allows developers to switch roles or enter a whitelisted email to test different authorization scenarios in real-time.

## 🧪 Testing

The Policy System is fully tested:
- **State Tests**: Ensure signals update correctly.
- **Service Tests**: Verify context gathering and delegation.
- **Consolidated Policy Tests**: Validate authorization logic for roles, whitelist, and environment-aware behavior in a single policy implementation.
