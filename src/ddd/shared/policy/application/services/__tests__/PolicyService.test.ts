import { describe, it, beforeEach, expect } from "vitest";
import { mock, instance, when, anyOfClass } from "ts-mockito";
import { PolicyService } from "../PolicyService";
import { PolicyState } from "../../state/PolicyState";
import { ConsolidationPolicy } from "../../../domain/repositories/PolicyProvider";
import { PolicyAction } from "../../../domain/models/PolicyAction";
import { UserRole } from "../../../domain/models/UserRole";

class MockPolicyProvider extends ConsolidationPolicy<PolicyAction> {
  can(dto: any): boolean {
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
      provider.can(anyOfClass(Object)),
    ).thenReturn(true);

    const result = service.can(PolicyAction.SUBMIT_CATEGORY_SELECTION);

    expect(result).toBe(true);
  });
});
