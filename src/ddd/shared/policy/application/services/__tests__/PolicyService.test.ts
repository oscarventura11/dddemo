import { describe, it, beforeEach, expect } from "vitest";
import { mock, instance, when, anyOfClass } from "ts-mockito";
import { PolicyService } from "../PolicyService";
import { PolicyState } from "../../state/PolicyState";
import { Policy } from "../../../domain/repositories/PolicyProvider";
import { PolicyAction } from "../../../domain/models/PolicyAction";
import { UserRole } from "../../../domain/models/UserRole";
import { AppConfigProvider } from "../../../../config/domain/repositories/AppConfigProvider";

class MockPolicyProvider extends Policy<PolicyAction> {
  can(dto: any): boolean {
    return false;
  }
}

class TestConfigProvider extends AppConfigProvider {
  public getEnvironment() {
    return "development" as const;
  }

  public defaultPolicyFeatureFlags(): Record<string, boolean> {
    return {
      "new-category-tree": true,
      "show-under-construction": true,
      "view-about-page": true,
    };
  }
}

describe("PolicyService", () => {
  let state: PolicyState;
  let provider: MockPolicyProvider;
  let service: PolicyService;

  beforeEach(() => {
    state = new PolicyState(new TestConfigProvider());
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

  it("should evaluate feature checks through provider", () => {
    when(provider.can(anyOfClass(Object))).thenReturn(true);

    const result = service.canFeature("view-about-page");

    expect(result).toBe(true);
  });
});
