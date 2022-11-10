/* eslint-disable class-methods-use-this */

import type InventoryEntity from './InventoryEntity';

/**
 * @abstract
 */
export abstract class InventoryRepository {
  constructor() {
    if (this.constructor === InventoryRepository) {
      throw new TypeError(
        'Abstract class "InventoryRepository" cannot be instantiated, it can only be extended.'
      );
    }
  }

  getById(uid: string): Promise<InventoryEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async add(inventory: InventoryEntity): Promise<string> {
    throw new Error(`You tried to call an abstract methode, arg: ${inventory}`);
  }

  async delete(uid: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async getAll(): Promise<InventoryEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(inventory: InventoryEntity): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ inventory }}`
    );
  }
}

export default InventoryRepository;
