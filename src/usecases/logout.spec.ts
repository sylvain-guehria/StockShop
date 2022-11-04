import type { Auth } from 'firebase/auth';
import Cookie from 'js-cookie';

import { sessionCookieName } from '../../firebaseFolder/constant';
import { FirebaseAuthenticationError } from '../../firebaseFolder/errorCodes';
import { logout } from './logout';

Cookie.get = jest.fn();

type SignOutType = (auth: Auth) => Promise<void>;
const signOut: SignOutType = jest.fn();
const originalEnv = process.env;

beforeEach(() => {
  (fetch as any).resetMocks();
  jest.resetModules();
  process.env = {
    ...originalEnv,
    NEXT_PUBLIC_CLIENT_URL: 'http://localhost:3000',
  };
});

afterEach(() => {
  process.env = originalEnv;
  jest.resetAllMocks();
});

it('Logout from firebase client', async () => {
  const auth = { name: 'auth' } as Auth;
  (fetch as any).mockResponseOnce({});

  await logout()({
    signOut,
    auth,
  });

  expect(signOut).toHaveBeenCalledTimes(1);
  expect(signOut).toHaveBeenCalledWith(auth);
});

it('Logout the session', async () => {
  const auth = { name: 'auth' } as Auth;

  const listenerGetCookie = jest.spyOn(Cookie, 'get');
  listenerGetCookie.mockImplementation(() => {
    return { [sessionCookieName]: 'mockedSessionCookie' };
  });

  (fetch as any).mockResponseOnce({});

  await logout()({
    signOut,
    auth,
  });

  expect(fetch).toHaveBeenCalledTimes(1);
  expect(fetch).toHaveBeenCalledWith(
    'http://localhost:3000/api/sessionLogout',
    {
      credentials: 'include',
      headers: { Cookie: 'session=mockedSessionCookie' },
      method: 'GET',
    }
  );
});

it('Do not logout the session if it failed to logout from firebase client', async () => {
  const auth = { name: 'auth' } as Auth;

  const error = new Error('error') as any;
  error.code = 'auth/unknown';

  const addListenerSignOut = signOut as jest.MockedFunction<SignOutType>;
  addListenerSignOut.mockImplementation(() => Promise.reject(error));

  try {
    await logout()({
      signOut,
      auth,
    });
  } catch (e: any) {
    expect(e).toEqual(new FirebaseAuthenticationError('auth/unknown'));
    expect(e.errorCode).toEqual('auth/unknown');
  }
  expect(fetch).toHaveBeenCalledTimes(0);
});
