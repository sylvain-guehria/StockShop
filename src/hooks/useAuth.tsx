import { auth, onAuthStateChanged, signOut } from 'firebaseFolder/clientApp';
import { sessionCookieName } from 'firebaseFolder/constant';
import Cookies from 'js-cookie';
import React, { createContext, useContext, useEffect, useState } from 'react';

import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserEntity from '@/modules/user/UserEntity';
import type { ProviderType } from '@/modules/user/userType';
import { logoutUseCase } from '@/usecases/usecases';

import { isFirebaseUserFirstConnexion } from './hooksUtils';

type ContextType = {
  user: UserEntity;
  setUser: (user: UserEntity) => void;
  isUserLoading: boolean;
};

const userRepository = new FirebaseUserRepository();
const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  isUserLoading: false,
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserEntity>(UserEntity.new());
  const [isUserLoading, setIsUserLoading] = useState(true);

  const callsignOut = async () => {
    setIsUserLoading(true);
    return signOut(auth).then(() => {
      setUser(UserEntity.new());
      setIsUserLoading(false);
    });
  };

  useEffect(() => {
    const fetchUserInformation = async (uid: string) => {
      try {
        return await userRepository.getById(uid);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('ERROR fetchUserInformation', e);
        return '';
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      const cookies = Cookies.get();
      const sessionCookie = cookies ? cookies[sessionCookieName] : '';

      if (!firebaseUser && sessionCookie) {
        logoutUseCase({ signOut, auth });
      }

      if (firebaseUser && !sessionCookie) {
        logoutUseCase({ signOut, auth });
      }

      setIsUserLoading(true);
      if (firebaseUser) {
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
      } else {
        setUser(UserEntity.new());
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
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
