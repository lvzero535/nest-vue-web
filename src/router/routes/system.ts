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

export const deptRoute: RouteRecordRaw = {
  path: '/system/dept',
  component: () => import('@/views/system/dept/index.vue'),
  meta: {
    title: '部门管理',
    icon: 'ant-design:cluster-outlined',
  },
};

export const menuRoute: RouteRecordRaw = {
  path: '/system/menu',
  component: () => import('@/views/system/menu/index.vue'),
  meta: {
    title: '菜单管理',
    icon: 'ant-design:cluster-outlined',
  },
};

export const asyncDemoMenus: RouteRecordRaw[] = [
  {
    path: '/system',
    redirect: userRoute.path,
    meta: {
      title: '系统管理',
      icon: 'ant-design:security-scan-filled',
    },
    children: [userRoute, roleRoute, deptRoute, menuRoute],
  },
];
