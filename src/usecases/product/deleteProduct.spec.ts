import ProductEntity from '@/modules/product/ProductEntity';
import { BucketNames } from '@/supabase/enums/bucketNames';

import { deleteProduct } from './deleteProduct';

const productRepository = {
  delete: jest.fn(),
};

const supabaseStorage = {
  from: jest.fn().mockReturnThis(),
  remove: jest.fn().mockReturnThis(),
};

const productWithPhoto = ProductEntity.new({
  id: 'productId',
  photoLink: 'photoLink',
  inventoryId: 'inventoryId',
});

const productWithoutPhoto = ProductEntity.new({
  id: 'productId',
  photoLink: '',
  inventoryId: 'inventoryId',
});

describe('deleteProduct', () => {
  it('Do not delete the product if the product is not provided', async () => {
    const companyId = 'companyId';

    try {
      await deleteProduct(
        productRepository as any,
        supabaseStorage as any,
        // @ts-ignore
      )({ product: null, companyId });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('product is required to delete the product');
    }
  });

  it('Do not delete the product if the product has no Id', async () => {
    const companyId = 'companyId';

    try {
      await deleteProduct(
        productRepository as any,
        supabaseStorage as any,
      )({
        product: ProductEntity.new({
          photoLink: 'photoLink',
        }),
        companyId,
      });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('productId is required to delete the product');
    }
  });

  it('Do not delete the product if the companyId is not provided', async () => {
    try {
      await deleteProduct(
        productRepository as any,
        supabaseStorage as any,
      )({ product: productWithPhoto, companyId: '' });
    } catch (error: any) {
      expect(productRepository.delete).toHaveBeenCalledTimes(0);
      expect(error.message).toBe('companyId is required to delete the product');
    }
  });

  it('Delete a product without photo', async () => {
    const companyId = 'companyId';

    productRepository.delete.mockResolvedValue(true);

    await deleteProduct(
      productRepository as any,
      supabaseStorage as any,
    )({ product: productWithoutPhoto, companyId });

    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(productRepository.delete).toHaveBeenCalledWith(
      productWithoutPhoto.getId(),
    );
    expect(supabaseStorage.from).toHaveBeenCalledTimes(0);
    expect(supabaseStorage.remove).toHaveBeenCalledTimes(0);
  });

  it('Delete a product with photo and delete the photo', async () => {
    const companyId = 'companyId';

    productRepository.delete.mockResolvedValue(true);
    supabaseStorage.from(BucketNames.PRODUCTS).remove.mockResolvedValue({
      data: [{ metadata: { httpStatusCode: 200 } }],
    });

    await deleteProduct(
      productRepository as any,
      supabaseStorage as any,
    )({ product: productWithPhoto, companyId });

    expect(productRepository.delete).toHaveBeenCalledTimes(1);
    expect(productRepository.delete).toHaveBeenCalledWith(
      productWithPhoto.getId(),
    );
    expect(
      supabaseStorage.from(BucketNames.PRODUCTS).remove,
    ).toHaveBeenCalledTimes(1);
    expect(
      supabaseStorage.from(BucketNames.PRODUCTS).remove,
    ).toHaveBeenCalledWith(['companyId/inventoryId/productId']);
  });
});
