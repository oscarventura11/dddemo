export class CategoryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CategoryException";
  }
}

export class CategoryInfrastructureException extends CategoryException {
  constructor(message: string = "Category infrastructure operation failed.") {
    super(message);
    this.name = "CategoryInfrastructureException";
  }
}

export class CategoryFetchException extends CategoryInfrastructureException {
  constructor() {
    super("Failed to fetch categories.");
    this.name = "CategoryFetchException";
  }
}

export class CategoryCreateException extends CategoryInfrastructureException {
  constructor() {
    super("Failed to create category.");
    this.name = "CategoryCreateException";
  }
}

export class CategoryUpdateException extends CategoryInfrastructureException {
  constructor() {
    super("Failed to update category.");
    this.name = "CategoryUpdateException";
  }
}

export class CategoryDeleteException extends CategoryInfrastructureException {
  constructor() {
    super("Failed to delete category.");
    this.name = "CategoryDeleteException";
  }
}
