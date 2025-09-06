import Header from '@/components/layout/header';

import Bell from '@icons/bell.svg';
import Logo from '@icons/logo.svg';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header
        left={{
          icon: (
            <Logo
              width={107}
              height={31.5}
            />
          ),
          href: '/',
        }}
        right={[
          {
            icon: <Bell />,
            href: '/alram-center',
          },
        ]}
      />
      <main className="mx-[3.2rem] mt-[2.2rem] mb-[8rem]">{children}</main>
    </>
  );
}
