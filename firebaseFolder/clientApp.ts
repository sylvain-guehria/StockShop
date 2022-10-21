// import { getAnalytics } from 'firebase/analytics';
import firebaseClient from 'firebase/app';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

if (!firebaseClient.getApps().length) {
  firebaseClient.initializeApp(firebaseConfig);
}

// const analytics = getAnalytics(app);
const firestore = getFirestore();
const auth = getAuth();
const storage = getStorage();

export {
  auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  firestore,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  storage,
};
