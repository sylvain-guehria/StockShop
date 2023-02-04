import type { SupabaseClient } from '@supabase/supabase-js';
import { BucketNames } from 'supabase/tables/bucketNames';

import type ProductEntity from '@/modules/product/ProductEntity';
import type { ProductRepository } from '@/modules/product/productRepository';

export const deleteProduct =
  (
    productRepository: ProductRepository,
    supabaseStorage: SupabaseClient<any, 'public', any>['storage']
  ) =>
  async ({
    product,
    companyId,
  }: {
    product: ProductEntity;
    companyId: string;
  }): Promise<void> => {
    try {
      if (!product)
        throw new Error('product is required to delete the product');

      if (!product.getId())
        throw new Error('productId is required to delete the product');

      if (!companyId)
        throw new Error('companyId is required to delete the product');

      const success = await productRepository.delete(product.getId());

      if (!success) throw new Error('Error while deleting the product');

      const photoLink = product.getPhotoLink();

      if (!photoLink) return;

      const filePath = `${companyId}/${product.getInventoryId()}/${product.getId()}`;

      const { error, data } = await supabaseStorage
        .from(BucketNames.PRODUCTS)
        .remove([`${filePath}`]);

      const isDeleted =
        data?.length === 1 && data[0]?.metadata?.httpStatusCode === 200;

      if (!isDeleted) {
        // eslint-disable-next-line no-console
        console.error(
          'Error when deleting a photo. The product has been deleted though',
          error
        );
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
