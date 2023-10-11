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

    const createdProduct = await this.productRepository.add(
      ProductEntity.new({
        id,
        label: 'New product',
        inventoryId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    );

    if (!createdProduct) throw new Error('Product not created');

    return createdProduct as ProductEntity;
  }

  async updateProduct(product: Product): Promise<ProductEntity | null> {
    return this.productRepository.update(ProductEntity.new(product));
  }
}

export default ProductService;
