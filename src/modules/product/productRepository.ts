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

  getById({
    productId,
    userId,
    companyId,
    inventoryId,
  }: GetProduct): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        productId,
        userId,
        companyId,
        inventoryId,
      }}`
    );
  }

  async add({
    product,
    userId,
    companyId,
  }: AddProduct): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        product,
        userId,
        companyId,
      }}`
    );
  }

  async delete({
    productId,
    userId,
    companyId,
    inventoryId,
  }: DeleteProduct): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        userId,
        companyId,
        inventoryId,
        productId,
      }}`
    );
  }

  async update({
    product,
    userId,
    companyId,
  }: UpdateProduct): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        product,
        userId,
        companyId,
      }}`
    );
  }

  async getProductsByUserIdCompanyIdInventoryId({
    userId,
    inventoryId,
    companyId,
    currentPage,
    numberOfProductsPerPage,
    sorter,
    filters,
  }: GetProductsByUserIdCompanyIdInventoryId): Promise<{
    count: number;
    products: ProductEntity[];
  }> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        userId,
        inventoryId,
        companyId,
        currentPage,
        numberOfProductsPerPage,
        sorter,
        filters,
      }}`
    );
  }
}

export default ProductRepository;

export interface AddProduct {
  product: ProductEntity;
  userId: string;
  companyId: string;
}

export interface UpdateProduct {
  product: ProductEntity;
  userId: string;
  companyId: string;
}

export interface DeleteProduct {
  productId: string;
  inventoryId: string;
  userId: string;
  companyId: string;
}

export interface GetProduct {
  productId: string;
  inventoryId: string;
  userId: string;
  companyId: string;
}

export interface GetProductsByUserIdCompanyIdInventoryId {
  userId: string;
  inventoryId: string;
  companyId: string;
  currentPage: number;
  numberOfProductsPerPage: number;
  sorter: SorterType;
  filters: FilterPropertyType;
}
