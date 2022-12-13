import { redirect } from 'next/navigation';

import Profile from '@/components/07-profile/Profile';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const ProfilePage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.home.path);
  }
  return <Profile />;
};

export default ProfilePage;
