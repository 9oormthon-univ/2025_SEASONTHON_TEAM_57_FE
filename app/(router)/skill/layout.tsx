'use client';

import React from 'react';

import Header from '@/components/layout/header';
import Bell from '@/public/icons/bell.svg';

export default function SkillLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-main">
      <Header
        title="재능공유"
        right={[
          {
            icon: <Bell />,
          },
        ]}
      />

      <section className="flex-1 overflow-y-auto pb-28">{children}</section>
    </div>
  );
}
