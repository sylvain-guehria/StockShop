import { redirect } from 'next/navigation';

import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/pagesUtils';

import ResetPasswordPage from './resetPasswordPage';

const resetPassword = async () => {
  const uid = await validateUser();
  if (uid) {
    redirect(mainRoutes.home.path);
    return null;
  }
  return <ResetPasswordPage />;
};

export default resetPassword;
