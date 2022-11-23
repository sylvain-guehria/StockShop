/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import type { AddProductParams } from './productRepository';
import { ProductRepository } from './productRepository';

class FirebaseProductRepository extends ProductRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(uid: string): Promise<ProductEntity> {
    console.info('get product in db with uid: ', uid);
    const response = await axios.get(`${this.baseUrl}/api/product/${uid}`);
    const {
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      toSell,
      isPublic,
      tva,
      categoryUid,
      publicDisponibility,
    } = response.data;

    return ProductEntity.new({
      uid,
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      toSell,
      isPublic,
      tva,
      categoryUid,
      publicDisponibility,
    });
  }

  async add({
    product,
    userUid,
    companyUid,
    inventoryUid,
  }: AddProductParams): Promise<ProductEntity> {
    console.info('adding product in db...');
    const res = await axios.post(`${this.baseUrl}/api/product/add`, {
      userUid,
      companyUid,
      inventoryUid,
      product: {
        uid: product.getUid(),
        label: product.getLabel(),
      },
    });
    console.info('Product added in DB, uid: ', product.getUid());
    const { uid, label } = res.data;
    return ProductEntity.new({
      uid,
      label,
    });
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting product with uid ${uid} in db...`);
    return axios.post(`${this.baseUrl}/api/product/delete`, { uid });
  }

  async getAll(): Promise<ProductEntity[]> {
    console.info('get all  in db');
    const response = await axios.get('/api/product/getAll');
    return response.data.map(
      (product: ProductEntity) =>
        new ProductEntity({
          uid: product.uid,
          label: product.label,
          quantityInInventory: product.quantityInInventory,
          optimumQuantity: product.optimumQuantity,
          buyingPrice: product.buyingPrice,
          sellingPrice: product.sellingPrice,
          description: product.description,
          toBuy: product.toBuy,
          toSell: product.toSell,
          isPublic: product.isPublic,
          tva: product.tva,
          categoryUid: product.categoryUid,
          publicDisponibility: product.publicDisponibility,
        })
    );
  }

  async update(product: ProductEntity): Promise<void> {
    console.info('update product uid: ', product.getUid());
    await axios.put(`${this.baseUrl}/api/product/${product.getUid()}`, {
      uid: product.getUid(),
      label: product.getLabel(),
      quantityInInventory: product.getQuantityInInventory(),
      optimumQuantity: product.getOptimumQuantity(),
      buyingPrice: product.getBuyingPrice(),
      sellingPrice: product.getSellingPrice(),
      description: product.getDescription(),
      toBuy: product.getToBuy(),
      toSell: product.getToSell(),
      isPublic: product.getIsPublic(),
      tva: product.getTva(),
      categoryUid: product.getCategoryUid(),
      publicDisponibility: product.getPublicDisponibility(),
    });
  }

  async getProductsByUserUidCompanyUidInventoryUid({
    userUid,
    inventoryUid,
    companyUid,
  }: {
    userUid: string;
    inventoryUid: string;
    companyUid: string;
  }): Promise<ProductEntity[]> {
    console.info(
      'get all products by userUid, companyUid and inventoryUid in db'
    );
    const response = await axios.get(
      `${this.baseUrl}/api/product/getProductsByUserUidCompanyUidInventoryUid`,
      {
        params: { userUid, companyUid, inventoryUid },
      }
    );
    return response.data.map(
      (product: ProductEntity) =>
        new ProductEntity({
          uid: product.uid,
          label: product.label,
          quantityInInventory: product.quantityInInventory,
          optimumQuantity: product.optimumQuantity,
          buyingPrice: product.buyingPrice,
          sellingPrice: product.sellingPrice,
          description: product.description,
          toBuy: product.toBuy,
          toSell: product.toSell,
          isPublic: product.isPublic,
          tva: product.tva,
          categoryUid: product.categoryUid,
          publicDisponibility: product.publicDisponibility,
        })
    );
  }
}

export default FirebaseProductRepository;
