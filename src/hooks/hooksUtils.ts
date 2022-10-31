export const isFirebaseUserFirstConnexion = (stringCreationTime: string) => {
  const fiveSecondsInMilliSeconds = 5000;
  const creationTime = parseInt(stringCreationTime, 10) || 0;
  const isCreatedSinceInMilliSecond = new Date().getTime() - creationTime;
  return isCreatedSinceInMilliSecond < fiveSecondsInMilliSeconds;
};
