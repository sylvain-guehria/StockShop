/* eslint-disable class-methods-use-this */

import type CategoryEntity from './CategoryEntity';

/**
 * @abstract
 */
export abstract class CategoryRepository {
  constructor() {
    if (this.constructor === CategoryRepository) {
      throw new TypeError(
        'Abstract class "CategoryRepository" cannot be instantiated, it can only be extended.',
      );
    }
  }

  getById(id: string): Promise<CategoryEntity | null> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async add(category: CategoryEntity): Promise<CategoryEntity | null> {
    throw new Error(`You tried to call an abstract methode, arg: ${category}`);
  }

  async update(category: CategoryEntity): Promise<CategoryEntity | null> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ category }}`,
    );
  }

  async delete(id: string): Promise<boolean> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async getAll(): Promise<CategoryEntity[] | null> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }
}

export default CategoryRepository;
