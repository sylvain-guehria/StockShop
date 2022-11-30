import { number, object, string } from 'yup';

const twoMegaBits = 2 * 1024 * 1024;

export const validationSchema = object().shape({
  size: number()
    .min(0)
    .max(twoMegaBits, 'La taille maximal de la photo est 2Mb'),
  type: string().oneOf(
    ['image/jpeg', 'image/png', 'image/jpg'],
    'Seul les image jpg, png et jpeg sont autorisées'
  ),
});
