import { getKeysWithValues } from './objectUtils';

describe('getKeysWithValues', () => {
  it('should return an empty array if passed an empty object', () => {
    expect(getKeysWithValues({})).toEqual([]);
  });

  it('should return an empty array if passed an object with null or undefined or empty string properties', () => {
    expect(
      getKeysWithValues({
        c: '',
        d: null,
        e: undefined,
      })
    ).toEqual([]);
  });

  it('should return the keys with truthy values or 0 or boolean false', () => {
    expect(
      getKeysWithValues({
        a: 1,
        b: 'foo',
        c: true,
        d: false,
        e: '',
        f: null,
        g: undefined,
      })
    ).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return an empty array if passed null or undefined', () => {
    expect(getKeysWithValues(null)).toEqual([]);
    expect(getKeysWithValues(undefined)).toEqual([]);
  });
});
