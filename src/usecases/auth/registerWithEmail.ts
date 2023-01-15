import type { SupabaseClient } from '@supabase/supabase-js';

import type { UserRepository } from '@/modules/user/userRepository';

type RegisterWithEmailParams = {
  email: string;
  password: string;
  supabase: SupabaseClient<any, 'public', any>;
};

export const registerWithEmail =
  (_userRepository: UserRepository) =>
  async ({
    email,
    password,
    supabase,
  }: RegisterWithEmailParams): Promise<any> => {
    return supabase.auth.signUp({ email, password });
  };
