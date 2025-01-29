import { request } from '@/api/axios';
import { DeptModel, DeptModelForm } from './types';
import { ListResult } from '../types';
export * from './types';

export function getDeptList() {
  return request<ListResult<DeptModel>>({
    url: '/dept',
    method: 'get',
  });
}

export function addDept(data: DeptModelForm) {
  return request<ListResult<DeptModel>>({
    url: '/dept',
    method: 'post',
    data,
  });
}
export function editDept(id: number, data: DeptModelForm) {
  return request<ListResult<DeptModel>>({
    url: `/dept/${id}`,
    method: 'put',
    data,
  });
}
