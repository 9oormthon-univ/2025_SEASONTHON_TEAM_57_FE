'use client';

import React, { useRef, useState } from 'react';

import Field from '@/components/Field/Field';
import FieldWithEndSelect from '@/components/Field/FieldWithEndSelect';
import FullWidthSelect from '@/components/Field/FullWidthSelect';
import Picture from '@/public/icons/picture.svg';

type Props = { action: (formData: FormData) => Promise<void> };
type SvgIconType = React.FC<React.SVGProps<SVGSVGElement>>;
type SkillType = 'trade' | 'learn' | 'teach';

function SvgBox({
  Icon,
  box = 48,
  vb = '0 0 60 60',
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
        className="w-full h-full block"
      />
    </span>
  );
}

const typeOptions = [
  { label: '교환', value: 'trade' },
  { label: '배우기', value: 'learn' },
  { label: '알려주기', value: 'teach' },
];

// 서버는 숫자 ID 배열을 원함. UI는 문자열로 들고 있다가 제출 시 숫자 JSON으로 변환.
const categoryOptions = [
  { categoryId: 1, label: '창의 · 예술', value: '1' },
  { categoryId: 2, label: '라이프스타일', value: '2' },
  { categoryId: 3, label: '스포츠 · 웰빙', value: '3' },
  { categoryId: 4, label: '언어 · 학습', value: '4' },
  { categoryId: 5, label: 'IT · 디지털', value: '5' },
  { categoryId: 6, label: '자기계발', value: '6' },
];

const MAX_IMAGES = 5;

export default function SkillUploadPage({ action }: Props) {
  // 서버 액션 스펙
  const [type, setType] = useState<SkillType>('trade');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(''); // 문자열로 두고 서버에서 Number 처리
  const [content, setContent] = useState('');
  const [learnCats, setLearnCats] = useState<string[]>([]);
  const [teachCats, setTeachCats] = useState<string[]>([]);

  // 이미지 미리보기
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handlePick = () => fileInputRef.current?.click();

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;
    const remain = MAX_IMAGES - imagesPreview.length;
    const sliced = files.slice(0, Math.max(0, remain));
    const nextUrls = sliced.map(f => URL.createObjectURL(f));
    setImagesPreview(prev => [...prev, ...nextUrls]);
    e.target.value = ''; // 같은 파일 재선택 가능
  };

  const removeImage = (idx: number) => {
    setImagesPreview(prev => prev.filter((_, i) => i !== idx));
  };

  // 문자열[] -> 숫자[] -> JSON
  const toIdJson = (arr: string[]) =>
    JSON.stringify(
      arr
        .map(v => Number(v))
        .filter(v => Number.isFinite(v) && v > 0)
        .map(v => Math.trunc(v))
    );

  return (
    <main className="bg-main min-h-screen">
      <form
        id="skill-form"
        action={action}
        encType="multipart/form-data"
        className="mx-[3.2rem] py-6 flex flex-col gap-6"
      >
        {/* ===== 폼 전송용 숨김 필드 (핵심) ===== */}
        <input
          type="hidden"
          name="type"
          value={type}
        />
        <input
          type="hidden"
          name="title"
          value={title}
        />
        <input
          type="hidden"
          name="content"
          value={content}
        />
        <input
          type="hidden"
          name="price"
          value={price}
        />
        <input
          type="hidden"
          name="learnCategoryIds"
          value={toIdJson(learnCats)}
        />
        <input
          type="hidden"
          name="teachCategoryIds"
          value={toIdJson(teachCats)}
        />

        {/* ===== UI 컴포넌트 (name 없어도 됨; 숨김 필드로 제출) ===== */}
        <FieldWithEndSelect
          label="제목"
          placeholder="제목 입력"
          options={typeOptions}
          value={title}
          onChange={setTitle}
          selected={type}
          onSelect={v => setType(v as SkillType)}
          size="lg"
          // name 전달은 UI 내부에서 쓰려면 유지 가능 (전송은 hidden이 담당)
        />

        <Field
          label="가격"
          placeholder="가격 입력"
          value={price}
          onChange={setPrice}
          size="lg"
          type="number"
        />

        <Field
          as="textarea"
          label="내용"
          placeholder="추가하고 싶은 내용 입력"
          value={content}
          onChange={setContent}
          minH="min-h-[200px]"
        />

        {/* type에 따라 드롭다운 표시 (trade는 둘 다 표시) */}
        {type === 'learn' && (
          <FullWidthSelect
            label="배우기 카테고리"
            placeholder="카테고리 선택"
            options={categoryOptions}
            values={learnCats}
            onChange={setLearnCats}
            size="lg"
            className="relative z-10"
          />
        )}

        {type === 'teach' && (
          <FullWidthSelect
            label="알려주기 카테고리"
            placeholder="카테고리 선택"
            options={categoryOptions}
            values={teachCats}
            onChange={setTeachCats}
            size="lg"
            className="relative z-10"
          />
        )}

        {type === 'trade' && (
          <div className="flex flex-col gap-6">
            <FullWidthSelect
              label="배우기 카테고리"
              placeholder="카테고리 선택"
              options={categoryOptions}
              values={learnCats}
              onChange={setLearnCats}
              size="lg"
              className="relative z-10"
            />
            <FullWidthSelect
              label="알려주기 카테고리"
              placeholder="카테고리 선택"
              options={categoryOptions}
              values={teachCats}
              onChange={setTeachCats}
              size="lg"
              className="relative z-10"
            />
          </div>
        )}

        {/* ===== 사진 업로드 섹션 ===== */}
        <section className="mt-[1.2rem]">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={handlePick}
                aria-label="사진 업로드"
                className="focus:outline-none"
              >
                <SvgBox
                  Icon={Picture as unknown as SvgIconType}
                  vb="0 0 60 60"
                />
              </button>
              <span className="caption mt-2 text-[var(--gray4)]">{`사진 ${imagesPreview.length}/${MAX_IMAGES}`}</span>
            </div>

            <div className="flex-1 overflow-x-auto scrollbar-hidden">
              <ul className="flex items-center gap-4 pr-1">
                {imagesPreview.map((src, idx) => (
                  <li
                    key={src}
                    className="relative"
                  >
                    <img
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

          {/* 실제 제출되는 파일 input (form 내부 필수) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFiles}
            name="images"
          />
        </section>

        {/* 제출 버튼 */}
        <button
          type="submit"
          className="mt-8 w-full h-[5.6rem] rounded-[1.2rem] bg-[var(--primary)] text-white btn1"
        >
          업로드
        </button>
      </form>
    </main>
  );
}
