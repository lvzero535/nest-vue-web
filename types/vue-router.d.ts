import { DefaultIconsType } from '@/components/icon';
import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    icon?: DefaultIconsType;
    keepAlive?: boolean;
    permissions?: string[]; // 页面权限标识集合，如：["sys:user:add","sys:user:edit"]
  }
}
