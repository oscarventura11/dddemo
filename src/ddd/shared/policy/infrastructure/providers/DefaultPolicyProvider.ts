import { injectable } from "inversify";
import { PolicyAction } from "../../domain/models/PolicyAction";
import {
  PolicyProvider,
  type PolicyContext,
} from "../../domain/repositories/PolicyProvider";
import { UserRole } from "../../domain/models/UserRole";
import { POLICY_WHITELIST } from "../../../constants/policy.constants";

@injectable()
export class DefaultPolicyProvider extends PolicyProvider {
  public can(action: PolicyAction, context: PolicyContext): boolean {
    // Whitelist bypass ALWAYS takes precedence
    if (context.email && POLICY_WHITELIST.includes(context.email)) {
      return true;
    }

    if (action === PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER) {
      return false;
    }

    if (context.role === UserRole.ADMIN) {
      return true;
    }

    if (action === PolicyAction.SUBMIT_CATEGORY_SELECTION) {
      return false;
    }

    return true;
  }
}
