import { injectable } from "inversify";
import { POLICY_WHITELIST } from "../../../shared/constants/policy.constants";
import { PolicyAction } from "../../../shared/policy/domain/models/PolicyAction";
import {
  Policy,
  type PolicyDTO,
} from "../../../shared/policy/domain/repositories/PolicyProvider";
import { UserRole } from "../../../shared/policy/domain/models/UserRole";

@injectable()
export class CategoryPolicy extends Policy<PolicyAction> {
  public can(dto: PolicyDTO<PolicyAction>): boolean {
    if (dto.featureKey) {
      return dto.featureFlags?.[dto.featureKey] === true;
    }

    if (dto.mode === "test") {
      return true;
    }

    if (dto.email && POLICY_WHITELIST.includes(dto.email)) {
      return true;
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