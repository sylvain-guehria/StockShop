import 'server-only';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

import type { User } from '@/modules/user/userType';
import type { Database } from '@/types/supabase';

import { TableNames } from './enums/tableNames';

export const getUserInServerComponant = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { data } = await supabase.auth.getUser();
  let userProfile = null;

  if (data.user?.id) {
    const { data: profileData } = await supabase
      .from(TableNames.PROFILES)
      .select('*')
      .eq('id', data.user.id)
      .single();
    userProfile = profileData || null;
  }
  return userProfile as User;
};

export const getUserByIdInServerComponant = async (userId?: string) => {
  if (!userId) return null;
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data: profileData } = await supabase
    .from(TableNames.PROFILES)
    .select('*')
    .eq('id', userId)
    .single();

  return profileData as User;
};
