import {
  CustomFirebaseErrorCodes,
  FirebaseAuthenticationError,
  StorageFirebaseErrorCodes,
} from 'firebaseFolder/errorCodes';
import type StorageService from 'firebaseFolder/storage';

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
  }: UpdatePhotoProductInterface): Promise<void> => {
    if (!userUid)
      throw new Error('userUid is required to update the photo of the product');
    if (!companyUid)
      throw new Error(
        'companyUid is required to update the photo of the product'
      );
    if (!product)
      throw new Error('product is required to update the photo of the product');

    if (currentFile && currentFile.size > twoMegaBits)
      throw new FirebaseAuthenticationError({
        errorCode: StorageFirebaseErrorCodes.fileWrongSize,
        message: '',
      });

    if (currentFile && !authorizedFileTypes.includes(currentFile.type)) {
      throw new FirebaseAuthenticationError({
        errorCode: CustomFirebaseErrorCodes.imageFileWrongType,
        message: '',
      });
    }

    if (currentFile) {
      Object.defineProperty(currentFile, 'name', {
        writable: true,
        value: product.getLabel(),
      });
      storageServiceDi
        .handleUpload({
          folderName: `/images/${userUid}`,
          filename: `/${product.getUid()}`,
          uploadedFile: currentFile,
        })
        .then(async (downloadURL) => {
          await productServiceDi.updateProduct({
            product: product.setPhotoLink(downloadURL),
            userUid,
            companyUid,
          });
        })
        .catch((error) => {
          throw new FirebaseAuthenticationError(error);
        });
      return;
    }

    await storageServiceDi
      .handleDelete({
        folderName: `/images/${userUid}`,
        filename: `/${product.getUid()}`,
      })
      .then(async () => {
        await productServiceDi.updateProduct({
          product: product.setPhotoLink(''),
          userUid,
          companyUid,
        });
      })
      .catch((error) => {
        throw new FirebaseAuthenticationError(error);
      });
  };
