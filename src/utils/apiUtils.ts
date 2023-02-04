export const getPagination = (
  page: number | string = 1,
  size: number | string = 10
) => {
  const pageNumber = parseInt(page as string, 10);
  const sizeNumber = parseInt(size as string, 10);

  const offset = pageNumber * sizeNumber - sizeNumber;

  const from = offset;
  const to = offset + sizeNumber - 1;

  return { from, to };
};
