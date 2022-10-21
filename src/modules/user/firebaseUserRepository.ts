import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';

import UserEntity, { defaultHistory } from './UserEntity';
import UserRepository from './userRepository';
import type { User } from './userType';
import { ROLES } from './userType';

class FirebaseUserRepository extends UserRepository {
  constructor() {
    super();
  }

  async getById(uid: string): Promise<UserEntity> {
    // logger.info('get user in db with uid: ', uid);
    const response = await axios.get(`/user/${uid}`);
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

    return new UserEntity({
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

  async add(user: User): Promise<unknown> {
    // logger.info('add user in db with uid: ', user.uid);
    const res = await axios.post('/user/save', {
      uid: user.uid || uuidV4(),
      email: user.email || '',
      provider: user.provider || '',
      pseudo: user.pseudo || '',
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      language: user.language || '',
      phoneNumber: user.phoneNumber || '',
      role: user.role || ROLES.USER,
      creationDate: Date.now(),
      lastLogin: Date.now(),
      history: user.history || defaultHistory,
    });
    return res;
  }

  async getAll(): Promise<UserEntity[]> {
    // logger.info('get all users in db');
    const response = await axios.get('/user/getAll');
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
    // logger.info('update user uid: ', user.uid);
    await axios.put(`/user/${user.uid}`, {
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
      history: user.getHistory(),
    });
  }
}

export default FirebaseUserRepository;
