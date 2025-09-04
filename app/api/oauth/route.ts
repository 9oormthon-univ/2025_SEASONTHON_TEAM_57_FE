import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { GetAccessToken } from '@/service/authorization';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  try {
    console.log('OAuth Code:', code);
    await GetAccessToken({ code });
    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    const err = error as APIErrorResponse;
    if (err.code === 'A002') {
      return NextResponse.redirect(new URL('/signup/agree', req.url));
    }
    return NextResponse.json({ error: `${err.message} [${err.code}]` });
  }
}
