# 💉 Dependency Injection System

## InversifyJS

The project uses `inversify` with a centralized container and constructor injection.

## Pattern Summary

- A centralized DI container binds ports/abstractions to concrete implementations.
- Application services and state classes use constructor injection with `@injectable()` and `@inject(...)`.
- Presentation containers resolve runtime dependencies through `useInjection<T>(token)`, which delegates to `container.get(token)`.

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
Services resolve dependencies via constructor injection using `@inject`:

```typescript
@injectable()
class PolicyState {
  constructor(
    @inject(AppConfigProvider) private readonly configProvider: AppConfigProvider
  ) {}
}
```

Presentation resolves services through a thin hook over the shared container:

```typescript
export function useInjection<T>(token: any): T {
  return container.get<T>(token);
}
```

## Rules
- Bind against **ports/abstract classes** (`AppConfigProvider`, `Policy`, repositories).
- Use `inSingletonScope()` for stateful or shared services.
- Keep concrete infrastructure imports in the DI container composition root.
- In tests: instantiate services with test doubles for ports (for example, test config providers and mocked policies).

## 🔗 Related
- [Architecture MOC](./README.md)
- [Architecture using this DI system](./Hexagonal.md)
