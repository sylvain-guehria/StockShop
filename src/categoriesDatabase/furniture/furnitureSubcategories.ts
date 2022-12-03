import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorsInput, height, width } from '../reusableInputs';
import { materialOptions, styleOptions } from './reusableOptions';

export const subcategorieTable = {
  uid: 'table',
  label: 'Table',
  inputs: [
    width,
    height,
    colorsInput,
    {
      label: 'Nombre de personnes',
      uid: 'numberOfPeople',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Nombre de personnes avec rallonge',
      uid: 'numberOfPeopleWithExtension',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Nombre de rallonges',
      uid: 'numberOfExtensions',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Finition',
      uid: 'finish',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'bois', value: 'wood' },
        { label: 'Brillant', value: 'glossy' },
        { label: 'Laqué', value: 'lacquered' },
        { label: 'Mat', value: 'matte' },
        { label: 'Métal', value: 'metal' },
        { label: 'Patiné', value: 'patinated' },
        { label: 'Simili', value: 'imitation' },
        { label: 'Tissu', value: 'fabric' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      label: 'Matière plateau',
      uid: 'material',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'Matière pieds',
      uid: 'legsMaterial',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'style',
      uid: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
  ],
};

export const subcategorieChairAndStool = {
  uid: 'chairAndStool',
  label: 'Chaise et tabouret',
  inputs: [
    width,
    height,
    colorsInput,
    {
      label: 'Matière assises',
      uid: 'material',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'Matière pieds',
      uid: 'legsMaterial',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'type',
      uid: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Chaise', value: 'chair' },
        { label: 'Tabouret', value: 'stool' },
      ],
    },
    {
      label: 'style',
      uid: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
  ],
};
