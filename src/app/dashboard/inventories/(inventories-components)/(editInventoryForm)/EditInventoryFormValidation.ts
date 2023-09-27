import { object, string } from 'yup';

export const validationSchema = object().shape({
  name: string().required('Veuillez entrer votre email'),
  color: string(),
  isPublic: string().required(
    'Veuillez choisir la visibilité de votre inventaire',
  ),
});
