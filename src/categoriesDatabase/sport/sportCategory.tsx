import { CategoryId, CategoryLabel } from '../categoriesTypes';
import {
  subcategorieAccessories,
  subcategorieClothes,
  subcategorieFoodAndDietsupplements,
  subcategorieShoes,
} from './sportSubcategories';

export const sportCategory = [
  {
    id: CategoryId.SPORTS_AND_OUTDOORS,
    label: CategoryLabel.SPORTS_AND_OUTDOORS,
    subCatgories: [
      subcategorieClothes,
      subcategorieAccessories,
      subcategorieShoes,
      subcategorieFoodAndDietsupplements,
    ],
  },
];
