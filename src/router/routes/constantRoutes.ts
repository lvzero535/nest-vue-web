import { RouteRecordRaw } from 'vue-router';
import formDemo from './modules/form-demo';
import demosItems from './modules/demos-items';
import { componentRoutes, modalRoute } from './modules/components';
import dashboard, { welcome } from './modules/dashboard';

export const DEFAULT_ROUTE = welcome.path;

export const constantRoutes: RouteRecordRaw[] = [
  dashboard,
  {
    path: '/demos',
    redirect: modalRoute.path,
    meta: {
      title: 'Demos演示',
      icon: 'ant-design:account-book-filled',
    },
    children: [...componentRoutes, formDemo, demosItems],
  },
];
