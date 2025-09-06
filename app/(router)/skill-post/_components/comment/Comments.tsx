import CommentItem, { type CommentNode } from './CommentItem';

type Props = {
  items: CommentNode[];
  className?: string;
  ctn_message?: number;
};

export default function Comments({ items, className, ctn_message }: Props) {
  return (
    <section className={className}>
      <p className="body1 mb-[1.6rem]">댓글 {ctn_message}</p>
      <div className="space-y-[2.0rem]">
        {items.map(c => (
          <CommentItem
            key={c.id}
            node={c}
          />
        ))}
      </div>
    </section>
  );
}

/** 사용 예시
import Comments from '@/components/comment/Comments';

const SAMPLE: CommentNode[] = [
  {
    id: 'c1',
    authorName: '홍길동',
    avatarUrl: '/mypage/sample_profile.png', // public/mypage/sample_profile.png
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
    // avatarUrl 없음 → 이니셜로 표시
    content: '질문 하나 있어요. API 응답 형식이 어떻게 되나요?',
    createdAt: '2025-09-06 14:10',
  },
];

export default function Page() {
  return <Comments items={SAMPLE} className="px-[1.6rem]" />;
}
*/
