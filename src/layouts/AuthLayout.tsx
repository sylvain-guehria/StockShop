'use client';

import { useRouter } from 'next/navigation';
import type { FC, ReactNode } from 'react';

import { useAuth } from '@/hooks/useAuth';
import { mainRoutes } from '@/routes/mainRoutes';

type Props = {
  children: ReactNode;
};

const AuthLayout: FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  if (user.isLoggedIn()) router.push(mainRoutes.home.path);
  return (
    <div className="h-screen bg-gray-50">
      <div className="h-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
