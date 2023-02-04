import type { Category, CategoryInput, SubCategory } from './categoryType';

class CategoryEntity implements Category {
  id: string;

  label: string;

  inputs?: CategoryInput[];

  subCatgories?: SubCategory[];

  static new(category: Category): CategoryEntity {
    return new CategoryEntity(category);
  }

  constructor(category: Category) {
    this.id = category.id || '';
    this.label = category.label || '';
    this.inputs = category.inputs || [];
    this.subCatgories = category.subCatgories || [];
  }

  getId(): string {
    return this.id;
  }

  setId(id: string): CategoryEntity {
    this.id = id;
    return this;
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label: string): CategoryEntity {
    this.label = label;
    return this;
  }

  getInputs(): CategoryInput[] {
    return this.inputs || [];
  }

  setInputs(inputs: CategoryInput[]): CategoryEntity {
    this.inputs = inputs;
    return this;
  }

  getSubCatgories(): SubCategory[] {
    return this.subCatgories || [];
  }

  setSubCatgories(subCatgories: SubCategory[]): CategoryEntity {
    this.subCatgories = subCatgories;
    return this;
  }
}

export default CategoryEntity;
