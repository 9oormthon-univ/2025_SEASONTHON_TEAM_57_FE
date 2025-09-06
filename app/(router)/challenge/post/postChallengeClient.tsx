'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import Field from '@/components/Field/Field';

import ImagesInput from '@/components/input/imgeInput';
import { MAX_IMAGES } from '@/constants';

import Camera from '@icons/camera.svg';

type Props = { action: (formData: FormData) => Promise<void> };

export default function PostChallengeClient({ action }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>([]);

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  const handlePick = () => fileInputRef.current?.click();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remain = MAX_IMAGES - images.length;
    const sliced = files.slice(0, Math.max(0, remain));
    const nextUrls = sliced.map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...nextUrls]);

    e.target.value = ''; // 같은 파일 재선택을 위해 초기화
  };

  return (
    <form
      id="postChallenge"
      action={action}
      className="flex flex-col gap-[2rem] mt-[2.8rem] mx-[3.2rem]"
    >
      <Field
        label="챌린지명"
        placeholder="챌린지명 입력"
        name="challengeTitle"
      />

      <Field
        label="모집기간"
        placeholder="모집기간 입력"
        name="chellenegePeriod"
      />

      <Field
        label="내용"
        placeholder="추가하고 싶은 내용 입력"
        name="challengeContent"
        as="textarea"
      />

      <ImagesInput
        name="challengePhotos"
        max={5}
      />
    </form>
  );
}
