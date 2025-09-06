import clsx from 'clsx';
import Link from 'next/link';

import LogoWhtie from '@/public/icons/logo_white.svg';
import style from '@/styles/main.module.css';
import styles from '@/styles/signin.module.css';

import SocialLoginBtn from './_components/socialLogin';

export default function SignIn() {
  return (
    <main className={clsx('flex items-center justify-center h-full', style.bg)}>
      <div className="flex flex-col items-center">
        <section
          className="mb-[4rem] flex-col items-center"
          style={{
            marginTop: 'clamp(3rem, calc(3rem + 0.6 * (100svh - 690px)), 11rem)',
            display: 'flex',
          }}
        >
          <div className={style.maintext}>세상 모든 재능은</div>
          <LogoWhtie />
        </section>
        <section
          style={{
            marginTop: 'clamp(6rem, calc(6rem + 0.7 * (100svh - 844px)), 8.5rem)',
            marginBottom: '3rem',
          }}
        >
          <div className="flex flex-col gap-[1.2rem] mt-[5rem]">
            <SocialLoginBtn social="kakao" />
            <SocialLoginBtn social="guest" />
          </div>
          <Link
            href={'/signup/agree'}
            className="block text-center mt-[4rem]"
          >
            <span className={styles.signupLink}>회원가입하기</span>
          </Link>
        </section>
      </div>
    </main>
  );
}
