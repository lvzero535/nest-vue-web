import { MenuTypeEnum } from '@/api/menu';

export const MenuType: Record<MenuTypeEnum, string> = {
  [MenuTypeEnum.BUTTON]: '按钮',
  [MenuTypeEnum.CATALOG]: '目录',
  [MenuTypeEnum.MENU]: '菜单',
};
export const permissionTextMap: Record<string, string> = {
  list: '列表',
  create: '新增',
  update: '编辑',
  delete: '删除',
  export: '导出',
  import: '导入',
  detail: '详情',
  assign: '分配',
  reset: '重置',
  enable: '启用',
  disable: '禁用',
  start: '启动',
  stop: '停止',
};
