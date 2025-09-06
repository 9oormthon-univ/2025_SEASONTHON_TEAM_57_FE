import { NextResponse } from 'next/server';

// Next 15: params는 Promise로 받고, 사용 시 await!
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!process.env.BACKEND_API) {
    return NextResponse.json(
      { success: false, message: 'BACKEND_API env가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  try {
    const resp = await fetch(`${process.env.BACKEND_API}/talent-posts/${id}/comments`, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      },
    });

    // 백엔드 JSON을 그대로 패스(성공/실패 상태 보존)
    const data = await resp.json();
    return NextResponse.json(data, { status: resp.status });
  } catch (e) {
    return NextResponse.json(
      { success: false, message: '댓글 불러오기에 실패했습니다.' },
      { status: 500 }
    );
  }
}
