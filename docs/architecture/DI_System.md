# 💉 Dependency Injection System

## InversifyJS
We use `inversify` as our IoC container. The current app composes dependencies in a central container for the category module and shared services.

## Current Binding Style

```typescript
import { Container } from "inversify";
import { AppConfigProvider } from ".../config/domain/repositories/AppConfigProvider";
import { ViteAppConfigProvider } from ".../config/infrastructure/providers/ViteAppConfigProvider";
import { Policy } from ".../policy/domain/repositories/PolicyProvider";
import { CategoryPolicy } from ".../policy/infrastructure/providers/CategoryPolicy";

const container = new Container();

container.bind<AppConfigProvider>(AppConfigProvider).to(ViteAppConfigProvider).inSingletonScope();
container.bind<Policy>(Policy).to(CategoryPolicy).inSingletonScope();
```

## Dependency Resolution
Services resolve dependencies via constructor injection using the `@inject` decorator:

```typescript
@injectable()
class PolicyState {
  constructor(
    @inject(AppConfigProvider) private readonly configProvider: AppConfigProvider
  ) {}
}
```

## Rules
- Bind against **ports/abstract classes** (`AppConfigProvider`, `Policy`, repositories).
- Use `inSingletonScope()` for stateful or shared services.
- In tests: instantiate services with test doubles for ports (for example, test config providers and mocked policies).

## 🔗 Related
- [Architecture MOC](./README.md)
- [Architecture using this DI system](./Hexagonal.md)
