import { deleteProduct } from './deleteProduct';

const productRepository = {
  delete: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not delete the product if the userId is not provided', async () => {
    const userId = '';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const productId = 'productId';

    try {
      await deleteProduct(productRepository as any)({
        userId,
        companyId,
        inventoryId,
        productId,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('userId is required to delete the product');
    }
  });

  it('Do not delete the product if the companyId is not provided', async () => {
    const userId = 'userId';
    const companyId = '';
    const inventoryId = 'inventoryId';
    const productId = 'productId';

    try {
      await deleteProduct(productRepository as any)({
        userId,
        companyId,
        inventoryId,
        productId,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('companyId is required to delete the product');
    }
  });

  it('Do not delete the product if the inventoryId is not provided', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = '';
    const productId = 'productId';

    try {
      await deleteProduct(productRepository as any)({
        userId,
        companyId,
        inventoryId,
        productId,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventoryId is required to delete the product'
      );
    }
  });

  it('Do not delete the product if the productId is not provided', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const productId = '';

    try {
      await deleteProduct(productRepository as any)({
        userId,
        companyId,
        inventoryId,
        productId,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('productId is required to delete the product');
    }
  });

  it('Delete the inventory if the userId, companyId and inventoryId are provided', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const productId = 'productId';

    await deleteProduct(productRepository as any)({
      userId,
      companyId,
      inventoryId,
      productId,
    });

    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(productRepository.delete).toHaveBeenCalledWith({
      userId,
      companyId,
      inventoryId,
      productId,
    });
  });
});
