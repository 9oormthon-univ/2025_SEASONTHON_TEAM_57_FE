import clsx from 'clsx';
import Link from 'next/link';
import { JSX } from 'react';

import ButtonBox from '@/components/button/buttonBox';

import Kakao from '@icons/kakao.svg';

interface SocialItemsProps {
  icon?: JSX.Element;
  bgColor: string;
  text: string;
  textColor?: string;
  redirectUrl: string;
}
const socialItems: Record<string, SocialItemsProps> = {
  kakao: {
    icon: <Kakao />,
    bgColor: '#FEE500',
    text: '카카오 로그인',
    redirectUrl: `${process.env.KAKAO_OAUTH_URL}?client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`,
  },
  guest: {
    icon: undefined,
    bgColor: 'var(--gray1)',
    text: '비회원으로 시작하기',
    redirectUrl: `/`,
  },
};

export default function SocialLoginBtn({
  social,
}: Readonly<{
  social: 'kakao' | 'google' | 'apple' | 'naver' | 'guest';
}>) {
  const { icon, bgColor, textColor, text, redirectUrl } = socialItems[social];

  return (
    <Link href={redirectUrl}>
      <ButtonBox bgColor={bgColor}>
        <div
          className={clsx(
            'flex w-full items-center gap-[1.2rem]',
            icon ? 'justify-between' : 'justify-center'
          )}
        >
          {icon && icon}
          <span
            className="tracking-[-0.04rem]"
            style={{
              color: textColor && textColor,
            }}
          >
            {text}
          </span>
          {icon && <div className="w-[2.4rem]" />}
        </div>
      </ButtonBox>
    </Link>
  );
}
