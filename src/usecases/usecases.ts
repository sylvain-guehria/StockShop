import { userRepository } from 'di';

import { loginWithEmail } from './loginWithEmail';
import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
export const loginWithEmailUseCase = loginWithEmail();
