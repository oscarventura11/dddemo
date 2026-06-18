import { describe, it, expect } from 'vitest';
import { DevPolicyProvider } from '../DevPolicyProvider';
import { PolicyAction } from '../../../domain/models/PolicyAction';
import { UserRole } from '../../../domain/models/UserRole';
import { POLICY_WHITELIST } from '../../../../constants/policy.constants';

describe('DevPolicyProvider', () => {
  const provider = new DevPolicyProvider();

  it('should allow access if email is in whitelist', () => {
    const context = {
      role: UserRole.GUEST,
      email: POLICY_WHITELIST[0],
      environment: 'development'
    };
    expect(provider.can(PolicyAction.SUBMIT_CATEGORY_SELECTION, context)).toBe(true);
  });

  it('should allow under construction banner if feature flag is enabled', () => {
    const context = {
      role: UserRole.USER,
      environment: 'development',
      featureFlags: { 'show-under-construction': true }
    };
    expect(provider.can(PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER, context)).toBe(true);
  });

  it('should deny under construction banner if feature flag is disabled', () => {
    const context = {
      role: UserRole.USER,
      environment: 'development',
      featureFlags: { 'show-under-construction': false }
    };
    expect(provider.can(PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER, context)).toBe(false);
  });
});
