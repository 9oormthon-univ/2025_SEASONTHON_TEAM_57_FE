import { redirect } from 'next/navigation';

import { RegisterUser } from '@/service/authorization';
import { MemberInfo } from '@/service/interfaces';
import { getCookie } from '@/utils/cookie';

import SignupClient from './signupClient';

export default async function SignupComplete() {
  async function signup(formData: FormData) {
    'use server';

    const nick = formData.get('nickname');
    const name = formData.get('realname');
    const birth = formData.get('birth');

    const trimmedValue = (value: FormDataEntryValue | null) => {
      if (typeof value === 'string') {
        return value.trim();
      }
      return null;
    };

    const nickname = trimmedValue(nick);
    const realName = trimmedValue(name);
    const birthDate = trimmedValue(birth);

    if (!nickname || !realName || !birthDate) {
      redirect('/signup/complete?error=required');
    }

    try {
      await RegisterUser({ nickname, realName, birthDate });
    } catch (error) {
      redirect(`/signup/complete?error=${(error as Error).message}`);
    }

    redirect('/');
  }

  const memberInfo_cookie = await getCookie('member_info');
  if (!memberInfo_cookie) {
    redirect('/signin?error=missing_credentials');
  }
  const memberInfo = JSON.parse(decodeURIComponent(memberInfo_cookie)) as MemberInfo;

  return (
    <>
      <h2>프로필 설정</h2>
      <div className="body2 mt-[.8rem]">회원여부 확인 및 가입을 진행합니다.</div>
      <SignupClient
        action={signup}
        memberInfo={memberInfo}
      />
    </>
  );
}
