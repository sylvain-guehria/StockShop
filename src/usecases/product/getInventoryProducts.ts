import { logException } from 'logger';

import type {
  FilterPropertyType,
  SorterType,
} from '@/app/dashboard/inventories/(products-components)/(filters)/ProductsFiltersReducer';
import { ORDER } from '@/app/dashboard/inventories/(products-components)/(filters)/ProductsFiltersReducer';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { ProductRepository } from '@/modules/product/productRepository';
import { ProductAttributes } from '@/modules/product/productType';
import { getKeysWithValues } from '@/utils/objectUtils';

type GetInventoryProductsParamsType = {
  inventoryId: string;
  currentPage: number;
  filters?: FilterPropertyType;
  sorter?: SorterType;
};

export const getInventoryProducts =
  (productRepository: ProductRepository) =>
  async ({
    inventoryId,
    currentPage: currentPageFromParams,
    sorter,
    filters,
  }: GetInventoryProductsParamsType): Promise<{
    count: number;
    products: ProductEntity[];
  }> => {
    const currentPage = currentPageFromParams || 1;
    const numberOfProductsPerPage = 10;
    try {
      if (!inventoryId) {
        throw new Error(
          'inventoryId is required to get user inventoriy products',
        );
      }

      const filtersWithValue = getKeysWithValues(filters as FilterPropertyType);
      let sorterField = sorter?.field || ProductAttributes.UPDATED_AT;

      if (filtersWithValue.length > 0) {
        const sorterFieldIsInFilters = filtersWithValue.includes(sorterField);
        if (sorterFieldIsInFilters) {
          sorterField = ProductAttributes.UPDATED_AT;
        }
      }

      const response = await productRepository.getProductsByInventoryId({
        inventoryId,
        currentPage,
        numberOfProductsPerPage,
        sorter: {
          field: sorterField,
          order: sorter?.order || ORDER.DESC,
        },
        filters: filters as FilterPropertyType,
      });

      return {
        count: response.count,
        products: response.products,
      };
    } catch (error: any) {
      logException(error, {
        when: 'getInventoryProducts usecase',
      });
      throw new Error(error.message);
    }
  };
