import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorOptions } from './reusableOptions';

export const width = {
  label: 'Largeur (cm)',
  id: 'width',
  inputType: AttributeInputTypes.NUMBER,
};
export const height = {
  label: 'Hauteur (cm)',
  id: 'height',
  inputType: AttributeInputTypes.NUMBER,
};
export const depth = {
  label: 'Profondeur (cm)',
  id: 'depth',
  inputType: AttributeInputTypes.NUMBER,
};
export const volume = {
  label: 'Volume (L)',
  id: 'volume',
  inputType: AttributeInputTypes.NUMBER,
};

export const colorsInput = {
  label: 'Couleur',
  id: 'color',
  inputType: AttributeInputTypes.SELECT,
  options: colorOptions,
};
