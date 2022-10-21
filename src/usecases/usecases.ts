import di from '../../di';
import { registerWithEmail } from './registerWithEmail';

export const registerWithEmailUseCase = registerWithEmail(di.userRepository);
