import { deleteProduct } from './deleteProduct';

const productRepository = {
  delete: jest.fn(),
};

describe('deleteInventory', () => {
  it('Do not delete the product if the userUid is not provided', async () => {
    const userUid = '';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const productUid = 'productUid';

    try {
      await deleteProduct(productRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
        productUid,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('userUid is required to delete the product');
    }
  });

  it('Do not delete the product if the companyUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = '';
    const inventoryUid = 'inventoryUid';
    const productUid = 'productUid';

    try {
      await deleteProduct(productRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
        productUid,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'companyUid is required to delete the product'
      );
    }
  });

  it('Do not delete the product if the inventoryUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = '';
    const productUid = 'productUid';

    try {
      await deleteProduct(productRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
        productUid,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventoryUid is required to delete the product'
      );
    }
  });

  it('Do not delete the product if the productUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const productUid = '';

    try {
      await deleteProduct(productRepository as any)({
        userUid,
        companyUid,
        inventoryUid,
        productUid,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'productUid is required to delete the product'
      );
    }
  });

  it('Delete the inventory if the userUid, companyUid and inventoryUid are provided', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const productUid = 'productUid';

    await deleteProduct(productRepository as any)({
      userUid,
      companyUid,
      inventoryUid,
      productUid,
    });

    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(productRepository.delete).toHaveBeenCalledWith({
      userUid,
      companyUid,
      inventoryUid,
      productUid,
    });
  });
});
