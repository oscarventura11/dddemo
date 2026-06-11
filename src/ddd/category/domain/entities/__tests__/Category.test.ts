import { describe, expect, it } from "vitest";

import { CategoryMother } from "../../mothers/CategoryMother";

describe("Category", () => {
  it("should identify leaf nodes correctly", () => {
    const electronics = CategoryMother.electronics();
    const laptops = electronics.children[0].children[0];

    expect(electronics.isLeaf()).toBe(false);
    expect(laptops.isLeaf()).toBe(true);
  });

  it("should identify root nodes correctly", () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];

    expect(electronics.isRoot()).toBe(true);
    expect(computers.isRoot()).toBe(false);
  });

  it("should get all descendant ids", () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    const laptops = computers.children[0];
    const desktops = computers.children[1];
    const smartphones = electronics.children[1];

    const descendantIds = electronics.getAllDescendantIds();

    expect(descendantIds).toContainEqual(computers.id);
    expect(descendantIds).toContainEqual(laptops.id);
    expect(descendantIds).toContainEqual(desktops.id);
    expect(descendantIds).toContainEqual(smartphones.id);
    expect(descendantIds).toHaveLength(4);
  });

  it("should get all ancestor ids", () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];
    const laptops = computers.children[0];

    const ancestorIds = laptops.getAllAncestorIds();

    expect(ancestorIds).toContainEqual(computers.id);
    expect(ancestorIds).toContainEqual(electronics.id);
    expect(ancestorIds).toHaveLength(2);
  });

  it("should throw an error when trying to add children to a CategoryLeaf", () => {
    const electronics = CategoryMother.electronics();
    const laptops = electronics.children[0].children[0];

    expect(laptops.isLeaf()).toBe(true);
    expect(() => {
      laptops.updateChildren([electronics]);
    }).toThrowError("Cannot add children to a CategoryLeaf.");
  });

  it("should correctly update children for a CategoryBranch", () => {
    const electronics = CategoryMother.electronics();
    const computers = electronics.children[0];

    expect(computers.isLeaf()).toBe(false);

    const updatedComputers = computers.updateChildren([]);
    expect(updatedComputers.children).toHaveLength(0);
    expect(updatedComputers.isLeaf()).toBe(false);
  });
});
