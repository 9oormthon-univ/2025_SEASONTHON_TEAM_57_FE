import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { setCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  try {
    setCookie('access_token', 'guest', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return NextResponse.redirect(new URL('/', req.url));
  } catch (error) {
    const err = error as APIErrorResponse;
    return NextResponse.json({ error: `${err.message} [${err.code}]` });
  }
}
