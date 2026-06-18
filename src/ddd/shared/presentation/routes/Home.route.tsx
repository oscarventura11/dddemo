import { HomeContainer } from "../containers/HomeContainer";

type RouteProps = {
  path?: string;
};

export function HomeRoute(_: RouteProps) {
  return <HomeContainer />;
}
