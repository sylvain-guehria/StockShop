/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import axios from 'axios';

import UserEntity from './UserEntity';
import { UserRepository } from './userRepository';

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
      hasStockManagementServiceActivated,
      hasSeenFirstConnectionModal,
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
      hasStockManagementServiceActivated,
      hasSeenFirstConnectionModal,
    });
  }

  async add(user: UserEntity): Promise<string> {
    console.info('adding user in db...');
    const res = await axios.post('/api/user/add', {
      uid: user.getUid(),
      email: user.getEmail(),
      provider: user.getProvider(),
      role: user.getRole(),
      creationDate: new Date().getTime(),
      lastLogin: new Date().getTime(),
    });
    console.info('User added in DB, uid: ', user.getUid());
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
    console.info('update user uid: ', user.getUid());
    await axios.put(`/api/user/${user.getUid()}`, {
      uid: user.getUid(),
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
      hasStockManagementServiceActivated: user.isSeller(),
      hasSeenFirstConnectionModal: user.hasSeenFirstConnectionModal,
    });
  }
}

export default FirebaseUserRepository;
