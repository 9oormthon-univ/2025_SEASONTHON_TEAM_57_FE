import Header from '@/components/layout/header';

import LeftArrow from '@icons/left-arrow.svg';

export default function AgreeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <LeftArrow />,
          href: '/signin',
        }}
      />
      <main className="px-[3.2rem] mt-[1.6rem]">{children}</main>
    </>
  );
}
