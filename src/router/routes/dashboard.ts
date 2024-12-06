import { RouteRecordRaw } from 'vue-router';
export const welcome: RouteRecordRaw = {
  path: '/dashboard/welcome',
  component: () => import('@/views/dashboard/welcome/index.vue'),
  meta: {
    title: '工作台',
    icon: 'ant-design:dashboard-outlined',
  },
};
export const diagram: RouteRecordRaw = {
  path: '/dashboard/diagram',
  component: () => import('@/views/dashboard/diagram/index.vue'),
  meta: {
    title: '图表分析',
    icon: 'ant-design:bar-chart-outlined',
  },
};
