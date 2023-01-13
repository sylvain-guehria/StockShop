const SuperbaseAuthenticationError = {
  'auth/invalid-email': 'Invalid email address',
  WrongPassword: 'Wrong password',
  UserNotFound: 'User not found',
  InvalidEmail: 'Invalid email',
  SessionCookieRevoked: 'Session cookie revoked',
};

const CustomFirebaseErrorCodes = {
  imageFileWrongType: 'imageFileWrongType',
};

const StorageFirebaseErrorCodes = {
  fileWrongSize: 'fileWrongSize',
};

export {
  CustomFirebaseErrorCodes,
  StorageFirebaseErrorCodes,
  SuperbaseAuthenticationError,
};
