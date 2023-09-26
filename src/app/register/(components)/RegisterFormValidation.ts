import { bool, object, ref, string } from 'yup';

export const validationSchema = object().shape({
  email: string()
    .required('Veuillez entrer votre email')
    .email('Email invalide'),
  password: string()
    .required('Le mot de passe est requis')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/,
      'Doit contenir 8 caractères, 1 majuscule, 1 minuscule, 1 nombre et un caractère spécial.',
    ),
  confirmPassword: string()
    .oneOf([ref('password')], 'Les mots de passe doivent être identiques')
    .required('Confirmer votre mot de passe'),
  acceptTerms: bool().required().oneOf([true], 'Veuillez accepter les termes'),
});
