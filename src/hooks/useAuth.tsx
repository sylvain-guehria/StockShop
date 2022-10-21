import 'firebase/firestore';

import {
  auth,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebaseFolder/clientApp';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserEntity from '@/modules/user/UserEntity';
import { ROLES } from '@/modules/user/userType';

type ContextType = {
  user: UserEntity | null;
  loggedIn: boolean;
  loginEmail: any;
  loginGoogle: any;
  loginFacebook: any;
  signUpEmail: any;
  signout: any;
  callSendPasswordResetEmail?: any;
  callConfirmPasswordReset?: any;
};

const userRepository = new FirebaseUserRepository();
const authContext = createContext<ContextType>({
  user: UserEntity.new(null),
  loggedIn: false,
});

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<UserEntity | null>(null);
  const [loggedIn, setIsUserLoading] = useState(true);
  const router = useRouter();
  const tokenName = 'firebaseToken';

  const loginEmail = (email: string, password: string) => {
    setIsUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        return userCredential.user;
      })
      .catch((_error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // toast.error(error.message);
        // logger.error({ errorCode, errorMessage });
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const loginGoogle = () => {
    setIsUserLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((userCredential) => {
        return {
          uid: userCredential.user?.uid,
          email: userCredential.user?.email,
          // isNewUser: userCredential.user?.isNewUser,
          // firstName: userCredential.additionalUserInfo?.profile?.given_name,
          // lastName: userCredential.additionalUserInfo?.profile?.family_name,
        };
      })
      .catch((_error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // toast.error(error.message);
        // logger.error({ errorCode, errorMessage });
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const loginFacebook = () => {
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
      .catch((_error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // toast.error(error.message);
        // logger.error({ errorCode, errorMessage });
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const signUpEmail = (email: string, password: string) => {
    setIsUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // THIS CREATE THE USER IN FIREBASE BUT NOT IN DB
        return {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          roles: [ROLES.USER],
        };
      })
      .catch((_error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // toast.error(error.message);
        // logger.error({ errorCode, errorMessage });
      })
      .finally(() => {
        setIsUserLoading(false);
      });
  };

  const signout = () => {
    return auth
      .signOut()
      .then(() => {
        // toast.info('Aurevoir =)');
        setUser(UserEntity.new(null));
        router.push('/');
      })
      .catch((_error) => {
        // toast.error(error.message);
        // logger.error(error);
      });
  };

  const callSendPasswordResetEmail = async (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // toast.info('Un email pour vient de vous être envoyer');
      })
      .catch((_error) => {
        // toast.error(error.message);
        // logger.error(error);
      });
  };

  const callConfirmPasswordReset = (newPassword: string, code: string) => {
    const resetCode = code || '';

    return confirmPasswordReset(auth, resetCode, newPassword).then(() => {
      return true;
    });
  };

  useEffect(() => {
    const fetchUserInformation = async (uid: string) => {
      setIsUserLoading(true);
      return userRepository.getById(uid);
    };

    const updateLastConnected = async (updatedUser: UserEntity) => {
      await userRepository.update(updatedUser);
    };

    const unsubscribe = auth.onAuthStateChanged(async (firebaseuser) => {
      if (firebaseuser) {
        const token = await firebaseuser.getIdToken();
        cookie.set(tokenName, token, { expires: 14 });
        const fullUser = await fetchUserInformation(firebaseuser.uid);
        if (fullUser && fullUser.getEmail()) {
          updateLastConnected(fullUser.updateLastLogin());
          setUser(fullUser);
        } else {
          setUser(UserEntity.new({ ...user }));
        }
        setIsUserLoading(false);
      } else {
        cookie.remove(tokenName);
        setUser(UserEntity.new(null));
        setIsUserLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loggedIn,
    loginEmail,
    loginGoogle,
    loginFacebook,
    signUpEmail,
    signout,
    callSendPasswordResetEmail,
    callConfirmPasswordReset,
  };
}

export function ProvideAuth({ children }: { children: React.ReactNode }) {
  const providedAuth = useProvideAuth();
  return (
    <authContext.Provider value={providedAuth}>{children}</authContext.Provider>
  );
}
