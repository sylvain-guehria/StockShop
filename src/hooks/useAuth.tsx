import { auth, onAuthStateChanged, signOut } from 'firebaseFolder/clientApp';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react';

import FirebaseUserRepository from '@/modules/user/firebaseUserRepository';
import UserEntity from '@/modules/user/UserEntity';
import type { ProviderType } from '@/modules/user/userType';
import { mainRoutes } from '@/routes/mainRoutes';

import { isFirebaseUserFirstConnexion } from './hooksUtils';

type ContextType = {
  user: UserEntity;
  isUserLoading: boolean;
  callsignOut: any;
};

const userRepository = new FirebaseUserRepository();
const AuthContext = createContext<ContextType>({
  user: UserEntity.new(),
  isUserLoading: false,
  callsignOut: () => null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [user, setUser] = useState<UserEntity>(UserEntity.new());
  const [isUserLoading, setIsUserLoading] = useState(true);

  const callsignOut = async () => {
    setIsUserLoading(true);
    return signOut(auth).then(() => {
      setUser(UserEntity.new());
      router.push(mainRoutes.home.path);
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
        callsignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
