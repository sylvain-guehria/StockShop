import dynamic from 'next/dynamic';
import type { FC, ReactNode } from 'react';

import Header from '@/components/lib/Header/Header';
import type { User } from '@/modules/user/userType';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import Footer from './Footer';
import Providers from './Providers';

const DynamicFirstConnectionModal = dynamic(
  () => import('../FirstConnectionModal')
);

type Props = {
  children: ReactNode;
};

// @ts-ignore
const PublicLayout: FC<Props> = async ({ children }) => {
  const userProfile = await getUserInServerComponant();

  if (userProfile && !userProfile.hasSeenFirstConnectionModal) {
    return <DynamicFirstConnectionModal user={userProfile as User} />;
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
