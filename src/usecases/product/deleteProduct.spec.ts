import { deleteProduct } from './deleteProduct';

const productRepository = {
  delete: jest.fn(),
};

describe('deleteProduct', () => {
  it('Do not delete the product if the productId is not provided', async () => {
    const productId = '';

    try {
      await deleteProduct(productRepository as any)(productId);
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('productId is required to delete the product');
    }
  });

  it('Delete the product', async () => {
    const productId = 'productId';

    await deleteProduct(productRepository as any)(productId);

    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(productRepository.delete).toHaveBeenCalledWith(productId);
  });
});
