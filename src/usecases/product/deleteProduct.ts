import type { ProductRepository } from '@/modules/product/productRepository';

export const deleteProduct =
  (productRepository: ProductRepository) =>
  async (productId: string): Promise<void> => {
    try {
      if (!productId)
        throw new Error('productId is required to delete the product');

      await productRepository.delete(productId);
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
