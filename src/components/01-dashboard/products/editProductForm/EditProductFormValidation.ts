import { number, object, string } from 'yup';

import {
  ConditionTypeEnum,
  ProductAttributes,
} from '@/modules/product/productType';

export const validationSchema = object()
  .noUnknown()
  .shape({
    [ProductAttributes.LABEL]: string().required(
      'Votre produit doit avoir un label'
    ),
    [ProductAttributes.QUANTITY_IN_INVENTORY]: string(),
    [ProductAttributes.OPTIMUM_QUANTITY]: number(),
    [ProductAttributes.BUYING_PRICE]: number(),
    [ProductAttributes.SELLING_PRICE]: number(),
    [ProductAttributes.TVA]: number().min(0).max(100),
    [ProductAttributes.CATEGORY_UID]: string(),
    [ProductAttributes.SUB_CATEGORY_UID]: string(),
    [ProductAttributes.IS_PUBLIC]: string(),
    [ProductAttributes.DESCRIPTION]: string(),
    [ProductAttributes.PUBLIC_DISPONIBILITY]: string(),
    [ProductAttributes.CAT_SUBCAT_ATTRIBUTES]: object(),
    [ProductAttributes.CONDITION]: string().oneOf([
      ConditionTypeEnum.NEW,
      ConditionTypeEnum.USED,
      ConditionTypeEnum.REFURBISHED,
    ]),
    [ProductAttributes.PHOTO_LINK]: string(),
  });
