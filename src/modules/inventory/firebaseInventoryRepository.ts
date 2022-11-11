/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import InventoryEntity from './InventoryEntity';
import { InventoryRepository } from './inventoryRepository';

class FirebaseInventoryRepository extends InventoryRepository {
  baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

  async getById(uid: string): Promise<InventoryEntity> {
    console.info('get inventory in db with uid: ', uid);
    const response = await axios.get(`/api/inventory/${uid}`);
    const { name, isPublic, isDefaultInventory } = response.data;

    return InventoryEntity.new({
      uid,
      name,
      isPublic,
      isDefaultInventory,
    });
  }

  async add(inventory: InventoryEntity): Promise<string> {
    console.info('adding inventory in db...');
    const res = await axios.post('/api/inventory/add', {
      uid: inventory.getUid(),
      name: inventory.getName(),
      isPublic: inventory.getIsPublic(),
      isDefaultInventory: inventory.getIsDefaultInventory(),
    });
    console.info('Inventory added in DB, uid: ', inventory.getUid());
    return res.data;
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting inventory with uid ${uid} in db...`);
    return axios.post('/api/inventory/delete', { uid });
  }

  async getAll(): Promise<InventoryEntity[]> {
    console.info('get all inventorys in db');
    const response = await axios.get('/api/inventory/getAll');
    return response.data.map(
      (inventory: InventoryEntity) =>
        new InventoryEntity({
          uid: inventory.uid,
          name: inventory.name,
          isPublic: inventory.isPublic,
          isDefaultInventory: inventory.isDefaultInventory,
        })
    );
  }

  async update(inventory: InventoryEntity): Promise<void> {
    console.info('update inventory uid: ', inventory.getUid());
    await axios.put(`/api/inventory/${inventory.getUid()}`, {
      uid: inventory.getUid(),
      name: inventory.getName(),
      isPublic: inventory.getIsPublic(),
      isDefaultInventory: inventory.getIsDefaultInventory(),
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
    return response.data
      ? response.data.map(
          (inventory: InventoryEntity) =>
            new InventoryEntity({
              uid: inventory.uid,
              name: inventory.name,
              isPublic: inventory.isPublic,
              isDefaultInventory: inventory.isDefaultInventory,
            })
        )
      : [];
  }

  async createInventoryByUserIdAndCompanyId(
    userId: string,
    companyId: string
  ): Promise<InventoryEntity> {
    console.info('create inventory by userId and companyId in db');
    const response = await axios.post(`${this.baseUrl}/api/inventory/add`, {
      userId,
      companyId,
    });
    return response.data;
  }
}

export default FirebaseInventoryRepository;
