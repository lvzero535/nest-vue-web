import { defineStore } from 'pinia';
import { store } from '@/store';
import { computed, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { AccountInfoModel, getUserMenus, getUserProfile } from '@/api/user';
import { generateDynamicRoutes } from '@/router/helper';
import { isEmpty } from 'lodash-es';
import { getAllPermissions } from '@/api/menu';

const demoAccount = '__inner_demo_account__';

export const useUserStore = defineStore(
  'user',
  () => {
    const menus = ref<RouteRecordRaw[]>([]);
    const userInfo = ref<AccountInfoModel>();
    const token = ref<string>('');
    const permissions = ref<string[]>([]);
    const isDemoMode = computed(() => {
      return userInfo.value?.username === demoAccount;
    });

    const setToken = (val: string) => {
      token.value = val;
    };

    const getPermissions = async () => {
      if (isEmpty(permissions.value)) {
        const resp = await getAllPermissions();
        if (resp.success) {
          permissions.value = resp.data;
        }
      }
    };

    const reset = () => {
      menus.value = [];
      permissions.value = [];
      token.value = '';
      userInfo.value = undefined;
    };

    const logout = () => {
      reset();
      window.location.reload();
    };

    const getUserInfo = async () => {
      getPermissions();
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
      permissions,
      userInfo,
      setToken,
      reset,
      logout,
      getUserInfo,

      isDemoMode,
    };
  },
  {
    persist: {
      pick: ['token', 'permissions'],
    },
  },
);

// 在组件的setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}
