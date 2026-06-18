import { describe, it, beforeEach, expect } from "vitest";
import { mock, instance, when, anyOfClass } from "ts-mockito";
import { PolicyService } from "../PolicyService";
import { PolicyState } from "../../state/PolicyState";
import { PolicyProvider } from "../../../domain/repositories/PolicyProvider";
import { PolicyAction } from "../../../domain/models/PolicyAction";
import { UserRole } from "../../../domain/models/UserRole";

class MockPolicyProvider extends PolicyProvider {
  can(action: PolicyAction, context: any): boolean {
    return false;
  }
}

describe("PolicyService", () => {
  let state: PolicyState;
  let provider: MockPolicyProvider;
  let service: PolicyService;

  beforeEach(() => {
    state = new PolicyState();
    provider = mock(MockPolicyProvider);
    service = new PolicyService(state, instance(provider));
  });

  it("should delegate check to provider with current context", () => {
    state.setRole(UserRole.ADMIN);
    state.setEmail("admin@example.com");

    when(
      provider.can(PolicyAction.SUBMIT_CATEGORY_SELECTION, anyOfClass(Object)),
    ).thenReturn(true);

    const result = service.can(PolicyAction.SUBMIT_CATEGORY_SELECTION);

    expect(result).toBe(true);
  });
});
