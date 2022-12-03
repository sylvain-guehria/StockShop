import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorOptions, sexOptions } from '../reusableOptions';

export const subcategorieClothes = {
  uid: 'clothes',
  label: 'Vêtements',
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'europeanSize',
      label: 'Taille UE',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'americanSize',
      label: 'Taille US',
      inputType: AttributeInputTypes.TEXT,
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
      uid: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'activity',
      label: 'Activité',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Randonnée', value: 'hiking' },
        { label: 'Haute montagne', value: 'mountaineering' },
        { label: 'Vélo', value: 'biking' },
        { label: 'Course à pied', value: 'running' },
        { label: 'Toutes activités', value: 'allActivities' },
        { label: 'Autre', value: 'other' },
        { label: 'Tenis', value: 'tenis' },
        { label: 'Golf', value: 'golf' },
        { label: 'Ski', value: 'ski' },
        { label: 'Plongée', value: 'diving' },
        { label: 'Escalade', value: 'climbing' },
        { label: 'Natation', value: 'swimming' },
        { label: 'Volley-ball', value: 'volleyball' },
        { label: 'Basket-ball', value: 'basketball' },
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
        { label: 'Boxe', value: 'boxing' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Pilates', value: 'pilates' },
        { label: 'Musculation', value: 'weightlifting' },
        { label: 'Danse', value: 'dance' },
      ],
    },
    {
      uid: 'insideOrOutside',
      label: 'Intérieur/extérieur',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Intérieur', value: 'inside' },
        { label: 'Extérieur', value: 'outside' },
      ],
    },
    {
      uid: 'season',
      label: 'Saison',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Printemps', value: 'spring' },
        { label: 'Été', value: 'summer' },
        { label: 'Automne', value: 'autumn' },
        { label: 'Hiver', value: 'winter' },
        { label: 'Toutes saisons', value: 'allSeasons' },
      ],
    },
    {
      uid: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Veste', value: 'jacket' },
        { label: 'Pantalon', value: 'pants' },
        { label: 'Pull', value: 'sweater' },
        { label: 'Short', value: 'short' },
        { label: 'T-shirt', value: 't-shirt' },
        { label: 'Chemise', value: 'shirt' },
        { label: 'Maillot de bain', value: 'swimsuit' },
        { label: 'Combinaison', value: 'wetsuit' },
        { label: 'Autre', value: 'other' },
      ],
    },
  ],
};

export const subcategorieShoes = {
  uid: 'shoes',
  label: 'Chaussures',
  inputs: [
    {
      uid: 'sex',
      label: 'Sexe',
      inputType: AttributeInputTypes.SELECT,
      options: sexOptions,
    },
    {
      uid: 'europeanSize',
      label: 'Taille UE',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'americanSize',
      label: 'Taille US',
      inputType: AttributeInputTypes.TEXT,
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
      uid: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'activity',
      label: 'Activité',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Randonnée', value: 'hiking' },
        { label: 'Haute montagne', value: 'mountaineering' },
        { label: 'Vélo', value: 'biking' },
        { label: 'Course à pied', value: 'running' },
        { label: 'Toutes activités', value: 'allActivities' },
        { label: 'Autre', value: 'other' },
        { label: 'Tenis', value: 'tenis' },
        { label: 'Golf', value: 'golf' },
        { label: 'Ski', value: 'ski' },
        { label: 'Plongée', value: 'diving' },
        { label: 'Escalade', value: 'climbing' },
        { label: 'Natation', value: 'swimming' },
        { label: 'Volley-ball', value: 'volleyball' },
        { label: 'Basket-ball', value: 'basketball' },
        { label: 'Football', value: 'football' },
        { label: 'Baseball', value: 'baseball' },
        { label: 'Hockey', value: 'hockey' },
        { label: 'Boxe', value: 'boxing' },
        { label: 'Yoga', value: 'yoga' },
        { label: 'Pilates', value: 'pilates' },
        { label: 'Musculation', value: 'weightlifting' },
        { label: 'Danse', value: 'dance' },
      ],
    },
  ],
};

export const subcategorieAccessories = {
  uid: 'accessories',
  label: 'Accessoires',
  inputs: [
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
      uid: 'material',
      label: 'Matière',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'type',
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

export const subcategorieFoodAndDietsupplements = {
  uid: 'foodAndDietsupplements',
  label: 'Alimentation et compléments alimentaires',
  inputs: [
    {
      uid: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Barre énergétique', value: 'energyBar' },
        { label: 'Boisson énergétique', value: 'energyDrink' },
        { label: 'Boisson isotonique', value: 'isotonicDrink' },
        { label: 'Boisson hydratante', value: 'hydrationDrink' },
        { label: 'Boisson protéinée', value: 'proteinDrink' },
        { label: 'Protéine', value: 'protein' },
        { label: 'Bcca', value: 'bcca' },
        { label: 'Gainer', value: 'gainer' },
        { label: 'Glucides', value: 'carbohydrates' },
        { label: 'Vitamines', value: 'vitamins' },
        { label: 'Minéraux', value: 'minerals' },
        { label: 'Autre', value: 'other' },
      ],
    },
  ],
};
