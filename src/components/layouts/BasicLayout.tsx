import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

import HeaderAndDrawer from './(header)/HeaderAndDrawer';
import Footer from './Footer';

type Props = {
  children: ReactNode;
  bgColor?: string;
};
// @ts-ignore
const BasicLayout: FC<Props> = async ({ children, bgColor }) => {
  return (
    <>
      <HeaderAndDrawer />
      <main className={clsx('grow', bgColor || '')}>{children}</main>
      <Footer />
    </>
  );
};

export default BasicLayout;
