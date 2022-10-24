import type { FC, ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
};

const AuthLayout: FC<IBackgroundProps> = ({ children }) => {
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
