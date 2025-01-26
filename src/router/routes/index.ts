import { RouteRecordRaw } from 'vue-router';
import { outsideLayoutRoutes } from './outsideLayout';
import { DEFAULT_ROUTE } from './constantRoutes';

export const rootRoute: RouteRecordRaw = {
  path: '/',
  redirect: DEFAULT_ROUTE,
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '所有导航',
    icon: 'ant-design:cluster-outlined',
  },
  children: [],
};

export const routes: RouteRecordRaw[] = [
  rootRoute,
  ...outsideLayoutRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/NotFound.vue'),
  },
];
