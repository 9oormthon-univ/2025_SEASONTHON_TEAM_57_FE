import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { GetParticipatingChallenges } from '@/service/challenge';
import { getCookie } from '@/utils/cookie';

export async function GET(req: NextRequest) {
  try {
    const access_token = await getCookie('access_token');
    console.log('access_token', access_token);
    if (access_token === 'guest')
      return NextResponse.json({ error: 'Guest users cannot access this resource.' });
    const res = await GetParticipatingChallenges();
    return NextResponse.json(res);
  } catch (error) {
    const err = error as APIErrorResponse;
    return NextResponse.json({ error: `${err.message} [${err.code}]` });
  }
}
