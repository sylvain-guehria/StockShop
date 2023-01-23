export enum CompanyEnum {
  ID = 'id',
  STREET = 'street',
  CITY = 'city',
  ZIP_CODE = 'zipCode',
  COUNTRY = 'country',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  COMPANY_ID = 'companyId',
}

export interface Address {
  street?: string;
  city?: string;
  zipCode?: string;
  country?: string;
}
