import { Category } from '../../domain/entities/Category';
import { CategoryId } from '../../domain/value-objects/CategoryId';
import { CategoryName } from '../../domain/value-objects/CategoryName';
import { CategorySelected } from '../../domain/entities/CategorySelected';

export class CategoryMapper {
  public static toDomain(
    raw: any,
    maxDepth: number = -1,
    currentDepth: number = 0,
  ): Category {
    const hasChildren = raw.children && raw.children.length > 0;
    const children =
      maxDepth === -1 || currentDepth < maxDepth
        ? (raw.children || []).map((child: any) =>
            this.toDomain(child, maxDepth, currentDepth + 1),
          )
        : [];

    return Category.create(
      CategoryId.create(raw.id),
      CategoryName.create(raw.name),
      children,
      hasChildren,
    );
  }

  public static toSelectionJSON(selected: CategorySelected): string[] {
    return selected.selectedIds.map(id => id.getValue());
  }
}
