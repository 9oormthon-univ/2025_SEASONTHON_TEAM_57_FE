'use client';

import React from 'react';

export default function CategoryChips({
  categories,
  activeIndex = 0,
  className = '',
}: {
  categories: string[];
  activeIndex?: number;
  className?: string;
}) {
  return (
    <div className={`overflow-x-auto scrollbar-hidden ${className}`}>
      <ul className="flex gap-2 pl-[32px] pr-0">
        {categories.map((cat, idx) => {
          const active = idx === activeIndex;
          return (
            <li key={cat} className="shrink-0">
              <button
                type="button"
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
        {/* 우측 32px 여백 유지 */}
        <li aria-hidden className="shrink-0 w-[32px]" />
      </ul>
    </div>
  );
}
