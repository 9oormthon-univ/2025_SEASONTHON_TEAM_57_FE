import clsx from 'clsx';

import BottomButton from '@/components/button/bottomButton';

import CheckBig from '@icons/checkBig.svg';
import CheckSmaill from '@icons/checkSmall.svg';

export default function PostCheckPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <CheckBig />
      </div>
      <h2 className="mt-[3.2rem]">접수가 완료되었어요</h2>
      <div className="body2 mt-[2rem] text-center">
        운영진쪽에서 검토 후 확정하면
        <br />
        업로드가 진행됩니다
      </div>
      <div className="relative flex gap-[9.9rem] mt-[6rem]">
        <div className="relative z-50 flex justify-center gap-[.4rem]">
          <CheckSmaill />
          <AbsoluteDiv>접수완료</AbsoluteDiv>
        </div>
        <div className="relative z-50 w-[2.4rem] aspect-square flex items-center justify-center rounded-full bg-primary">
          <div className="flex bg-white w-[1.6rem] aspect-square rounded-full" />
          <AbsoluteDiv className="text-primary">ONDA 검토중</AbsoluteDiv>
        </div>
        <div className="relative z-50 flex w-[2.4rem] aspect-square bg-gray2 items-center justify-center rounded-full">
          <div className="text-center btn2 text-gray1">3</div>
          <AbsoluteDiv className="text-gray2">업로드 완료</AbsoluteDiv>
        </div>

        <div className="absolute top-[1.1rem] left-[2.2rem] w-[10.3rem] h-[.2rem] bg-primary" />
        <div className="absolute top-[1.1rem] left-[14.5rem] w-[10.3rem] h-[.2rem] bg-gray2" />
      </div>

      <BottomButton
        button={{
          buttonText: '메인화면으로',
          href: '/',
        }}
        description="최대 2주정도 소요됩니다"
      />
    </>
  );
}

export const AbsoluteDiv = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={clsx('absolute text-center btn2 w-[10rem] top-[2.8rem]', className)}>
      {children}
    </div>
  );
};
