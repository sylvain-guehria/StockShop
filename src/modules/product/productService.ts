import { v4 as uuidV4 } from 'uuid';

import ProductEntity from './ProductEntity';
import type { ProductRepository } from './productRepository';
import type { Product } from './productType';

class ProductService {
  productRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async createProductInInventory(inventoryId: string): Promise<ProductEntity> {
    const id = uuidV4();

    const product = ProductEntity.new({
      id,
      label: 'New product',
      inventoryId,
      createdAt: new Date().toISOString(),
    });

    return this.productRepository.add(product);
  }

  async updateProduct(product: Product): Promise<ProductEntity> {
    return this.productRepository.update(
      ProductEntity.new({
        ...product,
      })
    );
  }
}

export default ProductService;
