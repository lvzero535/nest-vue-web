import { inject } from 'vue';
import LdModalProvider from './src/ModalProvider';
import { LD_MODAL_PROVIDER_TOKEN } from './src/token';

// 导出一个函数，用于获取 LdModalProvider 的实例
export function useModal() {
  const LdModalProvider = inject(LD_MODAL_PROVIDER_TOKEN);
  if (!LdModalProvider) {
    throw new Error('useModal() is called without provider.');
  }
  return LdModalProvider;
}

export { LdModalProvider };
