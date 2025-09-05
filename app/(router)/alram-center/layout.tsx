'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import Header from '@/components/layout/header';
import Back from '@/public/icons/left-arrow.svg';
import Settings from '@/public/icons/settings.svg';

export default function AlramLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <div className="bg-main h-screen">
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
      />

      <section className="flex-1 overflow-y-auto pb-28">
        <h2 className="h2 ml-[3.2rem] mt-[2.0rem] mb-[2.0rem]">알림센터</h2>

        {children}
      </section>
    </div>
  );
}
