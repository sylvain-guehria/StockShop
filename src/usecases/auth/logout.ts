import type { SupabaseClient } from '@supabase/supabase-js';

type LoginWithEmailParamsType = {
  supabase: SupabaseClient<any, 'public', any>;
};

export const logout =
  () =>
  async ({ supabase }: LoginWithEmailParamsType) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessionLogout`, {
        method: 'GET',
        credentials: 'include',
      });
      return await supabase.auth.signOut();
    } catch (error: any) {
      return null;
    }
  };
