import { getKeysWithValues, removeKeysWithNoValues } from './objectUtils';

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
      }),
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
      }),
    ).toEqual(['a', 'b', 'c', 'd']);
  });

  it('should return an empty array if passed null or undefined', () => {
    expect(getKeysWithValues(null)).toEqual([]);
    expect(getKeysWithValues(undefined)).toEqual([]);
  });
});

describe('removeKeysWithNoValues', () => {
  it('should return an empty object if passed an empty object', () => {
    expect(removeKeysWithNoValues({})).toEqual({});
  });
  it('should return an empty object if passed an object with null or undefined or empty string properties', () => {
    expect(
      removeKeysWithNoValues({
        c: '',
        d: null,
        e: undefined,
      }),
    ).toEqual({});
  });
  it('should return the object with only the keys with truthy values or 0 or boolean false', () => {
    expect(
      removeKeysWithNoValues({
        a: 1,
        b: 'foo',
        c: true,
        d: false,
        e: '',
        f: null,
        g: undefined,
      }),
    ).toEqual({ a: 1, b: 'foo', c: true, d: false });
  });
  it('should return an empty object if passed null or undefined', () => {
    expect(removeKeysWithNoValues(null)).toEqual({});
    expect(removeKeysWithNoValues(undefined)).toEqual({});
  });
});
