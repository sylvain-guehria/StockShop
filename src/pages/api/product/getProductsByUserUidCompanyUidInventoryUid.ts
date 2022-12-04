import { firestoreAdmin } from 'firebaseFolder/serverApp';
import { TableNames } from 'firebaseFolder/tableNames';
import type { NextApiRequest, NextApiResponse } from 'next';

import { ProductAttributes } from '@/modules/product/productType';

const { USERS, COMPANIES, INVENTORIES, PRODUCTS } = TableNames;

const getProductsByUserUidAndInventoryUid = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const {
    query: { userUid, inventoryUid, companyUid, currentPage },
    method,
  } = req;

  const numberOfProductsPerPage = 10;

  try {
    if (!userUid) {
      // eslint-disable-next-line no-console
      console.log('User uid is mandatory to get products');
      res.status(400).end('[]');
      return;
    }

    if (!inventoryUid) {
      // eslint-disable-next-line no-console
      console.log('Inventory uid is mandatory to get products');
      res.status(400).end('[]');
      return;
    }

    if (!companyUid) {
      // eslint-disable-next-line no-console
      console.log('Company uid is mandatory to get products');
      res.status(400).end('[]');
      return;
    }

    // THIS IS AN EXCELLENT CHECKING BUT TO EXPENSIVE do we need it?

    // const userRef = await firestoreAdmin
    //   .collection(USERS)
    //   .doc(userUid as string)
    //   .get();

    // if (!userRef.exists) {
    //   // eslint-disable-next-line no-console
    //   console.log(`User with uid ${userUid} not found`);
    //   res.status(200).end('[]');
    //   return;
    // }

    // const companiesRef = await firestoreAdmin
    //   .collection(USERS)
    //   .doc(userUid as string)
    //   .collection(COMPANIES)
    //   .doc(companyUid as string)
    //   .get();

    // if (!companiesRef.exists) {
    //   // eslint-disable-next-line no-console
    //   console.log(
    //     `Company with uid ${companyUid} not found in user ${userUid}`
    //   );
    //   res.status(200).end('[]');
    //   return;
    // }

    // const inventoriesRef = await firestoreAdmin
    //   .collection(USERS)
    //   .doc(userUid as string)
    //   .collection(COMPANIES)
    //   .doc(companyUid as string)
    //   .collection(INVENTORIES)
    //   .doc(inventoryUid as string)
    //   .get();

    // if (!inventoriesRef.exists) {
    //   // eslint-disable-next-line no-console
    //   console.log(
    //     `Inventory ${inventoryUid}, Company uid ${companyUid}, User uid ${userUid} does not exist`
    //   );
    //   res.status(200).end('[]');
    //   return;
    // }

    const currentPageNumber = parseInt(currentPage as string, 10);
    const offset =
      currentPageNumber * numberOfProductsPerPage - numberOfProductsPerPage;

    const productsCount = await firestoreAdmin
      .collection(USERS)
      .doc(userUid as string)
      .collection(COMPANIES)
      .doc(companyUid as string)
      .collection(INVENTORIES)
      .doc(inventoryUid as string)
      .collection(PRODUCTS)
      .count()
      .get();

    const productsRef = await firestoreAdmin
      .collection(USERS)
      .doc(userUid as string)
      .collection(COMPANIES)
      .doc(companyUid as string)
      .collection(INVENTORIES)
      .doc(inventoryUid as string)
      .collection(PRODUCTS)
      .orderBy(ProductAttributes.LABEL)
      .offset(offset)
      .limit(numberOfProductsPerPage)
      .get();

    if (productsRef.empty) {
      // eslint-disable-next-line no-console
      console.log(
        `Collection Products in Inventory (${inventoryUid}) in Company (${companyUid}) in User (${userUid}) does not exist or is empty`
      );
      res.status(200).end('[]');
      return;
    }

    switch (method) {
      case 'GET':
        res.status(200).json({
          count: productsCount.data().count,
          results: productsRef.docs.map((doc) => ({
            ...doc.data(),
            inventoryUid,
          })),
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
