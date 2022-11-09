const SibApiV3Sdk = require('sib-api-v3-sdk');

const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = 'YOUR_API_KEY';

// Uncomment below two lines to configure authorization using: partner-key
// var partnerKey = defaultClient.authentications['partner-key'];
// partnerKey.apiKey = 'YOUR API KEY';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
// @ts-ignore
const sendinblue = async (sendSmtpEmail) => {
  await apiInstance.sendTransacEmail(sendSmtpEmail).then(
    (_data: any) => {
      return true;
    },
    (_error: any) => {
      return false;
    }
  );
};

export default sendinblue;
