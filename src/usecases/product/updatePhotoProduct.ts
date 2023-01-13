import {
  CustomFirebaseErrorCodes,
  StorageFirebaseErrorCodes,
} from 'superbase/errorCodes';
import type StorageService from 'superbase/storage';

import {
  authorizedFileTypes,
  twoMegaBits,
} from '@/components/01-dashboard/products/editPhotoForm/EditProductFormValidation';
import type ProductEntity from '@/modules/product/ProductEntity';
import type ProductService from '@/modules/product/productService';

type UpdatePhotoProductInterface = {
  userUid: string;
  companyUid: string;
  product: ProductEntity;
  currentFile: File;
};

export const updatePhotoProduct =
  (productServiceDi: ProductService, storageServiceDi: StorageService) =>
  async ({
    userUid,
    companyUid,
    product,
    currentFile,
  }: UpdatePhotoProductInterface): Promise<ProductEntity> => {
    if (!userUid)
      throw new Error('userUid is required to update the photo of the product');
    if (!companyUid)
      throw new Error(
        'companyUid is required to update the photo of the product'
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
          folderName: `/images/${userUid}`,
          filename: `/${product.getUid()}`,
          uploadedFile: currentFile,
        });

        return await productServiceDi.updateProduct({
          product: product.setPhotoLink(downloadURL),
          userUid,
          companyUid,
        });
      }

      await storageServiceDi.handleDelete({
        folderName: `/images/${userUid}`,
        filename: `/${product.getUid()}`,
      });

      return await productServiceDi.updateProduct({
        product: product.setPhotoLink(''),
        userUid,
        companyUid,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };
