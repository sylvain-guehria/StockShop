import type { Category } from './categoryType';

class CategoryEntity implements Category {
  uid: string;

  label: string;

  attributs: Record<string, unknown>;

  static new(category?: Category): CategoryEntity {
    return new CategoryEntity(category || {});
  }

  constructor(category: Category) {
    this.uid = category.uid || '';
    this.label = category.label || '';
    this.attributs = category.attributs || {};
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

  getAttributs(): Record<string, unknown> {
    return this.attributs;
  }

  setAttributs(attributs: Record<string, unknown>): CategoryEntity {
    this.attributs = attributs;
    return this;
  }

  getAttribut(key: string): unknown {
    return this.attributs[key];
  }

  setAttribut(key: string, value: unknown): CategoryEntity {
    this.attributs[key] = value;
    return this;
  }

  removeAttribut(key: string): CategoryEntity {
    delete this.attributs[key];
    return this;
  }

  hasAttribut(key: string): boolean {
    return this.attributs[key] !== undefined;
  }
}

export default CategoryEntity;
