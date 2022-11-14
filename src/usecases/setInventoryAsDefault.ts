import InventoryEntity from '@/modules/inventory/InventoryEntity';
import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';
import type { Inventory } from '@/modules/inventory/inventoryType';

export type SetInventoryAsDefaultParams = {
  inventory: Inventory;
  userUid: string;
};

export const setInventoryAsDefault =
  (inventoryRepository: InventoryRepository) =>
  async ({
    userUid,
    inventory,
  }: SetInventoryAsDefaultParams): Promise<void> => {
    if (!userUid) throw new Error('userUid is required');
    if (!inventory) throw new Error('inventory is required');

    const inventoryEntity = InventoryEntity.new(inventory);
    const companyUid = inventoryEntity.getCompanyUid();

    if (!companyUid) throw new Error('companyUid is required');

    if (inventoryEntity.getIsDefaultInventory()) return;

    try {
      const inventories =
        await inventoryRepository.getInventoriesByUserUidAndCompanyUid(
          userUid,
          companyUid
        );

      inventoryEntity.setAsDefaultInventory();
      await inventoryRepository.update(inventoryEntity, userUid, companyUid);

      const formerDefaultInventory = inventories.find(
        (retrievedInventory) => retrievedInventory.isDefaultInventory
      );
      if (formerDefaultInventory) {
        formerDefaultInventory.setAsNotDefaultInventory();
        await inventoryRepository.update(
          formerDefaultInventory,
          userUid,
          companyUid
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
