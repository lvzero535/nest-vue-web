// Type definitions for vue-virtual-scroller
// Project: https://github.com/Akryum/vue-virtual-scroller/
declare module 'vue-virtual-scroller' {
  import Vue, { ComponentOptions, PluginObject, Component } from 'vue';
  interface PluginOptions {
    installComponents?: boolean;
    componentsPrefix?: string;
  }

  const plugin: PluginObject<PluginOptions> & { version: string };

  export const RecycleScroller: Component<SafeAny, SafeAny, SafeAny, SafeAny>;
  export const DynamicScroller: Component<SafeAny, SafeAny, SafeAny, SafeAny>;
  export const DynamicScrollerItem: Component<
    SafeAny,
    SafeAny,
    SafeAny,
    SafeAny
  >;

  export function IdState(options?: {
    idProp?: (vm: SafeAny) => SafeAny;
  }): ComponentOptions<Vue> | typeof Vue;

  export default plugin;
}
