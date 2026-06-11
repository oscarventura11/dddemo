import { container } from "../../../category/infrastructure/di/container";

export function useInjection<T>(token: any): T {
  return container.get<T>(token);
}
