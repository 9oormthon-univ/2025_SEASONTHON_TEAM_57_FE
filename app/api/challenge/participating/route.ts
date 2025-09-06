import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { GetParticipatingChallenges } from '@/service/challenge';

export async function GET(req: NextRequest) {
  try {
    const res = await GetParticipatingChallenges();
    return NextResponse.json(res);
  } catch (error) {
    const err = error as APIErrorResponse;
    if (err.code === 'A002') {
      return NextResponse.redirect(new URL('/signup/agree', req.url));
    }
    return NextResponse.json({ error: `${err.message} [${err.code}]` });
  }
}
