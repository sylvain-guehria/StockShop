import type { SubCategory } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { colorOptions } from '../reusableOptions';
import { gameConsoleOptions, gameManufacturerOptions } from './reusableOptions';

export const subcategorieGameConsole: SubCategory = {
  id: 'gameConsole',
  label: 'Console de jeux',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: gameManufacturerOptions,
    },
    {
      id: 'model',
      label: 'Modèle',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'console',
      label: 'Console',
      inputType: AttributeInputTypes.SELECT_WITH_SUB_OPTIONS,
      options: gameConsoleOptions,
    },
    {
      id: 'color',
      label: 'Couleur',
      inputType: AttributeInputTypes.SELECT,
      options: colorOptions,
    },
    {
      label: 'Capacité de stockage',
      id: 'storageCapacity',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: '8go-', label: '< 8go' },
        { value: '8go-16go', label: '8go - 16go' },
        { value: '16go-32go', label: '16go - 32go' },
        { value: '32go-64go', label: '32go - 64go' },
        { value: '64go-128go', label: '64go - 128go' },
        { value: '128go-256go', label: '128go - 256go' },
        { value: '256go-512go', label: '256go - 512go' },
        { value: '512go+', label: '> 512go' },
      ],
    },
    {
      label: 'Connectivité sans fil',
      id: 'wirelessConnectivity',
      inputType: AttributeInputTypes.MULTISELECT,
      options: [
        { value: 'wifi', label: 'Wifi' },
        { value: 'bluetooth', label: 'Bluetooth' },
        { value: 'nfc', label: 'NFC' },
        { value: '3g', label: '3G' },
        { value: '4g', label: '4G' },
        { value: '5g', label: '5G' },
      ],
    },
  ],
};

export const subcategorieGameConsoleAccessories: SubCategory = {
  id: 'gameConsoleAccessories',
  label: 'Accessoires de console de jeux',
  inputs: [
    {
      id: 'brand',
      label: 'Marque',
      inputType: AttributeInputTypes.SELECT,
      options: gameManufacturerOptions,
    },
    {
      id: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'controller', label: 'Manette' },
        { value: 'joystick', label: 'Joystick' },
        { value: 'memoryCard', label: 'Carte mémoire' },
        { value: 'wheel', label: 'Volant' },
        { value: 'VR', label: 'Casque VR' },
        { value: 'other', label: 'Autre' },
      ],
    },
  ],
};
