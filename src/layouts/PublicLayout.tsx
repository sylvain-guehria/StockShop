import type { FC, ReactNode } from 'react';

import Header from '@/components/04-lib/Header/Header';

type Props = {
  children: ReactNode;
};

const PublicLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default PublicLayout;
