import {
  CustomFirebaseErrorCodes,
  StorageFirebaseErrorCodes,
} from 'supabase/errorCodes';
import type StorageService from 'supabase/storage';

import {
  authorizedFileTypes,
  twoMegaBits,
} from '@/components/01-dashboard/products/editPhotoForm/EditProductFormValidation';
import type ProductEntity from '@/modules/product/ProductEntity';
import type ProductService from '@/modules/product/productService';

type UpdatePhotoProductInterface = {
  userId: string;
  companyId: string;
  product: ProductEntity;
  currentFile: File;
};

export const updatePhotoProduct =
  (productServiceDi: ProductService, storageServiceDi: StorageService) =>
  async ({
    userId,
    companyId,
    product,
    currentFile,
  }: UpdatePhotoProductInterface): Promise<ProductEntity> => {
    if (!userId)
      throw new Error('userId is required to update the photo of the product');
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
      if (currentFile) {
        const downloadURL = await storageServiceDi.handleUpload({
          folderName: `/images/${userId}`,
          filename: `/${product.getId()}`,
          uploadedFile: currentFile,
        });

        return await productServiceDi.updateProduct({
          product: product.setPhotoLink(downloadURL),
          userId,
          companyId,
        });
      }

      await storageServiceDi.handleDelete({
        folderName: `/images/${userId}`,
        filename: `/${product.getId()}`,
      });

      return await productServiceDi.updateProduct({
        product: product.setPhotoLink(''),
        userId,
        companyId,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
