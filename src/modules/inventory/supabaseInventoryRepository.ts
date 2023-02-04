/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import InventoryEntity from './InventoryEntity';
import { InventoryRepository } from './inventoryRepository';
import type { Inventory } from './inventoryType';

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

  async add(inventory: Inventory): Promise<InventoryEntity | null> {
    console.info('adding inventory in db...');
    const res = await axios.post(`${this.baseUrl}/api/inventory/add`, {
      inventory,
    });
    const success = res.status === 200;
    if (success) {
      console.info('Inventory added in DB, id: ', inventory.id);
      return InventoryEntity.new({ ...inventory });
    }
    return null;
  }

  async delete(inventoryId: string): Promise<boolean> {
    console.info(`Deleting inventory with id ${inventoryId} in db...`);
    const res = await axios.delete(`${this.baseUrl}/api/inventory/delete`, {
      params: { inventoryId },
    });
    const success = res.status === 200;

    if (success) {
      console.info('Inventory deleted in DB, id: ', inventoryId);
      return true;
    }
    return false;
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

  async update(inventory: InventoryEntity): Promise<void> {
    console.info('update inventory id: ', inventory.getId());
    await axios.put(`/api/inventory/${inventory.getId()}`, {
      id: inventory.getId(),
      name: inventory.getName(),
      isPublic: inventory.getIsPublic(),
      isDefaultInventory: inventory.isDefault(),
      color: inventory.getColor(),
    });
  }

  async getInventoriesByCompanyId(
    companyId: string
  ): Promise<InventoryEntity[]> {
    console.info('get inventories by companyId in db');
    const response = await axios.get(
      `${this.baseUrl}/api/inventory/getInventoriesByCompanyId`,
      {
        params: { companyId },
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
