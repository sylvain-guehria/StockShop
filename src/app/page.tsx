// import { tokenName } from 'firebaseFolder/constant';
// import { firebaseAdmin } from 'firebaseFolder/firestore';
// import { cookies } from 'next/headers';

import VisitorLayout from '@/layouts/VisitorLayout';

import Base from '../components/06-template/Base';

// async function validateUser() {
//   const tokenCookie = cookies().get(tokenName);
//   if (!tokenCookie) return UserEntity.new();
//   let decodedToken;
//   let userData = {};

//   try {
//     decodedToken = await firebaseAdmin
//       .auth()
//       .verifyIdToken(tokenCookie || '', true);
//   } catch (err) {
//     return UserEntity.new();
//   }

//   const { uid, email } = decodedToken;

//   userData = await fetch(`/api/user/${uid}`);

//   const result = {
//     ...userData,
//     uid,
//     email,
//   };
//   return UserEntity.new(result);
// }

const HomePage = async () => {
  // const user = await validateUser();
  return (
    <VisitorLayout>
      <Base />
    </VisitorLayout>
  );
};

export default HomePage;
