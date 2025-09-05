'use server';

import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';

export async function setCookie(
  key: string,
  value: string,
  options?: Omit<ResponseCookie, 'name' | 'value'>
) {
  (await cookies()).set(key, value, options);
}

export async function getCookie(key: string) {
  return (await cookies()).get(key)?.value;
}

export async function deleteCookie(key: string) {
  (await cookies()).delete(key);
}
