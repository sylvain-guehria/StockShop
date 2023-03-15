import { logException, logInConsole } from 'logger';

const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

const apiInstance = new SibApiV3Sdk.ContactsApi();

interface ArgsTypes {
  email: string;
  listIds: number[];
}

const createSendinblueContact = async ({
  email,
  listIds = [1],
}: ArgsTypes): Promise<boolean> => {
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = email;
  createContact.listIds = listIds;

  try {
    const data = await apiInstance.createContact(createContact);
    logInConsole(`createContact called successfully. Returned data: ${data}`);
    return true;
  } catch (error) {
    logException(error);
    return false;
  }
};

export default createSendinblueContact;
