import { v4 as uuidV4 } from 'uuid';

import InventoryEntity from './InventoryEntity';
import type { InventoryRepository } from './inventoryRepository';
import type { Inventory } from './inventoryType';
import { arrayInventoryColors, InventoryColors } from './inventoryType';

class InventoryService {
  inventoryRepository;

  constructor(inventoryRepository: InventoryRepository) {
    this.inventoryRepository = inventoryRepository;
  }

  async createInventoryByUserIdAndCompanyId({
    userUid,
    companyUid,
    isFirstInventory = false,
  }: CreateInventoryParams): Promise<InventoryEntity> {
    const uid = uuidV4();

    const inventory = InventoryEntity.new({
      uid,
      name: 'Nouvel Inventaire',
      isPublic: false,
      isDefaultInventory: !!isFirstInventory,
      color:
        arrayInventoryColors[
          Math.floor(Math.random() * (Object.keys(InventoryColors).length - 1))
        ],
    });

    return this.inventoryRepository.add(inventory, userUid, companyUid);
  }

  async updateInventory({
    inventory,
    userUid,
    companyUid,
  }: UpdateInventoryParams): Promise<void> {
    return this.inventoryRepository.update(
      InventoryEntity.new({
        uid: inventory.uid,
        name: inventory.name,
        isPublic: inventory.isPublic,
        isDefaultInventory: inventory.isDefaultInventory,
        color: inventory.color,
      }),
      userUid,
      companyUid
    );
  }
}

export default InventoryService;

export type UpdateInventoryParams = {
  inventory: Inventory;
  userUid: string;
  companyUid: string;
};

export type CreateInventoryParams = {
  userUid: string;
  companyUid: string;
  isFirstInventory?: boolean;
};
