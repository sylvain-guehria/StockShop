import type { Category, CategoryInput } from './categoryType';

class CategoryEntity implements Category {
  uid: string;

  label: string;

  inputs?: CategoryInput;

  static new(category?: Category): CategoryEntity {
    return new CategoryEntity(category || {});
  }

  constructor(category: Category) {
    this.uid = category.uid || '';
    this.label = category.label || '';
    this.inputs = category.inputs || {};
  }

  getUid(): string {
    return this.uid;
  }

  setUid(uid: string): CategoryEntity {
    this.uid = uid;
    return this;
  }

  getLabel(): string {
    return this.label;
  }

  setLabel(label: string): CategoryEntity {
    this.label = label;
    return this;
  }

  getAttributs(): CategoryInput {
    return this.inputs;
  }

  setAttributs(inputs: CategoryInput): CategoryEntity {
    this.inputs = inputs;
    return this;
  }
}

export default CategoryEntity;
