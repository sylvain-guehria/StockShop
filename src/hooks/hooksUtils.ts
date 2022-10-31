export const isFirebaseUserFirstConnexion = (stringCreationTime: string) => {
  const nowTimestamp = new Date().getTime();

  const fiveSecondsInMilliSeconds = 5000;
  const creationTime = parseInt(stringCreationTime, 10) || 0;
  const isCreatedSinceInMilliSecond = nowTimestamp - creationTime;

  return isCreatedSinceInMilliSecond < fiveSecondsInMilliSeconds;
};
