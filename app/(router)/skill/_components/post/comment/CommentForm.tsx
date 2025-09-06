// app/(router)/skill/_components/post/comment/CommentForm.tsx
'use client';

import clsx from 'clsx';
import { useState, useTransition, useCallback } from 'react';

import Bookmark from '@icons/bookmark.svg';
import ImageIcon from '@icons/image.svg'; // Image 예약어 피하려고 이름 변경
import Send from '@icons/send.svg';

import { createCommentAction } from '../../../_actions/comment';
import SvgBox from '../SvgBox';

type Props = {
  postId: number;
  parentId?: number;
  className?: string;
};

export default function CommentForm({ postId, parentId, className }: Props) {
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const canSubmit = content.trim().length > 0 && !isPending;

  const submit = useCallback(() => {
    if (!content.trim() || isPending) return;
    setError(null);
    startTransition(async () => {
      try {
        await createCommentAction({ postId, content: content.trim(), parentId });
        setContent('');
      } catch (err) {
        setError((err as Error)?.message ?? '댓글 등록 실패');
      }
    });
  }, [content, isPending, parentId, postId]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  };

  // 확장 포인트: 북마크/이미지 버튼 클릭 핸들러
  const onClickBookmark = () => {
    // TODO: 북마크 토글/즐겨찾기 로직 연결
  };
  const onClickImage = () => {
    // TODO: 이미지 첨부 모달/파일 선택 연결
  };

  return (
    <form
      onSubmit={onSubmit}
      className={clsx('relative', className)}
    >
      {/* 하단 고정 입력바 */}
      <div
        className={clsx(
          'fixed bottom-0 left-0 right-0 z-30 w-full h-[6rem] bg-white',
          'border-t border-[var(--gray2)] flex items-center px-[3.2rem]',
          'md:static md:border-0 md:h-auto md:px-0 md:py-12'
        )}
      >
        {/* 좌측 아이콘 버튼들 */}
        <div className="flex items-center space-x-[1.6rem]">
          <button
            type="button"
            onClick={onClickBookmark}
            aria-label="북마크"
            className="disabled:opacity-50"
            disabled={isPending}
          >
            <SvgBox
              Icon={Bookmark}
              size={24}
              viewBox="0 0 24 24"
            />
          </button>

          <button
            type="button"
            onClick={onClickImage}
            aria-label="이미지 첨부"
            className="disabled:opacity-50"
            disabled={isPending}
          >
            <SvgBox
              Icon={ImageIcon}
              size={24}
              viewBox="0 0 24 24"
            />
          </button>
        </div>

        {/* 입력창 */}
        <div className="relative flex-1 h-[4rem] ml-[1.6rem] mr-[4.8rem] md:mr-0">
          <label
            htmlFor="comment-input"
            className="sr-only"
          >
            댓글 입력
          </label>
          <input
            id="comment-input"
            type="text"
            placeholder={isPending ? '등록 중...' : '댓글을 입력해주세요.'}
            className={clsx(
              'w-full h-full body3 rounded-[1.6rem] pl-[1.2rem] pr-[4.8rem]',
              'border border-[var(--gray1)] bg-[var(--gray1)] text-[var(--black)]',
              'focus:outline-none focus:border-[var(--black)]',
              'disabled:opacity-60'
            )}
            value={content}
            onChange={e => setContent(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isPending}
            autoComplete="off"
            inputMode="text"
          />

          {/* 전송 버튼 (모바일 우측 겹치기) */}
          <button
            type="submit"
            aria-label="댓글 전송"
            disabled={!canSubmit}
            className={clsx(
              'absolute top-1/2 right-[-4.0rem] -translate-y-1/2 p-1 rounded-full',
              'md:static md:ml-[0.8rem]',
              !canSubmit ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
            )}
            onClick={e => {
              e.preventDefault();
              submit();
            }}
          >
            <SvgBox
              Icon={Send}
              size={32}
              viewBox="0 0 32 32"
            />
          </button>
        </div>
      </div>

      {/* 에러 메시지 */}
      {error && <p className="caption text-[var(--primary)] mt-[0.8rem] md:mt-0">{error}</p>}
    </form>
  );
}
