'use client';

import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';

type Option = { label: string; value: string };

type Props = {
  label?: string;
  placeholder?: string;
  options: Option[];
  values?: string[];
  onChange?: (v: string[]) => void;
  value?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | (string & {});
};

export default function FullWidthSelect({
  label,
  placeholder = '선택하세요',
  options,
  values,
  onChange,
  value,
  className,
  size = 'md',
}: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = values !== undefined;
  const [inner, setInner] = useState<string[]>(() => values ?? (value ? [value] : []));

  useEffect(() => {
    if (isControlled) setInner(values || []);
  }, [isControlled, values]);

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
        ? 'min-h-[44px]'
        : size === 'lg'
        ? 'min-h-[60px]'
        : size === 'md'
        ? 'min-h-[52px]'
        : `min-h-[${size}]`
      : 'min-h-[52px]';

  const selected = inner;

  const setSelected = (next: string[]) => {
    if (isControlled) {
      onChange?.(next);
    } else {
      setInner(next);
    }
  };

  const toggle = (val: string) => {
    setSelected(selected.includes(val) ? selected.filter(v => v !== val) : [...selected, val]);
  };

  const removeValue = (val: string) => {
    if (!selected.includes(val)) return;
    setSelected(selected.filter(v => v !== val));
  };

  const selectedOptions = useMemo(
    () => options.filter(o => selected.includes(o.value)),
    [options, selected]
  );

  return (
    <div
      className={clsx('flex flex-col gap-2', className)}
      ref={ref}
    >
      {label && <span className="body3">{label}</span>}

      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        onClick={() => setOpen(s => !s)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(s => !s);
          }
        }}
        className={clsx(
          'relative w-full rounded-[1.2rem] bg-[var(--bg-main)] px-[1.6rem] body3',
          heightClass,
          'flex items-center gap-[0.8rem] flex-wrap py-[0.8rem]',
          'text-[var(--gray4)]'
        )}
        style={{ border: '1px solid var(--gray2)' }}
      >
        {selectedOptions.length === 0 ? (
          <span className="body3 text-[var(--gray2)]">{placeholder}</span>
        ) : (
          <div className="flex flex-wrap items-center gap-[0.8rem]">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="flex items-center gap-[0.6rem] rounded-full bg-white border border-[var(--gray2)] px-[1.2rem] py-[0.4rem]"
                onClick={e => e.stopPropagation()}
              >
                <span className="body3 text-[var(--black)]">{opt.label}</span>
                <button
                  type="button"
                  aria-label={`${opt.label} 삭제`}
                  className="body3 text-[var(--gray3)] hover:text-[var(--black)]"
                  onClick={e => {
                    e.stopPropagation();
                    removeValue(opt.value);
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}

        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={clsx(
            'absolute right-[1.2rem] top-1/2 -translate-y-1/2 transition-transform',
            open && 'rotate-180'
          )}
        >
          <path
            d="M6 9l6 6 6-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>

      {open && (
        <div className="relative">
          <div
            className="absolute z-20 mt-2 w-full overflow-hidden rounded-[1.2rem] bg-[var(--bg-main)] shadow"
            style={{ border: '1px solid var(--gray2)' }}
            onClick={e => e.stopPropagation()}
          >
            {options.map(opt => {
              const isSelected = selected.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  className={clsx(
                    'px-4 py-3 cursor-pointer body3 flex items-center justify-between',
                    isSelected
                      ? 'bg-[var(--gray1)] text-[var(--black)]'
                      : 'text-[var(--gray4)] hover:bg-[var(--gray1)]'
                  )}
                  onClick={e => {
                    e.stopPropagation();
                    toggle(opt.value);
                  }}
                >
                  <span className="body3">{opt.label}</span>

                  {isSelected ? (
                    <button
                      type="button"
                      className="body3 text-[var(--gray3)] hover:text-[var(--black)]"
                      onClick={e => {
                        e.stopPropagation();
                        removeValue(opt.value);
                      }}
                    >
                      ×
                    </button>
                  ) : (
                    <span className="caption text-[var(--gray3)]">추가</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
