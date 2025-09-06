import Image from 'next/image';

import ProfileEdit from '@/public/mypage/profile_edit.svg';

import SvgBox from './SvgBox';

export default function ProfileSection() {
  return (
    <div className="flex flex-col items-center gap-3 pb-6">
      <div className="relative h-[100px] w-[100px]">
        <div className="absolute inset-0 rounded-full bg-[var(--gray1)] overflow-hidden flex items-center justify-center">
          <Image
            src="/mypage/profile.svg"
            alt="프로필"
            width={100}
            height={100}
            className="h-[100px] w-[100px] object-contain"
            priority
          />
        </div>

        <div className="absolute right-1 bottom-1 h-9 w-9 rounded-full border border-[var(--gray2)] shadow-md flex items-center justify-center z-10 bg-transparent">
          <SvgBox
            Icon={ProfileEdit}
            size={40}
          />
        </div>
      </div>

      <h2 className="h2 text-[var(--black)]">홍길동</h2>
    </div>
  );
}
