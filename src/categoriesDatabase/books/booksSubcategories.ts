import { AttributeInputTypes } from '@/modules/category/categoryType';

import { bookCategories } from './reusableOptions';

export const subcategoriePaperbackBook = {
  uid: 'paperbackBook',
  label: 'Livres brochés',
  inputs: [
    {
      uid: 'releaseDate',
      label: 'Date de parution',
      inputType: AttributeInputTypes.DATE,
    },
    {
      uid: 'author',
      label: 'Auteur',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'editor',
      label: 'Editeur',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      uid: 'numberOfPages',
      label: 'Nombre de pages',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      uid: 'format',
      label: 'Format',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { uid: 'pocket', label: 'Poche' },
        { uid: 'standard', label: 'Standard' },
      ],
    },
    {
      uid: 'category',
      label: 'Catégorie',
      inputType: AttributeInputTypes.SELECT_WITH_CATEGORY,
      options: bookCategories,
    },
  ],
};
