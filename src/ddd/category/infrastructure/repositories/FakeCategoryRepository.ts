import { injectable } from "inversify";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { Category } from "../../domain/entities/Category";
import { CategoryId } from "../../domain/value-objects/CategoryId";
import { CategorySelected } from "../../domain/entities/CategorySelected";
import { CategoryMapper } from "../mappers/CategoryMapper";
import {
  CategoryFetchException,
  CategoryUpdateException,
} from "../../domain/exceptions/CategoryException";
import categoriesData from "../../../../data/categories.json";

@injectable()
export class FakeCategoryRepository extends CategoryRepository {
  public async findAll(parentId?: CategoryId): Promise<Category[]> {
    try {
      if (!parentId) {
        return categoriesData.map((data) => CategoryMapper.fromJson(data, 1));
      }

      const findRawInTree = (nodes: any[], id: CategoryId): any | undefined => {
        for (const node of nodes) {
          if (CategoryMapper.getId(node).equals(id)) return node;
          const children = CategoryMapper.getChildren(node);
          if (children.length > 0) {
            const found = findRawInTree(children, id);
            if (found) return found;
          }
        }
        return undefined;
      };

      const parentRaw = findRawInTree(categoriesData, parentId);
      if (!parentRaw) return [];

      return CategoryMapper.getChildren(parentRaw).map((data: any) =>
        CategoryMapper.fromJson(data, 1),
      );
    } catch {
      throw new CategoryFetchException();
    }
  }

  public async saveSelection(selection: CategorySelected): Promise<void> {
    try {
      const selectedIds = CategoryMapper.toJsonSelection(selection);
      console.log(
        "[FakeCategoryRepository] Saving selection (all selected IDs):",
        selectedIds,
      );
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    } catch {
      throw new CategoryUpdateException();
    }
  }
}
