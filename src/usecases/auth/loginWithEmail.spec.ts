import type { SupabaseClient } from '@supabase/supabase-js';

import { loginWithEmail } from './loginWithEmail';

const auth = {
  signInWithPassword: jest.fn(),
} as unknown as SupabaseClient<any, 'public', any>['auth'];

const supabase = {
  auth,
} as unknown as SupabaseClient<any, 'public', any>;

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});

it('Login in firebase client', async () => {
  const email: string = 'email';
  const password: string = 'password';

  await loginWithEmail()({
    email,
    password,
    supabase,
  });

  expect(supabase.auth.signInWithPassword).toHaveBeenCalledTimes(1);
  expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
    email,
    password,
  });
});
