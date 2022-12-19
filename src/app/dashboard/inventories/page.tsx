import { userRepository } from 'di';

import Inventories from '@/components/01-dashboard/inventories/MyInventory';
import type UserEntity from '@/modules/user/UserEntity';
import { validateUser } from '@/utils/validateUserServerSide';

const InventoriesPages = async () => {
  const uid = await validateUser();

  let user: UserEntity | null = null;

  user = await userRepository.getById(uid);
  return <Inventories fetchedUser={{ ...user }} />;
};

export default InventoriesPages;
