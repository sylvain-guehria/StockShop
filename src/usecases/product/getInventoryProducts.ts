import type {
  FilterPropertyType,
  SorterType,
} from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';
import { ORDER } from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { ProductRepository } from '@/modules/product/productRepository';
import { ProductAttributes } from '@/modules/product/productType';
import { getKeysWithValues } from '@/utils/objectUtils';

type GetInventoryProductsParamsType = {
  userId: string;
  companyId: string;
  inventoryId: string;
  currentPage: number;
  filters?: FilterPropertyType;
  sorter?: SorterType;
};

export const getInventoryProducts =
  (productRepository: ProductRepository) =>
  async ({
    userId,
    inventoryId,
    companyId,
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
      if (!userId) {
        throw new Error('userId is required to get user inventoriy products');
      }

      if (!companyId) {
        throw new Error(
          'companyId is required to get user inventoriy products'
        );
      }

      if (!inventoryId) {
        throw new Error(
          'inventoryId is required to get user inventoriy products'
        );
      }

      const filtersWithValue = getKeysWithValues(filters as FilterPropertyType);
      let sorterField = sorter?.field || ProductAttributes.CREATION_DATE;

      if (filtersWithValue.length > 0) {
        const sorterFieldIsInFilters = filtersWithValue.includes(sorterField);
        if (sorterFieldIsInFilters) {
          sorterField = ProductAttributes.CREATION_DATE;
        }
      }

      const response =
        await productRepository.getProductsByUserIdCompanyIdInventoryId({
          userId,
          inventoryId,
          companyId,
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
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
