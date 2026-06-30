import { inject, injectable } from "inversify";
import { PolicyAction } from "../../domain/models/PolicyAction";
import {
  Policy,
  type PolicyEnvironment,
  type PolicyMode,
} from "../../domain/repositories/PolicyProvider";
import { PolicyState } from "../state/PolicyState";
import type { AppEnvironment } from "../../../config/domain/repositories/AppConfigProvider";

@injectable()
export class PolicyService {
  constructor(
    @inject(PolicyState) private readonly _state: PolicyState,
    @inject(Policy)
    private readonly _provider: Policy<PolicyAction>,
  ) {}

  public can(action: PolicyAction): boolean {
    const environment = this._normalizeEnvironment(
      this._state.environment.value,
    );
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

  public canFeature(featureKey: string): boolean {
    const environment = this._normalizeEnvironment(
      this._state.environment.value,
    );
    const dto = {
      featureKey,
      role: this._state.role.value,
      email: this._state.email.value,
      environment,
      mode: this._resolveMode(environment),
      featureFlags: this._state.featureFlags.value,
    };

    return this._provider.can(dto);
  }

  private _normalizeEnvironment(
    environment: AppEnvironment | string,
  ): PolicyEnvironment {
    if (environment === "development") return "development";
    if (environment === "test") return "test";
    if (environment === "local") return "local";
    return "production";
  }

  private _resolveMode(environment: PolicyEnvironment): PolicyMode {
    if (environment === "local") return "development";
    return environment;
  }
}
