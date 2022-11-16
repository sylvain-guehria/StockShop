/* eslint-disable class-methods-use-this */

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

  getById(uid: string): Promise<ProductEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async add(product: ProductEntity): Promise<string> {
    throw new Error(`You tried to call an abstract methode, arg: ${product}`);
  }

  async delete(uid: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async getAll(): Promise<ProductEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(product: ProductEntity): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ product }}`
    );
  }

  async getProductsByUserUidAndInventoryUid(
    userUid: string,
    inventoryUid: string
  ): Promise<ProductEntity[]> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ userUid, inventoryUid }}`
    );
  }
}

export default ProductRepository;
