import type { AxiosStatic } from 'axios';
import type {
  ActionCodeSettings,
  Auth,
  User,
  UserCredential,
} from 'firebase/auth';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

import UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import { PROVIDERS, ROLES } from '@/modules/user/userType';

type RegisterWithEmailParams = {
  email: string;
  password: string;
  createUserWithEmailAndPassword: (
    auth: Auth,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  auth: Auth;
  deleteUser: (user: User) => Promise<void>;
  sendEmailVerification: (
    user: User,
    actionCodeSettings?: ActionCodeSettings | null
  ) => Promise<void>;
  axios: AxiosStatic;
};

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async ({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    deleteUser,
    sendEmailVerification,
    axios,
  }: RegisterWithEmailParams): Promise<UserEntity> => {
    let userCredentialFromFirebase: UserCredential;
    let userUidFromDatabase: UserEntity = UserEntity.new({});
    try {
      userCredentialFromFirebase = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await userCredentialFromFirebase.user.getIdToken();
      await axios.post('/api/sessionInit', {
        idToken,
      });
    } catch (error: any) {
      throw new FirebaseAuthenticationError({
        errorCode: error.code,
        message: error.message,
      });
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
    } catch (error: any) {
      if (auth.currentUser) deleteUser(auth.currentUser);
      throw new FirebaseAuthenticationError({
        errorCode: error.code,
        message: error.message,
      });
    }

    if (
      userCredentialFromFirebase?.user?.uid === userUidFromDatabase?.uid &&
      auth.currentUser
    ) {
      sendEmailVerification(auth.currentUser as User).catch(() => {
        // eslint-disable-next-line no-console
        console.error(
          'sendEmailVerification failed for user:',
          auth.currentUser
        );
      });
    }
    return userRepository.getById(userCredentialFromFirebase.user.uid);
  };
