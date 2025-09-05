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

  // terms 배열이 바뀌면 기존 값을 최대한 보존하면서 재정렬
  useEffect(() => {
    setState(prev => terms.map((_, i) => prev[i] ?? false));
  }, [terms]);

  // 파생값: 전체 동의 여부 (별도 상태 X)
  const agreeAll = useMemo(() => state.length > 0 && state.every(Boolean), [state]);

  // 개별 토글
  const toggleOne = (index: number) => {
    setState(prev => prev.map((v, i) => (i === index ? !v : v)));
  };

  // 전체 토글 (버튼 클릭 시에만 일괄 변경)
  const toggleAll = () => {
    const next = !agreeAll;
    setState(terms.map(() => next));
  };

  const handleNext = () => {
    if (!agreeAll) return; // 전체 동의가 아닐 경우 아무 동작도 하지 않음
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
