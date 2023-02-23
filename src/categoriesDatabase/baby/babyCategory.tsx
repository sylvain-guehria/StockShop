import type { Category } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import { subcategorieAccessories } from './babySubcategories';

export const babyCategory: Category = {
  id: CategoryId.BABY,
  label: CategoryLabel.BABY,
  subCatgories: [subcategorieAccessories],
};
