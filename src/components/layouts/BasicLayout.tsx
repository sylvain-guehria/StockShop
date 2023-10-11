import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import type { User } from '@/modules/user/userType';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import FirstConnectionModal from '../FirstConnectionModal';
import HeaderAndDrawer from './(header)/HeaderAndDrawer';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  bgColor?: string;
};

const BasicLayout: FC<Props> = async ({ children, bgColor }) => {
  const user = await getUserInServerComponant();
  const showModal = !!(user && !user.hasSeenFirstConnectionModal);

  return (
    <>
      {showModal ? <FirstConnectionModal user={user as User} /> : null}
      <HeaderAndDrawer user={user as User} />
      <main className={clsx('grow', bgColor || '')}>{children}</main>
      <Footer />
    </>
  );
};

export default BasicLayout;
