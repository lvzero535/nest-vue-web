import { request } from '@/api/axios';
import { UserFormModel, UserModel } from './types';
import { ListResult, PageQuery } from '../types';
export * from './types';
export * from './account';

export function getUserList(params: PageQuery) {
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

export function getUserById(id: string) {
  return request<UserModel>({
    url: `/user/${id}`,
    method: 'get',
  });
}
export function updateUser(id: string, data: UserFormModel) {
  return request({
    url: `/user/${id}`,
    method: 'put',
    data,
  });
}

export function deleteUser(ids: string[]) {
  return request({
    url: `/user`,
    method: 'delete',
    data: {
      ids,
    },
  });
}
