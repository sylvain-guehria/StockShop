import type { CompanyRepository } from '@/modules/company/companyRepository';
import type CompanyService from '@/modules/company/companyService';
import type { ProductRepository } from '@/modules/product/productRepository';

export const getInventoryProducts =
  (
    companyRepository: CompanyRepository,
    companyServiceDi: CompanyService,
    productRepository: ProductRepository
  ) =>
  async ({
    userUid,
    inventoryUid,
  }: {
    userUid: string;
    inventoryUid: string;
  }): Promise<void> => {
    try {
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.log('error', error);
      throw new Error(error.message);
    }
  };
