import { describe, it, beforeEach, expect } from 'vitest';
import { mock, instance, when, verify, anyOfClass, anything } from 'ts-mockito';
import { CategoryWriteService } from '../CategoryWriteService';
import { CategoryState } from '../../state/CategoryState';
import { CategoryMother } from '../../../domain/mothers/CategoryMother';
import { CategoryCollectionMother } from '../../../domain/mothers/CategoryCollectionMother';
import { CategoryId } from '../../../domain/value-objects/CategoryId';
import { FakeCategoryRepository } from '../../../infrastructure/repositories/FakeCategoryRepository';
import { NotificationService } from '../../../../shared/notification/application/services/NotificationService';
import { AppErrorManager } from '../../../../shared/error/application/services/AppErrorManager';
import { CategorySelected } from '../../../domain/entities/CategorySelected';

describe('CategoryWriteService', () => {
  let state: CategoryState;
  let repository: FakeCategoryRepository;
  let notificationService: NotificationService;
  let errorManager: AppErrorManager;
  let service: CategoryWriteService;

  beforeEach(() => {
    state = new CategoryState();
    repository = mock(FakeCategoryRepository);
    notificationService = mock(NotificationService);
    errorManager = mock(AppErrorManager);
    
    service = new CategoryWriteService(
      state,
      instance(repository),
      instance(notificationService),
      instance(errorManager)
    );
  });

  it('should toggle a category selection', () => {
    const category = CategoryMother.createWithData({ id: '1' });
    const categories = [category];
    const categoryId = CategoryId.create('1');
    
    state.setCategories(CategoryCollectionMother.create(categories));

    service.toggle(categoryId);

    expect(state.selected.value.isSelected(categoryId)).toBe(true);
    
    service.toggle(categoryId);
    expect(state.selected.value.isSelected(categoryId)).toBe(false);
  });

  it('should submit selection successfully', async () => {
    const category = CategoryMother.createWithData({ id: '1' });
    state.setCategories(CategoryCollectionMother.create([category]));
    service.toggle(category.id);

    when(repository.saveSelection(anything())).thenResolve();

    await service.submit();

    verify(repository.saveSelection(anyOfClass(CategorySelected))).once();
    verify(notificationService.success(anything())).once();
    expect(state.loading.value).toBe(false);
  });

  it('should handle errors during submission', async () => {
    const error = new Error('Submit failed');
    when(repository.saveSelection(anything())).thenReject(error);

    await service.submit();

    verify(errorManager.handleError(error)).once();
    expect(state.loading.value).toBe(false);
  });
});
