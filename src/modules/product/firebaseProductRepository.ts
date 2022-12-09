/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import ProductEntity from './ProductEntity';
import type {
  AddProduct,
  DeleteProduct,
  GetProduct,
  GetProductsByUserUidCompanyUidInventoryUid,
  UpdateProduct,
} from './productRepository';
import { ProductRepository } from './productRepository';

class FirebaseProductRepository extends ProductRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById({
    productUid,
    userUid,
    companyUid,
    inventoryUid,
  }: GetProduct): Promise<ProductEntity> {
    console.info('get product in db with uid: ', productUid);
    const response = await axios.get(
      `${this.baseUrl}/api/product/${productUid}`,
      {
        params: {
          userUid,
          companyUid,
          inventoryUid,
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
      categoryUid,
      subCategoryUid,
      publicDisponibility,
      catSubcatAttributes,
      condition,
      photoLink,
      creationDate,
    } = response.data;

    return ProductEntity.new({
      uid: productUid,
      label,
      quantityInInventory,
      optimumQuantity,
      buyingPrice,
      sellingPrice,
      description,
      toBuy,
      isPublic,
      tva,
      categoryUid,
      subCategoryUid,
      publicDisponibility,
      inventoryUid,
      catSubcatAttributes,
      condition,
      photoLink,
      creationDate,
    });
  }

  async add({
    product,
    userUid,
    companyUid,
  }: AddProduct): Promise<ProductEntity> {
    console.info('adding product in db...');
    const res = await axios.post(`${this.baseUrl}/api/product/add`, {
      userUid,
      companyUid,
      product: {
        uid: product.getUid(),
        label: product.getLabel(),
        inventoryUid: product.getInventoryUid(),
        creationDate: product.getCreationDate(),
      },
    });
    console.info('Product added in DB, uid: ', product.getUid());
    const { uid, label, inventoryUid, creationDate } = res.data;
    return ProductEntity.new({
      uid,
      label,
      inventoryUid,
      creationDate,
    });
  }

  async delete({
    productUid,
    userUid,
    companyUid,
    inventoryUid,
  }: DeleteProduct): Promise<void> {
    console.info(`Deleting product with uid ${productUid} in db...`);
    return axios.delete(`${this.baseUrl}/api/product/delete`, {
      params: {
        productUid,
        userUid,
        companyUid,
        inventoryUid,
      },
    });
  }

  async update({
    product,
    userUid,
    companyUid,
  }: UpdateProduct): Promise<ProductEntity> {
    console.info('update product uid: ', product.getUid());
    const { data } = await axios.put(
      `${this.baseUrl}/api/product/${product.getUid()}`,
      {
        userUid,
        companyUid,
        inventoryUid: product.getInventoryUid(),
        product: {
          uid: product.getUid(),
          label: product.getLabel(),
          quantityInInventory: product.getQuantityInInventory(),
          optimumQuantity: product.getOptimumQuantity(),
          buyingPrice: product.getBuyingPrice(),
          sellingPrice: product.getSellingPrice(),
          description: product.getDescription(),
          toBuy: product.getToBuy(),
          isPublic: product.getIsPublic(),
          tva: product.getTva(),
          categoryUid: product.getCategoryUid(),
          subCategoryUid: product.getSubCategoryUid(),
          publicDisponibility: product.getPublicDisponibility(),
          catSubcatAttributes: product.getCatSubcatAttributes(),
          condition: product.getCondition(),
          photoLink: product.getPhotoLink(),
          creationDate: product.getCreationDate(),
        },
      }
    );
    return ProductEntity.new({
      uid: data.uid,
      label: data.label,
      quantityInInventory: data.quantityInInventory,
      optimumQuantity: data.optimumQuantity,
      buyingPrice: data.buyingPrice,
      sellingPrice: data.sellingPrice,
      description: data.description,
      toBuy: data.toBuy,
      isPublic: data.isPublic,
      tva: data.tva,
      categoryUid: data.categoryUid,
      subCategoryUid: data.subCategoryUid,
      publicDisponibility: data.publicDisponibility,
      inventoryUid: data.inventoryUid,
      catSubcatAttributes: data.catSubcatAttributes,
      condition: data.condition,
      photoLink: data.photoLink,
      creationDate: data.creationDate,
    });
  }

  async getProductsByUserUidCompanyUidInventoryUid({
    userUid,
    inventoryUid,
    companyUid,
    currentPage,
    numberOfProductsPerPage,
    sorter,
    filters,
  }: GetProductsByUserUidCompanyUidInventoryUid): Promise<{
    count: number;
    products: ProductEntity[];
  }> {
    console.info(
      'get all products by userUid, companyUid and inventoryUid in db'
    );
    const response = await axios.get(
      `${this.baseUrl}/api/product/getProductsByUserUidCompanyUidInventoryUid`,
      {
        params: {
          userUid,
          companyUid,
          inventoryUid,
          currentPage,
          numberOfProductsPerPage,
          sorterField: sorter.field,
          sorterOrder: sorter.order,
          filterCategoryUid: filters.categoryUid,
          filterSubCategoryUid: filters.subCategoryUid,
          filterToBuy: filters.toBuy,
          filterIsPublic: filters.isPublic,
        },
      }
    );
    return {
      count: response.data.count,
      products: response.data.results.map(
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
            isPublic: product.isPublic,
            tva: product.tva,
            categoryUid: product.categoryUid,
            subCategoryUid: product.subCategoryUid,
            publicDisponibility: product.publicDisponibility,
            inventoryUid: product.inventoryUid,
            catSubcatAttributes: product.catSubcatAttributes,
            condition: product.condition,
            photoLink: product.photoLink,
            creationDate: product.creationDate,
          })
      ),
    };
  }
}

export default FirebaseProductRepository;
