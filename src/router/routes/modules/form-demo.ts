import { RouteRecordRaw } from 'vue-router';
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

export default {
  path: '/demos/form',
  redirect: basicFormRoute.path,
  meta: {
    title: 'Form演示',
    icon: 'ant-design:account-book-outlined',
  },
  children: [basicFormRoute, dynamicFormRoute],
} as RouteRecordRaw;
