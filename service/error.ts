// errors.ts
import type { APIErrorResponse } from '@/constants/types';

export class AppError extends Error {
  readonly success = false;
  readonly code: string;
  /** 서버 원문 메시지(null 허용) */
  readonly apiMessage: string | null;

  constructor({ code, message }: Pick<APIErrorResponse, 'code' | 'message'>) {
    super(message ?? code); // Error.message는 string이어야 함
    this.name = 'AppError';
    this.code = code;
    this.apiMessage = message ?? null;

    // Error 상속 안전장치
    Object.setPrototypeOf(this, new.target.prototype);
    if (Error.captureStackTrace) Error.captureStackTrace(this, AppError);
  }

  /** console.error(String(err))일 때 코드만 나오게 하고 싶다면 */
  toString() {
    return this.code;
  }

  /** 로깅/전달용: APIErrorResponse 형태로 직렬화 */
  toJSON(): APIErrorResponse {
    return { success: false, code: this.code, message: this.apiMessage };
  }
}
