import Header from '@/components/layout/header';

import LeftArrow from '@icons/left-arrow.svg';

export default function CompleteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header
        left={{
          icon: <LeftArrow />,
          href: '/signup/agree',
        }}
      />
      <main className="px-[3.2rem] mt-[1.6rem]">{children}</main>
    </>
  );
}
