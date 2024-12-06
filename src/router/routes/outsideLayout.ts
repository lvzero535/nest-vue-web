import { RouteRecordRaw } from 'vue-router';

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  meta: {
    title: '登录页面',
  },
  component: () => import('@/views/login/index.vue'),
};

export const outsideLayoutRoutes = [LoginRoute];
