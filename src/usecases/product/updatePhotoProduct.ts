import type { SupabaseClient } from '@supabase/supabase-js';
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

    if (!product.getInventoryId())
      throw new Error('product must be in an inventoryId');

    if (currentFile && currentFile.size > twoMegaBits)
      throw new Error('Le fichier ne doit pas dépasser 2 Mo');
    if (currentFile && !authorizedFileTypes.includes(currentFile.type)) {
      throw new Error(
        'Le fichier doit être une image au format png, jpg ou jpeg'
      );
    }

    try {
      const filePath = `${companyId}/${product.getInventoryId()}/${product.getId()}`;
      if (currentFile) {
        const { error } = await supabaseStorage
          .from(BucketNames.PRODUCTS)
          .upload(`${filePath}`, currentFile);

        if (error) throw new Error(error.message);

        const { data } = await supabaseStorage
          .from(BucketNames.PRODUCTS)
          .getPublicUrl(`${filePath}`);

        return await productServiceDi.updateProduct(
          product.setPhotoLink(data.publicUrl)
        );
      }

      const { error, data } = await supabaseStorage
        .from(BucketNames.PRODUCTS)
        .remove([`${filePath}`]);

      const isDeleted =
        data?.length === 1 && data[0]?.metadata?.httpStatusCode === 200;

      if (error) throw new Error(error.message);
      if (!isDeleted)
        throw new Error(
          "Le fichier n'a pas pu être supprimé, veuillez réessayer"
        );

      return await productServiceDi.updateProduct(product.setPhotoLink(''));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
