import { sessionCookieName } from 'firebaseFolder/constant';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import StockDashboard from '@/components/01-stockManagement/dashboard/StockDashboard';
import { mainRoutes } from '@/routes/mainRoutes';

async function validateUser() {
  const sessionCookie = cookies().get(sessionCookieName);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/checkUserSession`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          Cookie: `${sessionCookieName}=${sessionCookie}`,
        },
      }
    );
    return await res.json();
  } catch (error) {
    return null;
  }
}
const StockDashboardPage = async () => {
  const uid = await validateUser();
  if (!uid) {
    redirect(mainRoutes.home.path);
    return null;
  }
  return <StockDashboard />;
};

export default StockDashboardPage;
