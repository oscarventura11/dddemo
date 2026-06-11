import { CategoryId } from '../value-objects/CategoryId';
import { Category } from '../entities/Category';
import { CategorySelected } from '../entities/CategorySelected';

export abstract class CategoryRepository {
  public abstract findAll(parentId?: CategoryId): Promise<Category[]>;
  public abstract saveSelection(selection: CategorySelected): Promise<void>;
}
