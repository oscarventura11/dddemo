import { CategoryId } from '../value-objects/CategoryId';
import { CategoryName } from '../value-objects/CategoryName';

export abstract class Category {
  protected constructor(
    public readonly id: CategoryId,
    public readonly name: CategoryName,
    protected _parent: Category | null = null
  ) {}

  public static create(
    id: CategoryId,
    name: CategoryName,
    children: Category[] = [],
    hasChildrenInSource: boolean = false
  ): Category {
    if (hasChildrenInSource || children.length > 0) {
      return CategoryBranch.create(id, name, children);
    } else {
      return CategoryLeaf.create(id, name);
    }
  }

  public static empty(): Category {
    return CategoryLeaf.create(CategoryId.empty(), CategoryName.empty());
  }

  public isEmpty(): boolean {
    return this.id.isEmpty();
  }

  public abstract get children(): Category[];
  public abstract isLeaf(): boolean;
  public abstract updateChildren(children: Category[]): Category;

  public get parent(): Category | null {
    return this._parent;
  }

  public setParent(parent: Category): void {
    this._parent = parent;
  }

  public isRoot(): boolean {
    return this._parent === null;
  }

  public getAllDescendantIds(): CategoryId[] {
    const ids: CategoryId[] = [];
    this.children.forEach(child => {
      ids.push(child.id);
      ids.push(...child.getAllDescendantIds());
    });
    return ids;
  }

  public getAllAncestorIds(): CategoryId[] {
    const ids: CategoryId[] = [];
    let current = this._parent;
    while (current) {
      ids.push(current.id);
      current = current.parent;
    }
    return ids;
  }
}

export class CategoryBranch extends Category {
  private _children: Category[];

  private constructor(
    id: CategoryId,
    name: CategoryName,
    children: Category[] = [],
    parent: Category | null = null
  ) {
    super(id, name, parent);
    this._children = children;
    this._children.forEach(child => child.setParent(this));
  }

  public static create(
    id: CategoryId,
    name: CategoryName,
    children: Category[] = []
  ): CategoryBranch {
    return new CategoryBranch(id, name, children);
  }

  public get children(): Category[] {
    return [...this._children];
  }

  public isLeaf(): boolean {
    return false;
  }

  public updateChildren(children: Category[]): Category {
    return new CategoryBranch(this.id, this.name, children, this.parent);
  }
}

export class CategoryLeaf extends Category {
  private constructor(
    id: CategoryId,
    name: CategoryName,
    parent: Category | null = null,
  ) {
    super(id, name, parent);
  }

  public static create(id: CategoryId, name: CategoryName): CategoryLeaf {
    return new CategoryLeaf(id, name);
  }

  public get children(): Category[] {
    return [];
  }

  public isLeaf(): boolean {
    return true;
  }

  public updateChildren(_children: Category[]): Category {
    if (_children.length > 0) {
      throw new Error('Cannot add children to a CategoryLeaf.');
    }
    return this;
  }
}
