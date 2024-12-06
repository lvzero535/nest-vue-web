import { RouteRecordRaw } from 'vue-router';

export const demoItemsRoute: RouteRecordRaw = {
  path: '/demos/item',
  redirect: '/demos/item/item-1',
  meta: {
    title: 'item',
  },
  children: [
    {
      path: '/demos/item/item-1',
      component: () => import('@/views/demos/item-1/index.vue'),
      meta: {
        title: 'item-1',
      },
    },
    {
      path: '/demos/item/item-11',
      redirect: '/demos/item/item-11/item-1-1',
      meta: {
        title: 'item-11',
      },
      children: [
        {
          path: '/demos/item/item-11/item-1-1',
          component: () => import('@/views/demos/item-1/item-1-1/index.vue'),
          meta: {
            title: 'item-1-1',
          },
        },
        {
          path: '/demos/item/item-11/item-1-2',
          component: () => import('@/views/demos/item-1/item-1-2/index.vue'),
          meta: {
            title: 'item-1-2',
          },
        },
      ],
    },
  ],
};
