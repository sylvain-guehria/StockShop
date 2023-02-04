import { boolean, object } from 'yup';

export const validationSchema = object().shape({
  hasInventoryManagementServiceActivated: boolean(),
});
