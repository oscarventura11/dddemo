import { inject, injectable } from 'inversify';
import { PolicyAction } from '../../domain/models/PolicyAction';
import { PolicyProvider } from '../../domain/repositories/PolicyProvider';
import { PolicyState } from '../state/PolicyState';

@injectable()
export class PolicyService {
  constructor(
    @inject(PolicyState) private readonly _state: PolicyState,
    @inject(PolicyProvider) private readonly _provider: PolicyProvider
  ) {}

  public can(action: PolicyAction): boolean {
    const context = {
      role: this._state.role.value,
      email: this._state.email.value,
      environment: this._state.environment.value,
      featureFlags: this._state.featureFlags.value,
    };
    return this._provider.can(action, context);
  }
}
