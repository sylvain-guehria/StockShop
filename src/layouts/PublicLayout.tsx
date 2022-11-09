import type { FC, ReactNode } from 'react';

import Header from '@/components/04-lib/Header/Header';
import Footer from '@/components/06-template/Footer';

type Props = {
  children: ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default PublicLayout;
