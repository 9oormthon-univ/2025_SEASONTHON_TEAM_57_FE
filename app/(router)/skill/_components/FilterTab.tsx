'use client';

import React, { useState } from 'react';

type FilterTabProps = {
  defaultIndex?: number;
  onChange?: (index: number) => void;
  className?: string;
};

const OPTIONS = ['전체', '교환', '배우기', '알려주기'];

export default function FilterTab({ defaultIndex = 0, onChange, className = '' }: FilterTabProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    onChange?.(index);
  };

  return (
    <div className={`w-full  ${className}`}>
      <div className="mx-auto w-full max-w-[500px]">
        <div
          className="flex w-full gap-2 p-2 rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--gray1)' }}
          role="tablist"
          aria-label="게시물 필터"
        >
          {OPTIONS.map((option, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={option}
                role="tab"
                aria-selected={isActive}
                onClick={() => handleClick(index)}
                className={[
                  'flex-1 min-w-0 rounded-2xl py-2 px-3 transition-colors',
                  'body1 text-[1.4rem] leading-[2rem] md:text-[1.6rem] md:leading-[2.4rem]',
                  isActive ? 'text-white' : 'text-[var(--gray3)] hover:text-[var(--black)]',
                ].join(' ')}
                style={{
                  backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                }}
              >
                <span className="block w-full truncate">{option}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
