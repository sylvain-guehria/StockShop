/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import InventoryEntity from './InventoryEntity';
import type { DeleteInventoryParams } from './inventoryRepository';
import { InventoryRepository } from './inventoryRepository';

class SupabaseInventoryRepository extends InventoryRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<InventoryEntity> {
    console.info('get inventory in db with id: ', id);
    const response = await axios.get(`${this.baseUrl}/api/inventory/${id}`);
    const { name, isPublic, isDefaultInventory, color } = response.data;

    return InventoryEntity.new({
      id,
      name,
      isPublic,
      isDefaultInventory,
      color,
    });
  }

  async add(
    inventory: InventoryEntity,
    userId: string,
    companyId: string
  ): Promise<InventoryEntity> {
    console.info('adding inventory in db...');
    const res = await axios.post(`${this.baseUrl}/api/inventory/add`, {
      userId,
      companyId,
      inventory: {
        id: inventory.getId(),
        name: inventory.getName(),
        isPublic: inventory.getIsPublic(),
        isDefaultInventory: inventory.getIsDefaultInventory(),
        color: inventory.getColor(),
      },
    });
    const { id, name } = res.data;
    console.info('Inventory added in DB, id: ', inventory.getId());
    return InventoryEntity.new({
      id,
      name,
    });
  }

  async delete({
    userId,
    companyId,
    inventoryId,
  }: DeleteInventoryParams): Promise<void> {
    console.info(`Deleting inventory with id ${inventoryId} in db...`);
    axios.delete(`${this.baseUrl}/api/inventory/delete`, {
      params: { userId, companyId, inventoryId },
    });
  }

  async getAll(): Promise<InventoryEntity[]> {
    console.info('get all inventorys in db');
    const response = await axios.get(`${this.baseUrl}/api/inventory/getAll`);
    return response.data.map(
      (inventory: InventoryEntity) =>
        new InventoryEntity({
          id: inventory.id,
          name: inventory.name,
          isPublic: inventory.isPublic,
          isDefaultInventory: inventory.isDefaultInventory,
          color: inventory.color,
        })
    );
  }

  async update(
    inventory: InventoryEntity,
    userId: string,
    companyId: string
  ): Promise<void> {
    console.info('update inventory id: ', inventory.getId());
    await axios.put(`/api/inventory/${inventory.getId()}`, {
      userId,
      companyId,
      id: inventory.getId(),
      name: inventory.getName(),
      isPublic: inventory.getIsPublic(),
      isDefaultInventory: inventory.getIsDefaultInventory(),
      color: inventory.getColor(),
    });
  }

  async getInventoriesByUserIdAndCompanyId(
    userId: string,
    companyId: string
  ): Promise<InventoryEntity[]> {
    console.info('get inventories by userId and companyId in db');
    const response = await axios.get(
      `${this.baseUrl}/api/inventory/getInventoriesByUserIdAndCompanyId`,
      {
        params: { userId, companyId },
      }
    );
    return response.data.map(
      (inventory: InventoryEntity) =>
        new InventoryEntity({
          id: inventory.id,
          name: inventory.name,
          isPublic: inventory.isPublic,
          isDefaultInventory: inventory.isDefaultInventory,
          color: inventory.color,
          companyId,
        })
    );
  }
}

export default SupabaseInventoryRepository;
