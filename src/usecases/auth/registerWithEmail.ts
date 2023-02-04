import type { AuthResponse, SupabaseClient } from '@supabase/supabase-js';

type RegisterWithEmailParams = {
  email: string;
  password: string;
  supabase: SupabaseClient<any, 'public', any>;
};

export const registerWithEmail =
  () =>
  async ({
    email,
    password,
    supabase,
  }: RegisterWithEmailParams): Promise<AuthResponse> => {
    return supabase.auth.signUp({ email, password });
  };
