/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import CategoryEntity from './CategoryEntity';
import { CategoryRepository } from './categoryRepository';

class FirebaseCategoryRepository extends CategoryRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<CategoryEntity | null> {
    console.info('get category in db with id: ', id);
    const { data } = await axios.get(`${this.baseUrl}/api/category/${id}`);
    return data ? CategoryEntity.new(data) : null;
  }

  async add(category: CategoryEntity): Promise<CategoryEntity | null> {
    console.info('adding category in db...');
    const { data } = await axios.post(
      `${this.baseUrl}/api/category/add`,
      category,
    );
    console.info('Category added in DB, id: ', category.getId());
    return data ? CategoryEntity.new(data) : null;
  }

  async update(category: CategoryEntity): Promise<CategoryEntity | null> {
    console.info('update category id: ', category.getId());
    const { data } = await axios.post(
      `${this.baseUrl}/api/category/${category.getId()}`,
      category,
    );
    return data ? CategoryEntity.new(data) : null;
  }

  async delete(id: string): Promise<boolean> {
    console.info(`Deleting category with id ${id} in db...`);
    const { data } = await axios.post(`${this.baseUrl}/api/category/delete`, {
      id,
    });
    return data;
  }

  async getAll(): Promise<CategoryEntity[] | null> {
    console.info('get all categorys in db');
    const { data } = await axios.get('/api/category/getAll');
    return data
      ? data.map(
          (category: CategoryEntity) =>
            new CategoryEntity({
              id: category.id,
              label: category.label,
              inputs: category.inputs,
            }),
        )
      : null;
  }
}

export default FirebaseCategoryRepository;
