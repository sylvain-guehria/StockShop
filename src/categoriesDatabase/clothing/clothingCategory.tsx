import { CategoryId, CategoryLabel } from '../categoriesTypes';
import { subcategorieClothes } from './subcategories';

export const clothingCategory = [
  {
    id: CategoryId.CLOTHING,
    label: CategoryLabel.CLOTHING,
    clothes: subcategorieClothes,
  },
];
