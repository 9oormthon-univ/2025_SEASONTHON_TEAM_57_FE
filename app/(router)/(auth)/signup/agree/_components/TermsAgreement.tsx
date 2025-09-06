'use client';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import BottomButton from '@/components/button/bottomButton';
import type { Term } from '@/constants/types';

import CheckCircleFill from '@icons/check-circle-fill.svg';
import CheckCircle from '@icons/check-circle.svg';

import Agree from './Agree';

export default function AgreementForm({ terms }: { terms: Term[] }) {
  const router = useRouter();
  const [state, setState] = useState<boolean[]>(() => terms.map(() => false));

  useEffect(() => {
    setState(prev => terms.map((_, i) => prev[i] ?? false));
  }, [terms]);

  const agreeAll = useMemo(() => state.length > 0 && state.every(Boolean), [state]);

  const toggleOne = (index: number) => {
    setState(prev => prev.map((v, i) => (i === index ? !v : v)));
  };

  const toggleAll = () => {
    const next = !agreeAll;
    setState(terms.map(() => next));
  };

  const handleNext = () => {
    if (!agreeAll) return;
    router.push('/signup/complete');
  };

  return (
    <section className="mt-[4rem]">
      <button
        onClick={toggleAll}
        className={clsx(
          'flex !justify-start w-full h-[6rem] gap-[1.1rem]',
          'bg-[var(--gray1)] rounded-[1.6rem] px-[1.2rem]'
        )}
      >
        {agreeAll ? <CheckCircleFill /> : <CheckCircle />}
        <span className="body2">전체동의</span>
      </button>

      <div className="flex flex-col gap-[2rem] mt-[2rem]">
        {terms.map((item, index) => (
          <Agree
            key={index}
            index={index}
            label={item.label}
            state={state[index]}
            href={item.href}
            onClick={toggleOne}
          />
        ))}
      </div>

      <BottomButton
        button={{
          buttonText: '다음',
          disabled: !agreeAll,
          onClick: handleNext,
        }}
      />
    </section>
  );
}
