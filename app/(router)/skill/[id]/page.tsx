// app/(router)/skill/[id]/page.tsx

import CommentForm from '../_components/post/comment/CommentForm';
import type { CommentNode } from '../_components/post/comment/CommentItem';
import Comments from '../_components/post/comment/Comments';
import ProfileImg from '../_components/post/ProfileImg';
import TextWithGallery from '../_components/post/TextWithGallery';
// ===== 타입 정의 =====
type ApiImage = { imageId: number; imageUrl: string };
type ApiCategory = { id: number; name: string; type: string };
type ApiData = {
  id: number;
  authorId: number;
  authorName: string;
  type: string;
  title: string;
  content: string;
  createdAt: string;
  status: string;
  commentCount: number;
  categories?: ApiCategory[];
  price?: number;
  images?: ApiImage[];
};
type ApiResponse = { success: boolean; code: string; message: string; data: ApiData };

// ===== 유틸 =====
function timeAgoKOR(iso: string) {
  const created = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - created);
  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hr = Math.floor(min / 60);
  const day = Math.floor(hr / 24);
  if (day > 0) return `${day}일 전`;
  if (hr > 0) return `${hr}시간 전`;
  if (min > 0) return `${min}분 전`;
  return `${sec}초 전`;
}

function toKoreanType(t?: string) {
  if (!t) return '';
  if (t.includes('trade')) return '교환';
  if (t.includes('teach')) return '알려주기';
  if (t.includes('learn')) return '배우기';
  return '';
}

// ===== 임시 댓글 (댓글 API 붙이기 전) =====
const SAMPLE: CommentNode[] = [
  {
    id: 'c1',
    authorName: '홍길동',
    avatarUrl: '/mypage/sample_profile.png',
    content: '좋은 글 잘 봤어요!',
    createdAt: '2025-09-06 12:30',
    replies: [
      {
        id: 'r1',
        authorName: '임꺽정',
        avatarUrl: '/mypage/sample_profile.png',
        content: '저도 동의합니다.',
        createdAt: '2025-09-06 13:02',
      },
    ],
  },
  {
    id: 'c2',
    authorName: '이몽룡',
    content: '질문 하나 있어요. API 응답 형식이 어떻게 되나요?',
    createdAt: '2025-09-06 14:10',
  },
];

// ===== 내부 API 프록시 호출 (절대 URL은 env 사용) =====
async function fetchPost(id: string): Promise<ApiData> {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  if (!base) {
    throw new Error('NEXT_PUBLIC_SITE_URL env가 설정되지 않았습니다.');
  }

  const res = await fetch(`${base}/api/skill/${id}`, {
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`게시글 로드 실패 (status: ${res.status})`);
  }

  const json = (await res.json()) as ApiResponse;
  if (!json?.success || !json.data) {
    throw new Error(json?.message ?? '응답 형식 오류');
  }
  return json.data;
}

// ===== 페이지 컴포넌트 =====
// ❗️Next 15: params는 Promise로 받고, 사용 시 await 해야 함
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await fetchPost(id);

  const when = timeAgoKOR(post.createdAt);
  const typeLabel = toKoreanType(post.type);
  const gallery =
    post.images?.map(img => ({ src: img.imageUrl, alt: `image-${img.imageId}` })) ?? [];
  const commentCount = typeof post.commentCount === 'number' ? post.commentCount : 0;

  return (
    <main className="py-[1.6rem]">
      {/* 작성자 정보 */}
      <section className="mb-[1.6rem]">
        <ProfileImg
          src="/mypage/sample_profile.png"
          name={post.authorName ?? '익명'}
          time={when}
        />
      </section>

      {/* 본문 + 이미지 */}
      <section>
        <TextWithGallery
          title={`${typeLabel ? `[${typeLabel}] ` : ''}${post.title}`}
          content={post.content}
          images={gallery}
          ctn_bookmark={0}
          ctn_message={commentCount}
        />
      </section>

      {/* 댓글 목록 */}
      <Comments
        items={SAMPLE}
        className="pt-[1.6rem]"
        ctn_message={commentCount}
      />

      {/* 댓글 작성 폼 */}
      <CommentForm postId={Number(post.id)} />
    </main>
  );
}
