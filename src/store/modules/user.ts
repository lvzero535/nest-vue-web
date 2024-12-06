import { defineStore } from 'pinia';
import { store } from '@/store';
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { rootRoute } from '@/router/routes';

export const useUserStore = defineStore(
  'user',
  () => {
    const menus = ref<RouteRecordRaw[]>([]);
    const token = ref('');

    async function createMenus() {
      menus.value = rootRoute.children!;
    }
    async function login() {
      token.value = 'token';
    }
    return {
      menus,
      token,
      createMenus,
      login,
    };
  },
  {
    persist: {
      pick: ['token'],
    },
  },
);

// 在组件的setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
