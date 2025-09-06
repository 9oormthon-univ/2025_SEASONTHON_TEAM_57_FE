export interface Term {
  label: string;
  href: string;
  required: boolean;
}
export type TermsState = Record<string, boolean>;

export type Gender = 'male' | 'female';

export type SkillType = 'learn' | 'teach' | 'trade';

// FOR API

export interface APIResponse<T> {
  success: boolean;
  code: string;
  message: string | null;
  data: T;
}

export interface APIErrorResponse {
  success: boolean;
  code: string;
  message: string | null;
}

export interface AccInterlockCode {
  code: string;
}

export interface RegisterUserParams {
  nickname: string;
  realName: string;
  birthDate: string;
}

export interface AuthAPIHeader {
  'Content-Type': 'application/json';
  [key: string]: string | number | boolean;
}
export type APIHeader = AuthAPIHeader;

export type TokenTypeHint = 'access_token' | 'refresh_token';
