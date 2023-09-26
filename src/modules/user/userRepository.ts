/* eslint-disable class-methods-use-this */

import type UserEntity from './UserEntity';

/**
 * @abstract
 */
export abstract class UserRepository {
  constructor() {
    if (this.constructor === UserRepository) {
      throw new TypeError(
        'Abstract class "UserRepository" cannot be instantiated, it can only be extended.',
      );
    }
  }

  getById(id: string): Promise<UserEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async add(user: UserEntity): Promise<UserEntity> {
    throw new Error(`You tried to call an abstract methode, arg: ${user}`);
  }

  async delete(id: string): Promise<void> {
    throw new Error(`You tried to call an abstract methode, arg: ${id}`);
  }

  async getAll(): Promise<UserEntity[]> {
    throw new Error(`You tried to call an abstract methode, arg`);
  }

  async update(user: UserEntity): Promise<boolean> {
    throw new Error(`You tried to call an abstract methode, arg: ${{ user }}`);
  }
}

export default UserRepository;
