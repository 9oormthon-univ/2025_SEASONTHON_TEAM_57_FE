'use server';

import { redirect } from 'next/navigation';

import type { APIErrorResponse, AccInterlockCode, RegisterUserParams } from '@/constants/types';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

import { api } from './api';
import { MemberInfo, RegisteredResponse } from './interfaces';

export const GetAccessToken = async (param: AccInterlockCode) => {
  try {
    const res = await api<'getAccessToken'>(
      'POST',
      '/v1/auth/kakao/login',
      {
        code: param.code,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );

    const result = res as RegisteredResponse;

    await setCookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    await setCookie('refresh_token', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  } catch (error) {
    throw error;
  }
};

export const RegisterUser = async (param: RegisterUserParams) => {
  try {
    const link_token = await getCookie('link_token');
    const memberInfo = await getCookie('member_info');

    if (!link_token || !memberInfo) {
      console.error('RegisterUser Error: Missing credentials');
      redirect('/signin?error=missing_credentials');
    }

    const { isDefaultProfile, profile, gender } = JSON.parse(
      decodeURIComponent(memberInfo)
    ) as MemberInfo;

    const res = await api<'registerUser'>(
      'POST',
      '/v1/auth/signup',
      {
        linkToken: link_token,
        profile: profile,
        realName: param.realName,
        nickname: param.nickname,
        gender: gender,
        birthDate: param.birthDate,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );

    await setCookie('access_token', res.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });
    await setCookie('refresh_token', res.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
    await deleteCookie('link_token');
    await deleteCookie('member_info');
  } catch (error) {
    const err = error as APIErrorResponse;
    console.error('RegisterUser Error: ', err);
    throw error;
  }
};

export const RevokeAccessToken = async (): Promise<void> => {
  try {
    const refreshToken = await getCookie('refresh_token');
    if (!refreshToken) throw new Error('No refresh token available');

    await api<'logout'>(
      'POST',
      '/v1/auth/logout',
      {
        refreshToken: refreshToken,
      },
      {
        'User-Agent': 'Mozilla/5.0',
        'Content-Type': 'application/json',
      }
    );

    await deleteCookie('access_token');
    await deleteCookie('refresh_token');
  } catch (error) {
    const err = error as APIErrorResponse;
    console.error('RevokeAccessToken Error: ', err.code);
    throw err;
  }
};
