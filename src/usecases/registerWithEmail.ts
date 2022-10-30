import { FirebaseAuthenticationError } from 'firebaseFolder/errorCodes';

import { ToasterTypeEnum } from '@/components/08-toaster/toasterEnum';
import UserEntity from '@/modules/user/UserEntity';

import type { UserRepository } from '../modules/user/userRepository';
import { PROVIDERS, ROLES } from '../modules/user/userType';

export const registerWithEmail =
  (userRepository: UserRepository) =>
  async ({
    email,
    password,
    createUserWithEmailAndPassword,
    auth,
    router,
    toast,
    deleteUser,
  }) => {
    let userCredentialFromFirebase;
    let userUidFromDatabase;
    try {
      console.log('createUserWithEmailAndPassword');
      userCredentialFromFirebase = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(
        'createUserWithEmailAndPassword succeedded',
        userCredentialFromFirebase
      );
    } catch (e) {
      console.log('createUserWithEmailAndPassword failed');
      throw new FirebaseAuthenticationError(e.code).message;
    }
    try {
      if (userCredentialFromFirebase?.user?.uid) {
        console.log('userRepository.add ');
        userUidFromDatabase = await userRepository.add(
          UserEntity.new({
            email,
            provider: PROVIDERS.PASSWORD,
            role: ROLES.USER,
            uid: userCredentialFromFirebase?.user?.uid,
          })
        );
        console.log('userRepository.add succeedded', userUidFromDatabase);
      }
    } catch (e) {
      deleteUser(auth.currentUser);
      console.log('userRepository.add failed => deleteUser');
      throw new FirebaseAuthenticationError(e.code).message;
    }
    console.log(
      'userCredentialFromFirebase.user.uid',
      userCredentialFromFirebase?.user?.uid
    );
    console.log('userUidFromDatabase', userUidFromDatabase);

    if (userCredentialFromFirebase?.user?.uid === userUidFromDatabase) {
      console.log('router.push all succedd ');
      router.push('/');
      toast({
        type: ToasterTypeEnum.SUCCESS,
        message: 'We have created your account for you.',
      });
    }
  };
