import type {
  FilterPropertyType,
  SorterType,
} from '@/components/01-dashboard/products/ProductsFiltersReducer';
import { ORDER } from '@/components/01-dashboard/products/ProductsFiltersReducer';
import type ProductEntity from '@/modules/product/ProductEntity';
import type { ProductRepository } from '@/modules/product/productRepository';
import { ProductAttributes } from '@/modules/product/productType';

type GetInventoryProductsParamsType = {
  userUid: string;
  companyUid: string;
  inventoryUid: string;
  currentPage: number;
  filters?: FilterPropertyType;
  sorter?: SorterType;
};

export const getInventoryProducts =
  (productRepository: ProductRepository) =>
  async ({
    userUid,
    inventoryUid,
    companyUid,
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
      if (!userUid) {
        throw new Error('userUid is required to get user inventoriy products');
      }
      if (!inventoryUid) {
        throw new Error(
          'inventoryUid is required to get user inventoriy products'
        );
      }

      if (!companyUid) {
        throw new Error(
          'companyUid is required to get user inventoriy products'
        );
      }

      const response =
        await productRepository.getProductsByUserUidCompanyUidInventoryUid({
          userUid,
          inventoryUid,
          companyUid,
          currentPage,
          numberOfProductsPerPage,
          sorter: {
            field: sorter?.field || ProductAttributes.CREATION_DATE,
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
