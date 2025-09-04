'use client';

import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';

type Option = { label: string; value: string };

type Props = {
  label?: string;
  placeholder?: string;
  options: Option[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | (string & {});
};

export default function FullWidthSelect({
  label,
  placeholder = '선택하세요',
  options,
  value,
  onChange,
  className,
  size = 'md',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const heightClass =
    typeof size === 'string'
      ? size === 'sm'
        ? 'h-[44px]'
        : size === 'lg'
        ? 'h-[60px]'
        : size === 'md'
        ? 'h-[52px]'
        : size
      : 'h-[52px]';

  return (
    <div className={clsx('flex flex-col gap-2', className)} ref={ref}>
      {label && <span className="body3 text-[var(--gray4)]">{label}</span>}

      <button
        type="button"
        className={clsx(
          'relative w-full rounded-[1.2rem] bg-[var(--bg-main)] px-[1.6rem] body3 text-[var(--gray2)]',
          heightClass
        )}
        style={{ border: '1px solid var(--gray2)' }}
        onClick={() => setOpen(s => !s)}
        aria-expanded={open}
      >
        <span className="body3 text-[var(--gray2)]">
          {value ? options.find(o => o.value === value)?.label : placeholder}
        </span>

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={clsx(
            'absolute right-[1.2rem] top-1/2 -translate-y-1/2 transition-transform',
            open && 'rotate-180'
          )}
        >
          <path d="M6 9l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {open && (
        <div className="relative">
          <div
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-[1.2rem] bg-[var(--bg-main)] shadow"
            style={{ border: '1px solid var(--gray2)' }}
          >
            {options.map(opt => (
              <div
                key={opt.value}
                className={clsx(
                  'px-4 py-3 cursor-pointer body3 text-[var(--gray4)] hover:bg-[var(--gray1)]',
                  value === opt.value && 'bg-[var(--gray1)]'
                )}
                onClick={() => {
                  onChange?.(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
