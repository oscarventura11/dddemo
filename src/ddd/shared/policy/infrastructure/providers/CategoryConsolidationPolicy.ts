import { injectable } from "inversify";
import { POLICY_WHITELIST } from "../../../constants/policy.constants";
import { PolicyAction } from "../../domain/models/PolicyAction";
import {
  ConsolidationPolicy,
  type ConsolidationPolicyDTO,
} from "../../domain/repositories/PolicyProvider";
import { UserRole } from "../../domain/models/UserRole";

@injectable()
export class CategoryConsolidationPolicy extends ConsolidationPolicy<PolicyAction> {
  public can(dto: ConsolidationPolicyDTO<PolicyAction>): boolean {
    if (dto.mode === "test") {
      return true;
    }

    if (dto.email && POLICY_WHITELIST.includes(dto.email)) {
      return true;
    }

    if (dto.action === PolicyAction.VIEW_UNDER_CONSTRUCTION_BANNER) {
      if (!this.defaultActive(dto)) {
        return false;
      }
      return dto.featureFlags?.["show-under-construction"] === true;
    }

    if (dto.role === UserRole.ADMIN) {
      return true;
    }

    if (dto.action === PolicyAction.SUBMIT_CATEGORY_SELECTION) {
      return false;
    }

    return true;
  }
}
