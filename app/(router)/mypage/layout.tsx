'use client';

import React from 'react';

import Header from '@/components/layout/header';
import Award from '@/public/icons/award.svg';
import Bell from '@/public/icons/bell.svg';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header
        title="마이페이지"
        right={[
          {
            icon: <Bell />,
            href: '/alram-center',
          },
          {
            icon: <Award />,
            href: '#',
          },
        ]}
      />

      <section className="flex-1 overflow-y-auto px-[3.2rem] pt-[2.2rem] pb-8">{children}</section>
    </div>
  );
}
