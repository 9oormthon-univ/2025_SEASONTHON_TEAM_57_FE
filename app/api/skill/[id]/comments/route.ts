import { NextResponse } from 'next/server';

type Params = { id: string };

export async function POST(req: Request, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  if (!process.env.BACKEND_API) {
    return NextResponse.json(
      { success: false, message: 'BACKEND_API env가 설정되지 않았습니다.' },
      { status: 500 }
    );
  }

  if (!id || Number.isNaN(Number(id))) {
    return NextResponse.json(
      { success: false, message: '유효하지 않은 id입니다.' },
      { status: 400 }
    );
  }

  // ✅ 클라이언트(=서버액션)에서 온 Authorization 그대로 전달
  const auth = req.headers.get('authorization') ?? undefined;

  const body = await req.json().catch(() => ({}));
  try {
    const res = await fetch(`${process.env.BACKEND_API}/talent-posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0',
        ...(auth ? { Authorization: auth } : {}),
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    // ⬇ 백엔드의 상태코드/본문을 그대로 반환(401 그대로 전달)
    const dataText = await res.text();
    const contentType = res.headers.get('content-type') || '';
    const json = contentType.includes('application/json')
      ? JSON.parse(dataText || '{}')
      : { success: false, message: dataText };

    return NextResponse.json(json, { status: res.status });
  } catch (error) {
    console.error('[comment POST error]', error);
    return NextResponse.json(
      { success: false, message: '백엔드 호출 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
