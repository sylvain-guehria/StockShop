import type { SupabaseClient } from '@supabase/supabase-js';

type LoginWithEmailParamsType = {
  supabase: SupabaseClient<any, 'public', any>;
};

export const logout =
  () =>
  async ({ supabase }: LoginWithEmailParamsType) => {
    return supabase.auth.signOut();
  };
