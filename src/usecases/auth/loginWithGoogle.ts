import type { OAuthResponse, SupabaseClient } from '@supabase/supabase-js';

import { PROVIDERS } from '@/modules/user/userType';

import { getURL } from './authUtils';

export type LoginWithGoogleParamsType = {
  supabase: SupabaseClient<any, 'public', any>;
};

export const loginWithGoogle =
  () =>
  async ({ supabase }: LoginWithGoogleParamsType): Promise<OAuthResponse> => {
    return supabase.auth.signInWithOAuth({
      provider: PROVIDERS.GOOGLE,
      options: {
        redirectTo: getURL(),
      },
    });
  };
