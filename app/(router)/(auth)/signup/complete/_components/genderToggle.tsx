'use client';

import clsx from 'clsx';
import { useId } from 'react';

import { Gender } from '@/constants/types';

interface Props {
  value: Gender;
  onChange: (next: Gender) => void;
  className?: string;
  labels?: { male?: string; female?: string };
  name?: string;
  disabled?: boolean;
}

export default function GenderToggle({
  value,
  onChange,
  className,
  labels,
  name,
  disabled = false,
}: Props) {
  const idRoot = useId();
  const maleId = `${idRoot}-male`;
  const femaleId = `${idRoot}-female`;

  const btnClassName =
    'relative z-10 h-full w-1/2 items-center justify-center rounded-[1.6rem] btn1';

  return (
    <div className={clsx('flex', className, disabled && 'opacity-50 cursor-not-allowed')}>
      {name && (
        <>
          <input
            type="radio"
            name={name}
            value="male"
            checked={value === 'male'}
            readOnly
            hidden
          />
          <input
            type="radio"
            name={name}
            value="female"
            checked={value === 'female'}
            readOnly
            hidden
          />
        </>
      )}

      <div
        role="radiogroup"
        aria-label="성별 선택"
        aria-disabled={disabled}
        className={clsx(
          'flex relative w-full h-[6rem] rounded-[1.6rem] bg-[#E8E8EE33] p-[.5rem]',
          'border border-[var(--gray2)]'
        )}
      >
        <div
          className={clsx(
            'absolute h-[4.8rem] w-[calc(50%-.5rem)] rounded-[1.4rem] border border-[#FF6A47] bg-white',
            'transition-transform duration-300 ease-out will-change-transform'
          )}
          style={{
            top: '0.5rem',
            left: '0.5rem',
            transform: value === 'male' ? 'translateX(0%)' : 'translateX(calc(100%))',
          }}
          aria-hidden
        />

        <button
          id={maleId}
          type="button"
          role="radio"
          aria-checked={value === 'male'}
          onClick={() => !disabled && onChange('male')}
          disabled={disabled}
          className={clsx(
            btnClassName,
            value === 'male' ? 'text-primary font-semibold' : 'text-gray3'
          )}
        >
          {labels?.male ?? '남성'}
        </button>

        <button
          id={femaleId}
          type="button"
          role="radio"
          aria-checked={value === 'female'}
          onClick={() => !disabled && onChange('female')}
          disabled={disabled}
          className={clsx(
            btnClassName,
            value === 'female' ? 'text-primary font-semibold' : 'text-gray3'
          )}
        >
          {labels?.female ?? '여성'}
        </button>
      </div>
    </div>
  );
}
