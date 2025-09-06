'use client';

import clsx from 'clsx';
import Image from 'next/image';
import { useState } from 'react';

import BottomButton from '@/components/button/bottomButton';
import { Gender } from '@/constants/types';

import { MemberInfo } from '@/service/interfaces';

import Profile from '@icons/profile-filled.svg';

import GenderToggle from './_components/genderToggle';

type Props = { action: (formData: FormData) => Promise<void>; memberInfo: MemberInfo };

const inputStyles =
  'w-full mt-[.8rem] py-[2rem] px-[1.2rem] border border-[var(--gray2)] rounded-[1.6rem] ' +
  'placeholder:text-gray2';

export default function SignupClient({ action, memberInfo }: Props) {
  const [value, setValue] = useState('');
  const [gender, setGender] = useState<Gender>(memberInfo.gender);
  const [profile, setProfile] = useState<string>(memberInfo.profile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, '');
    if (raw.length > 8) raw = raw.slice(0, 8);

    if (raw.length === 8) {
      const formatted = `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
      setValue(formatted);
    } else {
      setValue(raw);
    }
  };

  return (
    <form
      id="signupForm"
      action={action}
    >
      <div className="flex justify-center my-[4rem]">
        {profile === '' ? (
          <Profile />
        ) : (
          <div className="w-[10rem] aspect-square flex justify-center items-center">
            <Image
              src={profile}
              width={83.33}
              height={83.33}
              className="rounded-full"
              alt="profile"
            />
          </div>
        )}
      </div>
      <div className="flex flex-col gap-[2rem]">
        <div>
          <div className="body3">
            실명 <span className="text-[red]">*</span>
          </div>
          <input
            type="text"
            name="realname"
            className={clsx('body3', inputStyles)}
            placeholder="이름 입력"
            required
          />
        </div>
        <div>
          <div className="body3">
            닉네임 <span className="text-[red]">*</span>
          </div>
          <input
            type="text"
            name="nickname"
            className={clsx('body3', inputStyles)}
            placeholder="닉네임 입력"
            required
          />
        </div>
        <div>
          <div className="body3">성별</div>
          <GenderToggle
            value={gender}
            onChange={setGender}
            className="mt-[.8rem]"
          />
        </div>
        <div>
          <div className="body3">생년월일</div>
          <input
            type="text"
            name="birth"
            className={clsx('body3', inputStyles)}
            minLength={8}
            onChange={handleChange}
            value={value}
            placeholder="생년월일 8자리 입력 (예: 19900101)"
          />
        </div>
      </div>
      <BottomButton
        button={{ buttonText: '가입하기' }}
        modal={{
          title: '이 정보로 회원가입 하시겠어요?',
          loadingText: '반영 중입니다.',
          formId: 'signupForm',
        }}
      />
    </form>
  );
}
