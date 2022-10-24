import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { mainRoutes } from '@/routes/mainRoutes';

type IBackgroundProps = {
  children: ReactNode;
};

const AuthLayout: FC<IBackgroundProps> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user.isUserLoggedIn()) router.push(mainRoutes.home.path);
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
