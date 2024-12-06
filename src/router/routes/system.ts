import { RouteRecordRaw } from 'vue-router';
export const userRoute: RouteRecordRaw = {
  path: '/system/user',
  component: () => import('@/views/system/user/index.vue'),

  meta: {
    title: '用户管理',
    icon: 'ant-design:user-outlined',
  },
};
export const roleRoute: RouteRecordRaw = {
  path: '/system/role',
  component: () => import('@/views/system/role/index.vue'),
  meta: {
    title: '角色管理',
    icon: 'ep:user',
  },
};
