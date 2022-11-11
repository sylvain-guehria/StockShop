/* eslint-disable class-methods-use-this */

import type ItemEntity from './ItemEntity';

/**
 * @abstract
 */
export abstract class ItemRepository {
  constructor() {
    if (this.constructor === ItemRepository) {
      throw new TypeError(
        'Abstract class "ItemRepository" cannot be instantiated, it can only be extended.'
      );
    }
  }

  getById(uid: string): Promise<ItemEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async add(item: ItemEntity): Promise<string> {
    throw new Error(`You tried to call an abstract methode, arg: ${item}`);
  }

  async delete(uid: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async getAll(): Promise<ItemEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(item: ItemEntity): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${{ item }}`);
  }
}

export default ItemRepository;
