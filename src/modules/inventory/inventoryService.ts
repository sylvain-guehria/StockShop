import { v4 as uuidV4 } from 'uuid';

import InventoryEntity from './InventoryEntity';
import type { InventoryRepository } from './inventoryRepository';
import type { Inventory } from './inventoryType';

class InventoryService {
  inventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async createInventoryByUserIdAndCompanyId(
    userUid: string,
    companyUid: string
  ): Promise<InventoryEntity> {
    const uid = uuidV4();

    const inventory = InventoryEntity.new({
      uid,
      name: 'Nouvel Inventaire',
      isPublic: false,
      isDefaultInventory: false,
    });

    return this.inventoryRepository.add(inventory, userUid, companyUid);
  }

  async updateInventory(
    inventory: Inventory,
    userUid: string,
    companyUid: string
  ): Promise<void> {
    return this.inventoryRepository.update(
      InventoryEntity.new({
        uid: inventory.uid,
        name: inventory.name,
        isPublic: inventory.isPublic,
        isDefaultInventory: inventory.isDefaultInventory,
      }),
      userUid,
      companyUid
    );
  }
}

export default InventoryService;
