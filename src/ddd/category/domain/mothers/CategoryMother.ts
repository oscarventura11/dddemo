import { Category } from "../entities/Category";
import { CategoryId } from "../value-objects/CategoryId";
import { CategoryName } from "../value-objects/CategoryName";

export class CategoryMother {
  public static create(
    params: {
      id?: CategoryId;
      name?: CategoryName;
      children?: Category[];
      hasChildrenInSource?: boolean;
    } = {},
  ): Category {
    return Category.create(
      params.id ?? CategoryId.create("1"),
      params.name ?? CategoryName.create("Default Category"),
      params.children ?? [],
      params.hasChildrenInSource ?? false
    );
  }

  public static createWithData(
    params: {
      id?: string;
      name?: string;
      children?: Category[];
      hasChildrenInSource?: boolean;
    } = {},
  ): Category {
    return this.create({
      id: params.id ? CategoryId.create(params.id) : undefined,
      name: params.name ? CategoryName.create(params.name) : undefined,
      children: params.children,
      hasChildrenInSource: params.hasChildrenInSource
    });
  }

  public static createRandom(): Category {
    return this.createWithData({
      id: Math.random().toString(36).substring(7),
      name: Math.random().toString(36).substring(7),
    });
  }

  public static electronics(): Category {
    return Category.create(
      CategoryId.create("1"),
      CategoryName.create("Electronics"),
      [
        Category.create(
          CategoryId.create("1-1"),
          CategoryName.create("Computers"),
          [
            Category.create(
              CategoryId.create("1-1-1"),
              CategoryName.create("Laptops"),
            ),
            Category.create(
              CategoryId.create("1-1-2"),
              CategoryName.create("Desktops"),
            ),
          ],
        ),
        Category.create(
          CategoryId.create("1-2"),
          CategoryName.create("Smartphones"),
        ),
      ],
    );
  }

  public static empty(): Category {
    return Category.empty();
  }
}
