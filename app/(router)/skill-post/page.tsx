import { CommentNode } from './_components/comment/CommentItem';
import Comments from './_components/comment/Comments';
import ProfileImg from './_components/ProfileImg';
import TextWithGallery from './_components/TextWithGallery';

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

export default function PostPage() {
  return (
    <main>
      <main>
        <ProfileImg
          src="/mypage/sample_profile.png"
          name="서니"
          time="20시간 전"
        />
      </main>
      <TextWithGallery
        title="[교환] 스키 배우고 싶은 분 구합니다"
        content="제가 스키 혼자타기 심심해서 알려줄겸 같이 타실 분 있을까요? 여자라 여성분 위주로 연락주시면 감사하겠습니다. 날짜는 서로 조율해봐요!!"
        images={[
          {
            src: '/post/ski.png',
            alt: '스키 이미지 1',
          },
          {
            src: '/post/ski.png',
            alt: '스키 이미지 2',
          },
          {
            src: '/post/ski.png',
            alt: '스키 이미지 3',
          },
        ]}
        ctn_bookmark={12}
        ctn_message={2}
      />
      <Comments
        items={SAMPLE}
        className="pt-[1.6rem]"
        ctn_message={2}
      />
      ;
    </main>
  );
}
