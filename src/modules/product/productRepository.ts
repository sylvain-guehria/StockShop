/* eslint-disable class-methods-use-this */

import type { SorterType } from '@/components/01-dashboard/products/ProductsFiltersReducer';

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
    productUid,
    userUid,
    companyUid,
    inventoryUid,
  }: GetProduct): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        productUid,
        userUid,
        companyUid,
        inventoryUid,
      }}`
    );
  }

  async add({
    product,
    userUid,
    companyUid,
  }: AddProduct): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        product,
        userUid,
        companyUid,
      }}`
    );
  }

  async delete({
    productUid,
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteProduct): Promise<void> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        userUid,
        companyUid,
        inventoryUid,
        productUid,
      }}`
    );
  }

  async update({
    product,
    userUid,
    companyUid,
  }: UpdateProduct): Promise<ProductEntity> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        product,
        userUid,
        companyUid,
      }}`
    );
  }

  async getProductsByUserUidCompanyUidInventoryUid({
    userUid,
    inventoryUid,
    companyUid,
    currentPage,
    numberOfProductsPerPage,
    sorter,
  }: GetProductsByUserUidCompanyUidInventoryUid): Promise<{
    count: number;
    products: ProductEntity[];
  }> {
    throw new Error(
      `You tried to call an abstract methode, arg: ${{
        userUid,
        inventoryUid,
        companyUid,
        currentPage,
        numberOfProductsPerPage,
        sorter,
      }}`
    );
  }
}

export default ProductRepository;

export interface AddProduct {
  product: ProductEntity;
  userUid: string;
  companyUid: string;
}

export interface UpdateProduct {
  product: ProductEntity;
  userUid: string;
  companyUid: string;
}

export interface DeleteProduct {
  productUid: string;
  inventoryUid: string;
  userUid: string;
  companyUid: string;
}

export interface GetProduct {
  productUid: string;
  inventoryUid: string;
  userUid: string;
  companyUid: string;
}

export interface GetProductsByUserUidCompanyUidInventoryUid {
  userUid: string;
  inventoryUid: string;
  companyUid: string;
  currentPage: number;
  numberOfProductsPerPage: number;
  sorter: SorterType;
}
