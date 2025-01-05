import { RouteRecordRaw } from 'vue-router';
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

export const componentRoutes = [componentButtonsRoute, iconsRoute];
