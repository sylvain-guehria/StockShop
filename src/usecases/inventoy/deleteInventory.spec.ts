import { deleteInventory } from './deleteInventory';

const inventoryRepository = {
  getInventoriesByCompanyId: jest.fn(),
  delete: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not delete the inventory if the userId is not provided', async () => {
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';

    try {
      await deleteInventory(inventoryRepository as any)({
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('userId is required to delete inventory');
    }
  });

  it('Do not delete the inventory if the companyId is not provided', async () => {
    const companyId = '';
    const inventoryId = 'inventoryId';

    try {
      await deleteInventory(inventoryRepository as any)({
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
      await deleteInventory(inventoryRepository as any)({
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
      await deleteInventory(inventoryRepository as any)({
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

  it('Delete the inventory if the userId, companyId and inventoryId are provided', async () => {
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';

    inventoryRepository.getInventoriesByCompanyId.mockResolvedValue([
      { id: 'inventoryId' },
      { id: 'inventoryId2' },
    ]);

    await deleteInventory(inventoryRepository as any)({
      companyId,
      inventoryId,
    });

    expect(inventoryRepository.delete).toHaveBeenCalledTimes(1);
    expect(inventoryRepository.delete).toHaveBeenCalledWith(inventoryId);
  });
});
