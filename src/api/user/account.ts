import { request } from '@/api/axios';
import { AccountInfoModel } from './types';
import { ListResult } from '../types';
import { MenuModel } from '../menu';
/**
 *
 * 当前文件是登录用户相关的接口
 */

export function getUserProfile() {
  return request<AccountInfoModel>({
    url: `/account/profile`,
    method: 'get',
  });
}
export function getUserMenus() {
  return request<ListResult<MenuModel>>({
    url: `/account/menus`,
    method: 'get',
  });
}
