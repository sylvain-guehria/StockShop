/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import type { GetProductsByInventoryId } from './productRepository';
import { ProductRepository } from './productRepository';

class SupabaseProductRepository extends ProductRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(productId: string): Promise<ProductEntity | null> {
    console.info('get product in db with id: ', productId);
    const { data } = await axios.get(
      `${this.baseUrl}/api/product/${productId}/`,
    );
    console.log('data: ', data);
    return data ? ProductEntity.new(data) : null;
  }

  async add(product: ProductEntity): Promise<ProductEntity | null> {
    console.info('adding product in db...');
    const { data } = await axios.post(
      `${this.baseUrl}/api/product/add/`,
      product,
    );
    console.info('Product added in DB, id: ', product.getId());

    return data ? ProductEntity.new(data) : null;
  }

  async update(product: ProductEntity): Promise<ProductEntity | null> {
    console.info('update product id: ', product.getId());
    const { data } = await axios.post(
      `${this.baseUrl}/api/product/${product.getId()}/`,
      product,
    );

    return data ? ProductEntity.new(data) : null;
  }

  async delete(productId: string): Promise<boolean> {
    console.info(`Deleting product with id ${productId} in db...`);
    const { data } = await axios.delete(`${this.baseUrl}/api/product/delete/`, {
      params: {
        productId,
      },
    });
    return data;
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
  } | null> {
    console.info('get all products by userId, companyId and inventoryId in db');
    const { data } = await axios.get(
      `${this.baseUrl}/api/product/getProductsByInventoryId/`,
      {
        params: {
          inventoryId,
          currentPage,
          numberOfProductsPerPage,
          sorterField: sorter.field,
          sorterOrder: sorter.order,
          filterCategoryId: filters.categoryId,
          filterSubCategoryId: filters.subCategoryId,
          filterToBuy: filters.toBuy,
          filterIsPublic: filters.isPublic,
        },
      },
    );
    return data
      ? {
          count: data.count,
          products: data.results.map(
            (product: ProductEntity) => new ProductEntity(product),
          ),
        }
      : null;
  }
}

export default SupabaseProductRepository;
