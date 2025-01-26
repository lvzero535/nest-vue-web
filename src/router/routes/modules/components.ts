import { RouteRecordRaw } from 'vue-router';
export const modalRoute: RouteRecordRaw = {
  path: '/demos/modal',
  component: () => import('@/views/demos/modal/index.vue'),
  meta: {
    title: '弹窗Modal',
    icon: 'ant-design:alipay-square-filled',
  },
};

export const componentButtonsRoute: RouteRecordRaw = {
  path: '/demos/buttons',
  component: () => import('@/views/demos/buttons/index.vue'),

  meta: {
    title: '按钮相关',
    icon: 'ant-design:user-outlined',
  },
};
export const iconsRoute: RouteRecordRaw = {
  path: '/demos/icons',
  component: () => import('@/views/demos/icons/index.vue'),

  meta: {
    title: '图标合集',
    icon: 'ant-design:picture-filled',
  },
};

export const componentRoutes = [modalRoute, componentButtonsRoute, iconsRoute];
