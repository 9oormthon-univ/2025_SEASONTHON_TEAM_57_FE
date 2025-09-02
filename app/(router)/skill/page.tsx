'use client';

import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import ShadowBox from '@/components/shadow';
import Bookmark from '@/public/icons/bookmark.svg';

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
      className={clsx('inline-flex items-center justify-center shrink-0', className)}
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

const hotCards = [
  {
    id: 1,
    title: '쉽게 배우는 프론트엔드',
    badgeRight: '마감임박',
    desc1: 'Html, CSS, React를 쉽게 배워요!',
    desc2: '기본 개념부터, 협업방법까지 알려드립니다',
    color: 'bg-gradient-to-br from-gray-200 to-gray-100',
  },
  {
    id: 2,
    title: '쉽게 배우는 프로젝트 관리',
    badgeRight: '모집완료',
    desc1: '칸반, 스프린트, 실전 템플릿 제공',
    desc2: '실습 중심 커리큘럼',
    color: 'bg-gradient-to-br from-green-200 to-green-100',
  },
  {
    id: 3,
    title: '영어 스피킹 부스트',
    badgeRight: '🔥 인기',
    desc1: '원어민 발음 교정',
    desc2: '주 2회 라이브 스터디',
    color: 'bg-gradient-to-br from-rose-200 to-rose-100',
  },
];

const categories = [
  '전체',
  '외국어 · 번역 · 통역',
  '프로그래밍 · IT · 데이터',
  '디자인 · 영상',
  '음악 · 예술',
  '취업 · 자격증',
  '기타',
];

type Post = {
  id: number;
  title: string;
  summary: string;
  meta: string;
};

const posts: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: 'OPIC 준비 도와드립니다',
  summary: 'OPIC 준비 도와드립니다! OPIC 준비 도와드리니 OPIC 준비 도와드리…',
  meta: '교환 / 외국어 · 번역 · 통역', // 시간 제거, 오른쪽 정렬
}));

export default function SkillSharePage() {
  return (
    <>
      {/* 지금 Hot한 재능 */}
      <div className="mt-4">
        <h3 className="h3 text-[var(--black)] pl-[32px]">지금 Hot한 재능</h3>

        {/* 가로 스크롤 카드: ShadowBox 사용 + 좌 32px, 끝 32px 스페이서 */}
        <div className="mt-3 overflow-x-auto scrollbar-hidden">
          <ul className="flex gap-3 pr-0 pl-[32px]">
            {hotCards.map(c => (
              <li key={c.id} className="shrink-0 w-[260px]">
                <ShadowBox className="bg-white rounded-[16px] p-2">
                  <div className="relative h-[140px] w-full rounded-[12px] overflow-hidden">
                    <div className={`absolute inset-0 ${c.color}`} />
                    {/* 좌상단 배지 */}
                    <span className="absolute left-2 top-2 caption px-2 py-1 rounded-full bg-white/90 border border-[var(--gray2)]">
                      모집중
                    </span>
                    {/* 우상단 북마크 */}
                    <button
                      className="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/90 border border-[var(--gray2)] flex items-center justify-center"
                      aria-label="북마크"
                    >
                      <SvgBox Icon={Bookmark} size={18} />
                    </button>
                  </div>

                  <div className="mt-2 px-1 pb-2">
                    <div className="flex items-center gap-2">
                      <p className="body1 text-[var(--black)] truncate">{c.title}</p>
                      <span className="caption px-2 py-[2px] rounded-full bg-[var(--gray1)] text-[var(--gray4)] whitespace-nowrap">
                        {c.badgeRight}
                      </span>
                    </div>
                    <p className="body3 text-[var(--gray4)] mt-1 line-clamp-1">{c.desc1}</p>
                    <p className="body3 text-[var(--gray4)] line-clamp-1">{c.desc2}</p>
                  </div>
                </ShadowBox>
              </li>
            ))}
            {/* 오른쪽 32px 여백용 스페이서 */}
            <li aria-hidden className="shrink-0 w-[32px]" />
          </ul>
        </div>
      </div>

      {/* 카테고리 가로 스크롤: 좌 32px, 끝 32px 스페이서 */}
      <div className="mt-4">
        <div className="overflow-x-auto scrollbar-hidden">
          <ul className="flex gap-2 pl-[32px] pr-0">
            {categories.map((cat, idx) => {
              const active = idx === 0;
              return (
                <li key={cat} className="shrink-0">
                  <button
                    className={`body3 h-9 px-4 rounded-full border whitespace-nowrap ${
                      active
                        ? 'bg-[var(--black)] text-white border-[var(--black)]'
                        : 'bg-white text-[var(--black)] border-[var(--gray2)]'
                    } active:opacity-90`}
                  >
                    {cat}
                  </button>
                </li>
              );
            })}
            <li aria-hidden className="shrink-0 w-[32px]" />
          </ul>
        </div>
      </div>

      {/* 게시글 리스트: 박스 제거, 밑줄 형태 + 오른쪽 정렬 메타 */}
      <ul className="mt-4 px-[32px] divide-y divide-[var(--gray1)]">
        {posts.map(p => (
          <li key={p.id} className="py-4">
            <Link href={`/skill/${p.id}`} className="grid grid-cols-[56px_1fr] gap-3">
              <div className="h-24 w-24 rounded-[12px] bg-[var(--gray1)]" />
              <div className="min-w-0">
                <p className="body1 text-[var(--black)] truncate ml-4">{p.title}</p>
                <p className="body3 text-[var(--gray4)] mt-1 line-clamp-2 ml-4">{p.summary}</p>
                {/* 메타: gray3, 16px, 오른쪽 정렬 */}
                <p className="mt-2 text-right text-[var(--gray3)] text-[1.2rem] leading-[150%]">
                  {p.meta}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="h-6" />
    </>
  );
}
