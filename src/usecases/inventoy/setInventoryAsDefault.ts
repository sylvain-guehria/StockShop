import InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type { Inventory } from '@/modules/inventory/inventoryType';

export type SetInventoryAsDefaultParams = {
  inventory: Inventory;
  userId: string;
};

export const setInventoryAsDefault =
  (inventoryRepository: InventoryRepository) =>
  async ({
    userId,
    inventory,
  }: SetInventoryAsDefaultParams): Promise<void> => {
    if (!userId)
      throw new Error('userId is required to set inventory as default');
    if (!inventory)
      throw new Error('inventory is required to set inventory as default');

    const inventoryEntity = InventoryEntity.new(inventory);
    const companyId = inventoryEntity.getCompanyId();

    if (!companyId)
      throw new Error(
        'companyId is required in the inventory to set inventory as default'
      );

    if (inventoryEntity.getIsDefaultInventory()) return;

    try {
      const inventories =
        await inventoryRepository.getInventoriesByUserIdAndCompanyId(
          userId,
          companyId
        );

      inventoryEntity.setAsDefaultInventory();
      await inventoryRepository.update(inventoryEntity, userId, companyId);

      const formerDefaultInventory = inventories.find(
        (retrievedInventory) => retrievedInventory.isDefaultInventory
      );
      if (formerDefaultInventory) {
        formerDefaultInventory.setAsNotDefaultInventory();
        await inventoryRepository.update(
          formerDefaultInventory,
          userId,
          companyId
        );
      } else {
        // eslint-disable-next-line no-console
        console.log('No former default inventory founed');
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error);
    }
  };
