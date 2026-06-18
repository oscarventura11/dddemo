import Router from "preact-router";
import { NotFoundContainer } from "../containers/NotFoundContainer";
import { HomeRoute } from "./Home.route";
import { ProtectedAboutRoute } from "./About.route";
import { CategoryRoute } from "../../../category/presentation/routes/Category.route";

type RouteProps = {
  default?: boolean;
};

const NotFoundRoute = (_: RouteProps) => <NotFoundContainer />;

export function AppRoutes() {
  return (
    <Router>
      <HomeRoute path="/" />
      <CategoryRoute path="/category" />
      <ProtectedAboutRoute path="/about" />
      <NotFoundRoute default />
    </Router>
  );
}
