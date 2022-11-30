import { number, object, string } from 'yup';

const fiveMegaBits = 5 * 1024 * 1024;

export const validationSchema = object().shape({
  size: number().min(0).max(fiveMegaBits),
  type: string().oneOf(['image/jpeg', 'image/png', 'image/jpg']),
});
