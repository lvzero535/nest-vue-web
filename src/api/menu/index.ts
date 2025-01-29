import { request } from '@/api/axios';
import { MenuModel, MenuModelForm } from './types';
import { ListResult } from '../types';
export * from './types';

export const MORE_MENU_SEPARATE = ',';

export function getMenuList() {
  return request<ListResult<MenuModel>>({
    url: '/menu',
    method: 'get',
  });
}

export function addMenu(dt: MenuModelForm) {
  const data = {
    ...dt,
    permission: dt.permission?.join(MORE_MENU_SEPARATE) || '',
  };
  return request<ListResult<MenuModel>>({
    url: '/menu',
    method: 'post',
    data,
  });
}
export function editMenu(id: number, dt: MenuModelForm) {
  const data = {
    ...dt,
    permission: dt.permission?.join(MORE_MENU_SEPARATE) || '',
  };
  return request<ListResult<MenuModel>>({
    url: `/menu/${id}`,
    method: 'put',
    data,
  });
}

export function deleteMenu(ids: number[]) {
  return request({
    url: `/menu`,
    method: 'delete',
    data: {
      ids,
    },
  });
}

export function getMenuById(id: number) {
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
