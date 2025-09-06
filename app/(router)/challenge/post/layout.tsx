import Header from '@/components/layout/header';

import LeftArrow from '@icons/left-arrow.svg';

export default function ChallengePostLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header
        title="챌린지 게시글 작성"
        left={{
          icon: <LeftArrow />,
          href: '/challenge',
        }}
      />
      {children}
    </>
  );
}
