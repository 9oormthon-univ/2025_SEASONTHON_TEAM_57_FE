'use client';

import Link from 'next/link';
import React from 'react';

import CategoryChips from './_components/CategoryChips';
import FilterTab from './_components/FilterTab';
import HotCarousel, { HotCardItem } from './_components/HotCarousel';
import PostList, { Post } from './_components/PostList';

const hotCards: HotCardItem[] = [
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

const posts: Post[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: 'OPIC 준비 도와드립니다',
  summary: 'OPIC 준비 도와드립니다! OPIC 준비 도와드리니 OPIC 준비 도와드리…',
  meta: '교환 / 외국어 · 번역 · 통역',
}));

export default function SkillSharePage() {
  const handleFilterChange = (index: number) => {
    console.log('선택된 필터:', index);
  };

  return (
    <>
      <div className="mt-4">
        <FilterTab defaultIndex={0} onChange={handleFilterChange} />

        <div className="mt-6" />
        <h3 className="h3 text-[var(--black)] pl-[32px]">지금 Hot한 재능</h3>

        <HotCarousel items={hotCards} className="mt-3" />
      </div>

      <div className="mt-4">
        <CategoryChips categories={categories} activeIndex={0} />
      </div>

      <PostList posts={posts} className="mt-4" />

      <div className="h-6" />
    </>
  );
}
