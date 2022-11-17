import admin from 'firebase-admin';

import { serviceAccount } from './serviceAccountKey';

const jsonServiceAccount = JSON.parse(JSON.stringify(serviceAccount));

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(jsonServiceAccount),
    });
  } catch (error) {
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}

export default admin;

const authAdmin = admin.auth();
const firestoreAdmin = admin.firestore();

export { authAdmin, firestoreAdmin };
