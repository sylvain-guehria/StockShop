/* eslint-disable no-console */
const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// @ts-ignore
const sendTransacEmail = async (sendSmtpEmail): boolean => {
  try {
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`API called successfully. Returned data: ${data}`);
    return true;
  } catch (error) {
    console.error('error sendTransacEmail', error);
    return false;
  }
};

export default sendTransacEmail;
