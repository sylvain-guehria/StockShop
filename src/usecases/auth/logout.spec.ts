import type { SupabaseClient } from '@supabase/supabase-js';

import { logout } from './logout';

const auth = {
  signOut: jest.fn(),
} as unknown as SupabaseClient<any, 'public', any>['auth'];

const supabase = {
  auth,
} as unknown as SupabaseClient<any, 'public', any>;

beforeEach(() => {
  jest.resetModules();
  jest.resetAllMocks();
});
it('Logout from supabase', async () => {
  await logout()({
    supabase,
  });

  expect(supabase.auth.signOut).toHaveBeenCalledTimes(1);
  expect(supabase.auth.signOut).toHaveBeenCalledWith();
});
