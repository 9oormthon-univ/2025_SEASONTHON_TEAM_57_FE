'use client';

import clsx from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';

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
  onSelect: Dispatch<SetStateAction<number>>;

  boxSize?: number;
  iconPaddingRatio?: number;
};

type Cat = {
  id: number;
  label: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const FIXED_CATEGORIES: Cat[] = [
  { id: 1, label: '창의 · 예술', Icon: Art },
  { id: 2, label: '라이프스타일', Icon: Lifestyle },
  { id: 3, label: '스포츠 · 웰빙', Icon: Sports },
  { id: 4, label: '언어 · 학습', Icon: Language },
  { id: 5, label: 'IT · 디지털', Icon: IT },
  { id: 6, label: '자기계발', Icon: SelfDev },
];

const CATEGORY_VIEWBOX = '0 0 60 60';

export default function CategoryChips({ activeIndex = 0, className = '', onSelect }: Props) {
  return (
    <div className={clsx('overflow-x-auto scrollbar-hidden', className)}>
      <ul className="flex gap-[2rem] pr-0 mx-[3.2rem]">
        {FIXED_CATEGORIES.map(({ id, label, Icon }) => {
          const active = id === activeIndex;

          return (
            <li
              key={label}
              className="shrink-0"
            >
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-pressed={active}
                className={clsx(
                  'flex flex-col w-[8.2rem] items-center gap-[.4rem] focus:outline-none',
                  id === 6 ? 'mr-[3.2rem]' : ''
                )}
              >
                <span
                  className={clsx(
                    'flex items-center justify-center rounded-2xl border transition-colors',
                    active
                      ? 'bg-white border-[var(--black)]'
                      : 'bg-white border-[var(--gray1)] hover:border-[var(--black)]'
                  )}
                >
                  <Icon
                    viewBox={CATEGORY_VIEWBOX}
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
      </ul>
    </div>
  );
}
