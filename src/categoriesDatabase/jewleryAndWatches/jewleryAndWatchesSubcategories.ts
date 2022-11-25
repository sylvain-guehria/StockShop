import { AttributeInputTypes } from '../categoriesTypes';
import { colorOptions, sexOptions } from '../reusableOptions';
import {
  jewleryMaterial,
  meshType,
  meshWidth,
  stoneMaterial,
  watchMaterial,
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
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
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
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
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

export const subcategorieEaring = {
  id: 'earing',
  label: "Boucles d'oreilles",
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
      id: 'diameter',
      label: 'Diamètre Créoles',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Petites (moins de 15mm)', value: 'small' },
        { label: 'Moyennes (entre 16 et 49mm)', value: 'medium' },
        { label: 'Grandes (plus de 50mm)', value: 'large' },
      ],
    },
    {
      id: 'stone',
      label: 'Pierre',
      inputType: AttributeInputTypes.SELECT,
      options: stoneMaterial,
    },
  ],
};

export const subcategorieBracelet = {
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
      inputType: AttributeInputTypes.SELECT,
      options: [...colorOptions],
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

export const subcategorieWatches = {
  id: 'watches',
  label: 'Montres',
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
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'mecanisme',
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
      id: 'dialMaterial',
      label: 'Matière du cadran',
      inputType: AttributeInputTypes.SELECT,
      options: watchMaterial,
    },
    {
      id: 'braceletMaterial',
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
      id: 'dialDiameter',
      label: 'Diamètre du cadran',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
};
