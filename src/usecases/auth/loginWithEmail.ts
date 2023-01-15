import type { SupabaseClient } from '@supabase/supabase-js';

type LoginWithEmailParamsType = {
  email: string;
  password: string;
  supabase: SupabaseClient<any, 'public', any>;
};

export const loginWithEmail =
  () =>
  async ({ email, password, supabase }: LoginWithEmailParamsType) => {
    return supabase.auth.signInWithPassword({ email, password });
  };
