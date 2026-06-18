import { injectable } from "inversify";
import { PolicyAction } from "../../domain/models/PolicyAction";
import {
  PolicyProvider,
  type PolicyContext,
} from "../../domain/repositories/PolicyProvider";
import { UserRole } from "../../domain/models/UserRole";
import { POLICY_WHITELIST } from "../../../constants/policy.constants";

@injectable()
export class DevPolicyProvider extends PolicyProvider {
  public can(action: PolicyAction, context: PolicyContext): boolean {
    if (context.email && POLICY_WHITELIST.includes(context.email)) {
      return true;
    }

    if (action === PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER) {
      return context.featureFlags?.["show-under-construction"] === true;
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
