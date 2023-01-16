export enum CategoryEnum {
  ID = 'id',
  LABEL = 'label',
  INPUTS = 'inputs',
  SUB_CATEGORIES = 'subCatgories',
  OPTIONS = 'options',
  SUB_OPTIONS = 'subOptions',
  OPTIONS_WITH_SUB_OPTIONS = 'optionsWithSubOptions',
  INPUT_TYPE = 'inputType',
  VALUE = 'value',
}

export interface Category {
  [CategoryEnum.ID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUTS]?: CategoryInput[];
  [CategoryEnum.SUB_CATEGORIES]?: SubCategory[];
}

export type SubCategory = {
  [CategoryEnum.ID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUTS]?: CategoryInput[];
};

export type Option = {
  [CategoryEnum.VALUE]: string;
  [CategoryEnum.LABEL]: string;
};

export type OptionWithSubOptions = Option & {
  [CategoryEnum.SUB_OPTIONS]?: Option[];
};

export type CategoryInput = {
  [CategoryEnum.ID]: string;
  [CategoryEnum.LABEL]: string;
  [CategoryEnum.INPUT_TYPE]: AttributeInputTypes;
  [CategoryEnum.OPTIONS]?: Option[];
  [CategoryEnum.OPTIONS_WITH_SUB_OPTIONS]?: OptionWithSubOptions[];
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
  SELECT_WITH_SUB_OPTIONS = 'selectWithSubOptions',
  MULTISELECT = 'multiselect',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}
