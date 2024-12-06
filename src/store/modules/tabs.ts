import { defineStore } from 'pinia';
import { store } from '@/store';
import { watch, ref } from 'vue';
import { RouteRecordRaw } from 'vue-router';
import { getRouteByPath } from '@/router/helper';
import router from '@/router';
import { welcome } from '@/router/routes/dashboard';

export enum TAB_ACTIONS {
  CLOSE_ALL = 'close-all',
  CLOSE_OTHER = 'close-other',
  CLOSE_LEFT = 'close-left',
  CLOSE_RIGHT = 'close-right',
}

export const DisableCloseTab = [welcome.path];

export const isDisableClose = (path: string) => {
  return DisableCloseTab.includes(path);
};

export const useTabsStore = defineStore(
  'tabs',
  () => {
    const tabsMap = ref<Map<string, RouteRecordRaw>>(new Map());
    const tabsKey = ref<string[]>([]);

    watch(
      tabsMap,
      () => {
        tabsKey.value = Array.from(tabsMap.value.keys());
      },
      {
        /* 
          不加这个，监听不到对象的属性变化，导致tabsKey.value没有更新
          但是不加这个能监听到delete操作的变化
        */
        deep: true,
      },
    );

    function closeTabs(action: TAB_ACTIONS, path: string) {
      const currentActiveRoutePath = router.currentRoute.value.path;
      switch (action) {
        case TAB_ACTIONS.CLOSE_ALL:
          const firstTab = tabsMap.value.get(tabsKey.value[0]);
          tabsMap.value.clear();
          if (firstTab) {
            tabsMap.value.set(firstTab.path, firstTab);
            router.push(firstTab.path);
          }
          break;

        case TAB_ACTIONS.CLOSE_OTHER:
          const currentActionRoute = tabsMap.value.get(path);
          tabsMap.value.clear();
          tabsMap.value.set(path, currentActionRoute!);

          /* 删除后，如果删除的tab是当前激活的tab，则跳转到第一个tab */
          if (currentActiveRoutePath !== path) {
            router.push(path);
          }

          break;

        case TAB_ACTIONS.CLOSE_LEFT:
          const currentIndex = tabsKey.value.indexOf(path);
          if (currentIndex === -1) {
            return;
          }
          const deletedTabs = tabsKey.value.slice(0, currentIndex);
          deletedTabs.forEach((key) => {
            tabsMap.value.delete(key);
          });

          /* 删除后，如果删除的tab是当前激活的tab，则跳转到第一个tab */
          if (deletedTabs.includes(currentActiveRoutePath)) {
            router.push(path);
          }

          break;

        case TAB_ACTIONS.CLOSE_RIGHT:
          const currentIndex1 = tabsKey.value.indexOf(path);
          if (currentIndex1 === -1) {
            return;
          }
          const deletedTabs1 = tabsKey.value.slice(currentIndex1 + 1);
          deletedTabs1.forEach((key) => {
            tabsMap.value.delete(key);
          });

          /* 删除后，如果删除的tab是当前激活的tab，则跳转到第一个tab */
          if (deletedTabs1.includes(currentActiveRoutePath)) {
            router.push(tabsKey.value[0]);
          }
          break;

        default:
          console.log('action', action);
      }
    }

    function removeTabs(path: RouteRecordRaw | string) {
      const key = typeof path === 'string' ? path : path.path;
      if (tabsMap.value.has(key)) {
        tabsMap.value.delete(key);
      }
    }

    function addTabs(path: RouteRecordRaw | string) {
      const key = typeof path === 'string' ? path : path.path;
      if (tabsMap.value.has(key)) {
        return;
      }
      const route = typeof path === 'string' ? getRouteByPath(path) : path;
      if (!route) {
        return;
      }
      tabsMap.value.set(key, route);
    }

    return {
      tabsMap,
      addTabs,
      tabsKey,
      removeTabs,
      closeTabs,
    };
  },
  {
    persist: {
      pick: ['tabsKey'],
      afterHydrate(context) {
        const tabsKey = context.store.tabsKey;
        if (tabsKey.length === 0) {
          return;
        }
        tabsKey.forEach((key: string) => {
          context.store.addTabs(key);
        });
      },
    },
  },
);

// 在组件的setup函数外使用
export function useTabsStoreWithOut() {
  return useTabsStore(store);
}
