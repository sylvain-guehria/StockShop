/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { logInfoInConsole } from 'logger';

import UserEntity from './UserEntity';
import { UserRepository } from './userRepository';

class SupabaseUserRepository extends UserRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<UserEntity | null> {
    logInfoInConsole(`get user in db with id: ${id}`);
    const { data } = await axios.get(`${this.baseUrl}/api/user/${id}`);
    return data ? UserEntity.new(data) : null;
  }

  async add(user: UserEntity): Promise<UserEntity | null> {
    logInfoInConsole('adding user in db...');
    const { data } = await axios.post(`${this.baseUrl}/api/user/add`, user);
    logInfoInConsole(`User added in DB, id: ${user.getId()}`);
    return data ? UserEntity.new(data) : null;
  }

  async update(user: UserEntity): Promise<UserEntity | null> {
    logInfoInConsole(`update user id: ${user.getId()}`);

    const { data } = await axios.post(
      `${this.baseUrl}/api/user/${user.getId()}`,
      user,
    );
    return data ? UserEntity.new(data) : null;
  }

  async delete(id: string): Promise<boolean> {
    logInfoInConsole(`Deleting user with id ${id} in db...`);
    const { data } = await axios.post(`${this.baseUrl}/api/user/delete`, {
      id,
    });
    return data;
  }

  async getAll(): Promise<UserEntity[] | null> {
    logInfoInConsole('get all users in db');
    const { data } = await axios.get(`${this.baseUrl}/api/user/getAll`);
    return data ? data.map((user: UserEntity) => new UserEntity(user)) : null;
  }
}

export default SupabaseUserRepository;
