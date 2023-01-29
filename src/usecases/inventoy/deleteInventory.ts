import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';

export interface DeleteInventoryParams {
  companyId: string;
  inventoryId: string;
}

export const deleteInventory =
  (inventoryRepository: InventoryRepository) =>
  async ({ companyId, inventoryId }: DeleteInventoryParams): Promise<void> => {
    try {
      if (!companyId)
        throw new Error('companyId is required to delete inventory');
      if (!inventoryId)
        throw new Error('inventoryId is required to delete inventory');

      const inventories = await inventoryRepository.getInventoriesByCompanyId(
        companyId
      );

      if (inventories && inventories.length <= 1) {
        throw new Error('Vous ne pouvez pas supprimer le dernier inventaire');
      }

      await inventoryRepository.delete(inventoryId);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
