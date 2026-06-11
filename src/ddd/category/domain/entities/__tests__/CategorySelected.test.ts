import { describe, it, expect } from 'vitest';
import { CategoryMother } from '../../mothers/CategoryMother';
import { CategorySelected } from '../CategorySelected';

describe('Category Selection Logic', () => {
  it('Selecting a parent selects automatically all the children', () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    const laptops = computers.children[0];
    
    let selected = CategorySelected.empty();
    selected = selected.toggle(computers);
    
    expect(selected.isSelected(computers.id)).toBe(true);
    expect(selected.isSelected(laptops.id)).toBe(true);
  });

  it('Deselecting a child deselects the parent', () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    
    let selected = CategorySelected.create([electronics.id, computers.id]);
    selected = selected.toggle(computers);
    
    expect(selected.isSelected(electronics.id)).toBe(false);
    expect(selected.isSelected(computers.id)).toBe(false);
  });

  it('Deselecting a parent deselects all the children', () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    const laptops = computers.children[0];
    
    let selected = CategorySelected.create([computers.id, laptops.id]);
    selected = selected.toggle(computers);
    
    expect(selected.isSelected(computers.id)).toBe(false);
    expect(selected.isSelected(laptops.id)).toBe(false);
  });

  it('If all the children are selected, the parent is automatically selected', () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    const smartphones = electronics.children[1];
    
    let selected = CategorySelected.empty();
    selected = selected.toggle(computers);
    selected = selected.toggle(smartphones);
    
    expect(selected.isSelected(electronics.id)).toBe(true);
  });

  it('If all the children are deselected, the parent is automatically deselected', () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    const smartphones = electronics.children[1];
    
    let selected = CategorySelected.create([electronics.id, computers.id, smartphones.id]);
    selected = selected.toggle(computers);
    selected = selected.toggle(smartphones);
    
    expect(selected.isSelected(electronics.id)).toBe(false);
  });
});
