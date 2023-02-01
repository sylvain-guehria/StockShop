import type { SupabaseClient } from '@supabase/supabase-js';
import {
  CustomFirebaseErrorCodes,
  StorageFirebaseErrorCodes,
} from 'supabase/errorCodes';
import { BucketNames } from 'supabase/tables/bucketNames';

import {
  authorizedFileTypes,
  twoMegaBits,
} from '@/components/01-dashboard/products/editPhotoForm/EditProductFormValidation';
import type ProductEntity from '@/modules/product/ProductEntity';
import type ProductService from '@/modules/product/productService';

type UpdatePhotoProductInterface = {
  companyId: string;
  product: ProductEntity;
  currentFile: File;
};

export const updatePhotoProduct =
  (
    productServiceDi: ProductService,
    supabaseStorage: SupabaseClient<any, 'public', any>['storage']
  ) =>
  async ({
    companyId,
    product,
    currentFile,
  }: UpdatePhotoProductInterface): Promise<ProductEntity> => {
    if (!companyId)
      throw new Error(
        'companyId is required to update the photo of the product'
      );
    if (!product)
      throw new Error('product is required to update the photo of the product');

    if (currentFile && currentFile.size > twoMegaBits)
      throw new Error(StorageFirebaseErrorCodes.fileWrongSize);

    if (currentFile && !authorizedFileTypes.includes(currentFile.type)) {
      throw new Error(CustomFirebaseErrorCodes.imageFileWrongType);
    }

    try {
      const filePath = `${companyId}/${product.getId()}`;
      if (currentFile) {
        const { error } = await supabaseStorage
          .from(BucketNames.PRODUCTS)
          .upload(`${filePath}`, currentFile);

        if (error) throw new Error(error.message);

        const { data } = supabaseStorage
          .from(BucketNames.PRODUCTS)
          .getPublicUrl(`${filePath}`);

        return await productServiceDi.updateProduct(
          product.setPhotoLink(data.publicUrl)
        );
      }

      const { error } = await supabaseStorage
        .from(BucketNames.PRODUCTS)
        .remove([`${filePath}`]);

      if (error) throw new Error(error.message);

      return await productServiceDi.updateProduct(product.setPhotoLink(''));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
