import type { AuthorizedOrderProperty } from '@/app/dashboard/inventories/(products-components)/(filters)/ProductsFiltersReducer';
import { ORDER } from '@/app/dashboard/inventories/(products-components)/(filters)/ProductsFiltersReducer';
import { ProductAttributes } from '@/modules/product/productType';

import { getInventoryProducts } from './getInventoryProducts';

const productRepository = {
  getProductsByInventoryId: jest.fn(),
};

describe('getInventoryProducts', () => {
  it('Should throw an error if inventoryId is not provided', async () => {
    const inventoryId = '';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        inventoryId,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(productRepository.getProductsByInventoryId).toHaveBeenCalledTimes(
        0,
      );
      expect(error.message).toBe(
        'inventoryId is required to get user inventoriy products',
      );
    }
  });
  it('Should call productRepository.getProductsByInventoryId with the right params', async () => {
    const inventoryId = 'inventoryId';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    productRepository.getProductsByInventoryId.mockResolvedValue({
      products: [],
      count: 0,
    });

    await getInventoryProducts(productRepository as any)({
      inventoryId,
      currentPage: 1,
      sorter,
      filters,
    });

    expect(productRepository.getProductsByInventoryId).toHaveBeenCalledTimes(1);
    expect(productRepository.getProductsByInventoryId).toHaveBeenCalledWith({
      inventoryId,
      currentPage: 1,
      numberOfProductsPerPage: 10,
      sorter,
      filters,
    });
  });
  it('Should change the sorter filed with createdAt if the sorter field is in the filters and has a value', async () => {
    const inventoryId = 'inventoryId';
    const sorter = {
      field: ProductAttributes.TO_BUY as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {
      [ProductAttributes.TO_BUY]: 'true' as 'true' | 'false',
    };

    productRepository.getProductsByInventoryId.mockResolvedValue({
      products: [],
      count: 0,
    });

    await getInventoryProducts(productRepository as any)({
      inventoryId,
      currentPage: 1,
      sorter,
      filters,
    });

    expect(productRepository.getProductsByInventoryId).toHaveBeenCalledTimes(1);
    expect(productRepository.getProductsByInventoryId).toHaveBeenCalledWith({
      inventoryId,
      currentPage: 1,
      numberOfProductsPerPage: 10,
      sorter: {
        field: ProductAttributes.UPDATED_AT as AuthorizedOrderProperty,
        order: ORDER.ASC,
      },
      filters,
    });
  });
});
