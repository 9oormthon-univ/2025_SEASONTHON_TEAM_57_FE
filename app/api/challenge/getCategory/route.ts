import { NextRequest, NextResponse } from 'next/server';

import type { APIErrorResponse } from '@/constants/types';
import { GetApprovedAllChallenges, GetApprovedChallenges } from '@/service/challenge';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('categoryId');

  if (!category) {
    return NextResponse.json({ error: 'Missing categoryId' }, { status: 400 });
  }
  try {
    const categoryId = Number(category);
    let data;
    if (categoryId === 0) {
      data = await GetApprovedAllChallenges();
    } else {
      data = await GetApprovedChallenges({ categoryId });
    }

    return NextResponse.json(data);
  } catch (error) {
    const err = error as APIErrorResponse;
    if (err.code === 'A002') {
      return NextResponse.redirect(new URL('/signup/agree', req.url));
    }
    return NextResponse.json({ error: `${err.message} [${err.code}]` });
  }
}
