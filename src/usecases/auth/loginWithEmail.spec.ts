import type { AxiosStatic } from 'axios';
import type { Auth, UserCredential } from 'firebase/auth';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

import { loginWithEmail } from './loginWithEmail';

type SignInType = (
  auth: Auth,
  email: string,
  password: string
) => Promise<UserCredential>;

const axios = {
  post: jest.fn(),
} as unknown as AxiosStatic;

const signInWithEmailAndPassword: SignInType = jest.fn();

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

it('Login in firebase client', async () => {
  const auth = { name: 'auth' } as Auth;
  const email: string = 'email';
  const password: string = 'password';

  (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { uid: 'uid-123', getIdToken: () => 'sessionToken' },
  });

  await loginWithEmail()({
    signInWithEmailAndPassword,
    email,
    password,
    auth,
    axios,
  });

  expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
    auth,
    email,
    password
  );
});

it('Login the session', async () => {
  const auth = { name: 'auth' } as Auth;
  const email: string = 'email';
  const password: string = 'password';

  (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
    user: { uid: 'uid-123', getIdToken: () => 'sessionToken' },
  });

  await loginWithEmail()({
    signInWithEmailAndPassword,
    email,
    password,
    auth,
    axios,
  });

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post).toHaveBeenCalledWith('/api/sessionInit', {
    idToken: 'sessionToken',
  });
});

it('Do not login the session if it failed to login in firebase client', async () => {
  const auth = { name: 'auth' } as Auth;
  const email: string = 'email';
  const password: string = 'password';

  const error = new Error('error') as any;
  error.code = 'auth/unknown';

  const addListenerSignOut =
    signInWithEmailAndPassword as jest.MockedFunction<SignInType>;
  addListenerSignOut.mockImplementation(() => Promise.reject(error));

  try {
    await loginWithEmail()({
      signInWithEmailAndPassword,
      email,
      password,
      auth,
      axios,
    });
  } catch (e: any) {
    expect(e).toEqual(
      new FirebaseAuthenticationError({
        errorCode: error.code,
        message: error.message,
      })
    );
    expect(e.errorCode).toEqual('auth/unknown');
  }
  expect(fetch).toHaveBeenCalledTimes(0);
});
