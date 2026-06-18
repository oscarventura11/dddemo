import { signal } from '@preact/signals';
import { inject, injectable } from 'inversify';
import { UserRole } from '../../domain/models/UserRole';
import { AppConfigProvider } from '../../../config/domain/repositories/AppConfigProvider';

@injectable()
export class PolicyState {
  private readonly _role = signal<UserRole>(UserRole.USER);
  private readonly _email = signal<string>('');
  private readonly _environment;
  private readonly _featureFlags;

  constructor(@inject(AppConfigProvider) configProvider: AppConfigProvider) {
    this._environment = signal<string>(configProvider.getEnvironment());
    this._featureFlags = signal<Record<string, boolean>>(
      configProvider.defaultPolicyFeatureFlags(),
    );
  }

  public get role() { return this._role; }
  public get email() { return this._email; }
  public get environment() { return this._environment; }
  public get featureFlags() { return this._featureFlags; }

  public setRole(role: UserRole) {
    this._role.value = role;
  }

  public setEmail(email: string) {
    this._email.value = email;
  }

  public setFeatureFlag(flag: string, enabled: boolean) {
    this._featureFlags.value = {
      ...this._featureFlags.value,
      [flag]: enabled,
    };
  }
}
