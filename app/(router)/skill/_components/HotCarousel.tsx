'use client';

import clsx from 'clsx';
import React from 'react';

import HotCard from './HotCard';

export type HotCardItem = {
  id: number;
  title: string;
  badgeRight: string;
  desc1: string;
  desc2: string;
  color: string;
};

export default function HotCarousel({
  items,
  className,
}: {
  items: HotCardItem[];
  className?: string;
}) {
  return (
    <div className={clsx('overflow-x-auto scrollbar-hidden', className)}>
      <ul className="flex gap-3 pr-0 pl-[3.2rem]">
        {items.map(c => (
          <li key={c.id} className="shrink-0 w-[26rem]">
            <HotCard
              id={c.id}
              title={c.title}
              badgeRight={c.badgeRight}
              desc1={c.desc1}
              desc2={c.desc2}
              color={c.color}
            />
          </li>
        ))}
        <li aria-hidden className="shrink-0 w-[3.2rem]" />
      </ul>
    </div>
  );
}
