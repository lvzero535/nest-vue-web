import { h } from 'vue';
import Icon from './src/Icon.vue';

export { type DefaultIconsType } from './src/icons.data';
import { type DefaultIconsType } from './src/icons.data';
export { Icon };

/**
 * 创建一个带有图标的 Vue 组件
 * @param icon - 要显示的图标类型
 * @param props - 传递给图标的额外属性
 * @returns 一个包含图标的 Vue 组件
 */
export function hIcon(
  icon: DefaultIconsType,
  props: Record<string, unknown> = {},
) {
  // 使用 h 函数创建一个 Icon 组件实例
  return h(Icon, {
    // 解构赋值，合并传入的 props 和 icon 属性
    ...props,
    icon,
  });
}
