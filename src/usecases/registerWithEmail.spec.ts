import type UserRepository from '@/modules/user/userRepository';

import { registerWithEmail } from './registerWithEmail';

let userRepository: UserRepository;
let router: any;
let signUpEmail: (email: string, password: string) => void;

beforeEach(() => {
  userRepository = {
    add: jest.fn(),
    delete: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
  };
  router = {
    push: jest.fn(),
  };
  signUpEmail = jest.fn();
});

const SUCCESS = true;
const FAILED = false;

it('Add the user to the database with the role "user" and the provider "email"', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  await registerWithEmail(userRepository)(signUpEmail, router, {
    email,
    password,
  });

  expect(userRepository.add).toHaveBeenCalledWith({
    email: 'sylvain.guehria@gmail.com',
    provider: 'email',
    role: 'user',
  });
});

it('Signup the user in firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (userRepository.add as jest.Mock).mockResolvedValue('uid');

  await registerWithEmail(userRepository)(signUpEmail, router, {
    email,
    password,
  });

  expect(signUpEmail).toHaveBeenCalledWith(email, password);
});

it('Do not signup the user in firebase if the user is not added in DB', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (userRepository.add as jest.Mock).mockResolvedValue(FAILED);

  await registerWithEmail(userRepository)(signUpEmail, router, {
    email,
    password,
  });

  expect(signUpEmail).toHaveBeenCalledTimes(0);
});

it('Delete the added user if he is added in DB but not signed up in firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (userRepository.add as jest.Mock).mockResolvedValue('uidtodelete');
  (signUpEmail as jest.Mock).mockResolvedValue(false);

  await registerWithEmail(userRepository)(signUpEmail, router, {
    email,
    password,
  });

  expect(userRepository.delete).toHaveBeenCalledWith('uidtodelete');
});

it('Redirect the user to the home page if he is correctly registered', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';

  (userRepository.add as jest.Mock).mockResolvedValue('uidtodelete');
  (signUpEmail as jest.Mock).mockResolvedValue(SUCCESS);

  await registerWithEmail(userRepository)(signUpEmail, router, {
    email,
    password,
  });

  expect(router.push).toHaveBeenCalledWith('/');
});
