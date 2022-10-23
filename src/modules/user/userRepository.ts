/* eslint-disable class-methods-use-this */

import { methodMustBeImplemented } from '@/utils/abstract';

import type UserEntity from './UserEntity';
import type { PROVIDERS, ROLES } from './userType';

/**
 * @abstract
 */
class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new TypeError(
        'Abstract class "ProfileRepository" cannot be instantiated, it can only be extended.'
      );
    }
  }

  async getById(uid: string): Promise<UserEntity> {
    throw methodMustBeImplemented(uid);
  }

  async add({
    email,
    provider,
    role,
  }: {
    email: string;
    provider: PROVIDERS.EMAIL | PROVIDERS.GOOGLE | PROVIDERS.FACEBOOK;
    role: ROLES.ADMIN | ROLES.SUPERADMIN | ROLES.USER;
  }): Promise<string> {
    return methodMustBeImplemented({ email, provider, role });
  }

  async delete(uid: string): Promise<void> {
    return methodMustBeImplemented(uid);
  }

  async getAll(): Promise<UserEntity[]> {
    throw methodMustBeImplemented();
  }

  async update(user: UserEntity): Promise<void> {
    throw methodMustBeImplemented(user);
  }
}

export default UserRepository;
