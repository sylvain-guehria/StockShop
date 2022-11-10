import type { NextApiRequest, NextApiResponse } from 'next';

import sendTransacEmail from '@/sendinblue/sendTransacEmail';
import type { Receiver, Sender } from '@/sendinblue/type';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    sender,
    receiver,
    message,
    templateId,
  }: {
    sender: Sender;
    receiver: Receiver;
    message: string;
    templateId: number;
  } = req.body;
  const sendSmtpEmail = {
    to: [
      {
        email: receiver.email,
      },
    ],
    templateId,
    params: {
      firstName: sender.firstName,
      lastName: sender.lastName,
      fullName: sender.fullName,
      email: sender.email,
      company: sender.company,
      phone: sender.phone,
      soureOfHeard: sender.soureOfHeard,
      message,
    },
  };
  const success = await sendTransacEmail(sendSmtpEmail);
  return res.status(success ? 200 : 400).end();
};

export default sendEmail;
