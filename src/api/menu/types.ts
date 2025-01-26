import { BaseModel, GetFormModel } from '../types';

export enum MenuTypeEnum {
  /* 目录 */
  CATALOG = 0, // 目录
  /* 菜单 */
  MENU = 1, // 菜单
  /* 按钮 */
  BUTTON = 2, // 按钮
}

export interface MenuModel extends BaseModel {
  key?: string;
  name: string;
  type: MenuTypeEnum;
  path?: string;
  icon?: string;
  order?: number;
  status?: boolean;
  parentId?: string;
  permission?: string;
  children?: MenuModel[];
}

export type MenuModelForm = Omit<GetFormModel<MenuModel>, 'parent'> & {
  parentId?: string;
};
