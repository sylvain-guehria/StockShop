/* eslint-disable class-methods-use-this */

import { methodMustBeImplemented } from '@/utils/abstract';

import type UserEntity from './UserEntity';
import type { PROVIDERS } from './userType';

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
  }: {
    email: string;
    provider: PROVIDERS.EMAIL | PROVIDERS.GOOGLE | PROVIDERS.FACEBOOK;
  }): Promise<string> {
    return methodMustBeImplemented({ email, provider });
  }

  async getAll(): Promise<UserEntity[]> {
    throw methodMustBeImplemented();
  }

  async update(user: UserEntity): Promise<void> {
    throw methodMustBeImplemented(user);
  }
}

export default UserRepository;
