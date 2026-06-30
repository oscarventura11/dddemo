---
tags:
  - type/feature-doc
related:
  - "./Hexagonal.md"
  - "./DI_System.md"
  - "./State_Management.md"
  - "./Policy_System.md"
---

# 🗂️ Category Module

Functional documentation for `src/ddd/category/`.

---

## Overview

The Category module implements a hierarchical, tree-structured taxonomy that can be browsed, expanded, and selected by the user. It follows the hexagonal layer split strictly: domain → application → infrastructure → presentation.

---

## Domain Layer

### `Category` (abstract entity)

**File:** `src/ddd/category/domain/entities/Category.ts`

Base abstract class for tree nodes. Uses the **Composite pattern**:

- `CategoryLeaf` — a node with no children.
- `CategoryBranch` — a node with children; wires parent references on construction.

| Method | Description |
|---|---|
| `Category.create(id, name, children, hasChildrenInSource)` | Factory; returns a `CategoryBranch` when children exist or are hinted, otherwise a `CategoryLeaf`. |
| `Category.empty()` | Returns a sentinel leaf with an empty `CategoryId`. |
| `isEmpty()` | True when the node has an empty `CategoryId`. |
| `isLeaf()` | Abstract; implemented differently in leaf vs branch. |
| `isRoot()` | True when `_parent` is `null`. |
| `getAllDescendantIds()` | Recursively collects all descendant `CategoryId` values. |
| `getAllAncestorIds()` | Walks `_parent` chain and collects `CategoryId` values. |
| `updateChildren(children)` | Abstract; returns a new node with replaced children. |

---

### `CategoryCollection` (entity)

**File:** `src/ddd/category/domain/entities/CategoryCollection.ts`

Immutable wrapper around a `Category[]` list. Returned by the repository and stored in `CategoryState`.

| Method | Description |
|---|---|
| `CategoryCollection.create(items)` | Factory. |
| `CategoryCollection.empty()` | Returns an empty collection. |
| `items` | Defensive copy of the internal array. |
| `count()` | Number of root-level items. |

---

### `CategorySelected` (entity)

**File:** `src/ddd/category/domain/entities/CategorySelected.ts`

Immutable selection state. All selection mutations return a **new** `CategorySelected` instance.

#### Selection rules encoded here

| Rule | Trigger | Effect |
|---|---|---|
| Select parent | `select(branch)` | All descendants are selected recursively. |
| Auto-select parent | After selecting a child | If all siblings are selected, the parent is selected automatically. |
| Deselect parent | `deselect(branch)` | All descendants are deselected recursively. |
| Auto-deselect ancestor | After deselecting a child | All ancestor nodes are deselected. |

| Method | Description |
|---|---|
| `toggle(category)` | Selects or deselects based on current state. |
| `select(category)` | Selects the node and all descendants; promotes ancestors when fully covered. |
| `deselect(category)` | Deselects the node and all descendants; demotes all ancestors. |
| `isSelected(id)` | True when the given `CategoryId` is in the selection set. |
| `selectedIds` | Defensive copy of the `CategoryId[]` list. |

---

### `CategoryId` (value object)

**File:** `src/ddd/category/domain/value-objects/CategoryId.ts`

Immutable string wrapper. Throws on creation from an empty string. Provides `equals()` for identity comparison and `empty()` for the Null Object pattern.

---

### `CategoryName` (value object)

**File:** `src/ddd/category/domain/value-objects/CategoryName.ts`

Immutable string wrapper for the display name. Same empty/null-object pattern as `CategoryId`.

---

### `CategoryRepository` (port)

**File:** `src/ddd/category/domain/repositories/CategoryRepository.ts`

Abstract class defining the persistence contract.

| Method | Description |
|---|---|
| `findAll(parentId?)` | Returns root categories when called with no argument; returns children of `parentId` when provided. |
| `saveSelection(selection)` | Persists the current `CategorySelected` snapshot. |

---

## Application Layer

### `CategoryState`

**File:** `src/ddd/category/application/state/CategoryState.ts`

Reactive store using **Preact Signals**. The single source of truth for UI-consumed state.

| Signal | Type | Description |
|---|---|---|
| `categories` | `Signal<CategoryCollection>` | Current loaded tree. |
| `selected` | `Signal<CategorySelected>` | Current selection snapshot. |
| `loading` | `Signal<boolean>` | True while an async operation is in flight. |

Mutations are gated through `setCategories`, `setSelected`, and `setLoading`. Only the services should call these.

---

### `CategoryReadService`

**File:** `src/ddd/category/application/services/CategoryReadService.ts`

Handles queries (CQRS read side).

| Method | Description |
|---|---|
| `load()` | Fetches root categories from the repository, sets them in `CategoryState`, wraps errors via `ErrorManager`. |
| `expand(categoryId)` | Fetches children for an already-loaded node. Merges them into the existing tree immutably. If the expanded node was selected, triggers a re-select to propagate selection down to newly loaded children. |

---

### `CategoryWriteService`

**File:** `src/ddd/category/application/services/CategoryWriteService.ts`

