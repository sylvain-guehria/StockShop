/* eslint-disable no-console */
const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = 'YOUR API KEY';

const apiInstance = new SibApiV3Sdk.ContactsApi();

// @ts-ignore
const createSendinblueContact = async ({ email, listIds = 1 }): boolean => {
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = listIds;

  try {
    const data = await apiInstance.createContact(createContact);
    console.log(`createContact called successfully. Returned data: ${data}`);
    return true;
  } catch (error) {
    console.error('error createContact', error);
    return false;
  }
};

export default createSendinblueContact;
