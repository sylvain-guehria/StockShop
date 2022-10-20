import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json';

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Firebase admin initialization error', error.stack);
  }
}
export default admin.firestore();
