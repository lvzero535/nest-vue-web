import { RouteRecordRaw } from 'vue-router';
export const modal: RouteRecordRaw = {
  path: '/demos/modal',
  component: () => import('@/views/demos/modal/index.vue'),
  meta: {
    title: '弹窗Modal',
    icon: 'ant-design:alipay-square-filled',
  },
};
export const basicFormRoute: RouteRecordRaw = {
  path: '/demos/form/basic-form',
  component: () => import('@/views/demos/form/basic/index.vue'),
  meta: {
    title: '基础表单',
    icon: 'ant-design:audio-filled',
  },
};
export const dynamicFormRoute: RouteRecordRaw = {
  path: '/demos/form/dynamic-form',
  component: () => import('@/views/demos/form/dynamic/index.vue'),
  meta: {
    title: '动态表单',
    icon: 'ant-design:arrow-down-outlined',
  },
};
