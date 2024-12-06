import { DefaultIconsType } from '@/components/icon';
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon?: DefaultIconsType;
  }
}
