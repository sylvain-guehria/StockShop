import type {
  DeleteInventoryParams,
  InventoryRepository,
} from '@/modules/inventory/inventoryRepository';

export const deleteInventory =
  (inventoryRepository: InventoryRepository) =>
  async ({
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteInventoryParams): Promise<void> => {
    if (!userUid) throw new Error('userUid is required');
    if (!companyUid) throw new Error('companyUid is required');
    if (!inventoryUid) throw new Error('inventoryUid is required');

    try {
      const inventories =
        await inventoryRepository.getInventoriesByUserUidAndCompanyUid(
          userUid,
          companyUid
        );
      if (!inventories || inventories.length <= 1) {
        throw new Error('You can not delete the last inventory');
      }
      await inventoryRepository.delete({
        userUid,
        companyUid,
        inventoryUid,
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error------------', error);
    }
  };
