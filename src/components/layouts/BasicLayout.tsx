import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import HeaderAndDrawer from './(header)/HeaderAndDrawer';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  bgColor?: string;
};

const BasicLayout: FC<Props> = async ({ children, bgColor }) => {
  const user = await getUserInServerComponant();

  return (
    <>
      <HeaderAndDrawer user={user} />
      <main className={clsx('grow', bgColor || '')}>{children}</main>
      <Footer />
    </>
  );
};

export default BasicLayout;
