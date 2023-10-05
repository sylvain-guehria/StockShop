/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import CategoryEntity from './CategoryEntity';
import { CategoryRepository } from './categoryRepository';

class FirebaseCategoryRepository extends CategoryRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<CategoryEntity> {
    console.info('get category in db with id: ', id);
    const response = await axios.get(`${this.baseUrl}/api/category/${id}`);
    const { label, inputs } = response.data;

    return CategoryEntity.new({
      id,
      label,
      inputs,
    });
  }

  async add(category: CategoryEntity): Promise<string> {
    console.info('adding category in db...');
    const res = await axios.post(`${this.baseUrl}/api/category/add`, {
      id: category.getId(),
      label: category.getLabel(),
      inputs: category.getInputs(),
    });
    console.info('Category added in DB, id: ', category.getId());
    return res.data;
  }

  async delete(id: string): Promise<void> {
    console.info(`Deleting category with id ${id} in db...`);
    return axios.post(`${this.baseUrl}/api/category/delete`, { id });
  }

  async getAll(): Promise<CategoryEntity[]> {
    console.info('get all categorys in db');
    const response = await axios.get('/api/category/getAll');
    return response.data.map(
      (category: CategoryEntity) =>
        new CategoryEntity({
          id: category.id,
          label: category.label,
          inputs: category.inputs,
        }),
    );
  }

  async update(category: CategoryEntity): Promise<void> {
    console.info('update category id: ', category.getId());
    await axios.post(`${this.baseUrl}/api/category/${category.getId()}`, {
      id: category.getId(),
      label: category.getLabel(),
      inputs: category.getInputs(),
    });
  }
}

export default FirebaseCategoryRepository;
