import { tokenName } from 'firebaseFolder/constant';
import { firebaseAdmin } from 'firebaseFolder/firestore';
import { cookies } from 'next/headers';

import VisitorLayout from '@/layouts/VisitorLayout';

import Base from '../components/06-template/Base';

const isAuthenticated = async () => {
  try {
    const nextCookies = cookies();
    const tokenCookies = nextCookies.get(tokenName);
    console.log({ tokenCookies });

    const token = await firebaseAdmin.auth().verifyIdToken(tokenCookies || '');
    // eslint-disable-next-line unused-imports/no-unused-vars
    const { uid, email } = token;
    console.log('token------------------------', token);

    return token;
  } catch (err) {
    // either the `token` cookie didn't exist
    // or token verification failed
    // either way: redirect to the login page
    console.log('prob------------------------', err);

    return false;
  }
};

const HomePage = async () => {
  const isAuth = await isAuthenticated();
  console.log({ isAuth });
  return (
    <VisitorLayout>
      <Base />
    </VisitorLayout>
  );
};

export default HomePage;
