import { Category } from "../entities/Category";
import { CategoryCollection } from "../entities/CategoryCollection";
import { CategoryMother } from "./CategoryMother";

export class CategoryCollectionMother {
  public static complete(): CategoryCollection {
    return this.create([CategoryMother.complete(), CategoryMother.withId("2")]);
  }

  public static withItems(items: Category[]): CategoryCollection {
    return this.create(items);
  }

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

  public static withEmpty(): CategoryCollection {
    return this.createEmpty();
  }
}
