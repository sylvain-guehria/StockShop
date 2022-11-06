// import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import {
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteUser,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
const app = initializeApp({ ...firebaseConfig });

// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

// const EMULATORS_STARTED = 'EMULATORS_STARTED';
// function startEmulators() {
//   // @ts-ignore
//   if (!global[EMULATORS_STARTED]) {
//     // @ts-ignore
//     global[EMULATORS_STARTED] = true;
//     connectFirestoreEmulator(firestore, 'localhost', 8080);
//     connectAuthEmulator(auth, 'http://localhost:9099');
//     connectStorageEmulator(storage, 'localhost', 9199);
//   }
// }

// if (process.env.ENV === 'local') {
//   startEmulators();
// }

const firestoreFunctions = {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
};

const storageFunctions = {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
};

export {
  app,
  auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  deleteUser,
  FacebookAuthProvider,
  firestore,
  firestoreFunctions,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  storage,
  storageFunctions,
};
