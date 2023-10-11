import type { User } from '@/modules/user/userType';
import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import Inventories from './(inventories-components)/Inventories';

const InventoriesPages = async () => {
  const user = await getUserInServerComponant();

  return <Inventories user={user as User} />;
};

export default InventoriesPages;
