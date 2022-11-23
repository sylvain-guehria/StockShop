export enum CategoryEnum {
  UID = 'uid',
  LABEL = 'label',
  ATTRIBUTS = 'attributs',
}

export interface Category {
  [CategoryEnum.UID]?: string;
  [CategoryEnum.LABEL]?: string;
  [CategoryEnum.ATTRIBUTS]?: Record<string, unknown>;
}
