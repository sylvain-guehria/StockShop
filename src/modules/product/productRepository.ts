/* eslint-disable class-methods-use-this */

import type {
  FilterPropertyType,
  SorterType,
} from '@/components/01-dashboard/products/filters/ProductsFiltersReducer';

import type ProductEntity from './ProductEntity';

/**
 * @abstract
 */
export abstract class ProductRepository {
  constructor() {
    if (this.constructor === ProductRepository) {
      throw new TypeError(
        'Abstract class "ProductRepository" cannot be instantiated, it can only be extended.'
      );
    }
  }

  getById(productId: string): Promise<ProductEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${productId}`);
  }

  async add(product: ProductEntity): Promise<ProductEntity | null> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        product,
      }}`
    );
  }

  async delete(productId: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${productId}`);
  }

  async update(product: ProductEntity): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        product,
      }}`
    );
  }

  async getProductsByInventoryId({
    inventoryId,
    currentPage,
    numberOfProductsPerPage,
    sorter,
    filters,
  }: GetProductsByInventoryId): Promise<{
    count: number;
    products: ProductEntity[];
  }> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        inventoryId,
        currentPage,
        numberOfProductsPerPage,
        sorter,
        filters,
      }}`
    );
  }
}

export default ProductRepository;

export interface GetProductsByInventoryId {
  inventoryId: string;
  currentPage: number;
  numberOfProductsPerPage: number;
  sorter: SorterType;
  filters: FilterPropertyType;
}
