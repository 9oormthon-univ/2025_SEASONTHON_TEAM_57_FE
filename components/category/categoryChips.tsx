'use client';

import clsx from 'clsx';
import React from 'react';

import Art from '@/public/icons/category/art.svg';
import IT from '@/public/icons/category/it.svg';
import Language from '@/public/icons/category/language.svg';
import Lifestyle from '@/public/icons/category/lifestyle.svg';
import SelfDev from '@/public/icons/category/self-development.svg';
import Sports from '@/public/icons/category/sports.svg';

type Props = {
  categories?: string[];
  activeIndex?: number;
  className?: string;
  onSelect?: (idx: number) => void;

  boxSize?: number;
  iconPaddingRatio?: number;
};

type Cat = {
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FIXED_CATEGORIES: Cat[] = [
  { label: '창의 · 예술', Icon: Art },
  { label: '라이프스타일', Icon: Lifestyle },
  { label: '스포츠 · 웰빙', Icon: Sports },
  { label: '언어 · 학습', Icon: Language },
  { label: 'IT · 디지털', Icon: IT },
  { label: '자기계발', Icon: SelfDev },
];

const CATEGORY_VIEWBOX = '0 0 60 60';

export default function CategoryChips({
  categories,
  activeIndex = 0,
  className = '',
  onSelect,
  boxSize = 64,
  iconPaddingRatio = 0.12,
}: Props) {
  const pad = Math.max(4, Math.round(boxSize * iconPaddingRatio));
  const iconPx = Math.max(20, boxSize - pad * 2);

  return (
    <div className={clsx('overflow-x-auto scrollbar-hidden', className)}>
      <ul className="flex gap-[2.0rem] pl-[3.2rem] pr-0">
        {FIXED_CATEGORIES.map(({ label, Icon }, idx) => {
          const active = idx === activeIndex;

          return (
            <li
              key={label}
              className="shrink-0"
            >
              <button
                type="button"
                onClick={() => onSelect?.(idx)}
                aria-pressed={active}
                className="group flex w-[8.0rem] flex-col items-center gap-2 focus:outline-none"
              >
                <span
                  className={clsx(
                    'flex items-center justify-center rounded-2xl border transition-colors',
                    active
                      ? 'bg-white border-[var(--black)]'
                      : 'bg-white border-[var(--gray1)] hover:border-[var(--black)]'
                  )}
                  style={{ width: boxSize, height: boxSize }}
                >
                  <Icon
                    width={iconPx}
                    height={iconPx}
                    viewBox={CATEGORY_VIEWBOX}
                    preserveAspectRatio="xMidYMid meet"
                    style={{ display: 'block' }}
                    aria-hidden
                    focusable="false"
                  />
                </span>

                <span
                  className={clsx(
                    'body1 text-center whitespace-nowrap',
                    active ? 'font-semibold text-[var(--black)]' : 'text-[var(--black)]'
                  )}
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}

        <li
          aria-hidden
          className="shrink-0 w-[3.2rem]"
        />
      </ul>
    </div>
  );
}
