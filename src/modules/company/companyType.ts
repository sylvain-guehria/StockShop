export enum CompanyEnum {
  UID = 'uid',
  NAME = 'name',
  VAT = 'vat',
  ADDRESS = 'address',
}

export interface Company {
  [CompanyEnum.UID]?: string;
  [CompanyEnum.NAME]?: string;
  [CompanyEnum.VAT]?: string;
  [CompanyEnum.ADDRESS]?: Address;
}

export type Address = {
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
};
