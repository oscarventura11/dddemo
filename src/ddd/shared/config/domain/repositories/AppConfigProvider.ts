export type AppEnvironment = "development" | "test" | "production" | "local";

export abstract class AppConfigProvider {
  abstract getEnvironment(): AppEnvironment;

  public isDevelopment(): boolean {
    return this.getEnvironment() === "development";
  }

  abstract defaultPolicyFeatureFlags(): Record<string, boolean>;
}
