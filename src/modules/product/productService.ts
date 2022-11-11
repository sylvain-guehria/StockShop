import type { ProductRepository } from './productRepository';

class ProductService {
  productRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }
}

export default ProductService;
