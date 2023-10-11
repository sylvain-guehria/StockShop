/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import InventoryEntity from './InventoryEntity';
import { InventoryRepository } from './inventoryRepository';
import type { Inventory } from './inventoryType';

class SupabaseInventoryRepository extends InventoryRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<InventoryEntity | null> {
    console.info('get inventory in db with id: ', id);
    const { data } = await axios.get(`${this.baseUrl}/api/inventory/${id}`);
    return data ? InventoryEntity.new(data) : null;
  }

  async add(inventory: Inventory): Promise<InventoryEntity | null> {
    console.info('adding inventory in db...');
    const { data } = await axios.post(
      `${this.baseUrl}/api/inventory/add`,
      inventory,
    );
    console.info('Inventory added in DB, id: ', inventory.id);
    return data ? InventoryEntity.new(data) : null;
  }

  async update(inventory: InventoryEntity): Promise<InventoryEntity | null> {
    console.info('update inventory id: ', inventory.getId());
    const { data } = await axios.post(
      `/api/inventory/${inventory.getId()}`,
      inventory,
    );
    return data ? InventoryEntity.new(data) : null;
  }

  async delete(inventoryId: string): Promise<boolean> {
    console.info(`Deleting inventory with id ${inventoryId} in db...`);
    const { data } = await axios.delete(
      `${this.baseUrl}/api/inventory/delete`,
      {
        params: { inventoryId },
      },
    );
    return data;
  }

  async getAll(): Promise<InventoryEntity[] | null> {
    console.info('get all inventorys in db');
    const { data } = await axios.get(`${this.baseUrl}/api/inventory/getAll`);
    return data
      ? data.map((inventory: InventoryEntity) => new InventoryEntity(inventory))
      : null;
  }

  async getInventoriesByCompanyId(
    companyId: string,
  ): Promise<InventoryEntity[] | null> {
    console.info('get inventories by companyId in db');
    const { data } = await axios.get(
      `${this.baseUrl}/api/inventory/getInventoriesByCompanyId`,
      {
        params: { companyId },
      },
    );

    const inventories = data.inventories || [];
    const inventoriesProductCount = data.inventoriesProductCount || {};

    return data
      ? inventories.map(
          (inventory: InventoryEntity) =>
            new InventoryEntity({
              ...inventory,
              numberOfProducts: inventoriesProductCount[inventory.id],
            }),
        )
      : null;
  }
}

export default SupabaseInventoryRepository;
