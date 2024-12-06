import { defineStore } from 'pinia';
import { store } from '@/store';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const isCollapsed = ref(false);

  function toggleCollapsed() {
    isCollapsed.value = !isCollapsed.value;
  }

  return {
    isCollapsed,
    toggleCollapsed,
  };
});

// 在组件的setup函数外使用
export function useAppStoreWithOut() {
  return useAppStore(store);
}
