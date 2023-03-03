import dynamic from 'next/dynamic';
import type { FC, ReactNode } from 'react';

import type { User } from '@/modules/user/userType';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import HeaderAndDrawer from './(header)/HeaderAndDrawer';
import Footer from './Footer';

const DynamicFirstConnectionModal = dynamic(
  () => import('../FirstConnectionModal')
);

type Props = {
  children: ReactNode;
};
// @ts-ignore
const BasicLayout: FC<Props> = async ({ children }) => {
  const userProfile = await getUserInServerComponant();

  if (userProfile && !userProfile.hasSeenFirstConnectionModal) {
    return <DynamicFirstConnectionModal user={userProfile as User} />;
  }
  return (
    <>
      <HeaderAndDrawer />
      <main className="grow">{children}</main>
      <Footer />
    </>
  );
};

export default BasicLayout;
