import { BucketNames } from '@/supabase/enums/bucketNames';

import { deleteInventory } from './deleteInventory';

const inventoryRepository = {
  getInventoriesByCompanyId: jest.fn(),
  delete: jest.fn(),
};

const supabaseStorage = {
  from: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
  list: jest.fn().mockReturnThis(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('deleteInventory', () => {
  it('Do not delete the inventory if the companyId is not provided', async () => {
    const companyId = '';
    const inventoryId = 'inventoryId';

    try {
      await deleteInventory(
        inventoryRepository as any,
        supabaseStorage as any
      )({
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('companyId is required to delete inventory');
    }
  });

  it('Do not delete the inventory if the inventoryId is not provided', async () => {
    const companyId = 'companyId';
    const inventoryId = '';

    try {
      await deleteInventory(
        inventoryRepository as any,
        supabaseStorage as any
      )({
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('inventoryId is required to delete inventory');
    }
  });

  it('User cannot delete the last inventory', async () => {
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';

    inventoryRepository.getInventoriesByCompanyId.mockResolvedValue([
      { id: 'inventoryId' },
    ]);

    try {
      await deleteInventory(
        inventoryRepository as any,
        supabaseStorage as any
      )({
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'Vous ne pouvez pas supprimer le dernier inventaire'
      );
    }
  });

  describe('The products have no photo', () => {
    it('Delete the inventory', async () => {
      const companyId = 'companyId';
      const inventoryId = 'inventoryId';

      inventoryRepository.delete.mockResolvedValue(true);
      inventoryRepository.getInventoriesByCompanyId.mockResolvedValue([
        { id: 'inventoryId' },
        { id: 'inventoryId2' },
      ]);

      supabaseStorage.from(BucketNames.PRODUCTS).list.mockResolvedValue({
        data: null,
      });

      await deleteInventory(
        inventoryRepository as any,
        supabaseStorage as any
      )({
        companyId,
        inventoryId,
      });

      expect(inventoryRepository.delete).toHaveBeenCalledTimes(1);
      expect(inventoryRepository.delete).toHaveBeenCalledWith(inventoryId);

      expect(supabaseStorage.remove).toHaveBeenCalledTimes(0);
    });
  });

  describe('The products have photos', () => {
    it('Delete the inventory and delete the inventory folder in the storage', async () => {
      const companyId = 'companyId';
      const inventoryId = 'inventoryId';

      inventoryRepository.delete.mockResolvedValue(true);
      inventoryRepository.getInventoriesByCompanyId.mockResolvedValue([
        { id: 'inventoryId' },
        { id: 'inventoryId2' },
      ]);

      supabaseStorage.from(BucketNames.PRODUCTS).list.mockResolvedValue({
        data: [
          {
            name: 'product1.jpg',
          },
          {
            name: 'product2.jpg',
          },
        ],
      });

      await deleteInventory(
        inventoryRepository as any,
        supabaseStorage as any
      )({
        companyId,
        inventoryId,
      });

      expect(inventoryRepository.delete).toHaveBeenCalledTimes(1);
      expect(inventoryRepository.delete).toHaveBeenCalledWith(inventoryId);

      expect(supabaseStorage.remove).toHaveBeenCalledTimes(1);
      expect(supabaseStorage.remove).toHaveBeenCalledWith([
        'companyId/inventoryId/product1.jpg',
        'companyId/inventoryId/product2.jpg',
      ]);
    });
  });
});
