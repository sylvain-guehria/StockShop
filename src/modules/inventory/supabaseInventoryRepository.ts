/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import InventoryEntity from './InventoryEntity';
import type { DeleteInventoryParams } from './inventoryRepository';
import { InventoryRepository } from './inventoryRepository';

class SupabaseInventoryRepository extends InventoryRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(uid: string): Promise<InventoryEntity> {
    console.info('get inventory in db with uid: ', uid);
    const response = await axios.get(`${this.baseUrl}/api/inventory/${uid}`);
    const { name, isPublic, isDefaultInventory, color } = response.data;

    return InventoryEntity.new({
      uid,
      name,
      isPublic,
      isDefaultInventory,
      color,
    });
  }

  async add(
    inventory: InventoryEntity,
    userUid: string,
    companyUid: string
  ): Promise<InventoryEntity> {
    console.info('adding inventory in db...');
    const res = await axios.post(`${this.baseUrl}/api/inventory/add`, {
      userUid,
      companyUid,
      inventory: {
        uid: inventory.getUid(),
        name: inventory.getName(),
        isPublic: inventory.getIsPublic(),
        isDefaultInventory: inventory.getIsDefaultInventory(),
        color: inventory.getColor(),
      },
    });
    const { uid, name } = res.data;
    console.info('Inventory added in DB, uid: ', inventory.getUid());
    return InventoryEntity.new({
      uid,
      name,
    });
  }

  async delete({
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteInventoryParams): Promise<void> {
    console.info(`Deleting inventory with uid ${inventoryUid} in db...`);
    axios.delete(`${this.baseUrl}/api/inventory/delete`, {
      params: { userUid, companyUid, inventoryUid },
    });
  }

  async getAll(): Promise<InventoryEntity[]> {
    console.info('get all inventorys in db');
    const response = await axios.get(`${this.baseUrl}/api/inventory/getAll`);
    return response.data.map(
      (inventory: InventoryEntity) =>
        new InventoryEntity({
          uid: inventory.uid,
          name: inventory.name,
          isPublic: inventory.isPublic,
          isDefaultInventory: inventory.isDefaultInventory,
          color: inventory.color,
        })
    );
  }

  async update(
    inventory: InventoryEntity,
    userUid: string,
    companyUid: string
  ): Promise<void> {
    console.info('update inventory uid: ', inventory.getUid());
    await axios.put(`/api/inventory/${inventory.getUid()}`, {
      userUid,
      companyUid,
      uid: inventory.getUid(),
      name: inventory.getName(),
      isPublic: inventory.getIsPublic(),
      isDefaultInventory: inventory.getIsDefaultInventory(),
      color: inventory.getColor(),
    });
  }

  async getInventoriesByUserUidAndCompanyUid(
    userUid: string,
    companyUid: string
  ): Promise<InventoryEntity[]> {
    console.info('get inventories by userUid and companyUid in db');
    const response = await axios.get(
      `${this.baseUrl}/api/inventory/getInventoriesByUserUidAndCompanyUid`,
      {
        params: { userUid, companyUid },
      }
    );
    return response.data.map(
      (inventory: InventoryEntity) =>
        new InventoryEntity({
          uid: inventory.uid,
          name: inventory.name,
          isPublic: inventory.isPublic,
          isDefaultInventory: inventory.isDefaultInventory,
          color: inventory.color,
          companyUid,
        })
    );
  }
}

export default SupabaseInventoryRepository;
