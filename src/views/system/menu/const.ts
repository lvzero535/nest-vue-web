import { MenuTypeEnum } from '@/api/menu';

export const MenuType: Record<MenuTypeEnum, string> = {
  [MenuTypeEnum.BUTTON]: '按钮',
  [MenuTypeEnum.CATALOG]: '目录',
  [MenuTypeEnum.MENU]: '菜单',
};
