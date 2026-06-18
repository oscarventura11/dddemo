import { AboutContainer } from "../containers/AboutContainer";
import { ProtectedFeatureRoute } from "./ProtectedFeature.route";

type RouteProps = {
  path?: string;
};

export function AboutRoute(_: RouteProps) {
  return <AboutContainer />;
}

export function ProtectedAboutRoute(props: RouteProps) {
  return (
    <ProtectedFeatureRoute featureKey="view-about-page" fallbackPath="/">
      <AboutRoute {...props} />
    </ProtectedFeatureRoute>
  );
}
