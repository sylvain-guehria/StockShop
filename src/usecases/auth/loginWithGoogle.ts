import type { OAuthResponse, SupabaseClient } from '@supabase/supabase-js';

import type { UserRepository } from '@/modules/user/userRepository';
import { PROVIDERS } from '@/modules/user/userType';

import { getURL } from './authUtils';

export type LoginWithGoogleParamsType = {
  supabase: SupabaseClient<any, 'public', any>;
};

export const loginWithGoogle =
  (_userRepository: UserRepository) =>
  async ({ supabase }: LoginWithGoogleParamsType): Promise<OAuthResponse> => {
    return supabase.auth.signInWithOAuth({
      provider: PROVIDERS.GOOGLE,
      options: {
        redirectTo: getURL(),
      },
    });
  };
