/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

import UserEntity from './UserEntity';
import { UserRepository } from './userRepository';
import type { PROVIDERS, ROLES } from './userType';

class FirebaseUserRepository extends UserRepository {
  async getById(uid: string): Promise<UserEntity> {
    console.info('get user in db with uid: ', uid);
    const response = await axios.get(`/api/user/${uid}`);
    const {
      email,
      pseudo,
      firstName,
      lastName,
      language,
      phoneNumber,
      role,
      creationDate,
      lastLogin,
      provider,
      history,
    } = response.data;

    return UserEntity.new({
      uid,
      email,
      pseudo,
      firstName,
      lastName,
      language,
      phoneNumber,
      role,
      creationDate,
      lastLogin,
      provider,
      history,
    });
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
    const uid = uuidV4();
    console.info('adding user in db...');
    const res = await axios.post('/api/user/save', {
      uid,
      email,
      provider,
      role,
    });
    console.info('User added in DB, uid: ', uid);
    return res.data;
  }

  async delete(uid: string): Promise<void> {
    console.info(`Deleting user with uid ${uid} in db...`);
    return axios.post('/api/user/delete', { uid });
  }

  async getAll(): Promise<UserEntity[]> {
    console.info('get all users in db');
    const response = await axios.get('/api/user/getAll');
    return response.data.map(
      (user: UserEntity) =>
        new UserEntity({
          uid: user.uid,
          email: user.email,
          provider: user.provider,
          pseudo: user.pseudo,
          firstName: user.firstName,
          lastName: user.lastName,
          language: user.language,
          phoneNumber: user.phoneNumber,
          role: user.role,
          creationDate: user.creationDate,
          lastLogin: user.lastLogin,
          history: user.history,
        })
    );
  }

  async update(user: UserEntity): Promise<void> {
    console.info('update user uid: ', user.uid);
    await axios.put(`/api/user/${user.uid}`, {
      uid: user.getId(),
      email: user.getEmail(),
      provider: user.getProvider(),
      pseudo: user.getPseudo(),
      firstName: user.getFirstName(),
      lastName: user.getLastName(),
      language: user.getLanguage(),
      phoneNumber: user.getPhoneNumber(),
      role: user.getRole(),
      creationDate: user.getCreationDate(),
      lastLogin: user.getLastLogin(),
    });
  }
}

export default FirebaseUserRepository;
