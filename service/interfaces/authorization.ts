import { Gender } from '@/constants/types';

// accessToken 발급
export interface MemberInfo {
  isDefaultProfile: string;
  profile: string;
  gender: Gender;
}
export interface NotRegisteredResponse {
  linkToken: string;
  memberInfo: MemberInfo;
}
export interface RegisteredResponse {
  accessToken: string;
  refreshToken: string;
}
export interface GetAccessToken {
  method: 'POST';
  endpoint: '/api/v1/auth/kakao/login';
  req: {
    code: string;
  };
  res: RegisteredResponse | NotRegisteredResponse;
}

// 회원가입
export interface RegisterUser {
  method: 'POST';
  endpoint: '/api/v1/auth/signup';
  req: {
    linkToken: string;
    profile: string;
    realName: string;
    nickname: string;
    gender: Gender;
    birthDate: string;
  };
  res: {
    linkToken: string;
    memberInfo: {
      kakaoId: number;
      profile: string;
      gender: Gender;
      defaultProfile: boolean;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export interface RefreshAccessToken {
  method: 'POST';
  endpoint: '/api/v1/auth/refresh';
  req: {
    refreshToken: string;
  };
  res: {
    accessToken: string;
  };
}

export interface Logout {
  method: 'POST';
  endpoint: '/api/v1/auth/logout';
  req: {
    refreshToken: string;
  };
  res: undefined;
}
