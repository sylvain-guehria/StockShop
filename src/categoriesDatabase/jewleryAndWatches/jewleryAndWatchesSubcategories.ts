import { AttributeInputTypes } from '@/modules/category/categoryType';

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
      id: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
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
      id: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
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
      id: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
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
  id: 'bracelet',
  label: 'Bracelets',
  inputs: [
    {
      id: 'manufacturer',
      label: 'Fabricant',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
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
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Rolex', value: 'rolex' },
        { label: 'Omega', value: 'omega' },
        { label: 'Cartier', value: 'cartier' },
        { label: 'Breitling', value: 'breitling' },
        { label: 'Tag Heuer', value: 'tagheuer' },
        { label: 'Patek Philippe', value: 'patekphilippe' },
        { label: 'Audemars Piguet', value: 'audemarspiguet' },
        { label: 'IWC', value: 'iwc' },
        { label: 'Hublot', value: 'hublot' },
        { label: 'Chopard', value: 'chopard' },
        { label: 'Zenith', value: 'zenith' },
        { label: 'Jaeger-LeCoultre', value: 'jaegerlecoultre' },
        { label: 'Parmigiani Fleurier', value: 'parmigianifleurier' },
        { label: 'Breguet', value: 'breguet' },
        { label: 'Vacheron Constantin', value: 'vacheronconstantin' },
        { label: 'Blancpain', value: 'blancpain' },
        { label: 'Ulysse Nardin', value: 'ulysseardin' },
        { label: 'Richard Mille', value: 'richardmille' },
        { label: 'Corum', value: 'corum' },
        { label: 'Girard-Perregaux', value: 'girardperregaux' },
        { label: 'Tudor', value: 'tudor' },
        { label: 'Longines', value: 'longines' },
        { label: 'Montblanc', value: 'montblanc' },
        { label: 'Rado', value: 'rado' },
        { label: 'Tissot', value: 'tissot' },
        { label: 'Bulova', value: 'bulova' },
        { label: 'Seiko', value: 'seiko' },
        { label: 'Casio', value: 'casio' },
        { label: 'Fossil', value: 'fossil' },
        { label: 'Hamilton', value: 'hamilton' },
        { label: 'Movado', value: 'movado' },
        { label: 'Citizen', value: 'citizen' },
        { label: 'Orient', value: 'orient' },
        { label: 'Invicta', value: 'invicta' },
        { label: 'Victorinox', value: 'victorinox' },
        { label: 'Timex', value: 'timex' },
        { label: 'Casio', value: 'casio' },
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
