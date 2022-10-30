export enum AuthFirebaseErrorCodes {
  EmailAlreadyInUse = 'auth/email-already-in-use',
  WrongPassword = 'auth/wrong-password',
  UserNotFound = 'auth/user-not-found',
  TokenExpired = 'auth/id-token-expired',
}

class FirebaseAuthenticationError extends Error {
  constructor(errorCode: string) {
    super(errorCode);

    switch (errorCode) {
      case 'auth/email-already-in-use':
        this.message = 'email-already-in-use';
        break;
      case 'auth/invalid-email':
        this.message = 'invalid-email';
        break;
      case 'auth/user-not-found':
        this.message = 'user-not-found';
        break;
      case 'auth/wrong-password':
        this.message = 'wrong-password';
        break;
      default:
        this.message = 'Error';
        break;
    }
  }
}

export { FirebaseAuthenticationError };
