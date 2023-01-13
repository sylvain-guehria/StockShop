export enum UserEnum {
  UID = 'uid',
  EMAIL = 'email',
  USERNAME = 'username',
  PROVIDER = 'provider',
  PASSWORD = 'password',
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE_NUMBER = 'phoneNumber',
  ROLE = 'role',
  HAS_INVENTORY_MANAGEMENT_SERVICE_ACTIVATED = 'hasInventoryManagementServiceActivated',
  HAS_SEEN_FIRST_CONNECTION_MODAL = 'hasSeenFirstConnectionModal',
  LOCALE = 'locale',
  COMPANY_UID = 'companyUid',
}

export interface User {
  [UserEnum.UID]?: string;
  [UserEnum.EMAIL]?: string;
  [UserEnum.USERNAME]?: string;
  [UserEnum.PROVIDER]?: ProviderType;
  [UserEnum.PASSWORD]?: string;
  [UserEnum.FIRST_NAME]?: string;
  [UserEnum.LAST_NAME]?: string;
  [UserEnum.PHONE_NUMBER]?: string;
  [UserEnum.ROLE]?: RoleType;
  [UserEnum.HAS_INVENTORY_MANAGEMENT_SERVICE_ACTIVATED]?: boolean;
  [UserEnum.HAS_SEEN_FIRST_CONNECTION_MODAL]?: boolean;
  [UserEnum.LOCALE]?: LocaleType;
  [UserEnum.COMPANY_UID]?: string;
}

export enum ROLES {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

export enum LOCALES {
  FR = 'fr',
  EN = 'en',
}

export type RoleType = ROLES.SUPERADMIN | ROLES.ADMIN | ROLES.USER;
export type LocaleType = LOCALES.FR | LOCALES.EN | '';

export enum SUBROLES {
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum PROVIDERS {
  FACEBOOK = 'facebook.com',
  GOOGLE = 'google.com',
  PASSWORD = 'password',
  NOTKNOWN = 'notKnown',
}

export type ProviderType =
  | PROVIDERS.PASSWORD
  | PROVIDERS.FACEBOOK
  | PROVIDERS.GOOGLE
  | PROVIDERS.NOTKNOWN;
