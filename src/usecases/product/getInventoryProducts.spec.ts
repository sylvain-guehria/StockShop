import type { AuthorizedOrderProperty } from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';
import { ORDER } from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';
import { ProductAttributes } from '@/modules/product/productType';

import { getInventoryProducts } from './getInventoryProducts';

const productRepository = {
  getProductsByUserIdCompanyIdInventoryId: jest.fn(),
};

describe('getInventoryProducts', () => {
  it('Should throw an error if userId is not provided', async () => {
    const userId = '';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        userId,
        inventoryId,
        companyId,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(
        productRepository.getProductsByUserIdCompanyIdInventoryId
      ).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'userId is required to get user inventoriy products'
      );
    }
  });

  it('Should throw an error if companyId is not provided', async () => {
    const userId = 'userId';
    const companyId = '';
    const inventoryId = 'inventoryId';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        userId,
        inventoryId,
        companyId,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(
        productRepository.getProductsByUserIdCompanyIdInventoryId
      ).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'companyId is required to get user inventoriy products'
      );
    }
  });
  it('Should throw an error if inventoryId is not provided', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = '';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        userId,
        inventoryId,
        companyId,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(
        productRepository.getProductsByUserIdCompanyIdInventoryId
      ).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventoryId is required to get user inventoriy products'
      );
    }
  });
  it('Should call productRepository.getProductsByUserIdCompanyIdInventoryId with the right params', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    productRepository.getProductsByUserIdCompanyIdInventoryId.mockResolvedValue(
      {
        products: [],
        count: 0,
      }
    );

    await getInventoryProducts(productRepository as any)({
      userId,
      inventoryId,
      companyId,
      currentPage: 1,
      sorter,
      filters,
    });

    expect(
      productRepository.getProductsByUserIdCompanyIdInventoryId
    ).toHaveBeenCalledTimes(1);
    expect(
      productRepository.getProductsByUserIdCompanyIdInventoryId
    ).toHaveBeenCalledWith({
      userId,
      companyId,
      inventoryId,
      currentPage: 1,
      numberOfProductsPerPage: 10,
      sorter,
      filters,
    });
  });
  it('Should change the sorter filed with createdAt if the sorter field is in the filters and has a value', async () => {
    const userId = 'userId';
    const companyId = 'companyId';
    const inventoryId = 'inventoryId';
    const sorter = {
      field: ProductAttributes.TO_BUY as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {
      [ProductAttributes.TO_BUY]: 'true' as 'true' | 'false',
    };

    productRepository.getProductsByUserIdCompanyIdInventoryId.mockResolvedValue(
      {
        products: [],
        count: 0,
      }
    );

    await getInventoryProducts(productRepository as any)({
      userId,
      inventoryId,
      companyId,
      currentPage: 1,
      sorter,
      filters,
    });

    expect(
      productRepository.getProductsByUserIdCompanyIdInventoryId
    ).toHaveBeenCalledTimes(1);
    expect(
      productRepository.getProductsByUserIdCompanyIdInventoryId
    ).toHaveBeenCalledWith({
      userId,
      companyId,
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
