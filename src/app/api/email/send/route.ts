import { NextResponse } from 'next/server';

import sendTransacEmail from '@/sendinblue/sendTransacEmail';

export async function POST(request: Request) {
  const body = await request.json();

  const { sender, receiver, message, templateId } = body || {};

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
  return NextResponse.json(success);
}
