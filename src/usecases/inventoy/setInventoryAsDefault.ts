import InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type { Inventory } from '@/modules/inventory/inventoryType';

export const setInventoryAsDefault =
  (inventoryRepository: InventoryRepository) =>
  async (inventory: Inventory): Promise<void> => {
    if (!inventory)
      throw new Error('inventory is required to set inventory as default');

    const inventoryEntity = InventoryEntity.new(inventory);
    const companyId = inventoryEntity.getCompanyId();

    if (!companyId)
      throw new Error(
        'companyId is required in the inventory to set inventory as default'
      );

    if (inventoryEntity.isDefault()) return;

    try {
      const inventories = await inventoryRepository.getInventoriesByCompanyId(
        companyId
      );

      inventoryEntity.setAsDefaultInventory();
      await inventoryRepository.update(inventoryEntity);

      const formerDefaultInventory = inventories.find(
        (retrievedInventory) => retrievedInventory.isDefaultInventory
      );
      if (formerDefaultInventory) {
        formerDefaultInventory.setAsNotDefaultInventory();
        await inventoryRepository.update(formerDefaultInventory);
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
