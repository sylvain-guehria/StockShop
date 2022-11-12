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

  async add(
    inventory: InventoryEntity,
    userUid: string,
    companyUid: string
  ): Promise<InventoryEntity> {
    throw new Error(
      `You tried to call an abstract methode, inventory: ${inventory}, userUid: ${userUid}, companyUid: ${companyUid}`
    );
  }

  async delete({
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteInventoryParams): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg inventoryUid ${inventoryUid} and userUid: ${userUid} and companyUid: ${companyUid}`
    );
  }

  async getAll(): Promise<InventoryEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(
    inventory: InventoryEntity,
    userId: string,
    companyUid: string
  ): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        inventory,
      }} and userId: ${userId} and companyUid: ${companyUid}`
    );
  }

  async getInventoriesByUserUidAndCompanyUid(
    userUid: string,
    companyUid: string
  ): Promise<InventoryEntity[]> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ userUid, companyUid }}`
    );
  }
}

export default InventoryRepository;

export type DeleteInventoryParams = {
  inventoryUid: string;
  companyUid: string;
  userUid: string;
};
