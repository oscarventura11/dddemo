# Design Patterns

This document captures project-level design patterns and checks whether they are currently followed in the DDD implementation.

## Null Object Pattern

- Use `Entity.empty()` factory plus `isEmpty()` method.
- UI receives non-null values and does not use null-based conditional rendering.

Current status in DDD: Followed.

- Domain entities and value objects expose empty factories and checks, for example `Category.empty()` and `Category.isEmpty()`.
- Application state initializes with non-null empty objects (`CategoryCollection.empty()` and `CategorySelected.empty()`).

## Exception Hierarchy (3 levels)

```text
Exception
└── FeatureException                     (base, has message)
    └── FeatureInfrastructureException
        ├── FeatureFetchException
        ├── FeatureCreateException
        ├── FeatureUpdateException
        └── FeatureDeleteException
```

- Specific exception classes should not require constructor parameters (fixed message).
- Infrastructure catches everything and rethrows a specific exception.
- Application catches base exception and reports via notification service.

Current status in DDD: Followed in Category module.

- Category now defines a typed hierarchy: `CategoryException`, `CategoryInfrastructureException`, and specific fetch/create/update/delete exceptions.
- Infrastructure repositories catch and rethrow specific category infrastructure exceptions.
- Application services catch the base `CategoryException` and report the message through `NotificationService.error(...)`.

## Adapter / ACL (Anti-Corruption Layer)

- Use static conversion methods (`fromJson()` and `toJson()`).
- The adapter is the only place containing backend field names.
- `fromJson` must always return non-null (using `empty()` or defaults when needed).
- `toJson` converts empty value objects to `null`.

Current status in DDD: Followed in Category module.

- Mapping is centralized in `CategoryMapper` with static methods.
- Mapper API uses `fromJson()` and `toJson()` style conversion methods.
- Mapper conversion is non-null and uses defaults/empty value objects when needed.
- Repository tree traversal uses mapper accessors so backend field details stay in the ACL layer.

## Smart / Dumb Components

- Smart (Container): knows DI, state, and services.
- Dumb (Component): receives data and callbacks only through props.

Current status in DDD: Followed.

- Containers resolve dependencies and orchestrate use cases.
- Components receive domain data plus callbacks via props (`onToggle`, `onExpand`) and stay presentation-focused.

## Mother Objects

- `complete()` creates a complete realistic instance.
- `withX()` returns a variant with one overridden field (copy style).
- Tests compose data from mothers and avoid inline constructor usage.

Current status in DDD: Followed in Category module.

- Mother objects now expose `complete()` and `withX()` style methods (`withId`, `withName`, `withChildren`, `withItems`, `withIds`).
- Existing factory methods remain for compatibility, but tests can compose from the standardized mother API.

## Dependency Injection (Inversify)

- A centralized DI container registers abstractions to concrete implementations.
- Application services and states use constructor injection with `@injectable()` and `@inject(...)`.
- Presentation containers resolve services through a thin `useInjection<T>(token)` hook backed by the shared container.

Current status in DDD: Followed.

- Category and shared dependencies are wired in one container module.
- Concrete infrastructure types are imported in the DI container, while application/domain code depends on abstractions.
- Runtime resolution is explicit and type-safe through Inversify tokens.
