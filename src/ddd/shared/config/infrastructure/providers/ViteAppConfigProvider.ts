import { injectable } from "inversify";
import {
  AppConfigProvider,
  type AppEnvironment,
} from "../../domain/repositories/AppConfigProvider";

@injectable()
export class ViteAppConfigProvider extends AppConfigProvider {
  private readonly fallbackEnvironment: AppEnvironment = "development";

  public getEnvironment(): AppEnvironment {
    const raw = import.meta.env.VITE_APP_ENV;

    if (raw === "development") return "development";
    if (raw === "test") return "test";
    if (raw === "production") return "production";
    if (raw === "local") return "local";

    return this.fallbackEnvironment;
  }

  public defaultPolicyFeatureFlags(): Record<string, boolean> {
    return {
      "new-category-tree": true,
      "show-under-construction": this.isDevelopment(),
      "view-about-page": this.isDevelopment(),
    };
  }
}
