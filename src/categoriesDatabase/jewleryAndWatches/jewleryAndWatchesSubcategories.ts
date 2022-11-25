import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorOptions, sexOptions } from '../reusableOptions';
import {
  jewleryMaterial,
  meshType,
  meshWidth,
  stoneMaterial,
  watchMaterial,
} from './reusableOptions';

export const subcategorieNeckless = {
  uid: 'neckless',
  label: 'Colliers',
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
    },
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
    {
      uid: 'titration',
      label: 'Titrage matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'weight',
      label: 'Poids (gr)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'length',
      label: 'Longueur (cm)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'width',
      label: 'Largeur',
      inputType: AttributeInputTypes.SELECT,
      options: meshWidth,
    },
    {
      uid: 'type',
      label: 'Type de maille',
      inputType: AttributeInputTypes.SELECT,
      options: meshType,
    },
    {
      uid: 'pendant',
      label: 'Pendentif',
      inputType: AttributeInputTypes.SELECT,
      options: [...jewleryMaterial, ...stoneMaterial],
    },
  ],
};

export const subcategorieRing = {
  uid: 'ring',
  label: 'Bagues',
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
    },
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
    {
      uid: 'titration',
      label: 'Titrage matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'weight',
      label: 'Poids (gr)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'length',
      label: 'Longueur (cm)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'width',
      label: 'Largeur',
      inputType: AttributeInputTypes.SELECT,
      options: meshWidth,
    },
    {
      uid: 'type',
      label: 'Type de maille',
      inputType: AttributeInputTypes.SELECT,
      options: meshType,
    },
    {
      uid: 'stone',
      label: 'Pierre',
      inputType: AttributeInputTypes.SELECT,
      options: stoneMaterial,
    },
  ],
};

export const subcategorieEaring = {
  uid: 'earing',
  label: "Boucles d'oreilles",
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
    },
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
    {
      uid: 'titration',
      label: 'Titrage matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'weight',
      label: 'Poids (gr)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'length',
      label: 'Longueur (cm)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'width',
      label: 'Largeur',
      inputType: AttributeInputTypes.SELECT,
      options: meshWidth,
    },
    {
      uid: 'diameter',
      label: 'Diamètre Créoles',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Petites (moins de 15mm)', value: 'small' },
        { label: 'Moyennes (entre 16 et 49mm)', value: 'medium' },
        { label: 'Grandes (plus de 50mm)', value: 'large' },
      ],
    },
    {
      uid: 'stone',
      label: 'Pierre',
      inputType: AttributeInputTypes.SELECT,
      options: stoneMaterial,
    },
  ],
};

export const subcategorieBracelet = {
  uid: 'neckless',
  label: 'Colliers',
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
    },
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'material',
      label: 'Matière principale',
      inputType: AttributeInputTypes.SELECT,
      options: jewleryMaterial,
    },
    {
      uid: 'titration',
      label: 'Titrage matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'weight',
      label: 'Poids (gr)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'length',
      label: 'Longueur (cm)',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'width',
      label: 'Largeur',
      inputType: AttributeInputTypes.SELECT,
      options: meshWidth,
    },
    {
      uid: 'type',
      label: 'Type de maille',
      inputType: AttributeInputTypes.SELECT,
      options: meshType,
    },
    {
      uid: 'stone',
      label: 'Pierre',
      inputType: AttributeInputTypes.SELECT,
      options: stoneMaterial,
    },
  ],
};

export const subcategorieWatches = {
  uid: 'watches',
  label: 'Montres',
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
    },
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'mecanisme',
      label: 'Mécanisme',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Mécanique', value: 'mecanique' },
        { label: 'Quartz', value: 'quartz' },
        { label: 'Solaire', value: 'solaire' },
        { label: 'Hybride', value: 'hybride' },
        { label: 'Kinétique', value: 'kinetique' },
        { label: 'Autre', value: 'autre' },
      ],
    },
    {
      uid: 'dialMaterial',
      label: 'Matière du cadran',
      inputType: AttributeInputTypes.SELECT,
      options: watchMaterial,
    },
    {
      uid: 'braceletMaterial',
      label: 'Matière du bracelet',
      inputType: AttributeInputTypes.SELECT,
      options: [
        ...watchMaterial,
        { label: 'Cuir', value: 'cuir' },
        { label: 'Nylon', value: 'nylon' },
        { label: 'Caoutchouc', value: 'caoutchouc' },
        { label: 'Silicone', value: 'silicone' },
        { label: 'Tissu', value: 'tissu' },
        { label: 'Nato', value: 'nato' },
        { label: 'Céramique', value: 'ceramique' },
      ],
    },
    {
      uid: 'dialDiameter',
      label: 'Diamètre du cadran',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
};
