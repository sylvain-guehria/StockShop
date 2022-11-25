import { AttributeInputTypes } from '../categoriesTypes';
import { bookCategories } from './reusableOptions';

export const subcategoriePaperbackBook = {
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
        { id: 'pocket', label: 'Poche' },
        { id: 'standard', label: 'Standard' },
      ],
    },
    {
      id: 'category',
      label: 'Catégorie',
      inputType: AttributeInputTypes.SELECT_WITH_CATEGORY,
      options: bookCategories,
    },
  ],
};
