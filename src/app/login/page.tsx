import { redirect } from 'next/navigation';

import LoginComponant from '@/components/03-auth/login/LoginComponant';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const Login = async () => {
  const uid = await validateUser();
  if (uid) {
    redirect(mainRoutes.home.path);
  }
  return <LoginComponant />;
};

export default Login;
