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

  async createInventoryWithCompanyId({
    companyId,
    isFirstInventory = false,
  }: CreateInventoryParams): Promise<InventoryEntity> {
    const inventoryToAdd: Inventory = {
      id: uuidV4(),
      companyId,
      name: 'Nouvel Inventaire',
      updatedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      isDefaultInventory: isFirstInventory,
      color:
        arrayInventoryColors[
          Math.floor(Math.random() * (Object.keys(InventoryColors).length - 1))
        ],
    };

    const createdInventory = await this.inventoryRepository.add(inventoryToAdd);

    if (!createdInventory) throw new Error('Inventory not created');

    return createdInventory as InventoryEntity;
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
  companyId: string;
  isFirstInventory?: boolean;
}
