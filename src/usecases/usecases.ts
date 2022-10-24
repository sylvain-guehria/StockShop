import { userRepository } from 'di';

import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(userRepository);
