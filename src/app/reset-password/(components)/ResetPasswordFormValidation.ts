import { object, string } from 'yup';

export const validationSchema = object().shape({
  password: string().required('Veuillez entrer votre nouveau de passe'),
});
