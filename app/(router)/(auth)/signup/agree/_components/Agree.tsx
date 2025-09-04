'use client';

import Link from 'next/link';

import Right from '@icons/arrow/right.svg';
import Check from '@icons/check.svg';

interface AgreeProps {
  index: number;
  label: string;
  href: string;
  state: boolean;
  onClick: (index: number) => void;
}

export default function Agree({ index, label, href, state, onClick }: AgreeProps) {
  return (
    <div className="flex justify-between">
      <div className="flex gap-[0.8rem] items-center pl-[1.2rem]">
        <button onClick={() => onClick(index)}>
          <Check stroke={state ? '#1D1E23' : '#A4AAA7'} />
        </button>
        <div className="px-[0.8rem] border border-[var(--gray2)] caption rounded-[0.8rem]">
          필수
        </div>
        <p className="body2">{label}</p>
      </div>
      <Link
        href={href}
        target="_blank"
      >
        <Right />
      </Link>
    </div>
  );
}
