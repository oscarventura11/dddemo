import { describe, it, expect } from 'vitest';
import { CategoryMother } from '../../mothers/CategoryMother';
import { CategoryCollectionMother } from '../../mothers/CategoryCollectionMother';

describe('CategoryCollection', () => {
  it('should create a collection and return items', () => {
    const items = [CategoryMother.createRandom(), CategoryMother.createRandom()];
    const collection = CategoryCollectionMother.create(items);

    expect(collection.items).toHaveLength(2);
    expect(collection.count()).toBe(2);
  });

  it('should return a copy of items array', () => {
    const items = [CategoryMother.createRandom()];
    const collection = CategoryCollectionMother.create(items);

    const collectionItems = collection.items;
    collectionItems.push(CategoryMother.createRandom());

    expect(collection.count()).toBe(1);
  });
});
