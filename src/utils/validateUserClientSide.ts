import { sessionCookieName } from 'supabase/constant';

export const validateUserClientSide = async (sessionCookie: string) => {
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
