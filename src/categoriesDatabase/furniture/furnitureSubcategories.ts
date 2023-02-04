import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorsInput, depth, height, width } from '../reusableInputs';
import { materialOptions, styleOptions } from './reusableOptions';

export const subcategorieTable = {
  id: 'table',
  label: 'Table',
  inputs: [
    width,
    height,
    colorsInput,
    {
      label: 'Nombre de personnes',
      id: 'numberOfPeople',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Nombre de personnes avec rallonge',
      id: 'numberOfPeopleWithExtension',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Nombre de rallonges',
      id: 'numberOfExtensions',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Finition',
      id: 'finish',
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
      id: 'material',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'Matière pieds',
      id: 'legsMaterial',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'style',
      id: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
  ],
};

export const subcategorieChairAndStool = {
  id: 'chairAndStool',
  label: 'Chaise et tabouret',
  inputs: [
    width,
    height,
    colorsInput,
    {
      label: 'Matière assises',
      id: 'material',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'Matière pieds',
      id: 'legsMaterial',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Chaise', value: 'chair' },
        { label: 'Tabouret', value: 'stool' },
        { label: 'Chaise haute', value: 'highchair' },
        { label: 'Chaise de bureau', value: 'officechair' },
        { label: 'Chaise ergonomique', value: 'ergonomicchair' },
        { label: 'Chaise de jardin', value: 'gardenchair' },
      ],
    },
    {
      label: 'style',
      id: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
  ],
};

export const subcategorieBed = {
  id: 'bed',
  label: 'Lit',
  inputs: [
    colorsInput,
    {
      label: 'Taille',
      id: 'size',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Simple 90*190 cm', value: 'single' },
        { label: 'Double 140*190 cm', value: 'double' },
        { label: 'Double XL 140*200 cm', value: 'double' },
        { label: 'Queen 160*200 cm', value: 'queen' },
        { label: 'King 180*200 cm', value: 'king' },
        { label: 'King XL 200*200 cm', value: 'king' },
      ],
    },
    {
      label: 'type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Lit adulte', value: 'adult' },
        { label: 'Lit enfant', value: 'child' },
        { label: 'Lit bébé', value: 'baby' },
        { label: 'Lit avec rangement', value: 'withStorage' },
        { label: 'Lit avec tête de lit', value: 'withHeadboard' },
        { label: 'Lit escamotable', value: 'folding' },
        { label: 'Lit gigogne', value: 'bunk' },
        { label: 'Lit superposé', value: 'bunk' },
        { label: "Lit d'appoint", value: 'extraBed' },
        { label: 'Lit banquette', value: 'bench' },
        { label: 'Lit mezzanine', value: 'loft' },
        { label: 'Futon', value: 'futon' },
      ],
    },
    {
      label: 'style',
      id: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
  ],
};

export const subcategorieAccessoriesBed = {
  id: 'accessoriesBed',
  label: 'Accessoires de lit',
  inputs: [
    colorsInput,
    {
      label: 'type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Pied de lit', value: 'bedFoot' },
        { label: 'Tête de lit', value: 'headboard' },
        { label: 'Couvre-lit', value: 'bedCover' },
        { label: 'Sommier', value: 'slattedBase' },
        { label: 'Matelas', value: 'mattress' },
        { label: 'Parure de lit', value: 'beddingSet' },
        { label: 'Autre', value: 'autre' },
      ],
    },
  ],
};

export const subcategorieDesk = {
  id: 'desk',
  label: 'Bureau',
  inputs: [
    width,
    height,
    colorsInput,
    {
      label: 'Matière plateau',
      id: 'material',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'Matière pieds',
      id: 'legsMaterial',
      inputType: AttributeInputTypes.SELECT,
      options: materialOptions,
    },
    {
      label: 'type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Bureau', value: 'desk' },
        { label: "Bureau d'enfant", value: 'childDesk' },
        { label: "Bureau d'étudiant", value: 'studentDesk' },
        { label: 'Bureau de travail', value: 'workDesk' },
        { label: 'Bureau assis-debout', value: 'standingDesk' },
        { label: 'Bureau gamer', value: 'gamerDesk' },
      ],
    },
    {
      label: 'style',
      id: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
  ],
};

export const subcategorieSofaAndArmchair = {
  id: 'sofaAndArmchair',
  label: 'Canapé et fauteuil',
  inputs: [
    width,
    height,
    depth,
    colorsInput,
    {
      label: 'Matière',
      id: 'material',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Cuir', value: 'leather' },
        { label: 'Tissu', value: 'fabric' },
        { label: 'Micro fibre', value: 'microfiber' },
        { label: 'Simili cuir', value: 'leatherette' },
        { label: 'Velours', value: 'velvet' },
        { label: 'Mélange', value: 'mix' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      label: 'type',
      id: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Canapé', value: 'sofa' },
        { label: "Canapé d'angle", value: 'cornerSofa' },
        { label: 'Canapé convertible', value: 'convertibleSofa' },
        { label: 'Canapé relax', value: 'relaxSofa' },
        { label: 'Fauteuil', value: 'armchair' },
        { label: 'Autre', value: 'other' },
      ],
    },
    {
      label: 'style',
      id: 'style',
      inputType: AttributeInputTypes.SELECT,
      options: styleOptions,
    },
    {
      label: 'Nombre de places',
      id: 'numberOfSeats',
      inputType: AttributeInputTypes.NUMBER,
    },
  ],
};
