import type { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
