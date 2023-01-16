import { deleteInventory } from './deleteInventory';

const inventoryRepository = {
  getInventoriesByUserIdAndCompanyId: jest.fn(),
  delete: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not delete the inventory if the userId is not provided', async () => {
    const userId = '';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';

    try {
      await deleteInventory(inventoryRepository as any)({
        userId,
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('userId is required to delete inventory');
    }
  });

  it('Do not delete the inventory if the companyId is not provided', async () => {
    const userId = 'userId';
    const companyId = '';
    const inventoryId = 'inventoryId';

    try {
      await deleteInventory(inventoryRepository as any)({
        userId,
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('companyId is required to delete inventory');
    }
  });

  it('Do not delete the inventory if the inventoryId is not provided', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = '';

    try {
      await deleteInventory(inventoryRepository as any)({
        userId,
        companyId,
        inventoryId,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventoryId is required to delete inventory'
      );
    }
  });

  it('Delete the inventory if the userId, companyId and inventoryId are provided', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';

    await deleteInventory(inventoryRepository as any)({
      userId,
      companyId,
      inventoryId,
    });

    expect(inventoryRepository.delete).toHaveBeenCalledTimes(1);
    expect(inventoryRepository.delete).toHaveBeenCalledWith({
      userId,
      companyId,
      inventoryId,
    });
  });
});
