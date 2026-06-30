---
tags:
  - type/permanent
  - topic/architecture
  - topic/ddd
  - topic/hexagonal
related:
  - "../architecture/README.md"
  - "../architecture/Hexagonal.md"
  - "../architecture/Category.md"
  - "../architecture/Patterns.md"
---

# Why We Refactored to DDD and Hexagonal

## Context

The previous implementation in `src/bad_example/` mixed UI concerns, state handling, data fetching, and core domain rules in the same place.

Main issues observed:

- Tight coupling between UI and domain behavior.
- Anemic domain model with plain objects and scattered business rules.
- Hard-to-extend selection logic.
- Difficult isolated testing of business behavior.

## Decision

Adopt a DDD-oriented hexagonal architecture in `src/ddd/` with clear layers:

- Domain: entities, value objects, repository ports, domain rules.
- Application: use-case services and state.
- Infrastructure: adapters, mappers, DI composition.
- Presentation: smart containers and dumb components.

Use a CQRS split in the application layer:

- Read path: load/expand queries.
- Write path: toggle/submit commands.

## Why This Architecture

1. Encapsulate business rules in domain entities instead of hooks.
2. Keep application flow explicit and testable through services.
3. Isolate external concerns (JSON/API) behind adapters and mappers.
4. Improve maintainability with strict dependency direction.
5. Enable architecture tests that enforce layer boundaries.

## Alternatives Considered

1. Keep hook-centric architecture and incrementally clean it.
   - Rejected: logic remained distributed and coupling stayed high.
2. Move to a global store-first approach without explicit domain model.
   - Rejected: reduced clarity of domain invariants and use cases.

## Trade-offs

Benefits:

- Better isolation of domain logic.
- Clearer ownership of concerns per layer.
- Easier unit and integration testing.

Costs:

- More files and boilerplate.
- Higher upfront design effort.
- Documentation discipline required to keep layers and patterns aligned.

## Migration Strategy Used

1. Define domain entities, value objects, and repository ports.
2. Add infrastructure adapters and mappers.
3. Implement application state and read/write services.
4. Build smart/dumb presentation split.
5. Add unit, service, and architecture tests.
6. Keep docs synchronized with each feature change.

## Current Status

The architecture and feature docs under `docs/architecture/` are the source of truth for current implementation behavior.

This note captures rationale and decision history behind the refactor.

## Linked Implementation Docs

- `../architecture/README.md`
- `../architecture/Hexagonal.md`
- `../architecture/Category.md`
- `../architecture/Patterns.md`
