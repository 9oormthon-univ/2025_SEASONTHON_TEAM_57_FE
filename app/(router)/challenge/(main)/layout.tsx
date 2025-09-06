import Header from '@/components/layout/header';

import Bell from '@icons/bell.svg';
import Post from '@icons/post.svg';

export default function ChallengeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header
        left={{
          title: '온다 챌린지',
          href: '/challenge',
        }}
        right={[
          {
            icon: <Post />,
            href: '/challenge/post',
          },
          {
            icon: <Bell />,
            href: '/challenge/alram-center',
          },
        ]}
      />
      <main className="mt-[.2rem] mb-[8rem]">{children}</main>
    </>
  );
}
