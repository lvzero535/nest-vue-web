import { request } from '@/api/axios';
import { MenuModel, MenuModelForm } from './types';
import { ListResult } from '../types';
export * from './types';

export function getMenuList() {
  return request<ListResult<MenuModel>>({
    url: '/menu',
    method: 'get',
  });
}

export function addMenu(data: MenuModelForm) {
  return request<ListResult<MenuModel>>({
    url: '/menu',
    method: 'post',
    data,
  });
}
export function editMenu(id: string, data: MenuModelForm) {
  return request<ListResult<MenuModel>>({
    url: `/menu/${id}`,
    method: 'put',
    data,
  });
}

export function deleteMenu(ids: string[]) {
  return request({
    url: `/menu`,
    method: 'delete',
    data: {
      ids,
    },
  });
}

export function getMenuById(id: string) {
  return request<MenuModel>({
    url: `/menu/${id}`,
    method: 'get',
  });
}

/**
 * 获取权限列表
 * @returns string[]
 */
export function getAllPermissions() {
  return request<string[]>({
    url: `/menu/permissions`,
    method: 'get',
  });
}
