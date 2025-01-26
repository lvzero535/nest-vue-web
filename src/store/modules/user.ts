import { defineStore } from 'pinia';
import { store } from '@/store';
import { ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { AccountInfoModel, getUserMenus, getUserProfile } from '@/api/user';
import { generateDynamicRoutes } from '@/router/helper';

export const useUserStore = defineStore(
  'user',
  () => {
    const menus = ref<RouteRecordRaw[]>([]);
    const userInfo = ref<AccountInfoModel>();
    const token = ref<string>('');

    const setToken = (val: string) => {
      token.value = val;
    };

    const reset = () => {
      menus.value = [];
      token.value = '';
      userInfo.value = undefined;
    };

    const logout = () => {
      reset();
      window.location.reload();
    };

    const getUserInfo = async () => {
      const [profileResp, menusResp] = await Promise.all([
        getUserProfile(),
        getUserMenus(),
      ]);
      if (profileResp.success && menusResp.success) {
        userInfo.value = profileResp.data;
        menus.value = generateDynamicRoutes(menusResp.data.list);
        console.log('menusResp.data', menus.value);
      }
    };

    return {
      menus,
      token,
      userInfo,
      setToken,
      reset,
      logout,
      getUserInfo,
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
