export enum AuthFirebaseErrorCodes {
  EmailAlreadyInUse = 'auth/email-already-in-use',
  WrongPassword = 'auth/wrong-password',
  UserNotFound = 'auth/user-not-found',
  TokenExpired = 'auth/id-token-expired',
  InvalidEmail = 'auth/invalid-email',
  UserDisabled = 'auth/user-disabled',
  OperationNotAllowed = 'auth/operation-not-allowed',
  WeakPassword = 'auth/weak-password',
  SessionCookieRevoked = 'auth/session-cookie-revoked',
}

export class FirebaseAuthenticationError extends Error {
  errorCode;

  constructor(errorCode: string) {
    super(errorCode);
    this.errorCode = errorCode;

    switch (errorCode) {
      case AuthFirebaseErrorCodes.EmailAlreadyInUse:
        this.message = 'Cet email est déjà utilisé';
        break;
      case AuthFirebaseErrorCodes.InvalidEmail:
        this.message = 'invalid-email';
        break;
      case AuthFirebaseErrorCodes.UserNotFound:
        this.message = 'user-not-found';
        break;
      case AuthFirebaseErrorCodes.WrongPassword:
        this.message = 'wrong-password';
        break;
      default:
        this.message = 'Error';
        break;
    }
  }
}
