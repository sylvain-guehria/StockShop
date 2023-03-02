import { object, string } from 'yup';

export const validationSchema = object().shape({
  email: string()
    .required('Veuillez entrer votre email')
    .email('Email invalide'),
  password: string().required('Le mot de passe est requis'),
});
