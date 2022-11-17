import { object, string } from 'yup';

export const validationSchema = object().shape({
  username: string()
    .required("le nom d'utilisateur est obligatoire")
    .max(20, "le nom d'utilisateur ne peut pas dépasser 20 caractères"),
  firstName: string().max(30, 'le prénom ne peut pas dépasser 30 caractères'),
  lastName: string().max(30, 'le nom ne peut pas dépasser 30 caractères'),
});
