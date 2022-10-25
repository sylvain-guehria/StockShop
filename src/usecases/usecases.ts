import { userRepository } from 'di';

import { chooseSubRoleOnFirstConnection } from './chooseSubRoleOnFirstConnection';
import { loginWithEmail } from './loginWithEmail';
import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail();
export const chooseSubRoleOnFirstConnectionUseCase =
  chooseSubRoleOnFirstConnection(userRepository);
