import type { FC, ReactNode } from 'react';
import { getUserInServerComponant } from 'supabase/getUserInServerComponant';

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
  const userProfile = await getUserInServerComponant();

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
