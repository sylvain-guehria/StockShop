import type ProductEntity from '@/modules/product/ProductEntity';
import type { ProductRepository } from '@/modules/product/productRepository';

type GetInventoryProductsParamsType = {
  userUid: string;
  companyUid: string;
  inventoryUid: string;
  currentPage: number;
};

export const getInventoryProducts =
  (productRepository: ProductRepository) =>
  async ({
    userUid,
    inventoryUid,
    companyUid,
    currentPage,
  }: GetInventoryProductsParamsType): Promise<ProductEntity[]> => {
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

      const products =
        await productRepository.getProductsByUserUidCompanyUidInventoryUid({
          userUid,
          inventoryUid,
          companyUid,
          currentPage,
        });
      return products;
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
