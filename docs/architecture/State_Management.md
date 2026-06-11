# 🔄 State Management — Preact Signals

## Pattern
We use `@preact/signals` for reactive and efficient state. Signals allow granular UI updates without unnecessary re-renders.

## State Service
State services expose `Signals` or `Computed` values and provide methods to mutate them.

```typescript
@injectable()
class CategoryStateService {
  private _categories = signal<Category[]>([]);
  private _loading = signal<boolean>(false);

  // Read-Only signals exposure
  public readonly categories = computed(() => this._categories.value);
  public readonly isLoading = computed(() => this._loading.value);

  // Mutation methods
  public setCategories(categories: Category[]) {
    this._categories.value = categories;
  }

  public setLoading(loading: boolean) {
    this._loading.value = loading;
  }
}
```

## Services → State
- ReadService/WriteService call methods on the StateService to update the global feature state.
- The `.value` property is not exposed for direct writing outside the StateService.

## Components → UI
- Components access signals via `useContext` (where the service is injected) or via props.
- Preact automatically optimizes rendering when accessing `signal.value` within JSX.

## Rules
- One `*StateService` per feature.
- Use `computed` for derived data (filters, counts, composite states).
- In tests: verify signal values after calling service methods.

## 🔗 Related
- [Architecture MOC](./README.md)
- [Architecture where state management resides](./Hexagonal.md)
- [StateServices registered via DI](./DI_System.md)
