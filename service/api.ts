import type { APIErrorResponse, APIHeader, APIResponse } from '@/constants/types';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';

import { AppError } from './error';
import { NotRegisteredResponse } from './interfaces';
import { APIResource } from './serverResource';

export const api = async <T extends keyof APIResource>(
  method: APIResource[T]['method'],
  endpoint: APIResource[T]['endpoint'],
  param?: APIResource[T]['req'],
  headers?: APIHeader
  // needAuth?: boolean
): Promise<APIResource[T]['res']> => {
  const token = await getCookie('access_token');

  const makeRequest = async (): Promise<Response> => {
    return await fetch(`${process.env.BACKEND_API}${endpoint}`, {
      cache: 'force-cache',
      method: method,
      headers: {
        ...(token && {
          Authorization: `Bearer ${token}`,
        }),
        ...headers,
      },
      body: param ? JSON.stringify(param) : undefined,
    });
  };

  const res = await makeRequest();

  if (res.status === 401) {
    try {
      const refreshToken = await getCookie('refresh_token');
      if (!refreshToken) throw new Error('No refresh token available');

      console.log('Refreshing access token...');

      const result = await fetch('/v1/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });

      const data = (await result.json()) as { accessToken: string };
      await setCookie('access_token', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24,
      });
      // Retry the original request with the new token
      await makeRequest();
    } catch (error) {
      const err = error as APIErrorResponse;
      if (err.code !== 'AUTH001') {
        console.error('Token refresh failed: ', err);
        await deleteCookie('access_token');
        await deleteCookie('refresh_token');
      }
      throw new Error('401 Unauthorized');
    }
  }

  if (!res.ok) {
    const err = (await res.json()) as APIErrorResponse;
    throw err;
  }

  const result = (await res.json()) as APIResponse<APIResource[T]['res']>;

  if (result.code === 'A002') {
    const data = result.data as NotRegisteredResponse;
    console.log('NotRegisteredResponse data:', data);
    await setCookie('link_token', data.linkToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });
    await setCookie('member_info', decodeURIComponent(JSON.stringify(data.memberInfo)), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });
    throw new AppError({ code: 'A002', message: '회원가입 필요' });
  }

  return result.data;
};
