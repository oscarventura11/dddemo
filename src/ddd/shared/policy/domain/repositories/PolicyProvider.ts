import { PolicyAction } from "../models/PolicyAction";
import { UserRole } from "../models/UserRole";

export type ConsolidationPolicyMode =
  | "development"
  | "test"
  | "production"
  | "local";

export type ConsolidationPolicyEnvironment =
  | "development"
  | "test"
  | "production"
  | "local";

export interface ConsolidationPolicyDTO<TAction> {
  action: TAction;
  role: UserRole;
  email?: string;
  environment: ConsolidationPolicyEnvironment;
  mode: ConsolidationPolicyMode;
  featureFlags?: Record<string, boolean>;
}

export class ConsolidationPolicyViolationException extends Error {
  constructor() {
    super("Consolidation policy violation");
    this.name = "ConsolidationPolicyViolationException";
  }
}

export abstract class ConsolidationPolicy<TAction = PolicyAction> {
  abstract can(dto: ConsolidationPolicyDTO<TAction>): boolean;

  public defaultActive(dto: ConsolidationPolicyDTO<TAction>): boolean {
    return (
      this.development(dto) ||
      dto.mode === "test" ||
      dto.environment === "local"
    );
  }

  public development(dto: ConsolidationPolicyDTO<TAction>): boolean {
    return dto.mode === "development";
  }

  public check(dto: ConsolidationPolicyDTO<TAction>): void {
    if (!this.can(dto)) {
      throw new ConsolidationPolicyViolationException();
    }
  }
}
