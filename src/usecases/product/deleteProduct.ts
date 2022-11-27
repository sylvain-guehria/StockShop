import type {
  DeleteProduct,
  ProductRepository,
} from '@/modules/product/productRepository';

export const deleteProduct =
  (productRepository: ProductRepository) =>
  async ({
    productUid,
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteProduct): Promise<void> => {
    try {
      if (!userUid)
        throw new Error('userUid is required to delete the product');
      if (!companyUid)
        throw new Error('companyUid is required to delete the product');
      if (!inventoryUid)
        throw new Error('inventoryUid is required to delete the product');

      if (!productUid)
        throw new Error('productUid is required to delete the product');

      await productRepository.delete({
        userUid,
        companyUid,
        inventoryUid,
        productUid,
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
