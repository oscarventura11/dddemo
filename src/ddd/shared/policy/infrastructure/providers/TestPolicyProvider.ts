import { injectable } from "inversify";
import { PolicyAction } from "../../domain/models/PolicyAction";
import {
  PolicyProvider,
  type PolicyContext,
} from "../../domain/repositories/PolicyProvider";

@injectable()
export class TestPolicyProvider extends PolicyProvider {
  public can(action: PolicyAction, context: PolicyContext): boolean {
    return true;
  }
}
