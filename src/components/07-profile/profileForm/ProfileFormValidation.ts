import { object, string } from 'yup';

export const validationSchema = object().shape({
  username: string().required("le nom d'utilisateur est obligatoire"),
  firstName: string(),
  lastName: string(),
});
