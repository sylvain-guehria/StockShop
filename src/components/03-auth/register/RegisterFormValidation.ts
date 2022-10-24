import { bool, object, ref, string } from 'yup';

export const validationSchema = object().shape({
  email: string()
    .required('Veuillez entrer votre email')
    .email('Email invalide'),
  password: string()
    .min(6, 'Votre mot de passe doit faire au moins 6 caractères')
    .required('Le mot de passe est requis'),
  confirmPassword: string()
    .oneOf([ref('password'), null], 'Les mots de passe doivent être identiques')
    .required('Confirmer votre mot de passe'),
  acceptTerms: bool().oneOf([true], 'Veuillez accepter les termes'),
});
