import { InjectionKey } from 'vue';
import { XTableHookProps } from './types';

export const X_TABLE_HOOK_TOKEN: InjectionKey<XTableHookProps> =
  Symbol('X_TABLE_HOOK_TOKEN');
