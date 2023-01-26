/* eslint-disable class-methods-use-this */

import type InventoryEntity from './InventoryEntity';
import type { Inventory } from './inventoryType';

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

  getById(id: string): Promise<InventoryEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async add(inventory: Inventory): Promise<InventoryEntity | null> {
    throw new Error(
      `You tried to call an abstract methode, inventory: ${inventory}`
    );
  }

  async delete({
    userId,
    companyId,
    inventoryId,
  }: DeleteInventoryParams): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg inventoryId ${inventoryId} and userId: ${userId} and companyId: ${companyId}`
    );
  }

  async getAll(): Promise<InventoryEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(
    inventory: InventoryEntity,
    userId: string,
    companyId: string
  ): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        inventory,
      }} and userId: ${userId} and companyId: ${companyId}`
    );
  }

  async getInventoriesByCompanyId(
    companyId: string
  ): Promise<InventoryEntity[]> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ companyId }}`
    );
  }
}

export default InventoryRepository;

export type DeleteInventoryParams = {
  inventoryId: string;
  companyId: string;
  userId: string;
};
