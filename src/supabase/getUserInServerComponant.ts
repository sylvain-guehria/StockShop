import 'server-only';

import { TableNames } from './enums/tableNames';
import { createServerCompSupabaseClient } from './server/supabase-server';

export const getUserInServerComponant = async () => {
  const supabase = createServerCompSupabaseClient();
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
  return userProfile;
};

export const getUserByIdInServerComponant = async (userId?: string) => {
  if (!userId) return null;
  const supabase = createServerCompSupabaseClient();

  const { data: profileData } = await supabase
    .from(TableNames.PROFILES)
    .select('*')
    .eq('id', userId)
    .single();

  return profileData;
};
