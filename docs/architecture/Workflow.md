# 🔄 Development Workflow

Follow these 5 steps to implement a new feature:

## 1. Domain
- Define **Entities** and **Value Objects**.
- Define **Repository Abstract Class** (Port).
- Implement **Mother objects** for testing.
- Write **Domain Unit Tests**.

## 2. Infrastructure
- Implement the **Repository Adapter** (e.g., `FakeRepository` or `HttpRepository`).
- Implement **Mappers** (JSON ↔ Domain).
- Register everything in the **DI Container**.

## 3. Application
- Implement **State** using Signals.
- Implement **ReadService** (Queries) and **WriteService** (Commands).
- Integrate with **ErrorManager** for global error handling.
- Write **Integration Tests** (Mocking the repository).

## 4. Presentation
- Build **Dumb Components** using Material UI.
- Implement **Skeletons** for loading states.
- Build **Smart Containers** that resolve services from DI.

## 5. Shared Concerns
- Use **NotificationService** for user feedback.
- Use **ErrorManager** for consistent error reporting.

## 6. Coding Standards
- **No Comments**: Do not add comments to the code. The code should be self-explanatory.

