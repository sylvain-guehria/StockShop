import { AttributeInputTypes } from '../categoriesTypes';
import { sexOptions } from '../reusableOptions';
import {
  jewleryMaterial,
  meshType,
  meshWidth,
  stoneMaterial,
} from './reusableOptions';

export const subcategorieNeckless = {
  id: 'neckless',
  label: 'Colliers',
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
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
    {
      id: 'titration',
      label: 'Titrage matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'weight',
      label: 'Poids (gr)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'length',
      label: 'Longueur (cm)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'width',
      label: 'Largeur',
      inputType: AttributeInputTypes.SELECT,
      options: meshWidth,
    },
    {
      id: 'type',
      label: 'Type de maille',
      inputType: AttributeInputTypes.SELECT,
      options: meshType,
    },
    {
      id: 'pendant',
      label: 'Pendentif',
      inputType: AttributeInputTypes.SELECT,
      options: [...jewleryMaterial, ...stoneMaterial],
    },
  ],
};

export const subcategorieRing = {
  id: 'ring',
  label: 'Bagues',
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
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
    {
      id: 'titration',
      label: 'Titrage matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'weight',
      label: 'Poids (gr)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'length',
      label: 'Longueur (cm)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'width',
      label: 'Largeur',
      inputType: AttributeInputTypes.SELECT,
      options: meshWidth,
    },
    {
      id: 'type',
      label: 'Type de maille',
      inputType: AttributeInputTypes.SELECT,
      options: meshType,
    },
    {
      id: 'stone',
      label: 'Pierre',
      inputType: AttributeInputTypes.SELECT,
      options: stoneMaterial,
    },
  ],
};
