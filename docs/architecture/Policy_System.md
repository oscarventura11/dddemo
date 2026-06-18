# 🛡️ Policy System

The Policy System provides a centralized way to handle authorization and Role-Based Access Control (RBAC) across the application. It is built following Hexagonal Architecture principles to ensure that authorization rules are decoupled from the UI and infrastructure.

## 🏗️ Architecture

The Policy System is organized into three layers:

### 1. Domain Layer
- **PolicyAction**: An enum defining all securable actions in the system (e.g., `SUBMIT_CATEGORY_SELECTION`).
- **PolicyContext**: A data structure containing the information needed to make an authorization decision (User Role, Email, Environment, Feature Flags).
- **PolicyProvider (Port)**: An abstract class/interface that defines the contract for authorization checks.

### 2. Application Layer
- **PolicyService**: The primary entry point for components to check permissions. It gathers the current context from `PolicyState` and delegates the check to the active `PolicyProvider`.
- **PolicyState**: A reactive store (using Preact Signals) that holds the current user's role, email, and active feature flags.

### 3. Infrastructure Layer (Adapters)
- **DefaultPolicyProvider**: Implements production-grade rules.
- **DevPolicyProvider**: Implements development-specific rules, often allowing more access or enabling "Under Construction" features via feature flags.
- **TestPolicyProvider**: A simplified provider for unit and E2E testing.

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
- **Provider Tests**: Validate specific authorization logic for different environments.
