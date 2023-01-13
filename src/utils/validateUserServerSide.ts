import { cookies } from 'next/headers';
import { sessionCookieName } from 'superbase/constant';

export const validateUser = async () => {
  const sessionCookie = cookies().get(sessionCookieName)?.value;
  if (!sessionCookie) {
    return false;
  }
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
    // eslint-disable-next-line no-console
    console.log('error validating user', error);
    return null;
  }
};
