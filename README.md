# DDDemo: DDD & Hexagonal Architecture in TypeScript

A demonstration project refactoring a "Bad Example" into a clean, testable, and scalable architecture using **Domain-Driven Design (DDD)** and **Hexagonal (Ports & Adapters) Architecture**.

## 🚀 Overview

This project showcases how to transition from a tightly-coupled, hook-heavy React/Preact implementation to a robust architecture that separates business logic from infrastructure and presentation concerns.

## 🏗️ Architecture

The project follows a **Hexagonal Architecture** with four distinct layers:

1.  **Domain**: Pure business logic (Entities, Value Objects, Repository Abstract Classes).
2.  **Application**: State management (Signals) and CQRS Services (Read/Write).
3.  **Infrastructure**: Implementation details (JSON/API Repositories, Mappers, DI configuration).
4.  **Presentation**: UI Components (Dumb) and Containers (Smart).

### Shared Services
- **PolicyService**: Role-based access control with whitelist support.
- **ErrorManager**: Centralized error handling across the application.
- **NotificationService**: Unified user feedback system using MUI Snackbars.

## 📁 Project Structure

```text
src/
├── ddd/
│   ├── category/       # Category feature (Domain, Application, Infrastructure, Presentation)
│   └── shared/         # Shared kernels (Notification, Error, DI hooks)
└── bad_example/        # The original legacy implementation for comparison
```

## 🛠️ Tech Stack

-   **UI Framework**: [Preact](https://preactjs.com/)
-   **State Management**: [Preact Signals](https://preactjs.com/guide/v10/signals)
-   **Dependency Injection**: [InversifyJS](https://inversify.io/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Testing**: [Vitest](https://vitest.dev/)
-   **E2E Testing**: [Playwright](https://playwright.dev/) with [Cucumber](https://cucumber.io/)
-   **Arch. Validation**: [tsarch](https://github.com/pksunkara/tsarch)



### Development Shortcuts (Makefile)
The project includes a `Makefile` for a streamlined dev environment:
- `make dev`: Launches a tmux-based development session running the app and tests in parallel.

### Git Hooks (Husky)
The project uses Husky to automate development standards:
- **Pre-commit**: Displays an interactive menu to standardize commit messages (following Conventional Commits).
- **Pre-push**: Runs all tests before allowing a push. It automatically stashes uncommitted changes to ensure tests run only on the code that is about to be pushed.

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
# Optimized dev environment (tmux required)
make dev

# Standard dev server
pnpm dev
```

### Running Tests
```bash
# Run all unit/integration tests
pnpm test

# Run E2E tests
pnpm test:e2e
```

## 📜 Documentation

Detailed architectural documentation can be found in the [`docs/`](./docs/architecture/README.md) directory:
-   [Architecture Overview](./docs/architecture/README.md)
-   [Hexagonal Layers](./docs/architecture/Hexagonal.md)
-   [Tech Stack Details](./docs/architecture/Tech_Stack.md)
-   [Policy System (Authorization)](./docs/architecture/Policy_System.md)
-   [Refactor Plan](./DDD_REFACTOR_PLAN.md)
