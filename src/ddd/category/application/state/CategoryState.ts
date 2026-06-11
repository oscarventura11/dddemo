import { signal, Signal } from "@preact/signals";
import { injectable } from "inversify";
import { CategoryCollection } from "../../domain/entities/CategoryCollection";
import { CategorySelected } from "../../domain/entities/CategorySelected";

@injectable()
export class CategoryState {
  private readonly _categories = signal<CategoryCollection>(CategoryCollection.create([]));
  private readonly _selected = signal<CategorySelected>(CategorySelected.empty());
  private readonly _loading = signal<boolean>(false);

  public get categories(): Signal<CategoryCollection> {
    return this._categories;
  }

  public get selected(): Signal<CategorySelected> {
    return this._selected;
  }

  public get loading(): Signal<boolean> {
    return this._loading;
  }

  public setCategories(categories: CategoryCollection): void {
    this._categories.value = categories;
  }

  public setSelected(selected: CategorySelected): void {
    this._selected.value = selected;
  }

  public setLoading(loading: boolean): void {
    this._loading.value = loading;
  }
}