Handles commands (CQRS write side).

| Method | Description |
|---|---|
| `toggle(categoryId)` | Finds the category in the current tree and toggles selection via `CategorySelected.toggle()`. Updates state. |
| `submit()` | Saves the current selection to the repository. Shows a success notification via `NotificationService` or routes errors to `ErrorManager`. |

---

## Infrastructure Layer

### `FakeCategoryRepository`

**File:** `src/ddd/category/infrastructure/repositories/FakeCategoryRepository.ts`

In-memory implementation of `CategoryRepository` backed by `src/data/categories.json`.

- `findAll()` without a parent returns the root level, mapped to domain objects with `maxDepth=1`.
- `findAll(parentId)` locates the parent in the raw JSON tree and returns its immediate children.
- `saveSelection()` simulates a 1 s network delay and logs the selected IDs to the console.

---

### `CategoryMapper`

**File:** `src/ddd/category/infrastructure/mappers/CategoryMapper.ts`

Stateless translator between raw JSON and domain objects.

| Method | Description |
|---|---|
| `toDomain(raw, maxDepth, currentDepth)` | Recursively maps JSON to `Category`. Stops recursing at `maxDepth`; passes `hasChildrenInSource=true` so branch nodes are created even when children are truncated. |
| `toSelectionJSON(selected)` | Returns the selected IDs as a `string[]` for serialization. |

---

### `CategoryPolicy`

**File:** `src/ddd/category/infrastructure/policies/CategoryPolicy.ts`

Concrete `Policy` implementation for the category domain. Evaluation order:

1. Feature-flag check (`featureKey` present → look up `featureFlags` map).
2. Test mode bypass (always returns `true`).
3. Whitelist bypass (email in `POLICY_WHITELIST`).
4. Admin role bypass.
5. `SUBMIT_CATEGORY_SELECTION` → returns `false` for non-admin, non-whitelisted users.
6. All other actions → returns `true`.

---

### DI Container

**File:** `src/ddd/category/infrastructure/di/container.ts`

Inversify bindings for the entire application. All services are **singleton-scoped**.

| Token | Implementation |
|---|---|
| `CategoryRepository` | `FakeCategoryRepository` |
| `CategoryState` | `CategoryState` (self) |
| `CategoryReadService` | `CategoryReadService` (self) |
| `CategoryWriteService` | `CategoryWriteService` (self) |
| `NotificationRepository` | `LocalNotificationRepository` |
| `NotificationState` | `NotificationState` (self) |
| `NotificationService` | `NotificationService` (self) |
| `ErrorManager` | `AppErrorManager` |
| `AppConfigProvider` | `ViteAppConfigProvider` |
| `PolicyState` | `PolicyState` (self) |
| `PolicyService` | `PolicyService` (self) |
| `Policy` | `CategoryPolicy` |

---

## Presentation Layer

### `CategoryTreeContainer`

**File:** `src/ddd/category/presentation/containers/CategoryTreeContainer.tsx`

Smart container. Resolves services from DI via `useInjection`. Responsibilities:

- Calls `readService.load()` on mount.
- Reads `categories`, `selected`, and `loading` from `CategoryState` signals.
- Checks `PolicyService.can(SUBMIT_CATEGORY_SELECTION)` to conditionally enable the submit button.
- Checks `PolicyService.canFeature("show-under-construction")` to render a dev banner.
- Delegates toggle to `writeService.toggle(id)` and submit to `writeService.submit()`.

### `CategoryComponent`

**File:** `src/ddd/category/presentation/components/CategoryComponent.tsx`

Dumb, recursive component. Renders a single tree node. Accepts `onToggle` and `onExpand` callbacks. No DI, no services.

### `CategorySkeleton`

**File:** `src/ddd/category/presentation/components/CategorySkeleton.tsx`

Loading placeholder rendered while `CategoryState.loading` is `true`.

---

## Data flow (end-to-end)

```
Mount
  └─ CategoryTreeContainer
       └─ readService.load()
            └─ FakeCategoryRepository.findAll()
                 └─ CategoryMapper.toDomain(raw, depth=1)
                      └─ CategoryState.setCategories(collection)
                           └─ Signal update → UI re-renders

User clicks node
  └─ CategoryTreeContainer.onToggle(id)
       └─ writeService.toggle(id)
            └─ CategorySelected.toggle(category)
                 └─ CategoryState.setSelected(newSelected)
                      └─ Signal update → UI re-renders

User clicks expand arrow
  └─ CategoryTreeContainer.onExpand(id)
       └─ readService.expand(id)
            └─ FakeCategoryRepository.findAll(parentId)
                 └─ merge children into existing tree
                      └─ CategoryState.setCategories(updated)

User clicks Submit
  └─ CategoryTreeContainer.handleSubmit()
       └─ PolicyService.can(SUBMIT_CATEGORY_SELECTION) → guard
            └─ writeService.submit()
                 └─ FakeCategoryRepository.saveSelection(selected)
                      └─ NotificationService.success(...)
```
