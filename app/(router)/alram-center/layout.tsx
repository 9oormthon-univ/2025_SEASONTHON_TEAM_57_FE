import React from 'react';

import Header from '@/components/layout/header';
import Back from '@/public/icons/left-arrow.svg';

export default function AlramLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-main">
      <Header left={{ icon: <Back /> }} />

      <section className="flex-1 overflow-y-auto pb-28">
        <h2 className="h2 ml-[3.2rem] mt-[2.0rem] mb-[2.0rem]">알림센터</h2>

        {children}
      </section>
    </div>
  );
}
