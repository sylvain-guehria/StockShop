import createServerSupabaseClient from 'supabase/server/supabase-server';
import { TableNames } from 'supabase/tables/tableNames';

import PublicLayout from '@/layouts/PublicLayout';

import Base from '../components/06-template/Base';

export const revalidate = 0;

const HomePage = async () => {
  const supabase = createServerSupabaseClient();
  const { data } = await supabase.auth.getUser();
  let userProfile = null;

  if (data.user?.id) {
    const { data: profileData } = await supabase
      .from(TableNames.PROFILES)
      .select('*')
      .eq('id', data.user.id);
    userProfile = profileData ? profileData[0] : null;
  }

  return (
    <PublicLayout userProfile={userProfile}>
      <Base />
    </PublicLayout>
  );
};

export default HomePage;
