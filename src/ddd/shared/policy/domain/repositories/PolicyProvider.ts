import { PolicyAction } from "../models/PolicyAction";
import { UserRole } from "../models/UserRole";

export type PolicyMode =
  | "development"
  | "test"
  | "production"
  | "local";

export type PolicyEnvironment =
  | "development"
  | "test"
  | "production"
  | "local";

export interface PolicyDTO<TAction> {
  action?: TAction;
  featureKey?: string;
  role: UserRole;
  email?: string;
  environment: PolicyEnvironment;
  mode: PolicyMode;
  featureFlags?: Record<string, boolean>;
}

export class PolicyViolationException extends Error {
  constructor() {
    super("Policy violation");
    this.name = "PolicyViolationException";
  }
}

export abstract class Policy<TAction = PolicyAction> {
  abstract can(dto: PolicyDTO<TAction>): boolean;

  public defaultActive(dto: PolicyDTO<TAction>): boolean {
    return (
      this.development(dto) ||
      dto.mode === "test" ||
      dto.environment === "local"
    );
  }

  public development(dto: PolicyDTO<TAction>): boolean {
    return dto.mode === "development";
  }

  public check(dto: PolicyDTO<TAction>): void {
    if (!this.can(dto)) {
      throw new PolicyViolationException();
    }
  }
}
