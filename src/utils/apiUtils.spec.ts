import { getPagination } from './apiUtils';

describe('getPagination', () => {
  it('should start page 1 if no page is given', () => {
    const size = 25;
    const { from, to } = getPagination(undefined, size);
    expect(from).toBe(0);
    expect(to).toBe(24);
  });

  it('should give 10 results if no page size is given', () => {
    const page = 2;
    const { from, to } = getPagination(page, undefined);
    expect(from).toBe(10);
    expect(to).toBe(19);
  });

  it('should give 10 from page 1 results if no page size and page are given', () => {
    const { from, to } = getPagination(undefined, undefined);
    expect(from).toBe(0);
    expect(to).toBe(9);
  });

  it('should return from 0 to 9', () => {
    const page = 1;
    const size = 10;
    const { from, to } = getPagination(page, size);
    expect(from).toBe(0);
    expect(to).toBe(9);
  });

  it('should return from 10 to 19', () => {
    const page = 2;
    const size = 10;
    const { from, to } = getPagination(page, size);
    expect(from).toBe(10);
    expect(to).toBe(19);
  });
});
