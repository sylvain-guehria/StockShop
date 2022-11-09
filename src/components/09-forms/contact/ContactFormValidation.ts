import { object, string } from 'yup';

export const validationSchema = object().shape({
  fullName: string(),
  company: string(),
  email: string()
    .required('Veuillez entrer votre email')
    .email('Email invalide'),
  phone: string(),
  message: string().max(
    500,
    'Votre message est trop long, maximum 500 caractères'
  ),
  soureOfHeard: string(),
});
