import type { SupabaseClient } from '@supabase/supabase-js';

import ProductEntity from '@/modules/product/ProductEntity';

import { updatePhotoProduct } from './updatePhotoProduct';

const productServiceDi = {
  updateProduct: jest.fn(),
};

const supabaseStorage = jest.fn() as unknown as SupabaseClient<
  any,
  'public',
  any
>['storage'];

describe('updatePhotoProduct', () => {
  it('Should throw an error if companyId is not provided', async () => {
    const companyId = '';
    const product = ProductEntity.new({
      id: 'id',
      label: 'label',
    });
    const currentFile = new File([''], 'filename', { type: 'image/png' });

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile,
      });
    } catch (error: any) {
      expect(supabaseStorage.from).toHaveBeenCalledTimes(0);
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);

      expect(error.message).toBe(
        'companyId is required to update the photo of the product'
      );
    }
  });
  it('Should throw an error if product is not provided', async () => {
    const companyId = 'companyId';
    const product = null;
    const currentFile = new File([''], 'filename', { type: 'image/png' });

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product: product as any,
        currentFile,
      });
    } catch (error: any) {
      expect(supabaseStorage.from).toHaveBeenCalledTimes(0);
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'product is required to update the photo of the product'
      );
    }
  });
  it('Should throw an error if currentFile is bigger than 2MB', async () => {
    const companyId = 'companyId';

    const twoMegaBits = 2 * 1024 * 1024;
    const product = ProductEntity.new({
      id: 'id',
      label: 'label',
    });
    const currentFile = {
      size: twoMegaBits + 1,
    };

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile: currentFile as File,
      });
    } catch (error: any) {
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);
      expect(error.errorCode).toBe('storage/server-file-wrong-size');
    }
  });
  it('Should throw an error if currentFile is not an image', async () => {
    const companyId = 'companyId';

    const product = ProductEntity.new({
      id: 'id',
      label: 'label',
    });
    const currentFile = new File([''], 'filename', { type: 'text/plain' });

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile,
      });
    } catch (error: any) {
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);
      expect(error.errorCode).toBe('storage/server-image-file-wrong-type');
    }
  });
  describe('When currentFile is valid', () => {
    it('Should name the file with the product id and save it in firestore a folder named with the user id', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
      });
      const currentFile = new File([''], 'filename', { type: 'image/png' });

      supabaseStorage.from.upload.mockResolvedValue('downloadURL');

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile,
      });

      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(1);
      expect(supabaseStorage.handleUpload).toHaveBeenCalledWith({
        filename: '/productId',
        folderName: '/images/userId',
        uploadedFile: currentFile,
      });
    });
    it('Should update the product with the downloadURL', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
      });
      const currentFile = new File([''], 'filename', { type: 'image/png' });

      supabaseStorage.handleUpload.mockResolvedValue('downloadURL');

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile,
      });

      const expectedProduct = ProductEntity.new({
        id: 'productId',
        label: 'label',
        photoLink: 'downloadURL',
      });

      expect(productServiceDi.updateProduct).toHaveBeenCalledTimes(1);
      expect(productServiceDi.updateProduct).toHaveBeenCalledWith({
        companyId,

        product: expectedProduct,
      });
    });
  });
  describe('When there is no file', () => {
    it('Should delete the file in firestore', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        photoLink: 'photoLink',
      });
      const currentFile = null;

      supabaseStorage.handleDelete.mockResolvedValue({});

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile: currentFile as any,
      });

      expect(supabaseStorage.handleDelete).toHaveBeenCalledTimes(1);
      expect(supabaseStorage.handleDelete).toHaveBeenCalledWith({
        filename: '/productId',
        folderName: '/images/userId',
      });
    });
    it('Should update the product with an empty downloadURL', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        photoLink: 'photoLink',
      });
      const currentFile = null;

      const expectedProduct = ProductEntity.new({
        id: 'productId',
        label: 'label',
        photoLink: '',
      });

      supabaseStorage.handleDelete.mockResolvedValue({});

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage
      )({
        companyId,
        product,
        currentFile: currentFile as any,
      });

      expect(productServiceDi.updateProduct).toHaveBeenCalledTimes(1);
      expect(productServiceDi.updateProduct).toHaveBeenCalledWith({
        companyId,

        product: expectedProduct,
      });
    });
  });
});
