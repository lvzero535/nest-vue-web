import { InjectionKey } from 'vue';
import { XModalProvideRef } from './types';

export const XMODAL_PROVIDER_TOKEN: InjectionKey<XModalProvideRef> = Symbol(
  'XMODAL_PROVIDER_TOKEN',
);
