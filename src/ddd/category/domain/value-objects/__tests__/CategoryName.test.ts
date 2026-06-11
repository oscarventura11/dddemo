import { describe, it, expect } from 'vitest';
import { CategoryName } from '../CategoryName';

describe('CategoryName', () => {
  it('should create from string', () => {
    const name = CategoryName.create('Books');
    expect(name.getValue()).toBe('Books');
  });

  it('should throw error if empty or whitespace', () => {
    expect(() => CategoryName.create('')).toThrow('CategoryName cannot be empty');
    expect(() => CategoryName.create('  ')).toThrow('CategoryName cannot be empty');
  });

  it('should handle equality correctly', () => {
    const name1 = CategoryName.create('A');
    const name2 = CategoryName.create('A');
    const name3 = CategoryName.create('B');
    
    expect(name1.equals(name2)).toBe(true);
    expect(name1.equals(name3)).toBe(false);
  });
});
