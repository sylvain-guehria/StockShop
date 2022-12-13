import { redirect } from 'next/navigation';

import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

import ResetPasswordPage from './resetPasswordPage';

const resetPassword = async () => {
  const uid = await validateUser();
  if (uid) {
    redirect(mainRoutes.home.path);
  }
  return <ResetPasswordPage />;
};

export default resetPassword;
