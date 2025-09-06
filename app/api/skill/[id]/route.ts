// app/api/skill/[id]/route.ts
import { NextResponse } from 'next/server';

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!process.env.BACKEND_API) {
    return NextResponse.json(
      { success: false, message: 'BACKEND_API 환경변수 미설정' },
      { status: 500 }
    );
  }

  // 백엔드로 순수 GET 요청 (body 없음)
  const res = await fetch(`${process.env.BACKEND_API}/talent-posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': 'Mozilla/5.0',
    },
    cache: 'no-store', // 상세는 신선하게
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}
