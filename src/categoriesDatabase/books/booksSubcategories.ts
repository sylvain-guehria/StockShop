import type { SubCategory } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { bookCategories } from './reusableOptions';

export const subcategoriePaperbackBook: SubCategory = {
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
        { value: 'pocket', label: 'Poche' },
        { value: 'standard', label: 'Standard' },
        { value: 'ebook', label: 'Ebook' },
      ],
    },
    {
      uid: 'category',
      label: 'Catégorie',
      inputType: AttributeInputTypes.SELECT_WITH_SUB_OPTIONS,
      optionsWithSubOptions: bookCategories,
    },
  ],
};
