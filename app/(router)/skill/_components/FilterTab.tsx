'use client';

import React, { useState } from 'react';

type FilterTabProps = {
  /** 0: 전체, 1: 교환, 2: 배우기, 3: 알려주기 */
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
    /**
     * 바깥 래퍼:
     * - 좌우 padding을 항상 3.2rem 줘서 잘림 방지
     * - 안쪽 컨테이너는 중앙 정렬 + max-w-[500px]
     */
    <div className={`w-full px-[3.2rem] ${className}`}>
      <div className="mx-auto w-full max-w-[500px]">
        <div
          className="flex w-full gap-2 p-2 rounded-full overflow-hidden"
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
                  'flex-1 min-w-0 rounded-full py-2 px-3 transition-colors',
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
