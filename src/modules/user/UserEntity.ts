/* eslint-disable complexity */
import type { LocaleType, ProviderType, RoleType, User } from './userType';
import { LOCALES, PROVIDERS, ROLES } from './userType';

class UserEntity implements User {
  email: string;

  username: string;

  uid: string;

  password: string;

  firstName: string;

  lastName: string;

  phoneNumber: string;

  role: RoleType;

  provider: ProviderType;

  hasInventoryManagementServiceActivated: boolean;

  hasSeenFirstConnectionModal: boolean;

  locale: LocaleType;

  companyUid: string;

  static new(user?: User): UserEntity {
    return user
      ? new UserEntity({
          ...user,
        })
      : new UserEntity({});
  }

  constructor(user: User) {
    this.email = user.email || '';
    this.provider = user.provider || PROVIDERS.NOTKNOWN;
    this.username = user.username || '';
    this.uid = user.uid || '';
    this.password = user.password || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.phoneNumber = user.phoneNumber || '';
    this.role = user.role || ROLES.USER;
    this.locale = user.locale || LOCALES.FR;
    this.hasInventoryManagementServiceActivated =
      user.hasInventoryManagementServiceActivated || false;
    this.hasSeenFirstConnectionModal =
      user.hasSeenFirstConnectionModal || false;
    this.companyUid = user.companyUid || '';
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

  getUsername(): string {
    return this.username;
  }

  setUserName(username: string): UserEntity {
    this.username = username;
    return this;
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
    return !!this.uid;
  }

  isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  isSeller(): boolean {
    return this.hasInventoryManagementServiceActivated;
  }

  needToSeeFirstConnectionModal(): boolean {
    return !this.hasSeenFirstConnectionModal;
  }

  activateSockManagement(): UserEntity {
    this.hasInventoryManagementServiceActivated = true;
    return this;
  }

  desActivateSockManagement(): UserEntity {
    this.hasInventoryManagementServiceActivated = false;
    return this;
  }

  markFirstConnectionModalAsSeen(): UserEntity {
    this.hasSeenFirstConnectionModal = true;
    return this;
  }

  setCompanyUid(companyUid: string): UserEntity {
    this.companyUid = companyUid;
    return this;
  }

  getCompanyUid(): string {
    return this.companyUid;
  }
}

export default UserEntity;
