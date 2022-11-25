import {
  AttributeInputTypes,
  CategoryId,
  CategoryLabel,
} from '../categoriesTypes';
import { colorOptions, sexOptions } from '../reusableOptions';
import {
  subcategorieAccessories,
  subcategorieClothes,
  subcategorieShoes,
} from './clothingSubcategories';

export const clothingCategory = [
  {
    id: CategoryId.CLOTHING,
    label: CategoryLabel.CLOTHING,
    inputs: [
      {
        id: 'sex',
        label: 'Sexe',
        inputType: AttributeInputTypes.SELECT,
        options: sexOptions,
      },
      {
        id: 'color',
        label: 'Couleur',
        inputType: AttributeInputTypes.SELECT,
        options: [...colorOptions],
      },
    ],
    subCatgories: [
      subcategorieClothes,
      subcategorieShoes,
      subcategorieAccessories,
    ],
  },
];
