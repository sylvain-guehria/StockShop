import type { FC, ReactNode } from 'react';

import Providers from './Providers';

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <Providers>
      <div className="h-screen bg-gray-50">
        <div className="h-full">{children}</div>
      </div>
    </Providers>
  );
};

export default AuthLayout;
