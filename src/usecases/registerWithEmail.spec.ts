import type { AxiosStatic } from 'axios';
import type { Auth, UserCredential } from 'firebase/auth';

import UserEntity from '@/modules/user/UserEntity';
import { PROVIDERS, ROLES } from '@/modules/user/userType';
import { mainRoutes } from '@/routes/mainRoutes';

import { registerWithEmail } from './registerWithEmail';

const createUserWithEmailAndPassword: (
  auth: Auth,
  email: string,
  password: string
) => Promise<UserCredential> = jest.fn();

const userRepository = {
  add: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
};
const router = {
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

const deleteUser = jest.fn();
const sendEmailVerification = jest.fn();

const axios = {
  post: jest.fn(),
} as unknown as AxiosStatic;

it('Create and signup the user in firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { uid: 'uid-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { uid: 'uid-123', getIdToken: () => 'sessionToken' },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('uid-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    deleteUser,
    sendEmailVerification,
    axios,
  });

  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
    auth,
    email,
    password
  );
});

it('Add the user to the database with the role "user" and the provider "email"', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { uid: 'uid-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { uid: 'uid-123', getIdToken: () => 'sessionToken' },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('uid-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    deleteUser,
    sendEmailVerification,
    axios,
  });
  expect(userRepository.add).toHaveBeenCalledTimes(1);
  expect(userRepository.add).toHaveBeenCalledWith(
    UserEntity.new({
      email: 'sylvain.guehria@gmail.com',
      provider: PROVIDERS.PASSWORD,
      role: ROLES.USER,
      uid: 'uid-123',
    })
  );
});

it('Init the session token when user is registered', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { uid: 'uid-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: {
      uid: 'uid-123',
      getIdToken: () => 'sessionToken',
    },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('uid-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    deleteUser,
    sendEmailVerification,
    axios,
  });
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith('/api/sessionInit', {
    idToken: 'sessionToken',
  });
});

it('Do not add the user in the database if the user is not added to firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { uid: 'uid-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: {
      uid: '',
      getIdToken: () => '',
    },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('uid-123');

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    deleteUser,
    sendEmailVerification,
    axios,
  });
  expect(userRepository.add).toHaveBeenCalledTimes(0);
});

it('Delete the user from firebase if the user is not added to the database', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { uid: 'uid-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: {
      uid: 'uid-123',
      getIdToken: () => 'sessionToken',
    },
  });
  (userRepository.add as jest.Mock).mockImplementation(() => {
    throw new Error();
  });

  try {
    await registerWithEmail(userRepository)({
      email,
      password,
      createUserWithEmailAndPassword,
      auth,
      router,
      deleteUser,
      sendEmailVerification,
      axios,
    });
  } catch (e) {
    expect(userRepository.add).toHaveBeenCalledTimes(1);
    expect(userRepository.add).toHaveBeenCalledWith(
      UserEntity.new({
        email,
        provider: PROVIDERS.PASSWORD,
        role: ROLES.USER,
        uid: 'uid-123',
      })
    );
    expect(deleteUser).toHaveBeenCalledWith({ uid: 'uid-123' });
  }
});

it('send an Email Verification and redirect the user if the user is added to firebase and the DB', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { uid: 'uid-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { uid: 'uid-123', getIdToken: () => 'sessionToken' },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('uid-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    deleteUser,
    sendEmailVerification,
    axios,
  });
  expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
    auth,
    email,
    password
  );
  expect(userRepository.add).toHaveBeenCalledWith(
    UserEntity.new({
      email: 'sylvain.guehria@gmail.com',
      provider: PROVIDERS.PASSWORD,
      role: ROLES.USER,
      uid: 'uid-123',
    })
  );
  expect(sendEmailVerification).toHaveBeenCalledWith({ uid: 'uid-123' });
  expect(router.push).toHaveBeenCalledWith(mainRoutes.home.path);
});
