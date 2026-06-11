# 🔷 Hexagonal Architecture

## Dependency Flow

```
Presentation (Preact components / Containers)
    ↓ depends on
Application (services, state)
    ↓ depends on
Domain (entities, value objects, repository abstract classes)   ← pure core
    ↑ implemented by
Infrastructure (HTTP repository implementations, adapters)
```

## Layers

### Domain (Pure Core)
- **Entities:** Classes with identity and business rules.
- **Composite Pattern:** Used for recursive structures like category trees. Components can be `Leaf` or `Branch` (Composite), sharing a common abstract class or base.
- **No Primitives:** Raw primitives (string, number, boolean) are forbidden for domain concepts. Use Value Objects to encapsulate validation and behavior. 

- **Value Objects:** Immutable, compared by value, self-validating.
- **Repository abstract classes (ports):** TypeScript abstract classes defining data persistence contracts.
- **Exceptions:** Typed error classes per feature.
- **Mother objects:** For domain logic testing.
- **No external or infrastructure dependencies.**

### Application (CQRS Pattern)
- **StateService:** Manages reactive state using Signals. Only the StateService should mutate the signals.
- **ReadService:** Handles queries and data fetching. It populates the StateService.
- **WriteService:** Handles commands and data mutations. It calls repositories and triggers StateService updates.
- **Tree Management:** `WriteService` handles node creation by calling the repository to persist new leaves or branches in the backend.

### Infrastructure
- **Adapter (Mappers):** Translate JSON ↔ Domain objects.
- **Repositories:** Implement domain ports (e.g., `HttpCategoryRepository` or `FakeCategoryRepository`).
- **DI Module:** Configures feature-specific injections.

### Presentation
- **Containers (Smart):** Componentes that resolve services from DI and handle side effects. They interact with `ReadService`, `WriteService`, and `StateService`.
- **Components (Dumb):** Receive props, emit callbacks. No business logic or DI.


## Tree Selection Rules (Domain)
Encapsulated in CategorySelected entity:
1.  **Select Parent** -> Selects all descendants automatically.
2.  **Select All Children** -> Selects parent automatically.
3.  **Deselect Child** -> Deselects all ancestors automatically.
4.  **Deselect Parent** -> Deselects all descendants automatically.

## Incremental Loading (Application)
- The initial load() fetches only the first 2 levels.
- Clicking a category triggers expansion logic.
- Newly loaded children inherit the selection status of their parent.

## Null Object Pattern
- Entities and Value Objects should provide static `empty()` and `isEmpty()` methods to prevent null checks in the UI.

## 🔗 Related
- [Architecture MOC](./README.md)
- [DI System connecting the layers](./DI_System.md)
- [State pattern in the Application layer](./State_Management.md)
