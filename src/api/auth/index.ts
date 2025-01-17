import { request } from '@/api/axios';
import { LoginDto } from './types';
export * from './types';

export function login(data: LoginDto) {
  return request<{ access_token: string }>({
    url: '/auth/login',
    method: 'Post',
    data,
  });
}
