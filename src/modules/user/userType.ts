export interface User {
  loggedIn?: boolean;
  email?: string;
  username?: string;
  provider?: ProviderType;
  uid?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  role?: RoleType;
  hasInventoryManagementServiceActivated?: boolean;
  hasSeenFirstConnectionModal?: boolean;
  locale?: LocaleType;
}

export interface Users {
  user?: User;
  users?: User[];
}

export enum UserEnum {
  LOGGEDIN = 'loggedIn',
  EMAIL = 'email',
  MESSAGE = 'messages',
  USERNAME = 'username',
  ROLES = 'roles',
  UID = 'uid',
  PASSWORD = 'password',
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
