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

export function getRoleById(id: string) {
  return request<RoleModel>({
    url: `/role/${id}`,
    method: 'get',
  });
}
export function updateRole(id: string, data: RoleFormModel) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data,
  });
}

export function deleteRole(ids: string[]) {
  return request({
    url: `/role`,
    method: 'delete',
    data: {
      ids,
    },
  });
}
