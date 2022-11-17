import { sessionCookieName } from 'firebaseFolder/constant';

export const validateUserClientSide = async (sessionCookie: string) => {
  try {
    const res = await fetch(`${process.env.VERCEL_URL}/api/checkUserSession`, {
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
};
