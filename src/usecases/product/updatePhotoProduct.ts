/* eslint-disable no-new */
import type { SupabaseClient } from '@supabase/supabase-js';
import { logException } from 'logger';

import {
  authorizedFileTypes,
  oneMegaBits,
} from '@/app/dashboard/inventories/(products-components)/(editPhotoForm)/EditProductFormValidation';
import type ProductEntity from '@/modules/product/ProductEntity';
import type ProductService from '@/modules/product/productService';
import { BucketNames } from '@/supabase/enums/bucketNames';
import { compressFile } from '@/utils/compressor';

type UpdatePhotoProductInterface = {
  companyId: string;
  product: ProductEntity;
  currentFile: File | null;
};

export const updatePhotoProduct =
  (
    productServiceDi: ProductService,
    supabaseStorage: SupabaseClient<any, 'public', any>['storage'],
  ) =>
  async ({
    companyId,
    product,
    currentFile,
  }: UpdatePhotoProductInterface): Promise<ProductEntity | null> => {
    let uploadedFile: File | null = currentFile;

    if (!companyId)
      throw new Error(
        'companyId is required to update the photo of the product',
      );
    if (!product)
      throw new Error('product is required to update the photo of the product');

    if (!product.getInventoryId())
      throw new Error('product must be in an inventoryId');

    if (uploadedFile && !authorizedFileTypes.includes(uploadedFile.type)) {
      throw new Error(
        'Le fichier doit être une image au format png, jpg ou jpeg',
      );
    }

    if (uploadedFile && uploadedFile.size > oneMegaBits) {
      let quality = 0.8;
      const twoMegaBits = oneMegaBits * 2;
      const threeMegaBits = oneMegaBits * 3;
      const fourMegaBits = oneMegaBits * 4;
      const fiveMegaBits = oneMegaBits * 5;

      if (uploadedFile.size > fiveMegaBits) {
        quality = 0.2;
      } else if (uploadedFile.size > fourMegaBits) {
        quality = 0.4;
      } else if (uploadedFile.size > threeMegaBits) {
        quality = 0.6;
      } else if (uploadedFile.size > twoMegaBits) {
        quality = 0.7;
      } else if (uploadedFile.size > oneMegaBits) {
        quality = 0.8;
      }

      try {
        const compressedFile = await compressFile(uploadedFile, {
          quality,
          convertSize: oneMegaBits,
        });
        uploadedFile = compressedFile as File;
      } catch (error: any) {
        logException(error, { when: 'during compression' });
      }
    }

    try {
      const filePath = `${companyId}/${product.getInventoryId()}/${product.getId()}`;
      if (uploadedFile) {
        const { error } = await supabaseStorage
          .from(BucketNames.PRODUCTS)
          .upload(`${filePath}`, uploadedFile);

        if (error) throw new Error(error.message);

        const { data } = await supabaseStorage
          .from(BucketNames.PRODUCTS)
          .getPublicUrl(`${filePath}`);

        return await productServiceDi.updateProduct(
          product.setPhotoLink(data.publicUrl),
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
          "Le fichier n'a pas pu être supprimé, veuillez réessayer",
        );

      return await productServiceDi.updateProduct(product.setPhotoLink(''));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
