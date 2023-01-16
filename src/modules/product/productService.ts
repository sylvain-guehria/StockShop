import { v4 as uuidV4 } from 'uuid';

import ProductEntity from './ProductEntity';
import type { ProductRepository } from './productRepository';
import type { Product } from './productType';

class ProductService {
  productRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProductByUserIdCompanyIdAndInventoryId({
    userId,
    companyId,
    inventoryId,
  }: CreateProductParams): Promise<ProductEntity> {
    const id = uuidV4();

    const product = ProductEntity.new({
      id,
      label: 'New product',
      inventoryId,
      creationDate: Date.now(),
    });

    return this.productRepository.add({
      product,
      userId,
      companyId,
    });
  }

  async updateProduct({
    product,
    userId,
    companyId,
  }: UpdateProductParams): Promise<ProductEntity> {
    return this.productRepository.update({
      product: ProductEntity.new({
        ...product,
      }),
      userId,
      companyId,
    });
  }
}

export default ProductService;

export interface UpdateProductParams {
  userId: string;
  companyId: string;
  product: Product;
}

export interface CreateProductParams {
  userId: string;
  companyId: string;
  inventoryId: string;
}
