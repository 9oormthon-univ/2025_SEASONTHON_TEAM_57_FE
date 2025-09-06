'use client';

import React from 'react';

import FilterTab from './_components/FilterTab';
import PostList, { Post } from './_components/PostList';
import CategoryChips from '../../../components/category/CategoryChips';

const posts: Post[] = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title: 'OPIC 준비 도와드립니다',
  summary: 'OPIC 준비 도와드립니다! OPIC 준비 도와드리니 OPIC 준비 도와드리…',
  meta: '교환 / 외국어 · 번역 · 통역',
}));

export default function SkillSharePage() {
  // const [selectedFilter, setSelectedFilter] = React.useState(0);
  const handleFilterChange = (index: number) => {
    console.log('선택된 필터:', index);
  };

  return (
    <>
      <div className="mt-4">
        <FilterTab
          defaultIndex={0}
          onChange={handleFilterChange}
        />

        <div className="mt-6" />
        <div className="flex items-center justify-between">
          <h3 className="h3 text-[var(--black)] pl-[32px]">지금 Hot한 재능</h3>
          <MoreLink href="/hot" />
        </div>

        <HotCarousel
          items={hotCards}
          className="mt-3"
        />
      </div>

      <div className="flex items-center justify-between mt-[2.0rem] mb-[10px]">
        <h3 className="h3 text-[var(--black)] pl-[32px]">카테고리</h3>
      </div>

      <div className="mt-4">
        <CategoryChips
          boxSize={60}
          iconPaddingRatio={0.08}
        />
      </div>

      <div className="flex items-center justify-between mt-[40px] mb-[12px]">
        <h3 className="h3 text-[var(--black)] pl-[32px]">온심이 님께 추천드리는 재능공유</h3>
      </div>

      <PostList
        posts={posts}
        className="mt-4"
      />

      <div className="h-6" />
    </>
  );
}
