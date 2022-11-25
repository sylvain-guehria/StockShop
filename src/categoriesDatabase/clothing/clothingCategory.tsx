import { CategoryId, CategoryLabel } from '../categoriesTypes';
import {
  subcategorieAccessories,
  subcategorieClothes,
  subcategorieShoes,
} from './clothingSubcategories';

export const clothingCategory = [
  {
    id: CategoryId.CLOTHING,
    label: CategoryLabel.CLOTHING,
    subCatgories: [
      subcategorieClothes,
      subcategorieShoes,
      subcategorieAccessories,
    ],
  },
];
