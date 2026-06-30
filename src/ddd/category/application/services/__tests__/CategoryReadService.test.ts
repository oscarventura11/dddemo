import { describe, it, beforeEach, expect } from "vitest";
import { mock, instance, when, verify } from "ts-mockito";
import { CategoryReadService } from "../CategoryReadService";
import { FakeCategoryRepository } from "../../../infrastructure/repositories/FakeCategoryRepository";
import { CategoryState } from "../../state/CategoryState";
import { NotificationService } from "../../../../shared/notification/application/services/NotificationService";
import { CategoryMother } from "../../../domain/mothers/CategoryMother";
import { CategoryCollectionMother } from "../../../domain/mothers/CategoryCollectionMother";
import { CategoryId } from "../../../domain/value-objects/CategoryId";
import { CategoryFetchException } from "../../../domain/exceptions/CategoryException";

describe("CategoryReadService", () => {
  let repository: FakeCategoryRepository;
  let state: CategoryState;
  let notificationService: NotificationService;
  let service: CategoryReadService;

  beforeEach(() => {
    repository = mock(FakeCategoryRepository);
    state = new CategoryState();
    notificationService = mock(NotificationService);
    service = new CategoryReadService(
      instance(repository),
      state,
      instance(notificationService),
    );
  });

  it("should load categories and update state", async () => {
    const categories = [CategoryMother.complete()];
    const expectedCollection = CategoryCollectionMother.create(categories);
    when(repository.findAll()).thenResolve(categories);

    await service.load();

    expect(state.loading.value).toBe(false);
    expect(state.categories.value.items).toEqual(expectedCollection.items);
  });

  it("should handle errors during load", async () => {
    const error = new CategoryFetchException();
    when(repository.findAll()).thenReject(error);

    await service.load();

    verify(notificationService.error(error.message)).once();
    expect(state.loading.value).toBe(false);
  });

  it("should expand a category and update state", async () => {
    const parentId = CategoryId.create("1");
    const children = [CategoryMother.withId("1-1")];
    const initialCategories = [
      CategoryMother.createWithData({
        id: "1",
        name: "Root",
        hasChildrenInSource: true,
      }),
    ];

    state.setCategories(CategoryCollectionMother.create(initialCategories));

    when(repository.findAll(parentId)).thenResolve(children);

    await service.expand(parentId);

    expect(state.categories.value.items[0].children.length).toBe(1);
    expect(state.categories.value.items[0].children[0].id.getValue()).toBe(
      "1-1",
    );
  });
});
