import { object, string } from 'yup';

export const validationSchema = object().shape({
  email: string().email().required('Veuillez entrer votre email'),
});
