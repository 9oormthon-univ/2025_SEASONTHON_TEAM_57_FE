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
        left={{
          icon: <LeftArrow />,
          href: '/challenge',
        }}
      />
      <main className="flex mx-[3.2rem] mt-[2rem]">{children}</main>
    </>
  );
}
