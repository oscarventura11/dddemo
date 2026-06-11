# 💉 Dependency Injection System

## InversifyJS
We use `inversify` as our IoC container. Each feature declares a `*.di.ts` file that exports a `ContainerModule`.

## DI Module Structure

```typescript
import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "./types";

export const InvoicesDIModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<InvoiceRepository>(TYPES.InvoiceRepository).to(InvoiceHttpRepository).inSingletonScope();
  bind<InvoiceStateService>(TYPES.InvoiceStateService).to(InvoiceStateService).inSingletonScope();
});
```

## Dependency Resolution
Services resolve dependencies via constructor injection using the `@inject` decorator:

```typescript
@injectable()
class InvoiceReadService {
  constructor(
    @inject(TYPES.InvoiceRepository) private _repository: InvoiceRepository,
    @inject(TYPES.InvoiceStateService) private _stateService: InvoiceStateService
  ) {}
}
```

## Rules
- One `*.di.ts` per feature.
- Bind against **abstract classes** using `TYPES` symbols.
- Use `inSingletonScope()` for stateful or shared services.
- In tests: use `Container.rebind()` with `ts-mockito` mocks.

## 🔗 Related
- [[01_Architecture/README]] — Architecture MOC
- [[01_Architecture/Hexagonal]] — Architecture using this DI system
