export enum CategoryEnum {
  UID = 'uid',
  LABEL = 'label',
  INPUTS = 'inputs',
}

export interface Category {
  [CategoryEnum.UID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUTS]?: CategoryInput[];
  subCatgories?: SubCategory[];
}

export type SubCategory = {
  uid: string;
  label: string;
  inputs: CategoryInput[];
};

export type CategoryInput = {
  uid: string;
  label: string;
  inputType: AttributeInputTypes;
  options: {
    label: string;
    value: string;
  }[];
};

export type CategoryInputOption = {
  label: string;
  value: string;
};

export enum AttributeInputTypes {
  NUMBER = 'number',
  TEXT = 'text',
  DATE = 'date',
  SELECT = 'select',
  SELECT_WITH_CATEGORY = 'selectWithCategory',
  MULTISELECT = 'multiselect',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}
