import type { SupabaseClient } from '@supabase/supabase-js';

import { PROVIDERS } from '@/modules/user/userType';

import { getURL } from './authUtils';
import { loginWithGoogle } from './loginWithGoogle';

const auth = {
  signInWithOAuth: jest.fn(),
} as unknown as SupabaseClient<any, 'public', any>['auth'];

const supabase = {
  auth,
} as unknown as SupabaseClient<any, 'public', any>;

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

it('Login in firebase client', async () => {
  await loginWithGoogle()({
    supabase,
  });

  expect(supabase.auth.signInWithOAuth).toHaveBeenCalledTimes(1);
  expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
    provider: PROVIDERS.GOOGLE,
    options: {
      redirectTo: getURL(),
    },
  });
});
