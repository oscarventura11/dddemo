import { describe, it, expect } from "vitest";
import { DefaultPolicyProvider } from "../DefaultPolicyProvider";
import { PolicyAction } from "../../../domain/models/PolicyAction";
import { UserRole } from "../../../domain/models/UserRole";
import { POLICY_WHITELIST } from "../../../../constants/policy.constants";

describe("DefaultPolicyProvider", () => {
  const provider = new DefaultPolicyProvider();

  it("should allow access if email is in whitelist", () => {
    const context = {
      role: UserRole.GUEST,
      email: POLICY_WHITELIST[0],
      environment: "production",
    };
    expect(provider.can(PolicyAction.SUBMIT_CATEGORY_SELECTION, context)).toBe(
      true,
    );
    expect(
      provider.can(PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER, context),
    ).toBe(true);
  });

  it("should allow admins to perform actions", () => {
    const context = {
      role: UserRole.ADMIN,
      environment: "production",
    };
    expect(provider.can(PolicyAction.SUBMIT_CATEGORY_SELECTION, context)).toBe(
      true,
    );
  });

  it("should deny submission for non-admins and non-whitelisted users", () => {
    const context = {
      role: UserRole.USER,
      email: "regular@example.com",
      environment: "production",
    };
    expect(provider.can(PolicyAction.SUBMIT_CATEGORY_SELECTION, context)).toBe(
      false,
    );
  });

  it("should deny under construction banner for non-whitelisted admins", () => {
    const context = {
      role: UserRole.ADMIN,
      environment: "production",
    };
    expect(
      provider.can(PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER, context),
    ).toBe(false);
  });
});
