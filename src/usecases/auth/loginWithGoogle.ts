import type { AxiosStatic } from 'axios';
import type {
  AdditionalUserInfo,
  Auth,
  AuthProvider,
  User,
  UserCredential,
} from 'firebase/auth';
import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

import UserEntity from '@/modules/user/UserEntity';
import type { UserRepository } from '@/modules/user/userRepository';
import type { LocaleType } from '@/modules/user/userType';
import { PROVIDERS } from '@/modules/user/userType';

export type LoginWithGoogleParamsType = {
  signInWithPopup: SignInWithPopupType;
  getAdditionalUserInfo: GetAdditionalUserInfoType;
  provider: AuthProvider;
  auth: Auth;
  axios: AxiosStatic;
  deleteUser: (user: User) => Promise<void>;
};

export type SignInWithPopupType = (
  auth: Auth,
  provider: AuthProvider
) => Promise<UserCredential>;

export type GetAdditionalUserInfoType = (
  userCredential: UserCredential
) => AdditionalUserInfo | null;

export const loginWithGoogle =
  (userRepository: UserRepository) =>
  async ({
    signInWithPopup,
    getAdditionalUserInfo,
    provider,
    auth,
    axios,
    deleteUser,
  }: LoginWithGoogleParamsType): Promise<UserEntity> => {
    let googleUser;
    try {
      const userCredentialFromFirebase = await signInWithPopup(auth, provider);

      const userDetails = getAdditionalUserInfo(userCredentialFromFirebase);
      const { user } = userCredentialFromFirebase;
      googleUser = user;
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

      const idToken = await userCredentialFromFirebase.user.getIdToken();

      await axios.post('/api/sessionInit', {
        idToken,
      });

      return await userRepository.getById(user.uid);
    } catch (error: any) {
      if (googleUser) deleteUser(googleUser);
      throw new FirebaseAuthenticationError({
        message: error.response?.data || error.message,
        errorCode: error.code,
      });
    }
  };
