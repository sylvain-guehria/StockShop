import { number, object, string } from 'yup';

export const oneMegaBits = 1 * 1024 * 1024;
export const authorizedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];

export const validationSchema = object().shape({
  size: number().required(),
  type: string()
    .required()
    .oneOf(
      authorizedFileTypes,
      'Seul les image jpg, png et jpeg sont autorisées',
    ),
});
