import { injectable } from 'inversify';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { Category } from '../../domain/entities/Category';
import { CategoryId } from '../../domain/value-objects/CategoryId';
import { CategorySelected } from '../../domain/entities/CategorySelected';
import { CategoryMapper } from '../mappers/CategoryMapper';
import categoriesData from '../../../../data/categories.json';

@injectable()
export class FakeCategoryRepository extends CategoryRepository {
  public async findAll(parentId?: CategoryId): Promise<Category[]> {
    if (!parentId) {
      return categoriesData.map((data) => CategoryMapper.toDomain(data, 1));
    }

    const findRawInTree = (nodes: any[], id: string): any | undefined => {
      for (const node of nodes) {
        if (node.id === id) return node;
        if (node.children) {
          const found = findRawInTree(node.children, id);
          if (found) return found;
        }
      }
      return undefined;
    };

    const parentRaw = findRawInTree(categoriesData, parentId.getValue());
    if (!parentRaw || !parentRaw.children) return [];

    return parentRaw.children.map((data: any) =>
      CategoryMapper.toDomain(data, 1),
    );
  }

  public async saveSelection(selection: CategorySelected): Promise<void> {
    const selectedIds = CategoryMapper.toSelectionJSON(selection);
    console.log('[FakeCategoryRepository] Saving selection (all selected IDs):', selectedIds);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}
