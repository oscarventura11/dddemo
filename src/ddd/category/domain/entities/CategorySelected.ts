import { CategoryId } from '../value-objects/CategoryId';
import { Category } from './Category';

export class CategorySelected {
  constructor(private readonly _selectedIds: CategoryId[]) {}

  public static create(selectedIds: CategoryId[]): CategorySelected {
    return new CategorySelected(selectedIds);
  }

  public static empty(): CategorySelected {
    return new CategorySelected([]);
  }

  public isSelected(id: CategoryId): boolean {
    return this._selectedIds.some(selectedId => selectedId.equals(id));
  }

  public get selectedIds(): CategoryId[] {
    return [...this._selectedIds];
  }

  public toggle(category: Category): CategorySelected {
    if (this.isSelected(category.id)) {
      return this.deselect(category);
    } else {
      return this.select(category);
    }
  }

  public select(category: Category): CategorySelected {
    let newSelectedIds = this.selectRecursive(category, [...this._selectedIds]);
    newSelectedIds = this.updateAncestorsAfterSelection(category, newSelectedIds);
    return new CategorySelected(newSelectedIds);
  }

  public deselect(category: Category): CategorySelected {
    let newSelectedIds = this.deselectRecursive(category, [...this._selectedIds]);
    newSelectedIds = this.updateAncestorsAfterDeselection(category, newSelectedIds);
    return new CategorySelected(newSelectedIds);
  }

  private selectRecursive(category: Category, selectedIds: CategoryId[]): CategoryId[] {
    let result = selectedIds;
    if (!result.some(id => id.equals(category.id))) {
      result = [...result, category.id];
    }
    category.children.forEach(child => {
      result = this.selectRecursive(child, result);
    });
    return result;
  }

  private deselectRecursive(category: Category, selectedIds: CategoryId[]): CategoryId[] {
    let result = selectedIds.filter(id => !id.equals(category.id));
    category.children.forEach(child => {
      result = this.deselectRecursive(child, result);
    });
    return result;
  }

  private updateAncestorsAfterSelection(category: Category, selectedIds: CategoryId[]): CategoryId[] {
    let result = selectedIds;
    let current = category.parent;
    while (current) {
      const allChildrenSelected = current.children.every(child => 
        result.some(id => id.equals(child.id))
      );
      if (allChildrenSelected && !result.some(id => id.equals(current!.id))) {
        result = [...result, current.id];
      } else {
        break;
      }
      current = current.parent;
    }
    return result;
  }

  private updateAncestorsAfterDeselection(category: Category, selectedIds: CategoryId[]): CategoryId[] {
    let result = selectedIds;
    let current = category.parent;
    while (current) {
      result = result.filter(id => !id.equals(current!.id));
      current = current.parent;
    }
    return result;
  }
}
