'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import Header from '@/components/layout/header';
import Back from '@/public/icons/arrow/left.svg';
import Settings from '@/public/icons/settings.svg';

export default function AlramLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-main h-screen">
      <div className="mx-auto h-full max-w-[500px] flex flex-col">
        <Header
          left={
            <button
              aria-label="뒤로가기"
              onClick={() => router.back()}
              className="h-10 w-10 rounded-full hover:bg-white/50 active:opacity-90"
            >
              <Back width={24} height={24} />
            </button>
          }
          rightItems={[
            <Link
              key="settings"
              aria-label="설정"
              href="/settings"
              className="h-10 w-10 rounded-full hover:bg-white/50 active:opacity-90"
            >
              <Settings width={24} height={24} />
            </Link>,
          ]}
        />

        <section className="flex-1 overflow-y-auto pb-28">
          <h2 className="h2 ml-[32px] mt-[20px] mb-[20px]">알림센터</h2>

          {children}
        </section>
      </div>
    </div>
  );
}
