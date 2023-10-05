import { NextResponse } from 'next/server';

import createSendinblueContact from '@/sendinblue/addContact';

export async function POST(request: Request) {
  const body = await request.json();

  const success = await createSendinblueContact({
    email: body.email,
    listIds: body.listIds,
  });
  return NextResponse.json(success);
}
