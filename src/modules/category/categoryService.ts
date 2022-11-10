import type { CategoryRepository } from './categoryRepository';

class CategoryService {
  categoryRepository;

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository;
  }
}

export default CategoryService;
