# Copilot Instructions

## Documentation rule: update docs when a feature changes

After implementing, modifying, or deleting any feature in `src/ddd/`, you **must** update the relevant documentation in `docs/`.

### What counts as a feature change

- Adding or removing a domain entity, value object, or repository port.
- Adding or removing an application service, state, or use case.
- Adding or removing an infrastructure adapter (repository impl, mapper, policy, DI binding).
- Adding or removing a presentation container, component, or route.
- Adding or removing a shared service (ErrorManager, NotificationService, PolicyService, AppConfigProvider).

### Which doc to update

| Change area                                             | Doc to update                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------ |
| `category/` domain, application, infra, or presentation | `docs/architecture/Category.md`                                    |
| `shared/policy/` or authorization logic                 | `docs/architecture/Policy_System.md`                               |
| `shared/notification/` or `shared/error/`               | `docs/architecture/Shared.md`                                      |
| `shared/config/`                                        | `docs/architecture/Shared.md`                                      |
| Cross-cutting architecture change                       | `docs/architecture/Hexagonal.md` and `docs/architecture/README.md` |
| DI bindings in `container.ts`                           | `docs/architecture/DI_System.md`                                   |

### Rules

1. Do not skip this step even for small changes.
2. Keep docs factual — describe what the code does, not what it should do.
3. Update the relevant doc in the same commit as the code change.
4. If a new shared service is introduced, add it to `docs/architecture/Shared.md` and link it from `docs/architecture/README.md`.
5. If a new feature module is introduced under `src/ddd/`, create a new doc file in `docs/architecture/` and link it from `docs/architecture/README.md`.
