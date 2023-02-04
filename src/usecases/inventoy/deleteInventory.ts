import type { SupabaseClient } from '@supabase/supabase-js';
import { BucketNames } from 'supabase/tables/bucketNames';

import type { InventoryRepository } from '@/modules/inventory/inventoryRepository';

export interface DeleteInventoryParams {
  companyId: string;
  inventoryId: string;
}

export const deleteInventory =
  (
    inventoryRepository: InventoryRepository,
    supabaseStorage: SupabaseClient<any, 'public', any>['storage']
  ) =>
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

      const success = await inventoryRepository.delete(inventoryId);

      if (!success) throw new Error('Error while deleting the inventory');

      const inventoryFolderPath = `${companyId}/${inventoryId}`;

      const { error: listError, data: listOfFiles } = await supabaseStorage
        .from(BucketNames.PRODUCTS)
        .list(inventoryFolderPath);

      if (!listOfFiles || !listOfFiles.length) return;

      if (listError) {
        // eslint-disable-next-line no-console
        console.error(
          `Error when listing the storage folder ${inventoryFolderPath}. The inventory has been deleted though`,
          listError
        );
      }

      const filesToRemove = listOfFiles.map(
        (file) => `${inventoryFolderPath}/${file.name}`
      );

      if (!filesToRemove || !filesToRemove.length) return;

      const { error } = await supabaseStorage
        .from(BucketNames.PRODUCTS)
        .remove(filesToRemove);

      if (error) {
        // eslint-disable-next-line no-console
        console.error(
          `Error when deleting the storage folder ${inventoryFolderPath}. The inventory has been deleted though`,
          error
        );
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
