import type { AuthorizedOrderProperty } from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';
import { ORDER } from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';
import { ProductAttributes } from '@/modules/product/productType';

import { getInventoryProducts } from './getInventoryProducts';

const productRepository = {
  getProductsByUserUidCompanyUidInventoryUid: jest.fn(),
};

describe('getInventoryProducts', () => {
  it('Should throw an error if userUid is not provided', async () => {
    const userUid = '';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        userUid,
        inventoryUid,
        companyUid,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(
        productRepository.getProductsByUserUidCompanyUidInventoryUid
      ).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'userUid is required to get user inventoriy products'
      );
    }
  });

  it('Should throw an error if companyUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = '';
    const inventoryUid = 'inventoryUid';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        userUid,
        inventoryUid,
        companyUid,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(
        productRepository.getProductsByUserUidCompanyUidInventoryUid
      ).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'companyUid is required to get user inventoriy products'
      );
    }
  });
  it('Should throw an error if inventoryUid is not provided', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = '';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    try {
      await getInventoryProducts(productRepository as any)({
        userUid,
        inventoryUid,
        companyUid,
        currentPage: 1,
        sorter,
        filters,
      });
    } catch (error: any) {
      expect(
        productRepository.getProductsByUserUidCompanyUidInventoryUid
      ).toHaveBeenCalledTimes(0);
      expect(error.message).toBe(
        'inventoryUid is required to get user inventoriy products'
      );
    }
  });
  it('Should call productRepository.getProductsByUserUidCompanyUidInventoryUid with the right params', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const sorter = {
      field: ProductAttributes.LABEL as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {};

    productRepository.getProductsByUserUidCompanyUidInventoryUid.mockResolvedValue(
      {
        products: [],
        count: 0,
      }
    );

    await getInventoryProducts(productRepository as any)({
      userUid,
      inventoryUid,
      companyUid,
      currentPage: 1,
      sorter,
      filters,
    });

    expect(
      productRepository.getProductsByUserUidCompanyUidInventoryUid
    ).toHaveBeenCalledTimes(1);
    expect(
      productRepository.getProductsByUserUidCompanyUidInventoryUid
    ).toHaveBeenCalledWith({
      userUid,
      companyUid,
      inventoryUid,
      currentPage: 1,
      numberOfProductsPerPage: 10,
      sorter,
      filters,
    });
  });
  it('Should change the sorter filed with creationDate if the sorter field is in the filters and has a value', async () => {
    const userUid = 'userUid';
    const companyUid = 'companyUid';
    const inventoryUid = 'inventoryUid';
    const sorter = {
      field: ProductAttributes.TO_BUY as AuthorizedOrderProperty,
      order: ORDER.ASC,
    };

    const filters = {
      [ProductAttributes.TO_BUY]: 'true' as 'true' | 'false',
    };

    productRepository.getProductsByUserUidCompanyUidInventoryUid.mockResolvedValue(
      {
        products: [],
        count: 0,
      }
    );

    await getInventoryProducts(productRepository as any)({
      userUid,
      inventoryUid,
      companyUid,
      currentPage: 1,
      sorter,
      filters,
    });

    expect(
      productRepository.getProductsByUserUidCompanyUidInventoryUid
    ).toHaveBeenCalledTimes(1);
    expect(
      productRepository.getProductsByUserUidCompanyUidInventoryUid
    ).toHaveBeenCalledWith({
      userUid,
      companyUid,
      inventoryUid,
      currentPage: 1,
      numberOfProductsPerPage: 10,
      sorter: {
        field: ProductAttributes.CREATION_DATE as AuthorizedOrderProperty,
        order: ORDER.ASC,
      },
      filters,
    });
  });
});
