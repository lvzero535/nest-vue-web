import { inject } from 'vue';
import XModalProvider from './src/ModalProvider';
import { XMODAL_PROVIDER_TOKEN } from './src/token';

// 导出一个函数，用于获取 XModalProvider 的实例
export function useModal() {
  const XModalProvider = inject(XMODAL_PROVIDER_TOKEN);
  if (!XModalProvider) {
    throw new Error('useModal() is called without provider.');
  }
  return XModalProvider;
}

export { XModalProvider };
