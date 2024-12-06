import { InjectionKey } from 'vue';
import { LdModalProvideRef } from './types';

export const LD_MODAL_PROVIDER_TOKEN: InjectionKey<LdModalProvideRef> = Symbol(
  'LD_MODAL_PROVIDER_TOKEN',
);
