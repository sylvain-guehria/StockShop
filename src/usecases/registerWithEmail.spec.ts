import type { UserRepository } from '@/modules/user/userRepository';

import { registerWithEmail } from './registerWithEmail';

let userRepository: UserRepository;
let signUpEmail: (
  email: string,
  password: string
) => Promise<string | void | null>;

beforeEach(() => {
  userRepository = {
    add: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
  };
  signUpEmail = jest.fn();
});

it('Signup the user in firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (userRepository.add as jest.Mock).mockResolvedValue('uid');

  await registerWithEmail(userRepository)(signUpEmail, {
    email,
    password,
  });

  expect(signUpEmail).toHaveBeenCalledWith(email, password);
});

it('Add the user to the database with the role "user" and the provider "email"', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (signUpEmail as jest.Mock).mockResolvedValue({ uid: 'uid' });

  await registerWithEmail(userRepository)(signUpEmail, {
    email,
    password,
  });

  expect(signUpEmail).toHaveBeenCalledWith(
    'sylvain.guehria@gmail.com',
    'password'
  );

  expect(userRepository.add).toHaveBeenCalledWith({
    email: 'sylvain.guehria@gmail.com',
    provider: 'email',
    role: 'user',
    uid: 'uid',
  });
});

it('Do not signup the user in the database if the user is not add to firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (signUpEmail as jest.Mock).mockResolvedValue({});

  await registerWithEmail(userRepository)(signUpEmail, {
    email,
    password,
  });

  expect(userRepository.add).toHaveBeenCalledTimes(0);
});
