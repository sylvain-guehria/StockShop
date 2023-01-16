import type { Category } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import {
  subcategorieAccessories,
  subcategorieClothes,
  subcategorieFoodAndDietsupplements,
  subcategorieShoes,
} from './sportSubcategories';

export const sportCategory: Category = {
  id: CategoryId.SPORTS_AND_OUTDOORS,
  label: CategoryLabel.SPORTS_AND_OUTDOORS,
  subCatgories: [
    subcategorieClothes,
    subcategorieAccessories,
    subcategorieShoes,
    subcategorieFoodAndDietsupplements,
  ],
};
