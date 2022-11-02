// import { tokenName } from 'firebaseFolder/constant';
// import { firebaseAdmin } from 'firebaseFolder/firestore';
// import { cookies } from 'next/headers';
import { cookies } from 'next/headers';

import VisitorLayout from '@/layouts/VisitorLayout';

import Base from '../components/06-template/Base';

async function validateUser() {
  const sessionCookie = cookies().get('session');

  // TODO :send cookie with header
  const response = await fetch(`${process.env.NEXT_CLIENT_URL}/api/profile`, {
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    credentials: 'include',
    method: 'POST',
    body: JSON.stringify({ sessionCookie }),
  });
  console.log('response --------------------', response.json());
}

const HomePage = async () => {
  const user = await validateUser();
  return (
    <VisitorLayout>
      <Base />
    </VisitorLayout>
  );
};

export default HomePage;
