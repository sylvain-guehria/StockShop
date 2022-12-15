import { sessionCookieName } from 'firebaseFolder/constant';
import { cookies } from 'next/headers';

export const validateUser = async () => {
  // eslint-disable-next-line no-console
  console.log('in validateUser');
  const sessionCookie = cookies().get(sessionCookieName)?.value;
  if (!sessionCookie) {
    return false;
  }
  // eslint-disable-next-line no-console
  console.log(
    'in validateUser url',
    `${process.env.NEXT_PUBLIC_APP_URL}/api/checkUserSession`
  );
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
