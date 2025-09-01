'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import Award from '@/public/mypage/award.svg';
import Clipboard from '@/public/mypage/clipboard.svg';
import HelpCircle from '@/public/mypage/help-circle.svg';
import LogOut from '@/public/mypage/log-out.svg';
import Monitor from '@/public/mypage/monitor.svg';
import ProfileEdit from '@/public/mypage/profile_edit.svg';
import Trash from '@/public/mypage/trash-2.svg';

function SvgBox({
  Icon,
  size = 24,
  label,
  className = '',
}: {
  Icon: any;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden={!label}
    >
      <Icon
        width={size}
        height={size}
        viewBox="0 0 24 24"
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-full"
        aria-label={label}
        role={label ? 'img' : undefined}
      />
    </span>
  );
}

type ItemProps = {
  href?: string;
  Icon: any;
  label: string;
  danger?: boolean;
};

function ListItem({ href = '#', Icon, label, danger }: ItemProps) {
  return (
    <li className="border-b border-[var(--gray1)] last:border-b-0">
      <Link
        href={href}
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 h-[60px] px-2 active:opacity-90 hover:bg-white/40"
      >
        <SvgBox Icon={Icon} size={24} />
        <span
          className={`body2 leading-[24px] ${
            danger ? 'text-[var(--primary)]' : 'text-[var(--black)]'
          }`}
        >
          {label}
        </span>
        <span aria-hidden className="flex items-center justify-center h-6 w-6">
          <i className="block border-t-[2px] border-r-[2px] border-[var(--gray3)] h-3 w-3 rotate-45" />
        </span>
      </Link>
    </li>
  );
}

export default function MyPage() {
  return (
    <main className="bg-main min-h-screen">
      <section className="mx-auto max-w-[500px] px-[32px] pt-6 pb-8">
        <div className="flex flex-col items-center gap-3 pb-6">
          <div className="relative h-[100px] w-[100px]">
            <div className="absolute inset-0 rounded-full bg-[var(--gray1)] overflow-hidden flex items-center justify-center">
              <Image
                src="/mypage/profile.svg"
                alt="프로필"
                width={100}
                height={100}
                className="h-[100px] w-[100px] object-contain"
                priority
              />
            </div>

            <button
              className="absolute right-1 bottom-1 h-9 w-9 rounded-full border border-[var(--gray2)] shadow-md flex items-center justify-center z-10 bg-transparent"
              aria-label="프로필 수정"
            >
              <SvgBox Icon={ProfileEdit} size={24} />
            </button>
          </div>

          <h2 className="h2 text-[var(--black)]">홍길동</h2>
        </div>

        <ul className="flex flex-col">
          <ListItem Icon={Clipboard} label="내 정보 수정" href="#profile" />
          <ListItem Icon={Monitor} label="나의 재능" href="#talent" />
          <ListItem Icon={HelpCircle} label="고객센터" href="#cs" />
          <ListItem Icon={Award} label="등급표" href="#grade" />
          <ListItem Icon={LogOut} label="로그아웃" href="#logout" />
          <ListItem Icon={Trash} label="회원탈퇴" href="#withdraw" />
        </ul>
      </section>
    </main>
  );
}
