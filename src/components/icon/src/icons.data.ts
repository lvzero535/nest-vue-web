/**
 * 从 '@iconify/vue' 导入 addCollection 函数，用于添加图标集合
 */
import { addCollection } from '@iconify/vue';

/**
 * 从 '@iconify-json/ant-design/icons.json' 导入 antDesign 图标集合
 */
import antDesign from '@iconify-json/ant-design/icons.json';

import ep from '@iconify-json/ep/icons.json';

/**
 * 定义一个常量 icons，包含导入的 antDesign 图标集合
 */
export const icons = { 'Ant Design': antDesign, 'Element Plus': ep } as const;

/**
 * 定义一个类型 DefaultIconsType，它是 antDesign 图标集合中图标的键的联合类型
 */
export type DefaultIconsType =
  | `ant-design:${keyof typeof antDesign.icons}`
  | `ep:${keyof typeof ep.icons}`;

/**
 * 定义一个函数 setupIcons，用于将所有导入的图标集合添加到应用程序中
 */
export function setupIcons() {
  // 遍历 icons 对象中的所有值
  Object.values(icons).forEach((item) => {
    // 将当前遍历到的图标集合添加到应用程序中
    addCollection(item);
  });
}
