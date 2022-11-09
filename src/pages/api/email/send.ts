import type { NextApiRequest, NextApiResponse } from 'next';

import sendinblue from '@/sendinblue/sendinblue';
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
  try {
    if (req.method === 'POST') {
      await sendinblue(sendSmtpEmail);
    }
    res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default sendEmail;
