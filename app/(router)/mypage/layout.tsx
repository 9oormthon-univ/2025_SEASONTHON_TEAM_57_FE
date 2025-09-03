'use client';

import React from 'react';

import Header from '@/components/layout/header';
import Award from '@/public/icons/award.svg';
import Bell from '@/public/icons/bell.svg';

export default function MyPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-main h-screen">
      <div className="mx-auto h-full max-w-[500px] flex flex-col">
        <Header
          title="마이페이지"
          rightItems={[
            <button
              key="award"
              aria-label="수상(?)"
              className="h-10 w-10 rounded-full hover:bg-white/50 active:opacity-90"
            >
              <Award width={24} height={24} />
            </button>,
            <button
              key="bell"
              aria-label="알림"
              className="h-10 w-10 rounded-full hover:bg-white/50 active:opacity-90"
            >
              <Bell width={24} height={24} />
            </button>,
          ]}
        />

        <section className="flex-1 overflow-y-auto pb-28">{children}</section>
      </div>
    </div>
  );
}
