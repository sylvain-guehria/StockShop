/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import { ProductRepository } from './productRepository';

class FirebaseProductRepository extends ProductRepository {
  baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;

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
    });
  }

  async add(product: ProductEntity): Promise<string> {
    console.info('adding product in db...');
    const res = await axios.post(`${this.baseUrl}/api/product/add`, {
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
    });
    console.info('Product added in DB, uid: ', product.getUid());
    return res.data;
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
    });
  }

  async getProductsByUserUidAndInventoryUid(
    userUid: string,
    inventoryUid: string
  ): Promise<ProductEntity[]> {
    console.info('get all products by userUid and inventoryUid in db');
    const response = await axios.get(
      `${this.baseUrl}/api/product/getProductsByUserUidAndInventoryUid`,
      {
        params: { userUid, inventoryUid },
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
        })
    );
  }
}

export default FirebaseProductRepository;
