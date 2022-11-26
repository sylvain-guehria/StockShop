export enum CategoryEnum {
  UID = 'uid',
  LABEL = 'label',
  INPUTS = 'inputs',
  SUB_CATEGORIES = 'subCatgories',
  OPTIONS = 'options',
  INPUT_TYPE = 'inputType',
  VALUE = 'value',
}

export interface Category {
  [CategoryEnum.UID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUTS]?: CategoryInput[];
  [CategoryEnum.SUB_CATEGORIES]?: SubCategory[];
}

export type SubCategory = {
  [CategoryEnum.UID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUTS]?: CategoryInput[];
};

export type CategoryInput = {
  [CategoryEnum.UID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUT_TYPE]: AttributeInputTypes;
  [CategoryEnum.OPTIONS]?: {
    [CategoryEnum.LABEL]: string;
    [CategoryEnum.VALUE]: string;
  }[];
};

export type CategoryInputOption = {
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.VALUE]: string;
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
