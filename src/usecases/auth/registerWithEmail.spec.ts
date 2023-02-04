import type { SupabaseClient } from '@supabase/supabase-js';

import { registerWithEmail } from './registerWithEmail';

const auth = {
  signUp: jest.fn(),
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

  await registerWithEmail()({
    email,
    password,
    supabase,
  });

  expect(supabase.auth.signUp).toHaveBeenCalledTimes(1);
  expect(supabase.auth.signUp).toHaveBeenCalledWith({
    email,
    password,
  });
});
