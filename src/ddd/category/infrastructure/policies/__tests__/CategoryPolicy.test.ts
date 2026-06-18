import { describe, it, expect } from "vitest";
import { POLICY_WHITELIST } from "../../../../shared/constants/policy.constants";
import { PolicyAction } from "../../../../shared/policy/domain/models/PolicyAction";
import { UserRole } from "../../../../shared/policy/domain/models/UserRole";
import { CategoryPolicy } from "../CategoryPolicy";

describe("CategoryPolicy", () => {
  const policy = new CategoryPolicy();

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

  it("evaluates feature checks using featureKey and feature flags", () => {
    const enabledFeatureDto = {
      featureKey: "view-about-page",
      role: UserRole.USER,
      environment: "development" as const,
      mode: "development" as const,
      featureFlags: { "view-about-page": true },
    };

    const enabledFeatureInProductionDto = {
      featureKey: "view-about-page",
      role: UserRole.ADMIN,
      email: POLICY_WHITELIST[0],
      environment: "production" as const,
      mode: "production" as const,
      featureFlags: { "view-about-page": true },
    };

    const disabledFeatureDto = {
      featureKey: "view-about-page",
      role: UserRole.USER,
      environment: "development" as const,
      mode: "development" as const,
      featureFlags: { "view-about-page": false },
    };

    expect(policy.can(enabledFeatureDto)).toBe(true);
    expect(policy.can(enabledFeatureInProductionDto)).toBe(true);
    expect(policy.can(disabledFeatureDto)).toBe(false);
  });
});