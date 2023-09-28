import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import Profile from './(components)/Profile';

const ProfilePage = async () => {
  const user = await getUserInServerComponant();
  return <Profile user={user} />;
};

export default ProfilePage;
