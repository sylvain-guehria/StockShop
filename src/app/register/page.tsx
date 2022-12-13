import { redirect } from 'next/navigation';

import RegisterComponant from '@/components/03-auth/register/RegisterComponant';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const Register = async () => {
  const uid = await validateUser();
  if (uid) {
    redirect(mainRoutes.home.path);
  }
  return <RegisterComponant />;
};

export default Register;
