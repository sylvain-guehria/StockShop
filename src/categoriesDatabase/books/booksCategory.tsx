import type { Category } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import { subcategoriePaperbackBook } from './booksSubcategories';

export const booksCategory: Category = {
  uid: CategoryId.BOOKS,
  label: CategoryLabel.BOOKS,
  subCatgories: [subcategoriePaperbackBook],
};
