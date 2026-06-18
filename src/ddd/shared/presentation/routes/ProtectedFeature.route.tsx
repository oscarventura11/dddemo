import { useEffect } from "preact/hooks";
import { route } from "preact-router";
import { useInjection } from "../hooks/useInjection";
import { PolicyService } from "../../policy/application/services/PolicyService";

type ProtectedFeatureRouteProps = {
  featureKey: string;
  fallbackPath?: string;
  children: preact.ComponentChildren;
};

export function ProtectedFeatureRoute({
  featureKey,
  fallbackPath = "/",
  children,
}: ProtectedFeatureRouteProps) {
  const policyService = useInjection<PolicyService>(PolicyService);
  const canAccess = policyService.canFeature(featureKey);

  useEffect(() => {
    if (!canAccess) {
      route(fallbackPath, true);
    }
  }, [canAccess, fallbackPath]);

  if (!canAccess) {
    return null;
  }

  return <>{children}</>;
}
