import { RouteRecordRaw } from 'vue-router';
import { outsideLayoutRoutes } from './outsideLayout';
import { diagram, welcome } from './dashboard';
import { basicFormRoute, dynamicFormRoute, modal } from './demos';
import { demoItemsRoute } from './demos-items';
import { roleRoute, userRoute } from './system';

export const rootRoute: RouteRecordRaw = {
  path: '/',
  redirect: welcome.path,
  component: () => import('@/layout/index.vue'),
  meta: {
    title: '所有导航',
    icon: 'ant-design:cluster-outlined',
  },
  children: [
    {
      path: '/dashboard',
      redirect: welcome.path,
      meta: {
        title: 'Dashboard',
        icon: 'ant-design:home-outlined',
      },
      children: [welcome, diagram],
    },
    {
      path: '/demos',
      redirect: modal.path,
      meta: {
        title: 'Demos演示',
        icon: 'ant-design:account-book-filled',
      },
      children: [
        modal,
        {
          path: '/demos/form',
          redirect: basicFormRoute.path,
          meta: {
            title: 'Form演示',
            icon: 'ant-design:account-book-outlined',
          },
          children: [basicFormRoute, dynamicFormRoute],
        },
        demoItemsRoute,
      ],
    },
    {
      path: '/system',
      redirect: userRoute.path,
      meta: {
        title: '系统管理',
        icon: 'ep:setting',
      },
      children: [userRoute, roleRoute],
    },
  ],
};

export const routes: RouteRecordRaw[] = [
  rootRoute,
  ...outsideLayoutRoutes,
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/error/NotFound.vue'),
  },
];
