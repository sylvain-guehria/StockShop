import { deleteInventory } from './deleteInventory';

const inventoryRepository = {
  getInventoriesByUserUidAndCompanyUid: jest.fn(),
  delete: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not delete the inventory if the userUid is not provided', async () => {
    const userUid = '';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';

    try {
      await deleteInventory(inventoryRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('userUid is required to delete inventory');
    }
  });

  it('Do not delete the inventory if the companyUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = '';
    const inventoryUid = 'inventoryUid';

    try {
      await deleteInventory(inventoryRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('companyUid is required to delete inventory');
    }
  });

  it('Do not delete the inventory if the inventoryUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = '';

    try {
      await deleteInventory(inventoryRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
      });
    } catch (error: any) {
      expect(inventoryRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventoryUid is required to delete inventory'
      );
    }
  });

  it('Delete the inventory if the userUid, companyUid and inventoryUid are provided', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';

    await deleteInventory(inventoryRepository as any)({
      userUid,
      companyUid,
      inventoryUid,
    });

    expect(inventoryRepository.delete).toHaveBeenCalledTimes(1);
    expect(inventoryRepository.delete).toHaveBeenCalledWith({
      userUid,
      companyUid,
      inventoryUid,
    });
  });
});
