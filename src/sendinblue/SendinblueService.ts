import axios from 'axios';

import type { SendEmailArgs } from './type';

export const sendMail = async ({
  sender,
  receiver,
  message,
  templateId,
}: SendEmailArgs): Promise<boolean> => {
  try {
    const request = await axios
      .post('/email/send', {
        sender,
        receiver,
        message,
        templateId,
      })
      .then((res) => {
        return res;
      });
    return request.status === 200;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return false;
  }
};
