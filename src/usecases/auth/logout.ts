import type { SupabaseClient } from '@supabase/supabase-js';
import Cookies from 'js-cookie';
import { sessionCookieName } from 'supabase/constant';

type LoginWithEmailParamsType = {
  supabase: SupabaseClient<any, 'public', any>;
};

export const logout =
  () =>
  async ({ supabase }: LoginWithEmailParamsType) => {
    try {
      const cookies = Cookies.get();
      const sessionCookie = cookies ? cookies[sessionCookieName] : '';

      if (sessionCookie) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessionLogout`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Cookie: `${sessionCookieName}=${sessionCookie}`,
          },
        });
      }
      return await supabase.auth.signOut();
    } catch (error: any) {
      return null;
    }
  };
