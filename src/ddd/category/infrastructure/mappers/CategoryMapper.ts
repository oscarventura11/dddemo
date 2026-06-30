import { Category } from "../../domain/entities/Category";
import { CategoryId } from "../../domain/value-objects/CategoryId";
import { CategoryName } from "../../domain/value-objects/CategoryName";
import { CategorySelected } from "../../domain/entities/CategorySelected";

export class CategoryMapper {
  public static fromJson(
    raw: any,
    maxDepth: number = -1,
    currentDepth: number = 0,
  ): Category {
    const id = this.buildId(raw);
    const name = this.buildName(raw);
    const rawChildren = this.getChildren(raw);
    const hasChildren = rawChildren.length > 0;
    const children =
      maxDepth === -1 || currentDepth < maxDepth
        ? rawChildren.map((child: any) =>
            this.fromJson(child, maxDepth, currentDepth + 1),
          )
        : [];

    return Category.create(id, name, children, hasChildren);
  }

  public static toJson(category: Category): {
    id: string | null;
    name: string | null;
    children: Array<{
      id: string | null;
      name: string | null;
      children: any[];
    }>;
  } {
    return {
      id: category.id.isEmpty() ? null : category.id.getValue(),
      name: category.name.isEmpty() ? null : category.name.getValue(),
      children: category.children.map((child) => this.toJson(child)),
    };
  }

  public static toJsonSelection(
    selected: CategorySelected,
  ): Array<string | null> {
    return selected.selectedIds.map((id) =>
      id.isEmpty() ? null : id.getValue(),
    );
  }

  public static getId(raw: any): CategoryId {
    return this.buildId(raw);
  }

  public static getChildren(raw: any): any[] {
    return Array.isArray(raw?.children) ? raw.children : [];
  }

  private static buildId(raw: any): CategoryId {
    const value = typeof raw?.id === "string" ? raw.id.trim() : "";
    return value.length === 0 ? CategoryId.empty() : CategoryId.create(value);
  }

  private static buildName(raw: any): CategoryName {
    const value = typeof raw?.name === "string" ? raw.name.trim() : "";
    return value.length === 0
      ? CategoryName.empty()
      : CategoryName.create(value);
  }
}
