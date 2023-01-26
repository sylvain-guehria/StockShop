export enum CompanyEnum {
  ID = 'id',
  NAME = 'name',
  VAT = 'vat',
  ADDRESS_ID = 'addressId',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export interface Company {
  [CompanyEnum.ID]?: string;
  [CompanyEnum.NAME]?: string;
  [CompanyEnum.VAT]?: string;
  [CompanyEnum.ADDRESS_ID]?: string;
  [CompanyEnum.CREATED_AT]?: string;
  [CompanyEnum.UPDATED_AT]?: string;
}
