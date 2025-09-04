'use client';

import React from 'react';

import Header from '@/components/layout/header';
import Bell from '@/public/icons/bell.svg';
import Settings from '@/public/icons/settings.svg';

export default function SkillLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-main h-screen">
      <Header
        title="재능공유"
        rightItems={[
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
  );
}
