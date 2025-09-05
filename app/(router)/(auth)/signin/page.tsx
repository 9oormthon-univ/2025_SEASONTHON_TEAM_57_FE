import Link from 'next/link';

import styles from '@/styles/signin.module.css';

import Dev_Logo from './_components/dev_Logo';
import SocialLoginBtn from './_components/socialLogin';

export default function SignIn() {
  return (
    <main className="flex items-center justify-center h-full">
      <div className="flex flex-col items-center">
        <section
          className="mb-[4rem]"
          style={{ marginTop: 'clamp(3rem, calc(3rem + 0.6 * (100svh - 690px)), 11rem)' }}
        >
          <h4 className={styles.symbol}>따뜻함을 켜다</h4>
        </section>
        <Dev_Logo />
        <section
          style={{
            marginTop: 'clamp(6rem, calc(6rem + 0.7 * (100svh - 844px)), 8.5rem)',
            marginBottom: '3rem',
          }}
        >
          <div className="flex flex-col gap-[1.2rem]">
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
