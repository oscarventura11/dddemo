import { PolicyAction } from "../models/PolicyAction";
import { UserRole } from "../models/UserRole";

export interface PolicyContext {
  role: UserRole;
  email?: string;
  environment: string;
  featureFlags?: Record<string, boolean>;
}

export abstract class PolicyProvider {
  abstract can(action: PolicyAction, context: PolicyContext): boolean;
}
