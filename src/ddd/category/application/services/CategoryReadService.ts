import { inject, injectable } from "inversify";
import { CategoryRepository } from "../../domain/repositories/CategoryRepository";
import { CategoryState } from "../state/CategoryState";
import { CategoryCollection } from "../../domain/entities/CategoryCollection";
import { CategoryId } from "../../domain/value-objects/CategoryId";
import { Category } from "../../domain/entities/Category";
import { NotificationService } from "../../../shared/notification/application/services/NotificationService";
import { CategoryException } from "../../domain/exceptions/CategoryException";

@injectable()
export class CategoryReadService {
  constructor(
    @inject(CategoryRepository)
    private readonly _repository: CategoryRepository,
    @inject(CategoryState) private readonly _state: CategoryState,
    @inject(NotificationService)
    private readonly _notificationService: NotificationService,
  ) {}

  public async load(): Promise<void> {
    this._state.setLoading(true);
    try {
      const categories = await this._repository.findAll();
      this._state.setCategories(CategoryCollection.create(categories));
    } catch (error) {
      if (error instanceof CategoryException) {
        this._notificationService.error(error.message);
      } else {
        this._notificationService.error("Unexpected category error.");
      }
    } finally {
      this._state.setLoading(false);
    }
  }

  public async expand(categoryId: CategoryId): Promise<void> {
    try {
      const children = await this._repository.findAll(categoryId);
      const currentItems = this._state.categories.value.items;

      const { nodes: newItems, changed } = this.updateNodesRecursively(
        currentItems,
        categoryId,
        children,
      );
      if (changed) {
        this._state.setCategories(CategoryCollection.create(newItems));

        if (this._state.selected.value.isSelected(categoryId)) {
          const updatedCategory = this.findCategory(newItems, categoryId);
          if (updatedCategory) {
            this._state.setSelected(
              this._state.selected.value.select(updatedCategory),
            );
          }
        }
      }
    } catch (error) {
      if (error instanceof CategoryException) {
        this._notificationService.error(error.message);
      } else {
        this._notificationService.error("Unexpected category error.");
      }
    }
  }

  private updateNodesRecursively(
    nodes: Category[],
    id: CategoryId,
    children: Category[],
  ): { nodes: Category[]; changed: boolean } {
    let changed = false;
    const newNodes = nodes.map((node) => {
      if (node.id.equals(id)) {
        changed = true;
        return node.updateChildren(children);
      }
      const result = this.updateNodesRecursively(node.children, id, children);
      if (result.changed) {
        changed = true;
        return node.updateChildren(result.nodes);
      }
      return node;
    });
    return { nodes: newNodes, changed };
  }

  private findCategory(
    categories: Category[],
    id: CategoryId,
  ): Category | undefined {
    for (const cat of categories) {
      if (cat.id.equals(id)) return cat;
      const found = this.findCategory(cat.children, id);
      if (found) return found;
    }
    return undefined;
  }
}
