import type { FC, ReactNode } from 'react';
import createServerSupabaseClient from 'supabase/server/supabase-server';
import { TableNames } from 'supabase/tables/tableNames';

import Header from '@/components/04-lib/Header/Header';
import Footer from '@/components/06-template/Footer';

import Providers from './Providers';

type Props = {
  children: ReactNode;
};

// @ts-ignore
const PublicLayout: FC<Props> = async ({ children }) => {
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
    <Providers userProfile={userProfile}>
      <Header />
      {children}
      <Footer />
    </Providers>
  );
};

export default PublicLayout;
