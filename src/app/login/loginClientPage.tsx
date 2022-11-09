'use client';

import LoginComponant from '@/components/03-auth/login/LoginComponant';
import Providers from '@/layouts/Providers';

const LoginClientPage = () => {
  return (
    <Providers>
      <LoginComponant />
    </Providers>
  );
};

export default LoginClientPage;
