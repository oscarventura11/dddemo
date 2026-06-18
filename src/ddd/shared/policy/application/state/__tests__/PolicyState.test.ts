import { describe, it, expect } from 'vitest';
import { PolicyState } from '../PolicyState';
import { UserRole } from '../../../domain/models/UserRole';

describe('PolicyState', () => {
  it('should initialize with default values', () => {
    const state = new PolicyState();
    expect(state.role.value).toBe(UserRole.USER);
    expect(state.email.value).toBe('');
    expect(state.environment.value).toBeDefined();
  });

  it('should update role', () => {
    const state = new PolicyState();
    state.setRole(UserRole.ADMIN);
    expect(state.role.value).toBe(UserRole.ADMIN);
  });

  it('should update email', () => {
    const state = new PolicyState();
    state.setEmail('test@example.com');
    expect(state.email.value).toBe('test@example.com');
  });

  it('should update feature flags', () => {
    const state = new PolicyState();
    state.setFeatureFlag('test-flag', true);
    expect(state.featureFlags.value['test-flag']).toBe(true);
  });
});
