import { v4 as uuidV4 } from 'uuid';

import ProductEntity from './ProductEntity';
import type { ProductRepository } from './productRepository';
import type { Product } from './productType';

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
      inventoryUid,
    });

    return this.productRepository.add({
      product,
      userUid,
      companyUid,
    });
  }

  async updateProduct({
    product,
    userUid,
    companyUid,
  }: UpdateProductParams): Promise<ProductEntity> {
    return this.productRepository.update({
      product: ProductEntity.new({
        ...product,
      }),
      userUid,
      companyUid,
    });
  }
}

export default ProductService;

export interface UpdateProductParams {
  userUid: string;
  companyUid: string;
  product: Product;
}

export interface CreateProductParams {
  userUid: string;
  companyUid: string;
  inventoryUid: string;
}
