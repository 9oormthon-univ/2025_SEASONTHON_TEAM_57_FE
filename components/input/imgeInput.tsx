// app/(whatever)/_components/ImagesInput.tsx
'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import Camera from '@icons/camera.svg';

type ImagesInputProps = {
  name?: string; // form 전송용 name
  max?: number; // 최대 개수 (기본 10)
  onChange?: (files: File[]) => void;
  captureCamera?: boolean; // 모바일에서 카메라 바로 열기 (기본 false)
};

export default function ImagesInput({ name = 'photos', max = 10, onChange }: ImagesInputProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  // blob URL 미리보기
  const previews = useMemo(() => files.map(f => URL.createObjectURL(f)), [files]);
  useEffect(() => {
    return () => {
      previews.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previews]);

  // 실제 <input>의 FileList를 files 상태로 맞춰줌
  const syncInputFileList = useCallback((nextFiles: File[]) => {
    const dt = new DataTransfer();
    nextFiles.forEach(f => dt.items.add(f));
    if (inputRef.current) inputRef.current.files = dt.files;
  }, []);

  const applyFiles = useCallback(
    (next: File[], showError?: string) => {
      const limited = next.slice(0, max); // 안전망
      setFiles(limited);
      syncInputFileList(limited);
      setError(showError ?? null);
      onChange?.(limited);
    },
    [max, onChange, syncInputFileList]
  );

  const handlePick = useCallback(
    (picked: FileList | null) => {
      if (!picked) return;
      setError(null);

      const pickedArr = Array.from(picked).filter(f => f.type.startsWith('image/'));
      if (pickedArr.length === 0) return;

      // 중복 제거(이름+크기+수정시각 기준 가볍게)
      const key = (f: File) => `${f.name}_${f.size}_${f.lastModified}`;
      const currentMap = new Map(files.map(f => [key(f), f]));

      pickedArr.forEach(f => currentMap.set(key(f), f));
      const merged = Array.from(currentMap.values());

      let warn: string | undefined;
      if (merged.length > max) {
        warn = `최대 ${max}장까지만 업로드할 수 있어요. 초과분은 제외됩니다.`;
      }
      applyFiles(merged, warn);
    },
    [files, max, applyFiles]
  );

  const onInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handlePick(e.target.files);
      // 같은 파일 재선택 허용을 위해 value 초기화
      e.currentTarget.value = '';
    },
    [handlePick]
  );

  const removeAt = useCallback(
    (idx: number) => {
      const next = files.filter((_, i) => i !== idx);
      applyFiles(next);
    },
    [files, applyFiles]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault();
      handlePick(e.dataTransfer.files);
    },
    [handlePick]
  );

  const onDragPrevent = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div className="space-y-3">
      {/* 카운터 */}

      <div className="flex h-[6rem] gap-[.8rem]">
        {/* 업로드 영역 */}
        <label
          htmlFor="images-input"
          onDrop={onDrop}
          onDragOver={onDragPrevent}
          onDragEnter={onDragPrevent}
          className="flex flex-col w-[6rem] aspect-square items-center justify-center gap-2 rounded-[1.2rem] border border-[var(--gray2)] cursor-pointer hover:bg-gray-50"
        >
          <Camera />
          <div className="text-right caption">
            <span>사진 {files.length}</span>/<span>{max}</span>
          </div>
        </label>

        <input
          id="images-input"
          ref={inputRef}
          name={name}
          type="file"
          accept="image/*"
          multiple
          // 모바일 카메라 바로 열기 일단 주석 처리
          // {...(captureCamera ? { capture: 'environment' } : {})}
          onChange={onInputChange}
          className="sr-only"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        {/* 썸네일 */}
        {files.length > 0 && (
          <ul className="flex gap-[.8rem] overflow-x-scroll scrollbar-hidden">
            {files.map((file, i) => (
              <li
                key={`${file.name}_${file.size}_${file.lastModified}`}
                className="relative w-[6rem] aspect-square"
              >
                <Image
                  src={previews[i]}
                  width={60}
                  height={60}
                  alt={`${file.name} preview`}
                  className="w-[6rem] h-[6rem] object-cover rounded-xl border"
                />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute right-1 top-1 rounded-full bg-black/60 px-2 py-0.5 text-[11px] text-white"
                  aria-label={`${file.name} 삭제`}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
