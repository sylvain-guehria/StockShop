import type { AxiosStatic } from 'axios';
import type {
  AdditionalUserInfo,
  Auth,
  AuthProvider,
  UserCredential,
} from 'firebase/auth';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

import UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import type { LocaleType } from '@/modules/user/userType';
import { PROVIDERS } from '@/modules/user/userType';

type LoginWithGoogleParamsType = {
  signInWithPopup: (
    auth: Auth,
    provider: AuthProvider
  ) => Promise<UserCredential>;
  getAdditionalUserInfo: (
    userCredential: UserCredential
  ) => AdditionalUserInfo | null;
  provider: AuthProvider;
  auth: Auth;
  axios: AxiosStatic;
};

export const loginWithGoogle =
  (userRepository: UserRepository) =>
  async ({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
  }: LoginWithGoogleParamsType): Promise<any> => {
    try {
      const userCredentialFromFirebase = await signInWithPopup(auth, provider);
      const userDetails = getAdditionalUserInfo(userCredentialFromFirebase);
      const { user: googleUser } = userCredentialFromFirebase;

      const idToken = await userCredentialFromFirebase.user.getIdToken();

      await axios.post('/api/sessionInit', {
        idToken,
      });

      const isNewUser = userDetails?.isNewUser;

      if (isNewUser) {
        await userRepository.add(
          UserEntity.new({
            uid: googleUser.uid,
            email: googleUser.email || '',
            firstName: userDetails?.profile?.given_name as string,
            lastName: userDetails?.profile?.family_name as string,
            locale: userDetails?.profile?.locale as LocaleType,
            provider: PROVIDERS.GOOGLE,
          })
        );
      }
    } catch (error: any) {
      throw new FirebaseAuthenticationError(error.code);
    }
  };
