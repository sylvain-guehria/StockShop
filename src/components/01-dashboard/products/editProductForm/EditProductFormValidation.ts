import { object, string } from 'yup';

export const validationSchema = object().shape({
  label: string(),
});
