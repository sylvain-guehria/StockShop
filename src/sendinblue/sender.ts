import { addressEmails, templateIds } from './emailConfig';
import { sendMail } from './SendinblueService';
import type { Sender } from './type';

export const sendContactUsEmail = async ({
  sender,
  message,
}: {
  sender: Sender;
  message: string;
}): Promise<boolean> => {
  return sendMail({
    sender,
    receiver: {
      email: addressEmails.INENTORY_MARKET_FR as string,
    },
    message,
    templateId: templateIds.contactUs as number,
  });
};
