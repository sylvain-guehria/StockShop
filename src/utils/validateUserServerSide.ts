import { sessionCookieName } from 'firebaseFolder/constant';
import { cookies } from 'next/headers';

export const validateUser = async () => {
  const sessionCookie = cookies().get(sessionCookieName);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/checkUserSession`,
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
};
