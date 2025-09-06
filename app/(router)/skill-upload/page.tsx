'use client';

import Image from 'next/image';
import React, { useMemo, useRef, useState } from 'react';

import Field from '@/components/Field/Field';
import FieldWithEndSelect from '@/components/Field/FieldWithEndSelect';
import FullWidthSelect from '@/components/Field/FullWidthSelect';

import Camera from '@icons/camera.svg';

// SVGR 아이콘

type SvgIconType = React.FC<React.SVGProps<SVGSVGElement>>;

/** 어떤 SVG도 컨테이너 안에서 중앙정렬 + 꽉 채우도록 렌더링 */
function SvgBox({
  Icon,
  box = 48, // 바깥 사각형 크기(px)
  vb = '0 0 60 60', // 아이콘의 viewBox (파일의 값과 동일하게)
  className = '',
}: {
  Icon: SvgIconType;
  box?: number;
  vb?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center bg-white border border-[var(--gray2)] rounded-[1.2rem] shadow-sm ${className}`}
      style={{ width: box, height: box }}
    >
      <Icon
        viewBox={vb}
        preserveAspectRatio="xMidYMid meet"
        className="block w-full h-full"
      />
    </span>
  );
}

const typeOptions = [
  { label: '교환', value: 'exchange' },
  { label: '배우기', value: 'learn' },
  { label: '알려주기', value: 'teach' },
];

const categoryOptions = [
  { label: '창의 · 예술', value: 'art' },
  { label: '라이프스타일', value: 'life' },
  { label: '스포츠 · 웰빙', value: 'sports' },
  { label: '언어 · 학습', value: 'lang' },
  { label: 'IT · 디지털', value: 'it' },
  { label: '자기계발', value: 'selfdev' },
];

const MAX_IMAGES = 5;

export default function SkillUploadPage() {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<string>('exchange');
  const [period, setPeriod] = useState('');
  const [price, setPrice] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('');

  const [images, setImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <main className="min-h-screen bg-main">
      <div className="mx-[3.2rem] py-6 flex flex-col gap-6">
        {/* 1) 제목 + 오른쪽 작은 드롭다운 */}
        <FieldWithEndSelect
          label="제목"
          placeholder="제목 입력"
          options={typeOptions}
          value={title}
          onChange={setTitle}
          selected={mode}
          onSelect={setMode}
          size="lg"
        />

        {/* 2) 교환 기간 */}
        <Field
          label="교환 기간"
          placeholder="기간 입력"
          value={period}
          name="period"
          onChange={setPeriod}
          size="lg"
        />

        {/* 3) 가격 */}
        <Field
          label="가격"
          placeholder="가격 입력"
          value={price}
          name="price"
          onChange={setPrice}
          size="lg"
        />

        {/* 4) 내용 */}
        <Field
          as="textarea"
          label="내용"
          placeholder="추가하고 싶은 내용 입력"
          value={content}
          name="content"
          onChange={setContent}
          minH="min-h-[200px]"
        />

        {/* 5) 카테고리: 전체 너비 드롭다운 */}
        <FullWidthSelect
          label="카테고리"
          placeholder="카테고리 입력"
          options={categoryOptions}
          value={category}
          onChange={setCategory}
          size="lg"
        />

        {/* 6) 사진 업로드 (카테고리 드롭다운과 1.2rem 마진) */}
        <section className="mt-[1.2rem]">
          <div className="flex items-start gap-4">
            {/* 왼쪽: 업로드 버튼 + 카운트 */}
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={handlePick}
                aria-label="사진 업로드"
                className="focus:outline-none"
              >
                {/* viewBox는 svg 파일의 값과 동일하게 지정 (예: 0 0 60 60) */}
                <Camera />
              </button>
              <span className="caption mt-2 text-[var(--gray4)]">
                {`사진 ${images.length}/${MAX_IMAGES}`}
              </span>
            </div>

            {/* 오른쪽: 선택한 사진 미리보기 (가로 나열) */}
            <div className="flex-1 overflow-x-auto scrollbar-hidden">
              <ul className="flex items-center gap-4 pr-1">
                {images.map((src, idx) => (
                  <li
                    key={src}
                    className="relative"
                  >
                    <Image
                      src={src}
                      alt={`선택한 사진 ${idx + 1}`}
                      className="w-[88px] h-[88px] object-cover rounded-[1.2rem] border border-[var(--gray2)] bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--black)] text-white btn2"
                      aria-label="사진 삭제"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 숨겨진 파일 입력 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFiles}
          />
        </section>

        {/* 업로드 버튼 등은 이후 추가 가능 */}
      </div>
    </main>
  );
}
