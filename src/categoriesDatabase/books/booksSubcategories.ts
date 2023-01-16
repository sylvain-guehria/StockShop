import type { SubCategory } from '@/modules/category/categoryType';
import { AttributeInputTypes } from '@/modules/category/categoryType';

import { bookCategories } from './reusableOptions';

export const subcategoriePaperbackBook: SubCategory = {
  id: 'paperbackBook',
  label: 'Livres brochés',
  inputs: [
    {
      id: 'releaseDate',
      label: 'Date de parution',
      inputType: AttributeInputTypes.DATE,
    },
    {
      id: 'author',
      label: 'Auteur',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'editor',
      label: 'Editeur',
      inputType: AttributeInputTypes.TEXT,
    },
    {
      id: 'numberOfPages',
      label: 'Nombre de pages',
      inputType: AttributeInputTypes.NUMBER,
    },
    {
      id: 'format',
      label: 'Format',
      inputType: AttributeInputTypes.SELECT,
      options: [
        { value: 'pocket', label: 'Poche' },
        { value: 'standard', label: 'Standard' },
        { value: 'ebook', label: 'Ebook' },
      ],
    },
    {
      id: 'category',
      label: 'Catégorie',
      inputType: AttributeInputTypes.SELECT_WITH_SUB_OPTIONS,
      optionsWithSubOptions: bookCategories,
    },
  ],
};
