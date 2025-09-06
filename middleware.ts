// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  // _next, api, 정적 파일(.css, .png 등)은 제외
  matcher: ['/((?!_next|api|.*\\..*).*)'],
};

const AUTH_ALLOW = ['/signin', '/signup'];

function isAuthPage(pathname: string) {
  // /signin 또는 /signin/... , /signup 또는 /signup/...
  return AUTH_ALLOW.some(base => pathname === base || pathname.startsWith(base + '/'));
}

export default function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);

  // 로그인/회원가입 경로는 무조건 통과 (비로그인 허용)
  if (isAuthPage(pathname)) {
    return NextResponse.next();
  }

  // 그 외 경로는 access_token 없으면 /signin 으로 리다이렉트
  const access = req.cookies.get('access_token')?.value;
  if (!access) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  // 통과
  return NextResponse.next();
}
