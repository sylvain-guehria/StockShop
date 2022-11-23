import { number, object, string } from 'yup';

import { ProductAttributes } from '@/modules/product/productType';

export const validationSchema = object().shape({
  [ProductAttributes.LABEL]: string().required(
    'Votre produit doit avoir un label'
  ),
  [ProductAttributes.QUANTITY_IN_INVENTORY]: string(),
  [ProductAttributes.OPTIMUM_QUANTITY]: number(),
  [ProductAttributes.BUYING_PRICE]: number(),
  [ProductAttributes.SELLING_PRICE]: number(),
  [ProductAttributes.DESCRIPTION]: string(),
  [ProductAttributes.CATEGORY_UID]: string(),
  [ProductAttributes.IS_PUBLIC]: string(),
  [ProductAttributes.TVA]: number(),
  [ProductAttributes.PUBLIC_DISPONIBILITY]: string(),
});
