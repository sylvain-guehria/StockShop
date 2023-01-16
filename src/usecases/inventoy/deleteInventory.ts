import type {
  DeleteInventoryParams,
  InventoryRepository,
} from '@/modules/inventory/inventoryRepository';

export const deleteInventory =
  (inventoryRepository: InventoryRepository) =>
  async ({
    userId,
    companyId,
    inventoryId,
  }: DeleteInventoryParams): Promise<void> => {
    try {
      if (!userId) throw new Error('userId is required to delete inventory');
      if (!companyId)
        throw new Error('companyId is required to delete inventory');
      if (!inventoryId)
        throw new Error('inventoryId is required to delete inventory');

      const inventories =
        await inventoryRepository.getInventoriesByUserIdAndCompanyId(
          userId,
          companyId
        );

      if (inventories && inventories.length <= 1) {
        throw new Error('Vous ne pouvez pas supprimer le dernier inventaire');
      }

      await inventoryRepository.delete({
        userId,
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
