'use client';

import clsx from 'clsx';
import React from 'react';

type BaseProps = {
  label?: string;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | (string & {});
  required?: boolean;
};

type InputProps = BaseProps & {
  as?: 'input';
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  onChange?: (v: string) => void;
  name: string;
};

type TextareaProps = BaseProps & {
  as: 'textarea';
  minH?: string;
  value?: string;
  onChange?: (v: string) => void;
  name: string;
};

export default function Field(props: InputProps | TextareaProps) {
  const { label, placeholder, className, size = 'lg', required } = props;

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

  const commonClass =
    'w-full rounded-[1.2rem] border border-solid border-[var(--gray2)] bg-[var(--bg-main)] px-[1.6rem] body3 text-[var(--gray2)] placeholder-[var(--gray2)] focus:border-[var(--black)] outline-none';

  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      {label && (
        <label className="body3">
          {label} {required && <span className="text-[var(--primary)]">*</span>}
        </label>
      )}

      {props.as === 'textarea' ? (
        <textarea
          className={clsx(commonClass, props.minH ?? 'min-h-[160px] py-[1.6rem]')}
          style={{ backgroundColor: 'var(--bg-main)' }}
          placeholder={placeholder}
          value={props.value}
          name={props.name}
          onChange={e => props.onChange?.(e.target.value)}
        />
      ) : (
        <input
          type={props.type ?? 'text'}
          className={clsx(commonClass, heightClass)}
          placeholder={placeholder}
          value={props.value}
          name={props.name}
          onChange={e => (props as InputProps).onChange?.(e.target.value)}
        />
      )}
    </div>
  );
}
