import { request } from '@/api/axios';
import { QueryParams, UserFormModel, UserModel } from './types';
import { ListResult } from '../types';
export * from './types';
export * from './account';

export function getUserList(params: QueryParams) {
  return request<ListResult<UserModel>>({
    url: '/user',
    method: 'get',
    params,
  });
}

export function addUser(data: UserFormModel) {
  return request({
    url: '/user',
    method: 'post',
    data,
  });
}

export function getUserById(id: number) {
  return request<UserModel>({
    url: `/user/${id}`,
    method: 'get',
  });
}
export function updateUser(id: number, data: UserFormModel) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  });
}

export function deleteUser(ids: number[]) {
  return request({
    url: `/user`,
    method: 'delete',
    data: {
      ids,
    },
  });
}
