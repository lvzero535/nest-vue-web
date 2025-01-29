import { request } from '@/api/axios';
import { RoleFormModel, RoleModel } from './types';
import { ListResult, PageQuery } from '../types';
export * from './types';

export function getRoleList(params: PageQuery) {
  return request<ListResult<RoleModel>>({
    url: '/role',
    method: 'get',
    params,
  });
}

export function addRole(data: RoleFormModel) {
  return request({
    url: '/role',
    method: 'post',
    data,
  });
}

export function getRoleById(id: number) {
  return request<RoleModel>({
    url: `/role/${id}`,
    method: 'get',
  });
}
export function updateRole(id: number, data: RoleFormModel) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data,
  });
}

export function deleteRole(ids: number[]) {
  return request({
    url: `/role`,
    method: 'delete',
    data: {
      ids,
    },
  });
}
