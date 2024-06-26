import type { SubCategory } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorsInput } from '../reusableInputs';
import { clothesAndAccessoriesMaterialOptions } from '../reusableOptions';
import { babyAgesOptions } from './reusableOptions';

export const subcategorieAccessories: SubCategory = {
  id: 'baby-accessories',
  label: 'Accessoires pour bébé',
  inputs: [
    colorsInput,
    {
      label: 'Âge',
      id: 'age',
      inputType: AttributeInputTypes.SELECT,
      options: babyAgesOptions,
    },
    {
      label: 'Type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Bavoir', value: 'bib' },
        { label: 'Biberon', value: 'bottle' },
        { label: 'Bouillotte', value: 'hot-water-bottle' },
        { label: 'Couverture', value: 'blanket' },
        { label: 'Coussin', value: 'pillow' },
        { label: 'Doudou', value: 'teddy-bear' },
        { label: 'Gigoteuse', value: 'sleeping-bag' },
      ],
    },
    {
      id: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndAccessoriesMaterialOptions,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
  ],
};

export const subcategorieClothes: SubCategory = {
  id: 'baby-clothes',
  label: 'Vêtements',
  inputs: [
    colorsInput,
    {
      label: 'Âge',
      id: 'age',
      inputType: AttributeInputTypes.SELECT,
      options: babyAgesOptions,
    },
    {
      label: 'Type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Pantalon', value: 'pants' },
        { label: 'Robe', value: 'dress' },
        { label: 'Short', value: 'short' },
        { label: 'T-shirt', value: 't-shirt' },
        { label: 'Veste', value: 'jacket' },
        {
          label: 'autre',
          value: 'other',
        },
      ],
    },
    {
      id: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndAccessoriesMaterialOptions,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
  ],
};

export const subcategorieShoes: SubCategory = {
  id: 'baby-shoes',
  label: 'Chaussures',
  inputs: [
    colorsInput,
    {
      label: 'Âge',
      id: 'age',
      inputType: AttributeInputTypes.SELECT,
      options: babyAgesOptions,
    },
    {
      label: 'Type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Bottes', value: 'boots' },
        { label: 'Chaussures', value: 'shoes' },
        { label: 'Chaussons', value: 'slippers' },
        { label: 'Sandales', value: 'sandals' },
        { label: 'Tongs', value: 'flip-flops' },
        { label: 'autre', value: 'other' },
      ],
    },
    {
      id: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndAccessoriesMaterialOptions,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
  ],
};
