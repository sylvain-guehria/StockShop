/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { logInfoInConsole } from 'logger';

import UserEntity from './UserEntity';
import { UserRepository } from './userRepository';

class SupabaseUserRepository extends UserRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<UserEntity> {
    logInfoInConsole(`get user in db with id: ${id}`);
    const response = await axios.get(`${this.baseUrl}/api/user/${id}`);
    const {
      email,
      username,
      firstName,
      lastName,
      phone,
      role,
      locale,
      provider,
      hasInventoryManagementServiceActivated,
      hasSeenFirstConnectionModal,
      companyId,
    } = response.data || {};

    return UserEntity.new({
      id,
      email,
      username,
      firstName,
      lastName,
      phone,
      role,
      locale,
      provider,
      hasInventoryManagementServiceActivated,
      hasSeenFirstConnectionModal,
      companyId,
    });
  }

  async add(user: UserEntity): Promise<UserEntity> {
    logInfoInConsole('adding user in db...');
    const res = await axios.post(`${this.baseUrl}/api/user/add`, {
      id: user.getId(),
      email: user.getEmail(),
      provider: user.getProvider(),
      role: user.getRole(),
      locale: user.getLocale(),
    });
    logInfoInConsole(`User added in DB, id: ${user.getId()}`);
    return UserEntity.new(res.data ? { ...res.data } : {});
  }

  async delete(id: string): Promise<void> {
    logInfoInConsole(`Deleting user with id ${id} in db...`);
    return axios.post(`${this.baseUrl}/api/user/delete`, { id });
  }

  async getAll(): Promise<UserEntity[]> {
    logInfoInConsole('get all users in db');
    const response = await axios.get(`${this.baseUrl}/api/user/getAll`);
    return response.data.map(
      (user: UserEntity) =>
        new UserEntity({
          id: user.id,
          email: user.email,
          provider: user.provider,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          role: user.role,
          locale: user.locale,
        }),
    );
  }

  async update(user: UserEntity): Promise<boolean> {
    logInfoInConsole(`update user id: ${user.getId()}`);

    const success = await axios.post(
      `${this.baseUrl}/api/user/${user.getId()}`,
      {
        id: user.getId(),
        updatedAt: new Date().toISOString(),
        email: user.getEmail(),
        username: user.getUsername(),
        firstName: user.getFirstName(),
        lastName: user.getLastName(),
        phone: user.getPhoneNumber(),
        role: user.getRole(),
        hasInventoryManagementServiceActivated: user.isSeller(),
        hasSeenFirstConnectionModal: user.hasSeenFirstConnectionModal,
        locale: user.getLocale(),
        avatarUrl: user.getAvatarUrl(),
        companyId: user.getCompanyId(),
      },
    );
    console.log('success', success);
    if (success) return true;
    return false;
  }
}

export default SupabaseUserRepository;
