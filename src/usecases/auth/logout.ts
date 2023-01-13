import Cookies from 'js-cookie';
import { sessionCookieName } from 'superbase/constant';

type LoginWithEmailParamsType = {
  signOut: any;
};

export const logout =
  () =>
  async ({ signOut }: LoginWithEmailParamsType) => {
    try {
      const cookies = Cookies.get();
      const sessionCookie = cookies ? cookies[sessionCookieName] : '';

      if (sessionCookie) {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sessionLogout`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            Cookie: `${sessionCookieName}=${sessionCookie}`,
          },
        });
      }
      return signOut();
    } catch (error: any) {
      return null;
    }
  };
