import axios from 'axios';

import type { SendEmailArgs } from './type';

export const sendMail = async ({
  sender,
  receiver,
  message,
  templateId,
}: SendEmailArgs): Promise<void> => {
  await axios.post('/api/email/send', {
    sender,
    receiver,
    message,
    templateId,
  });
};

export const addContact = async ({
  email,
  listIds,
}: {
  email: string;
  listIds: number[];
}): Promise<void> => {
  await axios.post('/api/email/addContact', {
    email,
    listIds,
  });
};
