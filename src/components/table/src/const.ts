import { Modal } from 'ant-design-vue';
import { XTableToolbarButton, XTypeButtonEnum } from './types';

export const xTypeButtons: Record<XTypeButtonEnum, XTableToolbarButton> = {
  // 刷新
  [XTypeButtonEnum.XType_Refresh]: {
    title: '刷新',
    icon: 'ant-design:reload-outlined',
    type: 'primary',
    onClick: () => {},
  },
  [XTypeButtonEnum.XType_Add]: {
    title: '添加',
    icon: 'ant-design:plus-circle-outlined',
    type: 'primary',
    onClick: () => {},
  },
  [XTypeButtonEnum.XType_Delete]: {
    title: '删除',
    icon: 'ant-design:delete-outlined',
    type: 'primary',
    danger: true,
    onClick: () => {
      Modal.confirm({
        title: '确定删除选中项？',
        onOk: () => {},
      });
    },
  },
};
