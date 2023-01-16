import type { AxiosStatic } from 'axios';
import type { Auth, UserCredential } from 'firebase/auth';

import UserEntity from '@/modules/user/UserEntity';
import { PROVIDERS, ROLES } from '@/modules/user/userType';

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

const deleteUser = jest.fn();
const sendEmailVerification = jest.fn();

const axios = {
  post: jest.fn(),
} as unknown as AxiosStatic;

beforeEach(() => {
  jest.clearAllMocks();
});

it('Create and signup the user in firebase', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { id: 'id-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { id: 'id-123', getIdToken: () => 'sessionToken' },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('id-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
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
  const auth = { currentUser: { id: 'id-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { id: 'id-123', getIdToken: () => 'sessionToken' },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('id-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
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
      id: 'id-123',
    })
  );
});

it('Init the session token when user is registered', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { id: 'id-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: {
      id: 'id-123',
      getIdToken: () => 'sessionToken',
    },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('id-123');
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
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
  const auth = { currentUser: { id: 'id-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: {
      id: '',
      getIdToken: () => '',
    },
  });
  (userRepository.add as jest.Mock).mockResolvedValue('id-123');

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    deleteUser,
    sendEmailVerification,
    axios,
  });
  expect(userRepository.add).toHaveBeenCalledTimes(0);
});

it('Delete the user from firebase if the user is not added to the database', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { id: 'id-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: {
      id: 'id-123',
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
        id: 'id-123',
      })
    );
    expect(deleteUser).toHaveBeenCalledWith({ id: 'id-123' });
  }
});

it('send an Email Verification if the user is added to firebase and the DB', async () => {
  const email = 'sylvain.guehria@gmail.com';
  const password = 'password';
  const auth = { currentUser: { id: 'id-123' } } as Auth;

  (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { id: 'id-123', getIdToken: () => 'sessionToken' },
  });
  (userRepository.add as jest.Mock).mockResolvedValue({ id: 'id-123' });
  (sendEmailVerification as jest.Mock).mockResolvedValue(true);

  await registerWithEmail(userRepository)({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
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
      id: 'id-123',
    })
  );
  expect(sendEmailVerification).toHaveBeenCalledWith({ id: 'id-123' });
});
