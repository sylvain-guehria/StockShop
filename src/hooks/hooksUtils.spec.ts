import { isFirebaseUserFirstConnexion } from './hooksUtils';

describe('#isFirebaseUserFirstConnexion', () => {
  it('should return false if there is not param', () => {
    expect(isFirebaseUserFirstConnexion('')).toEqual(false);
  });
  it('should return false if the param cannot be parse as number', () => {
    // @ts-ignore
    expect(isFirebaseUserFirstConnexion(false)).toEqual(false);
    expect(isFirebaseUserFirstConnexion('string')).toEqual(false);
    // @ts-ignore
    expect(isFirebaseUserFirstConnexion(new Date())).toEqual(false);
  });
  it('should return true if the param date is less than 5 seconds ago', () => {
    const now = Date.now();
    const threeSecondsInmilliSeconds = 3000;
    const threeSecondsAgo = now - threeSecondsInmilliSeconds;
    expect(isFirebaseUserFirstConnexion(`${now}`)).toEqual(true);
    expect(isFirebaseUserFirstConnexion(`${threeSecondsAgo}`)).toEqual(true);
  });
  it('should return false if the param date is more than 5 seconds ago', () => {
    const now = Date.now();
    const sixSecondsInmilliSeconds = 6000;
    const sixSecondsAgo = now - sixSecondsInmilliSeconds;
    expect(isFirebaseUserFirstConnexion(`${sixSecondsAgo}`)).toEqual(false);
  });
});
