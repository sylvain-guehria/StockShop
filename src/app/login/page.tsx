import { redirect } from 'next/navigation';

import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

import LoginClientPage from './loginClientPage';

const Login = async () => {
  const uid = await validateUser();
  if (uid) {
    redirect(mainRoutes.home.path);
    return null;
  }
  return <LoginClientPage />;
};

export default Login;
