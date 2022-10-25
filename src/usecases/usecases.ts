import { userRepository } from 'di';

import { chooseRoleOnFirstConnection } from './chooseRoleOnFirstConnection';
import { loginWithEmail } from './loginWithEmail';
import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail();
export const chooseRoleOnFirstConnectionUseCase =
  chooseRoleOnFirstConnection(userRepository);
