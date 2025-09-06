import Image from 'next/image';

import BottomButton from '@/components/button/bottomButton';

import SkiExample from '@/public/skiexample.png';

import ProfileImg from '../../skill-post/_components/ProfileImg';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>
      <Image
        src={SkiExample}
        width={300}
        height={240}
        alt="ski example"
      />
      <div className="mt-[2rem]">
        <ProfileImg
          src="/mypage/sample_profile.png"
          name="서니"
          time="20시간 전"
        />
      </div>
      <h2 className="mt-[2rem]">스키 30일 챌린지</h2>

      <div className="flex mt-[1.2rem] mb-[2rem]">
        <div className="px-[1.2rem] rounded-full py-[.4rem] text-primary border border-[var(--primary)]">
          모집기간 ~25.09.10
        </div>
      </div>

      <div className="body3">
        25/26시즌 생활체육지도자 2급 스키 같은 지도자 준비중이거나 스키 <br />
        레벨/티칭1 준비중인 사람도 환영합니다. <br />
         같이 챌린지를 하면서 자격증 함께 취득해봐요:)
      </div>

      <BottomButton button={{ buttonText: '도전하기', href: '/challenge' }} />
    </div>
  );
}
