# Refactor Plan: From "Bad Example" to DDDa & Hexagonal Architecture

## ❌ Why the "Bad Example" is Bad

The current implementation in `src/bad_example/` demonstrates several "anti-patterns" that make the codebase hard to maintain, test, and scale:

1.  **Tight Coupling (The "Big Ball of Mud"):** 
    *   The `useCategories` hook is doing too much: fetching data, managing state, and implementing complex business logic (tree traversal and selection rules).
    *   The UI components are directly dependent on the implementation details of the data structure.

2.  **Anemic Domain Model:** 
    *   Logic is spread across hooks instead of being encapsulated within domain entities.
    *   The data is treated as plain objects (`any[]`), leading to fragile code that is prone to runtime errors.

3.  **Scalability Issues:** 
    *   Recursive logic for selecting/deselecting parents and children is hardcoded within a single function (`handleToggle`). Adding new rules (e.g., "partially selected" states) would make this function unmanageable.

4.  **Testing Difficulties:** 
    *   Since the logic is finished inside a React/Preact hook, it is difficult to test the business rules in isolation without mocking the entire rendering cycle.

---

## ❅ The New Approach: DDD & Hexagonal Architecture

We will refactor this using a **Hexagonal (Ports and Adapters) Architecture** adapted for TypeScript and Preact, following a **CQRS pattern** in the Application layer.

c## ﻿ Architectural Layers

| Layer | Responsibility | TS Implementation |
| :--- | :--- | :--- |
| **Domain** | Pure business logic, Entities, and Abstract Classes. | `Category` Entity, `CategoryRepository` (Port) |
| **Application** | State management and CQRS (Read/Write). | `CategoryReadService`, `CategoryWriteService`, `CategoryState`|
| **Infrastructure**| External implementations (API, JSON, Storage). | `FakeCategoryRepository` (Adapter), `CategoryMapper` |
| **Presentation** | UI Components (Dumb) and Containers (Smart). | `CategoryTreeContainer` (Container), `CategoryComponent` (Dumb) |

c## ﻿ Tech Stack

| Concept | TS / Preact Implementation | Tooling |
| :--- | :--- | :--- |
| **Dependency Injection** | InversifyJS | `@injectable`, `@inject` |
| **State Management** | Preact Signals | `@preact/signals` |
| **Testing Framework** | Vitest | `vitest` |
| **Mocking** | ts-mockito | `ts-mockito` |
| **Arch. Validation** | tsarch | `tsarch` |
| **E2E Testing** | Playwright + Cucumber | `playwright-bdd`|

---

## ❥ Key Improvements

### 1. Robust Domain Model
Instead of a simple hook, we have a `Category` Entity and a `CategoryCollection` for tree operations.
*   **Business Rule:** "When a parent is selected, all children are selected."
*   **Implementation:** Encapsulated in domain entities.

### 2. CQRS in Application Layer
We separate the application logic into distinct services:
*   **ReadService:** Responsible for fetching data and populating the state.
*   **WriteService:** Responsible for executing commands (e.g., toggling a category).
*   **StateService:** The single source of truth for the feature's reactive state (Signals).

### 3. Dependency Injection with Inversify
We use `@injectable()` and `@inject()` to decouple our code.
*   Services don't know *where* the data comes from. They only know the `CategoryRepository` port.

### 4. Testability
*   **Domain Tests:** Test entity logic in pure TS.
*   **Application Tests:** Test Read/Write services with mocked repositories.
*   **Architecture Tests:** Ensure `Domain` never imports from `Infrastructure` or `Presentation`.

---

##  Project Structure

```text
src/
└──ddd/
│   ▜��� category/
┈   ┈   ├── domain/         # Entities, Value Objects, Port
│   │   ▜��� application/    # Services, State
┈   ┈   ├── infrastructure/ # Adapter, Mapper, DI
┈   ┈   ├── presentation/   # Components, Containers
┈   ├── shared/             # Shared Kernel (Error, Notification)
```
