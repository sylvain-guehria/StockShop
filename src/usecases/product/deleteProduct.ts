import type {
  DeleteProduct,
  ProductRepository,
} from '@/modules/product/productRepository';

export const deleteProduct =
  (productRepository: ProductRepository) =>
  async ({
    productId,
    userId,
    companyId,
    inventoryId,
  }: DeleteProduct): Promise<void> => {
    try {
      if (!userId)
        throw new Error('userId is required to delete the product');
      if (!companyId)
        throw new Error('companyId is required to delete the product');
      if (!inventoryId)
        throw new Error('inventoryId is required to delete the product');

      if (!productId)
        throw new Error('productId is required to delete the product');

      await productRepository.delete({
        userId,
        companyId,
        inventoryId,
        productId,
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
