import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type ItemProps = {
  href?: string;
  iconName: string;
  label: string;
  danger?: boolean;
};

function SvgIcon({ name, alt }: { name: string; alt: string }) {
  return (
    <span className="flex h-6 w-6 items-center justify-center">
      <Image
        src={`/mypage/${name}.svg`}
        alt={alt}
        width={24}
        height={24}
        className="h-6 w-6"
        priority
      />
    </span>
  );
}

function ListItem({ href = '#', iconName, label, danger }: ItemProps) {
  return (
    <li className="border-b border-[var(--gray1)] last:border-b-0">
      <Link
        href={href}
        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 h-[60px] px-2 active:opacity-90 hover:bg-white/40"
      >
        <SvgIcon name={iconName} alt={label} />
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
          <div className="relative h-[100px] w-[100px] rounded-full bg-[var(--gray1)] flex items-center justify-center">
            <Image
              src="/mypage/profile.svg"
              alt="프로필"
              width={100}
              height={100}
              className="h-[100px] w-[100px] object-contain"
              priority
            />
            <button
              className="absolute right-1 bottom-1 h-9 w-9 rounded-full bg-white border border-[var(--gray2)] shadow-md flex items-center justify-center z-10"
              aria-label="프로필 수정"
            >
              <Image
                src="/mypage/profile_edit.svg"
                alt="프로필 수정"
                width={16}
                height={16}
                className="h-8 w-8"
              />
            </button>
          </div>
          <h2 className="h2 text-[var(--black)]">홍길동</h2>
        </div>

        <ul className="flex flex-col">
          <ListItem iconName="clipboard" label="내 정보 수정" href="#profile" />
          <ListItem iconName="monitor" label="나의 재능" href="#talent" />
          <ListItem iconName="help-circle" label="고객센터" href="#cs" />
          <ListItem iconName="award" label="등급표" href="#grade" />
          <ListItem iconName="log-out" label="로그아웃" href="#logout" />
          <ListItem iconName="trash-2" label="회원탈퇴" href="#withdraw" />
        </ul>
      </section>
    </main>
  );
}
