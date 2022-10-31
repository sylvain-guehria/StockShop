import type {
  ActionCodeSettings,
  Auth,
  User,
  UserCredential,
} from 'firebase/auth';
import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context';

import UserEntity from '@/modules/user/UserEntity';
import { mainRoutes } from '@/routes/mainRoutes';

import { FirebaseAuthenticationError } from '../../firebaseFolder/errorCodes';
import type { UserRepository } from '../modules/user/userRepository';
import { PROVIDERS, ROLES } from '../modules/user/userType';

type RegisterWithEmailParams = {
  email: string;
  password: string;
  createUserWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  auth: Auth;
  router: AppRouterInstance;
  deleteUser: (user: User) => Promise<void>;
  sendEmailVerification: (
    user: User,
    actionCodeSettings?: ActionCodeSettings | null
  ) => Promise<void>;
};

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async ({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    deleteUser,
    sendEmailVerification,
  }: RegisterWithEmailParams) => {
    let userCredentialFromFirebase;
    let userUidFromDatabase;
    try {
      userCredentialFromFirebase = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (e: any) {
      throw new FirebaseAuthenticationError(e.code);
    }
    try {
      if (userCredentialFromFirebase?.user?.uid) {
        userUidFromDatabase = await userRepository.add(
          UserEntity.new({
            email,
            provider: PROVIDERS.PASSWORD,
            role: ROLES.USER,
            uid: userCredentialFromFirebase?.user?.uid,
          })
        );
      }
    } catch (e: any) {
      deleteUser(auth.currentUser as User);
      throw new FirebaseAuthenticationError(e.code);
    }

    if (
      userCredentialFromFirebase?.user?.uid === userUidFromDatabase &&
      auth.currentUser
    ) {
      sendEmailVerification(auth.currentUser as User).catch(() => {
        // eslint-disable-next-line no-console
        console.error(
          'sendEmailVerification failed for user:',
          auth.currentUser
        );
      });
      router.push(mainRoutes.home.path);
    }
  };
