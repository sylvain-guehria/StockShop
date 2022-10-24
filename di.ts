import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserService from '@/modules/user/userService';

export const userRepository = new FirebaseUserRepository();

export const userServiceDi = new UserService(userRepository);
