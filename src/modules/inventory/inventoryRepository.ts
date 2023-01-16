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

  getById(id: string): Promise<InventoryEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async add(
    inventory: InventoryEntity,
    userId: string,
    companyId: string
  ): Promise<InventoryEntity> {
    throw new Error(
      `You tried to call an abstract methode, inventory: ${inventory}, userId: ${userId}, companyId: ${companyId}`
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

  async getInventoriesByUserIdAndCompanyId(
    userId: string,
    companyId: string
  ): Promise<InventoryEntity[]> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ userId, companyId }}`
    );
  }
}

export default InventoryRepository;

export type DeleteInventoryParams = {
  inventoryId: string;
  companyId: string;
  userId: string;
};
