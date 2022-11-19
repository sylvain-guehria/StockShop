import { v4 as uuidV4 } from 'uuid';

import ProductEntity from './ProductEntity';
import type { ProductRepository } from './productRepository';

class ProductService {
  productRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProductByUserUidCompanyUidAndInventoryUid({
    userUid,
    companyUid,
    inventoryUid,
  }: CreateProductParams): Promise<ProductEntity> {
    const uid = uuidV4();

    const product = ProductEntity.new({
      uid,
      label: 'New product',
    });

    return this.productRepository.add({
      product,
      userUid,
      companyUid,
      inventoryUid,
    });
  }
}

export default ProductService;

export type CreateProductParams = {
  userUid: string;
  companyUid: string;
  inventoryUid: string;
};
