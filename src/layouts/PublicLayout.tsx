import type { FC, ReactNode } from 'react';
import createServerCompSupabaseClient from 'supabase/server/supabase-server';
import { TableNames } from 'supabase/tables/tableNames';

import Header from '@/components/04-lib/Header/Header';
import FirstConnectionModal from '@/components/05-modals/FirstConnectionModal';
import Footer from '@/components/06-template/Footer';
import type { User } from '@/modules/user/userType';

import Providers from './Providers';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const PublicLayout: FC<Props> = async ({ children }) => {
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

  if (userProfile && !userProfile.hasSeenFirstConnectionModal) {
    return <FirstConnectionModal user={userProfile as User} />;
  }

  return (
    <Providers userProfile={userProfile as User}>
      <Header />
      {children}
      <Footer />
    </Providers>
  );
};

export default PublicLayout;
