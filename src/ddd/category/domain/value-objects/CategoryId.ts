export class CategoryId {
  private constructor(private readonly value: string) {}

  public static create(value: string): CategoryId {
    if (!value) {
      throw new Error('CategoryId cannot be empty');
    }
    return new CategoryId(value);
  }

  public static empty(): CategoryId {
    return new CategoryId('');
  }

  public isEmpty(): boolean {
    return this.value === '';
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: CategoryId): boolean {
    return this.value === other.getValue();
  }
}
