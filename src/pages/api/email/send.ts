import type { NextApiRequest, NextApiResponse } from 'next';

import sendinblue from '@/sendinblue/sendinblue';

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  const { sender, receiver, message, templateId } = req.body;
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
      email: sender.email,
      message,
    },
  };
  try {
    if (req.method === 'POST') {
      sendinblue(sendSmtpEmail);
    }
    res.status(200).end();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    res.status(400).end();
  }
};

export default sendEmail;
