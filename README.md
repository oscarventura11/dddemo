# DDDemo: DDD & Hexagonal Architecture in TypeScript

A demonstration project refactoring a 'Bad Example' into a clean, testable, and scalable architecture using **Domain-Driven Design (DDD)** and **Hexagonal (Ports & Adapters) Architecture**.

## 🚀 Overview

This project showcases how to transition from a tightly-coupled, hook-heavy React/Preact implementation to a robust architecture that separates business logic from infrastructure and presentation concerns.

## 🏗️ Architecture

The project follows a **Hexagonal Architecture** with four distinct layers:

1.  **Domain**: Pure business logic (Entities, Value Objects, Repository Abstract Classes).
2.  **Application**: State management (Signals) and CQRS Services (Read/Write).
3.  **Infrastructure**: Implementation details (JSON/API Repositories, Mappers, DI configuration).
4.  **Presentation**: UI Components (Dumb) and Containers (Smart).

## 🛠️ Tech Stack

-   **UI Framework**: [Preact](https://preactjs.com/)
-   **State Management**: [Preact Signals](https://preactjs.com/guide/v10/signals)
-   **Dependency Injection**: [InversifyJS](https://inversify.io/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Testing**: [Vitest](https://vitest.dev/)
-   **Arch. Validation**: [ts-arch](https://github.com/ts-arch/ts-arch)

## 📁 Project Structure

```text
src/
└── ddd/
    ├── category/
    │   ├── domain/         # Entities (Category, Collection), Value Objects
    │   ├── application/    # Read/Write Services, State
    │   ├── infrastructure/ # Repository implementations, DI
    │   └── presentation/   # UI Components & Containers
    └── __tests__/          # Architectural and Unit Tests
```

## 🚦 Getting Started

### Prerequisites
-   Node.js (v18+)
-   pnpm (recommended) or npm

### Installation
```bash
pnpm install
```

### Running the App
```bash
pnpm dev
```

### Running Tests
```bash
# Run all tests
pnpm test

# Run architectural tests specifically
pnpm test src/ddd/category/__tests__/arch.test.ts
```

## 📜 Documentation

Detailed architectural documentation can be found in the [`docs/`](./docs/) directory:
-   [Architecture Overview](./docs/architecture/README.md)
-   [Hexagonal Layers](./docs/architecture/Hexagonal.md)
-   [Tech Stack Details](./docs/architecture/Tech_Stack.md)
-   [Refactor Plan](./DDD_REFACTOR_PLAN.md)
# dddemo
