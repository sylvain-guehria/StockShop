import type ProductEntity from '@/modules/product/ProductEntity';
import type { ProductRepository } from '@/modules/product/productRepository';

export const deleteProduct =
  (productRepository: ProductRepository) =>
  async (product: ProductEntity): Promise<void> => {
    try {
      if (!product)
        throw new Error('product is required to delete the product');

      if (!product.getId())
        throw new Error('productId is required to delete the product');

      const success = await productRepository.delete(product.getId());

      if (!success) throw new Error('Error while deleting the product');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
