'use client';

import React from 'react';

import ShadowBox from '@/components/shadow';
import Bookmark from '@/public/icons/bookmark.svg';
import 모집완료 from '@/public/skill/모집완료.svg';
import 모집중 from '@/public/skill/모집중.svg';

import SvgBox from './SvgBox';

export type HotCardProps = {
  id: number;
  title: string;
  badgeRight: string;
  desc1: string;
  desc2: string;
  color: string;
};

export default function HotCard({ id, title, badgeRight, desc1, desc2, color }: HotCardProps) {
  const StatusIcon = id === 1 ? 모집중 : 모집완료;

  return (
    <ShadowBox className="bg-white rounded-[16px] p-2">
      <div className="relative h-[140px] w-full">
        <div className="absolute inset-0 rounded-[12px] overflow-hidden">
          <div className={`absolute inset-0 ${color}`} />
        </div>

        <div className="absolute left-3 top-3 z-10">
          <SvgBox Icon={StatusIcon} size={24} />
        </div>

        <button
          className="absolute right-3 top-3 h-9 w-9 rounded-full bg-white/90 border border-[var(--gray2)] flex items-center justify-center z-10"
          aria-label="북마크"
          type="button"
        >
          <SvgBox Icon={Bookmark} size={24} className="shrink-0" />
        </button>
      </div>

      <div className="mt-2 px-1 pb-2">
        <div className="flex items-center gap-2">
          <p className="body1 text-[var(--black)] truncate">{title}</p>
          <span className="caption px-2 py-[2px] rounded-full bg-[var(--gray1)] text-[var(--gray4)] whitespace-nowrap">
            {badgeRight}
          </span>
        </div>
        <p className="body3 text-[var(--gray4)] mt-1 line-clamp-1">{desc1}</p>
        <p className="body3 text-[var(--gray4)] line-clamp-1">{desc2}</p>
      </div>
    </ShadowBox>
  );
}
