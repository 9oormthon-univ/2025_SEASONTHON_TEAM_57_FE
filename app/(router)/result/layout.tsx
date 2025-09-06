import React from 'react';

import Header from '@/components/layout/header';

import LeftArrow from '@icons/left-arrow.svg';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header
        left={{
          icon: <LeftArrow />,
          href: '/challenge',
        }}
      />

      <section className="mx-[3.2rem] pt-[20rem] pb-8">{children}</section>
    </div>
  );
}
