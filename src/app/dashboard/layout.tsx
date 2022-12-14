import { userRepository } from 'di';
import { redirect } from 'next/navigation';

import InventoryManagementLayout from '@/layouts/InventoryManagementLayout';
import { mainRoutes } from '@/routes/mainRoutes';
import { validateUser } from '@/utils/validateUserServerSide';

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const uid = await validateUser();

  if (!uid) {
    redirect(mainRoutes.login.path);
  }
  const user = await userRepository.getById(uid);
  if (!user.isSeller()) {
    redirect(`${mainRoutes.profile.path}/?tab=settings`);
  }

  return <InventoryManagementLayout>{children}</InventoryManagementLayout>;
};
export default Layout;
