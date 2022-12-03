import { AttributeInputTypes } from '@/modules/category/categoryType';

import { depth, height, volume, width } from '../reusableInputs';

export const subcategorieCold = {
  uid: 'cold',
  label: 'Froid',
  inputs: [
    {
      uid: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Congélateur', value: 'freezer' },
        { label: 'Réfrigérateur', value: 'refrigerator' },
        { label: 'Cave à vin', value: 'wine-cellar' },
      ],
    },
    {
      label: 'Nombre de porte',
      uid: 'numberOfDoors',
      inputType: AttributeInputTypes.NUMBER,
    },
    width,
    height,
    depth,
    volume,
    {
      label: 'Type de pose',
      uid: 'typeOfInstallation',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Encastrable', value: 'built-in' },
        { label: 'Intégrable', value: 'integrated' },
        { label: 'Pose libre', value: 'free-standing' },
      ],
    },
    {
      label: 'Type de froid',
      uid: 'typeOfCold',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Froid ventilé', value: 'ventilated-cold' },
        { label: 'Froid statique', value: 'static-cold' },
        { label: 'Froid brassé', value: 'mixed-cold' },
      ],
    },
  ],
};

export const subcategorieWasching = {
  uid: 'washing',
  label: 'Lavage',
  inputs: [
    width,
    height,
    depth,
    volume,
    {
      label: 'Capacité de séchage ou lavage (kg)',
      uid: 'washingCapacity',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: '5 kg', value: '5kg' },
        { label: '6 kg', value: '6kg' },
        { label: '7 kg', value: '7kg' },
        { label: '8 kg', value: '8kg' },
        { label: '9 kg', value: '9kg' },
        { label: '10 kg', value: '10kg' },
        { label: '> 11 kg', value: '11kg+' },
      ],
    },
    {
      uid: 'type',
      label: 'Type',
      inputType: AttributeInputTypes.SELECT_WITH_SUB_OPTIONS,
      optionsWithSubOptions: [
        {
          value: 'washing-machine',
          label: 'Lave-linge',
          subOptions: [
            {
              label: 'Lave-linge frontal',
              value: 'frontal-washing-machine',
            },
            {
              label: 'Lave-linge top',
              value: 'top-washing-machine',
            },
            {
              label: 'Lave-linge grande capacité',
              value: 'large-capacity-washing-machine',
            },
            {
              label: 'Lave-linge sechant',
              value: 'washing-machine-dryer',
            },
          ],
        },
        {
          label: 'Sèche-linge',
          value: 'dryer',
          subOptions: [
            {
              label: 'Sèche-linge pompe à chaleur',
              value: 'heat-pump-dryer',
            },
            {
              label: 'Sèche-linge condensation',
              value: 'condensation-dryer',
            },
            {
              label: 'Sèche-linge à évacuation',
              value: 'evacuation-dryer',
            },
          ],
        },
        {
          label: 'Lave-vaisselle',
          value: 'dishwasher',
          subOptions: [
            {
              label: 'Lave-vaisselle encastrable',
              value: 'built-in-dishwasher',
            },
            {
              label: 'Lave-vaisselle pose libre',
              value: 'free-standing-dishwasher',
            },
            {
              label: 'Lave-vaisselle compact',
              value: 'compact-dishwasher',
            },
          ],
        },
      ],
    },
  ],
};

export const subcategorieCooking = {
  uid: 'cooking',
  label: 'Cuisson',
  inputs: [
    width,
    height,
    depth,
    volume,
    {
      label: 'Type',
      uid: 'type',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Four', value: 'oven' },
        { label: 'Plaque de cuisson', value: 'cooking-hob' },
        { label: 'Hotte', value: 'hood' },
        { label: 'Cuisinière', value: 'stove' },
        { label: 'Micro-ondes', value: 'microwave' },
      ],
    },
    {
      label: 'Type de cuisson',
      uid: 'typeOfCooking',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Cuisson par induction', value: 'induction-cooking' },
        { label: 'Cuisson par gaz', value: 'gas-cooking' },
        { label: 'Cuisson par électrique', value: 'electric-cooking' },
      ],
    },
    {
      label: 'Nombre de zones de cuisson',
      uid: 'numberOfCookingZones',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      label: 'Type de chaleur',
      uid: 'typeOfHeat',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Chaleur tournante', value: 'rotating-heat' },
        { label: 'Chaleur statique', value: 'static-heat' },
        { label: 'Chaleur pulsée', value: 'pulsed-heat' },
        { label: 'Convection', value: 'convection' },
      ],
    },
    {
      label: 'Revêtement',
      uid: 'coating',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { label: 'Céramique', value: 'ceramic' },
        { label: 'Verre trempé', value: 'tempered-glass' },
        { label: 'Inox', value: 'stainless-steel' },
        { label: 'Vitrocéramique', value: 'vitroceramic' },
      ],
    },
  ],
};
