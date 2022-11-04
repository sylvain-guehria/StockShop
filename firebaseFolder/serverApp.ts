import admin from 'firebase-admin';

import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      // @ts-ignore
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    // @ts-ignore
    // eslint-disable-next-line no-console
    console.error('Firebase admin initialization error', error.stack);
  }
}

if (process.env.ENV === 'local') {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIREBASE_STORAGE_EMULATOR_HOST = 'localhost:9199';
}

export default admin;

const authAdmin = admin.auth();
const firestoreAdmin = admin.firestore();

export { authAdmin, firestoreAdmin };
