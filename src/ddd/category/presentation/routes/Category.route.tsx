import { CategoryTreeContainer } from "../containers/CategoryTreeContainer";

type RouteProps = {
  path?: string;
};

export function CategoryRoute(_: RouteProps) {
  return <CategoryTreeContainer />;
}
