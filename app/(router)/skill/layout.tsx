import React from 'react';

import Header from '@/components/layout/header';
import Bell from '@/public/icons/bell.svg';

export default function SkillLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-main h-screen">
      <Header
        left={{
          title: '재능공유',
        }}
        right={[
          {
            icon: <Bell />,
            href: '/alram-center',
          },
        ]}
      />

      <section className="flex-1 overflow-y-auto pb-28">{children}</section>
    </div>
  );
}
