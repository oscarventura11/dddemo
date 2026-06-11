export class CategoryName {
  private constructor(private readonly value: string) {}

  public static create(value: string): CategoryName {
    if (value.trim().length === 0) {
      throw new Error('CategoryName cannot be empty');
    }
    return new CategoryName(value);
  }

  public static empty(): CategoryName {
    return new CategoryName('');
  }

  public isEmpty(): boolean {
    return this.value === '';
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: CategoryName): boolean {
    return this.value === other.getValue();
  }
}
