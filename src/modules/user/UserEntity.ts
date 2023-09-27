/* eslint-disable complexity */
import type { LocaleType, ProviderType, RoleType, User } from './userType';
import { LOCALES, PROVIDERS, ROLES } from './userType';

class UserEntity implements User {
  email: string;

  username?: string;

  id: string;

  password: string;

  firstName: string;

  lastName: string;

  phone: string;

  role: RoleType;

  provider: ProviderType;

  hasInventoryManagementServiceActivated: boolean;

  hasSeenFirstConnectionModal: boolean;

  locale: LocaleType;

  companyId: string;

  avatarUrl: string;

  static new(user?: User | null): UserEntity {
    return user
      ? new UserEntity({
          ...user,
        })
      : new UserEntity({});
  }

  constructor(user: User) {
    this.email = user.email || '';
    this.provider = user.provider || PROVIDERS.NOTKNOWN;
    this.username = user.username || undefined;
    this.id = user.id || '';
    this.password = user.password || '';
    this.firstName = user.firstName || '';
    this.lastName = user.lastName || '';
    this.phone = user.phone || '';
    this.role = user.role || ROLES.USER;
    this.locale = user.locale || LOCALES.FR;
    this.hasInventoryManagementServiceActivated =
      user.hasInventoryManagementServiceActivated || false;
    this.hasSeenFirstConnectionModal =
      user.hasSeenFirstConnectionModal || false;
    this.companyId = user.companyId || '';
    this.avatarUrl = user.avatarUrl || '';
  }

  getId(): string {
    return this.id;
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

  getUsername(): string | undefined {
    return this.username;
  }

  setUserName(username: string): UserEntity {
    this.username = username;
    return this;
  }

  setPhoneNumber(phone: string): UserEntity {
    this.phone = phone;
    return this;
  }

  getPhoneNumber(): string {
    return this.phone;
  }

  isAdmin(): boolean {
    return this.getRole() === ROLES.ADMIN;
  }

  isSuperAdmin(): boolean {
    return this.getRole() === ROLES.SUPERADMIN;
  }

  isLoggedIn(): boolean {
    return !!this.id;
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

  setCompanyId(companyId: string): UserEntity {
    this.companyId = companyId;
    return this;
  }

  getCompanyId(): string {
    return this.companyId;
  }

  setAvatarUrl(avatarUrl: string): UserEntity {
    this.avatarUrl = avatarUrl;
    return this;
  }

  getAvatarUrl(): string {
    return this.avatarUrl;
  }

  toJson(): User {
    return {
      email: this.email,
      username: this.username,
      id: this.id,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      role: this.role,
      provider: this.provider,
      hasInventoryManagementServiceActivated:
        this.hasInventoryManagementServiceActivated,
      hasSeenFirstConnectionModal: this.hasSeenFirstConnectionModal,
      locale: this.locale,
      companyId: this.companyId,
      avatarUrl: this.avatarUrl,
    };
  }
}

export default UserEntity;
