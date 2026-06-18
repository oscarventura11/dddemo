import { inject, injectable } from 'inversify';
import { PolicyAction } from '../../domain/models/PolicyAction';
import {
  ConsolidationPolicy,
  type ConsolidationPolicyEnvironment,
  type ConsolidationPolicyMode,
} from '../../domain/repositories/PolicyProvider';
import { PolicyState } from '../state/PolicyState';

@injectable()
export class PolicyService {
  constructor(
    @inject(PolicyState) private readonly _state: PolicyState,
    @inject(ConsolidationPolicy)
    private readonly _provider: ConsolidationPolicy<PolicyAction>
  ) {}

  public can(action: PolicyAction): boolean {
    const environment = this._normalizeEnvironment(this._state.environment.value);
    const dto = {
      action,
      role: this._state.role.value,
      email: this._state.email.value,
      environment,
      mode: this._resolveMode(environment),
      featureFlags: this._state.featureFlags.value,
    };
    return this._provider.can(dto);
  }

  private _normalizeEnvironment(environment: string): ConsolidationPolicyEnvironment {
    if (environment === 'development') return 'development';
    if (environment === 'test') return 'test';
    if (environment === 'local') return 'local';
    return 'production';
  }

  private _resolveMode(environment: ConsolidationPolicyEnvironment): ConsolidationPolicyMode {
    if (environment === 'local') return 'development';
    return environment;
  }
}
