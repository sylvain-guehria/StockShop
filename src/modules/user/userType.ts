export interface User {
  loggedIn?: boolean;
  email?: string;
  pseudo?: string;
  provider?: ProviderType;
  uid?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  phoneNumber?: string;
  role?: RoleType;
  creationDate?: number;
  lastLogin?: number;
  history?: History;
  hasStockManagementServiceActivated?: boolean;
  hasSeenFirstConnectionModal?: boolean;
}

export interface Users {
  user?: User;
  users?: User[];
}

export enum UserEnum {
  LOGGEDIN = 'loggedIn',
  EMAIL = 'email',
  MESSAGE = 'messages',
  PSEUDO = 'pseudo',
  ROLES = 'roles',
  UID = 'uid',
  PASSWORD = 'password',
}

export enum ROLES {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  USER = 'user',
}

export type RoleType = ROLES.SUPERADMIN | ROLES.ADMIN | ROLES.USER;

export enum SUBROLES {
  SELLER = 'seller',
  BUYER = 'buyer',
}

export enum PROVIDERS {
  FACEBOOK = 'facebook',
  GOOGLE = 'google',
  EMAIL = 'email',
  NOTKNOWN = 'notKnown',
}

export type ProviderType =
  | PROVIDERS.EMAIL
  | PROVIDERS.FACEBOOK
  | PROVIDERS.GOOGLE
  | PROVIDERS.NOTKNOWN;

export enum HISTORYTYPE {
  ITEMS = 'items',
  TICKETS = 'tickets',
  SUBSCRIBTIONS = 'subscriptions',
}

export type History = {
  [HISTORYTYPE.ITEMS]?: ItemHistory[];
  [HISTORYTYPE.TICKETS]?: TicketHistory[];
  [HISTORYTYPE.SUBSCRIBTIONS]?: SubscriptionHistory[];
};

type ItemHistory = {
  itemId: string;
  date: number;
  quantity: number;
};

type TicketHistory = {
  ticketId: string;
  date: number;
  quantity: number;
};

type SubscriptionHistory = {
  subscriptionId: string;
  date: number;
};
