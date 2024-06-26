import { AttributeInputTypes } from '@/modules/category/categoryType';

import {
  americanPentsSizeOptions,
  clothesAndAccessoriesMaterialOptions,
  europeanPentsSizeOptions,
  seasonOptions,
  shoesAmericanSizeOptions,
  shoesEuropeanSizeOptions,
  universalSizeOptions,
} from '../reusableOptions';
import { clothesAndShoesBrands } from './reusableOptions';

export const subcategorieClothes = {
  id: 'clothes',
  label: 'Vêtements',
  inputs: [
    {
      id: 'europeanSize',
      label: 'Taille UE',
      inputType: AttributeInputTypes.SELECT,
      options: europeanPentsSizeOptions,
    },
    {
      id: 'americanSize',
      label: 'Taille US',
      inputType: AttributeInputTypes.SELECT,
      options: americanPentsSizeOptions,
    },
    {
      id: 'universalSize',
      label: 'Taille universelle',
      inputType: AttributeInputTypes.SELECT,
      options: universalSizeOptions,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndShoesBrands,
    },
    {
      id: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndAccessoriesMaterialOptions,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Pantalon', value: 'pants' },
        { label: 'Jean', value: 'jeans' },
        { label: 'Chemise', value: 'shirt' },
        { label: 'Pull', value: 'sweater' },
        { label: 'Veste', value: 'jacket' },
        { label: 'Pull à capuche', value: 'hoodie' },
        { label: 'Short', value: 'short' },
        { label: 'Costume', value: 'suit' },
        { label: 'T-shirt', value: 't-shirt' },
        { label: 'Manteau', value: 'coat' },
        { label: 'Robe', value: 'dress' },
        { label: 'Jupe', value: 'skirt' },
        { label: 'Combinaison', value: 'one-piece' },
        { label: 'Sous vêtements', value: 'underwear' },
        { label: 'Pyjama', value: 'pyjama' },
        { label: 'Survetement', value: 'tracksuit' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      id: 'season',
      label: 'Saison',
      inputType: AttributeInputTypes.SELECT,
      options: seasonOptions,
    },
  ],
};

export const subcategorieShoes = {
  id: 'shoes',
  label: 'Chaussures',
  inputs: [
    {
      id: 'europeanSize',
      label: 'Taille UE',
      inputType: AttributeInputTypes.SELECT,
      options: shoesEuropeanSizeOptions,
    },
    {
      id: 'americanSize',
      label: 'Taille US',
      inputType: AttributeInputTypes.SELECT,
      options: shoesAmericanSizeOptions,
    },
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndShoesBrands,
    },
    {
      id: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndAccessoriesMaterialOptions,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Sneakers', value: 'sneakers' },
        { label: 'Baskets', value: 'baskets' },
        { label: 'Bottes', value: 'boots' },
        { label: 'Sandales', value: 'sandals' },
        { label: 'Mocassins', value: 'moccasins' },
        { label: 'Ballerines', value: 'ballerinas' },
        { label: 'Escarpins', value: 'pumps' },
        { label: 'Chaussures de ville', value: 'cityShoes' },
        { label: 'Claquettes', value: 'flipFlops' },
        { label: 'Chaussons', value: 'slippers' },
        { label: 'tongs', value: 'tongs' },
        { label: 'Autre', value: 'other' },
      ],
    },
  ],
};

export const subcategorieAccessories = {
  id: 'accessories',
  label: 'Accessoires',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.SELECT,
      options: clothesAndAccessoriesMaterialOptions,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Ceinture', value: 'belt' },
        { label: 'Chapeau', value: 'hat' },
        { label: 'Casquette', value: 'cap' },
        { label: 'Echarpe', value: 'scarf' },
        { label: 'Gants', value: 'gloves' },
        { label: 'Bonnet', value: 'beanie' },
        { label: 'Porte-monnaie', value: 'wallet' },
        { label: 'Porte-clés', value: 'keychain' },
        { label: 'Sac à main', value: 'handbag' },
        { label: 'Autre', value: 'other' },
      ],
    },
  ],
};
