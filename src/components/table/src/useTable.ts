import { X_TABLE_HOOK_TOKEN } from './token';
import { XTableHookProps, XTableMethods } from './types';
import { provide, ref } from 'vue';

export function useTable(option: XTableHookProps) {
  const tableMethods = ref<XTableMethods>();

  provide(X_TABLE_HOOK_TOKEN, option);

  const register = (methods: XTableMethods) => {
    tableMethods.value = methods;
    if (!tableMethods.value) {
      console.error('methods is null');
    }
  };

  const methods: XTableMethods = {
    loadData: () => {
      tableMethods.value?.loadData?.();
    },
  };

  return {
    register,
    ...methods,
  };
}
