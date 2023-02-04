import type { Category } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { CategoryId, CategoryLabel } from '../categoriesEnums';
import {
  subcategorieCold,
  subcategorieCooking,
  subcategorieWasching,
} from './majorAppliancesSubcategories';

export const majorAppliancesCategory: Category = {
  id: CategoryId.MAJOR_APPLIANCES,
  label: CategoryLabel.MAJOR_APPLIANCES,
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'bosh', label: 'Bosh' },
        { value: 'electrolux', label: 'Electrolux' },
        { value: 'frigidaire', label: 'Frigidaire' },
        { value: 'ge', label: 'GE' },
        { value: 'haier', label: 'Haier' },
        { value: 'hotpoint', label: 'Hotpoint' },
        { value: 'kenmore', label: 'Kenmore' },
        { value: 'lg', label: 'LG' },
        { value: 'maytag', label: 'Maytag' },
        { value: 'samsung', label: 'Samsung' },
        { value: 'whirlpool', label: 'Whirlpool' },
        { value: 'philips', label: 'Philips' },
        { value: 'moulinex', label: 'Moulinex' },
        { value: 'seb', label: 'Seb' },
        { value: 'delonghi', label: 'Delonghi' },
        { value: 'siemens', label: 'Siemens' },
        { value: 'hisense', label: 'Hisense' },
        { value: 'miel', label: 'Miel' },
      ],
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      label: 'Classe énergétique',
      id: 'energyClass',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'a', label: 'A' },
        { value: 'b', label: 'B' },
        { value: 'c', label: 'C' },
        { value: 'd', label: 'D' },
        { value: 'e', label: 'E' },
        { value: 'f', label: 'F' },
        { value: 'g', label: 'G' },
      ],
    },
  ],
  subCatgories: [subcategorieCold, subcategorieWasching, subcategorieCooking],
};
