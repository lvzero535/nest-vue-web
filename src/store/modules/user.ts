import { defineStore } from 'pinia';
import { store } from '@/store';
import { computed, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { rootRoute } from '@/router/routes';

export const useUserStore = defineStore(
  'user',
  () => {
    const menus = ref<RouteRecordRaw[]>([]);

    const token = ref('');
    const jwtToken = computed(() => token.value);
    async function createMenus() {
      menus.value = rootRoute.children!;
    }
    const setToken = (val: string) => {
      token.value = val;
    };

    const reset = () => {
      menus.value = [];
      token.value = '';
    };

    const logout = () => {
      reset();
      window.location.reload();
    };

    return {
      menus,
      token: jwtToken,
      createMenus,
      setToken,
      reset,
      logout,
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
