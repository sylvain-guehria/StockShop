import { NextResponse } from 'next/server';

import createSendinblueContact from '@/sendinblue/addContact';

export async function POST() {
  // const body = await request.json();

  const success = await createSendinblueContact();
  return NextResponse.json(success);
}
