import type StorageService from 'firebaseFolder/storage';

import type ProductEntity from '@/modules/product/ProductEntity';
import type ProductService from '@/modules/product/productService';

interface UpdatePhotoProductInterface {
  userUid: string;
  companyUid: string;
  product: ProductEntity;
  currentFile: File;
}

export const updatePhotoProduct =
  (productServiceDi: ProductService, storageServiceDi: StorageService) =>
  async ({
    userUid,
    companyUid,
    product,
    currentFile,
  }: UpdatePhotoProductInterface): Promise<void> => {
    try {
      if (!userUid)
        throw new Error(
          'userUid is required to update the photo of the product'
        );
      if (!companyUid)
        throw new Error(
          'companyUid is required to update the photo of the product'
        );
      if (!product)
        throw new Error(
          'product is required to update the photo of the product'
        );

      if (currentFile) {
        Object.defineProperty(currentFile, 'name', {
          writable: true,
          value: product.getLabel(),
        });
        await storageServiceDi.handleUpload({
          folderName: `/images/${userUid}`,
          filename: `/${product.getUid()}`,
          uploadedFile: currentFile,
          callBackAfterDownloadSuccess: async (photoLink: string) => {
            await productServiceDi.updateProduct({
              product: product.setPhotoLink(photoLink),
              userUid,
              companyUid,
            });
          },
        });
        return;
      }

      await storageServiceDi.handleDelete({
        folderName: `/images/${userUid}`,
        filename: `/${product.getUid()}`,
        callBackAfterDownloadSuccess: async () => {
          await productServiceDi.updateProduct({
            product: product.setPhotoLink(''),
            userUid,
            companyUid,
          });
        },
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
