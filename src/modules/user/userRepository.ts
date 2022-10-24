/* eslint-disable class-methods-use-this */

import type UserEntity from './UserEntity';
import type { PROVIDERS, ROLES } from './userType';

/**
 * @abstract
 */
export abstract class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new TypeError(
        'Abstract class "UserRepository" cannot be instantiated, it can only be extended.'
      );
    }
  }

  getById(uid: string): Promise<UserEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
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
    throw new Error(
      `You tried to call an abstract methode, arg: ${{ email, provider, role }}`
    );
  }

  async delete(uid: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${uid}`);
  }

  async getAll(): Promise<UserEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(user: UserEntity): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${{ user }}`);
  }
}

export default UserRepository;
