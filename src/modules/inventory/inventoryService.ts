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
    userId,
    companyId,
    isFirstInventory = false,
  }: CreateInventoryParams): Promise<InventoryEntity> {
    const id = uuidV4();

    const inventory = InventoryEntity.new({
      id,
      name: 'Nouvel Inventaire',
      isPublic: false,
      isDefaultInventory: !!isFirstInventory,
      color:
        arrayInventoryColors[
          Math.floor(Math.random() * (Object.keys(InventoryColors).length - 1))
        ],
    });

    return this.inventoryRepository.add(inventory, userId, companyId);
  }

  async updateInventory({
    inventory,
    userId,
    companyId,
  }: UpdateInventoryParams): Promise<void> {
    return this.inventoryRepository.update(
      InventoryEntity.new({
        id: inventory.id,
        name: inventory.name,
        isPublic: inventory.isPublic,
        isDefaultInventory: inventory.isDefaultInventory,
        color: inventory.color,
      }),
      userId,
      companyId
    );
  }
}

export default InventoryService;

export interface UpdateInventoryParams {
  inventory: Inventory;
  userId: string;
  companyId: string;
}

export interface CreateInventoryParams {
  userId: string;
  companyId: string;
  isFirstInventory?: boolean;
}
