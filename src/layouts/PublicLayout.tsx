import type { FC, ReactNode } from 'react';

import Header from '@/components/04-lib/Header/Header';
import Footer from '@/components/06-template/Footer';
import type { User } from '@/modules/user/userType';

import Providers from './Providers';

type Props = {
  children: ReactNode;
  userProfile: User;
};

const PublicLayout: FC<Props> = ({ children, userProfile }) => {
  return (
    <Providers userProfile={userProfile}>
      <Header />
      {children}
      <Footer />
    </Providers>
  );
};

export default PublicLayout;
