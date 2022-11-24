import { AttributeInputTypes } from '../categoriesTypes';

export const subcategorieClothes = {
  id: 'clothes',
  label: 'Vêtements',
  attributes: [
    {
      sex: [
        { label: 'Homme', value: 'men' },
        { label: 'Homme', value: 'men' },
        { label: 'Unisex', value: 'unisex' },
      ],
      europeanSize: AttributeInputTypes.NUMBER,
      americanSize: AttributeInputTypes.NUMBER,
    },
  ],
};
