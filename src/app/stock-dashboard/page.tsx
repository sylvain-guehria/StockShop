// import { tokenName } from 'firebaseFolder/constant';
// import { firebaseAdmin } from 'firebaseFolder/firestore';
// import { cookies } from 'next/headers';
import { sessionCookieName } from 'firebaseFolder/constant';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import StockDashboard from '@/components/01-stockManagement/dashboard/StockDashboard';
import { mainRoutes } from '@/routes/mainRoutes';

async function validateUser() {
  const sessionCookie = cookies().get(sessionCookieName);
  try {
    const res = await fetch(`${process.env.NEXT_CLIENT_URL}/api/profile`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Cookie: `${sessionCookieName}=${sessionCookie}`,
      },
    });
    return await res.json();
  } catch (error) {
    return null;
  }
}
const StockDashboardPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.home.path);
  }
  return <StockDashboard />;
};

export default StockDashboardPage;
