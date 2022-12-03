import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorOptions } from './reusableOptions';

export const width = {
  label: 'Largeur (cm)',
  uid: 'width',
  inputType: AttributeInputTypes.NUMBER,
};
export const height = {
  label: 'Hauteur (cm)',
  uid: 'height',
  inputType: AttributeInputTypes.NUMBER,
};
export const depth = {
  label: 'Profondeur (cm)',
  uid: 'depth',
  inputType: AttributeInputTypes.NUMBER,
};
export const volume = {
  label: 'Volume (L)',
  uid: 'volume',
  inputType: AttributeInputTypes.NUMBER,
};

export const colorsInput = {
  label: 'Couleur',
  uid: 'color',
  inputType: AttributeInputTypes.SELECT,
  options: colorOptions,
};
