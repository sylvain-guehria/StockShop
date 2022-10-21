import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserService from '@/modules/user/userService';

import storageFunctions from './firebaseFolder/storage';

const userRepository = new FirebaseUserRepository();

export const userServiceDi = new UserService(userRepository, storageFunctions);

export default {
  userRepository,
  userServiceDi,
  storageFunctions,
};
