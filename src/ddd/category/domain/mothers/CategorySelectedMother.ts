import { CategorySelected } from '../entities/CategorySelected';
import { CategoryId } from '../value-objects/CategoryId';

export class CategorySelectedMother {
  public static create(ids: CategoryId[]): CategorySelected {
    return CategorySelected.create(ids);
  }

  public static createWithData(ids: string[] = []): CategorySelected {
    return this.create(ids.map((id) => CategoryId.create(id)));
  }

  public static createRandom(): CategorySelected {
    return this.createWithData([Math.random().toString(36).substring(7)]);
  }
}
