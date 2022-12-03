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

export enum StorageFirebaseErrorCodes {
  ObjectNotFound = 'storage/object-not-found',
  Unauthorized = 'storage/unauthorized',
  Canceled = 'storage/canceled',
  Unknown = 'storage/unknown',
  fileWrongSize = 'storage/server-file-wrong-size',
}

export enum CustomFirebaseErrorCodes {
  imageFileWrongType = 'storage/server-image-file-wrong-type',
}

export class FirebaseAuthenticationError extends Error {
  errorCode;

  message;

  constructor({ errorCode, message }: { errorCode: string; message: string }) {
    super(message);
    this.errorCode = errorCode;
    this.message = message;

    switch (errorCode) {
      case AuthFirebaseErrorCodes.EmailAlreadyInUse:
        this.message = 'Cet email est déjà utilisé';
        break;
      case AuthFirebaseErrorCodes.InvalidEmail:
        this.message = 'Email invalide';
        break;
      case AuthFirebaseErrorCodes.UserNotFound:
        this.message = 'Utilisateur non trouvé';
        break;
      case AuthFirebaseErrorCodes.WrongPassword:
        this.message = 'Mot de passe incorrect';
        break;
      case AuthFirebaseErrorCodes.TokenExpired:
        this.message = 'Token expiré';
        break;
      case AuthFirebaseErrorCodes.UserDisabled:
        this.message = 'Utilisateur désactivé';
        break;
      case AuthFirebaseErrorCodes.OperationNotAllowed:
        this.message = 'Opération non autorisée';
        break;
      case AuthFirebaseErrorCodes.WeakPassword:
        this.message = 'Mot de passe trop faible';
        break;
      case AuthFirebaseErrorCodes.SessionCookieRevoked:
        this.message = 'Session cookie révoquée';
        break;
      case StorageFirebaseErrorCodes.Canceled:
        this.message = 'Opération annulée';
        break;
      case StorageFirebaseErrorCodes.ObjectNotFound:
        this.message = 'Fichier non trouvé';
        break;
      case StorageFirebaseErrorCodes.Unauthorized:
        this.message = 'Opération non autorisée';
        break;
      case StorageFirebaseErrorCodes.Unknown:
        this.message = 'Erreur inconnue';
        break;
      case StorageFirebaseErrorCodes.fileWrongSize:
        this.message = 'Fichier trop volumineux';
        break;
      case CustomFirebaseErrorCodes.imageFileWrongType:
        this.message =
          'Fichier image invalide. Formats acceptés: jpg, jpeg, png';
        break;
      default:
        this.message = message;
        break;
    }
  }
}
