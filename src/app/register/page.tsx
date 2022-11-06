import { redirect } from 'next/navigation';

import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/pagesUtils';

import RegisterClientPage from './RegisterClientPage';

const Register = async () => {
  const uid = await validateUser();
  if (uid) {
    redirect(mainRoutes.home.path);
    return null;
  }
  return <RegisterClientPage />;
};

export default Register;
