/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import UserEntity from './UserEntity';
import { UserRepository } from './userRepository';

class SupabaseUserRepository extends UserRepository {
  baseUrl = process.env.NEXT_PUBLIC_APP_URL;

  async getById(id: string): Promise<UserEntity> {
    console.info('get user in db with id: ', id);
    const response = await axios.get(`${this.baseUrl}/api/user/${id}`);
    console.log('response', response.data);
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
    console.info('adding user in db...');
    const res = await axios.post(`${this.baseUrl}/api/user/add`, {
      id: user.getId(),
      email: user.getEmail(),
      provider: user.getProvider(),
      role: user.getRole(),
      locale: user.getLocale(),
    });
    console.info('User added in DB, id: ', user.getId());

    return UserEntity.new(res.data ? { ...res.data } : {});
  }

  async delete(id: string): Promise<void> {
    console.info(`Deleting user with id ${id} in db...`);
    return axios.post(`${this.baseUrl}/api/user/delete`, { id });
  }

  async getAll(): Promise<UserEntity[]> {
    console.info('get all users in db');
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
        })
    );
  }

  async update(user: UserEntity): Promise<boolean> {
    console.info('update user id: ', user.getId());
    const success = await axios.put(
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
      }
    );
    if (success) return true;
    return false;
  }
}

export default SupabaseUserRepository;
