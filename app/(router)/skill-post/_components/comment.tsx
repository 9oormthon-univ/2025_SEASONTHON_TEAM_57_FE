'use client';

import clsx from 'clsx';

import Bookmark from '@icons/bookmark.svg';
import Image from '@icons/image.svg';
import Send from '@icons/send.svg';

import SvgBox from './SvgBox';

export default function Comment() {
  return (
    <div
      className={clsx(
        'fixed bottom-0 w-full h-[6rem] bg-white border-t border-[var(--gray2)] flex items-center px-[3.2rem]',
        'md:static md:border-0 md:h-auto md:px-0 md:py-12'
      )}
    >
      <div className="flex items-center space-x-[1.6rem]">
        <button>
          <SvgBox
            Icon={Bookmark}
            size={24}
            className=""
            viewBox="0 0 24 24"
          />
        </button>
        <button>
          <SvgBox
            Icon={Image}
            size={24}
            className=""
            viewBox="0 0 24 24"
          />
        </button>
      </div>
      <div className="relative flex-1 h-[4rem] ml-[1.6rem] mr-[4.8rem]">
        <input
          type="text"
          placeholder="댓글을 입력해주세요."
          className="w-full h-full text-body3 border border-[var(--gray1)] bg-[var(--gray1)] rounded-[1.6rem] pl-[1.2rem] focus:outline-none text-[1.8rem] text-[var(--black)]"
        />
      </div>
      <SvgBox
        Icon={Send}
        size={32}
        className="absolute top-1/2 right-[3.2rem] -translate-y-1/2 cursor-pointer"
        viewBox="0 0 32 32"
      />
    </div>
  );
}
