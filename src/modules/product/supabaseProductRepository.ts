/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import type {
  DeleteProduct,
  GetProduct,
  GetProductsByInventoryId,
  UpdateProduct,
} from './productRepository';
import { ProductRepository } from './productRepository';

class SupabaseProductRepository extends ProductRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById({
    productId,
    userId,
    companyId,
    inventoryId,
  }: GetProduct): Promise<ProductEntity> {
    console.info('get product in db with id: ', productId);
    const response = await axios.get(
      `${this.baseUrl}/api/product/${productId}`,
      {
        params: {
          userId,
          companyId,
          inventoryId,
        },
      }
    );
    const {
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      isPublic,
      tva,
      categoryId,
      subCategoryId,
      publicDisponibility,
      catSubcatAttributes,
      condition,
      photoLink,
      createdAt,
    } = response.data;

    return ProductEntity.new({
      id: productId,
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      isPublic,
      tva,
      categoryId,
      subCategoryId,
      publicDisponibility,
      inventoryId,
      catSubcatAttributes,
      condition,
      photoLink,
      createdAt,
    });
  }

  async add(product: ProductEntity): Promise<ProductEntity> {
    console.info('adding product in db...');
    const res = await axios.post(`${this.baseUrl}/api/product/add`, {
      product: {
        id: product.getId(),
        label: product.getLabel(),
        inventoryId: product.getInventoryId(),
        createdAt: product.getCreationDate(),
      },
    });
    console.info('Product added in DB, id: ', product.getId());
    const { id, label, inventoryId, createdAt } = res.data;
    return ProductEntity.new({
      id,
      label,
      inventoryId,
      createdAt,
    });
  }

  async delete({
    productId,
    userId,
    companyId,
    inventoryId,
  }: DeleteProduct): Promise<void> {
    console.info(`Deleting product with id ${productId} in db...`);
    return axios.delete(`${this.baseUrl}/api/product/delete`, {
      params: {
        productId,
        userId,
        companyId,
        inventoryId,
      },
    });
  }

  async update({
    product,
    userId,
    companyId,
  }: UpdateProduct): Promise<ProductEntity> {
    console.info('update product id: ', product.getId());
    const { data } = await axios.put(
      `${this.baseUrl}/api/product/${product.getId()}`,
      {
        userId,
        companyId,
        inventoryId: product.getInventoryId(),
        product: {
          id: product.getId(),
          label: product.getLabel(),
          quantityInInventory: product.getQuantityInInventory(),
          optimumQuantity: product.getOptimumQuantity(),
          buyingPrice: product.getBuyingPrice(),
          sellingPrice: product.getSellingPrice(),
          description: product.getDescription(),
          toBuy: product.getToBuy(),
          isPublic: product.getIsPublic(),
          tva: product.getTva(),
          categoryId: product.getCategoryId(),
          subCategoryId: product.getSubCategoryId(),
          publicDisponibility: product.getPublicDisponibility(),
          catSubcatAttributes: product.getCatSubcatAttributes(),
          condition: product.getCondition(),
          photoLink: product.getPhotoLink(),
          createdAt: product.getCreationDate(),
        },
      }
    );
    return ProductEntity.new({
      id: data.id,
      label: data.label,
      quantityInInventory: data.quantityInInventory,
      optimumQuantity: data.optimumQuantity,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      description: data.description,
      toBuy: data.toBuy,
      isPublic: data.isPublic,
      tva: data.tva,
      categoryId: data.categoryId,
      subCategoryId: data.subCategoryId,
      publicDisponibility: data.publicDisponibility,
      inventoryId: data.inventoryId,
      catSubcatAttributes: data.catSubcatAttributes,
      condition: data.condition,
      photoLink: data.photoLink,
      createdAt: data.createdAt,
    });
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
    console.info('get all products by userId, companyId and inventoryId in db');
    const response = await axios.get(
      `${this.baseUrl}/api/product/getProductsByInventoryId`,
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
      }
    );
    console.log('response.data: ', response.data);
    return {
      count: response.data.count,
      products: response.data.results.map(
        (product: ProductEntity) =>
          new ProductEntity({
            id: product.id,
            label: product.label,
            quantityInInventory: product.quantityInInventory,
            optimumQuantity: product.optimumQuantity,
            buyingPrice: product.buyingPrice,
            sellingPrice: product.sellingPrice,
            description: product.description,
            toBuy: product.toBuy,
            isPublic: product.isPublic,
            tva: product.tva,
            categoryId: product.categoryId,
            subCategoryId: product.subCategoryId,
            publicDisponibility: product.publicDisponibility,
            inventoryId: product.inventoryId,
            catSubcatAttributes: product.catSubcatAttributes,
            condition: product.condition,
            photoLink: product.photoLink,
            createdAt: product.createdAt,
          })
      ),
    };
  }
}

export default SupabaseProductRepository;
