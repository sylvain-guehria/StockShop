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
    try {
      if (!userUid) throw new Error('userUid is required to delete inventory');
      if (!companyUid)
        throw new Error('companyUid is required to delete inventory');
      if (!inventoryUid)
        throw new Error('inventoryUid is required to delete inventory');

      await inventoryRepository.delete({
        userUid,
        companyUid,
        inventoryUid,
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
