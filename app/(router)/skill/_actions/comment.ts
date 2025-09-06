'use server';

import { revalidatePath } from 'next/cache';

import { getCookie } from '@/utils/cookie';

type CreateCommentInput = {
  postId: number;
  content: string;
  parentId?: number;
};

export async function createCommentAction({ postId, content, parentId }: CreateCommentInput) {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) throw new Error('NEXT_PUBLIC_SITE_URL env가 설정되지 않았습니다.');

  // ✅ 서버액션에서 사용자 쿠키(access_token) 읽기
  const accessToken = await getCookie('access_token');

  const res = await fetch(`${base}/api/skill/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // ✅ 내부 API로 Authorization 전달 (내부 API가 그대로 백엔드로 포워딩)
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    cache: 'no-store',
    body: JSON.stringify({ content, parentId }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => '');
    // 401이면 로그인 필요 메시지도 함께 던짐
    if (res.status === 401) {
      throw new Error(`로그인이 필요합니다. (status: ${res.status}) ${msg}`);
    }
    throw new Error(`댓글 등록 실패 (status: ${res.status}) ${msg}`);
  }

  revalidatePath(`/skill/${postId}`);
  return await res.json().catch(() => ({}));
}
