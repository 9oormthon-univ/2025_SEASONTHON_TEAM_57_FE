'use client';
import React, { useState } from 'react';

import BottomButton from '@/components/button/bottomButton';

import Field from '@/components/Field/Field';

export default function CertificatePage() {
  const [challenge, setChallenge] = useState('');
  return (
    <main className="bg-main min-h-screen">
      <div className="mx-[3.2rem] py-6 flex flex-col gap-6">
        <Field
          label="챌린지명"
          placeholder="챌린지명 입력"
          value={challenge}
          onChange={(value: string) => setChallenge(value)}
          className="mb-16"
        />
        <Field
          label="인증 날짜"
          value={'2025년 9월 4일'}
          className="mb-16"
          disabled
        />
      </div>
      <BottomButton button={{ buttonText: '업로드' }} />
    </main>
  );
}
