import type { NextApiRequest, NextApiResponse } from 'next';

const getProductsByUserIdAndInventoryId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: {
      userId,
      inventoryId,
      companyId,
      currentPage,
      numberOfProductsPerPage,
      sorterField,
      sorterOrder,
      filterCategoryId,
      filterSubCategoryId,
      filterToBuy,
      filterIsPublic,
    },
    method,
  } = req;

  try {
    switch (method) {
      case 'GET':
        res.status(200).json({
          userId,
          inventoryId,
          companyId,
          currentPage,
          numberOfProductsPerPage,
          sorterField,
          sorterOrder,
          filterCategoryId,
          filterSubCategoryId,
          filterToBuy,
          filterIsPublic,
        });
        return;
      default:
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end('[]');
  }
};

export default getProductsByUserIdAndInventoryId;
