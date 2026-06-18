import { Category } from "./Category";

export class CategoryCollection {
  constructor(private readonly _items: Category[]) {}

  public static create(items: Category[]): CategoryCollection {
    return new CategoryCollection(items);
  }

  public get items(): Category[] {
    return [...this._items];
  }

  public count(): number {
    return this._items.length;
  }

  public static empty(): CategoryCollection {
    return CategoryCollection.create([]);
  }
}
