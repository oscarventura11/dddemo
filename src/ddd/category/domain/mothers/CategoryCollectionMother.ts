import { Category } from "../entities/Category";
import { CategoryCollection } from "../entities/CategoryCollection";
import { CategoryMother } from "./CategoryMother";

export class CategoryCollectionMother {
  public static create(items: Category[]): CategoryCollection {
    return CategoryCollection.create(items);
  }

  public static createWithData(items: Category[] = []): CategoryCollection {
    return this.create(items);
  }

  public static createRandom(): CategoryCollection {
    return this.create([
      CategoryMother.createRandom(),
      CategoryMother.createRandom(),
    ]);
  }

  public static createEmpty(): CategoryCollection {
    return this.create([]);
  }
}
