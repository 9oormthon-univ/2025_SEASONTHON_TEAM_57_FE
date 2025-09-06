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
    authorName: '진구',
    avatarUrl: '/mypage/jingu.png',
    content: '좋은 글 잘 봤어요! 리액트 경험 있고 Next.js 배워보고싶어요!',
    createdAt: '2025-09-07 07:05',
    replies: [
      {
        id: 'r1',
        authorName: '넥스트 고수',
        avatarUrl: '/mypage/sample_profile.png',
        content: '넵 신청해주셔서 감사합니다!! 열심히할게요!',
        createdAt: '2025-09-07 07:06',
      },
    ],
  },
  {
    id: 'c2',
    authorName: '도라에몽',
    avatarUrl: '/mypage/dora.png',
    content: '질문이 있어요! React를 배우지 않고 Next.js를 사용하면 많이 힘든가요?',
    createdAt: '2025-09-07 07:10',
  },
];

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

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await fetchPost(id);

  const when = timeAgoKOR(post.createdAt);
  const typeLabel = toKoreanType(post.type);
  const gallery = [
    { imageId: 1, src: '/image/1.png' },
    { imageId: 2, src: '/image/2.png' },
    { imageId: 3, src: '/image/3.png' },
  ];
  const commentCount = typeof post.commentCount === 'number' ? post.commentCount : 0;

  return (
    <main className="py-[1.6rem]">
      <section className="mb-[1.6rem]">
        <ProfileImg
          src="/mypage/sample_profile.png"
          name={post.authorName ?? '익명'}
          time={when}
        />
      </section>

      <section>
        <TextWithGallery
          title={`${typeLabel ? `[${typeLabel}] ` : ''}${post.title}`}
          content={post.content}
          images={gallery}
          ctn_bookmark={0}
          ctn_message={commentCount}
        />
      </section>

      <Comments
        items={SAMPLE}
        className="pt-[1.6rem]"
        ctn_message={commentCount}
      />

      <CommentForm postId={Number(post.id)} />
    </main>
  );
}
