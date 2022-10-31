/* eslint-disable complexity */
import type { LocaleType, ProviderType, RoleType, User } from './userType';
import { HISTORYTYPE, LOCALES, PROVIDERS, ROLES } from './userType';

export const defaultHistory = {
  [HISTORYTYPE.SUBSCRIBTIONS]: [],
};

class UserEntity implements User {
  loggedIn: boolean;

  email: string;

  pseudo: string;

  uid: string;

  password: string;

  firstName: string;

  lastName: string;

  language: string;

  phoneNumber: string;

  role: RoleType;

  provider: ProviderType;

  history;

  hasStockManagementServiceActivated: boolean;

  hasSeenFirstConnectionModal: boolean;

  locale: LocaleType;

  static new(user?: User): UserEntity {
    return user
      ? new UserEntity({
          ...user,
        })
      : new UserEntity({
          loggedIn: false,
        });
  }

  constructor(user: User) {
    this.loggedIn = user.loggedIn || false;
    this.email = user.email || '';
    this.provider = user.provider || PROVIDERS.NOTKNOWN;
    this.pseudo = user.pseudo || '';
    this.uid = user.uid || '';
    this.password = user.password || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.language = user.language || '';
    this.phoneNumber = user.phoneNumber || '';
    this.role = user.role || ROLES.USER;
    this.locale = user.locale || LOCALES.FR;
    this.history = user.history || defaultHistory;
    this.hasStockManagementServiceActivated =
      user.hasStockManagementServiceActivated || false;
    this.hasSeenFirstConnectionModal =
      user.hasSeenFirstConnectionModal || false;
  }

  getUid(): string {
    return this.uid;
  }

  getProvider(): ProviderType {
    return this.provider;
  }

  setRole(role: RoleType): UserEntity {
    this.role = role;
    return this;
  }

  getRole(): RoleType {
    return this.role;
  }

  getLocale(): LocaleType {
    return this.locale;
  }

  setFirstName(firstName: string): UserEntity {
    this.firstName = firstName;
    return this;
  }

  getFirstName(): string {
    return this.firstName;
  }

  setLastName(lastName: string): UserEntity {
    this.lastName = lastName;
    return this;
  }

  getLastName(): string {
    return this.lastName;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  getLanguage(): string {
    return this.language;
  }

  setEmail(email: string): UserEntity {
    this.email = this.sanitizeEmail(email);
    return this;
  }

  /**
   * @private
   */
  sanitizeEmail(email: string): string {
    return email
      .toLowerCase()
      .normalize('NFD')
      .replace(/\s/g, '')
      .replace(/[\u0300-\u036f]/g, '');
  }

  getEmail(): string {
    return this.email;
  }

  getPseudo(): string {
    return this.pseudo;
  }

  setPhoneNumber(phoneNumber: string): UserEntity {
    this.phoneNumber = phoneNumber;
    return this;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  isAdmin(): boolean {
    return this.getRole() === ROLES.ADMIN;
  }

  isSuperAdmin(): boolean {
    return this.getRole() === ROLES.SUPERADMIN;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isLoggedOut(): boolean {
    return !this.loggedIn;
  }

  logInUser(): UserEntity {
    this.loggedIn = true;
    return this;
  }

  isSeller(): boolean {
    return this.hasStockManagementServiceActivated;
  }

  needToSeeFirstConnectionModal(): boolean {
    return !this.hasSeenFirstConnectionModal;
  }

  activateSockManagement(): UserEntity {
    this.hasStockManagementServiceActivated = true;
    return this;
  }

  desActivateSockManagement(): UserEntity {
    this.hasStockManagementServiceActivated = false;
    return this;
  }

  markFirstConnectionModalAsSeen(): UserEntity {
    this.hasSeenFirstConnectionModal = true;
    return this;
  }
}

export default UserEntity;