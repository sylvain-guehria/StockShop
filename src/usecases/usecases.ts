import { userRepository } from 'di';

import { chooseSubRoleOnFirstConnection } from './chooseSubRoleOnFirstConnection';
import { loginWithEmail } from './loginWithEmail';
import { loginWithGoogle } from './loginWithGoogle';
import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail();
export const loginWithGoogleUseCase = loginWithGoogle(userRepository);
export const chooseSubRoleOnFirstConnectionUseCase =
  chooseSubRoleOnFirstConnection(userRepository);
