import { describe, it, expect } from "vitest";
import { POLICY_WHITELIST } from "../../../../constants/policy.constants";
import { PolicyAction } from "../../../domain/models/PolicyAction";
import { UserRole } from "../../../domain/models/UserRole";
import { CategoryConsolidationPolicy } from "../CategoryConsolidationPolicy";

describe("CategoryConsolidationPolicy", () => {
  const policy = new CategoryConsolidationPolicy();

  it("allows every action in test mode", () => {
    const dto = {
      action: PolicyAction.SUBMIT_CATEGORY_SELECTION,
      role: UserRole.GUEST,
      environment: "test" as const,
      mode: "test" as const,
    };

    expect(policy.can(dto)).toBe(true);
  });

  it("allows whitelisted users", () => {
    const dto = {
      action: PolicyAction.SUBMIT_CATEGORY_SELECTION,
      role: UserRole.USER,
      email: POLICY_WHITELIST[0],
      environment: "production" as const,
      mode: "production" as const,
    };

    expect(policy.can(dto)).toBe(true);
  });

  it("allows submit for admins in non-test mode", () => {
    const dto = {
      action: PolicyAction.SUBMIT_CATEGORY_SELECTION,
      role: UserRole.ADMIN,
      environment: "production" as const,
      mode: "production" as const,
    };

    expect(policy.can(dto)).toBe(true);
  });

  it("denies submit for non-admin users in non-test mode", () => {
    const dto = {
      action: PolicyAction.SUBMIT_CATEGORY_SELECTION,
      role: UserRole.USER,
      environment: "production" as const,
      mode: "production" as const,
    };

    expect(policy.can(dto)).toBe(false);
  });

  it("shows under-construction banner in development when feature flag is enabled", () => {
    const dto = {
      action: PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER,
      role: UserRole.USER,
      environment: "development" as const,
      mode: "development" as const,
      featureFlags: { "show-under-construction": true },
    };

    expect(policy.can(dto)).toBe(true);
  });

  it("hides under-construction banner in production for non-whitelisted users", () => {
    const dto = {
      action: PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER,
      role: UserRole.ADMIN,
      environment: "production" as const,
      mode: "production" as const,
      featureFlags: { "show-under-construction": true },
    };

    expect(policy.can(dto)).toBe(false);
  });
});
