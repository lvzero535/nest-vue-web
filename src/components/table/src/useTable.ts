import { LdTableMethods } from './types';
import { ref } from 'vue';

export function useTable() {
  const tableMethods = ref<LdTableMethods>();

  const register = (methods: LdTableMethods) => {
    tableMethods.value = methods;
    if (!tableMethods) {
      console.error('methods is null');
    }
  };

  const methods: LdTableMethods = {
    loadData: () => {
      tableMethods.value?.loadData?.();
    },
  };

  return {
    register,
    ...methods,
  };
}
