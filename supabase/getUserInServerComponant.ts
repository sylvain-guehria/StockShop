import createServerCompSupabaseClient from './server/supabase-server';
import { TableNames } from './tables/tableNames';

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
