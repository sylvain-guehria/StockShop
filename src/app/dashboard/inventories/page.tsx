import { getUserInServerComponant } from '@/supabase/getUserInServerComponant';

import Inventories from './(inventories-components)/Inventories';

const InventoriesPages = async () => {
  const user = await getUserInServerComponant();

  return <Inventories user={user} />;
};

export default InventoriesPages;
