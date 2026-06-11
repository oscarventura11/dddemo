import { inject, injectable } from 'inversify';
import { CategoryState } from '../state/CategoryState';
import { CategoryId } from '../../domain/value-objects/CategoryId';
import { Category } from '../../domain/entities/Category';
import { CategoryRepository } from '../../domain/repositories/CategoryRepository';
import { NotificationService } from '../../../shared/notification/application/services/NotificationService';
import { ErrorManager } from '../../../shared/error/application/services/ErrorManager';

@injectable()
export class CategoryWriteService {
  constructor(
    @inject(CategoryState) private readonly _state: CategoryState,
    @inject(CategoryRepository) private readonly _repository: CategoryRepository,
    @inject(NotificationService) private readonly _notificationService: NotificationService,
    @inject(ErrorManager) private readonly _errorManager: ErrorManager
  ) {}

  public toggle(categoryId: CategoryId): void {
    const categories = this._state.categories.value.items;
    const category = this.findCategory(categories, categoryId);
    
    if (category) {
      const newSelected = this._state.selected.value.toggle(category);
      this._state.setSelected(newSelected);
    }
  }

  public async submit(): Promise<void> {
    this._state.setLoading(true);
    try {
      await this._repository.saveSelection(this._state.selected.value);
      this._notificationService.success('Selection submitted successfully!');
    } catch (error) {
      this._errorManager.handleError(error);
    } finally {
      this._state.setLoading(false);
    }
  }

  private findCategory(categories: Category[], id: CategoryId): Category | undefined {
    for (const cat of categories) {
      if (cat.id.equals(id)) return cat;
      const found = this.findCategory(cat.children, id);
      if (found) return found;
    }
    return undefined;
  }
}
