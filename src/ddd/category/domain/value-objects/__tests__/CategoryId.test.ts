import { describe, it, expect } from 'vitest';
import { CategoryId } from '../CategoryId';

describe('CategoryId', () => {
  it('should create from string', () => {
    const id = CategoryId.create('123');
    expect(id.getValue()).toBe('123');
  });

  it('should throw error if empty', () => {
    expect(() => CategoryId.create('')).toThrow('CategoryId cannot be empty');
  });

  it('should handle equality correctly', () => {
    const id1 = CategoryId.create('1');
    const id2 = CategoryId.create('1');
    const id3 = CategoryId.create('2');
    
    expect(id1.equals(id2)).toBe(true);
    expect(id1.equals(id3)).toBe(false);
  });
});
