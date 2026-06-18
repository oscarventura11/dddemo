import { signal } from '@preact/signals';
import { injectable } from 'inversify';
import { UserRole } from '../../domain/models/UserRole';

@injectable()
export class PolicyState {
  private readonly _role = signal<UserRole>(UserRole.USER);
  private readonly _email = signal<string>('');
  private readonly _environment = signal<string>(import.meta.env.VITE_APP_ENV || 'development');
  private readonly _featureFlags = signal<Record<string, boolean>>({
    'new-category-tree': true,
    'show-under-construction': import.meta.env.VITE_APP_ENV === 'development',
  });

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
