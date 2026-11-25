/**
 * Tipe data umum lintas fitur
 */
export interface BaseResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface UserSession {
  id: string;
  name?: string;
  email?: string;
}

