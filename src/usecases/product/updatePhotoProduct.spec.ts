import ProductEntity from '@/modules/product/ProductEntity';

import { updatePhotoProduct } from './updatePhotoProduct';

const productServiceDi = {
  updateProduct: jest.fn(),
};

const supabaseStorage = {
  from: jest.fn().mockReturnThis(),
  upload: jest.fn().mockReturnThis(),
  getPublicUrl: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

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
        supabaseStorage as any
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
        supabaseStorage as any
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
  it('Should throw an error if the product has no inventory', async () => {
    const companyId = 'companyId';
    const product = ProductEntity.new({
      id: 'id',
      label: 'label',
    });
    const currentFile = new File([''], 'filename', { type: 'image/png' });

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile,
      });
    } catch (error: any) {
      expect(supabaseStorage.from).toHaveBeenCalledTimes(0);
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);

      expect(error.message).toBe('product must be in an inventoryId');
    }
  });
  it('Should throw an error if currentFile is bigger than 1MB', async () => {
    const companyId = 'companyId';

    const oneMegaBits = 1 * 1024 * 1024;
    const product = ProductEntity.new({
      id: 'id',
      label: 'label',
      inventoryId: 'inventoryId',
    });
    const currentFile = {
      size: oneMegaBits + 1,
    };

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile: currentFile as File,
      });
    } catch (error: any) {
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('Le fichier ne doit pas dépasser 2 Mo');
    }
  });
  it('Should throw an error if currentFile is not a png, jpg or jpeg image', async () => {
    const companyId = 'companyId';
    const product = ProductEntity.new({
      id: 'id',
      label: 'label',
      inventoryId: 'inventoryId',
    });
    const currentFile = new File([''], 'filename', { type: 'text/plain' });

    try {
      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile,
      });
    } catch (error: any) {
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'Le fichier doit être une image au format png, jpg ou jpeg'
      );
    }
  });
  describe('When currentFile is valid', () => {
    it('Should name the file with the product id and save it in companyId/inventoryId/', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
      });
      const currentFile = new File([''], 'filename', { type: 'image/png' });

      supabaseStorage
        .from('products')
        .upload.mockResolvedValue({ error: null });

      supabaseStorage.from('products').getPublicUrl.mockResolvedValue({
        data: { publicUrl: 'newPublicUrl' },
      });

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile,
      });

      expect(supabaseStorage.from('products').upload).toHaveBeenCalledTimes(1);
      expect(supabaseStorage.from('products').upload).toHaveBeenCalledWith(
        `companyId/inventoryId/${product.id}`,
        currentFile
      );
    });
    it('Should update the product with the Public Url', async () => {
      const companyId = 'companyId';
      const createdAt = new Date().toISOString();

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        createdAt,
      });
      const currentFile = new File([''], 'filename', { type: 'image/png' });

      supabaseStorage
        .from('products')
        .upload.mockResolvedValue({ error: null });

      supabaseStorage.from('products').getPublicUrl.mockResolvedValue({
        data: { publicUrl: 'newPublicUrl' },
      });

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile,
      });

      const expectedProduct = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        photoLink: 'newPublicUrl',
        createdAt,
      });

      expect(productServiceDi.updateProduct).toHaveBeenCalledTimes(1);
      expect(productServiceDi.updateProduct).toHaveBeenCalledWith(
        expectedProduct
      );
    });
  });
  describe('When there is no file', () => {
    it('Should delete the file in the storage', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        photoLink: 'photoLink',
      });
      const currentFile = null;

      supabaseStorage.from('products').remove.mockResolvedValue({
        data: [{ metadata: { httpStatusCode: 200 } }],
      });

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile: currentFile as any,
      });

      expect(supabaseStorage.from('products').remove).toHaveBeenCalledTimes(1);
      expect(supabaseStorage.from('products').remove).toHaveBeenCalledWith([
        `companyId/inventoryId/${product.id}`,
      ]);
    });
    it('Should update the product with an empty string', async () => {
      const companyId = 'companyId';
      const createdAt = new Date().toISOString();

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        photoLink: 'photoLink',
        createdAt,
      });
      const currentFile = null;

      const expectedProduct = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        photoLink: '',
        createdAt,
      });

      supabaseStorage.from('products').remove.mockResolvedValue({
        data: [{ metadata: { httpStatusCode: 200 } }],
      });

      await updatePhotoProduct(
        productServiceDi as any,
        supabaseStorage as any
      )({
        companyId,
        product,
        currentFile: currentFile as any,
      });

      expect(productServiceDi.updateProduct).toHaveBeenCalledTimes(1);
      expect(productServiceDi.updateProduct).toHaveBeenCalledWith(
        expectedProduct
      );
    });
    it('Should not update the product if there is an error when deleting the photo', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        photoLink: 'photoLink',
      });
      const currentFile = null;

      supabaseStorage.from('products').remove.mockResolvedValue({
        error: { message: 'error when deleting' },
      });

      try {
        await updatePhotoProduct(
          productServiceDi as any,
          supabaseStorage as any
        )({
          companyId,
          product,
          currentFile: currentFile as any,
        });
      } catch (error: any) {
        expect(error.message).toBe('error when deleting');
        expect(productServiceDi.updateProduct).toHaveBeenCalledTimes(0);
      }
    });
    it('Should not update the product if a status 200 is not returned when deleting the photo', async () => {
      const companyId = 'companyId';

      const product = ProductEntity.new({
        id: 'productId',
        label: 'label',
        inventoryId: 'inventoryId',
        photoLink: 'photoLink',
      });
      const currentFile = null;

      supabaseStorage.from('products').remove.mockResolvedValue({
        data: [{ metadata: { httpStatusCode: 400 } }],
      });

      try {
        await updatePhotoProduct(
          productServiceDi as any,
          supabaseStorage as any
        )({
          companyId,
          product,
          currentFile: currentFile as any,
        });
      } catch (error: any) {
        expect(error.message).toBe(
          "Le fichier n'a pas pu être supprimé, veuillez réessayer"
        );
        expect(productServiceDi.updateProduct).toHaveBeenCalledTimes(0);
      }
    });
  });
});
