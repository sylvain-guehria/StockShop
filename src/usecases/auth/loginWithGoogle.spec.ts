import type { AxiosStatic } from 'axios';
import type { Auth, AuthProvider } from 'firebase/auth';

import UserEntity from '@/modules/user/UserEntity';
import { LOCALES, PROVIDERS } from '@/modules/user/userType';

import type {
  GetAdditionalUserInfoType,
  SignInWithPopupType,
} from './loginWithGoogle';
import { loginWithGoogle } from './loginWithGoogle';

const axios = {
  post: jest.fn(),
} as unknown as AxiosStatic;

const signInWithPopup: SignInWithPopupType = jest.fn();
const getAdditionalUserInfo: GetAdditionalUserInfoType = jest.fn();

const userRepository = {
  add: jest.fn(),
  delete: jest.fn(),
  getById: jest.fn(),
  getAll: jest.fn(),
  update: jest.fn(),
};

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

it('Open the firebase popup to signin the user', async () => {
  const auth = { name: 'auth' } as Auth;
  const provider = {} as AuthProvider;

  (signInWithPopup as jest.Mock).mockResolvedValue({
    user: { uid: 'uid-123', getIdToken: () => 'sessionToken' },
  });

  await loginWithGoogle(userRepository)({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
  });

  expect(signInWithPopup).toHaveBeenCalledTimes(1);
  expect(signInWithPopup).toHaveBeenCalledWith(auth, provider);
});

it('Get the additionnal user information', async () => {
  const auth = { name: 'auth' } as Auth;
  const provider = {} as AuthProvider;

  const userCredential = {
    user: {
      uid: 'uid-123',
      getIdToken: () => 'sessionToken',
    },
  };

  (signInWithPopup as jest.Mock).mockResolvedValue(userCredential);

  await loginWithGoogle(userRepository)({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
  });

  expect(getAdditionalUserInfo).toHaveBeenCalledTimes(1);
  expect(getAdditionalUserInfo).toHaveBeenCalledWith(userCredential);
});

it('Add the user in the database if he is a new user', async () => {
  const auth = { name: 'auth' } as Auth;
  const provider = {} as AuthProvider;

  const userCredential = {
    user: {
      uid: 'uid-123',
      email: 'email@gmail.com',
      getIdToken: () => 'sessionToken',
    },
  };

  const additionalUserInfo = {
    isNewUser: true,
    profile: {
      given_name: 'given_name',
      family_name: 'family_name',
      locale: LOCALES.FR,
    },
  };

  (signInWithPopup as jest.Mock).mockResolvedValue(userCredential);
  (getAdditionalUserInfo as jest.Mock).mockReturnValue(additionalUserInfo);

  await loginWithGoogle(userRepository)({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
  });

  expect(userRepository.add).toHaveBeenCalledTimes(1);
  expect(userRepository.add).toHaveBeenCalledWith(
    UserEntity.new({
      uid: 'uid-123',
      email: 'email@gmail.com',
      firstName: 'given_name',
      lastName: 'family_name',
      locale: LOCALES.FR,
      provider: PROVIDERS.GOOGLE,
    })
  );
});

it('Do not add the user in the database if he is a new user', async () => {
  const auth = { name: 'auth' } as Auth;
  const provider = {} as AuthProvider;

  const userCredential = {
    user: {
      uid: 'uid-123',
      email: 'email@gmail.com',
      getIdToken: () => 'sessionToken',
    },
  };

  const additionalUserInfo = {
    isNewUser: false,
    profile: {
      given_name: 'given_name',
      family_name: 'family_name',
      locale: LOCALES.FR,
    },
  };

  (signInWithPopup as jest.Mock).mockResolvedValue(userCredential);
  (getAdditionalUserInfo as jest.Mock).mockReturnValue(additionalUserInfo);

  await loginWithGoogle(userRepository)({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
  });

  expect(userRepository.add).toHaveBeenCalledTimes(0);
});

it('Init the session', async () => {
  const auth = { name: 'auth' } as Auth;
  const provider = {} as AuthProvider;

  const userCredential = {
    user: {
      uid: 'uid-123',
      email: 'email@gmail.com',
      getIdToken: () => 'sessionToken',
    },
  };

  const additionalUserInfo = {
    isNewUser: false,
    profile: {
      given_name: 'given_name',
      family_name: 'family_name',
      locale: LOCALES.FR,
    },
  };

  (signInWithPopup as jest.Mock).mockResolvedValue(userCredential);
  (getAdditionalUserInfo as jest.Mock).mockReturnValue(additionalUserInfo);

  await loginWithGoogle(userRepository)({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
  });

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith('/api/sessionInit', {
    idToken: 'sessionToken',
  });
});

it('Do not init the session if there is an error during the popup signin and log the error', async () => {
  const auth = { name: 'auth' } as Auth;
  const provider = {} as AuthProvider;

  (signInWithPopup as jest.Mock).mockRejectedValue(
    new Error('error during the popup signin')
  );

  try {
    await loginWithGoogle(userRepository)({
      signInWithPopup,
      getAdditionalUserInfo,
      provider,
      auth,
      axios,
    });
  } catch (e: any) {
    expect(getAdditionalUserInfo).toHaveBeenCalledTimes(0);
    expect(userRepository.add).toHaveBeenCalledTimes(0);
    expect(axios.post).toHaveBeenCalledTimes(0);
    expect(e.message).toEqual('error during the popup signin');
  }
});
