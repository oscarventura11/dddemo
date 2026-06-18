import { describe, it, expect } from 'vitest';
import { PolicyState } from '../PolicyState';
import { UserRole } from '../../../domain/models/UserRole';
import { AppConfigProvider } from '../../../../config/domain/repositories/AppConfigProvider';

class TestConfigProvider extends AppConfigProvider {
  public getEnvironment() {
    return 'development' as const;
  }

  public defaultPolicyFeatureFlags(): Record<string, boolean> {
    return {
      'new-category-tree': true,
      'show-under-construction': true,
      'view-about-page': true,
    };
  }
}

describe('PolicyState', () => {
  const config = new TestConfigProvider();

  it('should initialize with default values', () => {
    const state = new PolicyState(config);
    expect(state.role.value).toBe(UserRole.USER);
    expect(state.email.value).toBe('');
    expect(state.environment.value).toBeDefined();
  });

  it('should update role', () => {
    const state = new PolicyState(config);
    state.setRole(UserRole.ADMIN);
    expect(state.role.value).toBe(UserRole.ADMIN);
  });

  it('should update email', () => {
    const state = new PolicyState(config);
    state.setEmail('test@example.com');
    expect(state.email.value).toBe('test@example.com');
  });

  it('should update feature flags', () => {
    const state = new PolicyState(config);
    state.setFeatureFlag('test-flag', true);
    expect(state.featureFlags.value['test-flag']).toBe(true);
  });
});
