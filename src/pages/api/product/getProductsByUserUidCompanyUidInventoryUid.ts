import type { NextApiRequest, NextApiResponse } from 'next';

const getProductsByUserUidAndInventoryUid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: {
      userUid,
      inventoryUid,
      companyUid,
      currentPage,
      numberOfProductsPerPage,
      sorterField,
      sorterOrder,
      filterCategoryUid,
      filterSubCategoryUid,
      filterToBuy,
      filterIsPublic,
    },
    method,
  } = req;

  try {
    switch (method) {
      case 'GET':
        res.status(200).json({
          userUid,
          inventoryUid,
          companyUid,
          currentPage,
          numberOfProductsPerPage,
          sorterField,
          sorterOrder,
          filterCategoryUid,
          filterSubCategoryUid,
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

export default getProductsByUserUidAndInventoryUid;
