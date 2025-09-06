'use client';

import { useState } from 'react';

import BottomButton from '@/components/button/bottomButton';
import Field from '@/components/Field/Field';
import FullWidthSelect from '@/components/Field/FullWidthSelect';

import ImagesInput from '@/components/input/imgeInput';
import { categoryOptions } from '@/constants';

type Props = { action: (formData: FormData) => Promise<void> };

export default function PostChallengeClient({ action }: Props) {
  const [categoryIds, setCategoryIds] = useState<string[]>([]);

  const commonClass =
    'w-full rounded-[1.2rem] mt-[.4rem] px-[1.2rem] h-[5.2rem] border border-solid border-[var(--gray2)] bg-[var(--bg-main)] px-[1.6rem] body3 placeholder-[var(--gray2)] focus:border-[var(--black)] outline-none';

  return (
    <form
      id="postChallengeForm"
      action={action}
      className="flex flex-col gap-[2rem] mt-[2.8rem] mx-[3.2rem]"
    >
      <Field
        label="챌린지명"
        placeholder="챌린지명 입력"
        name="challengeTitle"
      />

      <div className="grid grid-cols-2 gap-[1.2rem]">
        <div>
          <div className="body3">시작일</div>
          <input
            type="date"
            name="challengeStartDate"
            className={commonClass}
          />
        </div>
        <div>
          <div className="body3">종료일</div>
          <input
            type="date"
            name="challengeEndDate"
            className={commonClass}
          />
        </div>
      </div>

      <Field
        label="내용"
        placeholder="추가하고 싶은 내용 입력"
        name="challengeContent"
        as="textarea"
      />

      <FullWidthSelect
        label="카테고리"
        placeholder="카테고리 선택"
        options={categoryOptions}
        values={categoryIds}
        onChange={setCategoryIds}
        size="lg"
        className="relative z-10"
      />

      <input
        type="hidden"
        name="categoryIds"
        value={categoryIds}
      />

      <ImagesInput
        name="challengePhotos"
        max={5}
      />

      <BottomButton
        button={{ buttonText: '업로드', href: '/challenge/post-check' }}
        modal={{
          title: '이 정보로 업로드 하시겠어요?',
          loadingText: '반영 중입니다.',
          formId: 'postChallengeForm',
        }}
      />
    </form>
  );
}
