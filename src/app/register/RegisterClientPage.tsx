'use client';

import RegisterComponant from '@/components/03-auth/register/RegisterComponant';
import Providers from '@/hooks/Providers';

const RegisterClientPage = () => {
  return (
    <Providers>
      <RegisterComponant />
    </Providers>
  );
};

export default RegisterClientPage;
