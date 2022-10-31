import 'firebase/firestore';

import {
  auth,
  confirmPasswordReset,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebaseFolder/clientApp';
// import { tokenName } from 'firebaseFolder/constant';
// import cookie from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserEntity from '@/modules/user/UserEntity';
import type { ProviderType } from '@/modules/user/userType';

import { isFirebaseUserFirstConnexion } from './hooksUtils';

type ContextType = {
  user: UserEntity;
  isUserLoading: boolean;
  loginEmail: any;
  loginGoogle: any;
  loginFacebook: any;
  callsignOut: any;
  callSendPasswordResetEmail: any;
  callConfirmPasswordReset: any;
};

const userRepository = new FirebaseUserRepository();
const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  isUserLoading: false,
  loginEmail: () => null,
  loginGoogle: () => null,
  loginFacebook: () => null,
  callsignOut: () => null,
  callSendPasswordResetEmail: () => null,
  callConfirmPasswordReset: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());
  const [isUserLoading, setIsUserLoading] = useState(false);

  const loginEmail = async (
    email: string,
    password: string
  ): Promise<string> => {
    setIsUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => userCredential.user.email)
      .catch((error) => error.code)
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const loginGoogle = async () => {
    setIsUserLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const userDetails = getAdditionalUserInfo(result);
        const { user: googleUser } = result;
        return {
          uid: googleUser.uid,
          email: googleUser.email,
          isNewUser: userDetails?.isNewUser,
          firstName: userDetails?.profile?.given_name,
          lastName: userDetails?.profile?.family_name,
          locale: userDetails?.profile?.locale,
        };
      })
      .catch((error) => {
        const credential = GoogleAuthProvider.credentialFromError(error);
        // eslint-disable-next-line no-console
        console.error({
          errorCode: error.code,
          errorMessage: error.message,
          credential,
        });
        return error.code;
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const loginFacebook = async () => {
    setIsUserLoading(true);
    const facebookProvider = new FacebookAuthProvider();
    return signInWithPopup(auth, facebookProvider)
      .then((userCredential) => {
        return {
          uid: userCredential.user?.uid,
          email: userCredential.user?.email,
          // isNewUser: userCredential.additionalUserInfo?.isNewUser,
          // firstName: userCredential.additionalUserInfo?.profile?.first_name,
          // lastName: userCredential.additionalUserInfo?.profile?.last_name,
        };
      })
      .catch((_error) => {})
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const callsignOut = async () => {
    return signOut(auth)
      .then(() => {
        setUser(UserEntity.new());
      })
      .catch((_error) => {});
  };

  const callSendPasswordResetEmail = async (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {})
      .catch((_error) => {
        // logger.error(error);
      });
  };

  const callConfirmPasswordReset = async (
    newPassword: string,
    code: string
  ) => {
    const resetCode = code || '';

    return confirmPasswordReset(auth, resetCode, newPassword).then(() => {
      return true;
    });
  };

  useEffect(() => {
    const fetchUserInformation = async (uid: string) => {
      setIsUserLoading(true);
      try {
        return await userRepository.getById(uid);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('ERROR fetchUserInformation', e);
        return '';
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setIsUserLoading(true);
        const isFirstConnexion = isFirebaseUserFirstConnexion(
          // @ts-ignore
          firebaseUser.metadata.createdAt || '0'
        );

        if (isFirstConnexion) {
          setUser(
            UserEntity.new({
              email: firebaseUser.email as string,
              uid: firebaseUser.uid,
              provider: firebaseUser.providerData[0]
                ?.providerId as ProviderType,
            }).logInUser()
          );
        } else {
          const fetchedUser = await fetchUserInformation(firebaseUser.uid);
          if (fetchedUser) {
            setUser(fetchedUser.logInUser());
          } else {
            callsignOut();
            setUser(UserEntity.new());
          }
        }
      }
      setIsUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        loginEmail,
        loginGoogle,
        loginFacebook,
        callsignOut,
        callSendPasswordResetEmail,
        callConfirmPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
