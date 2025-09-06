'use client';

import clsx from 'clsx';
import React, { useEffect, useId, useRef, useState } from 'react';

type Option = { label: string; value: string };

type Props = {
  label?: string;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg' | (string & {});
  options: Option[];
  value?: string;
  onChange?: (v: string) => void;
  selected?: string;
  onSelect?: (v: string) => void;
  className?: string;
};

export default function FieldWithEndSelect({
  label,
  placeholder,
  size = 'md',
  options,
  value,
  onChange,
  selected,
  onSelect,
  className,
}: Props) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
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
    <div
      className={clsx('flex flex-col gap-2', className)}
      ref={boxRef}
    >
      {label && (
        <label
          htmlFor={id}
          className="body3 text-[var(--gray4)]"
        >
          {label}
        </label>
      )}

      <div
        className={clsx(
          'relative flex items-center rounded-[1.2rem] border border-[var(--gray2)] bg-[var(--bg-main)]',
          heightClass
        )}
      >
        <input
          id={id}
          className="flex-1 h-full bg-transparent px-[1.6rem] body3 text-black placeholder-[var(--gray2)] focus:outline-none"
          placeholder={placeholder}
          value={value}
          onChange={e => onChange?.(e.target.value)}
        />

        <button
          type="button"
          className="absolute right-[0.8rem] top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[0.8rem] border border-[var(--gray2)] px-[1.2rem] h-[36px] bg-[var(--bg-main)]"
          onClick={() => setOpen(s => !s)}
          aria-expanded={open}
        >
          <span className="body3 text-[var(--gray4)]">
            {options.find(o => o.value === selected)?.label ?? '선택'}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className={clsx('transition-transform', open && 'rotate-180')}
          >
            <path
              d="M6 9l6 6 6-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 top-[calc(100%+6px)] z-20 w-[140px] overflow-hidden rounded-[1rem] border border-[var(--gray2)] bg-white shadow">
            {options.map(opt => (
              <div
                key={opt.value}
                className={clsx(
                  'px-3 py-2 cursor-pointer body3 text-[var(--gray4)] hover:bg-[var(--gray1)]',
                  selected === opt.value && 'bg-[var(--gray1)]'
                )}
                onClick={() => {
                  onSelect?.(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
